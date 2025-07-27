// Obtenemos parámetros de la URL (manga y capítulo)
const params = new URLSearchParams(window.location.search);
const mangaId = parseInt(params.get('manga'));
let capitulo = parseInt(params.get('cap'));

// Información básica de los mangas (nombre y número de capítulos)
const mangas = {
  1: { titulo: "One Piece", carpeta: "onepiece", capitulos: 20 },
  2: { titulo: "Naruto", carpeta: "naruto", capitulos: 20 },
  3: { titulo: "Bleach", carpeta: "bleach", capitulos: 20 }
};

// Función para obtener imágenes del capítulo desde la carpeta /cap/
function getImagenes(mangaId, capitulo) {
  let imagenes = [];
  let carpeta = mangas[mangaId].carpeta;

  // Número de imágenes por capítulo (puedes cambiar este valor)
  const paginasPorCapitulo = 5;

  // Generamos la lista de rutas
  for (let i = 1; i <= paginasPorCapitulo; i++) {
    imagenes.push(`cap/${carpeta}/cap${capitulo}-${i}.jpg`);
  }

  return imagenes;
}

// Referencias a elementos del DOM
const titulo = document.getElementById('titulo-capitulo');
const imagenesDiv = document.getElementById('imagenes');

// Renderizar el capítulo actual
function renderCapitulo() {
  titulo.textContent = `${mangas[mangaId].titulo} - Capítulo ${capitulo}`;
  imagenesDiv.innerHTML = "";

  // Agregamos cada imagen al lector
  getImagenes(mangaId, capitulo).forEach(src => {
    const img = document.createElement('img');
    img.src = src;
    img.alt = `Página ${src}`;
    img.style.display = "block";
    img.style.margin = "20px auto";
    img.style.maxWidth = "90%";
    imagenesDiv.appendChild(img);
  });

  updateButtons();
}

// Actualizar botones (activar/desactivar)
function updateButtons() {
  document.getElementById('prev').disabled = capitulo === 1;
  document.getElementById('next').disabled = capitulo === mangas[mangaId].capitulos;
}

// Mostrar el capítulo inicial
renderCapitulo();

// Botón anterior
document.getElementById('prev').onclick = () => {
  if (capitulo > 1) {
    capitulo--;
    updateURL();
    renderCapitulo();
    window.scrollTo(0, 0);
  }
};

// Botón siguiente
document.getElementById('next').onclick = () => {
  if (capitulo < mangas[mangaId].capitulos) {
    capitulo++;
    updateURL();
    renderCapitulo();
    window.scrollTo(0, 0);
  }
};

// Actualizar la URL para mantener el estado
function updateURL() {
  history.pushState(null, "", `?manga=${mangaId}&cap=${capitulo}`);
}
