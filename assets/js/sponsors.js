document.addEventListener("DOMContentLoaded", () => {
  const sponsorsLists = document.querySelectorAll("#sponsors-list ul");
  sponsorsLists.forEach((sponsorsList) => duplicate(sponsorsList, { times: 2 }));
  document.querySelectorAll("#sponsors-list ul").forEach(list => {
    list.classList.add("infinite-horizontal-animation")
  })
});
