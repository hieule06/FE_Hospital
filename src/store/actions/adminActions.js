import { getAllCode } from "../../services/userService";
import actionTypes from "./actionTypes";

export const fetchGenderStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.FETCH_GENDER_START });

      const dataGender = await getAllCode("GENDER");
      if (dataGender && dataGender.data.dataAllCode.errCode === 0) {
        dispatch(fetchGenderSuccess(dataGender.data.dataAllCode.data));
      } else {
        dispatch(fetchGenderFail());
      }
    } catch (error) {
      dispatch(fetchGenderFail());
      console.log(error);
    }
  };
};

export const fetchGenderSuccess = (genderData) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  genderData: genderData,
});

export const fetchGenderFail = () => ({
  type: actionTypes.FETCH_GENDER_FAIL,
});

export const fetchRoleStart = () => {
  return async (dispatch, getState) => {
    try {
      const dataRole = await getAllCode("ROLE");
      if (dataRole && dataRole.data.dataAllCode.errCode === 0) {
        dispatch(fetchRoleSuccess(dataRole.data.dataAllCode.data));
      } else {
        dispatch(fetchRoleFail());
      }
    } catch (error) {
      dispatch(fetchRoleFail());
      console.log(error);
    }
  };
};

export const fetchRoleSuccess = (dataRole) => ({
  type: actionTypes.FETCH_ROLE_SUCCESS,
  dataRole: dataRole,
});

export const fetchRoleFail = () => ({
  type: actionTypes.FETCH_ROLE_FAIL,
});

export const fetchPositionStart = () => {
  return async (dispatch, getState) => {
    try {
      const dataPosition = await getAllCode("POSITION");
      if (dataPosition && dataPosition.data.dataAllCode.errCode === 0) {
        dispatch(fetchPositionSuccess(dataPosition.data.dataAllCode.data));
      } else {
        dispatch(fetchPositionFail());
      }
    } catch (error) {
      dispatch(fetchPositionFail());
      console.log(error);
    }
  };
};

export const fetchPositionSuccess = (positionData) => ({
  type: actionTypes.FETCH_POSITION_SUCCESS,
  positionData: positionData,
});

export const fetchPositionFail = () => ({
  type: actionTypes.FETCH_POSITION_FAIL,
});
