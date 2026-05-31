const express = require('express');
const axios = require('axios');
const app = express();

app.get('/search-ads', async (req, res) => {
  const token = process.env.FB_ACCESS_TOKEN;
  const termo = req.query.termo;

  if (!token) return res.status(500).send("Token não configurado no servidor.");
  if (!termo) return res.status(400).send("Faltou o parâmetro 'termo'.");

  try {
    const resposta = await axios.get(`https://graph.facebook.com/v25.0/ads_archive`, {
      params: {
        search_terms: termo,
        ad_reached_countries: '["BR"]',
        ad_type: 'POLITICAL_AND_ISSUE_ADS',
        access_token: token
      }
    });
    res.json(resposta.data);
  } catch (erro) {
    res.status(500).send("Erro na API da Meta: " + (erro.response ? JSON.stringify(erro.response.data) : erro.message));
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log('Servidor rodando na porta ' + PORT));
