const db = require('./base_de_datos');
const bcrypt = require('bcrypt');

function initDB() {
    db.run(`
    CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT,
        usuario TEXT UNIQUE,
        password TEXT,
        rol TEXT
    )
    `, (err) => {
        if (err) console.error(err.message);

        insertarUsuarios();
    });
}

function insertarUsuarios() {
    const adminPass = bcrypt.hashSync('admin123', 10);
    const userPass = bcrypt.hashSync('user123', 10);

    const sql = `
    
        INSERT OR IGNORE INTO usuarios (nombre, usuario, password, rol)
        VALUES (?, ?, ?, ?)
    `;

    db.run(sql, ['Administrador', 'admin', adminPass, 'admin']);
    db.run(sql, ['Usuario Normal', 'user', userPass, 'user']);

    console.log('Usuarios iniciales listos.');
}

module.exports = initDB;