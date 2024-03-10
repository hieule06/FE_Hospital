import React, { Component } from "react";
import { connect } from "react-redux";
import "./ModalHistoryPatient.scss";
import { message, Form, Input, Modal } from "antd";
import { FormattedMessage } from "react-intl";
import TextArea from "antd/es/input/TextArea";
import { createHistoryPatient } from "../../../services/doctorService";
import dayjs from "dayjs";

class ModalHistoryPatient extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {}

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }

  render() {
    return (
      <div className="wrapper-modal-sign-up wrapper-modal-booking">
        {this.props.dataHistoryPatient &&
        this.props.dataHistoryPatient.length > 0 ? (
          <Modal
            title={<FormattedMessage id={"doctor.medicalFile"} />}
            footer={false}
            open={this.props.isModalHistoryPatient}
            onCancel={this.props.handleCancelModalHistoryPatient}
            width={"60%"}
            style={{ top: 100 }}
            className="modal-medical-file modal-sign-up "
          >
            <Form name="form_item_path" layout="vertical">
              <div className="modal-history form-group-modal-booking">
                {this.props.dataHistoryPatient &&
                  this.props.dataHistoryPatient.map((item) => {
                    return (
                      <div className="item-history">
                        <span className="date-history">
                          Ngày {dayjs(item.updatedAt).format("DD-MM-YYYY")}:
                        </span>
                        <span className="description-history">
                          {item.description}
                        </span>
                      </div>
                    );
                  })}
              </div>
            </Form>
          </Modal>
        ) : (
          <Modal
            title={<FormattedMessage id={"doctor.notification"} />}
            footer={false}
            open={this.props.isModalHistoryPatient}
            onCancel={this.props.handleCancelModalHistoryPatient}
            width={"60%"}
            style={{ top: 100 }}
            className="modal-medical-file modal-sign-up "
          ></Modal>
        )}
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalHistoryPatient);
