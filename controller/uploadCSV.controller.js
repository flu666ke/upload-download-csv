const path = require('path')
const UploadCSVService = require('../services/uploadCSV.service');
const BaseController = require('../core/base-controller')
const {
    INVALID_EXTENSION,
    DELETE_SUCCESS
} = require('../core/response-templates')

class UploadCSVController extends BaseController {
    selectCSVfile(req, res) {
        res.sendFile(path.resolve('./index.html'));
    }

    async uploadCSVfile(req, res) {

        if (req.files && req.files.file.mimetype !== 'text/csv') {
            this.sendForbidden(res, { error: INVALID_EXTENSION });
        }

        try {
            const { name: CSVfile } = req.files.file;
            const users = await UploadCSVService.parseCSVfile(CSVfile, res);

            this.sendSuccessResponse(res, users);
        } catch (error) {
            this.sendForbidden(res, { error: error.message });
        }
    }

    async downloadCSVfile(req, res) {
        try {
            const CSVfile = await UploadCSVService.createCSVfile();

            res.header('Content-Type', 'text/csv');
            res.attachment('users.csv');
            res.send(CSVfile);
        } catch (error) {
            this.sendNotFound(res, { message: error.message });
        }
    }

    async deleteDataFromDB(req, res) {
        try {
            await UploadCSVService.deleteDataFromDB();

            this.sendSuccessResponse(res, { message: DELETE_SUCCESS });
        } catch (error) {
            this.sendForbidden(res, { error: error.message });
        }
    }
}

module.exports = new UploadCSVController();