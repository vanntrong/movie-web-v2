import React from "react";
import { posterImageUrl } from "../../constant";
import PlayButton from "../UI/Button/PlayButton";

import classes from "./index.module.css";

const MovieSlideTop = (props) => {
  const { isActive, data: movie } = props;

  const addHistoryHandler = () => {};
  return (
    <div
      style={{ backgroundImage: `url("${posterImageUrl}/${movie.poster_path}")` }}
      className={`xl:w-[350px] xl:h-[200px] lg:w-[250px] lg:h-[150px] sm:w-[200px] sm:h-[150px] bg-cover bg-center p-3 flex flex-col justify-center gap-y-3 ease-in duration-300 cursor-pointer mobile:w-[160px] mobile:h-[200px] ${
        isActive ? classes.active : ""
      }`}
    >
      <h3 className="mobile:text-10px sm:text-[16px]">{movie.title}</h3>
      <p className="mobile:hidden sm:block">{movie.release_date}</p>
      {isActive && <PlayButton size="small" onAddHistory={addHistoryHandler} link={`/movie/${movie.id}/watch`} />}
    </div>
  );
};

export default MovieSlideTop;
