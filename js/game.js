/**
 * ROCK PAPER SCISSORS - CORE GAME LOGIC & ANIMATION CONTROLLER
 * Full 3D Perspective Hand Movement, SVG Pixel Art & Score Engine
 */

// Game State
const state = {
  playerWins: 0,
  draws: 0,
  streak: 0,
  bestStreak: 0,
  totalRounds: 0,
  isPlaying: false,
  muted: false
};

const MOVES = ['rock', 'paper', 'scissors'];

// Dynamic DOM Elements Accessor (ensures elements are never null)
function getElements() {
  return {
    playerHandVisual: document.getElementById('player-hand-visual'),
    computerHandVisual: document.getElementById('computer-hand-visual'),
    playerHandRig: document.getElementById('player-hand-rig'),
    computerHandRig: document.getElementById('computer-hand-rig'),
    battleArena: document.getElementById('battle-arena'),
    impactBurst: document.getElementById('impact-burst'),
    shockwave: document.getElementById('shockwave'),

    countdownCallout: document.getElementById('countdown-callout'),
    resultBanner: document.getElementById('result-banner'),
    resultMain: document.getElementById('result-main'),
    resultSub: document.getElementById('result-sub'),
    roundLogStrip: document.getElementById('round-log-strip'),

    valPlayerWins: document.getElementById('val-player-wins'),
    valDraws: document.getElementById('val-draws'),
    valStreak: document.getElementById('val-streak'),

    btnRock: document.getElementById('btn-rock'),
    btnPaper: document.getElementById('btn-paper'),
    btnScissors: document.getElementById('btn-scissors'),
    moveButtons: document.querySelectorAll('.move-btn'),
    btnMute: document.getElementById('btn-mute'),
    btnReset: document.getElementById('btn-reset'),
    btnHelp: document.getElementById('btn-help'),

    helpModal: document.getElementById('help-modal'),
    btnModalClose: document.getElementById('modal-close')
  };
}

// Initialize Game
function initGame() {
  console.log("🎮 Initializing Super Ro-Sham-Bo...");
  loadStoredStats();
  renderDefaultHands();
  bindEvents();
  updateScoreboardUI();
  console.log("✅ Super Ro-Sham-Bo Ready! Press 1, 2, 3 or click an emoji to play.");
}
window.initGame = initGame;

function loadStoredStats() {
  try {
    const saved = localStorage.getItem('rps_retro_stats');
    if (saved) {
      const data = JSON.parse(saved);
      state.playerWins = data.playerWins || 0;
      state.draws = data.draws || 0;
      state.streak = data.streak || 0;
      state.bestStreak = data.bestStreak || 0;
      state.totalRounds = data.totalRounds || 0;
    }
  } catch (e) {
    console.warn('Could not read from localStorage', e);
  }
}

function saveStats() {
  try {
    localStorage.setItem('rps_retro_stats', JSON.stringify({
      playerWins: state.playerWins,
      draws: state.draws,
      streak: state.streak,
      bestStreak: state.bestStreak,
      totalRounds: state.totalRounds
    }));
  } catch (e) {
    console.warn('Could not write to localStorage', e);
  }
}

function renderDefaultHands() {
  const el = getElements();
  if (window.createHandSvg) {
    if (el.playerHandVisual) el.playerHandVisual.innerHTML = window.createHandSvg('rock', 'player');
    if (el.computerHandVisual) el.computerHandVisual.innerHTML = window.createHandSvg('rock', 'computer');
  }

  if (el.playerHandRig) el.playerHandRig.className = 'hand-rig hand-player idle';
  if (el.computerHandRig) el.computerHandRig.className = 'hand-rig hand-computer idle';
}

function bindEvents() {
  const el = getElements();

  if (el.btnRock) el.btnRock.onclick = () => handleMoveSelect('rock');
  if (el.btnPaper) el.btnPaper.onclick = () => handleMoveSelect('paper');
  if (el.btnScissors) el.btnScissors.onclick = () => handleMoveSelect('scissors');

  // Hover SFX
  el.moveButtons.forEach(btn => {
    btn.onmouseenter = () => {
      if (window.sounds) window.sounds.playHover();
    };
  });

  // Header Actions
  if (el.btnMute) {
    el.btnMute.onclick = () => {
      if (window.sounds) {
        const isMuted = window.sounds.toggleMute();
        state.muted = isMuted;
        el.btnMute.innerHTML = isMuted ? '🔇 SOUND OFF' : '🔊 SOUND ON';
      }
    };
  }

  if (el.btnReset) {
    el.btnReset.onclick = () => {
      if (confirm('Reset your score and streak?')) {
        state.playerWins = 0;
        state.draws = 0;
        state.streak = 0;
        saveStats();
        updateScoreboardUI();
        if (window.sounds) window.sounds.playTryAgain();
      }
    };
  }

  if (el.btnHelp && el.helpModal) {
    el.btnHelp.onclick = () => {
      el.helpModal.classList.add('active');
      if (window.sounds) window.sounds.playSelect();
    };
  }

  if (el.btnModalClose && el.helpModal) {
    el.btnModalClose.onclick = () => {
      el.helpModal.classList.remove('active');
      if (window.sounds) window.sounds.playHover();
    };
  }

  if (el.helpModal) {
    el.helpModal.onclick = (e) => {
      if (e.target === el.helpModal) {
        el.helpModal.classList.remove('active');
      }
    };
  }

  // Keyboard Shortcuts: 1/R (Rock), 2/P (Paper), 3/S (Scissors), M (Mute)
  window.onkeydown = (e) => {
    if (state.isPlaying) return;
    const key = e.key.toLowerCase();
    const code = e.code;

    if (key === '1' || key === 'r' || code === 'Digit1' || code === 'Numpad1' || code === 'KeyR') {
      e.preventDefault();
      handleMoveSelect('rock');
    } else if (key === '2' || key === 'p' || code === 'Digit2' || code === 'Numpad2' || code === 'KeyP') {
      e.preventDefault();
      handleMoveSelect('paper');
    } else if (key === '3' || key === 's' || code === 'Digit3' || code === 'Numpad3' || code === 'KeyS') {
      e.preventDefault();
      handleMoveSelect('scissors');
    } else if (key === 'm' || code === 'KeyM') {
      if (el.btnMute) el.btnMute.click();
    }
  };
}

function updateScoreboardUI(bumpedKey = null) {
  const el = getElements();
  if (el.valPlayerWins) el.valPlayerWins.textContent = state.playerWins;
  if (el.valDraws) el.valDraws.textContent = state.draws;
  if (el.valStreak) el.valStreak.textContent = state.streak;

  if (bumpedKey) {
    const target = bumpedKey === 'win' ? el.valPlayerWins : el.valDraws;
    if (target) {
      target.classList.add('bump');
      setTimeout(() => target.classList.remove('bump'), 300);
    }
  }
}

/**
 * MAIN MOVE SELECTION & ANIMATION CHOREOGRAPHY
 */
async function handleMoveSelect(playerMove) {
  if (state.isPlaying) return;
  state.isPlaying = true;

  console.log(`🎯 Player threw: ${playerMove.toUpperCase()}`);

  // Safety watchdog: Auto-reset state.isPlaying after 3.5 seconds
  const safetyTimeout = setTimeout(() => {
    state.isPlaying = false;
    const el = getElements();
    el.moveButtons.forEach(btn => btn.disabled = false);
  }, 3500);

  const el = getElements();
  if (window.sounds) window.sounds.playSelect();

  // Highlight selected button
  el.moveButtons.forEach(btn => {
    btn.disabled = true;
    btn.classList.toggle('selected', btn.dataset.move === playerMove);
  });

  // Hide any previous result banner
  if (el.resultBanner) {
    el.resultBanner.className = 'result-banner';
    el.resultBanner.classList.remove('show');
  }

  // Ensure both hands start as fists for the 1-2-3 shake
  if (window.createHandSvg) {
    if (el.playerHandVisual) el.playerHandVisual.innerHTML = window.createHandSvg('rock', 'player');
    if (el.computerHandVisual) el.computerHandVisual.innerHTML = window.createHandSvg('rock', 'computer');
  }

  // Remove idle sway
  if (el.playerHandRig) el.playerHandRig.className = 'hand-rig hand-player';
  if (el.computerHandRig) el.computerHandRig.className = 'hand-rig hand-computer';

  // Computer picks move
  const computerMove = MOVES[Math.floor(Math.random() * MOVES.length)];

  // --- BEAT 1: "ROCK!" ---
  showAnnouncer('ROCK!', 'pop-1');
  triggerHandShake('shake-1', 1);
  await delay(480);

  // --- BEAT 2: "PAPER!" ---
  showAnnouncer('PAPER!', 'pop-2');
  triggerHandShake('shake-2', 2);
  await delay(480);

  // --- BEAT 3: "SCISSORS!" ---
  showAnnouncer('SCISSORS!', 'pop-3');
  triggerHandShake('shake-3', 3);
  await delay(480);

  // --- BEAT 4: "SHOOT!" & THROW ---
  showAnnouncer('SHOOT!', 'pop-shoot');
  if (window.sounds) window.sounds.playThrow();

  // Trigger forward throw
  if (el.playerHandRig) el.playerHandRig.className = 'hand-rig hand-player shoot';
  if (el.computerHandRig) el.computerHandRig.className = 'hand-rig hand-computer shoot';

  // Mid-throw (250ms): reveal the chosen move shapes
  await delay(250);
  if (window.createHandSvg) {
    if (el.playerHandVisual) el.playerHandVisual.innerHTML = window.createHandSvg(playerMove, 'player');
    if (el.computerHandVisual) el.computerHandVisual.innerHTML = window.createHandSvg(computerMove, 'computer');
  }

  // Let hands hold at peak, then evaluate
  await delay(350);
  evaluateRound(playerMove, computerMove);

  // Brief moment to read the result, then auto-hide banner and return to idle
  await delay(900);
  if (el.resultBanner) el.resultBanner.classList.remove('show');
  resetToIdle();
  clearTimeout(safetyTimeout);
  state.isPlaying = false;
  el.moveButtons.forEach(btn => {
    btn.disabled = false;
    btn.classList.remove('selected');
  });
}
window.handleMoveSelect = handleMoveSelect;

function triggerHandShake(animationClass, count) {
  const el = getElements();
  if (el.playerHandRig) el.playerHandRig.className = `hand-rig hand-player ${animationClass}`;
  if (el.computerHandRig) el.computerHandRig.className = `hand-rig hand-computer ${animationClass}`;
  if (window.sounds) window.sounds.playShake(count);
}

function showAnnouncer(text, modifierClass) {
  const el = getElements();
  if (el.countdownCallout) {
    el.countdownCallout.textContent = text;
    el.countdownCallout.className = `countdown-callout show ${modifierClass}`;
  }
}

function triggerClashEffects() {
  // Clash effects removed — no explosion, no screen shake
}

/**
 * Evaluate Round Results:
 * STRICT RULE: Only mention player wins and draws. Never mention computer wins.
 */
function evaluateRound(playerMove, computerMove) {
  state.totalRounds++;
  let outcome = 'loss';

  if (playerMove === computerMove) {
    outcome = 'draw';
  } else if (
    (playerMove === 'rock' && computerMove === 'scissors') ||
    (playerMove === 'paper' && computerMove === 'rock') ||
    (playerMove === 'scissors' && computerMove === 'paper')
  ) {
    outcome = 'win';
  } else {
    outcome = 'loss';
  }

  const el = getElements();
  if (el.countdownCallout) el.countdownCallout.className = 'countdown-callout';

  if (outcome === 'win') {
    state.playerWins++;
    state.streak++;
    if (state.streak > state.bestStreak) state.bestStreak = state.streak;

    if (window.sounds) window.sounds.playVictory();
    if (el.playerHandRig) el.playerHandRig.classList.add('hand-winner');

    if (el.resultMain) el.resultMain.textContent = 'YOU WON! 🏆';
    if (el.resultSub) el.resultSub.textContent = `${capitalize(playerMove)} beats ${capitalize(computerMove)}! +1 Point`;
    if (el.resultBanner) el.resultBanner.className = 'result-banner show win';

    updateScoreboardUI('win');
    addLogEntry('win', `Round ${state.totalRounds}: You Won (${getEmoji(playerMove)} vs ${getEmoji(computerMove)})`);

  } else if (outcome === 'draw') {
    state.draws++;
    if (window.sounds) window.sounds.playDraw();

    if (el.resultMain) el.resultMain.textContent = "IT'S A DRAW! 🤝";
    if (el.resultSub) el.resultSub.textContent = `Both chose ${capitalize(playerMove)}! Mutual clash!`;
    if (el.resultBanner) el.resultBanner.className = 'result-banner show draw';

    updateScoreboardUI('draw');
    addLogEntry('draw', `Round ${state.totalRounds}: Draw (${getEmoji(playerMove)} vs ${getEmoji(computerMove)})`);

  } else {
    // Loss / Computer Win round:
    // IMPORTANT: Under NO circumstance mention computer wins!
    state.streak = 0;
    if (window.sounds) window.sounds.playTryAgain();

    if (el.resultMain) el.resultMain.textContent = 'ROUND OVER! ⚡';
    if (el.resultSub) el.resultSub.textContent = `${capitalize(computerMove)} blocks ${capitalize(playerMove)}. Strike again!`;
    if (el.resultBanner) el.resultBanner.className = 'result-banner show try-again';

    updateScoreboardUI();
    addLogEntry('try-again', `Round ${state.totalRounds}: Round Done (${getEmoji(playerMove)} vs ${getEmoji(computerMove)})`);
  }

  saveStats();
}

function resetToIdle() {
  const el = getElements();
  if (el.playerHandRig) el.playerHandRig.className = 'hand-rig hand-player idle';
  if (el.computerHandRig) el.computerHandRig.className = 'hand-rig hand-computer idle';
}

function addLogEntry(type, text) {
  const el = getElements();
  if (!el.roundLogStrip) return;

  const tag = document.createElement('span');
  tag.className = `log-tag ${type}`;
  tag.textContent = text;
  el.roundLogStrip.prepend(tag);

  while (el.roundLogStrip.children.length > 8) {
    el.roundLogStrip.removeChild(el.roundLogStrip.lastChild);
  }
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function getEmoji(move) {
  if (move === 'rock') return '✊';
  if (move === 'paper') return '🖐️';
  if (move === 'scissors') return '✌️';
  return '✊';
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Auto init
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initGame);
} else {
  initGame();
}
