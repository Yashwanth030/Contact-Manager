// errorHandler.js
const { constants } = require("../constants/constants");

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode || constants.SERVER_ERROR;
  const errorTitle = statusCode === constants.VALIDATION_ERROR ? "Validation Error" : "Error";

  res.status(statusCode).json({
    title: errorTitle,
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

module.exports = errorHandler;
