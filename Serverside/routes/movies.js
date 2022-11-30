import express from 'express';
import movieValidation from '../middleware/movieValidation.js';
import movie from '../models/movieModels.js';

const router = express.Router();

router.route('/').get(movieValidation, async (request, response) => {
  const { search } = request.query;
  if (search) {
    return response.status(200).json(await movie.findOne({ deletedAt: null, title: search }));
  }
  return response.status(200).json(await movie.find({ deletedAt: null }).sort({ publishedAt: -1 }));
});

router.route('/:genre').get(movieValidation, async (request, response) => {
  const { genre } = request.params;
  return response.status(200).json(await movie.find({ deletedAt: null, genre }).sort({ publishedAt: -1 }));
});

router.route('/:genre/:title').get(movieValidation, async (request, response) => {
  const { title, genre } = request.params;
  return response.status(200).json(await movie.findOne({ genre, title }));
});

export default router;
