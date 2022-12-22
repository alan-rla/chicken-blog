const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cookieParser = require('cookie-parser');
const { urlencoded } = require('express');
const morgan = require('morgan');
const api = require('./routes');
const logger = require('./config/logger');
const boolParser = require('express-query-boolean');
const db = require('./models');
const cors = require('cors');
const {
  errorConverter,
  errorLogger,
  errorHandler,
} = require('./middlewares/error');

const { PORT } = process.env;

const app = express();

app.use(
  morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev', {
    stream: logger.stream,
  }),
);

app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'https://web-chicken-project-20z52flbynr1f6.gksl2.cloudtype.app/',
    ],
    credentials: true,
    optionsSuccessStatus: 200,
  }),
);

app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());
app.use(boolParser());

app.use('/', api);

app.use(errorLogger);
app.use(errorConverter);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`${PORT} 포트로 서버가 열렸습니다.`);
});

module.exports = app;
