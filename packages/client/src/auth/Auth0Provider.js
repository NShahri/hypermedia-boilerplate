import auth0 from 'auth0-js';

class Auth0Provider {
    /**
     * @constructor
     * @param config
     */
    constructor(config) {
        this.config = config;
    }

    /**
     * @private
     * @type {{}}
     */
    authInfo = {
        accessToken: null,
        idToken: null,
        expiresAt: null
    }

    auth0 = null;

    /**
     * @private
     */
    getAuth0() {
        if (!this.auth0) {
            this.auth0 = new auth0.WebAuth(this.config);
        }

        return this.auth0;
    }

    /**
     * @private
     * @param authResult
     */
    setSession(authResult) {
        this.authInfo = {
            ...this.authInfo,
            accessToken: authResult.accessToken,
            idToken: authResult.idToken,
            expiresAt: authResult.expiresIn * 1000 + new Date().getTime()
        };
    }

    /**
     * @private
     * @param err
     * @param authResult
     */
    parseSession(err, authResult) {
        if (authResult && authResult.accessToken && authResult.idToken) {
            this.setSession(authResult);
            return true;
        } else {
            return false;
        }
    }

    login() {
        this.getAuth0().authorize();
    }

    logout() {
        this.authInfo = {
            ...this.authInfo,
            accessToken: null,
            idToken: null,
            expiresAt: null
        };
    }

    refresh() {
        return new Promise((fulfill, reject) => {
            this.getAuth0().checkSession({}, (err, authResult) => {
                this.parseSession(err, authResult) ? fulfill() : reject(err);
            });
        });
    }

    isAuthenticated() {
        console.log('get session', this.authInfo);
        return this.authInfo.expiresAt ? new Date().getTime() < this.authInfo.expiresAt : false;
    }

    signInRedirectCallback() {
        return new Promise((fulfill, reject) => {
            this.getAuth0().parseHash((err, authResult) => {
                this.parseSession(err, authResult) ? fulfill() : reject(err);
            });
        });
    }
}

export default Auth0Provider;