import React, {useState} from 'react';
import {Image, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import PropTypes from 'prop-types';
import ContentLoader, {Facebook, Rect} from 'react-content-loader/native';
import Images from '../assets/images';

const GetImage = ({source, isLocal, style, resizeMode, ...props}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const onLoadStart = () => {
    setIsLoading(true);
    setError(false);
  };

  const onLoadEnd = () => {
    setIsLoading(false);
  };

  const onError = () => {
    setIsLoading(false);
    setError(true);
  };

  const getResizeMode = (mode) => {
    switch (mode) {
      case 'cover':
        return FastImage.resizeMode.cover;
      case 'center':
        return FastImage.resizeMode.center;
      case 'contain':
        return FastImage.resizeMode.contain;
      case 'stretch':
        return FastImage.resizeMode.stretch;
      default:
        return FastImage.resizeMode.stretch;
    }
  };

  const Loader = ({style}) => (
    <ContentLoader
      height={'100%'}
      speed={1}
      backgroundColor={'#D3D3D3'}
      foregroundColor={'gray'}
      opacity={0.2}>
      <Rect x="0" y="0" rx="5" ry="5" width="100%" height="100%" />
    </ContentLoader>
  );

  return (
    <View style={style}>
      <FastImage
        {...props}
        source={{
          uri: source,
          headers: {Accept: '*/*'},
          priority: FastImage.priority.high,
          cache: FastImage.cacheControl.web,
        }}
        style={{flex: 1}}
        onLoadStart={onLoadStart}
        onLoadEnd={onLoadEnd}
        onError={onError}
        resizeMode={getResizeMode(resizeMode)}
      />
      {isLoading && <Loader style={style} />}
      {error && <Image source={Images.default} style={style} />}
    </View>
  );
};

GetImage.propTypes = {
  source: PropTypes.string.isRequired,
  style: PropTypes.object,
  imageResizeMode: PropTypes.oneOf(['cover', 'center', 'contain', 'stretch']),
};

GetImage.defaultProps = {
  style: {},
  resizeMode: 'stretch',
};

export default GetImage;
