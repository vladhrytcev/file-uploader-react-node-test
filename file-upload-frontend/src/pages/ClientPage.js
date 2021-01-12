import React, { useEffect } from "react";

import Footer from "../components/Footer";
import DownloadContainer from "../components/DownloadContainer";
import T from "../localization";
import { LoopCircleLoading } from "react-loadingg";

const ClientPage = ({
  downloadLink,
  isLoading,
  getDownloadLink,
  match,
  downloadFile,
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
      <div className="client-page">
        <h1>{T.clientFiles}</h1>
        {isLoading ? (
          <>
            <div className="progress-page">
              <LoopCircleLoading color="#0E7D7D" size="large" />
            </div>
            <h3>{T.prepToDownload}</h3>
          </>
        ) : downloadLink &&
          Object.entries(downloadLink.fileTree).map((path, index) => (
            <DownloadContainer
              T={T}
              parent={path[0]}
              files={path[1]}
              key={index}
              id={downloadLink.link}
              downloadFile={downloadFile}
              downloadFolder={downloadFolder}
            />
          ))}
      </div>
      <Footer T={T} />
    </>
  );
};

export default ClientPage;
