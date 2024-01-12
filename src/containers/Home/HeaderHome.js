import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomePage.scss";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../utils/constant";
import { changeLanguageApp } from "../../store/actions/appActions";
import { withRouter } from "react-router";

const itemMenuHeader = [
  {
    title: <FormattedMessage id={"homeheader.specialist"} />,
    description: <FormattedMessage id={"homeheader.searchdoctor"} />,
    idPage: 1,
  },
  {
    title: <FormattedMessage id={"homeheader.doctor"} />,
    description: <FormattedMessage id={"homeheader.chooseDoctor"} />,
    idPage: 2,
  },
  {
    title: <FormattedMessage id={"homeheader.handbook"} />,
    description: <FormattedMessage id={"homeheader.articles-about-health"} />,
    idPage: 3,
  },
];

class HeaderHome extends Component {
  handleViewPage = (idPage) => {
    if (idPage === 1) this.props.history.push(`/specialty-page`);
    if (idPage === 2) this.props.history.push(`/doctor-page`);
    if (idPage === 3) this.props.history.push(`/handbook-page`);
  };

  changeLanguage = (language) => {
    this.props.changeLanguageRedux(language);
  };

  render() {
    return (
      <div className="header-page-container">
        <div className="header-page-content">
          <div className="wrapper-header-logo">
            {/* <div className="icon-bar">
              <i class="fa fa-bars" aria-hidden="true"></i>
            </div> */}
            <div
              className="header-logo"
              onClick={() => this.props.history.push(`/home-page`)}
            >
              <img
                src="https://bookingcare.vn/assets/icon/bookingcare-2020.svg"
                alt="BookingCare"
              />
            </div>
          </div>
          <ul className="wrapper-item-header">
            {itemMenuHeader &&
              itemMenuHeader.map((item) => (
                <li
                  className="item-header"
                  onClick={() => this.handleViewPage(item.idPage)}
                >
                  <h4>{item.title}</h4>
                  <p className="title-item-header">{item.description}</p>
                </li>
              ))}
          </ul>
          <div className="wrapper-support-language">
            <div className="wrapper-support">
              <span className="support">
                <i class="fas fa-question-circle">
                  <text>
                    <FormattedMessage id={"homeheader.support"} />
                  </text>
                </i>
              </span>
              <span className="phone-number">024-7301-2468</span>
            </div>
            <div className="multi-language">
              <span
                className={
                  this.props.language === "vi"
                    ? "language-vi active"
                    : "language-vi"
                }
                onClick={() => {
                  this.changeLanguage(LANGUAGES.VI);
                }}
              >
                VN
              </span>
              <span
                className={
                  this.props.language === "en"
                    ? "language-en active"
                    : "language-en"
                }
                onClick={() => {
                  this.changeLanguage(LANGUAGES.EN);
                }}
              >
                EN
              </span>
            </div>
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
  return {
    changeLanguageRedux: (language) => dispatch(changeLanguageApp(language)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HeaderHome)
);
