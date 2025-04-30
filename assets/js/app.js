// =============================
// MENÚ HAMBURGUESA Y SUBMENÚS
// =============================
const menuToggle = document.querySelector(".menu-toggle");
const closeMenuBtn = document.querySelector(".close-menu");
const menu = document.querySelector(".menu");
const submenus = document.querySelectorAll(".has-submenu");

menuToggle.addEventListener("click", () => {
  menu.classList.toggle("show");
});

if (closeMenuBtn) {
  closeMenuBtn.addEventListener("click", () => {
    menu.classList.remove("show");
  });
}

function cerrarTodosLosSubmenus() {
  submenus.forEach((submenu) => submenu.classList.remove("open"));
}

submenus.forEach((item) => {
  const enlace = item.querySelector("a");
  enlace.addEventListener("click", (e) => {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      const submenu = item.querySelector(".submenu");
      const yaAbierto = item.classList.contains("open");
      cerrarTodosLosSubmenus();
      if (!yaAbierto) {
        item.classList.add("open");
        submenu.style.display = "block";
        submenu.style.maxHeight = submenu.scrollHeight + "px";
      } else {
        submenu.style.display = "none";
        submenu.style.maxHeight = null;
      }
    }
  });
});

menu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    if (window.innerWidth <= 768 && !link.closest(".has-submenu")) {
      menu.classList.remove("show");
    }
  });
});

// =============================
// LEER MÁS / LEER MENOS
// =============================
document.querySelectorAll(".leer-mas").forEach((btn) => {
  btn.addEventListener("click", () => {
    const noticia = btn.closest(".noticia");
    noticia.classList.toggle("expanded");
    btn.textContent = noticia.classList.contains("expanded")
      ? "Leer menos..."
      : "Leer más...";
  });
});

// =============================
// FILTRO Y PAGINACIÓN
// =============================
const noticias = Array.from(document.querySelectorAll(".noticia"));
const filtro = document.getElementById("filtro-categoria");
const paginacion = document.getElementById("paginacion");

let categoriaActual = "todas";
let paginaActual = 1;
const noticiasPorPagina = 4;

function filtrarNoticias() {
  const filtradas = categoriaActual === "todas"
    ? noticias
    : noticias.filter(noticia => noticia.dataset.categoria === categoriaActual);

  mostrarNoticiasPaginadas(filtradas);
  crearBotonesPaginacion(filtradas);
}

function mostrarNoticiasPaginadas(lista) {
  noticias.forEach(n => n.style.display = "none");
  const inicio = (paginaActual - 1) * noticiasPorPagina;
  const fin = inicio + noticiasPorPagina;
  lista.slice(inicio, fin).forEach(n => n.style.display = "block");
}

function crearBotonesPaginacion(lista) {
  paginacion.innerHTML = "";
  const totalPaginas = Math.ceil(lista.length / noticiasPorPagina);

  for (let i = 1; i <= totalPaginas; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    btn.classList.toggle("activo", i === paginaActual);
    btn.addEventListener("click", () => {
      paginaActual = i;
      mostrarNoticiasPaginadas(lista);
      crearBotonesPaginacion(lista);
    });
    paginacion.appendChild(btn);
  }
}

if (filtro) {
  filtro.addEventListener("change", () => {
    categoriaActual = filtro.value;
    paginaActual = 1;
    filtrarNoticias();
  });
  filtrarNoticias();
}

// =============================
// ACTIVAR MANUALMENTE CLASE ACTIVE AL HACER CLIC
// =============================
const links = document.querySelectorAll(".menu a");

links.forEach(link => {
  link.addEventListener("click", () => {
    links.forEach(l => l.classList.remove("active"));
    link.classList.add("active");
  });
});

// =============================
// RESALTAR CON SCROLL SI CORRESPONDE
// =============================
const secciones = document.querySelectorAll("main section[id]");

window.addEventListener("scroll", () => {
  let current = "";

  secciones.forEach(section => {
    if (window.scrollY >= section.offsetTop - 100) {
      current = section.getAttribute("id");
    }
  });

  links.forEach(link => {
    link.addEventListener("click", () => {
      // Quitar 'active' de TODOS los enlaces del menú (incluidos los del submenu)
      document.querySelectorAll(".menu a").forEach(el => el.classList.remove("active"));
  
      // Marcar como activo el que fue clickeado
      link.classList.add("active");
    });
  });




  // Mostrar u ocultar botón volver arriba
  const btn = document.getElementById("btn-volver-arriba");
  if (window.scrollY > 400) {
    btn.classList.add("visible");
  } else {
    btn.classList.remove("visible");
  }
});

// =============================
// BOTÓN VOLVER ARRIBA
// =============================
const btnVolverArriba = document.getElementById("btn-volver-arriba");

if (btnVolverArriba) {
  btnVolverArriba.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// =============================
// ANIMACIÓN DE ENTRADA A NOTICIAS
// =============================
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, {
  threshold: 0.1
});

noticias.forEach(noticia => observer.observe(noticia));
