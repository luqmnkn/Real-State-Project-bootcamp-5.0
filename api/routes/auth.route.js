import express from 'express';

const router = express.Router();

router.post('/register', (req, res) => {
  res.send('This is the posts endpoint');
});

router.post('/login', (req, res) => {
  res.send('This is the posts endpoint');
});

router.post('/logout', (req, res) => {
  res.send('This is the posts endpoint');
});

export default router;