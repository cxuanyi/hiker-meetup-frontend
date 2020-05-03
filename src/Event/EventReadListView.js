import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Pageview from "@material-ui/icons/Pageview";
import ViewListIcon from "@material-ui/icons/ViewList";
// core components
import GridContainer from "../_rootComponent/Grid/GridContainer";
import GridItem from "../_rootComponent/Grid/GridItem";
import ListButton from "../_rootComponent/CustomButtons/ListButton";
import ReactTable from "../_rootComponent/ReactTable/ReactTable";
// styles
import formStyle from "../_rootAsset/jss/formStyle";
import sweetAlertStyle from "../_rootComponent/CustomAlert/jss/sweetAlertStyle";
// others
import useEventApi from "./_subApi/eventApi";
import LoadingAlert from "../_rootComponent/CustomAlert/LoadingAlert";
import { getISOToDateString } from "../_helper/date";

const useFormStyle = makeStyles(formStyle);
const useSweetAlertStyle = makeStyles(sweetAlertStyle);

const EventReadListView = props => {
  const { match } = props;

  const classes = { ...useFormStyle(), ...useSweetAlertStyle() };
  const [alert, setAlert] = React.useState(null);
  const [allEventList, setAllEventList] = React.useState();
  const { fetchAllEvents } = useEventApi();

  const loadingAlert = React.useCallback(() => {
    setAlert(<LoadingAlert {...props} setAlert={setAlert} />);
  }, [props]);
  const hideAlert = () => {
    setAlert(null);
  };

  const dataMapper = React.useCallback(
    inputArray => {
      const outputArray = inputArray.map((object, sn) => {
        const { id } = object;
        const startDate = getISOToDateString(object.startDateTime);
        const endDate = getISOToDateString(object.endDateTime);
        const actions = (
          // we've added some custom button actions
          <div className={classes.right}>
            {/* use this button to add a edit kind of action */}
            <ListButton
              component={Link}
              to={`/main/Events/ViewEvent/${id}`}
              color="info"
            >
              <Pageview />
            </ListButton>
          </div>
        );
        return {
          ...object,
          ...{
            sn: sn + 1,
            startDate: startDate,
            endDate: endDate,
            pledgedHikers: object.attendees.length,
            actions: actions
          }
        };
      });
      return outputArray;
    },
    [classes]
  );

  const columns = React.useMemo(
    () => [
      {
        Header: "SN",
        accessor: "sn",
        width: 60,
        disableFilters: true
      },
      {
        Header: "Organizer",
        accessor: "organizer",
        filter: "fuzzyText"
      },
      {
        Header: "Event Title",
        accessor: "name ",
        filter: "fuzzyText"
      },
      {
        Header: "Hiking Location",
        accessor: "location",
        filter: "fuzzyText"
      },
      {
        Header: "Event Status",
        accessor: "eventStatus",
        filter: "fuzzyText"
      },
      {
        Header: "Start Date",
        accessor: "startDate",
        filter: "fuzzyText"
      },
      {
        Header: "End Date",
        accessor: "endDate",
        filter: "fuzzyText"
      },
      {
        Header: "Min. Hikers",
        accessor: "minAttendees",
        filter: "fuzzyText"
      },
      {
        Header: "Pledged Hikers",
        accessor: "pledgedHikers",
        filter: "fuzzyText"
      },
      {
        Header: "Actions",
        accessor: "actions",
        disableFilters: true,
        disableSortBy: true,
        align: "right"
      }
    ],
    []
  );

  const initializeDataCallback = React.useCallback(async () => {
    loadingAlert();
    const { eventId } = match.params;
    console.log("eventId: ", eventId);
    const responseObject = await fetchAllEvents();
    const embeddedObject = responseObject._embedded
      ? responseObject._embedded
      : null;
    const events = embeddedObject ? embeddedObject.events : [];
    const eventsMapped = dataMapper(events);
    setAllEventList(eventsMapped);
    hideAlert();
  }, [loadingAlert, dataMapper, match]);

  React.useEffect(() => {
    initializeDataCallback();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      {alert}
      <GridContainer>
        <GridItem lg={12}>
          <p className={classes.title}>Listing All Hiking Events</p>
          <div className={classes.iconWrapper}>
            <ViewListIcon fontSize="small" />
          </div>
        </GridItem>
        <GridItem lg={12}>
          {allEventList ? (
            <ReactTable data={allEventList} columns={columns} />
          ) : null}
        </GridItem>
      </GridContainer>
    </div>
  );
};

EventReadListView.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object,
  children: PropTypes.node
};

export default EventReadListView;
