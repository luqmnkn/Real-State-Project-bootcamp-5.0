import express from 'express';
import dotenv from 'dotenv';
import authRoute from './routes/auth.route.js';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
dotenv.config();


app.use('/api/auth', authRoute);



app.get("/health", (req, res) => {
  res.send("This is a test endpoint");
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});