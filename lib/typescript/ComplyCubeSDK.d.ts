import { NativeEventEmitter } from 'react-native';
declare class ComplyCubeRN {
    complycube: ComplyCubeRN;
    emiter: NativeEventEmitter;
    errors: any[];
    constructor();
    _validateSettings(settings: {
        clientID: any;
        clientToken: any;
        stages: any[];
        scheme: any;
    }): true | void;
    setSettings(settings: any): this | undefined;
    _wrapHandler(handler: any): (data: any) => Promise<void>;
    addHandlers(successHandler?: () => void, errorHandler?: () => void, cancelHandler?: () => void): this | undefined;
    mount(): void;
    onError(error_message: any): void;
}
export default ComplyCubeRN;
//# sourceMappingURL=ComplyCubeSDK.d.ts.map