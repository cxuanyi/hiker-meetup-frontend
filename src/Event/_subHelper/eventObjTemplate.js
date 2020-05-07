const eventTemplate = {
  event_id: "",
  name: "",
  location: "",
  category: "",
  minAttendees: "",
  startDateTime: "",
  endDateTime: "",
  description: ""
};

// 0 - Not validated yet
// 1 - validated with error
// 2 - validated and ok
// ** To enable no validation for development purpose, set to 2
const fieldsStatusTemplate = {
  event_id: 2,
  name: 0,
  location: 0,
  category: 0,
  minAttendees: 0,
  startDateTime: 0,
  endDateTime: 0,
  description: 0
};

export { eventTemplate, fieldsStatusTemplate };
