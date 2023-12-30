import React, { Component } from "react";
import { connect } from "react-redux";
import HeaderHome from "../../HeaderHome";
import { getdataDoctorShowPage } from "../../../../services/doctorService";
import noImage from "../../../../assets/images/no-image.png";
import "./DoctorDetail.scss";
import { LANGUAGES } from "../../../../utils";
import Footer from "../../Section/Footer/Footer";
import DoctorSchedule from "./DoctorSchedule";
import DoctorExtrainfor from "./DoctorExtrainfor";
import BookingModal from "./Modal/BookingModal";

class DoctorDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailDoctor: {},
      currentDoctorId: -1,
      isModalOpen: false,
      objDate: -1,
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
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      this.setState({
        currentDoctorId: id,
      });

      let res = await getdataDoctorShowPage(id);
      if (res && res.data.errCode === 0) {
        this.setState({
          detailDoctor: res.data.dataDoctor,
        });
      }
    }
  }

  render() {
    const { detailDoctor } = this.state;
    let nameDoctor;
    if (
      detailDoctor &&
      detailDoctor.positionData &&
      this.props.language === LANGUAGES.VI
    ) {
      nameDoctor = `${detailDoctor.positionData.valueVi}, ${detailDoctor.lastName} ${detailDoctor.firstName}`;
    }
    if (
      detailDoctor &&
      detailDoctor.positionData &&
      this.props.language === LANGUAGES.EN
    ) {
      nameDoctor = `${detailDoctor.positionData.valueEn}, ${detailDoctor.firstName} ${detailDoctor.lastName}`;
    }
    return (
      <div className="doctor-detail-page">
        <BookingModal
          isModalOpen={this.state.isModalOpen}
          handleOk={this.handleOk}
          handleCancel={this.handleCancel}
          detailDoctor={detailDoctor}
          priceExamination={
            detailDoctor &&
            detailDoctor.Markdown &&
            detailDoctor.Markdown.priceType
          }
          objDate={this.state.objDate}
        />
        <HeaderHome />
        <div className="doctor-detail-container">
          <div className="intro-doctor">
            <div className="content-intro">
              <div
                className="avatar-doctor"
                style={{
                  backgroundImage: `url(${
                    detailDoctor && detailDoctor.image
                      ? detailDoctor.image
                      : noImage
                  })`,
                }}
              >
                {/*  <img
                  src={
                    detailDoctor && detailDoctor.image
                      ? detailDoctor.image
                      : noImage
                  }
                  alt=""
                /> */}
              </div>
              <div className="preliminary-information">
                <h3>{nameDoctor}</h3>
                <p>
                  {detailDoctor.Markdown
                    ? detailDoctor.Markdown.description
                    : ""}
                </p>
              </div>
            </div>
          </div>
          <div className="schedule-doctor">
            <DoctorSchedule
              idDoctor={this.props.match.params.id}
              handleShowModal={this.handleShowModal}
            />
            <DoctorExtrainfor
              priceExamination={
                detailDoctor &&
                detailDoctor.Markdown &&
                detailDoctor.Markdown.priceType
              }
              noteText={
                detailDoctor &&
                detailDoctor.Markdown &&
                detailDoctor.Markdown.noteText
              }
            />
          </div>
          <div className="detail-infor-doctor">
            {detailDoctor.Markdown && detailDoctor.Markdown.contentHTML && (
              <div
                dangerouslySetInnerHTML={{
                  __html: detailDoctor.Markdown.contentHTML,
                }}
              ></div>
            )}
          </div>
        </div>
        <Footer />
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
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorDetail);
