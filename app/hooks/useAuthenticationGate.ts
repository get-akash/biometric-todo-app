import Constants from '@/app/Constants';
import * as LocalAuthentication from 'expo-local-authentication';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useTodoStore } from '../store/useTodoStore';
import authenticateUser from './useAuthentication';

// Custom hook to gate access to screens or features using biometric authentication
export default function useAuthenticationGate() {
  const [isAccessGranted, setIsAccessGranted] = useState<boolean | null>(null);
  const [isbiometricAvailable, setIsbiometricAvailable] = useState<boolean>(true);

  useEffect(() => {
    // Function to check if biometric authentication is available and perform it
    const checkBiometricAccess = async () => {
      try {
        const { lastAuthenticatedAt, setLastAuthenticatedAt } = useTodoStore.getState();

        const now = Date.now();
        // Skip authentication if user was already authenticated within the last 2 minutes
        if (lastAuthenticatedAt && now - lastAuthenticatedAt < Constants.TWO_MINUTES) {
            setIsAccessGranted(true);
            return;
        }

        const hasHardware = await LocalAuthentication.hasHardwareAsync();
        const isEnrolled = await LocalAuthentication.isEnrolledAsync();

        if (hasHardware && isEnrolled) {
          // Biometric available – attempt authentication
          const success = await authenticateUser(); // Should return true/false
          setIsAccessGranted(success);
          // Save timestamp if authentication was successful
          if (success) {
            setLastAuthenticatedAt(now);
        }
        } else {
          // No biometric hardware or setup – fallback to confirmation prompt
          setIsbiometricAvailable(false)
          Alert.alert(
            'Biometric Unavailable',
            'Face ID / Fingerprint not available. Do you want to proceed anyway?',
            [
              {
                text: 'No',
                onPress: () => setIsAccessGranted(false),
                style: 'cancel',
              },
              {
                text: 'Yes',
                onPress: () => setIsAccessGranted(true),
              },
            ],
            { cancelable: false }
          );
        }
      } catch (error) {
        console.error('Biometric check error:', error);
        setIsAccessGranted(false);
      }
    };

    checkBiometricAccess();
  }, []);

  return [isAccessGranted, isbiometricAvailable]; // true, false, or null (initial state)
}