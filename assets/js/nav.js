function toggleNavLinks() {
  [...document.querySelectorAll("nav ul li:nth-child(n+3):not(:last-child)")].forEach(link => {
    link.style.display = link.style.display === "flex" ? "none" : "flex"
  })
}

function duplicate(element, {times}) {
  for (let i = 0; i < times; i++) {
    const clone = element.cloneNode(true)
    clone.setAttribute("aria-hidden", "true")
    element.parentNode.appendChild(clone)
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const viewportWidth = document.documentElement.clientWidth || window.innerWidth;

  if (viewportWidth > 768) {
    const element = document.querySelector(".example")
    duplicate(element, {times: 6})
  }
})
