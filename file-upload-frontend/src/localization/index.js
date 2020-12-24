import LocalizedStrings from 'react-localization';

export const loc = {
  EN: {
    addFile: "Add one more",
    noFiles: "No files added yet",
    fileNames: "File names",
    uploadFiles: "Upload files",
    getLink: "Get a download link",
    yourLink: "Your download link",
    copy: 'Copy',
    dragnDrop: "Drag and Drop files",
    prevFiles: "Previous files",
    link: "Link",
    IPvisited: "IP's visited"
  },
  ES: {
    addFile: "Añadir uno más",
    noFiles: "Aún no se agregaron archivos",
    fileNames: "Nombres de archivo",
    uploadFiles: "Subir archivos",
    getLink: "Obtener un enlace de descarga",
    yourLink: "Tu enlace de descarga",
    copy: "Copiar",
    dragnDrop: "Arrastra y suelta archivos",
    prevFiles: "Archivos anteriores",
    link: "Enlace",
    IPvisited: "IP's Visitó"
  },
  RU: {
    addFile: "Добавить файл",
    noFiles: "Нет файлов",
    fileNames: "Имена файлов",
    uploadFiles: "Загрузить файлы",
    getLink: "Получить ссылку",
    yourLink: "Ваша ссылка",
    copy: 'Копировать',
    dragnDrop: "Переместите файлы сюда",
    prevFiles: "Предыдущие файлы",
    link: "Ссылка",
    IPvisited: "Посещали"
  },
};

const T = new LocalizedStrings(loc)

export default T
