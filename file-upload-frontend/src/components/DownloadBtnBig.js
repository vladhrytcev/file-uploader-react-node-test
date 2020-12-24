import React from "react";
import downloadIcon from "../assets/images/download.png";

const DownloadBtnBig = ({ download }) => {
  return (
    <button className="btn-big" onClick={download}>
      <p>Download all</p>
      <img src={downloadIcon} alt="" />
    </button>
  );
};

export default DownloadBtnBig;
