import React, { useState } from 'react';
import { Image, View, StyleProp, ViewStyle, ImageStyle } from 'react-native';
import FastImage, { ResizeMode } from 'react-native-fast-image';
import ContentLoader, { Rect } from 'react-content-loader/native';
import { Images } from '../../constants';

type ResizeModeType = 'cover' | 'center' | 'contain' | 'stretch';

interface GetImageProps {
  source: string;
  isLocal?: boolean;
  style?: StyleProp<ViewStyle | ImageStyle>;
  resizeMode?: ResizeModeType;
  [key: string]: any; // for other props
}

const GetImage: React.FC<GetImageProps> = ({
  source,
  isLocal = false,
  style = {},
  resizeMode = 'stretch',
  ...props
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

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

  const getResizeMode = (mode: ResizeModeType): ResizeMode => {
    switch (mode) {
      case 'cover':
        return FastImage.resizeMode.cover;
      case 'center':
        return FastImage.resizeMode.center;
      case 'contain':
        return FastImage.resizeMode.contain;
      case 'stretch':
      default:
        return FastImage.resizeMode.stretch;
    }
  };

  const Loader: React.FC<{ style?: StyleProp<ViewStyle | ImageStyle> }> = () => (
    <ContentLoader
      height="100%"
      speed={1}
      backgroundColor="#D3D3D3"
      foregroundColor="gray"
      opacity={0.2}
    >
      <Rect x="0" y="0" rx="5" ry="5" width="100%" height="100%" />
    </ContentLoader>
  );

  return (
    <View style={style}>
      <FastImage
        {...props}
        source={
          isLocal
            ? source
            : {
                uri: source,
                headers: { Accept: '*/*' },
                priority: FastImage.priority.high,
                cache: FastImage.cacheControl.web,
              }
        }
        style={{ flex: 1 }}
        onLoadStart={onLoadStart}
        onLoadEnd={onLoadEnd}
        onError={onError}
        resizeMode={getResizeMode(resizeMode)}
      />

      {isLoading && <Loader style={style} />}

      {error && (
        <Image
          source={Images.DEFAULT_IMAGE}
          style={style as StyleProp<ImageStyle>}
        />
      )}
    </View>
  );
};

export default GetImage;