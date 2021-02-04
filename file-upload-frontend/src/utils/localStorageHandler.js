const appName = 'kingsOfTranslation'

export const getToken = () => {
  const token = localStorage.getItem(appName);
  if(token) return JSON.parse(token)
  else return false
}

export const setToken = () => {
  localStorage.setItem(appName, 'true');
}

export const deleteToken = () => {
  localStorage.removeItem(appName);
}