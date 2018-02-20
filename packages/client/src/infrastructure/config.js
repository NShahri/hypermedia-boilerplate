const isProduction = process.env.NODE_ENV === 'production';

export default {
    appName: 'hypermedia-client',
    appVersion: '0.0.0',

    logLevel: 'trace',

    authConfig: {
        domain: process.env.REACT_APP_AUTH_DOMAIN,
        clientID: process.env.REACT_APP_AUTH_CLIENT_ID,
        redirectUri: process.env.REACT_APP_AUTH_CALLBACK,
        audience: process.env.REACT_APP_API_URL,
        responseType: 'token id_token',

        //
        // Usage of scope 'openid profile' is not recommended. See https://auth0.com/docs/scopes for more details.
        //
        scope: 'openid'
    },

    isProduction: isProduction,

    getApiUrlFromPage() {
        return document
            .querySelectorAll('link[rel=api]')[0]
            .href;

    }
}