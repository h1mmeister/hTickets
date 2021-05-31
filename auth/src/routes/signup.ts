import express from "express";

const router = express.Router();

// api for getting the current user
router.post("/api/users/signup", (res, req) => {
  res.send("Hi there!");
});

export { router as signUpRouter };
