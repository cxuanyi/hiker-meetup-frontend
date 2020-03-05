import React from "react";

// nodejs classes
import PropTypes from "prop-types";

import { TextField } from "@material-ui/core";

const EditableCell = ({ value, index, onBlurHandler, column }) => {
  //https://codesandbox.io/s/react-table-editable-content-ggvcy?from-embed
  const [cellValue, setCellValue] = React.useState(value);

  const onChange = e => {
    setCellValue(e.target.value);
  };

  const onBlur = () => {
    onBlurHandler(index, column.id, cellValue);
  };

  return (
    <TextField
      placeholder="type here"
      name="input"
      type="text"
      onChange={onChange}
      onBlur={onBlur}
      value={cellValue}
    />
  );
};

EditableCell.propTypes = {
  onBlurHandler: PropTypes.func,
  value: PropTypes.string,
  index: PropTypes.number,
  column: PropTypes.object
};

export default EditableCell;
