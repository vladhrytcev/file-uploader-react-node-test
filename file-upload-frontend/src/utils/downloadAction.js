export const downloadAction = (downloadUrl, fileName) => {
  // const ext = fileName.split('.').pop()
  // const link = document.createElement("a");
  // link.href = `${process.env.REACT_APP_DOWNLOAD_URL}${downloadUrl}`;

  window.open(`${process.env.REACT_APP_DOWNLOAD_URL}${downloadUrl}`, '_blank')

  // console.log(ext)
  // console.log(`${process.env.REACT_APP_DOWNLOAD_URL}${downloadUrl}`)
  // console.log(fileName)
  // if(ext === 'pdf') link.target = '_blank'
  // link.download = fileName;
  // document.body.appendChild(link);
  // link.click();
  // link.remove();
};