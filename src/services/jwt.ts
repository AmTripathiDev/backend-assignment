import JWT from "jsonwebtoken";
import {  admin } from "@prisma/client";

const JWT_SECRET = "$uper@1234.";

class JWTService {
  public static generateTokenForUser(user: admin) {
    const payload = {
      id: user?.id,
      email: user?.email,
    };
    const token = JWT.sign(payload, JWT_SECRET);
    return token;
  }

  // public static decodeToken(token: string) {
  //   try {
  //     return JWT.verify(token, JWT_SECRET) as JWTUser;
  //   } catch (error) {
  //     return null;
  //   }
  // }
}

export default JWTService;