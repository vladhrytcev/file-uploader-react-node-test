import React from "react";
import DownloadItem from "./DownloadItem";
import Button from "@material-ui/core/Button";
import downloadIcon from "../assets/images/download.svg";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  button: {
    display: "flex",
    padding: "0 16px",
    justifyContent: "center",
    alignItems: "center",
    color: "#0e7d7d",
    fontWeight: "600",
    fontSize: 12,
    borderRadius: 3,
    border: "none",
    cursor: "pointer",
    textTransform: "none",
    background: "#fff",
  },
});

const DownloadContainer = ({
  parent,
  files,
  id,
  downloadFile,
  downloadOrOpenFile,
  downloadFolder,
  T,
}) => {
  const styles = useStyles();

  const downloadItem = (fileName) => {
    downloadFile({ linkId: id, parent, fileName });
  };

  const downloadOrOpenItem = (fileName) => {
    downloadOrOpenFile({ linkId: id, parent, fileName });
  };

  return (
    <div className="download-container">
      <div className="download-container-header">
        <div className="text">
          <p>{parent}&nbsp;&nbsp;</p>
          <p className="download-container-header-item-count">
            ({files.length})
          </p>
        </div>
        <Button
          className={styles.button}
          onClick={(e) => downloadFolder({ linkId: id, parent })}
        >
          <p>{T.downloadAll}</p>
          <img
            src={downloadIcon}
            alt="download"
            className="icon download-icon"
          />
        </Button>
      </div>
      <div className="pb-12">
        <div className="download-container-items">
          {files.length &&
            files.map((file, index) => (
              <DownloadItem
                download={downloadItem}
                downloadOrOpenItem={downloadOrOpenItem}
                fileName={file}
                key={index}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default DownloadContainer;
