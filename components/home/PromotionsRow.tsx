import type React from "react"
import { View, FlatList, StyleSheet } from "react-native"
import PromotionCard from "./PromotionCard"
import SectionHeader from "./SectionHeader"
import { Ionicons } from "@expo/vector-icons"

interface Promotion {
  id: string
  title: string
  description: string
  imageUrl: string
}

interface PromotionsRowProps {
  promotions: Promotion[]
  onPromotionPress: (promotion: Promotion) => void
  onSeeAll?: () => void
}

const PromotionsRow: React.FC<PromotionsRowProps> = ({ promotions, onPromotionPress, onSeeAll }) => {
  return (
    <View style={styles.container}>
      <SectionHeader
        title="Special Offers"
        onSeeAll={onSeeAll}
        icon={<Ionicons name="pricetag-outline" size={20} color="#4CAF50" style={styles.icon} />}
      />
      <FlatList
        data={promotions}
        renderItem={({ item }) => <PromotionCard promotion={item} onPress={onPromotionPress} />}
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
  icon: {
    marginRight: 8,
  },
})

export default PromotionsRow

