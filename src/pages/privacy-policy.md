---
layout: page.njk
title: Privacy Policy
description:
  "Informazioni sul rispetto del GDPR e sul trattamento dei dati personali per
  il sito web dell'Istituto Archeologico Valtellinese."
permalink: /privacy-policy/
date: 'Last Modified'
noindex: true
eleventyNavigation:
  key: Privacy Policy
  parent: Home
---

# Regolamento Generale sulla Protezione dei Dati dell'UE (GDPR)

Rispettiamo il Regolamento Generale sulla Protezione dei Dati dell'UE (GDPR).
Questo documento spiega in modo trasparente come vengono gestiti i dati relativi
alla navigazione su questo sito e i dati inviati per le richieste di adesione.

[[toc]]

## Quali dati di tracciamento vengono raccolti?

Questo sito **non utilizza** script di tracciamento di terze parti, non usa
cookie di profilazione e non mostra banner pubblicitari.

## Statistiche di navigazione anonime (Cloudflare Web Analytics)

Per comprendere l'affluenza sul sito e migliorare la qualità dei nostri servizi,
utilizziamo Cloudflare Web Analytics, un servizio di analisi web che rispetta la
privacy degli utenti.

- Questo strumento non utilizza cookie e non raccoglie dati personali
  identificativi.
- Non effettua tracciamento tra siti diversi (cross-site tracking) né
  profilazione (fingerprinting).
- Le metriche (come il numero di visite o le pagine più lette) vengono elaborate
  esclusivamente in forma aggregata e anonima. Gli indirizzi IP vengono
  elaborati in memoria solo temporaneamente per ricavare informazioni
  geografiche generali e di sicurezza, per poi essere immediatamente scartati.

## Dati forniti volontariamente dall'utente (Richiesta di Associazione)

Per permettere l'iscrizione all'Istituto, il sito mette a disposizione un modulo
per la raccolta dei dati necessari all'associazione (nome, cognome, indirizzo
email, codice fiscale, residenza e data di nascita).

Per garantire la massima sicurezza e privacy:

- **Nessun database web:** I dati inseriti nel modulo non vengono salvati,
  elaborati o trattenuti dai server che ospitano questo sito web.
- **Invio diretto:** La compilazione del modulo genera la precompilazione di un
  messaggio tramite il client di posta elettronica del tuo dispositivo (es.
  Outlook, Apple Mail, Gmail).
- L'email viene inviata direttamente all'indirizzo istituzionale della nostra
  associazione (ospitato su server Aruba).

Questi dati verranno trattati esclusivamente per le finalità istituzionali
dell'Associazione, per la gestione del libro soci e per gli adempimenti di legge
connessi, e non verranno in alcun caso ceduti a terzi per finalità commerciali.

## Dati tecnici di navigazione

Per motivi puramente tecnici, quando navighi sul sito il server ospitante riceve
automaticamente il tuo **indirizzo IP**. Questo è indispensabile per permettere
al server di inviare le pagine web al tuo browser. Questi dati tecnici di
navigazione non vengono da noi usati per identificarti e non vengono profilati.

## Quanto sono sicuri i tuoi dati?

Il sito è ospitato come risorsa statica tramite Cloudflare Worker e utilizza i
servizi di rete e protezione di Cloudflare, Inc., che può trattare dati tecnici
di navigazione (come indirizzi IP, header HTTP e log tecnici) per esclusive
finalità di sicurezza, distribuzione dei contenuti e protezione dagli abusi.

Questo sito web utilizza il protocollo **HTTPS**, crittografando tutti i dati
scambiati tra il tuo browser e il server, impedendo a terze parti di
intercettare i contenuti. Le comunicazioni via email per le adesioni sono
gestite tramite i server sicuri di Aruba.

## Periodo di conservazione

- **Dati tecnici:** I log eventualmente trattati dall'infrastruttura Cloudflare
  sono conservati per il breve periodo previsto dalle configurazioni di
  sicurezza del servizio.
- **Dati degli associati:** I dati inviati volontariamente via email per
  l'iscrizione verranno conservati per tutta la durata del rapporto associativo
  e successivamente per il tempo strettamente necessario all'espletamento degli
  obblighi di legge (fiscali e amministrativi).

## Titolare del trattamento dei dati

Ai sensi dell’articolo 13 del Regolamento UE n. 2016/679 (GDPR), il titolare del
trattamento dei dati del sito web {{site.domain}} è:

<address>
    <ul role="list" class="weight-base" style="list-style-type: none; padding-left: 0;">
        <li><strong>{{ site.legalName }}</strong></li>
        <li>{{ site.address.street }}, {{ site.address.postalCode }} {{ site.address.city }} ({{ site.address.province }})</li>
        <li>Codice Fiscale: {{ site.company.codiceFiscale }}</li>
    </ul>
</address>

Per qualsiasi domanda, dubbio o per esercitare i tuoi diritti previsti dal GDPR
(accesso, rettifica, cancellazione, limitazione, portabilità, opposizione), puoi
contattarci via email all'indirizzo:
<a href="mailto:{{ site.contact.email }}">{{ site.contact.email }}</a>

## Modifiche alla policy

Qualora venissero apportate modifiche a questa informativa, le variazioni
saranno efficaci a partire dal momento della loro pubblicazione su questa
pagina.

## Reclami

Se ritieni che ci sia un problema nel modo in cui gestiamo la tua privacy, ti
invitiamo a contattarci immediatamente. Hai inoltre il diritto di proporre
reclamo all'Autorità Garante per la protezione dei dati personali.

---

_Ultimo aggiornamento: {{ page.date | dateFilter }}_
