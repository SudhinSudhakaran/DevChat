import I18n from 'react-native-i18n';
import en from './components/en';
import ar from './components/ar';

// Define types for the translation objects
type Translations = {
  [key: string]: string | object;
};

I18n.fallbacks = true;
I18n.translations = {
  ar,
  en,
} as {ar: Translations; en: Translations}; // Type the translations object explicitly

export default I18n;
