// function that returns true if value is email, false otherwise
const userInContextTemplate = {
  accessToken: "",
  acl: null,
  exp: -1,
  iat: -1,
  isLoggedOn: false,
  user: null,
  loggedOnBefore: false
};

const userInContextLogoutTemplate = {
  ...userInContextTemplate,
  loggedOnBefore: true
};

export { userInContextTemplate, userInContextLogoutTemplate };
