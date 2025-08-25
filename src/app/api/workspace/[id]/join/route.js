import { NextResponse } from "next/server";
import connectDB from "../../../db/db.js";
import Invite from "../../../../models/invite.model.js";
import Workspace from "../../../../models/workspace.js";
import User from "../../../../models/userschema.js"

export async function POST(req, context) {
  await connectDB();

  try {
    // ✅ Await params (required in Next.js App Router)
    const { id } = await context.params;
    console.log("Workspace ID:", id);

    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.json({ success: false, error: "Missing token" }, { status: 400 });
    }

    const invite = await Invite.findOne({ token });
    if (!invite) {
      return NextResponse.json({ success: false, error: "Invalid token" }, { status: 400 });
    }

    if (invite.expiresAt && new Date(invite.expiresAt) < new Date()) {
      return NextResponse.json({ success: false, error: "Token expired" }, { status: 400 });
    }

    if (invite.accepted) {
      return NextResponse.json({ success: false, error: "Token already used" }, { status: 400 });
    }

    if (invite.workspace.toString() !== id) {
      return NextResponse.json({ success: false, error: "Invalid workspace for this token" }, { status: 400 });
    }

    const workspace = await Workspace.findById(id);
    if (!workspace) {
      return NextResponse.json({ success: false, error: "Workspace not found" }, { status: 404 });
    }

    console.log(invite.email)

    // Find the user by email
    const user = await User.findOne({ email: invite.email });
    console.log(user)
    if (!user) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
    }

    

    // Check if user is already a member
    const memberExists = workspace.members.includes(user._id);
    if (!memberExists) {
      workspace.members.push(user._id);
      await workspace.save();
    }

    // Mark invite as accepted
    invite.accepted = true;
    await invite.save();

    return NextResponse.json({
      success: true,
      message: "Successfully joined workspace",
      workspaceId: workspace._id,
    });
  } catch (error) {
    console.error("Join workspace error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}