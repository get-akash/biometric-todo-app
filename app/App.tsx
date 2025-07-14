import React, { useEffect } from 'react';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import useAuthenticationGate from './hooks/useAuthenticationGate';
import HomeScreen from './screens/HomeScreen';
import { useTodoStore } from './store/useTodoStore';

export default function App() {
    const setSkipAuthentication = useTodoStore((s) => s.setSkipAuthentication);
    const [isAccessGranted, isbiometricAvailable] = useAuthenticationGate();

    // Initialize DB using useEffect and initDatabase function

    useEffect(()=>{
        if(!isbiometricAvailable && isAccessGranted){
            setSkipAuthentication(true)
        }
    }, [isAccessGranted, isbiometricAvailable])

    return (
        <SafeAreaView style={styles.safe_area}>
            {isAccessGranted === null && (
                <Text style={styles.text_align_center}>Checking biometric access...</Text>
            )}
            {isAccessGranted === false && (
                <Text style={styles.text_align_center}>
                    Access denied. Please restart the app to try again.
                </Text>
            )}
            {isAccessGranted === true && (
                    <HomeScreen  />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe_area: {
        flex: 1,
        paddingTop: 16,
    },
    text_align_center: {
        textAlign: "center"
    }
})