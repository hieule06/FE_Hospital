import actionTypes from "../actions/actionTypes";

const initialState = {
  dataDoctors: [],
  allDoctors: [],
  allDataSpecialty: [],
  allDataHandbook: [],
};

const doctorReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_DATA_DOCTOR_SUCCESS:
      return {
        ...state,
        dataDoctors: action.dataDoctors,
      };
    case actionTypes.FETCH_DATA_DOCTOR_FAIL:
      return {
        ...state,
        dataDoctors: [],
      };
    case actionTypes.FETCH_ALL_DOCTOR_SUCCESS:
      return {
        ...state,
        allDoctors: action.allDoctors,
      };
    case actionTypes.FETCH_ALL_DOCTOR_FAIL:
      return {
        ...state,
        allDoctors: [],
      };
    case actionTypes.FETCH_ALL_SPECIALTY_SUCCESS:
      return {
        ...state,
        allDataSpecialty: action.allSpecialties,
      };
    case actionTypes.FETCH_ALL_SPECIALTY_FAIL:
      return {
        ...state,
        allDataSpecialty: [],
      };
    case actionTypes.FETCH_ALL_HANDBOOK_SUCCESS:
      return {
        ...state,
        allDataHandbook: action.allHandbooks,
      };
    case actionTypes.FETCH_ALL_HANDBOOK_FAIL:
      return {
        ...state,
        allDataHandbook: [],
      };
    default:
      return state;
  }
};

export default doctorReducer;
