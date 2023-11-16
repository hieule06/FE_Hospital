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
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import ModalCreateUser from "./ModalCreateUser";
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
      }
    } catch (error) {
      console.log(error);
    }
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
    this.setState({ arrKeysEmpty: [] });
    this.setState({ isShowModalEdit: false });
  };

  handleCreateUser = async (data) => {
    try {
      const arrKeys = [];
      for (const key in data) {
        if (data.hasOwnProperty(key) && data[key] === "") {
          arrKeys.push(key);
        }
      }
      if (arrKeys.length > 0) {
        return this.setState({ arrKeysEmpty: [...arrKeys] });
      } else {
        await createUser(data);
        this.toggle();
        this.getAllUsers();
      }
    } catch (error) {
      console.log(error);
    }
  };

  handleEditUser = async (data) => {
    try {
      const arrKeys = [];
      for (const key in data) {
        if (
          data.hasOwnProperty(key) &&
          key !== "email" &&
          key !== "password" &&
          data[key] === ""
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
        await editUser(this.state.dataUserEdit);
        this.toggle();
        this.getAllUsers();
      }
    } catch (error) {
      console.log(error);
    }
  };

  async componentDidMount() {
    this.getAllUsers();
  }

  render() {
    return (
      <div className="text-center">
        <h2 className="title-page">Manage User</h2>
        <div className="style-modal">
          <button
            className="btn-add-user btn btn-primary"
            onClick={() => {
              this.toggle();
              this.setState({ isShowModalEdit: false });
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1.6em"
              id="add"
              x="0"
              y="0"
              version="1.1"
              viewBox="0 0 29 29"
            >
              <path d="M14.5 27.071c-6.893 0-12.5-5.607-12.5-12.5s5.607-12.5 12.5-12.5S27 7.678 27 14.571s-5.607 12.5-12.5 12.5zm0-23c-5.79 0-10.5 4.71-10.5 10.5s4.71 10.5 10.5 10.5S25 20.36 25 14.571s-4.71-10.5-10.5-10.5z"></path>
              <path d="M14.5 21.571a1 1 0 0 1-1-1v-12a1 1 0 0 1 2 0v12a1 1 0 0 1-1 1z"></path>
              <path d="M20.5 15.571h-12a1 1 0 0 1 0-2h12a1 1 0 0 1 0 2z"></path>
            </svg>
            Add new user
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
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Address</th>
            <th>Actions</th>
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
