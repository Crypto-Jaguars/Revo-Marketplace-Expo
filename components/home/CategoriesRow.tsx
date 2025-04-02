import type React from "react"
import { View, FlatList, StyleSheet } from "react-native"
import CategoryItem from "./CategoryItem"
import SectionHeader from "./SectionHeader"

interface Category {
  id: string
  name: string
  imageUrl: string
}

interface CategoriesRowProps {
  categories: Category[]
  onCategoryPress: (category: Category) => void
  onSeeAll?: () => void
}

const CategoriesRow: React.FC<CategoriesRowProps> = ({ categories, onCategoryPress, onSeeAll }) => {
  return (
    <View style={styles.container}>
      <SectionHeader title="Categories" onSeeAll={onSeeAll} />
      <FlatList
        data={categories}
        renderItem={({ item }) => <CategoryItem category={item} onPress={onCategoryPress} />}
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
    paddingHorizontal: 10,
    paddingBottom: 5,
  },
})

export default CategoriesRow

