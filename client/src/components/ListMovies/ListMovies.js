import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import Movie from "../Movie/Movie";
import Wrapper from "../Wrapper/Wrapper";

const ListMovies = (props) => {
  const [movies, setMovies] = useState(null);

  useEffect(() => {
    if (props.data) {
      if (props.data.data) {
        setMovies(props.data.data);
      }
      if (props.data.results) {
        setMovies(props.data.results);
      }
    }
  }, [props.data]);
  return (
    <Wrapper className="pt-[100px] xl:pt-[50px] sm:pt-[10px]">
      <div className="flex items-center justify-between">
        <h2 className="text-white font-medium text-[26px] mb-3 xl:text-[20px] sm:text-[14px] mobile:text-[12px]">
          {props.titleList}
        </h2>
        <Link to="/" className="text-red text-5">
          View All
        </Link>
      </div>
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={5}
        slidesPerView={4}
        navigation
        loop
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        breakpoints={{
          1800: {
            slidesPerView: 4,
            spaceBetween: 5,
          },
          1536: {
            slidesPerView: 3,
            spaceBetween: 5,
          },
          1279: {
            slidesPerView: 2,
            spaceBetween: 0,
          },
          500: {
            slidesPerView: 2,
          },
          320: {
            slidesPerView: 1,
            spaceBetween: 2,
          },
        }}
      >
        {movies &&
          movies.map((movie) => (
            <SwiperSlide key={movie.id}>
              <Movie data={movie} mediaType={props.titleList} />
            </SwiperSlide>
          ))}
      </Swiper>
    </Wrapper>
  );
};

export default ListMovies;
