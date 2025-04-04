import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, Dimensions, Pressable } from 'react-native';

interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
}

interface FeaturedCarouselProps {
  products: Product[];
  onProductPress: (product: Product) => void;
}

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width * 0.7;

const FeaturedCarousel: React.FC<FeaturedCarouselProps> = ({ products, onProductPress }) => {
  const renderItem = ({ item }: { item: Product }) => (
    <Pressable 
      style={styles.itemContainer}
      onPress={() => onProductPress(item)}
    >
      <Image source={{ uri: item.imageUrl }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>${item.price.toFixed(2)}</Text>
      </View>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Productos Destacados</Text>
      <FlatList
        data={products}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={ITEM_WIDTH + 20}
        decelerationRate="fast"
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 15,
    marginBottom: 10,
  },
  listContent: {
    paddingHorizontal: 10,
  },
  itemContainer: {
    width: ITEM_WIDTH,
    marginHorizontal: 10,
    borderRadius: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  infoContainer: {
    padding: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
  },
  price: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
});

export default FeaturedCarousel; 