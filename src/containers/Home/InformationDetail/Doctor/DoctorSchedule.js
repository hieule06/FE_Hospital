import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorSchedule.scss";
import { Select } from "antd";

class DoctorSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  async componentDidMount() {}

  render() {
    return (
      <div className="doctor-schedule-container">
        <div className="select-date">
          <Select
            defaultValue="jack"
            placeholder="Select date"
            options={[
              {
                value: "jack",
                label: "Back",
              },
              {
                value: "lucy",
                label: "Lucy",
              },
              {
                value: "tom",
                label: "Tom",
              },
            ]}
          />
        </div>
        <div className="medical-schedule"></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
