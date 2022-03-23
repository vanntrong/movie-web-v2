import React from "react";

import classes from "./Loading.module.css";

const Loading = () => {
  return (
    <div className="w-screen h-screen bg-dark-01 flex items-center justify-center">
      <div className={classes["circle-loading"]}></div>
    </div>
  );
};

export default Loading;
