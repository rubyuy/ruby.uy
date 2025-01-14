require "io/console"

def clear = system("clear")
def highlight(text) = "\e[1;32m#{text}\e[0m\n"
def blue(text) = "\e[1;34m#{text}\e[0m"

def draw(items)
  shuffled_items = items.shuffle

  clear
  puts "Empezar el sorteo (enter para continuar):"
  gets

  60.times do |round|
    highlight_index = round % items.size

    style = -> (item, index) do
      break highlight(item.upcase) if index == highlight_index
      item
    end

    clear

    puts "Eligiendo orden:"
    puts

    items
      .map
      .with_index { |item, index| puts "  #{style.call(item, index)}"}

    sleep(0.08)
  end

  clear

  puts "Resultado final:"
  puts

  sleep(1)

  shuffled_items.each_with_index do |item, index|
    puts "  #{index + 1}. #{blue(item)}"
    sleep(0.5)
  end

  puts
end

sponsors = DATA.read.split("\n")

draw(sponsors)

__END__
rootstrap
neocoast
eagerworks
cedarcode
howdy
xmartlabs
effectussoftware
mimiquate
qubika
wyeworks
