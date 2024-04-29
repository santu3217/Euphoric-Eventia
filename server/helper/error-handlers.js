export default class CustomError extends Error {
    constructor(message, code) {
      super(message);
      this.name = 'Error';
      this.code = code;
      Error.captureStackTrace(this, CustomError);
    }
  }