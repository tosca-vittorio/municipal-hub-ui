# ROADMAP — municipal-hub-ui

## Scopo

Questo documento governa la traiettoria evolutiva del progetto **municipal-hub-ui** a livello alto.
Non sostituisce `docs/TIMELINE.md`, che resta la source of truth operativa step-by-step.
Non sostituisce `docs/ARCHITECTURE.md`, che resta il blueprint AS-IS del sistema.

Regola:
- `ROADMAP.md` dice **dove stiamo andando** e in quale ordine logico.
- `TIMELINE.md` dice **cosa è attivo adesso**, con DoD verificabile.
- `CHANGELOG.md` registra **ciò che è stato consolidato**.
- `ARCHITECTURE.md` descrive **com’è strutturato oggi** il sistema.

---

## Stato corrente sintetico

Il repository ha già consolidato:

- baseline legacy congelata e consultabile;
- bootstrap React/Vite;
- hygiene repo minima;
- struttura `src/` applicata;
- routing base e pagine placeholder;
- owner docs minimi riallineati (`TIMELINE`, `ARCHITECTURE`, `CHANGELOG`).

Il progetto non è ancora in migrazione funzionale reale della legacy.
La traiettoria corrente è prima documentale/concettuale, poi tecnica.

---

## Direzione strategica

### R1 — Consolidamento owner docs e governance
Obiettivo:
- chiudere il pacchetto documentale owner minimo e renderlo coerente, stabile e auditabile.

Include:
- `TIMELINE.md`
- `CHANGELOG.md`
- `ARCHITECTURE.md`
- `ROADMAP.md`
- `.gitignore` coerente con i documenti owner effettivamente versionati

Esito atteso:
- governance SEOF pulita, senza doppie source of truth.

### R2 — Backlog tecnico/architetturale preservato e riattivabile
Obiettivo:
- preservare le capability tecniche, architetturali e conoscitive già emerse nel progetto, senza trattarle come blocco operativo corrente.

Ordine logico iniziale:
1. routing deep-dive
2. state/store solo se giustificato
3. HTTP layer solo quando esiste codice reale
4. testing avanzato / error boundaries dopo baseline test reale
5. performance solo dopo baseline misurabile

Esito atteso:
- patrimonio tecnico preservato, riattivabile e coerente con lo stato reale del repository, senza dispersione di conoscenza utile.

### R3 — Quality baseline frontend
Obiettivo:
- introdurre, quando aperto in TIMELINE, una baseline minima di qualità frontend.

Direzione attesa:
- lint governato correttamente
- test frontend baseline
- coverage/reporting proporzionati
- gate chiari e riproducibili

Esito atteso:
- base moderna verificabile, testabile e difendibile prima di qualsiasi migrazione funzionale selettiva dalla legacy.

### R4 — Evoluzione runtime/UI reale
Obiettivo:
- passare, solo quando giustificato dalla TIMELINE, da placeholder/documentazione a sviluppo UI/UX reale e progressivo.

Vincoli:
- niente regressioni
- niente import runtime da `old_version/`
- dipendenze introdotte solo su bisogno reale
- componentizzazione e boundaries coerenti con `ARCHITECTURE.md`

Esito atteso:
- crescita controllata della nuova app React senza contaminazione legacy.

### R5 — Migrazione funzionale selettiva della legacy
Obiettivo:
- valutare se, quando e come migrare parti della legacy nel runtime React.

Regola hard:
- la migrazione non è automatica né implicita;
- va attivata solo quando la TIMELINE apre uno step reale e verificabile.

Esito atteso:
- eventuale migrazione progressiva, selettiva e difendibile.

### R6 — Deploy e maturazione finale
Obiettivo:
- preparare il progetto a build stabile, qualità finale e possibile rilascio/deploy.

Include, se e quando pertinenti:
- strategia deploy SPA
- gestione rewrite / routing
- hardening finale
- eventuali ottimizzazioni o strumenti aggiuntivi solo se giustificati

Esito atteso:
- baseline distribuibile e professionalmente presentabile.

---

## Ordine di priorità corrente

Priorità attuale:

1. quality baseline frontend
2. backlog tecnico/architetturale preservato e riattivabile
3. sviluppo runtime/UI reale
4. migrazione funzionale selettiva della legacy
5. deploy/release
   
---

## Regole di mantenimento

Aggiornare `ROADMAP.md` solo quando cambia davvero almeno uno di questi elementi:

- traiettoria complessiva del progetto;
- ordine di priorità tra macro-fasi;
- decisione strategica su migrazione, qualità o deploy;
- perimetro alto livello del progetto.

Non aggiornare `ROADMAP.md` per micro-step, fix locali o avanzamenti minuti:
quelli vivono in `docs/TIMELINE.md` e `docs/CHANGELOG.md`.
