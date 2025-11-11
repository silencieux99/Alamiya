import { auth } from '../firebase/config';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

// Configurer Google Sign-In
GoogleSignin.configure({
  webClientId: 'YOUR_WEB_CLIENT_ID', // À remplacer
});

export const authService = {
  // Inscription avec email
  signUpWithEmail: async (email, password) => {
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);
      return { success: true, user: userCredential.user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Connexion avec email
  signInWithEmail: async (email, password) => {
    try {
      const userCredential = await auth().signInWithEmailAndPassword(email, password);
      return { success: true, user: userCredential.user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Connexion avec Google
  signInWithGoogle: async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const userCredential = await auth().signInWithCredential(googleCredential);
      return { success: true, user: userCredential.user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Connexion avec téléphone
  signInWithPhone: async (phoneNumber) => {
    try {
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      return { success: true, confirmation };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Vérifier le code SMS
  verifyPhoneCode: async (confirmation, code) => {
    try {
      const userCredential = await confirmation.confirm(code);
      return { success: true, user: userCredential.user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Déconnexion
  signOut: async () => {
    try {
      await auth().signOut();
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Obtenir l'utilisateur actuel
  getCurrentUser: () => {
    return auth().currentUser;
  },

  // Écouter les changements d'authentification
  onAuthStateChanged: (callback) => {
    return auth().onAuthStateChanged(callback);
  }
};

