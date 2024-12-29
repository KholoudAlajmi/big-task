import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TextInput,
  TouchableOpacity, 
  Image,
  Alert 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useUser } from '../context/UserContext';

const COLORS = {
  background: '#1A1A2E',
  primary: '#6C63FF',
  secondary: '#30305C',
  text: '#FFFFFF',
  textSecondary: '#B5B5B5',
  card: '#252A4A',
};

export default function EditProfileScreen({ route, navigation }) {
  const { updateUser } = useUser();
  const { user: originalUser } = route.params;
  const [editedUser, setEditedUser] = useState({ ...originalUser });

  const handleImagePick = async () => {
    try {
      // Request permission first
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission needed', 'Please allow access to your photos');
        return;
      }

      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled && result.assets[0].uri) {
        const newImage = result.assets[0].uri;
        setEditedUser(prev => ({
          ...prev,
          image: newImage
        }));
      }
    } catch (error) {
      console.log('Error picking image:', error);
    }
  };

  const handleSave = () => {
    updateUser(editedUser);  // Use context updateUser
    navigation.goBack();
    Alert.alert('Success', 'Profile updated successfully');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <View style={styles.placeholderIcon} />
      </View>

      <View style={styles.content}>
        <TouchableOpacity style={styles.imageContainer} onPress={handleImagePick}>
          <Image 
            source={{ 
              uri: editedUser.image || 'https://randomuser.me/api/portraits/lego/1.jpg'
            }}
            style={styles.profileImage}
          />
          <View style={styles.imageOverlay}>
            <Ionicons name="camera" size={24} color={COLORS.text} />
          </View>
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          value={editedUser.fullName}
          onChangeText={(text) => setEditedUser(prev => ({ ...prev, fullName: text }))}
          placeholder="Full Name"
          placeholderTextColor={COLORS.textSecondary}
        />

        <TextInput
          style={styles.input}
          value={editedUser.email}
          onChangeText={(text) => setEditedUser(prev => ({ ...prev, email: text }))}
          placeholder="Email"
          placeholderTextColor={COLORS.textSecondary}
          keyboardType="email-address"
        />

        <TextInput
          style={styles.input}
          value={editedUser.phone}
          onChangeText={(text) => setEditedUser(prev => ({ ...prev, phone: text }))}
          placeholder="Phone"
          placeholderTextColor={COLORS.textSecondary}
          keyboardType="phone-pad"
        />

        <TextInput
          style={styles.input}
          value={editedUser.address}
          onChangeText={(text) => setEditedUser(prev => ({ ...prev, address: text }))}
          placeholder="Address"
          placeholderTextColor={COLORS.textSecondary}
        />

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  content: {
    flex: 1,
    padding: 20,
  },
  imageContainer: {
    alignSelf: 'center',
    marginVertical: 20,
    position: 'relative',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    backgroundColor: COLORS.card,
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    color: COLORS.text,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  saveButtonText: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: 'bold',
  },
  placeholderIcon: {
    width: 24,
  },
}); 