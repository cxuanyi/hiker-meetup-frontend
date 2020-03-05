import React from "react";
import PropTypes from "prop-types";
import SweetAlert from "react-bootstrap-sweetalert";
import CircularProgress from "@material-ui/core/CircularProgress";

const SubmitRequestAlert = props => {
  const {
    setAlert,
    confirmBtnCssClass,
    cancelBtnCssClass,
    children,
    submitRequestCallback,
    redirectCallback,
    ...rest
  } = props;

  const loadingSubmitRequest = () => {
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

  const successSubmitRequest = () => {
    setAlert(
      <SweetAlert
        success
        style={{ display: "block", marginTop: "-200px" }}
        confirmBtnCssClass={confirmBtnCssClass}
        title="Request Submitted!"
        onConfirm={() => {
          redirectCallback();
        }}
        onCancel={() => hideAlert()}
      >
        Request has been submitted!
      </SweetAlert>
    );
  };

  const failureSubmitRequest = () => {
    setAlert(
      <SweetAlert
        danger
        style={{ display: "block", marginTop: "-200px" }}
        confirmBtnCssClass={confirmBtnCssClass}
        title="Request Not Submitted!"
        onConfirm={() => {
          hideAlert();
        }}
        onCancel={() => hideAlert()}
      >
        Request has NOT been submitted!
      </SweetAlert>
    );
  };

  const cancelSubmitRequest = () => {
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
      confirmBtnText="Yes, Submit Request!"
      cancelBtnText="Cancel"
      style={{ display: "block", marginTop: "-200px" }}
      confirmBtnCssClass={confirmBtnCssClass}
      cancelBtnCssClass={cancelBtnCssClass}
      onConfirm={async () => {
        loadingSubmitRequest();
        const submitRequestResult = await submitRequestCallback();
        if (submitRequestResult.error) failureSubmitRequest();
        else successSubmitRequest();
      }}
      onCancel={() => cancelSubmitRequest()}
      showCancel
    >
      {children}
    </SweetAlert>
  );
};

SubmitRequestAlert.propTypes = {
  children: PropTypes.node,
  alert: PropTypes.node,
  setAlert: PropTypes.func,
  confirmBtnCssClass: PropTypes.string,
  cancelBtnCssClass: PropTypes.string,
  submitRequestCallback: PropTypes.func,
  redirectCallback: PropTypes.func
};

export default SubmitRequestAlert;
