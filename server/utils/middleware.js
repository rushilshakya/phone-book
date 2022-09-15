const morgan = require("morgan");

const morganned = morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, "content-length"),
    "-",
    tokens["response-time"](req, res),
    "ms",
    ["POST", "PUT"].includes(req.method) ? JSON.stringify(req.body) : null,
  ].join(" ");
});

const unknownEndpoint = (request, response) => {
  return response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    console.log(error);
    return response
      .status(400)
      .send({ error: error.name, message: error.message });
  }

  next(error);
};

module.exports = {
  morganned,
  unknownEndpoint,
  errorHandler,
};
