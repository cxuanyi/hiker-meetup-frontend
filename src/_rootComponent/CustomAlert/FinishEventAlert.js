import React from "react";
import PropTypes from "prop-types";
import SweetAlert from "react-bootstrap-sweetalert";
import CircularProgress from "@material-ui/core/CircularProgress";

const FinishEventAlert = props => {
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
        title="Plegey Finished to Event!"
        onConfirm={() => {
          redirectCallback();
        }}
        onCancel={() => hideAlert()}
      >
        Finished! Hopefully, no one needs to use their insurance.
      </SweetAlert>
    );
  };

  const failureSubmitRequest = () => {
    setAlert(
      <SweetAlert
        danger
        style={{ display: "block", marginTop: "-200px" }}
        confirmBtnCssClass={confirmBtnCssClass}
        title="Finish Event Not Accepted"
        onConfirm={() => {
          hideAlert();
        }}
        onCancel={() => hideAlert()}
      >
        Unable to finish, maybe it&apos;s destined for you to carry on.
      </SweetAlert>
    );
  };

  const cancelSubmitRequest = () => {
    setAlert(
      <SweetAlert
        danger
        style={{ display: "block", marginTop: "-200px" }}
        confirmBtnCssClass={confirmBtnCssClass}
        title="Yup, it's still too early!"
        onConfirm={() => {
          hideAlert();
        }}
        onCancel={() => hideAlert()}
      >
        Ok, no hurry hiker!
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
      title="Finishy Finish the Event?"
      confirmBtnText="Yes! Veni, vidi, vici!"
      cancelBtnText="Nope"
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

FinishEventAlert.propTypes = {
  children: PropTypes.node,
  alert: PropTypes.node,
  setAlert: PropTypes.func,
  confirmBtnCssClass: PropTypes.string,
  cancelBtnCssClass: PropTypes.string,
  submitRequestCallback: PropTypes.func,
  redirectCallback: PropTypes.func
};

export default FinishEventAlert;
