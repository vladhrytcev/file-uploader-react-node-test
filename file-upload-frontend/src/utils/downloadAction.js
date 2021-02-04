export const downloadAction = (downloadUrl, fileName) => {
  const ext = fileName.split('.').pop()
  const url = `${process.env.REACT_APP_DOWNLOAD_URL}${downloadUrl}`;
  if(ext === 'pdf') {
    window.open(url, '_blank')
  } else window.open(url)
};