import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import { wilayas } from '../data/wilayas';
import { getCommunesByWilaya } from '../data/communes';
import { fuelTypes, transmissionTypes, propertyTypes, contractTypes } from '../data/constants';

const FilterModal = ({ visible, onClose, onApply, category, initialFilters = {} }) => {
  const [filters, setFilters] = useState(initialFilters);

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  const handleReset = () => {
    setFilters({});
    onApply({});
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <View style={styles.header}>
            <Text style={styles.title}>Filtres</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.content}>
            {/* Filtres généraux */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Localisation</Text>
              <View style={styles.pickerContainer}>
                <Text style={styles.label}>Wilaya</Text>
                <Picker
                  selectedValue={filters.wilayaId}
                  onValueChange={(value) => {
                    setFilters({ ...filters, wilayaId: value, communeId: null });
                  }}
                  style={styles.picker}
                >
                  <Picker.Item label="Toutes les wilayas" value={null} />
                  {wilayas.map((w) => (
                    <Picker.Item key={w.id} label={w.name} value={w.id} />
                  ))}
                </Picker>
              </View>

              {filters.wilayaId && (
                <View style={styles.pickerContainer}>
                  <Text style={styles.label}>Commune</Text>
                  <Picker
                    selectedValue={filters.communeId}
                    onValueChange={(value) => setFilters({ ...filters, communeId: value })}
                    style={styles.picker}
                  >
                    <Picker.Item label="Toutes les communes" value={null} />
                    {getCommunesByWilaya(filters.wilayaId).map((c) => (
                      <Picker.Item key={c.id} label={c.name} value={c.id} />
                    ))}
                  </Picker>
                </View>
              )}
            </View>

            {/* Prix */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Prix (DZD)</Text>
              <View style={styles.priceRow}>
                <View style={styles.priceInput}>
                  <Text style={styles.label}>Min</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="0"
                    keyboardType="numeric"
                    value={filters.priceMin?.toString()}
                    onChangeText={(text) =>
                      setFilters({ ...filters, priceMin: text ? parseInt(text) : null })
                    }
                  />
                </View>
                <View style={styles.priceInput}>
                  <Text style={styles.label}>Max</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Max"
                    keyboardType="numeric"
                    value={filters.priceMax?.toString()}
                    onChangeText={(text) =>
                      setFilters({ ...filters, priceMax: text ? parseInt(text) : null })
                    }
                  />
                </View>
              </View>
            </View>

            {/* Filtres spécifiques véhicules */}
            {category === 'vehicules' && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Véhicule</Text>
                <View style={styles.pickerContainer}>
                  <Text style={styles.label}>Carburant</Text>
                  <Picker
                    selectedValue={filters.fuelType}
                    onValueChange={(value) => setFilters({ ...filters, fuelType: value })}
                    style={styles.picker}
                  >
                    <Picker.Item label="Tous" value={null} />
                    {fuelTypes.map((f) => (
                      <Picker.Item key={f.id} label={f.name} value={f.id} />
                    ))}
                  </Picker>
                </View>
                <View style={styles.pickerContainer}>
                  <Text style={styles.label}>Boîte de vitesses</Text>
                  <Picker
                    selectedValue={filters.transmission}
                    onValueChange={(value) => setFilters({ ...filters, transmission: value })}
                    style={styles.picker}
                  >
                    <Picker.Item label="Tous" value={null} />
                    {transmissionTypes.map((t) => (
                      <Picker.Item key={t.id} label={t.name} value={t.id} />
                    ))}
                  </Picker>
                </View>
              </View>
            )}

            {/* Filtres spécifiques immobilier */}
            {category === 'immobilier' && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Immobilier</Text>
                <View style={styles.pickerContainer}>
                  <Text style={styles.label}>Type de bien</Text>
                  <Picker
                    selectedValue={filters.propertyType}
                    onValueChange={(value) => setFilters({ ...filters, propertyType: value })}
                    style={styles.picker}
                  >
                    <Picker.Item label="Tous" value={null} />
                    {propertyTypes.map((p) => (
                      <Picker.Item key={p.id} label={p.name} value={p.id} />
                    ))}
                  </Picker>
                </View>
              </View>
            )}

            {/* Filtres spécifiques emploi */}
            {category === 'emploi' && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Emploi</Text>
                <View style={styles.pickerContainer}>
                  <Text style={styles.label}>Type de contrat</Text>
                  <Picker
                    selectedValue={filters.contractType}
                    onValueChange={(value) => setFilters({ ...filters, contractType: value })}
                    style={styles.picker}
                  >
                    <Picker.Item label="Tous" value={null} />
                    {contractTypes.map((c) => (
                      <Picker.Item key={c.id} label={c.name} value={c.id} />
                    ))}
                  </Picker>
                </View>
              </View>
            )}
          </ScrollView>

          <View style={styles.footer}>
            <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
              <Text style={styles.resetText}>Réinitialiser</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
              <Text style={styles.applyText}>Appliquer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modal: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '90%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  content: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
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
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  priceInput: {
    flex: 1,
    marginRight: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#fff',
  },
  footer: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  resetButton: {
    flex: 1,
    padding: 14,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    marginRight: 8,
    alignItems: 'center',
  },
  resetText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  applyButton: {
    flex: 1,
    padding: 14,
    borderRadius: 8,
    backgroundColor: '#FF6B35',
    alignItems: 'center',
  },
  applyText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});

export default FilterModal;

