const express = require('express');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuração do Supabase (use suas variáveis de ambiente)
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Middleware para interpretar JSON
app.use(express.json());

// Servir arquivos estáticos da pasta public
app.use(express.static(path.join(__dirname, 'public')));

// Rotas para páginas HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'index.html'));
});

app.get('/listar', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'listar.html'));
});

// Rota de confirmação (POST)
app.post('/api/confirmacao', async (req, res) => {
  const { nome, telefone, presenca } = req.body;

  // Inserir no Supabase
  const { data, error } = await supabase
    .from('convidados') // nome da tabela no Supabase
    .insert([{ nome, telefone, presenca }]);

  if (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao salvar no banco' });
  }

  res.json({ message: 'Confirmação recebida com sucesso!' });
});

// Rota para listar confirmações
app.get('/api/listar', async (req, res) => {
  const { data, error } = await supabase
    .from('convidados')
    .select('*');

  if (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao buscar convidados' });
  }

  res.json({ convidados: data });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
