import React, { useRef } from "react";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import closeIcon from "../assets/images/icon_close.svg"
import addIcon from "../assets/images/plus.svg"
import fileIcon from "../assets/images/file.svg";
import Chip from "@material-ui/core/Chip";
import { makeStyles } from "@material-ui/core";
import { FileDrop } from "react-file-drop";
import "../assets/styles/components/drop-file.scss";

const useStyles = makeStyles({
  root: {
    background: "#F7F7F7",
    borderRadius: 10,
    display: "flex",
    justifyContent: "space-between",
    padding: "5px 0px 5px 14px",
    marginBottom: 10,
    color: "#979797",
    boxSizing: 'initial',
    "&:last-child": {
      marginBottom: 0,
    },
  },
  buttonClose: {
    boxShadow: "0px 4px 5px rgba(0, 0, 0, 0.05)",
    borderRadius: 3,
    padding: 14.5,
    minWidth: 'initial'
  },
  iconAdd: {
    color: "#0E7D7D",
  },
  select: {
    display: "table",
    marginRight: 25,
  },
  input: {
    padding: "5px 0 5px 30px",
    width: "100%",
    background: "#F7F7F7",
    borderRadius: 3,
    fontSize: 14,
  },
});

const FileStack = ({
  packageName,
  changeName,
  id,
  setFiles,
  files,
  deleteFileStack,
}) => {
  const classes = useStyles();

  const chooseFileRef = useRef(null);

  const chooseFile = () => {
    chooseFileRef.current.click();
  };

  const addFiles = (filesChosen, e) => {
    e.preventDefault();
    e.stopPropagation();
    const newFiles = [];
    for (let i = 0; i < filesChosen.length; i++) {
      const fileExist = files.find((f) => f.name === filesChosen[i].name);
      if (!fileExist)
        newFiles.push({ data: filesChosen[i], name: filesChosen[i].name });
    }
    setFiles(id, [...files, ...newFiles]);
  };

  const deleteFile = (name) => {
    setFiles(
      id,
      files.filter((file) => file.name !== name)
    );
  };

  return (
    <div>
      {!files.length ? (
        <>
          <div className="upload-file-name">
            <Input
              className={classes.input}
              disableUnderline
              placeholder="File names"
              value={packageName}
              onChange={(e) => changeName(id, e.target.value)}
            />
            <Button
              className={classes.buttonClose}
              onClick={(e) => deleteFileStack(id)}
            >
              <img src={closeIcon} alt="close" />
            </Button>
          </div>
          <div className="drop-container">
            <FileDrop onDrop={(files, e) => addFiles(files, e)}>
              <p>Drag & drop files</p>
              <img src={addIcon} alt="add" className="drop-container-plus" onClick={chooseFile}/>
            </FileDrop>
          </div>
        </>
      ) : (
        <>
          <div className="upload-file-name">
            <Input
              className={classes.input}
              disableUnderline
              placeholder="File names"
              value={packageName}
              onChange={(e) => changeName(id, e.target.value)}
            />
            <Button
              className={classes.buttonClose}
              onClick={(e) => deleteFileStack(id)}
            >
              <img src={closeIcon} alt="close" />
            </Button>
          </div>
          <div className="drop-container with-files">
            <FileDrop onDrop={(files, e) => addFiles(files, e)}>
              <div className="d-flex">
                <div className="upload-file-container-items">
                  {files.length
                    ? files.map((file) => (
                        <Chip
                          key={file.name}
                          className={classes.root}
                          icon={<img src={fileIcon} alt="file" />}
                          label={file.name}
                          deleteIcon={<img src={closeIcon} className="wh-0 icon-close-margin" alt="close" />}
                          onDelete={(e) => deleteFile(file.name)}
                        />
                      ))
                    : null}
                </div>
                <img src={addIcon} alt="add" className="drop-container-plus" onClick={chooseFile}/>
              </div>
            </FileDrop>
          </div>
        </>
      )}
      <input
        type="file"
        multiple
        ref={chooseFileRef}
        className="fileInput"
        onChange={(e) => addFiles(e.target.files, e)}
      />
    </div>
  );
};

export default FileStack;
