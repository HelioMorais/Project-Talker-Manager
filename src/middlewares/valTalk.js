const valRate = (req, res, next) => {
    const { talk } = req.body;
    if (talk.rate === undefined) {
      return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
    }
  
    if (!(Number.isInteger(talk.rate)) || talk.rate < 1 || talk.rate > 5) {
      return res.status(400)
        .json({ message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' });
    }
    next();
  };
  
  const valTalk = (req, res, next) => {
    const { talk } = req.body;
   if (talk === undefined) return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
  
    if (talk.watchedAt === undefined) {
      return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
    }
  
    if (!(/^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i.test(talk.watchedAt))) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
    }
  
    next();
  };
  
  module.exports = { valTalk, valRate };