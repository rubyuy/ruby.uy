document.addEventListener("DOMContentLoaded", () => {
  const sponsorsList = document.querySelector("#sponsors-list ul")
  duplicate(sponsorsList, {times: 2})
  addAnimationToSponsorsLists()
})

function addAnimationToSponsorsLists() {
  document.querySelectorAll("#sponsors-list ul").forEach(list => {
    list.classList.add("infinite-horizontal-animation")
  })
}
