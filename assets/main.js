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

  // Video cards: each opens its own modal player; nothing is downloaded until the visitor clicks play.
  const small = window.matchMedia("(max-width: 900px)").matches || navigator.connection?.saveData;
  document.querySelectorAll("[data-video]").forEach((trigger) => {
    const dialog = document.getElementById(trigger.dataset.video);
    if (!dialog || typeof dialog.showModal !== "function") return; // falls back to opening the file
    const video = dialog.querySelector("video");
    trigger.addEventListener("click", (e) => {
      e.preventDefault();
      if (!video.getAttribute("src")) video.src = small ? video.dataset.srcSd : video.dataset.srcHd;
      dialog.showModal();
      video.play().catch(() => {});
    });
    dialog.querySelector(".video-close").addEventListener("click", () => dialog.close());
    dialog.addEventListener("click", (e) => { if (e.target === dialog) dialog.close(); }); // backdrop
    dialog.addEventListener("close", () => video.pause());
  });

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
