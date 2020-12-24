export const linkBuilder = (req, folder) => {
  return `${req.protocol}://${req.get('host')}/api/download/${folder}`
}