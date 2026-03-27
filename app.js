import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import {
  getDatabase,
  ref,
  onValue,
  set,
  runTransaction,
  update,
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";

/* =========================================================
   1) CONFIG
========================================================= */

const firebaseConfig = {
  apiKey: "AIzaSyBX9iw5v51xdujjiHwTxodEIDarTIacKk8",
  authDomain: "quiz-arvore.firebaseapp.com",
  databaseURL: "https://quiz-arvore-default-rtdb.firebaseio.com",
  projectId: "quiz-arvore",
  storageBucket: "quiz-arvore.firebasestorage.app",
  messagingSenderId: "542363590550",
  appId: "1:542363590550:web:29ec9a1c79825dac2807b7",
  measurementId: "G-Q4WGQZNYK7",
};

const FORCE_RESET_ON_LOAD = false;
const ROOM_ID = "fortalece-redes-cards-1";

/* =========================================================
   2) CASOS
========================================================= */

const scenarios = {
  restaurante: {
    id: "restaurante",
    title: "O Caso do Restaurante",
    label: "Situação em análise",
    image: "img/restaurante/restaurante.png",
    text: "Em um restaurante muito procurado, as filas na entrada se tornaram frequentes. Clientes aguardam por longos períodos, enquanto a equipe, já sobrecarregada, tenta lidar com pedidos acumulados e dificuldades na organização do atendimento. A comunicação entre os setores nem sempre flui bem e o ritmo do serviço parece desordenado. A tensão cresce tanto entre os clientes quanto entre os trabalhadores, e a sensação é de que o funcionamento do restaurante já não responde adequadamente à demanda.",
    question: "Este card, nesta análise, deve ser compreendido como:",
    facilitatorHint:
      "Depois da votação, pergunte ao grupo por que leu esse card como causa, problema ou consequência.",

    cards: [
      {
        id: "falha-comunicacao-cozinha-atendimento",
        text: "Falha na comunicação entre cozinha e atendimento",
        image: "img/restaurante/restaurante-card-comunicacao.png",
        correctType: "causa",
      },
      {
        id: "acumulo-pedidos-sem-prioridade",
        text: "Acúmulo de pedidos sem controle de prioridade",
        image: "img/restaurante/restaurante-card-pedidos.png",
        correctType: "causa",
      },
      {
        id: "equipe-insuficiente-volume-clientes",
        text: "Equipe insuficiente para o volume de clientes",
        image: "img/restaurante/restaurante-equipe_insu.png",
        correctType: "causa",
      },
      {
        id: "ausencia-organizacao-fluxo-atendimento",
        text: "Ausência de organização clara do fluxo de atendimento",
        image: "img/restaurante/restaurante-card-fluxo.png",
        correctType: "causa",
      },
      {
        id: "problema-fluxo-restaurante",
        text: "Desorganização do fluxo de atendimento do restaurante",
        image: "img/restaurante/restaurante-problema.png",
        correctType: "problema",
      },
      {
        id: "filas-longas-entrada-restaurante",
        text: "Filas longas na entrada do restaurante",
        image: "img/restaurante/restaurante-fila.png",
        correctType: "consequencia",
      },
      {
        id: "tempo-espera-elevado-clientes",
        text: "Tempo de espera elevado para os clientes",
        image: "img/restaurante/restaurante-card-espera.png",
        correctType: "consequencia",
      },
      {
        id: "tensao-sobrecarga-trabalhadores-restaurante",
        text: "Tensão e sobrecarga entre os trabalhadores",
        image: "img/restaurante/restaurante-card-sobrecarga.png",
        correctType: "consequencia",
      },
      {
        id: "insatisfacao-reclamacoes-clientes",
        text: "Insatisfação e reclamações dos clientes",
        image: "img/restaurante/restaurante-card-clientes.png",
        correctType: "consequencia",
      },
    ],
  },

  aeroporto: {
    id: "aeroporto",
    title: "O Caso do Aeroporto",
    label: "Metáfora de aprendizagem",
    image: "img/aeroporto.png",
    text: "Em um aeroporto com grande circulação de passageiros, atrasos no embarque passaram a ser frequentes.  Pessoas se acumulam em diferentes pontos do percurso, formando filas e gerando tensão no ambiente.  Enquanto isso, equipes de diferentes setores tentam lidar com mudanças de última hora, falhas na comunicação e dificuldades na coordenação das etapas do embarque.  O fluxo de passageiros se torna irregular, com momentos de congestionamento e espera prolongada, e a sensação geral é de desorganização no funcionamento do serviço.",
    question: "Este card, nesta análise, deve ser compreendido como:",
    facilitatorHint:
      "Explore com o grupo a diferença entre o que aparece na ponta e o que organiza o problema.",

    cards: [
      {
        id: "falhas-comunicacao-setores-aeroporto",
        text: "Falhas na comunicação entre os diferentes setores do aeroporto",
        image: "img/aeroporto-card-comunicacao.png",
        correctType: "causa",
      },
      {
        id: "ausencia-coordenacao-integrada-fluxo",
        text: "Ausência de coordenação integrada do fluxo de passageiros",
        image: "img/aeroporto-card-coordenacao.png",
        correctType: "causa",
      },
      {
        id: "mudancas-operacionais-frequentes",
        text: "Mudanças operacionais frequentes (atrasos, troca de portão, etc.)",
        image: "img/aeroporto-card-mudancas.png",
        correctType: "causa",
      },
      {
        id: "dimensionamento-inadequado-equipe-aeroporto",
        text: "Dimensionamento inadequado de equipe nos pontos críticos",
        image: "img/aeroporto-card-equipe.png",
        correctType: "causa",
      },
      {
        id: "problema-fluxo-passageiros-aeroporto",
        text: "Falta de coordenação do fluxo de passageiros entre os diferentes setores do aeroporto",
        image: "img/aeroporto-card-setores.png",
        correctType: "problema",
      },
      {
        id: "filas-acumulo-passageiros",
        text: "Filas e acúmulo de passageiros em diferentes pontos",
        image: "img/aeroporto-card-acumulo.png",
        correctType: "consequencia",
      },
      {
        id: "atrasos-embarque-voos",
        text: "Atrasos no embarque dos voos",
        image: "img/aeroporto-card-atraso.png",
        correctType: "consequencia",
      },
      {
        id: "tensao-estresse-passageiros-trabalhadores",
        text: "Tensão e estresse entre passageiros e trabalhadores",
        image: "img/aeroporto-card-estresse.png",
        correctType: "consequencia",
      },
      {
        id: "perda-previsibilidade-desorganizacao-servico",
        text: "Perda de previsibilidade e sensação de desorganização do serviço",
        image: "img/aeroporto-card-desorganizacao.png",
        correctType: "consequencia",
      },
    ],
  },

  hospital: {
    id: "hospital",
    title: "O Caso do Hospital",
    label: "Situação em análise",
    image: "img/hospital.png",
    text: "Em um hospital de referência, a ocupação de leitos permanece constantemente elevada, com pacientes aguardando internação por longos períodos, inclusive na emergência. Enquanto isso, equipes relatam dificuldade em dar vazão aos atendimentos, e a rotatividade de leitos ocorre de forma lenta e irregular. Há relatos de falhas na comunicação entre setores, demora em decisões clínicas e dificuldades na articulação com outros pontos da rede para encaminhamento de pacientes.  A sensação é de que o hospital opera no limite, com sobrecarga constante e pouca capacidade de resposta às demandas que chegam.",
    question: "Este card, nesta análise, deve ser compreendido como:",
    facilitatorHint:
      "Convide o grupo a identificar o que é manifestação visível e o que pode ser núcleo do problema.",

    cards: [
      {
        id: "falta-integracao-hospital-rede",
        text: "Falta de integração entre hospital e rede de atenção à saúde",
        image: "img/hospital-card-integracao.png",
        correctType: "causa",
      },
      {
        id: "processos-lentos-regulacao-leitos",
        text: "Processos lentos na regulação e liberação de leitos",
        image: "img/hospital-card-regulacao-lenta.png",
        correctType: "causa",
      },
      {
        id: "demora-decisao-clinica",
        text: "Demora na tomada de decisão clínica (alta, transferência, conduta)",
        image: "img/hospital-card-decisao.png",
        correctType: "causa",
      },
      {
        id: "ausencia-gestao-ativa-fluxo-leitos",
        text: "Ausência de gestão ativa do fluxo de pacientes e leitos",
        image: "img/hospital-card-fluxo.png",
        correctType: "causa",
      },
      {
        id: "problema-desarticulacao-regulacao-hospital-rede",
        text: "Desarticulação entre regulação, hospital e rede de atenção, comprometendo o fluxo de pacientes",
        image: "img/hospital-card-rede.png",
        correctType: "problema",
      },
      {
        id: "superlotacao-emergencia",
        text: "Superlotação da emergência",
        image: "img/hospital-card-superlotacao.png",
        correctType: "consequencia",
      },
      {
        id: "pacientes-aguardando-internacao",
        text: "Pacientes aguardando internação por longos períodos",
        image: "img/hospital-card-espera.png",
        correctType: "consequencia",
      },
      {
        id: "sobrecarga-equipes-saude",
        text: "Sobrecarga das equipes de saúde",
        image: "img/hospital-card-sobrecarga.png",
        correctType: "consequencia",
      },
      {
        id: "comprometimento-qualidade-seguranca-cuidado",
        text: "Comprometimento da qualidade e segurança do cuidado",
        image: "img/hospital-card-qualidade.png",
        correctType: "consequencia",
      },
    ],
  },
};

/* =========================================================
   3) OPÇÕES
========================================================= */

const optionDefs = [
  {
    id: "causa",
    // kicker: "Leitura 1",
    title: "Causa",
    // help: "O grupo entende que este card ajuda a explicar por que o problema acontece.",
  },
  {
    id: "problema",
    // kicker: "Leitura 2",
    title: "Problema central",
    // help: "O grupo entende que este card expressa o núcleo do problema analisado.",
  },
  {
    id: "consequencia",
    // kicker: "Leitura 3",
    title: "Consequência",
    // help: "O grupo entende que este card mostra um efeito ou manifestação visível do problema.",
  },
];

/* =========================================================
   4) URL
========================================================= */

const params = new URLSearchParams(window.location.search);
const isFacilitadora = params.get("view") === "facilitadora";
const initialScenarioId = params.get("poll") || "restaurante";

let currentScenarioId = scenarios[initialScenarioId]
  ? initialScenarioId
  : "restaurante";

/* =========================================================
   5) ELEMENTOS
========================================================= */

const els = {
  pollTitle: document.getElementById("pollTitle"),
  pollSubtitle: document.getElementById("pollSubtitle"),
  totalVotes: document.getElementById("totalVotes"),
  myVote: document.getElementById("myVote"),
  connectionStatus: document.getElementById("connectionStatus"),
  currentScenarioPill: document.getElementById("currentScenarioPill"),
  currentCardPill: document.getElementById("currentCardPill"),

  sceneImage: document.getElementById("sceneImage"),
  sceneLabel: document.getElementById("sceneLabel"),
  sceneTitle: document.getElementById("sceneTitle"),
  sceneText: document.getElementById("sceneText"),
  questionText: document.getElementById("questionText"),

  activeCard: document.getElementById("activeCard"),
  cardCounter: document.getElementById("cardCounter"),
  cardsGrid: document.getElementById("cardsGrid"),
  cardVotesTotal: document.getElementById("cardVotesTotal"),
  voteFeedback: document.getElementById("voteFeedback"),

  optionList: document.getElementById("optionList"),
  resultsList: document.getElementById("resultsList"),
  resultsPanel: document.getElementById("resultsPanel"),

  facilitatorPanel: document.getElementById("facilitatorPanel"),
  bigResults: document.getElementById("bigResults"),
  bigResultsPanel: document.getElementById("bigResultsPanel"),
  facilitatorHint: document.getElementById("facilitatorHint"),

  changeVoteBtn: document.getElementById("changeVoteBtn"),
  openVoteBtn: document.getElementById("openVoteBtn"),
  closeVoteBtn: document.getElementById("closeVoteBtn"),
  resetVotesBtn: document.getElementById("resetVotesBtn"),
  nextCardBtn: document.getElementById("nextCardBtn"),
  toggleResultsBtn: document.getElementById("toggleResultsBtn"),
  toggleScenarioBtn: document.getElementById("toggleScenarioBtn"),
};

if (isFacilitadora) {
  document.body.classList.add("facilitadora");
} else {
  els.facilitatorPanel?.classList.add("hidden");
  els.bigResultsPanel?.classList.add("hidden");
}

/* =========================================================
   6) CHAVES LOCAIS
========================================================= */

const localVoteKey = `${ROOM_ID}_choice`;
const localRoundKey = `${ROOM_ID}_round`;
const participantIdKey = `${ROOM_ID}_participant_id`;

/* =========================================================
   7) ESTADO
========================================================= */

let currentState = null;
let transport = null;

/* =========================================================
   8) UTILS
========================================================= */

function getParticipantId() {
  let id = localStorage.getItem(participantIdKey);
  if (!id) {
    id = `p_${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`;
    localStorage.setItem(participantIdKey, id);
  }
  return id;
}

const participantId = getParticipantId();

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function deepClone(value) {
  return JSON.parse(JSON.stringify(value));
}

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function isFirebaseUrl(url) {
  if (typeof url !== "string") return false;
  return (
    /^https:\/\/[a-z0-9-]+(?:-default-rtdb)?\.firebaseio\.com\/?$/i.test(url) ||
    /^https:\/\/[a-z0-9-]+(?:-default-rtdb)?\.[a-z0-9-]+\.firebasedatabase\.app\/?$/i.test(
      url,
    )
  );
}

function isFirebaseConfigReady(config) {
  return (
    !!config &&
    !!config.apiKey &&
    !!config.projectId &&
    !!config.appId &&
    isFirebaseUrl(config.databaseURL)
  );
}

function safeSetText(el, value) {
  if (el) el.textContent = value ?? "";
}

function show(el) {
  if (el) el.style.display = "";
}

function hide(el) {
  if (el) el.style.display = "none";
}

function setConnectionStatus(text) {
  safeSetText(els.connectionStatus, text);
}

function getScenarioById(id) {
  return scenarios[id] || scenarios.restaurante;
}

function getNextScenarioId(currentId) {
  const keys = Object.keys(scenarios);
  const index = keys.indexOf(currentId);
  const nextIndex = index >= 0 ? (index + 1) % keys.length : 0;
  return keys[nextIndex];
}

function createOptionsState() {
  const options = {};
  for (const option of optionDefs) {
    options[option.id] = {
      title: option.title,
      votes: 0,
    };
  }
  return options;
}

function createScenarioPayload(scenarioId) {
  const scenario = getScenarioById(scenarioId);

  return {
    roundId: `round_${scenarioId}_${Date.now()}`,
    currentScenarioId: scenarioId,
    currentCardIndex: 0,
    voteOpen: true,
    resultsVisible: true,
    title: "Análise coletiva da situação",
    subtitle:
      "Vamos observar a situação, analisar os cards e escolher entre CAUSA, PROBLEMA e CONSEQUÊNCIA.",
    totalVotes: 0,
    scenario: {
      id: scenario.id,
      title: scenario.title,
      label: scenario.label || "Situação em análise",
      image: scenario.image,
      text: scenario.text,
      question: scenario.question,
      facilitatorHint: scenario.facilitatorHint,
      cards: shuffle([...scenario.cards]),
    },
    activeCardVotes: createOptionsState(),
    updatedAt: Date.now(),
  };
}

function getActiveCard(state) {
  const cards = state?.scenario?.cards || [];
  const index = Number(state?.currentCardIndex || 0);
  return cards[index] || null;
}

function getActiveCardNumber(state) {
  return Number(state?.currentCardIndex || 0) + 1;
}

function getActiveCardTotal(state) {
  return state?.scenario?.cards?.length || 0;
}

function resetCardVotingData(state) {
  state.activeCardVotes = createOptionsState();
  state.totalVotes = 0;
  state.roundId = `round_card_${state.currentScenarioId}_${state.currentCardIndex}_${Date.now()}`;
  state.updatedAt = Date.now();
  return state;
}

function getTypeLabel(type) {
  if (type === "causa") return "Causa";
  if (type === "problema") return "Problema central";
  if (type === "consequencia") return "Consequência";
  return type || "";
}

function renderVoteFeedback(state, localChoice) {
  if (!els.voteFeedback) return;

  const activeCard = getActiveCard(state);

  if (!localChoice || !activeCard) {
    els.voteFeedback.textContent = "";
    els.voteFeedback.className = "vote-feedback";
    return;
  }

  const isCorrect = localChoice === activeCard.correctType;

  els.voteFeedback.textContent = isCorrect
    ? "✅ Sua resposta está correta."
    : `❌ Sua resposta não corresponde ao gabarito. Resposta esperada: ${getTypeLabel(activeCard.correctType)}.`;

  els.voteFeedback.className = `vote-feedback ${isCorrect ? "is-correct" : "is-wrong"}`;
}

/* =========================================================
   9) RENDER
========================================================= */

function render(state) {
  if (!state) return;

  const savedRoundId = localStorage.getItem(localRoundKey);
  if (savedRoundId && savedRoundId !== state.roundId) {
    localStorage.removeItem(localVoteKey);
  }
  localStorage.setItem(localRoundKey, state.roundId);

  currentState = state;

  const scenario = state.scenario || {};
  const activeCard = getActiveCard(state);
  const totalVotes = Number(state.totalVotes || 0);
  const localChoice = localStorage.getItem(localVoteKey);

  safeSetText(els.pollTitle, state.title || "Análise coletiva da situação");
  safeSetText(els.pollSubtitle, state.subtitle || "");
  safeSetText(els.totalVotes, totalVotes);
  safeSetText(els.cardVotesTotal, totalVotes);
  safeSetText(
    els.myVote,
    localChoice
      ? state.activeCardVotes?.[localChoice]?.title || localChoice
      : "nenhuma",
  );
  safeSetText(els.currentScenarioPill, `Caso: ${scenario.id || "-"}`);
  safeSetText(els.currentCardPill, `Card: ${getActiveCardNumber(state)}`);
  safeSetText(
    els.questionText,
    scenario.question || "Este card deve ser compreendido como:",
  );
  safeSetText(
    els.facilitatorHint,
    scenario.facilitatorHint || "Use a votação para abrir a discussão.",
  );

  if (els.sceneImage) {
    els.sceneImage.src = scenario.image || "";
    els.sceneImage.alt = scenario.title || "Cena da situação analisada";
  }

  safeSetText(els.sceneLabel, scenario.label || "Situação em análise");
  safeSetText(els.sceneTitle, scenario.title || "Situação");
  safeSetText(els.sceneText, scenario.text || "");

  renderActiveCard(activeCard, state);
  renderCardsGallery(state);
  renderOptions(state, localChoice);
  renderResults(state, totalVotes);
  renderBigResults(state, totalVotes);
  updateButtonsState(state.voteOpen, localChoice);
  updateResultsVisibility(state);
  renderVoteFeedback(state, localChoice);
}

function renderActiveCard(card, state) {
  if (!els.activeCard) return;

  if (!card) {
    els.activeCard.innerHTML = `<p>Nenhum card disponível.</p>`;
    safeSetText(els.cardCounter, "0 de 0");
    return;
  }

  safeSetText(
    els.cardCounter,
    `${getActiveCardNumber(state)} de ${getActiveCardTotal(state)}`,
  );

  els.activeCard.innerHTML = `
    <div class="active-card-inner">
      <div class="active-card-media">
        <img src="${escapeHtml(card.image || "")}" alt="${escapeHtml(card.text || "Card")}" />
      </div>
      <div class="active-card-body">
        <span class="scene-label">Hipótese em análise</span>
        <p class="active-card-text">${escapeHtml(card.text || "")}</p>
      </div>
    </div>
  `;
}

function renderCardsGallery(state) {
  if (!els.cardsGrid) return;

  const cards = state?.scenario?.cards || [];
  const activeIndex = Number(state?.currentCardIndex || 0);

  els.cardsGrid.innerHTML = "";

  cards.forEach((card, index) => {
    const item = document.createElement("div");
    item.className = `mini-card ${index === activeIndex ? "is-active" : ""}`;
    item.innerHTML = `
      <div class="mini-card-media">
        <img src="${escapeHtml(card.image || "")}" alt="${escapeHtml(card.text || "")}" />
      </div>
      <div class="mini-card-body">
        <small>Card ${index + 1}</small>
        <p>${escapeHtml(card.text || "")}</p>
      </div>
    `;
    els.cardsGrid.appendChild(item);
  });
}

function renderOptions(state, localChoice) {
  if (!els.optionList) return;

  const iconMap = {
    causa: "img/raiz.jpg",
    problema: "img/tronco.jpeg",
    consequencia: "img/copa.jpeg",
  };

  els.optionList.innerHTML = "";

  for (const option of optionDefs) {
    const live = state.activeCardVotes?.[option.id];
    if (!live) continue;

    const button = document.createElement("button");
    button.type = "button";
    button.dataset.optionId = option.id;
    button.className = `tree-option ${option.id} ${localChoice === option.id ? "is-voted" : ""}`;
    button.disabled = !state.voteOpen || !!localChoice || isFacilitadora;

    button.innerHTML = `
        <div class="tree-option-icon ${option.id}">
            <img src="${iconMap[option.id]}" alt="${option.id}" />
        </div>

      <div class="tree-option-content">
        <span class="tree-option-kicker">${escapeHtml(live.kicker)}</span>
        <h3 class="tree-option-title">${escapeHtml(live.title)}</h3>
        <div class="tree-option-help">${escapeHtml(live.help)}</div>
      </div>
    `;

    button.addEventListener("click", () => vote(option.id));
    els.optionList.appendChild(button);
  }
}

function renderResults(state, totalVotes) {
  if (!els.resultsList) return;

  els.resultsList.innerHTML = "";

  for (const option of optionDefs) {
    const live = state.activeCardVotes?.[option.id];
    if (!live) continue;

    const votes = Number(live.votes || 0);
    const percent = totalVotes > 0 ? Math.round((votes / totalVotes) * 100) : 0;

    const item = document.createElement("div");
    item.className = "result-item";
    item.innerHTML = `
      <div class="result-top">
        <strong>${escapeHtml(live.title)}</strong>
        <span>${votes} resposta(s) • ${percent}%</span>
      </div>
      <div class="bar">
        <div class="fill ${escapeHtml(option.id)}" style="width:${percent}%"></div>
      </div>
    `;
    els.resultsList.appendChild(item);
  }
}

function renderBigResults(state, totalVotes) {
  if (!isFacilitadora || !els.bigResults) return;

  els.bigResults.innerHTML = "";

  const maxVotes = Math.max(
    ...optionDefs.map((option) =>
      Number(state.activeCardVotes?.[option.id]?.votes || 0),
    ),
    0,
  );

  for (const option of optionDefs) {
    const live = state.activeCardVotes?.[option.id];
    if (!live) continue;

    const votes = Number(live.votes || 0);
    const percent = totalVotes > 0 ? Math.round((votes / totalVotes) * 100) : 0;
    const isLeading = maxVotes > 0 && votes === maxVotes;

    const item = document.createElement("div");
    item.className = `big-result ${isLeading ? "is-leading" : ""}`;
    item.innerHTML = `
      <div class="result-top">
        <strong>${escapeHtml(live.title)}</strong>
        <span>${votes} resposta(s) • ${percent}%</span>
      </div>
      <div class="bar">
        <div class="fill ${escapeHtml(option.id)}" style="width:${percent}%"></div>
      </div>
    `;
    els.bigResults.appendChild(item);
  }
}

function updateButtonsState(voteOpen, localChoice) {
  if (els.openVoteBtn) els.openVoteBtn.disabled = !!voteOpen;
  if (els.closeVoteBtn) els.closeVoteBtn.disabled = !voteOpen;
  if (els.changeVoteBtn) els.changeVoteBtn.disabled = !localChoice || !voteOpen;
}

function updateResultsVisibility(state) {
  const visible = state.resultsVisible !== false;

  if (visible) {
    show(els.resultsPanel);
    if (isFacilitadora) show(els.bigResultsPanel);
  } else {
    hide(els.resultsPanel);
    if (isFacilitadora) hide(els.bigResultsPanel);
  }

  if (isFacilitadora && els.toggleResultsBtn) {
    els.toggleResultsBtn.textContent = visible
      ? "Ocultar resultados"
      : "Mostrar resultados";
  }
}

/* =========================================================
   10) LOCAL TRANSPORT
========================================================= */

function createLocalTransport() {
  let state = createScenarioPayload(currentScenarioId);
  const listeners = new Set();

  function emit() {
    for (const listener of listeners) {
      listener(deepClone(state));
    }
  }

  return {
    mode: "local",

    async ensureRoomExists() {
      state = createScenarioPayload(currentScenarioId);
      emit();
    },

    subscribe(callback) {
      listeners.add(callback);
      callback(deepClone(state));
      return () => listeners.delete(callback);
    },

    async vote(optionId, previousChoice) {
      if (!state.voteOpen) return;
      if (!state.activeCardVotes?.[optionId]) return;

      if (previousChoice && state.activeCardVotes?.[previousChoice]) {
        state.activeCardVotes[previousChoice].votes = Math.max(
          0,
          Number(state.activeCardVotes[previousChoice].votes || 0) - 1,
        );
        state.totalVotes = Math.max(0, Number(state.totalVotes || 0) - 1);
      }

      state.activeCardVotes[optionId].votes =
        Number(state.activeCardVotes[optionId].votes || 0) + 1;
      state.totalVotes = Number(state.totalVotes || 0) + 1;
      state.updatedAt = Date.now();
      emit();
    },

    async clearVote(previousChoice) {
      if (!previousChoice || !state.activeCardVotes?.[previousChoice]) return;

      state.activeCardVotes[previousChoice].votes = Math.max(
        0,
        Number(state.activeCardVotes[previousChoice].votes || 0) - 1,
      );
      state.totalVotes = Math.max(0, Number(state.totalVotes || 0) - 1);
      state.updatedAt = Date.now();
      emit();
    },

    async setVoteOpen(value) {
      state.voteOpen = !!value;
      state.updatedAt = Date.now();
      emit();
    },

    async setResultsVisible(value) {
      state.resultsVisible = !!value;
      state.updatedAt = Date.now();
      emit();
    },

    async resetVotes() {
      state = resetCardVotingData(state);
      emit();
    },

    async nextCard() {
      const cards = state?.scenario?.cards || [];
      const currentIndex = Number(state.currentCardIndex || 0);

      if (currentIndex >= cards.length - 1) return;

      state.currentCardIndex = currentIndex + 1;
      state.voteOpen = true;
      state.resultsVisible = true;
      state = resetCardVotingData(state);
      emit();
    },

    async toggleScenario() {
      const nextId = getNextScenarioId(state.currentScenarioId);
      state = createScenarioPayload(nextId);
      emit();
    },
  };
}

/* =========================================================
   11) FIREBASE TRANSPORT
========================================================= */

function createFirebaseTransport(config) {
  const app = initializeApp(config);
  const db = getDatabase(app);
  const roomRef = ref(db, `fortaleceRedes/${ROOM_ID}`);

  return {
    mode: "firebase",

    async ensureRoomExists() {
      if (FORCE_RESET_ON_LOAD) {
        await set(roomRef, createScenarioPayload(currentScenarioId));
      }
    },

    subscribe(callback) {
      return onValue(
        roomRef,
        (snapshot) => {
          const state = snapshot.val();
          if (state) {
            callback(state);
          } else {
            const fresh = createScenarioPayload(currentScenarioId);
            set(roomRef, fresh);
          }
        },
        (error) => {
          console.error("Erro no onValue:", error);
          setConnectionStatus("modo local");
          transport = createLocalTransport();
          transport.ensureRoomExists().then(() => {
            transport.subscribe((state) => {
              setConnectionStatus("modo local");
              render(state);
            });
          });
        },
      );
    },

    async vote(optionId, previousChoice) {
      await runTransaction(roomRef, (current) => {
        if (!current || !current.voteOpen) return current;
        if (!current.activeCardVotes?.[optionId]) return current;

        if (previousChoice && current.activeCardVotes?.[previousChoice]) {
          current.activeCardVotes[previousChoice].votes = Math.max(
            0,
            Number(current.activeCardVotes[previousChoice].votes || 0) - 1,
          );
          current.totalVotes = Math.max(0, Number(current.totalVotes || 0) - 1);
        }

        current.activeCardVotes[optionId].votes =
          Number(current.activeCardVotes[optionId].votes || 0) + 1;
        current.totalVotes = Number(current.totalVotes || 0) + 1;
        current.updatedAt = Date.now();
        return current;
      });
    },

    async clearVote(previousChoice) {
      if (!previousChoice) return;

      await runTransaction(roomRef, (current) => {
        if (!current || !current.activeCardVotes?.[previousChoice])
          return current;

        current.activeCardVotes[previousChoice].votes = Math.max(
          0,
          Number(current.activeCardVotes[previousChoice].votes || 0) - 1,
        );
        current.totalVotes = Math.max(0, Number(current.totalVotes || 0) - 1);
        current.updatedAt = Date.now();
        return current;
      });
    },

    async setVoteOpen(value) {
      await update(roomRef, {
        voteOpen: !!value,
        updatedAt: Date.now(),
      });
    },

    async setResultsVisible(value) {
      await update(roomRef, {
        resultsVisible: !!value,
        updatedAt: Date.now(),
      });
    },

    async resetVotes() {
      await runTransaction(roomRef, (current) => {
        if (!current) return current;
        return resetCardVotingData(current);
      });
    },

    async nextCard() {
      await runTransaction(roomRef, (current) => {
        if (!current) return current;

        const cards = current?.scenario?.cards || [];
        const currentIndex = Number(current.currentCardIndex || 0);

        if (currentIndex >= cards.length - 1) return current;

        current.currentCardIndex = currentIndex + 1;
        current.voteOpen = true;
        current.resultsVisible = true;
        return resetCardVotingData(current);
      });
    },

    async toggleScenario() {
      const scenarioId = currentState?.currentScenarioId || currentScenarioId;
      const nextId = getNextScenarioId(scenarioId);
      await set(roomRef, createScenarioPayload(nextId));
    },
  };
}

/* =========================================================
   12) BUILD TRANSPORT
========================================================= */

function buildTransport() {
  if (!isFirebaseConfigReady(firebaseConfig)) {
    setConnectionStatus("modo local");
    return createLocalTransport();
  }

  try {
    setConnectionStatus("conectando...");
    return createFirebaseTransport(firebaseConfig);
  } catch (error) {
    console.error("Falha ao iniciar Firebase:", error);
    setConnectionStatus("modo local");
    return createLocalTransport();
  }
}

/* =========================================================
   13) AÇÕES PARTICIPANTE
========================================================= */

async function vote(optionId) {
  if (isFacilitadora) {
    alert("A tela da facilitadora é apenas para condução.");
    return;
  }

  if (!currentState?.voteOpen) {
    alert("A votação deste card está encerrada.");
    return;
  }

  const previousChoice = localStorage.getItem(localVoteKey);
  if (previousChoice) {
    alert("Você já votou neste card. Use 'Alterar minha escolha' se precisar.");
    return;
  }

  localStorage.setItem(localVoteKey, optionId);
  render(currentState);

  try {
    await transport.vote(optionId, previousChoice);
  } catch (error) {
    console.error(error);
    localStorage.removeItem(localVoteKey);
    render(currentState);
    alert("Não foi possível registrar a resposta.");
  }
}

async function clearMyChoice() {
  const previousChoice = localStorage.getItem(localVoteKey);
  if (!previousChoice || !currentState?.voteOpen) return;

  try {
    await transport.clearVote(previousChoice);
    localStorage.removeItem(localVoteKey);
    safeSetText(els.myVote, "nenhuma");
  } catch (error) {
    console.error(error);
    alert("Não foi possível alterar sua escolha.");
  }
}

els.changeVoteBtn?.addEventListener("click", clearMyChoice);

/* =========================================================
   14) AÇÕES FACILITADORA
========================================================= */

async function setVoteOpen(value) {
  if (!isFacilitadora) return;
  await transport.setVoteOpen(value);
}

async function resetVotes() {
  if (!isFacilitadora) return;
  await transport.resetVotes();
  localStorage.removeItem(localVoteKey);
}

async function nextCard() {
  if (!isFacilitadora) return;
  await transport.nextCard();
  localStorage.removeItem(localVoteKey);
}

async function toggleScenario() {
  if (!isFacilitadora) return;
  await transport.toggleScenario();
  localStorage.removeItem(localVoteKey);
}

async function toggleResultsVisibility() {
  if (!isFacilitadora) return;
  const currentVisible = currentState?.resultsVisible !== false;
  await transport.setResultsVisible(!currentVisible);
}

els.openVoteBtn?.addEventListener("click", () => setVoteOpen(true));
els.closeVoteBtn?.addEventListener("click", () => setVoteOpen(false));
els.resetVotesBtn?.addEventListener("click", resetVotes);
els.nextCardBtn?.addEventListener("click", nextCard);
els.toggleScenarioBtn?.addEventListener("click", toggleScenario);
els.toggleResultsBtn?.addEventListener("click", toggleResultsVisibility);

/* =========================================================
   15) TESTES
========================================================= */

function runTests() {
  const tests = [
    {
      name: "URL Firebase válida",
      test: () =>
        isFirebaseUrl("https://quiz-arvore-default-rtdb.firebaseio.com") ===
        true,
    },
    {
      name: "Config Firebase válida",
      test: () => isFirebaseConfigReady(firebaseConfig) === true,
    },
    {
      name: "Cenário inicial existe",
      test: () => !!scenarios[currentScenarioId],
    },
    {
      name: "Cenário tem cards",
      test: () => Array.isArray(scenarios[currentScenarioId].cards),
    },
  ];

  let passed = 0;
  for (const item of tests) {
    const ok = item.test();
    if (ok) passed += 1;
    console.assert(ok, `[teste] ${item.name}`);
  }

  console.info(
    `[teste] ${passed}/${tests.length} testes passaram. participante=${participantId}`,
  );
}

/* =========================================================
   16) INIT
========================================================= */

async function init() {
  runTests();
  transport = buildTransport();

  try {
    await transport.ensureRoomExists();

    transport.subscribe((state) => {
      setConnectionStatus(
        transport.mode === "firebase" ? "ao vivo" : "modo local",
      );
      render(state);
    });
  } catch (error) {
    console.error("Falha ao iniciar app:", error);
    setConnectionStatus("modo local");

    transport = createLocalTransport();
    await transport.ensureRoomExists();
    transport.subscribe((state) => {
      setConnectionStatus("modo local");
      render(state);
    });
  }
}

init();
