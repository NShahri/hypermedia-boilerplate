import {getMovie, getMovies} from "../domain/movies";
import {ResourceNotFoundError, InternalError} from 'restify-errors';
import RouteNames from './routeNames';
import config from "../infrastructure/config";
import cachePolicy from './cachePolicy';
import cacheConnector from "./cacheConnector";

function handlerConnector(handler) {
    return function (req, res, next) {
        try {
            handler.call(this, req, res, next, this);
        }
        catch (e) {
            next(new InternalError(config.isProduction ? 'Unexpected error.' : e));
        }
    };
}

function getMoviesHandler (req, res, next, server) {
    res.send({
        links: [
            server.hypermediaUrl.createSelfLink(req),
            server.hypermediaUrl.createUpLink(RouteNames.root)
        ],
        items: server.hypermediaUrl.createFeed(getMovies(), RouteNames.movie)
    });

    return next();
}

function getMovieHandler (req, res, next, server) {
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
}

export default function registerRoutes(server) {
    server.get({name: RouteNames.movies, path: '/movie'}, cacheConnector(cachePolicy.privateLongCachePolicy), handlerConnector(getMoviesHandler));
    server.get({name: RouteNames.movie, path: '/movie/:id'}, cacheConnector(cachePolicy.privateShortCachePolicy), handlerConnector(getMovieHandler));
}