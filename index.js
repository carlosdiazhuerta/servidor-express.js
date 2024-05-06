const express = require('express');
const app = express();
const port = 3000;
app.get('/', (req, res) => {
  res.send('holaaa');
});

app.listen(port, () => {
  console.log('estoy escuchando el puerto ' + port);
});
