# Ruby.uy

![](images/logo.svg)

Sitio de la comunidad Ruby en Uruguay


## Local

```bash
make server
```

## Adding slides
1. Find the meetup in the `_meetups` directory.
1. In the [Front Matter YML](https://jekyllrb.com/docs/front-matter/), under the correct talk title add the key "slides:" with the URL of your presentations
   1. If you have them in Google Slides, you can go to File > Share > Publish to web > Embed > Publish and get the url of the src of the iframe

## i18n
We want to support Spanish as the default language, and English as an alternative so that we can reach most places in the world.

The solution includes:
- Language switcher in the UI
  - By default Spanish
  - URLs prefixed with /en/ for English
- Translating text on pages
  - Add translated text in YML files under `_data/i18n/[lang].yml`
  - Calling the translated texts with `site.data.i18n[page.locale].whatever_key_in_your_yml_file`
  - Note: `page.locale` is automatically set on every page
- A script to automatically generate translated files
  - The script is run in the pre-commit hook, so it's transparent for devs
  - You can still run `bundle exec ruby i18n_pages.rb --all` to re-generate all the translated files
  - It automatically translates links to navigate the site in the same language
  - It automatically translates collections
- A binary `rubyuy-server` to automatically run the script before starting the Jekyll server
