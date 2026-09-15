// Service worker do Cofre de Ofertas: guarda a casca do app para abrir rápido e sem internet.
// Os dados (Supabase) nunca passam pelo cache — sempre vão direto para a rede.
const VERSAO = "cofre-v8";
const CASCA = ["./", "index.html", "manifest.webmanifest", "icons/icon.svg", "icons/icon-192.png", "icons/icon-512.png", "icons/apple-touch-icon.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSAO).then(c => c.addAll(CASCA)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(chaves => Promise.all(chaves.filter(k => k !== VERSAO).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.hostname.endsWith("supabase.co")) return;

  // Página: rede primeiro (pega versão nova), cache se estiver sem internet.
  if (req.mode === "navigate") {
    e.respondWith(
      fetch(req)
        .then(res => { const copia = res.clone(); caches.open(VERSAO).then(c => c.put("index.html", copia)); return res; })
        .catch(() => caches.match("index.html"))
    );
    return;
  }

  // Arquivos estáticos, fontes e a biblioteca do Supabase: cache primeiro, atualiza por trás.
  const estatico = url.origin === location.origin || url.hostname === "cdn.jsdelivr.net" || url.hostname.endsWith("gstatic.com") || url.hostname === "fonts.googleapis.com";
  if (!estatico) return;
  e.respondWith(
    caches.match(req).then(emCache => {
      const rede = fetch(req).then(res => {
        if (res && (res.ok || res.type === "opaque")) { const copia = res.clone(); caches.open(VERSAO).then(c => c.put(req, copia)); }
        return res;
      }).catch(() => emCache);
      return emCache || rede;
    })
  );
});
