import React from "react";
import PropTypes from "prop-types";
import SweetAlert from "react-bootstrap-sweetalert";
import CircularProgress from "@material-ui/core/CircularProgress";

const CancelRequestAlert = props => {
  const {
    setAlert,
    confirmBtnCssClass,
    cancelBtnCssClass,
    children,
    cancelRequestCallback,
    redirectCallback,
    ...rest
  } = props;

  const loadingCancelRequest = () => {
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

  const successCancelRequest = () => {
    setAlert(
      <SweetAlert
        success
        style={{ display: "block", marginTop: "-200px" }}
        confirmBtnCssClass={confirmBtnCssClass}
        title="Request Canceled!"
        onConfirm={() => {
          redirectCallback();
        }}
        onCancel={() => hideAlert()}
      >
        Request has been canceled!
      </SweetAlert>
    );
  };

  const failureCancelRequest = () => {
    setAlert(
      <SweetAlert
        danger
        style={{ display: "block", marginTop: "-200px" }}
        confirmBtnCssClass={confirmBtnCssClass}
        title="Request Not Canceled!"
        onConfirm={() => {
          hideAlert();
        }}
        onCancel={() => hideAlert()}
      >
        Request has NOT been canceled!
      </SweetAlert>
    );
  };

  const cancelCancelRequest = () => {
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
      confirmBtnText="Yes, Cancel Request!"
      cancelBtnText="Cancel"
      style={{ display: "block", marginTop: "-200px" }}
      confirmBtnCssClass={confirmBtnCssClass}
      cancelBtnCssClass={cancelBtnCssClass}
      onConfirm={async () => {
        loadingCancelRequest();
        const cancelRequestResult = await cancelRequestCallback();
        if (cancelRequestResult.error) failureCancelRequest();
        else successCancelRequest();
      }}
      onCancel={() => cancelCancelRequest()}
      showCancel
    >
      {children}
    </SweetAlert>
  );
};

CancelRequestAlert.propTypes = {
  children: PropTypes.node,
  alert: PropTypes.node,
  setAlert: PropTypes.func,
  confirmBtnCssClass: PropTypes.string,
  cancelBtnCssClass: PropTypes.string,
  cancelRequestCallback: PropTypes.func,
  redirectCallback: PropTypes.func
};

export default CancelRequestAlert;
