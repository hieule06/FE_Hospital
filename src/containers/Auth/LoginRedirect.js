import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import { handleLogin } from "../../services/userService";

import "./LoginRedirect.scss";
import { withRouter } from "react-router";

class LoginRedirect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      passWord: "",
      isShowPassword: false,
      errMessage: "",
    };
  }

  handleOnchangeName = (event) => {
    this.setState({ userName: event.target.value });
  };

  handleOnchangePassword = (event) => {
    this.setState({ passWord: event.target.value });
  };

  handleShowHidePassowrd = () => {
    this.setState({ isShowPassword: !this.state.isShowPassword });
  };

  handleLogin = async () => {
    this.setState({ errMessage: "" });
    try {
      const data = await handleLogin(this.state.userName, this.state.passWord);
      if (data.data.errCode !== 0) {
        this.setState({ errMessage: data.data.errMessage });
      }
      if (data.data.errCode === 0) {
        this.props.userLoginSuccess(data.data.user);
        data.data.user &&
        data.data.user.roleId &&
        data.data.user.roleId === "R2"
          ? this.props.history.push(`/doctor/schedule-manage`)
          : this.props.history.push(`/system/user-manage`);
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  handleEnter = (event) => {
    if (event.key === "Enter") {
      this.handleLogin();
    }
  };

  render() {
    return (
      <div className="wrapper-container">
        <div className="container-login">
          <div className="content-login">
            <div className="title-login">Login</div>
            <div className="col-12 form-groud">
              <label>UserName</label>
              <input
                className="col-12 form-control wrapper-inputUsername"
                name="userName"
                type="text"
                placeholder="Enter your username"
                onChange={(e) => this.handleOnchangeName(e)}
                onKeyDown={(event) => this.handleEnter(event)}
              />
            </div>
            <div className="col-12 form-groud">
              <label>PassWord</label>
              <div className="wrapper-inputPassWord">
                <input
                  className="col-12 form-control"
                  name="passWord"
                  type={this.state.isShowPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  onChange={(e) => this.handleOnchangePassword(e)}
                  onKeyDown={(event) => this.handleEnter(event)}
                />
                <span onClick={() => this.handleShowHidePassowrd()}>
                  <i
                    className={
                      this.state.isShowPassword
                        ? "far fa-eye"
                        : "far fa-eye-slash"
                    }
                  ></i>
                </span>
              </div>
            </div>
            <div className="text-danger mt[-20px]">{this.state.errMessage}</div>
            <button
              className="col-12 login-btn"
              onClick={() => this.handleLogin()}
            >
              Login
            </button>
            <div className="col-12 ">
              <span className="forgot-password">Forgot your password?</span>
            </div>
            <div className="col-12 text-center">
              <span className="text-center">Or login with:</span>
            </div>
            <div className="col-12 cocial-login">
              <i className="fab fa-google-plus-g google"></i>
              <i className="fab fa-twitter twitter"></i>
              <i className="fab fa-facebook-f facebook "></i>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    userLoginSuccess: (userInfo) =>
      dispatch(actions.userLoginSuccess(userInfo)),
    userLoginFail: () => dispatch(actions.userLoginFail()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LoginRedirect)
);
