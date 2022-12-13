package com.complycubereactnative

// replace with your view's import
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import com.complycube.sdk.ComplyCubeSdk
import com.complycube.sdk.common.data.ClientAuth
import com.complycube.sdk.presentation.theme.SdkColors
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.modules.core.DeviceEventManagerModule
import com.facebook.react.modules.core.DeviceEventManagerModule.RCTDeviceEventEmitter
import org.json.JSONObject

class MyFragment(settings: ReadableMap, emitter: DeviceEventManagerModule.RCTDeviceEventEmitter) : Fragment() {
    private lateinit var customView: ComplyCubeView
    private var settings = settings
    private var emitter = emitter
    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View {
        super.onCreateView(inflater, container, savedInstanceState)
        // Get stettings object
        val s = ComplyCubeSettings(settings)

        customView = ComplyCubeView(requireNotNull(context))
        // Event listener
        var builder = ComplyCubeSdk.Builder(this){
            System.out.println("CC_________: ${it}")
            emitter.emit("ComplyCubeCancel", JSONObject().put("message", it).toString())
        }
        // Prepare stages

        builder.withStages(s.stages[0], *s.stages)
        ccLog("Stages: ${s.countries.size}")
        builder.withCountries(s.countries[0], *s.countries.drop(1).toTypedArray())
        if(s.colorScheme != null){
            builder.withCustomColors(s.colorScheme as SdkColors)
        }
        builder.start(
            ClientAuth(
                s.clientToken
                ,s.clientID
            )
        )

        return customView // this CustomView could be any view that you want to render
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        // do any logic that should happen in an `onCreate` method, e.g:
        // customView.onCreate(savedInstanceState);
    }

    override fun onPause() {
        super.onPause()
        // do any logic that should happen in an `onPause` method
        // e.g.: customView.onPause();
    }

    override fun onResume() {
        super.onResume()
        // do any logic that should happen in an `onResume` method
        // e.g.: customView.onResume();
    }

    override fun onDestroy() {
        super.onDestroy()
        // do any logic that should happen in an `onDestroy` method
        // e.g.: customView.onDestroy();
    }
}