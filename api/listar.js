import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { data, error } = await supabase
      .from("confirmacoes")
      .select("*")
      .order("data", { ascending: false });

    if (error) {
      res.status(500).json({ message: "Erro ao buscar: " + error.message });
    } else {
      res.status(200).json(data);
    }
  } else {
    res.status(405).json({ error: "Método não permitido" });
  }
}
