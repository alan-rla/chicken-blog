const Joi = require('joi');

// 회원가입 JOI 검증
exports.registerSchema = Joi.object().keys({
  account: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,15}$'))
    .required()
    .messages({
      'string.pattern.base':
        '아이디는 3자 이상 15자 이하의 영어 대소문자 및 숫자를 입력하십시오.',
      'any.required': '아이디를 입력하십시오.',
    }),
  nickname: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9각-힣]{3,15}$'))
    .required()
    .messages({
      'string.pattern.base':
        '닉네임은 3자 이상 20자 이하의 영어 대소문자, 숫자 및 한글을 입력하십시오.',
      'any.required': '닉네임을 입력하십시오.',
    }),
  password: Joi.string().min(4).max(20).required().messages({
    'string.empty': '비밀번호를 입력하십시오.',
    'string.min': '비밀번호를 4글자 이상 입력하십시오.',
    'string.max': '비밀번호를 20글자 이하 입력하십시오.',
    'any.required': '비밀번호를 입력하십시오.',
  }),
  confirm: Joi.valid(Joi.ref('password')).required().messages({
    'string.empty': '비밀번호 확인을 입력하십시오.',
    'any.required': '비밀번호 확인을 입력하십시오.',
    'any.only': '비밀번호가 일치하지 않습니다.',
  }),
});

// 로그인 JOI 검증
exports.loginSchema = Joi.object().keys({
  account: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,15}$'))
    .required()
    .messages({
      'string.pattern.base':
        '아이디는 3자 이상 15자 이하의 영어 대소문자 및 숫자를 입력하십시오.',
      'any.required': '아이디를 입력하십시오.',
    }),

  password: Joi.string().min(4).max(20).required().messages({
    'string.empty': '비밀번호를 입력하십시오.',
    'string.min': '비밀번호를 4글자 이상 입력하십시오.',
    'string.max': '비밀번호를 20글자 이하 입력하십시오.',
    'any.required': '비밀번호를 입력하십시오.',
  }),
});
