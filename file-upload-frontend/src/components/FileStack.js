import React, { useRef } from "react";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import { Add, Close } from "@material-ui/icons";
import fileIcon from "../assets/images/file.png";
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
    width: "100%",
    marginBottom: 10,
    color: "#979797",
    boxSizing: 'initial'
  },
  buttonClose: {
    boxShadow: "0px 4px 5px rgba(0, 0, 0, 0.05)",
    borderRadius: 3,
    padding: 8,
  },
  iconAdd: {
    color: "#0E7D7D",
  },
  iconClose: {
    width: "1em",
    height: "1em",
    fontSize: "1.2rem",
    color: "#FF5B5B",
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

  const nameCutter = (str) => {
    if(str.length > 40) return str.slice(0, 40).concat("..." + str.split(".")[1])
    else return str
  }

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
              <Close className={classes.iconClose} />
            </Button>
          </div>
          <div className="drop-container">
            <FileDrop onDrop={(files, e) => addFiles(files, e)}>
              <p>Drag & drop files</p>
              <Add className="drop-container-plus" onClick={chooseFile} />
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
              <Close className={classes.iconClose} />
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
                          label={nameCutter(file.name)}
                          deleteIcon={<Close className={classes.iconClose} />}
                          onDelete={(e) => deleteFile(file.name)}
                        />
                      ))
                    : null}
                </div>
                <Add className="drop-container-plus" onClick={chooseFile} />
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
