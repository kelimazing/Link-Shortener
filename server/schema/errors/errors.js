exports.errorName = {
  UNAUTHORIZED: 'UNAUTHORIZED',
  INVALID_LONG_URL: 'INVALID_LONG_URL'
}

exports.errorType = {
  UNAUTHORIZED: {
    message: 'Invalid Base URL',
    statusCode: 401
  },
  INVALID_LONG_URL: {
    message: 'Invalid Long Url',
    statusCode: 401
  }
}