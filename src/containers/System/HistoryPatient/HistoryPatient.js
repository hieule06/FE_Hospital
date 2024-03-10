import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { DatePicker, Select, Table, Tag, message } from "antd";
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils/constant";
import dayjs from "dayjs";
import { pull, includes, map } from "lodash";
import {
  getAllBookingHadPatients,
  getHistoryPatientByIdPatient,
} from "../../../services/doctorService";
import "./HistoryPatient.scss";
import ModalHistoryPatient from "../ModalHistoryPatient/ModalHistoryPatient";

class HistoryPatient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDoctor: "all",
      selectedPatient: "all",
      currentDate: new Date().getTime(),
      listDoctors: [],
      listPatients: [],
      dataPatients: [],
      selectedRowKeys: [],
      rangTime: [],
      isModalHistoryPatient: false,
      dataHistoryPatient: [],
    };
  }

  handleShowModalHistoryPatient = (value) => {
    this.setState({ isModalHistoryPatient: true, dataHistoryPatient: value });
  };

  handleCancelModalHistoryPatient = () => {
    this.setState({ isModalHistoryPatient: false });
  };

  buildDataSelectPatient = (listPatients) => {
    let lastNameArray = [];
    listPatients.map((obj) => {
      if (!lastNameArray.includes(obj.name)) {
        lastNameArray.push(obj.name);
      }
    });
    let result = [];
    let { language } = this.props;
    if (lastNameArray && lastNameArray.length > 0) {
      lastNameArray.map((item) => {
        const obj = {};
        const namePatient = item;
        obj.label = namePatient;
        obj.value = namePatient;
        result.push(obj);
      });
    }
    result.push({ label: "all", value: "all" });
    return result;
  };

  handleRenderDataPatients = async (data) => {
    let res = await getAllBookingHadPatients({
      idDoctor: data.idDoctor,
      idPatient: data.idPatient,
      currentDate: data.currentDate,
    });
    if (res && res.data.errCode === 0 && res.data.dataPatients) {
      let dataPatients = [];
      res.data.dataPatients.map((item, idx) => {
        dataPatients.push({
          key: idx + 1,
          name:
            item.patientData && item.patientData.lastName
              ? item.patientData.lastName
              : "",
          medicalDay: item.updatedAt,
          phoneNumber: item.patientData && item.patientData.phoneNumber,
          gender: item.patientData && item.patientData.gender,
          status: item.statusId,
          itemBooking: item,
        });
      });
      const dataSelectPatient = this.buildDataSelectPatient(dataPatients);
      this.setState({
        listPatients: dataSelectPatient,
      });

      this.setState({ dataPatients: dataPatients });
    } else {
      this.setState({ dataPatients: [] });
    }
  };

  handleSelectDoctor = async (value) => {
    if (value === "all") {
      this.setState({ selectedDoctor: "all" });
      return this.handleRenderDataPatients({
        idDoctor: "all",
        idPatient: this.state.selectedPatient,
        currentDate: this.state.currentDate,
      });
    }
    let { language } = this.props;
    const doctorSelect = this.props.allDoctors.find((item, idx) => {
      if (idx === 0 || this.props.allDoctors[idx - 1].id !== item.id) {
        const nameDoctor =
          language === LANGUAGES.VI
            ? `${item.lastName} ${item.firstName}`
            : `${item.firstName} ${item.lastName}`;

        return nameDoctor === value;
      }
    });
    this.handleRenderDataPatients({
      idDoctor: doctorSelect.id,
      idPatient: this.state.selectedPatient,
      currentDate: this.state.currentDate,
    });
    this.setState({ selectedDoctor: doctorSelect.id });
  };

  handleSelectPatient = async (value) => {
    if (value === "all") {
      this.setState({ selectedPatient: "all" });
      return this.handleRenderDataPatients({
        idDoctor: this.state.selectedDoctor,
        idPatient: "all",
        currentDate: this.state.currentDate,
      });
    }
    const patientSelect = this.props.allPatients.find((item, idx) => {
      if (idx === 0 || this.props.allPatients[idx - 1].id !== item.id) {
        const namePatient = item.lastName;

        return namePatient === value;
      }
    });
    if (patientSelect) {
      this.handleRenderDataPatients({
        idDoctor: this.state.selectedDoctor,
        idPatient: patientSelect.id,
        currentDate: this.state.currentDate,
      });
      this.setState({ selectedPatient: patientSelect.id });
    } else {
      this.setState({ dataPatients: [] });
    }
  };

  handleOnchangeTime = async (event) => {
    this.handleRenderDataPatients({
      idDoctor: this.state.selectedDoctor,
      idPatient: this.state.selectedPatient,
      currentDate: new Date(event).getTime(),
    });
    this.setState({ currentDate: new Date(event).getTime() });
  };

  columns = [
    {
      title: "STT",
      dataIndex: "key",
    },
    {
      title: <FormattedMessage id={"doctor.name"} />,
      dataIndex: "name",
    },
    {
      title: <FormattedMessage id={"doctor.phoneNumber"} />,
      dataIndex: "phoneNumber",
    },
    {
      title: <FormattedMessage id={"doctor.gender"} />,
      dataIndex: "gender",
      render: (gender) => {
        let titleGender;
        this.props.genders.map((item) => {
          if (item.keyMap === gender) {
            this.props.language === LANGUAGES.VI
              ? (titleGender = item.valueVi)
              : (titleGender = item.valueEn);
          }
        });
        return <p>{titleGender}</p>;
      },
    },
    {
      title: <FormattedMessage id={"doctor.time"} />,
      dataIndex: "medicalDay",
      render: (medicalDay) => {
        return <p>{dayjs(medicalDay).format("DD-MM-YYYY")}</p>;
      },
    },
  ];

  onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    this.setState({ selectedRowKeys: newSelectedRowKeys });
  };

  rowSelection = {
    onChange: this.onSelectChange,
  };

  handleRowClick = async (record) => {
    try {
      const dataHistoryPatient = await getHistoryPatientByIdPatient(
        Number(record.itemBooking.patientsId)
      );
      if (dataHistoryPatient.data.errCode === 0) {
        this.handleShowModalHistoryPatient(
          dataHistoryPatient.data.dataHistoryPatient
        );
      } else {
        message.warning("Bệnh nhân chưa có lịch sử khám bệnh !");
      }
    } catch (error) {
      console.log(error);
    }
  };

  async componentDidMount() {
    this.props.fetchAllDoctorStart();
    this.props.fetchAllPatientStart();
    this.props.fetchAllPatientHadBookingStart();
    this.props.fetchScheduleHourStart();
    this.props.fetchGenderStart();

    if (this.props.userInfo && this.props.userInfo.roleId === "R2") {
      this.handleRenderDataPatients({
        idDoctor: this.props.userInfo.id,
        idPatient: this.state.selectedPatient,
        currentDate: this.state.currentDate,
      });
    } else {
      this.handleRenderDataPatients({
        idDoctor: this.state.selectedDoctor,
        idPatient: this.state.selectedPatient,
        currentDate: this.state.currentDate,
      });
    }
  }

  buildDataSelectDoctor = (listDoctors) => {
    let result = [];
    let { language } = this.props;
    if (listDoctors && listDoctors.length > 0) {
      listDoctors.map((item) => {
        const obj = {};
        const nameDoctor =
          language === LANGUAGES.VI
            ? `${item.lastName} ${item.firstName}`
            : `${item.firstName} ${item.lastName}`;
        obj.label = nameDoctor;
        obj.value = nameDoctor;
        result.push(obj);
      });
    }
    result.push({ label: "all", value: "all" });
    return result;
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      prevProps.allDoctors !== this.props.allDoctors ||
      prevProps.allBookingHadPatients !== this.props.allBookingHadPatients ||
      prevProps.language !== this.props.language
    ) {
      const dataSelectDoctor = this.buildDataSelectDoctor(
        this.props.allDoctors
      );
      this.setState({
        listDoctors: dataSelectDoctor,
      });
    }
  }

  render() {
    return (
      <div className="wrapper-page-doctor-manage wrapper-page-schedule-manage">
        <ModalHistoryPatient
          isModalHistoryPatient={this.state.isModalHistoryPatient}
          handleCancelModalHistoryPatient={this.handleCancelModalHistoryPatient}
          dataHistoryPatient={this.state.dataHistoryPatient}
        />
        <h2 className="title-page">
          <FormattedMessage id={"menu.doctor.manage-history-patient"} />
        </h2>
        {this.props.userInfo && this.props.userInfo.roleId === "R1" ? (
          <>
            <div className="wrapper-infor-doctor wrapper-schedule-doctor">
              <div className="search-user">
                <p>
                  <FormattedMessage id={"admin.select-doctor"} />
                </p>
                <Select
                  showSearch
                  placeholder="Select a person"
                  onChange={(value) => this.handleSelectDoctor(value)}
                  options={this.state.listDoctors}
                />
              </div>
              <div className="add-infor-doctor add-calendar-doctor">
                <p>
                  <FormattedMessage id={"manage-schedule.choose-date"} />
                </p>
                <DatePicker
                  defaultValue={dayjs().subtract(0, "month").endOf("month")}
                  format="MM-YYYY"
                  picker="month"
                  onChange={(e) => this.handleOnchangeTime(e)}
                />
              </div>
            </div>
            <div className="wrapper-infor-doctor wrapper-schedule-doctor">
              <div className="search-user">
                <p>
                  <FormattedMessage id={"manage-schedule.choose-patient"} />
                </p>
                <Select
                  showSearch
                  placeholder="Select a person"
                  onChange={(value) => this.handleSelectPatient(value)}
                  options={this.state.listPatients}
                />
              </div>
            </div>
          </>
        ) : (
          <div className="wrapper-infor-doctor wrapper-schedule-doctor">
            <div className="search-user">
              <p>
                <FormattedMessage id={"manage-schedule.choose-patient"} />
              </p>
              <Select
                showSearch
                placeholder="Select a person"
                onChange={(value) => this.handleSelectPatient(value)}
                options={this.state.listPatients}
              />
            </div>
            <div className="add-infor-doctor add-calendar-doctor">
              <p>
                <FormattedMessage id={"manage-schedule.choose-date"} />
              </p>
              <DatePicker
                defaultValue={dayjs().subtract(0, "month").endOf("month")}
                format="MM-YYYY"
                picker="month"
                onChange={(e) => this.handleOnchangeTime(e)}
              />
            </div>
          </div>
        )}
        <Table
          // rowSelection={this.rowSelection}
          columns={this.columns}
          dataSource={this.state.dataPatients}
          pagination={{ pageSize: 6 }}
          rowKey="key"
          onRow={(record) => ({
            onClick: () => this.handleRowClick(record),
          })}
          className="table-list-patients"
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allDoctors: state.doctor.allDoctors,
    allPatients: state.doctor.allPatients,
    allBookingHadPatients: state.doctor.allBookingHadPatients,
    userInfo: state.user.userInfo,
    language: state.app.language,
    times: state.admin.times,
    genders: state.admin.genders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctorStart: () => dispatch(actions.fetchAllDoctorStart()),
    fetchAllPatientStart: () => dispatch(actions.fetchAllPatientStart()),
    fetchAllPatientHadBookingStart: () =>
      dispatch(actions.fetchAllPatientHadBookingStart()),
    fetchScheduleHourStart: () => dispatch(actions.fetchScheduleHourStart()),
    fetchGenderStart: () => dispatch(actions.fetchGenderStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HistoryPatient);
