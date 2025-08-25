import { NextResponse } from "next/server";
import connectDB from "../../../../db/db.js";
import Workspace from "../../../../../models/workspace.js";


export async function DELETE(req, context) {
    const params = await context.params; // ✅ Await params
    const { id, memberId } = params;
  
    if (!id || !memberId) {
      return NextResponse.json(
        { success: false, error: "Workspace ID and Member ID are required" },
        { status: 400 }
      );
    }
  
    try {
      await connectDB();
  
      // Remove the member from members array
      const updatedWorkspace = await Workspace.findByIdAndUpdate(
        id,
        { $pull: { members: memberId } }, // ✅ if `members` is an array of ObjectIds
        { new: true }
      ).populate("members", "name email"); // populate updated list
  
      if (!updatedWorkspace) {
        return NextResponse.json(
          { success: false, error: "Workspace not found" },
          { status: 404 }
        );
      }
  
      return NextResponse.json({ success: true, workspace: updatedWorkspace });
    } catch (error) {
      console.error("Error in DELETE member API:", error);
      return NextResponse.json(
        { success: false, error: "Server error" },
        { status: 500 }
      );
    }
  } 