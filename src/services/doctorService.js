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

const getListDoctorsByIdSpecialty = (idSpecialty) => {
  return axios.get(
    `/api/get-detail-doctor-by-idSpecialty?idSpecialty=${idSpecialty}`
  );
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

const postAppointmentBook = (dataAppointment) => {
  return axios.post("/api/patient-book-appointment", dataAppointment);
};

const postVerifyBookAppoinment = (data) => {
  return axios.post(`/api/verify-book-appoinment`, data);
};

// Page Specialty

const createNewSpecialty = (data) => {
  return axios.post(`/api/create-new-specialty`, data);
};

const updateDataSpecialty = (data) => {
  return axios.post(`/api/update-data-specialty`, data);
};

const deleteDataSpecialty = (idSpecialty) => {
  return axios.get(
    `/api/delete-data-specialty-by-idSpecialty?idSpecialty=${idSpecialty}`
  );
};

const getAllDataSpecialty = () => {
  return axios.get(`/api/get-all-specialties`);
};

const getdataSpecialtyShowPage = (idSpecialtySelect) => {
  return axios.get(`/api/get-detail-specialty-by-id?id=${idSpecialtySelect}`);
};

// Page Handbook

const createNewHandbook = (data) => {
  return axios.post(`/api/create-new-handbook`, data);
};

const updateDataHandbook = (data) => {
  return axios.post(`/api/update-data-handbook`, data);
};

const deleteDataHandbook = (idHandbook) => {
  return axios.get(
    `/api/delete-data-handbook-by-idHandbook?idHandbook=${idHandbook}`
  );
};

const getAllDataHandbook = () => {
  return axios.get(`/api/get-all-handbook`);
};

const getdataHandbookShowPage = (idHandbookSelect) => {
  return axios.get(`/api/get-detail-handbook-by-id?id=${idHandbookSelect}`);
};

// Patient Manage

const getDataBooingByDate = (data) => {
  return axios.get(`/api/get-data-booking-by-date`, {
    params: {
      idDoctor: data.idDoctor,
      date: data.date,
    },
  });
};

const updateStatusBooking = (dataBookingUpdate) => {
  return axios.post(`/api/update-status-booking`, dataBookingUpdate);
};

const deleteBooking = (idBookingDeletes) => {
  return axios.post(`/api/delete-bookings`, idBookingDeletes);
};

const getAllBookingHadPatients = (data) => {
  return axios.get(`/api/get-all-booking-had-patients`, {
    params: {
      idDoctor: data.idDoctor,
      idPatient: data.idPatient,
      currentDate: data.currentDate,
    },
  });
};

const getAllPatients = () => {
  return axios.get(`/api/get-all-patients`);
};

const createHistoryPatient = (data) => {
  return axios.post(`/api/history-patient`, data);
};

const getHistoryPatientByIdPatient = (idPatient) => {
  return axios.get(
    `/api/get-history-patient-by-idPatient?idPatient=${idPatient}`
  );
};

const createBookingReExamination = (data) => {
  return axios.post(`/api/create-booking-re-examination`, data);
};

const getBookingReExamination = (data) => {
  return axios.get(`/api/booking-re-examination`, {
    params: {
      patientsId: data.patientsId,
      currentDate: data.currentDate,
    },
  });
};

const sendEmailReExamination = (data) => {
  return axios.post(`/api/send-email-re-examination`, data);
};

export {
  getDataDoctors,
  getAllDoctors,
  createInforDoctor,
  getdataDoctor,
  updateInforDoctor,
  getdataDoctorShowPage,
  getListDoctorsByIdSpecialty,
  bulkCreateSchedule,
  getdataDoctorSchedule,
  postAppointmentBook,
  postVerifyBookAppoinment,
  createNewSpecialty,
  updateDataSpecialty,
  deleteDataSpecialty,
  getAllDataSpecialty,
  getdataSpecialtyShowPage,
  createNewHandbook,
  updateDataHandbook,
  deleteDataHandbook,
  getAllDataHandbook,
  getdataHandbookShowPage,
  getDataBooingByDate,
  updateStatusBooking,
  deleteBooking,
  getAllBookingHadPatients,
  createHistoryPatient,
  getHistoryPatientByIdPatient,
  getAllPatients,
  createBookingReExamination,
  getBookingReExamination,
  sendEmailReExamination,
};
