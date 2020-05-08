import useORMSAxios from "../../_axios/ormsAxios";

const useEventApi = () => {
  const {
    ormsAxiosPostRequest,
    ormsAxiosGetRequest,
    ormsAxiosPatchRequest
    // ormsAxiosDeleteRequest,
  } = useORMSAxios();

  /* #region ######################## Fetch all Events  ######################## */
  const fetchAllEvents = async () => {
    const allEvents = await ormsAxiosGetRequest("/events");
    return allEvents;
  };
  /* #endregion */

  /* #region ######################## Fetch all Events  ######################## */
  const fetchOneEvent = async ({ eventId }) => {
    const event = await ormsAxiosGetRequest(`/events/${eventId}`);
    return event;
  };
  /* #endregion */

  /* #region ######################## Fetch all User  ######################## */
  const fetchAllUsers = async () => {
    const allUsers = await ormsAxiosGetRequest("/user");
    return allUsers;
  };
  /* #endregion */

  /* #region ######################## Create Event  ######################## */
  const createEvent = async event => {
    try {
      // Create Event
      const responseData = await ormsAxiosPostRequest("/events", event, {
        headers: { "Content-Type": "application/json" }
      });

      // backend return failure to create
      if (responseData.error) {
        throw new Error();
      }
      return responseData;
    } catch (error) {
      return { error: 1 };
    }
  };
  /* #endregion */

  /* #region ######################## Update Event  ######################## */
  const updateEvent = async event => {
    try {
      // Update Event
      const responseData = await ormsAxiosPatchRequest(
        `/events/${event.id}`,
        event,
        {
          headers: { "Content-Type": "application/json" }
        }
      );

      // backend return failure to create
      if (responseData.error) {
        throw new Error();
      }
      return responseData;
    } catch (error) {
      return { error: 1 };
    }
  };
  /* #endregion */

  /* #region ######################## Post Cancel Event ######################## */
  const postCancelEvent = async event => {
    try {
      const eventId = event.id;
      const responseData = await ormsAxiosPostRequest(
        `/events/${eventId}/cancel`,
        {},
        { headers: { "Content-Type": "application/json" } }
      );

      if (responseData.error) {
        throw new Error();
      }

      return responseData;
    } catch (error) {
      return { error: 1 };
    }
  };
  /* #endregion */

  /* #region ######################## Post Pledge Event ######################## */
  const postPledgeEvent = async event => {
    try {
      const eventId = event.id;
      const responseData = await ormsAxiosPostRequest(
        `/events/${eventId}/attend`,
        {},
        { headers: { "Content-Type": "application/json" } }
      );

      if (responseData.error) {
        throw new Error();
      }

      return responseData;
    } catch (error) {
      return { error: 1 };
    }
  };
  /* #endregion */

  /* #region ######################## Post Unpledge Event ######################## */
  const postUnpledgeEvent = async event => {
    try {
      const eventId = event.id;
      const responseData = await ormsAxiosPostRequest(
        `/events/${eventId}/miss`,
        {},
        { headers: { "Content-Type": "application/json" } }
      );

      if (responseData.error) {
        throw new Error();
      }

      return responseData;
    } catch (error) {
      return { error: 1 };
    }
  };
  /* #endregion */

  return {
    fetchAllEvents,
    fetchAllUsers,
    fetchOneEvent,
    createEvent,
    updateEvent,
    postCancelEvent,
    postPledgeEvent,
    postUnpledgeEvent
  };
};

export default useEventApi;
