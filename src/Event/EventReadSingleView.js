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
import EventSubView from "./_subComponent/EventSubView";
// style for this view
import formStyle from "../_rootAsset/jss/formStyle";
import sweetAlertStyle from "../_rootComponent/CustomAlert/jss/sweetAlertStyle";
//others
import useEventApi from "./_subApi/eventApi";
import LoadingAlert from "../_rootComponent/CustomAlert/LoadingAlert";
import PledgeEventAlert from "../_rootComponent/CustomAlert/PledgeEventAlert";
import UnpledgeEventAlert from "../_rootComponent/CustomAlert/UnpledgeEventAlert";
import { UserContext } from "../_rootContext/UserContext";

const useFormStyle = makeStyles(formStyle);
const useSweetAlertStyle = makeStyles(sweetAlertStyle);

const EventReadSingleView = props => {
  const { history, match } = props;
  const classes = { ...useFormStyle(), ...useSweetAlertStyle() };
  const [event, setEvent] = React.useState();
  const { fetchOneEvent, postPledgeEvent, postUnpledgeEvent } = useEventApi();
  const [alert, setAlert] = React.useState(null);
  const { userInContext } = React.useContext(UserContext);
  const [hideJoinButton, setHideJoinButton] = React.useState(true);
  const [hideUnjoinButton, setHideUnjoinButton] = React.useState(true);
  const [hideEditButton, setHideEditButton] = React.useState(true);
  const loadingAlert = React.useCallback(() => {
    setAlert(<LoadingAlert {...props} setAlert={setAlert} />);
  }, [props]);

  const hideAlert = () => {
    setAlert(null);
  };

  /* #region ############ pledgeEventAlert() & requestPledgeEvent(): Pledge to an event ############## */
  const requestPledgeEvent = React.useCallback(
    async event_ => {
      return await postPledgeEvent(event_);
    },
    [postPledgeEvent]
  );
  const pledgeEventAlert = React.useCallback(
    event_ => {
      setAlert(
        <PledgeEventAlert
          {...props}
          setAlert={setAlert}
          confirmBtnCssClass={classes.button + " " + classes.success}
          cancelBtnCssClass={classes.button + " " + classes.danger}
          submitRequestCallback={async () => {
            const result = await requestPledgeEvent(event_);
            return result;
          }}
          redirectCallback={() => {
            history.push(`/main/Events/ListEvents/${event_.id}`);
          }}
        >
          It&apos;s an adventure, you might lose your life, you sure?
        </PledgeEventAlert>
      );
    },
    [
      classes.danger,
      classes.success,
      classes.button,
      props,
      requestPledgeEvent,
      history
    ]
  );
  /* #endregion */

  /* #region ############ unpledgeEventAlert() & requestPledgeEvent(): Pledge to an event ############## */
  const requestUnpledgeEvent = React.useCallback(
    async event_ => {
      return await postUnpledgeEvent(event_);
    },
    [postUnpledgeEvent]
  );
  const unpledgeEventAlert = React.useCallback(
    event_ => {
      setAlert(
        <UnpledgeEventAlert
          {...props}
          setAlert={setAlert}
          confirmBtnCssClass={classes.button + " " + classes.success}
          cancelBtnCssClass={classes.button + " " + classes.danger}
          submitRequestCallback={async () => {
            const result = await requestUnpledgeEvent(event_);
            return result;
          }}
          redirectCallback={() => {
            history.push(`/main/Events/ListEvents/${event_.id}`);
          }}
        >
          You will be condemned, you sure?
        </UnpledgeEventAlert>
      );
    },
    [
      classes.danger,
      classes.success,
      classes.button,
      props,
      requestUnpledgeEvent,
      history
    ]
  );
  /* #endregion */

  /* #region ############ Initial initiation to values ############ */
  React.useEffect(() => {
    const initializeData = async () => {
      loadingAlert();
      const { eventId } = match.params;
      const event = await fetchOneEvent({ eventId: eventId });
      const { attendees, startDateTime, endDateTime } = event;
      const userEmail = userInContext.user.email;
      const startDateTimeTemp = new Date(startDateTime);
      const endDateTimeTemp = new Date(endDateTime);
      const todayDate = new Date();

      let hideJoinButtonTemp =
        attendees.some(attendee => attendee.email === userEmail) ||
        (event.eventStatus !== "PENDING" && event.eventStatus !== "GREENLIT");
      let hideUnjoinButtonTemp = !hideJoinButtonTemp;
      let hideEditButtonTemp =
        event.organizer &&
        event.organizer.email !== userEmail &&
        (event.eventStatus !== "PENDING" || event.eventStatus !== "GREENLIT");

      if (todayDate > startDateTimeTemp) {
        hideJoinButtonTemp = true;
        hideUnjoinButtonTemp = true;
        hideEditButtonTemp = true;
      } else {
        //pending
      }

      if (todayDate > endDateTimeTemp) {
        //pending
      } else {
        //pending
      }

      setHideJoinButton(hideJoinButtonTemp);
      setHideUnjoinButton(hideUnjoinButtonTemp);
      setHideEditButton(hideEditButtonTemp);

      setEvent(event);
      hideAlert();
    };
    initializeData();
    // eslint-disable-next-line
  }, []);
  /* #endregion */

  return (
    <div>
      {alert}
      {event && !event["error"] ? (
        <GridContainer className={classes.parentContainer}>
          <GridItem lg={12}>
            <form>
              <EventSubView event={event} />
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
                  {hideEditButton ? (
                    ""
                  ) : (
                    <Button
                      color="success"
                      className={classes.formButton}
                      onClick={() => {
                        history.push(`/main/Events/EditEvent/${event.id}`);
                      }}
                    >
                      Edit
                    </Button>
                  )}
                  {/* Join Button && Miss Button */}
                  {hideJoinButton ? (
                    ""
                  ) : (
                    <Button
                      color="warning"
                      className={classes.formButton}
                      onClick={() => pledgeEventAlert(event)}
                    >
                      Pledge to join!
                    </Button>
                  )}
                  {hideUnjoinButton ? (
                    ""
                  ) : (
                    <Button
                      color="warning"
                      className={classes.formButton}
                      onClick={() => unpledgeEventAlert(event)}
                    >
                      Unpledge to miss...
                    </Button>
                  )}
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

EventReadSingleView.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object,
  children: PropTypes.node
};

export default withRouter(EventReadSingleView);
