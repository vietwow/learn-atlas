# Atlas — Personal Learning Codex

A gamified, self-hosted study site for the topics you're learning alongside a full-time job:
**Linear Algebra, Calculus, Algorithms, Deep Learning, Reinforcement Learning, and LLMs**.

Each topic has lectures (with rendered math), multiple-choice quizzes, spaced-repetition
flashcards, and homework with hints + solutions — wrapped in an XP / level / streak /
achievement system to keep you coming back.

## Features

- **Lectures** — readable lessons with KaTeX-rendered math, callouts, and code.
- **Examples** — an optional per-lesson tab of worked examples with revealable working.
- **Quizzes** — instant feedback + explanations; earns XP, perfect-score bonus.
- **Flashcards** — SM-2-style spaced repetition. A global **Daily Review** surfaces every card that's due across all topics.
- **Homework** — practice problems with progressive hints and full solutions.
- **Visualization Lab** — interactive canvas widgets: drag vectors, morph space with a 2×2 matrix, watch gradient descent overshoot, animate sorting, solve a gridworld with value iteration, explore embedding arithmetic, and more. Embed any widget in a lesson with `<div data-viz="ID"></div>`.
- **Spawn a Test** — build a custom exam on demand from the question bank. By default it draws **only from lessons you've completed**, so you're never tested on what you haven't seen. Scope by topic or everything; 5/10/20 questions; full review afterwards.
- **Learning paths (knowledge dependencies)** — every lesson knows its prerequisites (explicit `prereqs` + the lessons before it in its course). Open any concept's path to get the ordered chain to learn from the beginning.
- **Concept of the Day** — a deterministic daily pick on the dashboard, with a chance to surface an advanced concept you haven't reached yet.
- **Mastery model** — every concept tracks a decaying mastery score (from quizzes, flashcards, tests). Drives per-lesson mastery bars, a mastery distribution, "weak spots", and the Knowledge Map colors. Turns "I read it" into "I know it."
- **Knowledge Map** — a visual graph of every concept and its prerequisites, nodes colored by your mastery; hover to trace a concept's dependency chain, click to open.
- **Code Playground** — run real **Python** (via Pyodide, incl. numpy) and **JavaScript** in the browser. Embed an exercise in a lesson with `<div data-code="python" data-expected="...">starter</div>`.
- **Command palette (⌘K / Ctrl+K)** — fuzzy search across all concepts, visualizations, pages, and references.
- **Per-lesson notes** — your own notes on each lesson, saved locally.
- **Daily goal + activity heatmap** — set a daily XP target; a GitHub-style heatmap shows your study streak.
- **Streak freezes** — earn a freeze every 7-day streak; it auto-covers a single missed day so your streak survives.
- **Cheatsheets** — a printable, per-topic quick-reference auto-built from the flashcards (Print / Save-PDF).
- **Placement diagnostic** — a quick per-topic test that marks concepts you already know, so you can skip ahead.
- **Progress export / import** — download your progress as JSON and restore it on another device.
- **Installable PWA / offline** — add to home screen; the app shell + content are cached for offline study (CDN extras like Pyodide need a connection).
- **Library** — a curated set of the best external references (book/video/course/paper/interactive) per topic.
- **Gamification** — XP, 10 named levels (Novice → Polymath), daily streak, 16 achievements.
- **Two themes** — "Ink" (dark academia) and "Parchment" (light), toggle in the sidebar.
- **Zero build step.** Pure HTML/CSS/JS. All progress saved in your browser's `localStorage`.

## Run it locally

Just open `index.html` in a browser. (Math fonts/quizzes need an internet connection
for the KaTeX + Google Fonts CDNs.)

## Deploy to GitHub Pages

1. Create a repo and push these files (the site lives at the repo root).
2. Repo **Settings → Pages → Build and deployment → Source: "Deploy from a branch"**, branch `main` / `/root`.
3. Visit `https://<you>.github.io/<repo>/`.

No Jekyll config needed — there are no underscore-prefixed folders.

## Add or edit content

All content lives in **`data/courses.js`** — no build step, just edit and reload. Structure:

```js
{
  id: "my-topic", title: "My Topic", icon: "∑", color: "#e0a458",
  blurb: "One-line description shown on the card.",
  modules: [{
    id: "m1", title: "Module name",
    lessons: [{
      id: "unique-lesson-id", title: "Lesson title", minutes: 12,
      content: "HTML string. Use $inline$ and $$display$$ for math.",
      mcq:        [{ q, choices:[...], answer:<0-based index>, explain }],
      flashcards: [{ front, back }],
      homework:   [{ prompt, hint, solution }],
      examples:   [{ title, body, solution }],   // optional Examples tab
      prereqs:    ["other-lesson-id", ...]        // optional cross-topic prerequisites
    }]
  }]
}
```

Every field except `id`/`title` is optional, so partial lessons are fine. Math uses
`$...$` (inline) and `$$...$$` (display). To add a whole new subject, append another
course object to the `window.COURSES` array.

To embed an interactive visualization inside a lesson's `content`, drop in
`<div data-viz="la-linear-transform"></div>` (any id from the Visualization Lab).

### Other data files

- `data/references.js` — `window.REFERENCES` maps each topic id (plus `"general"`) to a
  curated list of `{ title, by, kind, url, note }`. `kind` ∈ video/course/book/paper/article/interactive/reference.
- `js/viz.js` — interactive widgets. Add one with `VIZUtil.register({id, topic, title, blurb}, fn)`;
  `fn(container)` builds the widget using the `VIZUtil` helpers (canvas, sliders, buttons, animation loop).
- Prerequisites: a lesson's learning path is its `prereqs` closure **plus** every lesson before it
  in its own course, so paths work even before you add explicit `prereqs` edges.

## Project layout

```
learn-atlas/
├── index.html          # shell: sidebar, topbar, script tags
├── css/styles.css      # the whole theme
├── js/store.js         # localStorage state: XP, levels, streak, SRS, achievements
├── js/app.js           # SPA router + all views + quiz/flashcard/homework engines
└── data/courses.js     # ← all the learning content (edit this)
```

## Tweak the game feel

- XP awards and level thresholds: top of `js/store.js` (`XP`, `LEVELS`).
- Achievements: `ACHIEVEMENTS` array in `js/store.js`.
- Colors/fonts/spacing: CSS variables at the top of `css/styles.css`.
