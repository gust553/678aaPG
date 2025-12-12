const express = require("express");
const path = require("path");
const app = express();

const PORT = process.env.PORT || 10000;

// Permite a Render identificar o IP real do visitante
app.set("trust proxy", true);

// Servir os arquivos estáticos (HTML, CSS, imagens)
app.use(express.static(path.join(__dirname, "public")));

// Rota principal
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

// Tracker simples de cliques
app.get("/go", (req, res) => {
  console.log("CLICK:", {
    ip: req.ip,
    ua: req.headers["user-agent"]
  });

  res.redirect("https://www.678aapg.vip/?id=750701767");
});

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
