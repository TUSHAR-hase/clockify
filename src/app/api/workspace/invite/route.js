import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import crypto from "crypto";
import connectDB from "../../db/db.js"; // Your DB connection
import Invite from "../../../models/invite.model.js"; // Invite schema
import Workspace from "../../../models/workspace.js"; // Workspace schema

export async function POST(req) {
  await connectDB();

  try {
    const { email, workspaceId } = await req.json();

    // console.log("workspacesId--->",workspaceId)
    // console.log("email-->",email)

    if (!email || !workspaceId) {
      return NextResponse.json({ success: false, error: "Missing fields" }, { status: 400 });
    }

    // Generate unique token
    const token = crypto.randomUUID();
    // console.log("token-->",token)

    // Save invite to DB with expiry (24h)
    await Invite.create({
      email,
      workspace: workspaceId,
      token,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });

    // Invite link
    const inviteLink = `${process.env.NEXT_PUBLIC_BASE_URL}/pages/workespace/${workspaceId}/join?token=${token}`;
    
    console.log(inviteLink)


    // console.log("inviteLink",inviteLink)

    // Send email
    const transporter = nodemailer.createTransport({
        name: "SMTP",
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT), // convert to number
        secure: process.env.SMTP_SECURE === "true", // convert to boolean
        auth: {
          type: 'INVITE',
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
      

      console.log("transporter-->",transporter)
      
      

    await transporter.sendMail({
      from: `"Workspace App" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "You're invited to join a workspace",
      html: `
        <h2>Workspace Invitation</h2>
        <p>You have been invited to join a workspace.</p>
        <a href="${inviteLink}" target="_blank">Join Now</a>
      `,
    });

    return NextResponse.json({ success: true, message: "Invitation sent successfully" });
  } catch (error) {
    console.log("Sending link Error !!!!")
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
