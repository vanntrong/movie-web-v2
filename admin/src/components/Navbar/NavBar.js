import React from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import { defaultUserImg } from "../../constant";

import "./navbar.css";
import { useStore } from "../../store";

const NavBar = () => {
  const currentUser = useStore((state) => state.currentUser);
  const isLoggedIn = useStore((state) => state.isLoggedIn);
  return (
    <div className="h-[50px] border-b-[0.5px] border-b-solid border-b-gray-100 flex items-center text-[14px] text-[#555]">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center border-[0.5px] border-solid border-gray-100 p-[3px]">
          <input type="text" placeholder="Search..." className="border-0 outline-0 bg-transparent" />
          <SearchOutlinedIcon />
        </div>
        <div className="flex items-center">
          <div className="item">
            <LanguageOutlinedIcon className="icon" />
            English
          </div>
          <div className="item">
            <DarkModeOutlinedIcon
              className="icon"
              // onClick={() => dispatch({ type: "TOGGLE" })}
            />
          </div>
          <div className="item">
            <FullscreenExitOutlinedIcon className="icon" />
          </div>
          <div className="item relative">
            <NotificationsNoneOutlinedIcon className="icon" />
            <div className="counter">1</div>
          </div>
          <div className="item relative">
            <ChatBubbleOutlineOutlinedIcon className="icon" />
            <div className="counter">2</div>
          </div>
          <div className="item">
            <ListOutlinedIcon className="icon" />
          </div>
          <div className="item">
            <img src={isLoggedIn ? currentUser.avatar : defaultUserImg} alt="" className="avatar" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
