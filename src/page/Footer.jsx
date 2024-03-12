import React from "react";

const Footer = ({ handleShowNav }) => {
  return (
    <footer>
      <button onClick={handleShowNav}>OS</button>
    </footer>
  );
};

export default Footer;
