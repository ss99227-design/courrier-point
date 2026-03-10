window.addEventListener("DOMContentLoaded", () => {
  // YEAR
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // WhatsApp Modal
  const waModal = document.getElementById("waModal");
  const waClose = document.getElementById("waClose");
  ["whatsappBtn", "whatsappBtn2", "whatsappBtn4"].forEach((id) => {
    const btn = document.getElementById(id);
    if (btn) btn.addEventListener("click", () => waModal?.showModal());
  });
  waClose?.addEventListener("click", () => waModal?.close());

  // MOBILE NAV TOGGLE
  const navToggle = document.getElementById("navToggle");
  const primaryNav = document.getElementById("primaryNav");

  function closeMenu() {
    if (!primaryNav || !navToggle) return;
    primaryNav.classList.remove("nav--open");
    navToggle.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  }

  function toggleMenu() {
    if (!primaryNav || !navToggle) return;
    const open = primaryNav.classList.toggle("nav--open");
    navToggle.classList.toggle("is-open", open);
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
  }

  if (navToggle && primaryNav) {
    navToggle.addEventListener("click", toggleMenu);

    // click any link -> close menu
    primaryNav.querySelectorAll("a").forEach(a => a.addEventListener("click", closeMenu));

    // click outside -> close
    document.addEventListener("click", (e) => {
      const inside = primaryNav.contains(e.target) || navToggle.contains(e.target);
      if (!inside) closeMenu();
    });

    // ESC -> close
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeMenu();
    });
  }

  // LOTTIE (LOCAL loader.json)
  const lottieBox = document.getElementById("homeLottie");
  const fallback = document.getElementById("lottieFallback");
  if (lottieBox && window.lottie) {
    lottieBox.innerHTML = "";
    const anim = lottie.loadAnimation({
      container: lottieBox,
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: "assets/loader.json"
    });
    anim.addEventListener("DOMLoaded", () => {
      if (fallback) fallback.hidden = true;
    });
    anim.addEventListener("data_failed", () => {
      if (fallback) fallback.hidden = false;
      console.error("Lottie failed: assets/loader.json");
    });
  } else {
    if (fallback) fallback.hidden = false;
  }

  // GSAP
  if (!window.gsap) return;
  gsap.registerPlugin(ScrollTrigger);
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
  heroTl
    .from(".hero__badge", { y: 18, opacity: 0, duration: 0.6 })
    .from("#home h1", { y: 28, opacity: 0, duration: 0.8 }, "-=0.15")
    .from("#home .lead", { y: 18, opacity: 0, duration: 0.7 }, "-=0.35")
    .from("#home .ctaRow .btn", { scale: 0.93, opacity: 0, stagger: 0.12, duration: 0.55, ease: "back.out(1.6)" }, "-=0.2")
    .from("#home .chips .chip", { y: 14, opacity: 0, stagger: 0.07, duration: 0.45 }, "-=0.25")
    .from("#home .infoCard", { y: 14, opacity: 0, duration: 0.6 }, "-=0.25")
    .from("#home .lottieCard", { y: 10, opacity: 0, duration: 0.6 }, "-=0.35");

  // Headings
  gsap.utils.toArray(".sectionHead").forEach((head) => {
    const title = head.querySelector("h2");
    const sub = head.querySelector(".muted");

    if (title) gsap.from(title, {
      y: 18, opacity: 0, duration: 0.7,
      scrollTrigger: { trigger: head, start: "top 85%" },
    });

    if (sub) gsap.from(sub, {
      y: 12, opacity: 0, duration: 0.55,
      scrollTrigger: { trigger: head, start: "top 85%" },
    });
  });

  // Services cards
  const cards = gsap.utils.toArray("#services .card");
  if (cards.length) {
    gsap.from(cards, {
      y: 26,
      opacity: 0,
      rotateX: 10,
      transformOrigin: "center bottom",
      stagger: 0.12,
      duration: 0.9,
      ease: "back.out(1.4)",
      scrollTrigger: { trigger: "#services .cards", start: "top 80%" },
    });
  }

  // Guidance
  gsap.from("#guidance .ribbonTitle", {
    y: 16, opacity: 0, duration: 0.7,
    scrollTrigger: { trigger: "#guidance", start: "top 82%" },
  });
  gsap.from("#guidance .contentBox", {
    y: 20, opacity: 0, duration: 0.9,
    scrollTrigger: { trigger: "#guidance .contentBox", start: "top 85%" },
  });
  gsap.from("#guidance .twoCol .contentMini", {
    y: 16, opacity: 0, stagger: 0.12, duration: 0.7,
    scrollTrigger: { trigger: "#guidance .twoCol", start: "top 85%" },
  });
  gsap.from("#guidance .calcBanner", {
    y: 14, opacity: 0, duration: 0.7,
    scrollTrigger: { trigger: "#guidance .calcBanner", start: "top 88%" },
  });

  // Track buttons
  const trackBtns = gsap.utils.toArray("#track .trackBtn");
  if (trackBtns.length) {
    gsap.from(trackBtns, {
      y: 16, opacity: 0, stagger: 0.08, duration: 0.6,
      scrollTrigger: { trigger: "#track .trackGrid", start: "top 85%" },
    });
  }

  // Fraud
  gsap.from("#fraud .contentBox", {
    y: 20, opacity: 0, duration: 0.9,
    scrollTrigger: { trigger: "#fraud .contentBox", start: "top 85%" },
  });
  gsap.utils.toArray("#fraud .contentBox ul li").forEach((li) => {
    gsap.from(li, {
      x: -10, opacity: 0, duration: 0.4,
      scrollTrigger: { trigger: li, start: "top 92%" },
    });
  });

  // Contact items
  const contactItems = gsap.utils.toArray("#contact .contactItem");
  if (contactItems.length) {
    gsap.from(contactItems, {
      y: 16, opacity: 0, stagger: 0.1, duration: 0.7,
      scrollTrigger: { trigger: "#contact .contactGrid", start: "top 85%" },
    });
  }

  // Footer
  gsap.from(".footer", {
    y: 12, opacity: 0, duration: 0.7,
    scrollTrigger: { trigger: ".footer", start: "top 92%" },
  });

  // Parallax lottie card
  gsap.to("#home .lottieCard", {
    y: -18,
    ease: "none",
    scrollTrigger: {
      trigger: "#home",
      start: "top top",
      end: "bottom top",
      scrub: 0.6,
    },
  });
});
