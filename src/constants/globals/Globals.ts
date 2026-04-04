import {Images} from '../images/Image';

// Define interfaces for the object structures
interface LanguageOption {
  title: string;
  languageCode: string;
}

interface SocialMediaOption {
  title: string;
  logo: any; // Update this with the correct type from Images if known
  link: string;
}

interface PaymentOption {
  title: string;
}

// Define the main Globals type
export const Globals: {
  APP_ID: number;
  App_Name: string;
  STYLES: {
    BORDER_RADIUS: number;
  };
  LANGUAGE_OPTIONS: LanguageOption[];
  SOCIAL_MEDIA_OPTIONS: SocialMediaOption[];
  PAYMENT_OPTIONS: PaymentOption[];
} = {
  APP_ID: 36,
  App_Name: 'HE Ahmed Al Suwaidi',
  STYLES: {
    BORDER_RADIUS: 8,
  },

  LANGUAGE_OPTIONS: [
    {
      title: 'English',
      languageCode: 'en',
    },
    {
      title: 'العربية',
      languageCode: 'ar',
    },
  ],

  SOCIAL_MEDIA_OPTIONS: [
    {
      title: 'facebook',
      logo: Images.FACEBOOK_WHITE,
      link: 'https://www.facebook.com/mohammed.suwaidi.poet/',
    },
    {
      title: 'x',
      logo: Images.X,
      link: 'https://www.twitter.com/mohamedsuwaidi5/',
    },
    {
      title: 'youtube',
      logo: Images.YOUTUBE,
      link: 'https://www.youtube.com/mohammedsuwaidi5/',
    },
    {
      title: 'instagram',
      logo: Images.INSTA,
      link: 'https://www.instagram.com/mohammed.al.suwaidi/',
    },
    {
      title: 'pintrest',
      logo: Images.PINTREST,
      link: 'https://www.pinterest.com/mohammedsuwaidi5/',
    },
    {
      title: 'linked in',
      logo: Images.LINKDIN,
      link: 'https://www.linkedin.com/in/mohammedsuwadi/',
    },
    {
      title: 'sound cloud',
      logo: Images.SOUND_CLOUD,
      link: '',
    },
  ],

  PAYMENT_OPTIONS: [{title: 'Play Store'}, {title: 'Etisalat Payment Gateway'}],
};
