const express = require('express');
const routerApi = require('./routers/index');
const {
  logErrors,
  logHandler,
  boomlogHandler,
} = require('./middelware/error.handler');

const app = express();
app.use(express.json());
const port = 3000;

routerApi(app);
app.listen(port, () => {
  console.log('estoy escuchando el puerto ' + port);
});

app.use(logErrors);
app.use(boomlogHandler);
app.use(logHandler);
