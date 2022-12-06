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
            }}
          
          return builder.build()
        case "faceCapture":
          let builder = BiometricStageBuilder()
          if(y["mode"] != nil) {
            let mode = y["mode"] as! String
            builder.setType(type: (mode == "photo" ? BiometricType.photo : BiometricType.video))
          }
          return builder
        case "poaCapture":
          let builder = AddressStageBuilder()
          
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
  
}
