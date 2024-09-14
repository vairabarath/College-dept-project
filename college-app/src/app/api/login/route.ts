import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
export async function POST(req: NextRequest) {
  try {
    await connect();
    console.log("POSTED THE REQUEST");
    const reqBody = await req.json();
    const { email, password } = reqBody;

    // check if the user is exist
    const userExists = await User.findOne({ email });
    if (!userExists) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 400 }
      );
    }
    //check password
    const isMatch = await bcryptjs.compare(password, userExists.password);
    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 400 }
      );
    }

    //create token data
    const tokenData = {
      id: userExists._id,
      username: userExists.username,
      email: userExists.email,
      role: userExists.role,
    };

    //create token
    const token = jwt.sign(tokenData, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      message: "Login successful",
      success: true,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
