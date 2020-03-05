import React from "react";
import PropTypes from "prop-types";
import SweetAlert from "react-bootstrap-sweetalert";
import CircularProgress from "@material-ui/core/CircularProgress";

const LoadingAlert = props => {
  const { setAlert, ...rest } = props;

  const hideAlert = () => {
    setAlert(null);
  };

  return (
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

LoadingAlert.propTypes = {
  children: PropTypes.node,
  alert: PropTypes.node,
  setAlert: PropTypes.func,
  confirmBtnCssClass: PropTypes.string,
  createdCallback: PropTypes.func
};

export default LoadingAlert;
