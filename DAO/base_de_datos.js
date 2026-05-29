const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./DAO/BD.bd', (err) => {
    if (err) {
        console.error('Error DB:', err.message);
    } else {
        console.log('Conectado a SQLite');
    }
});

module.exports = db;