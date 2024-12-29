import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity, 
  Image,
  Alert 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const COLORS = {
  background: '#1A1A2E',
  primary: '#6C63FF',
  secondary: '#30305C',
  text: '#FFFFFF',
  textSecondary: '#B5B5B5',
  card: '#252A4A',
};

export default function CartScreen({ route }) {
  const [quantities, setQuantities] = useState(route.params?.quantities || {});
  const [cartItems, setCartItems] = useState(route.params?.cartItems || []);
  const { restaurantName = '' } = route.params || {};

  const handleIncreaseQuantity = (itemId) => {
    setQuantities(prev => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1
    }));
  };

  const handleDecreaseQuantity = (itemId) => {
    setQuantities(prev => {
      const newQuantity = Math.max((prev[itemId] || 0) - 1, 0);
      const newQuantities = { ...prev };
      
      if (newQuantity === 0) {
        delete newQuantities[itemId];
        // Also remove item from cartItems
        setCartItems(prev => prev.filter(item => item._id !== itemId));
      } else {
        newQuantities[itemId] = newQuantity;
      }
      
      return newQuantities;
    });
  };

  const handleDeleteItem = (itemId) => {
    Alert.alert(
      "Remove Item",
      "Are you sure you want to remove this item?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Remove",
          onPress: () => {
            setCartItems(prev => prev.filter(item => item._id !== itemId));
            setQuantities(prev => {
              const newQuantities = { ...prev };
              delete newQuantities[itemId];
              return newQuantities;
            });
          },
          style: "destructive"
        }
      ]
    );
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.price * (quantities[item._id] || 0));
    }, 0);
  };

  if (!cartItems.length) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>My Cart</Text>
        </View>
        <View style={styles.emptyCart}>
          <Ionicons name="cart-outline" size={64} color={COLORS.textSecondary} />
          <Text style={styles.emptyCartText}>Your cart is empty</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Cart</Text>
        {restaurantName && (
          <Text style={styles.restaurantName}>from {restaurantName}</Text>
        )}
      </View>

      <ScrollView style={styles.content}>
        {cartItems.map((item) => (
          <View key={item._id} style={styles.cartItem}>
            <Image 
              source={{ uri: item.image }}
              style={styles.itemImage}
              resizeMode="cover"
            />
            <View style={styles.itemInfo}>
              <View style={styles.itemHeader}>
                <Text style={styles.itemName}>{item.name}</Text>
                <TouchableOpacity
                  onPress={() => handleDeleteItem(item._id)}
                  style={styles.deleteButton}
                >
                  <Ionicons name="trash-outline" size={20} color={COLORS.primary} />
                </TouchableOpacity>
              </View>
              <Text style={styles.itemPrice}>${item.price}</Text>
              <View style={styles.quantityContainer}>
                <View style={styles.quantityControls}>
                  <TouchableOpacity 
                    style={styles.quantityButton}
                    onPress={() => handleDecreaseQuantity(item._id)}
                  >
                    <Ionicons name="remove" size={20} color={COLORS.text} />
                  </TouchableOpacity>
                  <Text style={styles.quantityText}>
                    {quantities[item._id]}
                  </Text>
                  <TouchableOpacity 
                    style={styles.quantityButton}
                    onPress={() => handleIncreaseQuantity(item._id)}
                  >
                    <Ionicons name="add" size={20} color={COLORS.text} />
                  </TouchableOpacity>
                </View>
                <Text style={styles.itemTotal}>
                  ${(item.price * quantities[item._id]).toFixed(2)}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Total:</Text>
          <Text style={styles.totalAmount}>${calculateTotal().toFixed(2)}</Text>
        </View>
        <TouchableOpacity style={styles.checkoutButton}>
          <Text style={styles.checkoutButtonText}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    padding: 20,
    backgroundColor: COLORS.secondary,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  content: {
    flex: 1,
  },
  emptyCart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,

  },
  emptyCartText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
    paddingTop: 10,
  },
  iconContainer: {
    backgroundColor: `${COLORS.primary}20`,
    padding: 20,
    borderRadius: 30,
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 10,
  },
  emptySubtitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
  },
  checkoutButton: {
    backgroundColor: COLORS.primary,
    margin: 20,
    padding: 20,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  checkoutText: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: 'bold',
  },
  priceTag: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 10,
  },
  price: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: 'bold',
  },
  cartItem: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.2)',
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  itemPrice: {
    fontSize: 16,
    color: COLORS.textSecondary,
  },
  quantityInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  quantityText: {
    fontSize: 16,
    color: COLORS.textSecondary,
  },
  itemTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  restaurantName: {
    fontSize: 16,
    color: COLORS.textSecondary,
    marginTop: 10,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deleteButton: {
    padding: 5,
  },
  quantityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  quantityControls: {
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
  quantityText: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
  itemTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  footer: {
    padding: 20,
    backgroundColor: COLORS.secondary,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  checkoutButton: {
    backgroundColor: COLORS.primary,
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: 'bold',
  },

}); 