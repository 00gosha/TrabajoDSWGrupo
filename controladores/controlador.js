import {
  autenticarUsuario,
  crearHilo,
  crearUsuario,
  listarHilos,
  obtenerHiloPorId,
} from '../servicios/servicio.js';

function responderError(res, error) {
  const status = error.status || 500;
  const message = status === 500 ? 'Error interno del servidor.' : error.message;

  if (status === 500) {
    console.error(error);
  }

  res.status(status).json({ ok: false, message });
}

export async function registrar(req, res) {
  try {
    const usuario = await crearUsuario(req.body);

    res.status(201).json({
      ok: true,
      message: 'Usuario creado correctamente.',
      usuario,
    });
  } catch (error) {
    responderError(res, error);
  }
}

export async function login(req, res) {
  try {
    const usuario = await autenticarUsuario(req.body);

    res.json({
      ok: true,
      message: 'Login correcto.',
      usuario,
    });
  } catch (error) {
    responderError(res, error);
  }
}

export async function obtenerHilos(req, res) {
  try {
    const hilos = await listarHilos({ category: req.query.category });

    res.json({
      ok: true,
      hilos,
    });
  } catch (error) {
    responderError(res, error);
  }
}

export async function obtenerHilo(req, res) {
  try {
    const hilo = await obtenerHiloPorId(req.params.id);

    res.json({
      ok: true,
      hilo,
    });
  } catch (error) {
    responderError(res, error);
  }
}

export async function publicarHilo(req, res) {
  try {
    const file = req.file || req.files?.media?.[0] || req.files?.image?.[0];
    const mediaType = file?.mimetype.startsWith('video/') ? 'video' : file ? 'image' : null;
    const hilo = await crearHilo({
      ...req.body,
      mediaUrl: file ? `/uploads/${file.filename}` : null,
      mediaType,
    });

    res.status(201).json({
      ok: true,
      message: 'Hilo publicado correctamente.',
      hilo,
    });
  } catch (error) {
    responderError(res, error);
  }
}
