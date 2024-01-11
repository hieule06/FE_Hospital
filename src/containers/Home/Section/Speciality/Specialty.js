import React, { Component } from "react";
import { connect } from "react-redux";
import Carousel from "react-multi-carousel";
import { FormattedMessage } from "react-intl";
import * as actions from "../../../../store/actions";
import { responsive } from "../../../../utils";
import { LANGUAGES } from "../../../../utils";
import noImage from "../../../../assets/images/no-image.png";
import { withRouter } from "react-router";

class Specialty extends Component {
  handleViewDetailSpecialty = (idSpecialty) => {
    this.props.history.push(`/detail-specialty/${idSpecialty}`);
  };
  render() {
    const listDataSpecialty = this.props.allDataSpecialty;
    return (
      <div className="section-container">
        <div className="offers_container" style={{ height: "100%" }}>
          <div className="offer_box" style={{ height: "100%" }}>
            <div className="wrapper-title-main-section">
              <h4 className="title-main-section">
                <FormattedMessage id={"homepage.specialty-popular"} />
              </h4>
              <button className="btn-see-more">
                <FormattedMessage id={"homepage.more-info"} />
              </button>
            </div>
            <Carousel showDots={false} responsive={responsive}>
              {listDataSpecialty.map((item, idx) => {
                const imgDoctor = item.image
                  ? new Buffer(item.image, "base64").toString("binary")
                  : "";
                const titleSpecialty = item.name;
                return (
                  <div
                    className="card card-specialty"
                    onClick={() => this.handleViewDetailSpecialty(item.id)}
                  >
                    <div
                      className="product--image image-specialty"
                      style={{
                        backgroundImage: `url(${
                          imgDoctor ? imgDoctor : noImage
                        })`,
                      }}
                    ></div>
                    <p className="title-specialty">{titleSpecialty}</p>
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

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Specialty)
);
