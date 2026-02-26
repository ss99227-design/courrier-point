// Footer year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// WhatsApp QR Modal (ONLY QR)
const waModal = document.getElementById('waModal');
const waClose = document.getElementById('waClose');

function openWAModal() {
  if (!waModal) return;
  if (typeof waModal.showModal === "function") waModal.showModal();
  else waModal.setAttribute("open", "open");
}

function closeWAModal() {
  if (!waModal) return;
  if (typeof waModal.close === "function") waModal.close();
  else waModal.removeAttribute("open");
}

["whatsappBtn", "whatsappBtn2", "whatsappBtn4"].forEach((id) => {
  const el = document.getElementById(id);
  if (el) el.addEventListener("click", openWAModal);
});

if (waClose) waClose.addEventListener("click", closeWAModal);

// Close modal when clicking outside dialog
if (waModal) {
  waModal.addEventListener("click", (e) => {
    const rect = waModal.getBoundingClientRect();
    const inDialog =
      rect.top <= e.clientY && e.clientY <= rect.bottom &&
      rect.left <= e.clientX && e.clientX <= rect.right;
    if (!inDialog) closeWAModal();
  });
}

// HOME Right-side Lottie
const lottieUrl = "assets/loader.json";

function enableHomeLottie() {
  const target = document.getElementById("homeLottie");
  if (!target || !window.lottie || !lottieUrl) return;

  window.lottie.loadAnimation({
    container: target,
    renderer: "svg",
    loop: true,
    autoplay: true,
    path: lottieUrl
  });
}

enableHomeLottie();