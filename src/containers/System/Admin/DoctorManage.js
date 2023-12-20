import React, { Component } from "react";
import { connect } from "react-redux";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { FormattedMessage } from "react-intl";
import { Select, message } from "antd";
import { Input } from "antd";
import "./DoctorManage.scss";
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils/constant";
import {
  createInforDoctor,
  getdataDoctor,
  updateInforDoctor,
} from "../../../services/doctorService";

const { TextArea } = Input;

const mdParser = new MarkdownIt(/* Markdown-it options */);

class DoctorManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listDoctors: [],
      contentMarkDown: "",
      contentHTML: "",
      descriptionDoctor: "",
      selectDoctor: "",
      checkIdDoctor: false,
    };
  }

  handleEditorChange = (html, text) => {
    this.setState({
      contentHTML: html.html,
      contentMarkDown: html.text,
    });
  };

  handleCreateInforDoctor = async (data) => {
    try {
      const result = await createInforDoctor(data);
      if (result.data.errCode === 1) {
        return message.error("Các trường còn trống !");
      } else {
        this.setState({
          contentMarkDown: "",
          contentHTML: "",
          descriptionDoctor: "",
          selectDoctor: "",
          checkIdDoctor: false,
        });
        return message.success("Lưu thành công !");
      }
    } catch (error) {
      message.error("Thất bại!");
      console.log(error);
    }
  };

  handleUpdateInforDoctor = async (data) => {
    try {
      const result = await updateInforDoctor(data);
      if (result.data.errCode === 1) {
        return message.error("Các trường còn trống !");
      } else {
        this.setState({
          contentMarkDown: "",
          contentHTML: "",
          descriptionDoctor: "",
          selectDoctor: "",
          checkIdDoctor: false,
        });
        return message.success("Lưu thành công !");
      }
    } catch (error) {
      message.error("Thất bại!");
      console.log(error);
    }
  };

  handleSelectDoctor = async (value) => {
    const inforDoctor = await getdataDoctor(value);
    if (!inforDoctor.data.inforDoctor) {
      return this.setState({ selectDoctor: value });
    } else {
      this.setState({
        contentMarkDown: inforDoctor.data.inforDoctor.contentMarkdown,
        contentHTML: inforDoctor.data.inforDoctor.contentHTML,
        descriptionDoctor: inforDoctor.data.inforDoctor.description,
        selectDoctor: inforDoctor.data.inforDoctor.doctorId,
        checkIdDoctor: true,
      });
    }
  };

  buildDataSelectDoctor = (listDoctors) => {
    let result = [];
    let { language } = this.props;
    if (listDoctors && listDoctors.length > 0) {
      listDoctors.map((item) => {
        const obj = {};
        const nameDoctor =
          language === LANGUAGES.VI
            ? `${item.lastName} ${item.firstName}`
            : `${item.firstName} ${item.lastName}`;
        obj.label = nameDoctor;
        obj.value = item.id;
        result.push(obj);
      });
    }
    return result;
  };

  async componentDidMount() {
    this.props.fetchAllDoctorStart();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      prevProps.allDoctors !== this.props.allDoctors ||
      prevProps.language !== this.props.language
    ) {
      const dataSelect = this.buildDataSelectDoctor(this.props.allDoctors);
      this.setState({
        listDoctors: dataSelect,
      });
    }
  }

  render() {
    return (
      <div className="wrapper-page-doctor-manage">
        <h2 className="title-page">
          <FormattedMessage id={"system.doctor-manage.doctor-manage"} />
        </h2>
        <div className="wrapper-infor-doctor">
          <div className="search-user">
            <p>Chọn bác sĩ</p>
            <Select
              showSearch
              placeholder="Select a person"
              onChange={(value) => this.handleSelectDoctor(value)}
              options={this.state.listDoctors}
            />
          </div>
          <div className="add-infor-doctor">
            <p>Thông tin giới thiệu</p>
            <TextArea
              rows={4}
              onChange={(e) =>
                this.setState({ descriptionDoctor: e.target.value })
              }
              value={this.state.descriptionDoctor}
            />
          </div>
        </div>
        <MdEditor
          renderHTML={(text) => mdParser.render(text)}
          onChange={this.handleEditorChange}
          value={this.state.contentMarkDown}
        />
        <div className="btn-save-doctor">
          <button
            className={
              this.state.checkIdDoctor
                ? "btn-add-user btn btn-primary disable"
                : "btn-add-user btn btn-primary"
            }
            onClick={() => {
              this.handleCreateInforDoctor(this.state);
            }}
          >
            Lưu thông tin
          </button>
          <button
            className={
              this.state.checkIdDoctor
                ? "btn-add-user btn btn-primary"
                : "btn-add-user btn btn-primary disable"
            }
            onClick={() => {
              this.handleUpdateInforDoctor(this.state);
            }}
          >
            Sửa thông tin
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allDoctors: state.doctor.allDoctors,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctorStart: () => dispatch(actions.fetchAllDoctorStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorManage);
