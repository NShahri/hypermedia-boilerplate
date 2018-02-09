import config from './config';
import Auth0Provider from "./auth/Auth0Provider";

const authProvider = new Auth0Provider(config.authConfig);
export default authProvider;