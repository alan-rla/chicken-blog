const logger = require('../config/logger');
const { ApiError } = require('../utils/apiError');

const errorLogger = (err, req, res, next) => {
  logger.log({ level: 'error', message: err.stack });
  next(err);
};

const errorConverter = (err, req, res, next) => {
  if (err instanceof ApiError) next(err);
  else if (err.isJoi) next(new ApiError('잘못된 요청입니다.', 400));
  else next(new ApiError('알 수 없는 오류입니다.', 500));
};

const errorHandler = (err, req, res, next) => {
  res.status(err.statusCode).json({ errorMessage: err.message });
};

module.exports = { errorConverter, errorLogger, errorHandler };
