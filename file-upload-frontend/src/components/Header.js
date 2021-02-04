import React from "react";
import { Button, makeStyles } from "@material-ui/core";
import { deleteToken } from "../utils/localStorageHandler";
import logo from "../assets/images/logo.svg";

const useStyles = makeStyles({
  linkButton: {
    background: "#0E7D7D",
    borderRadius: 3,
    textTransform: "none",
    padding: "8px 15px",
    boxSizing: "border-box",
    color: "#fff",
    fontWeight: 600,
    transition: "all .2s ease-in",
    "&:hover": {
      background: "#0E7D7D",
      opacity: 0.7,
    },
  },
});

const Header = ({ isAuth, setIsAuth }) => {
  const classes = useStyles();

  const signOut = () => {
    setIsAuth(false)
    deleteToken()
  };

  return (
    <header className="header">
      <a href="/">
        <img src={logo} alt="logo" />
      </a>
      {isAuth && (
        <Button
          className={classes.linkButton}
          onClick={signOut}
        >
          Sign Out
        </Button>
      )}
    </header>
  );
};

export default Header;
