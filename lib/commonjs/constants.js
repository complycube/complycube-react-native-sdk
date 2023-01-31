"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stages = exports.schemesColors = exports.requiredStages = exports.requiredSettings = exports.requiredDocuments = exports.optionalSettings = void 0;
const requiredSettings = ['clientID', 'clientToken', 'stages'];
exports.requiredSettings = requiredSettings;
const optionalSettings = ['scheme', 'handlers'];
exports.optionalSettings = optionalSettings;
const requiredDocuments = ['passport', 'utility_bill', 'bank_statement', 'residence_permit', 'national_identity_card', 'driving_license'];
exports.requiredDocuments = requiredDocuments;
const requiredStages = ['documentCapture'];
exports.requiredStages = requiredStages;
const stages = ['intro', 'documentCapture', 'faceCapture', 'poaCapture', 'conscent'];
exports.stages = stages;
const schemesColors = ['popUpBgColor', 'popUpTitleColor', 'primaryButtonBgColor', 'primaryButtonTextColor', 'primaryButtonBorderColor', 'primaryButtonPressedBgColor', 'secondaryButtonBgColor', 'secondaryButtonTextColor', 'secondaryButtonBorderColor', 'secondaryButtonPressedBgColor', 'docTypeBgColor', 'docTypeBorderColor', 'blueBigType', 'headerTitle', 'linkButtonTextColor', 'subheaderTitle', 'textItemType', 'textSecondary'];
exports.schemesColors = schemesColors;
//# sourceMappingURL=constants.js.map