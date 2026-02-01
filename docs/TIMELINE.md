# docs/`TIMELINE.md` — municipal-hub-ui

## Scopo

Questo documento governa l’avanzamento del progetto **municipal-hub-ui** (rebuild 100% React).
La timeline è organizzata in step sequenziali con **Definition of Done (DoD)** verificabile.

Principi:
- **Truth-first**: lo stato riportato deve riflettere lo stato reale del repository.
- **Progressione**: la timeline evolve per progressione, non per riscritture arbitrarie.
- **Anti-ridondanza**: i dettagli tecnici “owner” vivono in documenti dedicati; qui resta la sequenza + DoD.

Nota operativa:
- Il **versionamento della cartella `docs/`** (tutto o in parte) è una decisione del maintainer (tu).
  La timeline descrive cosa serve e quando, ma non impone *come* committare la documentazione.

---

## Legenda stati

- ✅ = completato e verificato
- 🟡 = presente ma da verificare/chiudere (parziale)
- ⬜ = da fare

---

## A — ☑️ Setup + Bootstrap (baseline legacy + base React)

**Obiettivo:** ricreare la repo, congelare la legacy come baseline storica e inizializzare la nuova base React in modo pulito e separato, mantenendo la legacy consultabile.

**DoD (A) complessiva:**
- Esiste una baseline legacy “freeze” sul branch principale con tag di riferimento.
- Esiste un branch di lavoro `development` per il rebuild.
- La legacy è isolata in `old_version/` in `development`.
- In root esiste un progetto React (Vite) avviabile con `npm run dev`.
- Documentazione minima del bootstrap presente (owner doc).

### ✅ A0 — Creazione repo + collegamento remoto

* ✅ Creazione repository GitHub vuota.
* ✅ Configurazione `origin` nel repo locale.

**DoD (A0):**
- `origin` configurato e verificabile (`git remote -v`).
- Branch principale pronto per il primo commit.

### ✅ A1 — Import baseline legacy su branch principale

* ✅ Aggiunta di tutti i file legacy al tracking Git (HTML/CSS/JS + asset + documenti).
* ✅ Primo commit baseline.
* ✅ Push sul branch principale.

**DoD (A1):**
- Baseline legacy presente sul branch principale.
- Repository remota contiene la baseline.

### ✅ A2 — Tag baseline legacy (freeze storico)

* ✅ Creazione tag annotato della baseline legacy.
* ✅ Push del tag su remoto.

**DoD (A2):**
- Tag legacy presente su remoto e utilizzabile come riferimento storico.

### ✅ A3 — Creazione ramo di lavoro `development`

* ✅ Creazione branch `development`.
* ✅ Push su remoto e tracking abilitato.

**DoD (A3):**
- `development` esiste su remoto ed è tracciato in locale.

### ✅ A4 — Isolamento legacy in `old_version/` (solo development)

* ✅ Creazione cartella `old_version/`.
* ✅ Spostamento tracciato (rename) di tutto il legacy dentro `old_version/`.
* ✅ Commit dedicato e push.

**DoD (A4):**
- Tutto il legacy è sotto `old_version/`.
- Root libera da file legacy “sparsi”, pronta per scaffold moderno.

### ✅ A5 — Bootstrap React con Vite in root (preservando `old_version/`)

* ✅ Scaffold Vite con template React in una directory non vuota preservando i file esistenti.
* ✅ Installazione dipendenze con npm.
* ✅ Avvio dev server locale (verifica manuale di avvio).
* ✅ Commit e push dello scaffold iniziale.

**DoD (A5):**
- In root esistono: `package.json`, `package-lock.json`, `src/`, `public/`, `vite.config.*`, `index.html`.
- `npm install` completabile e `npm run dev` avviabile.
- `old_version/` permane intatta e consultabile.

### ✅ A6 — Documentazione setup/bootstrap (owner)

* ✅ Creazione del documento owner di bootstrap (es. `docs/A_setup_bootstrap.md` o equivalente).
* ✅ Documentazione coerente con lo stato reale (setup repo, freeze legacy, branch, `old_version/`, Vite bootstrap).

**DoD (A6):**
- Documento owner presente in `docs/` (working tree) e leggibile come riferimento ufficiale del bootstrap.
- Il contenuto è coerente con lo stato reale e non contiene azioni non eseguite.
- Il versionamento di `docs/` resta una scelta del maintainer (come da nota operativa).

---

## B — ☑️ Documentazione core e hygiene (stabilizzazione base)

**Obiettivo:** consolidare i file “core” minimi (solo quelli che servono davvero adesso) e rendere pulita la repo prima dello sviluppo in codifica.

**DoD (B) complessiva:**
- `.gitignore` coerente con Vite/React (no rumore, no artefatti tracciati).
- Policy chiara per asset pesanti (PDF/media) e per gli asset legacy da migrare.
- Base verificata con almeno un gate tecnico (dev/build) prima della codifica.
- `README.md` presente con quickstart operativo e riferimenti stabili (link a `docs/TIMELINE.md`).

### ✅ B0 — `.gitignore` (Vite/React + hygiene repo)

**Obiettivo (B0):** definire un `.gitignore` robusto e stabile.

* ✅ Revisione e hardening del `.gitignore`.
* ✅ Esclusione almeno di:
  * `node_modules/`
  * output build `dist/`
  * cache/tooling (es. `.vite/`)
  * log e file OS/IDE
  * file `.env*` (se usati)
* ✅ Verifica truth-first con `git status -sb` (nessun file “rumore” da build/cache in pending).
* ✅ Verifica che `node_modules/` e `dist/` non siano tracciati nel branch corrente (check: `git ls-files node_modules dist` e `git ls-tree -r --name-only HEAD | grep -E '^(dist/|node_modules/)'` → output vuoto).

**DoD (B0):**
- `.gitignore` completo quanto basta, stabile, con commenti essenziali.
- Nessun artefatto di build/cache finisce in Git.

### ✅ B1 — Policy asset pesanti (PDF/media) e mantenibilità repo

**Obiettivo (B1):** definire come gestire PDF e media pesanti (soprattutto per nuovi inserimenti), per evitare repo “gonfia”; la legacy resta consultabile in `old_version/` finché non si decide una migrazione.

* ✅ Decisione: **niente nuovi asset pesanti in Git** (policy per nuovi inserimenti).
  * Preferire **fuori repo** per asset >= 5 MB (Release/Drive) e inserire riferimento.
  * Git LFS si valuta **solo** se diventa un’esigenza ricorrente (step dedicato).
* ✅ Regole operative scritte in un documento owner (working tree): `docs/B_assets_policy.md`.
* ✅ Regole su cosa NON va mai versionato (export, zip, dump, duplicati).

**DoD (B1):**
- Policy scritta e applicabile.
- Regole chiare per evitare crescita non sostenibile; gestione asset esterni definita se necessaria.

### ✅ B2 — Dev gates minimi (repo “dev-ready”)

**Obiettivo (B2):** assicurare che la base React/Vite sia pronta prima della codifica vera.

* ✅ Verifica `npm run dev` (smoke manuale: pagina si apre, nessun errore bloccante in console).
* ✅ Verifica `npm run build` (build completa senza errori bloccanti).

**DoD (B2):**
- `npm run dev` OK.
- `npm run build` OK.

### ✅ B3 — README (quickstart operativo)

**Obiettivo (B3):** rendere il repository avviabile in pochi minuti, con un entrypoint essenziale e stabile.

* ✅ Aggiornato `README.md` con:
  * scopo (rebuild React + legacy in `old_version/`)
  * quickstart: `npm install` + `npm run dev`
  * comandi principali: `dev`, `build`, `preview`, `lint`
  * link a `docs/TIMELINE.md`
  * chiarimento “truth-first”: il dettaglio operativo vive in `docs/TIMELINE.md`

**DoD (B3):**
- ✅ README essenziale, coerente con gli script reali in `package.json`.
- ✅ Nessuna sezione “architettura” o dettagli destinati a cambiare (solo entrypoint).
- ✅ Verifica truth-first: `git status -sb` pulito dopo il commit README (nessun file extra incluso).

---

## C — ⬜ Baseline architetturale UI (prima di migrare feature)

**Obiettivo:** definire una base minima e stabile per iniziare il refactoring, applicando una struttura `src/` chiara e una strategia di migrazione controllata.

**DoD (C) complessiva:**
- Blueprint architetturale scritto (`docs/ARCHITECTURE.md`) e compatibile con lo stato reale.
- Struttura `src/` definita e adottata senza rompere `npm run dev`.
- Routing base (se necessario) e skeleton pagine.
- Strategia di migrazione asset (copia selettiva + rename) definita e verificata con un import pilota.

### ⬜ C-1 — ARCHITECTURE.md (blueprint struttura + regole)

**Obiettivo (C-1):** definire l’architettura target del rebuild (React/Vite) prima della migrazione: struttura cartelle, confini, convenzioni e regole operative.

* ⬜ Creare `docs/ARCHITECTURE.md`.
* ⬜ Definire:
  * mappa repository (root + `old_version/` come vault)
  * struttura target `src/` (pages/components/layouts/lib/assets/styles, ecc.)
  * regole su asset (spazi nei nomi, rinomina, dove vivono)
  * regole su configurazione/env e script (dev/build/lint/preview)
  * regole minime di qualità (lint come gate)
* ⬜ Allineare la descrizione allo stato reale (truth-first), senza includere scelte non ancora fatte.

**DoD (C-1):**
- `docs/ARCHITECTURE.md` esiste e descrive una struttura target chiara e applicabile.
- Nessuna sezione contiene assunzioni non supportate o decisioni non prese.
- La struttura proposta è compatibile con Vite/React e con la presenza di `old_version/`.

### ⬜ C0 — Applicare struttura `src/` + convenzioni minime (da blueprint)

**Obiettivo (C0):** applicare in codice la struttura decisa in `docs/ARCHITECTURE.md`, minimizzando cambi e mantenendo l’app avviabile.

* ⬜ Creare/riorganizzare cartelle in `src/` (es. `pages/`, `components/`, `layouts/`, `assets/`, `styles/`, `lib/`) secondo blueprint.
* ⬜ Definire naming conventions minime (componenti, file, asset) e applicarle ai primi file toccati.
* ⬜ Ripulire la demo Vite quanto basta (senza introdurre architettura “fantasma”) mantenendo `npm run dev` funzionante.

**DoD (C0):**
- Struttura `src/` coerente con il blueprint e documentata (anche 10 righe bastano).
- Dev server continua a funzionare.
- Nessuna dipendenza runtime dalla legacy (`old_version/` resta solo consultazione).

### ⬜ C1 — Routing base + skeleton pagine

**Obiettivo (C1):** introdurre il routing solo se serve (SPA multi-sezione), creando skeleton navigabili.

* ⬜ Aggiungere routing (se SPA multi-sezione).
* ⬜ Creare pagine placeholder (Home, Raccolta, Sportello, App, ecc.).
* ⬜ Aggiungere una navigazione minima.

**DoD (C1):**
- Route principali presenti e verificabili manualmente.
- Nessun collegamento runtime alla legacy.

### ⬜ C2 — Strategia migrazione asset (legacy → React) + import pilota

**Obiettivo (C2):** definire regole pratiche e verificare un primo import asset senza “copie sporche”.

* ⬜ Definire dove vivono gli asset in React (es. `src/assets/legacy/`).
* ⬜ Regole su rinomina asset (evitare spazi, standardizzare).
* ⬜ Primo import “pilota” (1–2 immagini) in una pagina.

**DoD (C2):**
- Import asset funzionante in React.
- Regole scritte e tracciate (in `docs/ARCHITECTURE.md` o in un doc owner dedicato).
- Nessun riferimento runtime a `old_version/`.

### ⬜ C3 — UI deps + “baseline moderna” (demo) in isolamento

**Obiettivo (C3):** installare e fissare le dipendenze UI necessarie per costruire l’effetto “Vision Pro”
in un **contesto isolato e controllato** (demo), così da:
- ridurre il rischio (debug semplice: una sola variabile per volta),
- validare subito la struttura `src/` e le convenzioni,
- produrre componenti riusabili da portare nelle pagine reali (fase D),
- evitare contaminazione della migrazione legacy (che resta separata).

* ⬜ Installare Framer Motion.
* ⬜ (Opzionale, se deciso) installare Tailwind e/o libreria icone (es. `react-icons`).
* ⬜ Creare una demo isolata (una sola modalità di accesso):
  * **opzione A (preferita):** route dedicata (se routing già presente)
  * **opzione B:** toggle temporaneo in `App` (se routing non è ancora introdotto)
* ⬜ Implementare la demo in un punto chiaro (es. `src/pages/EffectsDemo.jsx|tsx`
  oppure `src/components/effects/*` + pagina demo).
* ⬜ Regole anti-deriva (hard):
  * la demo NON diventa “seconda app”
  * massimo **2–3 sezioni** demo, contenuto placeholder
  * nessun contenuto legacy migrato in C3
  * niente styling globale “definitivo” deciso qui (solo ciò che serve alla demo)

**DoD (C3):**
- Dipendenze installate e lockfile aggiornato.
- `npm run dev` avviabile e la demo renderizza (anche minimale).
- La demo è isolata e accessibile in modo univoco (route o toggle).
- Nessuna dipendenza runtime dalla legacy (`old_version/` resta solo consultazione).

### ⬜ C4 — Effetto “Vision Pro” (sticky image + overlay parallax + scale/fade)

**Obiettivo (C4):** implementare l’effetto come **baseline moderna riusabile**: immagini sticky (100vh),
overlay copy con parallax + fade in/out, e uscita con scale-down + fade. L’obiettivo non è “fare scena”,
ma produrre una sezione componibile che poi verrà usata nelle pagine reali (fase D).

* ⬜ Implementare `StickyImage` (background image, overlay scuro che sfuma, scaling su scroll).
* ⬜ Implementare `OverlayCopy` (parallax su Y + opacity su scroll).
* ⬜ Implementare un wrapper `StickySection`/`TextParallaxContent`
  che compone immagine + testo + children sotto-sezione.
* ⬜ Aggiungere 2–3 sezioni demo con contenuto placeholder.
* ⬜ Verifica manuale (scroll): sticky corretto, overlay leggibile, parallax fluido, scaling/opacity coerenti.
* ⬜ Gate minimo anti-regressione:
  * `npm run dev` OK
  * `npm run build` OK (nessun errore bloccante)
  * nessun warning/errore runtime evidente in console durante lo scroll demo

**DoD (C4):**
- Effetto completo funzionante in locale (scroll end-to-end senza glitch evidenti).
- Sezioni riusabili via props (almeno: `imageUrl`, `heading`, `subheading`, `children`).
- Implementazione confinata alla demo (nessuna migrazione legacy introdotta in C4).
- Build OK (`npm run build`) e comportamento stabile in dev (verifica manuale base).

### ⬜ C5 — Milestone “baseline moderna” + tag (freeze pre-migrazione)

**Obiettivo (C5):** congelare un punto stabile e riproducibile della UI moderna (effetto “Vision Pro” + deps)
prima di iniziare la migrazione dalla legacy (`old_version/`). Questo crea un riferimento chiaro per rollback e confronto.

* ⬜ Verificare che:
  * `npm run dev` funzioni
  * `npm run build` funzioni
  * la demo “Vision Pro” sia navigabile e stabile (verifica manuale scroll)
* ⬜ Aggiornare `README.md` con la milestone “baseline moderna” (cosa include, come accedere alla demo, riferimento al tag della milestone).
* ⬜ Commit dedicato “chiusura milestone” (senza mischiare altre attività).
* ⬜ Creare un **tag annotato** (nome stabile) sul commit della milestone.
  * Esempio tag: `modern-baseline-v0.1` oppure `ui-baseline-visionpro-v0.1`
* ⬜ Push del tag su remoto.

**DoD (C5):**
- Milestone completata con build OK e demo verificata.
- README aggiornato e allineato alla milestone/tag.
- Commit dedicato presente su `development`.
- Tag annotato presente su remoto e utilizzabile come riferimento pre-migrazione.
- Nessuna migrazione legacy introdotta prima del tag (niente pagine/asset legacy “portati dentro” se non per la demo, e comunque solo placeholder).

---

## D — ⬜ Migrazione funzionale (pilota + iterazione)

**Obiettivo:** migrare progressivamente le pagine legacy in React **solo dopo la milestone/tag C5**,
in modo incrementale e verificabile.

**DoD (D) complessiva:**
- Almeno una pagina completa migrata end-to-end.
- Migrazione iterativa pagina per pagina, con componentizzazione minima e asset gestiti correttamente.

### ⬜ D0 — Migrazione pilota: 1 pagina end-to-end

* ⬜ Selezionare una pagina (Home o Raccolta).
* ⬜ Ricostruire UI e contenuti essenziali in React.
* ⬜ Integrare asset necessari (copia selettiva, rename).
* ⬜ Verifica manuale (render + navigazione + asset).

**DoD (D0):**
- Pagina raggiungibile dal routing.
- Asset caricati correttamente.
- Nessuna dipendenza runtime da `old_version/`.

### ⬜ D1 — Migrazione incrementale pagine/feature + consolidamento CSS

* ⬜ Migrazione pagina per pagina (Raccolta, Sportello, App…).
* ⬜ Introduzione componenti riusabili.
* ⬜ Consolidamento strategia styling (scelta da formalizzare quando si decide).

**DoD (D1):**
- Ogni pagina migrata: route + UI minima + asset + verifica manuale.
- Riduzione progressiva dell’uso di `old_version/` come riferimento.

---

## E — ⬜ Hardening finale + release

**Obiettivo:** rendere la build pronta a una prima release React.

### ⬜ E0 — Build + deploy + release v1

* ⬜ Verifica `npm run lint`.
* ⬜ Verifica `npm run build` e `npm run preview`.
* ⬜ Scelta target deploy e istruzioni.
* ⬜ Tag/release prima versione React.

**DoD (E0):**
- Build esegue con successo.
- Deploy documentato e ripetibile.
- Prima release React rilasciata e verificabile.

### ⬜ E1 — React Compiler (opzionale) — setup e verifica

**Obiettivo (E1):** abilitare React Compiler in modo tracciato e verificabile (senza introdurre ottimizzazioni manuali premature).

* ⬜ Installare il compiler come devDependency:
  * `npm install --save-dev --save-exact babel-plugin-react-compiler@latest`
* ⬜ Abilitare il plugin nella pipeline Vite (via `@vitejs/plugin-react` con config `babel.plugins`).
  * Nota: il React Compiler deve essere eseguito **per primo** nella pipeline Babel.
* ⬜ Verificare che il compiler sia attivo:
  * React DevTools: badge “Memo ✨” sui componenti ottimizzati, in dev mode.
  * (Opzionale) verifica output build: presenza di trasformazioni del compiler.
* ⬜ Definire regola di escape: se un componente causa problemi, usare temporaneamente la direttiva `"use no memo"` e aprire un TODO tecnico per rimuoverla dopo fix.

**DoD (E1):**
- Setup completato e verificato:
  * `npm run dev` avviabile senza errori bloccanti.
  * `npm run build` completa con successo (nessun errore bloccante in output).
  * React DevTools mostra badge “Memo ✨” per componenti ottimizzati (in dev mode).
- Nessun comportamento rotto lato runtime (verifica manuale base: render + navigazione se presente).
- Regola di rollback/escape definita.
