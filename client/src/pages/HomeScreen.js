import React from "react";
import { useSelector } from "react-redux";
import Banner from "../components/Banner/Banner";
import Header from "../components/Header/Header";
import ListMovies from "../components/ListMovies/ListMovies";
import Footer from "../components/Footer/Footer";
import { $tvAndMovieListSelector } from "../redux/selector";
import ListMoviesTop from "../components/ListMovies/ListMoviesTop";
import MovieLasted from "../components/Movie/MovieLasted";

const HomeScreen = () => {
  const data = useSelector($tvAndMovieListSelector);

  const titleList = [
    "Trending Movies",
    "Popular Movies",
    "Top Rated Movies",
    "Upcoming Movies",
    "Trending TV Shows",
    "Popular TV Shows",
    "Top Rated TV Shows",
    "Airing Today",
  ];
  return (
    <>
      <Header />
      <Banner index={1} selector={$tvAndMovieListSelector} />
      <ListMovies titleList={titleList[0]} data={data[0]} />
      <ListMovies titleList={titleList[3]} data={data[3]} />
      <ListMoviesTop titleList={titleList[2]} data={data[2]} />
      <ListMovies titleList={titleList[4]} data={data[4]} />
      <MovieLasted type="tv" data={data[7]} />
      <Footer />
    </>
  );
};

export default HomeScreen;
