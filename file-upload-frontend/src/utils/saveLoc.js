const appName = "file-uploader-app";

export const saveLoc = (lang) => {
  localStorage.setItem(appName, lang);
};

export const getLoc = () => {
  if (localStorage.getItem(appName)) return localStorage.getItem(appName);
  else return "EN";
};
