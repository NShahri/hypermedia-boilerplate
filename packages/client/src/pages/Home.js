import React, {Component} from 'react';
import ApiClient from '../apiClient';
import {translate, Trans} from 'react-i18next';

class Home extends Component {

    state = {
        movies: {
            collection: []
        },
        errors: []
    };

    async onMoviesRequest() {
        try {
            let r = await
                ApiClient
                    .getClient()
                    .follow('movies')
                    .getResource();

            this.setState({movies: {...this.state.movies, collection: r.document.items.map(i => i.href)}});
        }
        catch (error) {
            this.setState({errors: [...this.state.errors, error]});
        }
    }

    async onMovieDetailsRequest(id) {
        try {
            let r = await ApiClient
                .getClient(id)
                .getResource();

            let newState = {};
            newState[id] = r.document;
            this.setState({movies: {...this.state.movies, ...newState}});
        }
        catch (error) {
            this.setState({errors: [...this.state.errors, error]});
        }
    }

    renderMovieDetails(id) {
        const movie = this.state.movies[id];
        return (
            <div>
                {
                    !movie
                    &&
                    <button onClick={() => this.onMovieDetailsRequest(id)}>
                        <Trans i18nKey="movies.getDetails">
                            Get movie details
                        </Trans>
                    </button>
                }
                {!!movie && <span>{movie.name}</span>}
            </div>
        );
    }

    renderMovies(movies) {
        return (
            <ul>
                {movies.map(m => <li key={m}>{m} - {this.renderMovieDetails(m)}</li>)}
            </ul>
        );
    }

    render() {
        const {movies, errors} = this.state;

        return (
            <div>
                {
                    !movies.collection.length
                    &&
                    <button onClick={() => this.onMoviesRequest()}>
                        <Trans i18nKey="movies.getList">
                            Get movies list
                        </Trans>
                    </button>
                }
                {movies.collection.length > 0 && this.renderMovies(movies.collection)}
                <div>
                    {errors.map((e, index) => <div key={index}>{e.message}</div>)}
                </div>
            </div>
        );
    }
}

Home.propTypes = {};

export default translate()(Home);
