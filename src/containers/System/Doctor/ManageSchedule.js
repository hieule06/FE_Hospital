import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { DatePicker, Select, message } from "antd";
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils/constant";
import dayjs from "dayjs";
import { pull, includes, map } from "lodash";
import {
  getdataDoctorSchedule,
  bulkCreateSchedule,
} from "../../../services/doctorService";
import "./ManageSchedule.scss";

class ManageSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listDoctors: [],
      selectedDoctor: 1,
      currentDate: new Date().getTime(),
      rangeTime: [],
    };
  }

  handleCreateScheduleTime = async (data) => {
    try {
      if (
        !this.state.currentDate ||
        !this.state.selectedDoctor ||
        this.state.rangeTime.length === 0
      ) {
        return message.error("Các trường chưa điền đủ thông tin !");
      } else {
        const listSchedule = this.state.rangeTime.map((item) => {
          return {
            date: this.state.currentDate,
            timeType: item,
            doctorId: this.state.selectedDoctor,
          };
        });
        message.success("Lưu thành công !");
        await bulkCreateSchedule(listSchedule);
      }
    } catch (error) {
      message.error("Thất bại!");
      console.log(error);
    }
  };

  handleUpdateScheduleTime = async (data) => {
    try {
      if (
        !this.state.currentDate ||
        !this.state.selectedDoctor.selectDoctor ||
        this.state.rangeTime.length === 0
      ) {
        return message.error("Các trường chưa điền đủ thông tin !");
      } else {
        return message.success("Lưu thành công !");
      }
    } catch (error) {
      message.error("Thất bại!");
      console.log(error);
    }
  };

  handleSelectDoctor = async (value) => {
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
    this.setState({ selectedDoctor: doctorSelect.id });
    const inforDoctorSchedule = await getdataDoctorSchedule({
      idDoctorSelect: doctorSelect.id,
      dateSelect: this.state.currentDate,
    });
    if (inforDoctorSchedule && inforDoctorSchedule.data.errCode === 0) {
      const listTimeType = map(inforDoctorSchedule.data.result, "timeType");
      if (listTimeType && listTimeType.length > 0) {
        this.setState({ rangeTime: listTimeType });
      }
    } else {
      this.setState({ rangeTime: [] });
    }
  };

  handleSelectPeriod = (timeItem) => {
    const arrRangTime = this.state.rangeTime;
    let checkExitsTime;
    if (this.state.rangeTime.length > 0) {
      checkExitsTime = includes(this.state.rangeTime, timeItem.keyMap);
      if (!checkExitsTime) {
        arrRangTime.push(timeItem.keyMap);
      } else {
        pull(arrRangTime, timeItem.keyMap);
      }
    } else {
      arrRangTime.push(timeItem.keyMap);
    }
    this.setState({ rangeTime: arrRangTime });
  };

  handleOnchangeTime = async (event) => {
    this.setState({ currentDate: new Date(event).getTime() });
    const inforDoctorSchedule = await getdataDoctorSchedule({
      idDoctorSelect: this.state.selectedDoctor,
      dateSelect: new Date(event).getTime(),
    });
    if (inforDoctorSchedule && inforDoctorSchedule.data.errCode === 0) {
      const listTimeType = map(inforDoctorSchedule.data.result, "timeType");
      if (listTimeType && listTimeType.length > 0) {
        this.setState({ rangeTime: listTimeType });
      }
    } else {
      this.setState({ rangeTime: [] });
    }
  };

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
    return result;
  };

  async componentDidMount() {
    this.props.fetchAllDoctorStart();
    this.props.fetchScheduleHourStart();

    if (this.props.userInfo && this.props.userInfo.roleId === "R2") {
      const inforDoctorSchedule = await getdataDoctorSchedule({
        idDoctorSelect: this.props.userInfo.id,
        dateSelect: this.state.currentDate,
      });
      if (inforDoctorSchedule && inforDoctorSchedule.data.errCode === 0) {
        const listTimeType = map(inforDoctorSchedule.data.result, "timeType");
        if (listTimeType && listTimeType.length > 0) {
          this.setState({
            rangeTime: listTimeType,
            selectedDoctor: this.props.userInfo.id,
          });
        }
      } else {
        this.setState({ rangeTime: [] });
      }
    }
  }

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
          <FormattedMessage id={"manage-schedule.title"} />
        </h2>
        <div className="wrapper-infor-doctor wrapper-schedule-doctor">
          {this.props.userInfo && this.props.userInfo.roleId === "R1" ? (
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
          ) : (
            ""
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
        <div className="scheduleTime">
          {this.props.times.map((item) => {
            const showTime =
              this.props.language === LANGUAGES.VI
                ? item.valueVi
                : item.valueEn;
            const backgroundItemTime = includes(
              this.state.rangeTime,
              item.keyMap
            );
            return (
              <span
                onClick={() => this.handleSelectPeriod(item)}
                className={backgroundItemTime ? "item-scheduletime-action" : ""}
              >
                {showTime}
              </span>
            );
          })}
        </div>
        <div className="btn-save-doctor">
          <button
            className={
              this.state.checkIdDoctor
                ? "btn-add-user btn btn-primary disable"
                : "btn-add-user btn btn-primary"
            }
            onClick={() => {
              this.handleCreateScheduleTime(this.state);
            }}
          >
            <FormattedMessage id={"admin.save"} />
          </button>
          <button
            className={
              this.state.checkIdDoctor
                ? "btn-add-user btn btn-primary"
                : "btn-add-user btn btn-primary disable"
            }
            onClick={() => {
              this.handleUpdateScheduleTime(this.state);
            }}
          >
            Sửa thông tin
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allDoctors: state.doctor.allDoctors,
    language: state.app.language,
    userInfo: state.user.userInfo,
    times: state.admin.times,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctorStart: () => dispatch(actions.fetchAllDoctorStart()),
    fetchScheduleHourStart: () => dispatch(actions.fetchScheduleHourStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
