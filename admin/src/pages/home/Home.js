import React from "react";
import Chart from "../../components/chart/Chart";
import Featured from "../../components/featured/Featured";
import NavBar from "../../components/Navbar/NavBar";
import SideBar from "../../components/Sidebar/SideBar";
import List from "../../components/table/Table";
import Widget from "../../components/widget/Widget";

import "./home.css";

const Home = () => {
  return (
    <div className="flex">
      <SideBar />
      <div className="flex-6">
        <NavBar />
        <div className="widgets flex p-[20px] gap-[20px]">
          <Widget type="user" />
          <Widget type="order" />
          <Widget type="earning" />
          <Widget type="balance" />
        </div>
        <div className="charts flex p-[20px] gap-[20px] p-y-[5px] p-x-[20px]">
          <Featured />
          <Chart title="Last 6 Month (Revenue)" aspect={2 / 1} />
        </div>
        <div className="listContainer">
          <div className="font-medium text-gray-500 mb-[15px]">Latest Transactions</div>
          <List />
        </div>
      </div>
    </div>
  );
};

export default Home;
