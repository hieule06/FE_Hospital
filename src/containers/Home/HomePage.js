import React, { Component } from "react";
import { connect } from "react-redux";
import HeaderHome from "./HeaderHome";
import ContainerHomePage from "./ContainerHomePage";
import "./HomePage.scss";
import Specialty from "./Section/Speciality/Specialty";
import DoctorOutstand from "./Section/DoctorOutstand/DoctorOutstand";
import Handbook from "./Section/Handbook/Handbook";
import Introductory from "./Section/Introductory/Introductory";
import Footer from "./Section/Footer/Footer";
import * as actions from "../../store/actions";

class HomePage extends Component {
  async componentDidMount() {
    this.props.fetchDataDoctorStart();
  }

  render() {
    return (
      <div className="wrapper-home-page">
        <HeaderHome />
        <div className="wrapper-container-home-page">
          <ContainerHomePage />
        </div>
        <Specialty dataDoctors={this.props.dataDoctors} />
        <DoctorOutstand dataDoctors={this.props.dataDoctors} />
        <Handbook dataDoctors={this.props.dataDoctors} />
        <div className="wrapper-sections">
          <Introductory />
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dataDoctors: state.doctor.dataDoctors,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDataDoctorStart: () => dispatch(actions.fetchDataDoctorStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
