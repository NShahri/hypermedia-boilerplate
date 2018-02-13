import setupRoutes from './routes';
import setupServer from './server';
import config from "./infrastructure/config";

const server = setupServer(config.serverPort, config.serverBaseUrl);
setupRoutes(server);
