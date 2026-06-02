import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { nome, telefone, presenca } = req.body;

    const { error } = await supabase
      .from("confirmacoes")
      .insert([
        {
          nome,
          telefone,
          presenca: presenca ? "Confirmado" : "Não confirmado"
        }
      ]);

    if (error) {
      res.status(500).json({ message: "Erro ao salvar: " + error.message });
    } else {
      res.status(200).json({ message: "Confirmação salva com sucesso!" });
    }
  } else {
    res.status(405).json({ error: "Método não permitido" });
  }
}
