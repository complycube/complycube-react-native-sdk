import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ComplyCube } from '@complycube/react-native';



export default function App() {
  const settings = {
    clientID: '<CLIENT-ID>',
    clientToken:
      '<TOKEN>',
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
    scheme: {
      // primaryButtonBgColor: '#FFFFFF',
    },
  }

  const onSuccess = (data) => {
    console.log('Success', data);
    
    // {
    //   "documentIds": ["63a43228fbaa6f000826b4ee"], 
    //   "livePhotoId": ["63a432a2c448150008641ec7"]
    // }
    
    // navigate("PendingScreen")
  }
  
  const onError = (error) => {
    console.log('Error', error);
    // [{
    //   "description": "TOKEN_EXPIRED", 
    //   "errorCode": null, 
    //   "message": "TOKEN_EXPIRED"}]
    // navigate("PendingScreen")
  }
  
  const onCanceled = (error) => {
    console.log('Canceled', error);
    // navigate("PendingScreen")
  }
  return (
    <View style={styles.container}>
      <ComplyCube 
          settings={settings} 
          onCancel={onCanceled} 
          onSuccess={onSuccess} 
          onError={onError} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
