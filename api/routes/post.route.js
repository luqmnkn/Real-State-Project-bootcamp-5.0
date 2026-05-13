import express from 'express';

const router = express.Router();

router.get('/test', (req, res) => {
  res.send('This is the posts endpoint');
});

export default router;