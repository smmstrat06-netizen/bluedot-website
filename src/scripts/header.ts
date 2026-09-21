const header = document.querySelector<HTMLElement>("[data-header]");
const menu = document.querySelector<HTMLElement>("[data-menu]");
const openBtn = document.querySelector<HTMLButtonElement>("[data-menu-open]");
const closeBtn = document.querySelector<HTMLButtonElement>("[data-menu-close]");

if (header) {
  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 16);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

if (menu && openBtn && closeBtn) {
  let closeTimer = 0;

  const focusable = () =>
    Array.from(menu.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"));

  const onKeydown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      event.preventDefault();
      closeMenu();
      return;
    }
    if (event.key !== "Tab") return;
    const items = focusable();
    const first = items[0];
    const last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  const openMenu = () => {
    window.clearTimeout(closeTimer);
    menu.hidden = false;
    void menu.offsetWidth; // commit the hidden → visible change before animating
    menu.classList.add("is-open");
    openBtn.setAttribute("aria-expanded", "true");
    document.documentElement.classList.add("menu-open");
    document.addEventListener("keydown", onKeydown);
    closeBtn.focus();
  };

  const closeMenu = (returnFocus = true) => {
    menu.classList.remove("is-open");
    openBtn.setAttribute("aria-expanded", "false");
    document.documentElement.classList.remove("menu-open");
    document.removeEventListener("keydown", onKeydown);
    closeTimer = window.setTimeout(() => (menu.hidden = true), 400);
    if (returnFocus) openBtn.focus();
  };

  openBtn.addEventListener("click", openMenu);
  closeBtn.addEventListener("click", () => closeMenu());
  menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => closeMenu(false)));

  window.matchMedia("(min-width: 48rem)").addEventListener("change", (event) => {
    if (event.matches && !menu.hidden) closeMenu(false);
  });
}
