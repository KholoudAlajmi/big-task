import React, { useState, useEffect } from 'react';
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
import { mockUsers } from '../api/userprofile';
import { useUser } from '../context/UserContext';

const COLORS = {
  background: '#1A1A2E',
  primary: '#6C63FF',
  secondary: '#30305C',
  text: '#FFFFFF',
  textSecondary: '#B5B5B5',
  card: '#252A4A',
};

export default function ProfileScreen({ navigation, route }) {
  const { user, logout, updateUser } = useUser();

  useEffect(() => {
    if (route.params?.updatedUser) {
      updateUser(route.params.updatedUser);
    }
  }, [route.params?.updatedUser]);

  if (!user) {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
    return null;
  }

  const handleLogout = () => {
    logout();
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  const handleDeleteOrder = (orderId) => {
    Alert.alert(
      "Delete Order",
      "Are you sure you want to delete this order?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          onPress: () => {
            const updatedOrders = user.orders.filter(order => order.id !== orderId);
            updateUser({ ...user, orders: updatedOrders });
            
            const userIndex = mockUsers.findIndex(u => u.id === user.id);
            if (userIndex !== -1) {
              mockUsers[userIndex] = { ...user, orders: updatedOrders };
            }
          },
          style: "destructive"
        }
      ]
    );
  };

  const ProfileSection = ({ icon, title, value }) => (
    <View style={styles.profileSection}>
      <Ionicons name={icon} size={24} color={COLORS.primary} />
      <View style={styles.sectionContent}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <Text style={styles.sectionValue}>{value}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Profile</Text>
        <TouchableOpacity 
          style={styles.editButton}
          onPress={() => navigation.navigate('EditProfile', { user })}
        >
          <Ionicons name="create-outline" size={24} color={COLORS.text} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.profileHeader}>
          <Image 
            source={{ uri: user.image }}
            style={styles.profileImage}
          />
          <Text style={styles.profileName}>{user.fullName}</Text>
          <Text style={styles.profileUsername}>@{user.username}</Text>
        </View>

        <View style={styles.infoCard}>
          <ProfileSection 
            icon="person-outline" 
            title="Full Name" 
            value={user.fullName}
          />
          <ProfileSection 
            icon="mail-outline" 
            title="Email" 
            value={user.email}
          />
          <ProfileSection 
            icon="call-outline" 
            title="Phone" 
            value={user.phone}
          />
          <ProfileSection 
            icon="location-outline" 
            title="Delivery Address" 
            value={user.address}
          />
        </View>

        <View style={styles.ordersSection}>
          <Text style={styles.sectionHeader}>Order History</Text>
          {user.orders.map((order) => (
            <View key={order.id} style={styles.orderCard}>
              <View style={styles.orderHeader}>
                <Text style={styles.orderRestaurant}>{order.restaurantName}</Text>
                <View style={styles.orderHeaderRight}>
                  <Text style={styles.orderDate}>{order.date}</Text>
                  <TouchableOpacity 
                    onPress={() => handleDeleteOrder(order.id)}
                    style={styles.deleteButton}
                  >
                    <Ionicons name="trash-outline" size={20} color={COLORS.primary} />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.orderItems}>
                {order.items.map((item, index) => (
                  <Text key={index} style={styles.orderItem}>
                    {item.quantity}x {item.name}
                  </Text>
                ))}
              </View>
              <View style={styles.orderFooter}>
                <Text style={styles.orderTotal}>Total: ${order.total.toFixed(2)}</Text>
              </View>
            </View>
          ))}
        </View>

        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Ionicons name="log-out-outline" size={24} color={COLORS.text} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: COLORS.secondary,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  editButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    padding: 15,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 5,
  },
  profileUsername: {
    fontSize: 16,
    color: COLORS.textSecondary,
  },
  infoCard: {
    backgroundColor: COLORS.card,
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.secondary,
  },
  sectionContent: {
    marginLeft: 15,
    flex: 1,
  },
  sectionTitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  sectionValue: {
    fontSize: 16,
    color: COLORS.text,
    marginTop: 2,
  },
  ordersSection: {
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 15,
  },
  orderCard: {
    backgroundColor: COLORS.card,
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  orderRestaurant: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  orderDate: {
    color: COLORS.textSecondary,
  },
  orderItems: {
    marginBottom: 10,
  },
  orderItem: {
    color: COLORS.textSecondary,
    marginBottom: 5,
  },
  orderFooter: {
    borderTopWidth: 1,
    borderTopColor: COLORS.secondary,
    paddingTop: 10,
    alignItems: 'flex-end',
  },
  orderTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.secondary,
    padding: 15,
    borderRadius: 10,
    marginBottom: 30,
  },
  logoutText: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  orderHeaderRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  deleteButton: {
    padding: 5,
  },
}); 