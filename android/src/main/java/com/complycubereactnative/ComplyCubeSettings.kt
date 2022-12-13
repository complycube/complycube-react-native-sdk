package com.complycubereactnative

import android.graphics.Color
import com.complycube.sdk.ComplyCubeSdk
import com.complycube.sdk.common.data.*
import com.complycube.sdk.presentation.theme.SdkColors
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.ReadableMapKeySetIterator
import com.facebook.react.bridge.ReadableType

fun ccLog(message: String) {
    System.out.println("ComplyCube: $message")
}

class ComplyCubeSettings {
    /**
     *
     */
    var clientID: String = ""
    var clientToken: String = ""
    var stages = arrayOf<Stage>() // Can be an array
    var colorScheme: SdkColors? = null
    var sCountries = mutableListOf<String>()
    var countries = arrayOf<Country>()

    public constructor(settings: ReadableMap){
        // TODO Make it more using if haskey to manage errorrs
        clientID = settings.getString("clientID") ?: ""
        clientToken = settings.getString("clientToken") ?: ""
        var stages = settings.getArray("stages")
        var scheme: ReadableMap? = null
        if(settings.hasKey("scheme")){
            scheme = settings.getMap("scheme")
            this.buildScheme(scheme as ReadableMap)
        }
        buildStages(stages as ReadableArray)
        // Convert string countries to Country
        ccLog("Countries: ${sCountries.size}")
        for(country in sCountries.distinct()){
            countries += Country.valueOf(country)
        }
        ccLog("Stages: ${colorScheme.toString()}")
    }

    private fun stageStringToCCStage(stage: String): Stage {
        return when (stage) {
            "intro" -> Stage.DefaultStage.Welcome()
            "complete" -> Stage.DefaultStage.Complete()
            "face_capture" -> Stage.CustomStage.SelfiePhoto()
            else -> Stage.DefaultStage.Complete()
        }
    }
    private fun extractCountries(countries: ReadableArray): MutableList<String> {
        val countriesList = mutableListOf<String>()
        for (i in 0 until countries.size()) {
            countriesList.add(countries.getString(i) ?: "")
        }
        return countriesList
    }
    private fun documentStageMapToCCStage(stage: ReadableMap): Stage{
        var ccStage: Stage? = null
        val stageName: String = stage.getString("name") ?: ""
        // Check if the stages for more information
        when (stageName){
            "intro" -> {
                // Get the other properties
                val heading: String = stage.getString("heading") ?: ""
                val message: String = stage.getString("message") ?: ""
                ccStage = Stage.DefaultStage.Welcome(title = heading, message = message)
            }
            "documentCapture" -> {
                // Extract document types
                val documentTypes: ReadableMap = stage.getMap("documentTypes") as ReadableMap
                // Get keys
                // Get readableMap keys in array form
                var keyIter: ReadableMapKeySetIterator = documentTypes.keySetIterator()
                var keys: MutableList<String> = mutableListOf()
                while (keyIter.hasNextKey()){
                    keys.add(keyIter.nextKey())
                }
                // Iterate through keys and get the values
                var ccDocumentTypes = arrayOf<IdentityDocumentType>()
                for (key in keys){
                    when (key){
                        "passport" -> {
                            // Get document type status
                            if(documentTypes.getType(key) == ReadableType.Boolean){
                                ccDocumentTypes += IdentityDocumentType.Passport()
                            }else if (documentTypes.getType(key) == ReadableType.Array){
                                val countries: ReadableArray = documentTypes.getArray(key) as ReadableArray
                                // Convert ReadableArray to MutableList
                                val ccCountries = this.extractCountries(countries)
                                this.sCountries.addAll(ccCountries)
                                ccDocumentTypes += IdentityDocumentType.Passport()
                            }
                        }
                        "residence_permit" -> {
                            // Get document type status
                            if(documentTypes.getType(key) == ReadableType.Boolean){
                                ccDocumentTypes += IdentityDocumentType.ResidencePermit()
                            }else if (documentTypes.getType(key) == ReadableType.Array){
                                val countries: ReadableArray = documentTypes.getArray(key) as ReadableArray
                                // Convert ReadableArray to MutableList
                                val ccCountries = this.extractCountries(countries)
                                this.sCountries.addAll(ccCountries)
                                ccDocumentTypes += IdentityDocumentType.ResidencePermit()
                            }
                        }
                        "driving_license" -> {
                            // Get document type status
                            if(documentTypes.getType(key) == ReadableType.Boolean){
                                ccDocumentTypes += IdentityDocumentType.DrivingLicence()
                            }else if (documentTypes.getType(key) == ReadableType.Array){
                                val countries: ReadableArray = documentTypes.getArray(key) as ReadableArray
                                // Convert ReadableArray to MutableList
                                val ccCountries = this.extractCountries(countries)
                                this.sCountries.addAll(ccCountries)
                                ccDocumentTypes += IdentityDocumentType.DrivingLicence()
                            }
                        }
                        "national_identity_card" -> {
                            // Get document type status
                            if(documentTypes.getType(key) == ReadableType.Boolean){
                                ccDocumentTypes += IdentityDocumentType.NationalIdentityCard()
                            }else if (documentTypes.getType(key) == ReadableType.Array){
                                val countries: ReadableArray = documentTypes.getArray(key) as ReadableArray
                                // Convert ReadableArray to MutableList
                                val ccCountries = this.extractCountries(countries)
                                this.sCountries.addAll(ccCountries)
                                ccDocumentTypes += IdentityDocumentType.NationalIdentityCard()
                            }
                        }
                        else -> {
                            // Fire an error
                        }
                    }
                }
                ccStage = Stage.CustomStage.Document(ccDocumentTypes[0], *ccDocumentTypes.drop(0).toTypedArray())
            }
            "faceCapture" -> {
                // Get the mode property
                val mode: String = stage.getString("mode") ?: ""
                when (mode){
                    "video" -> {
                        ccStage = Stage.CustomStage.SelfieVideo()
                    }
                    "photo" -> {
                        ccStage = Stage.CustomStage.SelfiePhoto()
                    }
                    else -> {
                        // Fire an error
                    }
                }
            }
            "poaCapture" -> {
                // Extract document types
                val documentTypes: ReadableMap = stage.getMap("documentTypes") as ReadableMap
                // Get keys
                // Get readableMap keys in array form
                var keyIter: ReadableMapKeySetIterator = documentTypes.keySetIterator()
                var keys: MutableList<String> = mutableListOf()
                while (keyIter.hasNextKey()){
                    keys.add(keyIter.nextKey())
                }
                // Iterate through keys and get the values
                var ccDocumentTypes = arrayOf<ProofOfAddressDocumentType>()
                for (key in keys) {
                    when (key) {
                        "utility_bill" -> {
                            // Get document type status
                            if(documentTypes.getType(key) == ReadableType.Boolean){
                                ccDocumentTypes += ProofOfAddressDocumentType.UtilityBill()
                            }else if (documentTypes.getType(key) == ReadableType.Array){
                                val countries: ReadableArray = documentTypes.getArray(key) as ReadableArray
                                // Convert ReadableArray to MutableList
                                val ccCountries = this.extractCountries(countries)
                                this.sCountries.addAll(ccCountries)
                                ccDocumentTypes += ProofOfAddressDocumentType.UtilityBill()
                            }
                        }
                        "bank_statement" -> {
                            // Get document type status
                            if(documentTypes.getType(key) == ReadableType.Boolean){
                                ccDocumentTypes += ProofOfAddressDocumentType.BankStatement()
                            }else if (documentTypes.getType(key) == ReadableType.Array){
                                val countries: ReadableArray = documentTypes.getArray(key) as ReadableArray
                                // Convert ReadableArray to MutableList
                                val ccCountries = this.extractCountries(countries)
                                this.sCountries.addAll(ccCountries)
                                ccDocumentTypes += ProofOfAddressDocumentType.BankStatement()
                            }

                        }
                    }
                }
                ccStage = Stage.CustomStage.ProofOfAddress(ccDocumentTypes[0], *ccDocumentTypes.drop(1).toTypedArray())
            }
            "conscent" -> {
                // Get the concent property
                // NO Concent
            }
            else -> {
                // Error trigger
            }

        }
        return ccStage as Stage
    }
    private fun buildStages(stages: ReadableArray) {
        if (stages == null) {
            //TODO: fire up an error
        }
        var ccStages: Array<Stage> = arrayOf()
        for (i in 0 until stages.size()) {
            if (stages.getType(i) == ReadableType.String) {
                ccStages += stageStringToCCStage(stages.getString(i) ?: "")
            }else if (stages.getType(i) == ReadableType.Map){
                val stage: ReadableMap = stages.getMap(i) ?: return
                ccStages += this.documentStageMapToCCStage(stage)
            }
        }
        this.stages = ccStages
    }
    private fun buildScheme(scheme: ReadableMap) {
        // Get the stages property
        var schemeColour: SdkColors = SdkColors(
            primaryButtonColor = if(scheme.hasKey("primaryButtonBgColor") && scheme.getString("primaryButtonBgColor") != null) this.colorHexToColor(scheme.getString("primaryButtonBgColor") as String) else null,
            primaryButtonTextColor = if(scheme.hasKey("primaryButtonTextColor") && scheme.getString("primaryButtonTextColor") != null) this.colorHexToColor(scheme.getString("primaryButtonTextColor") as String) else null,
            primaryButtonBorderColor = if(scheme.hasKey("primaryButtonBorderColor") && scheme.getString("primaryButtonBorderColor") != null) this.colorHexToColor(scheme.getString("primaryButtonBorderColor") as String) else null,
            secondaryButtonColor = if(scheme.hasKey("secondaryButtonBgColor") && scheme.getString("secondaryButtonBgColor") != null) this.colorHexToColor(scheme.getString("secondaryButtonBgColor") as String) else null,
            secondaryButtonTextColor = if(scheme.hasKey("secondaryButtonTextColor") && scheme.getString("secondaryButtonTextColor") != null) this.colorHexToColor(scheme.getString("secondaryButtonTextColor") as String) else null,
            secondaryButtonBorderColor = if(scheme.hasKey("secondaryButtonBorderColor") && scheme.getString("secondaryButtonBorderColor") != null) this.colorHexToColor(scheme.getString("secondaryButtonBorderColor") as String) else null,
            documentSelectorColor = if(scheme.hasKey("docTypeBgColor") && scheme.getString("docTypeBgColor") != null) this.colorHexToColor(scheme.getString("docTypeBgColor") as String) else null,
            documentSelectorBorderColor = if(scheme.hasKey("docTypeBorderColor") && scheme.getString("docTypeBorderColor") != null) this.colorHexToColor(scheme.getString("docTypeBorderColor") as String) else null,
            // documentSelectorIconColor = if(scheme.hasKey("documentSelectorIconColor") && scheme.getString("documentSelectorIconColor") != null) this.colorHexToColor(scheme.getString("documentSelectorIconColor") as String) else null,
            // documentSelectorTitleTextColor = if(scheme.hasKey("documentSelectorTitleTextColor") && scheme.getString("documentSelectorTitleTextColor") != null) this.colorHexToColor(scheme.getString("documentSelectorTitleTextColor") as String) else null,
            // documentSelectorDescriptionTextColor = if(scheme.hasKey("documentSelectorDescriptionTextColor") && scheme.getString("documentSelectorDescriptionTextColor") != null) this.colorHexToColor(scheme.getString("documentSelectorDescriptionTextColor") as String) else null,
            infoPopupColor = if(scheme.hasKey("popUpBgColor") && scheme.getString("popUpBgColor") != null) this.colorHexToColor(scheme.getString("popUpBgColor") as String) else null,
            // infoPopupIconColor = if(scheme.hasKey("infoPopupIconColor") && scheme.getString("infoPopupIconColor") != null) this.colorHexToColor(scheme.getString("infoPopupIconColor") as String) else null,
            infoPopupTitleTextColor = if(scheme.hasKey("popUpTitleColor") && scheme.getString("popUpTitleColor") != null) this.colorHexToColor(scheme.getString("popUpTitleColor") as String) else null,
            // infoPopupDescriptionTextColor = if(scheme.hasKey("infoPopupDescriptionTextColor") && scheme.getString("infoPopupDescriptionTextColor") != null) this.colorHexToColor(scheme.getString("infoPopupDescriptionTextColor") as String) else null,
            // errorPopupColor = if(scheme.hasKey("errorPopupColor") && scheme.getString("errorPopupColor") != null) this.colorHexToColor(scheme.getString("errorPopupColor") as String) else null,
            // errorPopupIconColor = if(scheme.hasKey("errorPopupIconColor") && scheme.getString("errorPopupIconColor") != null) this.colorHexToColor(scheme.getString("errorPopupIconColor") as String) else null,
            // errorPopupTitleTextColor = if(scheme.hasKey("errorPopupTitleTextColor") && scheme.getString("errorPopupTitleTextColor") != null) this.colorHexToColor(scheme.getString("errorPopupTitleTextColor") as String) else null,
            // errorPopupDescriptionTextColor = if(scheme.hasKey("errorPopupDescriptionTextColor") && scheme.getString("errorPopupDescriptionTextColor") != null) this.colorHexToColor(scheme.getString("errorPopupDescriptionTextColor") as String) else null,
            // cameraButtonColor = if(scheme.hasKey("cameraButtonColor") && scheme.getString("cameraButtonColor") != null) this.colorHexToColor(scheme.getString("cameraButtonColor") as String) else null,
            headingTextColor = if(scheme.hasKey("headerTitle") && scheme.getString("headerTitle") != null) this.colorHexToColor(scheme.getString("headerTitle") as String) else null,
            subheadingTextColor = if(scheme.hasKey("subheaderTitle") && scheme.getString("subheaderTitle") != null) this.colorHexToColor(scheme.getString("subheaderTitle") as String) else null,
            bodyTextColor = if(scheme.hasKey("textSecondary") && scheme.getString("textSecondary") != null) this.colorHexToColor(scheme.getString("textSecondary") as String) else null,
            // backgroundColor = if(scheme.hasKey("backgroundColor") && scheme.getString("backgroundColor") != null) this.colorHexToColor(scheme.getString("backgroundColor") as String) else null,
            // backgroundContentColor = if(scheme.hasKey("backgroundContentColor") && scheme.getString("backgroundContentColor") != null) this.colorHexToColor(scheme.getString("backgroundContentColor") as String) else null,
            // backgroundContentContrastColor = if(scheme.hasKey("backgroundContentContrastColor") && scheme.getString("backgroundContentContrastColor") != null) this.colorHexToColor(scheme.getString("backgroundContentContrastColor") as String) else null,
            // backgroundDividerColor = if(scheme.hasKey("backgroundDividerColor") && scheme.getString("backgroundDividerColor") != null) this.colorHexToColor(scheme.getString("backgroundDividerColor") as String) else null,
            // editTextColor = if(scheme.hasKey("editTextColor") && scheme.getString("editTextColor") != null) this.colorHexToColor(scheme.getString("editTextColor") as String) else null,
        )
        this.colorScheme = colorScheme
    }
    private fun colorHexToColor(color: String): Long {
        return Color.parseColor(color).toLong()
    }
}