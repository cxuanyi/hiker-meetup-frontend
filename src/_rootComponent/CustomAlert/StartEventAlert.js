import React from "react";
import PropTypes from "prop-types";
import SweetAlert from "react-bootstrap-sweetalert";
import CircularProgress from "@material-ui/core/CircularProgress";

const StartEventAlert = props => {
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
        title="Plegey Started to Event!"
        onConfirm={() => {
          redirectCallback();
        }}
        onCancel={() => hideAlert()}
      >
        Started! Remember you bought insurance.
      </SweetAlert>
    );
  };

  const failureSubmitRequest = () => {
    setAlert(
      <SweetAlert
        danger
        style={{ display: "block", marginTop: "-200px" }}
        confirmBtnCssClass={confirmBtnCssClass}
        title="Start Event Not Accepted"
        onConfirm={() => {
          hideAlert();
        }}
        onCancel={() => hideAlert()}
      >
        Unable to start, what&apos;s wrong!?
      </SweetAlert>
    );
  };

  const cancelSubmitRequest = () => {
    setAlert(
      <SweetAlert
        danger
        style={{ display: "block", marginTop: "-200px" }}
        confirmBtnCssClass={confirmBtnCssClass}
        title="You are lousy!"
        onConfirm={() => {
          hideAlert();
        }}
        onCancel={() => hideAlert()}
      >
        Ok, don&apos;t make me wait too long!
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
      title="Starty Start the Event?"
      confirmBtnText="Yes, I cannot wait any longer!!"
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

StartEventAlert.propTypes = {
  children: PropTypes.node,
  alert: PropTypes.node,
  setAlert: PropTypes.func,
  confirmBtnCssClass: PropTypes.string,
  cancelBtnCssClass: PropTypes.string,
  submitRequestCallback: PropTypes.func,
  redirectCallback: PropTypes.func
};

export default StartEventAlert;
