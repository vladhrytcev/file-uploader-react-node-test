import React from "react";
import DownloadBtnBig from "./DownloadBtnBig";
import DownloadItem from "./DownloadItem";
import { downloadAction } from "../utils/downloadAction";
import { downloadFile, downloadFolder } from "../services/api";

const DownloadContainer = ({ parent, files }) => {

  const downloadItem = async (fileName) => {
    const blob = await downloadFile(parent, fileName)
    downloadAction(blob, fileName);
  };

  const downloadAll = async () => {
    const blob = await downloadFolder(parent)
    downloadAction(blob, `${parent}.zip`);
  };

  return (
    <div className="download-container">
      <div className="download-container-header">
        <div className="text">
          <p>First part -name of files&nbsp;</p>
          <p className="download-container-header-item-count">
            ({files.length})
          </p>
        </div>
        <DownloadBtnBig download={downloadAll} />
      </div>
      <div className="download-container-items">
        {files.length &&
          files.map((file, index) => (
            <DownloadItem download={downloadItem} fileName={file} key={index} />
          ))}
      </div>
    </div>
  );
};

export default DownloadContainer;
