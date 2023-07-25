require 'optparse'
require 'yaml'

LANGUAGES = ['en']

options = {}
OptionParser.new do |opts|
  opts.on("-A", "--all", "Regenerate all files") do |v|
    options[:all] = v
  end
end.parse!

files = if options[:all]
          Dir.glob("**/*.{md,html}")
        else
          `git diff --cached --name-only`.split("\n")
        end

pages = files.select { |file|
  file.match?(%r{(?:.md)|(?:.html)})
}.reject { |file|
  file.match?(%r{(?:^_includes/)|(?:^_layouts/)|(?:^_site/)|(?:^README)|(?:^404)|(?:^en/)})
}

config = YAML.safe_load_file("_config.yml")
collections = config["collections"].reject { |key, _| key.end_with?('_en') }

pages.each do |page|
  LANGUAGES.each do |language|
    page_dir = File.dirname(page)

    FileUtils.mkdir_p("#{language}/#{page_dir}")
    file = File.open(page)
    content = file.read

    # i18n links
    content.gsub!(%r{href=(.)/}, "href=\\1/#{language}/")

    # i18n collections
    collections.each do |collection|
      content.gsub!(%r{site.#{collection}}, "site.#{collection}_#{language}")
    end

    File.write("#{language}/#{page}", content)
  end
end

collections.each do |key, value|
  LANGUAGES.each do |language|
    next unless value["permalink"]

    config["collections"]["#{key}_#{language}"] = value.merge("permalink" => "/#{language}#{value["permalink"]}")
    File.symlink("#{language}/_#{key}", "_#{key}_#{language}") unless File.exist?("_#{key}_#{language}")
  end
end

File.open('_config.yml', 'w') {|f| f.write config.to_yaml }
