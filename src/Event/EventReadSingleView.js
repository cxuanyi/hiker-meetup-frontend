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
import CancelEventAlert from "../_rootComponent/CustomAlert/CancelEventAlert";
import PledgeEventAlert from "../_rootComponent/CustomAlert/PledgeEventAlert";
import UnpledgeEventAlert from "../_rootComponent/CustomAlert/UnpledgeEventAlert";
import { UserContext } from "../_rootContext/UserContext";

const useFormStyle = makeStyles(formStyle);
const useSweetAlertStyle = makeStyles(sweetAlertStyle);

const EventReadSingleView = props => {
  const { history, match } = props;
  const classes = { ...useFormStyle(), ...useSweetAlertStyle() };
  const [event, setEvent] = React.useState();
  const {
    fetchOneEvent,
    postCancelEvent,
    postPledgeEvent,
    postUnpledgeEvent,
    postLikeEvent,
    postUnlikeEvent
  } = useEventApi();
  const [alert, setAlert] = React.useState(null);
  const { userInContext } = React.useContext(UserContext);
  const [hideEditButton, setHideEditButton] = React.useState(true);
  const [hideCancelButton, setHideCancelButton] = React.useState(true);
  const [hideJoinButton, setHideJoinButton] = React.useState(true);
  const [hideUnjoinButton, setHideUnjoinButton] = React.useState(true);
  const [toggleLikeButton, setToggleLikeButton] = React.useState(true);

  const loadingAlert = React.useCallback(() => {
    setAlert(<LoadingAlert {...props} setAlert={setAlert} />);
  }, [props]);

  const hideAlert = () => {
    setAlert(null);
  };

  /* #region ############ cancelEventAlert() & requestCancelEvent(): Cancel an event ############## */
  const requestCancelEvent = React.useCallback(
    async event_ => {
      return await postCancelEvent(event_);
    },
    [postCancelEvent]
  );
  const cancelEventAlert = React.useCallback(
    event_ => {
      setAlert(
        <CancelEventAlert
          {...props}
          setAlert={setAlert}
          confirmBtnCssClass={classes.button + " " + classes.success}
          cancelBtnCssClass={classes.button + " " + classes.danger}
          submitRequestCallback={async () => {
            const result = await requestCancelEvent(event_);
            return result;
          }}
          redirectCallback={() => {
            history.push(`/main/Events/ListEvents/${event_.id}`);
          }}
        >
          You will feel sorry for yourself, you sure?
        </CancelEventAlert>
      );
    },
    [
      classes.danger,
      classes.success,
      classes.button,
      props,
      requestCancelEvent,
      history
    ]
  );
  /* #endregion */

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

  /* #region ############ unpledgeEventAlert() & requestUnpledgeEvent(): Unpledge to an pledge event ############## */
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

  /* #region ############ requestLikeEvent() & requestUnlikeEvent(): Like or Unlike ############## */
  const requestLikeEvent = React.useCallback(
    async event_ => {
      return await postLikeEvent(event_);
    },
    [postLikeEvent]
  );
  const requestUnlikeEvent = React.useCallback(
    async event_ => {
      return await postUnlikeEvent(event_);
    },
    [postUnlikeEvent]
  );
  /* #endregion */

  /* #region ############ Initial initiation to values ############ */
  React.useEffect(() => {
    const initializeData = async () => {
      loadingAlert();
      const { eventId } = match.params;
      const event = await fetchOneEvent({ eventId: eventId });
      const { attendees, startDateTime, endDateTime, followers } = event;
      const userEmail = userInContext.user.email;
      const startDateTimeTemp = new Date(startDateTime);
      const endDateTimeTemp = new Date(endDateTime);
      const todayDate = new Date();

      let hideEditButtonTemp =
        event.organizer &&
        event.organizer.email !== userEmail &&
        (event.eventStatus !== "PENDING" || event.eventStatus !== "GREENLIT");
      let hideCancelButtonTemp =
        event.organizer &&
        event.organizer.email !== userEmail &&
        (event.eventStatus !== "PENDING" || event.eventStatus !== "GREENLIT");
      let hideJoinButtonTemp =
        attendees.some(attendee => attendee.email === userEmail) ||
        (event.eventStatus !== "PENDING" && event.eventStatus !== "GREENLIT");
      let hideUnjoinButtonTemp = !hideJoinButtonTemp;

      if (event.organizer && event.organizer.email === userEmail) {
        hideJoinButtonTemp = true;
        hideUnjoinButtonTemp = true;
      }

      if (todayDate > startDateTimeTemp) {
        hideEditButtonTemp = true;
        hideCancelButtonTemp = true;
        hideJoinButtonTemp = true;
        hideUnjoinButtonTemp = true;
      } else {
        //pending
      }

      if (todayDate > endDateTimeTemp) {
        hideEditButtonTemp = true;
        hideCancelButtonTemp = true;
        hideJoinButtonTemp = true;
        hideUnjoinButtonTemp = true;
      } else {
        //pending
      }

      if (
        event.eventStatus === "CANCELED" ||
        event.eventStatus === "STARTED" ||
        event.eventStatus === "FINISHED"
      ) {
        hideEditButtonTemp = true;
        hideCancelButtonTemp = true;
        hideJoinButtonTemp = true;
        hideUnjoinButtonTemp = true;
      }

      setHideEditButton(hideEditButtonTemp);
      setHideCancelButton(hideCancelButtonTemp);
      setHideJoinButton(hideJoinButtonTemp);
      setHideUnjoinButton(hideUnjoinButtonTemp);

      // Like & unlike
      const toggleLikeButtonTemp = followers.some(
        follower => follower.email === userEmail
      );
      setToggleLikeButton(toggleLikeButtonTemp);

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
                  {/* [Edit] Button */}
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
                  {/* [Cancel] Button */}
                  {hideCancelButton ? (
                    ""
                  ) : (
                    <Button
                      color="danger"
                      className={classes.formButton}
                      onClick={() => cancelEventAlert(event)}
                    >
                      Cancel
                    </Button>
                  )}
                  {/* [Pledge] Button */}
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
                  {/* [Unpledge] Button */}
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
                  {/* [Like && Unlike] Button */}
                  {toggleLikeButton ? (
                    <Button
                      color="info"
                      className={classes.formButton}
                      onClick={() => {
                        requestUnlikeEvent(event);
                        setToggleLikeButton(false);
                      }}
                    >
                      Unlike
                    </Button>
                  ) : (
                    <Button
                      color="info"
                      className={classes.formButton}
                      onClick={() => {
                        requestLikeEvent(event);
                        setToggleLikeButton(true);
                      }}
                    >
                      Like
                    </Button>
                  )}
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
