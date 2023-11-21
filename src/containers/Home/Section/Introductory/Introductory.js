import React, { Component } from "react";
import { connect } from "react-redux";
import "./Introductory.scss";
import { FormattedMessage } from "react-intl";

class Introductory extends Component {
  render() {
    return (
      <div className="wrapper-introductory">
        <h4 className="title-introductory">
          <FormattedMessage id={"homepage.handbook"} />
        </h4>
        <div className="wrapper-content-introductory">
          <div className="iframe-introductory">
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/eecnhzWvK2E?si=QEO3bvdbs7Kxiyvn"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
          </div>
          <div className="content-introductory">
            <p>
              Trong sự phát triển của xã hội hiện đại, chăm sóc sức khoẻ tinh
              thần luôn là điều quan trọng không chỉ cho cá nhân mà cho toàn xã
              hội. Hướng tới ngày sức khỏe tâm thần thế giới 10/10 viết tắt là
              WMHD (World Mental Health Day), bài viết này hy vọng truyền thông
              tới quý độc giả có thông tin bao quát hơn về sức khỏe, sức khỏe
              tâm thần và những tiêu chuẩn chẩn đoán, từ đó giúp chúng ta tự
              lượng giá và chủ động hơn trong chăm sóc sức khỏe nói chung.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Introductory);
