import React from "react";
import PlayIcon from "../UI/Icon/PlayIcon";
import PlayButton from "../UI/Button/PlayButton";
import { backdropImageUrl, handleAddToHistory } from "../../constant";
import StartRate from "../UI/StartRate/StartRate";
import { useDispatch, useSelector } from "react-redux";
import { getPreviewVideo } from "../../api/movies";
import Youtube from "react-youtube";

import "./index.css";
import { $genre } from "../../redux/selector";
import { Link } from "react-router-dom";

const BannerItem = (props) => {
  const dispatch = useDispatch();
  const [isShowModal, setIsShowModal] = React.useState(false);
  const [previewLink, setPreviewLink] = React.useState(null);
  const genreList = useSelector($genre);
  let link = "";

  if (!props.data.media_type || props.data.media_type === "movie") {
    link = `/movie/${props.data.id}/watch`;
  } else {
    link = `/${props.data.media_type}/${props.data.id}/watch?season=1&episode=1`;
  }

  const genreMovieOrTv =
    !props.data.media_type || props.data.media_type === "movie" ? genreList.genre_movie : genreList.genre_tv;

  const handlePlayButtonClick = () => {
    const data = {
      media_type: props.data.media_type,
      id: props.data.id,
      name: props.data.title ? props.data.title : props.data.original_name,
      poster_path: props.data.poster_path,
      releaseDate: props.data.release_date,
    };
    handleAddToHistory(data, dispatch);
  };

  const clickPreviewHandler = async () => {
    const mediaType = props.data.media_type ? props.data.media_type : "movie";
    const data = await getPreviewVideo(mediaType, props.data.id);
    setPreviewLink(data.results[0].key);
    setIsShowModal(true);
  };

  return (
    <div
      style={{ backgroundImage: `url("${backdropImageUrl}${props.data.backdrop_path}")` }}
      className="flex justify-between items-center lg:w-screen lg:h-screen lg:px-[100px] lg:py-[25px] sm:px-[25px] overflow-hidden bg-cover bg-no-repeat banner mobile:h-[300px] sm:h-[500px] relative"
    >
      <div className="max-w-[1020px]">
        <h1 className="bg-[url('https://wordpress.iqonic.design/product/wp/streamit/wp-content/plugins/streamit-extensions/includes/Elementor/assets/img/texure.jpg')] movie-heading-lg xl:text-[80px] xl:font-black cursor-default lg:text-[60px] lg:mb-[20px] lg:leading-none md:text-[50px] md:font-bold sm:text-[30px] sm:font-bold mobile:text-[20px] mobile:max-w-[150px] sm:max-w-[100%] banner-heading">
          {props.data.title ? props.data.title : props.data.original_name}
        </h1>
        <StartRate
          vote_average={props.data.vote_average}
          vote_count={props.data.vote_count}
          className="mobile:hidden sm:block"
        />
        <p className="max-w-[600px] text-white text-[16px] mb-[35px] lg:mb-[20px] sm:w-[200px] md:w-[400px] md:block mobile:hidden banner-desc">
          {props.data.overview.split(0, 300) + "..."}
        </p>
        <div className="mb-5 mobile:hidden md:block">
          <div className="flex mb-1">
            <h3 className="text-red text-[16px] font-bold mr-3">Release Date</h3>
            <span className="text-white">
              {props.data.media_type === "tv" ? props.data.first_air_date : props.data.release_date}
            </span>
          </div>
          <div className="flex mb-1">
            <h3 className="text-red text-[16px] font-bold mr-3">Genders</h3>
            {props.data.genre_ids?.map((item) => {
              return (
                <Link to={`/discover/${props.data.media_type ? props.data.media_type : "movie"}/${item}`} key={item}>
                  <span className="text-white mr-2">
                    {genreMovieOrTv && genreMovieOrTv.find((genre) => genre.id === item)?.name}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
        <PlayButton link={link} size="large" onAddHistory={handlePlayButtonClick} />
      </div>
      <div className="mr-[60px] mobile:hidden md:block">
        <div className="container flex items-center justify-center lg:justify-start ">
          <button className="playBut sm:hidden md:block" onClick={clickPreviewHandler}>
            <PlayIcon />
          </button>
          <span className="ml-4 text-white xl:text-[20px] xl:tracking-widest sm:hidden md:block lg:text-[16px] lg:ml-2 lg:tracking-wide">
            WATCH TRAILER
          </span>
        </div>
      </div>
      {isShowModal && (
        <div
          className="absolute inset-0 flex items-center justify-center flex-col bg-[rgba(0,0,0,0.7)] sm:hidden md:flex"
          onClick={() => setIsShowModal(false)}
        >
          <div className="text-white lg:w-[900px] md:w-[500px] text-right">
            <i className="fa-solid fa-xmark" onClick={() => setIsShowModal(false)}></i>
          </div>
          <Youtube
            videoId={previewLink}
            className="lg:w-[900px] lg:h-[500px] md:w-[500px] md:h-[300px] sm:hidden md:block"
          ></Youtube>
        </div>
      )}
    </div>
  );
};

export default React.memo(BannerItem);
