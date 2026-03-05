import React from 'react';
import { ComplyCube } from '@complycube/react-native';
import type { StartOptions } from '@complycube/react-native';
import { useCallback } from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const id = 'CLIENT_ID';
const token = 'SDK_TOKEN';

const sdkSettings: Record<string, unknown> = {
  stages: [
    {
      name: 'intro',
      heading: 'Custom Screen Title',
      message: 'Custom welcome message.',
    },
    {
      name: 'documentCapture',
      documentTypes: {
        passport: true,
        driving_license: ['GB', 'US'],
      },
    },
    'faceCapture',
  ],
};

function App() {
  const startVerification = useCallback(async () => {
    const out = await ComplyCube.startSafe(
      {
        stages: [],
        ...sdkSettings,
        clientID: id,
        clientToken: token,
      } as StartOptions,
    );

    if (__DEV__) {
      // Keeps the example behavior visible while testing.
      console.log('ComplyCube outcome:', out);
    }
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar />
      <View style={styles.container}>
        <Text style={styles.header}>Identity Verification</Text>
        <TouchableOpacity style={styles.button} onPress={startVerification}>
          <Text style={styles.buttonText}>Start Verification</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default App;
