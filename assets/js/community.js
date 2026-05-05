document.addEventListener("DOMContentLoaded", () => {
  const list = document.querySelector("#community-list");
  const input = document.querySelector("#community-search");
  const view = document.querySelector("#view-community");
  const sortButtons = document.querySelectorAll(".sort-btn");

  if (!input || !list) return;

  const projectNodes = [...list.querySelectorAll(".project")];
  
  const SORTS = {
    stars: {
      compare: (a, b) => (b.dataset.stars || 0) - (a.dataset.stars || 0),
      groupByUser: false,
    },
    user: {
      compare: (a, b) => (a.dataset.user || "").localeCompare(b.dataset.user || ""),
      groupByUser: true,
    },
    name: {
      compare: (a, b) => (a.dataset.name || "").localeCompare(b.dataset.name || ""),
      groupByUser: false,
    },
  };

  let state = {
    query: "",
    currentSort: "stars"
  };

  const render = () => {
    const { compare, groupByUser } = SORTS[state.currentSort];
    const fragment = document.createDocumentFragment();
    let lastUser = null;

    const oldHeaders = list.getElementsByClassName("community-user-group");
    while (oldHeaders[0]) oldHeaders[0].parentNode.removeChild(oldHeaders[0]);

    projectNodes
      .sort(compare)
      .forEach((project) => {
        const matches = !state.query || project.dataset.search?.toLowerCase().includes(state.query);

        project.hidden = !matches;

        if (matches) {
          if (groupByUser && project.dataset.user !== lastUser) {
            lastUser = project.dataset.user;
            const header = document.createElement("h3");
            header.className = "community-user-group";
            header.textContent = lastUser;
            fragment.appendChild(header);
          }
          fragment.appendChild(project);
        }
      });

    view.classList.toggle("sort-by-user", state.currentSort !== "stars");
    list.appendChild(fragment);
  };

  input.addEventListener("input", (e) => {
    state.query = e.target.value.trim().toLowerCase();
    render();
  });

  sortButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const activeBtn = document.querySelector(".sort-btn.active");
      if (activeBtn) activeBtn.classList.remove("active");
      btn.classList.add("active");
      
      state.currentSort = btn.dataset.sort;
      render();
    });
  });

  render();
});