const requiredSettings = ['clientID', 'clientToken', 'stages'];
const optionalSettings = ['scheme', 'handlers'];
const requiredDocuments = [
  'passport',
  'utility_bill',
  'bank_statement',
  'residence_permit',
  'national_identity_card',
  'driving_license',
];
const requiredStages = ['documentCapture'];
const stages = [
  'intro',
  'documentCapture',
  'faceCapture',
  'poaCapture',
  'conscent',
];

const schemesColors = [
  'popUpBgColor',
  'popUpTitleColor',
  'primaryButtonBgColor',
  'primaryButtonTextColor',
  'primaryButtonBorderColor',
  'primaryButtonPressedBgColor',
  'secondaryButtonBgColor',
  'secondaryButtonTextColor',
  'secondaryButtonBorderColor',
  'secondaryButtonPressedBgColor',
  'docTypeBgColor',
  'docTypeBorderColor',
  'blueBigType',
  'headerTitle',
  'linkButtonTextColor', // Not android
  'subheaderTitle',
  'textItemType',
  'textSecondary',
];

export {
  requiredSettings,
  optionalSettings,
  requiredDocuments,
  schemesColors,
  requiredStages,
  stages,
};
