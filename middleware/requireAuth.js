import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "You must be logged in" });
  }
  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findById(_id);
    req.user = user; // requested user that match the id in the token part of the header of second part of the token, like the id of the user that is logged in, the token format is like this: Bearer token and it have 3 parts which are: 1-Bearer 2-token 3-id of the user that is logged in, so we can get the id of the user that is logged in by using the third part of the token.
    next();
  } catch (err) {
    return res.status(401).json({ error: "You must be logged in" });
  }
};

export default requireAuth;
