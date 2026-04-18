import React from 'react';
import {View, Text} from 'react-native';
import styles from './ErrorText.style';
import {useSelector} from 'react-redux';

interface ErrorTextProps {
  text: string;
}

const ErrorText: React.FC<ErrorTextProps> = ({text}) => {
  const {isRtl} = useSelector(state => state?.ui);

  return (
    <Text style={[{textAlign: !isRtl ? 'right' : 'left'}, styles.text]}>
      {text}
    </Text>
  );
};

export default ErrorText;
