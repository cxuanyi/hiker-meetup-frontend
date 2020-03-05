const setAllValOf1LvlObj = (object, value) => {
  let objectTemp = { ...object };
  Object.keys(objectTemp).forEach(field => (objectTemp[field] = value));
  return objectTemp;
};

export { setAllValOf1LvlObj };
