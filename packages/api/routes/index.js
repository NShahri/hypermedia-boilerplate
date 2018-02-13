import registerMovieRoutes from './movies';
import registerHealthRoutes from './health';
import RouteNames from './routeNames';
import handlerConnector from "./handlerConnector";
import cachePolicy from "./cachePolicy";
import cacheConnector from "./cacheConnector";
import authProvider from "../infrastructure/authProvider";

function getRootHandler(req, res, next, server) {
    res.send({
        links: [
            server.hypermediaUrl.createSelfLink(req),
            server.hypermediaUrl.createLink('movies', RouteNames.movies, {})
        ]
    });

    return next();
}

export default function setupRoutes(server) {
    server.get(
        {name: RouteNames.root, path: '/'},
        authProvider,
        cacheConnector(cachePolicy.apiRootCachePolicy),
        handlerConnector(getRootHandler));

    registerMovieRoutes(server);
    registerHealthRoutes(server);
}
