import {take, put, call, fork, select, all} from 'redux-saga/effects';
import { delay } from 'redux-saga'
import {MoviesFetchActionTypes} from '../reducers';
import {getMovies} from "../apiClient/movie";

const actions = {
    MoviesRequested: 'movie-requested'
};

function* fetchMovies() {
    while (true) {
        yield take(actions.MoviesRequested);

        yield put({type: MoviesFetchActionTypes.InProgress});

        const {items, err} = yield call(getMovies);

        yield call(delay, 5000);

        if (items) {
            yield put({type: MoviesFetchActionTypes.Success, items});
        }
        else {
            yield put({type: MoviesFetchActionTypes.Failed, err});
        }
    }
}

export default function* root() {
    yield all([
        fetchMovies()
    ]);
}