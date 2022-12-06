import UIKit
import ComplyCubeMobileSDK
import React


class ComplyCubeView: UIView {
  var info: NSString = ""
  var options: NSDictionary = [:]
  
  override init(frame: CGRect) {
    super.init(frame: frame)
    DispatchQueue.main.asyncAfter(deadline: .now() + 1.0) { // Change `2.0` to the desired number of seconds.
       // Code you want to be delayed
      self.setupView()
      
    }

  }
  
  required init?(coder aDecoder: NSCoder) {
    super.init(coder: aDecoder)
    setupView()
  }
  
  @objc func setInformation(_ val: NSString) {
    
    info = val
  }
  
  @objc(setOptions:)
  func setOptions(_ val: NSDictionary) {
    self.options = val
  }
  
  @objc var onError: RCTDirectEventBlock?
  @objc var onComplete: RCTDirectEventBlock?
  @objc var onModalClose: RCTDirectEventBlock?
  @objc var onExit: RCTDirectEventBlock?
  
  @objc func errorCallBack(sender: UIButton){
    if onError == nil {
      return
    }
    let event = [AnyHashable: Any]()
    onError!(event)
  }
  
  @objc func exitCallBack(sender: UIButton){
    if onExit == nil {
      return
    }
    let event = [AnyHashable: Any]()
    onExit!(event)
  }
  
  
  
  
  
  
  private func setupView() {
    

      let sm = SettingManager(request: self.options as! [AnyHashable: Any])
      let complyCubeSDK: ComplyCubeRNSDK = ComplyCubeRNSDK()
      complyCubeSDK.setSettings(self.options as NSObject)
      complyCubeSDK.mount()
  
  }
}

extension UIView {
    func findViewController() -> UIViewController? {
        if let nextResponder = self.next as? UIViewController {
            return nextResponder
        } else if let nextResponder = self.next as? UIView {
            return nextResponder.findViewController()
        } else {
            return nil
        }
    }
}

