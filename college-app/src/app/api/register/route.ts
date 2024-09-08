import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect();

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { username, email, password } = reqBody;
    console.log(username, email, password);

    //check if the user is already exist
    const userExists = await User.findOne({ email });
    if (userExists) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    //hash the password
    const hashedPassword = await bcryptjs.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    const savedUser = await newUser.save();

    console.log(savedUser);

    return NextResponse.json({
      message: "User created successfully",
      success: true,
      savedUser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 200 });
  }
}
