//
//  SchemeColorManager.swift
//  ComplyCubeReactNativeSDK
//
//  Created by Kenshin Vag on 10/11/2022.
//

import Foundation
import ComplyCubeMobileSDK
import UIKit


class ComplyCubeSchemeHandler{
  var schemeManager: ComplyCubeColourScheme = ComplyCubeColourScheme()
  
  public static func handleSchemes(_ settings: [AnyHashable: Any]) -> ComplyCubeColourScheme {
    var schemes = ComplyCubeSchemeHandler()
    schemes.buildSchemeFromSettings(settings)
    return schemes.getScheme()
  }
  
  public func buildSchemeFromSettings(_ settings: [AnyHashable: Any]){
    // Set colours popup
    if settings["popUpBgColor"] != nil {
      schemeManager.popUpBgColor = UIColor(hexString: settings["popUpBgColor"] as! String)
    }
    if settings["popUpTitleColor"] != nil {
      schemeManager.popUpTitleColor = UIColor(hexString: settings["popUpTitleColor"] as! String)
    }
    
    // Set colours primary button
    if settings["primaryButtonBgColor"] != nil {
      schemeManager.primaryButtonBgColor = UIColor(hexString: settings["primaryButtonBgColor"] as! String)
    }
    if settings["primaryButtonTextColor"] != nil {
      schemeManager.primaryButtonTextColor = UIColor(hexString: settings["primaryButtonTextColor"] as! String)
    }
    if settings["primaryButtonBorderColor"] != nil {
      schemeManager.primaryButtonBorderColor = UIColor(hexString: settings["primaryButtonBorderColor"] as! String)
    }
    if settings["primaryButtonPressedBgColor"] != nil {
      schemeManager.primaryButtonPressedBgColor = UIColor(hexString: settings["primaryButtonPressedBgColor"] as! String)
    }
    
    // Set colours to secondary buttons
    if settings["secondaryButtonBgColor"] != nil {
      schemeManager.secondaryButtonBgColor = UIColor(hexString: settings["secondaryButtonBgColor"] as! String)
    }
    if settings["secondaryButtonTextColor"] != nil {
      schemeManager.secondaryButtonTextColor = UIColor(hexString: settings["secondaryButtonTextColor"] as! String)
    }
    if settings["secondaryButtonBorderColor"] != nil {
      schemeManager.secondaryButtonBorderColor = UIColor(hexString: settings["secondaryButtonBorderColor"] as! String)
    }
    if settings["secondaryButtonPressedBgColor"] != nil {
      schemeManager.secondaryButtonPressedBgColor = UIColor(hexString: settings["secondaryButtonPressedBgColor"] as! String)
    }
    
    // Set document scheme
    if settings["docTypeBgColor"] != nil {
      schemeManager.docTypeBgColor = UIColor(hexString: settings["docTypeBgColor"] as! String)
    }
    
    if settings["docTypeBorderColor"] != nil {
      schemeManager.docTypeBorderColor = UIColor(hexString: settings["docTypeBorderColor"] as! String)
    }
    
    // links
    if settings["blueBigType"] != nil {
      schemeManager.blueBigType = UIColor(hexString: settings["blueBigType"] as! String)
    }
    if settings["headerTitle"] != nil {
      schemeManager.headerTitle = UIColor(hexString: settings["headerTitle"] as! String)
    }
    if settings["linkButtonTextColor"] != nil {
      schemeManager.linkButtonTextColor = UIColor(hexString: settings["linkButtonTextColor"] as! String)
    }
    if settings["subheaderTitle"] != nil {
      schemeManager.subheaderTitle = UIColor(hexString: settings["subheaderTitle"] as! String)
    }
    if settings["textItemType"] != nil {
      schemeManager.textItemType = UIColor(hexString: settings["textItemType"] as! String)
    }
    if settings["textSecondary"] != nil {
      schemeManager.textSecondary = UIColor(hexString: settings["textSecondary"] as! String)
    }
  }
  
  public func getScheme() -> ComplyCubeColourScheme {
    return self.schemeManager
  }
}


extension UIColor {
    convenience init(hexString: String, alpha: CGFloat = 1.0) {
        let hexString: String = hexString.trimmingCharacters(in: CharacterSet.whitespacesAndNewlines)
        let scanner = Scanner(string: hexString)
        if (hexString.hasPrefix("#")) {
            scanner.scanLocation = 1
        }
        var color: UInt32 = 0
        scanner.scanHexInt32(&color)
        let mask = 0x000000FF
        let r = Int(color >> 16) & mask
        let g = Int(color >> 8) & mask
        let b = Int(color) & mask
        let red   = CGFloat(r) / 255.0
        let green = CGFloat(g) / 255.0
        let blue  = CGFloat(b) / 255.0
        self.init(red:red, green:green, blue:blue, alpha:alpha)
    }
    func toHexString() -> String {
        var r:CGFloat = 0
        var g:CGFloat = 0
        var b:CGFloat = 0
        var a:CGFloat = 0
        getRed(&r, green: &g, blue: &b, alpha: &a)
        let rgb:Int = (Int)(r*255)<<16 | (Int)(g*255)<<8 | (Int)(b*255)<<0
        return String(format:"#%06x", rgb)
    }
}
