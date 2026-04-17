# municipal-hub-ui — React/Vite rebuild

Rebuild completo di **Municipal-Hub-UI** su stack **React + Vite**, con **legacy “freeze”** preservata nel branch `baseline/legacy` a scopo di consultazione e confronto, e con una copia **temporanea** della legacy in `old_version/` nel **branch di rebuild** `development`.

---

## 1) Panoramica

Questo repository rappresenta una transizione controllata:
- da una base legacy in **HTML/CSS/JavaScript** (baseline storica),
- a una nuova base **React** con tooling moderno (**Vite**, lint, build/preview),
- con avanzamento guidato da documentazione operativa e verificabile.

---

## 2) Contesto (truth-first)

Questo repository gestisce la transizione con **due riferimenti legacy distinti**:

- **Legacy “freeze” (consultazione):** conservata nel branch `baseline/legacy`, che rappresenta la versione legacy **immutabile (snapshot di riferimento)**, mantenuta per confronto, audit e consultazione.
- **Legacy operativa nel rebuild:** nel branch `development` la root contiene la nuova app React/Vite, mentre la legacy è presente in `old_version/` come baseline **temporanea**, soggetta a progressiva integrazione/smantellamento fino alla sua eventuale rimozione.
- **Nuova app:** progetto React/Vite in root.
- **Source of truth:** `docs/TIMELINE.md` governa l’ordine operativo e lo stato reale degli step (DoD verificabili).

> Regola: il README contiene solo entrypoint e riferimenti stabili.  
> Le decisioni operative e lo stato degli step vivono in `docs/TIMELINE.md` (DoD verificabili).


---

## 3) Prerequisiti

- Node.js (LTS consigliato)
- npm

Verifica rapida:

```bash
node -v
npm -v
```

---

## 4) Quickstart

Installazione dipendenze:

```bash
npm install
```

Avvio in development (dev server Vite):

```bash
npm run dev
```

---

## 5) Script disponibili

```bash
npm run dev       # dev server (Vite)
npm run build     # build produzione
npm run preview   # preview della build
npm run lint      # lint (ESLint)
npm run test      # test frontend baseline (Vitest)
```

---

## 6) Struttura (snapshot attuale)

Struttura **attuale** del repository (alto livello):

* `docs/` — documentazione operativa (source of truth)
* `public/` — asset statici serviti da Vite
* `src/` — codice applicativo React
* `old_version/` — legacy **operativa temporanea** nel branch di rebuild (integrazione/smantellamento progressivo)

---

## 7) Documentazione

Documentazione **attiva** (source of truth):

* `docs/TIMELINE.md` — step e DoD verificabili (stato operativo corrente)

---

## 8) Convenzioni di commit (Conventional Commits)

Formato:

* `<type>: <summary>` oppure `<type>(scope): <summary>`

Tipi consigliati:

* `docs`, `feat`, `fix`, `refactor`, `chore`, `build`, `ci`, `test`

---

## 9) Legacy — contesto, scope e baseline

La baseline legacy deriva da un portale web sviluppato per il cliente Progitec S.r.l., attivo nel settore della raccolta differenziata e dei servizi ambientali.
L’intervento mirava alla realizzazione di un portale informativo con architettura dei contenuti chiara, navigazione immediata e **layout responsive**, garantendo un’esperienza d’uso coerente su smartphone, tablet e desktop.

La soluzione legacy è costituita da quattro pagine web sviluppate con HTML5, CSS3 e JavaScript, caratterizzate da **layout responsive implementato tramite media queries CSS** e da interazioni lato client (ad esempio box informativi espandibili e meccanismi di navigazione semplificata).

**Stack legacy:** HTML5 (struttura semantica), CSS3 (presentazione e responsività), JavaScript (logica di interazione lato client).

Il rebuild su React/Vite assume questa baseline come riferimento per garantire tracciabilità rispetto all’implementazione originaria e per introdurre un’architettura più manutenibile, modulare e riproducibile (tooling, build, linting e workflow controllato).

> Nota: la legacy “immutabile” di consultazione vive nel branch `baseline/legacy`. La directory `old_version/` nel branch di rebuild è un’area di lavoro temporanea destinata a essere integrata/smantellata.

---

## 10) Link rapidi

* Source of truth: `docs/TIMELINE.md`
* Legacy (freeze branch): `baseline/legacy`
* Legacy operativa (dir nel branch `development`): `old_version/`

---
