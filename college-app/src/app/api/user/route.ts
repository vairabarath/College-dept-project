import { connect } from "@/dbConfig/dbConfig";
import { decodeJWT } from "@/helpers/decodeJWT";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(req: NextRequest) {
  try {
    const user = await decodeJWT(req);
    return NextResponse.json({
      message: "User found",
      data: user,
    });
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
      status: error.status || 500,
    });
  }
}
