# Super Rock Paper Scissors (Retro 16-Bit Edition) ✊🖐️✌️

A retro arcade web game replicating the physical motion of human hands playing Rock-Paper-Scissors with 3D perspective depth, authentic Mario-style pixel art sprites, dynamic 8-bit sound effects, and a focused player scoreboard.

---

## 🌟 Key Features

1. **Realistic Human Hand Movement & 3D Depth**:
   - **Player's Hand**: Anchored at the bottom-right of the screen, close to the player in 3D perspective.
   - **Rhythmic 1-2-3 Shake ("Ro-Sham-Bo")**: Realistic windup motion pumping from bottom-right (near screen) to bottom-left/center (far into the screen).
   - **The Shoot Thrust**: On the count of "SHOOT!", both hands surge into the center clash zone, dynamically morphing fingers into the selected gesture (Rock ✊, Paper 🖐️, or Scissors ✌️).
   - **Computer's Hand**: Anchored at the top, thrusting downwards in synchrony.
   - **Clash Zone**: Comic-style impact starburst, shockwaves, screen rumble, and clash audio.

2. **Pixel-Art Visual Design (Mario / Retro Arcade Style)**:
   - Hand-crafted SVG pixel matrices with `shape-rendering="crispEdges"` ensuring razor-sharp rendering on 1080p, 4K, or mobile screens.
   - Anatomically detailed 16-bit sprites with knuckles, joints, fingernails, palm creases, and retro cuffs (Mario red for player, cyber indigo for computer).

3. **Player-Focused Scoreboard**:
   - Strictly records **Player Wins** (🏆), **Draws** (🤝), and active **Win Streaks** (🔥).
   - In full compliance with project specifications, **Computer Wins are never displayed or counted**.

4. **Zero-Dependency 8-Bit Web Audio Engine**:
   - Built with the native Web Audio API (`audio.js`).
   - Dynamic real-time sound synthesis: shake whooshes, throw sweeps, impact hits, victory fanfare, and tie chimes.
   - No external `.mp3` files needed — 100% immune to CORS errors, broken links, or missing asset paths when deployed!

5. **Mobile & Android Optimized (PWA Ready)**:
   - Dynamic viewport sizing (`100dvh`) prevents browser address bar cut-offs on Android Chrome.
   - Touch-action optimizations (`touch-action: manipulation`) remove 300ms mobile tap delay and prevent accidental pull-to-refresh.
   - PWA web manifest (`manifest.json`): Can be installed directly to an Android home screen as a standalone app!
   - Responsive touch layout with thumb-friendly controls and scaled hand animations.

6. **Controls**:
   - Touch/Click large emoji buttons: `✊ ROCK`, `🖐️ PAPER`, `✌️ SCISSORS`.
   - Keyboard shortcuts (on desktop): `[1]` or `[R]`, `[2]` or `[P]`, `[3]` or `[S]`, and `[M]` to mute.

---

## 🚀 How to Deploy in 60 Seconds (Free & Instant)

To submit this mini project and receive full marks, you can deploy it to any of the following platforms for free:

### Option 1: GitHub Pages (Recommended for College Submissions)
1. Initialize git and commit your files:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Rock Paper Scissors Mini Project"
   ```
2. Create a new repository on [GitHub](https://github.com) (e.g. `rock-paper-scissors`).
3. Link your local repo and push:
   ```bash
   git remote add origin https://github.com/<your-username>/rock-paper-scissors.git
   git branch -M main
   git push -u origin main
   ```
4. On GitHub, go to your repository **Settings** → **Pages** (under "Code and automation").
5. Under **Branch**, select `main` and `/ (root)`, then click **Save**.
6. Within 1 minute, GitHub provides your live URL: `https://<your-username>.github.io/rock-paper-scissors/`.

---

### Option 2: Netlify Drop (Fastest — No Git Required)
1. Go to [Netlify Drop](https://app.netlify.com/drop).
2. Simply drag and drop this entire project folder (`MiniProject`) into the upload box.
3. Your game is live instantly with an HTTPS link (e.g., `https://super-rps-arcade.netlify.app`)!

---

### Option 3: Vercel
1. Install Vercel CLI or connect your GitHub repository at [Vercel](https://vercel.com).
2. Click **Deploy**. Since this is a static web app, Vercel will deploy it in seconds with zero configuration.

---

## 💻 Running Locally

Simply double-click `index.html` or run a lightweight local server:

```bash
# Using Python (if available):
python -m http.server 8080

# Or using VS Code:
# Right-click index.html and select "Open with Live Server"
```
Open `http://localhost:8080` in any web browser.

---

## 📂 Project Architecture

```
MiniProject/
├── index.html         # Main modular web entry point (HUD, 3D battle arena & controls)
├── standalone.html    # 100% self-contained single-file version (CSS + SVG sprites + Audio + JS inlined)
├── css/
│   └── style.css      # 3D perspective transforms, hand animation rigs & CRT arcade theme
├── js/
│   ├── sprites.js     # 16-bit SVG pixel art generators for Rock, Paper, Scissors
│   ├── audio.js       # Web Audio API 8-bit sound synthesizer (no external assets)
│   └── game.js        # State machine, 1-2-3 shake orchestration & score tracking
└── README.md          # Project documentation & deployment manual
```

---

## 🎮 Game Rules
- ✊ **Rock** beats ✌️ **Scissors**
- 🖐️ **Paper** beats ✊ **Rock**
- ✌️ **Scissors** beats 🖐️ **Paper**
- Matching moves result in a **Draw** (🤝)
