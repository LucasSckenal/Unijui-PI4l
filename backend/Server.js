const express = require("express");
const app = express();
const port = 5173;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

// Iniciar o servidor
// node server.js
// na pasta do backend
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
