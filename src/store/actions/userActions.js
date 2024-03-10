import actionTypes from "./actionTypes";

export const userLoginSuccess = (userInfo) => ({
  type: actionTypes.USER_LOGIN_SUCCESS,
  userInfo: userInfo,
});

export const userLoginFail = () => ({
  type: actionTypes.USER_LOGIN_FAIL,
});

export const patientMainLoginSuccess = (patientInfo) => ({
  type: actionTypes.PATIENT_MAIN_LOGIN_SUCCESS,
  patientInfo: patientInfo,
});

export const patientMainLoginFail = () => ({
  type: actionTypes.PATIENT_MAIN_LOGIN_FAIL,
});

export const patientLoginSuccess = (patientInfo) => ({
  type: actionTypes.PATIENT_LOGIN_SUCCESS,
  patientInfo: patientInfo,
});

export const patientLoginFail = () => ({
  type: actionTypes.PATIENT_LOGIN_FAIL,
});

export const processLogout = () => ({
  type: actionTypes.PROCESS_LOGOUT,
});

export const patientMainLogout = () => ({
  type: actionTypes.PATIENT_MAIN_LOGOUT,
});

export const patientLogout = () => ({
  type: actionTypes.PATIENT_LOGOUT,
});

export const addUserSuccess = () => ({
  type: actionTypes.ADD_USER_SUCCESS,
});
