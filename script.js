window.addEventListener("DOMContentLoaded", () => {
  // YEAR
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* =========================================================
     WhatsApp Direct Chat
     Put your WhatsApp number here: 91 + mobile (no +, no spaces)
     Example: 919893074862
  ========================================================= */
  const WA_NUMBER = "919893074862"; // <-- CHANGE THIS

  function openWhatsApp(message) {
    const text = encodeURIComponent(message || "Hi Courrier Point, I want to book a courier.");
    const url = `https://wa.me/${WA_NUMBER}?text=${text}`;
    window.open(url, "_blank", "noopener");
  }

  const waBtn1 = document.getElementById("whatsappBtn");
  const waBtn2 = document.getElementById("whatsappBtn2");
  const waBtn4 = document.getElementById("whatsappBtn4");

  if (waBtn1) waBtn1.addEventListener("click", () => openWhatsApp("Hi Courrier Point, I want courier booking details."));
  if (waBtn2) waBtn2.addEventListener("click", () => openWhatsApp("Hi Courrier Point, please share rates & process for booking."));
  if (waBtn4) waBtn4.addEventListener("click", () => openWhatsApp("Hi Courrier Point, I need help with courier booking."));

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
      path: "assets/loader.json",
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
  if (!window.gsap) {
    console.error("GSAP not loaded. Check CDN in index.html");
    return;
  }
  gsap.registerPlugin(ScrollTrigger);
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  /* ─────────────────────────────────────
     MOBILE MENU: ONLY for <= 920px
  ───────────────────────────────────── */
  const navToggle = document.getElementById("navToggle");
  const primaryNav = document.getElementById("primaryNav");
  const menuBackdrop = document.getElementById("menuBackdrop");

  let menuOpen = false;

  function isMobile() {
    return window.innerWidth <= 920;
  }

  function syncNavForViewport() {
    if (!primaryNav || !menuBackdrop || !navToggle) return;

    if (!isMobile()) {
      menuOpen = false;
      primaryNav.classList.remove("nav--open");
      navToggle.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");

      gsap.set(primaryNav, { clearProps: "all" });

      gsap.set(menuBackdrop, { autoAlpha: 0 });
      menuBackdrop.style.pointerEvents = "none";
    } else {
      menuOpen = false;
      primaryNav.classList.remove("nav--open");
      navToggle.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");

      gsap.set(menuBackdrop, { autoAlpha: 0 });
      menuBackdrop.style.pointerEvents = "none";
    }
  }

  function openMenu() {
    if (!isMobile()) return;
    if (!navToggle || !primaryNav || !menuBackdrop) return;
    if (menuOpen) return;
    menuOpen = true;

    primaryNav.classList.add("nav--open");
    navToggle.classList.add("is-open");
    navToggle.setAttribute("aria-expanded", "true");
    menuBackdrop.style.pointerEvents = "auto";

    const links = primaryNav.querySelectorAll("a");

    gsap.to(menuBackdrop, { autoAlpha: 1, duration: 0.18, ease: "power2.out" });

    gsap.fromTo(
      primaryNav,
      { autoAlpha: 0, y: -10, scale: 0.98, filter: "blur(6px)", transformOrigin: "top center" },
      { autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 0.28, ease: "back.out(1.6)" }
    );

    gsap.fromTo(
      links,
      { y: 8, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.22, ease: "power2.out", stagger: 0.04, delay: 0.05 }
    );
  }

  function closeMenu() {
    if (!isMobile()) return;
    if (!navToggle || !primaryNav || !menuBackdrop) return;
    if (!menuOpen) return;
    menuOpen = false;

    navToggle.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");

    gsap.to(menuBackdrop, {
      autoAlpha: 0,
      duration: 0.18,
      ease: "power2.in",
      onComplete: () => (menuBackdrop.style.pointerEvents = "none"),
    });

    gsap.to(primaryNav, {
      autoAlpha: 0,
      y: -10,
      scale: 0.98,
      filter: "blur(6px)",
      duration: 0.18,
      ease: "power2.in",
      onComplete: () => primaryNav.classList.remove("nav--open"),
    });
  }

  function toggleMenu() {
    if (!isMobile()) return;
    menuOpen ? closeMenu() : openMenu();
  }

  if (navToggle && primaryNav && menuBackdrop) {
    navToggle.addEventListener("click", (e) => {
      e.preventDefault();
      toggleMenu();
    });

    menuBackdrop.addEventListener("click", () => closeMenu());
    primaryNav.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => closeMenu()));

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeMenu();
    });

    window.addEventListener("resize", syncNavForViewport);
    syncNavForViewport();
  }

  /* ─────────────────────────────────────
     ACTIVE SECTION HIGHLIGHT (ScrollSpy)
  ───────────────────────────────────── */
  const navLinks = Array.from(document.querySelectorAll("#primaryNav a"));
  const items = navLinks
    .map((a) => {
      const href = a.getAttribute("href");
      if (!href || !href.startsWith("#")) return null;
      const sec = document.querySelector(href);
      if (!sec) return null;
      return { href, sec };
    })
    .filter(Boolean);

  function setActive(href) {
    navLinks.forEach((l) => l.classList.remove("is-active"));
    const active = navLinks.find((l) => l.getAttribute("href") === href);
    if (active) active.classList.add("is-active");
  }

  setActive("#home");

  items.forEach(({ href, sec }) => {
    ScrollTrigger.create({
      trigger: sec,
      start: "top 35%",
      end: "bottom 35%",
      onEnter: () => setActive(href),
      onEnterBack: () => setActive(href),
    });
  });

  /* ─────────────────────────────────────
     HERO intro + scroll animations
  ───────────────────────────────────── */
  const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
  heroTl
    .from(".hero__badge", { y: 18, opacity: 0, duration: 0.6 })
    .from("#home h1", { y: 28, opacity: 0, duration: 0.8 }, "-=0.15")
    .from("#home .lead", { y: 18, opacity: 0, duration: 0.7 }, "-=0.35")
    .from("#home .ctaRow .btn", { scale: 0.93, opacity: 0, stagger: 0.12, duration: 0.55, ease: "back.out(1.6)" }, "-=0.2")
    .from("#home .chips .chip", { y: 14, opacity: 0, stagger: 0.07, duration: 0.45 }, "-=0.25")
    .from("#home .infoCard", { y: 14, opacity: 0, duration: 0.6 }, "-=0.25")
    .from("#home .lottieCard", { y: 10, opacity: 0, duration: 0.6 }, "-=0.35");

  // Section headings
  gsap.utils.toArray(".sectionHead").forEach((head) => {
    const title = head.querySelector("h2");
    const sub = head.querySelector(".muted");
    if (title) gsap.from(title, { y: 18, opacity: 0, duration: 0.7, scrollTrigger: { trigger: head, start: "top 85%" } });
    if (sub) gsap.from(sub, { y: 12, opacity: 0, duration: 0.55, scrollTrigger: { trigger: head, start: "top 85%" } });
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
  gsap.from("#guidance .ribbonTitle", { y: 16, opacity: 0, duration: 0.7, scrollTrigger: { trigger: "#guidance", start: "top 82%" } });
  gsap.from("#guidance .contentBox", { y: 20, opacity: 0, duration: 0.9, scrollTrigger: { trigger: "#guidance .contentBox", start: "top 85%" } });
  gsap.from("#guidance .twoCol .contentMini", { y: 16, opacity: 0, stagger: 0.12, duration: 0.7, scrollTrigger: { trigger: "#guidance .twoCol", start: "top 85%" } });
  gsap.from("#guidance .calcBanner", { y: 14, opacity: 0, duration: 0.7, scrollTrigger: { trigger: "#guidance .calcBanner", start: "top 88%" } });

  // Track buttons
  const trackBtns = gsap.utils.toArray("#track .trackBtn");
  if (trackBtns.length) {
    gsap.from(trackBtns, { y: 16, opacity: 0, stagger: 0.08, duration: 0.6, scrollTrigger: { trigger: "#track .trackGrid", start: "top 85%" } });
  }

  // Fraud
  gsap.from("#fraud .contentBox", { y: 20, opacity: 0, duration: 0.9, scrollTrigger: { trigger: "#fraud .contentBox", start: "top 85%" } });
  gsap.utils.toArray("#fraud .contentBox ul li").forEach((li) => {
    gsap.from(li, { x: -10, opacity: 0, duration: 0.4, scrollTrigger: { trigger: li, start: "top 92%" } });
  });

  // Contact
  const contactItems = gsap.utils.toArray("#contact .contactItem");
  if (contactItems.length) {
    gsap.from(contactItems, { y: 16, opacity: 0, stagger: 0.1, duration: 0.7, scrollTrigger: { trigger: "#contact .contactGrid", start: "top 85%" } });
  }

  // Footer
  gsap.from(".footer", { y: 12, opacity: 0, duration: 0.7, scrollTrigger: { trigger: ".footer", start: "top 92%" } });

  // Parallax
  gsap.to("#home .lottieCard", {
    y: -18,
    ease: "none",
    scrollTrigger: { trigger: "#home", start: "top top", end: "bottom top", scrub: 0.6 },
  });

  /* =========================
     SIMPLE FAQ CHATBOT (No API)
  ========================= */
  const fab = document.getElementById("chatFab");
  const panel = document.getElementById("chatPanel");
  const close = document.getElementById("chatClose");
  const msgs = document.getElementById("chatMessages");
  const form = document.getElementById("chatForm");
  const input = document.getElementById("chatInput");

  if (fab && panel && close && msgs && form && input) {
    const data = {
      timing: "Timing: 10 AM to 7 PM (Sunday Closed).",
      address: "Address: Shop No.2 Pal Complex Near Bhanpuri Chowk Bhanpuri Raipur C.G.",
      tracking: "Tracking: Go to 'Track Your Shipment' section and click your courier company (TRACKON/DTDC/etc.).",
      cod: "COD Not Available.",
      international: "Yes, International booking support is available. Please WhatsApp/Call for rates & documents.",
    };

    function addMsg(text, who="bot"){
      const div = document.createElement("div");
      div.className = `msg msg--${who}`;
      div.textContent = text;
      msgs.appendChild(div);
      msgs.scrollTop = msgs.scrollHeight;
    }

    function openChat(){
      panel.classList.add("open");
      panel.setAttribute("aria-hidden","false");
      setTimeout(() => input.focus(), 50);
      if (msgs.childElementCount === 0) {
        addMsg("Hi! Welcome to Courrier Point. How can I help you?");
        addMsg("Quick options: timing, address, tracking, COD, international.");
      }
    }
    function closeChat(){
      panel.classList.remove("open");
      panel.setAttribute("aria-hidden","true");
    }

    fab.addEventListener("click", () => {
      panel.classList.contains("open") ? closeChat() : openChat();
    });
    close.addEventListener("click", closeChat);

    document.querySelectorAll(".chip--chat").forEach(btn=>{
      btn.addEventListener("click", () => {
        const key = btn.getAttribute("data-q");
        addMsg(btn.textContent, "user");
        addMsg(data[key] || "Please call us for details.", "bot");
      });
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const q = input.value.trim();
      if (!q) return;
      addMsg(q, "user");
      input.value = "";

      const text = q.toLowerCase();
      let ans =
        (text.includes("time") || text.includes("timing") || text.includes("open")) ? data.timing :
        (text.includes("address") || text.includes("location") || text.includes("where")) ? data.address :
        (text.includes("track") || text.includes("tracking")) ? data.tracking :
        (text.includes("cod")) ? data.cod :
        (text.includes("international") || text.includes("abroad")) ? data.international :
        "I can help with: timing, address, tracking, COD, international. Or WhatsApp us.";

      setTimeout(() => addMsg(ans, "bot"), 250);
    });
  }
});
