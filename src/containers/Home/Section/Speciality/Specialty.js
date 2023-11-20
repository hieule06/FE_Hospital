import React, { Component } from "react";
import CarouselSlider from "react-carousel-slider";
import { connect } from "react-redux";
import "./Specialty.scss";
import { Carousel } from "react-bootstrap";

const contentStyle = {
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

class Specialty extends Component {
  render() {
    let data = [
      {
        imgSrc:
          "https://rukminim1.flixcart.com/flap/3376/560/image/7760adba4cdde874.jpg?q=50",
      },
      {
        imgSrc:
          "https://rukminim1.flixcart.com/flap/1688/280/image/90cdb794821102c8.jpg?q=50",
      },
      {
        imgSrc:
          "https://rukminim1.flixcart.com/flap/3376/560/image/374a88846acf16b2.jpg?q=50",
      },
      {
        imgSrc:
          "https://rukminim1.flixcart.com/flap/1688/280/image/e3e5625077962405.jpg?q=50",
      },
      {
        imgSrc:
          "https://rukminim1.flixcart.com/flap/1688/280/image/9684c5bba6b14e7f.jpg?q=50",
      },
    ];

    return (
      <div className="specialty-container">
        <div className="offers_container" style={{ height: "100%" }}>
          <div className="offer_box" style={{ height: "100%" }}>
            <div className="wrapper-title-main-specialty">
              <h3 className="title-main-specialty">Chuyên khoa phổ biến</h3>
              <p className="btn-see-more">Xem thêm</p>
            </div>
            <Carousel slide={false} interval={3000}>
              <Carousel.Item>
                <div
                  className="item-specialty"
                  style={{ width: "22%" }}
                  onClick={() => {
                    alert(123);
                  }}
                >
                  <img
                    style={{ width: "100%" }}
                    src="https://cdn.bookingcare.vn/fo/w384/2023/06/20/113208-y-hoc-co-truyen.jpg"
                  />
                </div>
                <div
                  className="item-specialty"
                  style={{ width: "22%" }}
                  onClick={() => {
                    alert(123);
                  }}
                >
                  <img
                    style={{ width: "100%" }}
                    src="https://cdn.bookingcare.vn/fo/w384/2019/12/13/121305-cham-cuu.jpg"
                  />
                </div>
                <div
                  className="item-specialty"
                  style={{ width: "22%" }}
                  onClick={() => {
                    alert(123);
                  }}
                >
                  <img
                    style={{ width: "100%" }}
                    src="https://cdn.bookingcare.vn/fo/w384/2023/06/20/113221-san-phu-khoa.jpg"
                  />
                </div>
                <div
                  className="item-specialty"
                  style={{ width: "22%" }}
                  onClick={() => {
                    alert(123);
                  }}
                >
                  <img
                    style={{ width: "100%" }}
                    src="https://cdn.bookingcare.vn/fo/w384/2023/06/20/112911-sieu-am-thai.jpg"
                  />
                </div>
              </Carousel.Item>
              <Carousel.Item>
                <div
                  className="item-specialty"
                  style={{ width: "22%" }}
                  onClick={() => {
                    alert(123);
                  }}
                >
                  <img
                    style={{ width: "100%" }}
                    src="https://cdn.bookingcare.vn/fo/w384/2023/06/20/112457-co-xuong-khop.jpg"
                  />
                </div>
                <div
                  className="item-specialty"
                  style={{ width: "22%" }}
                  onClick={() => {
                    alert(123);
                  }}
                >
                  <img
                    style={{ width: "100%" }}
                    src="https://cdn.bookingcare.vn/fo/w384/2023/06/20/112617-tai-mui-hong.jpg"
                  />
                </div>
                <div
                  className="item-specialty"
                  style={{ width: "22%" }}
                  onClick={() => {
                    alert(123);
                  }}
                >
                  <img
                    style={{ width: "100%" }}
                    src="https://cdn.bookingcare.vn/fo/w384/2023/06/20/113208-cot-song.jpg"
                  />
                </div>
                <div
                  className="item-specialty"
                  style={{ width: "22%" }}
                  onClick={() => {
                    alert(123);
                  }}
                >
                  <img
                    style={{ width: "100%" }}
                    src="https://cdn.bookingcare.vn/fo/w384/2023/06/20/112550-tim-mach.jpg"
                  />
                </div>
              </Carousel.Item>
              <Carousel.Item>
                <div
                  className="item-specialty"
                  style={{ width: "22%" }}
                  onClick={() => {
                    alert(123);
                  }}
                >
                  <img
                    style={{ width: "100%" }}
                    src="https://cdn.bookingcare.vn/fo/w384/2023/06/20/113208-y-hoc-co-truyen.jpg"
                  />
                </div>
                <div
                  className="item-specialty"
                  style={{ width: "22%" }}
                  onClick={() => {
                    alert(123);
                  }}
                >
                  <img
                    style={{ width: "100%" }}
                    src="https://cdn.bookingcare.vn/fo/w384/2019/12/13/121305-cham-cuu.jpg"
                  />
                </div>
                <div
                  className="item-specialty"
                  style={{ width: "22%" }}
                  onClick={() => {
                    alert(123);
                  }}
                >
                  <img
                    style={{ width: "100%" }}
                    src="https://cdn.bookingcare.vn/fo/w384/2023/06/20/113221-san-phu-khoa.jpg"
                  />
                </div>
                <div
                  className="item-specialty"
                  style={{ width: "22%" }}
                  onClick={() => {
                    alert(123);
                  }}
                >
                  <img
                    style={{ width: "100%" }}
                    src="https://cdn.bookingcare.vn/fo/w384/2023/06/20/112911-sieu-am-thai.jpg"
                  />
                </div>
              </Carousel.Item>
              <Carousel.Item>
                <div
                  className="item-specialty"
                  style={{ width: "22%" }}
                  onClick={() => {
                    alert(123);
                  }}
                >
                  <img
                    style={{ width: "100%" }}
                    src="https://cdn.bookingcare.vn/fo/w384/2023/06/20/112457-co-xuong-khop.jpg"
                  />
                </div>
                <div
                  className="item-specialty"
                  style={{ width: "22%" }}
                  onClick={() => {
                    alert(123);
                  }}
                >
                  <img
                    style={{ width: "100%" }}
                    src="https://cdn.bookingcare.vn/fo/w384/2023/06/20/112617-tai-mui-hong.jpg"
                  />
                </div>
                <div
                  className="item-specialty"
                  style={{ width: "22%" }}
                  onClick={() => {
                    alert(123);
                  }}
                >
                  <img
                    style={{ width: "100%" }}
                    src="https://cdn.bookingcare.vn/fo/w384/2023/06/20/113208-cot-song.jpg"
                  />
                </div>
                <div
                  className="item-specialty"
                  style={{ width: "22%" }}
                  onClick={() => {
                    alert(123);
                  }}
                >
                  <img
                    style={{ width: "100%" }}
                    src="https://cdn.bookingcare.vn/fo/w384/2023/06/20/112550-tim-mach.jpg"
                  />
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

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
