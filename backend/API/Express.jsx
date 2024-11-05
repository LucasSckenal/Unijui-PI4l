const express = require("express");
const mysql = require("mysql2");
const app = express();
const port = 4000;

// Configuração da conexão com o RDS
const connection = mysql.createConnection({
  host: "db-pi4l.c5262ow66s9k.us-east-1.rds.amazonaws.com",
  user: "QuatroLMaster",
  password: "4LsenhaTOP",
  database: "DBPI4L_SantaRosa",
});

// Endpoint para pegar dados do banco
app.get("/dados", (req, res) => {
  connection.query("SELECT * FROM nit2xli", (err, results) => {
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
