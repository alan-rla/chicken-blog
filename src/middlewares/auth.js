const jwt = require('jsonwebtoken');
const { ApiError } = require('../utils/apiError');
const { JWT_SECRET } = process.env;

const isLoggedIn = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization)
      return next(new ApiError('로그인이 필요한 기능입니다.', 401));

    const [authType, authToken] = authorization.split(' ');
    if (authType !== 'Bearer') throw new ApiError('잘못된 요청입니다', 400);

    try {
      res.locals = jwt.verify(authToken, JWT_SECRET);
      next();
    } catch {
      next(new ApiError('로그인이 필요한 기능입니다.', 401));
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
    if (authType !== 'Bearer') throw new ApiError('잘못된 요청입니다', 400);

    try {
      jwt.verify(authToken, JWT_SECRET);
      next(new ApiError('이미 로그인이 되어있습니다.', 400));
    } catch {
      next();
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { isLoggedIn, isNotLoggedIn };
