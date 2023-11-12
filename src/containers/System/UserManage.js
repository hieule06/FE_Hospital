import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { getAllUsers, deleteUser } from "../../services/userService";
import "./UserManage.scss";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataAllUsers: [],
      userEdit: {},
      modal: false,
    };
  }

  async componentDidMount() {
    let response = await getAllUsers("All");
    if (response && response.data.errCode === 0) {
      this.setState({ dataAllUsers: response.data.users });
    }
  }

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

  handleEditUser = async (item) => {
    try {
      let user = await getAllUsers(item.id);
      if (user && user.data.errCode === 0) {
        this.setState({ userEdit: user.data.users });
      }
    } catch (error) {
      console.log(error);
    }
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  render() {
    return (
      <div className="text-center">
        <h2 className="title-page">Manage User</h2>
        <div className="style-modal">
          <Button color="danger" onClick={() => this.toggle()}>
            Click Me
          </Button>
          <Modal isOpen={this.state.modal}>
            <ModalHeader toggle={() => this.toggle()}>Modal title</ModalHeader>
            <ModalBody>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={() => this.toggle()}>
                Do Something
              </Button>{" "}
              <Button color="secondary" onClick={() => this.toggle()}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
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
                      onClick={() => this.handleEditUser(item)}
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
