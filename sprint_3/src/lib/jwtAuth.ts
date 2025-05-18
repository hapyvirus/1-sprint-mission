import { expressjwt } from "express-jwt";
import { JWT_SECRET } from "./constants";


const verifyAccessToken = expressjwt({
  secret: JWT_SECRET,
  algorithms: ["HS256"],
  requestProperty: "user",
});

const verifyRefreshToken = expressjwt({
  secret: JWT_SECRET,
  algorithms: ["HS256"],
  getToken: (req) => req.cookies.refreshToken,
  requestProperty: "user",
});

export default {
  verifyAccessToken,
  verifyRefreshToken,
};
