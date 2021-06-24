import express from "express";

import { currentUser } from "../middlewares/current-user";

const router = express.Router();

// api for getting the current user
router.get("/api/users/currentuser", currentUser, (req, res) => {
  // if (!req.session?.jwt) {
  //   // !req.session || !req.session.jwt
  //   return res.send({ currentUser: null });
  // }

  // try {
  //   const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!);
  //   res.send({ currentUser: payload });
  // } catch (err) {
  //   res.send({ currentUser: null });
  // }
  res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
