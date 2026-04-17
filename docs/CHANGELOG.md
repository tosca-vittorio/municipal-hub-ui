# CHANGELOG — municipal-hub-ui

## Branch: [development]

### [Unreleased]
> Scope corrente: **chiusura truth-first di `C4 — Dipendenze introdotte finora` e hardening del boundary lint sulla codebase React/Vite attiva**

#### C — Repo-bound owner docs + frontend quality boundary
> Ordinamento: **git log (più recente → più vecchio)** · principio **truth-first**: qui è riportato solo ciò che è committato.

- **`3111efe` — docs(owner): close C4 dependency inventory and align architecture**
  - **Type:** CHANGED · **Categoria:** Docs/Governance
  - **Cosa cambia:** aggiorna `docs/ARCHITECTURE.md` con l’inventario truth-first delle dipendenze dichiarate e di quelle effettivamente risolte/installate, chiarisce il criterio di introduzione delle dipendenze e riallinea `docs/TIMELINE.md` segnando `C4` come chiuso.
  - **Impatto:** consolida formalmente il doc gate repo-bound sulle dipendenze reali della baseline React/Vite e rende auditabile la distinzione tra manifest (`package.json`) e stato risolto (`package-lock.json` / `npm ls`).

- **`3eea9fa` — build(lint): harden eslint boundary for active frontend code**
  - **Type:** CHANGED · **Categoria:** Build/Quality Gate
  - **Cosa cambia:** aggiorna `eslint.config.js` per escludere dal lint la vault legacy `old_version/` e gli artefatti locali di report/output, riallineando il quality gate alla sola codebase React/Vite attiva e aggiornando il boundary di parsing ECMAScript.
  - **Impatto:** ripristina quality gate frontend affidabili e completamente verdi (`npm run lint`, `npm run build`) senza contaminare la verifica della nuova app con codice legacy non ancora migrato.

- **`4f91380` — docs(owner): realign timeline architecture changelog roadmap and gitignore**
  - **Type:** CHANGED · **Categoria:** Docs/Governance
  - **Cosa cambia:** riallinea `.gitignore`, `docs/TIMELINE.md`, `docs/ARCHITECTURE.md`, `docs/CHANGELOG.md` e `docs/ROADMAP.md` al perimetro owner effettivamente versionato, alla nuova governance truth-first e alla struttura documentale repo-bound del rebuild React/Vite.
  - **Impatto:** stabilizza il pacchetto owner docs minimo del progetto, rende coerenti le source of truth documentali e prepara la successiva chiusura di `C4` e il riallineamento dei quality gate.

#### Historical context (foundation → C1)
> Ordinamento: cronologico · principio truth-first: qui è riportato solo ciò che è già committato su `development`.

- **d6155ed** — `chore(legacy): import baseline`
  - **Type:** ADDED · **Categoria:** Foundation
  - **Cosa cambia:** importa la baseline legacy nel repository come punto di partenza storico.
  - **Impatto:** rende auditabile la sorgente iniziale da cui parte il rebuild.

- **0fcc001** — `chore(legacy): move baseline into old_version/`
  - **Type:** CHANGED · **Categoria:** Repo
  - **Cosa cambia:** sposta la baseline legacy in `old_version/` sul branch di rebuild.
  - **Impatto:** libera la root per la nuova app React/Vite e separa consultazione legacy da runtime moderno.

- **eae279f** — `chore: bootstrap react app (vite)`
  - **Type:** ADDED · **Categoria:** Tooling
  - **Cosa cambia:** introduce la base React/Vite in root con struttura e tooling iniziali.
  - **Impatto:** rende il repository eseguibile come app moderna e apre il rebuild controllato.

- **f9b57eb** — `chore: harden gitignore`
  - **Type:** CHANGED · **Categoria:** Repo
  - **Cosa cambia:** rafforza il `.gitignore` per ridurre rumore da dipendenze, output e file locali.
  - **Impatto:** migliora hygiene, riproducibilità e qualità del versionamento.

- **6698a95** — `docs(timeline): define rebuild roadmap + modern baseline milestone`
  - **Type:** CHANGED · **Categoria:** Docs
  - **Cosa cambia:** formalizza la traiettoria operativa iniziale del rebuild nella TIMELINE.
  - **Impatto:** introduce una source of truth operativa leggibile e verificabile.

- **13cc559** — `docs: update README quickstart`
  - **Type:** CHANGED · **Categoria:** Docs
  - **Cosa cambia:** aggiorna il README con quickstart, comandi principali e riferimenti stabili.
  - **Impatto:** migliora onboarding e avvio rapido del progetto.

- **a1ef83f** — `docs: close section B and update timeline steps`
  - **Type:** CHANGED · **Categoria:** Docs
  - **Cosa cambia:** consolida la sezione B della TIMELINE e riallinea gli step documentali.
  - **Impatto:** stabilizza la governance iniziale del repository.

- **f3ed225** — `refactor(src): apply folder structure`
  - **Type:** CHANGED · **Categoria:** Architecture
  - **Cosa cambia:** applica in `src/` la struttura prevista dal blueprint architetturale.
  - **Impatto:** migliora boundaries, leggibilità e scalabilità della codebase.

- **5a6ad82** — `fix(src): rewire imports after folder moves`
  - **Type:** FIXED · **Categoria:** Runtime
  - **Cosa cambia:** riallinea gli import dopo la riorganizzazione delle cartelle.
  - **Impatto:** ripristina coerenza runtime e buildability dopo il refactor strutturale.

- **324c944** — `feat(router): add base routing and placeholder pages`
  - **Type:** ADDED · **Categoria:** Routing
  - **Cosa cambia:** introduce React Router, route principali e pagine placeholder navigabili.
  - **Impatto:** chiude la baseline C1 lato runtime e abilita la navigazione multi-route.

- **5a293e9** — `docs(timeline): mark C1 complete (base routing)`
  - **Type:** CHANGED · **Categoria:** Docs
  - **Cosa cambia:** aggiorna la TIMELINE per segnare C1 come completato.
  - **Impatto:** riallinea la source of truth operativa allo stato reale del repository.
