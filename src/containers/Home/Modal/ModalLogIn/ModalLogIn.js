import React, { Component } from "react";
import { connect } from "react-redux";
import "./ModalLogIn.scss";
import { message, Form, Input, Modal } from "antd";
import { FormattedMessage } from "react-intl";
import {
  checkPatientMainLogin,
  createUser,
  handleLogin,
} from "../../../../services/userService";
import * as actions from "../../../../store/actions";

class ModalLogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isShowErr: false,
      arrKeysEmpty: [],
    };
  }

  handleLogIn = async (data) => {
    try {
      var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      const arrKeys = [];
      for (const key in data) {
        if (data.hasOwnProperty(key) && data[key] === "") {
          arrKeys.push(key);
        }
      }
      if (arrKeys.length > 0) {
        return this.setState({ isShowErr: false, arrKeysEmpty: [...arrKeys] });
      }
      if (!this.state.email.match(mailformat)) {
        return this.setState({ isShowErr: true, arrKeysEmpty: [...arrKeys] });
      } else {
        const result = await handleLogin(this.state.email, this.state.password);
        if (result.data.errCode === 3) {
          this.setState({
            email: "",
            password: "",
            isShowErr: false,
            arrKeysEmpty: [],
          });
          this.props.handleCancelModalLogIn();
          return message.error("Mật khẩu không đúng !");
        }
        if (result.data.errCode === 0) {
          const checkPatient = await checkPatientMainLogin(result.data.user.id);
          if (checkPatient.data.result.errCode === 0) {
            this.props.patientMainLoginSuccess(result.data.user);
          } else {
            this.props.patientLoginSuccess(result.data.user);
          }
          this.setState({
            email: "",
            password: "",
            isShowErr: false,
            arrKeysEmpty: [],
          });
          this.props.handleCancelModalLogIn();
          return message.success("Đăng nhập thành công !");
        } else {
          this.setState({
            email: "",
            password: "",
            isShowErr: false,
            arrKeysEmpty: [],
          });
          this.props.handleCancelModalLogIn();
          return message.error("Đăng nhập thất bại !");
        }
      }
    } catch (error) {
      console.log(error);
      this.setState({
        email: "",
        password: "",
        isShowErr: false,
        arrKeysEmpty: [],
      });
      this.props.handleCancelModalLogIn();
      return message.error("Đăng nhập thất bại !");
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
          title={<FormattedMessage id={"homeheader.log-in"} />}
          footer={false}
          open={this.props.isModalLogIn}
          onCancel={this.props.handleCancelModalLogIn}
          width={"30%"}
          style={{ top: 100 }}
          className="modal-sign-up"
        >
          <Form name="form_item_path" layout="vertical">
            <div className="form-group-modal-booking">
              <Form.Item label={<FormattedMessage id={"manage-user.email"} />}>
                <Input
                  onChange={(e) => this.setState({ email: e.target.value })}
                  value={this.state.email}
                />
                {this.state.isShowErr ? (
                  <p
                    className={
                      this.state.isShowErr
                        ? "error-email"
                        : "disable-error-email"
                    }
                  >
                    * Email sai định dạng
                  </p>
                ) : (
                  this.state.arrKeysEmpty.some((e) => e === "email") && (
                    <p className="error-email">* Trường Email rỗng</p>
                  )
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
                  this.handleLogIn(this.state);
                }}
              >
                <FormattedMessage id={"homeheader.log-in"}></FormattedMessage>
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
    isPatientMainLoggedIn: state.user.isPatientMainLoggedIn,
    isPatienLoggedIn: state.user.isPatienLoggedIn,
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalLogIn);
