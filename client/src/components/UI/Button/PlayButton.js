import React from "react";
import { Link } from "react-router-dom";

import "./PlayButton.css";

const PlayButton = (props) => {
  const classButton = `bg-red flex items-center justify-center hover:opacity-80 transition ease-in-out delay-150 play-button ${
    props.size === "large"
      ? "lg:w-[170px] lg:h-[50px] md:w-[150px] md:h-[50px] sm:w-[140px] sm:h-[40px] mobile:w-[120px] mobile:h-[40px]"
      : "lg:w-[135px] lg:h-[40px] md:w-[120px] md:h-[40px] sm:w-[100px] sm:h-[40px] mobile:w-[80px] mobile:h-[30px]"
  }`;
  const classSpan = `text-white ml-2 tracking-wide ${props.size === "large" ? "text-[16px]" : "text-[12px]"}`;
  return (
    <Link to={props.link} onClick={props.onAddHistory}>
      <button className={classButton}>
        <i className="fa-solid fa-play text-white mobile:text-[10px] sm:text-[14px] md:text-[16px]"></i>
        <span className={classSpan}>PLAY NOW</span>
      </button>
    </Link>
  );
};

export default PlayButton;
