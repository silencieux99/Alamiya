import storage from '@react-native-firebase/storage';

// Service de stockage Firebase Storage
export const blobService = {
  // Upload une image
  uploadImage: async (imageUri, filename) => {
    try {
      // Créer une référence dans Firebase Storage
      const reference = storage().ref(filename);
      
      // Pour React Native, utiliser putFile directement avec l'URI locale
      // Firebase Storage gère automatiquement la conversion
      const task = reference.putFile(imageUri);
      
      // Attendre la fin de l'upload
      await task;
      
      // Obtenir l'URL de téléchargement publique
      const url = await reference.getDownloadURL();

      return { success: true, url };
    } catch (error) {
      console.error('Erreur upload image:', error);
      return { success: false, error: error.message };
    }
  },

  // Upload plusieurs images
  uploadImages: async (imageUris, folder = 'ads') => {
    try {
      const uploadPromises = imageUris.map((uri, index) => {
        const timestamp = Date.now();
        const filename = `${folder}/${timestamp}-${index}.jpg`;
        return blobService.uploadImage(uri, filename);
      });

      const results = await Promise.all(uploadPromises);
      const successful = results.filter(r => r.success);
      const failed = results.filter(r => !r.success);

      return {
        success: successful.length > 0,
        urls: successful.map(r => r.url),
        errors: failed.map(r => r.error)
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Supprimer une image
  deleteImage: async (url) => {
    try {
      // Extraire le chemin depuis l'URL Firebase Storage
      // Format URL: https://firebasestorage.googleapis.com/v0/b/[bucket]/o/[path]?alt=media&token=[token]
      const urlObj = new URL(url);
      const path = decodeURIComponent(urlObj.pathname.split('/o/')[1]?.split('?')[0] || '');
      
      if (!path) {
        return { success: false, error: 'URL invalide' };
      }

      // Supprimer le fichier
      const reference = storage().ref(path);
      await reference.delete();

      return { success: true };
    } catch (error) {
      console.error('Erreur suppression image:', error);
      return { success: false, error: error.message };
    }
  },

  // Obtenir l'URL d'une image (si déjà uploadée)
  getImageUrl: async (path) => {
    try {
      const reference = storage().ref(path);
      const url = await reference.getDownloadURL();
      return { success: true, url };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
};

