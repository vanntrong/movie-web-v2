import React, { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import Wrapper from "../components/Wrapper/Wrapper";
import Footer from "../components/Footer/Footer";
import { useParams, useSearchParams } from "react-router-dom";
import { getDiscover } from "../api/movies";
import Movie from "../components/Movie/Movie";
import PaginationCustom from "../components/UI/PaginationCustom/PaginationCustom";

const DiscoverScreen = (props) => {
  const { type } = props;
  const [listMovies, setListMovies] = useState([]);
  const params = useParams();
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page")) || 1;

  useEffect(() => {
    const fetchData = async () => {
      const res = await getDiscover(type.toLowerCase(), params.id, page);
      setListMovies(res.results);
    };
    document.title = `The Movie - Discover ${type.charAt(0).toUpperCase() + type.slice(1)}`;
    fetchData();
  }, [type, params.id, page]);

  return (
    <>
      <Header />
      <Wrapper className="min-h-screen">
        <div className="mt-[100px] flex sm:items-center sm:flex-row flex-col items-stretch gap-4 flex-wrap">
          {listMovies.length > 0 &&
            listMovies.map((movie, index) => <Movie key={index} data={movie} mediaType={type} />)}
          {listMovies.length === 0 && <p className="text-white">No movie found</p>}
        </div>
        <PaginationCustom page={page} query={params.id} type={type} pageType="discover" />
      </Wrapper>

      <Footer />
    </>
  );
};

export default DiscoverScreen;
