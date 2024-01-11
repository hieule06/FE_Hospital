import React, { Component } from "react";
import { connect } from "react-redux";
import HeaderHome from "../../HeaderHome";
import "./SpecialtyDetail.scss";
import Footer from "../../Section/Footer/Footer";
import {
  getListDoctorsByIdSpecialty,
  getdataSpecialtyShowPage,
} from "../../../../services/doctorService";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import DoctorExtrainfor from "../Doctor/DoctorExtrainfor";
import BookingModal from "../Doctor/Modal/BookingModal";
import ProfileDoctor from "../Doctor/ProfileDoctor";

class SpecialtyDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailSpecialty: {},
      currentSpecialtyId: -1,
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
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      this.setState({
        currentSpecialtyId: id,
      });

      let listDoctors = await getListDoctorsByIdSpecialty(id);
      if (listDoctors && listDoctors.data.errCode === 0) {
        this.setState({
          listDoctors: listDoctors.data.listDoctors,
        });
      }

      let res = await getdataSpecialtyShowPage(id);
      if (res && res.data.errCode === 0) {
        this.setState({
          detailSpecialty: res.data.dataSpecialty,
        });
      }
    }
  }

  render() {
    const { detailSpecialty } = this.state;
    const { listDoctors } = this.state;
    return (
      <div className="doctor-detail-page">
        <HeaderHome />
        <div className="doctor-detail-container">
          <div className="detail-infor-doctor">
            {detailSpecialty.descriptionHTML && (
              <div
                dangerouslySetInnerHTML={{
                  __html: detailSpecialty.descriptionHTML,
                }}
              ></div>
            )}
          </div>
          <p className="title-list-doctors">
            Danh sách các bác sĩ chuyên khoa {detailSpecialty.name}:{" "}
          </p>
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
                  <BookingModal
                    isModalOpen={this.state.isModalOpen}
                    handleOk={this.handleOk}
                    handleCancel={this.handleCancel}
                    detailDoctor={item.User}
                    currentDoctorId={item.doctorId}
                    priceExamination={item.priceType}
                    objDate={this.state.objDate}
                  />
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
                        handleShowModal={this.handleShowModal}
                      />
                      {/* <DoctorExtrainfor
                        priceExamination={
                          item && item.priceType ? item.priceType : ""
                        }
                        noteText={item && item.noteText ? item.noteText : ""}
                      /> */}
                    </div>
                  </div>
                </>
              );
            })}

          {/* <div className="schedule-doctor">
            <DoctorSchedule
              idDoctor={this.props.match.params.id}
              handleShowModal={this.handleShowModal}
            />
            <DoctorExtrainfor
              priceExamination={
                detailDoctor &&
                detailDoctor.Infor_Doctor &&
                detailDoctor.Infor_Doctor.priceType
              }
              noteText={
                detailDoctor &&
                detailDoctor.Infor_Doctor &&
                detailDoctor.Infor_Doctor.noteText
              }
            />
          </div> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(SpecialtyDetail);
