import bcrypt from 'bcryptjs';
import { all, run } from './base_de_datos.js';

async function initDB() {
  await run(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      usuario TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      rol TEXT NOT NULL DEFAULT 'user',
      creado_en TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await run(`
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
    )
  `);

  await migrarTablaUsuarios();
  await migrarTablaHilos();
  await insertarUsuariosIniciales();
  await insertarHilosIniciales();
}

async function migrarTablaUsuarios() {
  const columnas = await all('PRAGMA table_info(usuarios)');
  const nombresColumnas = columnas.map((columna) => columna.name);

  if (!nombresColumnas.includes('usuario')) {
    await run('ALTER TABLE usuarios ADD COLUMN usuario TEXT');
  }

  if (!nombresColumnas.includes('password')) {
    await run('ALTER TABLE usuarios ADD COLUMN password TEXT');
  }

  if (!nombresColumnas.includes('rol')) {
    await run("ALTER TABLE usuarios ADD COLUMN rol TEXT DEFAULT 'user'");
  }

  if (!nombresColumnas.includes('creado_en')) {
    await run('ALTER TABLE usuarios ADD COLUMN creado_en TEXT');
  }

  const passwordTemporal = await bcrypt.hash('cambiar123', 10);

  await run(`
    UPDATE usuarios
    SET usuario = lower(replace(coalesce(nombre, 'usuario'), ' ', '_')) || '_' || id
    WHERE usuario IS NULL OR trim(usuario) = ''
  `);
  await run("UPDATE usuarios SET password = ? WHERE password IS NULL OR trim(password) = ''", [
    passwordTemporal,
  ]);
  await run("UPDATE usuarios SET rol = 'user' WHERE rol IS NULL OR trim(rol) = ''");
  await run(
    "UPDATE usuarios SET creado_en = CURRENT_TIMESTAMP WHERE creado_en IS NULL OR trim(creado_en) = ''",
  );
  await run('CREATE UNIQUE INDEX IF NOT EXISTS idx_usuarios_usuario ON usuarios(usuario)');
}

async function insertarUsuariosIniciales() {
  const adminPass = await bcrypt.hash('admin123', 10);
  const userPass = await bcrypt.hash('user123', 10);

  const sql = `
    INSERT OR IGNORE INTO usuarios (nombre, usuario, password, rol)
    VALUES (?, ?, ?, ?)
  `;

  await run(sql, ['Administrador', 'admin', adminPass, 'admin']);
  await run(sql, ['Usuario Normal', 'user', userPass, 'user']);

  console.log('Usuarios iniciales listos.');
}

async function migrarTablaHilos() {
  const columnas = await all('PRAGMA table_info(hilos)');
  const nombresColumnas = columnas.map((columna) => columna.name);

  if (!nombresColumnas.includes('media_url')) {
    await run('ALTER TABLE hilos ADD COLUMN media_url TEXT');
  }

  if (!nombresColumnas.includes('media_type')) {
    await run('ALTER TABLE hilos ADD COLUMN media_type TEXT');
  }
}

async function insertarHilosIniciales() {
  const hilos = [
    {
      titulo: 'Analisis de un nuevo clip UAP liberado',
      categoria: 'Videos oficiales',
      descripcion:
        'Revision de vectores de movimiento, brillo y posibles artefactos de sensor en un clip publico reciente.',
      comentarios: 184,
      miniatura: 'AARO-VID',
    },
    {
      titulo: 'Comparacion de imagenes oficiales de distintas fuentes',
      categoria: 'Archivo de imagenes',
      descripcion:
        'Notas lado a lado sobre contraste, compresion y firmas visuales en multiples publicaciones oficiales.',
      comentarios: 97,
      miniatura: 'IMG-SET',
    },
    {
      titulo: 'Posible patron en publicaciones recientes del gobierno',
      categoria: 'Teorias y debate',
      descripcion:
        'Discusion enfocada en lineas de tiempo, ritmo de publicaciones, censuras y terminos recurrentes.',
      comentarios: 231,
      miniatura: 'PATRON',
    },
    {
      titulo: 'Debate: caracteristicas visuales de discos metalicos',
      categoria: 'Casos historicos',
      descripcion:
        'Catalogo de descripciones recurrentes de objetos reflectantes con forma de disco y comparacion con fenomenos conocidos.',
      comentarios: 142,
      miniatura: 'DISCO',
    },
  ];

  const sql = `
    INSERT INTO hilos (titulo, categoria, descripcion, comentarios, miniatura, autor)
    SELECT ?, ?, ?, ?, ?, 'Sistema'
    WHERE NOT EXISTS (SELECT 1 FROM hilos WHERE titulo = ?)
  `;

  for (const hilo of hilos) {
    await run(sql, [
      hilo.titulo,
      hilo.categoria,
      hilo.descripcion,
      hilo.comentarios,
      hilo.miniatura,
      hilo.titulo,
    ]);
  }

  console.log('Hilos iniciales listos.');
}

export default initDB;
