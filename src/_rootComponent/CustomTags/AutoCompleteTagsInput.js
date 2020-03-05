import React from "react";
import ReactTags from "react-tag-autocomplete";

const AutoCompleteTagsInput = props => {
  const [tags, setTags] = React.useState([
    { id: 1, name: "Apples" },
    { id: 2, name: "Pears" }
  ]);
  const [suggestions, setSuggestions] = React.useState([
    { id: 3, name: "Bananas" },
    { id: 4, name: "Mangos" },
    { id: 5, name: "Lemons" },
    { id: 6, name: "Apricots" }
  ]);

  const handleDelete = i => {
    let tagsTemp = tags.slice(0);
    tagsTemp.splice(i, 1);
    setTags(tagsTemp);
  };

  const handleAddition = tag => {
    const tagsTemp = [].concat(tags, tag);
    setTags(tagsTemp);
  };

  return (
    <ReactTags
      tags={tags}
      suggestions={suggestions}
      handleDelete={handleDelete}
      handleAddition={handleAddition}
    />
  );
};

export default AutoCompleteTagsInput;
