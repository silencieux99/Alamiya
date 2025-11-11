# 🚀 Guide de démarrage rapide - Alamiya

## 📱 Aperçu de l'application

Il existe plusieurs façons de voir l'application en action :

### Option 1 : Expo Go (Recommandé - Le plus simple) ⭐

1. **Installer Expo Go sur votre téléphone** :
   - Android : [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)
   - iOS : [App Store](https://apps.apple.com/app/expo-go/id982107779)

2. **Lancer l'application** :
   ```bash
   npm start
   ```
   ou
   ```bash
   npx expo start
   ```

3. **Scanner le QR code** :
   - Android : Scanner avec l'app Expo Go
   - iOS : Scanner avec l'appareil photo (ouvre Expo Go automatiquement)

### Option 2 : Émulateur Android

1. **Installer Android Studio** et configurer un émulateur
2. **Lancer l'émulateur**
3. **Démarrer l'app** :
   ```bash
   npm run android
   ```
   ou
   ```bash
   npx expo start --android
   ```

### Option 3 : Simulateur iOS (Mac uniquement)

1. **Installer Xcode** depuis l'App Store
2. **Ouvrir le simulateur** :
   ```bash
   open -a Simulator
   ```
3. **Lancer l'app** :
   ```bash
   npm run ios
   ```
   ou
   ```bash
   npx expo start --ios
   ```

### Option 4 : Version Web (limité)

```bash
npm run web
```

⚠️ **Note** : Certaines fonctionnalités (notifications, caméra, etc.) ne fonctionnent pas sur le web.

## ⚙️ Configuration requise avant le premier lancement

### 1. Firebase (Optionnel pour tester l'UI)

Pour tester uniquement l'interface utilisateur, Firebase n'est pas obligatoire. Cependant, pour les fonctionnalités complètes :

- Créer un projet Firebase
- Configurer `google-services.json` (Android) et `GoogleService-Info.plist` (iOS)
- Voir `SETUP.md` pour les détails

### 2. Vercel Blob (Optionnel pour tester l'UI)

Pour tester l'upload d'images, configurer Vercel Blob dans `src/services/blobService.js`

## 🎯 Commandes utiles

```bash
# Démarrer en mode développement
npm start

# Démarrer avec tunnel (si réseau local ne fonctionne pas)
npx expo start --tunnel

# Nettoyer le cache
npx expo start -c

# Voir les logs
npx expo start --dev-client
```

## 🐛 Dépannage

### Problème de connexion réseau
- Utiliser `--tunnel` : `npx expo start --tunnel`
- Vérifier que le téléphone et l'ordinateur sont sur le même réseau WiFi

### Erreurs de dépendances
```bash
# Supprimer node_modules et réinstaller
rm -rf node_modules
npm install
```

### Erreurs Firebase
- Vérifier que les fichiers de configuration Firebase sont présents
- Vérifier les règles Firestore dans la console Firebase

## 📝 Notes importantes

- **Premier lancement** : L'application peut prendre quelques secondes à se charger
- **Mode développement** : Les erreurs s'affichent dans la console et sur l'appareil
- **Hot Reload** : Les modifications sont rechargées automatiquement

## 🎨 Fonctionnalités testables sans configuration

Même sans Firebase configuré, vous pouvez tester :
- ✅ Navigation entre les écrans
- ✅ Interface utilisateur
- ✅ Liste des catégories
- ✅ Filtres de recherche
- ✅ Formulaire de création d'annonce (sans sauvegarde)

Pour les fonctionnalités complètes (authentification, sauvegarde, etc.), configurez Firebase.

