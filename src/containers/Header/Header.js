import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../store/actions";
import Navigator from "../../components/Navigator";
import { adminMenu } from "./menuApp";
import "./Header.scss";
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeFilled,
  LogoutOutlined,
} from "@ant-design/icons";
import { Button, Menu } from "antd";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      widthSibar: "10%",
    };
  }

  toggleCollapsed = () => {
    this.setState({ collapsed: !this.state.collapsed });
    this.state.collapsed
      ? this.setState({ widthSibar: "25%" })
      : this.setState({ widthSibar: "10%" });
  };

  getItem(label, key, icon, children, type, danger) {
    return {
      key,
      icon,
      children,
      label,
      type,
      danger,
    };
  }

  items = [
    this.getItem("Hệ thống", "1", <HomeFilled />),

    this.getItem("Quản trị hệ thống", "sub1", <ContainerOutlined />, [
      this.getItem("Quản lý người sử dụng", "5"),
      this.getItem("Quản lý gói", "6"),
      this.getItem("Đăng ký gói dịch vụ cho nhóm/tài khoản", "7"),
    ]),

    this.getItem("Navigation Two", "sub2", <AppstoreOutlined />, [
      this.getItem("Option 9", "9"),
      this.getItem("Option 10", "10"),

      this.getItem("Submenu", "sub3", null, [
        this.getItem("Option 11", "11"),
        this.getItem("Option 12", "12"),
      ]),
    ]),

    this.getItem("SignOut", "SignOut", <LogoutOutlined />, "", "", true),
  ];

  render() {
    return (
      <div
        style={{
          width: this.state.widthSibar,
          height: "100vh",
          display: "flex",
        }}
      >
        <Menu
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          theme="dark"
          inlineCollapsed={this.state.collapsed}
          items={this.items}
          onClick={(item) => {
            console.log(item);
          }}
        ></Menu>
        <Button
          type="primary"
          onClick={this.toggleCollapsed}
          style={{
            marginBottom: 16,
            backgroundColor: "#ffffff",
            color: "black",
          }}
        >
          {this.collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processLogout: () => dispatch(actions.processLogout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
