import React from "react";
import logo from "../assets/images/logo.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      <img src={logo} alt="logo" />
      <Link to={"/client"}>to Client Page</Link>
    </header>
  );
};

export default Header;
