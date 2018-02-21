let serverBaseUrl = 'http://localhost:8080/';

export default {
    appName: 'hypermedia-api',
    appVersion: '0.0.0',

    logLevel: 'trace',

    serverPort: 8080,
    serverBaseUrl: serverBaseUrl,

    authConfig: {
        issuer: 'https://hypermedia-boilerplate.auth0.com/',
        audience: serverBaseUrl,
        jwksUri: 'https://hypermedia-boilerplate.auth0.com/.well-known/jwks.json'
    },

    allowedOrigin: ['http://localhost:3000'],

    isProduction: process.env.NODE_ENV === 'production'
}