import React from "react";
import PropTypes from "prop-types";
import {
  userInContextTemplate,
  userInContextLogoutTemplate
} from "../_helper/objTemplate";
import { getEpochDate } from "../_helper/date";
// This is the object created to be accessed everywhere you like
// Registering into react context manager
export const UserContext = React.createContext({
  userInContext: "",
  setUserInContext: () => {}
});

// This is the "interface function" called "Provider" to manipulate the object above
const UserContextProvider = props => {
  const [user, setUser] = React.useState(userInContextTemplate);

  //actual method to change values
  const setUserHandler = input => {
    setUser({ ...input });
  };

  React.useEffect(() => {
    const loggedInUserSerialized = localStorage.getItem("loggedInUser");
    if (loggedInUserSerialized && !user.isLoggedOn) {
      const loggedinUser = JSON.parse(loggedInUserSerialized);
      const { exp } = loggedinUser;
      const timeOutInMilliSeconds = (exp - getEpochDate()) * 1000;

      if (timeOutInMilliSeconds >= 0) {
        setUser(loggedinUser);
        setTimeout(() => {
          setUser(userInContextLogoutTemplate);
          localStorage.clear();
        }, timeOutInMilliSeconds);
      }
    }
  }, [user, setUser]);

  // this defines the way to use it, {props.children} means anything
  // <UserContextProvider> & </UserContextProvider> wraps around
  // for this example, <UserContextProvider> & </UserContextProvider>
  // used in App.js
  return (
    <UserContext.Provider
      value={{
        userInContext: user, //link between the top object and Provider
        setUserInContext: setUserHandler //link between the top object and Provider
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default UserContextProvider;
