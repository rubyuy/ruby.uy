function toggleBarLinks() {
  var x = document.querySelector(".barMenu .barLinks");
  if (x.style.display === "flex") {
    x.style.display = "none";
  } else {
    x.style.display = "flex";
  }
}
