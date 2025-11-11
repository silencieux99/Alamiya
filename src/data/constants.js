// Types de biens immobiliers
export const propertyTypes = [
  { id: 'appartement', name: 'Appartement' },
  { id: 'maison', name: 'Maison' },
  { id: 'villa', name: 'Villa' },
  { id: 'terrain', name: 'Terrain' },
  { id: 'local-commercial', name: 'Local commercial' },
  { id: 'bureau', name: 'Bureau' },
  { id: 'studio', name: 'Studio' },
  { id: 'duplex', name: 'Duplex' },
  { id: 'ferme', name: 'Ferme' }
];

// Types de contrats de travail
export const contractTypes = [
  { id: 'cdi', name: 'CDI' },
  { id: 'cdd', name: 'CDD' },
  { id: 'interim', name: 'Intérim' },
  { id: 'stage', name: 'Stage' },
  { id: 'freelance', name: 'Freelance' },
  { id: 'temps-partiel', name: 'Temps partiel' }
];

// Types de carburant
export const fuelTypes = [
  { id: 'essence', name: 'Essence' },
  { id: 'diesel', name: 'Diesel' },
  { id: 'gpl', name: 'GPL' },
  { id: 'electrique', name: 'Électrique' },
  { id: 'hybride', name: 'Hybride' }
];

// Types de boîte de vitesses
export const transmissionTypes = [
  { id: 'manuelle', name: 'Manuelle' },
  { id: 'automatique', name: 'Automatique' },
  { id: 'semi-automatique', name: 'Semi-automatique' }
];

// Formats de prix
export const formatPrice = (price) => {
  if (!price) return '0 DZD';
  return new Intl.NumberFormat('fr-DZ', {
    style: 'currency',
    currency: 'DZD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price).replace('DZD', 'DZD');
};

// Années pour les véhicules (de 1970 à aujourd'hui)
export const getYears = () => {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let year = currentYear; year >= 1970; year--) {
    years.push(year);
  }
  return years;
};

