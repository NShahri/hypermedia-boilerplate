import bunyan from 'bunyan';
import config from './config';

const logger = bunyan.createLogger({
    name: config.appName,
    serializers: bunyan.stdSerializers,
    streams: [
        {
            /**
             * @see https://github.com/trentm/node-bunyan#levels
             */
            level: config.logLevel,
            stream: process.stdout
        }]
});

export default logger;