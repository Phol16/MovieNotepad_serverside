import watchlist from '../models/watchlist.js';

const watchListValidation = async (request, response, next) => {
  const userId = request.header('x-usersid');

  if (request.params.title) {
    const theWatchList = await watchlist.findOne({ userId, deletedAt: null, title: request.params.title });
    if (!theWatchList) {
      return response.status(400).json({ error: `${request.params.title} does not exist` });
    }
  }

  next();
};

export default watchListValidation;
