const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const UnauthorizedError = require('../errors/UnauthorizedError');

const userSchema = new mongoose.Schema(
  {
    name: {
      required: false,
      default: 'Имя пользователя',
      type: String,
      validate: {
        validator: ({ length }) => length >= 2 && length <= 30,
        message: 'Имя пользователя должно быть длиной от 2 до 30 символов',
      },
    },

    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (email) => /.+@.+\..+/.test(email),
        message: 'Введите корректный URL адрес',
      },
    },

    password: {
      type: String,
      required: true,
      select: false,
      validate: {
        validator: ({ length }) => length >= 6,
        message: 'Пароль должен состоять минимум из 6 символов',
      },
    },
  },

  {
    // versionKey: false,
    statics: {
      findUserByCredentials(email, password) {
        return this.findOne({ email })
          .select('+password')
          .then((user) => {
            if (user) {
              return bcrypt.compare(password, user.password).then((matched) => {
                if (matched) return user;
                return Promise.reject(
                  new UnauthorizedError('Необходима авторизация'),
                );
              });
            }
            return Promise.reject(
              new UnauthorizedError('Необходима авторизация'),
            );
          });
      },
    },
  },
);

module.exports = mongoose.model('user', userSchema);
