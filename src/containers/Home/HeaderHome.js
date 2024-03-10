import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomePage.scss";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../utils/constant";
import { changeLanguageApp } from "../../store/actions/appActions";
import { withRouter } from "react-router";
import ModalSignUp from "./Modal/ModalSignUp/ModalSignUp";
import ModalLogIn from "./Modal/ModalLogIn/ModalLogIn";
import { Popover } from "antd";
import * as actions from "../../store/actions";
import ModalEditInfo from "./Modal/ModalEditInfo/ModalEditInfo";
import logoBooking from "../../assets/images/logo4.png";

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
  constructor(props) {
    super(props);
    this.state = {
      isModalSignUp: false,
      isModalModalLogIn: false,
      isModalEditInfo: false,
    };
  }

  handleShowModalSignUp = (value) => {
    this.setState({ isModalSignUp: true });
  };

  handleCancelModalSignUp = () => {
    this.setState({ isModalSignUp: false });
  };

  handleShowModalLogIn = (value) => {
    this.setState({ isModalLogIn: true });
  };

  handleCancelModalLogIn = () => {
    this.setState({ isModalLogIn: false });
  };

  handleShowModalEditInfo = (value) => {
    this.setState({ isModalEditInfo: true });
  };

  handleCancelModalEditInfo = () => {
    this.setState({ isModalEditInfo: false });
  };

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
        <ModalSignUp
          isModalSignUp={this.state.isModalSignUp}
          handleCancelModalSignUp={this.handleCancelModalSignUp}
        />

        <ModalLogIn
          isModalLogIn={this.state.isModalLogIn}
          handleCancelModalLogIn={this.handleCancelModalLogIn}
        />

        <ModalEditInfo
          isModalEditInfo={this.state.isModalEditInfo}
          handleCancelModalEditInfo={this.handleCancelModalEditInfo}
        />
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
                // src="https://bookingcare.vn/assets/icon/bookingcare-2020.svg"
                src={logoBooking}
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
            {this.props.isPatientMainLoggedIn ||
            this.props.isPatientLoggedIn ? (
              <div>
                <Popover
                  content={
                    <div>
                      <div
                        className="btn-logout"
                        onClick={() => this.props.patientLogout()}
                      >
                        Đăng xuất
                      </div>
                      <div
                        className="btn-logout"
                        onClick={() => this.handleShowModalEditInfo()}
                      >
                        Chỉnh sửa thông tin
                      </div>
                    </div>
                  }
                  trigger="click"
                >
                  <span className="wrapper-info-patient">
                    <i class="fas fa-user"></i>
                    <span>{this.props.patientInfo.lastName}</span>
                  </span>
                </Popover>
              </div>
            ) : (
              <div className="multi-language">
                <span
                  className="log-in"
                  onClick={() => {
                    this.handleShowModalLogIn();
                  }}
                >
                  <FormattedMessage id={"homeheader.log-in"} />
                </span>
                <span
                  className="sign-up"
                  onClick={() => {
                    this.handleShowModalSignUp();
                  }}
                >
                  <FormattedMessage id={"homeheader.sign-up"} />
                </span>
              </div>
            )}
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
    isPatientMainLoggedIn: state.user.isPatientMainLoggedIn,
    isPatientLoggedIn: state.user.isPatientLoggedIn,
    patientInfo: state.user.patientInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageRedux: (language) => dispatch(changeLanguageApp(language)),
    patientLogout: () => dispatch(actions.patientLogout()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HeaderHome)
);
