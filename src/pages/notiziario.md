---
pagination:
  data: pubblicazioni.notiziari
  size: 1
  alias: item

permalink: "/notiziario/{{ item.numero | slugify }}/index.html"

layout: page.njk

eleventyComputed:
  title: "Notiziario N°{{ item.numero }}"
---

# Notiziario N° {{ item.numero }} ({{ item.anno }})

{% if item.immagine %}
  <img src="{{ item.immagine }}" alt="Copertina Notiziario {{ item.numero }}">
{% endif %}

{% if item.download %}
  <a href="{{ item.download }}" class="btn-download">Scarica il PDF</a>
{% endif %}

<h2>Indice</h2>
<ul>
  {% for articolo in item.indice %}
    <li>
      <strong>Pag. {{ articolo.pagina }}</strong>: {{ articolo.titolo }}
      {% if articolo.autori %}
        <em>di {{ articolo.autori }}</em>
      {% endif %}
    </li>
  {% endfor %}
</ul>