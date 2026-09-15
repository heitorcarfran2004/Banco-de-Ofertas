# Cofre de Ofertas

App para cadastrar as ofertas de low ticket por situação — **Ativa, Testada, Em andamento,
Em projeto e Segundo plano** — e um bloco de notas para ideias soltas.

Cada oferta guarda nome, nicho, preço, formato, links (página, checkout, referência,
entregável), vídeos sobre o conteúdo, dados e números, e um campo livre de informações.
Uma ideia vira oferta "Em projeto" com um toque.

## Onde roda

- **claude.ai (Artifact):** a versão principal. Os dados ficam no banco do próprio
  Artifact e sincronizam entre celular e computador.
- **Fora do claude.ai** (abrir o `index.html`, Vercel, GitHub Pages): o app funciona igual,
  mas salva só no navegador (localStorage) — o indicador mostra "Salvo só neste navegador".

Nenhum dado de oferta fica neste repositório.

## Arquivos

- `cofre-ofertas.html` — fonte, publicada como Artifact (sem `<!doctype>`/`<head>`, o
  claude.ai adiciona)
- `index.html` — gerado; documento completo para abrir direto ou hospedar
- `montar.cjs` — gera o `index.html`: `node montar.cjs`

Editou a fonte? Rode `node montar.cjs` antes de commitar.
