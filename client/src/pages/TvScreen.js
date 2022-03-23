import React from "react";
import { useSelector } from "react-redux";
import Banner from "../components/Banner/Banner";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import ListMovies from "../components/ListMovies/ListMovies";
import { $tvListSelector } from "../redux/selector";

const TvScreen = () => {
  const tv = useSelector($tvListSelector);

  const titleList = ["Trending TV", "Popular TV", "Top Rated TV", "On Air TV"];
  return (
    <>
      <Header />
      <Banner selector={$tvListSelector} />
      {tv?.length > 0 ? (
        tv?.map((tv, index) => <ListMovies key={index} data={tv} titleList={titleList[index]} />)
      ) : (
        <p>loading</p>
      )}
      <Footer />
    </>
  );
};

export default TvScreen;
