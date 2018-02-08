import auth0Config from './auth0Config';
import Auth0Provider from "./Auth0Provider";

const authProvider = new Auth0Provider(auth0Config);
export default authProvider;