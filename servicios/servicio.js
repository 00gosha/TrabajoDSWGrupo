import bcrypt from 'bcryptjs';
import { get, run } from '../DAO/base_de_datos.js';

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
