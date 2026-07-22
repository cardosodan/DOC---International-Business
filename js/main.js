/* ==========================================================================
   DOC INTERNATIONAL BUSINESS — JAVASCRIPT
   ==========================================================================
   JS puro, sem dependências. Cada responsabilidade fica numa função
   separada e independente das outras — se algo aqui der erro, o resto do
   site continua funcionando normalmente.
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  ativarMenuMobile();
  ativarSombraDoCabecalhoAoRolar();
  ativarRevelacaoAoRolar();
  ativarLinkAtivoNaNavegacao();
  ativarAbasDeServicos();
  ativarContadorDeEstatisticas();
  ativarBotaoFlutuanteWhatsApp();
  atualizarAnoDoRodape();
});

/* --------------------------------------------------------------------------
   1. MENU MOBILE (hambúrguer)
   -------------------------------------------------------------------------- */
function ativarMenuMobile() {
  const botao = document.getElementById("botaoMenuMobile");
  const navegacao = document.getElementById("navegacao");
  if (!botao || !navegacao) return;

  const fecharMenu = () => {
    navegacao.classList.remove("navegacao--aberta");
    botao.setAttribute("aria-expanded", "false");
    botao.setAttribute("aria-label", "Abrir menu");
  };

  const alternarMenu = () => {
    const abrindo = !navegacao.classList.contains("navegacao--aberta");
    navegacao.classList.toggle("navegacao--aberta", abrindo);
    botao.setAttribute("aria-expanded", String(abrindo));
    botao.setAttribute("aria-label", abrindo ? "Fechar menu" : "Abrir menu");
  };

  botao.addEventListener("click", alternarMenu);

  navegacao.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", fecharMenu);
  });

  document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape") fecharMenu();
  });
}

/* --------------------------------------------------------------------------
   2. SOMBRA NO CABEÇALHO AO ROLAR A PÁGINA
   -------------------------------------------------------------------------- */
function ativarSombraDoCabecalhoAoRolar() {
  const cabecalho = document.getElementById("cabecalho");
  if (!cabecalho) return;

  const verificarRolagem = () => {
    cabecalho.classList.toggle("cabecalho--rolado", window.scrollY > 12);
  };

  verificarRolagem();
  window.addEventListener("scroll", verificarRolagem, { passive: true });
}

/* --------------------------------------------------------------------------
   3. ANIMAÇÃO DE ENTRADA AO ROLAR (SCROLL REVEAL)
   Usa IntersectionObserver nativo — sem biblioteca externa. Cada elemento
   ".reveal" ganha ".reveal--visivel" uma vez só, ao entrar na tela.
   -------------------------------------------------------------------------- */
function ativarRevelacaoAoRolar() {
  const elementos = document.querySelectorAll(".reveal");
  if (!elementos.length) return;

  const prefereMenosMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefereMenosMovimento || !("IntersectionObserver" in window)) {
    elementos.forEach((el) => el.classList.add("reveal--visivel"));
    return;
  }

  const observador = new IntersectionObserver(
    (entradas, observer) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          entrada.target.classList.add("reveal--visivel");
          observer.unobserve(entrada.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );

  elementos.forEach((el) => observador.observe(el));
}

/* --------------------------------------------------------------------------
   4. DESTACAR O LINK ATIVO NO MENU CONFORME A SEÇÃO VISÍVEL
   -------------------------------------------------------------------------- */
function ativarLinkAtivoNaNavegacao() {
  const secoes = document.querySelectorAll("main section[id]");
  const links = document.querySelectorAll(".navegacao__link");
  if (!secoes.length || !links.length || !("IntersectionObserver" in window)) return;

  const linkPorId = new Map();
  links.forEach((link) => {
    const id = link.getAttribute("href").replace("#", "");
    linkPorId.set(id, link);
  });

  const observador = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        const link = linkPorId.get(entrada.target.id);
        if (!link) return;
        if (entrada.isIntersecting) {
          links.forEach((l) => l.classList.remove("navegacao__link--ativo"));
          link.classList.add("navegacao__link--ativo");
        }
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );

  secoes.forEach((secao) => observador.observe(secao));
}

/* --------------------------------------------------------------------------
   5. ABAS DE SERVIÇOS (Importação / Exportação)
   Componente de abas acessível (ARIA tablist/tab/tabpanel) — clique ou
   setas ← → alternam entre os painéis, sem recarregar nada.
   -------------------------------------------------------------------------- */
function ativarAbasDeServicos() {
  const botoes = Array.from(document.querySelectorAll(".abas__botao"));
  if (!botoes.length) return;

  const selecionarAba = (botaoAlvo) => {
    botoes.forEach((botao) => {
      const ativa = botao === botaoAlvo;
      botao.classList.toggle("abas__botao--ativa", ativa);
      botao.setAttribute("aria-selected", String(ativa));
      botao.setAttribute("tabindex", ativa ? "0" : "-1");

      const painel = document.getElementById(botao.getAttribute("aria-controls"));
      if (painel) painel.hidden = !ativa;
    });
    botaoAlvo.focus();
  };

  botoes.forEach((botao, indice) => {
    botao.addEventListener("click", () => {
      // Evita trabalho desnecessário (e o foco "roubado") se a aba já
      // clicada já for a ativa.
      if (!botao.classList.contains("abas__botao--ativa")) selecionarAba(botao);
    });

    botao.addEventListener("keydown", (evento) => {
      if (evento.key !== "ArrowRight" && evento.key !== "ArrowLeft") return;
      evento.preventDefault();
      const proximoIndice =
        evento.key === "ArrowRight"
          ? (indice + 1) % botoes.length
          : (indice - 1 + botoes.length) % botoes.length;
      selecionarAba(botoes[proximoIndice]);
    });
  });
}

/* --------------------------------------------------------------------------
   6. CONTADOR ANIMADO NAS ESTATÍSTICAS DO HERO
   Anima de 0 até o valor final (data-contador) quando o bloco de
   estatísticas entra na tela, uma única vez.
   -------------------------------------------------------------------------- */
function ativarContadorDeEstatisticas() {
  const numeros = document.querySelectorAll(".estatistica__numero");
  if (!numeros.length) return;

  const prefereMenosMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const definirValorFinal = (elemento) => {
    const valorFinal = Number(elemento.dataset.contador || 0);
    const sufixo = elemento.dataset.sufixo || "";
    elemento.textContent = valorFinal + sufixo;
  };

  if (prefereMenosMovimento || !("IntersectionObserver" in window)) {
    numeros.forEach(definirValorFinal);
    return;
  }

  const animarContador = (elemento) => {
    const valorFinal = Number(elemento.dataset.contador || 0);
    const sufixo = elemento.dataset.sufixo || "";
    const duracaoMs = 1400;
    const inicio = performance.now();

    const passo = (agora) => {
      const progresso = Math.min((agora - inicio) / duracaoMs, 1);
      // Easing suave (ease-out) — desacelera perto do valor final, em vez
      // de contar em velocidade constante (fica mais "premium").
      const progressoSuave = 1 - Math.pow(1 - progresso, 3);
      const valorAtual = Math.round(valorFinal * progressoSuave);
      elemento.textContent = valorAtual + sufixo;
      if (progresso < 1) requestAnimationFrame(passo);
    };

    requestAnimationFrame(passo);
  };

  const observador = new IntersectionObserver(
    (entradas, observer) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          animarContador(entrada.target);
          observer.unobserve(entrada.target);
        }
      });
    },
    { threshold: 0.6 }
  );

  numeros.forEach((numero) => observador.observe(numero));
}

/* --------------------------------------------------------------------------
   7. BOTÃO FLUTUANTE DE WHATSAPP — só aparece depois do Hero
   O Hero já tem seu próprio botão de WhatsApp em destaque; mostrar o
   flutuante por cima dele (e, em telas pequenas, por cima do texto das
   estatísticas) só duplicava a ação e arriscava cobrir conteúdo. Ele
   aparece assim que o visitante rola para além do Hero.
   -------------------------------------------------------------------------- */
function ativarBotaoFlutuanteWhatsApp() {
  const botao = document.querySelector(".whatsapp-flutuante");
  const hero = document.getElementById("inicio");
  if (!botao || !hero) return;

  const verificarPosicao = () => {
    const passouDoHero = window.scrollY > hero.offsetHeight - 120;
    botao.classList.toggle("whatsapp-flutuante--visivel", passouDoHero);
  };

  verificarPosicao();
  window.addEventListener("scroll", verificarPosicao, { passive: true });
  window.addEventListener("resize", verificarPosicao);
}

/* --------------------------------------------------------------------------
   8. ANO ATUAL NO RODAPÉ
   -------------------------------------------------------------------------- */
function atualizarAnoDoRodape() {
  const spanAno = document.getElementById("anoAtual");
  if (!spanAno) return;
  spanAno.textContent = new Date().getFullYear();
}
