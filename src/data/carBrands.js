// Marques de voitures populaires en Algérie
export const carBrands = [
  { id: 'renault', name: 'Renault', models: ['Clio', 'Symbol', 'Logan', 'Sandero', 'Duster', 'Kadjar', 'Captur', 'Megane', 'Talisman'] },
  { id: 'peugeot', name: 'Peugeot', models: ['206', '207', '208', '301', '308', '408', '508', '2008', '3008', '5008'] },
  { id: 'citroen', name: 'Citroën', models: ['C3', 'C4', 'C5', 'Berlingo', 'C-Elysee'] },
  { id: 'dacia', name: 'Dacia', models: ['Logan', 'Sandero', 'Duster', 'Lodgy', 'Dokker'] },
  { id: 'hyundai', name: 'Hyundai', models: ['i10', 'i20', 'i30', 'Elantra', 'Sonata', 'Tucson', 'Santa Fe', 'ix35'] },
  { id: 'kia', name: 'Kia', models: ['Picanto', 'Rio', 'Ceed', 'Cerato', 'Optima', 'Sportage', 'Sorento'] },
  { id: 'toyota', name: 'Toyota', models: ['Yaris', 'Corolla', 'Camry', 'RAV4', 'Land Cruiser', 'Hilux', 'Auris'] },
  { id: 'nissan', name: 'Nissan', models: ['Micra', 'Sunny', 'Sentra', 'Altima', 'Qashqai', 'X-Trail', 'Patrol'] },
  { id: 'ford', name: 'Ford', models: ['Fiesta', 'Focus', 'Mondeo', 'EcoSport', 'Kuga', 'Edge', 'Ranger'] },
  { id: 'opel', name: 'Opel', models: ['Corsa', 'Astra', 'Insignia', 'Mokka', 'Crossland'] },
  { id: 'volkswagen', name: 'Volkswagen', models: ['Polo', 'Golf', 'Jetta', 'Passat', 'Tiguan', 'Touareg'] },
  { id: 'mercedes', name: 'Mercedes-Benz', models: ['Classe A', 'Classe B', 'Classe C', 'Classe E', 'Classe S', 'GLA', 'GLC', 'GLE'] },
  { id: 'bmw', name: 'BMW', models: ['Série 1', 'Série 3', 'Série 5', 'Série 7', 'X1', 'X3', 'X5'] },
  { id: 'audi', name: 'Audi', models: ['A3', 'A4', 'A5', 'A6', 'A8', 'Q3', 'Q5', 'Q7'] },
  { id: 'fiat', name: 'Fiat', models: ['Panda', 'Punto', 'Tipo', '500', 'Doblo'] },
  { id: 'seat', name: 'SEAT', models: ['Ibiza', 'Leon', 'Toledo', 'Ateca'] },
  { id: 'skoda', name: 'Škoda', models: ['Fabia', 'Octavia', 'Superb', 'Kodiaq'] },
  { id: 'chevrolet', name: 'Chevrolet', models: ['Spark', 'Aveo', 'Cruze', 'Malibu', 'Trax', 'Equinox'] },
  { id: 'suzuki', name: 'Suzuki', models: ['Swift', 'SX4', 'Vitara', 'Grand Vitara'] },
  { id: 'mazda', name: 'Mazda', models: ['Mazda2', 'Mazda3', 'Mazda6', 'CX-3', 'CX-5'] },
  { id: 'mitsubishi', name: 'Mitsubishi', models: ['Lancer', 'Outlander', 'Pajero', 'ASX'] },
  { id: 'honda', name: 'Honda', models: ['Civic', 'Accord', 'CR-V', 'HR-V'] }
];

export const getBrandById = (id) => {
  return carBrands.find(brand => brand.id === id);
};

export const getModelsByBrand = (brandId) => {
  const brand = getBrandById(brandId);
  return brand ? brand.models : [];
};

