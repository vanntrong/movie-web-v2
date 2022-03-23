import React from "react";
import SideBar from "../../components/Sidebar/SideBar";
import NavBar from "../../components/Navbar/NavBar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import moment from "moment";

import "./single.css";
import { useStore } from "../../store";
import { useParams } from "react-router-dom";

const Single = () => {
  const params = useParams();
  const allUser = useStore((state) => state.allUser);
  const selectUser = allUser.find((user) => user._id === params.userId);
  return (
    <div className="flex w-full">
      <SideBar />
      <div className="singleContainer">
        <NavBar />
        <div className="p-[20px] flex gap-[20px]">
          <div className="left">
            <button className="editButton">Edit</button>
            <h1 className="text-[20px] font-bold text-gray-500">Information</h1>
            <div className="item">
              <img src={selectUser?.avatar} alt="" className="itemImg" />
              <div className="text-left">
                <h1 className="mb-[10px] text-[20px] font-bold text-[#555]">
                  {selectUser?.firstName + selectUser?.lastName}
                </h1>
                <div className="detailItem">
                  <span className="itemKey">Username:</span>
                  <span className="itemValue">
                    {selectUser?.provider === "local" ? selectUser?.username : selectUser?.provider}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Start date:</span>
                  <span className="itemValue">{moment(selectUser?.createAt).format("DD/MM/YYYY")}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Address:</span>
                  <span className="itemValue">Elton St. 234 Garden Yd. NewYork</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Country:</span>
                  <span className="itemValue">Viet Nam</span>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
          </div>
        </div>
        <div className="bottom">
          <List />
        </div>
      </div>
    </div>
  );
};

export default Single;
