const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORTA = 3000;
const CHAVE = 'e184e369df5b2ff6';

app.use(cors());

app.get('/api/moedas', async (req, res) => {
  const { symbol, pref = 'BRL' } = req.query;

  try {
    if (symbol) {
      
      const resposta = await axios.get(
        `https://coinlib.io/api/v1/coin?key=${CHAVE}&symbol=${symbol}&pref=${pref}`
      );
      return res.json(resposta.data);
    }

    
    const resposta = await axios.get(
      `https://coinlib.io/api/v1/coinlist?key=${CHAVE}&pref=${pref}`
    );
    res.json(resposta.data);
  } catch (erro) {
    console.error('Erro no servidor:', erro.message);
    res.status(500).json({ error: 'Erro ao buscar dados da Coinlib' });
  }
});

app.listen(PORTA, () => {
  console.log(`Servidor rodando em http://localhost:${PORTA}`);
});
