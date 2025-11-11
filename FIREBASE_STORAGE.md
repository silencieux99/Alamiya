# 📦 Firebase Storage - Configuration

## ✅ Migration de Vercel Blob vers Firebase Storage

L'application utilise maintenant **Firebase Storage** au lieu de Vercel Blob pour le stockage des images.

## 🔧 Configuration

### 1. Activer Firebase Storage

1. Aller sur [Firebase Console](https://console.firebase.google.com/project/alamiya-app-e033a)
2. Aller dans **Storage**
3. Cliquer sur **Commencer**
4. Choisir le mode :
   - **Mode production** : Règles de sécurité strictes
   - **Mode test** : Accès libre pendant 30 jours (pour développement)
5. Choisir une région (ex: `europe-west`)

### 2. Déployer les règles de sécurité

Les règles de sécurité sont déjà configurées dans `storage.rules` :

```bash
# Se connecter à Firebase
firebase login

# Utiliser le projet
firebase use alamiya-app-e033a

# Déployer les règles Storage
firebase deploy --only storage:rules
```

### 3. Structure des dossiers

Les images sont organisées comme suit dans Firebase Storage :

```
/ads/
  └── [timestamp]-[index].jpg    # Images d'annonces

/avatars/
  └── [userId]/
      └── [filename].jpg         # Avatars utilisateurs
```

## 📝 Règles de sécurité

Les règles actuelles permettent :

- **Lecture publique** : Toutes les images peuvent être lues
- **Écriture authentifiée** : Seuls les utilisateurs connectés peuvent uploader
- **Limites de taille** :
  - Images d'annonces : Max 5MB
  - Avatars : Max 2MB
- **Types de fichiers** : Uniquement les images (`image/*`)

## 🚀 Utilisation dans le code

Le service `blobService` a été mis à jour pour utiliser Firebase Storage :

```javascript
import { blobService } from '../services/blobService';

// Upload une image
const result = await blobService.uploadImage(imageUri, 'ads/image.jpg');
if (result.success) {
  console.log('URL:', result.url);
}

// Upload plusieurs images
const results = await blobService.uploadImages([uri1, uri2, uri3], 'ads');
if (results.success) {
  console.log('URLs:', results.urls);
}

// Supprimer une image
await blobService.deleteImage(imageUrl);
```

## 🔍 Vérification

Pour vérifier que tout fonctionne :

1. **Tester l'upload** : Créer une annonce avec des images
2. **Vérifier dans Firebase Console** : Aller dans Storage pour voir les fichiers uploadés
3. **Vérifier les URLs** : Les URLs doivent être au format Firebase Storage

## 📊 Avantages de Firebase Storage

- ✅ Intégration native avec Firebase
- ✅ Pas besoin de service externe (Vercel)
- ✅ Règles de sécurité flexibles
- ✅ Gestion automatique des URLs
- ✅ Suppression de fichiers possible
- ✅ Gratuit jusqu'à 5GB de stockage

## 🐛 Dépannage

### Erreur "Permission denied"
- Vérifier que les règles Storage sont déployées
- Vérifier que l'utilisateur est authentifié

### Erreur "File too large"
- Vérifier la taille du fichier (max 5MB pour annonces, 2MB pour avatars)
- Compresser l'image avant upload si nécessaire

### Images ne s'affichent pas
- Vérifier que les règles permettent la lecture publique
- Vérifier que l'URL est correcte

## 📚 Documentation

- [Firebase Storage React Native](https://rnfirebase.io/storage/usage)
- [Firebase Storage Rules](https://firebase.google.com/docs/storage/security)

