---
title: Sponsors
---

<ul class="sponsors-list">
{% for sponsor in site.data.sponsors %}
  <li class="sponsors-listitem">
    <a href="{{ sponsor.url }}" class="sponsors-link" target="_blank">
      <img src="{{ sponsor.image }}" alt="{{ sponsor.name  }}"/>
    </a>
  </li>
{% endfor %}
</ul>

<script type="text/javascript">
    var ul = document.querySelector('ul');
    for (var i = ul.children.length; i >= 0; i--) {
        ul.appendChild(ul.children[Math.random() * i | 0]);
    }
</script>
