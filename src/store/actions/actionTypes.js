const actionTypes = Object.freeze({
  //app
  APP_START_UP_COMPLETE: "APP_START_UP_COMPLETE",
  SET_CONTENT_OF_CONFIRM_MODAL: "SET_CONTENT_OF_CONFIRM_MODAL",
  CHANGE_LANGUAGE: "CHANGE_LANGUAGE",

  //admin
  FETCH_GENDER_START: "FETCH_GENDER_START",
  FETCH_GENDER_SUCCESS: "FETCH_GENDER_SUCCESS",
  FETCH_GENDER_FAIL: "FETCH_GENDER_FAIL",

  FETCH_ROLE_SUCCESS: "FETCH_ROLE_SUCCESS",
  FETCH_ROLE_FAIL: "FETCH_ROLE_FAIL",

  FETCH_POSITION_SUCCESS: "FETCH_POSITION_SUCCESS",
  FETCH_POSITION_FAIL: "FETCH_POSITION_FAIL",

  //user
  USER_LOGIN_SUCCESS: "USER_LOGIN_SUCCESS",
  USER_LOGIN_FAIL: "USER_LOGIN_FAIL",
  PROCESS_LOGOUT: "PROCESS_LOGOUT",

  ADD_USER_SUCCESS: "ADD_USER_SUCCESS",

  //doctor
  FETCH_DATA_DOCTOR_SUCCESS: "FETCH_DATA_DOCTOR_SUCCESS",
  FETCH_DATA_DOCTOR_FAIL: "FETCH_DATA_DOCTOR_FAIL",

  // all doctor
  FETCH_ALL_DOCTOR_SUCCESS: "FETCH_ALL_DOCTOR_SUCCESS",
  FETCH_ALL_DOCTOR_FAIL: "FETCH_ALL_DOCTOR_FAIL",
});

export default actionTypes;
