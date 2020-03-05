import React from "react";
import PropTypes from "prop-types";
import TagsInput from "react-tagsinput";
import { readZipFile } from "../../_helper/zipfile";
// core components
import Button from "../CustomButtons/Button.js";

const SingleZipFileUpload = props => {
  const {
    buttonText,
    file,
    setFile,
    zipFileInfo,
    setZipFileInfo,
    successCallback,
    failureCallback,
    resetCallback,
    tagOnClickFetchFile,
    tagOnClickObjectUrl
  } = props;
  const style = "fileinput text-center";
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
          display: file ? [file.name] : ["Uh oh got problem, try again..."],
          status: 3
        };
      case "RESETTING":
        setFile(null);
        setZipFileInfo(null);
        return {
          color: "react-tagsinput-tag warning",
          display: loadingSelectFile,
          status: 4
        };
      case "RELOAD":
        reader = new FileReader();
        if (file) {
          reader.onloadend = async () => {
            let uploadedZipFile = await readZipFile(reader.result);
            setZipFileInfo(uploadedZipFile.files);
            uploadedZipFile = null;
          };
          reader.readAsDataURL(file);
        }
        return {
          ...{ state },
          color: "react-tagsinput-tag warning",
          display: loadingSelectFile,
          status: 2
        };
      case "ERROR":
        return {
          ...{ state },
          color: "react-tagsinput-tag danger",
          display: ["Uh oh got problem, try again..."],
          status: 1
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
    if (file) {
      dispatch({ action: "LOADED" });
    }
  }, [file]);

  React.useEffect(() => {
    if (fileState.status === 1 && zipFileInfo) dispatch({ action: "RELOAD" });
  }, [fileState, zipFileInfo]);

  React.useEffect(() => {
    if (fileState.status === 2 && zipFileInfo) dispatch({ action: "LOADED" });
  }, [fileState, zipFileInfo]);

  React.useEffect(() => {
    if (fileState.status === 4) dispatch({ action: "NOT_FILE_SELECTED" });
  }, [fileState]);

  const fileInputOnChangeHandler = e => {
    e.preventDefault();
    if (e.target.files[0].type === "application/x-zip-compressed") {
      dispatch({ action: "LOADING", payload: e.target.files[0] });
      successCallback();
    } else {
      dispatch({ action: "ERROR" });
      failureCallback();
    }
  };
  const selectFileButtonOnClickHandler = () => {
    fileInput.current.click();
  };
  const tagsOnChangeHandler = () => {
    dispatch({ action: "RESETTING" });
    fileInput.current.value = null;
    resetCallback();
  };
  const tagOnClickHandler = e => {
    const crossClicked =
      e.nativeEvent.offsetX <= 15 && e.nativeEvent.offsetY <= 15 ? true : false;

    if (!crossClicked) {
      if (file) {
        if (file.file_path) tagOnClickFetchFile(e, file);
        else tagOnClickObjectUrl(e, file);
      }
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
        accept=".zip"
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

SingleZipFileUpload.propTypes = {
  buttonText: PropTypes.string,
  addButtonProps: PropTypes.object,
  file: PropTypes.object,
  setFile: PropTypes.func,
  zipFileInfo: PropTypes.object,
  setZipFileInfo: PropTypes.func,
  successCallback: PropTypes.func,
  failureCallback: PropTypes.func,
  resetCallback: PropTypes.func,
  tagOnClickFetchFile: PropTypes.func,
  tagOnClickObjectUrl: PropTypes.func,
  changeButtonProps: PropTypes.object,
  removeButtonProps: PropTypes.object
};

export default SingleZipFileUpload;
