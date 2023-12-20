import actionTypes from "../actions/actionTypes";

const initialState = {
  dataDoctors: [],
  allDoctors: [],
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
    default:
      return state;
  }
};

export default doctorReducer;
