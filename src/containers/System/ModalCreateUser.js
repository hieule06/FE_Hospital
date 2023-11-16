import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { getAllUsers, deleteUser } from "../../services/userService";
import "./UserManage.scss";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
class ModalCreateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      address: "",
    };
  }

  handleOnchange = (name, value) => {
    let data = { ...this.state };
    data[name] = value;
    this.setState({ ...data });
  };

  handleOnchangeEdit = (name, value) => {
    let data = { ...this.state };
    data[name] = value;
    this.setState({ ...data });
    if (this.props.dataUserEdit.email) {
      this.props.dataUserEdit[name] = value;
    }
    this.setState({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      address: "",
    });
  };

  handleSave = async () => {
    try {
      await this.props.handleCreateUser(this.state);
      if (this.props.arrKeysEmpty.length <= 0) {
        this.setState({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          address: "",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  handleEdit = async () => {
    try {
      await this.props.handleEditUser(this.props.dataUserEdit);
    } catch (error) {
      console.log(error);
    }
  };

  async componentDidMount() {}

  render() {
    return this.props.isShowModalEdit ? (
      <Modal isOpen={this.props.isOpen} size="lg" centered>
        <ModalHeader
          toggle={() => {
            this.props.toggle();
            this.setState({
              firstName: "",
              lastName: "",
              email: "",
              password: "",
              address: "",
            });
          }}
        >
          Edit new user
        </ModalHeader>
        <ModalBody>
          <div class="container">
            <div class="row">
              <form action="/submit-login" method="POST">
                <div class="form-row">
                  <div className="wrapper-form-group">
                    <div class="form-group">
                      <label for="inputEmail4">First Name</label>
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
                          this.handleOnchangeEdit("firstName", e.target.value)
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
                      <label for="inputEmail4">Last Name</label>
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
                          this.handleOnchangeEdit("lastName", e.target.value)
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
                  <label for="inputAddress">Address</label>
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
              </form>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            className="btn-save px-3"
            onClick={() => this.handleEdit()}
          >
            Edit User
          </Button>{" "}
          <Button
            color="secondary"
            className="px-3"
            onClick={() => {
              this.props.toggle();
              this.setState({
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                address: "",
              });
            }}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    ) : (
      <Modal isOpen={this.props.isOpen} size="lg" centered>
        <ModalHeader toggle={() => this.props.toggle()}>
          Create new user
        </ModalHeader>
        <ModalBody>
          <div class="container">
            <div class="row">
              <form action="/submit-login" method="POST">
                <div class="form-row">
                  <div className="wrapper-form-group">
                    <div class="form-group">
                      <label for="inputEmail4">First Name</label>
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
                      <label for="inputEmail4">Last Name</label>
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
                      <label for="inputEmail4">Email</label>
                      <input
                        name="email"
                        type="email"
                        class="form-control"
                        placeholder="Email"
                        onChange={(e) =>
                          this.handleOnchange("email", e.target.value)
                        }
                      />
                      {this.props.arrKeysEmpty.some((e) => e === "email") && (
                        <div className="login-error">
                          <span className="login-error-message">{`Trường email rỗng`}</span>
                        </div>
                      )}
                    </div>
                    <div class="form-group">
                      <label for="inputPassword4">Password</label>
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
                <div class="form-group col-md-12">
                  <label for="inputAddress">Address</label>
                  <input
                    name="address"
                    type="text"
                    class="form-control"
                    placeholder="1234 Main St"
                    onChange={(e) =>
                      this.handleOnchange("address", e.target.value)
                    }
                  />
                  {this.props.arrKeysEmpty.some((e) => e === "address") && (
                    <div className="login-error">
                      <span className="login-error-message">{`Trường address rỗng`}</span>
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            className="btn-save px-3"
            onClick={() => this.handleSave()}
          >
            Save
          </Button>{" "}
          <Button
            color="secondary"
            className="px-3"
            onClick={() => {
              this.props.toggle();
            }}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalCreateUser);
