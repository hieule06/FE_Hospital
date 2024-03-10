import React, { Component } from "react";
import { connect } from "react-redux";
import "./ModalSignUp.scss";
import { message, Form, Input, Modal } from "antd";
import { FormattedMessage } from "react-intl";
import { createUser } from "../../../../services/userService";

class ModalSignUp extends Component {
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

  handleSignUp = async (data) => {
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
        const result = await createUser(this.state);
        if (result.data.errCode === 1) {
          this.setState({
            lastName: "",
            email: "",
            password: "",
            isShowErr: false,
            arrKeysEmpty: [],
          });
          this.props.handleCancelModalSignUp();
          return message.error(
            "Email đã tồn tại. Vui lòng đăng ký email khác !"
          );
        }
        if (result.data.newUser.errCode === 0) {
          this.setState({
            lastName: "",
            email: "",
            password: "",
            isShowErr: false,
            arrKeysEmpty: [],
          });
          this.props.handleCancelModalSignUp();
          return message.success("Đăng ký thành công !");
        } else {
          this.setState({
            lastName: "",
            email: "",
            password: "",
            isShowErr: false,
            arrKeysEmpty: [],
          });
          this.props.handleCancelModalSignUp();
          return message.error("Đăng ký thất bại !");
        }
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
      this.props.handleCancelModalSignUp();
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
          title={<FormattedMessage id={"homeheader.sign-up"} />}
          footer={false}
          open={this.props.isModalSignUp}
          onCancel={this.props.handleCancelModalSignUp}
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
              <Form.Item label={<FormattedMessage id={"manage-user.email"} />}>
                <Input
                  onChange={(e) => this.setState({ email: e.target.value })}
                  value={this.state.email}
                />
                {!this.state.isShowErr &&
                  this.state.arrKeysEmpty.some((e) => e === "email") && (
                    <p className="error-email">* Trường Email rỗng</p>
                  )}
                <p
                  className={
                    this.state.isShowErr ? "error-email" : "disable-error-email"
                  }
                >
                  * Email sai định dạng
                </p>
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
                  this.handleSignUp(this.state);
                }}
              >
                <FormattedMessage id={"homeheader.sign-up"}></FormattedMessage>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalSignUp);
