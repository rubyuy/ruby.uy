staged_files = `git diff --cached --name-only`.split("\n")
pages = staged_files.select { |file| file.match?(/(?:.md)|(?:.html)/) }
pages.each do |page|
  page_dir = File.dirname(page)
  next if page_dir.start_with?("en")

  FileUtils.mkdir_p("en/#{page_dir}")
  file = File.open(page)
  content = file.read
  content.sub!("locale: es", "locale: en")
  File.write("en/#{page}", content)
end
