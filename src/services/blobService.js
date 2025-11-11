import { put } from '@vercel/blob';

// Configuration Vercel Blob
const BLOB_TOKEN = 'YOUR_VERCEL_BLOB_TOKEN'; // À remplacer

export const blobService = {
  // Upload une image
  uploadImage: async (imageUri, filename) => {
    try {
      const response = await fetch(imageUri);
      const blob = await response.blob();

      const { url } = await put(filename, blob, {
        access: 'public',
        token: BLOB_TOKEN
      });

      return { success: true, url };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Upload plusieurs images
  uploadImages: async (imageUris, folder = 'ads') => {
    try {
      const uploadPromises = imageUris.map((uri, index) => {
        const filename = `${folder}/${Date.now()}-${index}.jpg`;
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

  // Supprimer une image (si nécessaire)
  deleteImage: async (url) => {
    // Vercel Blob ne fournit pas de méthode de suppression directe via l'API publique
    // Cette fonctionnalité nécessiterait une route API backend
    console.warn('Suppression d\'image non implémentée directement');
    return { success: false, error: 'Non implémenté' };
  }
};

