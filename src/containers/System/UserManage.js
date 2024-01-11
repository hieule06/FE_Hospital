import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import {
  getAllUsers,
  deleteUser,
  createUser,
  editUser,
} from "../../services/userService";
import "./UserManage.scss";
import ModalCreateUser from "./ModalCreateUser";
import { message } from "antd";
class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataAllUsers: [],
      userEdit: {},
      modal: false,
      arrKeysEmpty: [],
      dataUserEdit: {},
      isShowModalEdit: false,
    };
  }

  getAllUsers = async () => {
    let response = await getAllUsers("All");
    if (response && response.data.errCode === 0) {
      this.setState({ dataAllUsers: response.data.users });
    }
  };

  handleDeleteUser = async (item) => {
    try {
      await deleteUser(item.id);
      let response = await getAllUsers("All");
      if (response && response.data.errCode === 0) {
        this.setState({ dataAllUsers: response.data.users });

        message.success("Lưu thành công!");
      }
    } catch (error) {
      message.error("Thất bại!");
      console.log(error);
    }
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
    this.setState({ arrKeysEmpty: [] });
    this.setState({ isShowModalEdit: false });
    this.getAllUsers();
  };

  handleCreateUser = async (data) => {
    try {
      const arrKeys = [];
      for (const key in data) {
        if (data.hasOwnProperty(key) && key !== "avatar" && data[key] === "") {
          arrKeys.push(key);
        }
      }
      if (arrKeys.length > 0) {
        return this.setState({ arrKeysEmpty: [...arrKeys] });
      } else {
        const result = await createUser(data);
        this.toggle();
        if (result.data.errCode === 1) {
          return message.error(
            "Email đã tồn tại. Vui lòng nhập email khác để tạo mới người dùng !"
          );
        }
        if (result.data.newUser.errCode === 0) {
          message.success("Lưu thành công!");
        }
        return result;
      }
    } catch (error) {
      message.error("Thất bại!");
      console.log(error);
    }
  };

  handleEditUser = async (data) => {
    try {
      const arrKeys = [];
      for (const key in data) {
        if (
          (data.hasOwnProperty(key) &&
            key !== "email" &&
            key !== "password" &&
            key !== "image" &&
            data[key] === "") ||
          data[key] === null
        ) {
          arrKeys.push(key);
        }
      }
      if (arrKeys.length > 0) {
        return this.setState({ arrKeysEmpty: [...arrKeys] });
      } else {
        this.state.dataUserEdit.firstName = data.firstName;
        this.state.dataUserEdit.lastName = data.lastName;
        this.state.dataUserEdit.address = data.address;
        this.state.dataUserEdit.phoneNumber = data.phoneNumber;
        this.state.dataUserEdit.gender = data.gender;
        this.state.dataUserEdit.roleId = data.roleId;
        this.state.dataUserEdit.positionId = data.positionId;
        this.state.dataUserEdit.image = data.image;
        const resultEdit = await editUser(this.state.dataUserEdit);
        this.toggle();
        if (resultEdit.data.userEdit.errCode === 0) {
          message.success("Lưu thành công!");
        }
      }
    } catch (error) {
      message.error("Thất bại!");
      console.log(error);
    }
  };

  async componentDidMount() {
    this.getAllUsers();
  }

  render() {
    return (
      <div className="text-center">
        <h2 className="title-page">
          <FormattedMessage id={"manage-user.manage-user"} />
        </h2>
        <div className="style-modal">
          <button
            className="btn-add-user btn btn-primary"
            onClick={() => {
              this.toggle();
              this.setState({ isShowModalEdit: false });
            }}
          >
            <i class="fas fa-user-plus"></i>
            <FormattedMessage id={"manage-user.add"} />
          </button>
          <ModalCreateUser
            isOpen={this.state.modal}
            toggle={this.toggle}
            handleCreateUser={this.handleCreateUser}
            arrKeysEmpty={this.state.arrKeysEmpty}
            dataUserEdit={this.state.dataUserEdit}
            handleEditUser={this.handleEditUser}
            isShowModalEdit={this.state.isShowModalEdit}
          ></ModalCreateUser>
        </div>
        <table id="customers">
          <tr className="custom-header">
            <th>
              <FormattedMessage id={"manage-user.email"} />
            </th>
            <th>
              <FormattedMessage id={"manage-user.firstName"} />
            </th>
            <th>
              <FormattedMessage id={"manage-user.lastName"} />
            </th>
            <th>
              <FormattedMessage id={"manage-user.address"} />
            </th>
            <th>
              <FormattedMessage id={"manage-user.actions"} />
            </th>
          </tr>
          {this.state.dataAllUsers.map((item) => {
            return (
              <>
                <tr>
                  <th>{item.email}</th>
                  <th>{item.firstName}</th>
                  <th>{item.lastName}</th>
                  <th>{item.address}</th>
                  <th>
                    <button
                      className="btn-icon btn-edit"
                      onClick={() => {
                        this.setState({ modal: !this.state.modal });
                        this.setState({ arrKeysEmpty: [] });
                        this.setState({ isShowModalEdit: true });
                        this.setState({ dataUserEdit: item });
                      }}
                    >
                      <i class="fas fa-pencil-alt"></i>
                    </button>
                    <button
                      className="btn-icon btn-delete"
                      onClick={() => this.handleDeleteUser(item)}
                    >
                      <i class="fas fa-trash-alt"></i>
                    </button>
                  </th>
                </tr>
              </>
            );
          })}
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
