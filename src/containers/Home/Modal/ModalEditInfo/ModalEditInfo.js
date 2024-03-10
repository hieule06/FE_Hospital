import React, { Component } from "react";
import { connect } from "react-redux";
import "./ModalEditInfo.scss";
import { message, Form, Input, Modal } from "antd";
import { FormattedMessage } from "react-intl";
import {
  checkPatientMainLogin,
  createPDF,
  editUser,
} from "../../../../services/userService";
import * as actions from "../../../../store/actions";

class ModalEditInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastName: "",
      email: "",
      password: "",
      isShowErr: false,
      arrKeysEmpty: [],
    };
  }

  handleEdit = async (data) => {
    try {
      // const response = await createPDF(this.state.lastName);
      // const blob = new Blob([response.data], { type: "application/pdf" });
      // const url = window.URL.createObjectURL(blob);
      // // Mở tập tin PDF trong một tab mới
      // window.open(url);
      var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      const arrKeys = [];
      for (const key in data) {
        if (data.hasOwnProperty(key) && key !== "email" && data[key] === "") {
          arrKeys.push(key);
        }
      }
      if (arrKeys.length > 0) {
        return this.setState({ isShowErr: false, arrKeysEmpty: [...arrKeys] });
      }
      const result = await editUser({
        lastName: this.state.lastName,
        password: this.state.password,
        id: this.props.patientInfo.id,
      });
      if (result.data.userEdit.errCode === 1) {
        this.setState({
          lastName: "",
          email: "",
          password: "",
          isShowErr: false,
          arrKeysEmpty: [],
        });
        this.props.handleCancelModalEditInfo();
        return message.error("Chỉnh sửa thất bại !");
      }
      if (result.data.userEdit.errCode === 0) {
        const checkPatient = await checkPatientMainLogin(
          this.props.patientInfo.id
        );
        if (checkPatient.data.result.errCode === 0) {
          this.props.patientMainLoginSuccess({
            ...this.props.patientInfo,
            lastName: this.state.lastName,
          });
        } else {
          this.props.patientLoginSuccess({
            ...this.props.patientInfo,
            lastName: this.state.lastName,
          });
        }
        this.setState({
          lastName: "",
          email: "",
          password: "",
          isShowErr: false,
          arrKeysEmpty: [],
        });
        this.props.handleCancelModalEditInfo();

        return message.success("Chỉnh sửa thành công !");
      } else {
        this.setState({
          lastName: "",
          email: "",
          password: "",
          isShowErr: false,
          arrKeysEmpty: [],
        });
        this.props.handleCancelModalEditInfo();
        return message.error("Chỉnh sửa thất bại !");
      }
    } catch (error) {
      console.log(error);
      this.setState({
        lastName: "",
        email: "",
        password: "",
        isShowErr: false,
        arrKeysEmpty: [],
      });
      this.props.handleCancelModalEditInfo();
      return message.error("Đăng ký thất bại !");
    }
  };

  async componentDidMount() {}

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }

  render() {
    return (
      <div className="wrapper-modal-sign-up wrapper-modal-booking">
        <Modal
          title={<FormattedMessage id={"homeheader.edit"} />}
          footer={false}
          open={this.props.isModalEditInfo}
          onCancel={this.props.handleCancelModalEditInfo}
          width={"30%"}
          style={{ top: 100 }}
          className="modal-sign-up"
        >
          <Form name="form_item_path" layout="vertical">
            <div className="form-group-modal-booking">
              <Form.Item
                label={
                  <FormattedMessage id={"patient.booking-modal.FullName"} />
                }
              >
                <Input
                  onChange={(e) => this.setState({ lastName: e.target.value })}
                  value={this.state.lastName}
                />
                {this.state.arrKeysEmpty.some((e) => e === "lastName") && (
                  <p className="error-email">* Trường FullName rỗng</p>
                )}
              </Form.Item>
            </div>
            <div className="form-group-modal-booking">
              <Form.Item label={<FormattedMessage id={"login.password"} />}>
                <Input
                  onChange={(e) => this.setState({ password: e.target.value })}
                  value={this.state.password}
                />
                {this.state.arrKeysEmpty.some((e) => e === "password") && (
                  <p className="error-email">* Trường Password rỗng</p>
                )}
              </Form.Item>
            </div>
            <div className="form-group-modal-booking">
              <button
                className="btn-sign-up"
                onClick={() => {
                  this.handleEdit(this.state);
                }}
              >
                <FormattedMessage id={"manage-user.edit"}></FormattedMessage>
              </button>
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
    patientInfo: state.user.patientInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    patientMainLoginSuccess: (patientInfo) =>
      dispatch(actions.patientMainLoginSuccess(patientInfo)),
    patientLoginSuccess: (patientInfo) =>
      dispatch(actions.patientLoginSuccess(patientInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditInfo);
