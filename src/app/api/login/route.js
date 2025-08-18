import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectionstr } from "../../lib/db.js";
import { User } from "../../lib/userschema.js";
import bcrypt from "bcrypt";

// POST /api/login
export async function POST(req) {
  try {
    const data = await req.json();
    const { email, password } = data;

    await mongoose.connect(connectionstr, { useNewUrlParser: true });

    if (!email || !password) {
      return NextResponse.json({ success: false, message: "Email and password required." }, { status: 400 });
    }

    // Find user by email
    const user = await User.findOne({ email: email });
    if (!user) {
      return NextResponse.json({ success: false, message: "Incorrect email or password." }, { status: 401 });
    }

    // Only users with password can login (freelancer/admin)
    if (!user.password) {
      return NextResponse.json({ success: false, message: "Login not allowed for this user type." }, { status: 403 });
    }

    // Compare hashed password
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return NextResponse.json({ success: false, message: "Incorrect email or password." }, { status: 401 });
    }

    const userInfo = user.toObject();
    delete userInfo.password; // Don’t expose hash

    return NextResponse.json({ success: true, user: userInfo });
  } catch (error) {
    console.error("Login Server Error:", error);
    return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 });
  }
}
