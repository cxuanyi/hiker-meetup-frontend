import React from "react";
import PropTypes from "prop-types";
import SweetAlert from "react-bootstrap-sweetalert";
import CircularProgress from "@material-ui/core/CircularProgress";

const RejectAlert = props => {
  const {
    setAlert,
    confirmBtnCssClass,
    cancelBtnCssClass,
    children,
    rejectCallback,
    redirectCallback,
    ...rest
  } = props;

  const loadingReject = () => {
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

  const successReject = () => {
    setAlert(
      <SweetAlert
        success
        style={{ display: "block", marginTop: "-200px" }}
        confirmBtnCssClass={confirmBtnCssClass}
        title="Request Rejected!"
        onConfirm={() => {
          redirectCallback();
        }}
        onCancel={() => hideAlert()}
      >
        Request has been rejected!
      </SweetAlert>
    );
  };

  const failureReject = () => {
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
        Request has NOT been rejected!
      </SweetAlert>
    );
  };

  const cancelReject = () => {
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
        OK :)
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
      confirmBtnText="Yes, Reject Request!"
      cancelBtnText="Cancel"
      style={{ display: "block", marginTop: "-200px" }}
      confirmBtnCssClass={confirmBtnCssClass}
      cancelBtnCssClass={cancelBtnCssClass}
      onConfirm={async () => {
        loadingReject();
        const rejectResult = await rejectCallback();
        if (rejectResult.error) failureReject();
        else successReject();
      }}
      onCancel={() => cancelReject()}
      showCancel
    >
      {children}
    </SweetAlert>
  );
};

RejectAlert.propTypes = {
  children: PropTypes.node,
  alert: PropTypes.node,
  setAlert: PropTypes.func,
  confirmBtnCssClass: PropTypes.string,
  cancelBtnCssClass: PropTypes.string,
  rejectCallback: PropTypes.func,
  redirectCallback: PropTypes.func
};

export default RejectAlert;
