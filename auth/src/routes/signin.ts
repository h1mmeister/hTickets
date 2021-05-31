import express from "express";

const router = express.Router();

// api for signing in to the app
router.post("/api/users/signin", (req, res) => {
  res.send("Hi there!");
});

export { router as signInRouter };
