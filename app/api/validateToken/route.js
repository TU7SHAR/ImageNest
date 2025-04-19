import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(request) {
  const { token } = await request.json(); // Extract token from request body

  if (!token) {
    return NextResponse.json({ valid: false }, { status: 401 }); // Return 401 if no token is provided
  }

  try {
    const secret = process.env.JWT_SECRET || "admin";
    const decoded = jwt.verify(token, secret); // Verify the token

    return NextResponse.json({ valid: true, decoded }); // Return valid token response
  } catch (error) {
    console.error("Token verification failed:", error.message);
    return NextResponse.json(
      { valid: false, err: error.message },
      { status: 401 }
    ); // Return 401 if verification fails
  }
}
