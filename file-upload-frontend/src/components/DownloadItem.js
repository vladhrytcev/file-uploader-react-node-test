import React from "react";
import fileIcon from "../assets/images/file.png";
import downloadIcon from "../assets/images/download.png";

const DownloadItem = ({ fileName, download }) => {
  return (
    <div className="download-item">
      <div className="download-item-file">
        <img src={fileIcon} alt="file" />
        <p>{fileName}</p>
      </div>
      <button className="download-item-btn" onClick={e => download(fileName)}>
        <img src={downloadIcon} alt="download" />
      </button>
    </div>
  );
};

export default DownloadItem;
