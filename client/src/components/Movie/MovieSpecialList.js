import React from "react";
import PlayButton from "../UI/Button/PlayButton";
import { posterImageUrl, sideDomain } from "../../constant";
import ButtonAction from "../UI/Button/ButtonAction";

const MovieSpecialList = (props) => {
  // const dispatch = useDispatch();
  let isTv;
  if (props.mediaType) {
    isTv = props.mediaType.includes("TV");
  }
  const classText = "text-white sm:text-[16px] mb-2 mobile:text-[12px]";

  const data = {
    media_type: isTv ? "tv" : "movie",
    id: props.data.id,
    name: props.data.name,
    poster_path: props.data.poster_path,
    releaseDate: props.data.release_date,
  };

  return (
    <>
      <div
        style={{
          backgroundImage: `url(${posterImageUrl}/${props.data.poster_path})`,
        }}
        className="2xl:w-[405px] 2xl:h-[235px] bg-cover flex items-center justify-between px-4 bg-cover movie xl:w-[520px] xl:h-[280px] lg:w-[450px] lg:h-[240px] md:w-[300px] md:h-[200px] sm:w-[280px] sm:h-[160px] xs:w-[200px] xs:h-[120px] mobile:h-[150px]"
      >
        <div>
          <h3 className={classText}>{props.data.name}</h3>
          <p className={classText}>{props.data.releaseDate}</p>
          <PlayButton
            link={`/${isTv ? "tv" : "movie"}/${props.data.id}/watch${isTv ? "?season=1&episode=1" : ""}`}
            size="small"
          />
        </div>
        <ButtonAction
          data={data}
          link={`${sideDomain}/${isTv ? "tv" : "movie"}/${props.data.id}/watch${isTv ? "?season=1&episode=1" : ""}`}
        />
      </div>
    </>
  );
};

export default MovieSpecialList;
