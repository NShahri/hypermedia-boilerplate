import restify from 'restify';
import logger from "../infrastructure/logger";
import {URL} from 'url';
import HypermediaUrl from "./HypermediaUrl";
import corsMiddleware from 'restify-cors-middleware';

function setupCors(server){
    const cors = corsMiddleware({
        preflightMaxAge: 600, // 10 minutes
        origins: ['http://localhost:3000'],
        //allowHeaders: ['API-Token'],
        //exposeHeaders: ['API-Token-Expiry']
    });

    server.pre(cors.preflight);
    server.use(cors.actual);
}

/**
 *
 * @param port {number}
 * @param baseUrl {URL}
 * @returns {http.Server}
 */
export default function setupServer(port, baseUrl) {
    const server = restify.createServer({
        log: logger
    });

    server.on('after', restify.plugins.auditLogger({
        log: logger,
        event: 'after',
        server: server,
        printLog: true
    }));

    logger.info({
            type: 'SERVER_STARTING',
            config: server.getDebugInfo()
        },
        'Server configuration');

    //
    // Setup req_id for each request
    // Usage of req.log, it will log the request with req_id
    // http://restify.com/docs/plugins-api/#requestlogger
    //
    server.use(restify.plugins.requestLogger());

    setupCors(server);

    server.listen(port, () => {
        logger.info({
            type: 'SERVER_STARTED',
            name: server.name,
            url: server.url
        }, 'server %s listening at %s.', server.name, server.url);
    });

    //
    // Injecting hypermedia url helper
    //
    server.hypermediaUrl = new HypermediaUrl(server, baseUrl);

    return server;
}
