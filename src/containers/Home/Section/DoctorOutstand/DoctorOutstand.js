import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorOutstand.scss";
import { Carousel } from "react-bootstrap";
import { FormattedMessage } from "react-intl";

class DoctorOutstand extends Component {
  render() {
    return (
      <div className="section-container doctor-outstand-container">
        <div className="offers_container" style={{ height: "100%" }}>
          <div className="offer_box" style={{ height: "100%" }}>
            <div className="wrapper-title-main-section">
              <h4 className="title-main-section">
                <FormattedMessage id={"homepage.outstanding-doctor"} />
              </h4>
              <button className="btn-see-more">
                <FormattedMessage id={"homepage.more-info"} />
              </button>
            </div>
            <Carousel slide={false} interval={3000} className="carousel">
              <Carousel.Item>
                <div
                  className="item-section"
                  onClick={() => {
                    alert(123);
                  }}
                >
                  <img
                    style={{ width: "100%", height: "160px" }}
                    src="https://cdn.bookingcare.vn/fo/w384/2023/06/20/113208-y-hoc-co-truyen.jpg"
                    alt=""
                  />
                  <p>Cơ xương khớp</p>
                </div>
                <div
                  className="item-section"
                  onClick={() => {
                    alert(123);
                  }}
                >
                  <img
                    style={{ width: "100%", height: "160px" }}
                    src="https://cdn.bookingcare.vn/fo/w384/2019/12/16/183706-di-ung-mien-dich.jpg"
                    alt=""
                  />
                  <p>Cơ xương khớp</p>
                </div>
                <div
                  className="item-section"
                  onClick={() => {
                    alert(123);
                  }}
                >
                  <img
                    style={{ width: "100%", height: "160px" }}
                    src="https://cdn.bookingcare.vn/fo/w384/2023/06/20/113221-san-phu-khoa.jpg"
                    alt=""
                  />
                  <p>Cơ xương khớp</p>
                </div>
                <div
                  className="item-section"
                  onClick={() => {
                    alert(123);
                  }}
                >
                  <img
                    style={{ width: "100%", height: "160px" }}
                    src="https://cdn.bookingcare.vn/fo/w384/2023/06/20/112911-sieu-am-thai.jpg"
                    alt=""
                  />
                  <p>Cơ xương khớp</p>
                </div>
              </Carousel.Item>
              <Carousel.Item>
                <div
                  className="item-section"
                  onClick={() => {
                    alert(123);
                  }}
                >
                  <img
                    style={{ width: "100%", height: "160px" }}
                    src="https://cdn.bookingcare.vn/fo/w384/2023/06/20/112457-co-xuong-khop.jpg"
                    alt=""
                  />
                  <p>Cơ xương khớp</p>
                </div>
                <div
                  className="item-section"
                  onClick={() => {
                    alert(123);
                  }}
                >
                  <img
                    style={{ width: "100%", height: "160px" }}
                    src="https://cdn.bookingcare.vn/fo/w384/2023/06/20/112617-tai-mui-hong.jpg"
                    alt=""
                  />
                  <p>Cơ xương khớp</p>
                </div>
                <div
                  className="item-section"
                  onClick={() => {
                    alert(123);
                  }}
                >
                  <img
                    style={{ width: "100%", height: "160px" }}
                    src="https://cdn.bookingcare.vn/fo/w384/2023/06/20/113208-cot-song.jpg"
                    alt=""
                  />
                  <p>Cơ xương khớp</p>
                </div>
                <div
                  className="item-section"
                  onClick={() => {
                    alert(123);
                  }}
                >
                  <img
                    style={{ width: "100%", height: "160px" }}
                    src="https://cdn.bookingcare.vn/fo/w384/2023/06/20/112550-tim-mach.jpg"
                    alt=""
                  />
                  <p>Cơ xương khớp</p>
                </div>
              </Carousel.Item>
              <Carousel.Item>
                <div
                  className="item-section"
                  onClick={() => {
                    alert(123);
                  }}
                >
                  <img
                    style={{ width: "100%", height: "160px" }}
                    src="https://cdn.bookingcare.vn/fo/w384/2023/06/20/113208-y-hoc-co-truyen.jpg"
                    alt=""
                  />
                  <p>Cơ xương khớp</p>
                </div>
                <div
                  className="item-section"
                  onClick={() => {
                    alert(123);
                  }}
                >
                  <img
                    style={{ width: "100%", height: "160px" }}
                    src="https://cdn.bookingcare.vn/fo/w384/2019/12/13/121305-cham-cuu.jpg"
                    alt=""
                  />
                  <p>Cơ xương khớp</p>
                </div>
                <div
                  className="item-section"
                  onClick={() => {
                    alert(123);
                  }}
                >
                  <img
                    style={{ width: "100%", height: "160px" }}
                    src="https://cdn.bookingcare.vn/fo/w384/2023/06/20/113221-san-phu-khoa.jpg"
                    alt=""
                  />
                  <p>Cơ xương khớp</p>
                </div>
                <div
                  className="item-section"
                  onClick={() => {
                    alert(123);
                  }}
                >
                  <img
                    style={{ width: "100%", height: "160px" }}
                    src="https://cdn.bookingcare.vn/fo/w384/2023/06/20/112911-sieu-am-thai.jpg"
                    alt=""
                  />
                  <p>Cơ xương khớp</p>
                </div>
              </Carousel.Item>
              <Carousel.Item>
                <div
                  className="item-section"
                  onClick={() => {
                    alert(123);
                  }}
                >
                  <img
                    style={{ width: "100%", height: "160px" }}
                    src="https://cdn.bookingcare.vn/fo/w384/2023/06/20/112457-co-xuong-khop.jpg"
                    alt=""
                  />
                  <p>Cơ xương khớp</p>
                </div>
                <div
                  className="item-section"
                  onClick={() => {
                    alert(123);
                  }}
                >
                  <img
                    style={{ width: "100%", height: "160px" }}
                    src="https://cdn.bookingcare.vn/fo/w384/2023/06/20/112617-tai-mui-hong.jpg"
                    alt=""
                  />
                  <p>Cơ xương khớp</p>
                </div>
                <div
                  className="item-section"
                  onClick={() => {
                    alert(123);
                  }}
                >
                  <img
                    style={{ width: "100%", height: "160px" }}
                    src="https://cdn.bookingcare.vn/fo/w384/2023/06/20/113208-cot-song.jpg"
                    alt=""
                  />
                  <p>Cơ xương khớp</p>
                </div>
                <div
                  className="item-section"
                  onClick={() => {
                    alert(123);
                  }}
                >
                  <img
                    style={{ width: "100%", height: "160px" }}
                    src="https://cdn.bookingcare.vn/fo/w384/2023/06/20/112550-tim-mach.jpg"
                    alt=""
                  />
                  <p>Cơ xương khớp</p>
                </div>
              </Carousel.Item>
            </Carousel>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorOutstand);
