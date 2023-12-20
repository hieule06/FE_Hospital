import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorOutstand.scss";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { FormattedMessage } from "react-intl";
import * as actions from "../../../../store/actions";
import { responsive } from "../../../../utils";
import { LANGUAGES } from "../../../../utils";
import noImage from "../../../../assets/images/no-image.png";
import { withRouter } from "react-router";

class DoctorOutstand extends Component {
  handleViewDetailDoctor = (inforDoctor) => {
    console.log("first: ", inforDoctor);
    this.props.history.push(`/detail-doctor/${inforDoctor.id}`);
  };

  async componentDidMount() {
    this.props.fetchDataDoctorStart();
  }

  render() {
    const listDataDoctors = this.props.dataDoctors;
    return (
      <div className="section-container doctor-outstand-container">
        <div className="offers_container" style={{ height: "100%" }}>
          <div className="offer_box" style={{ height: "100%" }}>
            <div className="wrapper-title-main-section">
              <h4 className="title-main-section">
                <FormattedMessage id={"homepage.outstanding-doctor"} />
              </h4>
              <button className="btn-see-more">
                <FormattedMessage id={"homepage.more-info"} />
              </button>
            </div>
            <Carousel showDots={false} responsive={responsive}>
              {listDataDoctors.map((item, idx) => {
                const imgDoctor = item.image
                  ? new Buffer(item.image, "base64").toString("binary")
                  : "";
                const positionDoctor =
                  this.props.language === LANGUAGES.VI
                    ? `${item.positionData.valueVi}`
                    : `${item.positionData.valueEn}`;
                const nameDoctor =
                  this.props.language === LANGUAGES.VI
                    ? `${item.lastName + " " + item.firstName}`
                    : `${item.firstName + " " + item.lastName}`;
                return (
                  <div
                    className="card"
                    onClick={() => this.handleViewDetailDoctor(item)}
                  >
                    <img
                      className="product--image"
                      src={imgDoctor ? imgDoctor : noImage}
                      alt=""
                    />
                    <p className="name-doctor">{`${positionDoctor}, ${nameDoctor}`}</p>
                    <p className="title-specialty">Cơ xương khớp</p>
                  </div>
                );
              })}
            </Carousel>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dataDoctors: state.doctor.dataDoctors,
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDataDoctorStart: () => dispatch(actions.fetchDataDoctorStart()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DoctorOutstand)
);
