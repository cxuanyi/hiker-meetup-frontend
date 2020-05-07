import useORMSAxios from "../../_axios/ormsAxios";

const useEventApi = () => {
  const {
    ormsAxiosPostRequest,
    ormsAxiosGetRequest
    // ormsAxiosPutRequest,
    // ormsAxiosDeleteRequest,
    // ormsAxiosGetFileRequest
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

  /* #region ######################## Fetch all User  ######################## */
  const fetchAllUsers = async () => {
    const allUsers = await ormsAxiosGetRequest("/user");
    return allUsers;
  };
  /* #endregion */

  /* #region ######################## Create Full Event  ######################## */
  const createEvent = async event => {
    try {
      // Create Event & Upload File.
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

  return {
    fetchAllEvents,
    fetchAllUsers,
    fetchOneEvent,
    postPledgeEvent,
    createEvent
  };
};

export default useEventApi;
