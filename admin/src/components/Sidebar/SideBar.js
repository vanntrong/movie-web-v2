import React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useNavigate } from "react-router-dom";

import "./sidebar.css";
import { useStore } from "../../store";

const SideBar = () => {
  const navigate = useNavigate();
  const isLoggedIn = useStore((state) => state.isLoggedIn);
  const logoutUser = useStore((state) => state.logoutUser);
  const logoutHandler = () => {
    logoutUser();
    navigate("/");
  };
  return (
    <div className="flex-2 border-r-[0.5px] border-r-solid border-r-gray-100 min-h-screen">
      <Link to="/">
        <div className="h-[50px] flex items-center justify-center">
          <span className="text-[20px] font-bold text-[#6439ff]">Movie Web Admin</span>
        </div>
      </Link>
      <hr className="h-0 border-[0.5px] border-solid border-gray-100" />
      <div className="pl-[10px]">
        <ul>
          <p className="title">MAIN</p>
          <li>
            <DashboardIcon className="icon" />
            <span>Dashboard</span>
          </li>
          <p className="title">LISTS</p>
          <Link to="/users" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Users</span>
            </li>
          </Link>
          <Link to="/products" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Products</span>
            </li>
          </Link>
          <li>
            <CreditCardIcon className="icon" />
            <span>Orders</span>
          </li>
          <li>
            <LocalShippingIcon className="icon" />
            <span>Delivery</span>
          </li>
          <p className="title">USEFUL</p>
          <li>
            <InsertChartIcon className="icon" />
            <span>Stats</span>
          </li>
          <li>
            <NotificationsNoneIcon className="icon" />
            <span>Notifications</span>
          </li>
          <p className="title">SERVICE</p>
          <li>
            <SettingsSystemDaydreamOutlinedIcon className="icon" />
            <span>System Health</span>
          </li>
          <li>
            <PsychologyOutlinedIcon className="icon" />
            <span>Logs</span>
          </li>
          <li>
            <SettingsApplicationsIcon className="icon" />
            <span>Settings</span>
          </li>
          <p className="title">USER</p>
          <li>
            <AccountCircleOutlinedIcon className="icon" />
            <span>Profile</span>
          </li>
          <li>
            {!isLoggedIn ? (
              <Link to="/login">
                <LoginIcon className="icon" />
                <span>Login</span>
              </Link>
            ) : (
              <>
                <div onClick={logoutHandler}>
                  <LogoutIcon className="icon" />
                  <span>Logout</span>
                </div>
              </>
            )}
          </li>
        </ul>
      </div>
      <div className="flex items-center m-[10px]">
        <div className="w-[20px] h-[20px] rounded-[5px] border-[1px] border-[#7451f8] bg-slate-200 mr-[10px]"></div>
        <div className="w-[20px] h-[20px] rounded-[5px] border-[1px] border-[#7451f8] bg-[#333]"></div>
      </div>
    </div>
  );
};

export default SideBar;
