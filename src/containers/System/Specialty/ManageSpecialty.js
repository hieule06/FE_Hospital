import React, { Component } from "react";
import { connect } from "react-redux";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { FormattedMessage } from "react-intl";
import { Button, Select, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Input } from "antd";
import "./ManageSpecialty.scss";
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils/constant";
import { CommonUtils } from "../../../utils";
import {
  createNewSpecialty,
  getAllDataSpecialty,
  updateDataSpecialty,
  deleteDataSpecialty,
} from "../../../services/doctorService";

const { TextArea } = Input;

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameSpecialty: "",
      imgSpecialty: "",
      descriptionHTML: "",
      descriptionMarkdown: "",
      idSpecialty: -1,
      checkIdSpecialty: false,
      listSpecialty: [],
      checkChangeInput: false,
      checkSelectSpecialty: false,
    };
  }

  handleEditorChange = (html, text) => {
    this.setState({
      descriptionHTML: html.html,
      descriptionMarkdown: html.text,
    });
  };

  handleCreateSpecialty = async (data) => {
    try {
      const result = await createNewSpecialty(data);
      if (result.data.errCode === 1) {
        return message.error("Các trường còn trống !");
      } else {
        this.props.fetchAllSpecialtyStart();
        this.setState({
          nameSpecialty: "",
          imgSpecialty: "",
          descriptionHTML: "",
          descriptionMarkdown: "",
          checkIdSpecialty: false,
          checkChangeInput: false,
          checkSelectSpecialty: false,
        });
        return message.success("Lưu thành công !");
      }
    } catch (error) {
      message.error("Thất bại!");
      console.log(error);
    }
  };

  handleUpdateSpecialty = async (data) => {
    try {
      const result = await updateDataSpecialty(data);
      if (result.data.errCode === 1) {
        return message.error("Các trường còn trống !");
      } else {
        return message.success("Lưu thành công !");
      }
    } catch (error) {
      message.error("Thất bại!");
      console.log(error);
    }
  };

  handleOnchangeImage = async (e) => {
    if (e.file.status !== "removed") {
      const base64 = await CommonUtils.getBase64(e.file);
      this.setState({ imgSpecialty: base64 });
    } else {
      this.setState({ imgSpecialty: "" });
    }
  };

  buildDataSelectSpecialty = (listSpecialty) => {
    let result = [];
    if (listSpecialty && listSpecialty.length > 0) {
      listSpecialty.map((item, idx) => {
        if (idx === 0 || listSpecialty[idx - 1].id !== item.id) {
          const obj = {};
          obj.label = item.name;
          obj.value = item.name;
          result.push(obj);
        }
      });
    }
    return result;
  };

  handleSelectSpecialty = async (value) => {
    const allSpecialties = await getAllDataSpecialty();
    if (allSpecialties && allSpecialties.data.errCode === 0) {
      if (allSpecialties.data.AllSpecialty) {
        const selectedSpecialty = allSpecialties.data.AllSpecialty.find(
          (item) => {
            return item.name === value;
          }
        );
        if (!selectedSpecialty) {
          this.setState({
            nameSpecialty: "",
            imgSpecialty: "",
            descriptionHTML: "",
            descriptionMarkdown: "",
            checkIdSpecialty: false,
            checkChangeInput: false,
            checkSelectSpecialty: false,
          });
        } else {
          const img =
            selectedSpecialty.image &&
            selectedSpecialty.image.data.length >= 0 &&
            selectedSpecialty.image.type === "Buffer"
              ? new Buffer(selectedSpecialty.image, "base64").toString("binary")
              : "";
          this.setState({
            nameSpecialty: selectedSpecialty.name,
            imgSpecialty: img,
            descriptionHTML: selectedSpecialty.descriptionHTML,
            descriptionMarkdown: selectedSpecialty.descriptionMarkdown,
            checkIdSpecialty: true,
            checkChangeInput: true,
            idSpecialty: selectedSpecialty.id,
          });
        }
      }
    }
  };

  handleDeleteSpecialty = async (idSpecialty) => {
    try {
      const result = await deleteDataSpecialty(idSpecialty);
      if (result.data.errCode === 1 || result.data.errCode === 2) {
        return message.error("Thất bại !");
      } else {
        this.props.fetchAllSpecialtyStart();
        this.setState({
          nameSpecialty: "",
          imgSpecialty: "",
          descriptionHTML: "",
          descriptionMarkdown: "",
          checkIdSpecialty: false,
          checkChangeInput: false,
          checkSelectSpecialty: false,
          idSpecialty: -1,
        });
        return message.success("Xóa thành công !");
      }
    } catch (error) {
      message.error("Thất bại!");
      console.log(error);
    }
  };

  async componentDidMount() {
    this.props.fetchAllSpecialtyStart();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allDataSpecialty !== this.props.allDataSpecialty) {
      const dataSelect = this.buildDataSelectSpecialty(
        this.props.allDataSpecialty
      );
      this.setState({
        listSpecialty: dataSelect,
      });
    }
  }
  render() {
    return (
      <div className="wrapper-page-doctor-manage">
        <h2 className="title-page">
          <FormattedMessage id={"menu.admin.manage-specialty"} />
        </h2>
        <div className="wrapper-infor-doctor">
          <div className="search-user">
            <p>
              <FormattedMessage id={"admin.add-specialty"} />
            </p>
            <Input
              disabled={this.state.checkChangeInput}
              placeholder="Input name specialty"
              onChange={(e) => {
                this.setState({
                  nameSpecialty: e.target.value,
                  checkSelectSpecialty: true,
                });
              }}
              value={this.state.nameSpecialty}
            />
          </div>
        </div>
        <div className="wrapper-infor-doctor">
          <div className="search-user">
            <p>
              <FormattedMessage id={"admin.specialty"} />
            </p>
            {/* <Input
              placeholder="Select specialty"
              onChange={(e) => {
                this.setState({ nameSpecialty: e.target.value });
              }}
              value={this.state.nameSpecialty}
            /> */}
            <Select
              showSearch
              disabled={this.state.checkSelectSpecialty}
              placeholder="Select specialty"
              onChange={(value) => {
                this.handleSelectSpecialty(value);
              }}
              options={this.state.listSpecialty}
              value={this.state.nameSpecialty}
            />
          </div>
          <div className="upload-image search-user">
            <p>
              <FormattedMessage id={"admin.img-specialty"} />
            </p>
            <Upload
              action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
              listType="picture"
              beforeUpload={(file) => {
                return false;
              }}
              maxCount={1}
              fileList={
                this.state.imgSpecialty === ""
                  ? []
                  : [
                      {
                        thumbUrl: this.state.imgSpecialty,
                      },
                    ]
              }
              onChange={(e) => this.handleOnchangeImage(e)}
            >
              <Button icon={<UploadOutlined />}>Upload Avatar</Button>
            </Upload>
          </div>
        </div>
        <div className="wrapper-add-infor-doctor">
          <div className="add-infor-doctor">
            <p>
              <FormattedMessage id={"admin.intro-detail"} />
            </p>
            <MdEditor
              renderHTML={(text) => mdParser.render(text)}
              onChange={this.handleEditorChange}
              value={this.state.descriptionMarkdown}
            />
          </div>
        </div>
        <div className="btn-save-doctor">
          <button
            className={
              this.state.checkIdSpecialty
                ? "btn-add-user btn btn-primary disable"
                : "btn-add-user btn btn-primary"
            }
            onClick={() => {
              this.handleCreateSpecialty(this.state);
            }}
          >
            <FormattedMessage id={"admin.save"} />
          </button>
          <button
            className={
              this.state.checkIdSpecialty
                ? "btn-add-user btn btn-primary"
                : "btn-add-user btn btn-primary disable"
            }
            onClick={() => {
              this.handleUpdateSpecialty(this.state);
            }}
          >
            <FormattedMessage id={"system.edit-infor"} />
          </button>
          <button
            className={
              this.state.checkIdSpecialty && !this.state.checkSelectSpecialty
                ? "btn-add-user btn delete-btn"
                : "btn-add-user btn disable"
            }
            onClick={() => {
              this.handleDeleteSpecialty(this.state.idSpecialty);
            }}
          >
            <i class="fas fa-trash-alt"></i>
            <FormattedMessage id={"system.delete-specialty"} />
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allDataSpecialty: state.doctor.allDataSpecialty,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllSpecialtyStart: () => dispatch(actions.fetchAllSpecialtyStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
