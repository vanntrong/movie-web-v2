import React, { useEffect, useState } from "react";
import BannerItem from "./BannerItem";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useSelector } from "react-redux";

const Banner = (props) => {
  const [moviesList, setMoviesList] = useState(null);
  const movies = useSelector(props.selector);
  const index = props.index ? props.index : 0;
  useEffect(() => {
    if (movies.length > 0) {
      setMoviesList(movies[index].data);
    }
  }, [setMoviesList, movies, index]);
  return (
    <>
      {movies.length > 0 && (
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={5}
          slidesPerView={1}
          navigation
          loop
          autoplay={{
            delay: 7000,
            disableOnInteraction: true,
            pauseOnMouseEnter: false,
          }}
          breakpoints={{
            320: {
              slidesPerView: 1,
              modules: [Pagination],
              pagination: {
                clickable: true,
              },
            },
          }}
        >
          {moviesList &&
            moviesList.map((movie) => {
              return (
                <SwiperSlide key={movie.id}>
                  <BannerItem data={movie} />
                </SwiperSlide>
              );
            })}
        </Swiper>
      )}
    </>
  );
};

export default Banner;
