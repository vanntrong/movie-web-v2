import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getSearch } from "../api/movies";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import Movie from "../components/Movie/Movie";
import PaginationCustom from "../components/UI/PaginationCustom/PaginationCustom";
import Wrapper from "../components/Wrapper/Wrapper";

const SearchScreen = () => {
  const [listMovies, setListMovies] = useState([]);
  const [searchParam] = useSearchParams();
  const searchInput = searchParam.get("q");
  const page = parseInt(searchParam.get("page")) || 1;

  useEffect(() => {
    const getListMovies = async () => {
      const response = await getSearch(searchInput, page);
      const responseDifferentPerson = response.results.filter((movie) => movie.media_type !== "person");
      setListMovies(responseDifferentPerson);
    };
    document.title = `The Movie - Search ${searchInput}`;
    getListMovies();
    return () => {
      setListMovies([]);
    };
  }, [searchInput, setListMovies, page]);

  return (
    <>
      <Header />
      <Wrapper className="min-h-screen">
        <div className="mt-[100px] flex items-center gap-3 flex-wrap">
          {listMovies.length > 0 && listMovies.map((movie, index) => <Movie key={index} data={movie} />)}
          {listMovies.length === 0 && <p className="text-white">No movie found</p>}
        </div>
        <PaginationCustom page={page} query={searchInput} pageType="history" />
      </Wrapper>
      <Footer />
    </>
  );
};

export default SearchScreen;
