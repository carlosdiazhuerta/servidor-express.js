const express = require('express');
const routerApi = require('../api/routers/index');
const cors = require('cors');
const {
  logErrors,
  logHandler,
  boomlogHandler,
} = require('./middelware/error.handler');

const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 3000;

app.get('/api', (req, res) => {
  res.send('holaa soy una ruta, esta solo es una practica con express');
});

routerApi(app);
app.listen(port, () => {
  console.log('estoy escuchando el puerto ' + port);
});

app.use(logErrors);
app.use(boomlogHandler);
app.use(logHandler);
