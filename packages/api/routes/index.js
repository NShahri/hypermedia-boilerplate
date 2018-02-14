import registerMovieRoutes from './movies';
import registerHealthRoutes from './health';
import RouteNames from './routeNames';
import contextConnector from "./contextProvider";
import cachePolicy from "./cacheProvider/cachePolicy";
import cacheConnector from "./cacheProvider";
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

export default function setupRoutes(router) {
    router.get(
        {name: RouteNames.root, path: '/'},
        authProvider,
        cacheConnector(cachePolicy.apiRootCachePolicy),
        contextConnector(getRootHandler));

    registerMovieRoutes(router);
    registerHealthRoutes(router);
}
