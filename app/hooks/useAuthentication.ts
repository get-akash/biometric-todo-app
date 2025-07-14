// hooks/useAuthentication.ts
import Constants from '@/app/Constants';
import * as LocalAuthentication from 'expo-local-authentication';
import { useTodoStore } from '../store/useTodoStore';

// Function to authenticate the user using biometrics or device PIN.
// Returns true if authentication succeeds, false otherwise.
export default async function authenticateUser(): Promise<boolean> {
    const { lastAuthenticatedAt, setLastAuthenticatedAt } = useTodoStore.getState();

    const now = Date.now();
    // Optimization: If user was authenticated within the last 2 minutes, skip re-authentication
    if (lastAuthenticatedAt && now - lastAuthenticatedAt < Constants.TWO_MINUTES) {
        return true;
    }

    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();

    // If either check fails, show alert and skip auth
    if (!hasHardware || !isEnrolled) {
        alert('Biometric auth not available');
    }

    // Prompt user to authenticate using available method (FaceID/Fingerprint/PIN)
    const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Authenticate to perform action',
    });

    // On success, update last authenticated time
    if (result.success) {
        setLastAuthenticatedAt(now);
    }

    return result.success;
}