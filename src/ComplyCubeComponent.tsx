import React from 'react';
import ComplyCubeRN from './ComplyCubeSDK';
import ComplyCubeAndroid from './ComplyCubeComponentAndroid';
import { Platform, View } from 'react-native';

interface CCProps {
  settings: Object;
  onSuccess: any; // TODO: Add types
  onCancel: any;
  onError: any;
}

export default function ComplyCube({
  settings,
  onSuccess,
  onCancel,
  onError,
}: CCProps) {
  const [isIOS, setIOS] = React.useState(Platform.OS === 'ios');
  // Check device on loading of component
  React.useEffect(() => {
    const complycube = new ComplyCubeRN();
    // We add handlers in Both case
    complycube.addHandlers(onSuccess, onError, onCancel);
    // We put it here too so we validate the settings both ways
    complycube.setSettings(settings);
    // Check if is iPhone
    if (Platform.OS === 'ios') {
      setIOS(true);
      complycube.mount();
    } else {
      setIOS(false);
    }
  }, []);
  // console.log('ComplyCube: ', isIOS);
  return <>{isIOS ? <View /> : <ComplyCubeAndroid settings={settings} />}</>;
}
