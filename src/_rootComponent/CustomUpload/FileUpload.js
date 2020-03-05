import React from "react";
import PropTypes from "prop-types";
import TagsInput from "react-tagsinput";
import { readZipFile } from "../../_helper/zipfile";
// core components
import Button from "../CustomButtons/Button.js";

const FileUpload = props => {
  const { buttonText, file, setFile, zipFileInfo, setZipFileInfo } = props;
  const style = "fileinput text-center";
  const [download, setDownload] = React.useState();
  const fileInput = React.createRef();

  const reducer = (state, { action, payload }) => {
    let reader = null;
    let fileTemp = "";
    const defaultSelectFile = ["No file selected"];
    const loadingSelectFile = ["Loading ..."];

    switch (action) {
      case "NOT_FILE_SELECTED":
        return {
          ...{ state },
          color: "react-tagsinput-tag danger",
          display: defaultSelectFile,
          status: 1
        };
      case "LOADING":
        reader = new FileReader();
        fileTemp = payload;
        if (fileTemp) {
          reader.onloadend = async () => {
            setFile(fileTemp);
            setDownload(fileTemp.name);
            let uploadedZipFile = await readZipFile(reader.result);
            setZipFileInfo(uploadedZipFile.files);
            uploadedZipFile = null;
          };
          reader.readAsDataURL(fileTemp);
        }
        return {
          ...{ state },
          color: "react-tagsinput-tag warning",
          display: loadingSelectFile,
          status: 2
        };
      case "LOADED":
        return {
          ...{ state },
          color: "react-tagsinput-tag success",
          display: file ? [file.name] : ["Uh oh"],
          status: 3
        };
      case "RESETTING":
        setFile(null);
        setDownload();
        setZipFileInfo(null);
        return {
          color: "react-tagsinput-tag warning",
          display: loadingSelectFile,
          status: 4
        };
      default:
        throw new Error();
    }
  };
  const [fileState, dispatch] = React.useReducer(reducer, {
    color: "react-tagsinput-tag danger",
    display: ["No file selected"],
    status: 1
  });

  React.useEffect(() => {
    if (fileState.status === 2 && zipFileInfo) dispatch({ action: "LOADED" });
  }, [fileState, zipFileInfo]);

  React.useEffect(() => {
    if (fileState.status === 4) dispatch({ action: "NOT_FILE_SELECTED" });
  }, [fileState]);

  const fileInputOnChangeHandler = e => {
    e.preventDefault();
    dispatch({ action: "LOADING", payload: e.target.files[0] });
  };
  const selectFileButtonOnClickHandler = () => {
    fileInput.current.click();
  };
  const tagsOnChangeHandler = () => {
    dispatch({ action: "RESETTING" });
    fileInput.current.value = null;
  };
  const tagOnClickHandler = e => {
    const crossClicked =
      e.nativeEvent.offsetX <= 15 && e.nativeEvent.offsetY <= 15 ? true : false;

    if (file && !crossClicked) {
      const data = URL.createObjectURL(file);
      let link = document.createElement("a");
      link.href = data;
      link.download = download;
      link.click();
      setTimeout(function() {
        // For Firefox it is necessary to delay revoking the ObjectURL
        window.URL.revokeObjectURL(data);
      }, 100);
    }
  };

  const addButtonProps = {
    color: "primary",
    round: true,
    size: "sm"
  };

  return (
    <div className={style}>
      <input
        type="file"
        onChange={e => fileInputOnChangeHandler(e)}
        ref={fileInput}
      />
      <TagsInput
        value={fileState.display}
        onChange={() => {
          tagsOnChangeHandler();
        }}
        tagProps={{
          className: fileState.color,
          onClick: e => tagOnClickHandler(e)
        }}
      />
      <Button
        {...addButtonProps}
        onClick={() => selectFileButtonOnClickHandler()}
        disabled={fileState.status === 1 ? false : true}
      >
        {buttonText}
      </Button>
    </div>
  );
};

FileUpload.propTypes = {
  buttonText: PropTypes.string,
  addButtonProps: PropTypes.object,
  file: PropTypes.object,
  setFile: PropTypes.func,
  zipFileInfo: PropTypes.object,
  setZipFileInfo: PropTypes.func,
  changeButtonProps: PropTypes.object,
  removeButtonProps: PropTypes.object
};

export default FileUpload;
