export const copyToclipBoard = (text) => {
  const input = document.createElement('input');
  input.style = "position: fixed";
  document.body.appendChild(input);
  input.value = text;
  input.focus();
  input.select();
  document.execCommand('copy');
  input.remove()
}

