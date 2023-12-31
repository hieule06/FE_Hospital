import { getRegulation } from "../../services/userService";
import actionTypes from "./actionTypes";

export const fetchGenderStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.FETCH_GENDER_START });

      const dataGender = await getRegulation("GENDER");
      if (dataGender && dataGender.data.dataRegulation.errCode === 0) {
        dispatch(fetchGenderSuccess(dataGender.data.dataRegulation.data));
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
      const dataRole = await getRegulation("ROLE");
      if (dataRole && dataRole.data.dataRegulation.errCode === 0) {
        dispatch(fetchRoleSuccess(dataRole.data.dataRegulation.data));
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
      const dataPosition = await getRegulation("POSITION");
      if (dataPosition && dataPosition.data.dataRegulation.errCode === 0) {
        dispatch(fetchPositionSuccess(dataPosition.data.dataRegulation.data));
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

export const fetchPriceStart = () => {
  return async (dispatch, getState) => {
    try {
      const dataPrice = await getRegulation("PRICE");
      if (dataPrice && dataPrice.data.dataRegulation.errCode === 0) {
        dispatch(fetchPriceSuccess(dataPrice.data.dataRegulation.data));
      } else {
        dispatch(fetchPriceFail());
      }
    } catch (error) {
      dispatch(fetchPriceFail());
      console.log(error);
    }
  };
};

export const fetchPriceSuccess = (priceData) => ({
  type: actionTypes.FETCH_PRICE_SUCCESS,
  priceData: priceData,
});

export const fetchPriceFail = () => ({
  type: actionTypes.FETCH_PRICE_FAIL,
});

export const fetchScheduleHourStart = () => {
  return async (dispatch, getState) => {
    try {
      const dataTime = await getRegulation("TIME");
      if (dataTime && dataTime.data.dataRegulation.errCode === 0) {
        dispatch(fetchScheduleHourSuccess(dataTime.data.dataRegulation.data));
      } else {
        dispatch(fetchScheduleHourFail());
      }
    } catch (error) {
      dispatch(fetchScheduleHourFail());
      console.log(error);
    }
  };
};

export const fetchScheduleHourSuccess = (timeData) => ({
  type: actionTypes.FETCH_SCHEDULE_HOUR_SUCCESS,
  timeData: timeData,
});

export const fetchScheduleHourFail = () => ({
  type: actionTypes.FETCH_SCHEDULE_HOUR_FAIL,
});
