import type React from "react"
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from "react-native"

interface Product {
  id: string
  name: string
  price: number
  imageUrl: string
  farm?: string
  currency?: string
}

interface ProductCardProps {
  product: Product
  onPress: (product: Product) => void
  size?: "small" | "medium" | "large"
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onPress, size = "medium" }) => {
  const getCardWidth = () => {
    const screenWidth = Dimensions.get("window").width
    switch (size) {
      case "small":
        return screenWidth * 0.4
      case "large":
        return screenWidth * 0.8
      case "medium":
      default:
        return screenWidth * 0.6
    }
  }

  const cardWidth = getCardWidth()

  return (
    <TouchableOpacity
      style={[styles.container, { width: cardWidth }]}
      onPress={() => onPress(product)}
      activeOpacity={0.7}
    >
      <Image source={{ uri: product.imageUrl }} style={styles.image} resizeMode="cover" />
      <View style={styles.infoContainer}>
        <Text style={styles.name} numberOfLines={1}>
          {product.name}
        </Text>
        {product.farm && (
          <Text style={styles.farm} numberOfLines={1}>
            {product.farm}
          </Text>
        )}
        <Text style={styles.price}>
          ${product.price.toFixed(2)} {product.currency || ""}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 8,
    borderRadius: 8,
    backgroundColor: "white",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  image: {
    width: "100%",
    height: 150,
    backgroundColor: "#f0f0f0",
  },
  infoContainer: {
    padding: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#222",
  },
  farm: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4CAF50",
    marginTop: 4,
  },
})

export default ProductCard

