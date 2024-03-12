import React from "react";

const Nav = ({ show, handleShowNav }) => {
  return (
    <nav
      onClick={() => handleShowNav(false)}
      className={show ? "show" : "hide"}
    >
      <div className="start-menu"></div>
    </nav>
  );
};

export default Nav;
