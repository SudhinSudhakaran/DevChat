const BASE_URL = "https://www.ahlamakom.com/api";
const EV_BASE_URL = "https://www.electronicvillage.org";
const EV_USER_BASE_URL = "https://evusers.electronicvillage.org";

export default {
  EV_LINK: EV_BASE_URL,
  CHAT_GPT: EV_USER_BASE_URL + "/chatgpt",
  CHATGPT_LIST: EV_USER_BASE_URL + "/json_chatGPT_list.php",
  PROMO_COUNTER: EV_USER_BASE_URL + "/json_subscription_form.php",
  WALLET: EV_USER_BASE_URL + "/wallet.php",
  DREAMS_CHAR: BASE_URL + "/json_chars.php",
  DREAMS_BOOK: BASE_URL + "/json_books.php",
  LOG_OUT: EV_USER_BASE_URL + "/json_logout",
  FOUNDER: EV_BASE_URL + "/json_founder.php",
  DREAMS_LIST: BASE_URL + "/json_dreams.php",
  LOGIN: EV_USER_BASE_URL + "/json_login.php",
  REQUEST_OTP: EV_USER_BASE_URL + "/json_sendOtp",
  VARIFY_OTP: EV_USER_BASE_URL + "/json_otpverify",
  DREAMS_SUBJECTS: BASE_URL + "/json_booktree.php",
  PRIVACY_POLICY: EV_BASE_URL + "/json_evPages.php",
  CONTACT_US: EV_USER_BASE_URL + "/json_contactus.php",
  DELETE_USER: EV_USER_BASE_URL + "/json_user_deleteUser",
  CHANGE_EMAIL: EV_USER_BASE_URL + "/json_user_changeEmail",
  FORGOT_PASSWORD: EV_USER_BASE_URL + "/json_forgotPassword",
  APPLICATIONS_LIST: EV_USER_BASE_URL + "/json_applications",
  NOTIFICATION: EV_USER_BASE_URL + "/json_appTokenInsert.php",
  RESET_PASSWORD: EV_USER_BASE_URL + "/json_user_resetPassword",
  USER_REGISTER: EV_USER_BASE_URL + "/json_userRegistration.php",
  CHANGE_LANGUAGE: EV_USER_BASE_URL + "/json_user_changeLanguage",
  CHANGE_USERNAME: EV_USER_BASE_URL + "/json_user_changeUsername",
  SUBSCRIPTION_LIST: EV_USER_BASE_URL + "/json_subscriptions.php",
  APP_HELP_SUPPORT: EV_USER_BASE_URL + "/json_appHelpSupport.php",

  PROMO_COUNTER: EV_USER_BASE_URL + "/json_subscription_form.php",
  CHANGE_PASSWORD: EV_USER_BASE_URL + "/json_user_changePassword",
  CHANGE_PROFILE_PIC: EV_USER_BASE_URL + "/json_user_changeProfilePic",
  APP_INFO: "http://www.electronicvillage.org/json_appInfo.php?appId=32",
  CHANGE_NOTIFICATION: EV_USER_BASE_URL + "/json_user_changeNotification",

  // New

  GET_ARTICLE_LIST: EV_BASE_URL + "/hea_json_articlelist.php?moduleId=1",
  GET_YEAR_LIST: EV_BASE_URL + "/hea_json_articlesByyearlist.php?moduleId=1",
  GET_PLACE_LIST: EV_BASE_URL + "/hea_json_placelist.php",
  GET_CATEGORY_LIST: EV_BASE_URL + "/hea_json_categorylist.php",
  GET_ARTICLE_LIST_BY_YEAR:
    EV_BASE_URL + "/hea_json_articlesByyearlist.php?moduleId=1",
  GET_ARTICLE_LIST_BY_PLACE:
    EV_BASE_URL + "/hea_json_articlesByplacelist.php?moduleId=1",

  GET_ARTICLE_LIST_BY_CATEGORIES:
    EV_BASE_URL + "/hea_json_articlesBycategorylist.php?moduleId=1",

  GET_ARTICLE_LIST_BY_NEWS:
    EV_BASE_URL + "/hea_json_articlesBynewspaperlist.php?moduleId=1",
  GET_APP_DETAILS: EV_BASE_URL + "/json_appInfo.php",

  KEYS: {
    OTP: "otp",
    AUTH: "auth",

    PAGE: "page",
    EMAIL: "email",
    APP_ID: "appId",
    ACTION: "action",
    PAGE_ID: "pageId",
    OS_TYPE: "osType",
    CHAR_ID: "charId",
    DREAM_ID: "dreamId",
    PASSWORD: "password",
    LANGUAGE: "language",
    USERNAME: "username",
    FULL_NAME: "fullname",
    FCM_TOKEN: "fcmToken",
    DEVICE_ID: "deviceId",
    SUBJECT_ID: "subjectId",
    PROFILE_PIC: "profile_pic",
    NEW_PASSWORD: "newPassword",
    OLD_PASSWORD: "oldPassword",
    NOTIFICATION: "notification",
    ENCODED_EMAIL: "encodedEmail",
    DISCOUND_CODE: "discountCode",
    SEARCH_PHRASE: "searchphrase",
    SUB_SUJECT_ID: "subSubjectId",
  },
};
