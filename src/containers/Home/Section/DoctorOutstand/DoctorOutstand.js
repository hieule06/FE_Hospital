import React, { Component } from "react";
import CarouselSlider from "react-carousel-slider";
import { connect } from "react-redux";
import "./DoctorOutstand.scss";

class DoctorOutstand extends Component {
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
    let data1 = [
      {
        imgSrc:
          "https://rukminim1.flixcart.com/flap/750/334/image/98b694e75a6b77f3.jpg?q=90",
      },
      {
        imgSrc:
          "https://rukminim1.flixcart.com/flap/750/334/image/e349a2c12ce65f88.jpg?q=90",
      },
      {
        imgSrc:
          "https://rukminim1.flixcart.com/flap/750/334/image/e988007225ebe5e9.jpg?q=90",
      },
      {
        imgSrc:
          "https://rukminim1.flixcart.com/flap/750/334/image/86c2fc7a6e6025be.jpg?q=90",
      },
      {
        imgSrc:
          "https://rukminim1.flixcart.com/flap/750/334/image/6686d18a2d7f9543.jpg?q=90",
      },
    ];
    let manner = {
      autoSliding: { interval: "3s" },
      circular: true,
    };

    let accEleSetting = { dots: false };

    let buttonSetting = {
      placeOn: "middle-inside",
      style: {
        left: {
          height: "100px",
          width: "60px",
          color: "black",
          margin: "0",
          fontSize: "30px",
          background: "white",
          opacity: "1",
        },
        right: {
          height: "100px",
          width: "60px",
          color: "balck",
          margin: "0",
          fontSize: "30px",
          background: "white",
          opacity: "1",
        },
      },
    };
    let buttonSetting1 = {
      placeOn: "middle-inside",
      style: {
        left: {
          height: "60px",
          width: "30px",
          color: "black",
          fontSize: "30px",
          background: "white",
          opacity: "1",
        },
        right: {
          height: "60px",
          width: "30px",
          color: "balck",
          fontSize: "30px",
          background: "white",
          opacity: "1",
        },
      },
    };

    return (
      <div className="doctor-outstand-container">
        <div className="offers_container" style={{ height: "100%" }}>
          <div className="offer_box" style={{ height: "100%" }}>
            <CarouselSlider
              slideItems={data1}
              manner={manner}
              accEle={accEleSetting}
              buttonSetting={buttonSetting1}
              sliderBoxStyle={{
                width: "98%",
                height: "100%",
                background: "transparent",
              }}
              itemsStyle={{ padding: "0px", margin: "0px 0px" }}
            />
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
