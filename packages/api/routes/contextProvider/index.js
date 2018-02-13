import config from "../../infrastructure/config";
import {InternalError} from 'restify-errors';

export default function contextConnector(handler) {
    return function (req, res, next) {
        try {
            handler.call(this, req, res, next, this);
        }
        catch (e) {
            next(new InternalError(config.isProduction ? 'Unexpected error.' : e));
        }
    };
}