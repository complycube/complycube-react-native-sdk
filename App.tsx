import React from 'react';
import {
  StatusBar,
  useColorScheme,
  View,
} from 'react-native';
import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import {ComplyCube} from '@complycube/react-native';


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

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const onSuccess = (data: any) => {
    console.log('Success', data);

    // returns {
    //   "documentIds": ["63a43228fbaa6f000826b4ee"],
    //   "livePhotoId": ["63a432a2c448150008641ec7"]
    // }

    // navigate("PendingScreen")
  };

  const onError = (error: any) => {
    console.log('Error', error);
    // returns [{
    //   "description": "TOKEN_EXPIRED",
    //   "errorCode": null,
    //   "message": "TOKEN_EXPIRED"}]
    // navigate("PendingScreen")
  };

  const onCanceled = (error: any) => {
    console.log('Canceled', error);
    // navigate("PendingScreen")
  };

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };


  return (
    <View style={backgroundStyle}>
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
    </View>
  );
}

export default App;
