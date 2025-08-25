import { NextResponse } from "next/server";
import connectDB from "../../../db/db.js";
import Invite from "../../../../models/invite.model.js";

export async function POST(req) {
  await connectDB();
  try {
    const { workspaceId } = await req.json();

    if (!workspaceId) {
      return NextResponse.json({ success: false, error: "Workspace ID required" }, { status: 400 });
    }

    // Fetch pending invites (exclude expired ones if you want)
    const invites = await Invite.find({ workspace: workspaceId }).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, invites }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
