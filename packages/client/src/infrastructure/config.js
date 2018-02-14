const isProduction = process.env.NODE_ENV === 'production';

export default {
    appName: 'hypermedia-client',
    logLevel: 'trace',

    authConfig: {
        domain: 'hypermedia-boilerplate.auth0.com',
        clientID: 'oGiNJNM0y4w9JF-qT2caBaKyjo4mG3E_',
        redirectUri: 'http://localhost:3000/callback',
        audience: 'http://localhost:8080/',
        responseType: 'token id_token',

        //
        // Usage of scope 'openid profile' is not recommended. See https://auth0.com/docs/scopes for more details.
        //
        scope: 'openid'
    },

    isProduction: isProduction
}