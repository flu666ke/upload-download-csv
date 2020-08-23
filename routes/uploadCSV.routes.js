const UploadCSVController = require('../controller/uploadCSV.controller');

module.exports = (app) => {
    app.get('/', (req, res, next) =>
        UploadCSVController.selectCSVfile(req, res)
    );

    app.post('/', (req, res, next) =>
        UploadCSVController.uploadCSVfile(req, res)
    );

    app.get('/download-csv', (req, res, next) =>
        UploadCSVController.downloadCSVfile(req, res)
    );

    app.get('/clear-db', (req, res, next) =>
        UploadCSVController.deleteDataFromDB(req, res)
    );
};