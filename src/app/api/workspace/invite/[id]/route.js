import { NextResponse } from "next/server";
import connectDB from "../../db/db.js";
import Invite from "../../../../models/invite.model.js";

export async function GET(req) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const workspaceId = searchParams.get("workspaceId");

  if (!workspaceId) {
    return NextResponse.json({ success: false, error: "Missing workspaceId" }, { status: 400 });
  }

  const invites = await Invite.find({ workspace: workspaceId, accepted: false }).sort({ createdAt: -1 });

  return NextResponse.json({ success: true, invites });
}
