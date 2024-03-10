import React, { Component } from "react";
import { connect } from "react-redux";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { FormattedMessage } from "react-intl";
import { Button, Select, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Input } from "antd";
import "./ManageHandBook.scss";
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils/constant";
import { CommonUtils } from "../../../utils";
import {
  createNewHandbook,
  getAllDataHandbook,
  updateDataHandbook,
  deleteDataHandbook,
} from "../../../services/doctorService";

const { TextArea } = Input;

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageHandbook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameHandbook: "",
      imgHandbook: "",
      descriptionHTML: "",
      descriptionMarkdown: "",
      checkIdHandbook: false,
      listHandbook: [],
      checkSelectHandbook: false,
      checkChangeInput: false,
      idHandbook: -1,
    };
  }

  handleEditorChange = (html, text) => {
    this.setState({
      descriptionHTML: html.html,
      descriptionMarkdown: html.text,
    });
  };

  handleCreateHandbook = async (data) => {
    try {
      const result = await createNewHandbook(data);
      if (result.data.errCode === 1) {
        return message.error("Các trường còn trống !");
      } else {
        this.props.fetchAllHandbookStart();
        this.setState({
          nameHandbook: "",
          imgHandbook: "",
          descriptionHTML: "",
          descriptionMarkdown: "",
          checkIdHandbook: false,
          checkSelectHandbook: false,
          checkChangeInput: false,
        });
        return message.success("Lưu thành công !");
      }
    } catch (error) {
      message.error("Thất bại!");
      console.log(error);
    }
  };

  handleUpdateHandbook = async (data) => {
    try {
      const result = await updateDataHandbook(data);
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

  handleDeleteHandbook = async (idHandbook) => {
    try {
      const result = await deleteDataHandbook(idHandbook);
      if (result.data.errCode === 1 || result.data.errCode === 2) {
        return message.error("Thất bại !");
      } else {
        this.props.fetchAllHandbookStart();
        this.setState({
          nameHandbook: "",
          imgHandbook: "",
          descriptionHTML: "",
          descriptionMarkdown: "",
          checkIdHandbook: false,
          checkSelectHandbook: false,
          checkChangeInput: false,
        });
        return message.success("Xóa thành công !");
      }
    } catch (error) {
      message.error("Thất bại!");
      console.log(error);
    }
  };

  handleOnchangeImage = async (e) => {
    if (e.file.status !== "removed") {
      const base64 = await CommonUtils.getBase64(e.file);
      this.setState({ imgHandbook: base64 });
    } else {
      this.setState({ imgHandbook: "" });
    }
  };

  buildDataSelectHandbook = (listHandbook) => {
    let result = [];
    if (listHandbook && listHandbook.length > 0) {
      listHandbook.map((item, idx) => {
        if (idx === 0 || listHandbook[idx - 1].id !== item.id) {
          const obj = {};
          obj.label = item.nameHandbook;
          obj.value = item.nameHandbook;
          result.push(obj);
        }
      });
    }
    return result;
  };

  handleSelectHandbook = async (value) => {
    const allSpecialties = await getAllDataHandbook();
    if (allSpecialties && allSpecialties.data.errCode === 0) {
      if (allSpecialties.data.AllHandbook) {
        const selectedHandbook = allSpecialties.data.AllHandbook.find(
          (item) => {
            return item.nameHandbook === value;
          }
        );
        if (!selectedHandbook) {
          this.setState({
            nameHandbook: "",
            imgHandbook: "",
            descriptionHTML: "",
            descriptionMarkdown: "",
            checkIdHandbook: false,
            checkSelectHandbook: false,
            checkChangeInput: false,
            idHandbook: -1,
          });
        } else {
          const img =
            selectedHandbook.imageHandbook &&
            selectedHandbook.imageHandbook.data.length >= 0 &&
            selectedHandbook.imageHandbook.type === "Buffer"
              ? new Buffer(selectedHandbook.imageHandbook, "base64").toString(
                  "binary"
                )
              : "";
          this.setState({
            nameHandbook: selectedHandbook.nameHandbook,
            imgHandbook: img,
            descriptionHTML: selectedHandbook.descriptionHTML,
            descriptionMarkdown: selectedHandbook.descriptionMarkdown,
            checkIdHandbook: true,
            checkChangeInput: true,
            idHandbook: selectedHandbook.id,
          });
        }
      }
    }
  };

  async componentDidMount() {
    this.props.fetchAllHandbookStart();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allDataHandbook !== this.props.allDataHandbook) {
      const dataSelect = this.buildDataSelectHandbook(
        this.props.allDataHandbook
      );
      this.setState({
        listHandbook: dataSelect,
      });
    }
  }
  render() {
    return (
      <div className="wrapper-page-doctor-manage">
        <h2 className="title-page">
          <FormattedMessage id={"menu.admin.manage-handbook"} />
        </h2>
        <div className="wrapper-infor-doctor">
          <div className="search-user">
            <p>
              <FormattedMessage id={"admin.add-handbook"} />
            </p>
            <Input
              disabled={this.state.checkChangeInput}
              placeholder="Select handbook"
              onChange={(e) => {
                this.setState({
                  nameHandbook: e.target.value,
                  checkSelectHandbook: true,
                });
              }}
              value={this.state.nameHandbook}
            />
          </div>
        </div>
        <div className="wrapper-infor-doctor">
          <div className="search-user">
            <p>
              <FormattedMessage id={"admin.name-handbook"} />
            </p>
            {/* <Input
              placeholder="Select handbook"
              onChange={(e) => {
                this.setState({
                  checkIdHandbook: false,
                  nameHandbook: e.target.value,
                });
              }}
              value={this.state.nameHandbook}
            /> */}
            <Select
              showSearch
              disabled={this.state.checkSelectHandbook}
              placeholder="Select handbook"
              onChange={(value) => {
                this.handleSelectHandbook(value);
              }}
              options={this.state.listHandbook}
              value={this.state.nameHandbook}
            />
          </div>
          <div className="upload-image search-user">
            <p>
              <FormattedMessage id={"admin.img-handbook"} />
            </p>
            <Upload
              action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
              listType="picture"
              beforeUpload={(file) => {
                return false;
              }}
              maxCount={1}
              fileList={
                this.state.imgHandbook === ""
                  ? []
                  : [
                      {
                        thumbUrl: this.state.imgHandbook,
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
              this.state.checkIdHandbook
                ? "btn-add-user btn btn-primary disable"
                : "btn-add-user btn btn-primary"
            }
            onClick={() => {
              this.handleCreateHandbook(this.state);
            }}
          >
            <FormattedMessage id={"admin.save"} />
          </button>
          <button
            className={
              this.state.checkIdHandbook
                ? "btn-add-user btn btn-primary"
                : "btn-add-user btn btn-primary disable"
            }
            onClick={() => {
              this.handleUpdateHandbook(this.state);
            }}
          >
            <FormattedMessage id={"system.edit-infor"} />
          </button>
          <button
            className={
              this.state.checkIdHandbook
                ? "btn-add-user btn delete-btn"
                : "btn-add-user btn disable"
            }
            onClick={() => {
              this.handleDeleteHandbook(this.state.idHandbook);
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
    allDataHandbook: state.doctor.allDataHandbook,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllHandbookStart: () => dispatch(actions.fetchAllHandbookStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageHandbook);
