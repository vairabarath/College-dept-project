import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const decodeJWT = (request: NextRequest) => {
  try {
    const token = request.cookies.get("token")?.value || "";
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET!);
    return decodedToken;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
