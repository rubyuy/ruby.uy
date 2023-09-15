<ul>
  <li>Meetup: <a href="https://www.meetup.com/ruby-montevideo/" target="_blank">Montevideo</a></li>
  <li>
    Slack: <a href="https://owu.slack.com/archives/C52L2AK8W" target="_blank">Open Web Uruguay - Ruby</a> |
    <a href="https://owu.uy">Unirse a OWU</a>
  </li>

  <li>Sponsors: <a href="/sponsors">List</a> | <a href="/sponsorship_details">Detalles de sponsoreo</a></li>
  <li>Github: <a href="https://github.com/rubyuy/ruby.uy" target="_blank">Repo</a></li>
  <li>Analytics: <a href="https://analytics.umami.is/share/MbC0PW7QoyfeUQU8/RubyUY" target="_blank">Ver</a></li>
  <li>Twitter/X: <a href="https://twitter.com/rubymontevideo">Ver</a></li>
  <li>Instagram: <a href="https://www.instagram.com/ruby_montevideo/">Ver</a></li>
</ul>

## Meetups

<ul>
{% for meetup in site.meetups reversed %}
    <li><a href="{{ meetup.url }}"> {{ meetup.date | date_to_string }} - {{ meetup.title }} </a></li>
{% endfor %}
</ul>
