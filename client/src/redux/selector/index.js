export const $tvAndMovieListSelector = (state) => state.movies.moviesList.movies.concat(state.movies.moviesList.tv);
export const $movieListSelector = (state) => state.movies.moviesList.movies;
export const $tvListSelector = (state) => state.movies.moviesList.tv;
export const $historyListSelector = (state) => state.movies.moviesList.history;
export const $isLoadedMovieSelector = (state) => state.movies.isLoadedMovie;
export const $genre = (state) => state.movies.genre;

export const $userSelector = (state) => state.persistedReducer.user.user;
export const $userIsLoggedIn = (state) => state.persistedReducer.user.isLoggedIn;
export const $userWatchLaterList = (state) => state.persistedReducer.user.user.watchLater;
