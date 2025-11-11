export const categories = [
  {
    id: 'vehicules',
    name: 'Véhicules',
    icon: 'car',
    subcategories: [
      { id: 'voitures', name: 'Voitures' },
      { id: 'motos', name: 'Motos' },
      { id: 'utilitaires', name: 'Utilitaires' },
      { id: 'caravaning', name: 'Caravaning' },
      { id: 'equipements-auto', name: 'Équipements auto' },
      { id: 'pieces-auto', name: 'Pièces auto' }
    ]
  },
  {
    id: 'immobilier',
    name: 'Immobilier',
    icon: 'home',
    subcategories: [
      { id: 'vente', name: 'Vente' },
      { id: 'location', name: 'Location' },
      { id: 'colocation', name: 'Colocation' },
      { id: 'commerces', name: 'Commerces' },
      { id: 'bureaux', name: 'Bureaux' }
    ]
  },
  {
    id: 'emploi',
    name: 'Emploi',
    icon: 'briefcase',
    subcategories: [
      { id: 'offres', name: 'Offres d\'emploi' },
      { id: 'formations', name: 'Formations' },
      { id: 'cv', name: 'CV' }
    ]
  },
  {
    id: 'services',
    name: 'Services',
    icon: 'build',
    subcategories: [
      { id: 'demenagement', name: 'Déménagement' },
      { id: 'cours', name: 'Cours particuliers' },
      { id: 'reparations', name: 'Réparations' },
      { id: 'jardinage', name: 'Jardinage' },
      { id: 'menage', name: 'Ménage' },
      { id: 'bricolage', name: 'Bricolage' }
    ]
  },
  {
    id: 'mode',
    name: 'Mode & Beauté',
    icon: 'shirt',
    subcategories: [
      { id: 'vetements', name: 'Vêtements' },
      { id: 'chaussures', name: 'Chaussures' },
      { id: 'accessoires', name: 'Accessoires' },
      { id: 'beaute', name: 'Beauté & Parfums' }
    ]
  },
  {
    id: 'electronique',
    name: 'Électronique',
    icon: 'phone-portrait',
    subcategories: [
      { id: 'telephones', name: 'Téléphones' },
      { id: 'ordinateurs', name: 'Ordinateurs' },
      { id: 'tablettes', name: 'Tablettes' },
      { id: 'photo-video', name: 'Photo & Vidéo' },
      { id: 'audio', name: 'Audio & Hi-Fi' }
    ]
  },
  {
    id: 'maison-jardin',
    name: 'Maison & Jardin',
    icon: 'home',
    subcategories: [
      { id: 'ameublement', name: 'Ameublement' },
      { id: 'electromenager', name: 'Électroménager' },
      { id: 'decoration', name: 'Décoration' },
      { id: 'jardin', name: 'Jardin' },
      { id: 'bricolage', name: 'Bricolage' }
    ]
  },
  {
    id: 'loisirs',
    name: 'Loisirs',
    icon: 'game-controller',
    subcategories: [
      { id: 'livres', name: 'Livres' },
      { id: 'jeux-video', name: 'Jeux vidéo' },
      { id: 'instruments', name: 'Instruments de musique' },
      { id: 'sports', name: 'Sports & Hobbies' }
    ]
  },
  {
    id: 'animaux',
    name: 'Animaux',
    icon: 'paw',
    subcategories: [
      { id: 'chiens', name: 'Chiens' },
      { id: 'chats', name: 'Chats' },
      { id: 'oiseaux', name: 'Oiseaux' },
      { id: 'accessoires-animaux', name: 'Accessoires' }
    ]
  },
  {
    id: 'famille',
    name: 'Famille',
    icon: 'people',
    subcategories: [
      { id: 'puériculture', name: 'Puériculture' },
      { id: 'jouets', name: 'Jouets' },
      { id: 'vetements-enfants', name: 'Vêtements enfants' }
    ]
  },
  {
    id: 'materiel-pro',
    name: 'Matériel Professionnel',
    icon: 'construct',
    subcategories: [
      { id: 'outillage', name: 'Outillage' },
      { id: 'materiel-agricole', name: 'Matériel agricole' },
      { id: 'transport-manutention', name: 'Transport & Manutention' }
    ]
  },
  {
    id: 'divers',
    name: 'Divers',
    icon: 'apps',
    subcategories: [
      { id: 'autres', name: 'Autres' }
    ]
  }
];

export const getCategoryById = (id) => {
  return categories.find(cat => cat.id === id);
};

export const getSubcategoryById = (categoryId, subcategoryId) => {
  const category = getCategoryById(categoryId);
  return category?.subcategories.find(sub => sub.id === subcategoryId);
};

