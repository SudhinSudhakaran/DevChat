export const useEncrypt = (_text: string = '') => {
  if (_text.length > 0) {
    const base64 = require('base-64');
    var utf8 = require('utf8');
    const bytes = utf8.encode(_text);
    return base64.encode(bytes);
  }

  return _text;
};
