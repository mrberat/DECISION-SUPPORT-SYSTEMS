const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost', // Veritabanı sunucu adresi
    user: 'root', // Veritabanı kullanıcı adı
    password: '', // Veritabanı şifresi
    database: 'kds_2' // Veritabanı adı
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Veritabanı bağlantısı başlatıldı!');
});

module.exports = connection;