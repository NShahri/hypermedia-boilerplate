import {getMovie, getMovies} from "../domain/movies";
import {InternalError, ResourceNotFoundError} from 'restify-errors';
import RouteNames from './routeNames';
import cachePolicy from './cachePolicy';
import cacheConnector from "./cacheConnector";
import jwt from 'express-jwt';
import handlerConnector from "./handlerConnector";

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

function getMovieHandler(req, res, next, server) {
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
    server.get(
        {name: RouteNames.movies, path: '/movie'},
        jwt({secret: 'shhhhhhared-secret'}),
        cacheConnector(cachePolicy.privateLongCachePolicy),
        handlerConnector(getMoviesHandler));


    server.get(
        {name: RouteNames.movie, path: '/movie/:id'},
        cacheConnector(cachePolicy.privateShortCachePolicy),
        handlerConnector(getMovieHandler));
}