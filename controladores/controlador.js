import { autenticarUsuario, crearUsuario } from '../servicios/servicio.js';

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
