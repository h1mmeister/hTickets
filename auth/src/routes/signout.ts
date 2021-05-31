import express from "express";

const router = express.Router();

// api for signing out of the app
router.post("/api/users/signout", (req, res) => {
  res.send("Hi there!");
});

export { router as signOutRouter };
