import express from 'express';

// creating a router
const router = express.Router();

router.get('/api/users/currentuser', (req, res) => {
  res.send('Hi there!');
});

export { router as currentUserRouter };
