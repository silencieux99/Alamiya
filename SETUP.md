# Guide de configuration - Alamiya

## 🔧 Configuration Firebase

### 1. Créer un projet Firebase

1. Aller sur [Firebase Console](https://console.firebase.google.com)
2. Cliquer sur "Ajouter un projet"
3. Suivre les étapes de création
4. Activer **Authentication**, **Firestore Database** et **Cloud Messaging**

### 2. Configuration Android

1. Dans Firebase Console, aller dans **Paramètres du projet** > **Vos applications**
2. Cliquer sur **Ajouter une application** > **Android**
3. Renseigner :
   - Nom du package : `com.alamiya.app`
   - Télécharger `google-services.json`
4. Placer `google-services.json` dans `android/app/`

### 3. Configuration iOS

1. Dans Firebase Console, aller dans **Paramètres du projet** > **Vos applications**
2. Cliquer sur **Ajouter une application** > **iOS**
3. Renseigner :
   - ID du bundle : `com.alamiya.app`
   - Télécharger `GoogleService-Info.plist`
4. Placer `GoogleService-Info.plist` dans `ios/`

### 4. Activer les méthodes d'authentification

Dans Firebase Console > **Authentication** > **Méthodes de connexion** :
- ✅ Activer **Email/Password**
- ✅ Activer **Google** (configurer OAuth)
- ✅ Activer **Phone** (configurer reCAPTCHA)

### 5. Créer les collections Firestore

Les collections seront créées automatiquement lors de la première utilisation, mais vous pouvez créer les règles de sécurité :

**Règles Firestore** :
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Annonces
    match /annonces/{adId} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null && resource.data.userId == request.auth.uid;
    }
    
    // Utilisateurs
    match /utilisateurs/{userId} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Favoris
    match /favoris/{favoriteId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null && request.resource.data.userId == request.auth.uid;
      allow delete: if request.auth != null && resource.data.userId == request.auth.uid;
    }
  }
}
```

## 📦 Configuration Firebase Storage

### 1. Activer Firebase Storage

1. Dans [Firebase Console](https://console.firebase.google.com/project/alamiya-app-e033a), aller dans **Storage**
2. Cliquer sur **Commencer**
3. Choisir le mode :
   - **Mode production** : Règles de sécurité strictes (recommandé)
   - **Mode test** : Accès libre pendant 30 jours (pour développement)
4. Choisir une région (ex: `europe-west`)

### 2. Déployer les règles de sécurité

Les règles de sécurité sont déjà configurées dans `storage.rules`. Pour les déployer :

```bash
firebase deploy --only storage:rules
```

Les règles permettent :
- ✅ Lecture publique des images
- ✅ Écriture uniquement pour les utilisateurs authentifiés
- ✅ Limite de taille : 5MB pour annonces, 2MB pour avatars
- ✅ Types de fichiers : uniquement les images

## 🔐 Configuration Google Sign-In

### 1. Créer un projet OAuth

1. Aller sur [Google Cloud Console](https://console.cloud.google.com)
2. Créer un nouveau projet ou sélectionner un projet existant
3. Aller dans **APIs & Services** > **Credentials**
4. Cliquer sur **Create Credentials** > **OAuth client ID**
5. Choisir **Web application**
6. Récupérer le **Client ID**

### 2. Configurer dans l'application

Mettre à jour `src/services/authService.js` :
```javascript
GoogleSignin.configure({
  webClientId: 'VOTRE_CLIENT_ID.apps.googleusercontent.com',
});
```

## 📱 Configuration des notifications

### Android

Les notifications sont configurées automatiquement avec Firebase Cloud Messaging.

### iOS

1. Dans Firebase Console, aller dans **Cloud Messaging**
2. Télécharger le certificat APNs
3. L'uploader dans Firebase Console

## 🗂 Données supplémentaires

### Importer toutes les communes

Pour importer toutes les 1541 communes d'Algérie, vous pouvez :

1. Utiliser un dataset JSON depuis GitHub (ex: [algeria-cities](https://github.com/...))
2. Créer un script de seeding dans `src/data/seed.js`
3. Exécuter le script pour remplir Firestore

Exemple de structure :
```javascript
// src/data/seed.js
import { firestore } from '../firebase/config';
import communesData from './communes-full.json';

const seedCommunes = async () => {
  const batch = firestore().batch();
  communesData.forEach((commune, index) => {
    const ref = firestore().collection('communes').doc();
    batch.set(ref, commune);
    if ((index + 1) % 500 === 0) {
      batch.commit();
    }
  });
  await batch.commit();
};
```

## ✅ Checklist de configuration

- [ ] Projet Firebase créé
- [ ] `google-services.json` ajouté (Android)
- [ ] `GoogleService-Info.plist` ajouté (iOS)
- [ ] Authentication activée (Email, Google, Phone)
- [ ] Règles Firestore configurées
- [ ] Firebase Storage activé et règles déployées
- [ ] Google OAuth configuré
- [ ] Notifications configurées
- [ ] Assets (icônes, splash) ajoutés

## 🚀 Test de l'application

1. Lancer `npm start`
2. Tester l'authentification
3. Créer une annonce test
4. Vérifier l'upload d'images
5. Tester la recherche et les filtres

## 📞 Support

En cas de problème, vérifier :
- Les logs Firebase Console
- Les logs Expo
- La configuration des services externes

