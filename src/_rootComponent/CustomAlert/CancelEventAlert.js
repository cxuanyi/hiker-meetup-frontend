import React from "react";
import PropTypes from "prop-types";
import SweetAlert from "react-bootstrap-sweetalert";
import CircularProgress from "@material-ui/core/CircularProgress";

const CancelEventAlert = props => {
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
        title="Canceled Event... :.("
        onConfirm={() => {
          redirectCallback();
        }}
        onCancel={() => hideAlert()}
      >
        Canceled! Remember to feel sorry for yourself.
      </SweetAlert>
    );
  };

  const failureSubmitRequest = () => {
    setAlert(
      <SweetAlert
        danger
        style={{ display: "block", marginTop: "-200px" }}
        confirmBtnCssClass={confirmBtnCssClass}
        title="Cancel Not Accepted!~"
        onConfirm={() => {
          hideAlert();
        }}
        onCancel={() => hideAlert()}
      >
        It&apos;s destined to happen. Haha!
      </SweetAlert>
    );
  };

  const cancelSubmitRequest = () => {
    setAlert(
      <SweetAlert
        danger
        style={{ display: "block", marginTop: "-200px" }}
        confirmBtnCssClass={confirmBtnCssClass}
        title="OoooOooweee, that's better!"
        onConfirm={() => {
          hideAlert();
        }}
        onCancel={() => hideAlert()}
      >
        You are not withdrawing your responsiblity! :D
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
      title="What?! Cancel Event????"
      confirmBtnText="Yes, I want to cancel. I shall repent."
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

CancelEventAlert.propTypes = {
  children: PropTypes.node,
  alert: PropTypes.node,
  setAlert: PropTypes.func,
  confirmBtnCssClass: PropTypes.string,
  cancelBtnCssClass: PropTypes.string,
  submitRequestCallback: PropTypes.func,
  redirectCallback: PropTypes.func
};

export default CancelEventAlert;
