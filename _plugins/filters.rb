require 'digest'

module CustomFilters
  def buster(filename)
    "#{filename}?d=#{Time.now.to_i}"
  end

  def css_asset(filename)
    "/assets/css/#{filename}.css"
  end

  def js_asset(filename)
    "/assets/js/#{filename}.js"
  end

  def image_asset(filename)
    "/assets/images/#{filename}"
  end
end

Liquid::Template.register_filter(CustomFilters)
