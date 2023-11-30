import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomePage.scss";
import Search from "./Search/Search";
import { FormattedMessage } from "react-intl";

const optionMedical = [
  {
    img: "/images/khamchuyenkhoa.png",
    title: <FormattedMessage id={"banner.specialized"} />,
  },
  {
    img: "/images/khamtuxa.png",
    title: <FormattedMessage id={"banner.remote"} />,
  },
  {
    img: "/images/khamtongquat.png",
    title: <FormattedMessage id={"banner.general"} />,
  },
  {
    img: "/images/dichvuxetnghiem.png",
    title: <FormattedMessage id={"banner.test"} />,
  },
  {
    img: "/images/suckhoetinhthan.png",
    title: <FormattedMessage id={"banner.mental"} />,
  },
  {
    img: "/images/khamnhakhoa.png",
    title: <FormattedMessage id={"banner.dental"} />,
  },
  {
    img: "/images/phau-thuat.jpg",
    title: <FormattedMessage id={"banner.surgery"} />,
  },
  {
    img: "/images/khamtainha.png",
    title: <FormattedMessage id={"banner.products"} />,
  },
  {
    img: "/images/icon-bai-test-suc-khoe.png",
    title: <FormattedMessage id={"banner.health-test"} />,
  },
];

class ContainerHomePage extends Component {
  render() {
    return (
      <div className="container-home-page">
        <div className="main-title">
          <h1 className="">
            <FormattedMessage id={"banner.title-main"} /> <br />
            <b>
              <FormattedMessage id={"banner.title-main2"} />
            </b>
          </h1>
          <div className="">
            <Search />
          </div>
        </div>
        <ul className="wrapper-optionMedical">
          {optionMedical.map((item) => (
            <li className="wrapper-item-optionMedical">
              <div className="img-item-option">
                <img src={item.img} alt="" />
              </div>
              <h4>{item.title}</h4>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ContainerHomePage);
