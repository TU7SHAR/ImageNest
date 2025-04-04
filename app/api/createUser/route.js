import connectDB from "@/lib/connection";
import users from "@/models/users";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export async function POST(request) {
  try {
    await connectDB();
    const { name, email, mobile, password } = await request.json();
    const existingUser = await users.findOne({ $or: [{ email }, { mobile }] });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 403 }
      );
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await users.create({
      name,
      email,
      mobile,
      password: hashPassword,
    });

    if (!newUser) {
      return NextResponse.json(
        { message: "User creation failed" },
        { status: 500 }
      );
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: newUser._id,
        email: newUser.email,
        mobile: newUser.mobile,
        name: newUser.name,
        createdAt: newUser.createdAt,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1w" }
    );

    // Exclude or Removing password from the user object
    const { password: _, ...userData } = newUser._doc;

    return NextResponse.json(
      {
        user: userData,
        token: token,
        message: "User created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.log("error", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}
