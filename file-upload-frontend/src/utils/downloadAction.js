export const downloadAction = (downloadUrl, fileName) => {
  const link = document.createElement("a");
  link.href = `${process.env.REACT_APP_DOWNLOAD_URL}${downloadUrl}`;
  link.download = fileName;
  link.target = '_blank'
  document.body.appendChild(link);
  link.click();
  link.remove();
};