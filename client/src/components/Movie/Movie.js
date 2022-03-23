import React from "react";
import PlayButton from "../UI/Button/PlayButton";
import { posterImageUrl, sideDomain } from "../../constant";
import { useDispatch } from "react-redux";
import { handleAddToHistory } from "../../constant";

import ButtonAction from "../UI/Button/ButtonAction";

const Movie = (props) => {
  const dispatch = useDispatch();
  let isTv;
  if (props.mediaType) {
    isTv = props.mediaType.includes("TV");
  }
  const classText = "text-white sm:text-[16px] mb-2 mobile:text-[12px]";

  const releaseDate = props.data.release_date ? props.data.release_date : props.data.first_air_date;
  const name = props.data.title ? props.data.title : props.data.original_name;
  const data = {
    media_type: isTv ? "tv" : "movie",
    id: props.data.id,
    name: props.data.title ? props.data.title : props.data.original_name,
    poster_path: props.data.poster_path,
    releaseDate: props.data.release_date,
  };
  const handlePlayButtonClick = () => {
    handleAddToHistory(data, dispatch);
  };

  return (
    <>
      {props.data.media_type === "person" ? (
        ""
      ) : (
        <div
          style={{
            backgroundImage: `url(${posterImageUrl}/${props.data.poster_path})`,
          }}
          className="2xl:w-[405px] 2xl:h-[235px] bg-cover flex items-center justify-between px-4 bg-cover movie xl:w-[520px] xl:h-[280px] lg:w-[450px] lg:h-[240px] md:w-[300px] md:h-[200px] sm:w-[280px] sm:h-[160px] xs:w-[200px] xs:h-[120px] mobile:h-[150px]"
        >
          <div>
            <h3 className={classText}>{name}</h3>
            <p className={classText}>{releaseDate}</p>
            <PlayButton
              link={`/${isTv ? "tv" : "movie"}/${props.data.id}/watch${isTv ? "?season=1&episode=1" : ""}`}
              size="small"
              onAddHistory={handlePlayButtonClick}
            />
          </div>
          <ButtonAction
            data={data}
            link={`${sideDomain}/${isTv ? "tv" : "movie"}/${props.data.id}/watch${isTv ? "?season=1&episode=1" : ""}`}
          />
        </div>
      )}
    </>
  );
};

export default Movie;
