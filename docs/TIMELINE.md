# docs/`TIMELINE.md` — municipal-hub-ui

## Scopo

Questo documento governa l’avanzamento del progetto **municipal-hub-ui** (rebuild 100% React).
La timeline è organizzata in step sequenziali con **Definition of Done (DoD)** verificabile.

Principi:
- **Truth-first**: lo stato riportato deve riflettere lo stato reale del repository.
- **Progressione**: la timeline evolve per progressione, non per riscritture arbitrarie.
- **Anti-ridondanza**: i dettagli tecnici “owner” vivono in documenti dedicati; qui resta la sequenza + DoD.

Nota operativa:
- Il **versionamento della cartella `docs/`** (tutto o in parte) è una decisione del maintainer.
  La timeline descrive cosa serve e quando, ma non impone *come* committare la documentazione.

---

## Legenda stati

- ✅ = completato e verificato
- ☑️ = archiviato
- 🟡 = presente ma da verificare/chiudere (parziale)
- ⬜ = da fare
- ⛔ = BLOCCATO (manca codice reale / prerequisiti)

---

## A — ☑️ Setup + Bootstrap (baseline legacy + base React)

**Obiettivo:** ricreare la repo, congelare la legacy come baseline storica e inizializzare la nuova base React in modo pulito e separato, mantenendo la legacy consultabile.

**DoD (A) complessiva:**
- Esiste una baseline legacy “freeze” (tag annotato) e un branch immutabile di consultazione `baseline/legacy` (snapshot).
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

### ✅ A2 — Tag baseline legacy (freeze storico) + branch consultazione

* ✅ Creazione tag annotato della baseline legacy.
* ✅ Push del tag su remoto.
* ✅ Creazione branch **immutabile di consultazione** `baseline/legacy` (snapshot freeze).
* ✅ Push del branch `baseline/legacy` su remoto.

**DoD (A2):**
- Tag legacy presente su remoto e utilizzabile come riferimento storico.
- Branch `baseline/legacy` presente su remoto e usabile come riferimento consultazione (non si lavora lì).

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

* ✅ Creazione del documento owner di bootstrap: `docs/core/A6_setup_bootstrap.md`.
* ✅ Documentazione coerente con lo stato reale (setup repo, freeze legacy, branch, `old_version/`, Vite bootstrap).

**DoD (A6):**
- Documento owner presente: `docs/core/A6_setup_bootstrap.md`.
- Il contenuto è coerente con lo stato reale e non contiene azioni non eseguite.
- Il versionamento di `docs/` resta una scelta del maintainer.

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
  * file `.env*`
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
* ✅ Regole operative scritte in un documento owner (working tree): `docs/core/B1_assets_policy.md`.
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

## C — ☑️ Documentazione repo-bound (fondamenta runtime) — backlog

**Obiettivo:** completare la documentazione “owner” minima senza moltiplicare file:
- `docs/ARCHITECTURE.md` = regole globali + blueprint + stato AS-IS (concettuale, no numeri step)
- `docs/core/*` = documenti per-file (code-as-is + sintassi + confini locali)
- `docs/TIMELINE.md` = sequenza + DoD + gate (source of truth operativa)

### ✅ C0 — Runtime foundations consolidate in `docs/ARCHITECTURE.md` (NO nuovo doc)

**Decisione (anti-ridondanza):**
- Non creare `docs/concepts/runtime-foundations.md`.
- Le “runtime foundations” vivono come sezione dedicata dentro `docs/ARCHITECTURE.md`.

**Deliverable:** sezione in `docs/ARCHITECTURE.md` (runtime foundations / boundaries “cosa vive dove”).

**Contenuto (IN-SCOPE):**
- Struttura `src/` **AS-IS** (solo cartelle/file reali) + ruoli minimi.
- Regole anti-ciclo minime (dipendenze concettuali) coerenti col blueprint.
- Pagine skeleton: cosa sono, cosa è ammesso/vietato (route table resta owner in `docs/core/C1b_entrypoint-app.md`).
- Navigazione minima: dove può vivere oggi (fase skeleton) e criteri di evoluzione.
- Rimando canonico a:
  - CSS: § 8.1
  - Dipendenze: § 8.2
  - Accessibilità baseline: § 8.3

**OUT-OF-SCOPE:**
- Scelte definitive di styling/tooling (Tailwind, CSS-in-JS, UI kit) se non decise in TIMELINE.
- Inventari versioni senza evidenze (package/lock).
- Strategie di deploy senza target deciso.

**DoD (C0):**
- Nessun nuovo file creato in `docs/concepts/` per questo tema.
- `docs/ARCHITECTURE.md` contiene la sezione “runtime foundations” e non duplica `docs/core/*`.
- Tutti i path citati sono reali.
- Gate non peggiorati: `npm run dev` OK (e `npm run build` OK se già parte dei gate correnti).

---

### ✅ C1 — Pagine placeholder (skeleton) e ruolo didattico
**Deliverable:** sezione in `docs/ARCHITECTURE.md` (es. “Pagine placeholder: stato + regole di evoluzione”)

**DoD (C1):**
- Elenco pagine reali e path reali (as-is).
- Cosa è ammesso ora (placeholder) e cosa è vietato (porting legacy anticipato, logica “sporca”).
- Criteri minimi di evoluzione (da placeholder a reale).
- Verifiche: pagine renderizzano senza errori; contenuti restano placeholder dove previsto (se evidenza disponibile).

---

### ✅ C2 — Navigazione minima: dove vive e perché (layout vs component)
**Deliverable:** sezione in `docs/ARCHITECTURE.md` (es. “Routing + navigazione + app shell”)

**DoD (C2):**
- Differenza tra `layouts/` e `components/` **solo se esistono** (altrimenti dichiarare “non presenti”).
- Pattern “app shell” minimale e perché riduce accoppiamento.
- Anti-pattern: header monolitico, nav che conosce troppo delle pagine.
- Verifiche: nav non rompe rendering/pagine; nessuna dipendenza circolare evidente (anche solo concettuale).

---

### ✅ C3 — CSS attuale: stato presente + regole minime
**Deliverable:** già coperto in `docs/ARCHITECTURE.md` → sezione “8.1 CSS — stato presente + regole minime”.

**DoD (C3):**
- Sezione presente con path reali:
  - `src/styles/index.css` (import in `src/main.jsx`)
  - `src/styles/App.css` (import in `src/app/App.jsx`)
- Regole minime esplicite (no “framework war” prematura).

---

### ✅ C4 — Dipendenze introdotte finora (solo reali)
**Deliverable:** sezione in `docs/ARCHITECTURE.md` (es. “Dipendenze: criterio + inventario truth-first”)

**DoD (C4):**
- ✅ Cosa cambia in `package.json` / lockfile documentato solo su evidenza reale.
- ✅ Criterio di introduzione dipendenze esplicitato senza duplicare TIMELINE.
- ✅ Verifiche raccolte:
  - `cat package.json`
  - `cat package-lock.json | head -n 120`
  - `npm ls --depth=0`
- ✅ Distinzione resa esplicita tra versioni dichiarate e versioni effettivamente risolte/installate.

---

### ✅ C5 — Accessibilità UI baseline (stato attuale + regole minime)
**Deliverable:** già coperto in `docs/ARCHITECTURE.md` → sezione “8.3 Accessibilità baseline”.

**DoD (C5):**
- Regole pratiche + anti-pattern presenti.
- Verifiche manuali indicate (Tab/Shift+Tab/focus visibile).

---

## D — 🟡 Frontend quality baseline (TDD + gates)

**Obiettivo:** introdurre una baseline di qualità reale e verificabile sulla codebase React/Vite attiva, mantenendo separata la legacy non ancora migrata.

**DoD (D) complessiva:**
- Esiste un setup test frontend reale e funzionante.
- I gate canonici della base moderna sono definiti e verdi:
  - `npm run lint`
  - `npm run build`
  - `npm run test`
- Il boundary dei quality gate resta confinato alla codebase React/Vite attiva.
- La baseline è abbastanza stabile da sostenere la successiva migrazione funzionale selettiva dalla legacy.

### ✅ D0 — Pianificazione baseline test frontend
**Deliverable:** aggiornamento owner docs che apre formalmente il ciclo qualità frontend.

**DoD (D0):**
- Il blocco qualità frontend è attivo in TIMELINE.
- La priorità è coerente con ROADMAP.
- È esplicito che la migrazione legacy resta successiva alla baseline qualità.

### ✅ D1 — Setup test runner frontend
**Deliverable:** tooling test reale per React/Vite.

**DoD (D1):**
- ✅ Test runner frontend introdotto con configurazione minima funzionante.
- ✅ Script `test` disponibile in `package.json`.
- ✅ Primo smoke test eseguibile e verde in locale.

### ⬜ D2 — Smoke tests baseline su app shell e routing
**Deliverable:** test minimi sulla superficie runtime già esistente.

**DoD (D2):**
- Test su rendering app base.
- Test su route placeholder principali.
- Nessun falso rosso proveniente da `old_version/`.

### ⬜ D3 — Formalizzazione quality gates frontend
**Deliverable:** gate canonici espliciti e riproducibili.

**DoD (D3):**
- `npm run lint` verde.
- `npm run build` verde.
- `npm run test` verde.
- Documentazione owner aggiornata sul boundary dei gate.

### ⬜ D4 — Freeze baseline qualità prima della migrazione legacy
**Deliverable:** chiusura del ciclo qualità frontend come prerequisito al porting legacy.

**DoD (D4):**
- Baseline qualità stabile e difendibile.
- Prerequisito formale soddisfatto per aprire la migrazione funzionale selettiva.

---

## E — ⬜ Backlog tecnico preservato (capability / architecture knowledge)

**Obiettivo:** preservare e rendere riattivabili le aree tecniche e concettuali già emerse nel progetto senza trattarle come blocco operativo corrente.

**DoD (E) complessiva:**
- Le capability e i temi tecnici già identificati restano tracciati.
- Nessun backlog utile viene perso durante l’attivazione del blocco qualità frontend.
- I temi non ancora attivi non impattano i gate correnti della baseline React/Vite.

### ⬜ E0 — State management / store
**Deliverable:** decisione documentata su quando uno store globale è giustificato.

**DoD (E0):**
- Distinzione chiara tra stato locale, stato condiviso e stato globale.
- Nessuna introduzione prematura di Redux/store senza bisogno reale.

### ⬜ E1 — Routing deep-dive
**Deliverable:** consolidamento della conoscenza su route map, active navigation, refresh deep-link e boundary deploy SPA.

**DoD (E1):**
- Il comportamento routing è spiegato in modo difendibile.
- I requisiti deploy per deep-link restano tracciati.

### ⬜ E2 — HTTP layer
**Deliverable:** criteri di introduzione di fetch/axios e boundary API futuri.

**DoD (E2):**
- Nessun path fittizio.
- Strategia documentata solo se il codice reale lo richiede.

### ⬜ E3 — Testing avanzato / error boundaries
**Deliverable:** backlog preservato per quality evolution oltre la baseline iniziale.

**DoD (E3):**
- Il tema resta tracciato.
- La sua attivazione dipende da setup runtime reale.

### ⬜ E4 — Security boundary
**Deliverable:** backlog preservato su hardening, CORS, HttpOnly, boundary auth.

**DoD (E4):**
- Nessuna teoria spacciata per stato reale.
- Tema pronto per futura attivazione quando pertinente.

### ⬜ E5 — Performance / optimization
**Deliverable:** backlog preservato per analisi performance React/Vite.

**DoD (E5):**
- Ottimizzazioni solo su baseline misurabile.
- Nessuna ottimizzazione speculativa.

### ⬜ E6 — Real-time / sockets
**Deliverable:** backlog preservato per capability future realtime.

**DoD (E6):**
- Tema tracciato ma non attivo.
- Nessuna anticipazione architetturale senza codice reale.

---

## F — ⬜ Sviluppi futuri (dipende da target reale / scala / deploy)

### ⬜ F0 — Deploy SPA: rewrite, 404, alternative (HashRouter)
**Deliverable:** strategia deploy SPA documentata e verificata su target reale.

**DoD (F0):**
- Spiega perché serve rewrite a `index.html`, implicazioni refresh deep-link.
- Trade-off HashRouter.
- Verifiche: test su ambiente reale (non ipotesi).

### ⬜ F1 — Consolidamento import/export (barrel exports sì/no)
**Deliverable:** criteri stabili per barrel exports e struttura import.

**DoD (F1):**
- Quando barrel è accettabile e quando no.
- Rischi di cicli e import graph poco leggibile.
- Verifiche: build/lint ok; import graph comprensibile.

## Quality bar (hard)

Ogni documento deve:
- essere **truth-first** (descrive solo ciò che esiste davvero ora)
- includere **cos’è / cosa non è**
- includere anti-pattern ed errori comuni
- citare **path reali** (quando implementativo)
- includere verifiche minime riproducibili (comandi/check manuali)
- non duplicare ARCHITECTURE/TIMELINE: rimandare invece di riscrivere

---

## Micro-check prima di iniziare un doc

- `git status -sb` (stato pulito o stato documentato)
- individuare i path reali dei file citati
- verificare che non esista già un doc equivalente (anti-ridondanza)
- decidere se il doc è:
  - **concept-first** (ammesso anche senza implementazione, ma senza promesse)
  - **implementativo** (solo con codice reale)
