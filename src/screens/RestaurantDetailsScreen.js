import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity, 
  Image, 
  ActivityIndicator 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getAllCategories } from '../api/data';

const COLORS = {
  background: '#1A1A2E',
  primary: '#6C63FF',
  secondary: '#30305C',
  text: '#FFFFFF',
  textSecondary: '#B5B5B5',
  card: '#252A4A',
};

export default function RestaurantDetailsScreen({ route, navigation }) {
  const { categoryId, categoryName } = route.params;
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRestaurants();
  }, []);

  const loadRestaurants = async () => {
    try {
      console.log('Loading restaurants for category:', categoryId);
      const categories = await getAllCategories();
      const selectedCategory = categories.find(cat => cat._id === categoryId);
      console.log('Selected category:', selectedCategory);
      
      if (selectedCategory && selectedCategory.restaurants) {
        setRestaurants(selectedCategory.restaurants);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error loading restaurants:', error);
      setLoading(false);
    }
  };

  const handleRestaurantPress = (restaurant) => {
    navigation.navigate('Menu', {
      restaurantId: restaurant._id,
      restaurantName: restaurant.name
    });
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{categoryName}</Text>
      </View>

      <ScrollView style={styles.content}>
        {restaurants.length > 0 ? (
          restaurants.map((restaurant) => (
            <TouchableOpacity 
              key={restaurant._id}
              style={styles.restaurantCard}
              onPress={() => handleRestaurantPress(restaurant)}
            >
              <Image 
                source={{ uri: restaurant.image }}
                style={styles.restaurantImage}
                resizeMode="cover"
              />
              <View style={styles.restaurantInfo}>
                <View>
                  <Text style={styles.restaurantName}>{restaurant.name}</Text>
                  <Text style={styles.deliveryTime}>{restaurant.deliveryTime}</Text>
                </View>
                <View style={styles.ratingContainer}>
                  <Ionicons name="star" size={16} color="#FFD700" />
                  <Text style={styles.rating}>{restaurant.rating}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.noRestaurants}>
            <Ionicons name="restaurant-outline" size={50} color={COLORS.textSecondary} />
            <Text style={styles.noRestaurantsText}>No restaurants found in this category</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: COLORS.secondary,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  backButton: {
    marginRight: 15,
    padding: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  content: {
    flex: 1,
    padding: 15,
  },
  restaurantCard: {
    backgroundColor: COLORS.card,
    borderRadius: 15,
    marginBottom: 15,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  restaurantImage: {
    width: '100%',
    height: 180,
  },
  restaurantInfo: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 5,
  },
  deliveryTime: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.secondary,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  rating: {
    marginLeft: 5,
    color: COLORS.text,
    fontSize: 14,
    fontWeight: 'bold',
  },
  noRestaurants: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  noRestaurantsText: {
    color: COLORS.textSecondary,
    fontSize: 16,
    marginTop: 10,
  },
}); 