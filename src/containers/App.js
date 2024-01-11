import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter as Router } from "connected-react-router";
import { history } from "../redux";
import { ToastContainer } from "react-toastify";

import {
  userIsAuthenticated,
  userIsNotAuthenticated,
} from "../hoc/authentication";

import { path } from "../utils";

import Home from "../routes/Home";
import LoginRedirect from "./Auth/LoginRedirect";
import Login from "../routes/Login";
import System from "../routes/System";

import { CustomToastCloseButton } from "../components/CustomToast";
import ConfirmModal from "../components/ConfirmModal";
import "./App.scss";
import HomePage from "./Home/HomePage";
import DoctorDetail from "./Home/InformationDetail/Doctor/DoctorDetail";
import SpecialtyDetail from "./Home/InformationDetail/Specialty/SpecialtyDetail";
import ManageSpecialty from "./System/Specialty/ManageSpecialty";
import VerifyEmail from "./Home/InformationDetail/VerifyEmail";
import Doctor from "../routes/Doctor";

class App extends Component {
  handlePersistorState = () => {
    const { persistor } = this.props;
    let { bootstrapped } = persistor.getState();
    if (bootstrapped) {
      if (this.props.onBeforeLift) {
        Promise.resolve(this.props.onBeforeLift())
          .then(() => this.setState({ bootstrapped: true }))
          .catch(() => this.setState({ bootstrapped: true }));
      } else {
        this.setState({ bootstrapped: true });
      }
    }
  };

  componentDidMount() {
    this.handlePersistorState();
  }

  render() {
    return (
      <Fragment>
        <Router history={history}>
          <div className="main-container">
            <ConfirmModal />
            <div className={"content-container-patient"}>
              <Switch>
                <Route path={path.HOME} exact component={Home} />
                <Route path={path.LOGIN} component={Login} />
                <Route path={path.LOGIN_REDIRECT} component={LoginRedirect} />
                <Route path={path.SYSTEM} component={System} />
                <Route path={path.DOCTOR} component={Doctor} />
                <Route path={path.HOME_PAGE} component={HomePage} />
                <Route path={path.DETAIL_DOCTOR} component={DoctorDetail} />
                <Route
                  path={path.DETAIL_SPECIALTY}
                  component={SpecialtyDetail}
                />
                <Route path={path.VERIFY_BOOKING} component={VerifyEmail} />
              </Switch>
            </div>

            <ToastContainer
              className="toast-container"
              toastClassName="toast-item"
              bodyClassName="toast-item-body"
              autoClose={false}
              hideProgressBar={true}
              pauseOnHover={false}
              pauseOnFocusLoss={true}
              closeOnClick={false}
              draggable={false}
              closeButton={<CustomToastCloseButton />}
            />
          </div>
        </Router>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    started: state.app.started,
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
