function logErrors(err, req, res, next) {
  console.error(err, 'lalala');
  next(err); // Pasar al siguiente middleware de manejo de errores
}

function logHandler(err, req, res, next) {
  if (err.boom) {
    const { output } = err;
    res.status(output.statusCode).json({
      mensaje: err.message,
      inf: output.payload,
    });
  } else {
    res.json({
      mensaje: err.message,
      inf: {
        statusCode: 500,
        error: 'Internal Server Error',
      },
    });
  }
}

function boomlogHandler(err, req, res, next) {
  if (err.boom) {
    // Cambiado de err.boom a err.isBoom para consistencia
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  } else {
    next(err); // Pasar al siguiente middleware de manejo de errores
  }
}
module.exports = { logErrors, logHandler, boomlogHandler };
