// import * as actionType from "./mainAction";

const initialState = {};

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      console.log("mainReducer Default case Activated.");
  }
  return state;
};

export default mainReducer;
