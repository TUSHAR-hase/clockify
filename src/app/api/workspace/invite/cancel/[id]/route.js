import { NextResponse } from "next/server";
import connectDB from "../../../../db/db.js";
import Invite from "../../../../../models/invite.model.js";

export async function DELETE(req, context) {
  await connectDB();

  try {
    const { params } = context;
    const id = params?.id;
    console.log(id);

    const deletedInvite = await Invite.findByIdAndDelete(id);

    console.log(deletedInvite);

    if (!deletedInvite) {
      return NextResponse.json(
        { success: false, error: "Invite not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: "Invite cancelled" });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
