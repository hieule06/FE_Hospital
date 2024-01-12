import React, { Component } from "react";
import { connect } from "react-redux";
import HeaderHome from "../../HeaderHome";
import "./HandbookDetail.scss";
import Footer from "../../Section/Footer/Footer";
import {
  getListDoctorsByIdHandbook,
  getdataHandbookShowPage,
} from "../../../../services/doctorService";

class HandbookDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailHandbook: {},
      currentHandbookId: -1,
      isModalOpen: false,
      objDate: -1,
      listDoctors: [],
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
        currentHandbookId: id,
      });

      let res = await getdataHandbookShowPage(id);
      if (res && res.data.errCode === 0) {
        this.setState({
          detailHandbook: res.data.dataHandbook,
        });
      }
    }
  }

  render() {
    const { detailHandbook } = this.state;
    return (
      <div className="doctor-detail-page">
        <HeaderHome />
        <div className="doctor-detail-container">
          <div className="detail-infor-doctor">
            {detailHandbook.descriptionHTML && (
              <div
                dangerouslySetInnerHTML={{
                  __html: detailHandbook.descriptionHTML,
                }}
              ></div>
            )}
          </div>
        </div>
        <Footer />
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

export default connect(mapStateToProps, mapDispatchToProps)(HandbookDetail);
