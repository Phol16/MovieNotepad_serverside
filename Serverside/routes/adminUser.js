import express from 'express';
import adminUser from '../models/UserModel.js';
import movie from '../models/movieModels.js';
import emailValidation from '../middleware/emailValidation.js';
import adminIdValidation from '../middleware/adminIdValidation.js';
import userFieldValidation from '../middleware/userFieldValidation.js';
import movieFieldValidation from '../middleware/movieFieldValidation.js';
import emailFieldValidation from '../middleware/emailFieldValidation.js';

const router = express.Router();

router.route('/').post(userFieldValidation, emailValidation, async (request, resposne) => {
  const { email, password } = request.body;

  const theAdminUser = { email, password, role: 'admin_User' };

  await adminUser.create(theAdminUser);
  return resposne.status(201).json(theAdminUser);
});

router.route('/').get(emailFieldValidation, async (request, response) => {
  const { Email } = request.query;

  const theAdminUser = await adminUser.findOne({ email: Email });

  return response.status(200).json({ theAdminUser });
});

router.route('/movies').post(movieFieldValidation, async (request, response) => {
  const { title, imdbId, genre, posterURL } = request.body;
  const authorId = request.header('x-usersid');

  const theMovie = { title, imdbId, genre, posterURL, authorId };

  await movie.create(theMovie);
  return response.status(201).json(theMovie);
});

router.route('/movies/:title').patch(adminIdValidation, async (request, response) => {
  const { title, imdbId, genre, posterURL } = request.body;
  const theTitle = request.params.title;
  const authorId = request.header('x-usersid');

  const theMovieId = await movie.findOne({ authorId, deletedAt: null, title: theTitle });

  await movie.updateOne({ _id: theMovieId['_id'] }, { title, imdbId, genre, posterURL });
  return response.status(201).json({ message: `${request.params.title} has been Updated` });
});

router.route('/movies/:title').delete(adminIdValidation, async (request, response) => {
  const { title } = request.params;
  const authorId = request.header('x-usersid');

  const theMovieId = await movie.findOne({ authorId, deletedAt: null, title });

  await movie.updateOne({ _id: theMovieId['_id'] }, { deletedAt: Date.now() });
  return response.status(201).json({ message: `${request.params.title} has been Deleted` });
});

export default router;
