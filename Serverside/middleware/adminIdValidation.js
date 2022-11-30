import movie from '../models/movieModels.js';

const adminIdValidation = async (request, response, next) => {
  const authorId = request.header('x-usersid');
  const { title } = request.params;

  const idValid = await movie.find({ authorId }).findOne({ title });

  if (!idValid) {
    return response.status(404).json({ error: `No Movie published with title:${title}` });
  }

  next();
};

export default adminIdValidation;
