import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { getDetail, getSeasonsTv, getSimilar } from "../api/movies";
import Header from "../components/Header/Header";
import StartRate from "../components/UI/StartRate/StartRate";
import { mediaPlayerUrl } from "../constant";
import ListMovies from "../components/ListMovies/ListMovies";
import EpisodeList from "../components/EpisodeList/EpisodeList";
import Footer from "../components/Footer/Footer";
import Wrapper from "../components/Wrapper/Wrapper";
import CommentList from "../components/Comments/CommentList";

const EpisodeCheckBox = (props) => {
  const [enteredSeason, setEnteredSeason] = useState(1);
  const [episodes, setEpisodes] = useState([]);
  const { seasons, id } = props;

  const changSeasonHandler = (e) => {
    setEnteredSeason(e.target.value);
  };

  useEffect(() => {
    async function getEpisodesTv() {
      const response = await getSeasonsTv(id, enteredSeason);
      setEpisodes(response.episodes);
    }
    getEpisodesTv();
    return () => {
      setEpisodes([]);
    };
  }, [id, enteredSeason]);

  return (
    <div>
      <select
        value={enteredSeason}
        onChange={changSeasonHandler}
        className="bg-dark-02 p-2 text-white mb-4 cursor-pointer"
      >
        {seasons &&
          seasons.map((season) => (
            <option className="select:bg-red" key={season.season_number} value={season.season_number}>
              Season {season.season_number}
            </option>
          ))}
      </select>
      <EpisodeList data={episodes} tvId={id} />
    </div>
  );
};

const WatchScreen = (props) => {
  const [detailMovie, setDetailMovie] = useState({});
  const [similarMovie, setSimilarMovie] = useState(null);
  const { mediaType } = props;
  const params = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  useEffect(() => {
    document.title = `The Movie - ${
      detailMovie.original_title ? detailMovie.original_title : detailMovie.original_name
    }`;
  }, [detailMovie.original_title, detailMovie.original_name]);

  let urlFrame = "";
  if (mediaType === "movie") {
    urlFrame = `${mediaPlayerUrl}${mediaType}?id=${params.id}`;
  } else {
    const season = queryParams.get("season");
    const episode = queryParams.get("episode");
    urlFrame = `${mediaPlayerUrl}${mediaType}?id=${params.id}&s=${season}&e=${episode}`;
  }

  useEffect(() => {
    const getDetailMovie = async () => {
      const response = await getDetail(mediaType, params.id);
      setDetailMovie(response);
    };

    const getSimilarMovie = async () => {
      const response = await getSimilar(mediaType, params.id);
      setSimilarMovie(response.data);
    };
    getDetailMovie();
    getSimilarMovie();
    return () => {};
  }, [mediaType, params.id, setDetailMovie, setSimilarMovie]);
  return (
    <>
      <Header />
      <div className="w-full lg:h-full lg:px-[100px] lg:pt-[100px] pb-[0] bg-dark-01">
        <iframe
          src={urlFrame}
          title="movie"
          className="w-full lg:h-[800px] h-[300px] sm:h-[500px]"
          frameborder="0"
          allowfullscreen="true"
        ></iframe>
      </div>
      <Wrapper>
        <h1 className="bg-[url('https://wordpress.iqonic.design/product/wp/streamit/wp-content/plugins/streamit-extensions/includes/Elementor/assets/img/texure.jpg')] movie-heading-lg text-[20px] font-medium lg:text-[50px] lg:font-black cursor-default">
          {detailMovie.original_title ? detailMovie.original_title : detailMovie.original_name}
        </h1>
        <StartRate vote_average={detailMovie.vote_average} vote_count={detailMovie.vote_count} />
        <p className="max-w-[600px] text-white text-[16px] mb-[35px] hidden md:block">
          {detailMovie.overview ? detailMovie.overview.slice(0, 200) + "..." : ""}
        </p>
        <div className="text-red text-[20px]">
          <i className="fa-solid fa-tags mr-2"></i>
          <span>TAGS</span>
          {detailMovie &&
            detailMovie.genres &&
            detailMovie.genres.map((genre) => {
              return (
                <Link to={`/discover/${mediaType}/${genre.id}`} key={genre.id}>
                  <span className="text-gray ml-3 lg:text-[18px] text-[14px]">{genre.name}</span>
                </Link>
              );
            })}
        </div>
        {mediaType === "tv" && <EpisodeCheckBox seasons={detailMovie.seasons} id={params.id} />}
        <CommentList media_type={mediaType} idMovie={params.id} />
      </Wrapper>
      <ListMovies titleList={`Similar ${mediaType}`} data={similarMovie} />
      <Footer />
    </>
  );
};

export default WatchScreen;
