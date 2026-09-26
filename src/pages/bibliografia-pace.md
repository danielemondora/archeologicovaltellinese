---
title: 'Davide Pace: Articoli e Pubblicazioni'
permalink: '/davide-pace/bibliografia/'
layout: 'article.njk'
description:
  "L'elenco completo delle pubblicazioni, degli articoli e dei Tellina Opuscola
  di Davide Pace"
---

# L'opera letteraria e scientifica

L'instancabile lavoro di ricerca di **Davide Pace** è documentato in una ricca
serie di articoli, saggi e nei suoi celebri _"Tellina Opuscola"_, trattati in
cui il rigore archeologico si fonde con la sua inconfondibile vocazione
letteraria.

Di seguito l'elenco delle sue pubblicazioni:

<div>
  <ol class="flow">
  {%- for pub in bibliografiaDavidePace -%}
    <li>
      <strong>{{- pub.title -}}</strong><br>
      <em>{{- pub.source -}}</em>,&nbsp;{{- pub.date -}}
      {%- if pub.note -%}<br><small>{{- pub.notes -}}</small>{%- endif -%}
    </li>
  {%- endfor -%}
  </ol>
</div>
