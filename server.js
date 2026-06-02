
require('dotenv').config();
const express = require('express');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const PORT = process.env.PORT || 3000;

// Conexão com Supabase
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Página inicial
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'index.html'));
});

// Página listar
app.get('/listar', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'listar.html'));
});

// API confirmar
app.post('/api/confirmacao', async (req, res) => {
  const { nome, telefone, presenca } = req.body;
  console.log("Dados recebidos:", req.body);

  const presencaBool = presenca === true || presenca === "true";

  const { data, error } = await supabase
    .from('convidados')
    .insert([{ nome, telefone, presenca: presencaBool }]);

  if (error) {
    console.error("Erro Supabase:", error);
    return res.status(500).json({ message: 'Erro ao salvar: ' + error.message });
  }

  res.json({ message: 'Confirmação recebida com sucesso!' });
});

// API listar
app.get('/api/listar', async (req, res) => {
  const { data, error } = await supabase
    .from('convidados')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Erro Supabase:", error);
    return res.status(500).json({ message: 'Erro ao buscar: ' + error.message });
  }

  res.json({ convidados: data });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
