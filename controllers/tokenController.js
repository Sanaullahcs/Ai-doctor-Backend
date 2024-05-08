import jwt from "jsonwebtoken";

const validateTokenExpiry = (token) => {
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    // Check if the token is expired
    const isTokenExpired = Date.now() >= decodedToken.exp * 1000;
    return { isExpired: isTokenExpired };
  } catch (err) {
    // Token verification failed or is invalid
    return { error: "Invalid token" };
  }
};

const tokenController = {
  validate: (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    const tokenValidationResult = validateTokenExpiry(token);
    if (tokenValidationResult.isExpired) {
      res.status(401).json({ error: "Token is expired" });
    } else if (tokenValidationResult.error) {
      res.status(401).json({ error: tokenValidationResult.error });
    } else {
      res.status(200).json({ message: "Token is valid" });
    }
  },
};

export default tokenController;
