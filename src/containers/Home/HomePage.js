import React, { Component } from "react";
import { connect } from "react-redux";
import HeaderHome from "./HeaderHome";
import ContainerHomePage from "./ContainerHomePage";
import "./HomePage.scss";
import Specialty from "./Section/Speciality/Specialty";
import DoctorOutstand from "./Section/DoctorOutstand/DoctorOutstand";
import Handbook from "./Section/Handbook/Handbook";

class HomePage extends Component {
  render() {
    return (
      <div>
        <HeaderHome />
        <div className="wrapper-container-home-page">
          <ContainerHomePage />
        </div>
        <Specialty />
        <DoctorOutstand />
        <Handbook />
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
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
