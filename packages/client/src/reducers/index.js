import {combineReducers} from 'redux';

/**
 * @typedef NetworkStatus {{InProgress: string, Success: string, Failed: string}}
 */
const NetworkStatus = {
    InProgress: 'inProgress',
    Success: 'success',
    Failed: 'failed'
};

/**
 *
 * @param entity {string}
 * @param action {string}
 * @returns {NetworkStatus}
 */
function createActionType(entity, action) {
    let result = {};

    for (let networkStatus in NetworkStatus) {
        result[networkStatus] = `${entity}-${action}-${NetworkStatus[networkStatus]}`;
    }

    return result;
}

/**
 * @type {NetworkStatus}
 */
const MoviesFetchActionTypes = createActionType('movies', 'fetch');

function moviesFetchReducer(state = {isFetching: false, items: null, err: null}, action) {
    switch (action.type) {
        case MoviesFetchActionTypes.InProgress:
            return {...state, isFetching: true, items: null, err: null};
        case MoviesFetchActionTypes.Success:
            return {...state, isFetching: false, items: action.items, err: null};
        case MoviesFetchActionTypes.Failed:
            return {...state, isFetching: false, items: null, err: action.err};
        default:
            return state;
    }
}


const rootReducer = combineReducers({
    movies: moviesFetchReducer
});

export default rootReducer;

export {MoviesFetchActionTypes};
