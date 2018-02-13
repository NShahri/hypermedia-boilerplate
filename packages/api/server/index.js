import restify from 'restify';
import logger from "../infrastructure/logger";
import {URL} from 'url';
import HypermediaUrl from "./HypermediaUrl";
import corsMiddleware from 'restify-cors-middleware';
import config from "../infrastructure/config";

function setupCors(server) {
    const cors = corsMiddleware({
        preflightMaxAge: 600, // 10 minutes
        origins: config.allowedOrigin,
        allowHeaders: ['Authorization'],
        //exposeHeaders: ['API-Token-Expiry']
    });

    server.pre(cors.preflight);
    server.use(cors.actual);
}

function defaultContentType(req, res, next) {
    //if(!res.contentType){
    //res.contentType = 'application/vnd.collection+json';
    res.setHeader('content-type', 'application/vnd.collection+json');
    //}

    next();
}

/**
 *
 * @param port {number}
 * @param baseUrl {URL}
 * @returns {http.Server}
 */
export default function setupServer(port, baseUrl) {
    const server = restify.createServer({
        log: logger,
        formatters: {
            /**
             * Set formatter for media type otherwise restify will change response header to octet-stream
             *
             * NOTE: This is a copy o restify application/json formatter
             *
             * TODO: use the original formatter rather than copy the code in here
             *
             */
            'application/vnd.collection+json': (req, res, body) => {
                var data = body ? JSON.stringify(body) : 'null';
                // Setting the content-length header is not a formatting feature and should
                // be separated into another module
                res.setHeader('Content-Length', Buffer.byteLength(data));

                return data;
            }

        }

    });

    //
    // Setup req_id for each request
    // Usage of req.log, it will log the request with req_id
    // http://restify.com/docs/plugins-api/#requestlogger
    //
    server.use(restify.plugins.requestLogger());

    //
    // Setup CORS before any content-type, accept header
    // Because server has to return CORS headers even on errors
    //
    setupCors(server);

    //
    // Set the default content type to Collection+JSON media type
    // @see http://amundsen.com/media-types/collection/
    //
    // Need to add right formatter, otherwise restify will change the content-type to octet-stream
    //
    server.use(defaultContentType);

    //
    // Setup server to only accept the right media type
    //
    server.use(restify.plugins.acceptParser('application/vnd.collection+json'));

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
