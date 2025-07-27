const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.static('public')); // Carpeta donde están los archivos HTML y recursos

// Endpoint para devolver imágenes de un capítulo
app.get('/api/manga/:mangaId/cap/:capitulo', (req, res) => {
  const { mangaId, capitulo } = req.params;

  // Configuración de mangas
  const mangas = {
    1: 'onepiece',
    2: 'naruto',
    3: 'bleach'
  };

  const carpeta = mangas[mangaId];
  if (!carpeta) {
    return res.status(404).json({ error: 'Manga no encontrado' });
  }

  // Directorio del manga
  const dir = path.join(__dirname, 'public', 'cap', carpeta);

  try {
    const files = fs.readdirSync(dir);

    // Filtrar solo imágenes que corresponden al capítulo
    const imagenes = files
      .filter(file => file.startsWith(`cap${capitulo}-`))
      .sort()
      .map(file => `/cap/${carpeta}/${file}`);

    if (imagenes.length === 0) {
      return res.status(404).json({ error: 'Capítulo vacío' });
    }

    res.json({ imagenes });
  } catch (error) {
    res.status(500).json({ error: 'Error al leer el capítulo' });
  }
});

// Arrancar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
