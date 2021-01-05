import React, { useEffect } from "react";

import Footer from "../components/Footer";
import DownloadContainer from "../components/DownloadContainer";
import T from "../localization";
import { LoopCircleLoading } from 'react-loadingg';

const ClientPage = ({
  downloadLink,
  isLoading,
  getDownloadLink,
  match,
  downloadFile,
  downloadOrOpenFile,
  downloadFolder,
}) => {
  useEffect(() => {
    if (!downloadLink) getDownloadLink(match.params.id);
    else {
      T.setLanguage(downloadLink.language);
    }
  }, [downloadLink]);

  return (
    <>
      {!isLoading ? (
        <>
          <div className="client-page">
            <h1>{T.clientFiles}</h1>
            {downloadLink &&
              Object.entries(downloadLink.fileTree).map((path, index) => (
                <DownloadContainer
                  T={T}
                  parent={path[0]}
                  files={path[1]}
                  key={index}
                  id={downloadLink.link}
                  downloadFile={downloadFile}
                  downloadFolder={downloadFolder}
                  downloadOrOpenFile={downloadOrOpenFile}
                />
              ))}
          </div>
          <Footer T={T} />
        </>
      ) : (
        <div className="progress-page">
          <LoopCircleLoading color="#0E7D7D" size="large" style={{width: 70, height: 70}}/>
        </div>
      )}
    </>
  );
};

export default ClientPage;
