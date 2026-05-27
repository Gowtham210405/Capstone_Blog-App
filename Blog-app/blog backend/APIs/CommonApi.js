import exp from "express";
import { authenticate } from "../services/authService.js";
import { verifyToken } from "../middleware/verifyToken.js";

export const commonRouter = exp.Router();

const isProduction = process.env.NODE_ENV === "production";

const cookieOptions = {
  httpOnly: true,
  sameSite: "none",
  secure: true,
};

commonRouter.post("/login", async (req, res) => {
  try {
    const userCred = req.body;

    const { token, user } = await authenticate(userCred);

    res.cookie("token", token, cookieOptions);

    res.status(200).json({
      message: "login success",
      payload: user,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

commonRouter.get("/logout", async (req, res) => {
  res.clearCookie("token", cookieOptions);

  res.status(200).json({
    message: "Logged out successfully",
  });
});

commonRouter.get(
  "/check-auth",
  verifyToken("USER", "AUTHOR", "ADMIN"),
  (req, res) => {
    res.status(200).json({
      message: "authenticated",
      payload: req.user,
    });
  }
);