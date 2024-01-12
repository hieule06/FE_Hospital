import React, { Component } from "react";
import { connect } from "react-redux";
import HeaderHome from "../HeaderHome";
import "./SpecialtyPage.scss";
import Footer from "../Section/Footer/Footer";
import * as actions from "../../../store/actions";
import noImage from "../../../assets/images/no-image.png";
import { FormattedMessage } from "react-intl";
import { withRouter } from "react-router";

class SpecialtyPage extends Component {
  handleViewDetailSpecialty = (idSpecialty) => {
    this.props.history.push(`/detail-specialty/${idSpecialty}`);
  };

  async componentDidMount() {
    this.props.fetchAllSpecialtyStart();
  }

  render() {
    const listDataSpecialty = this.props.allDataSpecialty;
    return (
      <div className="specialty-page doctor-detail-page">
        <HeaderHome />
        <div className="doctor-detail-container">
          <h2 className="title-specialty-page">
            <FormattedMessage id={"homepage.specialty-page"} />
          </h2>
          <div className="abc">
            {listDataSpecialty.map((item) => {
              if (item && item.image && item.image.type === "Buffer") {
                item.image = new Buffer(item.image, "base64").toString(
                  "binary"
                );
              }
              return (
                <>
                  <div
                    className="wrapper-list-doctor"
                    onClick={() => this.handleViewDetailSpecialty(item.id)}
                  >
                    <div
                      className="avatar-specialty"
                      style={{
                        backgroundImage: `url(${
                          item.image ? item.image : noImage
                        })`,
                      }}
                    ></div>
                    <h3 className="name-specialty">{item.name}</h3>
                  </div>
                </>
              );
            })}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    allDataSpecialty: state.doctor.allDataSpecialty,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllSpecialtyStart: () => dispatch(actions.fetchAllSpecialtyStart()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SpecialtyPage)
);
