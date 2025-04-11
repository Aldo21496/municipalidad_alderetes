// Script para abrir/cerrar el menú en móvil y tablets

const menuToggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".menu");
const submenus = document.querySelectorAll(".has-submenu");

menuToggle.addEventListener("click", () => {
  menu.classList.toggle("show");
});

// Cerrar submenús si ya están abiertos y se vuelve a hacer clic
submenus.forEach((item) => {
  item.addEventListener("click", (e) => {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      item.classList.toggle("open");
    }
  });
});

// Cerrar menú al hacer clic en una opción (solo en móvil)
menu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    if (window.innerWidth <= 768) {
      menu.classList.remove("show");
    }
  });
});
