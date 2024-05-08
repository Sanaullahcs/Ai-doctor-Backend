// middleware/logger.js

import fs from "fs/promises";
import path from "path";

async function requestLogger(req, res, next) {
  const logFolder = path.join(process.cwd(), "log");

  try {
    // Create the log folder if it doesn't exist
    await fs.mkdir(logFolder, { recursive: true });

    const logFilePath = path.join(logFolder, "request.log");
    const ipAddress =
      req.headers["x-forwarded-for"] || req.connection.remoteAddress;

    const logMessage = `--- Date = ${new Date().toISOString()} - Ip Address = ${ipAddress} - Request header = ${
      req.headers["user-agent"]
    } - Request Method = ${req.method} Request Url = ${req.originalUrl}\n`;

    // Append log message to the log file
    await fs.appendFile(logFilePath, logMessage);
  } catch (error) {
    console.error("Error writing to log file:", error);
  }

  next();
}

export default requestLogger;
