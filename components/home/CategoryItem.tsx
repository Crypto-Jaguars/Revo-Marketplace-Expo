import type React from "react"
import { Text, StyleSheet, Image, TouchableOpacity } from "react-native"

interface Category {
  id: string
  name: string
  imageUrl: string
}

interface CategoryItemProps {
  category: Category
  onPress: (category: Category) => void
}

const CategoryItem: React.FC<CategoryItemProps> = ({ category, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress(category)} activeOpacity={0.7}>
      <Image source={{ uri: category.imageUrl }} style={styles.image} resizeMode="cover" />
      <Text style={styles.name}>{category.name}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginHorizontal: 10,
    width: 80,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 8,
    backgroundColor: "#f0f0f0",
  },
  name: {
    fontSize: 14,
    textAlign: "center",
    color: "#333",
  },
})

export default CategoryItem

