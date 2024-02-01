require 'digest'

module Filters
  def buster(filename)
    filepath = File.join(@context.registers[:site].dest, filename)

    Digest::SHA256
      .file(filepath)
      .then { |sha| sha.hexdigest }
      .then { |digest| "#{filename}?#{digest}" }
  rescue Errno::ENOENT
    filename
  end

  def css(filename)
    buster("/assets/css/#{filename}.css")
  end
end

Liquid::Template.register_filter(Filters)
