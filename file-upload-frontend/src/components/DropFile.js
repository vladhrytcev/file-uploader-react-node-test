import React from "react";
import { FileDrop } from "react-file-drop";
import { Add } from "@material-ui/icons";
import "../assets/styles/components/drop-file.scss";

export const DropFile = ({ addFiles, label }) => {
  return (
    <div className="drop-container">
      <FileDrop onDrop={(files, e) => addFiles(files, e)}>
        <p>{label}</p>
        <Add className="drop-container-plus" />
      </FileDrop>
    </div>
  );
};

export default DropFile;
