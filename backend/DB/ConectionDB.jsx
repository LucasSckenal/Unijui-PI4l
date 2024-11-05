const mysql = require("mysql2");

// Criar a conexão com o banco RDS
const connection = mysql.createConnection({
  host: "db-pi4l.c5262ow66s9k.us-east-1.rds.amazonaws.com",
  user: "QuatroLMaster",
  password: "4LsenhaTOP",
  database: "DBPI4L_SantaRosa",
});

// Conectar e buscar dados
connection.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao RDS:", err);
    return;
  }

  console.log("Conectado ao RDS!");

  // Fazer uma consulta
  connection.query("SELECT * k72623_lo", (err, results) => {
    if (err) throw err;

    // Transformar os dados em JSON
    const jsonData = JSON.stringify(results);
    console.log(jsonData);

    // Agora você pode usar os dados como JSON
    connection.end();
  });
});
