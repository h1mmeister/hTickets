import express from "express";

const router = express.Router();

// api for signing out of the app
router.post("/api/users/signout", (req, res) => {
  // this is how we will dump all the info related to the cookie
  req.session = null;

  res.send({});
});

export { router as signOutRouter };
