# DOC International Business — Site Institucional

Site institucional estático para a **DOC International Business Ltda.**,
consultoria e assessoria em comércio exterior (importação, exportação e
outsourcing de operações internacionais).

**Stack:** HTML + CSS + JavaScript puro. Sem build, sem framework, sem
dependência nenhuma pra instalar. 100% estático — funciona em qualquer
hospedagem, inclusive as gratuitas (Netlify, Vercel, GitHub Pages).

---

## Por que uma página só (com âncoras)?

Uma `index.html` só, com seções navegadas por âncoras (`#sobre`,
`#mercados`, `#servicos`, `#logistica`, `#outsourcing`, `#contato`), em vez
de páginas separadas por assunto. Motivos:

- **O visitante-alvo (decisor de compras/operações de outra empresa) quer
  entender a oferta inteira rápido**, sem navegar entre páginas — rolar e
  ver "quem é, onde atua, o que faz, como falar com alguém" em uma sequência
  só é o padrão que mais converte para esse tipo de site institucional B2B.
- **O botão de WhatsApp e o menu ficam sempre a um scroll de distância**,
  não importa em qual seção o visitante esteja.
- **Menos arquivos, menos chance de inconsistência** entre menu/rodapé/SEO
  duplicados em várias páginas.
- Nada impede adicionar páginas extras depois (ex: uma página de Política de
  Privacidade, ou uma página por serviço) — é só criar `outra-pagina.html`
  ao lado do `index.html`; a estrutura atual não bloqueia isso.

---

## Estrutura de pastas

```
doc-international-business/
├── index.html              → todo o conteúdo do site (seções comentadas)
├── css/
│   └── style.css            → TODO o visual: cores, fontes, layout, animações
├── js/
│   └── main.js                → menu mobile, scroll reveal, abas de serviços,
│                                  contador animado, ano do rodapé
├── images/
│   ├── logo-marca.png            → logo oficial (recortada do cartão, fundo
│   │                                transparente) — cabeçalho e Sobre
│   ├── logo-marca-branca.png      → mesma logo, recolorida em branco, usada
│   │                                sobre fundos escuros (rodapé)
│   ├── logo-marca-quadrado.png      → logo com padding, canvas quadrado —
│   │                                  só serve de base pros favicons
│   ├── favicon.png                    → favicon (192×192, gerado a partir da logo)
│   ├── apple-touch-icon.png            → ícone para tela inicial (iOS)
│   ├── favicon-512.png                  → versão em alta resolução do ícone
│   ├── og-image.jpg                      → imagem de preview ao compartilhar o link
│   └── flags/                              → bandeiras SVG dos 30 mercados (seção 2.4)
└── README.md                → este arquivo
```

Não há fotografias de banco de imagens no projeto — o visual é 100%
gráfico (gradiente em azul-marinho + rede de pontos/linhas em SVG,
simbolizando conexão internacional), o que evita depender de fotos de
stock genéricas e mantém o site leve. As bandeiras em `images/flags/`
são arquivos SVG locais (não um link ao vivo pra CDN nenhuma) do pacote
open source [flag-icons](https://github.com/lipis/flag-icons) (licença
MIT, uso comercial livre) — o site continua 100% autocontido.

---

## 1. Como abrir e testar localmente

Não precisa instalar nada.

### Opção A — abrir direto (mais simples)

Dê duplo clique no arquivo `index.html`. Ele abre no seu navegador padrão e
funciona 100% (é só HTML/CSS/JS, sem chamadas de servidor).

### Opção B — servidor local (recomendado antes de publicar)

```powershell
cd caminho\para\doc-international-business
python -m http.server 8000
```

Depois acesse `http://localhost:8000`. `Ctrl+C` no terminal para parar.

Se preferir e usa VS Code, a extensão **Live Server** faz a mesma coisa com
um clique direito em `index.html` → "Open with Live Server".

---

## 2. Customização

### 2.1. Cores (1 arquivo só: `css/style.css`)

Abra `css/style.css`, bloco `:root` no topo do arquivo:

```css
:root {
  --cor-primaria: #12377a;      /* azul-marinho: títulos, botões, ícones */
  --cor-primaria-escura: #0a1a40;
  --cor-dourado: #b08d4c;       /* detalhe premium, usar com moderação */
  --cor-fundo-alt: #f4f6f9;     /* cinza muito claro das seções alternadas */
  ...
}
```

Troque só esses valores hexadecimais — o resto do site (botões, ícones,
sombras, hover, faixa de outsourcing) se ajusta sozinho, porque tudo
referencia essas variáveis.

### 2.2. Fontes

O site usa **Montserrat** (títulos, peso forte) + **Inter** (corpo de
texto), carregadas via Google Fonts. Para trocar:

1. No `index.html`, troque o link do Google Fonts no `<head>`.
2. No `css/style.css`, troque `--fonte-titulo`/`--fonte-corpo` no `:root`
   para o nome exato da fonte nova.

### 2.3. Textos e dados de contato

Abra `index.html` e procure por `TROCAR` (Ctrl+F) — os poucos pontos que
ainda dependem de uma decisão futura (link de rede social, endereço final
em produção) estão marcados com `<!-- TROCAR: ... -->`. O restante do
conteúdo (nome da empresa, serviços de importação/exportação, mercados de
atuação, dados de contato do diretor comercial) já está preenchido com as
informações reais fornecidas pela empresa:

- **WhatsApp / telefone**: `+55 (92) 98246-0567` — aparece em
  `wa.me/5592982460567` em 5 lugares (menu, hero, outsourcing, contato,
  botão flutuante). Se o número mudar, use Buscar-e-substituir do seu
  editor para trocar todas as ocorrências de uma vez.
- **E-mail**: `dirley.cardoso@docworldbusiness.com`
- **Endereço**: Edifício Rio Madeira, Rua Costa Azevedo, 9 — Sala 901 —
  Centro, Manaus/AM
- **Responsável comercial**: Dirley Cardoso, Commercial Director

### 2.4. Mercados de atuação (seção `#mercados`)

Cada país é um `<li class="pais">` com um emoji de bandeira
(`<span class="pais__bandeira">🇵🇹</span>`) + nome. Para adicionar, remover
ou mover um país entre grupos (Ásia & Oceania / Oriente Médio & África /
Américas / Europa), edite a lista dentro do `<div class="mercados__grupo">`
correspondente — cada item é independente, não precisa reindexar nada.

Cada bandeira é um `<img src="images/flags/xx.svg">`, onde `xx` é o
código ISO 3166-1 alpha-2 do país (`cn` = China, `us` = Estados Unidos,
`gb` = Reino Unido, etc.). Para adicionar um país que ainda não tenha
bandeira baixada, pegue o SVG equivalente em
[github.com/lipis/flag-icons](https://github.com/lipis/flag-icons/tree/main/flags/4x3)
e salve em `images/flags/xx.svg` — o CSS já reserva o tamanho certo
(26×19px, cantos levemente arredondados), não precisa ajustar layout.

### 2.5. Serviços (abas Importação/Exportação)

Cada serviço é um `<li class="servico-item">` dentro do painel certo
(`#painel-importacao` ou `#painel-exportacao`). Duplique ou apague um item
para adicionar/remover um serviço da lista — o layout em grade se ajusta
sozinho.

### 2.6. Logo oficial

`images/logo-marca.png` é a logo real da empresa (o monograma "DC"),
recortada e com fundo transparente a partir do cartão de visita enviado —
não é mais um placeholder. Aparece em três lugares: cabeçalho
(`.marca__icone`), marca d'água bem discreta atrás do card de citação da
seção "Sobre" (`.sobre__marca-dagua`) e rodapé (nesse caso usando
`images/logo-marca-branca.png`, a mesma logo recolorida em branco — sobre
o azul-marinho escuro do rodapé, a versão azul original ficava com pouco
contraste). Favicon e `og-image.jpg` também já foram gerados a partir dela.

Se um dia a empresa mandar um arquivo vetorial oficial (SVG/AI/EPS) mais
nítido que este recorte (a fonte é uma foto de cartão de visita, então a
resolução é limitada — ainda assim nítida o bastante em qualquer tamanho
usado no site hoje):

1. Repita o recorte com fundo transparente (mesma técnica: qualquer editor
   de imagem, ou peça pra eu processar de novo) e sobrescreva
   `images/logo-marca.png` — mantendo o nome do arquivo, nada mais no
   `index.html`/`css/style.css` precisa mudar.
2. Gere também `images/logo-marca-branca.png` (mesma logo, só recolorida
   em branco sólido) e `images/logo-marca-quadrado.png` (canvas quadrado,
   com folga) a partir do arquivo novo.
3. Regenere `images/favicon.png`, `apple-touch-icon.png`, `favicon-512.png`
   (redimensionando `logo-marca-quadrado.png`) e `images/og-image.jpg`.

### 2.7. Redes sociais e mapa

- **LinkedIn/redes**: no rodapé, troque `href="https://www.linkedin.com/"`
  pelo perfil real da empresa. Se não existir ainda, pode apagar o `<a>`
  daquele ícone.
- **Mapa (Google Maps)**: já aponta para "Rua Costa Azevedo, 9 - Centro,
  Manaus - AM" via busca por texto. Para um pino exato (não só busca),
  use o método oficial: Google Maps → busque o endereço → **Compartilhar**
  → **Incorporar um mapa** → copie o `<iframe>` gerado e cole no lugar do
  atual, na seção `#contato`.

### 2.8. SEO e Open Graph

No `<head>` do `index.html`, `<title>`/`meta description`/tags `og:*` já
estão preenchidas com o posicionamento real da empresa. Atualize apenas
`og:url` e `<link rel="canonical">` para o domínio definitivo assim que o
site for publicado (ver seção 3).

---

## 3. Deploy gratuito

Qualquer uma das opções abaixo é gratuita e gera uma URL `https://`
funcionando em minutos, sem configuração de build.

### Opção A — Netlify (mais simples, arrastar e soltar)

1. Crie uma conta grátis em [app.netlify.com](https://app.netlify.com)
2. **Sites** → arraste a pasta inteira do projeto
   (`doc-international-business`) para a área indicada
3. Em segundos o Netlify gera uma URL tipo `nome-aleatorio.netlify.app`
4. (Opcional) **Site settings → Change site name** para um nome mais
   legível, ex: `docworldbusiness.netlify.app`

Via linha de comando:

```powershell
npm install -g netlify-cli
cd doc-international-business
netlify deploy --prod
```

### Opção B — Vercel

```powershell
npm install -g vercel
cd doc-international-business
vercel --prod
```

(Também dá para arrastar a pasta pelo painel web da Vercel, sem instalar
nada — procure "Deploy" na página inicial do painel.)

### Opção C — GitHub Pages

```powershell
cd doc-international-business
git init
git add .
git commit -m "Site institucional DOC International Business"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/doc-international-business.git
git push -u origin main
```

No GitHub: **Settings** → **Pages** → em "Source", selecione a branch
`main` e a pasta `/ (root)` → **Save**. Em 1-2 minutos o site fica em
`https://seu-usuario.github.io/doc-international-business/`.

---

## 4. Apontar um domínio próprio

Depois do deploy (seção 3) gerar uma URL tipo `algumacoisa.netlify.app`,
aponte o domínio definitivo (ex: `www.docworldbusiness.com`) para ele:

### 4.1. Comprar o domínio (se ainda não tiver)

- `.com`, `.com.br`: [registro.br](https://registro.br) (para `.com.br`),
  [namecheap.com](https://namecheap.com) ou [godaddy.com](https://godaddy.com)
  (para `.com` e outros) — Netlify/Vercel também vendem domínio direto no
  painel deles.

### 4.2. Netlify

**Domain settings → Add a domain** → digite o domínio → o Netlify mostra
os registros de DNS (registro **A** para o IP dele, ou trocar os
**nameservers**) para cadastrar no painel onde o domínio foi comprado.
HTTPS é configurado automaticamente depois que o DNS propaga.

### 4.3. Vercel

Mesmo princípio: **Settings → Domains** → adicione o domínio → a Vercel
mostra o registro DNS (`A` ou `CNAME`) para cadastrar no registrador do
domínio. HTTPS também é automático.

### 4.4. Propagação de DNS

Pode levar de alguns minutos até 24-48h para propagar globalmente — normal,
não é erro de configuração. Acompanhe em
[dnschecker.org](https://dnschecker.org).

---

## 5. Checklist antes de publicar em produção

- [ ] Todos os `TROCAR` no `index.html` foram revisados (Ctrl+F por
      "TROCAR")
- [x] Logo oficial aplicada (ver seção 2.6) — recortada do cartão de
      visita; trocar por um vetor oficial se/quando a empresa mandar um
- [ ] Link do LinkedIn/redes sociais atualizado no rodapé
- [ ] Número de WhatsApp testado nos 5 pontos do site (menu, hero,
      outsourcing, contato, botão flutuante)
- [ ] Mapa mostra o pino certo (abra o `iframe` isoladamente para conferir)
- [ ] `og:url` e `<link rel="canonical">` apontando para o domínio final,
      não mais o placeholder
- [ ] Testado o preview de compartilhamento colando o link publicado numa
      conversa do WhatsApp/LinkedIn
- [ ] Testado em pelo menos um celular de verdade (não só redimensionando
      a janela do navegador)
- [ ] Site publicado e, se aplicável, domínio próprio já apontando com
      HTTPS ativo

---

## 6. Créditos

Desenvolvido por [DCodes](https://www.dcodes.com.br/) para a DOC
International Business Ltda.
