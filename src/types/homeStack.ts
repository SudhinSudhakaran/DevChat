import { OTP_NAVIGATION_OPTION } from "../constants/enums/Enums";

export type HomeStackParamList = {
  DashBoard: undefined;
  LoginScreen: undefined;
  Profile: undefined;
  Archives: {
    title?: string;
    endPoint: string;
    isFrom: string;
    placeId?: string;
    year?: string;
    categoryId?: string;
    newsId?: string;
  };
  EntryScreen: undefined;
  OnBoardScreen: undefined;
  SignUpScreen: undefined;
  OtpScreen: {
    isFrom: string;
    email: string;
    encryptedEmail?: string;
  };
  ArticleDetails: {
    articleId: string | number;
  };

  NewsPaper: undefined;
  OtherEvApps: undefined;
  OtherEvAppDetails: {
    item: ApplicationDataItem;
  };

  ContactUs: undefined;
  AboutUs: undefined;
  ForgotPasswordScreen: undefined;
  ResetPasswordScreen: ResetPasswordScreenParams;
  ArchivesByYear: undefined;
  ArchivesByPlaces: undefined;
  ArchivesByCategories: undefined;
  ArchivesByNews: undefined;
  ArchiveMapped: undefined;
  HelpAndSupport: undefined;
  Subscription: undefined;
};
export type ApplicationDataItem = {
  applicationIcon: string;
  name: string;
  appId: string;
};
export type NewsItem = {
  id: string;
  name: string;
  coverImage: string;
};

export type OtpScreenParams = {
  isFrom: OTP_NAVIGATION_OPTION;
  email: string;
  encryptedEmail: string;
};

export type ResetPasswordScreenParams = {
  email: string;
  otp: string | number;
};
