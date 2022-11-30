import express from 'express';
import process from 'node:process';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import adminUser from './routes/adminUser.js';
import themovies from './routes/movies.js';
import user from './routes/genUser.js';
import errors from './middleware/errors.js';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.set('port', PORT);

mongoose.connect(process.env.THE_DB);
mongoose.connection.on('connected', () => {
  console.log('MongoDB connected');
});

app.use(express.json());
app.use(cors());

app.use('/adminUser', adminUser);
app.use('/movies', themovies);
app.use('/user', user);

app.use(errors, (request, response) => {
  return response.status(404).json({
    error: 'Page Not Found',
  });
});

app.listen(PORT, () => {
  console.log(`App is listening to port: ${PORT}`);
});
