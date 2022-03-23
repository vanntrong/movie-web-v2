import { moviesAction } from "./redux/slice/MovieSlice";

export const BASE_URL = "https://api.themoviedb.org/3/";
export const API_KEY = "89fd6fee1082a41f4d5d9fe3c1ac3052";
export const backdropImageUrl = "https://image.tmdb.org/t/p/original";
export const posterImageUrl = "https://image.tmdb.org/t/p/w500";
export const mediaPlayerUrl = "https://www.2embed.ru/embed/tmdb/";

//user
export const BASE_URL_USER = "https://api.freemovienow.online";
// export const BASE_URL_USER = "http://localhost:8000/api";
export const sideDomain = "https://freemovienow.online";

export const handleAddToHistory = (data, dispatch) => {
  const historyMovies = JSON.parse(localStorage.getItem("history")) || [];
  const existingMovie = historyMovies.find((movie) => movie.id === data.id && movie.media_type === data.media_type);
  if (existingMovie) {
    return;
  }
  historyMovies.unshift(data);
  localStorage.setItem("history", JSON.stringify(historyMovies));
  dispatch(moviesAction.addHistoryList(data));
};

export const createPositionPopup = (w, h) => {
  const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screenX;
  const dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screenY;

  const width = window.innerWidth
    ? window.innerWidth
    : document.documentElement.clientWidth
    ? document.documentElement.clientWidth
    : window.screen.width;
  const height = window.innerHeight
    ? window.innerHeight
    : document.documentElement.clientHeight
    ? document.documentElement.clientHeight
    : window.screen.height;

  const systemZoom = width / window.screen.availWidth;
  const left = (width - w) / 2 / systemZoom + dualScreenLeft;
  const top = (height - h) / 2 / systemZoom + dualScreenTop;
  return {
    w,
    h,
    top,
    left,
  };
};
