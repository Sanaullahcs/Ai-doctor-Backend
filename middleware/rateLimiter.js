import { RateLimiterMemory } from "rate-limiter-flexible";

const opts = {
  points: 10,
  duration: 60,
};

const rateLimiter = new RateLimiterMemory(opts);

const rateLimitMiddleware = (req, res, next) => {
  const remoteAddress = req.ip; // Use the appropriate method to get the remote address

  rateLimiter
    .consume(remoteAddress, 1) // Adjust the number of points based on your requirements
    .then(() => {
      next(); // Continue to the next middleware or route handler
    })
    .catch((rateLimiterRes) => {
      res.status(429).send("Too Many Requests"); // Send a 429 status for rate limiting
    });
};

export default rateLimitMiddleware;
