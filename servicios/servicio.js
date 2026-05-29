import bcrypt from 'bcryptjs';
import { all, get, run } from '../DAO/base_de_datos.js';

function limpiarUsuario(usuario) {
  return {
    id: usuario.id,
    nombre: usuario.nombre,
    usuario: usuario.usuario,
    rol: usuario.rol,
  };
}

export async function crearUsuario({ nombre, usuario, password }) {
  const nombreLimpio = nombre?.trim();
  const usuarioLimpio = usuario?.trim().toLowerCase();

  if (!nombreLimpio || !usuarioLimpio || !password) {
    const error = new Error('Nombre, usuario y contrasena son obligatorios.');
    error.status = 400;
    throw error;
  }

  if (password.length < 6) {
    const error = new Error('La contrasena debe tener al menos 6 caracteres.');
    error.status = 400;
    throw error;
  }

  const usuarioExistente = await get('SELECT id FROM usuarios WHERE usuario = ?', [usuarioLimpio]);

  if (usuarioExistente) {
    const error = new Error('Ese usuario ya esta registrado.');
    error.status = 409;
    throw error;
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const result = await run(
    'INSERT INTO usuarios (nombre, usuario, password, rol) VALUES (?, ?, ?, ?)',
    [nombreLimpio, usuarioLimpio, passwordHash, 'user'],
  );

  return {
    id: result.id,
    nombre: nombreLimpio,
    usuario: usuarioLimpio,
    rol: 'user',
  };
}

export async function autenticarUsuario({ usuario, password }) {
  const usuarioLimpio = usuario?.trim().toLowerCase();

  if (!usuarioLimpio || !password) {
    const error = new Error('Usuario y contrasena son obligatorios.');
    error.status = 400;
    throw error;
  }

  const usuarioEncontrado = await get('SELECT * FROM usuarios WHERE usuario = ?', [usuarioLimpio]);

  if (!usuarioEncontrado) {
    const error = new Error('Usuario o contrasena incorrectos.');
    error.status = 401;
    throw error;
  }

  const passwordValida = await bcrypt.compare(password, usuarioEncontrado.password);

  if (!passwordValida) {
    const error = new Error('Usuario o contrasena incorrectos.');
    error.status = 401;
    throw error;
  }

  return limpiarUsuario(usuarioEncontrado);
}

function formatearFecha(creadoEn) {
  const fecha = new Date(creadoEn);
  const hoy = new Date();

  if (fecha.toDateString() === hoy.toDateString()) {
    return 'Hoy';
  }

  return fecha.toLocaleDateString('es-CL', {
    day: '2-digit',
    month: 'short',
  });
}

function limpiarHilo(hilo) {
  return {
    id: hilo.id,
    title: hilo.titulo,
    category: hilo.categoria,
    preview: hilo.descripcion,
    source: hilo.fuente,
    mediaUrl: hilo.media_url,
    mediaType: hilo.media_type,
    author: hilo.autor,
    comments: hilo.comentarios,
    thumbnail: hilo.miniatura,
    date: formatearFecha(hilo.creado_en),
  };
}

export async function listarHilos({ category } = {}) {
  const categoriaLimpia = category?.trim();
  const hilos = categoriaLimpia
    ? await all(
        `
          SELECT *
          FROM hilos
          WHERE categoria = ?
          ORDER BY datetime(creado_en) DESC, id DESC
        `,
        [categoriaLimpia],
      )
    : await all(`
        SELECT *
        FROM hilos
        ORDER BY datetime(creado_en) DESC, id DESC
      `);

  return hilos.map(limpiarHilo);
}

export async function obtenerHiloPorId(id) {
  const hilo = await get('SELECT * FROM hilos WHERE id = ?', [id]);

  if (!hilo) {
    const error = new Error('Hilo no encontrado.');
    error.status = 404;
    throw error;
  }

  return limpiarHilo(hilo);
}

export async function crearHilo({ title, category, description, source, author, mediaUrl, mediaType }) {
  const tituloLimpio = title?.trim();
  const categoriaLimpia = category?.trim();
  const descripcionLimpia = description?.trim();
  const fuenteLimpia = source?.trim() || null;
  const autorLimpio = author?.trim() || 'Anonimo';
  const mediaUrlLimpia = mediaUrl?.trim() || null;
  const mediaTypeLimpio = mediaType?.trim() || null;

  if (!tituloLimpio || !categoriaLimpia || !descripcionLimpia) {
    const error = new Error('Titulo, categoria y descripcion son obligatorios.');
    error.status = 400;
    throw error;
  }

  const miniatura = categoriaLimpia
    .split(' ')
    .map((palabra) => palabra[0])
    .join('')
    .slice(0, 4)
    .toUpperCase();

  const result = await run(
    `
      INSERT INTO hilos (titulo, categoria, descripcion, fuente, media_url, media_type, autor, miniatura)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      tituloLimpio,
      categoriaLimpia,
      descripcionLimpia,
      fuenteLimpia,
      mediaUrlLimpia,
      mediaTypeLimpio,
      autorLimpio,
      miniatura || 'UAP',
    ],
  );

  const hilo = await get('SELECT * FROM hilos WHERE id = ?', [result.id]);

  return limpiarHilo(hilo);
}
