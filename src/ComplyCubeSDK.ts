import { NativeModules, NativeEventEmitter, View } from 'react-native';
import { CCRNError } from './error';
let { ComplyCubeRNSDK } = NativeModules;
import {
  //requiredDocuments,
  requiredStages,
  schemesColors,
  stages,
} from './constants';

class ComplyCubeRN {
  complycube: ComplyCubeRN;
  emiter: NativeEventEmitter;
  errors: any[] = [];
  constructor() {
    this.emiter = new NativeEventEmitter(ComplyCubeRNSDK);
    this.complycube = ComplyCubeRNSDK;
  }

  _validateSettings(settings: {
    clientID: any;
    clientToken: any;
    stages: any[];
    scheme: any;
  }) {
    if (!settings) return this.onError('Settings are not defined');
    // Validating required settings
    if (!settings.clientID) return this.onError('Client ID is not defined');
    if (!settings.clientToken)
      return this.onError('Client Token is not defined');
    if (!settings.stages) return this.onError('Stages are not defined');
    // Stages validation
    if (!Array.isArray(settings.stages))
      return this.onError('Stages must be an array');
    if (settings.stages.length == 0)
      return this.onError('Stages array must have at least one element');
    // Looking for invalid stages
    const _invalideStages = settings.stages.filter(
      (stage) =>
        stages.includes(typeof stage === 'string' ? stage : stage.name) == false
    );
    if (_invalideStages.length > 0)
      return this.onError('Invalid stage names: ' + _invalideStages.join(', '));

    // Looking for required stages
    const _requiredStages = settings.stages.filter((stage) =>
      requiredStages.includes(
        typeof stage === 'object' && stage.name ? stage.name : stage
      )
    );
    if (_requiredStages.length == 0)
      return this.onError(
        'Required stages are not defined: ' + _requiredStages.join(', ')
      );
    // Doucments validation
    // const documents =
    settings.stages.filter((stage) =>
      typeof stage === 'object' && stage.name
        ? stage.name
        : stage == 'documentCapture'
    );
    // if(documents.length > 0){ // Check if there is documents to capture on the stage
    //     // documents an object with (true or false) values or an array of countries
    //     const _documents = []
    //     documents.forEach(document => {
    //         if(typeof document === 'object' && document.documentTypes){
    //             if(Object.keys(document.documentTypes).length > 0)
    //                 Object.keys(document.documentTypes).map(idx => _documents.push(idx))
    //         }
    //     });

    //     if(documents.filter(idx =>
    //         (typeof idx === 'string' || typeof documents[idx] === 'boolean' || Array.isArray(documents[idx]))
    //         && requiredDocuments.includes(idx) === false).length > 0) // Check if there is invalid documents
    //         return this.onError("Invalid document name");
    // }else
    //     return this.onError("Document capture stage is not defined");
    // Check validity of other schemes
    if (settings.scheme && typeof settings.scheme === 'object') {
      const _invalidSchemes = Object.keys(settings.scheme).filter(
        (key) => !schemesColors.includes(key)
      );
      if (_invalidSchemes.length > 0)
        return this.onError(
          'Invalid scheme colors: ' + _invalidSchemes.join(', ')
        );
    }
    // Check Color validity
    if (
      Object.keys(settings.scheme).filter(
        (idx) =>
          typeof settings.scheme[idx] === 'string' &&
          settings.scheme[idx].match(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/) ==
            null
      ).length > 0
    )
      return this.onError('Invalid color format');
    return true;
  }

  setSettings(settings: any) {
    if (this.complycube == null) return;
    // TODO: Check settings before setting them
    try {
      if (this._validateSettings(settings)) {
        console.log(this.errors);
        this.complycube.setSettings(settings);
      }
    } catch (e: any) {
      console.log(e.description);
    }
    return this;
  }

  _wrapHandler(handler: any) {
    return async (data: any) => {
      handler(data);
    };
  }

  addHandlers(
    successHandler = () => {},
    errorHandler = () => {},
    cancelHandler = () => {}
  ) {
    if (!this.emiter) return;
    // TODO: Check handlers before adding them
    this.emiter.addListener(
      'ComplyCubeSuccess',
      this._wrapHandler(successHandler)
    );
    this.emiter.addListener('ComplyCubeError', this._wrapHandler(errorHandler));
    this.emiter.addListener(
      'ComplyCubeCancel',
      this._wrapHandler(cancelHandler)
    );
    return this;
  }
  mount() {
    if (this.complycube == null) return;
    this.complycube.mount();
  }

  onError(error_message: any) {
    const _ = new CCRNError(error_message);
    this.errors.push(_);
    throw _;
  }
}

export default ComplyCubeRN;
