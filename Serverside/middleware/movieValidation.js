import movie from '../models/movieModels.js';

const movieValidation = async (request, response, next) => {
  if (request.query.search) {
    const movieValid = await movie.findOne({ title: request.query.search });
    if (!movieValid) {
      return response.status(400).json({ error: `${request.query.search} does not exist` });
    }
  }

  if (request.params.title) {
    const movieValid = await movie.findOne({ title: request.params.title });
    if (!movieValid) {
      return response.status(400).json({ error: `${request.params.title} does not exist` });
    }
  }

  if (request.params.genre) {
    const movieValid = await movie.findOne({ genre: request.params.genre });
    if (!movieValid) {
      return response.status(400).json({ error: `${request.params.genre} does not exist` });
    }
  }

  next();
};

export default movieValidation;
