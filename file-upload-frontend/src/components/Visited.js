import React from "react";
import "../assets/styles/components/visited-item.scss";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core";
import closeIcon from "../assets/images/icon_close.svg";
import { copyToclipBoard } from "../utils/copyToClipboard";

const useStyles = makeStyles({
  paper: {
    marginRight: 5,
    marginBottom: 5,
    boxSizing: "border-box",
  },
  paperLink: {
    transition: "all .2s ease-in",
    position: "relative",
    "&:hover": {
      backgroundColor: "#ccc",
      cursor: "pointer",
    },
    "&::after": {
      content: '"copied!"',
      fontSize: "16px",
      position: "absolute",
      top: -30,
      right: 0,
      opacity: 0,
    },
    "&:active::after": {
      opacity: 1,
    },
  },
});

const Visited = ({ link, ips, removeLink, id }) => {
  const classes = useStyles();

  return (
    <div className="visited-container">
      <div className="visited-container-row">
        <h3>Link:</h3>
        <div className="paper-container">
          <Paper
            elevation={0}
            className={classes.paperLink}
            onClick={(e) => copyToclipBoard(link)}
          >
            <h4>{link}</h4>
          </Paper>
        </div>
        <img
          src={closeIcon}
          alt="close"
          className="icon-close"
          onClick={(e) => removeLink(id)}
        />
      </div>
      <div className="visited-container-row align-items-none">
        <h3 className="grey second-row-m">IP's visited:</h3>
        <div className="paper-container">
          {ips.length
            ? ips.map((ip, index) => (
                <Paper
                  elevation={0}
                  key={index}
                  className={`${classes.paperLink} ${classes.paper}`}
                  onClick={(e) => copyToclipBoard(ip)}
                >
                  <p>{ip}</p>
                </Paper>
              ))
            : null}
        </div>
      </div>
    </div>
  );
};

export default Visited;
