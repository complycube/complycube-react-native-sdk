# ComplyCube iOS SDK

The ComplyCube React native SDK makes it quick and easy to build a frictionless customer onboarding and biometric re-authentication experience in your iOS app. We provide powerful, smart, and customizable UI screens that can be used out-of-the-box to capture the data you need for identity verification.

> :information_source: Please get in touch with your **Account Manager** or **[support](https://support.complycube.com/hc/en-gb/requests/new)** to get access to our Mobile SDK.

> :warning: If you were using our previous generation SDK (deprecated), please migrate to this one. Get in touch with support if you have any questions.

## Table of contents

- [Features](#features)
- [Requirements](#requirements)
- [Getting started](#getting-started)
  - [1. Installing the SDK](#1-installing-the-sdk)
    - [CocoaPods](#cocoapods)
    - [Application permissions](#application-permissions)
- [Going live](#going-live)
- [Additional info](#additional-info)

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

### iOS

- Swift 5
- iOS 11 and above
- Xcode 13 and above

### Android

- Android 5.0 (API level 21) and above
- AndroidX
- Kotlin 1.5 and above

## Getting started

Get started with our [user guide](https://doc.complycube.com) for an overview of our core platform and its multiple features, or browse the [API reference](https://docs.complycube.com/api-reference) for fine-grained documentation of all our services.

<p align="center">
<img
 src="https://assets.complycube.com/images/github-mobile-sdk-flow.png"
 alt="ComplyCube Mobile SDK integration flow."
/>
Mobile SDK integration flow
</p>

### Installing the SDK

#### React Native setup

Configure the npm registry to use the ComplyCube SDK repository by modifying the .npmrc file in your home directory. For Windows users, this file can be found at C:\Users\{username}\.npmrc. For users of Unix-based systems, the file is located in ~/.npmrc. Add settings copied from jFrog to the file.

```
@complycube:registry=https://complycuberepo.jfrog.io/artifactory/api/npm/cc-react-native-npm-local/
//complycuberepo.jfrog.io/artifactory/api/npm/cc-react-native-npm-local/:_password=<PASSWORD>
//complycuberepo.jfrog.io/artifactory/api/npm/cc-react-native-npm-local/:username=<EMAIL>
//complycuberepo.jfrog.io/artifactory/api/npm/cc-react-native-npm-local/:email=<EMAIL>
//complycuberepo.jfrog.io/artifactory/api/npm/cc-react-native-npm-local/:always-auth=true
```

Then setup the library:

```
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
   Remember to fetch your credentials from Jfrog using the Set Me Up button [here](https://complycuberepo.jfrog.io/ui/repos/tree/General/cc-cocoapods-release-local) 
   
   
3. Add plugin repos and install the pod using your `Podfile`.

```ruby
plugin 'cocoapods-art', :sources => [
    'cc-cocoapods-release-local'
]

...

platform :ios, '13.0' # Or above

target 'YourApp' do

    use_frameworks!
    use_modular_headers!

    ...
end

# We need to add this post_install script to update the underneath Pods
post_install do |installer|
  installer.pods_project.targets.each do |target|
    target.build_configurations.each do |build_configuration|
      build_configuration.build_settings['ENABLE_BITCODE'] = 'NO'
      build_configuration.build_settings['BUILD_LIBRARY_FOR_DISTRIBUTION'] = 'YES'
      build_configuration.build_settings['IPHONEOS_DEPLOYMENT_TARGET'] = '13.1'
      build_configuration.build_settings['ARCHS'] = ['$(ARCHS_STANDARD)', 'x86_64']
      build_configuration.build_settings['EXCLUDED_ARCHS[sdk=iphonesimulator*]'] = ['arm64', 'arm64e', 'armv7', 'armv7s']
      build_configuration.build_settings['GENERATE_INFOPLIST_FILE'] = 'YES'

    end
  end
end
```

### Android

Start by adding your access credentials for the ComplyCube SDK repository to the gradle.properties file of your mobile app:

```gradle
artifactory_user= "USERNAME"
artifactory_password= "ENCRYPTED PASS"
artifactory_contextUrl= https://complycuberepo.jfrog.io/artifactory
```

Then update your project level `build.gradle` file with the ComplyCube SDK repository maven settings:

```gradle
buildscript {
    ...
    repositories {
        ...
      
    }
    dependencies {
        ....
        //Check for the latest version here: http://plugins.gradle.org/plugin/com.jfrog.artifactory
        classpath "org.jfrog.buildinfo:build-info-extractor-gradle:4+"
    }
}

allprojects {
    apply plugin: "com.jfrog.artifactory"
    ...
}

artifactory {
  contextUrl = "${artifactory_contextUrl}"  
  resolve {
    repository {
      repoKey = 'cc-gradle-release-local'
      username = "${artifactory_user}"
      password = "${artifactory_password}"
      maven = true
    }
  }
}
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

#### Integrating the SDK

Follow our step-by-step guide on integrating the SDK [here](https://docs.complycube.com/documentation/guides/mobile-sdk-guide/mobile-sdk-integration-guide)

#### Running the Project
