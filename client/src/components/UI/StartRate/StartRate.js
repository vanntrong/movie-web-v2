import React from "react";

const StartRate = (props) => {
  const starts = [];
  for (let i = 0; i < Math.floor(props.vote_average); i++) {
    starts.push(<i key={i} className="fa-solid fa-star text-red mr-1"></i>);
  }
  return (
    <div className={`mb-[32px] ${props.className}`}>
      {starts}
      <span className="text-white ml-2">
        {props.vote_average} ({props.vote_count} votes)
      </span>
    </div>
  );
};

export default StartRate;
