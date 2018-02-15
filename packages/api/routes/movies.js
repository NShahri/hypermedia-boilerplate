import {getMovie, getMovies} from "../domain/movies";
import {ResourceNotFoundError} from 'restify-errors';
import RouteNames from './routeNames';
import cachePolicy from './cacheProvider/cachePolicy';
import cacheConnector from "./cacheProvider";
import contextConnector from "./contextProvider";
import authProvider from "../infrastructure/authProvider";

function getMoviesHandler(req, res, next, server) {
    res.send({
        links: [
            server.hypermediaUrl.createSelfLink(req),
            server.hypermediaUrl.createUpLink(RouteNames.root)
        ],
        items: server.hypermediaUrl.createFeed(getMovies(), RouteNames.movie)
    });

    return next();
}

const getMovieHandler = (req, res, next, server) => {
    let movie = getMovie(req.params.id);

    if (movie) {
        res.send({
            links: [
                server.hypermediaUrl.createSelfLink(req),
                server.hypermediaUrl.createUpLink(RouteNames.movies)
            ],
            ...movie
        });
        return next();
    }

    return next(new ResourceNotFoundError('Not found'));
};

export default function registerMovieRoutes(router) {

    router.get(
        {name: RouteNames.movies, path: '/movie'},
        authProvider,
        cacheConnector(cachePolicy.privateLongCachePolicy),
        contextConnector(getMoviesHandler));


    router.get(
        {name: RouteNames.movie, path: '/movie/:id'},
        authProvider,
        cacheConnector(cachePolicy.privateShortCachePolicy),
        contextConnector(getMovieHandler));
}