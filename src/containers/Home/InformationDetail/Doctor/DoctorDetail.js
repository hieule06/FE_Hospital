import React, { Component } from "react";
import { connect } from "react-redux";
import HeaderHome from "../../HeaderHome";
import { getdataDoctorShowPage } from "../../../../services/doctorService";
import noImage from "../../../../assets/images/no-image.png";
import "./DoctorDetail.scss";
import { LANGUAGES } from "../../../../utils";

class DoctorDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailDoctor: {},
      currentDoctorId: -1,
    };
  }
  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      this.setState({
        currentDoctorId: id,
      });

      let res = await getdataDoctorShowPage(id);
      if (res && res.data.errCode === 0) {
        this.setState({
          detailDoctor: res.data.dataDoctor,
        });
      }
    }
  }

  render() {
    const { detailDoctor } = this.state;
    const nameVN = detailDoctor
      ? `${detailDoctor.lastName} ${detailDoctor.firstName}`
      : "";
    const nameEN = detailDoctor
      ? `${detailDoctor.firstName} ${detailDoctor.lastName}`
      : "";
    return (
      <div>
        <HeaderHome />
        <div className="doctor-detail-container">
          <div className="intro-doctor">
            <div className="content-intro">
              <div className="avatar-doctor">
                <img
                  src={
                    detailDoctor && detailDoctor.image
                      ? detailDoctor.image
                      : noImage
                  }
                  alt=""
                />
              </div>
              <div className="preliminary-information">
                <h3>
                  {this.props.language === LANGUAGES.VI ? nameVN : nameEN}
                </h3>
                <p>
                  {detailDoctor.Markdown
                    ? detailDoctor.Markdown.description
                    : ""}
                </p>
              </div>
            </div>
          </div>
          <div className="schedule-doctor"></div>
          <div className="detail-infor-doctor">
            {detailDoctor.Markdown && detailDoctor.Markdown.contentHTML && (
              <div
                dangerouslySetInnerHTML={{
                  __html: detailDoctor.Markdown.contentHTML,
                }}
              ></div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorDetail);
