const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Servir arquivos estáticos da pasta public
app.use(express.static(path.join(__dirname, 'public')));

// Rotas para páginas HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'index.html'));
});

app.get('/listar', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'listar.html'));
});

// Rotas de API
app.get('/api/confirmacao', (req, res) => {
  res.send({ status: 'ok', message: 'Confirmação recebida!' });
});

app.get('/api/listar', (req, res) => {
  res.send({ status: 'ok', message: 'Listagem feita!' });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
