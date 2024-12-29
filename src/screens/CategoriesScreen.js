import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, ActivityIndicator, Image, TextInput } from 'react-native';
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

export default function CategoriesScreen({ navigation }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const data = await getAllCategories();
      setCategories(data);
      setLoading(false);
    } catch (error) {
      console.log('Error loading categories:', error);
      setLoading(false);
    }
  };

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleSearch = () => {
    setIsSearching(!isSearching);
    if (!isSearching) {
      setSearchQuery('');
    }
  };

  const handleCategoryPress = (category) => {
    console.log('Selected category:', category);
    navigation.navigate('RestaurantDetails', {
      categoryId: category._id,
      categoryName: category.name
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
        {isSearching ? (
          <View style={styles.searchContainer}>
            <Ionicons name="search-outline" size={20} color={COLORS.textSecondary} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search categories..."
              placeholderTextColor={COLORS.textSecondary}
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoFocus
              selectionColor={COLORS.primary}
              color={COLORS.text}
            />
            <TouchableOpacity onPress={toggleSearch}>
              <Ionicons name="close" size={20} color={COLORS.textSecondary} />
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <Text style={styles.headerTitle}>Categories</Text>
            <TouchableOpacity style={styles.searchButton} onPress={toggleSearch}>
              <Ionicons name="search-outline" size={24} color={COLORS.text} />
            </TouchableOpacity>
          </>
        )}
      </View>
      <ScrollView style={styles.content}>
        <View style={styles.gridContainer}>
          {filteredCategories.map((category) => (
            <TouchableOpacity 
              key={category._id} 
              style={styles.card}
              onPress={() => handleCategoryPress(category)}
            >
              <Image 
                source={{ uri: category.image }} 
                style={styles.categoryImage}
                resizeMode="cover"
              />
              <Text style={styles.cardTitle}>{category.name}</Text>
              <Text style={styles.cardSubtitle}>View Restaurants</Text>
            </TouchableOpacity>
          ))}
        </View>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: COLORS.secondary,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    elevation: 8,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  searchButton: {
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 12,
  },
  content: {
    flex: 1,
    padding: 15,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  card: {
    width: '45%',
    backgroundColor: COLORS.card,
    padding: 10,
    borderRadius: 15,
    marginBottom: 12,
    elevation: 5,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    alignItems: 'center',
  },
  categoryImage: {
    width: '100%',
    height: 90,
    borderRadius: 10,
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 4,
    textAlign: 'center',
  },
  cardSubtitle: {
    fontSize: 12,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 40,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: COLORS.text,
  },
}); 