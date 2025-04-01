import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '@/theme/theme-context';
import { Product } from '@/store/useProductsStore';
import useCartStore from '@/store/useCartStore';

interface ProductListProps {
  products: Product[];
  onEndReached?: () => void;
  refreshControl?: React.ReactElement;
  ListFooterComponent?: React.ReactElement;
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  onEndReached,
  refreshControl,
  ListFooterComponent,
}) => {
  const { colors } = useTheme();
  const router = useRouter();
  const { addToCart, addToWishlist, isInWishlist } = useCartStore();

  const handleProductPress = (product: Product) => {
    router.push(`/product/${product.id}`);
  };

  const handleAddToCart = (product: Product, event: any) => {
    // Stop propagation to prevent navigation
    event.stopPropagation();
    
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
    });
  };

  const handleToggleWishlist = (product: Product, event: any) => {
    // Stop propagation to prevent navigation
    event.stopPropagation();
    
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
          styles.listItem,
          { 
            backgroundColor: colors.background, // Cambiado de colors.card a colors.background
            borderColor: colors.border 
          }
        ]}
        onPress={() => handleProductPress(item)}
        activeOpacity={0.7}
      >
        <Image
          source={{ uri: item.image }}
          style={styles.image}
          resizeMode="cover"
        />
        
        <View style={styles.infoContainer}>
          <View style={styles.nameContainer}>
            <Text style={[styles.category, { color: colors.primary }]}>
              {item.category}
            </Text>
            <Text style={[styles.name, { color: colors.text }]}>
              {item.name}
            </Text>
            <Text style={[styles.farmingMethod, { color: colors.text + '80' }]}>
              {item.farmingMethod}
            </Text>
          </View>
          
          <View style={styles.priceContainer}>
            <Text style={[styles.price, { color: colors.text }]}>
              ${item.price.toFixed(2)}
            </Text>
            
            <View style={styles.actionsContainer}>
              <TouchableOpacity
                style={[
                  styles.actionButton,
                  { backgroundColor: colors.background }
                ]}
                onPress={(event) => handleToggleWishlist(item, event)}
              >
                <Ionicons
                  name={isWishlisted ? 'heart' : 'heart-outline'}
                  size={20}
                  color={isWishlisted ? colors.danger : colors.text}
                />
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[
                  styles.actionButton,
                  { backgroundColor: colors.primary }
                ]}
                onPress={(event) => handleAddToCart(item, event)}
              >
                <Ionicons name="cart-outline" size={20} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        
        {item.availableQuantity <= 0 && (
          <View style={[styles.outOfStockBadge, { backgroundColor: colors.danger }]}>
            <Text style={styles.outOfStockText}>Out of Stock</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={products}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.container}
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
  listItem: {
    flexDirection: 'row',
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    overflow: 'hidden',
    elevation: 2, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    position: 'relative',
  },
  image: {
    width: 100,
    height: 100,
  },
  infoContainer: {
    flex: 1,
    padding: 12,
    flexDirection: 'row',
  },
  nameContainer: {
    flex: 1,
    marginRight: 8,
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
    marginBottom: 4,
  },
  priceContainer: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
  },
  actionsContainer: {
    flexDirection: 'row',
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  outOfStockBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  outOfStockText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '600',
  },
});

export default ProductList;