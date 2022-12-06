import React.RCTViewManager

@objc (ComplyCubeViewManager)
class ComplyCubeViewManager: RCTViewManager {
 
  override static func requiresMainQueueSetup() -> Bool {
    return true
  }
 
  override func view() -> UIView! {
    return ComplyCubeView()
  }
 
}
