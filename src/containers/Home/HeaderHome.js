import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomePage.scss";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../utils/constant";
import { changeLanguageApp } from "../../store/actions/appActions";

const itemMenuHeader = [
  {
    title: <FormattedMessage id={"homeheader.specialist"} />,
    description: <FormattedMessage id={"homeheader.searchdoctor"} />,
  },
  {
    title: <FormattedMessage id={"homeheader.doctor"} />,
    description: <FormattedMessage id={"homeheader.chooseDoctor"} />,
  },
  {
    title: <FormattedMessage id={"homeheader.package"} />,
    description: <FormattedMessage id={"homeheader.General"} />,
  },
];

class HeaderHome extends Component {
  changeLanguage = (language) => {
    this.props.changeLanguageRedux(language);
  };

  render() {
    return (
      <div className="header-page-container">
        <div className="header-page-content">
          <div className="wrapper-header-logo">
            <div className="icon-bar">
              <i class="fa fa-bars" aria-hidden="true"></i>
            </div>
            <div className="header-logo">
              <img
                src="https://bookingcare.vn/assets/icon/bookingcare-2020.svg"
                alt="BookingCare"
              />
            </div>
          </div>
          <ul className="wrapper-item-header">
            {itemMenuHeader &&
              itemMenuHeader.map((item) => (
                <li className="item-header">
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

export default connect(mapStateToProps, mapDispatchToProps)(HeaderHome);
