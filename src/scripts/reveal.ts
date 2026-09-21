// Fades [data-reveal] blocks in as they reach the viewport.
// Content stays visible if this script never runs (see global.css).
const targets = document.querySelectorAll<HTMLElement>("[data-reveal]");

if ("IntersectionObserver" in window && targets.length) {
  document.documentElement.classList.add("reveal-ready");

  const pending = new Set(targets);

  const reveal = (el: HTMLElement) => {
    el.classList.add("is-in");
    pending.delete(el);
    observer.unobserve(el);
    if (!pending.size) window.removeEventListener("scroll", onScroll);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        // Also reveal anything already scrolled past (restored scroll position, deep links)
        if (entry.isIntersecting || entry.boundingClientRect.top < 0) reveal(entry.target as HTMLElement);
      }
    },
    { rootMargin: "0px 0px -10% 0px" },
  );

  // Safety net: a fast jump can skip an element between two rendered frames,
  // so on scroll reveal everything that is already above the fold line.
  let queued = false;
  const sweep = () => {
    queued = false;
    const line = window.innerHeight * 0.9;
    for (const el of pending) {
      if (el.getBoundingClientRect().top < line) reveal(el);
    }
  };
  const onScroll = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(sweep);
  };

  targets.forEach((el) => observer.observe(el));
  window.addEventListener("scroll", onScroll, { passive: true });
}
