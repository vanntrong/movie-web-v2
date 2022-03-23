import React from "react";
import SideBar from "../../components/Sidebar/SideBar";
import NavBar from "../../components/Navbar/NavBar";

import "./list.css";
import DataTable from "../../components/datatable/DataTable";

const List = () => {
  return (
    <div className="list flex w-full">
      <SideBar />
      <div className="listContainer">
        <NavBar />
        <DataTable />
      </div>
    </div>
  );
};

export default List;
