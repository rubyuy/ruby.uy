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

  def flat_map(array, key)
    Array(array).flat_map { |item| item[key] || [] }
  end

  def sum_by(array, key)
    Array(array).sum { |item| item[key].to_i }
  end

end

Liquid::Template.register_filter(CustomFilters)
