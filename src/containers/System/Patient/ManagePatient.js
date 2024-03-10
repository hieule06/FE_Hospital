import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { DatePicker, Select, Table, Tag, message } from "antd";
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils/constant";
import dayjs from "dayjs";
import { pull, includes, map } from "lodash";
import {
  getdataDoctorSchedule,
  bulkCreateSchedule,
  getDataBooingByDate,
  updateStatusBooking,
  deleteBooking,
} from "../../../services/doctorService";
import "./ManagePatient.scss";
import ModalFileMedical from "../ModalFileMedical/ModalFileMedical";
import ModalReExamination from "../ModalReExamination/ModalReExamination";

class ManagePatient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDoctor: "all",
      currentDate: new Date().getTime(),
      listDoctors: [],
      dataBooking: [],
      selectedRowKeys: [],
      rangTime: [],
      isModalFileMedical: false,
      isModalReExamination: false,
      itemBooking: "",
    };
  }

  handleShowModalFileMedical = (value) => {
    this.setState({ isModalFileMedical: true, itemBooking: value });
  };

  handleCancelModalFileMedical = () => {
    this.setState({ isModalFileMedical: false });
  };

  handleShowModalReExamination = (value) => {
    this.setState({ isModalReExamination: true, itemBooking: value });
  };

  handleCancelModalReExamination = () => {
    this.setState({ isModalReExamination: false });
  };

  handleRenderDataBooking = async (data) => {
    let res = await getDataBooingByDate({
      idDoctor: data.idDoctor,
      date: data.date,
    });
    if (res && res.data.errCode === 0 && res.data.dataBooking) {
      let arrRangTime = this.props.times.map((item) => item.keyMap);
      const sortedData = res.data.dataBooking.sort((a, b) => {
        return (
          arrRangTime &&
          arrRangTime.indexOf(a.timeType) - arrRangTime.indexOf(b.timeType)
        );
      });
      let dataBooking = [];
      sortedData.map((item, idx) => {
        dataBooking.push({
          key: idx + 1,
          name: item.patientData.lastName ? item.patientData.lastName : "",
          timeType: item.timeType,
          phoneNumber: item.patientData.phoneNumber,
          gender: item.patientData.gender,
          status: item.statusId,
          itemBooking: item,
        });
      });

      this.setState({ dataBooking: dataBooking });
    } else {
      this.setState({ dataBooking: [] });
    }
  };

  handleSelectDoctor = async (value) => {
    if (value === "all") {
      this.setState({ selectedDoctor: "all" });
      return this.handleRenderDataBooking({
        idDoctor: "all",
        date: this.state.currentDate,
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
    this.handleRenderDataBooking({
      idDoctor: doctorSelect.id,
      date: this.state.currentDate,
    });
    this.setState({ selectedDoctor: doctorSelect.id });
  };

  handleOnchangeTime = async (event) => {
    this.handleRenderDataBooking({
      idDoctor: this.state.selectedDoctor,
      date: new Date(event).getTime(),
    });
    this.setState({ currentDate: new Date(event).getTime() });
  };

  handleUpdateStatusBooking = async (item) => {
    let dataUpdate = {};
    dataUpdate.statusBefore = item.itemBooking.statusId;
    dataUpdate.doctorId = item.itemBooking.doctorId;
    dataUpdate.token = item.itemBooking.token;
    item.itemBooking.statusId === "S2"
      ? (dataUpdate.statusAfter = "S3")
      : (dataUpdate.statusAfter = "S4");
    const result = await updateStatusBooking(dataUpdate);
    if (result.data.result.errCode === 0) {
      this.handleRenderDataBooking({
        idDoctor: this.state.selectedDoctor,
        date: this.state.currentDate,
      });
      message.success("Đã xác nhận thành công !");
    } else {
      message.error("Xác nhận không thành công !");
    }
  };

  handleDeleteBooking = async (selectedRowKeys) => {
    try {
      const arrIdBookingDelete = [];
      this.state.dataBooking.map((item, idx) => {
        if (selectedRowKeys.includes(item.key)) {
          arrIdBookingDelete.push(item.itemBooking.id);
        }
      });
      await deleteBooking(arrIdBookingDelete);
      message.success("Xóa lịch hẹn thành công !");
      this.handleRenderDataBooking({
        idDoctor: this.state.selectedDoctor,
        date: new Date(this.state.currentDate).getTime(),
      });
      this.setState({ selectedRowKeys: [] });
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
      title: <FormattedMessage id={"doctor.time"} />,
      dataIndex: "timeType",
      render: (timeType) => {
        let titleTime;
        this.props.times.map((item) => {
          if (item.keyMap === timeType) {
            this.props.language === LANGUAGES.VI
              ? (titleTime = item.valueVi)
              : (titleTime = item.valueEn);
          }
        });
        return <div>{titleTime}</div>;
      },
    },
    {
      title: <FormattedMessage id={"doctor.name"} />,
      dataIndex: "name",
      render: (name) => {
        return <div>{name}</div>;
      },
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
        return <div>{titleGender}</div>;
      },
    },
    {
      title: <FormattedMessage id={"doctor.reExamination"} />,
      render: (item) => {
        return (
          <button
            className="btn-re-examination"
            onClick={() => this.handleShowModalReExamination(item.itemBooking)}
          >
            <FormattedMessage id={"doctor.reExamination"} />
          </button>
        );
      },
    },
    {
      title: <FormattedMessage id={"doctor.medicalFile"} />,
      render: (item) => {
        return (
          <button
            className="btn-re-examination"
            onClick={() => this.handleShowModalFileMedical(item.itemBooking)}
          >
            <FormattedMessage id={"doctor.medicalFile"} />
          </button>
        );
      },
    },
    {
      title: <FormattedMessage id={"doctor.status"} />,
      dataIndex: "status",
      render: (status) => {
        let color = status === "S2" ? "geekblue" : "green";
        if (status === "S3") {
          color = "yellow";
        }
        return (
          <Tag color={color} key={status}>
            {status === "S2"
              ? "đang khám".toUpperCase()
              : "đang thanh toán".toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: <FormattedMessage id={"doctor.confirm"} />,
      render: (item) => {
        let color = item.status === "S2" ? "green" : "red";
        if (item.status === "S3") {
          color = "volcano";
        }
        return (
          <Tag
            color={color}
            key={item.status}
            className="btn-confirm-booking"
            onClick={() => {
              this.handleUpdateStatusBooking(item);
            }}
          >
            {item.status === "S2"
              ? "khám xong".toUpperCase()
              : item.status === "S3"
              ? "đã thanh toán".toUpperCase()
              : ""}
          </Tag>
        );
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
    this.props.fetchScheduleHourStart();
    this.props.fetchGenderStart();

    if (this.props.userInfo && this.props.userInfo.roleId === "R2") {
      this.handleRenderDataBooking({
        idDoctor: this.props.userInfo.id,
        date: this.state.currentDate,
      });
    } else {
      this.handleRenderDataBooking({
        idDoctor: this.state.selectedDoctor,
        date: this.state.currentDate,
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
      prevProps.language !== this.props.language
    ) {
      const dataSelect = this.buildDataSelectDoctor(this.props.allDoctors);
      this.setState({
        listDoctors: dataSelect,
      });
    }
  }

  render() {
    let yesterday = new Date();
    return (
      <div className="wrapper-page-doctor-manage wrapper-page-schedule-manage">
        <ModalReExamination
          isModalReExamination={this.state.isModalReExamination}
          handleCancelModalReExamination={this.handleCancelModalReExamination}
          itemBooking={this.state.itemBooking}
        />
        <ModalFileMedical
          isModalFileMedical={this.state.isModalFileMedical}
          handleCancelModalFileMedical={this.handleCancelModalFileMedical}
          itemBooking={this.state.itemBooking}
        />
        <h2 className="title-page">
          <FormattedMessage id={"doctor.manage-patient"} />
        </h2>
        <div className="wrapper-infor-doctor wrapper-schedule-doctor">
          {this.props.userInfo && this.props.userInfo.roleId === "R1" && (
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
          )}
          <div className="add-infor-doctor add-calendar-doctor">
            <p>
              <FormattedMessage id={"manage-schedule.choose-date"} />
            </p>
            <DatePicker
              defaultValue={dayjs(yesterday)}
              disabledDate={(current) => {
                return (
                  current && current < dayjs().subtract(1, "day").endOf("day")
                );
              }}
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
              this.handleDeleteBooking(this.state.selectedRowKeys);
            }}
          >
            <i class="fas fa-trash-alt"></i>
            Xóa
          </button>
        </div>
        <Table
          rowSelection={this.rowSelection}
          columns={this.columns}
          dataSource={this.state.dataBooking}
          pagination={{ pageSize: 6 }}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allDoctors: state.doctor.allDoctors,
    userInfo: state.user.userInfo,
    language: state.app.language,
    times: state.admin.times,
    genders: state.admin.genders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctorStart: () => dispatch(actions.fetchAllDoctorStart()),
    fetchScheduleHourStart: () => dispatch(actions.fetchScheduleHourStart()),
    fetchGenderStart: () => dispatch(actions.fetchGenderStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
