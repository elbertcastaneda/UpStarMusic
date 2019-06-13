const mongoose = require('mongoose');
const AlbumSchema = require('./album');

const { Schema } = mongoose;

const ArtistSchema = new Schema({
  name: String,
  age: Number,
  yearsActive: Number,
  image: String,
  genre: String,
  website: String,
  netWorth: Number,
  labelName: String,
  retires: Boolean,
  albums: [AlbumSchema],
});

ArtistSchema.index({ name: 'text', labelName: 'text' });

const Artist = mongoose.model('artist', ArtistSchema);

module.exports = Artist;
