import React from "react";
import PropTypes from "prop-types";
import SweetAlert from "react-bootstrap-sweetalert";

const CancelAlert = props => {
  const {
    setAlert,
    confirmBtnCssClass,
    cancelBtnCssClass,
    children,
    cancelCallback,
    ...rest
  } = props;

  const successCancel = () => {
    setAlert(
      <SweetAlert
        success
        style={{ display: "block", marginTop: "-200px" }}
        confirmBtnCssClass={confirmBtnCssClass}
        title="Cancelled!"
        onConfirm={() => {
          cancelCallback();
          hideAlert();
        }}
        onCancel={() => hideAlert()}
      >
        Ok, as you wished! :)
      </SweetAlert>
    );
  };

  const cancelCancel = () => {
    hideAlert();
  };

  const hideAlert = () => {
    setAlert(null);
  };

  return (
    <SweetAlert
      {...rest}
      warning
      title="Are you sure?"
      confirmBtnText="Yes, Cancel it!"
      cancelBtnText="Cancel"
      style={{ display: "block", marginTop: "-200px" }}
      confirmBtnCssClass={confirmBtnCssClass}
      cancelBtnCssClass={cancelBtnCssClass}
      onConfirm={() => successCancel()}
      onCancel={() => cancelCancel()}
      showCancel
    >
      {children}
    </SweetAlert>
  );
};

CancelAlert.propTypes = {
  children: PropTypes.node,
  alert: PropTypes.node,
  setAlert: PropTypes.func,
  confirmBtnCssClass: PropTypes.string,
  cancelBtnCssClass: PropTypes.string,
  cancelCallback: PropTypes.func
};

export default CancelAlert;
