import React, {Component} from 'react';
import ApiClient from '../apiClient';

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
                {!movie && <button onClick={() => this.onMovieDetailsRequest(id)}>Get movie details</button>}
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
                {!movies.collection.length && <button onClick={() => this.onMoviesRequest()}>Get movies list</button>}
                {movies.collection.length > 0 && this.renderMovies(movies.collection)}
                <div>
                    {errors.map(e => <div>{e}</div>)}
                </div>
            </div>
        );
    }
}

Home.propTypes = {};

export default Home;
