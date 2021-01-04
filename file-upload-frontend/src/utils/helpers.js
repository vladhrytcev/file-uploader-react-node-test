const makeName = () => {
  return Math.round(Date.now() + Math.random() * 1000).toString();
};

export const checkFolderNames = (paramName, array) => {
  const namesArray = array.map((elem) => {
    if (!elem[paramName]) return makeName();
    else return elem[paramName];
  });

  for (let i = 0; i < namesArray.length; i++) {
    let matchCount = 0;

    for (let s = i; s <= namesArray.length; s++) {
      if (namesArray[i] === namesArray[s] && i !== s) {
        matchCount++;
        namesArray[s] = namesArray[s] + `(${matchCount})`;
      }
    }
  }

  return array.map((elem, index) => ({
    ...elem,
    [paramName]: namesArray[index],
  }));
};
