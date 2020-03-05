import React from "react";
import PropTypes from "prop-types";
import SweetAlert from "react-bootstrap-sweetalert";
import CircularProgress from "@material-ui/core/CircularProgress";

const DepartmentTaskingAlert = props => {
  const {
    setAlert,
    confirmBtnCssClass,
    cancelBtnCssClass,
    children,
    departmentTaskingCallback,
    redirectCallback,
    ...rest
  } = props;

  const loadingTasking = () => {
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

  const successTasking = () => {
    setAlert(
      <SweetAlert
        success
        style={{ display: "block", marginTop: "-200px" }}
        confirmBtnCssClass={confirmBtnCssClass}
        title="Execute Tasking!"
        onConfirm={() => {
          redirectCallback();
        }}
        onCancel={() => hideAlert()}
      >
        Tasking has been executed!
      </SweetAlert>
    );
  };

  const failureTasking = () => {
    setAlert(
      <SweetAlert
        danger
        style={{ display: "block", marginTop: "-200px" }}
        confirmBtnCssClass={confirmBtnCssClass}
        title="Tasking Not Executed!"
        onConfirm={() => {
          hideAlert();
        }}
        onCancel={() => hideAlert()}
      >
        Tasking has NOT been executed.
      </SweetAlert>
    );
  };

  const cancelTasking = () => {
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
      confirmBtnText="Yes, Execute Tasking!"
      cancelBtnText="Cancel"
      style={{ display: "block", marginTop: "-200px" }}
      confirmBtnCssClass={confirmBtnCssClass}
      cancelBtnCssClass={cancelBtnCssClass}
      onConfirm={async () => {
        loadingTasking();
        const taskingResult = await departmentTaskingCallback();
        if (taskingResult.error) failureTasking();
        else successTasking();
      }}
      onCancel={() => cancelTasking()}
      showCancel
    >
      {children}
    </SweetAlert>
  );
};

DepartmentTaskingAlert.propTypes = {
  children: PropTypes.node,
  alert: PropTypes.node,
  setAlert: PropTypes.func,
  confirmBtnCssClass: PropTypes.string,
  cancelBtnCssClass: PropTypes.string,
  departmentTaskingCallback: PropTypes.func,
  redirectCallback: PropTypes.func
};

export default DepartmentTaskingAlert;
