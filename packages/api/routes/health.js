import cachePolicy from "./cachePolicy";
import handlerConnector from "./handlerConnector";
import cacheConnector from "./cacheConnector";
import RouteNames from "./routeNames";
import config from "../infrastructure/config";

const pingHandler = (req, res, next, server) => {
    res.send({
        links: [
            server.hypermediaUrl.createSelfLink(req),
            server.hypermediaUrl.createUpLink(RouteNames.root)
        ],
        data: {
            name: config.appName,
            version: config.appVersion
        }
    });

    return next();
};

export default function registerRoutes(server) {
    server.get(
        {name: RouteNames.health, path: '/health'},
        cacheConnector(cachePolicy.publicVeryShortCachePolicy),
        handlerConnector(pingHandler));
}