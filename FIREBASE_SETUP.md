# 🔥 Configuration Firebase - Alamiya

## ✅ Configuration actuelle

Votre projet Firebase est configuré avec les identifiants suivants :
- **Project ID** : `alamiya-app-e033a`
- **Auth Domain** : `alamiya-app-e033a.firebaseapp.com`

## 📱 Configuration pour React Native

### 1. Télécharger les fichiers de configuration

Pour que React Native fonctionne avec Firebase, vous devez télécharger les fichiers de configuration natifs :

#### Android
1. Aller sur [Firebase Console](https://console.firebase.google.com)
2. Sélectionner le projet `alamiya-app-e033a`
3. Aller dans **Paramètres du projet** (⚙️) > **Vos applications**
4. Si l'app Android n'existe pas, cliquer sur **Ajouter une application** > **Android**
5. Package name : `com.alamiya.app`
6. Télécharger `google-services.json`
7. Placer le fichier dans : `android/app/google-services.json`

#### iOS
1. Dans Firebase Console, aller dans **Paramètres du projet** > **Vos applications**
2. Si l'app iOS n'existe pas, cliquer sur **Ajouter une application** > **iOS**
3. Bundle ID : `com.alamiya.app`
4. Télécharger `GoogleService-Info.plist`
5. Placer le fichier dans : `ios/GoogleService-Info.plist`

### 2. Activer les services Firebase

Dans la [Firebase Console](https://console.firebase.google.com/project/alamiya-app-e033a) :

#### Authentication
1. Aller dans **Authentication** > **Sign-in method**
2. Activer :
   - ✅ **Email/Password**
   - ✅ **Google** (configurer OAuth)
   - ✅ **Phone** (configurer reCAPTCHA)

#### Firestore Database
1. Aller dans **Firestore Database**
2. Créer la base de données en mode **Production** ou **Test**
3. Choisir une région (ex: `europe-west`)

#### Cloud Messaging
1. Aller dans **Cloud Messaging**
2. Pour iOS : Uploader le certificat APNs (si nécessaire)

### 3. Déployer les règles Firestore

```bash
# Se connecter à Firebase
firebase login

# Utiliser le projet
firebase use alamiya-app-e033a

# Déployer les règles
firebase deploy --only firestore:rules

# Déployer les index
firebase deploy --only firestore:indexes
```

### 4. Vérifier la configuration

Les fichiers suivants sont déjà configurés :
- ✅ `src/firebase/config.js` - Configuration avec vos clés
- ✅ `firebase.json` - Configuration Firebase CLI
- ✅ `firestore.rules` - Règles de sécurité Firestore
- ✅ `firestore.indexes.json` - Index Firestore
- ✅ `storage.rules` - Règles de sécurité Storage

## 🚀 Commandes utiles

```bash
# Se connecter à Firebase
firebase login

# Lister les projets
firebase projects:list

# Utiliser un projet
firebase use alamiya-app-e033a

# Déployer les règles Firestore
firebase deploy --only firestore:rules

# Déployer les index Firestore
firebase deploy --only firestore:indexes

# Déployer les règles Storage
firebase deploy --only storage:rules

# Lancer les émulateurs Firebase (pour tests locaux)
firebase emulators:start
```

## 📝 Notes importantes

- Les fichiers `google-services.json` et `GoogleService-Info.plist` sont **obligatoires** pour React Native
- Ces fichiers contiennent la configuration native et ne doivent **pas** être commités dans Git (déjà dans `.gitignore`)
- Pour le développement, vous pouvez utiliser les émulateurs Firebase localement

## 🔐 Sécurité

- Les règles Firestore sont configurées pour :
  - Lecture publique des annonces
  - Écriture réservée aux utilisateurs authentifiés
  - Modification/Suppression uniquement par le propriétaire

## 📚 Documentation

- [Firebase React Native](https://rnfirebase.io/)
- [Firebase Console](https://console.firebase.google.com/project/alamiya-app-e033a)

