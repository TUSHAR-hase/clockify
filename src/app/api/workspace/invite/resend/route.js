import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import connectDB from "../../../db/db.js";
import Invite from "../../../../models/invite.model.js";
import Workspace from "../../../../models/workspace.js";

export async function POST(req) {
  await connectDB();

  try {
    const { inviteId } = await req.json();
    console.log("inviteId received:", inviteId);

    const invite = await Invite.findById(inviteId).populate("workspace");
    if (!invite) {
      return NextResponse.json({ success: false, error: "Invite not found" }, { status: 404 });
    }

    const inviteLink = `${process.env.NEXT_PUBLIC_BASE_URL}/pages/workespace/${invite.workspace._id}/join?token=${invite.token}`;
    console.log("Invite Link:", inviteLink);

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const resending = await transporter.sendMail({
      from: `"Workspace App" <${process.env.EMAIL_USER}>`,
      to: invite.email,
      subject: "Your Workspace Invitation (Resent)",
      html: `
        <h2>Workspace Invitation</h2>
        <p>This is a reminder to join the workspace:</p>
        <a href="${inviteLink}" target="_blank">Join Now</a>
      `,
    });

    console.log("Email sent:", resending.messageId);

    return NextResponse.json({ success: true, message: "Invite resent successfully" });
  } catch (error) {
    console.error("Error in resend API:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
