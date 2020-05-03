import React from "react";
import PropTypes from "prop-types";
import SweetAlert from "react-bootstrap-sweetalert";
import CircularProgress from "@material-ui/core/CircularProgress";

const PledgeEventAlert = props => {
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
        title="Plegey Pledged to Event!"
        onConfirm={() => {
          redirectCallback();
        }}
        onCancel={() => hideAlert()}
      >
        Pledged! Remember to buy insurance.
      </SweetAlert>
    );
  };

  const failureSubmitRequest = () => {
    setAlert(
      <SweetAlert
        danger
        style={{ display: "block", marginTop: "-200px" }}
        confirmBtnCssClass={confirmBtnCssClass}
        title="Plegey Pledge Not Accepted"
        onConfirm={() => {
          hideAlert();
        }}
        onCancel={() => hideAlert()}
      >
        Unable to pledge, maybe your soul is not pure.
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
        You are not joining :/
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
      title="Pledgey Pledge to Event?"
      confirmBtnText="Yes, I pledge my soul!"
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

PledgeEventAlert.propTypes = {
  children: PropTypes.node,
  alert: PropTypes.node,
  setAlert: PropTypes.func,
  confirmBtnCssClass: PropTypes.string,
  cancelBtnCssClass: PropTypes.string,
  submitRequestCallback: PropTypes.func,
  redirectCallback: PropTypes.func
};

export default PledgeEventAlert;
