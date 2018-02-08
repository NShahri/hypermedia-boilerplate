import jwt from 'express-jwt';
import jwks from 'jwks-rsa';
import config from "./config";

const authProvider = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: "https://hypermedia-boilerplate.auth0.com/.well-known/jwks.json"
    }),
    audience: config.serverBaseUrl,
    issuer: "https://hypermedia-boilerplate.auth0.com/",
    algorithms: ['RS256']
});

export default authProvider;