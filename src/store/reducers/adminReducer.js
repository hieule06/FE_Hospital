import actionTypes from "../actions/actionTypes";

const initialState = {
  isLoadingData: false,
  genders: [],
  positions: [],
  roles: [],
  dataDoctors: [],
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_GENDER_START:
      state.isLoadingData = true;
      return {
        ...state,
      };
    case actionTypes.FETCH_GENDER_SUCCESS:
      state.genders = action.genderData;
      state.isLoadingData = false;
      return {
        ...state,
      };
    case actionTypes.FETCH_GENDER_FAIL:
      state.isLoadingData = false;
      return {
        ...state,
        genders: [],
      };
    case actionTypes.FETCH_ROLE_SUCCESS:
      state.roles = action.dataRole;
      return {
        ...state,
      };
    case actionTypes.FETCH_ROLE_FAIL:
      return {
        ...state,
        roles: [],
      };
    case actionTypes.FETCH_POSITION_SUCCESS:
      state.positions = action.positionData;
      return {
        ...state,
      };
    case actionTypes.FETCH_POSITION_FAIL:
      return {
        ...state,
        positions: [],
      };
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
    default:
      return state;
  }
};

export default adminReducer;
