import type React from 'react';
import {
  Image,
  StyleSheet,
  type ImageSourcePropType,
} from 'react-native';

interface ProductThumbnailProps {
  image: ImageSourcePropType;
  style?: object;
}

const ProductThumbnail: React.FC<ProductThumbnailProps> = ({ 
  image,
  style 
}) => {
  return (
    <Image
      source={image}
      style={[styles.image, style]}
      resizeMode="cover"
    />
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
});

export default ProductThumbnail;