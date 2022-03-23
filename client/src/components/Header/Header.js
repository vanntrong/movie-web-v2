import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import HeaderNav from "./HeaderNav";
import Modal from "../UI/Modal/Modal";
import { $userIsLoggedIn, $userSelector } from "../../redux/selector";

import "./index.css";

const Header = () => {
  const [searchInput, setSearchInput] = useState("");
  const [isOpenSearchBox, setIsOpenSearchBox] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const [isShowHamburgerMenu, setIsShowHamburgerMenu] = useState(false);
  const user = useSelector($userSelector);
  const isLoggedIn = useSelector($userIsLoggedIn);
  const navigate = useNavigate();
  const buttonSearchClickHandler = () => {
    setIsOpenSearchBox(!isOpenSearchBox);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    navigate("/search?q=" + searchInput);
  };
  const buttonUserClickHandler = () => {
    setIsShowModal(!isShowModal);
  };
  const hamburgerClickHandler = () => {
    setIsShowHamburgerMenu(!isShowHamburgerMenu);
  };
  return (
    <>
      <header className="flex justify-between items-center bg-dark-03 fixed w-full md:px-[100px] md:py-[20px] sm:px-[20px] mobile:px-[10px] mobile:py-[5px] mobile:min-w-screen z-50 sm:max-w-[100%]">
        <Link to="/">
          <div className="sm:w-[160px] sm:h-[40px] mobile:w-[80px] mobile:flex mobile:items-center mobile:justify-center">
            <img src="https://vtcinema.herokuapp.com/image/logo.png" alt="logo" />
          </div>
        </Link>
        <HeaderNav className="sm:hidden mobile:hidden" />
        <div className="flex items-center relative">
          {isOpenSearchBox && (
            <form className="mr-2 absolute right-[80px]" onSubmit={submitHandler}>
              <input
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                type="text"
                placeholder="Search..."
                className="outline-none block p-[8px] rounded-[30px] bg-inherit text-white border-white border-solid border-[1px]"
              />
            </form>
          )}
          <div className="text-[18px] font-bold cursor-pointer" onClick={buttonSearchClickHandler}>
            <i className="fa-solid fa-magnifying-glass text-gray"></i>
          </div>
          <div className="ml-[18px] cursor-pointer relative w-[40px] h-[40px]" onClick={buttonUserClickHandler}>
            <img
              src={
                user && user.avatar
                  ? user.avatar
                  : "https://wordpress.iqonic.design/product/wp/streamit/wp-content/themes/streamit-theme/assets/images/redux/user.png"
              }
              alt="user-avatar"
              className="w-full h-full rounded-full object-cover"
            />
            {isShowModal && <Modal userIsLoggedIn={isLoggedIn} user={user} />}
          </div>
          <div className="text-white lg:hidden ml-[18px] text-[20px]">
            <div onClick={hamburgerClickHandler}>
              <i className="fa-solid fa-bars"></i>
            </div>
          </div>
        </div>
        {isShowHamburgerMenu && (
          <div className="absolute bg-dark-01 top-[100%] w-[95%] px-3 pr-3 header-nav-mobile">
            <HeaderNav className="sm:flex" />
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
