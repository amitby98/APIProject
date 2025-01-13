import { Request, Response } from "express";
import UserModel from "../models/User";
import * as jwt from "jsonwebtoken";
export async function registerUser(req: Request, res: Response) {
  try {
    const userData = req.body;
    const existingUser = await UserModel.findOne({ email: userData.email });
    if (existingUser) {
      res.status(400).json({
        data: null,
        status: 400,
        error: "User already exists",
        message: "User already exists",
      });
      return;
    }
    const user = await UserModel.create(userData);
    res.status(201).json({
      data: user,
      status: 201,
      error: null,
      message: "User created successfully",
    });
  } catch (e: any) {
    res.status(400).json({
      data: null,
      status: 400,
      error: e.message,
      message: "Error occurred",
    });
  }
}

export async function loginUser(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      res.status(400).json({
        data: null,
        status: 400,
        error: "User not found",
        message: "User not found",
      });
      return;
    }
    if (!user.comparePassword(password)) {
      res.status(400).json({
        data: null,
        status: 400,
        error: "Invalid password",
        message: "Invalid password",
      });
      return;
    }
    // create token, refresh token
    const token = jwt.sign({ email: user.email, id: user._id }, process.env.ACCESS_TOKEN_SECRET!, {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
    });

    const refresh = jwt.sign({ email: user.email, id: user._id }, process.env.REFRESH_TOKEN_SECRET!, {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
    });
    await UserModel.findByIdAndUpdate(user._id, { refresh_token: refresh });
    res.status(200).json({
      data: {
        token,
        refresh,
      },
      status: 200,
      error: null,
      message: "User logged in successfully",
    });
  } catch (e: any) {
    res.status(400).json({
      data: null,
      status: 400,
      error: e.message,
      message: "Error occurred",
    });
  }
}

export async function refreshToken(req: Request, res: Response) {
  try {
    const { refresh } = req.body;
    const user = await UserModel.findOne({ refresh_token: refresh });
    if (!user) {
      res.status(400).json({
        data: null,
        status: 400,
        error: "Invalid refresh token",
        message: "Invalid refresh token",
      });
      return;
    }
    const token = jwt.sign({ email: user.email, id: user._id }, process.env.ACCESS_TOKEN_SECRET!, {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
    });
    res.status(200).json({
      data: {
        token,
      },
      status: 200,
      error: null,
      message: "Token refreshed successfully",
    });
  } catch (e: any) {
    res.status(400).json({
      data: null,
      status: 400,
      error: e.message,
      message: "Error occurred",
    });
  }
}

export async function logoutUser(req: Request, res: Response) {
  try {
    const { id } = req.user;
    await UserModel.findByIdAndUpdate(id, { refresh_token: "" });
    res.status(200).json({
      data: null,
      status: 200,
      error: null,
      message: "User logged out successfully",
    });
  } catch (e: any) {
    res.status(400).json({
      data: null,
      status: 400,
      error: e.message,
      message: "Error occurred",
    });
  }
}

export async function me(req: Request, res: Response) {
  try {
    const { id } = req.user;
    const user = await UserModel.findById(id);
    res.status(200).json({
      data: user,
      status: 200,
      error: null,
      message: "User fetched successfully",
    });
  } catch (e: any) {
    res.status(400).json({
      data: null,
      status: 400,
      error: e.message,
      message: "Error occurred",
    });
  }
}
