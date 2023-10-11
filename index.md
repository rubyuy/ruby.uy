- Meetup: [Montevideo](https://www.meetup.com/ruby-montevideo/){:target="_blank"}
- Slack [Open Web Uruguay - Ruby](https://owu.slack.com/archives/C52L2AK8W){:target="_blank"} |
  [Unirse a OWU](https://owu.uy)
- Tareas de la comunidad: [Lista](/community_tasks)
- Sponsors: [Lista](/sponsors) | [Detalles de sponsoreo](/sponsorship_details)
- Github: [Repo](https://github.com/rubyuy/ruby.uy){:target="_blank"}
- Analytics: [Ver](https://analytics.umami.is/share/MbC0PW7QoyfeUQU8/RubyUY){:target="_blank"}
- Twitter/X: [Ver](https://twitter.com/rubymontevideo){:target="_blank"}
- Instagram: [Ver](https://www.instagram.com/ruby_uruguay/){:target="_blank"}

## Meetups

<ul>
{% for meetup in site.meetups reversed %}
    <li><a href="{{ meetup.url }}"> {{ meetup.date | date_to_string }} - {{ meetup.title }} </a></li>
{% endfor %}
</ul>
