# ComplyCube Example App

This repository provides a pre-built UI that uses the ComplyCube SDK. It guides you through the ComplyCube identity verification process, which includes collecting client ID documents, proof of address documents, and biometric selfies.

> :information_source: Please get in touch with your **Account Manager** or **[support](https://support.complycube.com/hc/en-gb/requests/new)** to get access to our Mobile SDK.

## To run the app

### Update your .npmrc file

1. Modify the `.npmrc` file in your home directory by adding the settings below:

> :information_source: For users of **Unix-based** systems, the file is located at `~/.npmrc`.
For **Windows** users, this file can be found at `C:\Users\{username}\.npmrc`.

```bash
@complycube:registry=https://complycuberepo.jfrog.io/artifactory/api/npm/cc-react-native-npm-local/
//complycuberepo.jfrog.io/artifactory/api/npm/cc-react-native-npm-local/:_password=JFROG_ENCRYPTED_PASSWORD
//complycuberepo.jfrog.io/artifactory/api/npm/cc-react-native-npm-local/:username=JFROG_USERNAME
//complycuberepo.jfrog.io/artifactory/api/npm/cc-react-native-npm-local/:email=JFROG_USERNAME
//complycuberepo.jfrog.io/artifactory/api/npm/cc-react-native-npm-local/:always-auth=true
```

### Install CocoaPods

1. Before using the ComplyCube SDK, install the CocoaPods Artifactory plugin by running the following command in your terminal:

   ```bash
   gem install cocoapods-art
   ```

2. To add the library, copy your repository credentials into a `.netrc` file to your home directory and setup the repository:

   ```bash
   pod repo-art add cc-cocoapods-release-local "https://complycuberepo.jfrog.io/artifactory/api/pods/cc-cocoapods-release-local"
   ```

### Add Artifactory Credentials for Gradle

1. In the `android/gradle.properties` file, replace `ARTIFACTORY_USER` and `ARTIFACTORY_PASSWORD` with your JFrog Username and the encrypted JFrog Password.

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

For detailed instructions on integrating our SDK, please refer to our [integration guide](https://docs.complycube.com/documentation/guides/mobile-sdk-guide/mobile-sdk-integration-guide).

For an overview of our core platform and its multiple features, please refer to our [user guide](https://doc.complycube.com) or browse the [API reference](https://docs.complycube.com/api-reference) for fine-grained documentation of all our services.
