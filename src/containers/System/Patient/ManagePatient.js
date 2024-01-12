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
} from "../../../services/doctorService";
import "./ManagePatient.scss";

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
    };
  }

  handleRenderDataBooking = async (data) => {
    let res = await getDataBooingByDate({
      idDoctor: data.idDoctor,
      date: data.date,
    });
    if (res && res.data.errCode === 0 && res.data.dataBooking) {
      let dataBooking = [];
      res.data.dataBooking.map((item, idx) => {
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

      let arrRangTime = this.props.times.map((item) => item.keyMap);
      const sortedData = dataBooking.sort((a, b) => {
        return (
          arrRangTime &&
          arrRangTime.indexOf(a.timeType) - arrRangTime.indexOf(b.timeType)
        );
      });
      this.setState({ dataBooking: sortedData });
    }
  };

  handleSelectDoctor = async (value) => {
    this.handleRenderDataBooking({
      idDoctor: value,
      date: this.state.currentDate,
    });
    this.setState({ selectedDoctor: value });
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
        return <p>{titleTime}</p>;
      },
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

    this.handleRenderDataBooking({
      idDoctor: this.state.selectedDoctor,
      date: this.state.currentDate,
    });
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
        obj.value = item.id;
        result.push(obj);
      });
    }
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
        <h2 className="title-page">
          <FormattedMessage id={"doctor.manage-patient"} />
        </h2>
        <div className="wrapper-infor-doctor wrapper-schedule-doctor">
          <div className="search-user">
            <p>
              <FormattedMessage id={"admin.select-doctor"} />
            </p>
            <Select
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
        <Table
          // rowSelection={this.rowSelection}
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
