const express = require('express');

const fs = require('fs').promises;

const router = express.Router();

const path = require('path');

router.get('/', async (req, res) => {
  const data = await fs.readFile(path.resolve(__dirname, '../talker.json'), 'utf-8');
  const result = JSON.parse(data);
  return res.status(200).send(result);
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const data = await fs.readFile(path.resolve(__dirname, '../talker.json'), 'utf-8');
    const result = JSON.parse(data);
    const findResult = result.find((element) => Number(element.id) === Number(id));
    if 
    (findResult === undefined) {
    res.status(404).json({ 
        message: 'Pessoa palestrante não encontrada' }); 
}
    return res.status(200).send(findResult);
  });

module.exports = router;