/* ============================================================
   VocabDeck — motor de flashcards com repetição espaçada (Leitner)
   Vanilla JS, sem dependências, sem backend (localStorage).

   Arquitetura de dados dos cards é genérica (termo/definição) e não
   depende de nenhum idioma específico — a lógica de agendamento
   (Leitner) só enxerga "caixa" e "próxima revisão", nunca o
   conteúdo do card. Isso permite reaproveitar o mesmo motor para
   qualquer par de idiomas / disciplina.

   -------------------------------------------------------------
   Decisão de design — motor Leitner (documentado conforme pedido
   no PRD, seção "Questões em aberto: quantas caixas de Leitner?"):

   Usamos 5 caixas. Cada card guarda `box` (1 a 5) e `dueAt`
   (timestamp em ms de quando ele volta a ficar "devido"). Ao
   responder:
     - "Errei"   -> volta para a caixa 1, `dueAt` = agora (fica
                    devido imediatamente, reaparece ainda nesta
                    sessão / na próxima).
     - "Acertei" -> avança uma caixa (até o máximo 5) e recebe um
                    intervalo maior até a próxima revisão:
                      caixa 1 -> 0 dia   (revisar sempre / imediato)
                      caixa 2 -> 1 dia
                      caixa 3 -> 3 dias
                      caixa 4 -> 7 dias
                      caixa 5 -> 14 dias (considerado "dominado")
   Isso é o clássico espaçamento crescente de Leitner, simplificado
   com timestamps + intervalos fixos em dias em vez de um
   agendador real — suficiente para o escopo do MVP acadêmico.
   ============================================================ */

(function () {
  "use strict";

  var STORAGE_KEY = "vocabdeck:state:v1";
  var BOX_COUNT = 5;
  var DIA_MS = 24 * 60 * 60 * 1000;
  var BOX_INTERVALOS_DIAS = { 1: 0, 2: 1, 3: 3, 4: 7, 5: 14 };

  var SEED_CARDS = [
    { term: "ubiquitous", definition: "presente em todos os lugares; onipresente" },
    { term: "ephemeral", definition: "que dura muito pouco tempo; efêmero" },
    { term: "resilient", definition: "capaz de se recuperar rapidamente de dificuldades" },
    { term: "ambiguous", definition: "que tem mais de um sentido possível; ambíguo" },
    { term: "meticulous", definition: "extremamente cuidadoso e atento aos detalhes" },
    { term: "candid", definition: "sincero e direto ao falar; franco" },
    { term: "diligent", definition: "que trabalha com cuidado e empenho constante" },
    { term: "feasible", definition: "que pode ser realizado na prática; viável" },
    { term: "concise", definition: "que expressa uma ideia em poucas palavras" },
    { term: "thorough", definition: "completo, minucioso, feito com atenção total" }
  ];

  /* ---------------- Estado em memória ---------------- */

  var state = {
    cards: []
  };

  var study = {
    pool: [],        // array de ids na ordem em que serão estudados nesta rodada
    pointer: 0,       // índice do card atual dentro de pool
    ignoreDue: false, // true quando o usuário escolheu "estudar todos mesmo assim"
    revealed: false   // se o verso do card atual já foi revelado
  };

  /* ---------------- Utilidades ---------------- */

  function gerarId() {
    return "card-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 9);
  }

  function agora() {
    return Date.now();
  }

  function criarCard(term, definition) {
    var ts = agora();
    return {
      id: gerarId(),
      term: term,
      definition: definition,
      box: 1,
      dueAt: ts, // novo card sempre entra devido imediatamente
      createdAt: ts,
      updatedAt: ts,
      stats: { correct: 0, wrong: 0 }
    };
  }

  function estadoPadrao() {
    return {
      cards: SEED_CARDS.map(function (c) {
        return criarCard(c.term, c.definition);
      })
    };
  }

  /* ---------------- Persistência (localStorage) ---------------- */

  function salvar() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      // localStorage pode falhar (modo privado, quota, etc.) — o app
      // continua funcionando em memória para a sessão atual.
      console.warn("VocabDeck: não foi possível salvar em localStorage.", e);
    }
  }

  function carregar() {
    var bruto;
    try {
      bruto = localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      bruto = null;
    }

    if (!bruto) {
      return estadoPadrao();
    }

    try {
      var parsed = JSON.parse(bruto);
      if (parsed && Array.isArray(parsed.cards)) {
        // saneia cada card para garantir que os campos essenciais existem
        parsed.cards = parsed.cards
          .filter(function (c) { return c && typeof c.id === "string"; })
          .map(function (c) {
            return {
              id: c.id,
              term: typeof c.term === "string" ? c.term : "",
              definition: typeof c.definition === "string" ? c.definition : "",
              box: BOX_INTERVALOS_DIAS.hasOwnProperty(c.box) ? c.box : 1,
              dueAt: typeof c.dueAt === "number" ? c.dueAt : agora(),
              createdAt: typeof c.createdAt === "number" ? c.createdAt : agora(),
              updatedAt: typeof c.updatedAt === "number" ? c.updatedAt : agora(),
              stats: c.stats && typeof c.stats === "object"
                ? { correct: c.stats.correct || 0, wrong: c.stats.wrong || 0 }
                : { correct: 0, wrong: 0 }
            };
          });
        return parsed;
      }
    } catch (e) {
      console.warn("VocabDeck: estado salvo estava corrompido, recriando baralho de exemplo.", e);
    }

    return estadoPadrao();
  }

  /* ---------------- Motor Leitner ---------------- */

  function reagendarCard(card, acertou) {
    if (acertou) {
      card.box = Math.min(card.box + 1, BOX_COUNT);
      card.stats.correct += 1;
    } else {
      card.box = 1;
      card.stats.wrong += 1;
    }
    var dias = BOX_INTERVALOS_DIAS[card.box];
    card.dueAt = agora() + dias * DIA_MS;
    card.updatedAt = agora();
  }

  function cardsDevidos() {
    var ts = agora();
    return state.cards.filter(function (c) { return c.dueAt <= ts; });
  }

  function ordenarPorDueAt(cards) {
    return cards.slice().sort(function (a, b) {
      if (a.dueAt !== b.dueAt) return a.dueAt - b.dueAt;
      return a.createdAt - b.createdAt;
    });
  }

  function contagemPorCaixa() {
    var contagem = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    state.cards.forEach(function (c) { contagem[c.box] = (contagem[c.box] || 0) + 1; });
    return contagem;
  }

  /* ---------------- CRUD ---------------- */

  function adicionarCard(term, definition) {
    state.cards.push(criarCard(term, definition));
    salvar();
    onBaralhoAlterado();
  }

  function editarCard(id, term, definition) {
    var card = state.cards.find(function (c) { return c.id === id; });
    if (!card) return;
    card.term = term;
    card.definition = definition;
    card.updatedAt = agora();
    salvar();
    onBaralhoAlterado();
  }

  function removerCard(id) {
    state.cards = state.cards.filter(function (c) { return c.id !== id; });
    salvar();
    onBaralhoAlterado();
  }

  function onBaralhoAlterado() {
    // Garante que criar/editar/remover um card reflete imediatamente
    // na sessão de estudo: reconstruímos a fila de estudo a partir
    // do estado atual do baralho.
    iniciarRodada(false);
    renderDeck();
    renderStudy();
  }

  /* ---------------- Sessão de estudo ---------------- */

  function iniciarRodada(ignoreDue) {
    study.ignoreDue = !!ignoreDue;
    var origem = study.ignoreDue ? state.cards : cardsDevidos();
    study.pool = ordenarPorDueAt(origem).map(function (c) { return c.id; });
    study.pointer = 0;
    study.revealed = false;
  }

  function cardAtual() {
    if (study.pointer < 0 || study.pointer >= study.pool.length) return null;
    var id = study.pool[study.pointer];
    return state.cards.find(function (c) { return c.id === id; }) || null;
  }

  function responderCardAtual(acertou) {
    var card = cardAtual();
    if (!card) return;
    reagendarCard(card, acertou);
    salvar();
    study.pointer += 1;
    study.revealed = false;

    // Se a rodada normal (respeitando dueAt) acabou, tenta ver se
    // surgiram novos cards devidos "de graça" (não deveria acontecer
    // no mesmo instante, mas mantém a fila honesta).
    if (!study.ignoreDue && study.pointer >= study.pool.length) {
      var novos = ordenarPorDueAt(cardsDevidos()).map(function (c) { return c.id; });
      study.pool = novos;
      study.pointer = 0;
    }

    renderDeck();
    renderStudy();
  }

  /* ---------------- Helpers de DOM ---------------- */

  function $(id) {
    return document.getElementById(id);
  }

  function limparFilhos(el) {
    while (el.firstChild) el.removeChild(el.firstChild);
  }

  /* ---------------- Render: navegação por abas ---------------- */

  function irParaTab(tab) {
    var painelEstudo = $("tab-estudo");
    var painelBaralho = $("tab-baralho");
    var btnEstudo = $("tab-btn-estudo");
    var btnBaralho = $("tab-btn-baralho");

    var isEstudo = tab === "estudo";

    painelEstudo.hidden = !isEstudo;
    painelBaralho.hidden = isEstudo;
    painelEstudo.classList.toggle("is-active", isEstudo);
    painelBaralho.classList.toggle("is-active", !isEstudo);

    btnEstudo.classList.toggle("is-active", isEstudo);
    btnBaralho.classList.toggle("is-active", !isEstudo);
    btnEstudo.setAttribute("aria-pressed", String(isEstudo));
    btnBaralho.setAttribute("aria-pressed", String(!isEstudo));

    if (isEstudo) renderStudy();
  }

  /* ---------------- Render: tela de estudo ---------------- */

  function renderProgresso() {
    var el = $("study-progress");
    limparFilhos(el);

    var total = state.cards.length;
    var devidos = cardsDevidos().length;

    var resumo = document.createElement("span");
    resumo.textContent = total === 0
      ? "Nenhum card no baralho."
      : devidos + " de " + total + " card(s) para revisar agora.";
    el.appendChild(resumo);

    if (total > 0) {
      var caixas = document.createElement("div");
      caixas.className = "study-progress__caixas";
      var contagem = contagemPorCaixa();
      for (var i = 1; i <= BOX_COUNT; i++) {
        var badge = document.createElement("span");
        badge.className = "study-progress__caixa" + (i === BOX_COUNT ? " study-progress__caixa--dominado" : "");
        badge.textContent = "Caixa " + i + ": " + contagem[i];
        caixas.appendChild(badge);
      }
      el.appendChild(caixas);
    }
  }

  function renderStudy() {
    renderProgresso();

    var elSemCards = $("study-no-cards");
    var elVazioDevido = $("study-empty");
    var elFimRodada = $("study-round-end");
    var elCard = $("study-card");

    if (state.cards.length === 0) {
      elSemCards.hidden = false;
      elVazioDevido.hidden = true;
      elFimRodada.hidden = true;
      elCard.hidden = true;
      return;
    }
    elSemCards.hidden = true;

    var card = cardAtual();

    if (!card) {
      elCard.hidden = true;
      if (study.ignoreDue) {
        // rodada "estudar tudo" chegou ao fim
        elFimRodada.hidden = false;
        elVazioDevido.hidden = true;
      } else if (cardsDevidos().length === 0) {
        // nada devido agora
        elVazioDevido.hidden = false;
        elFimRodada.hidden = true;
      } else {
        // caso raro: pool desatualizada, reconstrói
        iniciarRodada(false);
        renderStudy();
        return;
      }
      return;
    }

    elVazioDevido.hidden = true;
    elFimRodada.hidden = true;
    elCard.hidden = false;

    $("study-term").textContent = card.term;
    $("study-definition").textContent = card.definition;
    $("study-box").textContent = String(card.box);

    var back = $("study-back");
    var acoesResposta = $("study-answer-actions");
    var btnRevelar = $("btn-revelar");

    back.hidden = !study.revealed;
    acoesResposta.hidden = !study.revealed;
    btnRevelar.hidden = study.revealed;
  }

  /* ---------------- Render: gerenciar baralho (CRUD) ---------------- */

  function renderDeck() {
    var lista = $("deck-list");
    var vazio = $("deck-list-vazio");
    var contador = $("deck-count");

    limparFilhos(lista);

    contador.textContent = state.cards.length + " card(s) no baralho";

    if (state.cards.length === 0) {
      vazio.hidden = false;
      return;
    }
    vazio.hidden = true;

    var ordenados = state.cards.slice().sort(function (a, b) { return a.createdAt - b.createdAt; });

    ordenados.forEach(function (card) {
      var li = document.createElement("li");
      li.className = "deck-card";
      li.dataset.id = card.id;

      var texto = document.createElement("div");
      texto.className = "deck-card__texto";

      var termo = document.createElement("p");
      termo.className = "deck-card__termo";
      termo.textContent = card.term;

      var def = document.createElement("p");
      def.className = "deck-card__definicao";
      def.textContent = card.definition;

      texto.appendChild(termo);
      texto.appendChild(def);

      var caixa = document.createElement("span");
      caixa.className = "deck-card__caixa" + (card.box === BOX_COUNT ? " deck-card__caixa--dominado" : "");
      caixa.textContent = "Caixa " + card.box;

      var acoes = document.createElement("div");
      acoes.className = "deck-card__acoes";

      var btnEditar = document.createElement("button");
      btnEditar.type = "button";
      btnEditar.className = "btn btn--icone";
      btnEditar.textContent = "Editar";
      btnEditar.dataset.action = "editar";
      btnEditar.dataset.id = card.id;

      var btnRemover = document.createElement("button");
      btnRemover.type = "button";
      btnRemover.className = "btn btn--icone btn--perigo";
      btnRemover.textContent = "Remover";
      btnRemover.dataset.action = "remover";
      btnRemover.dataset.id = card.id;

      acoes.appendChild(btnEditar);
      acoes.appendChild(btnRemover);

      li.appendChild(texto);
      li.appendChild(caixa);
      li.appendChild(acoes);

      lista.appendChild(li);
    });
  }

  /* ---------------- Formulário do CRUD ---------------- */

  function resetarFormulario() {
    $("input-id").value = "";
    $("input-termo").value = "";
    $("input-definicao").value = "";
    $("form-titulo").textContent = "Adicionar card";
    $("btn-salvar-card").textContent = "Adicionar card";
    $("btn-cancelar-edicao").hidden = true;
    esconderErroForm();
  }

  function iniciarEdicao(id) {
    var card = state.cards.find(function (c) { return c.id === id; });
    if (!card) return;
    $("input-id").value = card.id;
    $("input-termo").value = card.term;
    $("input-definicao").value = card.definition;
    $("form-titulo").textContent = "Editar card";
    $("btn-salvar-card").textContent = "Salvar alterações";
    $("btn-cancelar-edicao").hidden = false;
    esconderErroForm();
    $("input-termo").focus();
  }

  function mostrarErroForm(msg) {
    var el = $("form-erro");
    el.textContent = msg;
    el.hidden = false;
  }

  function esconderErroForm() {
    var el = $("form-erro");
    el.hidden = true;
    el.textContent = "";
  }

  function tratarSubmitForm(ev) {
    ev.preventDefault();

    var id = $("input-id").value;
    var term = $("input-termo").value.trim();
    var definition = $("input-definicao").value.trim();

    if (!term || !definition) {
      mostrarErroForm("Preencha o termo e a definição antes de salvar.");
      return;
    }

    if (id) {
      editarCard(id, term, definition);
    } else {
      adicionarCard(term, definition);
    }

    resetarFormulario();
  }

  function tratarCliqueLista(ev) {
    var btn = ev.target.closest("button[data-action]");
    if (!btn) return;

    var id = btn.dataset.id;
    var acao = btn.dataset.action;

    if (acao === "editar") {
      iniciarEdicao(id);
    } else if (acao === "remover") {
      var card = state.cards.find(function (c) { return c.id === id; });
      var nome = card ? card.term : "este card";
      var confirmar = window.confirm('Remover o card "' + nome + '"? Esta ação não pode ser desfeita.');
      if (confirmar) {
        // se o card em edição for removido, limpa o formulário
        if ($("input-id").value === id) resetarFormulario();
        removerCard(id);
      }
    }
  }

  /* ---------------- Wire-up de eventos ---------------- */

  function iniciar() {
    state = carregar();
    salvar(); // normaliza/persiste eventuais correções de saneamento

    iniciarRodada(false);
    renderDeck();
    renderStudy();

    $("tab-btn-estudo").addEventListener("click", function () { irParaTab("estudo"); });
    $("tab-btn-baralho").addEventListener("click", function () { irParaTab("baralho"); });

    document.querySelectorAll("[data-goto-tab]").forEach(function (btn) {
      btn.addEventListener("click", function () { irParaTab(btn.dataset.gotoTab); });
    });

    $("btn-revelar").addEventListener("click", function () {
      study.revealed = true;
      renderStudy();
    });

    $("btn-acertei").addEventListener("click", function () { responderCardAtual(true); });
    $("btn-errei").addEventListener("click", function () { responderCardAtual(false); });

    $("btn-estudar-tudo").addEventListener("click", function () {
      iniciarRodada(true);
      renderStudy();
    });

    $("btn-nova-rodada").addEventListener("click", function () {
      iniciarRodada(false);
      renderStudy();
    });

    $("card-form").addEventListener("submit", tratarSubmitForm);
    $("btn-cancelar-edicao").addEventListener("click", resetarFormulario);
    $("deck-list").addEventListener("click", tratarCliqueLista);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", iniciar);
  } else {
    iniciar();
  }
})();
