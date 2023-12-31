const express = require('express');
const readFile = require('./utils/readFile');
const generateToken = require('./utils/generateToken');
const validateLogin = require('./middlewares/validateLogin');
const writeFile = require('./utils/writeFile');
const valAuth = require('./middlewares/valAuth');
const valName = require('./middlewares/valName');
const valAge = require('./middlewares/valAge');
const { valTalk, valRate } = require('./middlewares/valTalk');

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

app.get('/talker', async (_req, res) => {
  const talkers = await readFile();
  res.status(200).json(talkers);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talkers = await readFile();
  const talkerId = talkers.find((talker) => talker.id === Number(id));
  if (!talkerId) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(200).json(talkerId);
});

app.post('/login', validateLogin, (_req, res) => {
  const token = generateToken();
  return res.status(200).json({ token });
});

app.post('/talker', valAuth, valName, valAge, valTalk,
  valRate, async (req, res) => {
  const { name, age, talk: { watchedAt, rate } } = req.body;
  const talkers = await readFile();
  const newTalker = { id: talkers.length + 1, name, age, talk: { watchedAt, rate } };
  talkers.push(newTalker);
  await writeFile(talkers);

  return res.status(201).json(newTalker);
});

app.put('/talker/:id', valAuth, valName, valAge, valTalk,
  valRate, async (req, res) => {
  const { id } = req.params;
  const { name, age, talk: { watchedAt, rate } } = req.body;
  const talkers = await readFile();
  const index = talkers.findIndex((talker) => talker.id === Number(id));
  if (!talkers[index]) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  talkers[index] = { id: Number(id), name, age, talk: { watchedAt, rate } };
  await writeFile(talkers);
  return res.status(200).json(talkers[index]);
});

app.delete('/talker/:id', valAuth, async (req, res) => {
  const { id } = req.params;
  const talkers = await readFile();
  const filterTalkers = talkers.filter((element) => element.id !== Number(id));
  const upTalkers = JSON.stringify(filterTalkers, null, 2);
  await writeFile(upTalkers);
  return res.status(204).end();
});

app.get('/talker/search', valAuth, async (req, res) => {
  const { q } = req.query;
  const talkers = await readFile();
  const filterTalkers = talkers.filter((element) => element.name.includes(q));
  return res.status(200).json(filterTalkers);
});