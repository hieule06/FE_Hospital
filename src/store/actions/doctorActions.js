import actionTypes from "./actionTypes";
import { getDataDoctors, getAllDoctors } from "../../services/doctorService";

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

export const fetchAllDoctorStart = () => {
  return async (dispatch, getState) => {
    try {
      const allDoctors = await getAllDoctors();
      if (allDoctors && allDoctors.data.errCode === 0) {
        dispatch(fetchAllDoctorSuccess(allDoctors.data.dataDoctors));
      } else {
        dispatch(fetchAllDoctorFail());
      }
    } catch (error) {
      dispatch(fetchAllDoctorFail());
      console.log(error);
    }
  };
};

export const fetchAllDoctorSuccess = (allDoctors) => ({
  type: actionTypes.FETCH_ALL_DOCTOR_SUCCESS,
  allDoctors: allDoctors,
});

export const fetchAllDoctorFail = () => ({
  type: actionTypes.FETCH_ALL_DOCTOR_FAIL,
});
