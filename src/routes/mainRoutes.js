const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');

// Her bir HTML dosyası için route'lar
router.get('/login', mainController.getIndex);
router.get('/404', mainController.get404);
router.get('/blank', mainController.getBlank);
// Diğer sayfaların route'larını da buraya ekleyebilirsiniz
router.get('/chart', (req, res) => {
    chartController.getChartDataFromDB((error, data) => {
        if (error) {
            res.status(500).json({ error: 'Error fetching data' });
            return;
        }
        res.status(200).json(data);
    });
});

module.exports = router;
