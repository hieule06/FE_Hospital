import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageSchedule.scss";
import * as actions from "../../../store/actions";

class ManageSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {}

  componentDidUpdate(prevProps, prevState, snapshot) {}

  render() {
    return <div className="">manage doctor</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    allDoctors: state.doctor.allDoctors,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctorStart: () => dispatch(actions.fetchAllDoctorStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
