import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "./ProfileDoctor.scss";
import noImage from "../../../../assets/images/no-image.png";
import { LANGUAGES } from "../../../../utils";
import { FormattedMessage } from "react-intl";
import * as actions from "../../../../store/actions";
import moment from "moment";
import localization from "moment/locale/vi";

class ProfileDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doctorName: "",
    };
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  renderTimeBooking = () => {
    let date;
    if (this.props.objDate) {
      let time = this.props.objDate.avalableTime.timeSelected;

      let date =
        this.props.language === LANGUAGES.VI
          ? this.capitalizeFirstLetter(
              moment(new Date(this.props.objDate.currentDate)).format(
                "dddd - DD/MM/YYYY"
              )
            )
          : moment(new Date(this.props.objDate.currentDate))
              .locale("en")
              .format("ddd - DD/MM/YYYY");

      this.props.getScheduleTimeFrame({
        scheduleTimeFrame: `${time} - ${date}`,
        doctorName: this.state.doctorName,
      });

      return (
        <>
          <div>
            <i className="far fa-clock"></i> {time}
          </div>
          <div>
            <i className="far fa-calendar-check"></i> {date}
          </div>
          <div>
            <FormattedMessage id="patient.booking-modal.priceBooking" />
          </div>
        </>
      );
    }
    return <></>;
  };

  async componentDidMount() {
    this.props.fetchPriceStart();
    const detailDoctor = this.props.detailDoctor;
    let nameDoctor;
    if (
      detailDoctor &&
      detailDoctor.positionData &&
      this.props.language === LANGUAGES.VI
    ) {
      nameDoctor = `${detailDoctor.positionData.valueVi}, ${detailDoctor.lastName} ${detailDoctor.firstName}`;
    }
    if (
      detailDoctor &&
      detailDoctor.positionData &&
      this.props.language === LANGUAGES.EN
    ) {
      nameDoctor = `${detailDoctor.positionData.valueEn}, ${detailDoctor.firstName} ${detailDoctor.lastName}`;
    }
    this.setState({ doctorName: nameDoctor });
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }

  render() {
    const listPrices = this.props.prices.find(
      (item) => item.keyMap === this.props.priceExamination
    );
    const detailDoctor = this.props.detailDoctor;
    return (
      <Fragment>
        <div className="intro-doctor">
          <div className="content-intro">
            <div>
              <div
                className="avatar-doctor"
                style={{
                  backgroundImage: `url(${
                    detailDoctor && detailDoctor.image
                      ? detailDoctor.image
                      : noImage
                  })`,
                }}
              >
                {/*  <img
                  src={
                    detailDoctor && detailDoctor.image
                      ? detailDoctor.image
                      : noImage
                  }
                  alt=""
                /> */}
              </div>
              <div className="wrapper-infor-price">
                <span className="title-price">
                  <FormattedMessage id={"patient.extra-infor-doctor.price"} />
                </span>
                {listPrices && listPrices.valueVi ? (
                  <span className="count-price">
                    {this.props.language === LANGUAGES.VI
                      ? `: ${listPrices.valueVi.replace(
                          /\B(?=(\d{3})+(?!\d))/g,
                          "."
                        )}VNĐ.  `
                      : `: ${listPrices.valueEn}USD.  `}
                  </span>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="preliminary-information">
              <h3>{this.state.doctorName}</h3>
              {this.props.isShowProfile ? (
                <p>
                  {detailDoctor.Markdown
                    ? detailDoctor.Markdown.description
                    : ""}
                </p>
              ) : (
                <>{this.renderTimeBooking()}</>
              )}
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    prices: state.admin.prices,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPriceStart: () => dispatch(actions.fetchPriceStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
