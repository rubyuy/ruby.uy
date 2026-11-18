document.addEventListener("DOMContentLoaded", () => {
  const copyButton = document.querySelector("#skill-copy");
  const source = document.querySelector("#skill-source");
  const markdown = document.querySelector("#skill-markdown");
  const tabs = document.querySelectorAll(".skill-tab");

  if (copyButton && source) {
    copyButton.addEventListener("click", async () => {
      await navigator.clipboard.writeText(source.textContent);
      copyButton.textContent = "Copied!";
      setTimeout(() => { copyButton.textContent = "Copy"; }, 1500);
    });
  }

  if (tabs.length && markdown && source) {
    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        document.querySelector(".skill-tab.active")?.classList.remove("active");
        tab.classList.add("active");

        const showRaw = tab.dataset.view === "raw";
        markdown.hidden = showRaw;
        source.hidden = !showRaw;
      });
    });
  }
});
