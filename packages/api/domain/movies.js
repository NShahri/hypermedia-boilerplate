import uuid from 'uuid/v4';

const movies = [{id: uuid(), name: 'Matrix'}, {id: uuid(), name: 'Dr strange'}];

export function getMovies() {
    const result = movies.map(m => ({id: m.id}));

    Object.freeze(result);
    return result;
}

export function getMovie(id) {
    const result = movies.find(m => m.id === id);

    Object.freeze(result);
    return result;
}
