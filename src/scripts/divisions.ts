// Highlights the orbit that matches the division panel in the middle of the viewport.
const root = document.querySelector<HTMLElement>("[data-divisions]");

if (root) {
  const orbits = root.querySelectorAll<SVGGElement>("[data-orbit]");
  const panels = root.querySelectorAll<HTMLElement>("[data-panel]");

  const setActive = (id: string) => {
    orbits.forEach((orbit) => orbit.classList.toggle("is-active", orbit.dataset.orbit === id));
    panels.forEach((panel) => panel.classList.toggle("is-active", panel.dataset.panel === id));
  };

  if (panels[0]?.dataset.panel) setActive(panels[0].dataset.panel);

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const id = (entry.target as HTMLElement).dataset.panel;
        if (entry.isIntersecting && id) setActive(id);
      }
    },
    { rootMargin: "-45% 0px -45% 0px" },
  );

  panels.forEach((panel) => observer.observe(panel));
}
