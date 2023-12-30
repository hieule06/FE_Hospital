import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorExtrainfor.scss";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../../../utils";
import * as actions from "../../../../store/actions";

class DoctorExtrainfor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDetailPrice: false,
    };
  }

  async componentDidMount() {
    this.props.fetchPriceStart();
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {}

  render() {
    const listPrices = this.props.prices.find(
      (item) => item.keyMap === this.props.priceExamination
    );
    return (
      <div className="doctor-extrainfor-container">
        <div className="address-hospital">
          <span className="text-address">
            <FormattedMessage id={"patient.extra-infor-doctor.text-address"} />
          </span>
          <span className="hospital-address">
            <FormattedMessage
              id={"patient.extra-infor-doctor.hospital-address"}
            />
          </span>
          <span className="hospital-address">
            <FormattedMessage
              id={"patient.extra-infor-doctor.detail-address"}
            />
          </span>
        </div>
        <div className="text-price">
          <span className="title-price">
            <FormattedMessage id={"patient.extra-infor-doctor.price"} />
          </span>
          {!this.state.showDetailPrice ? (
            <span className="only-show-price">
              {listPrices && listPrices.valueVi ? (
                <span className="count-price">
                  {this.props.language === LANGUAGES.VI
                    ? `: ${listPrices.valueVi.replace(
                        /\B(?=(\d{3})+(?!\d))/g,
                        "."
                      )}VNĐ.  `
                    : `: ${listPrices.valueEn}USD.  `}
                </span>
              ) : (
                ""
              )}
              <span
                className="btn-show-detail"
                onClick={() =>
                  this.setState({
                    showDetailPrice: !this.state.showDetailPrice,
                  })
                }
              >
                {
                  <FormattedMessage
                    id={"patient.extra-infor-doctor.see-dentail"}
                  />
                }
              </span>
            </span>
          ) : (
            <div className="wapper-show-detail-price">
              <div className="show-detail-price">
                <span className="header-detail-price">
                  <span className="title-price">
                    <FormattedMessage id={"patient.extra-infor-doctor.price"} />
                  </span>
                  {listPrices && listPrices.valueVi ? (
                    <span className="title-price count-price">
                      {this.props.language === LANGUAGES.VI
                        ? `: ${listPrices.valueVi.replace(
                            /\B(?=(\d{3})+(?!\d))/g,
                            "."
                          )}VNĐ.  `
                        : `: ${listPrices.valueEn}USD.  `}
                    </span>
                  ) : (
                    ""
                  )}
                </span>
                <span className="content-detail-price">
                  {this.props.noteText}
                </span>
                <span className="payments">
                  <FormattedMessage
                    id={"patient.extra-infor-doctor.payments"}
                  />
                </span>
              </div>
              <span
                className="btn-show-hidden btn-show-detail"
                onClick={() =>
                  this.setState({
                    showDetailPrice: !this.state.showDetailPrice,
                  })
                }
              >
                <FormattedMessage id={"patient.extra-infor-doctor.hide"} />
              </span>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    prices: state.admin.prices,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPriceStart: () => dispatch(actions.fetchPriceStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtrainfor);
