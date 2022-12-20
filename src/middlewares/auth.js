const jwt = require('jsonwebtoken');
const { ApiError } = require('../utils/apiError');
const { JWT_SECRET } = process.env;

const isLoggedIn = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) return next(new ApiError('LOGIN REQUIRED', 401));

    const [authType, authToken] = authorization.split(' ');
    if (authType !== 'Bearer') throw new ApiError('WRONG REQUEST', 400);

    try {
      res.locals = jwt.verify(authToken, JWT_SECRET);
      next();
    } catch {
      next(new ApiError('LOGIN REQUIRED', 401));
    }
  } catch (err) {
    next(err);
  }
};

const isNotLoggedIn = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) return next();

    const [authType, authToken] = authorization.split(' ');
    if (authType !== 'Bearer') throw new ApiError('WRONG REQUEST', 400);

    try {
      jwt.verify(authToken, JWT_SECRET);
      next(new ApiError('ALREADY LOGGED IN', 400));
    } catch {
      next();
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { isLoggedIn, isNotLoggedIn };
