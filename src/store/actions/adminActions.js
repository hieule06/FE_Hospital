import { getRegulation, getDataDoctors } from "../../services/userService";
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

export const fetchDataDoctorStart = () => {
  return async (dispatch, getState) => {
    try {
      const dataDoctors = await getDataDoctors();
      if (dataDoctors && dataDoctors.data.errCode === 0) {
        dispatch(fetchDataDoctorSuccess(dataDoctors.data.dataDoctors));
      } else {
        dispatch(fetchDataDoctorFail());
      }
    } catch (error) {
      dispatch(fetchDataDoctorFail());
      console.log(error);
    }
  };
};

export const fetchDataDoctorSuccess = (dataDoctors) => ({
  type: actionTypes.FETCH_DATA_DOCTOR_SUCCESS,
  dataDoctors: dataDoctors,
});

export const fetchDataDoctorFail = () => ({
  type: actionTypes.FETCH_DATA_DOCTOR_FAIL,
});
