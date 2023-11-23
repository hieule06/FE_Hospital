import actionTypes from "../actions/actionTypes";

const initialState = {
  genders: [],
  positions: [],
  roles: [],
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_GENDER_SUCCESS:
      state.genders = action.genderData;
      return {
        ...state,
      };
    case actionTypes.FETCH_GENDER_FAIL:
      return {
        ...state,
        genders: [],
      };
    default:
      return state;
  }
};

export default adminReducer;
