//
//  settingsManager.swift
//  cccomponent
//
//  Created by Kenshin Vag on 8/11/2022.
//

import Foundation
import ComplyCubeMobileSDK

@objc(SettingManager)
class SettingManager: NSObject {
  var token: String = ""
  var clientID: String = ""
  var stages: [Any] = []
  var scheme: ComplyCubeColourScheme = ComplyCubeColourScheme()
  
  init(request: [AnyHashable: Any]){
    super.init()
    // TODO: CHeck errors Before you go
    if request["clientToken"] == nil
        || request["clientID"] == nil
        || request["stages"] == nil {
      return
    }
    self.token = request["clientToken"] as! String
    self.clientID = request["clientID"] as! String
    self.stages = StagesHandler.handleStages(stages: request["stages"] as! [Any])
    if request["scheme"] != nil {
      self.scheme = ComplyCubeSchemeHandler.handleSchemes(request["scheme"] as! [AnyHashable: Any])
    } 
  }
}

let Stages:[String: Any] = [
  "intro": WelcomeStageBuilder().build(),
  "conscent": UserConsentStageBuilder().build(),
  "documentCapture": DocumentStageBuilder().build(),
  "faceCapture": BiometricStageBuilder().build(),
  "poaCapture": AddressStageBuilder().build()
]

// Todo: Implement the country

func getDocumentByType(_ key: String, countries: [String] = []) -> Any{
    switch key {
      case "passport":
        return DocumentTypes.passport
      case "driving_license":
      return DocumentTypes.drivingLicence(countries.count > 0 ? countries : ComplyUtils.allCountries())
      case "national_identity_card":
        return DocumentTypes.nationalIdentityCard(countries.count > 0 ? countries : ComplyUtils.allCountries())
      case "residence_permit":
        return DocumentTypes.residencePermitCard(countries.count > 0 ? countries : ComplyUtils.allCountries())
      case "bank_statement":
        return DocumentTypes.bankStatement(countries.count > 0 ? countries : ComplyUtils.allCountries())
      case "utility_bill":
        return DocumentTypes.utilityBill(countries.count > 0 ? countries : ComplyUtils.allCountries())
    default:
      return false
    }
  
}


class StagesHandler: NSObject {
  public static func extractStage(stage: Any) -> Any {
    if let s = stage as? String {
      let x = s
      return Stages[x]!
    }else{
      if let y = (stage as? [AnyHashable: Any]){
        
        let name = y["name"] as! String
        switch name {
        case "intro":
          let builder = WelcomeStageBuilder()
          
          if (y["heading"] != nil){
            builder.setTitle(title: (y["heading"] as! String))
          }
          if (y["message"] != nil){
            builder.setMessage(message: (y["message"] as! String))
          }
          return builder.build()
          
        case "documentCapture":
          
          let builder = DocumentStageBuilder()
          // Device only
          if (y["crossDeviceOnly"] != nil){
            builder.useLiveCaptureOnly(enable: y["crossDeviceOnly"] as! Bool)
          }

          if (y["documentTypes"] != nil){
            var documents: [DocumentTypes] = []
            for (key, document) in (y["documentTypes"] as! [AnyHashable: Any]) {
              if document is String {
                if document as! String == "true" {
                  documents.append(getDocumentByType(key as! String) as! DocumentTypes)
                }
              }else {
                if document is [String]{
                  let countries: [String] = document as! [String]
                  documents.append(getDocumentByType(key as! String, countries: countries) as! DocumentTypes)
                }
              }
              builder.setAllowedDocumentTypes(types: documents)
              // ML settings
                if(y["useMLAssistance"] != nil){
                    if(forceJSONBoolean(y["useMLAssistance"])){
                        builder.setEnableMLAssistant(enable: true)
                    }else{
                        builder.setEnableMLAssistant(enable: false)
                    }
                }
              // Guidance
                if(y["showGuidance"] != nil){
                    if(forceJSONBoolean(y["showGuidance"])){
                        builder.setShowGuidance(enable: true)
                    }else{
                        builder.setShowGuidance(enable: false)
                    }
                }
              // retry limits
                if(y["retryLimit"] != nil){
                    let retries: Int = forceJSONInt(y["retryLimit"])
                    builder.setRetryLimit(count: retries)
                }
              
              // use nlive capture
                if(y["liveCapture"] != nil){
                    if(forceJSONBoolean(y["liveCapture"])){
                        print("----------------------- with live capture")
                        builder.useLiveCaptureOnly(enable: true)
                    }else {
                        print("----------------------- without live capture")
                        builder.useLiveCaptureOnly(enable: false)
                    }
                }
                // Title
                  if(y["title"] != nil){
                      builder.setTitle(title: y["title"] as! String)
                  }
              
            }}
            
            
          return builder.build()
        case "faceCapture":
          let builder = BiometricStageBuilder()
          if(y["mode"] != nil) {
            let mode = y["mode"] as! String
            builder.setType(type: (mode == "photo" ? BiometricType.photo : BiometricType.video))
          }
            // ML settings
              if(y["useMLAssistance"] != nil){
                  if(forceJSONBoolean(y["useMLAssistance"])){
                      builder.setEnableMLAssistant(enable: true)
                  }else{
                      builder.setEnableMLAssistant(enable: false)
                  }
              }
            // Guidance
              if(y["showGuidance"] != nil){
                  if(forceJSONBoolean(y["showGuidance"])){
                      builder.setShowGuidance(enable: true)
                  }else{
                      builder.setShowGuidance(enable: false)
                  }
              }
            // retry limits
              if(y["retryLimit"] != nil){
                  let retries: Int = forceJSONInt(y["retryLimit"])
                  builder.setRetryLimit(count: retries)
              }
            
            // use nlive capture
              if(y["liveCapture"] != nil){
                  if(forceJSONBoolean(y["liveCapture"])){
                      builder.useLiveCaptureOnly(enable: true)
                  }else {
                      builder.useLiveCaptureOnly(enable: false)
                  }
              }
          return builder
        case "poaCapture":
          let builder = AddressStageBuilder()
            // ML settings
              if(y["useMLAssistance"] != nil){
                  if(forceJSONBoolean(y["useMLAssistance"])){
                      builder.setEnableMLAssistant(enable: true)
                  }else{
                      builder.setEnableMLAssistant(enable: false)
                  }
              }
            // Guidance
              if(y["showGuidance"] != nil){
                  if(forceJSONBoolean(y["showGuidance"])){
                      builder.setShowGuidance(enable: true)
                  }else{
                      builder.setShowGuidance(enable: false)
                  }
              }
            // retry limits
              if(y["retryLimit"] != nil){
                  let retries: Int = forceJSONInt(y["retryLimit"])
                  builder.setRetryLimit(count: retries)
              }
            
            // use nlive capture
              if(y["liveCapture"] != nil){
                  if(forceJSONBoolean(y["liveCapture"])){
                      builder.useLiveCaptureOnly(enable: true)
                  }else {
                      builder.useLiveCaptureOnly(enable: false)
                  }
              }
          return builder.build()
        default:
          return ""
        }
        }else{
          return false
        }
    }
    
    /// return ComplyCubeStage.welcomeStage
  }
  
  public static func handleStages(stages: [Any]) -> [Any]{
    var results: [Any] = []
    for i in stages {
      results.append(self.extractStage(stage: i))
    }
    return results
  }
    public static func forceJSONBoolean(_ input: Any?) -> Bool{
        if(input is Bool){
            return input as! Bool
        }
        if(input is String){
            return input as! String == "true"
        }
        return false
    }
    public static func forceJSONInt(_ input: Any?) -> Int {
        if(input is String){
            return Int(input as! String) ?? 0
        }
        if(input is Int){
            return input as! Int
        }
        return 0
    }
}
