import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserManage.scss";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Upload, Button, Spin, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import * as actions from "../../store/actions";
import CommonUtils from "../../utils/CommonUtils";
class ModalCreateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      address: "",
      phoneNumber: "",
      gender: "",
      roleId: "",
      positionId: "",
      avatar: "",
      genderArr: [],
      positionArr: [],
      roleArr: [],
    };
  }

  handleOnchange = (name, value) => {
    let data = { ...this.state };
    data[name] = value;
    this.setState({ ...data });
  };

  handleOnchangeImage = async (e) => {
    if (e.file.status !== "removed") {
      const base64 = await CommonUtils.getBase64(e.file);
      this.setState({ avatar: base64 });
      this.props.dataUserEdit["image"] = this.state.avatar;
    } else {
      this.setState({ avatar: "" });
      this.props.dataUserEdit["image"] = this.state.avatar;
    }
  };

  handleOnchangeEdit = (name, value) => {
    let data = { ...this.state };
    data[name] = value;
    this.setState({ ...data });
    if (this.props.dataUserEdit.email) {
      this.props.dataUserEdit[name] = value;
    }
  };

  handleSave = async () => {
    try {
      const result = await this.props.handleCreateUser(this.state);
      if (result.data.newUser.errCode === 0) {
        this.setState({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          address: "",
          phoneNumber: "",
          gender: "M",
          roleId: "R0",
          positionId: "P0",
          avatar: "",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  handleEdit = async () => {
    try {
      if (
        this.props.dataUserEdit["image"].data &&
        this.props.dataUserEdit["image"].data.length <= 0
      ) {
        this.props.dataUserEdit["image"] = "";
      }
      if (this.props.dataUserEdit["image"].type === "Buffer") {
        this.props.dataUserEdit["image"] = new Buffer(
          this.props.dataUserEdit.image,
          "base64"
        ).toString("binary");
      }
      const resultEdit = await this.props.handleEditUser(
        this.props.dataUserEdit
      );
    } catch (error) {
      console.log(error);
    }
  };

  async componentDidMount() {
    this.props.fetchGenderStart();
    this.props.fetchRoleStart();
    this.props.fetchPositionStart();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const arrGender = this.props.genders;
    const arrRole = this.props.roles;
    const arrPosition = this.props.positions;
    if (prevProps.genders !== arrGender) {
      this.setState({
        genderArr: arrGender,
        gender: arrGender && arrGender.length > 0 ? arrGender[0].keyMap : "",
      });
    }
    if (prevProps.roles !== arrRole) {
      this.setState({
        roleArr: arrRole,
        roleId: arrRole && arrRole.length > 0 ? arrRole[0].keyMap : "",
      });
    }
    if (prevProps.positions !== arrPosition) {
      this.setState({
        positionArr: arrPosition,
        positionId:
          arrPosition && arrPosition.length > 0 ? arrPosition[0].keyMap : "",
      });
    }
  }

  handleImg = () => {
    if (
      this.props.dataUserEdit.image === "" ||
      (this.props.dataUserEdit.image.data &&
        this.props.dataUserEdit.image.data.length <= 0)
    ) {
      return "";
    } else {
      return new Buffer(this.props.dataUserEdit.image, "base64").toString(
        "binary"
      );
    }
  };

  render() {
    return this.props.isShowModalEdit ? (
      <Modal isOpen={this.props.isOpen} size="lg" centered>
        {this.props.isLoadingData ? (
          <Spin size="large" className="wrapper-loading" />
        ) : (
          <>
            <ModalHeader
              toggle={() => {
                this.props.toggle();
                this.setState({
                  firstName: "",
                  lastName: "",
                  email: "",
                  password: "",
                  address: "",
                  phoneNumber: "",
                  avatar: "",
                  gender: "M",
                  roleId: "R0",
                  positionId: "P0",
                });
              }}
            >
              <FormattedMessage id={"manage-user.edit-user"} />
            </ModalHeader>
            <ModalBody>
              <div class="container">
                <div class="row">
                  <form action="/submit-login" method="POST">
                    <div class="form-row">
                      <div className="wrapper-form-group">
                        <div class="form-group">
                          <label for="inputEmail4">
                            <FormattedMessage id={"manage-user.firstName"} />
                          </label>
                          <input
                            name="firstName"
                            type="text"
                            class="form-control"
                            placeholder="firstName"
                            value={
                              this.state.firstName
                                ? this.state.firstName
                                : this.props.dataUserEdit.firstName
                            }
                            onChange={(e) =>
                              this.handleOnchangeEdit(
                                "firstName",
                                e.target.value
                              )
                            }
                          />
                          {this.props.arrKeysEmpty.some(
                            (e) => e === "firstName"
                          ) && (
                            <div className="login-error">
                              <span className="login-error-message">{`Trường firstName rỗng`}</span>
                            </div>
                          )}
                        </div>
                        <div class="form-group">
                          <label for="inputEmail4">
                            <FormattedMessage id={"manage-user.lastName"} />
                          </label>
                          <input
                            name="lastName"
                            type="text"
                            class="form-control"
                            placeholder="lastName"
                            value={
                              this.state.lastName
                                ? this.state.lastName
                                : this.props.dataUserEdit.lastName
                            }
                            onChange={(e) =>
                              this.handleOnchangeEdit(
                                "lastName",
                                e.target.value
                              )
                            }
                          />
                          {this.props.arrKeysEmpty.some(
                            (e) => e === "lastName"
                          ) && (
                            <div className="login-error">
                              <span className="login-error-message">{`Trường lastName rỗng`}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div class="form-group col-md-12">
                      <label for="inputAddress">
                        <FormattedMessage id={"manage-user.address"} />
                      </label>
                      <input
                        name="address"
                        type="text"
                        class="form-control"
                        placeholder="1234 Main St"
                        value={
                          this.state.address
                            ? this.state.address
                            : this.props.dataUserEdit.address
                        }
                        onChange={(e) =>
                          this.handleOnchangeEdit("address", e.target.value)
                        }
                      />
                      {this.props.arrKeysEmpty.some((e) => e === "address") && (
                        <div className="login-error">
                          <span className="login-error-message">{`Trường address rỗng`}</span>
                        </div>
                      )}
                    </div>
                    <div className="wrapper-form-group">
                      <div class="form-group">
                        <label for="inputPhoneNumber">
                          <FormattedMessage id={"manage-user.phoneNumber"} />
                        </label>
                        <input
                          name="phoneNumber"
                          type="text"
                          class="form-control"
                          placeholder="Phone number"
                          value={
                            this.state.phoneNumber
                              ? this.state.phoneNumber
                              : this.props.dataUserEdit.phoneNumber
                          }
                          onChange={(e) =>
                            this.handleOnchangeEdit(
                              "phoneNumber",
                              e.target.value
                            )
                          }
                        />
                        {this.props.arrKeysEmpty.some(
                          (e) => e === "phoneNumber"
                        ) && (
                          <div className="login-error">
                            <span className="login-error-message">{`Trường phoneNumber rỗng`}</span>
                          </div>
                        )}
                      </div>
                      <div class="form-group">
                        <label for="inputState">
                          <FormattedMessage id={"manage-user.gender"} />
                        </label>
                        <select
                          name="gender"
                          class="form-control"
                          value={this.props.dataUserEdit.gender}
                          onChange={(e) =>
                            this.handleOnchangeEdit("gender", e.target.value)
                          }
                        >
                          {this.state.genderArr.length > 0 &&
                            this.state.genderArr.map((item, index) => (
                              <option key={index} value={item.keyMap}>
                                {this.props.language === "en"
                                  ? item.valueEn
                                  : item.valueVi}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>
                    <div className="wrapper-form-group">
                      <div class="form-group">
                        <label for="inputRole">
                          <FormattedMessage id={"manage-user.roleId"} />
                        </label>
                        <select
                          name="roleId"
                          class="form-control"
                          value={this.props.dataUserEdit.roleId}
                          onChange={(e) =>
                            this.handleOnchangeEdit("roleId", e.target.value)
                          }
                        >
                          {this.state.roleArr.length > 0 &&
                            this.state.roleArr.map((item, index) => (
                              <option key={index} value={item.keyMap}>
                                {this.props.language === "en"
                                  ? item.valueEn
                                  : item.valueVi}
                              </option>
                            ))}
                        </select>
                      </div>
                      <div class="form-group">
                        <label for="inputState">
                          <FormattedMessage id={"manage-user.positionId"} />
                        </label>
                        <select
                          name="positionId"
                          class="form-control"
                          value={this.props.dataUserEdit.positionId}
                          onChange={(e) =>
                            this.handleOnchangeEdit(
                              "positionId",
                              e.target.value
                            )
                          }
                        >
                          {this.state.positionArr.length > 0 &&
                            this.state.positionArr.map((item, index) => (
                              <option key={index} value={item.keyMap}>
                                {this.props.language === "en"
                                  ? item.valueEn
                                  : item.valueVi}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>
                    <div className="wrapper-form-group">
                      <Upload
                        action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                        listType="picture"
                        beforeUpload={(file) => {
                          return false;
                        }}
                        maxCount={1}
                        defaultFileList={[
                          {
                            thumbUrl: this.handleImg(),
                          },
                        ]}
                        onChange={(e) => this.handleOnchangeImage(e)}
                      >
                        <Button icon={<UploadOutlined />}>Upload Avatar</Button>
                      </Upload>
                    </div>
                  </form>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                className="btn-save px-3"
                onClick={() => this.handleEdit()}
              >
                <FormattedMessage id={"manage-user.edit"} />
              </Button>{" "}
              <Button
                className="btn-save px-3"
                onClick={() => {
                  this.props.toggle();
                  this.setState({
                    firstName: "",
                    lastName: "",
                    email: "",
                    password: "",
                    address: "",
                    phoneNumber: "",
                    avatar: "",
                    gender: "M",
                    roleId: "R0",
                    positionId: "P0",
                  });
                }}
              >
                <FormattedMessage id={"manage-user.cancel"} />
              </Button>
            </ModalFooter>
          </>
        )}
      </Modal>
    ) : (
      <Modal isOpen={this.props.isOpen} size="lg" centered>
        {this.props.isLoadingData ? (
          <Spin size="large" className="wrapper-loading" />
        ) : (
          <>
            <ModalHeader
              toggle={() => {
                this.props.toggle();
                this.setState({
                  firstName: "",
                  lastName: "",
                  email: "",
                  password: "",
                  address: "",
                  phoneNumber: "",
                  avatar: "",
                  gender: "M",
                  roleId: "R0",
                  positionId: "P0",
                });
              }}
            >
              <FormattedMessage id={"manage-user.create-user"} />
            </ModalHeader>
            <ModalBody>
              <div class="container">
                <div class="row">
                  <form action="/submit-login" method="POST">
                    <div class="form-row">
                      <div className="wrapper-form-group">
                        <div class="form-group">
                          <label for="inputEmail4">
                            <FormattedMessage id={"manage-user.firstName"} />
                          </label>
                          <input
                            name="firstName"
                            type="text"
                            class="form-control"
                            placeholder="firstName"
                            onChange={(e) =>
                              this.handleOnchange("firstName", e.target.value)
                            }
                          />
                          {this.props.arrKeysEmpty.some(
                            (e) => e === "firstName"
                          ) && (
                            <div className="login-error">
                              <span className="login-error-message">{`Trường firstName rỗng`}</span>
                            </div>
                          )}
                        </div>
                        <div class="form-group">
                          <label for="inputEmail4">
                            <FormattedMessage id={"manage-user.lastName"} />
                          </label>
                          <input
                            name="lastName"
                            type="text"
                            class="form-control"
                            placeholder="lastName"
                            onChange={(e) =>
                              this.handleOnchange("lastName", e.target.value)
                            }
                          />
                          {this.props.arrKeysEmpty.some(
                            (e) => e === "lastName"
                          ) && (
                            <div className="login-error">
                              <span className="login-error-message">{`Trường lastName rỗng`}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="wrapper-form-group">
                        <div class="form-group">
                          <label for="inputEmail4">
                            <FormattedMessage id={"manage-user.email"} />
                          </label>
                          <input
                            name="email"
                            type="email"
                            class="form-control"
                            placeholder="Email"
                            onChange={(e) =>
                              this.handleOnchange("email", e.target.value)
                            }
                          />
                          {this.props.arrKeysEmpty.some(
                            (e) => e === "email"
                          ) && (
                            <div className="login-error">
                              <span className="login-error-message">{`Trường email rỗng`}</span>
                            </div>
                          )}
                        </div>
                        <div class="form-group">
                          <label for="inputPassword4">
                            <FormattedMessage id={"manage-user.password"} />
                          </label>
                          <input
                            name="password"
                            type="password"
                            class="form-control"
                            placeholder="Password"
                            onChange={(e) =>
                              this.handleOnchange("password", e.target.value)
                            }
                          />
                          {this.props.arrKeysEmpty.some(
                            (e) => e === "password"
                          ) && (
                            <div className="login-error">
                              <span className="login-error-message">{`Trường password rỗng`}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="wrapper-form-group">
                      <div class="form-group">
                        <label for="inputAddress">
                          <FormattedMessage id={"manage-user.address"} />
                        </label>
                        <input
                          name="address"
                          type="text"
                          class="form-control"
                          placeholder="1234 Main St"
                          onChange={(e) => {
                            this.setState({ address: e.target.value });
                          }}
                        />
                        {this.props.arrKeysEmpty.some(
                          (e) => e === "address"
                        ) && (
                          <div className="login-error">
                            <span className="login-error-message">{`Trường address rỗng`}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="wrapper-form-group">
                      <div class="form-group">
                        <label for="inputPhoneNumber">
                          <FormattedMessage id={"manage-user.phoneNumber"} />
                        </label>
                        <input
                          name="phoneNumber"
                          type="text"
                          class="form-control"
                          placeholder="Phone number"
                          onChange={(e) => {
                            this.setState({ phoneNumber: e.target.value });
                          }}
                        />
                        {this.props.arrKeysEmpty.some(
                          (e) => e === "phoneNumber"
                        ) && (
                          <div className="login-error">
                            <span className="login-error-message">{`Trường phoneNumber rỗng`}</span>
                          </div>
                        )}
                      </div>
                      <div class="form-group">
                        <label for="inputState">
                          <FormattedMessage id={"manage-user.gender"} />
                        </label>
                        <select
                          name=""
                          class="form-control"
                          onChange={(e) =>
                            this.setState({ gender: e.target.value })
                          }
                        >
                          {this.state.genderArr.length > 0 &&
                            this.state.genderArr.map((item, index) => (
                              <option key={index} value={item.keyMap}>
                                {this.props.language === "en"
                                  ? item.valueEn
                                  : item.valueVi}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>
                    <div className="wrapper-form-group">
                      <div class="form-group">
                        <label for="inputRole">
                          <FormattedMessage id={"manage-user.roleId"} />
                        </label>
                        <select
                          name="roleId"
                          class="form-control"
                          onChange={(e) =>
                            this.setState({ roleId: e.target.value })
                          }
                        >
                          {this.state.roleArr.length > 0 &&
                            this.state.roleArr.map((item, index) => (
                              <option key={index} value={item.keyMap}>
                                {this.props.language === "en"
                                  ? item.valueEn
                                  : item.valueVi}
                              </option>
                            ))}
                        </select>
                      </div>
                      <div class="form-group">
                        <label for="inputState">
                          <FormattedMessage id={"manage-user.positionId"} />
                        </label>
                        <select
                          name="positionId"
                          class="form-control"
                          onChange={(e) =>
                            this.setState({ positionId: e.target.value })
                          }
                        >
                          {this.state.positionArr.length > 0 &&
                            this.state.positionArr.map((item, index) => (
                              <option key={index} value={item.keyMap}>
                                {this.props.language === "en"
                                  ? item.valueEn
                                  : item.valueVi}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>
                    <div className="wrapper-form-group">
                      <Upload
                        action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                        listType="picture"
                        onChange={(e) => this.handleOnchangeImage(e)}
                        beforeUpload={(file) => {
                          return false;
                        }}
                      >
                        <Button icon={<UploadOutlined />}>Upload Avatar</Button>
                      </Upload>
                    </div>
                  </form>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                className="btn-save px-3"
                onClick={() => this.handleSave()}
              >
                <FormattedMessage id={"manage-user.save"} />
              </Button>
              <Button
                className="btn-save px-3"
                onClick={() => {
                  this.props.toggle();
                  this.setState({
                    firstName: "",
                    lastName: "",
                    email: "",
                    password: "",
                    address: "",
                    phoneNumber: "",
                    avatar: "",
                    gender: "M",
                    roleId: "R0",
                    positionId: "P0",
                  });
                }}
              >
                <FormattedMessage id={"manage-user.cancel"} />
              </Button>
            </ModalFooter>
          </>
        )}
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoadingData: state.admin.isLoadingData,
    genders: state.admin.genders,
    roles: state.admin.roles,
    positions: state.admin.positions,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchGenderStart: () => dispatch(actions.fetchGenderStart()),
    fetchRoleStart: () => dispatch(actions.fetchRoleStart()),
    fetchPositionStart: () => dispatch(actions.fetchPositionStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalCreateUser);
