import config from "../infrastructure/config";

export default function handlerConnector(handler) {
    return function (req, res, next) {
        try {
            handler.call(this, req, res, next, this);
        }
        catch (e) {
            next(new InternalError(config.isProduction ? 'Unexpected error.' : e));
        }
    };
}