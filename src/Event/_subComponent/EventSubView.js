import React, { Fragment } from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
// material ui icons
import Pageview from "@material-ui/icons/Pageview";
// core components
import GridContainer from "../../_rootComponent/Grid/GridContainer";
import GridItem from "../../_rootComponent/Grid/GridItem";
import TagsInput from "react-tagsinput";
// style for this view
import formStyle from "../../_rootAsset/jss/formStyle";
// other
import { FORM_SUBMIT_CHECK_READY } from "../_subAction/createEventAction";
import { getISOToDateString } from "../../_helper/date";

const useFormStyle = makeStyles(formStyle);

const EventSubView = props => {
  const { dispatchValidate, event } = props;
  const classes = { ...useFormStyle() };

  React.useEffect(() => {
    const currentUrl = window.location.href;
    if (
      currentUrl.includes("CreateEvent") ||
      currentUrl.includes("UpdateEvent")
    ) {
      dispatchValidate({
        action: FORM_SUBMIT_CHECK_READY,
        payload: {}
      });
    }
    // eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      <GridContainer>
        <GridItem>
          <p className={classes.title}>Event Details</p>
          <div className={classes.iconWrapper}>
            <Pageview fontSize="small" />
          </div>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem lg={12}>
          <div className={classes.subTitleWrapper}>
            <Typography className={classes.subTitle}>Event Overview</Typography>
          </div>
        </GridItem>
      </GridContainer>
      <GridContainer className={classes.childContainer}>
        <GridItem lg={12}>
          <GridContainer className={classes.gridAlternateBgColor}>
            <GridItem lg={2}>
              <Typography className={classes.labelHorizontalView}>
                Event ID:
              </Typography>
            </GridItem>
            <GridItem lg={10}>
              <p className={classes.viewText}>
                {event.id ? event.id : "Chill! Not available yet!"}
              </p>
            </GridItem>
          </GridContainer>
          <GridContainer>
            <GridItem lg={2}>
              <Typography className={classes.labelHorizontalView}>
                Event Name:
              </Typography>
            </GridItem>
            <GridItem lg={10}>
              <p className={classes.viewText}>{event.name}</p>
            </GridItem>
          </GridContainer>
          <GridContainer className={classes.gridAlternateBgColor}>
            <GridItem lg={2}>
              <Typography className={classes.labelHorizontalView}>
                Organizer:
              </Typography>
            </GridItem>
            <GridItem lg={10}>
              <p className={classes.viewText}>
                {event.organizer && event.organizer.name
                  ? event.organizer.name
                  : "You. Yes, you."}
              </p>
            </GridItem>
          </GridContainer>
          <GridContainer>
            <GridItem lg={2}>
              <Typography className={classes.labelHorizontalView}>
                Start Date:
              </Typography>
            </GridItem>
            <GridItem lg={10}>
              <p className={classes.viewText}>
                {getISOToDateString(event.startDateTime)}
              </p>
            </GridItem>
          </GridContainer>
          <GridContainer className={classes.gridAlternateBgColor}>
            <GridItem lg={2}>
              <Typography className={classes.labelHorizontalView}>
                End Date:
              </Typography>
            </GridItem>
            <GridItem lg={10}>
              <p className={classes.viewText}>
                {getISOToDateString(event.endDateTime)}
              </p>
            </GridItem>
          </GridContainer>
          <GridContainer>
            <GridItem lg={2}>
              <Typography className={classes.labelHorizontalView}>
                Event Status:
              </Typography>
            </GridItem>
            <GridItem lg={10}>
              <p className={classes.viewText}>
                {event.eventStatus
                  ? event.eventStatus
                  : "Available to be soon."}
              </p>
            </GridItem>
          </GridContainer>
          <GridContainer className={classes.gridAlternateBgColor}>
            <GridItem lg={2}>
              <Typography className={classes.labelHorizontalView}>
                Minimum Pledged Hiker(s):
              </Typography>
            </GridItem>
            <GridItem lg={10}>
              <p className={classes.viewText}>{event.minAttendees}</p>
            </GridItem>
          </GridContainer>
          <GridContainer>
            <GridItem lg={2}>
              <Typography className={classes.labelHorizontalView}>
                Current No. of Pledged Hiker(s):
              </Typography>
            </GridItem>
            <GridItem lg={10}>
              <p className={classes.viewText}>
                {event.attendees && event.attendees.length
                  ? event.attendees.length
                  : "Depends on your charm."}
              </p>
            </GridItem>
          </GridContainer>
          <GridContainer className={classes.gridAlternateBgColor}>
            <GridItem lg={2}>
              <Typography className={classes.labelHorizontalView}>
                Who Pledged:
              </Typography>
            </GridItem>
            <GridItem lg={10}>
              {event.attendees && event.attendees.length > 0 ? (
                event.attendees.map((attendee, index) => (
                  <TagsInput
                    key={index}
                    value={[`${attendee.name}`]}
                    disabled
                    tagProps={{
                      className: "react-tagsinput-tag warning"
                    }}
                  />
                ))
              ) : (
                <p className={classes.viewText}>No hiker pledged yet ;.(</p>
              )}
            </GridItem>
          </GridContainer>
          <GridContainer>
            <GridItem lg={2}>
              <Typography className={classes.labelHorizontalView}>
                Event Itinerary:
              </Typography>
            </GridItem>
            <GridItem lg={10}>
              <p className={classes.viewText}>{event.description}</p>
            </GridItem>
          </GridContainer>
        </GridItem>
      </GridContainer>
    </Fragment>
  );
};

EventSubView.propTypes = {
  history: PropTypes.object,
  dispatchValidate: PropTypes.func,
  event: PropTypes.object,
  children: PropTypes.node
};

export default EventSubView;
