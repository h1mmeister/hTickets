import express from "express";

const router = express.Router();

// api for signing out of the app
router.post("/api/users/signout", (res, req) => {
  res.send("Hi there!");
});

export { router as signOutRouter };
