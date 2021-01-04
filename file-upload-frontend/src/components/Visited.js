import React from "react";
import "../assets/styles/components/visited-item.scss";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core";
import closeIcon from "../assets/images/icon_close.svg"

const useStyles = makeStyles({
  paper: {
    marginRight: 5,
    marginBottom: 5,
    boxSizing: 'border-box'
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
        <img src={closeIcon} alt="close" className="icon-close" onClick={(e) => removeLink(id)} />
      </div>
      <div className="visited-container-row align-items-none">
        <h3 className="grey second-row-m">IP's visited:</h3>
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
