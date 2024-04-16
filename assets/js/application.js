function duplicate(element, {times: times = 1} = {}) {
  for (let i = 0; i < times; i++) {
    const clone = element.cloneNode(true)
    clone.setAttribute("aria-hidden", "true")
    element.parentNode.appendChild(clone)
  }
}
