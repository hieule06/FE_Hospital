import React, { Component } from "react";
import { connect } from "react-redux";
import "./Footer.scss";

class Footer extends Component {
  render() {
    return (
      <footer>
        {/* <div class="footer-content">
          <div class="footer-section">
            <h3>About Us</h3>
            <p>Information about the medical facility or booking service.</p>
          </div>
          <div class="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/appointments">Appointments</a>
              </li>
              <li>
                <a href="/services">Services</a>
              </li>
              <li>
                <a href="/contact">Contact</a>
              </li>
            </ul>
          </div>
          <div class="footer-section">
            <h3>Contact Us</h3>
            <p>Email: info@example.com</p>
            <p>Phone: +1 123-456-7890</p>
          </div>
        </div> */}
        {/* <div className="content-footer">
          <div className="detail-content-footer">
            <h4>Bệnh viện đa khoa Quốc tế Hải Phòng</h4>
            <div>
              <i class="fas fa-address-card"></i>
              <span>
                1 P. Nhà Thương, Cát Dài, Lê Chân, Hải Phòng, Việt Nam
              </span>
            </div>
            <div>
              <i class="fas fa-phone"></i>
              <span>024-7301-2468</span>
            </div>
            <div>
              <img src="	https://bookingcare.vn/assets/icon/bo-cong-thuong.svg" />
            </div>
            <div>
              <img src="	https://bookingcare.vn/assets/icon/bo-cong-thuong.svg" />
            </div>
          </div>
          <div className="iframe-address">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3135.277635151926!2d106.67092146627469!3d20.852110736706713!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314a7b6fbcc499b3%3A0x6e6f028f6d04fbbf!2zQuG7h25oIFZp4buHbiDEkGEgS2hvYSBRdeG7kWMgVOG6vw!5e0!3m2!1svi!2s!4v1706505963694!5m2!1svi!2s"
              width="600"
              height="450"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div> */}
        <div class="footer-bottom">
          <p>&copy; 2023 Medical Booking System. All Rights Reserved.</p>
        </div>
      </footer>
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

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
