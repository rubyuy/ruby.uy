document.addEventListener("DOMContentLoaded", () => {
  const input = document.querySelector("#talks-search");
  if (!input) return;

  const talks = document.querySelectorAll(".talk");

  input.addEventListener("input", () => {
    const query = input.value.trim().toLowerCase();

    talks.forEach((talk) => {
      const haystack = talk.dataset.search || "";
      talk.hidden = query && !haystack.includes(query);
    });
  });
});
