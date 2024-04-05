function toggleNavLinks() {
  [...document.querySelectorAll("nav ul li:nth-child(n+3):not(:last-child)")].forEach(link => {
    link.style.display = link.style.display === "flex" ? "none" : "flex"
  })
}
