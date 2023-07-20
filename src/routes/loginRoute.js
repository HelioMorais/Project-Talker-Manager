const express = require('express');

const token = require('../utils/token');

const routerLogin = express.Router();

routerLogin.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    if ([email, password].includes(undefined)) {
      return res.status(401).json({ message: 'Campos ausentes!' });
    }
  
    const tokens = token();
  
    return res.status(200).json({ tokens });
  });

module.exports = routerLogin;