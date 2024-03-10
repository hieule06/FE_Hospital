import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { DatePicker, Select, Table, Tag, message } from "antd";
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils/constant";
import dayjs from "dayjs";
import { pull, includes, map } from "lodash";
import {
  getBookingReExamination,
  sendEmailReExamination,
} from "../../../services/doctorService";
import "./BookingReExamination.scss";

class BookingReExamination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPatient: "all",
      currentDate: -1,
      listPatients: [],
      dataBookingReExamination: [],
      selectedRowKeys: [],
      rangTime: [],
      isModalBookingReExamination: false,
    };
  }

  handleRenderBookingReExamination = async (data) => {
    let res = await getBookingReExamination({
      patientsId: data.patientsId,
      currentDate: data.currentDate,
    });
    if (res && res.data.errCode === 0 && res.data.listReExamination) {
      let listReExamination = [];
      res.data.listReExamination.map((item, idx) => {
        listReExamination.push({
          key: idx + 1,
          name:
            item.patientReExamination && item.patientReExamination.lastName
              ? item.patientReExamination.lastName
              : "",
          medicalDay: item.date,
          phoneNumber:
            item.patientReExamination && item.patientReExamination.phoneNumber,
          gender: item.patientReExamination && item.patientReExamination.gender,
          itemBooking: item,
        });
      });

      this.setState({ dataBookingReExamination: listReExamination });
    } else {
      this.setState({ dataBookingReExamination: [] });
    }
  };

  handleSelectPatient = async (value) => {
    if (value === "all") {
      this.setState({ selectedPatient: "all" });
      return this.handleRenderBookingReExamination({
        patientsId: "all",
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
      this.handleRenderBookingReExamination({
        patientsId: patientSelect.id,
        currentDate: this.state.currentDate,
      });
      this.setState({ selectedPatient: patientSelect.id });
    } else {
      this.setState({ dataBookingReExamination: [] });
    }
  };

  handleOnchangeTime = async (event) => {
    this.handleRenderBookingReExamination({
      patientsId: this.state.selectedPatient,
      currentDate: new Date(event).getTime(),
    });
    this.setState({ currentDate: new Date(event).getTime() });
  };

  handleReExamination = async (selectedRowKeys) => {
    try {
      const arrIdReExamination = [];
      const listReExamination = [];
      this.state.dataBookingReExamination.map((item, idx) => {
        if (selectedRowKeys.includes(item.key)) {
          arrIdReExamination.push(item.itemBooking.id);
          listReExamination.push(item.itemBooking);
        }
      });
      const result = await sendEmailReExamination({
        arrIdReExamination: arrIdReExamination,
        listReExamination: listReExamination,
        language: this.props.language,
      });
      if (result.data.errCode === 0) {
        message.success("Nhắc tái khám thành công !");
        this.setState({ selectedRowKeys: [] });
        this.handleRenderBookingReExamination({
          patientsId: this.state.selectedPatient,
          currentDate: this.state.currentDate,
        });
      } else {
        message.error("Nhắc tái khám không thành công !");
        this.setState({ selectedRowKeys: [] });
        this.handleRenderBookingReExamination({
          patientsId: this.state.selectedPatient,
          currentDate: this.state.currentDate,
        });
      }
    } catch (error) {
      console.log(error);
      message.error("Có lỗi xảy ra. Vui lòng thực hiện lại !");
    }
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

  async componentDidMount() {
    this.props.fetchAllDoctorStart();
    this.props.fetchAllPatientStart();
    this.props.fetchAllPatientHadBookingStart();
    this.props.fetchScheduleHourStart();
    this.props.fetchGenderStart();

    this.handleRenderBookingReExamination({
      patientsId: this.state.selectedPatient,
      currentDate: this.state.currentDate,
    });
  }

  buildDataSelectPatient = (listPatients) => {
    let result = [];
    let { language } = this.props;
    if (listPatients && listPatients.length > 0) {
      listPatients.map((item) => {
        const obj = {};
        const namePatient = item.lastName;
        obj.label = namePatient;
        obj.value = namePatient;
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
      const dataSelectPatient = this.buildDataSelectPatient(
        this.props.allPatients
      );
      this.setState({
        listPatients: dataSelectPatient,
      });
    }
  }

  render() {
    return (
      <div className="wrapper-page-doctor-manage wrapper-page-schedule-manage">
        <h2 className="title-page">
          <FormattedMessage id={"doctor.reExamination"} />
        </h2>
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
              format="DD-MM-YYYY"
              onChange={(e) => this.handleOnchangeTime(e)}
            />
          </div>
        </div>
        <div className="btn-save-doctor">
          <button
            className={
              this.state.selectedRowKeys.length > 0
                ? "btn-add-user btn btn-primary"
                : "btn-add-user btn btn-primary disable"
            }
            onClick={() => {
              this.handleReExamination(this.state.selectedRowKeys);
            }}
          >
            <i class="fas fa-bell"></i>
            <FormattedMessage id={"doctor.reExamination"} />
          </button>
        </div>
        <Table
          rowSelection={this.rowSelection}
          columns={this.columns}
          dataSource={this.state.dataBookingReExamination}
          pagination={{ pageSize: 6 }}
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookingReExamination);
