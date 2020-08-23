module.exports = class BaseController {

    sendSuccessResponse(res, data = {}) {
        return res.status(200).send(data);
    }

    sendForbidden(res, error) {
        return res.status(403).send(error);
    }

    sendNotFound(res, error = null) {
        return res.status(404).send(error);
    }
}

