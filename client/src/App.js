import { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { getListData } from "./api/movies";
import { moviesAction } from "./redux/slice/MovieSlice";
import { useDispatch, useSelector } from "react-redux";
import React, { useCallback, useEffect } from "react";
import { $userIsLoggedIn } from "./redux/selector";
import LoginSuccess from "./components/UI/LoginSuccess/LoginSuccess";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "./components/Loading/Loading";

const HomeScreen = React.lazy(() => import("./pages/HomeScreen"));
const MovieScreen = React.lazy(() => import("./pages/MovieScreen"));
const TvScreen = React.lazy(() => import("./pages/TvScreen"));
const WatchScreen = React.lazy(() => import("./pages/WatchScreen"));
const SearchScreen = React.lazy(() => import("./pages/SearchScreen"));
const HistoryScreen = React.lazy(() => import("./pages/HistoryScreen"));
const AuthenticationScreen = React.lazy(() => import("./pages/AuthenticationScreen"));
const ProfileScreen = React.lazy(() => import("./pages/ProfileScreen"));
const DiscoverScreen = React.lazy(() => import("./pages/DiscoverScreen"));
const WatchLaterScreen = React.lazy(() => import("./pages/WatchLaterScreen"));

function App() {
  const dispatch = useDispatch();
  const userIsLoggedIn = useSelector($userIsLoggedIn);

  const getMovieHomeScreen = useCallback(async () => {
    const response = await Promise.all([
      getListData("movie", "trending"),
      getListData("movie", "popular"),
      getListData("movie", "top_rated"),
      getListData("movie", "upcoming"),
    ]);
    const loadedMovies = response.map((res) => {
      return {
        type: res.type,
        data: res.data.results,
      };
    });
    dispatch(moviesAction.setHomeMovies(loadedMovies));
  }, [dispatch]);
  const getTvHomeScreen = useCallback(async () => {
    const response = await Promise.all([
      getListData("tv", "trending"),
      getListData("tv", "popular"),
      getListData("tv", "top_rated"),
      getListData("tv", "airing_today"),
    ]);
    const loadedTv = response.map((res) => {
      return {
        type: res.type,
        data: res.data.results,
      };
    });
    dispatch(moviesAction.setHomeTv(loadedTv));
  }, [dispatch]);
  useEffect(() => {
    getMovieHomeScreen();
    getTvHomeScreen();
    return () => {};
  }, [dispatch, getMovieHomeScreen, getTvHomeScreen]);

  return (
    <>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/movie" element={<MovieScreen />} />
          <Route path="/movie/:id/watch" element={<WatchScreen mediaType="movie" />} />
          <Route path="/tv" element={<TvScreen />} />
          <Route path="/tv/:id/watch" element={<WatchScreen mediaType="tv" />} />
          <Route path="/search" element={<SearchScreen />} />
          <Route path="/history" element={<HistoryScreen />} />
          <Route path="/watch-later" element={userIsLoggedIn ? <WatchLaterScreen /> : <Navigate to="/login" />} />
          <Route path="/signup" element={<AuthenticationScreen type="signup" />} />
          <Route path="/login" element={<AuthenticationScreen type="signin" />} />
          <Route path="/login/success" element={<LoginSuccess />} />
          <Route path="/profile" element={userIsLoggedIn ? <ProfileScreen /> : <Navigate to="/login" />} />
          <Route path="/discover/movie/:id" element={<DiscoverScreen type="movie" />} />
          <Route path="/discover/tv/:id" element={<DiscoverScreen type="TV" />} />
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover
        />
      </Suspense>
    </>
  );
}

export default App;
