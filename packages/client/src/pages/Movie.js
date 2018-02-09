import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {CircularProgress} from 'material-ui/Progress';
import emptyFunc from 'empty/function';
import {connect} from 'react-redux'


class Movie extends Component {
    componentWillMount() {
        const {items, onRequestMovies} = this.props;

        if (!items) {
            onRequestMovies();
        }
    }

    render() {
        const {items} = this.props;
        console.log('movies', this.props);
        if (!items) {
            return <CircularProgress/>;
        }

        return (
            <div>
                Movies
            </div>
        );
    }
}

Movie.propTypes = {
    items: PropTypes.array,
    onRequestMovies: PropTypes.func.isRequired
};

Movie.defaultProps = {
    onRequestMovies: emptyFunc
};

function mapStateToProps(state) {
    const {movies} = state;

    return {
        ...movies
    };
}

export default connect(mapStateToProps, {
    onRequestMovies: () => ({type: 'movie-requested'})
})(Movie);



