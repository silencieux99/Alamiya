import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { formatPrice, formatDate } from '../utils/helpers';
import { firestoreService } from '../services/firestoreService';
import { authService } from '../services/authService';

const { width } = Dimensions.get('window');

const AdDetailScreen = ({ route, navigation }) => {
  const { adId } = route.params;
  const [ad, setAd] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    loadAd();
  }, [adId]);

  const loadAd = async () => {
    setLoading(true);
    const result = await firestoreService.ads.getById(adId);
    if (result.success) {
      setAd(result.data);
      // Incrémenter les vues
      firestoreService.ads.incrementViews(adId);
      // Vérifier si favori
      const user = authService.getCurrentUser();
      if (user) {
        const favResult = await firestoreService.favorites.isFavorite(user.uid, adId);
        if (favResult.success) {
          setIsFavorite(favResult.isFavorite);
        }
      }
    }
    setLoading(false);
  };

  const toggleFavorite = async () => {
    const user = authService.getCurrentUser();
    if (!user) {
      Alert.alert('Connexion requise', 'Vous devez être connecté pour ajouter aux favoris.');
      navigation.navigate('Login');
      return;
    }

    if (isFavorite) {
      await firestoreService.favorites.remove(user.uid, adId);
      setIsFavorite(false);
    } else {
      await firestoreService.favorites.add(user.uid, adId);
      setIsFavorite(true);
    }
  };

  const callSeller = () => {
    if (ad?.phone) {
      Alert.alert('Appeler', `Voulez-vous appeler ${ad.phone}?`, [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Appeler', onPress: () => console.log('Call:', ad.phone) },
      ]);
    }
  };

  if (loading || !ad) {
    return (
      <View style={styles.loading}>
        <Text>Chargement...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Images */}
      {ad.images && ad.images.length > 0 && (
        <View style={styles.imageContainer}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(e) => {
              const index = Math.round(e.nativeEvent.contentOffset.x / width);
              setCurrentImageIndex(index);
            }}
          >
            {ad.images.map((uri, index) => (
              <Image key={index} source={{ uri }} style={styles.image} />
            ))}
          </ScrollView>
          <View style={styles.imageIndicator}>
            <Text style={styles.imageIndicatorText}>
              {currentImageIndex + 1} / {ad.images.length}
            </Text>
          </View>
        </View>
      )}

      {/* Content */}
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>{ad.title}</Text>
          <TouchableOpacity onPress={toggleFavorite}>
            <Ionicons
              name={isFavorite ? 'heart' : 'heart-outline'}
              size={24}
              color={isFavorite ? '#FF6B35' : '#333'}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.price}>{formatPrice(ad.price)}</Text>

        <View style={styles.meta}>
          <View style={styles.metaItem}>
            <Ionicons name="location-outline" size={16} color="#666" />
            <Text style={styles.metaText}>
              {ad.communeName || ad.wilayaName || 'Algérie'}
            </Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicons name="time-outline" size={16} color="#666" />
            <Text style={styles.metaText}>{formatDate(ad.createdAt)}</Text>
          </View>
          {ad.views && (
            <View style={styles.metaItem}>
              <Ionicons name="eye-outline" size={16} color="#666" />
              <Text style={styles.metaText}>{ad.views} vues</Text>
            </View>
          )}
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{ad.description || 'Aucune description'}</Text>
        </View>

        {/* Détails spécifiques */}
        {ad.category === 'vehicules' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Détails du véhicule</Text>
            {ad.brand && <Text style={styles.detail}>Marque: {ad.brand}</Text>}
            {ad.model && <Text style={styles.detail}>Modèle: {ad.model}</Text>}
            {ad.year && <Text style={styles.detail}>Année: {ad.year}</Text>}
            {ad.mileage && <Text style={styles.detail}>Kilométrage: {ad.mileage} km</Text>}
            {ad.fuelType && <Text style={styles.detail}>Carburant: {ad.fuelType}</Text>}
            {ad.transmission && <Text style={styles.detail}>Boîte: {ad.transmission}</Text>}
          </View>
        )}

        {ad.category === 'immobilier' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Détails du bien</Text>
            {ad.propertyType && <Text style={styles.detail}>Type: {ad.propertyType}</Text>}
            {ad.rooms && <Text style={styles.detail}>Pièces: {ad.rooms}</Text>}
            {ad.surface && <Text style={styles.detail}>Surface: {ad.surface} m²</Text>}
          </View>
        )}

        {/* Contact */}
        <View style={styles.contactSection}>
          <TouchableOpacity style={styles.callButton} onPress={callSeller}>
            <Ionicons name="call" size={20} color="#fff" />
            <Text style={styles.callButtonText}>Appeler</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.messageButton}>
            <Ionicons name="chatbubble-outline" size={20} color="#FF6B35" />
            <Text style={styles.messageButtonText}>Message</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    height: 300,
    position: 'relative',
  },
  image: {
    width,
    height: 300,
    resizeMode: 'cover',
  },
  imageIndicator: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  imageIndicatorText: {
    color: '#fff',
    fontSize: 12,
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  title: {
    flex: 1,
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 12,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6B35',
    marginBottom: 16,
  },
  meta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 24,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    marginBottom: 8,
  },
  metaText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  detail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  contactSection: {
    flexDirection: 'row',
    marginTop: 24,
    marginBottom: 32,
  },
  callButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF6B35',
    padding: 16,
    borderRadius: 8,
    marginRight: 8,
  },
  callButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  messageButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#FF6B35',
    padding: 16,
    borderRadius: 8,
  },
  messageButtonText: {
    color: '#FF6B35',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default AdDetailScreen;

