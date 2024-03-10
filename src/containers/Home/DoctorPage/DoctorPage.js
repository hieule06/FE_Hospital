import React, { Component } from "react";
import { connect } from "react-redux";
import HeaderHome from "../HeaderHome";
import "./DoctorPage.scss";
import Footer from "../Section/Footer/Footer";
import * as actions from "../../../store/actions";
import noImage from "../../../assets/images/no-image.png";
import { FormattedMessage } from "react-intl";
import { withRouter } from "react-router";
import { getListDoctorsByIdSpecialty } from "../../../services/doctorService";
import BookingModal from "../InformationDetail/Doctor/Modal/BookingModal";
import ProfileDoctor from "../InformationDetail/Doctor/ProfileDoctor";
import DoctorSchedule from "../InformationDetail/Doctor/DoctorSchedule";

class DoctorPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      objDate: -1,
      listDoctors: [],
    };
  }

  handleShowModal = (value) => {
    this.setState({ isModalOpen: true, objDate: value });
  };

  handleOk = () => {
    this.setState({ isModalOpen: false });
  };

  handleCancel = () => {
    this.setState({ isModalOpen: false });
  };

  async componentDidMount() {
    let listDoctors = await getListDoctorsByIdSpecialty("All");
    if (listDoctors && listDoctors.data.errCode === 0) {
      this.setState({
        listDoctors: listDoctors.data.listDoctors,
      });
    }
  }

  render() {
    const listDoctors = this.state.listDoctors.filter((item) => item.User);
    return (
      <div className="specialty-page doctor-detail-page">
        <BookingModal
          isModalOpen={this.state.isModalOpen}
          handleOk={this.handleOk}
          handleCancel={this.handleCancel}
          detailDoctor={
            this.state.objDate !== -1 && this.state.objDate.dataDoctor.User
          }
          currentDoctorId={
            this.state.objDate !== -1 && this.state.objDate.dataDoctor.doctorId
          }
          priceExamination={
            this.state.objDate !== -1 && this.state.objDate.dataDoctor.priceType
          }
          objDate={this.state.objDate}
        />
        <HeaderHome />
        <div className="doctor-detail-container">
          <h2 className="title-specialty-page">
            <FormattedMessage id={"homepage.doctor-page"} />
          </h2>
          {listDoctors &&
            listDoctors.length > 0 &&
            listDoctors.map((item) => {
              if (
                item &&
                item.User &&
                item.User.image &&
                item.User.image.type === "Buffer"
              ) {
                item.User.image = new Buffer(
                  item.User.image,
                  "base64"
                ).toString("binary");
              }
              return (
                <>
                  <div className="wrapper-list-doctor">
                    <ProfileDoctor
                      detailDoctor={item.User}
                      priceExamination={item.priceType}
                      objDate={this.state.objDate}
                      isShowProfile={true}
                      description={item.description}
                      currentDoctorId={item.doctorId}
                    />
                    <div className="list-doctor-specialty schedule-doctor">
                      <DoctorSchedule
                        idDoctor={item.doctorId}
                        dataDoctor={item}
                        handleShowModal={this.handleShowModal}
                      />
                    </div>
                  </div>
                </>
              );
            })}
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    allDataHandbook: state.doctor.allDataHandbook,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllHandbookStart: () => dispatch(actions.fetchAllHandbookStart()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DoctorPage)
);
