const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

app.get('/search-ads', async (req, res) => {
  try {
    const token = process.env.FB_ACCESS_TOKEN; 
    const termo = req.query.termo; 
    
    // Chamada corrigida com parâmetros obrigatórios da API da Meta
    const resposta = await axios.get(`https://graph.facebook.com/v25.0/ads_archive`, {
      params: {
        search_terms: termo,
        ad_reached_countries: '['BR']', // Obrigatório para Brasil
        ad_type: 'POLITICAL_AND_ISSUE_ADS', // Tente isso ou 'ALL'
        access_token: token
      }
    });

    res.json(resposta.data);
  } catch (erro) {
    // Log do erro real para sabermos o que o Facebook está devolvendo
    console.error("Erro na API da Meta:", erro.response ? erro.response.data : erro.message);
    res.status(500).send("Erro ao buscar: " + (erro.response ? JSON.stringify(erro.response.data) : erro.message));
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log('Servidor rodando na porta ' + PORT));
