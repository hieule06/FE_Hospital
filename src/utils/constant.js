export const path = {
  HOME: "/",
  HOME_PAGE: "/home-page",
  SPECIALTY_PAGE: "/specialty-page",
  DOCTOR_PAGE: "/doctor-page",
  HANDBOOK_PAGE: "/handbook-page",
  DETAIL_DOCTOR: "/detail-doctor/:id",
  DETAIL_SPECIALTY: "/detail-specialty/:id",
  DETAIL_HANDBOOK: "/detail-handbook/:id",
  LOGIN_REDIRECT: "/login-redirect",
  LOGIN: "/login",
  LOG_OUT: "/logout",
  SYSTEM: "/system",
  DOCTOR: "/doctor",
  VERIFY_BOOKING: "/verify-booking",
};

export const LANGUAGES = {
  VI: "vi",
  EN: "en",
};

export const manageActions = {
  ADD: "ADD",
  EDIT: "EDIT",
  DELETE: "DELETE",
};

export const dateFormat = {
  SEND_TO_SERVER: "DD/MM/YYYY",
};

export const YesNoObj = {
  YES: "Y",
  NO: "N",
};

export const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1024 },
    items: 4,
    slidesToSlide: 2,
  },
  desktop: {
    breakpoint: { max: 1024, min: 800 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 800, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};
