CREATE TABLE IF NOT EXISTS usuarios (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre TEXT NOT NULL,
  usuario TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  rol TEXT NOT NULL DEFAULT 'user',
  creado_en TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT OR IGNORE INTO usuarios (nombre, usuario, password, rol)
VALUES ('Administrador', 'admin', 'admin123', 'admin');

INSERT OR IGNORE INTO usuarios (nombre, usuario, password, rol)
VALUES ('Usuario Normal', 'user', 'user123', 'user');
