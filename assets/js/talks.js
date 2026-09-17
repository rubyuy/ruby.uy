document.addEventListener('DOMContentLoaded', () => {
  const input = document.querySelector('#talks-search');
  if (!input) return;

  const talks = Array.from(document.querySelectorAll('.talk'));
  const count = document.querySelector('[data-talks-count]');
  const total = talks.length;

  const apply = () => {
    const query = input.value.trim().toLowerCase();
    let visible = 0;

    talks.forEach((talk) => {
      const matches = !query || (talk.dataset.search || '').includes(query);
      talk.hidden = !matches;
      if (matches) visible += 1;
    });

    if (count) {
      count.textContent =
        visible === total
          ? `${total} charlas`
          : `${visible} de ${total} charlas`;
    }
  };

  input.addEventListener('input', apply);
  apply();
});
