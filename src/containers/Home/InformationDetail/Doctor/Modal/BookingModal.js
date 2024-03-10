import React, { Component } from "react";
import { connect } from "react-redux";
import "./BookingModal.scss";
import { Button, message, Form, Input, Modal, Select } from "antd";
import ProfileDoctor from "../ProfileDoctor";
import * as actions from "../../../../../store/actions";
import { LANGUAGES } from "../../../../../utils";
import { FormattedMessage } from "react-intl";
import { postAppointmentBook } from "../../../../../services/doctorService";

class BookingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrGender: [],
      fullName: "",
      phoneNumber: "",
      email: "",
      address: "",
      reason: "",
      gender: "",
      scheduleTimeFrame: "",
      doctorName: "",
    };
  }

  getScheduleTimeFrame = (value) => {
    this.setState({
      scheduleTimeFrame: value.scheduleTimeFrame,
      doctorName: value.doctorName,
    });
  };

  handleAppointmentBook = async (data) => {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    /* if (!data.email.match(mailformat)) {
      return this.props.language === LANGUAGES.VI
        ? message.error(`Email của bạn sai định dạng. Vui lòng nhập lại !`)
        : message.error(`Your email is in the wrong format. Please re-enter !`);
    } */
    if (!data.phoneNumber && !this.props.patientInfo.phoneNumber) {
      return this.props.language === LANGUAGES.VI
        ? message.error(`Trường "Số điện thoại" là trường bắt buộc !`)
        : message.error(`Field "PhoneNumber" are required fields !`);
    } else {
      const result = await postAppointmentBook({
        doctorId: this.props.currentDoctorId,
        doctorName: data.doctorName,
        patientName:
          this.props.patientInfo && this.props.patientInfo.lastName
            ? this.props.patientInfo.lastName
            : "",
        phoneNumber:
          this.props.patientInfo && this.props.patientInfo.phoneNumber
            ? this.props.patientInfo.phoneNumber
            : data.phoneNumber,
        address:
          this.props.patientInfo && this.props.patientInfo.address
            ? this.props.patientInfo.address
            : data.address,
        gender:
          this.props.patientInfo && this.props.patientInfo.gender
            ? this.props.patientInfo.gender
            : data.gender,
        reason: data.reason,
        language: this.props.language,
        scheduleTimeFrame: data.scheduleTimeFrame,
        date: this.props.objDate.currentDate, // Ngày đặt lịch để lưu trong bảng schedule
        timeType: this.props.objDate.avalableTime.keyMap,
        email:
          this.props.patientInfo && this.props.patientInfo.email
            ? this.props.patientInfo.email
            : "",
      });

      if (result && result.data.dataDoctors && !result.data.dataDoctors[1]) {
        this.setState({
          fullName: "",
          phoneNumber: "",
          email: "",
          address: "",
          reason: "",
          gender: "",
        });
        this.props.handleCancel();
        return this.props.language === LANGUAGES.VI
          ? message.error(
              `Bạn đã đặt lịch khám trùng ngày, vui lòng đặt lịch hẹn cho ngày khác !`
            )
          : message.error(
              `You have booked an appointment for the same day, please schedule an appointment for another day !`
            );
      }

      if (result && result.data.errCode === 3) {
        this.setState({
          fullName: "",
          phoneNumber: "",
          email: "",
          address: "",
          reason: "",
          gender: "",
        });
        return this.props.language === LANGUAGES.VI
          ? message.error(`Lịch khám đã đầy, Vui lòng cho thời gian khác !`)
          : message.error(
              `Examination schedule is full, please allow another time!`
            );
      }

      if (result && result.data.errCode === 0) {
        this.setState({
          fullName: "",
          phoneNumber: "",
          email: "",
          address: "",
          reason: "",
          gender: "",
        });
        this.props.handleCancel();
        return this.props.language === LANGUAGES.VI
          ? message.success(
              `vui lòng kiểm tra Email để xác nhận đặt lịch khám !`
            )
          : message.success(
              `Please check your email to confirm your appointment !`
            );
      } else {
        this.setState({
          fullName: "",
          phoneNumber: "",
          email: "",
          address: "",
          reason: "",
          gender: "",
        });
        return this.props.language === LANGUAGES.VI
          ? message.error(
              `Đặt lịch không thành công. Vui lòng liên hệ đến tổng đài để được hỗ trợ !`
            )
          : message.error(
              `Scheduling failed. Please contact the hotline for support !`
            );
      }
    }
  };

  async componentDidMount() {
    this.props.fetchGenderStart();
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
      if (this.props.genders.length > 0) {
        const genderArr = [];
        this.props.genders.map((item) => {
          const obj = {};
          obj.value =
            this.props.language === LANGUAGES.VI ? item.valueVi : item.valueEn;
          obj.label =
            this.props.language === LANGUAGES.VI ? item.valueVi : item.valueEn;

          genderArr.push(obj);
        });
        this.setState({ arrGender: genderArr });
      }
    }
  }

  render() {
    const genderArr = [];
    if (this.state.arrGender.length <= 0) {
      this.props.genders.map((item) => {
        const obj = {};
        obj.label =
          this.props.language === LANGUAGES.VI ? item.valueVi : item.valueEn;
        obj.value = item.keyMap;

        genderArr.push(obj);
      });
    }
    return (
      <div className="wrapper-modal-booking">
        <Modal
          title={<FormattedMessage id={"patient.booking-modal.title"} />}
          footer={false}
          open={this.props.isModalOpen}
          onOk={this.props.handleOk}
          onCancel={this.props.handleCancel}
          width={"60%"}
          style={{ top: 30 }}
        >
          <Form name="form_item_path" layout="vertical">
            <ProfileDoctor
              detailDoctor={this.props.detailDoctor}
              priceExamination={this.props.priceExamination}
              objDate={this.props.objDate}
              isShowProfile={false}
              getScheduleTimeFrame={this.getScheduleTimeFrame}
            />
            <div className="form-group-modal-booking">
              <Form.Item
                onChange={(e) => {
                  this.setState({ fullName: e.target.value });
                }}
                label={
                  <FormattedMessage id={"patient.booking-modal.FullName"} />
                }
              >
                <Input
                  disabled
                  value={
                    this.props.patientInfo && this.props.patientInfo.lastName
                      ? this.props.patientInfo.lastName
                      : ""
                  }
                />
              </Form.Item>
              <Form.Item
                onChange={(e) => {
                  this.setState({ phoneNumber: e.target.value });
                }}
                label={
                  <FormattedMessage id={"patient.booking-modal.phoneNumber"} />
                }
              >
                <Input
                  value={
                    this.props.patientInfo && this.props.patientInfo.phoneNumber
                      ? this.props.patientInfo.phoneNumber
                      : this.state.phoneNumber
                  }
                />
              </Form.Item>
            </div>
            <div className="form-group-modal-booking">
              <Form.Item
                onChange={(e) => {
                  this.setState({ email: e.target.value });
                }}
                label={<FormattedMessage id={"patient.booking-modal.email"} />}
              >
                <Input
                  disabled
                  value={
                    this.props.patientInfo && this.props.patientInfo.email
                      ? this.props.patientInfo.email
                      : ""
                  }
                />
              </Form.Item>
              <Form.Item
                onChange={(e) => {
                  this.setState({ address: e.target.value });
                }}
                label={
                  <FormattedMessage id={"patient.booking-modal.address"} />
                }
              >
                <Input
                  value={
                    this.props.patientInfo && this.props.patientInfo.address
                      ? this.props.patientInfo.address
                      : this.state.address
                  }
                />
              </Form.Item>
            </div>

            <Form.Item
              onChange={(e) => {
                this.setState({ reason: e.target.value });
              }}
              label={<FormattedMessage id={"patient.booking-modal.reason"} />}
            >
              <Input value={this.state.reason} />
            </Form.Item>
            <div className="form-group-modal-booking">
              <Form.Item
                label={<FormattedMessage id={"patient.booking-modal.gender"} />}
              >
                <Select
                  onChange={(value) => {
                    this.setState({ gender: value });
                  }}
                  options={
                    this.state.arrGender.length > 0
                      ? this.state.arrGender
                      : genderArr
                  }
                  value={
                    this.props.patientInfo && this.props.patientInfo.gender
                      ? this.props.patientInfo.gender
                      : this.state.gender
                  }
                />
              </Form.Item>
            </div>

            <div className="form-group-modal-booking btn-confirm">
              <Button
                className="btn-save-booking"
                onClick={(e) => this.handleAppointmentBook(this.state)}
              >
                <FormattedMessage id={"patient.booking-modal.btnConfirm"} />
              </Button>
              <Button
                className="btn-save-booking"
                onClick={() => {
                  this.setState({
                    fullName: "",
                    phoneNumber: "",
                    email: "",
                    address: "",
                    reason: "",
                    gender: "",
                  });
                  this.props.handleCancel();
                }}
              >
                <FormattedMessage id={"manage-user.cancel"} />
              </Button>
            </div>
          </Form>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genders: state.admin.genders,
    patientInfo: state.user.patientInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchGenderStart: () => dispatch(actions.fetchGenderStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
