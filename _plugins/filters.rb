require 'digest'

module Filters
  # Usage example:
  #
  # {{ "/style.css" | buster }}
  # {{ "/style.css" | buster | absolute_url }}
  def buster(filename)
    filepath = File.join(@context.registers[:site].dest, filename)

    Digest::SHA256
      .file(filepath)
      .then { |sha| sha.hexdigest }
      .then { |digest| "#{filename}?#{digest}" }
  rescue Errno::ENOENT
    # Return filename unmodified if file was not found
    filename
  end

  def css(filename)
    buster("/assets/css/#{filename}.css")
  end
end

Liquid::Template.register_filter(Filters)
