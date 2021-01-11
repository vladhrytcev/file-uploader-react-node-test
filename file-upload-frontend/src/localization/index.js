import LocalizedStrings from 'react-localization';

export const loc = {
  EN: {
    clientFiles: "We have prepared the files for you!",
    contactUs: "Contact Us on ",
    or: "or",
    questions: "if you have any questions.",
    noClientFiles: "There's no files on server yet...",
    downloadAll: "Download all",
    prepToDownload: "Preparing to download..."
  },
  ES: {
    clientFiles: "¡Hemos preparado los archivos para ti!",
    contactUs: "Contacta con nosotros en ",
    or: "o",
    questions: "si tienes alguna pregunta.",
    noClientFiles: "Aún no hay archivos en el servidor ...",
    downloadAll: "Descargar todo",
    prepToDownload: "Preparando para bajar..."
  },
  RU: {
    clientFiles: "У нас тут файлы для вас",
    contactUs: "Свяжитесь с нами ",
    or: "или",
    questions: "если у вас есть вопросы",
    noClientFiles: "На сервере нет файлов",
    downloadAll: "Скачать папку",
    prepToDownload: "Подготовка файлов..."
  },
};

const T = new LocalizedStrings(loc)

export default T
