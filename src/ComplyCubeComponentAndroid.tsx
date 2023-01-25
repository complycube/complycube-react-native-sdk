// @ts-nocheck
import * as React from 'react';

import {
  requireNativeComponent,
  UIManager,
  findNodeHandle,
  View,
} from 'react-native';

// Extend the UIManager with the commands we need

const createFragment = (viewId: number | null) =>
  UIManager.dispatchViewManagerCommand(
    viewId,
    // we are calling the 'create' command
    UIManager?.ComplyCubeComponent.Commands.create.toString(),
    // 1,
    [viewId]
  );

interface CCAProps {
  settings: Object;
}

export default function ComplyCubeAndroid({ settings }: CCAProps) {
  let ComplyCubeView = requireNativeComponent('ComplyCubeComponent');
  const ref = React.useRef(null);
  React.useEffect(() => {
    // console.log(ref);
    const viewId = findNodeHandle(ref.current);
    createFragment(viewId);
  }, []);
  return (
    <View>
      <ComplyCubeView
        ref={ref}
        settings={settings}
        style={{
          height: 10,
          width: 10,
        }}
      />
    </View>
  );
}
