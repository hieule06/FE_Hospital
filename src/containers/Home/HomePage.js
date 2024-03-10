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
import { Carousel } from "react-bootstrap";

class HomePage extends Component {
  async componentDidMount() {
    this.props.fetchDataDoctorStart();
    this.props.fetchAllSpecialtyStart();
    this.props.fetchAllHandbookStart();
  }

  render() {
    return (
      <div className="wrapper-home-page">
        <HeaderHome />
        <div className="wrapper-container-home-page">
          {/* <ContainerHomePage /> */}
          <div className="wrapper-background-hospital">
            <Carousel
              slide={false}
              interval={3000}
              className="carousel-specialty"
            >
              <Carousel.Item>
                <div className="background-hospital"></div>
              </Carousel.Item>
              <Carousel.Item>
                <div className="background-hospital background-hospital2"></div>
              </Carousel.Item>
              <Carousel.Item>
                <div className="background-hospital background-hospital3"></div>
              </Carousel.Item>
              <Carousel.Item>
                <div className="background-hospital background-hospital4"></div>
              </Carousel.Item>
            </Carousel>
            {/* <div className="background-hospital">
              <img src="https://cdn.bookingcare.vn/fo/w1920/2023/11/02/134537-group-12314.png" />
            </div> */}
          </div>
        </div>
        <Specialty allDataSpecialty={this.props.allDataSpecialty} />
        <DoctorOutstand
          dataDoctors={this.props.dataDoctors}
          allDataSpecialty={this.props.allDataSpecialty}
        />
        <Handbook allDataHandbook={this.props.allDataHandbook} />
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
    allDataSpecialty: state.doctor.allDataSpecialty,
    allDataHandbook: state.doctor.allDataHandbook,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDataDoctorStart: () => dispatch(actions.fetchDataDoctorStart()),
    fetchAllSpecialtyStart: () => dispatch(actions.fetchAllSpecialtyStart()),
    fetchAllHandbookStart: () => dispatch(actions.fetchAllHandbookStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
