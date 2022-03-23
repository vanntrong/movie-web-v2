import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";

import Episode from "./Episode";

const EpisodeList = (props) => {
  return (
    <>
      <Swiper
        modules={[Navigation]}
        spaceBetween={0}
        navigation
        breakpoints={{
          320: {
            slidesPerView: 1,
          },
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
          1800: {
            slidesPerView: 4,
          },
        }}
      >
        {props.data &&
          props.data.map((episode, index) => (
            <SwiperSlide key={index}>
              <Episode data={episode} tvId={props.tvId}></Episode>
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  );
};

export default EpisodeList;
