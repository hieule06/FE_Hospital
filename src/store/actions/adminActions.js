import { getAllCode } from "../../services/userService";
import actionTypes from "./actionTypes";

export const fetchGenderStart = () => {
  return async (dispatch, getState) => {
    try {
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
