const extractFormData = formData => {
  let returnArray = [];
  for (var pair of formData.entries()) {
    returnArray = [...returnArray, pair];
  }
  return returnArray;
};

const yesNoFieldOptions = [
  { value: "2", displayName: "Yes" },
  { value: "1", displayName: "No" }
];
export { extractFormData, yesNoFieldOptions };
