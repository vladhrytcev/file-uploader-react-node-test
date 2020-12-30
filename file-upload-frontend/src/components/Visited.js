import React from "react";
import { Close } from "@material-ui/icons";
import "../assets/styles/components/visited-item.scss";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  iconClose: {
    color: "#FF5B5B",
    alignSelf: "flex-start",
    cursor: "pointer",
    fontSize: "1.2em",
  },
  paper: {
    marginRight: 10,
  },
});

const Visited = ({ link, ips, removeLink, id }) => {
  const classes = useStyles();

  return (
    <div className="visited-container">
      <div className="visited-container-row">
        <h3>Link:</h3>
        <div className="paper-container">
          <Paper elevation={0}>
            <h4>{link}</h4>
          </Paper>
        </div>
        <Close
          className={classes.iconClose}
          onClick={(e) => removeLink(id)}
        />
      </div>
      <div className="visited-container-row">
        <h3 className="grey">IP's visited:</h3>
        <div className="paper-container">
          {ips.length
            ? ips.map((ip, index) => (
                <Paper elevation={0} key={index} className={classes.paper}>
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
