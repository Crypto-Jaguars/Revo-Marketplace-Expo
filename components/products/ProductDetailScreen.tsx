import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Share,
  Modal,
  Image,
} from 'react-native';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';

import ImageGallery from './ImageGallery';
import RelatedProducts from './RelatedProducts';

// Mock data for the current product
const getProductData = (id: string) => {
  const products = {
    '1': {
      id: '1',
      name: 'Fresh Tomatoes',
      price: 1.99,
      rating: 4.6,
      description:
        'Ripe and juicy tomatoes harvested at peak freshness. Perfect for salads, sandwiches, or cooking.',
      farmingDetails: [
        'Organic farming methods',
        'Sustainable practices',
        'Local production',
        'No pesticides used',
      ],
      images: [
        require('../../assets/images/tomatoes1.webp'),
        require('../../assets/images/tomatoes2.webp'),
      ],
    },
    '2': {
      id: '2',
      name: 'Fresh Carrots',
      price: 1.49,
      rating: 4.3,
      description:
        'Crunchy, sweet carrots freshly harvested from local farms. Rich in vitamins and perfect for snacking, cooking, or juicing.',
      farmingDetails: [
        'Organic farming methods',
        'Rich in beta-carotene',
        'Local production',
        'Harvested at peak freshness',
      ],
      images: [
        require('../../assets/images/carrots.webp'),
        require('../../assets/images/carrots2.webp'),
      ],
    },
    '3': {
      id: '3',
      name: 'Organic Lettuce',
      price: 2.29,
      rating: 4.5,
      description:
        'Crisp, fresh lettuce grown with organic farming methods. Perfect for salads, sandwiches, and wraps.',
      farmingDetails: [
        'Certified organic',
        'Hydroponically grown',
        'No pesticides or chemicals',
        'Harvested daily for maximum freshness',
      ],
      images: [
        require('../../assets/images/lettuce.webp'),
        require('../../assets/images/lettuce2.webp'),
      ],
    },
    '4': {
      id: '4',
      name: 'Bell Peppers',
      price: 2.99,
      rating: 4.2,
      description:
        'Colorful, crunchy bell peppers that add vibrant flavor and nutrition to any dish. Great for stir-fries, salads, or stuffing.',
      farmingDetails: [
        'Rich in vitamin C',
        'Grown in natural light',
        'Sustainable farming practices',
        'Harvested when fully ripe for best flavor',
      ],
      images: [
        require('../../assets/images/peppers.webp'),
        require('../../assets/images/peppers2.webp'),
      ],
    },
  };
  
  // Return the product data for the requested ID, or default to the first product
  return products[id as keyof typeof products] || products['1'];
};

// Mock data for related products
const getRelatedProducts = (currentId: string) => {
  const allProducts = [
    {
      id: '1',
      name: 'Fresh Tomatoes',
      price: 1.99,
      rating: 4.6,
      image: require('../../assets/images/tomatoes1.webp'),
    },
    {
      id: '2',
      name: 'Fresh Carrots',
      price: 1.49,
      rating: 4.3,
      image: require('../../assets/images/carrots.webp'),
    },
    {
      id: '3',
      name: 'Organic Lettuce',
      price: 2.29,
      rating: 4.5,
      image: require('../../assets/images/lettuce.webp'),
    },
    {
      id: '4',
      name: 'Bell Peppers',
      price: 2.99,
      rating: 4.2,
      image: require('../../assets/images/peppers.webp'),
    },
  ];
  
  // Filter out the current product
  return allProducts.filter(product => product.id !== currentId);
};

const ProductDetailScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const productId = id || '1'; // Default to ID 1 if not provided
  const productData = getProductData(productId);
  const relatedProducts = getRelatedProducts(productId);

  const [quantity, setQuantity] = useState(1);
  const [inWishlist, setInWishlist] = useState(false);
  const [cartModalVisible, setCartModalVisible] = useState(false);
  const [scrollToTop, setScrollToTop] = useState(false);
  const scrollViewRef = React.useRef<ScrollView>(null);
  const router = useRouter();

  // useEffect to scroll to top when product changes
  React.useEffect(() => {
    if (scrollToTop && scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: 0, animated: true });
      setScrollToTop(false);
    }
  }, [scrollToTop]);

  const handleQuantityChange = (increment: boolean) => {
    if (increment) {
      setQuantity(quantity + 1);
    } else if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    // Show the cart preview modal instead of an alert
    setCartModalVisible(true);
  };

  const handleToggleWishlist = () => {
    setInWishlist(!inWishlist);
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out ${productData.name} for $${productData.price} on Revolutionary Farmers!`,
      });
    } catch (error) {
      console.error('Error sharing product:', error);
    }
  };

  const navigateToRelatedProduct = (productId: string) => {
    // Reset the state when navigating to a new product
    setQuantity(1);
    setCartModalVisible(false);
    setScrollToTop(true);
    
    // Update URL without full page navigation
    router.replace(`/product/${productId}`);
  };

  const totalPrice = productData.price * quantity;

  return (
    <ScrollView 
      ref={scrollViewRef}
      style={styles.container}
    >
      {/* Header with navigation and action buttons */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="qr-code-outline" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={handleShare}>
            <Ionicons name="share-social-outline" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={handleToggleWishlist}>
            <Ionicons
              name={inWishlist ? 'heart' : 'heart-outline'}
              size={24}
              color={inWishlist ? 'red' : 'black'}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Product Images Gallery - Using the ImageGallery component */}
      <ImageGallery images={productData.images} />

      {/* Product Details */}
      <View style={styles.productDetails}>
        <Text style={styles.productName}>{productData.name}</Text>

        <View style={styles.priceRatingContainer}>
          <View style={styles.priceContainer}>
            <Text style={styles.productPrice}>${productData.price.toFixed(2)}</Text>
            {quantity > 1 && (
              <View style={styles.totalPriceContainer}>
                <Text style={styles.totalPriceLabel}>Total: </Text>
                <Text style={styles.totalPriceValue}>${totalPrice.toFixed(2)}</Text>
              </View>
            )}
          </View>
          <View style={styles.rating}>
            <AntDesign name="star" size={16} color="#FFD700" />
            <Text style={styles.ratingText}>{productData.rating}</Text>
          </View>
        </View>

        {/* Quantity Selector */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Quantity</Text>
          <View style={styles.quantitySelector}>
            <TouchableOpacity
              style={[
                styles.quantityButton,
                quantity <= 1 && styles.quantityButtonDisabled,
              ]}
              onPress={() => handleQuantityChange(false)}
              disabled={quantity <= 1}
            >
              <Text style={styles.quantityButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityText}>{quantity}</Text>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => handleQuantityChange(true)}
            >
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Description */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.descriptionText}>{productData.description}</Text>
        </View>

        {/* Farming Details */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Farming Details</Text>
          <View style={styles.farmingDetailsList}>
            {productData.farmingDetails.map((detail, index) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              <View key={index} style={styles.farmingDetailItem}>
                <View style={styles.bulletPoint} />
                <Text style={styles.farmingDetailText}>{detail}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Related Products */}
        <RelatedProducts 
          products={relatedProducts} 
          onSeeAll={() => console.log('See all related products')} 
          onSelectProduct={navigateToRelatedProduct}
        />
      </View>

      {/* Add to Cart Button */}
      <View style={styles.addToCartContainer}>
        <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
          <Ionicons name="cart-outline" size={20} color="white" />
          <Text style={styles.addToCartText}>
            Add to Cart · ${totalPrice.toFixed(2)}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Cart Preview Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={cartModalVisible}
        onRequestClose={() => setCartModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Added to Cart</Text>
              <TouchableOpacity onPress={() => setCartModalVisible(false)} style={styles.closeButton}>
                <Ionicons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>

            <View style={styles.productContainer}>
              <Image source={productData.images[0]} style={styles.productImage} />
              <View style={styles.productInfo}>
                <Text style={styles.modalProductName}>{productData.name}</Text>
                <Text style={styles.quantityInfoText}>Quantity: {quantity}</Text>
                <Text style={styles.priceInfoText}>
                  ${totalPrice.toFixed(2)}
                  {quantity > 1 && (
                    <Text style={styles.unitPriceText}> (${productData.price.toFixed(2)} each)</Text>
                  )}
                </Text>
              </View>
            </View>

            <View style={styles.summaryContainer}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Subtotal</Text>
                <Text style={styles.summaryValue}>${totalPrice.toFixed(2)}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Delivery</Text>
                <Text style={styles.summaryValue}>Free</Text>
              </View>
              <View style={[styles.summaryRow, styles.summaryTotal]}>
                <Text style={styles.summaryLabelTotal}>Total</Text>
                <Text style={styles.summaryValueTotal}>${totalPrice.toFixed(2)}</Text>
              </View>
            </View>

            <View style={styles.actionsContainer}>
              <TouchableOpacity 
                style={[styles.actionButton, styles.primaryButton]} 
                onPress={() => {
                  setCartModalVisible(false);
                  router.push('/cart');
                }}
              >
                <Text style={styles.primaryButtonText}>View Cart</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.actionButton, styles.secondaryButton]} 
                onPress={() => setCartModalVisible(false)}
              >
                <Text style={styles.secondaryButtonText}>Continue Shopping</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: 48, // Account for status bar on iOS
  },
  backButton: {
    padding: 8,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    padding: 8,
    marginLeft: 8,
  },
  productDetails: {
    padding: 16,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  priceRatingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  priceContainer: {
    flexDirection: 'column',
  },
  productPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E8B57', // Forest green
  },
  totalPriceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  totalPriceLabel: {
    fontSize: 16,
    color: '#555',
  },
  totalPriceValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E8B57',
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 14,
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonDisabled: {
    opacity: 0.5,
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantityText: {
    marginHorizontal: 16,
    fontSize: 16,
    fontWeight: '500',
  },
  descriptionText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333333',
  },
  farmingDetailsList: {
    marginTop: 8,
  },
  farmingDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  bulletPoint: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#2E8B57',
    marginRight: 8,
  },
  farmingDetailText: {
    fontSize: 16,
    color: '#333333',
  },
  addToCartContainer: {
    padding: 16,
    paddingBottom: 32,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    backgroundColor: '#FFFFFF',
  },
  addToCartButton: {
    backgroundColor: '#2E8B57',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
  },
  addToCartText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    padding: 5,
  },
  productContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  productInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  modalProductName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  quantityInfoText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 4,
  },
  priceInfoText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2E8B57',
  },
  unitPriceText: {
    fontWeight: 'normal',
    fontSize: 14,
    color: '#666',
  },
  summaryContainer: {
    marginBottom: 20,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  summaryLabel: {
    fontSize: 16,
    color: '#555',
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '500',
  },
  summaryTotal: {
    borderTopWidth: 1,
    borderTopColor: '#EEE',
    paddingTop: 10,
    marginTop: 5,
  },
  summaryLabelTotal: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  summaryValueTotal: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E8B57',
  },
  actionsContainer: {
    marginTop: 10,
  },
  actionButton: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  primaryButton: {
    backgroundColor: '#2E8B57',
  },
  primaryButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  secondaryButton: {
    backgroundColor: '#F0F0F0',
  },
  secondaryButtonText: {
    color: '#333',
    fontWeight: '500',
    fontSize: 16,
  },
});

export default ProductDetailScreen;