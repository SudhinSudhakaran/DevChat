import React from 'react';
import {TouchableOpacity} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {responsiveScreenWidth} from 'react-native-responsive-dimensions';
import styles from './EyeButton.style';
import { Colors } from '../../../constants';
 

interface EyeButtonProps {
  secureTextEntry: boolean;
  setSecureTextEntry: (value: boolean) => void; // Corrected type
}

const EyeButton: React.FC<EyeButtonProps> = ({
  secureTextEntry,
  setSecureTextEntry,
}) => {
  const IconComponent = Entypo as unknown as React.ComponentType<any>;
  return (
    <TouchableOpacity
      onPress={() => setSecureTextEntry(!secureTextEntry)}
      style={styles.container}>
      <IconComponent
        name={!secureTextEntry ? 'eye-with-line' : 'eye'}
        size={responsiveScreenWidth(5.5)}
        color={Colors.PRIMARY_COLOR}
      />
    </TouchableOpacity>
  );
};

export default EyeButton;
