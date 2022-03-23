import React from "react";
import { NavLink } from "react-router-dom";

const HeaderNav = (props) => {
  const activeClassName = ({ isActive }) =>
    "text-[18px] ease-in duration-300 font-medium " + (isActive ? "text-red" : "text-gray hover:text-red");
  const classes = props.className;
  return (
    <nav className="sm:py-[10px]">
      <ul className={`lg:flex lg:flex-row gap-x-[22px]  sm:flex-col sm:gap-y-[15px] ${classes}`}>
        <li>
          <NavLink to="/" className={activeClassName}>
            HOME
          </NavLink>
        </li>
        <li>
          <NavLink to="/movie" className={activeClassName}>
            MOVIE
          </NavLink>
        </li>
        <li>
          <NavLink to="/tv" className={activeClassName}>
            TV SHOWS
          </NavLink>
        </li>
        <li>
          <NavLink to="/history" className={activeClassName}>
            HISTORY
          </NavLink>
        </li>
        <li>
          <NavLink to="/watch-later" className={activeClassName}>
            WATCH LATER
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default HeaderNav;
