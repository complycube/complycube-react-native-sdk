import React from 'react';
import { ComplyCube } from '@complycube/react-native';
import { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  useColorScheme,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const settings = {
  clientID: 'CLIENT_ID',
  clientToken: 'SDK_TOKEN',
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
  const isDarkMode = useColorScheme() === 'dark';
  const [showSDK, setShowSDK] = useState(false);

  useEffect(() => {
    // Initialization logic (if needed)
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar />
      <View style={styles.container}>
        <Text style={styles.header}>Identity Verification</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setShowSDK(true)}
        >
          <Text style={styles.buttonText}>Start Verification</Text>
        </TouchableOpacity>

        {showSDK && (
          <View style={styles.sdkContainer}>
            <ComplyCube
              settings={settings}
              onSuccess={() => setShowSDK(false)}
              onError={() => setShowSDK(false)}
              onCancel={() => setShowSDK(false)}
            />
          </View>
        )}
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
  sdkContainer: {
    flex: 1,
    marginTop: 20,
    backgroundColor: 'white',
  },
});

export default App;