import useORMSAxios from "../../_axios/ormsAxios";

const useTestingApi = () => {
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

  /* #region ######################## Fetch all User  ######################## */
  const fetchAllUsers = async () => {
    const allUsers = await ormsAxiosGetRequest("/user");
    return allUsers;
  };
  /* #endregion */

  /* #region ######################## Create Full Event  ######################## */
  const createEvent = async () => {
    try {
      // Create Event & Upload File.
      const responseData = await ormsAxiosPostRequest(
        "/events",
        {
          startDateTime: "2020-04-03T15:10:39",
          organizer: "Chen, Xuanyi",
          attendees: [],
          minAttendees: 5,
          followers: [],
          eventStatus: "PENDING",
          category: "category",
          endDateTime: "2020-04-03T15:10:39",
          name: "name",
          location: "location",
          _links: {
            self: {
              href:
                "http://ec2-13-229-200-236.ap-southeast-1.compute.amazonaws.com/events/fdc552e3-2ae0-45d2-b154-f2e37a7bb0a0"
            },
            events: {
              href:
                "http://ec2-13-229-200-236.ap-southeast-1.compute.amazonaws.com/events"
            }
          }
        },
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

  return {
    fetchAllEvents,
    fetchAllUsers,
    createEvent
  };
};

export default useTestingApi;
