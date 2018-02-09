export default {
    appName: 'hypermedia-client',
    logLevel: 'trace',

    authConfig: {
        domain: 'hypermedia-boilerplate.auth0.com',
        clientID: 'oGiNJNM0y4w9JF-qT2caBaKyjo4mG3E_',
        redirectUri: 'http://localhost:3000/callback',
        audience: 'https://hypermedia-boilerplate.auth0.com/userinfo',
        responseType: 'token id_token',
        scope: 'openid'
    },

    isProduction: process.env.NODE_ENV === 'production'
}