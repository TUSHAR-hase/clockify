// src/middleware.js
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

export async function middleware(req) {
  const token = req.cookies.get("token")?.value;  // cookie se token read karo

  if (!token) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    jwt.verify(token, JWT_SECRET);
    return NextResponse.next();
  } catch (err) {
    return NextResponse.json({ success: false, message: "Invalid token" }, { status: 401 });
  }
}

export const config = {
  matcher: ["/api/protected/:path*"], // sirf protected api ke liye chalegi
};
