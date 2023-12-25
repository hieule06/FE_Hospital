import axios from "../axios";
const getDataDoctors = (limitCount) => {
  return axios.get(`/api/get-data-doctors?limitCount=${limitCount}`);
};

const getAllDoctors = () => {
  return axios.get(`/api/get-all-doctors`);
};

const createInforDoctor = (dataInforDoctor) => {
  return axios.post("/api/create-infor-doctor", dataInforDoctor);
};

const getdataDoctor = (idDoctor) => {
  return axios.get(`/api/get-infor-doctor?idDoctor=${idDoctor}`);
};

const updateInforDoctor = (dataInforDoctor) => {
  return axios.post("/put-edit-infor-doctor", dataInforDoctor);
};

const getdataDoctorShowPage = (idDoctorSelect) => {
  return axios.get(`/api/get-detail-doctor-by-id?id=${idDoctorSelect}`);
};

const bulkCreateSchedule = (listSchedule) => {
  return axios.post("/api/bulk-create-schedule", listSchedule);
};

const getdataDoctorSchedule = (listFilter) => {
  return axios.get("/api/get-data-doctor-schedule", {
    params: {
      idDoctor: listFilter.idDoctorSelect,
      dateSelect: listFilter.dateSelect,
    },
  });
};

export {
  getDataDoctors,
  getAllDoctors,
  createInforDoctor,
  getdataDoctor,
  updateInforDoctor,
  getdataDoctorShowPage,
  bulkCreateSchedule,
  getdataDoctorSchedule,
};
