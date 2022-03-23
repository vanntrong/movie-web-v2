import React, { useEffect } from "react";
import Wrapper from "../Wrapper/Wrapper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import classes from "./index.module.css";

import { backdropImageUrl } from "../../constant";
import MovieSlideTop from "../Movie/MovieSlideTop";

const ListMoviesTop = (props) => {
  const { data: listMovies } = props;
  const [backgroundImgUrl, setBackgroundImgUrl] = React.useState();

  useEffect(() => {
    if (listMovies) {
      setBackgroundImgUrl(`${backdropImageUrl}/${listMovies.data[0].backdrop_path}`);
    }
  }, [listMovies]);

  const handlerSliceActive = (index) => {
    setBackgroundImgUrl(`${backdropImageUrl}/${listMovies.data[index].backdrop_path}`);
  };
  return (
    <Wrapper>
      <h2 className="text-white lg:text-[20px] mb-2 sm:text-[14px] md:text-[16px] font-medium">{`${props.titleList} in United States`}</h2>
      <div
        style={{
          backgroundImage: `url("${backgroundImgUrl}")`,
        }}
        className={`w-full h-full text-white p-4 h-[700px] bg-cover bg-center object-cover ease-in duration-300 ${classes.moviesListTop}`}
      >
        <Swiper
          direction={"vertical"}
          pagination={{
            clickable: true,
          }}
          onSlideChange={(swiper) => handlerSliceActive(swiper.realIndex)}
          slideToClickedSlide={true}
          navigation={true}
          spaceBetween={2}
          slidesPerView={3}
          modules={[Pagination, Navigation, Autoplay]}
          autoplay={{
            delay: 3500,
          }}
          breakpoints={{
            1536: {
              slidesPerView: 3,
            },
            1280: {
              slidesPerView: 3,
            },
            640: {
              slidesPerView: 4,
            },
          }}
          className="h-full"
        >
          {listMovies &&
            listMovies.data.map((movie) => (
              <SwiperSlide key={movie.id}>
                {({ isActive }) => {
                  return <MovieSlideTop isActive={isActive} data={movie} />;
                }}
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </Wrapper>
  );
};

export default ListMoviesTop;
