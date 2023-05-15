require('dotenv').config();

const { NODE_ENV } = process.env;
const { PORT = '3001' } = process.env;
const { JWT_SECRET } = process.env;
const { LOCALHOST = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;

module.exports = {
  NODE_ENV,
  PORT,
  LOCALHOST,
  JWT_SECRET,
};
