---
title: 'Risorse e Link Utili'
layout: 'article.njk'
permalink: '/risorse/'
description:
  'Elenco di siti web, musei, riviste e associazioni in ambito archeologico e
  storico.'
---

# Siti Web e Associazioni

Di seguito un elenco di link a istituti, musei, riviste e associazioni utili per
approfondire le ricerche e le tematiche archeologiche.

<div>
  <ol class="flow">
  {%- for item in risorse.links -%}
    <li>
      <strong><a href="{{- item.url -}}" target="_blank" rel="noopener noreferrer">{{- item.name -}}</a></strong>
      {%- if item.location -%}&nbsp;({{- item.location -}}){%- endif -%}
      {%- if item.description -%}<br><em>{{- item.description -}}</em>{%- endif -%}
    </li>
  {%- endfor -%}
  </ol>
</div>
