const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;

const movieSchema = new mongoose.Schema(
  {
    country: {
      required: true,
      type: String,
      default: 'country',
    },

    director: {
      required: true,
      type: String,
    },

    duration: {
      required: true,
      type: Number,
    },

    year: {
      required: true,
      type: String,
    },

    description: {
      required: true,
      type: String,
    },

    image: {
      required: true,
      type: String,
      validate: {
        validator: (url) => /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/.test(url),
        message: 'Введите корректный URL адрес',
      },
    },

    trailerLink: {
      required: true,
      type: String,
      validate: {
        validator: (url) => /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/.test(url),
        message: 'Введите корректный URL адрес',
      },
    },

    thumbnail: {
      required: true,
      type: String,
      validate: {
        validator: (url) => /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/.test(url),
        message: 'Введите корректный URL адрес',
      },
    },

    owner: {
      required: true,
      type: ObjectId,
      ref: 'user',
    },

    movieId: {
      required: true,
      type: Number,
    },

    nameRU: {
      required: true,
      type: String,
    },

    nameEN: {
      required: true,
      type: String,
    },
  },
);

module.exports = mongoose.model('card', movieSchema);
