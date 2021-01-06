import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_URL,
  timeout: 10000,
  withCredentials: true,
});

export const downloadFile = async ({linkId, parent, fileName}) => {
  return await api
    .get(`/download/${linkId}/${parent}/${fileName}`, { responseType: "blob" })
    .then((res) => {
      return new File([res.data], fileName);
    });
};

export const downloadFolder = async ({linkId, parent}) => {
  return await api
    .get(`/download/${linkId}/${parent}`, { responseType: "blob" })
    .then((res) => {
      return new File([res.data], parent);
    });
};

export const getFileTree = async (id) => {
  return await api.get(`/files/${id}`);
};

export const getLinks = async () => {
  return await api.get("/links");
};

export const deleteLink = async (id) => {
  return await api.delete(`/link/${id}`);
};

export const uploadFiles = async (data) => {
  return await api.post(`/upload/${data.id}`, data.files, {
    onUploadProgress: function(progressEvent) {
      let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
      console.log(percentCompleted)
    },
    timeout: 0,
    headers: {
      "Content-Type": "multipart/form-data",
      lang: data.lang
    },
  });
};
