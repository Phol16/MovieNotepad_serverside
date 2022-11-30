import mongoose from 'mongoose';
import adminUser from './UserModel.js';

const { Schema, model } = mongoose;

const movieSchema = new Schema({
  title: { type: String },
  imdbId: { type: String, default: 'no_Id' },
  posterURL: { type: String, default: 'no_Url' },
  genre: { type: Array, default: 'no_Genre' },
  authorId: { type: Schema.Types.ObjectId, ref: adminUser },
  publishedAt: { type: Date, default: Date.now },
  deletedAt: { type: Date, default: null },
});

const movieModel = model('movie_data', movieSchema);
export default movieModel;
