import React, { Component } from "react";
import { connect } from "react-redux";
import "./ModalFileMedical.scss";
import { message, Form, Input, Modal } from "antd";
import { FormattedMessage } from "react-intl";
import TextArea from "antd/es/input/TextArea";
import { createHistoryPatient } from "../../../services/doctorService";

class ModalFileMedical extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: "",
      patientsId: -1,
      doctorId: -1,
    };
  }

  handleSaveHistory = async (value) => {
    try {
      const data = {
        patientsId: this.props.itemBooking.patientsId,
        doctorId: this.props.itemBooking.doctorId,
        description: value,
      };
      const result = await createHistoryPatient(data);
      if (result.data.errCode === 0) {
        message.success("Lưu thành công !");
        this.setState({
          description: "",
          patientsId: -1,
          doctorId: -1,
        });
        this.props.handleCancelModalFileMedical();
      }
    } catch (error) {
      console.log(error);
      this.setState({
        email: "",
        password: "",
        isShowErr: false,
        arrKeysEmpty: [],
      });
      this.props.handleCancelModalFileMedical();
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
          title={<FormattedMessage id={"doctor.medicalFile"} />}
          footer={false}
          open={this.props.isModalFileMedical}
          onCancel={this.props.handleCancelModalFileMedical}
          width={"60%"}
          style={{ top: 100 }}
          className="modal-medical-file modal-sign-up "
        >
          <Form name="form_item_path" layout="vertical">
            <div className="form-group-modal-booking">
              <Form.Item label={<FormattedMessage id={"admin.note"} />}>
                <TextArea
                  placeholder="Ghi chú bệnh án"
                  autoSize={{ minRows: 8, maxRows: 12 }}
                  onChange={(e) =>
                    this.setState({ description: e.target.value })
                  }
                />
              </Form.Item>
            </div>
            <div className="form-group-modal-booking">
              <button
                className="btn-sign-up"
                onClick={() => {
                  this.handleSaveHistory(this.state.description);
                }}
              >
                <FormattedMessage id={"admin.save"} />
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalFileMedical);
