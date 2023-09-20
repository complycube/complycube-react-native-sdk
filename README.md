# ComplyCube React Native SDK

The ComplyCube React Native SDK makes it quick and easy to build a frictionless customer onboarding and biometric re-authentication experience in your React Native app. We provide powerful, smart, and customizable UI screens that can be used out-of-the-box to capture the data you need for identity verification.

> :information_source: Please get in touch with your **Account Manager** or **[support](https://support.complycube.com/hc/en-gb/requests/new)** to get access to our Mobile SDK.

> :warning: If you were using our previous generation SDK (deprecated), please migrate to this one. Get in touch with support if you have any questions.

## Table of contents

- [Features](#features)
- [Requirements](#requirements)
- [Getting Started](#getting-started)
  - [1. Installing the SDK](#1-installing-the-sdk)
    - [React Native SDK](#react-native-sdk)
    - [CocoaPods](#cocoapods)
    - [Application permissions](#application-permissions)
      - [iOS](#ios)
      - [Android](#android)
  - [2. Creating a client](#2-creating-a-client)
    - [Example request](#example-request)
    - [Example response](#example-response)
  - [3. Creating an SDK token](#3-creating-an-sdk-token)
    - [Example request](#example-request-1)
    - [Example response](#example-response-1)
  - [4. Prepare the SDK stages](#4-prepare-the-sdk-stages)
  - [5. Initialize an SDK flow](#5-initialize-an-sdk-flow)
  - [6. Perform checks](#6-perform-checks)
    - [Example response](#example-response-2)
  - [7. Setup webhooks and retrieve results](#7-setup-webhooks-and-retrieve-results)
- [Customization](#customization)
  - [Stages](#stages)
    - [Welcome stage](#welcome-stage)
    - [Consent stage](#consent-stage)
    - [Document stage](#document-stage)
    - [Selfie photo and video stage](#selfie-photo-and-video-stage)
    - [Proof of address stage](#proof-of-address-stage)
  - [Look and feel](#look-and-feel)
  - [Localization](#localization)
- [Result handling](#result-handling)
- [Error handling](#error-handling)
- [Events tracking](#events-tracking)
- [Custom event handler](#custom-event-handler)
- [Token expiry Handler](#token-expiry-handler)
- [NFC capture](#nfc-capture)
- [Going live](#going-live)
- [Additional info](#additional-info)

## Features

<img 
	src="https://assets.complycube.com/images/complycube-ios-sdk-github.jpg" 
	alt="ComplyCube iOS SDK illustrations."
/>

**Native & intuitive UI**: We provide mobile-native screens that guide your customers in capturing their selfies, video recordings, government-issued IDs (such as passports, driving licenses, and residence permits), and proof of address documents (bank statements and utility bills)

**Liveness**: Our market-leading liveness detection provides accurate and extremely fast presence detection on your customers' selfies (3D Passive and Active) and documents to prevent fraud and protect your business. It detects and deters several spoofing vectors, including **printed photo attacks**, **printed mask attacks**, **video replay attacks**, and **3D mask attacks**.

**Auto-capture**: Our UI screens attempt to auto-capture your customer's documents and selfies and run quality checks to ensure that only legible captures are processed by our authentication service.

**Branding & customization**: You can customize the experience by adding your brand colors and text. Furthermore, screens can be added and removed.

**ComplyCube API**: Our [REST API](https://docs.complycube.com/api-reference) can be used to build entirely custom flows on top of this native mobile UI layer. We offer backend SDK libraries ([Node.js](https://www.npmjs.com/package/@complycube/api), [PHP](https://github.com/complycube/complycube-php), [Python](https://pypi.org/project/complycube/), and [.NET](https://www.nuget.org/packages/Complycube/)) to facilitate custom integrations.

**Localized**: We offer multiple localization options to fit your customer needs.

**Secure**: Our GPDR, CCPA, and ISO-certified platform ensure secure and data privacy-compliant end-to-end capture.

## Requirements

- [iOS requirements](https://github.com/complycube/complycube-ios-sdk#requirements)
- [Android requirements](https://github.com/complycube/complycube-android-sdk#requirements)

## Getting Started

### 1. Installing the SDK

#### React Native SDK

Configure the npm registry to use the ComplyCube SDK repository by running the following command in your terminal:

```bash
npm config set registry https://complycuberepo.jfrog.io/artifactory/api/npm/cc-react-native-npm-local/
```

Next, modify the `.npmrc` file in your home directory. For Windows users, this file can be found at `C:\Users\{username}\.npmrc`. For users of Unix-based systems, the file is located in `~/.npmrc`. Add the following lines to the file:

```bash
_auth = <TOKEN>
email = <USER_EMAIL>
always-auth = true
registry=https://complycuberepo.jfrog.io/artifactory/api/npm/cc-react-native-npm-local/
```

Finally, install the React Native library by running:

```bash
npm i -s @complycube/react-native
```

#### CocoaPods

1. Before using the ComplyCube SDK, install the Cocoapods Artifactory plugin by running the following command in your terminal:

   ```bash
   gem install cocoapods-art
   ```

2. To add the library, copy your repository credentials into a `.netrc` file to your home directory and setup the repository:

   ```bash
   pod repo-art add cc-cocoapods-release-local "https://complycuberepo.jfrog.io/artifactory/api/pods/cc-cocoapods-release-local"
   ```

3. Add plugin repos by adding the snippet below to the top of your `ios/PodFile` and install the pod using the `pod install` command.

   ```ruby
   plugin 'cocoapods-art', :sources => [
     'cc-cocoapods-release-local',
     'trunk'
   ]
   ...

   target 'YourApp' do
       ...
       pod 'ComplyCube'
       ...
   end
   ```

#### Application permissions

##### iOS

Our SDK uses the device camera and microphone for capture. You must add the following keys to your application `Info.plist` file.

- `NSCameraUsageDescription`

```xml
<key>NSCameraUsageDescription</key>
<string>Used to capture facials biometrics and documents</string>
```

- `NSMicrophoneUsageDescription`

```xml
<key>NSMicrophoneUsageDescription</key>
<string>Used to capture video biometrics</string>
```

##### Android

Start by adding your access credentials for the ComplyCube SDK repository to the `gradle.properties` file of your **mobile app**:

```gradle
artifactory_user= "USERNAME"
artifactory_password= "ENCRYPTED PASS"
artifactory_contextUrl= https://complycuberepo.jfrog.io/artifactory
```

Then update your application `build.gradle` file with the ComplyCube SDK repository maven settings and SDK dependency:

```gradle
buildscript {
    ...
    repositories {
        ...
        artifactory {
            contextUrl = "${artifactory_contextUrl}"  
            resolve {
                repository {
                    repoKey = 'complycube-sdk-gradle-release-local'
                    username = "${artifactory_user}"
                    password = "${artifactory_password}"
                    maven = true
                }
            }
        }
    }
    dependencies {
        ....
        //Check for the latest version here: http://plugins.gradle.org/plugin/com.jfrog.artifactory
        classpath "org.jfrog.buildinfo:build-info-extractor-gradle:4+"
        implementation "com.complycube:sdk:+"
    }
}

plugins {
    ...
    id "com.jfrog.artifactory"
}
```

### 2. Creating a client

Before launching the SDK, your app must first [create a client](https://docs.complycube.com/api-reference/clients/create-a-client) using the ComplyCube API.

A client represents the individual on whom you need to perform identity verification checks on. A client is required to generate an SDK token.

This must be done on your **mobile app backend** server.

#### Example request

```bash
curl -X POST https://api.complycube.com/v1/clients \
     -H 'Authorization: <YOUR_API_KEY>' \
     -H 'Content-Type: application/json' \
     -d '{  "type": "person",
            "email": "john.doe@example.com",
            "personDetails":{
                "firstName": "Jane",
                "lastName" :"Doe"
            }
         }'
```

#### Example response

The response will contain an id (the Client ID). It is required for the next step.

```json
{
    "id": "5eb04fcd0f3e360008035eb1",
    "type": "person",
    "email": "john.doe@example.com",
    "personDetails": {
        "firstName": "John",
        "lastName": "Doe",
    },
    "createdAt": "2023-01-01T17:24:29.146Z",
    "updatedAt": "2023-01-01T17:24:29.146Z"
}
```

### 3. Creating an SDK token

**SDK Tokens** enable clients to securely send personal data from your **mobile app** to ComplyCube.
[To learn more about our SDK Token endpoint](https://docs.complycube.com/api-reference/other-resources/tokens).

> You must generate a new token each time you initialize the ComplyCube Web SDK.

#### Example request

```bash
curl -X POST https://api.complycube.com/v1/tokens \
     -H 'Authorization: <YOUR_API_KEY>' \
     -H 'Content-Type: application/json' \
     -d '{
           "clientId":"CLIENT_ID",
           "appId": "com.complycube.SampleApp"
         }'
```

#### Example response

```json
{
    "token": "<CLIENT_TOKEN>"
}
```

### 4. Prepare the SDK stages

Initialize the `stages` object with the stages you wish to include, so that it can be used in the React Native component.

```javascript
const stages = [
  {
    name: 'intro',
    heading: 'Green Bank ID verification',
  },
  {
    name: 'documentCapture',
    showGuidance: false,
    useMLAssistance: true,
    retryLimit: 1,
    documentTypes: {
      passport: true,
      driving_license: ['GB', 'FR'],
    },
  },
  'faceCapture',
]
```

### 5. Initialize an SDK flow

You can now initialize the `settings` object by setting the SDK token, client ID, and the stages of the flow.

```javascript
const settings = {
  clientID: "<CLIENT_ID>",
  clientToken: "<CLIENT_TOKEN>",
  stages: stages
  ...
}
```

You can now incorporate the ComplyCube React Native component into your screen.

```jsx
import { ComplyCube } from '@complycube/react-native';
...
return (
  <View style={styles.container}>
    <ComplyCube settings={settings} />
  </View>
);
```

### 6. Perform checks

Using the results returned in the `onSuccess` callback, you can trigger your mobile backend to run the necessary checks on your client.

For example, use the result of a selfie and document capture as follows:

- `result.documentId` to run a [Document Check](https://docs.complycube.com/api-reference/check-types/document-check)

- `result.documentId` and `result.livePhotoId` to run an [Identity Check](https://docs.complycube.com/api-reference/check-types/identity-check)

#### Example response

```bash
curl -X POST https://api.complycube.com/v1/checks \
     -H 'Authorization: <YOUR_API_KEY>' \
     -H 'Content-Type: application/json' \
     -d '{
            "clientId":"CLIENT_ID",
            "type": "document_check",
            "documentId":"DOCUMENT_ID"
         }'
```

### 7. Setup webhooks and retrieve results

Our checks are asynchronous, and all results and event notifications are done via webhooks.

Follow our [webhook guide](https://docs.complycube.com/documentation/guides/webhooks) for a step-by-step walkthrough.

Your mobile backend can retrieve all check results using our API.

## Customization

### Stages

Each stage in the flow can be customized to create the ideal journey for your clients. Every stage must be in the stages array in the settings object.

Stages can be a string or an object that contains the stage’s customizations.

#### Welcome stage

This is the first screen of the flow. It displays a welcome message and a summary of the stages you have configured for the client. If you would like to use a custom title and message, you can set them as follows:

```javascript
const settings = {
  ...
  stages: [
    {
        name: 'intro',
        heading: 'My Company Verification',
        message: 'We will now verify your identity so you can start trading.',
      },
      ...
  ]
  ...
}
```

The welcome stage will always default to show as the first screen.

#### Consent stage

You can optionally add this stage to enforce explicit consent collection before the client can progress in the flow. The consent screen allows you to set a custom title and the consenting body.

```javascript
const settings = {
  ...
  stages: [
    {
        name: 'consent',
        heading: 'Terms of Service',
        message: 'At My company, we are committed to protecting the privacy and security of our users. This privacy policy explains how we collect, use, and protect...',
      },
      ...
  ]
  ...
}
```

#### Document stage

This stage allows clients to select the type of identity document they would like to submit. You can customize these screens to:

- Limit the scope of document types the client can select, e.g., Passport only.
- Set the document issuing countries they are allowed for each document type.
- Add or remove automated capture using smart assistance.
- Show or hide the instruction screens before capture.
- Set a retry limit to allow clients to progress the journey regardless of capture quality.

> If you provide only one document type, the document type selection screen will be skipped. The country selection screen will be skipped if you provide only a single country for a given document type.

You can remove the information screens shown before camera captures by enabling or disabling guidance. You should only consider omitting this if you have clearly informed your customer of the capture steps required.

> :warning: Please note the retryLimit you set here will take precedence over the retry limit that has been set globally in the [developer console](https://portal.complycube.com/automations).

```javascript
const settings = {
  ...
  stages: [
    ...
   {
        name: 'documentCapture',

        /* Enable or disable additional guidance for the user */
        showGuidance: false,

        /* Enable ML assistance during capture */
        useMLAssistance: true,

        /* Set the number of retries before uploading 
           without doing soft checks */
        retryLimit: 1,
        
        /* Enable or disable the ability to upload an image from file */
        liveCapture: false,
        
        /* Set document types and limit the enabled countries */
        documentTypes: {
          passport: true,
          driving_license: ['GB', 'US'],
        },
      },
      ...
  ]
  ...
}
```

#### Selfie photo and video stage

You can request a selfie photo ([live photo](https://docs.complycube.com/api-reference/live-photos)) capture or video ([live video](https://docs.complycube.com/api-reference/live-videos)) capture from your customer.

```javascript
const settings = {
  ...
  stages: [
    ...
   {
        name: 'faceCapture',

        /* Biometric mode 'photo' or 'video' */
        mode: 'photo',

        /* Enable ML assistance during capture */
        useMLAssistance: false
    },
      ...
  ]
  ...
}
```

#### Proof of address stage

When requesting a proof of address document, you can set the allowed document type and whether the client can upload the document. When liveCapture is set to false, the client will be forced to perform a live capture.

```javascript
const settings = {
  ...
  stages: [
    ...
   {
        name: 'poaCapture',

        /* Enable or disable the ability to upload an image from file */
        liveCapture: false,
    },
      ...
  ]
  ...
}
```

### Look and feel

The SDK allows you to set colors to match your existing application or brand. You can customize the colors by setting the relevant values when building your flow.

```javascript
const settings = {
  ...
  stages: [
    ...
  ]
  ...
  lookAndFeel: {
      /* Primary action button background color */
      primaryButtonBgColor: '#FFFFFF',

      /* Force SDK to dark mode */
      uiInterfaceStyle: 'dark'
  }
}
```

| Property                       | Description                                     |
| ------------------------------ | ----------------------------------------------- |
| primaryButtonBgColor           | Primary action button background color.          |
| primaryButtonPressedBgColor    | Primary action button pressed background color.  |
| primaryButtonTextColor         | Primary action button text color.                |
| primaryButtonBorderColor       | Primary action button border color.              |
| secondaryButtonBgColor         | Secondary button background color.               |
| secondaryButtonPressedBgColor  | Primary action button pressed background color.  |
| secondaryButtonTextColor       | Secondary action button text color.              |
| secondaryButtonBorderColor     | Secondary action button border color.            |
| docTypeBgColor                 | Document type selection button color.            |
| docTypeBorderColor             | Document type selection button border color.     |
| docTypeTextColor               | Document type title text color.                  |
| headerTitle                    | Title heading text color.                        |
| subheaderTitle                 | Subheading text color.                           |
| linkButtonTextColor            | Links color.                                     |
| uiInterfaceStyle               | Set the SDK to use dark mode (`.dark`),  light mode (`.light`), or system inherited (`.inherited`).                     |
------------------------------------------------------------------------------------

### Localization

The SDK provides the following language support:

- Arabic - `ar` :united_arab_emirates:
- Dutch - `nl` :netherlands:
- English - `en` :uk:
- French - `fr` :fr:
- German - `de` :de:
- Hindi - `hi` :india:
- Italian - `it` :it:
- Norwegian - `no` :norway:
- Polish - `po` :poland:
- Portuguese - `pt` :portugal:
- Spanish - `es` :es:
- Swedish - `sv` :sweden:
- Chinese (Simplified) - `zh` :cn:

## Result handling

To handle result callbacks, your view controller must implement the `onError`, `onCancelled`, and `onSuccess` functions, then add them to the react native component:

```javascript
function onSuccess(results){
  console.log(results);
}

function onCancelled(){
  console.log("The user cancelled");
}

function onError(error){
  console.log(error);
}

return(<View>
    <ComplyCube 
      settings={settings}
      onSuccess={onSuccess}
      onCancel={onCancelled}
      onError={onError}
       />
  </View>
)
```

Upon an `onSuccess` callback, you can create check requests using the captured data. The IDs of the uploaded resources are returned in the `results` parameter.

For example, our default flow, which includes an Identity Document, a Selfie (Live Photo), and Proof of Address, would have a results parameter with `"documentIds": ["xxxxx"]`, `"livePhotoIds": ["xxxxx"]`, `"liveVideoIds": ["xxxxxx"]`, and `"poaIds": ["xxxxxx"]`.

## Error handling

If the SDK experiences any issues, an error object is returned with a description and the error code.

| Error code | Description                                                                                    |
| ---------- | ---------------------------------------------------------------------------------------------- |
| ```ComplyCubeErrorCode.NotAuthorized``` | The SDK has attempted a request to an endpoint you are not authorized to use.|
| ```ComplyCubeErrorCode.ExpiredToken``` | The token used to initialize the SDK has expired. Create a new SDK token and restart the flow. |
| ```ComplyCubeErrorCode.DocumentMandatory``` | A **Document stage** is mandatory with the currently configured stages. |
| ```ComplyCubeErrorCode.JailBroken``` | The SDK cannot be launched on this device as it has been compromised. |
| ```ComplyCubeErrorCode.NoDocumentTypes``` | A **Document stage** has been initialized without setting document types. |
| ```ComplyCubeErrorCode.BiometricStageCount``` | The configuration provided contains duplicate **Selfie photo** or **Selfie video** stages. |
| ```ComplyCubeErrorCode.UploadError``` | An error occurred during the upload document or selfie upload process. |
| ```ComplyCubeErrorCode.InvalidCountryCode``` | An invalid country code is provided. |
| ```ComplyCubeErrorCode.UnsupportedCountryTypeCombination``` | An unsupported country code is provided for a specific document type. |
| ```ComplyCubeErrorCode.FlowError``` | An unrecoverable error occurred during the flow. |
| ```ComplyCubeErrorCode.MissingToken``` | Attempted to launch the SDK without setting the SDK token. |
| ```ComplyCubeErrorCode.DuplicateStages``` | Launch configuration contains duplicate stages. |
| ```ComplyCubeErrorCode.UploadRequireGuidance``` | If `liveCapture` is set to `false`, enabling the guidance feature is required. This can be done by setting `isGuidanceEnabled` to `true`.|
| ```ComplyCubeErrorCode.Unknown``` | An unexpected error has occurred. If this keeps occurring, let us know about it. |

## Events tracking

Below is the list of events being tracked by the SDK:

| Event | Description |
| --- | --- |
| ```BIOMETRICS_STAGE_SELFIE_CAMERA``` | The client reached capture camera for a selfie. |
| ```BIOMETRICS_STAGE_SELFIE_CAMERA_MANUAL_MODE``` | The client reached manual capture camera for a selfie. |
| ```BIOMETRICS_STAGE_SELFIE_CAPTURE_GUIDANCE``` | The client has reached the guidance screen showing how to take a good selfie. |
| ```BIOMETRICS_STAGE_SELFIE_CHECK_QUALITY``` | The client has reached the photo review screen after capturing a selfie photo.. |
| ```BIOMETRICS_STAGE_VIDEO_ACTION_ONE``` | The client reached the first action in a video selfie |
| ```BIOMETRICS_STAGE_VIDEO_ACTION_TWO``` | The client reached the second action in a video selfie. |
| ```BIOMETRICS_STAGE_VIDEO_CAMERA``` | The client reached capture camera for a video selfie. |
| ```BIOMETRICS_STAGE_VIDEO_CAMERA_MANUAL_MODE``` | The client reached manual capture camera for a video selfie. |
| ```BIOMETRICS_STAGE_VIDEO_CHECK_QUALITY``` | The client has reached the video review screen after recording a video selfie. |
| ```CAMERA_ACCESS_PERMISSION``` | The client has reached the permission request screen for camera permissions. |
| ```COMPLETION_STAGE``` | The client has reached the Completion screen. |
| ```CONSENT_STAGE``` | The client has reacher the consent stage screen. |
| ```CONSENT_STAGE_WARNING``` | The client has attempted to exit without giving consent and receive a confirmation prompt. |
| ```DOCUMENT_STAGE_TWO_SIDE_CHECK_QUALITY_BACK``` | The client reached quality preview screen for the back side of a two-sided ID document. |
| ```DOCUMENT_STAGE_TWO_SIDE_CHECK_QUALITY_FRONT``` | The client reached quality preview screen for the front side of a two-sided ID document. |
| ```DOCUMENT_STAGE_ONE_SIDE_CHECK_QUALITY``` | The client reached image quality preview screen for one-sided ID document. |
| ```DOCUMENT_STAGE_TWO_SIDE_CAMERA_BACK``` | The client reached camera for the back side of a two-sided ID document. |
| ```DOCUMENT_STAGE_TWO_SIDE_CAMERA_BACK_MANUAL_MODE``` | The client reached manual capture camera for the back side of two-sided ID document. |
| ```DOCUMENT_STAGE_TWO_SIDE_CAMERA_FRONT``` | The client reached camera stage for the front side of two-sided ID document. |
| ```DOCUMENT_STAGE_TWO_SIDE_CAMERA_FRONT_MANUAL_MODE``` | The client reached manual capture camera for the back side of two-sided ID document. |
| ```DOCUMENT_STAGE_ONE_SIDE_CAMERA_MANUAL_MODE``` | The client reached manual capture camera of one-sided ID document. |
| ```DOCUMENT_STAGE_ONE_SIDE_CAMERA``` | The client reached the capture camera stage for a one-sided ID document. |
| ```DOCUMENT_STAGE_DOCUMENT_TYPE``` | The client has reached the document type selection screen for an ID Document capture stage. |
| ```DOCUMENT_STAGE_SELECT_COUNTRY``` | The client reached country selection screen for ID document. |
| ```DOCUMENT_STAGE_CAPTURE_GUIDANCE``` | The client reached capture guidance screen for ID document. |
| ```INTRO``` | The client has reached the intro screen. |
| ```PROOF_OF_ADDRESS_STAGE_TWO_SIDE_CHECK_QUALITY_FRONT``` | The client reached quality preview screen for the front side of a two-sided proof of address document. |
| ```PROOF_OF_ADDRESS_STAGE_CAPTURE_GUIDANCE``` | The client has reach capture guidance screen for proof of address document. |
| ```PROOF_OF_ADDRESS_STAGE_TWO_SIDE_CHECK_QUALITY_BACK``` | The client reached quality preview screen for the back side of a two-sided proof of address document. |
| ```PROOF_OF_ADDRESS_STAGE_ONE_SIDE_CHECK_QUALITY``` | The client reached quality preview screen for a one-sided proof of address document. |
| ```PROOF_OF_ADDRESS_STAGE_DOCUMENT_TYPE``` | The client has reached the document type selection screen for a Proof Of Address capture stage. |
| ```PROOF_OF_ADDRESS_STAGE_ONE_SIDE_CAMERA``` | The client reached capture camera stage for a one-sided proof of address. |
| ```PROOF_OF_ADDRESS_STAGE_TWO_SIDE_CAMERA_FRONT_MANUAL_MODE``` | The client reached manual capture camera for the front side of a two-sided proof address document. |
| ```PROOF_OF_ADDRESS_STAGE_TWO_SIDE_CAMERA_FRONT``` | The client reached capture camera for the front side of a two-sided proof address document. |
| ```PROOF_OF_ADDRESS_STAGE_TWO_SIDE_CAMERA_BACK_MANUAL_MODE``` | The client reached manual capture camera for the back side of a two-sided proof address document. |
| ```PROOF_OF_ADDRESS_STAGE_ONE_SIDE_CAMERA_MANUAL_MODE``` | The client reached manual capture camera for the front side of a one-sided proof address document. |
| ```PROOF_OF_ADDRESS_STAGE_SELECT_COUNTRY``` | The client reached country selection screen for a proof of address document. |
| ```PROOF_OF_ADDRESS_STAGE_TWO_SIDE_CAMERA_BACK``` | The client reached camera for the back side of a two-sided proof address document. |

## Custom event handler

If you want to implement your own user tracking, the SDK enables you to insert your custom tracking code for the [tracked events](#events-tracking).

To incorporate your own tracking, define a function and apply it using the `eventHandler` property when initializing the `settings`:

```javascript
function myCustomEventHandler(event){
  /* Custom event handling code */
  console.log(event.code);
  console.log(event.message);
}

const settings = {
  ...
  stages: [
    ...
  ]
  ...
  lookAndFeel: {
      ...
  }
  eventHandler: {myCustomEventHandler}
}
```

## Token expiry Handler

If you want to automatically manage token expiration, you can use a callback function to generate a new token and seamlessly continue the process with it.

```javascript
function myCustomExpiryHandler(){
  /* Custom token expiry handler code */
}

const settings = {
  ...
  stages: [
    ...
  ]
  ...
  lookAndFeel: {
      ...
  }
  eventHandler: {myCustomEventHandler},
  tokenExpiryHandler: {myCustomExpiryHandler}
}
```

## NFC capture

With the ComplyCube SDK, you can read NFC-enabled identity documents and confirm their authenticity and identity.

To perform an NFC read, you'll first have to scan the document to obtain the necessary key for accessing the chip.

> :information_source: Please get in touch with your **Account Manger** or **[support](https://support.complycube.com/hc/en-gb/requests/new)** to get access to our NFC Enabled Mobile SDK.

The SDK supports the following features

- Basic access control
- Secure messaging
- Passive Authentication
- Active authentication
- Chip authentication

The **NFC stage** can only be initialized following a **Document stage**, otherwise you will encounter a `ComplyCubeErrorCode.DocumentMandatory` error.

```javascript
const settings = {
  ...
    stages : [
      {
        name: 'documentCapture',
        ...
      },
      'nfcCapture'
    ]
}
```

## Going live

Check out our handy [integration checklist here](https://docs.complycube.com/documentation/guides/integration-checklist) before you go live.

## Additional info

You can find our full [API reference here](https://docs.complycube.com/api-reference), and our guides and example flows can be found [here](https://docs.complycube.com/documentation/).
