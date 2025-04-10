import { expressjwt } from "express-jwt";

const verifyAccessToken = expressjwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
  requestProperty: "user",
});

const verifyOptionalToken = expressjwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
  requestProperty: "user",
  credentialsRequired: false,
});

const verifyRefreshToken = expressjwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
  getToken: (req) => {
    const refresh = req.cookies.refreshToken;
    return refresh;
  },
});

export default {
  verifyAccessToken,
  verifyRefreshToken,
  verifyOptionalToken,
};
