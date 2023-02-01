import express from 'express';
import addToWLValidation from '../middleware/addToWLValidation.js'
import emailValidation from '../middleware/emailValidation.js';
import movieValidation from '../middleware/movieValidation.js';
import userFieldValidation from '../middleware/userFieldValidation.js';
import userIdValidation from '../middleware/userIdValidation.js';
import watchListValidation from '../middleware/watchlistValidation.js';
import movie from '../models/movieModels.js';
import user from '../models/UserModel.js';
import watchlist from '../models/watchlist.js';

const router = express.Router();

router.route('/').post(userFieldValidation, emailValidation, async (request, resposne) => {
  const {  email, password } = request.body;

  const theUser = {  email, password, role: 'User' };

  await user.create(theUser);
  return resposne.status(201).json(theUser);
});

router.route('/movies/:title').post(movieValidation, addToWLValidation, async (request, response) => {
  const { _id, title, imdbId, genre, posterURL } = await movie.findOne({ title: request.params.title });
  const userId = request.header('x-usersid');

  await watchlist.create({ title, imdbId, genre, posterURL, movieId: _id, userId });
  return response.status(200).json({ message: 'added to watchlist' });
});

router.route('/watchlist').get(userIdValidation, async (request, response) => {
  const userId = request.header('x-usersid');
  return response.status(200).json(await watchlist.find({ deletedAt: null, userId }));
});

router.route('/watchlist/:title').get(watchListValidation, async (request, response) => {
  const { title } = request.params;
  const userId = request.header('x-usersid');

  return response.status(200).json(await watchlist.findOne({ userId, title }));
});

router.route('/watchlist/:title').delete(watchListValidation, async (request, response) => {
  const { title } = request.params;
  const userId = request.header('x-usersid');

  const theWatchlistId = await watchlist.findOne({ userId, deletedAt: null, title });

  await watchlist.updateOne({ _id: theWatchlistId['_id'] }, { deletedAt: Date.now() });
  return response.status(201).json({ message: `${request.params.title} has been Deleted` });
});

export default router;
