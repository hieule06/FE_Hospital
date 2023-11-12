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
      phoneNumber: "",
      gender: "",
      roleId: "",
    };
  }

  async componentDidMount() {}

  render() {
    return (
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
                    <div class="form-group col-md-6">
                      <label for="inputEmail4">First Name</label>
                      <input
                        name="firstName"
                        type="text"
                        class="form-control"
                        placeholder="firstName"
                        onChange={(e) => {
                          this.setState({ firstName: e.target.value });
                        }}
                      />
                    </div>
                    <div class="form-group col-md-6">
                      <label for="inputEmail4">Last Name</label>
                      <input
                        name="lastName"
                        type="text"
                        class="form-control"
                        placeholder="lastName"
                        onChange={(e) => {
                          this.setState({ lastName: e.target.value });
                        }}
                      />
                    </div>
                  </div>
                  <div className="wrapper-form-group">
                    <div class="form-group col-md-6">
                      <label for="inputEmail4">Email</label>
                      <input
                        name="email"
                        type="email"
                        class="form-control"
                        placeholder="Email"
                        onChange={(e) => {
                          this.setState({ email: e.target.value });
                        }}
                      />
                    </div>
                    <div class="form-group col-md-6">
                      <label for="inputPassword4">Password</label>
                      <input
                        name="password"
                        type="password"
                        class="form-control"
                        placeholder="Password"
                        onChange={(e) => {
                          this.setState({ password: e.target.value });
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="wrapper-form-group">
                  <div class="form-group col-md-6">
                    <label for="inputAddress">Address</label>
                    <input
                      name="address"
                      type="text"
                      class="form-control"
                      placeholder="1234 Main St"
                      onChange={(e) => {
                        this.setState({ address: e.target.value });
                      }}
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="inputPhoneNumber">Phone number</label>
                    <input
                      name="phoneNumber"
                      type="text"
                      class="form-control"
                      placeholder="Phone number"
                      onChange={(e) => {
                        this.setState({ phoneNumber: e.target.value });
                      }}
                    />
                  </div>
                </div>
                <div className="wrapper-form-group">
                  <div class="form-group col-md-6">
                    <label for="inputState">Gender</label>
                    <select name="gender" class="form-control">
                      <option value="0">Female</option>
                      <option value="1">Male</option>
                    </select>
                  </div>
                  <div class="form-group col-md-6">
                    <label for="inputRole">Role</label>
                    <select name="roleId" class="form-control">
                      <option value="1">Admin</option>
                      <option value="2">Doctor</option>
                      <option value="3">Patient</option>
                    </select>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            className="btn-save px-3"
            onClick={() => console.log(this.state)}
          >
            Save
          </Button>{" "}
          <Button
            color="secondary"
            className="px-3"
            onClick={() => this.props.toggle()}
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
