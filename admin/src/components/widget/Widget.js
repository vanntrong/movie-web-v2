import React from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";

import "./widget.css";
import { useStore } from "../../store";
import { Link } from "react-router-dom";

const Widget = ({ type }) => {
  let data;
  const numbersOfUser = useStore((state) => state.allUser.length);
  const amount = 100;
  const diff = 20;

  switch (type) {
    case "user":
      data = {
        title: "USERS",
        isMoney: false,
        to: "/users",
        link: "See all users",
        icon: (
          <PersonOutlinedIcon
            className="text-18px p-[5px] self-end rounded-[5px]"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "order":
      data = {
        title: "ORDERS",
        isMoney: false,
        to: "/orders",
        link: "View all orders",
        icon: (
          <ShoppingCartOutlinedIcon
            className="text-18px p-[5px] self-end rounded-[5px]"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "earning":
      data = {
        title: "EARNINGS",
        isMoney: true,
        to: "/earning",
        link: "View net earnings",
        icon: (
          <MonetizationOnOutlinedIcon
            className="text-18px p-[5px] self-end rounded-[5px]"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    case "balance":
      data = {
        title: "BALANCE",
        isMoney: true,
        to: "/balance",
        link: "See details",
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="text-18px p-[5px] self-end rounded-[5px]"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }
  return (
    <div className="widget mr-[20px] flex flex-1 p-[10px] justify-between rounded-[10px] h-[100px]">
      <div className="flex flex-col justify-between">
        <span className="font-bold text-[14px] color-[rgb(160,160,160)]">{data.title}</span>
        <span className="text-[28px] font-light">
          {data.isMoney && "$"} {type === "user" ? numbersOfUser : amount}
        </span>
        <Link to={data.to}>
          <span className="text-[12px] border-b-[1px] border-b-solid border-b-gray-200">{data.link}</span>
        </Link>
      </div>
      <div className="flex flex-col justify-between">
        <div className="flex items-center text-[14px] positive">
          <KeyboardArrowUpIcon />
          {diff} %
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
