// useTextHook.js

/**
<==========================================================>
 * Purpose: Custom function to convert html to text string
 * Created By: Sudhin Sudhakaran
 * Created On: 21-03-2024
Steps : 
1. Taken html as an argument
2. return the text
<==========================================================>
 */
const useTextHook = text => {
  if (text.length > 0) {
    const regex = /(<([^>]+)>)/gi;
    const result = text.replace(regex, '');
    return result;
  }

  return text;
};

export default useTextHook;
