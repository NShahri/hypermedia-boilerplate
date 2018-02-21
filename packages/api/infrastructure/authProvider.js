import jwt from 'express-jwt';
import jwks from 'jwks-rsa';
import config from "./config";
import {UnauthorizedError} from 'restify-errors';

const authProvider = (req, res, next) => {

    /**
     * Translating UnauthorizedError to Restify.UnauthorizedError
     * otherwise the default response status code would be 500
     */
    const newNext = (data) => {
        data && data.name === 'UnauthorizedError' ? next(new UnauthorizedError(data)) : next(data);
    };

    jwt({
        secret: jwks.expressJwtSecret({
            cache: true,
            rateLimit: true,
            jwksRequestsPerMinute: 5,
            jwksUri: config.authConfig.jwksUri
        }),
        audience: config.authConfig.audience,
        issuer: config.authConfig.issuer,
        algorithms: ['RS256']
    })(req, res, newNext);
};

export default authProvider;