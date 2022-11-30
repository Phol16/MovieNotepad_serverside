import movie from '../models/movieModels.js';
import watchlist from '../models/watchlist.js';

const addToWLValidation = async (request, response, next) => {
  const userId = request.header('x-usersid');
  const { _id } = await movie.findOne({ title: request.params.title });
  const theWL = await watchlist.find({ userId }).findOne({ deletedAt: null, title: request.params.title });

  if (!theWL) {
    return next();
  }
  if (theWL.movieId.equals(_id)) {
    return response.status(200).json({ error: `${request.params.title} already exist in watchlist` });
  }

  next();
};

export default addToWLValidation;
