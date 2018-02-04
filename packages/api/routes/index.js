import registerMovieRoutes from './movies';
import RouteNames from './routeNames';

const getRootHandler = server => (req, res, next) => {
    console.log(this);

    res.send({
        links: [
            server.hypermediaUrl.createSelfLink(req),
            server.hypermediaUrl.createLink('movies', RouteNames.movies, {})
        ]
    });

    return next();
};

export default function setupRoutes(server) {
    server.get({name: RouteNames.root, path: '/'}, getRootHandler(server));

    registerMovieRoutes(server);
}
