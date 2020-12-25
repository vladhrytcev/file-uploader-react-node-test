import React, { useEffect, useState } from "react";
import { getFileTree } from "../services/api";
import Footer from "../components/Footer";
import DownloadContainer from "../components/DownloadContainer";
import T from "../localization";

const ClientPage = () => {
  const [fileTree, setFileTree] = useState([]);

  useEffect(() => {
    (async () => {
      const files = await getFileTree();
      setFileTree(files.data);
    })();
  }, []);

  return (
    <>
      <div className="client-page">
        <h1>{T.clientFiles}</h1>
        {fileTree.length ? (
          fileTree.map((dir, index) => (
            <DownloadContainer
              parent={dir.dirName}
              files={dir.files}
              key={index}
            />
          ))
        ) : (
          <>{T.noClientFiles}</>
        )}
      </div>
      <Footer T={T} />
    </>
  );
};

export default ClientPage;
