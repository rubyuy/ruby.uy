document.addEventListener("DOMContentLoaded", () => {
  const list = document.querySelector("#skills-list");
  const input = document.querySelector("#skills-search");

  if (!input || !list) return;

  const skillNodes = [...list.querySelectorAll(".skill")];

  input.addEventListener("input", (e) => {
    const query = e.target.value.trim().toLowerCase();

    skillNodes.forEach((skill) => {
      skill.hidden = query && !skill.dataset.search?.toLowerCase().includes(query);
    });
  });
});
