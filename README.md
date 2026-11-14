# 🎂 Happy 22nd Birthday, Shekinah! 💙🩷

A romantic, interactive, static birthday website built as a gift for Shekinah's 22nd birthday from Adrian.

Designed with a clean, airy **white theme**, dreamy **baby blue** (`#BFE3F8` / `#8CCBEF`) and **soft pink** (`#F9C6D8` / `#F4A6C0`) pastel accents, romantic typography, floating hearts and sparkles, and smooth interactive moments.

Zero build tools, zero dependencies, no backend required — 100% pure HTML, CSS, and vanilla JavaScript that deploys for free on **GitHub Pages**.

---

## 🌟 Features

1. **Surprise Welcome Screen**: A full-screen pastel gradient greeting card with an "Open your gift" button that triggers celebratory confetti. (Includes an optional birthday/password lock!).
2. **Hero Milestone**: Animated typewriter headline: *"Happy 22nd Birthday, Shekinah!"* with floating bubbles and gentle glow.
3. **"Then" Childhood Gallery**: A polaroid-style photo carousel with tilted frames, sweet captions, auto-advancing slides, and touch-swipe support on phones.
4. **"Now" Gallery & Lightbox**: A gallery of recent photos. Tapping any picture opens a full-screen, accessible lightbox with swipe and keyboard arrow navigation.
5. **21 to 22 Milestone**: A dedicated feature showing her 21st birthday photo beside an animated number transition from Chapter 21 to Chapter 22.
6. **Interactive Birthday Cake**: An illustrated SVG cake with **6 candles**. She can tap individual candles to extinguish them or press *"Blow out the candles"* to blow them all out, firing confetti and unlocking a hidden birthday wish!
7. **"Reasons I Love You"**: Interactive 3D flip cards with hearts that spin around to reveal heartfelt personal messages.
8. **Our Memory Timeline**: A vertical timeline of milestones and shared memories with photos and date badges.
9. **Heartfelt Love Letter**: A closing love note whose lines fade in softly one after another as she scrolls down, signed with love.
10. **Replay Surprise & Music**: A *"Replay surprise"* button in the footer that bursts confetti again, plus a floating music button to play your favorite song together.

---

## 🚀 Quick Start (Previewing Locally)

You can view the website immediately on your computer:
1. Double-click `index.html` to open it in any web browser (Chrome, Safari, Edge, Firefox).
2. Or right-click `index.html` → **Open with** → your favorite browser.

Everything works out of the box with pastel placeholder graphics!

---

## 📸 How to Add Real Photos

Place your photos into the respective folders in the project root:

| Folder | What goes here |
|---|---|
| `images/then/` | Childhood photos (e.g., `childhood1.jpg`, `childhood2.jpg`, `childhood3.jpg`) |
| `images/now/` | Recent photos (e.g., `photo1.jpg`, `photo2.jpg`, `photo3.jpg`, `photo4.jpg`) |
| `images/21st/` | Her 21st birthday photo (e.g., `birthday21.jpg`) |

### Recommended Photo Tips
- **Formats**: Standard `.jpg`, `.jpeg`, `.png`, or `.webp`.
- **Size**: For fast loading on mobile, resize large photos so their longest side is around 1200px to 1600px.
- **Naming**: Use simple lowercase names without spaces (e.g., `images/now/beach-trip.jpg`).

After adding your photo files, open `js/config.js` and update the paths (see below).

---

## ✍️ How to Personalize Everything (`js/config.js`)

**You do NOT need to touch `index.html` or `css/style.css`!**  
All names, dates, photos, captions, love reasons, timeline stories, and the love letter live inside **`js/config.js`**.

Open `js/config.js` in any text editor (VS Code, Notepad, etc.) to customize:

### Configuration Reference Table

| Key | Description | Example |
|---|---|---|
| `names.hers` | Her name (used in titles, hero, and welcome screen) | `"Shekinah"` |
| `names.yours` | Your name (used in footer and letter sign-off) | `"Adrian"` |
| `birthday.date` | Birthday date string | `"November 11"` |
| `birthday.turning` | Age she is turning | `22` |
| `birthday.previous` | Previous year | `21` |
| `birthday.passwordGate` | Secret code required to open the site (`null` to turn off) | `"November 11"` or `null` |
| `music.src` | Relative path to background music MP3 | `"audio/birthday-song.mp3"` |
| `thenPhotos` | List of childhood photos `{ src, alt, caption }` | `[{ src: "images/then/baby.jpg", caption: "Look at that smile 🌸" }]` |
| `nowPhotos` | List of recent photos `{ src, alt, caption }` | `[{ src: "images/now/date.jpg", caption: "Always glowing 💙" }]` |
| `photo21st` | Her 21st photo `{ src, alt, caption }` | `{ src: "images/21st/photo.jpg", caption: "Chapter 21 🎂" }` |
| `loveReasons` | Array of 6 heartfelt reasons | `["The way your eyes light up...", ...]` |
| `timeline` | Array of timeline moments `{ date, title, text, photo }` | `[{ date: "Summer 2024", title: "First Trip", text: "...", photo: "..." }]` |
| `loveLetter.lines` | The lines of your letter (use empty string `""` for space between paragraphs) | `["Dear Shekinah,", "", "Happy Birthday...", ...]` |
| `loveLetter.cakeWishMessage` | Message revealed after blowing out cake candles | `"May every wish you make come true! 🌸"` |

> ⚠️ **Important**: Always use **relative paths** without a starting slash (e.g. `images/now/photo1.jpg`, **NOT** `/images/now/photo1.jpg`).

---

## 🎵 Adding Background Music

1. Put your favorite MP3 file into the `audio/` folder (for example: `audio/birthday-song.mp3`).
2. In `js/config.js`, verify `music.src` matches:
   ```javascript
   music: {
     src: "audio/birthday-song.mp3",
     label: "Play music 🎵",
   },
   ```
3. When she opens the site, the music plays automatically as she enters (immediately on load, or upon her very first touch / when clicking "Open your gift"). She can pause or resume anytime using the floating music button in the corner!

---

## 🔒 Optional Birthday Password Lock

If you want her to enter her birthday or a private nickname before the gift opens:
1. In `js/config.js`, set `passwordGate`:
   ```javascript
   passwordGate: "November 11",
   ```
   *(Or `"11/11"`, `"1111"`, etc. The check is case-insensitive and trims spaces).*
2. To turn it off so anyone can open it right away, set:
   ```javascript
   passwordGate: null,
   ```

---

## 🌐 Deploying for Free on GitHub Pages

You can host this website online for free so she can open it on her phone from a link like `https://your-username.github.io/birthday/`!

### Step 1: Initialize Git and Commit
Open PowerShell or your terminal in this project folder:

```bash
git init
git add .
git commit -m "Happy 22nd Birthday Gift Website"
```

### Step 2: Create a GitHub Repository
1. Go to [github.com/new](https://github.com/new).
2. Name your repository (e.g. `birthday` or `for-shekinah`).
3. Keep it **Public** (required for free GitHub Pages).
4. Click **Create repository**.

### Step 3: Push Your Code
Copy the commands shown on GitHub and run them:

```bash
git branch -M main
git remote add origin https://github.com/<YOUR-USERNAME>/<YOUR-REPO-NAME>.git
git push -u origin main
```

### Step 4: Turn on GitHub Pages
1. Go to your repository on GitHub.
2. Click **Settings** (tab with the gear icon near the top right).
3. In the left sidebar, click **Pages**.
4. Under **Build and deployment** > **Branch**:
   - Select **`main`** from the dropdown.
   - Leave the folder as **`/ (root)`**.
   - Click **Save**.
5. Wait 1–2 minutes! GitHub will display your live link:
   `https://<YOUR-USERNAME>.github.io/<YOUR-REPO-NAME>/`

Send the link to her on her special day! 🎁

---

## 🛠️ Troubleshooting

- **Images not appearing on GitHub Pages?**
  - Check file names: GitHub Pages is case-sensitive (`Photo.jpg` is different from `photo.jpg`).
  - Make sure image paths do not start with a leading slash (`images/now/...` is correct; `/images/now/...` will fail).
- **Music doesn't play?**
  - Most modern mobile browsers block audio autoplay until the user taps the screen. She just needs to tap the *"Play music"* button!
- **Want to test without a broken image icon?**
  - The site includes an automatic fallback system: if an image file is missing, a pastel placeholder is smoothly displayed without breaking the layout.
- **Accidental typo in `config.js`?**
  - The website includes a built-in safety guard: if `config.js` has a syntax error or is missing, `main.js` catches it and loads safe default text so the page never blanks out.

---

Made with ❤️ by Adrian for Shekinah.
