// Gera o index.html (documento completo) a partir de cofre-ofertas.html,
// que é a fonte publicada como Artifact no claude.ai e não tem <!doctype>/<head>.
//   node montar.cjs
const fs = require("fs");
const path = require("path");

const fonte = fs.readFileSync(path.join(__dirname, "cofre-ofertas.html"), "utf8");
const doc = `<!doctype html>
<html lang="pt-BR">
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
${fonte}
</html>
`;
fs.writeFileSync(path.join(__dirname, "index.html"), doc);
console.log("index.html gerado");
