import mongoose from 'mongoose';
import movie from './movieModels.js';
import user from './UserModel.js';

const { Schema, model } = mongoose;

const watchlistSchema = new Schema({
  title: { type: String },
  imdbId: { type: String, default: 'no_Id' },
  posterURL: { type: String, default: 'no_Url' },
  genre: { type: Array, default: 'no_Genre' },
  movieId: { type: Schema.Types.ObjectId, ref: movie },
  userId: { type: Schema.Types.ObjectId, ref: user },
  publishedAt: { type: Date, default: Date.now() },
  deletedAt: { type: Date, default: null },
});

const watchlistModel = model('watchlist_data', watchlistSchema);
export default watchlistModel;
