const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;
const key = 'e184e369df5b2ff6';

app.use(cors());

app.get('/api/moedas', async (req, res) => {
  const { symbol, pref = 'BRL' } = req.query;

  try {
    
    if (symbol) {
      
      // Endereço se for rodar localmente: http://localhost:3000/api/moedas?key=${key}&symbol=${symbol}&pref=${pref}
      const response = await
      axios.get(`https://coinlib.io/api/v1/coin?key=${key}&symbol=${symbol}&pref=${pref}`); //Mudar endereço
      return res.json(response.data);
    }

    
    const response = await 
    axios.get(`https://coinlib.io/api/v1/coinlist?key=${key}&pref=${pref}`); //Mudar endereço
    res.json(response.data);
  } catch (erro) {
    console.error('Erro no servidor:', erro.message);
    res.status(500).json({ error: 'Erro ao buscar dados da Coinlib' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
