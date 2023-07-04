const ERROR_BAD_REQUEST = 400;
const ERROR_UNAUTHORIZED = 401;
const ERROR_FORBIDDEN = 403;
const ERROR_NOT_FOUND = 404;
const ERROR_CONFLICT = 409;
const STATUS_CREATED = 201;

function errorHandler(error, req, res, next) {
  const statusCode = error.statusCode || 500;
  res.status(statusCode)
    .send({ message: statusCode === 500 ? 'На сервере произошла ошибка' : error.message });
  next();
}

module.exports = {
  ERROR_BAD_REQUEST,
  ERROR_FORBIDDEN,
  ERROR_UNAUTHORIZED,
  ERROR_NOT_FOUND,
  ERROR_CONFLICT,
  STATUS_CREATED,
  errorHandler,
};
