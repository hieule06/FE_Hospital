import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import Header from "../containers/Header/Header";
import "./System.scss";
import ManageSchedule from "../containers/System/Doctor/ManageSchedule";
import ManagePatient from "../containers/System/Patient/ManagePatient";
import HistoryPatient from "../containers/System/HistoryPatient/HistoryPatient";

class Doctor extends Component {
  render() {
    return (
      <div className="system-container">
        <div className="system-list">
          {!this.props.isLoggedIn && <Header />}
          <Switch>
            <Route path="/doctor/schedule-manage" component={ManageSchedule} />
            <Route path="/doctor/patient-manage" component={ManagePatient} />
            <Route path="/doctor/history-patient" component={HistoryPatient} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Doctor);
