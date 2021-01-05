export const downloadAction = (blob, fileName) => {
  const downloadUrl = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = downloadUrl;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
};

export const openPdfFile = (blob) => {
  const downloadUrl = window.URL.createObjectURL(blob);
  window.open(downloadUrl)
}

export const isPDF = (filename) => {
  return getFileExtension(filename) === "pdf"
}

const getFileExtension = (filename) => {
  const ext = /^.+\.([^.]+)$/.exec(filename);
  return ext === null ? "" : ext[1];
}
