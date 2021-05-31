import express from "express";

const router = express.Router();

// api for getting the current user
router.get("/api/users/currentuser", (res, req) => {
  res.send("Hi there!");
});

export { router as currentUserRouter };
