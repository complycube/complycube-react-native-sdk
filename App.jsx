/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, StatusBar, useColorScheme, View} from 'react-native';
import {ComplyCube} from '@complycube/react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

const settings = {
  clientID: '649467efd6e73000085a0f82',
  clientToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoiWm1Rd01tTXhNekl3WldWbU9XSTFOamszWVdOaU1XTXdZV0ZsTVdVek1UVm1ORFF3TldJeE5EVXhPV0U1TkRBM1pEWXdZVGcxT1dRd016RmlZakUwTVdabU9XTmtZak5rTmpZMVpHUXhOak5qTnpnd1lqSTJZbVkxTXpkak4ySTJNekF4WWpVd016azBOV016WkdRellqSTRPV1E1Wm1OaU5qWTRZbVpqTmpVeVlUaGtZelZtTkdZMk9UWXlaV1kxTnpJMVlqZzJPV0ZrTW1VNVlqSmlZbVEzWm1ObFltSmtNV1l6TkdSaVpXWTBaakppT0RZeVpXTXpNakUxTkRVME5qbGhZMkUzTjJKak5XUTJZelV5WXpOaFpXSTBaamMzTWpGaU1EZzFPREE0TURabVlqRXpPVFJqT1dNd1pqTTVPV1ZrWlRoa05qazBNbVkzWlRGa1pnPT0iLCJ1cmxzIjp7ImFwaSI6Imh0dHBzOi8vYXBpLmNvbXBseWN1YmUuY29tIiwic3luYyI6IndzczovL3hkcy5jb21wbHljdWJlLmNvbSIsImNyb3NzRGV2aWNlIjoiaHR0cHM6Ly94ZC5jb21wbHljdWJlLmNvbSJ9LCJvcHRpb25zIjp7ImhpZGVDb21wbHlDdWJlTG9nbyI6ZmFsc2UsImVuYWJsZUN1c3RvbUxvZ28iOnRydWUsImVuYWJsZVRleHRCcmFuZCI6dHJ1ZSwiZW5hYmxlQ3VzdG9tQ2FsbGJhY2tzIjp0cnVlLCJlbmFibGVOZmMiOmZhbHNlLCJpZGVudGl0eUNoZWNrTGl2ZW5lc3NBdHRlbXB0cyI6NSwiZG9jdW1lbnRJbmZsaWdodFRlc3RBdHRlbXB0cyI6NSwibmZjUmVhZEF0dGVtcHRzIjo1fSwiaWF0IjoxNzA0MjEwMzAwLCJleHAiOjE3MDQyMTM5MDB9.IBTw3JxIp_tBPyBWo16xT6s6zFpCydt3f1t2VMNG6j4',
  stages: [
    {
      name: 'intro',
      heading: 'Am from Java script',
      message: 'A message for our users',
    },
    {
      name: 'documentCapture',
      documentTypes: {
        passport: true,
        driving_license: ['GB', 'FR', 'DZ'],
      },
    },
    'faceCapture',
  ],
};

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  const onSuccess = data => {
    console.log('Success', data);

    // {
    //   "documentIds": ["63a43228fbaa6f000826b4ee"],
    //   "livePhotoId": ["63a432a2c448150008641ec7"]
    // }

    // navigate("PendingScreen")
  };

  const onError = error => {
    console.log('Error', error);
    // [{
    //   "description": "TOKEN_EXPIRED",
    //   "errorCode": null,
    //   "message": "TOKEN_EXPIRED"}]
    // navigate("PendingScreen")
  };

  const onCanceled = error => {
    console.log('Canceled', error);
    // navigate("PendingScreen")
  };

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ComplyCube
        settings={settings}
        onCancel={onCanceled}
        onSuccess={onSuccess}
        onError={onError}
      />
    </SafeAreaView>
  );
}

export default App;
