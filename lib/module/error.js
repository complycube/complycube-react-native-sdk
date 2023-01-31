function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
export class CCRNError extends Error {
  constructor(message) {
    super(message);
    _defineProperty(this, "description", '');
    _defineProperty(this, "time", void 0);
    this.name = 'CCRNError';
    this.description = 'ComplyCubeRN Error: ' + message;
    this.time = new Date();
  }
}
//# sourceMappingURL=error.js.map