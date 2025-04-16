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
  clientID: '67ffc0157567510008e7f71c',
  clientToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoiTTJGa056VTNZamMzWTJKa1lqVTBZelUzTVRFd1pEZzVOV1UxTkdNNE0yWXlaVEZsWXpVMk1XWXhNalkwWWpFek1tTmlOalU0TlRnMU5HRXhOVGs0WWpJMk5qbGxNelkxTURabE5XSTVOVEl6WWpSbFl6VTBaR1ZtTmpjeU9UaGlNV1UzWmpZeFlqQXhZakk0WWpZM1lUVTVPREJqTWpBM09UazBPREF3WldZeU1HRTJaV1ppWWpjM05ERTNOR0l4TUdFeE1ETmxPVGMwTUdNNU9ETmpOemhqTXpabVkySXdZV1EwTnpJM1lqSmpOekUyTlRKaE5Ea3hZakUxTTJGaE5XSm1ZamRrWVRnd09XWXhOV1poTWpkbU9XSXlZV0V5WVRKbE5qSXpOelE9IiwidXJscyI6eyJhcGkiOiJodHRwczovL2FwaS5jb21wbHljdWJlLmNvbSIsInN5bmMiOiJ3c3M6Ly94ZHMuY29tcGx5Y3ViZS5jb20iLCJjcm9zc0RldmljZSI6Imh0dHBzOi8veGQuY29tcGx5Y3ViZS5jb20ifSwib3B0aW9ucyI6eyJoaWRlQ29tcGx5Q3ViZUxvZ28iOmZhbHNlLCJlbmFibGVDdXN0b21Mb2dvIjp0cnVlLCJlbmFibGVUZXh0QnJhbmQiOnRydWUsImVuYWJsZUN1c3RvbUNhbGxiYWNrcyI6dHJ1ZSwiZW5hYmxlTmZjIjp0cnVlLCJpZGVudGl0eUNoZWNrTGl2ZW5lc3NBdHRlbXB0cyI6NSwiZG9jdW1lbnRJbmZsaWdodFRlc3RBdHRlbXB0cyI6MiwibmZjUmVhZEF0dGVtcHRzIjo1LCJlbmFibGVBZGRyZXNzQXV0b2NvbXBsZXRlIjp0cnVlLCJlbmFibGVXaGl0ZUxhYmVsaW5nIjpmYWxzZX0sImlhdCI6MTc0NDgxNDEwNywiZXhwIjoxNzQ0ODE3NzA3fQ.4AnkANFFxrVk8-mnyk_G8KyyrU3WI4BVWpQfLTx9AnM', // Replace with a valid token
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