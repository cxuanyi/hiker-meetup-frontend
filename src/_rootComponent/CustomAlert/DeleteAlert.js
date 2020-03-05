import React from "react";
import PropTypes from "prop-types";
import SweetAlert from "react-bootstrap-sweetalert";
import CircularProgress from "@material-ui/core/CircularProgress";

const DeleteAlert = props => {
  const {
    setAlert,
    confirmBtnCssClass,
    cancelBtnCssClass,
    children,
    deleteCallback,
    redirectCallback,
    ...rest
  } = props;

  const loadingDelete = () => {
    setAlert(
      <SweetAlert
        {...rest}
        title="Loading..."
        style={{ display: "block", marginTop: "-200px" }}
        showConfirm={false}
        onConfirm={() => {
          hideAlert();
        }}
      >
        <CircularProgress />
      </SweetAlert>
    );
  };

  const successDelete = () => {
    setAlert(
      <SweetAlert
        success
        style={{ display: "block", marginTop: "-200px" }}
        confirmBtnCssClass={confirmBtnCssClass}
        title="Deleted!"
        onConfirm={() => {
          redirectCallback();
          hideAlert();
        }}
        onCancel={() => hideAlert()}
      >
        Selected record has been deleted.
      </SweetAlert>
    );
  };

  const failureDelete = () => {
    setAlert(
      <SweetAlert
        danger
        style={{ display: "block", marginTop: "-200px" }}
        confirmBtnCssClass={confirmBtnCssClass}
        title="Not Deleted!"
        onConfirm={() => {
          hideAlert();
        }}
        onCancel={() => hideAlert()}
      >
        Selected record cannot be deleted.
      </SweetAlert>
    );
  };

  const cancelDelete = () => {
    setAlert(
      <SweetAlert
        danger
        style={{ display: "block", marginTop: "-200px" }}
        confirmBtnCssClass={confirmBtnCssClass}
        title="Cancelled"
        onConfirm={() => {
          hideAlert();
        }}
        onCancel={() => hideAlert()}
      >
        Selected record is safe :)
      </SweetAlert>
    );
  };

  const hideAlert = () => {
    setAlert(null);
  };

  return (
    <SweetAlert
      {...rest}
      warning
      title="Are you sure?"
      confirmBtnText="Yes, delete it!"
      cancelBtnText="Cancel"
      style={{ display: "block", marginTop: "-200px" }}
      confirmBtnCssClass={confirmBtnCssClass}
      cancelBtnCssClass={cancelBtnCssClass}
      onConfirm={async () => {
        loadingDelete();
        const deleteResult = await deleteCallback();
        if (deleteResult.error) failureDelete();
        else successDelete();
      }}
      onCancel={() => cancelDelete()}
      showCancel
    >
      {children}
    </SweetAlert>
  );
};

DeleteAlert.propTypes = {
  children: PropTypes.node,
  alert: PropTypes.node,
  setAlert: PropTypes.func,
  confirmBtnCssClass: PropTypes.string,
  cancelBtnCssClass: PropTypes.string,
  deleteCallback: PropTypes.func,
  redirectCallback: PropTypes.func
};

export default DeleteAlert;
