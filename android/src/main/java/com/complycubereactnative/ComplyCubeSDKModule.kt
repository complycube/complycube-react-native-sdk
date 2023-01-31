package com.complycubereactnative

import androidx.activity.ComponentActivity
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import com.complycube.sdk.ComplyCubeSdk

class ComplyCubeSDKModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  override fun getName(): String {
    return NAME
  }



  // Example method
  // See https://reactnative.dev/docs/native-modules-android
  @ReactMethod
  fun multiply(a: Double, b: Double, promise: Promise) {
    val current =  this.currentActivity as ComponentActivity
    val a_ = ComplyCubeSdk.Builder(current){
      System.out.println(it);
    };
    promise.resolve(a * b)
  }

  companion object {
    const val NAME = "ComplyCubeSDK"
  }
}
