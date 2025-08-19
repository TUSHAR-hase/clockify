import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import connectDB from "../db/db.js";
import { User } from "../../models/userschema.js";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ success: false, message: "Email and password required." }, { status: 400 });
    }

    await connectDB();

    const user = await User.findOne({ email });
    if (!user || !user.password) {
      return NextResponse.json({ success: false, message: "Invalid credentials." }, { status: 401 });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return NextResponse.json({ success: false, message: "Invalid credentials." }, { status: 401 });
    }

    const userInfo = user.toObject();
    delete userInfo.password;

    return NextResponse.json({ success: true, user: userInfo });
  } catch (error) {
    console.error("Login Server Error:", error);
    return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 });
  }
}
