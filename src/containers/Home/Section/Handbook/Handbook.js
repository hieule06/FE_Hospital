import React, { Component } from "react";
import { connect } from "react-redux";
import Carousel from "react-multi-carousel";
import { FormattedMessage } from "react-intl";
import * as actions from "../../../../store/actions";
import { responsive } from "../../../../utils";
import { LANGUAGES } from "../../../../utils";
import noImage from "../../../../assets/images/no-image.png";
class Handbook extends Component {
  render() {
    const listDataDoctors = this.props.dataDoctors;
    return (
      <div className="section-container">
        <div className="offers_container" style={{ height: "100%" }}>
          <div className="offer_box" style={{ height: "100%" }}>
            <div className="wrapper-title-main-section">
              <h4 className="title-main-section">
                <FormattedMessage id={"homepage.handbook"} />
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
                  <div className="card">
                    <div
                      className="product--image"
                      style={{
                        backgroundImage: `url(${
                          imgDoctor ? imgDoctor : noImage
                        })`,
                      }}
                    ></div>
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
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Handbook);
