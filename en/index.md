---
locale: en
---

<ul>
  <li>Meetup: <a href="https://www.meetup.com/ruby-montevideo/" target="_blank">Montevideo</a></li>
  <li>
    Slack: <a href="https://owu.slack.com/archives/C52L2AK8W" target="_blank">Open Web Uruguay - Ruby</a> |
    <a href="https://owu.uy">{{ site.data.i18n[page.locale].index.join_owu }}</a>
  </li>

  <li>Sponsors: <a href="/sponsors">List</a></li>
  <li>Github: <a href="https://github.com/rubyuy/ruby.uy" target="_blank">Repo</a></li>
</ul>

## Meetups

<ul>
{% for meetup in site.meetups reversed %}
    <li><a href="{{ meetup.url }}"> {{ meetup.date | date_to_string }} - {{ meetup.title }} </a></li>
{% endfor %}
</ul>
