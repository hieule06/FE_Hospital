import React, { Component } from "react";
import { connect } from "react-redux";
import Carousel from "react-multi-carousel";
import { FormattedMessage } from "react-intl";
import * as actions from "../../../../store/actions";
import { responsive } from "../../../../utils";
import { LANGUAGES } from "../../../../utils";
import noImage from "../../../../assets/images/no-image.png";
import { withRouter } from "react-router";
class Handbook extends Component {
  handleViewDetailHandbook = (idHandbook) => {
    this.props.history.push(`/detail-handbook/${idHandbook}`);
  };

  handleViewHandbookPage = () => {
    this.props.history.push(`/handbook-page`);
  };

  render() {
    const listDataHandbook = this.props.allDataHandbook;
    return (
      <div className="section-container">
        <div className="offers_container" style={{ height: "100%" }}>
          <div className="offer_box" style={{ height: "100%" }}>
            <div className="wrapper-title-main-section">
              <h4 className="title-main-section">
                <FormattedMessage id={"homepage.handbook"} />
              </h4>
              <button
                className="btn-see-more"
                onClick={() => this.handleViewHandbookPage()}
              >
                <FormattedMessage id={"homepage.more-info"} />
              </button>
            </div>
            <Carousel showDots={false} responsive={responsive}>
              {listDataHandbook.length > 0 &&
                listDataHandbook.map((item, idx) => {
                  const imgHandbook = item.imageHandbook
                    ? new Buffer(item.imageHandbook, "base64").toString(
                        "binary"
                      )
                    : "";
                  const titleHandbook = item.nameHandbook;
                  return (
                    <div
                      className="card card-specialty"
                      onClick={() => this.handleViewDetailHandbook(item.id)}
                    >
                      <div
                        className="product--image"
                        style={{
                          backgroundImage: `url(${
                            imgHandbook ? imgHandbook : noImage
                          })`,
                        }}
                      ></div>
                      <p className="title-specialty">{titleHandbook}</p>
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
  connect(mapStateToProps, mapDispatchToProps)(Handbook)
);
