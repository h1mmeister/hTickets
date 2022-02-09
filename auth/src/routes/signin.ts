import express from 'express';

// creating a router
const router = express.Router();

router.post('/api/users/signin', (req, res) => {
  res.send('Hi there!');
});

export { router as signInRouter };
