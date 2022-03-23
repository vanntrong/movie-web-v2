import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userActions } from "../../../redux/slice/UserSlice";
import { logoutUser } from "../../../api/auth";

const Modal = (props) => {
  const dispatch = useDispatch();
  const { userIsLoggedIn, user } = props;
  const navigate = useNavigate();
  const logoutHandler = async () => {
    setTimeout(async () => {
      await logoutUser();
      navigate("/");
      localStorage.removeItem("accessToken");
      dispatch(userActions.logoutUser());
    }, 1000);
  };
  return (
    <>
      {!userIsLoggedIn && (
        <div className="absolute w-[200px] top-[120%] right-0 bg-dark-03 py-2 border-[1px] border-solid modal rounded-lg">
          <Link to="/signup">
            <div className="text-gray border-b-[1px] border-b-dark-03 px-2 hover:text-red transition-color">
              Sign up
            </div>
          </Link>
          <Link to="/login">
            <div className="text-gray px-2 hover:text-red transition-color">Sign in</div>
          </Link>
        </div>
      )}
      {userIsLoggedIn && (
        <div className="absolute w-[200px] top-[120%] right-0 py-2 px-2 border-[1px] border-solid modal rounded-lg">
          <div className="flex items-center gap-x-2 hover:bg-[rgba(0,0,0,0.3)] rounded-lg px-2 py-2">
            <div className="w-[50px] h-[50px]">
              <img src={user.avatar} alt="user avatar" className="w-full h-full object-cover rounded-full" />
            </div>
            <Link to="/profile">
              <div className="text-white text-[18px] capitalize flex flex-col">
                <span>{user.displayName ? user.displayName : `${user.firstName} ${user.lastName}`}</span>
                <span className="text-[12px] text-gray">See your profile</span>
              </div>
            </Link>
          </div>
          <div className="border-t-[1px] border-[rgba(0,0,0,0.25)] mt-2 pt-2">
            <Link to="/watch-later">
              <div className="text-white px-2 py-2 hover:bg-[rgba(0,0,0,0.3)] rounded-lg flex items-center gap-x-2">
                <i className="fa-solid fa-clock ml-2"></i>
                <span className="text-[18px]">Watch Later</span>
              </div>
            </Link>
          </div>
          <div className="border-t-[1px] border-[rgba(0,0,0,0.25)] mt-2 pt-2">
            <div className="text-white px-2 py-2 hover:bg-[rgba(0,0,0,0.3)] rounded-lg flex items-center gap-x-2">
              <i className="fa-solid fa-heart ml-2"></i>
              <span className="text-[18px]">Favorites</span>
            </div>
          </div>
          <div className="border-t-[1px] border-[rgba(0,0,0,0.25)] mt-2 pt-2">
            <div
              className="text-white px-2 py-2 hover:bg-[rgba(0,0,0,0.3)] rounded-lg flex items-center gap-x-2"
              onClick={logoutHandler}
            >
              <i className="fa-solid fa-right-from-bracket ml-2"></i>
              <span className="text-[18px]">Log Out</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
