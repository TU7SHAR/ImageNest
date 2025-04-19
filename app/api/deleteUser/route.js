import { NextResponse } from "next/server";
import users from "@/models/users";
import connectDB from "@/lib/connection";

export async function DELETE(request) {
  const { _id } = await request.json();
  try {
    if (!_id)
      return NextResponse.json(
        { message: "User ID is missing", _id },
        { status: 400 }
      );
    await connectDB();
    const result = await users.deleteOne({ _id });
    if (result.deletedCount === 0) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    } else {
      return NextResponse.json(
        { message: "User deleted successfully" },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
