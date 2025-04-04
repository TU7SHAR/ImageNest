import connectDB from "@/lib/connection";
import users from "@/models/users";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export async function POST(request) {
  try {
    await connectDB();
    const { email, password } = await request.json();

    const user = await users.findOne({ email });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 403 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 403 }
      );
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        name: user.name,
        mobile: user.mobile,
        createdAt: user.createdAt,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1w" }
    );

    // Exclude or Removing password from the user object
    const { password: _, ...userData } = user._doc;

    return NextResponse.json(
      {
        user: userData,
        token: token,
        message: "Login successful",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("error", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}
