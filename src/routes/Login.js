import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

class Login extends Component {
  render() {
    const { isLoggedIn } = JSON.parse(localStorage.getItem("persist:user"));
    const { userInfo } = JSON.parse(localStorage.getItem("persist:user"));
    console.log("hhh: ", isLoggedIn);
    let linkToRedirect = isLoggedIn
      ? userInfo && userInfo.roleId && userInfo.roleId === "R2"
        ? "/doctor/schedule-manage"
        : "/system/user-manage"
      : "/login-redirect";

    return <Redirect to={linkToRedirect} />;
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
