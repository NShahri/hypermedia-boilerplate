import auth0 from 'auth0-js';

class Auth0Provider {
    /**
     * @constructor
     * @param config
     * @param logger
     */
    constructor(config, logger) {
        this.config = config;
        this.logger = logger;
    }

    /**
     * @private
     * @type {?{}}
     */
    authInfo = null;

    auth0 = null;

    /**
     * @private
     */
    getAuthInfo(){
        const parseAuthInfo = authInfo => {
            try {
                if (authInfo) {
                    return JSON.parse(authInfo);
                }
            }
            catch (error) {
                this.logger.warn({
                    type: 'PARSE_AUTH_SESSION_ERROR',
                    authSession: authInfo,
                    error
                }, 'Can not parse saved auth session');
            }

            return {};
        };

        if(!this.authInfo){
            this.authInfo = parseAuthInfo(sessionStorage.authInfo);
        }

        return this.authInfo;
    }

    /**
     * @private
     * @param authResult
     */
    setAuthInfo(authResult) {
        if (authResult) {
            this.authInfo = {
                ...this.authInfo,
                accessToken: authResult.accessToken,
                idToken: authResult.idToken,
                expiresAt: authResult.expiresIn * 1000 + new Date().getTime()
            };

            this.logger.debug({
                type: 'NEW_AUTH_SESSION',
                idToken: this.authInfo.idToken,
                expiresAt: this.authInfo.expiresAt
            }, 'New auth session provided.');
        }
        else {
            this.authInfo = {};

            this.logger.debug({
                type: 'REMOVE_AUTH_SESSION'
            }, 'Auth session is deleted.');
        }

        sessionStorage.authInfo = JSON.stringify(this.authInfo);
    }

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
     */


    /**
     * @private
     * @param err
     * @param authResult
     */
    parseSession(err, authResult) {
        if (authResult && authResult.accessToken && authResult.idToken) {
            this.setAuthInfo(authResult);
            return true;
        } else {
            this.setAuthInfo(null);
            return false;
        }
    }

    login() {
        this.getAuth0().authorize();
    }

    logout() {
        this.setAuthInfo(null);
    }

    refresh() {
        return new Promise((fulfill, reject) => {
            this.getAuth0().checkSession({}, (err, authResult) => {
                this.parseSession(err, authResult) ? fulfill() : reject(err);
            });
        });
    }

    isAuthenticated() {
        const authInfo = this.getAuthInfo();

        return (authInfo && authInfo.expiresAt) ? new Date().getTime() < authInfo.expiresAt : false;
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