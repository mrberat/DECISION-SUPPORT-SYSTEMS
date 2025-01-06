// chartController.js

const db = require('../db'); // Veritabanı bağlantısı

const chartController = {
    getChartDataFromDB: (callback) => {
        db.query(`SELECT ulkeler.ulke_ad, ulkeler.sayi
        from ulkeler;`, (error, results, fields) => {
            if (error) {
                console.error('Error fetching data:', error);
                callback(error, null);
                return;
            }
            // Verileri başarıyla aldıktan sonra geri döndürme
            callback(null, results);
            console.log('veri döndü')
        });
    },
};

module.exports = chartController;
