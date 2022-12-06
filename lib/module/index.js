import { NativeModules, Platform } from 'react-native';
const LINKING_ERROR = `The package 'complycube-react-native' doesn't seem to be linked. Make sure: \n\n` + Platform.select({
  ios: "- You have run 'pod install'\n",
  default: ''
}) + '- You rebuilt the app after installing the package\n' + '- You are not using Expo Go\n';
const ComplyCubeSDK = NativeModules.ComplyCubeSDK ? NativeModules.ComplyCubeSDK : new Proxy({}, {
  get() {
    throw new Error(LINKING_ERROR);
  }
});
export function multiply(a, b) {
  return ComplyCubeSDK.multiply(a, b);
}
//# sourceMappingURL=index.js.map