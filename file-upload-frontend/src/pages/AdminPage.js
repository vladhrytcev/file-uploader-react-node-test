import React, { useEffect, useRef, useState } from "react";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core";
import Visited from "../components/Visited";
import { copyToclipBoard } from "../utils/copyToClipboard";
import FileStack from "../components/FileStack";
import addIcon from "../assets/images/plus_no_bg.svg"
import { loc } from '../localization'
import styled from 'styled-components';
import { history } from "../utils/history";

const StyledProgressBar = styled.div`
  width: ${({ progress }) => progress + "%"};
`;

const useStyles = makeStyles({
  root: {
    background: "#F7F7F7",
    borderRadius: 10,
    display: "flex",
    justifyContent: "space-between",
    padding: "7px 0px 7px 14px",
    width: "100%",
    marginBottom: 10,
    color: "#979797",
  },
  button: {
    maxWidth: "186px",
    background: "#FFFFFF",
    boxShadow: "0px 4px 5px rgba(0, 0, 0, 0.05)",
    borderRadius: 3,
    textTransform: "none",
    padding: "14px 24px",
    color: '#444444',
    marginBottom: 40,
    fontWeight: 600,
    fontSize: 12
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
    fontWeight: 600,
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
  select: {
    marginRight: 25,
    color: '#767676',
    fontWeight: 600,
  },
  input: {
    padding: "5px 0 5px 30px",
    width: "100%",
    background: "#F7F7F7",
    borderRadius: 3,
    fontSize: 14,
  },
  progressBarContainer:{
    width: "100%",
    display: "flex",
    height: "35px",
    marginBottom: "15px"
  },
  progressBar: {
    width: "90%",
    height: "35px",
    boxShadow: "0px 4px 5px rgba(0, 0, 0, 0.05)",
    borderRadius: "2px",
    marginBottom: "15px",
    backgroundColor: "#0e7d7d47",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: "14px"

  },
  progressBarInner: {
    transitionDuration: ".3s",
    background: "#0E7D7D",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    marginRight: "auto",
    borderRadius: "3px"
  },
  progress: {
    position: "absolute",
  },
  cancelBut: {
    height: "100%",
    color: "#fe5b5b",
    fontWeight: "bold",
    fontSize: "12px",
    marginLeft: "8px"
  },
  cancelText: {
    fontWeight: "bold",
    fontSize: "14px",
    marginBottom: "15px"
  }
});

const options = Object.keys(loc);

const defaultFileStack = { packageName: "", files: [], id: Date.now() };

const AdminPage = ({
  links,
  getLinks,
  uploadFiles,
  isLoading,
  resetLastCreateLink,
  lastCreated,
  deleteLink,
  isAuth
}) => {
  const [fileStacks, setFileStacks] = useState([defaultFileStack]);
  const [language, setLanguage] = useState(options[0]);
  const classes = useStyles();
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isCanceled, setIsCanceled] = useState(false);

  useEffect(() => {
    if(!isAuth) {
      history.push('/login')
    }
  },[])

  const cancelFileUpload = useRef(null);

  useEffect(()=>{
    if(fileStacks[0].files.length === 0){
      setUploadProgress(0);
    }
  },fileStacks);

  // TODO get rid of all this local bools, use pattern: request, success, failure
  // saga routines or something like this
  const upload = async () => {
    setIsCanceled(false);
    uploadFiles({ fileStacks, language, id: Date.now(), setUploadProgress: setUploadProgress, cancelFileUpload: cancelFileUpload });
  };

  const onCancelUpload = () => {
    if(cancelFileUpload.current) {
      cancelFileUpload.current("User has canceled the file upload.");
      setUploadProgress(0);
      setIsCanceled(true);
    }
  }

  const copyClipBoard = (e) => {
    if (window.navigator.clipboard)
      window.navigator.clipboard.writeText(lastCreated.address);
    else copyToclipBoard(lastCreated.address);
    e.target.innerText = "Copied";
  };

  const changeLanguage = (lang) => {
    setLanguage(lang);
  };

  const changePackageName = (id, name) => {
    const result = fileStacks.map((fileStack) => {
      if (fileStack.id === id) {
        return {
          ...fileStack,
          packageName: name,
        };
      } else return fileStack;
    });
    setFileStacks(result);
  };

  const setPackageFiles = (id, files) => {
    const result = fileStacks.map((fileStack) => {
      if (fileStack.id === id) {
        return {
          ...fileStack,
          files,
        };
      } else return fileStack;
    });
    setFileStacks(result);
    setIsCanceled(false);
  };

  const deleteFileStack = (id) => {
    if (fileStacks.length <= 1) return;
    setFileStacks(fileStacks.filter((fileStack) => fileStack.id !== id));
  };

  useEffect(() => {
    getLinks();
    return () => resetLastCreateLink();
  }, []);

  return (
    <div className="admin-page">
      <div className="admin-upload-files">
        <div className="admin-upload-files-container">
          <div className="admin-upload-files-container-wrapper">
            <h1>Upload files</h1>
            {fileStacks.map((fileStack) => (
              <FileStack
                key={fileStack.id}
                id={fileStack.id}
                packageName={fileStack.packageName}
                changeName={changePackageName}
                files={fileStack.files}
                setFiles={setPackageFiles}
                deleteFileStack={deleteFileStack}
              />
            ))}
            <Button
              className={classes.button}
              endIcon={<img src={addIcon} alt="add" className="add-icon-margin" />}
              onClick={(e) =>
                setFileStacks([
                  ...fileStacks,
                  { packageName: "", files: [], id: Date.now() },
                ])
              }
            >
              Add one more
            </Button>
            
            <div>
              {!isLoading ? (
                !lastCreated ? (
                  <div className="d-flex p-0">
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
                      Get a download link
                    </Button>
                  </div>
                ) : (
                  <>
                    <p className="download-link-description">
                      Your download link
                    </p>
                    <div className="download-link-text">
                      <p>{lastCreated.address}</p>
                      <Button
                        className={classes.downloadLink}
                        onClick={(e) => copyClipBoard(e)}
                      >
                        Copy
                      </Button>
                    </div>
                  </>
                )
              ) : (
                isLoading && fileStacks[0].files.length > 0 && uploadProgress < 100) &&
                <div className={classes.progressBarContainer}>
                  <div className={classes.progressBar}>
                    <span className={classes.progress}>{uploadProgress}%</span>
                    <StyledProgressBar className={classes.progressBarInner} progress={uploadProgress} />
                  </div>
                  <Button className={classes.cancelBut} onClick={onCancelUpload}>Cancel</Button>
                </div>}
              {isLoading && isCanceled && <span className={classes.cancelText}>User has canceled the file upload.</span>}
            </div>
          </div>
        </div>
      </div>

      <div className="admin-upload-files">
        <div className="admin-upload-files-container mw-70">
          <h1>Previous files</h1>
          {links.length
            ? links.map((link) => (
                <Visited
                  key={link._id}
                  id={link.link}
                  link={link.address}
                  ips={link.visited}
                  removeLink={deleteLink}
                />
              ))
            : null}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
