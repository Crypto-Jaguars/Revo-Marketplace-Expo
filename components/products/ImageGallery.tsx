import type React from 'react';
import { useState } from 'react';
import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Modal,
  type ImageSourcePropType,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

interface ImageGalleryProps {
  images: ImageSourcePropType[];
  onImagePress?: () => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ 
  images, 
  onImagePress 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [fullscreenIndex, setFullscreenIndex] = useState(0);

  const handleImagePress = (index: number) => {
    setFullscreenIndex(index);
    setModalVisible(true);
    if (onImagePress) onImagePress();
  };

  return (
    <View style={styles.container}>
      {/* Main Horizontal Image Scroll */}
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
        onMomentumScrollEnd={(event) => {
          const offset = event.nativeEvent.contentOffset.x;
          const index = Math.round(offset / width);
          setCurrentIndex(index);
        }}
      >
        {images.map((image, index) => (
          <TouchableOpacity
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            key={index}
            style={styles.imageContainer}
            onPress={() => handleImagePress(index)}
            activeOpacity={0.9}
          >
            <Image
              source={image}
              style={styles.image}
              resizeMode="cover"
            />
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Pagination Dots */}
      <View style={styles.pagination}>
        {images.map((_, index) => (
          <View
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            key={index}
            style={[
              styles.paginationDot,
              currentIndex === index && styles.paginationDotActive,
            ]}
          />
        ))}
      </View>

      {/* Fullscreen Modal */}
      <Modal
        animationType="fade"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <Ionicons name="close" size={28} color="#FFFFFF" />
          </TouchableOpacity>

          <ScrollView
            horizontal
            pagingEnabled
            contentContainerStyle={styles.modalScrollContent}
            showsHorizontalScrollIndicator={false}
          >
            {images.map((image, index) => (
              <View 
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                key={index} 
                style={styles.fullscreenImageContainer}
              >
                <Image
                  source={image}
                  style={styles.fullscreenImage}
                  resizeMode="contain"
                />
              </View>
            ))}
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 300,
    width: '100%',
  },
  scrollView: {
    width: '100%',
    height: '100%',
  },
  imageContainer: {
    width,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 16,
    alignSelf: 'center',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: '#FFFFFF',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 10,
    padding: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
  },
  modalScrollContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullscreenImageContainer: {
    width,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullscreenImage: {
    width: width * 0.9,
    height: width * 0.9,
  },
});

export default ImageGallery;