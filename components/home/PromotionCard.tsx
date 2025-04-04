import type React from "react"
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Dimensions } from "react-native"

interface Promotion {
  id: string
  title: string
  description: string
  imageUrl: string
}

interface PromotionCardProps {
  promotion: Promotion
  onPress: (promotion: Promotion) => void
}

const PromotionCard: React.FC<PromotionCardProps> = ({ promotion, onPress }) => {
  const cardWidth = Dimensions.get("window").width * 0.45

  return (
    <TouchableOpacity
      style={[styles.container, { width: cardWidth }]}
      onPress={() => onPress(promotion)}
      activeOpacity={0.8}
    >
      <ImageBackground
        source={{ uri: promotion.imageUrl }}
        style={styles.background}
        imageStyle={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <Text style={styles.title}>{promotion.title}</Text>
          <Text style={styles.description} numberOfLines={2}>
            {promotion.description}
          </Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 120,
    marginHorizontal: 8,
    borderRadius: 10,
    overflow: "hidden",
  },
  background: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "#f0f0f0",
  },
  backgroundImage: {
    borderRadius: 10,
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  description: {
    fontSize: 12,
    color: "white",
    marginTop: 4,
  },
})

export default PromotionCard

