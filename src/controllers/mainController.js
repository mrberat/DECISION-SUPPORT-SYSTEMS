const path = require('path');

const mainController = {
    getIndex: (req, res) => {
        res.sendFile(path.join(__dirname, '../../public/index.html'));
    },
    get404: (req, res) => {
        res.sendFile(path.join(__dirname, '../../public/404.html'));
    },
    getBlank: (req, res) => {
        res.sendFile(path.join(__dirname, '../../public/blank.html'));
    },
    // Diğer sayfa işlevlerini buraya ekleyebilirsiniz
};

module.exports = mainController;
