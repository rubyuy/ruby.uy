---
title: Sponsors
---

<ul class="sponsors-list">
{% for sponsor in site.data.sponsors %}
  {% assign company = site.data.companies[sponsor] %}
  <li class="sponsors-listitem">
    <a href="{{ company.url }}" class="sponsors-link" target="_blank">
      <img src="{{ company.image }}" alt="{{ company.name  }}"/>
    </a>
  </li>
{% endfor %}
</ul>
