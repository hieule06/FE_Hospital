import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorSchedule.scss";
import { Select } from "antd";
import moment from "moment";
import localization from "moment/locale/vi";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../../../utils";
import { getdataDoctorSchedule } from "../../../../services/doctorService";
import * as actions from "../../../../store/actions";
import { map } from "lodash";

class DoctorSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listDate: [],
      currentDate: new Date().getTime(),
      allAvalableTime: [],
    };
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  listDate = () => {
    let arrDate = [];
    for (var i = 0; i < 7; i++) {
      const object = {};
      object.label =
        this.props.language === LANGUAGES.EN
          ? moment(new Date()).add(i, "days").locale("en").format("ddd - DD/MM")
          : this.capitalizeFirstLetter(
              moment(new Date()).add(i, "days").format("dddd - DD/MM")
            );
      object.value = moment(new Date()).add(i, "days").startOf("day").valueOf();

      arrDate.push(object);
    }
    return arrDate;
  };

  getArrDatePeriod = async (currentDate) => {
    if (this.props.idDoctor) {
      const inforDoctorSchedule = await getdataDoctorSchedule({
        idDoctorSelect: this.props.idDoctor,
        dateSelect: currentDate ? currentDate : this.state.currentDate,
      });

      const arrAllAvalableTimeFirst = map(
        inforDoctorSchedule.data.result,
        "timeType"
      );

      const arrDatePeriod = this.props.times
        ? this.props.times
            .filter((item) => arrAllAvalableTimeFirst.includes(item.keyMap))
            .map((itemDate) =>
              this.props.language === LANGUAGES.VI
                ? itemDate.valueVi
                : itemDate.valueEn
            )
        : [];
      return arrDatePeriod;
    }
  };

  handleSelectDate = async (date) => {
    this.setState({
      currentDate: date,
    });

    const arrDatePeriod = await this.getArrDatePeriod(date);

    this.setState({
      allAvalableTime: arrDatePeriod,
    });
  };

  async componentDidMount() {
    this.props.fetchScheduleHourStart();

    const arrDate = this.listDate();

    const arrDatePeriod = await this.getArrDatePeriod();

    this.setState({
      listDate: arrDate,
      allAvalableTime: arrDatePeriod,
    });
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
      const arrDate = this.listDate();

      const arrDatePeriod = await this.getArrDatePeriod();

      this.setState({
        listDate: arrDate,
        allAvalableTime: arrDatePeriod,
      });
    }
  }

  render() {
    return (
      <div className="doctor-schedule-container">
        <div className="select-date">
          <Select
            value={
              this.props.language === LANGUAGES.EN
                ? moment(new Date(this.state.currentDate))
                    .locale("en")
                    .format("ddd - DD/MM")
                : this.capitalizeFirstLetter(
                    moment(new Date(this.state.currentDate)).format(
                      "dddd - DD/MM"
                    )
                  )
            }
            placeholder="Select date"
            onChange={(date) => this.handleSelectDate(date)}
            options={this.state.listDate}
          />
        </div>
        <div className="medical-schedule">
          <span className="icon-calendar">
            <i class="fas fa-calendar-alt"></i>
          </span>
          <span className="title-medical-schedule">
            <FormattedMessage id={"patient.detail-doctor.schedule"} />
          </span>
          <div className="detail-schedule">
            {this.state.allAvalableTime &&
            this.state.allAvalableTime.length > 0 ? (
              this.state.allAvalableTime.map((item) => {
                return (
                  <span
                    onClick={() =>
                      this.props.handleShowModal({
                        currentDate: this.state.currentDate,
                        avalableTime: item,
                      })
                    }
                  >
                    {item}
                  </span>
                );
              })
            ) : (
              <FormattedMessage id={"patient.detail-doctor.no-schedule"} />
            )}
          </div>
          <div className="suggest-choose-schedule">
            <FormattedMessage id={"patient.detail-doctor.choose"} />{" "}
            <i class="fas fa-hand-pointer"></i>{" "}
            <FormattedMessage id={"patient.detail-doctor.book"} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    times: state.admin.times,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchScheduleHourStart: () => dispatch(actions.fetchScheduleHourStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
