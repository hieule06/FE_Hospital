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

const { Sider } = Layout;

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
    };
  }

  changeLanguage = (language) => {
    this.props.changeLanguageRedux(language);
  };

  toggleCollapsed = () => {
    this.setState({ collapsed: !this.state.collapsed });
  };

  render() {
    const { processLogout } = this.props;
    const { userInfo } = this.props;
    console.log("userInfo: ", userInfo);
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
                <Menu.Item className="style-title-sub" key={"home4"}>
                  <Link to="/doctor/schedule-manage">
                    <FormattedMessage id={"menu.doctor.manage-schedule"} />
                  </Link>
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
                  <Menu.Item className="style-title-sub" key={"home3"}>
                    <Link to="/system/doctor-manage">
                      <FormattedMessage id={"menu.admin.manage-doctor"} />
                    </Link>
                  </Menu.Item>
                  <Menu.Item className="style-title-sub" key={"home4"}>
                    <Link to="/doctor/schedule-manage">
                      <FormattedMessage id={"menu.doctor.manage-schedule"} />
                    </Link>
                  </Menu.Item>
                </Menu.SubMenu>
                {/* <Menu.Item key={"clinic"} icon={<AppstoreOutlined />}>
                  <FormattedMessage id={"menu.admin.clinic"} />
                </Menu.Item> */}
                <Menu.Item key={"specialty"} icon={<ContainerOutlined />}>
                  <Link to="/specialty">
                    <FormattedMessage id={"menu.admin.specialty"} />
                  </Link>
                </Menu.Item>
                <Menu.Item key={"handbook"} icon={<DesktopOutlined />}>
                  <FormattedMessage id={"menu.admin.handbook"} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Header);
