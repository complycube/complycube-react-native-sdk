import React from 'react';
import ComplyCubeRN  from './ComplyCubeSDK';
import ComplyCubeAndroid from './ComplyCubeComponentAndroid.tsx';
import { Platform, View } from 'react-native';

export default function ComplyCube({ settings, onSuccess, onCancel, onError }) {
    const [isIOS, setIOS] = React.useState(Platform.OS === 'ios');
    // Check device on loading of component
    React.useEffect(() => {
        const complycube = new ComplyCubeRN();
        // We add handlers in Both case
        complycube.addHandlers(onSuccess, onCancel, onError);
        // We put it here too so we validate the settings both ways
        complycube.setSettings(settings);
        // Check if is iPhone
        if (Platform.OS === 'ios') {
            setIOS(true)
            complycube.mount()
        } else {
            setIOS(false)
        }
        
    }, []);
    // console.log('ComplyCube: ', isIOS);
  return (
    <>{
      isIOS ? (
        <View></View>
      ) : (
        <ComplyCubeAndroid 
            settings={settings} 
            
            />)
      }
    </>
  );
}
