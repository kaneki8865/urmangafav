const mangas = [
  { id: 1, titulo: "One Piece", genero: "Aventura", portada: "img/onepiece.jpg" },
  { id: 2, titulo: "Naruto", genero: "Acción", portada: "img/naruto.jpg" },
  { id: 3, titulo: "Attack on Titan", genero: "Acción", portada: "img/attackontitan.jpg" }
];

const mangaGrid = document.getElementById('manga-grid');
mangas.forEach(manga => {
  const card = document.createElement('a');
  card.href = `manga.html?id=${manga.id}`;
  card.classList.add('manga-card');
  card.innerHTML = `
    <img src="${manga.portada}" alt="${manga.titulo}">
    <h3>${manga.titulo}</h3>
    <p>${manga.genero}</p>
  `;
  mangaGrid.appendChild(card);
});

const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.querySelector('.nav-links');
menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});
