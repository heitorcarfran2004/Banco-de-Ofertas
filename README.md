# Cofre de Ofertas

Webapp instalável (PWA) para cadastrar ofertas de low ticket por situação — **Ativa, Desativada,
Em andamento e Segundo plano** — com relatório mensal de faturamento, lucro e
gasto em anúncios, e um bloco de notas para ideias soltas.

## Telas

- **Entrar / Criar conta** — login por e-mail e senha (Supabase Auth). Cada conta vê só os
  próprios dados (RLS no banco).
- **Início** — relatório do mês (lucro, faturamento, anúncios, ROAS, vendas, comparação com
  o mês anterior), gráfico mês a mês, divisão por oferta, cards das ofertas ativas e, abaixo,
  as desativadas, em andamento e em segundo plano.
- **Ofertas** — lista por situação, busca e a ficha de cada oferta: nicho, preço, formato,
  **mês a mês** (alimenta o relatório), links, vídeos, dados e informações.
- **Ideias** — notas com título; uma ideia vira oferta "Em andamento" com um toque, e uma oferta pode voltar a rascunho.

## Stack

Um `index.html` sem build: HTML, CSS e JS puros + `@supabase/supabase-js` pelo jsDelivr.

- `manifest.webmanifest` e `icons/` — instalação na tela inicial
- `sw.js` — guarda a casca do app para abrir rápido e sem internet (dados nunca vão para o cache)
- `vercel.json` — `sw.js` sem cache e o tipo certo do manifest

## Supabase

Projeto `banco-de-ofertas` (região São Paulo). Tabelas `ofertas` e `ideias`:
`user_id` (dono), `id`, `dados` (jsonb com a ficha inteira), `criado_em`, `atualizado_em`.
RLS liga cada linha ao `auth.uid()`; o papel `anon` não lê nada. Realtime ligado nas duas
tabelas — o que muda no celular aparece no computador.

A chave no `index.html` é a **publishable** (feita para ficar no navegador). Nunca coloque a
service role aqui.

## Deploy

Importar este repositório na Vercel (framework: *Other*, sem build). Depois, no Supabase,
em **Authentication → URL Configuration**, pôr a URL da Vercel em *Site URL* e em
*Redirect URLs* — é para lá que o link de confirmação de cadastro manda.

Rodar local: qualquer servidor estático na pasta (ex.: `npx serve .`).
