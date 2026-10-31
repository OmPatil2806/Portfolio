# Om Patil — Personal Portfolio

Static multi-page site. Plain HTML, CSS and vanilla JavaScript — no framework, no build step.
Deploy by pushing the contents of this folder to a GitHub Pages branch (or `/docs`).

---

## Pages

| File | Page |
|---|---|
| `index.html` | Home |
| `about.html` | About — bio, experience timeline, education, skills, languages |
| `projects.html` | Projects index |
| `rf-failure-rca.html` | Case study — RF Failure Root Cause Analysis |
| `log-analyzer.html` | Case study — Automotive Diagnostic Log Analyzer |
| `dataguard-ai.html` | Case study — DataGuard AI |
| `iot-platform.html` | Case study — Industrial IoT Sensor Analytics Platform |
| `fincast.html` | Case study — FinCast |
| `multi-store.html` | Case study — Multi-Store Management System |
| `smart-grid.html` | Case study — Smart Grid Electric Load Forecasting |
| `fitness-coach.html` | Case study — AI Fitness Coach |
| `research.html` | Research & Certifications |
| `contact.html` | Contact — link cards only, no form |

---

## Asset filenames

Every path below is referenced by the HTML. Drop replacements in at the same path and
filename and nothing else needs changing.

### Photography — `assets/img/`

| File | What it is | Size | Used on |
|---|---|---|---|
| `om-portrait.jpg` | Square head-and-shoulders crop of the conference photo (crop box 325, 545, 420 × 420, upscaled) | 840 × 840 | Home hero, About |
| `om-event.jpg` | Full conference photo, uncropped | 1024 × 1536 | About — "Beyond the code" |
| `audi-team-car.jpg` | Group photo beside a car in a vehicle hall | 1280 × 960 | About — "Teams and workshops" |
| `audi-workshop.jpg` | Four people in a vehicle workshop | 1035 × 1280 | About — "Teams and workshops" |
| `audi-team.jpg` | Four people, indoor portrait | 1164 × 1351 | About — "Teams and workshops" |
| `research-ai.jpg` | AI illustration, decorative | 1200 × 720 | Research — right of the page heading |
| `projects-ai.jpg` | Data-analytics illustration, decorative | 1100 × 1100 | Projects — right of the page heading |

All photos render in full colour at 100% brightness. No greyscale, no overlays, no filters,
no text over faces. The Home hero has no background image at all — just a CSS radial glow
(`--warm` at 8%) behind the portrait.

### Certificates — `assets/img/certs/`

| File | Credential | Used on |
|---|---|---|
| `udemy-agentic-ai.png` | Complete Agentic AI Bootcamp With LangGraph and Langchain | Home, Research |
| `anthropic-ai-fluency.png` | AI Fluency: Framework & Foundations — Anthropic | Research |
| `claude-code-in-action.png` | Claude Code in Action — Anthropic, 18 Mar 2026 | Research |
| `claude-101.png` | Claude 101 — Anthropic | Research |
| `audi-service-experience.png` | Service Experience Challenge — AUDI AG, Neckarsulm, 2026 | Research |
| `udemy-databricks-spark.png` | Python, Databricks & Apache Spark: Complete ETL Engineering | Home, Research |
| `udemy-ai-security.png` | AI Security Bootcamp: Guardrails, LLM Gateways, Observability | Research |
| `udemy-n8n.png` | n8n: AI Agents, AI Automations & AI Voice Agents (No-code) | Research |
| `coursera-keras.png` | Creating Multi Task Models With Keras | Research |
| `coursera-superhero.png` | Create a Superhero Name Generator with TensorFlow | Research |
| `coursera-tweet.png` | Tweet Emotion Recognition with TensorFlow | Research |
| `kaggle-ml.png` | Intermediate Machine Learning | Research |
| `kaggle-dataviz.png` | Data Visualization | Research |
| `ijnrd.png` | IJNRD publication certificate — Strategic Analysis of European Market Entry | Home, Research |
| `ijrpr.png` | IJRPR publication certificate — Human Activity Detection Through AI | Research |
| `ijircce.png` | IJIRCCE publication certificate — Blockchain Fundraising Tracking System | Research |
| `ijnrd-blockchain.png` | IJNRD certificate for the Blockchain paper — **not currently shown anywhere** | — |

One certification is a text-only row because no image exists for it:
"Full Stack Generative and Agentic AI". The Home stats strip counts **13 certificates** —
that is the number with an image attached, so update it if you add or remove one.

### Dashboard screenshots — `assets/img/projects/`

Optional. Each case study has a slot for three screenshots. Add them at these paths and
they appear automatically:

```
assets/img/projects/rf-failure-rca-1.png   … -2.png   … -3.png
assets/img/projects/log-analyzer-1.png     … -2.png   … -3.png
assets/img/projects/dataguard-ai-1.png     … -2.png   … -3.png
assets/img/projects/iot-platform-1.png     … -2.png   … -3.png
assets/img/projects/fincast-1.png          … -2.png   … -3.png
assets/img/projects/multi-store-1.png      … -2.png   … -3.png
assets/img/projects/smart-grid-1.png       (actual vs predicted)
assets/img/projects/fitness-coach-1.png    … -2.png   … -3.png
```

### Code — `assets/`

| File | Purpose |
|---|---|
| `assets/css/styles.css` | All styling. Design tokens are the CSS variables in the `:root` block at the top. |
| `assets/js/main.js` | Mobile menu, scroll reveal, project filters, certificate lightbox, footer year. |

---

## Design tokens

Light warm theme. Edit the top of `assets/css/styles.css`:

```css
--bg: #F7F2EA;        /* warm ivory       */
--surface: #FFFDF9;   /* card             */
--surface-2: #EFE8DC; /* sand bands, marquees, footer */
--line: rgba(60,45,30,0.14);
--text: #221E1A;      --muted: #6E655B;
--accent: #B80F2D;    /* warm red — key numbers, active nav, buttons */
--warm: #C9822F;      /* amber — tag borders, small highlights       */
--ink: #121214;       /* reserved; no dark surface is used on the site */
--radius: 12px;       --shadow: 0 12px 32px rgba(60,40,20,0.08);
```

Fonts are loaded from Google Fonts: **Inter** (text) and **JetBrains Mono** (tags, metrics, labels).

---

## Notes

- Light warm theme throughout. There is no dark panel or black image on any page.
- All motion respects `prefers-reduced-motion`; the marquees stop and wrap statically.
- Cards lift 4px on hover with a red underline drawing in left to right.
- No CV, resume or download anywhere on the site, by design.
- No contact form and no "Send message" button — Contact is link cards only.
- The site logo is the plain text mark "OP". No company logo is used as decoration
  anywhere — no rings, no headlight imagery, and those source files have been deleted.
  The only place a company mark appears is inside the AUDI AG certificate image on the
  Research page, which is a scanned document rather than a design element.
- The Contact map is **click-to-load**: no request reaches Google until the visitor
  presses "Load map". The iframe is created in `main.js` (`mapEmbed`). City-level zoom
  12, no pin and no street address anywhere on the site. If you add
  `assets/img/map-neckarsulm.jpg` later, swap the placeholder for a static image.
- The Home stats strip says "50+ Projects on GitHub"; the six written up here are the
  most recent ones.
- Every page footer carries: *"Personal portfolio. Not affiliated with AUDI AG."*
- All numbers on the site come from the project briefs — nothing is estimated or invented.
