import React from "react";
import { Link } from "react-router-dom";
import { posterImageUrl } from "../../constant";

const Episode = (props) => {
  return (
    <div className="lg:w-[300px] lg:h-[290px] xl:w-[350px] 2xl:w-[400px] md:w-[360px] w-[300px] h-[290px]">
      <div
        style={{
          backgroundImage: `url("${posterImageUrl}${props.data.still_path}")`,
        }}
        className="h-[200px] bg-cover bg-no-repeat bg-center p-4 relative"
      >
        <span className="text-white text-[14px] bg-red inline-block p-1">
          S{props.data.season_number}E{props.data.episode_number}
        </span>
        <div className="absolute inset-0 flex items-center justify-center">
          <Link to={`/tv/${props.tvId}/watch?season=${props.data.season_number}&episode=${props.data.episode_number}`}>
            <div className="text-red w-[40px] h-[40px] flex items-center justify-center bg-white rounded-full">
              <i className="fa-solid fa-play"></i>
            </div>
          </Link>
        </div>
      </div>
      <div className="bg-dark-02 text-white p-3">
        <div className="flex items-center justify-between mb-2">
          <h3
            style={{
              backgroundImage: `background: transparent linear-gradient(270deg, rgba(11,1,2,0) 0%, rgba(255,55,65,0.3) 100%)`,
            }}
            className="p-1 border-l-[4px] border-solid border-red text-[14px]"
          >
            <i>{props.data.air_date}</i>
          </h3>
          <span className="text-red">{props.data.vote_average.toFixed(2)} points</span>
        </div>
        <h2 className="mt-2 text-[18px]">{props.data.name}</h2>
      </div>
    </div>
  );
};

export default Episode;
