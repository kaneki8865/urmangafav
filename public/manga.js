const mangas = [
  { id: 1, titulo: "One Piece", genero: "Aventura", portada: "https://i.imgur.com/OPoZV9G.jpg", capitulos: 20 },
  { id: 2, titulo: "Naruto", genero: "Acción", portada: "https://i.imgur.com/t4VqStn.jpg", capitulos: 20 },
  { id: 3, titulo: "Attack on Titan", genero: "Acción", portada: "https://i.imgur.com/6ykTXmP.jpg", capitulos: 20 }
];

const params = new URLSearchParams(window.location.search);
const mangaId = parseInt(params.get('id'));
const manga = mangas.find(m => m.id === mangaId);

const mangaInfo = document.getElementById('manga-info');
const listaCapitulos = document.getElementById('lista-capitulos');

if (manga) {
  mangaInfo.innerHTML = `
    <img src="${manga.portada}" alt="${manga.titulo}">
    <h1>${manga.titulo}</h1>
    <p>Género: ${manga.genero}</p>
  `;
  for (let i = 1; i <= manga.capitulos; i++) {
    const li = document.createElement('li');
    li.innerHTML = `<a href="lector.html?manga=${mangaId}&cap=${i}">Capítulo ${i}</a>`;
    listaCapitulos.appendChild(li);
  }
}
