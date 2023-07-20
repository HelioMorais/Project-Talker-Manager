const express = require('express');
const talkerRoutes = require('./routes/talkerRoutes');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

// não remova esse endpoint, e para o avaliador funcionaaar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});


app.listen(PORT, () => {
  console.log('Online');
});

app.use('/talker', talkerRoutes);