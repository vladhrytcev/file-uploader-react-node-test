import React, { useEffect, useState } from "react";
import { getFileTree } from "../services/api";
import Footer from "../components/Footer";

import DownloadContainer from "../components/DownloadContainer";

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
        <h1>We have prepared the files for you!</h1>
        {fileTree.length
          ? fileTree.map((dir, index) => (
              <DownloadContainer
                parent={dir.dirName}
                files={dir.files}
                key={index}
              />
            ))
          : "There's no files on server yet..."}
      </div>
      <Footer />
    </>
  );
};

export default ClientPage;
