import React from 'react';
import { View, Text } from 'react-native';
import LottieView from 'lottie-react-native';
 
import { responsiveScreenWidth } from 'react-native-responsive-dimensions';
import { Animations } from '../../../constants';
interface ButtonLoaderProps {

}

const ButtonLoader: React.FC<ButtonLoaderProps> = ({  }) => {
  return (
    <View>
          <LottieView
        source={Animations.LOADER}
        autoPlay
        loop

  colorFilters={[
    {
      keypath: 'Circulo1',
      color: '#fff',
    },
    {
      keypath: 'Circulo2',
      color: '#fff',
    },
    {
      keypath: 'Circulo3',
      color: '#fff',
    },
    {
      keypath: 'Circulo4',
      color: '#fff',
    },
    {
      keypath: 'Circulo5',
      color: '#fff', // magenta
    },
  ]}
        style={{width: responsiveScreenWidth(25), height: responsiveScreenWidth(25)}}
      />
    </View>
  );
};

export default ButtonLoader;