import React, { useEffect, useRef, useState } from "react";

import DropFile from "../components/DropFile";
import { getLinks, uploadFiles, deleteLinks } from "../services/api";
import { InsertDriveFile, Close, Add } from "@material-ui/icons";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import CircularProgress from "@material-ui/core/CircularProgress";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core";
import T from "../localization";
import Visited from "../components/Visited";
import { copyToclipBoard } from "../utils/copyToClipboard";
import {getLoc, saveLoc} from "../utils/saveLoc";

const useStyles = makeStyles({
  root: {
    background: "#F7F7F7",
    borderRadius: 10,
    display: "flex",
    justifyContent: "space-between",
    padding: "7px 0px 7px 14px",
    width: "100%",
    marginBottom: 10,
    color: "#979797"
  },
  button: {
    background: "#FFFFFF",
    boxShadow: "0px 4px 5px rgba(0, 0, 0, 0.05)",
    borderRadius: 3,
    textTransform: "none",
    padding: "14px 24px",
    color: "#000",
    marginBottom: 40,
  },
  buttonClose: {
    boxShadow: "0px 4px 5px rgba(0, 0, 0, 0.05)",
    borderRadius: 3,
    padding: "8",
  },
  linkButton: {
    flexGrow: 1,
    background: "#0E7D7D",
    borderRadius: 3,
    textTransform: "none",
    padding: "13px",
    boxSizing: "border-box",
    color: "#fff",
    transition: "all .2s ease-in",
    "&:hover": {
      background: "#0E7D7D",
      opacity: 0.7,
    },
  },
  downloadLink: {
    color: "#0E7D7D",
    textTransform: "none",
  },
  iconAdd: {
    color: "#0E7D7D",
  },
  iconClose: {
    color: "#FF5B5B",
  },
  iconFile: {
    color: "#7AB8EC",
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

const options = ["EN", "ES", "RU"];

const AdminPage = () => {
  const [files, setFiles] = useState([]);
  const [dropVisible, setDropVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [downloadLink, setDownloadLink] = useState("");
  const [packageName, setPackageName] = useState("");
  const [language, setLanguage] = useState(getLoc());
  const [links, setLinks] = useState({});
  const classes = useStyles();
  const chooseFileRef = useRef(null);

  const removeLink = async (link) => {
    const newLinks = deleteLinks(link);
    setLinks(newLinks);
  };

  const chooseFile = () => {
    chooseFileRef.current.click();
  };

  const addFiles = (file, e) => {
    e.preventDefault();
    e.stopPropagation();
    const fileExist = files.find((f) => f.name === file[0].name);
    if (!fileExist) setFiles([...files, { data: file[0], name: file[0].name }]);
  };

  const upload = async () => {
    if (!files.length) return;
    try {
      setIsLoading(true);
      const data = new FormData();
      files.map((file) => data.append(packageName, file.data));
      const filePath = await uploadFiles(data);
      setDownloadLink(process.env.REACT_APP_URL + filePath.data);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteFile = (name) => {
    setFiles(files.filter((file) => file.name !== name));
  };

  const copyClipBoard = () => {
    if (window.navigator.clipboard) window.navigator.clipboard.writeText(downloadLink);
    else copyToclipBoard(downloadLink);
  };

  const changeLanguage = (lang) => {
    setLanguage(lang);
    T.setLanguage(lang);
    saveLoc(lang)
  };

  useEffect(() => {
    T.setLanguage(getLoc());
    (async () => {
      const track = await getLinks();
      setLinks(track.data);
    })();
  }, []);

  return (
    <div className="admin-page">
      <div className="admin-upload-files">
        <div className="admin-upload-files-container">
          <div
            className={`admin-upload-files-container-wrapper ${
              dropVisible ? "grow" : null
            }`}
          >
            <h1>{T.uploadFiles}</h1>
            <div className="upload-file-name">
              <Input
                className={classes.input}
                disableUnderline
                placeholder={T.fileNames}
                value={packageName}
                onChange={(e) => setPackageName(e.target.value)}
              />
              <Button
                className={classes.buttonClose}
                onClick={(e) => setPackageName("")}
              >
                <Close className={classes.iconClose} />
              </Button>
            </div>
            <div className="upload-file-container">
              <div className="upload-file-container-items">
                {files.length
                  ? files.map((file) => (
                      <Chip
                        key={file.name}
                        className={classes.root}
                        icon={<InsertDriveFile className={classes.iconFile} />}
                        label={file.name}
                        deleteIcon={<Close className={classes.iconClose} />}
                        onDelete={(e) => deleteFile(file.name)}
                      />
                    ))
                  : `${T.noFiles}`}
              </div>
              <Add className="drop-container-plus" onClick={chooseFile} />
              <input
                type="file"
                ref={chooseFileRef}
                className="fileInput"
                onChange={(e) => addFiles(e.target.files, e)}
              />
            </div>
            {dropVisible && (
              <DropFile addFiles={addFiles} label={T.dragnDrop} />
            )}
          </div>
          <div>
            <div>
              <Button
                onClick={(e) => setDropVisible(!dropVisible)}
                className={classes.button}
                endIcon={<Add className={classes.iconAdd} />}
              >
                {T.addFile}
              </Button>
            </div>
            {!isLoading ? (
              !downloadLink ? (
                <div className="d-flex">
                  <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    className={classes.select}
                    variant="outlined"
                    value={language}
                    onChange={(e) => changeLanguage(e.target.value)}
                    autoWidth
                  >
                    {options.map((option) => (
                      <MenuItem value={option} key={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                  <Button onClick={upload} className={classes.linkButton}>
                    {T.getLink}
                  </Button>
                </div>
              ) : (
                <div>
                  <p className="download-link-description">{T.yourLink}</p>
                  <div className="download-link-text">
                    <p>{downloadLink}</p>
                    <Button
                      className={classes.downloadLink}
                      onClick={copyClipBoard}
                    >
                      {T.copy}
                    </Button>
                  </div>
                </div>
              )
            ) : (
              <div className="progress">
                <CircularProgress />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="admin-upload-files">
        <div className="admin-upload-files-container overflow-y">
          <h1>{T.prevFiles}</h1>
          {Object.keys(links).length
            ? Object.entries(links).map((link) => (
                <Visited
                  key={link[0]}
                  link={link[0]}
                  linkT={T.link}
                  ips={link[1]}
                  ipsT={T.IPvisited}
                  removeLink={removeLink}
                />
              ))
            : null}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
