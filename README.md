# Alamiya - Application d'annonces pour l'Algérie

Application mobile multiplateforme (iOS + Android) de type Leboncoin, adaptée au marché algérien.

## 🚀 Fonctionnalités

- ✅ **Gestion des utilisateurs** : Inscription, connexion (email, Google, téléphone)
- ✅ **Annonces** : Création, modification, suppression, recherche
- ✅ **Catégories** : 12 catégories principales avec sous-catégories
- ✅ **Recherche avancée** : Filtres par localisation, prix, catégorie, etc.
- ✅ **Géolocalisation** : 58 wilayas et 1541 communes d'Algérie
- ✅ **Véhicules** : Marques, modèles, filtres spécifiques (carburant, boîte, etc.)
- ✅ **Immobilier** : Types de biens, superficie, nombre de pièces
- ✅ **Favoris** : Sauvegarde des annonces favorites
- ✅ **Notifications** : Push notifications via Firebase Cloud Messaging
- ✅ **Images** : Upload vers Vercel Blob

## 🛠 Stack technique

- **Framework** : React Native (Expo)
- **Base de données** : Firebase Firestore
- **Authentification** : Firebase Auth
- **Stockage** : Vercel Blob
- **Notifications** : Firebase Cloud Messaging
- **Navigation** : React Navigation

## 📦 Installation

### Prérequis

- Node.js (v14 ou supérieur)
- npm ou yarn
- Expo CLI (`npm install -g expo-cli`)
- Compte Firebase
- Compte Vercel (pour Blob)

### Étapes

1. **Cloner le projet**
   ```bash
   git clone <repository-url>
   cd Alamiya
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Configurer Firebase**
   - Créer un projet Firebase sur [Firebase Console](https://console.firebase.google.com)
   - Récupérer les clés de configuration
   - Mettre à jour `src/firebase/config.js` avec vos clés

4. **Configurer Vercel Blob**
   - Créer un projet Vercel
   - Récupérer le token Blob
   - Mettre à jour `src/services/blobService.js` avec votre token

5. **Configurer Google Sign-In** (optionnel)
   - Ajouter votre `webClientId` dans `src/services/authService.js`

6. **Lancer l'application**
   ```bash
   npm start
   ```
   - Appuyer sur `a` pour Android
   - Appuyer sur `i` pour iOS
   - Scanner le QR code avec Expo Go

## 📁 Structure du projet

```
/src
  /screens          # Écrans de l'application
  /components       # Composants réutilisables
  /services         # Services (Firebase, Blob, etc.)
  /firebase         # Configuration Firebase
  /data             # Données statiques (wilayas, catégories, etc.)
  /utils            # Fonctions utilitaires
  /assets           # Images, icônes, etc.
```

## 🔥 Configuration Firebase

### Firestore Collections

- **annonces** : Toutes les annonces
- **utilisateurs** : Profils utilisateurs
- **favoris** : Annonces favorites

### Structure d'une annonce

```json
{
  "id": "annonce-id",
  "userId": "user-id",
  "title": "Titre de l'annonce",
  "description": "Description...",
  "category": "vehicules",
  "subcategory": "voitures",
  "price": 5000000,
  "wilayaId": 16,
  "communeId": 1601,
  "phone": "+213555123456",
  "images": ["https://..."],
  "createdAt": "timestamp",
  "updatedAt": "timestamp",
  "views": 0,
  "status": "active",
  // Spécifique véhicules
  "brand": "renault",
  "model": "Clio",
  "year": 2020,
  "mileage": 50000,
  "fuelType": "essence",
  "transmission": "manuelle",
  // Spécifique immobilier
  "propertyType": "appartement",
  "rooms": 3,
  "surface": 80
}
```

## 📱 Écrans

- **HomeScreen** : Accueil avec catégories et dernières annonces
- **CategoryScreen** : Liste des annonces par catégorie
- **AdDetailScreen** : Détails d'une annonce
- **CreateAdScreen** : Publication d'une nouvelle annonce
- **ProfileScreen** : Profil utilisateur, mes annonces, favoris
- **SearchScreen** : Recherche avancée avec filtres
- **LoginScreen** : Authentification

## 🎨 Design

- Couleur principale : `#FF6B35`
- Design moderne et responsive
- Composants réutilisables
- Navigation intuitive

## 📊 Données

### Catégories
- Véhicules (6 sous-catégories)
- Immobilier (5 sous-catégories)
- Emploi (3 sous-catégories)
- Services (6 sous-catégories)
- Mode & Beauté (4 sous-catégories)
- Électronique (5 sous-catégories)
- Maison & Jardin (5 sous-catégories)
- Loisirs (4 sous-catégories)
- Animaux (4 sous-catégories)
- Famille (3 sous-catégories)
- Matériel Professionnel (3 sous-catégories)
- Divers (1 sous-catégorie)

### Localisation
- 58 wilayas d'Algérie
- 1541 communes (exemples pour Alger, Oran, Constantine, Sétif)
- Pour une version complète, importer depuis un dataset JSON externe

### Véhicules
- 22 marques populaires
- Modèles associés à chaque marque
- Filtres : année, kilométrage, carburant, boîte de vitesses

## 🚀 Déploiement

### Android
```bash
expo build:android
```

### iOS
```bash
expo build:ios
```

## 📝 Notes

- Les prix sont en **Dinar Algérien (DZD)**
- Les données de communes sont limitées (exemples pour quelques wilayas)
- Pour une version complète, importer un dataset JSON avec toutes les communes
- ESLint désactivé comme demandé

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request.

## 📄 Licence

MIT

