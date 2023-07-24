require 'optparse'

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
  file.match?(/(?:.md)|(?:.html)/)
}.reject { |file|
  file.match?(/(?:_includes)|(?:_layouts)|(?:_site)|(?:README)|(?:404)/)
}

pages.each do |page|
  page_dir = File.dirname(page)
  next if page_dir.start_with?("en")

  FileUtils.mkdir_p("en/#{page_dir}")
  file = File.open(page)
  content = file.read
  content.sub!("locale: es", "locale: en")
  content.gsub!(%r{href=(.)/}, 'href=\1/en/')
  File.write("en/#{page}", content)
end
