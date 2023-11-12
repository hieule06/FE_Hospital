import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../store/actions";
import "./Header.scss";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Menu } from "antd";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

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

  render() {
    const { processLogout } = this.props;
    return (
      <div
        style={{
          width: this.state.widthSibar,
          height: "100vh",
          display: "flex",
        }}
        className="wrapper-header"
      >
        <Menu
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          theme="dark"
        >
          <Menu.Item>
            <Link to="/system/user-manage">Quản trị hệ thống</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/system/user-manage">Quản lý người sử dụng</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/system/product-manage">Quản lý gói</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/system/register-package-group-or-account">
              Đăng ký gói dịch vụ cho nhóm/tài khoản
            </Link>
          </Menu.Item>
          <Menu.Item>
            <div className="btn btn-logout" onClick={processLogout}>
              <i className="fas fa-sign-out-alt">logout</i>
            </div>
          </Menu.Item>
        </Menu>
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
