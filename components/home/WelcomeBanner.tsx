import type React from "react"
import { View, Text, StyleSheet, Image } from "react-native"

interface WelcomeBannerProps {
  logoUrl: string
}

const WelcomeBanner: React.FC<WelcomeBannerProps> = ({ logoUrl }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: logoUrl }} style={styles.logo} resizeMode="cover" />
      <View style={styles.textContainer}>
        <Text style={styles.welcomeText}>Welcome to Revo Farmers</Text>
        <Text style={styles.subText}>Fresh products from local farmers</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 20,
    backgroundColor: "#ffffff",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
    backgroundColor: "#f0f0f0",
  },
  textContainer: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#222222",
  },
  subText: {
    fontSize: 14,
    color: "#666666",
    marginTop: 4,
  },
})

export default WelcomeBanner

