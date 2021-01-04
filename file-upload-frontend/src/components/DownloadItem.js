import React from "react";
import Button from "@material-ui/core/Button";
import fileIcon from "../assets/images/file.svg";
import downloadIcon from "../assets/images/download.svg";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  button: {
    cursor: "pointer",
    marginLeft: 11,
    marginRight: 19,
    padding: "0 16px",
    border: "none",
    borderRadius: 10,
    textTransform: "none",
    background: "#fff",
    minWidth: 'initial'
  },
});

const DownloadItem = ({ fileName, download }) => {
  const styles = useStyles();

  return (
    <div className="download-item">
      <div className="download-item-file">
        <img src={fileIcon} alt="file" />
        <p>{fileName}</p>
      </div>
      <Button className={styles.button} onClick={(e) => download(fileName)}>
        <img src={downloadIcon} alt="download" />
      </Button>
    </div>
  );
};

export default DownloadItem;
