require 'optparse'

LANGUAGES = ['en']
COLLECTIONS = ['meetups']

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

pages.each do |page|
  LANGUAGES.each do |language|
    page_dir = File.dirname(page)

    FileUtils.mkdir_p("#{language}/#{page_dir}")
    file = File.open(page)
    content = file.read

    # i18n links
    content.gsub!(%r{href=(.)/}, "href=\\1/#{language}/")

    # i18n collections
    COLLECTIONS.each do |collection|
      content.gsub!(%r{collection: #{collection}}, "collection: #{collection}\nlocale: #{language}")
      content.gsub!(%r{site.#{collection}}, "site.#{collection}_#{language}")
    end

    File.write("#{language}/#{page}", content)
  end
end
