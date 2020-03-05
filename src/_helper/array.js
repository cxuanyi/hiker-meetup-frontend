const extractDistinct = (myArr, prop) => {
  return myArr.filter((obj, pos, arr) => {
    return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
  });
};

const arrayToObject = (array, keyField) =>
  array.reduce((obj, item) => {
    obj[item[keyField]] = item;
    return obj;
  }, {});

const arrayToObjectStringKey = (array, keyField) =>
  array.reduce((obj, item) => {
    const key = isNaN(item[keyField])
      ? item[keyField].toString()
      : item[keyField];
    obj[key] = item;
    return obj;
  }, {});

const removeDuplicateValues = array => [...new Set(array)];

export {
  extractDistinct,
  arrayToObject,
  arrayToObjectStringKey,
  removeDuplicateValues
};
