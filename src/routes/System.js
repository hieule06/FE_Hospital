import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import UserManage from "../containers/System/UserManage";
import RegisterPackageGroupOrAcc from "../containers/System/RegisterPackageGroupOrAcc";
import Header from "../containers/Header/Header";
import "./System.scss";
import DoctorManage from "../containers/System/Admin/DoctorManage";

class System extends Component {
  render() {
    const { systemMenuPath } = this.props;
    return (
      <div className="system-container">
        <div className="system-list">
          {!this.props.isLoggedIn && <Header />}
          <Switch>
            <Route path="/system/user-manage" component={UserManage} />
            <Route path="/system/doctor-manage" component={DoctorManage} />
            {/* <Route path="/system/schedule-manage" component={DoctorManage} /> */}
            <Route
              path="/system/register-package-group-or-account"
              component={RegisterPackageGroupOrAcc}
            />
            <Route
              component={() => {
                return <Redirect to={systemMenuPath} />;
              }}
            />
          </Switch>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    systemMenuPath: state.app.systemMenuPath,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
