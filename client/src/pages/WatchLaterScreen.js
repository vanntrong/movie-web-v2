import React, { useState, useEffect } from "react";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import Wrapper from "../components/Wrapper/Wrapper";
import MovieSpecialList from "../components/Movie/MovieSpecialList";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { $userWatchLaterList } from "../redux/selector";

const WatchLaterScreen = () => {
  const [listMovie, setListMovie] = useState([]);

  const watchLaterList = useSelector($userWatchLaterList);

  useEffect(() => {
    if (watchLaterList) {
      setListMovie(watchLaterList);
    }
    document.title = `The Movie - Watch Later`;
  }, [watchLaterList]);
  return (
    <>
      <div className="min-h-screen">
        <Header />
        <Wrapper className="min-h-screen">
          <div className="mt-[100px]">
            <div className="text-white flex items-center justify-between mb-[20px]">
              <h1 className="text-[20px] font-medium">Watch Later List</h1>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              {listMovie && listMovie.length > 0 ? (
                listMovie.map((movie, index) => <MovieSpecialList key={index} data={movie} />)
              ) : (
                <div className="flex flex-col justify-center items-center w-full">
                  <div>
                    <img
                      src="https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8bW92aWV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
                      alt=""
                      className="w-[150px] h-[150px] rounded-full object-cover"
                    />
                  </div>
                  <p className="text-white text-[20px] mt-[10px]">No movies found</p>
                  <Link to="/" className="text-red text-[20px] mt-[10px]">
                    Discover more
                  </Link>
                </div>
              )}
            </div>
          </div>
        </Wrapper>
        <Footer />
      </div>
    </>
  );
};

export default WatchLaterScreen;
