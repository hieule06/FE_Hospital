import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../store/actions";
import "./Header.scss";
import {
  UserOutlined,
  SettingOutlined,
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LoginOutlined,
  FontSizeOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu } from "antd";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../utils/constant";
import { changeLanguageApp } from "../../store/actions/appActions";
import { withRouter } from "react-router";

const { Sider } = Layout;

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
    };
  }

  handleViewPatientManage = (idPage) => {
    if (idPage === "doctor")
      this.props.history.push(
        `/doctor/patient-manage?idDoctor=all&date=${new Date().getTime()}`
      );
    if (idPage === "patient")
      this.props.history.push(
        `/system/patient-manage?idDoctor=all&date=${new Date().getTime()}`
      );
  };

  handleViewHistoryPatient = (idPage) => {
    if (idPage === "doctor")
      this.props.history.push(
        `/doctor/history-patient?idDoctor=${
          this.props.userInfo.id
        }&date=${new Date().getTime()}`
      );
    if (idPage === "patient")
      this.props.history.push(
        `/system/history-patient?idDoctor=all&date=${new Date().getTime()}`
      );
  };

  handleBookingReExamination = () => {
    this.props.history.push(`/system/booking-re-examination?patientsId=all`);
  };

  changeLanguage = (language) => {
    this.props.changeLanguageRedux(language);
  };

  toggleCollapsed = () => {
    this.setState({ collapsed: !this.state.collapsed });
  };

  render() {
    const { processLogout } = this.props;
    const { userInfo } = this.props;
    return (
      <Layout className="wrapper-sidebar">
        <Sider className="sidebar" collapsed={this.state.collapsed}>
          <Menu mode="inline" theme="dark">
            <Menu.Item
              key={"user"}
              icon={<UserOutlined />}
              className="infor-user"
            >
              <h5>
                {userInfo && userInfo.firstName && userInfo.lastName
                  ? userInfo.firstName + " " + userInfo.lastName
                  : ""}
              </h5>
            </Menu.Item>
            {userInfo && userInfo.roleId && userInfo.roleId === "R2" ? (
              <Menu.SubMenu
                key={"home"}
                icon={<SettingOutlined />}
                title={<FormattedMessage id={"menu.admin.setting-user"} />}
              >
                <Menu.Item className="style-title-sub" key={"home3"}>
                  <Link to="/doctor/schedule-manage">
                    <FormattedMessage id={"menu.doctor.manage-schedule"} />
                  </Link>
                </Menu.Item>
                <Menu.Item
                  className="style-title-sub"
                  key={"home4"}
                  onClick={() => this.handleViewPatientManage("doctor")}
                >
                  <FormattedMessage id={"menu.doctor.manage-patient"} />
                </Menu.Item>
                <Menu.Item
                  className="style-title-sub"
                  key={"home5"}
                  onClick={() => this.handleViewHistoryPatient("doctor")}
                >
                  <FormattedMessage id={"menu.doctor.manage-history-patient"} />
                </Menu.Item>
              </Menu.SubMenu>
            ) : (
              <>
                <Menu.SubMenu
                  key={"home"}
                  icon={<SettingOutlined />}
                  title={<FormattedMessage id={"menu.admin.setting-user"} />}
                >
                  <Menu.Item className="style-title-sub" key={"home1"}>
                    <Link to="/system/user-manage">
                      <FormattedMessage id={"menu.admin.crud"} />
                    </Link>
                  </Menu.Item>
                  <Menu.Item className="style-title-sub" key={"home2"}>
                    <Link to="/system/doctor-manage">
                      <FormattedMessage id={"menu.admin.manage-doctor"} />
                    </Link>
                  </Menu.Item>
                  <Menu.Item className="style-title-sub" key={"home3"}>
                    <Link to="/system/schedule-manage">
                      <FormattedMessage id={"menu.doctor.manage-schedule"} />
                    </Link>
                  </Menu.Item>
                  <Menu.Item
                    className="style-title-sub"
                    key={"home4"}
                    onClick={() => this.handleViewPatientManage("patient")}
                  >
                    <FormattedMessage id={"menu.doctor.manage-patient"} />
                  </Menu.Item>
                  <Menu.Item
                    className="style-title-sub"
                    key={"home5"}
                    onClick={() => this.handleViewHistoryPatient("patient")}
                  >
                    <FormattedMessage
                      id={"menu.doctor.manage-history-patient"}
                    />
                  </Menu.Item>
                  <Menu.Item
                    className="style-title-sub"
                    key={"home6"}
                    onClick={() => this.handleBookingReExamination()}
                  >
                    <FormattedMessage id={"doctor.reExamination"} />
                  </Menu.Item>
                </Menu.SubMenu>
                {/* <Menu.Item key={"clinic"} icon={<AppstoreOutlined />}>
                  <FormattedMessage id={"menu.admin.clinic"} />
                </Menu.Item> */}
                <Menu.Item key={"specialty"} icon={<ContainerOutlined />}>
                  <Link to="/system/specialty-manage">
                    <FormattedMessage id={"menu.admin.specialty"} />
                  </Link>
                </Menu.Item>
                <Menu.Item key={"handbook"} icon={<DesktopOutlined />}>
                  <Link to="/system/handbook-manage">
                    <FormattedMessage id={"menu.admin.handbook"} />
                  </Link>
                </Menu.Item>
              </>
            )}
            <Menu.SubMenu
              key={"language"}
              icon={<FontSizeOutlined />}
              title={<FormattedMessage id={"menu.admin.language"} />}
            >
              <Menu.Item
                key={"language-vn"}
                className={
                  this.props.language === "vi"
                    ? "language-vi active"
                    : "language-vi"
                }
                onClick={() => {
                  this.changeLanguage(LANGUAGES.VI);
                }}
              >
                Vn
              </Menu.Item>
              <Menu.Item
                key={"language-en"}
                className={
                  this.props.language === "en"
                    ? "language-en active"
                    : "language-en"
                }
                onClick={() => {
                  this.changeLanguage(LANGUAGES.EN);
                }}
              >
                En
              </Menu.Item>
            </Menu.SubMenu>
            <Menu.Item
              key={"logout"}
              icon={<LoginOutlined />}
              onClick={processLogout}
            >
              <Link to="/login-redirect">
                <FormattedMessage id={"menu.admin.logout"} />
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Button
          type="primary"
          onClick={this.toggleCollapsed}
          style={{
            marginBottom: 16,
            backgroundColor: "#ffffff",
            color: "black",
          }}
        >
          {this.state.collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageRedux: (language) => dispatch(changeLanguageApp(language)),
    processLogout: () => dispatch(actions.processLogout()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
