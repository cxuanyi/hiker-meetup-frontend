const getEpochDate = () => Math.round(new Date().getTime() / 1000);
const getISOToDateString = isoDate => {
  const inputDate = new Date(isoDate);
  return inputDate.toDateString();
};
const getYYYYMMDDSlash = isoDateString => {
  const date = new Date(isoDateString);
  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
};
const getEpochToDisplayDate = epoch => {
  var dateVal = `/Date(${epoch * 1000})/`;
  var date = new Date(parseFloat(dateVal.substr(6)));
  return (
    date.getMonth() +
    1 +
    "/" +
    date.getDate() +
    "/" +
    date.getFullYear() +
    " " +
    date.getHours() +
    ":" +
    date.getMinutes() +
    " hrs"
  );
};
export {
  getEpochDate,
  getISOToDateString,
  getYYYYMMDDSlash,
  getEpochToDisplayDate
};
