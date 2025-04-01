import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  Image, 
  Dimensions 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '@/theme/theme-context';
import { Product } from '@/store/useProductsStore';
import useCartStore from '@/store/useCartStore';

interface ProductGridProps {
  products: Product[];
  onEndReached?: () => void;
  refreshControl?: React.ReactElement;
  ListFooterComponent?: React.ReactElement;
}

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  onEndReached,
  refreshControl,
  ListFooterComponent,
}) => {
  const { colors } = useTheme();
  const router = useRouter();
  const { addToCart, addToWishlist, isInWishlist } = useCartStore();

  const screenWidth = Dimensions.get('window').width;
  const itemWidth = (screenWidth - 48) / 2; // 2 columns with 16px padding on each side and 16px between

  const handleProductPress = (product: Product) => {
    router.push(`/product/${product.id}`);
  };

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
    });
  };

  const handleToggleWishlist = (product: Product) => {
    addToWishlist({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
  };

  const renderItem = ({ item }: { item: Product }) => {
    const isWishlisted = isInWishlist(item.id);
    
    return (
      <TouchableOpacity
        style={[
          styles.gridItem,
          { 
            width: itemWidth,
            // Cambiado de colors.card a colors.background
            backgroundColor: colors.background,
            borderColor: colors.border,
          }
        ]}
        onPress={() => handleProductPress(item)}
        activeOpacity={0.7}
      >
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: item.image }}
            style={styles.image}
            resizeMode="cover"
          />
          <TouchableOpacity
            style={[styles.wishlistButton, { backgroundColor: colors.background }]}
            onPress={() => handleToggleWishlist(item)}
          >
            <Ionicons
              name={isWishlisted ? 'heart' : 'heart-outline'}
              size={18}
              color={isWishlisted ? colors.danger : colors.text}
            />
          </TouchableOpacity>
        </View>
        
        <View style={styles.infoContainer}>
          <Text style={[styles.category, { color: colors.primary }]}>
            {item.category}
          </Text>
          <Text 
            style={[styles.name, { color: colors.text }]}
            numberOfLines={1}
          >
            {item.name}
          </Text>
          <Text style={[styles.farmingMethod, { color: colors.text + '80' }]}>
            {item.farmingMethod}
          </Text>
          
          <View style={styles.priceRow}>
            <Text style={[styles.price, { color: colors.text }]}>
              ${item.price.toFixed(2)}
            </Text>
            <TouchableOpacity
              style={[styles.addButton, { backgroundColor: colors.primary }]}
              onPress={() => handleAddToCart(item)}
            >
              <Ionicons name="add" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={products}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      numColumns={2}
      contentContainerStyle={styles.container}
      columnWrapperStyle={styles.columnWrapper}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      refreshControl={refreshControl}
      ListFooterComponent={ListFooterComponent}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  gridItem: {
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    elevation: 2, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  imageContainer: {
    position: 'relative',
    height: 140,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  wishlistButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  infoContainer: {
    padding: 12,
  },
  category: {
    fontSize: 12,
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  farmingMethod: {
    fontSize: 12,
    marginBottom: 8,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
  },
  addButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProductGrid;