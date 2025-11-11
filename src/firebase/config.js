import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging';

// Firebase est initialisé automatiquement avec @react-native-firebase
// Assurez-vous d'avoir configuré google-services.json (Android) et GoogleService-Info.plist (iOS)
// dans votre projet Firebase

export { auth, firestore, messaging };

