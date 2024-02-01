require 'digest'

module CustomFilters
  def buster(filename)
    filepath = File.join(@context.registers[:site].dest, filename)

    Digest::SHA256
      .file(filepath)
      .then { |sha| sha.hexdigest }
      .then { |digest| "#{filename}?#{digest}" }
  end

  def css_asset(filename)
    "/assets/css/#{filename}.css"
  end
end

Liquid::Template.register_filter(CustomFilters)
