const express = require("express");
const path = require("path");
const app = express();

// Render exige usar a porta que vem do ambiente
const PORT = process.env.PORT || 3000;

// Servir a pasta /public
app.use(express.static(path.join(__dirname, "public")));

// Rota principal -> index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
