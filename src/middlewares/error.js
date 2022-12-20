const logger = require('../config/logger');
const { ApiError } = require('../utils/apiError');

const errorLogger = (err, req, res, next) => {
  logger.log({ level: 'error', message: err.stack });
  next(err);
};

const errorConverter = (err, req, res, next) => {
  if (err instanceof ApiError) next(err);
  else if (err.isJoi) next(new ApiError(err.message, 401));
  else next(new ApiError('UNKNOWN ERROR', 500));
};

const errorHandler = (err, req, res, next) => {
  res.status(err.statusCode).json({ msg: err.message });
};

module.exports = { errorConverter, errorLogger, errorHandler };
