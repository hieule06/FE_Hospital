import React, { Component } from "react";
import { connect } from "react-redux";
import "./ModalReExamination.scss";
import { message, Form, Input, Modal, DatePicker } from "antd";
import { FormattedMessage } from "react-intl";
import TextArea from "antd/es/input/TextArea";
import {
  createBookingReExamination,
  createHistoryPatient,
} from "../../../services/doctorService";
import dayjs from "dayjs";

class ModalReExamination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: new Date().getTime(),
    };
  }

  handleReExamination = async (value) => {
    try {
      const data = {
        patientsId: this.props.itemBooking.patientsId,
        currentDate: value,
      };
      const result = await createBookingReExamination(data);
      if (result.data.errCode === 0) {
        message.success("Tạo lịch nhắc tái khám thành công !");
        this.setState({ currentDate: new Date().getTime() });
        this.props.handleCancelModalReExamination();
      }
      if (result.data.errCode === 2) {
        message.error("Trùng lịch nhắc tái khám. Vui lòng chọn ngày khác !");
        this.setState({ currentDate: new Date().getTime() });
        this.props.handleCancelModalReExamination();
      }
    } catch (error) {
      console.log(error);
      this.setState({ currentDate: new Date().getTime() });
      this.props.handleCancelModalReExamination();
      return message.error("Tạo lịch nhắc tái khám thất bại !");
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
          title={<FormattedMessage id={"doctor.reExamination"} />}
          footer={false}
          open={this.props.isModalReExamination}
          onCancel={this.props.handleCancelModalReExamination}
          width={"25%"}
          style={{ top: 100 }}
          className="modal-re-examination modal-medical-file modal-sign-up "
        >
          <Form name="form_item_path" layout="vertical">
            <div className="form-group-modal-booking">
              <Form.Item label="Chọn ngày tái khám">
                <DatePicker
                  defaultValue={dayjs(new Date())}
                  disabledDate={(current) => {
                    return (
                      current &&
                      current < dayjs().subtract(1, "day").endOf("day")
                    );
                  }}
                  format="DD-MM-YYYY"
                  onChange={(event) =>
                    this.setState({ currentDate: new Date(event).getTime() })
                  }
                  value={dayjs(this.state.currentDate)}
                />
              </Form.Item>
            </div>
            <div className="form-group-modal-booking">
              <button
                className="btn-sign-up"
                onClick={() => {
                  this.handleReExamination(this.state.currentDate);
                }}
              >
                <FormattedMessage id={"doctor.reExamination"} />
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalReExamination);
