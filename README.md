# ComplyCube Example App

This repository provides a pre-built UI that uses the ComplyCube SDK. It guides you through the ComplyCube identity verification process, which includes collecting client ID documents, proof of address documents, and biometric selfies.

> :information_source: Please get in touch with your **Account Manager** or **[support](https://support.complycube.com/hc/en-gb/requests/new)** to get access to our Mobile SDK.

## To run the app

### Before you start

1. Install [Node.js](https://nodejs.org/en/download/).
2. Install [Android Studio](https://developer.android.com/studio) and [Xcode](https://developer.apple.com/xcode/).
3. Clone this repository.

```bash
git clone https://github.com/complycube/complycube-react-native-sdk.git
```

4. Install dependencies.

```bash
cd complycube-react-native-sdk
npm install
```

>#### iOS only
>Install CocoaPods dependencies. <br/>
>- `cd ios` <br/>
>- `pod install`

### Run the apps

1. [Create a Client ID](https://docs.complycube.com/documentation/guides/mobile-sdk-guide/mobile-sdk-integration-guide#id-2.-create-a-client).
2. [Generate an SDK token](https://docs.complycube.com/documentation/guides/mobile-sdk-guide/mobile-sdk-integration-guide#id-3.-generate-an-sdk-token).
3. In the `App.jsx` file, replace `CLIENT_ID` and `SDK_TOKEN` with the generated values from the previous steps.
4. Run the Android app:

   ```bash
   npm run android
   ```

5. Run the iOS app:

   ```bash
   npm run ios
   ```

## Integrating our SDK

For detailed instructions on integrating our SDK, please refer to our [integration guide](ttps://docs.complycube.com/sdks/mobile-integrations/react-native-sdk).

For an overview of our core platform and its multiple features, please refer to our [user guide](https://docs.complycube.com) or browse the [API reference](https://docs.complycube.com/api-reference) for fine-grained documentation of all our services.

## About ComplyCube

[ComplyCube](https://www.complycube.com/en) stands out as an award-winning SaaS & API platform, specializing in cutting-edge Identity Verification (IDV), Anti-Money Laundering (AML), and Know Your Customer (KYC) compliance solutions. It caters to a wide customer base across financial services, transport, healthcare, e-commerce, cryptocurrency, FinTech, telecoms, and more, positioning itself as a frontrunner in the IDV industry.
<br>
<br>
The ISO-certified AI-powered platform is commended for its fast omnichannel integration and the breadth of its services, offering Low/No-Code solutions, comprehensive API, Mobile SDKs, Client Libraries, and effective CRM integrations.
