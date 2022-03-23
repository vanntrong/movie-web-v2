import React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";

import "./featured.css";

const Featured = () => {
  return (
    <div className="featured">
      <div className="flex items-center justify-between text-gray-500">
        <h1 className="">Total Revenue</h1>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className="p-[20px] flex flex-col items-center justify-center gap-[15px]">
        <div>
          <CircularProgressbar value={70} text="70%" strokeWidth={5} className="w-[100px h-[100px]" />
        </div>
        <p className="font-medium text-gray-500">Total sales made today</p>
        <p className="text-[30px]">$420</p>
        <p className="font-light text-gray-500 text-center text-[12px]">
          Previous transactions processing. Last payments may not be included.
        </p>
        <div className="flex items-center justify-between w-full">
          <div className="item">
            <div className="item-title">Target</div>
            <div className="item-result negative">
              <KeyboardArrowDownIcon fontSize="small" />
              <div>$12.4k</div>
            </div>
          </div>
          <div className="item">
            <div className="item-title">Target</div>
            <div className="item-result positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small" />
              <div>$12.4k</div>
            </div>
          </div>
          <div className="item">
            <div className="item-title">Target</div>
            <div className="item-result positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small" />
              <div>$12.4k</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
