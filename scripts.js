const bindModal = ({ buttonId, modalClass }) => {
  const modal = document.querySelector(modalClass);
  const button = document.querySelector(buttonId);
  if (!modal || !button) return;
  const close = modal.querySelector(".close");

  const toggle = () => modal.classList.toggle("active");
  button.addEventListener("click", () => modal.classList.add("active"));
  close?.addEventListener("click", toggle);
};

bindModal({ buttonId: "#open-problematic-modal", modalClass: ".problem-modal" });
bindModal({ buttonId: "#open-fixed-modal", modalClass: ".fixed-modal" });