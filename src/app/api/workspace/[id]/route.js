import { NextResponse } from "next/server";
import connectDB from "../../db/db.js";
import Workspace from "../../../models/workspace.js";

// fetch workspace by id
export async function GET(req, { params }) {
  const { id } = params;
  
  console.log("id-->", id);

  await connectDB();

  if (!id) {
    return NextResponse.json(
      {
        success: false,
        error: "Id is required !!!!",
      },
      {
        status: 400,
      }
    );
  }

  try {
    const workspace = await Workspace.findById(id);

    if (!workspace) {
      return NextResponse.json(
        { success: false, error: "Workspace not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, workspace }, { status: 200 });
  } catch (error) {
    console.error("DB error:", error);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
