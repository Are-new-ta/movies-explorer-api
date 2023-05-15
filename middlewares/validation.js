const { celebrate, Joi } = require('celebrate');

// регулярные выражения для валидации полей
const EMAIL_VALIDATION = /.+@.+\..+/;
const PASSWORD_VALIDATION = /^(?=.*[A-z])(?=.*\d)(?=.*[!@#$%^&*])(?=.{8,})/;
const URL_VALIDATION = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

// валидация регистрации
const signupValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required().pattern(PASSWORD_VALIDATION),
  }),
});

// валидация входа/логина
const signinValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().pattern(PASSWORD_VALIDATION),
  }),
});

// валидация при обновлении данных пользователя
const userUpdateValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().pattern(EMAIL_VALIDATION),
    name: Joi.string().required().min(2).max(30),
  }),
});

// валидация полей созданного фильма
const movieValidator = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(URL_VALIDATION),
    trailerLink: Joi.string().required().pattern(URL_VALIDATION),
    thumbnail: Joi.string().required().pattern(URL_VALIDATION),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

// валидация при удалении фильма
const deleteMovieValidator = celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex().required(),
  }),
});

module.exports = {
  EMAIL_VALIDATION,
  PASSWORD_VALIDATION,
  URL_VALIDATION,
  signupValidator,
  signinValidator,
  userUpdateValidator,
  movieValidator,
  deleteMovieValidator,
};
