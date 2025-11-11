import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging';
import storage from '@react-native-firebase/storage';

// Configuration Firebase pour React Native
// Les fichiers google-services.json (Android) et GoogleService-Info.plist (iOS)
// doivent être ajoutés dans les dossiers android/app et ios/ respectivement

// Configuration Firebase (pour référence - React Native utilise les fichiers natifs)
export const firebaseConfig = {
  apiKey: "AIzaSyC6k2nv-TjgPRHKmZGkpiL1kfEBuLJdqXo",
  authDomain: "alamiya-app-e033a.firebaseapp.com",
  projectId: "alamiya-app-e033a",
  storageBucket: "alamiya-app-e033a.firebasestorage.app",
  messagingSenderId: "24475454140",
  appId: "1:24475454140:web:98935231b223a939ec5eb9",
  measurementId: "G-V5VME5NLNB"
};

// Firebase est initialisé automatiquement avec @react-native-firebase
// via les fichiers google-services.json (Android) et GoogleService-Info.plist (iOS)
// Assurez-vous d'avoir téléchargé ces fichiers depuis la console Firebase
// et de les avoir placés dans :
// - android/app/google-services.json
// - ios/GoogleService-Info.plist

export { auth, firestore, messaging, storage };
export default firebaseConfig;
