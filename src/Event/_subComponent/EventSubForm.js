import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Datetime from "react-datetime";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
// material ui icons
import MailOutline from "@material-ui/icons/MailOutline";
import MoodBad from "@material-ui/icons/MoodBad";
import Mood from "@material-ui/icons/Mood";
// core components
import GridContainer from "../../_rootComponent/Grid/GridContainer";
import GridItem from "../../_rootComponent/Grid/GridItem";
import CustomInput from "../../_rootComponent/CustomInput/CustomInput";
// style for this view
import formStyle from "../../_rootAsset/jss/formStyle";
// others
import { FORM1_CHECK_READY } from "../_subAction/eventAction";

const useFormStyle = makeStyles(formStyle);

const EventSubForm = props => {
  // eslint-disable-next-line no-unused-vars
  const {
    dispatchValidate,
    fieldsStatus,
    setFieldsStatus,
    event,
    setEvent
  } = props;
  const classes = { ...useFormStyle() };
  const handleTextFieldChange = e => {
    const { name, value } = e.target;
    value
      ? setFieldsStatus({ ...fieldsStatus, [name]: 2 })
      : setFieldsStatus({ ...fieldsStatus, [name]: 1 });
    let eventTemp = { ...event, [name]: value };

    if (name === "minAttendees" && isNaN(value)) {
      eventTemp = { ...event, [name]: value.slice(0, -1) };
    }

    setEvent(eventTemp);
    dispatchValidate({
      action: FORM1_CHECK_READY,
      payload: {
        formNo: 1,
        fieldsStatus: fieldsStatus
      }
    });
  };
  const handleDateChange = (momentObject, dateField) => {
    if (typeof momentObject.format !== "undefined") {
      const dateString = momentObject.format("YYYY-MM-DD HH:mm");
      let eventTemp = { ...event };

      eventTemp[dateField] = dateString;
      setEvent(eventTemp);
      handleTextFieldChange({
        target: { name: dateField, value: dateString }
      });

      dispatchValidate({
        action: FORM1_CHECK_READY,
        payload: {
          formNo: 1,
          fieldsStatus: fieldsStatus
        }
      });
    }
  };
  return (
    <Fragment>
      <GridContainer>
        <GridItem>
          <p className={classes.title}>Fill in [Event] Details</p>
          <div className={classes.iconWrapper}>
            <MailOutline fontSize="small" />
          </div>
        </GridItem>
      </GridContainer>
      <GridContainer className={classes.childContainer}>
        <GridItem lg={12}>
          <GridContainer className={classes.gridAlternateBgColor}>
            <GridItem lg={2}>
              <FormLabel
                className={classes.labelHorizontalForm}
                required={true}
              >
                Event Name:
              </FormLabel>
            </GridItem>
            <GridItem lg={9}>
              <CustomInput
                success={fieldsStatus.name === 2}
                error={fieldsStatus.name === 1}
                labelText="(e.g. Bukit Kinabalu 2020!)"
                id="name"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  name: "name",
                  type: "text",
                  value: event.name,
                  onChange: e => handleTextFieldChange(e)
                }}
              />
            </GridItem>
          </GridContainer>
          <GridContainer>
            <GridItem lg={2}>
              <FormLabel
                className={classes.labelHorizontalForm}
                required={true}
              >
                Location(s):
              </FormLabel>
            </GridItem>
            <GridItem lg={9}>
              <CustomInput
                success={fieldsStatus.location === 2}
                error={fieldsStatus.location === 1}
                labelText="(e.g. Taiwan Mount Alishan, etc)"
                id="location"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  name: "location",
                  type: "text",
                  value: event.location,
                  onChange: e => handleTextFieldChange(e)
                }}
              />
            </GridItem>
          </GridContainer>
          <GridContainer className={classes.gridAlternateBgColor}>
            <GridItem lg={2}>
              <FormLabel
                className={classes.labelHorizontalForm}
                required={true}
              >
                Category(ies):
              </FormLabel>
            </GridItem>
            <GridItem lg={9}>
              <CustomInput
                success={fieldsStatus.category === 2}
                error={fieldsStatus.category === 1}
                labelText="(e.g. Chill, Hard, Nightmare, Torment)"
                id="category"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  name: "category",
                  type: "text",
                  value: event.category,
                  onChange: e => handleTextFieldChange(e)
                }}
              />
            </GridItem>
          </GridContainer>
          <GridContainer>
            <GridItem lg={2}>
              <FormLabel
                className={classes.labelHorizontalForm}
                required={true}
              >
                Min. Pledged Hiker(s) Required:
              </FormLabel>
            </GridItem>
            <GridItem lg={9}>
              <CustomInput
                success={fieldsStatus.minAttendees === 2}
                error={fieldsStatus.minAttendees === 1}
                labelText="(e.g. 2, 3, 4, etc)"
                id="minAttendees"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  name: "minAttendees",
                  type: "text",
                  value: event.minAttendees,
                  onChange: e => handleTextFieldChange(e)
                }}
              />
            </GridItem>
          </GridContainer>
          <GridContainer className={classes.gridAlternateBgColor}>
            <GridItem lg={2}>
              <FormLabel
                className={classes.labelHorizontalForm}
                required={true}
              >
                Start Date:
                {fieldsStatus.startDateTime === 2 ? (
                  <Mood className={classes.inputAdornmentIconSuccess} />
                ) : (
                  ""
                )}
                {fieldsStatus.startDateTime === 1 ? (
                  <MoodBad className={classes.inputAdornmentIconError} />
                ) : (
                  ""
                )}
              </FormLabel>
            </GridItem>
            <GridItem lg={9}>
              <FormControl fullWidth>
                <Datetime
                  id="startDateTime"
                  name="startDateTime"
                  timeFormat={true}
                  className={classes.horizontalDatepicker}
                  inputProps={{
                    placeholder: "(e.g. 10/10/2019 12.00am, etc)",
                    selected: event.startDateTime
                  }}
                  onChange={e => handleDateChange(e, "startDateTime")}
                  value={event.startDateTime}
                  closeOnSelect
                />
              </FormControl>
            </GridItem>
          </GridContainer>
          <GridContainer>
            <GridItem lg={2}>
              <FormLabel
                className={classes.labelHorizontalForm}
                required={true}
              >
                End Date:
                {fieldsStatus.endDateTime === 2 ? (
                  <Mood className={classes.inputAdornmentIconSuccess} />
                ) : (
                  ""
                )}
                {fieldsStatus.endDateTime === 1 ? (
                  <MoodBad className={classes.inputAdornmentIconError} />
                ) : (
                  ""
                )}
              </FormLabel>
            </GridItem>
            <GridItem lg={9}>
              <FormControl fullWidth>
                <Datetime
                  id="endDateTime"
                  name="endDateTime"
                  timeFormat={true}
                  className={classes.horizontalDatepicker}
                  inputProps={{
                    placeholder: "(e.g. 10/10/2019 12.00am, etc)",
                    selected: event.endDateTime
                  }}
                  onChange={e => handleDateChange(e, "endDateTime")}
                  value={event.endDateTime}
                  closeOnSelect
                />
              </FormControl>
            </GridItem>
          </GridContainer>
          <GridContainer className={classes.gridAlternateBgColor}>
            <GridItem lg={2}>
              <FormLabel
                className={classes.labelHorizontalForm}
                required={true}
              >
                Trip Itinerary:
              </FormLabel>
            </GridItem>
            <GridItem lg={9}>
              <CustomInput
                success={fieldsStatus.description === 2}
                error={fieldsStatus.description === 1}
                labelText="Climb climb here, climb climb there. Walk walk here, walk walk there., etc"
                id="description"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  name: "description",
                  type: "text",
                  multiline: true,
                  rows: "6",
                  value: event.description,
                  onChange: e => handleTextFieldChange(e)
                }}
              />
            </GridItem>
          </GridContainer>
        </GridItem>
      </GridContainer>
    </Fragment>
  );
};

EventSubForm.propTypes = {
  dispatchValidate: PropTypes.func,
  formValidityState: PropTypes.object,
  fieldsStatus: PropTypes.object,
  setFieldsStatus: PropTypes.func,
  event: PropTypes.object,
  setEvent: PropTypes.func,
  children: PropTypes.node
};

export default EventSubForm;
