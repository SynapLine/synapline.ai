(() => {
  const root = document.documentElement;
  root.classList.add("js");

  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".nav-toggle");

  // Solid header once the page scrolls (or always on pages without a hero image).
  const alwaysSolid = header.hasAttribute("data-solid");
  const onScroll = () => header.classList.toggle("is-solid", alwaysSolid || window.scrollY > 24);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // Mobile navigation.
  const setOpen = (open) => {
    header.classList.toggle("is-open", open);
    document.body.classList.toggle("nav-locked", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  };
  toggle.addEventListener("click", () => setOpen(!header.classList.contains("is-open")));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") setOpen(false); });
  window.matchMedia("(min-width: 1021px)").addEventListener("change", (e) => { if (e.matches) setOpen(false); });

  // Reveal on scroll.
  const items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("is-in"));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-in");
        io.unobserve(entry.target);
      }
    });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
  items.forEach((el) => {
    // Anything already on screen at load is shown immediately; only content below the fold animates.
    if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add("is-in");
    else io.observe(el);
  });
})();
