import actionTypes from "../actions/actionTypes";

const initialState = {
  dataDoctors: [],
  allDoctors: [],
  allBookingHadPatients: [],
  allDataSpecialty: [],
  allDataHandbook: [],
  allPatients: [],
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
    case actionTypes.FETCH_ALL_BOOKING_HAD_PATIENT_SUCCESS:
      return {
        ...state,
        allBookingHadPatients: action.allBookingHadPatients,
      };
    case actionTypes.FETCH_ALL_BOOKING_HAD_PATIENT_FAIL:
      return {
        ...state,
        allBookingHadPatients: [],
      };
    case actionTypes.FETCH_ALL_PATIENT_SUCCESS:
      return {
        ...state,
        allPatients: action.allPatients,
      };
    case actionTypes.FETCH_ALL_PATIENT_FAIL:
      return {
        ...state,
        allPatients: [],
      };
    default:
      return state;
  }
};

export default doctorReducer;
