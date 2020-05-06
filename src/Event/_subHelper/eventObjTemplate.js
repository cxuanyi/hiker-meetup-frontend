const eventTemplate = {
  event_id: "",
  name: ""
};

// 0 - Not validated yet
// 1 - validated with error
// 2 - validated and ok
// ** To enable no validation for development purpose, set to 2
const fieldsStatusTemplate = {
  event_number: 0,
  name: 0
};

export { eventTemplate, fieldsStatusTemplate };
