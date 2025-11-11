import { firestore } from '../firebase/config';
import firestoreLib from '@react-native-firebase/firestore';

export const firestoreService = {
  // Collection: annonces
  ads: {
    // Créer une annonce
    create: async (adData) => {
      try {
        const docRef = await firestore().collection('annonces').add({
          ...adData,
          createdAt: firestoreLib.FieldValue.serverTimestamp(),
          updatedAt: firestoreLib.FieldValue.serverTimestamp(),
          views: 0,
          status: 'active'
        });
        return { success: true, id: docRef.id };
      } catch (error) {
        return { success: false, error: error.message };
      }
    },

    // Mettre à jour une annonce
    update: async (adId, adData) => {
      try {
        await firestore().collection('annonces').doc(adId).update({
          ...adData,
          updatedAt: firestoreLib.FieldValue.serverTimestamp()
        });
        return { success: true };
      } catch (error) {
        return { success: false, error: error.message };
      }
    },

    // Supprimer une annonce
    delete: async (adId) => {
      try {
        await firestore().collection('annonces').doc(adId).delete();
        return { success: true };
      } catch (error) {
        return { success: false, error: error.message };
      }
    },

    // Obtenir une annonce par ID
    getById: async (adId) => {
      try {
        const doc = await firestore().collection('annonces').doc(adId).get();
        if (doc.exists) {
          return { success: true, data: { id: doc.id, ...doc.data() } };
        }
        return { success: false, error: 'Annonce non trouvée' };
      } catch (error) {
        return { success: false, error: error.message };
      }
    },

    // Rechercher des annonces avec filtres
    search: async (filters = {}, limit = 20, lastDoc = null) => {
      try {
        let query = firestore().collection('annonces').where('status', '==', 'active');

        // Appliquer les filtres
        if (filters.category) {
          query = query.where('category', '==', filters.category);
        }
        if (filters.subcategory) {
          query = query.where('subcategory', '==', filters.subcategory);
        }
        if (filters.wilayaId) {
          query = query.where('wilayaId', '==', filters.wilayaId);
        }
        if (filters.communeId) {
          query = query.where('communeId', '==', filters.communeId);
        }
        if (filters.priceMin) {
          query = query.where('price', '>=', filters.priceMin);
        }
        if (filters.priceMax) {
          query = query.where('price', '<=', filters.priceMax);
        }

        // Filtres spécifiques véhicules
        if (filters.brand) {
          query = query.where('brand', '==', filters.brand);
        }
        if (filters.model) {
          query = query.where('model', '==', filters.model);
        }
        if (filters.yearMin) {
          query = query.where('year', '>=', filters.yearMin);
        }
        if (filters.yearMax) {
          query = query.where('year', '<=', filters.yearMax);
        }

        // Filtres spécifiques immobilier
        if (filters.propertyType) {
          query = query.where('propertyType', '==', filters.propertyType);
        }
        if (filters.rooms) {
          query = query.where('rooms', '==', filters.rooms);
        }
        if (filters.surfaceMin) {
          query = query.where('surface', '>=', filters.surfaceMin);
        }

        // Tri
        if (filters.sortBy === 'price-asc') {
          query = query.orderBy('price', 'asc');
        } else if (filters.sortBy === 'price-desc') {
          query = query.orderBy('price', 'desc');
        } else {
          query = query.orderBy('createdAt', 'desc');
        }

        // Pagination
        if (lastDoc) {
          query = query.startAfter(lastDoc);
        }
        query = query.limit(limit);

        const snapshot = await query.get();
        const ads = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        return {
          success: true,
          data: ads,
          lastDoc: snapshot.docs[snapshot.docs.length - 1] || null
        };
      } catch (error) {
        return { success: false, error: error.message };
      }
    },

    // Recherche par mot-clé
    searchByKeyword: async (keyword, limit = 20) => {
      try {
        const snapshot = await firestore()
          .collection('annonces')
          .where('status', '==', 'active')
          .where('title', '>=', keyword)
          .where('title', '<=', keyword + '\uf8ff')
          .limit(limit)
          .get();

        const ads = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        return { success: true, data: ads };
      } catch (error) {
        return { success: false, error: error.message };
      }
    },

    // Obtenir les annonces d'un utilisateur
    getByUserId: async (userId) => {
      try {
        const snapshot = await firestore()
          .collection('annonces')
          .where('userId', '==', userId)
          .orderBy('createdAt', 'desc')
          .get();

        const ads = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        return { success: true, data: ads };
      } catch (error) {
        return { success: false, error: error.message };
      }
    },

    // Incrémenter les vues
    incrementViews: async (adId) => {
      try {
        await firestore().collection('annonces').doc(adId).update({
          views: firestoreLib.FieldValue.increment(1)
        });
        return { success: true };
      } catch (error) {
        return { success: false, error: error.message };
      }
    }
  },

  // Collection: utilisateurs
  users: {
    // Créer ou mettre à jour un utilisateur
    createOrUpdate: async (userId, userData) => {
      try {
        await firestore().collection('utilisateurs').doc(userId).set({
          ...userData,
          updatedAt: firestoreLib.FieldValue.serverTimestamp()
        }, { merge: true });
        return { success: true };
      } catch (error) {
        return { success: false, error: error.message };
      }
    },

    // Obtenir un utilisateur
    getById: async (userId) => {
      try {
        const doc = await firestore().collection('utilisateurs').doc(userId).get();
        if (doc.exists) {
          return { success: true, data: { id: doc.id, ...doc.data() } };
        }
        return { success: false, error: 'Utilisateur non trouvé' };
      } catch (error) {
        return { success: false, error: error.message };
      }
    }
  },

  // Collection: favoris
  favorites: {
    // Ajouter aux favoris
    add: async (userId, adId) => {
      try {
        await firestore().collection('favoris').add({
          userId,
          adId,
          createdAt: firestoreLib.FieldValue.serverTimestamp()
        });
        return { success: true };
      } catch (error) {
        return { success: false, error: error.message };
      }
    },

    // Retirer des favoris
    remove: async (userId, adId) => {
      try {
        const snapshot = await firestore()
          .collection('favoris')
          .where('userId', '==', userId)
          .where('adId', '==', adId)
          .get();

        const batch = firestore().batch();
        snapshot.docs.forEach(doc => batch.delete(doc.ref));
        await batch.commit();

        return { success: true };
      } catch (error) {
        return { success: false, error: error.message };
      }
    },

    // Vérifier si favori
    isFavorite: async (userId, adId) => {
      try {
        const snapshot = await firestore()
          .collection('favoris')
          .where('userId', '==', userId)
          .where('adId', '==', adId)
          .limit(1)
          .get();

        return { success: true, isFavorite: !snapshot.empty };
      } catch (error) {
        return { success: false, error: error.message };
      }
    },

    // Obtenir tous les favoris d'un utilisateur
    getByUserId: async (userId) => {
      try {
        const snapshot = await firestore()
          .collection('favoris')
          .where('userId', '==', userId)
          .orderBy('createdAt', 'desc')
          .get();

        const favorites = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        return { success: true, data: favorites };
      } catch (error) {
        return { success: false, error: error.message };
      }
    }
  }
};

