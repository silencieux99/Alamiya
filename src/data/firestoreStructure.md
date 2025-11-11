# Structure Firestore - Alamiya

## Collection: `annonces`

### Structure d'un document

```javascript
{
  // Identifiants
  id: string,                    // ID du document (généré automatiquement)
  userId: string,                 // ID de l'utilisateur propriétaire
  
  // Informations principales
  title: string,                  // Titre de l'annonce
  description: string,           // Description détaillée
  category: string,              // ID de la catégorie (ex: "vehicules")
  subcategory: string,           // ID de la sous-catégorie (ex: "voitures")
  price: number,                 // Prix en DZD
  currency: "DZD",               // Devise (toujours DZD)
  
  // Localisation
  wilayaId: number,              // ID de la wilaya (1-58)
  wilayaName: string,            // Nom de la wilaya (pour recherche)
  communeId: number,            // ID de la commune
  communeName: string,           // Nom de la commune (pour recherche)
  
  // Contact
  phone: string,                 // Numéro de téléphone (format: +213...)
  email: string,                // Email (optionnel)
  
  // Médias
  images: string[],              // URLs des images (Vercel Blob)
  
  // Métadonnées
  createdAt: Timestamp,         // Date de création
  updatedAt: Timestamp,         // Date de dernière modification
  views: number,                // Nombre de vues
  status: "active" | "sold" | "deleted",  // Statut de l'annonce
  
  // Champs spécifiques véhicules
  brand?: string,                // Marque (ex: "renault")
  model?: string,                // Modèle (ex: "Clio")
  year?: number,                 // Année (ex: 2020)
  mileage?: number,              // Kilométrage
  fuelType?: string,             // Type de carburant (ex: "essence")
  transmission?: string,         // Boîte de vitesses (ex: "manuelle")
  
  // Champs spécifiques immobilier
  propertyType?: string,        // Type de bien (ex: "appartement")
  rooms?: number,               // Nombre de pièces
  surface?: number,             // Surface en m²
  
  // Champs spécifiques emploi
  contractType?: string,        // Type de contrat (ex: "cdi")
  sector?: string,              // Secteur d'activité
  salary?: number,              // Salaire
}
```

### Index Firestore recommandés

```javascript
// Pour la recherche par catégorie et prix
category (Ascending) + price (Ascending)
category (Ascending) + createdAt (Descending)

// Pour la recherche par localisation
wilayaId (Ascending) + price (Ascending)
communeId (Ascending) + createdAt (Descending)

// Pour la recherche par utilisateur
userId (Ascending) + createdAt (Descending)
```

## Collection: `utilisateurs`

### Structure d'un document

```javascript
{
  id: string,                    // ID du document = userId Firebase Auth
  email: string,                 // Email de l'utilisateur
  name: string,                  // Nom complet
  phone: string,                 // Numéro de téléphone
  avatar: string,                // URL de l'avatar (optionnel)
  createdAt: Timestamp,          // Date de création du compte
  updatedAt: Timestamp,          // Date de dernière modification
  fcmToken: string,              // Token FCM pour les notifications
}
```

## Collection: `favoris`

### Structure d'un document

```javascript
{
  id: string,                    // ID du document (généré automatiquement)
  userId: string,                // ID de l'utilisateur
  adId: string,                  // ID de l'annonce
  createdAt: Timestamp,          // Date d'ajout aux favoris
}
```

### Index Firestore recommandés

```javascript
// Pour récupérer les favoris d'un utilisateur
userId (Ascending) + createdAt (Descending)
```

## Collection: `communes` (optionnel - pour cache)

### Structure d'un document

```javascript
{
  id: number,                    // ID de la commune
  name: string,                  // Nom de la commune
  wilayaId: number,              // ID de la wilaya parente
  wilayaName: string,            // Nom de la wilaya
}
```

## Règles de sécurité Firestore

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Fonction helper pour vérifier l'authentification
    function isAuthenticated() {
      return request.auth != null;
    }
    
    // Fonction helper pour vérifier le propriétaire
    function isOwner(userId) {
      return isAuthenticated() && request.auth.uid == userId;
    }
    
    // Annonces
    match /annonces/{adId} {
      // Lecture publique
      allow read: if true;
      
      // Création : utilisateur authentifié
      allow create: if isAuthenticated() 
        && request.resource.data.userId == request.auth.uid;
      
      // Modification/Suppression : propriétaire uniquement
      allow update, delete: if isOwner(resource.data.userId);
    }
    
    // Utilisateurs
    match /utilisateurs/{userId} {
      // Lecture : publique
      allow read: if true;
      
      // Écriture : propriétaire uniquement
      allow write: if isOwner(userId);
    }
    
    // Favoris
    match /favoris/{favoriteId} {
      // Lecture : utilisateur authentifié (ses propres favoris)
      allow read: if isAuthenticated() 
        && resource.data.userId == request.auth.uid;
      
      // Création : utilisateur authentifié
      allow create: if isAuthenticated() 
        && request.resource.data.userId == request.auth.uid;
      
      // Suppression : propriétaire uniquement
      allow delete: if isOwner(resource.data.userId);
    }
    
    // Communes (lecture seule)
    match /communes/{communeId} {
      allow read: if true;
      allow write: if false;
    }
  }
}
```

## Exemples de requêtes

### Récupérer les annonces d'une catégorie
```javascript
firestore()
  .collection('annonces')
  .where('category', '==', 'vehicules')
  .where('status', '==', 'active')
  .orderBy('createdAt', 'desc')
  .limit(20)
  .get();
```

### Rechercher par prix
```javascript
firestore()
  .collection('annonces')
  .where('category', '==', 'vehicules')
  .where('price', '>=', 1000000)
  .where('price', '<=', 5000000)
  .orderBy('price', 'asc')
  .get();
```

### Rechercher par localisation
```javascript
firestore()
  .collection('annonces')
  .where('wilayaId', '==', 16)
  .where('status', '==', 'active')
  .orderBy('createdAt', 'desc')
  .get();
```

