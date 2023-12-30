import React, { Component } from "react";
import { connect } from "react-redux";
import "./BookingModal.scss";
import { Button, Form, Input, Modal, Select } from "antd";
import ProfileDoctor from "../ProfileDoctor";
import * as actions from "../../../../../store/actions";
import { LANGUAGES } from "../../../../../utils";
import { FormattedMessage } from "react-intl";

class BookingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrGender: [],
    };
  }

  async componentDidMount() {
    this.props.fetchGenderStart();

    if (this.props.genders.length > 0) {
      const genderArr = [];
      this.props.genders.map((item) => {
        const obj = {};
        obj.label =
          this.props.language === LANGUAGES.VI ? item.valueVi : item.valueEn;
        obj.value = item.keyMap;

        genderArr.push(obj);
      });
      this.setState({ arrGender: genderArr });
    }
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
    // const arrGender = this.props.genders;
    // if (prevProps.genders !== arrGender) {
    //   this.setState({
    //     genderArr: arrGender,
    //     gender: arrGender && arrGender.length > 0 ? arrGender[0].keyMap : "",
    //   });
    // }
  }

  render() {
    return (
      <div className="wrapper-modal-booking">
        <Modal
          title={<FormattedMessage id={"patient.booking-modal.title"} />}
          footer={false}
          open={this.props.isModalOpen}
          onOk={this.props.handleOk}
          onCancel={this.props.handleCancel}
          width={"70%"}
        >
          <Form name="form_item_path" layout="vertical">
            <ProfileDoctor
              detailDoctor={this.props.detailDoctor}
              priceExamination={this.props.priceExamination}
              objDate={this.props.objDate}
              isShowProfile={false}
            />
            <div className="form-group-modal-booking">
              <Form.Item
                name="firstName"
                label={
                  <FormattedMessage id={"patient.booking-modal.FullName"} />
                }
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="lastName"
                label={
                  <FormattedMessage id={"patient.booking-modal.phoneNumber"} />
                }
              >
                <Input />
              </Form.Item>
            </div>
            <div className="form-group-modal-booking">
              <Form.Item
                name="firstName"
                label={<FormattedMessage id={"patient.booking-modal.email"} />}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="lastName"
                label={
                  <FormattedMessage id={"patient.booking-modal.address"} />
                }
              >
                <Input />
              </Form.Item>
            </div>

            <Form.Item
              name="reason"
              label={<FormattedMessage id={"patient.booking-modal.reason"} />}
            >
              <Input />
            </Form.Item>
            <div className="form-group-modal-booking">
              <Form.Item
                name="firstName"
                label={<FormattedMessage id={"patient.booking-modal.gender"} />}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="firstName"
                label={<FormattedMessage id={"patient.booking-modal.gender"} />}
              >
                <Select options={this.state.arrGender} />
              </Form.Item>
            </div>
            <Button type="primary" htmlType="submit">
              <FormattedMessage id={"patient.booking-modal.btnConfirm"} />
            </Button>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchGenderStart: () => dispatch(actions.fetchGenderStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
