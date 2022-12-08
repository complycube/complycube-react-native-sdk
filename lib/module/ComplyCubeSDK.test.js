import ComplyCubeRN from "./ComplyCubeSDK";
import ComplyCubeRNSDK from "../components/ccrnView";
import React from 'react';
import renderer from 'react-test-renderer';
jest.useFakeTimers();
const testCase = {
  clientID: '6363c8cc808c610008278c30',
  clientToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoiWm1Rd01tTXhNekl3WldWbU9XSTFOamszWVdOaU1XTXdZV0ZsTVdVek1UVm1ORFF3TldJeE5EVXhPV0U1TkRBM1pEWXdZVGcxT1dRd016RmlZakUwTVRkak56WTBabVUxTVRaa05tRXpaVFF3TUdFM09EWTBZalEyWmpJMk4yWm1aR0k0TW1aa04yWXlOVEk0WW1SbE1XTmhOMkppWmpZeE1tSXdZemhtWTJGaVlqQTNPR1JpTXpGaFpEQmlOREF6TVRNNU16WmxNREF3T0RVM1pXUTVaamxtWkRNM056ZGxaRFkyTUdKalpqSTVaR1kzTlRNd09UY3pOVGRrWm1OaVlqaGxaRFUyWWpSaFl6YzVaalk1TW1VM1ltSTRZelZsTlRBMk5qRXpaalZsTjJWaU1qTTNaVEl3WldRelpXUTVNalpsTldGaFpXWmhZamt5T1RJek5RPT0iLCJ1cmxzIjp7ImFwaSI6Imh0dHBzOi8vYXBpLmNvbXBseWN1YmUuY29tIiwic3luYyI6IndzczovL3hkcy5jb21wbHljdWJlLmNvbSIsImNyb3NzRGV2aWNlIjoiaHR0cHM6Ly94ZC5jb21wbHljdWJlLmNvbSJ9LCJvcHRpb25zIjp7ImhpZGVDb21wbHlDdWJlTG9nbyI6ZmFsc2UsImVuYWJsZUN1c3RvbUxvZ28iOnRydWUsImVuYWJsZVRleHRCcmFuZCI6dHJ1ZSwiZW5hYmxlQ3VzdG9tQ2FsbGJhY2tzIjp0cnVlfSwiaWF0IjoxNjY3NDgzODUzLCJleHAiOjE2Njc0ODc0NTN9.8qnAcJ_t3-_6-JKIzj3q56TE8lJuQOReNBTAYfAvkss',
  handlers: {
    onCancel: e => {
      console.log('onCancel', e);
    }
  },
  stages: [{
    name: 'intro',
    heading: "Hello world",
    message: "Oups I did it again"
  }, {
    name: 'documentCapture',
    documentTypes: {
      "passport": 'true',
      "driving_license": ["GB", "FR"]
    }
  }, 'faceCapture'],
  "scheme": {
    "primaryButtonBgColor": "#238656"
  }
};
jest.mock('../node_modules/react-native/Libraries/BatchedBridge/NativeModules', () => {
  return {
    ComplyCubeRNSDK: {
      setSettings: jest.fn(),
      mount: jest.fn()
    }
  };
});
jest.mock('../node_modules/react-native/Libraries/Utilities/Platform', () => {
  return {
    OS: "ios"
  };
});
describe('ComplyCubeSDK', () => {
  // beforeEach(() => {
  //     NativeModules.ComplyCubeRNSDK = { test: jest.fn() } 
  //   });

  test('SDK Works', () => {
    const sdk = new ComplyCubeRN();
    expect(sdk.complycube).toBeDefined();
  });
  it('should be able to start the SDK', () => {
    const sdk = new ComplyCubeRN();
    sdk.setSettings(testCase);
    // sdk.mount();
    expect(sdk.errors.length).toBe(0);
    // expect(sdk.complycube.mount).toHaveBeenCalled();
  });

  it('Detects misisng clientID', () => {
    const sdk = new ComplyCubeRN();
    sdk.setSettings({
      ...testCase,
      clientID: undefined
    });
    expect(sdk.errors.length).toBe(1);
  });
  it('Detects misisng Client token', () => {
    const sdk = new ComplyCubeRN();
    sdk.setSettings({
      ...testCase,
      clientToken: undefined
    });
    expect(sdk.errors.length).toBe(1);
  });
  it('Detects error in stage name', () => {
    const sdk = new ComplyCubeRN();
    sdk.setSettings({
      ...testCase,
      stages: [...testCase.stages, 'invalidStage']
    });
    expect(sdk.errors.length).toBe(1);
  });
  it('Detects error in stage name inside an object', () => {
    const sdk = new ComplyCubeRN();
    sdk.setSettings({
      ...testCase,
      stages: [...testCase.stages, {
        name: 'invalidStage'
      }]
    });
    expect(sdk.errors.length).toBe(1);
  });
  it('Detects error schemas', () => {
    const sdk = new ComplyCubeRN();
    sdk.setSettings({
      ...testCase,
      scheme: {
        primaryButtonBgColor: 'invalidColor'
      }
    });
    expect(sdk.errors.length).toBe(1);
  });
  it('Detects error schemes names', () => {
    const sdk = new ComplyCubeRN();
    sdk.setSettings({
      ...testCase,
      scheme: {
        primaryButtonBgColorYo: '#FFFFFF'
      }
    });
    expect(sdk.errors.length).toBe(1);
  });
  it('Start SDK', () => {
    const sdk = new ComplyCubeRN();
    sdk.setSettings(testCase).mount();
    expect(sdk.complycube.mount).toBeCalled();
  });
}, 10000);
// , 10000));
//# sourceMappingURL=ComplyCubeSDK.test.js.map