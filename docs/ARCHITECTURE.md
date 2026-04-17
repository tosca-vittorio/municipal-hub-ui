# docs/`ARCHITECTURE.md` — municipal-hub-ui (React/Vite rebuild)

## 1) Scopo

Questo documento definisce il **blueprint architetturale** del rebuild **municipal-hub-ui** su **React + Vite**.
È un documento **applicabile**: stabilisce struttura delle cartelle, confini, convenzioni e regole operative minime,
da applicare **per progressione** secondo `docs/TIMELINE.md`.

Vincoli:
- Descrive solo aspetti compatibili con lo stato reale del repository e con la sequenza della TIMELINE.
- Nessuna dipendenza o implementazione è assunta come esistente se non ancora introdotta.
- Questo blueprint guida C0/C1/C2… ma non sostituisce la TIMELINE, che resta la *source of truth* operativa e decide cosa si fa nello step corrente.

**Source of truth operativa:** `docs/TIMELINE.md`.

> Nota: questo documento non duplica il README. Il README resta l’entrypoint operativo (quickstart + comandi);
qui vivono vincoli architetturali, struttura target e regole applicabili step-by-step secondo TIMELINE.

## 1.1 Owner map (anti-ridondanza)

Questo documento centralizza **regole trasversali** e **blueprint** (boundaries, convenzioni, policy).

I dettagli *per-file* (code-as-is + sintassi + confini locali) stanno in `docs/core/*`:

- Entrypoint `src/main.jsx` (bootstrap / provider globali): `docs/core/C1a_entrypoint-main.md`
- Entrypoint `src/app/App.jsx` (app shell + routing AS-IS): `docs/core/C1b_entrypoint-app.md`

Regola:
- `ARCHITECTURE.md` spiega **il perché** e le regole **globali**.
- `docs/core/*` spiega **il come** del singolo file (sintassi riga-per-riga) e resta “owner” del file.

---

## 2) Stato attuale (AS-IS) — repository e legacy

### 2.1 Base moderna (rebuild)

- Branch di lavoro: `development`
- Nuova app: React/Vite in root (`src/`, `public/`, `package.json`)
- Script disponibili (come da `package.json`):
  - `dev`: `vite`
  - `build`: `vite build`
  - `lint`: `eslint .`
  - `preview`: `vite preview`

- Linguaggio (stato attuale): JavaScript/JSX. TypeScript non è adottato; eventuale introduzione solo in uno step dedicato.

### 2.1.1 Struttura `src/`

In `src/` esistono oggi (directory, path reali):
- `src/app/`
- `src/assets/`
- `src/components/`
- `src/layouts/`
- `src/lib/`
- `src/pages/`
- `src/styles/`

Ed esiste il file entrypoint:
- `src/main.jsx`

Nota truth-first:
- Questa sezione certifica **solo l’esistenza** delle directory/file e i loro nomi (boundaries “fisici”).
- Non descrive contenuti interni o dipendenze effettive tra cartelle.

### 2.1.2 Runtime foundations (AS-IS) — boundaries minimi e “cosa vive dove”

Scopo:
- consolidare in *un solo punto* lo “stato runtime” minimo della base moderna.

Regola anti-ridondanza:
- Dettagli per-file (sintassi, provider effettivi, routing effettivo) stanno in:
  - `docs/core/C1a_entrypoint-main.md` (owner di `src/main.jsx`)
  - `docs/core/C1b_entrypoint-app.md` (owner di `src/app/App.jsx`)
- Qui restano solo: confini globali, posizionamento, regole minime e anti-pattern.

#### A) Ruoli minimi delle cartelle (AS-IS + boundaries)
Queste directory esistono oggi in `src/` (e sono parte del runtime moderno):

- `src/app/`
  - **Cos’è:** composition root (wiring/bootstrap).
  - **Cosa non è:** contenitore di UI di dominio o componenti riusabili.

- `src/pages/`
  - **Cos’è:** componenti “route-level” (pagine).
  - **Cosa non è:** libreria di componenti riusabili.

- `src/layouts/`
  - **Cos’è:** contenitori di layout (shell, wrapper di pagina, struttura header/footer/nav) quando necessario.
  - **Cosa non è:** sostituto di `pages/` o “misc”.

- `src/components/`
  - **Cos’è:** componenti riusabili (UI/sections/widgets), non direttamente legati alle route.
  - **Cosa non è:** contenitore di logica applicativa trasversale senza UI.

- `src/lib/`
  - **Cos’è:** utilities e codice “pure-ish” (helpers, hooks, constants) *senza dipendenze da UI*.
  - **Cosa non è:** posto dove mettere componenti o importare roba da `pages/`.

- `src/assets/`
  - **Cos’è:** asset bundler-managed importati dai componenti (default).
  - **Cosa non è:** dump di asset legacy non controllati.

- `src/styles/`
  - **Cos’è:** CSS della base attuale (globale + app-level), finché la UI è skeleton.
  - **Cosa non è:** scelta definitiva di styling/tooling (vietata “framework war” prematura).

#### B) Navigazione minima: dove vive oggi e perché (fase skeleton)
Stato attuale: la navigazione minima può vivere temporaneamente nell’app shell (owner: `docs/core/C1b_entrypoint-app.md`).

Candidati di evoluzione (senza numeri e senza forzare refactor):
- quando la UI cresce, la navigazione è candidata a spostarsi in `src/layouts/` oppure in un sotto-modulo di `src/components/`
  (solo se necessario e solo quando uno step della TIMELINE lo richiede).

#### C) CSS / Dipendenze / Accessibilità — fonte canonica (anti-ridondanza)

Per evitare duplicazioni, i dettagli operativi e le regole “canoniche” vivono nelle sezioni dedicate:

- **CSS (stato presente + regole minime):** vedi § **8.1**
- **Dipendenze (principio + inventario truth-first):** vedi § **8.2**
- **Accessibilità baseline (regole minime):** vedi § **8.3**

In questa sezione restano solo: boundaries, criteri di collocazione e anti-pattern.

### 2.2 Legacy: due riferimenti distinti (truth-first)

Il repository mantiene **due riferimenti legacy**, con scopi diversi:

1) **Legacy “freeze” immutabile (consultazione e confronto)**
- Branch: `baseline/legacy`
- Scopo: snapshot di riferimento (audit/confronto/consultazione)
- Regola: non è parte del runtime della nuova app.

2) **Legacy operativa temporanea (branch rebuild)**
- Branch: `development`
- Directory: `old_version/`
- Scopo: vault di consultazione durante il rebuild; baseline **temporanea** destinata a progressiva migrazione/smantellamento (quando previsto dagli step successivi).
- È **vietato** importare o referenziare a runtime contenuti da `old_version/`.
- Nota operativa: `old_version/` resta presente finché previsto dalla TIMELINE; non si anticipa alcuna rimozione.
- Nella TIMELINE corrente, `old_version/` resta solo riferimento di consultazione: non esiste ancora uno step attivo di migrazione runtime dalla legacy.

---

## 3) Obiettivi architetturali (TO-BE)

Obiettivi concreti della struttura target:

- **Struttura `src/` scalabile:** separare livelli (bootstrap app, pages, layouts, components, lib, assets, styles).
- **Confini e dipendenze sane:** evitare cicli, evitare “misc”, ridurre coupling.
- **Migrazione controllata:** introdurre asset e pagine legacy solo dopo i gate/milestone previsti.
- **Riproducibilità:** mantenere verifiche continue (dev sempre ok; build/lint come gate quando richiesto).
- **Zero runtime legacy:** la nuova app deve funzionare in modo indipendente da `old_version/`.

---

## 4) Confini architetturali e regole di dipendenza (applicabili)

La struttura fisica AS-IS di `src/` (cartelle e albero reale) è documentata in § **2.1.1**.
Qui restano solo le regole applicabili (confini, dipendenze consentite, composition root) per evitare cicli e “misc”.

Regole hard (dipendenze consentite):
- `pages/` può dipendere da `layouts/`, `components/`, `lib/`, `assets/`, `styles/`.
- `components/` può dipendere da `lib/`, `assets/`, `styles/`.
- `lib/` **non** dipende da layer UI (`pages/`, `layouts/`, `components/`) — niente UI dentro `lib/`.
- `app/` è *composition root*: wiring/bootstrap solamente (vedi regola sotto).

Regola (composition root):
- `app/` contiene solo “wiring” e bootstrap: entrypoint, providers, configurazioni applicative e (quando introdotto) setup routing.
- `app/` **non** contiene UI di dominio o componenti riusabili: quelli vivono in `pages/`, `layouts/`, `components/`.
- Se un file in `app/` cresce oltre il minimo necessario, va rifattorizzato spostando UI/logic nei layer corretti.

Note operative:
- `app/` evita che `main.jsx`/`App.jsx` diventino un miscuglio.
- `pages/` contiene solo componenti pagina; la logica condivisa va in `lib/` o `components/`.

Regola (truth-first):
- Le directory `layouts/`, `components/`, `lib/`, `assets/` risultano già presenti in `src/` (AS-IS).
- Non introdurre **ulteriori** cartelle “future” oltre a quelle già presenti, se non richieste dallo step corrente.
- Non spostare contenuti tra cartelle per “pulizia” senza uno step dedicato (evitare refactor massivi).

Anti-pattern frequenti (da evitare):
- “header monolitico” che conosce tutte le pagine e tutta la logica
- componenti riusabili che importano pagine (inversione di dipendenza)
- `lib/` che diventa una cartella “misc” con UI o side-effect non controllati
- refactor massivi “per pulizia” fuori da uno step dedicato (rischio regressioni)

---

## 5) Convenzioni di naming (coerenza > estetica)

### 5.1 File

- Componenti React: `PascalCase.jsx` (es. `StickySection.jsx`)
- Hook: `useXxx.js|jsx` (es. `useScrollProgress.js`)
- Utility: `camelCase.js` (es. `formatDate.js`)
- Costanti: `SCREAMING_SNAKE_CASE` quando utile (es. exports coerenti)

### 5.2 Cartelle

Scegliere uno stile e mantenerlo. Raccomandazione coerente con migrazione asset:
- contenuti/asset: `kebab-case`
- cartelle tecniche: `camelCase` (o `kebab-case` uniforme: accettabile se coerente)

Regola: applicare la convenzione ai file toccati nello step corrente (evitare refactor massivi).

### 5.3 Barrel exports (index files) — regola di prudenza

- Evitare barrel exports “aggressivi” (`index.js`/`index.jsx` ovunque) nelle fasi iniziali: aumentano il rischio di dipendenze circolari e import involontari.
- Consentiti solo quando:
  - semplificano realmente gli import in un’area stabile,
  - non introducono cicli,
  - restano locali a un modulo (es. `components/` o `lib/`) e non diventano un “mega-index” globale.
- In caso di dubbi: preferire import espliciti dal file sorgente.

---

## 6) Asset strategy (React vs legacy) — regole e posizionamento

### 6.1 Regola hard

- È **vietato** importare o referenziare a runtime da `old_version/`.
- `old_version/` resta vault di consultazione nel branch di rebuild.

### 6.2 Dove vivono gli asset nella nuova app

- `public/`: solo asset che richiedono un URL statico diretto.
- `src/assets/`: default per immagini/icone/font importati dai componenti (bundler-managed).

Regola pratica:
- usare `src/assets/` quando l’asset è importato da componenti (bundler-managed);
- usare `public/` solo quando serve un URL statico diretto e stabile (senza import).

### 6.3 Asset legacy (migrazione) — stato corrente e vincolo truth-first

Stato corrente:
- nella TIMELINE corrente non esiste ancora uno step attivo di migrazione asset dalla legacy;
- `old_version/` resta area di consultazione, non fonte runtime;
- eventuali asset nuovi della base React devono vivere in `src/assets/` o `public/` secondo il criterio del § 6.2.

Regole hard:
- è vietato usare path o riferimenti runtime a `old_version/`;
- finché la TIMELINE non apre uno step reale di migrazione, gli asset legacy non vengono copiati nella nuova app;
- quando la migrazione diventerà reale, andrà documentata con path veri, criterio di rinomina e boundary chiari.

Policy dimensioni:
- seguire `docs/core/B1_assets_policy.md` (niente nuovi asset pesanti in Git oltre soglia; usare referenze esterne).

---

## 7) Routing e pagine — AS-IS + regole minime

Come da `docs/TIMELINE.md`, il routing è introdotto con **React Router**.

### 7.1 Route table AS-IS (truth-first)

La mappa route **effettivamente presente oggi** è documentata nel file owner:

- `docs/core/C1b_entrypoint-app.md`

Regola truth-first:
- `ARCHITECTURE.md` non elenca route specifiche se non supportate da evidenza diretta nel codice.
- Se cambiano le route, si aggiorna **solo** il documento owner `docs/core/C1b_entrypoint-app.md`.

### 7.2 Regole minime post-introduzione (stato attuale)

- componenti route-level in `src/pages/`
- navigazione minima può vivere temporaneamente in `App.jsx` (fase skeleton)
- quando la UI cresce, la navigazione è candidata a spostarsi in `src/layouts/` o `src/components/navigation/`
  (solo se/quando tali cartelle vengono introdotte)

### 7.3 Note deploy (non operative finché non c’è un target deciso)

Su hosting statico può servire rewrite verso `index.html`. Se non disponibile, valutare `HashRouter`
in uno step dedicato (decisione di deploy; non assunta qui).

### 7.4 Pagine placeholder (skeleton): stato AS-IS + regole di evoluzione

Questa sezione definisce cosa intendiamo per **pagina placeholder (skeleton)** nel rebuild React/Vite e
come evolve in modo controllato, senza anticipare migrazione legacy.

Regola anti-ridondanza (owner):
- La **route table effettiva** non vive qui: è documentata *solo* nel documento owner:
  - `docs/core/C1b_entrypoint-app.md`

#### Stato AS-IS (truth-first)

**Pagine (route-level) presenti oggi** in `src/pages/`:

| Pagina (nome file)        | Path reale                     | Stato        | Note |
|---|---|---|---|
| HomePage.jsx              | `src/pages/HomePage.jsx`        | Placeholder  | Route-level, importata in `src/app/App.jsx` e renderizzata su `/`. |
| RaccoltaPage.jsx          | `src/pages/RaccoltaPage.jsx`    | Placeholder  | Route-level, importata in `src/app/App.jsx` e renderizzata su `/raccolta`. |
| SportelloPage.jsx         | `src/pages/SportelloPage.jsx`   | Placeholder  | Route-level, importata in `src/app/App.jsx` e renderizzata su `/sportello`. |
| (tracking) `.gitkeep`     | `src/pages/.gitkeep`            | N/A          | File tecnico: tiene tracciata la cartella se temporaneamente vuota. |

Definizioni operative (minime):
- **Placeholder** = pagina che rende senza errori e contiene solo markup/testo minimo + wiring necessario,
  senza contenuti/DOM legacy importati “a blocco”.
- **Non-placeholder** = pagina che inizia a implementare contenuti/feature reali (post-C4 se coinvolge legacy).

#### Cosa è ammesso ora (fase skeleton)

Ammesso:
- contenuto esplicitamente placeholder (testo, heading, scaffolding minimo);
- layout/navigazione minimi necessari al routing;
- composizione leggera tramite componenti riusabili *se già esistenti*;
- piccoli aggiustamenti di stile *limitati allo scope* della pagina/shell (senza introdurre nuove strategie CSS).

#### Cosa è vietato (hard)

Vietato:
- porting di DOM/logica legacy “a blocco” dentro una pagina React;
- qualsiasi import/referenza runtime a file sotto `old_version/`;
- “misc logic” dentro pagine (side-effect non motivati, utilità generiche non riusabili) invece di `src/lib/`;
- refactor massivi di struttura cartelle “per pulizia” fuori da step dedicati.

#### Criteri minimi di evoluzione (da placeholder → reale)

Una pagina può considerarsi **pronta a evolvere** quando:
- è chiaro lo scopo (1–2 righe) e il perimetro;
- esiste un minimo di componentizzazione (evitare pagina monolitica);
- la logica condivisa (format, helpers, hooks) vive in `src/lib/` o componenti riusabili in `src/components/`;
- non introduce dipendenze nuove senza step TIMELINE dedicato.

Vincolo di sequenza (hard, legacy):
- Se una pagina richiede asset o contenuti legacy, la migrazione non è ancora attiva nella TIMELINE corrente.
- Finché non esiste uno step reale di migrazione, `old_version/` resta solo consultazione e non entra nel runtime.

---

## 8) Qualità minima (gates) e anti-regressione

Gates minimi coerenti con TIMELINE:
- `npm run dev` deve restare avviabile nello step corrente (gate continuo)
- `npm run build` deve passare quando richiesto dalla TIMELINE (es. milestone **C4**)
- `npm run lint` usato come gate quando previsto o quando la base cresce (step/milestone dedicati)

Regola: nessun cambiamento strutturale senza mantenere i gate dello step corrente.

---

## 8.1 CSS — stato presente + regole minime

Stato presente (per evidenza diretta dagli import nei file entrypoint, code-as-is):
- CSS globale importato in `src/main.jsx`: `src/styles/index.css`
- CSS app-level importato in `src/app/App.jsx`: `src/styles/App.css`

Regole minime:
- `index.css` resta “globale” (reset/variabili/base) e non deve diventare un dump di stili di feature.
- `App.css` può contenere stile della shell (header/nav) finché la UI è skeleton.
- Vietata la “framework war” prematura: non introdurre nuove strategie CSS (CSS-in-JS, Tailwind, ecc.)
  senza uno step dedicato in TIMELINE.

---

## 8.2 Dipendenze — principio + inventario truth-first

Principio:
- introdurre dipendenze solo quando motivate dallo step corrente (TIMELINE), evitando overengineering;
- distinguere sempre tra:
  - dipendenze dichiarate in `package.json`
  - versioni effettivamente risolte nel lockfile / installate localmente.

Stato corrente verificato:

### Dipendenze runtime dichiarate (`package.json`)
- `react` → `^19.2.0`
- `react-dom` → `^19.2.0`
- `react-router-dom` → `^7.13.0`

### Dev dependencies dichiarate (`package.json`)
- `@eslint/js` → `^9.39.1`
- `@types/react` → `^19.2.5`
- `@types/react-dom` → `^19.2.3`
- `@vitejs/plugin-react` → `^5.1.1`
- `eslint` → `^9.39.1`
- `eslint-plugin-react-hooks` → `^7.0.1`
- `eslint-plugin-react-refresh` → `^0.4.24`
- `globals` → `^16.5.0`
- `vite` → `^7.2.4`

### Versioni effettivamente installate (`npm ls --depth=0`)
- `react` → `19.2.4`
- `react-dom` → `19.2.4`
- `react-router-dom` → `7.13.0`
- `@eslint/js` → `9.39.2`
- `@types/react` → `19.2.10`
- `@types/react-dom` → `19.2.3`
- `@vitejs/plugin-react` → `5.1.2`
- `eslint` → `9.39.2`
- `eslint-plugin-react-hooks` → `7.0.1`
- `eslint-plugin-react-refresh` → `0.4.26`
- `globals` → `16.5.0`
- `vite` → `7.3.1`

Lettura truth-first:
- `package.json` usa range con caret (`^`), quindi il lockfile e l’installazione locale possono risolvere versioni patch/minor più recenti compatibili;
- lo stato reale del repository va letto come combinazione di manifest + lockfile, non dal solo `package.json`;
- allo stato attuale non risultano dipendenze per test frontend, coverage o UI animation oltre alla baseline React/Vite/Router + lint/tooling.

Criterio di introduzione dipendenze:
- runtime: solo quando abilitano capability reali della nuova app;
- dev/tooling: solo quando supportano gate o flussi effettivamente aperti in TIMELINE;
- vietato introdurre dipendenze speculative “per dopo”.

Nota attuale:
- il gate `npm run lint` è ora verde;
- `old_version/` è esclusa dal lint tramite `globalIgnores(...)` in `eslint.config.js`, così il quality gate valuta solo la codebase React/Vite attiva;
- questa scelta mantiene separati runtime moderno e vault legacy, evitando falsi rossi sul codice non ancora migrato.

Verifiche usate:
- `cat package.json`
- `cat package-lock.json | head -n 120`
- `npm ls --depth=0`

---

## 8.3 Accessibilità baseline — regole minime applicabili subito

Regole pratiche (baseline):
- usare tag semantici dove possibile (`header`, `nav`, `main`, titoli `h1/h2/...` coerenti)
- navigazione da tastiera: Tab/Shift+Tab deve attraversare i link di nav e gli elementi interattivi
- focus visibile: vietato rimuovere outline senza sostituzione equivalente
- link testuali chiari (evitare “clicca qui” senza contesto)

Anti-pattern:
- `div` cliccabili senza ruolo/keyboard support
- icone senza label testuale/aria quando diventano azioni

### 8.4 Comandi canonici (evidenza + controlli truth-first)

Questa è l’unica sezione che contiene comandi/verifiche operative, per evitare duplicazioni nel documento.

**Stato repo**
```bash
git status -sb
```

**Avvio runtime development**
```bash
npm run dev
```

**Avvio e controllo runtime**
- Verifica manuale: aprire e navigare
  - `/`
  - `/raccolta`
  - `/sportello`
  - atteso: nessun errore bloccante in console

**Inventario pagine (source of truth per §7.4)**
- `find src/pages -maxdepth 2 -type f -print | sort`

**Divieto runtime da legacy (controllo veloce)**
- Controllo import sospetti verso `old_version/`:
  - `grep -RIn "old_version" src || true`

**Gate build/lint (quando richiesti dalla TIMELINE)**
- `npm run build`
- `npm run lint`

---

## 9) Anti-deriva (documentazione, scope e runtime)

Coerente con la TIMELINE corrente:

- `docs/TIMELINE.md` resta la source of truth operativa;
- `docs/ARCHITECTURE.md` descrive solo AS-IS e regole strutturali, non pianificazione futura;
- `old_version/` resta consultazione: nessun import o riferimento runtime;
- nuove dipendenze, nuove strategie styling o nuovi sottosistemi si introducono solo quando la TIMELINE apre uno step reale;
- i documenti concept-first possono esistere anche senza implementazione, ma senza citare path inesistenti.

---

## 10) Collegamento operativo alla TIMELINE

Questo documento è un **blueprint**: definisce regole e confini stabili.

La sequenza operativa e il backlog corrente (repo-bound docs, concept track, step futuri) sono definiti **solo** in `docs/TIMELINE.md`.

Regola:
- se c’è conflitto tra `ARCHITECTURE.md` e `TIMELINE.md`, vince **TIMELINE** (source of truth operativa).
- se cambia la traiettoria operativa della TIMELINE, `ARCHITECTURE.md` va riallineato solo nei punti in cui la struttura AS-IS o i vincoli dichiarati risultano impattati.

---

