require 'digest'

module CustomFilters
  def buster(filename)
    "#{filename}?d=#{Time.now.to_i}"
  end

  def css_asset(filename)
    "/assets/css/#{filename}.css"
  end
end

Liquid::Template.register_filter(CustomFilters)
