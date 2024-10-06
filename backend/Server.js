const express = require("express");
const path = require("path");
const app = express();
const port = 5173;

app.get("/", (req, res) => {
  res.send("Hello, world!");
});
// Middleware para servir arquivos estáticos
app.use(express.static(path.join(__dirname, "../FrontEnd/dist"))); // Use 'dist' para Vite

// Rota para servir o index.html
app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "../FrontEnd/dist", "index.html"));
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
