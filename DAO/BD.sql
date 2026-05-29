PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS usuarios (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre TEXT NOT NULL,
  usuario TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  rol TEXT NOT NULL DEFAULT 'user',
  creado_en TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS hilos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  titulo TEXT NOT NULL,
  categoria TEXT NOT NULL,
  descripcion TEXT NOT NULL,
  fuente TEXT,
  media_url TEXT,
  media_type TEXT,
  autor TEXT NOT NULL DEFAULT 'Anonimo',
  comentarios INTEGER NOT NULL DEFAULT 0,
  miniatura TEXT NOT NULL DEFAULT 'UAP',
  creado_en TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_usuarios_usuario ON usuarios(usuario);
CREATE INDEX IF NOT EXISTS idx_hilos_categoria ON hilos(categoria);
CREATE INDEX IF NOT EXISTS idx_hilos_creado_en ON hilos(creado_en);

INSERT OR IGNORE INTO usuarios (nombre, usuario, password, rol)
VALUES
  (
    'Administrador',
    'admin',
    '$2b$10$XGz5BT9JvKYpcYggAY3hje.vgj13g7qbuUUOr9naxXdG2jJH.t5Hq',
    'admin'
  ),
  (
    'Usuario Normal',
    'user',
    '$2b$10$ZqUpUImnW1O7BZQkp1k3aeVTNKZYgwqnBY4573a9X5n/jnvJ1LDsO',
    'user'
  );

INSERT INTO hilos (titulo, categoria, descripcion, fuente, media_url, media_type, autor, comentarios, miniatura)
SELECT
  'Analisis de un nuevo clip UAP liberado',
  'Videos oficiales',
  'Revision de vectores de movimiento, brillo y posibles artefactos de sensor en un clip publico reciente.',
  NULL,
  NULL,
  NULL,
  'Sistema',
  184,
  'AARO-VID'
WHERE NOT EXISTS (
  SELECT 1 FROM hilos WHERE titulo = 'Analisis de un nuevo clip UAP liberado'
);

INSERT INTO hilos (titulo, categoria, descripcion, fuente, media_url, media_type, autor, comentarios, miniatura)
SELECT
  'Comparacion de imagenes oficiales de distintas fuentes',
  'Archivo de imagenes',
  'Notas lado a lado sobre contraste, compresion y firmas visuales en multiples publicaciones oficiales.',
  NULL,
  NULL,
  NULL,
  'Sistema',
  97,
  'IMG-SET'
WHERE NOT EXISTS (
  SELECT 1 FROM hilos WHERE titulo = 'Comparacion de imagenes oficiales de distintas fuentes'
);

INSERT INTO hilos (titulo, categoria, descripcion, fuente, media_url, media_type, autor, comentarios, miniatura)
SELECT
  'Posible patron en publicaciones recientes del gobierno',
  'Teorias y debate',
  'Discusion enfocada en lineas de tiempo, ritmo de publicaciones, censuras y terminos recurrentes.',
  NULL,
  NULL,
  NULL,
  'Sistema',
  231,
  'PATRON'
WHERE NOT EXISTS (
  SELECT 1 FROM hilos WHERE titulo = 'Posible patron en publicaciones recientes del gobierno'
);

INSERT INTO hilos (titulo, categoria, descripcion, fuente, media_url, media_type, autor, comentarios, miniatura)
SELECT
  'Debate: caracteristicas visuales de discos metalicos',
  'Casos historicos',
  'Catalogo de descripciones recurrentes de objetos reflectantes con forma de disco y comparacion con fenomenos conocidos.',
  NULL,
  NULL,
  NULL,
  'Sistema',
  142,
  'DISCO'
WHERE NOT EXISTS (
  SELECT 1 FROM hilos WHERE titulo = 'Debate: caracteristicas visuales de discos metalicos'
);
