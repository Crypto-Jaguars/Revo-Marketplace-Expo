import type React from "react"
import { View, FlatList, StyleSheet } from "react-native"
import ProductCard from "./ProductCard"
import SectionHeader from "./SectionHeader"

interface Product {
  id: string
  name: string
  price: number
  imageUrl: string
  farm?: string
  currency?: string
}

interface ProductsCarouselProps {
  title: string
  products: Product[]
  onProductPress: (product: Product) => void
  onSeeAll?: () => void
  icon?: React.ReactNode
  cardSize?: "small" | "medium" | "large"
}

const ProductsCarousel: React.FC<ProductsCarouselProps> = ({
  title,
  products,
  onProductPress,
  onSeeAll,
  icon,
  cardSize = "medium",
}) => {
  return (
    <View style={styles.container}>
      <SectionHeader title={title} onSeeAll={onSeeAll} icon={icon} />
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductCard product={item} onPress={onProductPress} size={cardSize} />}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        keyExtractor={(item) => item.id}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  listContent: {
    paddingHorizontal: 12,
    paddingBottom: 5,
  },
})

export default ProductsCarousel

