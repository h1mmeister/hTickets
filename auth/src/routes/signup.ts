import express from "express";

const router = express.Router();

// api for signing up the app
router.post("/api/users/signup", (res, req) => {
  res.send("Hi there!");
});

export { router as signUpRouter };
