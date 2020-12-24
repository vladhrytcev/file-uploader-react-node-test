import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_URL,
  timeout: 4000,
  withCredentials: true,
});

export const downloadFile = async (parent, fileName) => {
  return await api
    .get(`/download/${parent}/${fileName}`, { responseType: "blob" })
    .then((res) => {
      return new File([res.data], fileName);
    });
};

export const downloadFolder = async (parent) => {
  return await api
    .get(`/download/${parent}`, { responseType: "blob" })
    .then((res) => {
      return new File([res.data], parent);
    });
};

export const getFileTree = async () => {
  return await api.get("/");
};

export const getLinks = async () => {
  return await api.get("/links");
};

export const uploadFiles = async (files) => {
  return await api.post("/upload", files, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
