const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

// Esta rota recebe o pedido do seu app Android
app.get('/search-ads', async (req, res) => {
  try {
    const token = process.env.FB_ACCESS_TOKEN; 
    const termo = req.query.termo; 
    
    // Chamada oficial para a API da Meta
    const resposta = await axios.get(`https://graph.facebook.com/v25.0/ads_archive`, {
      params: {
        search_terms: termo,
        access_token: token
      }
    });

    res.json(resposta.data);
  } catch (erro) {
    res.status(500).send("Erro ao buscar anúncios: " + erro.message);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Servidor rodando na porta ' + PORT));