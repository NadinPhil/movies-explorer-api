const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
require('dotenv').config();
const { userRoutes } = require('./routes/users');
const { movieRoutes } = require('./routes/movies');
const { signRoutes } = require('./routes/sign');
const { auth } = require('./middlewares/auth');
const { errorHandler } = require('./middlewares/errorHandler');
const NotFoundError = require('./errors/not-found-error');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000, DB_DATABASE } = process.env;

const app = express();

app.use(cors());

app.use(express.json());

app.use(requestLogger);

app.use('/', signRoutes);

app.use(auth);

app.use('/', userRoutes);
app.use('/', movieRoutes);

app.use((req, res, next) => {
  next(new NotFoundError('Маршрут не найден'));
});

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

async function main() {
  await mongoose.connect(DB_DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log('CONNECTED!');

  await app.listen(PORT);

  console.log(`App listening on port ${PORT}`);
}
main();
