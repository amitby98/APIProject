import { RequestHandler } from "express";
import * as jwt from "jsonwebtoken";

const authMiddleware: RequestHandler = (req, res, next) => {
  const tokenHeader = (req.headers["Authorization"] || req.headers["authorization"]) as string;
  if (!tokenHeader) {
    res.status(401).json({
      data: null,
      status: 401,
      error: "Unauthorized",
      message: "Unauthorized",
    });
    return;
  }
  const token = tokenHeader.split(" ")[1];
  if (!token) {
    res.status(401).json({
      data: null,
      status: 401,
      error: "Unauthorized",
      message: "Unauthorized",
    });
    return;
  }
  // Verify token
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!!);
    req.user = decoded as any as { id: string; email: string };
    next();
  } catch (e: any) {
    res.status(401).json({
      data: null,
      status: 401,
      error: "Unauthorized",
      message: "Unauthorized",
    });
  }
};

export default authMiddleware;
