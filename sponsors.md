---
title: Sponsors
---

<ul class="sponsors-list">
{% for sponsor in site.data.sponsors %}
  {% assign company = site.data.companies[sponsor] %}
  <li class="sponsors-listitem">
    <a href="{{ company.url }}" class="sponsors-link" target="_blank" rel="noopener noreferrer">
      <img src="{{ company.image | image_asset | buster }}" loading="lazy" width="240" height="80" alt="{{ company.name }}"/>
    </a>
  </li>
{% endfor %}
</ul>
