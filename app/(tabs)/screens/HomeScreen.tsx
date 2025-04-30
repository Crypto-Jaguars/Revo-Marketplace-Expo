"use client"

import React, { useState, useCallback } from "react"
import { View, StyleSheet, ScrollView, RefreshControl, ActivityIndicator, Text } from "react-native"
import { useNavigation, NavigationProp } from "@react-navigation/native"
import WelcomeBanner from "../../../components/home/WelcomeBanner"
import SearchBar from "../../../components/home/SearchBar"
import ProductsCarousel from "../../../components/home/ProductsCarousel"
import CategoriesRow from "../../../components/home/CategoriesRow"
import PromotionsRow from "../../../components/home/PromotionsRow"
import { Ionicons } from "@expo/vector-icons"

// Datos de ejemplo - En un caso real, estos vendrían de una API
const MOCK_PRODUCTS = [
  {
    id: "1",
    name: "Organic Apples 2",
    price: 2.99,
    imageUrl: "https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?q=80&w=300&auto=format",
    farm: "Green Valley Farm",
    currency: "USDC",
  },
  {
    id: "2",
    name: "Fresh Carrots",
    price: 1.99,
    imageUrl: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?q=80&w=300&auto=format",
  },
  {
    id: "3",
    name: "Whole Grain Bread",
    price: 3.99,
    imageUrl: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=300&auto=format",
    farm: "Bread & Co",
    currency: "USDC",
  },
]

const MOCK_CATEGORIES = [
  {
    id: "1",
    name: "Fruits",
    imageUrl: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?q=80&w=300&auto=format",
  },
  {
    id: "2",
    name: "Vegetables",
    imageUrl: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?q=80&w=300&auto=format",
  },
  {
    id: "3",
    name: "Grains",
    imageUrl: "https://images.unsplash.com/photo-1568254183919-78a4f43a2877?q=80&w=300&auto=format",
  },
  {
    id: "4",
    name: "Dairy",
    imageUrl: "https://images.unsplash.com/photo-1550583724-b2692b85b150?q=80&w=300&auto=format",
  },
]

const MOCK_PROMOTIONS = [
  {
    id: "1",
    title: "Seasonal Special",
    description: "Fresh local fruits. Fresh from farmers.",
    imageUrl: "https://images.unsplash.com/photo-1573246123716-6b1782bfc499?q=80&w=300&auto=format",
  },
  {
    id: "2",
    title: "Organic Week",
    description: "Special discounts on organic vegetables and fruits. Support sustainable farming.",
    imageUrl: "https://images.unsplash.com/photo-1574316071802-0d684efa7bf5?q=80&w=300&auto=format",
  },
]

type RootStackParamList = {
  Products: { categoryId?: string; categoryName?: string; searchTerm?: string; section?: string; promotionId?: string; promotionName?: string };
  ProductDetails: { productId: string; product: any };
};

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>()
  const [refreshing, setRefreshing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [featuredProducts, setFeaturedProducts] = useState(MOCK_PRODUCTS)
  const [topRatedProducts, setTopRatedProducts] = useState(MOCK_PRODUCTS)
  const [trendingProducts, setTrendingProducts] = useState(MOCK_PRODUCTS)
  const [categories, setCategories] = useState(MOCK_CATEGORIES)
  const [promotions, setPromotions] = useState(MOCK_PROMOTIONS)

  // Simular carga de datos
  const fetchData = useCallback(() => {
    setLoading(true)
    setError(null)

    // Simular una llamada a API
    setTimeout(() => {
      try {
        // En un caso real, aquí irían las llamadas a la API
        setFeaturedProducts(MOCK_PRODUCTS)
        setTopRatedProducts(MOCK_PRODUCTS)
        setTrendingProducts(MOCK_PRODUCTS)
        setCategories(MOCK_CATEGORIES)
        setPromotions(MOCK_PROMOTIONS)
        setLoading(false)
      } catch (err) {
        setError("Error loading data. Please try again.")
        setLoading(false)
      }
    }, 1500)
  }, [])

  // Cargar datos al iniciar
  React.useEffect(() => {
    fetchData()
  }, [fetchData])

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    fetchData()
    setTimeout(() => {
      setRefreshing(false)
    }, 1500)
  }, [fetchData])

  const handleSearch = (searchText: string) => {
    // Implementar lógica de búsqueda
    console.log("Buscando:", searchText)
    // Navegar a la pantalla de productos con el término de búsqueda
    navigation.navigate("Products", { searchTerm: searchText })
  }

  const handleProductPress = (product: any) => {
    // Navegar a la pantalla de detalles del producto
    navigation.navigate("ProductDetails", { productId: product.id, product })
  }

  const handleCategoryPress = (category: any) => {
    // Navegar a la pantalla de productos filtrada por categoría
    navigation.navigate("Products", { categoryId: category.id, categoryName: category.name })
  }

  const handlePromotionPress = (promotion: any) => {
    // Navegar a la pantalla de promoción o productos relacionados
    navigation.navigate("Products", { promotionId: promotion.id, promotionName: promotion.title })
  }

  const handleSeeAll = (section: string) => {
    // Navegar a la pantalla de productos con filtro según la sección
    navigation.navigate("Products", { section })
  }

  if (loading && !refreshing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    )
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <WelcomeBanner logoUrl="https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?q=80&w=300&auto=format" />
      <SearchBar onSearch={handleSearch} />

      {error ? (
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle-outline" size={24} color="#f44336" />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : (
        <>
          <ProductsCarousel
            title="Featured Products"
            products={featuredProducts}
            onProductPress={handleProductPress}
            onSeeAll={() => handleSeeAll("featured")}
          />

          <CategoriesRow
            categories={categories}
            onCategoryPress={handleCategoryPress}
            onSeeAll={() => handleSeeAll("categories")}
          />

          <ProductsCarousel
            title="Top Rated"
            products={topRatedProducts}
            onProductPress={handleProductPress}
            onSeeAll={() => handleSeeAll("topRated")}
            icon={<Ionicons name="star" size={20} color="#4CAF50" style={styles.sectionIcon} />}
          />

          <PromotionsRow
            promotions={promotions}
            onPromotionPress={handlePromotionPress}
            onSeeAll={() => handleSeeAll("promotions")}
          />

          <ProductsCarousel
            title="Trending Now"
            products={trendingProducts}
            onProductPress={handleProductPress}
            onSeeAll={() => handleSeeAll("trending")}
            icon={<Ionicons name="trending-up" size={20} color="#4CAF50" style={styles.sectionIcon} />}
          />
        </>
      )}

      <View style={styles.footer} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  errorContainer: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  errorText: {
    color: "#f44336",
    marginLeft: 10,
    fontSize: 16,
  },
  sectionIcon: {
    marginRight: 8,
  },
  footer: {
    height: 20,
  },
})

export default HomeScreen

