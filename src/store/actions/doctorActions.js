import actionTypes from "./actionTypes";
import {
  getDataDoctors,
  getAllDoctors,
  getAllDataSpecialty,
  getAllDataHandbook,
} from "../../services/doctorService";

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

export const fetchAllSpecialtyStart = () => {
  return async (dispatch, getState) => {
    try {
      const allSpecialties = await getAllDataSpecialty();
      if (allSpecialties && allSpecialties.data.errCode === 0) {
        dispatch(fetchAllSpecialtySuccess(allSpecialties.data.AllSpecialty));
      } else {
        dispatch(fetchAllSpecialtyFail());
      }
    } catch (error) {
      dispatch(fetchAllSpecialtyFail());
      console.log(error);
    }
  };
};

export const fetchAllSpecialtySuccess = (allSpecialties) => ({
  type: actionTypes.FETCH_ALL_SPECIALTY_SUCCESS,
  allSpecialties: allSpecialties,
});

export const fetchAllSpecialtyFail = () => ({
  type: actionTypes.FETCH_ALL_SPECIALTY_FAIL,
});

export const fetchAllHandbookStart = () => {
  return async (dispatch, getState) => {
    try {
      const allHandbooks = await getAllDataHandbook();
      if (allHandbooks && allHandbooks.data.errCode === 0) {
        dispatch(fetchAllHandbookSuccess(allHandbooks.data.AllHandbook));
      } else {
        dispatch(fetchAllHandbookFail());
      }
    } catch (error) {
      dispatch(fetchAllHandbookFail());
      console.log(error);
    }
  };
};

export const fetchAllHandbookSuccess = (allHandbooks) => ({
  type: actionTypes.FETCH_ALL_HANDBOOK_SUCCESS,
  allHandbooks: allHandbooks,
});

export const fetchAllHandbookFail = () => ({
  type: actionTypes.FETCH_ALL_HANDBOOK_FAIL,
});
