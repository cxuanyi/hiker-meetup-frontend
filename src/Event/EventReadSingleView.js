import React from "react";
import { withRouter } from "react-router-dom";
// nodejs classes
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// material ui icons
// core components
import GridContainer from "../_rootComponent/Grid/GridContainer";
import GridItem from "../_rootComponent/Grid/GridItem";
import Button from "../_rootComponent/CustomButtons/Button";
// sub components
// import FZ2PMSSubView from "./_subComponent/FZ2PMSSubView";
// style for this view
import formStyle from "../_rootAsset/jss/formStyle";
import sweetAlertStyle from "../_rootComponent/CustomAlert/jss/sweetAlertStyle";
//others
import useEventApi from "./_subApi/eventApi";
import FZ2PMSSubView from "./_subComponent/FZ2PMSSubView";
import DeleteAlert from "../_rootComponent/CustomAlert/DeleteAlert";
import LoadingAlert from "../_rootComponent/CustomAlert/LoadingAlert";

const useFormStyle = makeStyles(formStyle);
const useSweetAlertStyle = makeStyles(sweetAlertStyle);

const FZ2PMSReadSingleView = props => {
  const { history, match } = props;
  const classes = { ...useFormStyle(), ...useSweetAlertStyle() };
  const [event, setEvent] = React.useState();
  const { fetchOneEvent } = useEventApi();
  const [alert, setAlert] = React.useState(null);

  // const postDeleteFz2Pms = React.useCallback(
  //   async input => {
  //     return deleteFz2Pms(input);
  //   },
  //   [deleteFz2Pms]
  // );
  // const deleteCallback = React.useCallback(async () => {
  //   return await postDeleteFz2Pms(fz2);
  // }, [postDeleteFz2Pms, fz2]);
  const loadingAlert = React.useCallback(() => {
    setAlert(<LoadingAlert {...props} setAlert={setAlert} />);
  }, [props]);
  // const deleteAlert = React.useCallback(
  //   fz2_id => {
  //     setAlert(
  //       <DeleteAlert
  //         {...props}
  //         setAlert={setAlert}
  //         confirmBtnCssClass={classes.button + " " + classes.success}
  //         cancelBtnCssClass={classes.button + " " + classes.danger}
  //         deleteCallback={async () => {
  //           const callbackResult = await deleteCallback(fz2_id);
  //           return callbackResult;
  //         }}
  //         redirectCallback={() => {
  //           history.push("/main/ORFManagement/FZ2PMSReadList");
  //         }}
  //       >
  //         You will not be able to recover this FZ2-PMS record!
  //       </DeleteAlert>
  //     );
  //   },
  //   [
  //     classes.success,
  //     classes.button,
  //     classes.danger,
  //     deleteCallback,
  //     history,
  //     props
  //   ]
  // );
  const hideAlert = () => {
    setAlert(null);
  };

  React.useEffect(() => {
    const initializeData = async () => {
      loadingAlert();
      const { eventId } = match.params;
      console.log("eventId: ", eventId);
      const event = await fetchOneEvent({ eventId: eventId });
      console.log("event: ", event);
      setEvent(event);
      hideAlert();
    };
    initializeData();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      {alert}
      {event && !event["error"] ? (
        <GridContainer className={classes.parentContainer}>
          <GridItem lg={12}>
            <form>
              <FZ2PMSSubView event={event} />
              <div className={classes.footer}>
                <div className={classes.buttonLeft}>
                  <Button
                    className={classes.formButton}
                    onClick={history.goBack}
                  >
                    Back
                  </Button>
                </div>
                <div className={classes.right}>
                  {/* <Button
                    color="success"
                    className={classes.formButton}
                    onClick={() => {
                      history.push(
                        `/main/ORFManagement/FZ2PMSReadList/FZ2PMSUpdate/${fz2.fz2_id}`
                      );
                    }}
                  >
                    Edit
                  </Button> */}
                  {/* <Button
                    color="danger"
                    className={classes.formButton}
                    onClick={() => deleteAlert()}
                  >
                    Delete
                  </Button> */}
                </div>
              </div>
            </form>
          </GridItem>
        </GridContainer>
      ) : event && event["error"] ? (
        <h3>Requested Event not found.</h3>
      ) : (
        <p>.....</p>
      )}
    </div>
  );
};

FZ2PMSReadSingleView.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object,
  children: PropTypes.node
};

export default withRouter(FZ2PMSReadSingleView);
