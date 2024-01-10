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
