import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity, 
  Image, 
  ActivityIndicator,
  Modal,
  Alert 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getResturantItems, getItemDetails } from '../api/data';

const COLORS = {
  background: '#1A1A2E',
  primary: '#6C63FF',
  secondary: '#30305C',
  text: '#FFFFFF',
  textSecondary: '#B5B5B5',
  card: '#252A4A',
};

export default function MenuScreen({ route, navigation }) {
  const { restaurantId, restaurantName } = route.params;
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [itemDetails, setItemDetails] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);

  useEffect(() => {
    loadMenuItems();
  }, []);

  const loadMenuItems = async () => {
    try {
      const data = await getResturantItems(restaurantId);
      setMenuItems(data);
      setLoading(false);
    } catch (error) {
      console.error('Error loading menu items:', error);
      setLoading(false);
    }
  };

  const handleAddToCart = (item) => {
    setCartItems(prev => {
      const newCount = (prev[item._id] || 0) + 1;
      return { ...prev, [item._id]: newCount };
    });
  };

  const handleRemoveFromCart = (item) => {
    setCartItems(prev => {
      const newCount = Math.max((prev[item._id] || 0) - 1, 0);
      const newCart = { ...prev };
      if (newCount === 0) {
        delete newCart[item._id];
      } else {
        newCart[item._id] = newCount;
      }
      return newCart;
    });
  };

  const totalItems = Object.values(cartItems).reduce((sum, count) => sum + count, 0);

  const handleCartPress = () => {
    navigation.navigate('MainTabs', {
      screen: 'Cart',
      params: {
        cartItems: menuItems.filter(item => cartItems[item._id]),
        quantities: cartItems,
        restaurantName
      }
    });
  };

  const handleItemPress = async (item) => {
    setSelectedItem(item);
    setModalVisible(true);
    setLoadingDetails(true);
    
    try {
      const details = await getItemDetails(item._id);
      setItemDetails(details);
    } catch (error) {
      console.error('Error loading item details:', error);
      Alert.alert('Error', 'Failed to load item details');
    } finally {
      setLoadingDetails(false);
    }
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
        <Text style={styles.headerTitle}>{restaurantName}</Text>
        <TouchableOpacity 
          style={styles.cartButton}
          onPress={handleCartPress}
        >
          <Ionicons name="cart" size={24} color={COLORS.text} />
          {totalItems > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{totalItems}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {menuItems.length > 0 ? (
          menuItems.map((item) => (
            <TouchableOpacity 
              key={item._id}
              style={styles.menuItemCard}
              onPress={() => handleItemPress(item)}
            >
              <Image 
                source={{ uri: item.image }}
                style={styles.menuItemImage}
                resizeMode="cover"
              />
              <View style={styles.menuItemInfo}>
                <View style={styles.menuItemDetails}>
                  <Text style={styles.menuItemName}>{item.name}</Text>
                  <Text style={styles.menuItemDescription}>{item.description}</Text>
                  <Text style={styles.menuItemPrice}>${item.price}</Text>
                </View>
                <View style={styles.quantityContainer}>
                  {cartItems[item._id] > 0 && (
                    <>
                      <TouchableOpacity 
                        style={styles.quantityButton}
                        onPress={() => handleRemoveFromCart(item)}
                      >
                        <Ionicons name="remove" size={20} color={COLORS.text} />
                      </TouchableOpacity>
                      <Text style={styles.quantityText}>
                        {cartItems[item._id]}
                      </Text>
                    </>
                  )}
                  <TouchableOpacity 
                    style={styles.addButton}
                    onPress={() => handleAddToCart(item)}
                  >
                    <Ionicons name="add" size={20} color={COLORS.text} />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.noItems}>
            <Ionicons name="restaurant-outline" size={50} color={COLORS.textSecondary} />
            <Text style={styles.noItemsText}>No menu items available</Text>
          </View>
        )}
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {loadingDetails ? (
              <ActivityIndicator size="large" color={COLORS.primary} />
            ) : itemDetails ? (
              <>
                <TouchableOpacity 
                  style={styles.closeButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Ionicons name="close" size={24} color={COLORS.text} />
                </TouchableOpacity>

                <Image 
                  source={{ uri: itemDetails.image }}
                  style={styles.modalImage}
                  resizeMode="cover"
                />

                <View style={styles.modalInfo}>
                  <Text style={styles.modalTitle}>{itemDetails.name}</Text>
                  <Text style={styles.modalDescription}>{itemDetails.description}</Text>
                  
                  <View style={styles.modalDetails}>
                    <View style={styles.detailItem}>
                      <Ionicons name="cash-outline" size={20} color={COLORS.primary} />
                      <Text style={styles.detailText}>${itemDetails.price}</Text>
                    </View>
                    
                    <View style={styles.detailItem}>
                      <Ionicons name="time-outline" size={20} color={COLORS.primary} />
                      <Text style={styles.detailText}>15-20 mins</Text>
                    </View>
                  </View>

                  <View style={styles.modalActions}>
                    <View style={styles.quantityControls}>
                      {cartItems[itemDetails._id] > 0 && (
                        <>
                          <TouchableOpacity 
                            style={styles.quantityButton}
                            onPress={() => handleRemoveFromCart(itemDetails)}
                          >
                            <Ionicons name="remove" size={20} color={COLORS.text} />
                          </TouchableOpacity>
                          <Text style={styles.quantityText}>
                            {cartItems[itemDetails._id]}
                          </Text>
                        </>
                      )}
                      <TouchableOpacity 
                        style={styles.addButton}
                        onPress={() => handleAddToCart(itemDetails)}
                      >
                        <Ionicons name="add" size={20} color={COLORS.text} />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </>
            ) : (
              <Text style={styles.errorText}>Failed to load item details</Text>
            )}
          </View>
        </View>
      </Modal>
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
    flex: 1,
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  content: {
    flex: 1,
    padding: 15,
  },
  menuItemCard: {
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
  menuItemImage: {
    width: '100%',
    height: 150,
  },
  menuItemInfo: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuItemName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 5,
  },
  menuItemDescription: {
    fontSize: 14,
    color: COLORS.textSecondary,
    maxWidth: '80%',
  },
  menuItemPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginTop: 5,
  },
  noItems: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  noItemsText: {
    color: COLORS.textSecondary,
    fontSize: 16,
    marginTop: 10,
  },
  menuItemDetails: {
    flex: 1,
    marginRight: 10,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.secondary,
    borderRadius: 25,
    padding: 5,
  },
  quantityButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
   

  },
  addButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 10,

  },
  cartButton: {
    position: 'relative',
    padding: 8,
  },
  badge: {
    position: 'absolute',
    right: 0,
    top: 0,
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: COLORS.text,
    fontSize: 12,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: COLORS.background,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 20,
    maxHeight: '80%',
  },
  closeButton: {
    position: 'absolute',
    right: 20,
    top: 20,
    zIndex: 1,
    backgroundColor: COLORS.secondary,
    borderRadius: 20,
    padding: 5,
  },
  modalImage: {
    width: '100%',
    height: 200,
    borderRadius: 15,
  },
  modalInfo: {
    marginTop: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    color: COLORS.textSecondary,
    marginBottom: 20,
    lineHeight: 24,
  },
  modalDetails: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    color: COLORS.text,
    marginLeft: 5,
    fontSize: 16,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  errorText: {
    color: COLORS.text,
    textAlign: 'center',
    fontSize: 16,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    paddingBottom: 10,
  },
}); 