import React from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Button from "../_rootComponent/CustomButtons/Button";
import GridContainer from "../_rootComponent/Grid/GridContainer";
import GridItem from "../_rootComponent/Grid/GridItem";
// sub components
import EventSubForm from "./_subComponent/EventSubForm";
import EventSubView from "./_subComponent/EventSubView";
// style for this view
import formStyle from "../_rootAsset/jss/formStyle";
import sweetAlertStyle from "../_rootComponent/CustomAlert/jss/sweetAlertStyle";
//others
import useEventApi from "./_subApi/eventApi";
import {
  eventTemplate,
  fieldsStatusTemplate
} from "./_subHelper/eventObjTemplate";
import UpdateAlert from "../_rootComponent/CustomAlert/UpdateAlert";
import CancelAlert from "../_rootComponent/CustomAlert/CancelAlert";
import {
  FORM_INITIAL_STATE,
  FORM1_CHECK_READY,
  FORM_SUBMIT_CHECK_READY,
  READY_TO_SUBMIT,
  SUBMIT_EVENT,
  SUBMISSION_SUCCESS
} from "./_subAction/eventAction";
import { setAllValOf1LvlObj } from "../_helper/object";

const useFormStyle = makeStyles(formStyle);
const useSweetAlertStyle = makeStyles(sweetAlertStyle);

const EventEditForm = props => {
  const { history, match } = props;
  const classes = { ...useFormStyle(), ...useSweetAlertStyle() };
  const startPage = 1;
  const minPage = 1;
  const maxPage = 2;
  const editFieldsStatusTemplate = setAllValOf1LvlObj(fieldsStatusTemplate, 2);
  const { fetchOneEvent, updateEvent } = useEventApi();
  const [alert, setAlert] = React.useState(null);
  const [currentPage, setCurrentPage] = React.useState(startPage);
  const [event, setEvent] = React.useState(eventTemplate);

  const [fieldsStatus, setFieldsStatus] = React.useState(
    editFieldsStatusTemplate
  );

  /* #region ############ initializeData ############ */
  React.useEffect(() => {
    const initializeData = async () => {
      const { eventId } = match.params;
      let eventTemp = await fetchOneEvent({ eventId: eventId });

      eventTemp = {
        ...eventTemp,
        startDateTime: new Date(eventTemp.startDateTime),
        endDateTime: new Date(eventTemp.endDateTime)
      };

      dispatchValidate({
        action: FORM1_CHECK_READY,
        payload: {
          formNo: 1,
          fieldsStatus: fieldsStatus
        }
      });
      dispatchValidate({
        action: FORM_SUBMIT_CHECK_READY,
        payload: {
          formNo: 1,
          fieldsStatus: fieldsStatus
        }
      });
      setEvent(eventTemp);
    };
    initializeData();
    // eslint-disable-next-line
  }, []);
  /* #endregion */

  /* #region ############ cancelAlert ############ */
  const cancelAlert = React.useCallback(() => {
    setAlert(
      <CancelAlert
        {...props}
        setAlert={setAlert}
        confirmBtnCssClass={classes.button + " " + classes.success}
        cancelBtnCssClass={classes.button + " " + classes.danger}
        cancelCallback={() => {
          hideAlert();
          history.push("/main/Events/EventReadList");
        }}
      >
        You will lose the entered information!
      </CancelAlert>
    );
  }, [classes.success, classes.button, classes.danger, props, history]);
  /* #endregion */

  /* #region ############ postUpdateEvent, updateEventCallback, updateAlert ############ */
  const updateEventCallback = React.useCallback(async () => {
    let startDateTimeTemp = new Date(event.startDateTime);
    let endDateTimeTemp = new Date(event.endDateTime);
    startDateTimeTemp.setDate(startDateTimeTemp.getDate() + 1);
    endDateTimeTemp.setDate(endDateTimeTemp.getDate() + 1);
    let startDateTimeTempISOString = startDateTimeTemp.toISOString();
    let endDateTimeTempISOString = endDateTimeTemp.toISOString();

    startDateTimeTempISOString =
      startDateTimeTempISOString.substring(
        0,
        startDateTimeTempISOString.indexOf("T") + 1
      ) + "00:00";

    endDateTimeTempISOString =
      endDateTimeTempISOString.substring(
        0,
        endDateTimeTempISOString.indexOf("T") + 1
      ) + "00:00";

    let eventTemp = {
      ...event,
      minAttendees: parseInt(event.minAttendees),
      startDateTime: startDateTimeTempISOString,
      endDateTime: endDateTimeTempISOString
    };

    return await updateEvent(eventTemp);
  }, [updateEvent, event]);
  const updateAlert = React.useCallback(() => {
    setAlert(
      <UpdateAlert
        {...props}
        setAlert={setAlert}
        confirmBtnCssClass={classes.button + " " + classes.success}
        cancelBtnCssClass={classes.button + " " + classes.danger}
        updateCallback={async () => {
          const callbackResult = await updateEventCallback();
          return callbackResult;
        }}
        redirectCallback={inputId => {
          const baseRedirect = "/main/Events/ListEvents";
          history.push(inputId ? `${baseRedirect}/${inputId}` : inputId);
        }}
      >
        New Event will be updated, you sure?
      </UpdateAlert>
    );
  }, [
    classes.danger,
    classes.success,
    classes.button,
    props,
    history,
    updateEventCallback
  ]);
  /* #endregion */

  /* #region ############ formValidityReducer, formValidityState, dispatchValidate ############ */
  const formValidityReducer = React.useCallback(
    (state, { action, payload }) => {
      let someFormsNotOk = false;
      switch (action) {
        case FORM_INITIAL_STATE:
          return {
            status: FORM_INITIAL_STATE,
            isFormsEntriesOk: { 1: false }
          };
        case FORM1_CHECK_READY:
          if (payload.formNo) {
            return {
              ...state,
              isFormsEntriesOk: {
                ...state.isFormsEntriesOk,
                [payload.formNo]: {
                  formStatus: !Object.keys(fieldsStatus).some(
                    key => fieldsStatus[key] === 0 || fieldsStatus[key] === 1
                  )
                }
              },
              status: FORM1_CHECK_READY
            };
          }
          return { ...state };
        case FORM_SUBMIT_CHECK_READY:
          someFormsNotOk = Object.keys(state.isFormsEntriesOk).some(key => {
            return state.isFormsEntriesOk[key] === false;
          });
          return !someFormsNotOk
            ? { ...state, status: FORM_SUBMIT_CHECK_READY }
            : { ...state };
        default:
          throw new Error();
      }
    },
    [fieldsStatus]
  );
  const [formValidityState, dispatchValidate] = React.useReducer(
    formValidityReducer,
    {
      status: FORM_INITIAL_STATE,
      isFormsEntriesOk: { 1: false }
    }
  );
  /* #endregion */

  /* #region ############ submitReducer, updateNewEventState, dispatchSubmit ############ */
  const submitReducer = React.useCallback((state, { action, payload }) => {
    switch (action) {
      case READY_TO_SUBMIT:
        return { status: READY_TO_SUBMIT };
      case SUBMIT_EVENT:
        return { ...state, status: SUBMIT_EVENT };
      case SUBMISSION_SUCCESS:
        return {
          ...state,
          status: SUBMISSION_SUCCESS,
          payload: { ...state.payload, ...payload }
        };
      default:
        throw new Error();
    }
  }, []);
  const [updateNewEventState, dispatchSubmit] = React.useReducer(
    submitReducer,
    { status: READY_TO_SUBMIT }
  );
  React.useEffect(() => {
    (async () => {
      if (updateNewEventState.status === SUBMIT_EVENT) {
        dispatchSubmit({ action: READY_TO_SUBMIT });
      }
    })();
  }, [updateNewEventState]);
  /* #endregion */

  /* #region ############ nextPrevHandler ############ */
  const nextPrevHandler = () => {
    if (currentPage === 1) {
      const eventTemp = { ...event };
      const fieldsStatusTemp = { ...fieldsStatus };

      Object.keys(fieldsStatus).forEach(a => {
        fieldsStatusTemp[a] = fieldsStatus[a] === 0 ? 1 : fieldsStatus[a];
      });

      setEvent(eventTemp);
      setFieldsStatus(fieldsStatusTemp);
    }

    if (formValidityState.isFormsEntriesOk[1].formStatus)
      currentPage < maxPage
        ? setCurrentPage(currentPage + 1)
        : setCurrentPage(currentPage);
  };
  const hideAlert = () => {
    setAlert(null);
  };
  /* #endregion */

  /* #region ############ View Rendering Section ############ */
  const renderSubForms = currentPage => {
    switch (currentPage) {
      case 1:
        return (
          <EventSubForm
            formValidityState={formValidityState}
            dispatchValidate={dispatchValidate}
            fieldsStatus={fieldsStatus}
            setFieldsStatus={setFieldsStatus}
            event={event}
            setEvent={setEvent}
          />
        );
      case 2:
        return (
          <EventSubView dispatchValidate={dispatchValidate} event={event} />
        );
      default:
        return "";
    }
  };

  return (
    <div>
      {alert}
      <GridContainer className={classes.parentContainer}>
        <GridItem lg={12}>
          <form>
            {renderSubForms(currentPage)}
            <div className={classes.footer}>
              <div className={classes.buttonLeft}>
                <Button
                  color="danger"
                  className={classes.formButton}
                  onClick={() => cancelAlert()}
                >
                  Cancel
                </Button>
              </div>
              <div className={classes.right}>
                {currentPage < maxPage ? (
                  <Button
                    color="success"
                    className={classes.formButton}
                    onClick={e => nextPrevHandler(e)}
                  >
                    {currentPage < maxPage - 1 ? "Next" : "Preview"}
                  </Button>
                ) : (
                  <Button
                    color="primary"
                    className={classes.formButton}
                    disabled={
                      formValidityState.status !== FORM_SUBMIT_CHECK_READY
                        ? true
                        : false
                    }
                    onClick={() => {
                      updateAlert();
                      dispatchSubmit({ action: SUBMIT_EVENT });
                    }}
                  >
                    Save
                  </Button>
                )}
                {currentPage > minPage ? (
                  <Button
                    className={classes.formButton}
                    onClick={() =>
                      currentPage > minPage
                        ? setCurrentPage(currentPage - 1)
                        : setCurrentPage(currentPage)
                    }
                  >
                    Prev
                  </Button>
                ) : (
                  ""
                )}
              </div>
            </div>
          </form>
        </GridItem>
      </GridContainer>
    </div>
  );
  /* #endregion */
};

EventEditForm.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object,
  children: PropTypes.node
};

export default withRouter(EventEditForm);
