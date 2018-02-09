import config from './config';
import Auth0Provider from "./auth/Auth0Provider";
import logger from "./logger";

const authProvider = new Auth0Provider(config.authConfig, logger);
export default authProvider;