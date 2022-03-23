import React from "react";
import { useSelector } from "react-redux";
import Banner from "../components/Banner/Banner";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import ListMovies from "../components/ListMovies/ListMovies";
import { $movieListSelector } from "../redux/selector";

const MovieScreen = () => {
  const movies = useSelector($movieListSelector);

  const titleList = ["Trending Movie", "Popular Movie", "Top Rated Movie", "Upcoming Movie"];
  return (
    <>
      <Header />
      <Banner index={2} selector={$movieListSelector} />
      {movies?.length > 0 ? (
        movies?.map((movie, index) => <ListMovies key={index} data={movie} titleList={titleList[index]} />)
      ) : (
        <p>loading</p>
      )}
      <Footer />
    </>
  );
};

export default MovieScreen;
