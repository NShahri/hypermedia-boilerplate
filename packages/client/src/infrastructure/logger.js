import bunyan from 'bunyan';
import config from './config';

const logger = bunyan.createLogger({
    name: config.appName,
    level: config.logLevel
});

export default logger;