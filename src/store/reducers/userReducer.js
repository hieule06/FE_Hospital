import actionTypes from "../actions/actionTypes";

const initialState = {
  isLoggedIn: false,
  isPatientMainLoggedIn: false,
  isPatientLoggedIn: false,
  userInfo: null,
  patientInfo: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        userInfo: action.userInfo,
      };
    case actionTypes.USER_LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        userInfo: null,
      };
    case actionTypes.PATIENT_MAIN_LOGIN_SUCCESS:
      return {
        ...state,
        isPatientMainLoggedIn: true,
        patientInfo: action.patientInfo,
      };
    case actionTypes.PATIENT_MAIN_LOGIN_FAIL:
      return {
        ...state,
        isPatientMainLoggedIn: false,
        patientInfo: null,
      };
    case actionTypes.PATIENT_LOGIN_SUCCESS:
      return {
        ...state,
        isPatientLoggedIn: true,
        patientInfo: action.patientInfo,
      };
    case actionTypes.PATIENT_LOGIN_FAIL:
      return {
        ...state,
        isPatientLoggedIn: false,
        patientInfo: null,
      };
    case actionTypes.PROCESS_LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        userInfo: null,
      };
    case actionTypes.PATIENT_LOGOUT:
      return {
        ...state,
        isPatientMainLoggedIn: false,
        isPatientLoggedIn: false,
        patientInfo: null,
      };
    default:
      return state;
  }
};

export default userReducer;
