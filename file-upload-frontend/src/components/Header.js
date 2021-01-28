import React from "react";
import logo from "../assets/images/logo.svg";

const Header = () => {
  return (
    <header className="header">
      <a href="/">
        <img src={logo} alt="logo" />
      </a>
    </header>
  );
};

export default Header;
