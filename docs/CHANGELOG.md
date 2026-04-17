# CHANGELOG — municipal-hub-ui

## Branch: [development]

### [Unreleased]
> Scope corrente: baseline React/Vite consolidata fino a C1 e riallineamento owner docs in corso.

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
