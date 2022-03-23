import React, { useEffect, useState } from "react";
import { backdropImageUrl } from "../../constant";
import PlayButton from "../UI/Button/PlayButton";
import StartRate from "../UI/StartRate/StartRate";
import Wrapper from "../Wrapper/Wrapper";

import classes from "./index.module.css";

const MovieLasted = (props) => {
  const [movie, setMovie] = useState(null);
  useEffect(() => {
    if (props.data) {
      setMovie(props.data.data[0]);
    }
  }, [setMovie, props.data]);

  const onAddHistoryHandler = () => {};

  return (
    <>
      {movie ? (
        <div
          style={{
            backgroundImage: `url("${backdropImageUrl}${
              movie.backdrop_path ? movie.backdrop_path : movie.poster_path
            }")`,
          }}
          className={`"bg-cover bg-no-repeat sm:h-[700px] flex items-center justify-between mobile:h-[250px] ${classes["movie-last-wrapper"]}`}
        >
          <Wrapper className="flex items-center justify-between bg-transparent ">
            <div className="flex-1">
              <h3 className="text-white sm:text-[25px] font-bold mb-2 mobile:text-[12px]">Lasted TV show today</h3>

              <h2 className="bg-[url('https://wordpress.iqonic.design/product/wp/streamit/wp-content/plugins/streamit-extensions/includes/Elementor/assets/img/texure.jpg')] movie-heading-lg lg:text-[50px] lg:font-black cursor-default md:text-[30px] md:font-bold sm:text-[15px] sm:font-medium mobile:text-[20px] mobile:font-medium">
                {movie.name}
              </h2>
              <StartRate
                vote_average={movie.vote_average}
                vote_count={movie.vote_count}
                className="mobile:hidden sm:block"
              />

              <p className="max-w-[600px] text-gray mb-4 mobile:hidden sm:block sm:text-[12px] md:text-[16px]">
                {movie.overview.slice(0, 200) + "..."}
              </p>
              <PlayButton
                size="large"
                onAddHistory={onAddHistoryHandler}
                link={`/tv/${movie.id}/watch?season=1&episode=1`}
              />
            </div>
            <div className="flex-1 rounded-lg">
              <img
                src={`${backdropImageUrl}${movie.backdrop_path ? movie.backdrop_path : movie.poster_path}`}
                alt="movie-poster"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </Wrapper>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default MovieLasted;
