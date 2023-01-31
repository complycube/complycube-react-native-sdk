# ComplyCube React native SDK

 ![ComplyCube](statics/complycube_loves_rn.png)


> :information_source: Please get in touch with your **Account Manger** or **[support](https://support.complycube.com/hc/en-gb/requests/new)** to get access to our Mobile SDK.

> :warning: If you were using our previous generation SDK (deprecated), please migrate to this one. Get in touch with support if you have any questions.

# Table of contents
- [Features](#features)
- [Requirements](#1-requirements)
  - [iOS](#ios)
  - [Android](#android)
- [Installing the SDK](#2-installing-the-sdk)
  - [CocoaPods](#cocoapods)
  - [Android Gradle](#android)
  - [React native library](#react-native-library)
- [Usage](#3-usage)
  - [Creating a client](#1-creating-a-client)
  - [Creating an SDK token](#2-creating-an-sdk-token)
  - [Prepare stages](#3-prepare-stages)
  - [Client ID and token](#4-client-id-and-token)
  - [Component setup](#5-component-setup)
  - [Perform checks](#6-perform-checks)
  - [Setup webhooks and retrieve results](#7-setup-webhooks-and-retrieve-results)
- [Customization](#4-customization)
  - [Stages](#stages)
    - [Welcome stage](#welcome-stage)
    - [Conscent stage](#conscent-stage)
    - [Document stage](#document-stage)
    - [Selfie photo and video stage](#selfie-photo-and-video-stage)
    - [Proof of address stage](#proof-of-address-stage)
  - [Appearance](#appearance)
- [Localization](#5-localization)
- [Result handling](#6-result-handling)
- [Error handling](#7-error-handling)
- [Going live](#8-going-live)


# Features
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

# 1. Requirements
### IOS
* Swift 5
* iOS 11 and above
* Xcode 13 and above

### Android
* Android 5.0 (API level 21) and above
* AndroidX
* Kotlin 1.5 and above

# 2. Installing the SDK
Before using ComplyCube React Native SDK you need first to set up the environment for both native SDKs iOS and android.

### CocoaPods

1. Before using the ComplyCube SDK, install the Cocoapods Artifactory plugin by running the following command in your terminal:

```bash
gem install cocoapods-art
```

2. To add the library, copy your repository credentials into a `.netrc` file to your home directory and setup the repository:

```bash
pod repo-art add cc-cocoapods-local "https://complycuberepo.jfrog.io/artifactory/api/pods/cc-cocoapods-local"
```

3. Add plugin repos and install the pod using your `ios/Podfile`.

```ruby
plugin 'cocoapods-art', :sources => [
  'cc-cocoapods-release-local'
]
...

target 'YourApp' do
    ...
	pod 'ComplyCube'
    ...
end

```

**Application permissions**

Our SDK uses the device camera and microphone for capture. You must add the following keys to your application `Info.plist` file.

* `NSCameraUsageDescription`

```xml
<key>NSCameraUsageDescription</key>
<string>Used to capture facials biometrics and documents</string>
```

* `NSMicrophoneUsageDescription`

```xml
<key>NSMicrophoneUsageDescription</key>
<string>Used to capture video biometrics</string>
```
### Android
Start by adding your access credentials for the ComplyCube SDK repository to the `android/gradle.properties` file of your **mobile app**:

```gradle
artifactory_user= "USERNAME"
artifactory_password= "ENCRYPTED PASS"
artifactory_contextUrl= https://complycuberepo.jfrog.io/artifactory
```

Then update your application `android/build.gradle` file with the ComplyCube SDK repository maven settings and SDK dependency:

```gradle
plugins {
    ...
    id "com.jfrog.artifactory"
}

repositories {
    mavenCentral()
    google()
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
    implementation "com.complycube:sdk:+"
    ...
}
```

### React native library
Finally install the React Native library:
```bash
npm i -s complycube-react-native
```

# 3. Usage
## 1. Creating a client
Before launching the SDK, your app must first 
[create a client](https://docs.complycube.com/api-reference/clients/create-a-client)
using the ComplyCube API.
A client represents the individual on whom you need to perform identity verification checks on. A client is required to generate an SDK token.
This must be done on your mobile app backend server.
Example request

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
### Example response

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

## 2. Creating an SDK token
SDK Tokens enable clients to securely send personal data from your mobile app to ComplyCube. [To learn more about our SDK Token endpoint](https://docs.complycube.com/api-reference/other-resources/tokens).

You must generate a new token each time you initialize the ComplyCube Web SDK.
Example request

```curl
curl -X POST https://api.complycube.com/v1/tokens \
     -H 'Authorization: <YOUR_API_KEY>' \
     -H 'Content-Type: application/json' \
     -d '{
          	"clientId":"CLIENT_ID",
          	"appId": "com.complycube.SampleApp"
         }'
```
## Example response
```json
{
    "token": "<CLIENT_TOKEN>"
}
```

## 3. Prepare stages

Set up the stages you want to include in a setting object so you can use it in the React Native component.

 
```javascript
const settings = {
  ...
  stages: [
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
  ],
  ...
}
```

## 4. Client ID and token

Setup also client id and token within the setting object:
```javascript
const settings = {
  clientID: "<CLIENT_ID>",
  clientToken: "<CLIENT_TOKEN>"
  ...
}
```

## 5. Component setup

Now you can use the ComplyCube component on your screen

return (
    <View style={styles.container}>
      <ComplyCube settings={settings} />
    </View>
  );

## 6. Perform checks

Using the results returned in the onSuccess callback, you can trigger your mobile backend to run the necessary checks on your client.

For example, use the result of a selfie and document capture as follows;

result.documentId to run a [Document Check](https://docs.complycube.com/api-reference/check-types/document-check)

result.documentId and result.livePhotoId to run an [Identity Check](https://docs.complycube.com/api-reference/check-types/identity-check)

Example request
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

## 7. Setup webhooks and retrieve results

Our checks are asynchronous, and all results and event notifications are done via webhooks.

Follow our [webhook guide](https://docs.complycube.com/documentation/guides/webhooks) for a step-by-step walkthrough.

Your mobile backend can retrieve all check results using our API.

# 4. Customization

## Stages

Each stage in the flow can be customized to create the ideal journey for your clients. Every stage must be in the stages array in the settings object.

Stages can be a string or an object that contains the stage’s customizations.

### Welcome stage

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

### Consent stage

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


### Document stage

This stage allows clients to select the type of identity document they would like to submit. You can customize these screens to:

* Limit the scope of document types the client can select, e.g., Passport only.
* Set the document issuing countries they are allowed for each document type.
* Add or remove automated capture using smart assistance.
* Show or hide the instruction screens before capture.
* Set a retry limit to allow clients to progress the journey regardless of capture quality.

> If you provide only one document type, the document type selection screen will be skipped. The country selection screen will be skipped if you provide only a single country for a given document type.

You can remove the information screens shown before camera captures by enabling or disabling guidance. You should only consider omitting this if you have clearly informed your customer of the capture steps required.
<br>
> :warning: Please note the retryLimit you set here will take precedence over the retry limit that has been set globally in the [developer console](https://portal.complycube.com/automations).

```javascript
const settings = {
  ...
  stages: [
    ...
   {
        name: 'documentCapture',
        showGuidance: false,
        useMLAssistance: true,
        retryLimit: 1,
        liveCapture: false,
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

### Selfie photo and video stage

You can request a selfie photo ([live photo](https://docs.complycube.com/api-reference/live-photos)) capture or video ([live video](https://docs.complycube.com/api-reference/live-videos)) capture from your customer.

```javascript
const settings = {
  ...
  stages: [
    ...
   {
        name: 'faceCapture',
        mode: 'photo', // Or video
        useMLAssistance: false
    },
      ...
  ]
  ...
}
```

### Proof of address stage

When requesting a proof of address document, you can set the allowed document type and whether the client can upload the document. When liveCapture is set to false, the client will be forced to perform a live capture.
```javascript
const settings = {
  ...
  stages: [
    ...
   {
        name: 'poaCapture',
        liveCapture: false
    },
      ...
  ]
  ...
}
```

## Appearance

The SDK allows you to set colors to match your existing application or brand. You can customize the colors by setting the relevant values when building your flow. You also have to put it in settings object:

```javascript
const settings = {
  ...
  stages: [
    ...
  ]
  ...
  scheme: {
      primaryButtonBgColor: '#FFFFFF',
    }
}
```
| Property                       | Description                                     | 
| ------------------------------ | ----------------------------------------------- |
| primaryButtonBgColor           | Primary action button background color          |
| primaryButtonPressedBgColor    | Primary action button pressed background color  |
| primaryButtonTextColor         | Primary action button text color                |
| primaryButtonBorderColor       | Primary action button border color              |
| secondaryButtonBgColor         | Secondary button background color               |
| secondaryButtonPressedBgColor  | Primary action button pressed background color  |
| secondaryButtonTextColor       | Secondary action button text color              |
| secondaryButtonBorderColor     | Secondary action button border color            |
| docTypeBgColor                 | Document type selection button color            |
| docTypeBorderColor             | Document type selection button border color     |
| docTypeTextColor               | Document type title text color                  |
| headerTitle                    | Title heading text color                        |
| subheaderTitle                 | Subheading text color                           |
| linkButtonTextColor            | Links color                                     |
------------------------------------------------------------------------------------

# 5. Localization

The SDK provides the following language support:

* English - en 🇬🇧
* French - fr 🇫🇷
* German - de 🇩🇪
* Italian - it 🇮🇹
* Spanish - es 🇪🇸


# 6. Result handling

To handle result callbacks, your view controller must implement the onError, onCancelled, and onSuccessfunctions, then add them to the react native component:
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

...return(<View>
    <ComplyCube 
      settings={settings}
      onSeuccess={onSuccess}
      onCancel={onCancelled}
      onError={onError}
       />
  </View>
)
```

Upon an onSuccess callback, you can create check requests using the captured data. The IDs of the uploaded resources are returned in the `results` parameter. Which is a JavaScript object.

For example, our default flow, which includes an Identity Document, a Selfie (Live Photo), and Proof of Address, would have a results parameter with `"documentIds": ["xxxxx"]`, `"livePhotoId": ["xxxxx"]`, and `"poaIds": ["xxxxxx"]`.


# 7. Error handling

If the SDK experiences any issues, an error object is returned with the description and the error code.

| Error code | Description                                                                                    |
| ---------- | ---------------------------------------------------------------------------------------------- |
| 1          | The SDK has attempted a request to an endpoint you are not authorized to use.                  |
| 2          | The token used to initialize the SDK has expired. Create a new SDK token and restart the flow. |
| 3          | An unexpected error has occurred. If this keeps occurring, let us know about it.               |
---------------------------------------------------------------------------------------------------------------

# 8. Going live
Check out our handy [integration checklist here](https://docs.complycube.com/documentation/guides/integration-checklist) before you go live.

# Additional info
You can find our full [API reference here](https://docs.complycube.com/api-reference), and our guides and example flows can be found [here](https://docs.complycube.com/documentation/).