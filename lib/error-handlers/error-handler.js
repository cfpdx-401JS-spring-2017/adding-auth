//eslint-disable-next-line no-console
function getErrorHandler(log = console.log) {
  // eslint-disable-next-line no-unused-vars  
  return function errorHandler(err, req, res, next) {

    let code, error;

    // mongoose validation and cast errors
    if (err.name === 'ValidationError') {
      code = 400;
      error = Object.values(err.errors).map(validErrors => validErrors.message);
    }

    else if (err.code) {
      /* 
        by convention, we pass in an object
        with a code property === http statusCode
        and a error property === message to display
      */

      code = err.code;
      error = err.error;
    }
    //unknown error
    else {
      code = 500;
      error = 'Internal Server Error';

      log(err);
    }

    res.status(code).send({ error });
  };
}

module.exports = getErrorHandler;