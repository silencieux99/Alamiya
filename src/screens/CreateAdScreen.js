import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { categories } from '../data/categories';
import { wilayas } from '../data/wilayas';
import { getCommunesByWilaya } from '../data/communes';
import { carBrands, getModelsByBrand } from '../data/carBrands';
import { propertyTypes, fuelTypes, transmissionTypes, getYears } from '../data/constants';
import ImagePicker from '../components/ImagePicker';
import { firestoreService } from '../services/firestoreService';
import { blobService } from '../services/blobService';
import { authService } from '../services/authService';

const CreateAdScreen = ({ navigation }) => {
  const user = authService.getCurrentUser();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  // Form data
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    subcategory: '',
    price: '',
    wilayaId: null,
    communeId: null,
    phone: '',
    images: [],
    // Véhicules
    brand: '',
    model: '',
    year: null,
    mileage: '',
    fuelType: '',
    transmission: '',
    // Immobilier
    propertyType: '',
    rooms: '',
    surface: '',
  });

  const selectedCategory = categories.find(c => c.id === formData.category);

  const handleSubmit = async () => {
    if (!user) {
      Alert.alert('Connexion requise', 'Vous devez être connecté pour publier une annonce.');
      navigation.navigate('Login');
      return;
    }

    // Validation
    if (!formData.title || !formData.category || !formData.price) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs obligatoires.');
      return;
    }

    setLoading(true);

    try {
      // Upload images
      let imageUrls = [];
      if (formData.images.length > 0) {
        const uploadResult = await blobService.uploadImages(formData.images);
        if (uploadResult.success) {
          imageUrls = uploadResult.urls;
        }
      }

      // Préparer les données
      const adData = {
        userId: user.uid,
        title: formData.title,
        description: formData.description,
        category: formData.category,
        subcategory: formData.subcategory,
        price: parseInt(formData.price),
        wilayaId: formData.wilayaId,
        communeId: formData.communeId,
        phone: formData.phone,
        images: imageUrls,
        ...(formData.category === 'vehicules' && {
          brand: formData.brand,
          model: formData.model,
          year: formData.year,
          mileage: formData.mileage ? parseInt(formData.mileage) : null,
          fuelType: formData.fuelType,
          transmission: formData.transmission,
        }),
        ...(formData.category === 'immobilier' && {
          propertyType: formData.propertyType,
          rooms: formData.rooms ? parseInt(formData.rooms) : null,
          surface: formData.surface ? parseInt(formData.surface) : null,
        }),
      };

      // Créer l'annonce
      const result = await firestoreService.ads.create(adData);
      if (result.success) {
        Alert.alert('Succès', 'Votre annonce a été publiée avec succès!', [
          { text: 'OK', onPress: () => navigation.goBack() },
        ]);
      } else {
        Alert.alert('Erreur', result.error);
      }
    } catch (error) {
      Alert.alert('Erreur', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Publier une annonce</Text>
      </View>

      {/* Step 1: Catégorie et informations de base */}
      {step === 1 && (
        <View style={styles.step}>
          <Text style={styles.stepTitle}>1. Catégorie</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={formData.category}
              onValueChange={(value) => setFormData({ ...formData, category: value, subcategory: '' })}
              style={styles.picker}
            >
              <Picker.Item label="Sélectionner une catégorie" value="" />
              {categories.map((cat) => (
                <Picker.Item key={cat.id} label={cat.name} value={cat.id} />
              ))}
            </Picker>
          </View>

          {selectedCategory && (
            <View style={styles.pickerContainer}>
              <Text style={styles.label}>Sous-catégorie</Text>
              <Picker
                selectedValue={formData.subcategory}
                onValueChange={(value) => setFormData({ ...formData, subcategory: value })}
                style={styles.picker}
              >
                <Picker.Item label="Sélectionner une sous-catégorie" value="" />
                {selectedCategory.subcategories.map((sub) => (
                  <Picker.Item key={sub.id} label={sub.name} value={sub.id} />
                ))}
              </Picker>
            </View>
          )}

          <Text style={styles.stepTitle}>2. Informations principales</Text>
          <TextInput
            style={styles.input}
            placeholder="Titre de l'annonce *"
            value={formData.title}
            onChangeText={(text) => setFormData({ ...formData, title: text })}
          />
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Description"
            value={formData.description}
            onChangeText={(text) => setFormData({ ...formData, description: text })}
            multiline
            numberOfLines={4}
          />
          <TextInput
            style={styles.input}
            placeholder="Prix (DZD) *"
            value={formData.price}
            onChangeText={(text) => setFormData({ ...formData, price: text })}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Téléphone *"
            value={formData.phone}
            onChangeText={(text) => setFormData({ ...formData, phone: text })}
            keyboardType="phone-pad"
          />

          <TouchableOpacity
            style={styles.nextButton}
            onPress={() => setStep(2)}
            disabled={!formData.category || !formData.title || !formData.price}
          >
            <Text style={styles.nextButtonText}>Suivant</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Step 2: Localisation et détails */}
      {step === 2 && (
        <View style={styles.step}>
          <Text style={styles.stepTitle}>3. Localisation</Text>
          <View style={styles.pickerContainer}>
            <Text style={styles.label}>Wilaya *</Text>
            <Picker
              selectedValue={formData.wilayaId}
              onValueChange={(value) => setFormData({ ...formData, wilayaId: value, communeId: null })}
              style={styles.picker}
            >
              <Picker.Item label="Sélectionner une wilaya" value={null} />
              {wilayas.map((w) => (
                <Picker.Item key={w.id} label={w.name} value={w.id} />
              ))}
            </Picker>
          </View>

          {formData.wilayaId && (
            <View style={styles.pickerContainer}>
              <Text style={styles.label}>Commune</Text>
              <Picker
                selectedValue={formData.communeId}
                onValueChange={(value) => setFormData({ ...formData, communeId: value })}
                style={styles.picker}
              >
                <Picker.Item label="Sélectionner une commune" value={null} />
                {getCommunesByWilaya(formData.wilayaId).map((c) => (
                  <Picker.Item key={c.id} label={c.name} value={c.id} />
                ))}
              </Picker>
            </View>
          )}

          {/* Détails spécifiques véhicules */}
          {formData.category === 'vehicules' && (
            <>
              <Text style={styles.stepTitle}>4. Détails du véhicule</Text>
              <View style={styles.pickerContainer}>
                <Text style={styles.label}>Marque</Text>
                <Picker
                  selectedValue={formData.brand}
                  onValueChange={(value) => setFormData({ ...formData, brand: value, model: '' })}
                  style={styles.picker}
                >
                  <Picker.Item label="Sélectionner une marque" value="" />
                  {carBrands.map((b) => (
                    <Picker.Item key={b.id} label={b.name} value={b.id} />
                  ))}
                </Picker>
              </View>

              {formData.brand && (
                <View style={styles.pickerContainer}>
                  <Text style={styles.label}>Modèle</Text>
                  <Picker
                    selectedValue={formData.model}
                    onValueChange={(value) => setFormData({ ...formData, model: value })}
                    style={styles.picker}
                  >
                    <Picker.Item label="Sélectionner un modèle" value="" />
                    {getModelsByBrand(formData.brand).map((m, i) => (
                      <Picker.Item key={i} label={m} value={m} />
                    ))}
                  </Picker>
                </View>
              )}

              <View style={styles.pickerContainer}>
                <Text style={styles.label}>Année</Text>
                <Picker
                  selectedValue={formData.year}
                  onValueChange={(value) => setFormData({ ...formData, year: value })}
                  style={styles.picker}
                >
                  <Picker.Item label="Sélectionner une année" value={null} />
                  {getYears().map((y) => (
                    <Picker.Item key={y} label={y.toString()} value={y} />
                  ))}
                </Picker>
              </View>

              <TextInput
                style={styles.input}
                placeholder="Kilométrage"
                value={formData.mileage}
                onChangeText={(text) => setFormData({ ...formData, mileage: text })}
                keyboardType="numeric"
              />

              <View style={styles.pickerContainer}>
                <Text style={styles.label}>Carburant</Text>
                <Picker
                  selectedValue={formData.fuelType}
                  onValueChange={(value) => setFormData({ ...formData, fuelType: value })}
                  style={styles.picker}
                >
                  <Picker.Item label="Sélectionner" value="" />
                  {fuelTypes.map((f) => (
                    <Picker.Item key={f.id} label={f.name} value={f.id} />
                  ))}
                </Picker>
              </View>

              <View style={styles.pickerContainer}>
                <Text style={styles.label}>Boîte de vitesses</Text>
                <Picker
                  selectedValue={formData.transmission}
                  onValueChange={(value) => setFormData({ ...formData, transmission: value })}
                  style={styles.picker}
                >
                  <Picker.Item label="Sélectionner" value="" />
                  {transmissionTypes.map((t) => (
                    <Picker.Item key={t.id} label={t.name} value={t.id} />
                  ))}
                </Picker>
              </View>
            </>
          )}

          {/* Détails spécifiques immobilier */}
          {formData.category === 'immobilier' && (
            <>
              <Text style={styles.stepTitle}>4. Détails du bien</Text>
              <View style={styles.pickerContainer}>
                <Text style={styles.label}>Type de bien</Text>
                <Picker
                  selectedValue={formData.propertyType}
                  onValueChange={(value) => setFormData({ ...formData, propertyType: value })}
                  style={styles.picker}
                >
                  <Picker.Item label="Sélectionner" value="" />
                  {propertyTypes.map((p) => (
                    <Picker.Item key={p.id} label={p.name} value={p.id} />
                  ))}
                </Picker>
              </View>

              <TextInput
                style={styles.input}
                placeholder="Nombre de pièces"
                value={formData.rooms}
                onChangeText={(text) => setFormData({ ...formData, rooms: text })}
                keyboardType="numeric"
              />

              <TextInput
                style={styles.input}
                placeholder="Surface (m²)"
                value={formData.surface}
                onChangeText={(text) => setFormData({ ...formData, surface: text })}
                keyboardType="numeric"
              />
            </>
          )}

          <Text style={styles.stepTitle}>5. Photos</Text>
          <ImagePicker
            images={formData.images}
            onImagesChange={(images) => setFormData({ ...formData, images })}
            maxImages={5}
          />

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.button, styles.backButton]}
              onPress={() => setStep(1)}
            >
              <Text style={styles.backButtonText}>Retour</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.submitButton]}
              onPress={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.submitButtonText}>Publier</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  step: {
    padding: 16,
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginTop: 16,
    marginBottom: 12,
  },
  pickerContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  picker: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  nextButton: {
    backgroundColor: '#FF6B35',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 24,
  },
  button: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  backButton: {
    backgroundColor: '#f5f5f5',
    marginRight: 8,
  },
  backButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },
  submitButton: {
    backgroundColor: '#FF6B35',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CreateAdScreen;

