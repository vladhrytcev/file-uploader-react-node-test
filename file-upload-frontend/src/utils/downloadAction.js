export const downloadAction = (downloadUrl, fileName) => {
  const ext = fileName.split('.').pop().slice(0,3)
  const link = document.createElement("a");
  link.href = `${process.env.REACT_APP_DOWNLOAD_URL}${downloadUrl}`;

  if(ext === 'pdf') link.target = '_blank'
  link.download = fileName.split('?')[0];
  document.body.appendChild(link);
  link.click();
  link.remove();
};