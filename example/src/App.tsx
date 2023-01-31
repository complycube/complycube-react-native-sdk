import * as React from 'react';

import { StyleSheet, View, Text, Button } from 'react-native';
import { ComplyCubeRN, ComplyCube } from 'complycube-react-native';

export default function App() {
  const settings = {
    clientID: '6363c8cc808c610008278c30',
    clientToken:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoiWm1Rd01tTXhNekl3WldWbU9XSTFOamszWVdOaU1XTXdZV0ZsTVdVek1UVm1ORFF3TldJeE5EVXhPV0U1TkRBM1pEWXdZVGcxT1dRd016RmlZakUwTVRkak56WTBabVUxTVRaa05tRXpaVFF3TUdFM09EWTBZalEyWmpJMk4yWm1aR0k0TW1aa04yWXlOVEk0WW1SbE1XTmhOMkppWmpZeE1tSXdZemhtWTJGaVlqQTNPR1JpTXpGaFpEQmlOREF6TVRNNU16WmxNREF3T0RVM1pXUTVaamxtWkRNM056ZGxaRFkyTUdKalpqSTVaR1kzTlRNd09UY3pOVGRrWm1OaVlqaGxaRFUyWWpSaFl6YzVaalk1TW1VM1ltSTRZelZsTlRBMk5qRXpaalZsTjJWaU1qTTNaVEl3WldRelpXUTVNalpsTldGaFpXWmhZamt5T1RJek5RPT0iLCJ1cmxzIjp7ImFwaSI6Imh0dHBzOi8vYXBpLmNvbXBseWN1YmUuY29tIiwic3luYyI6IndzczovL3hkcy5jb21wbHljdWJlLmNvbSIsImNyb3NzRGV2aWNlIjoiaHR0cHM6Ly94ZC5jb21wbHljdWJlLmNvbSJ9LCJvcHRpb25zIjp7ImhpZGVDb21wbHlDdWJlTG9nbyI6ZmFsc2UsImVuYWJsZUN1c3RvbUxvZ28iOnRydWUsImVuYWJsZVRleHRCcmFuZCI6dHJ1ZSwiZW5hYmxlQ3VzdG9tQ2FsbGJhY2tzIjp0cnVlfSwiaWF0IjoxNjY3NDgzODUzLCJleHAiOjE2Njc0ODc0NTN9.8qnAcJ_t3-_6-JKIzj3q56TE8lJuQOReNBTAYfAvkss',
    stages: [
      {
        name: 'intro',
        heading: 'Am from Java script',
        message: 'Oups I did it again',
      },
      {
        name: 'documentCapture',
        showGuidance: false,
        // useMLAssistance: true,
        retryLimit: 1,
        // liveCapture: false,
        documentTypes: {
          passport: true,
          driving_license: ['GB', 'FR'],
        },
      },
      'faceCapture',
    ],
    scheme: {
      // primaryButtonBgColor: '#FFFFFF',
    },
  };
  return (
    <View style={styles.container}>
      {/* <Button onPress={async () => await SendCommand()} title="Hello world" /> */}
      <ComplyCube settings={settings} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
