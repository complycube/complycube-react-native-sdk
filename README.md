# ComplyCube React Native SDK Example

This repository is a runnable React Native app that demonstrates how to launch the ComplyCube mobile flow using `@complycube/react-native`.

It is intended for developers who want a working reference for:

- Setting up credentials (`clientID`, `clientToken`)
- Starting the SDK with `ComplyCube.startSafe(...)`
- Handling success, cancel, and error outcomes
- Troubleshooting common launch issues

For access to the Mobile SDK, contact your Account Manager or [ComplyCube Support](https://support.complycube.com/hc/en-gb/requests/new).

## Prerequisites

- Node.js 18+
- React Native development environment (Android Studio and/or Xcode)
- CocoaPods (for iOS)

## Quick Start

1. Clone and install dependencies:

```bash
git clone https://github.com/complycube/complycube-react-native-sdk.git
cd complycube-react-native-sdk
npm install
```

2. Install iOS pods (iOS only):

```bash
cd ios
pod install
cd ..
```

3. Start Metro:

```bash
npm start
```

4. Run the app:

```bash
# Android
npm run android

# iOS
npm run ios
```

## Configure Credentials

In [`App.tsx`](./App.tsx), replace placeholders with real values:

```ts
const id = 'CLIENT_ID';
const token = 'SDK_TOKEN';
```

You can generate these from:

- [Create a Client](https://docs.complycube.com/documentation/guides/mobile-sdk-guide/mobile-sdk-integration-guide#id-2.-create-a-client)
- [Generate an SDK Token](https://docs.complycube.com/documentation/guides/mobile-sdk-guide/mobile-sdk-integration-guide#id-3.-generate-an-sdk-token)

## SDK Launch Pattern Used in This Repo

This project launches the SDK with `startSafe`:

```ts
const out = await ComplyCube.startSafe({
  stages: [],
  ...sdkSettings,
  clientID: id,
  clientToken: token,
});
```

Important:

- `sdkSettings` must provide either:
  - a non-empty `stages` array, or
  - a `workflowTemplateId`
- If neither is provided, the SDK will not start.

### Example `sdkSettings`

```ts
const sdkSettings = {
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
```

## Handle Outcomes Correctly

`startSafe` returns one of three statuses:

- `success`
- `cancelled`
- `error`

Recommended handling:

```ts
const out = await ComplyCube.startSafe(options);

switch (out.status) {
  case 'success':
    console.log('Verification completed:', out.result);
    break;
  case 'cancelled':
    console.log('User cancelled:', out.message);
    break;
  case 'error':
    console.error('SDK error:', out.message, out.details);
    break;
}
```

## Telemetry / Event Subscription

You can listen to SDK events:

```ts
import { subscribe } from '@complycube/react-native';

const unsubscribe = subscribe((message) => {
  console.log('ComplyCube event:', message);
});

// cleanup when done
unsubscribe();
```

## iOS Notes

The SDK uses camera and microphone capture flows. Ensure these keys exist in your app `Info.plist`:

- `NSCameraUsageDescription`
- `NSMicrophoneUsageDescription`

Example values:

```xml
<key>NSCameraUsageDescription</key>
<string>Used to capture facial biometrics and documents</string>
<key>NSMicrophoneUsageDescription</key>
<string>Used to capture video biometrics</string>
```

## Troubleshooting

### SDK does not start

- Confirm `id` and `token` are real values, not placeholders.
- Ensure `sdkSettings` includes valid `stages` or `workflowTemplateId`.
- Check Metro logs for `ComplyCube outcome` and inspect `status` + `message`.

### iOS build issues

- Reinstall pods:

```bash
cd ios
pod install
cd ..
```

For detailed instructions on integrating our SDK, please refer to our [integration guide](ttps://docs.complycube.com/sdks/mobile-integrations/react-native-sdk).

- Call `ComplyCube.startSafe` from user interaction (button press) after app UI is active, not during early app initialization.

## Integration Docs

- Mobile SDK guide: https://docs.complycube.com/documentation/guides/mobile-sdk-guide
- React Native SDK package: https://www.npmjs.com/package/@complycube/react-native
- API reference: https://docs.complycube.com/api-reference
- ComplyCube website: https://www.complycube.com
