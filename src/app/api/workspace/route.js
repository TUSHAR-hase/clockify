// src/app/api/workspaces/route.js
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import connectDB from "../db/db.js";
import Workspace from "../../models/workspace.js";
import User from "../../models/userschema.js";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret"; // apne env me rakho

// Helper: check auth from cookies
async function getUserFromCookie(req) {
  const token = req.cookies.get("token")?.value;
  console.log("TOKEN FROM COOKIE ===>", token);

  if (!token) return null;

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    return decoded; // user info
  } catch (err) {
    console.log("FETCH JWT TOKEN ERROR!!!!");
    return null;
  }
}

// Create workspace
export async function POST(req) {
  try {
    const user = await getUserFromCookie(req);
    console.log("User--->", user);
    if (!user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();
    const body = await req.json();

    if (!body.name || body.name.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: "Workspace name is required" },
        { status: 400 }
      );
    }

    const workspace = await Workspace.create({
      name: body.name,
      owner: user.id,
      members: [user.id, ...(body.members || [])],
    });

    await workspace.populate("owner", "name email");
    await workspace.populate("members", "name email");

    return NextResponse.json({ success: true, workspace }, { status: 201 });
  } catch (error) {
    console.error("Workspace creation error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Get all workspaces for current user
export async function GET(req) {
  try {
    const user = await getUserFromCookie(req);

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();

    const workspaces = await Workspace.find({
      $or: [{ owner: user.id }, { members: user.id }],
    })
      .populate("owner", "name email")
      .populate("members", "name email")
      .sort({ createdAt: -1 });

    return NextResponse.json({ success: true, workspaces });
  } catch (error) {
    console.error("Workspaces fetch error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}


export async function DELETE(req) {
  try {
    await connectDB();
    const { _id } = await req.json();

    if (!_id) {
      return new Response(JSON.stringify({ message: "Workspace ID is required" }), { status: 400 });
    }

    const workspace = await Workspace.findById(_id);
    if (!workspace) {
      return new Response(JSON.stringify({ message: "Workspace not found" }), { status: 404 });
    }

    await Workspace.findByIdAndDelete(_id);
    return new Response(JSON.stringify({ message: "Workspace deleted successfully" }), { status: 200 });
  } catch (err) {

    return new Response(JSON.stringify({ message: "Failed to delete workspace" }), { status: 500 });
  }
}