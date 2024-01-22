import React, { Component } from "react";
import { connect } from "react-redux";
import HeaderHome from "../HeaderHome";
import "./HandbookPage.scss";
import Footer from "../Section/Footer/Footer";
import * as actions from "../../../store/actions";
import noImage from "../../../assets/images/no-image.png";
import { FormattedMessage } from "react-intl";
import { withRouter } from "react-router";

class HandbookPage extends Component {
  handleViewDetailHandbook = (idHandbook) => {
    this.props.history.push(`/detail-handbook/${idHandbook}`);
  };

  async componentDidMount() {
    this.props.fetchAllHandbookStart();
  }

  render() {
    const listDataHandbook = this.props.allDataHandbook;
    return (
      <div className="specialty-page doctor-detail-page">
        <HeaderHome />
        <div className="doctor-detail-container">
          <h2 className="title-specialty-page">
            <FormattedMessage id={"homepage.handbook-page"} />
          </h2>
          {listDataHandbook.map((item) => {
            if (
              item &&
              item.imageHandbook &&
              item.imageHandbook.type === "Buffer"
            ) {
              item.imageHandbook = new Buffer(
                item.imageHandbook,
                "base64"
              ).toString("binary");
            }
            return (
              <>
                <div
                  className="wrapper-list-doctor"
                  onClick={() => this.handleViewDetailHandbook(item.id)}
                >
                  <div
                    className="avatar-specialty"
                    style={{
                      backgroundImage: `url(${
                        item.imageHandbook ? item.imageHandbook : noImage
                      })`,
                    }}
                  ></div>
                  <h3 className="name-specialty">{item.nameHandbook}</h3>
                </div>
              </>
            );
          })}
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    allDataHandbook: state.doctor.allDataHandbook,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllHandbookStart: () => dispatch(actions.fetchAllHandbookStart()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HandbookPage)
);
