require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const { errors } = require('celebrate');
const { errorHandler } = require('./errors/errors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { PORT, LOCALHOST } = require('./config');
const limiter = require('./middlewares/rateLimiter');
const router = require('./routes/index');

mongoose.connect(LOCALHOST);
mongoose.set('strictQuery', true);

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());

app.use(requestLogger);
app.use(limiter);
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT);
