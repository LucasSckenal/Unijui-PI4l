const express = require("express");
const mysql = require("mysql2");
const app = express();
const port = 3000;

// Configuração da conexão com o RDS
const connection = mysql.createConnection({
  host: "",
  user: "",
  password: "",
  database: "",
});

// Endpoint para pegar dados do banco
app.get("/dados", (req, res) => {
  connection.query("SELECT * FROM your_table", (err, results) => {
    if (err) {
      res.status(500).json({ error: "Erro ao buscar dados" });
      return;
    }

    // Enviar dados como JSON
    res.json(results);
  });
});

// Inicializar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
