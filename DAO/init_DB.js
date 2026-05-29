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

  await migrarTablaUsuarios();
  await insertarUsuariosIniciales();
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

export default initDB;
