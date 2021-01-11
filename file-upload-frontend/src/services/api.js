import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_URL,
  withCredentials: true,
});

export const downloadFile = async ({ linkId, parent, fileName, download }) => {
  return await api
    .get(`/download/${linkId}/${parent}/${fileName}`, { headers: { download } })
    .then((res) => res.data);
};

export const downloadFolder = async ({ linkId, parent }) => {
  return await api.get(`/download/${linkId}/${parent}`).then((res) => res.data);
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
    onUploadProgress: function (progressEvent) {
      let percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      console.log(percentCompleted);
    },
    timeout: 0,
    headers: {
      "Content-Type": "multipart/form-data",
      lang: data.lang,
    },
  });
};
