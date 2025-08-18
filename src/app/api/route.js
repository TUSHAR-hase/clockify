import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectionstr } from "../../app/lib/db.js";
import { User, Freelancer, TeamMember, Admin, Client } from "../../app/lib/userschema.js"; // adjust path as needed
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    const data = await req.json();
    console.log(data);
    await mongoose.connect(connectionstr, { useNewUrlParser: true });

    // Prevent same email reuse
    const exists = await User.findOne({ email: data.email });
    if (exists) {
      return NextResponse.json({ success: false, message: "Email already registered." }, { status: 400 });
    }

    const { role } = data;

    // Hash password if present
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    let userDoc;
    switch (role) {
      case "freelancer":
        userDoc = new Freelancer(data);
        break;
      case "admin":
        userDoc = new Admin(data);
        break;
      case "team":
        userDoc = new TeamMember(data);
        break;
      case "client":
        userDoc = new Client(data);
        break;
      default:
        return NextResponse.json({ success: false, message: "Invalid role" }, { status: 400 });
    }

    const saved = await userDoc.save();
    // Do not return hashed password
    const userInfo = saved.toObject();
    delete userInfo.password;

    return NextResponse.json({ success: true, info: userInfo });
  } catch (error) {
    console.error("Signup Server Error:", error);
    return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 });
  }
}
