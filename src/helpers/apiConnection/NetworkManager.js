import axios from 'axios';
import {useSelector} from 'react-redux';

export const useNetworkManager = () => {
  const userDetails = useSelector(state => state.user.userDetails);
  const currentLanguage = useSelector(state => state.user.currentLanguage);
  const token = useSelector(state => state.user?.sessionToken);

  axios.defaults.headers.common['sessiontoken'] = token;
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
  axios.defaults.headers.common['Content-Type'] = 'application/json';
  /**
<==========================================================>
 * Purpose: Get function
 * Created By: Sudhin Sudhakaran
 * Created On: 21-03-2024
Steps :
1.  take url and params
2.  pass url and params to axios
3.  if it is success the return  ture , res.message , response
4.  if it is not success the return  false , res.message , null
<==========================================================>
 */
  const get = async (url, params) => {
    console.log('🚀 ~ get ~ url:', url);
    console.log('🚀 ~ get ~ params:', params);

    try {
      const response = await axios.get(url, {
        params: {...params, language: currentLanguage === 'ar' ? 1 : 2},
      });

      let _res = response.data;
      console.log('🚀 ~ get ~ response:', response);

      if (_res && _res.status && _res.statusCode === 200) {
        return [true, _res?.errormessage, _res];
      } else {
        return [false, _res.errormessage ?? 'Something went wrong...', null];
      }
    } catch (error) {
      console.log('Error', error);
      console.log('Response', error.response);
      return error.response.data;
    }
  };
  /**
<==========================================================>
 * Purpose:  Post function
 * Created By: Sudhin Sudhakaran
 * Created On: 21-03-2024
Steps :
1.  Take url and body
2.  pass url and params to axios
3.  if it is success the return  ture , res.message , response
4.  if it is not success the return  false , res.message , null
<==========================================================>
 */
  const post = async (url, formData) => {
    console.log('🚀 ~ post ~ url:', url);
    console.log('🚀 ~ post ~ formData:', formData);
    try {
      const response = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      let _res = response.data;
      console.log('🚀 ~ post ~ response:', response);

      if (_res && _res.status && _res.statusCode === 200) {
        console.log('oooooo', _res);
        return [true, _res?.errormessage , _res];
      } else {
        return [false, _res.errormessage ?? 'Something went wrong...', null];
      }
    } catch (error) {
      console.log('Error', error);
      console.log('Response', error.response);
      return error.response.data;
    }
  };

  // custome fetch functions

  const getPrivacyDetails = async (url, params) => {
    console.log('🚀 ~ get ~ url:', url);
    console.log('🚀 ~ get ~ params:', params);

    try {
      const response = await axios.get(url, {
        params: {...params, language: currentLanguage === 'ar' ? 1 : 2},
      });

      console.log('🚀 ~ get ~ response:', response);

      if (response && response.status === 200) {
        return [true, response?.errormessage, response?.data];
      } else {
        return [false, response?.errormessage ?? 'Something went wrong...', null];
      }
    } catch (error) {
      console.log('Error', error);
      console.log('Response', error.response);
      return error.response.data;
    }
  };

  const getWalletDetails = async (url, params) => {
    console.log('🚀 ~ get ~ url:', url);
    console.log('🚀 ~ get ~ params:', params);

    try {
      const response = await axios.get(url, {
        params: {...params, language: currentLanguage === 'ar' ? 1 : 2},
      });

      let _res = response;
      console.log('🚀 ~ get ~ response:', response);

      if (_res && _res.status === 200) {
        return [true, '', _res];
      } else {
        return [false, '', null];
      }
    } catch (error) {
      console.log('Error', error);
      console.log('Response', error.response);
      return error.response.data;
    }
  };

  const getWithStatus = async (url, params) => {
    console.log('🚀 ~ get ~ url:', url);
    console.log('🚀 ~ get ~ params:', params);

    try {
      const response = await axios.get(url, {
        params: {...params, language: currentLanguage === 'ar' ? 1 : 2},
      });

      let _res = response;
      console.log('🚀 ~ get ~ response:::::::', response);

      if (_res && _res.status && _res.status === 200) {
        return [true, _res?.errormessage, _res];
      } else {
        return [false, _res?.errormessage ?? 'Something went wrong...', null];
      }
    } catch (error) {
      console.log('Error', error);
      console.log('Response', error.response);
      return error.response.data;
    }
  };
  return {get, getWithStatus, post, getPrivacyDetails, getWalletDetails};
};
