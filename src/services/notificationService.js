import messaging from '@react-native-firebase/messaging';
import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';

// Configurer les notifications
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export const notificationService = {
  // Demander la permission
  requestPermission: async () => {
    try {
      if (Platform.OS === 'ios') {
        const authStatus = await messaging().requestPermission();
        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {
          await Notifications.requestPermissionsAsync();
        }
        return enabled;
      } else {
        await Notifications.requestPermissionsAsync();
        return true;
      }
    } catch (error) {
      console.error('Erreur permission notifications:', error);
      return false;
    }
  },

  // Obtenir le token FCM
  getToken: async () => {
    try {
      const token = await messaging().getToken();
      return { success: true, token };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Écouter les notifications en foreground
  onMessage: (callback) => {
    return messaging().onMessage(async remoteMessage => {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: remoteMessage.notification?.title || 'Nouvelle notification',
          body: remoteMessage.notification?.body || '',
          data: remoteMessage.data,
        },
        trigger: null,
      });
      callback(remoteMessage);
    });
  },

  // Écouter les notifications en background
  onBackgroundMessage: () => {
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message en background:', remoteMessage);
    });
  },

  // Écouter les clics sur les notifications
  onNotificationOpened: (callback) => {
    return messaging().onNotificationOpenedApp(remoteMessage => {
      callback(remoteMessage);
    });
  }
};

