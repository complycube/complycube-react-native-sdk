export class CCRNError extends Error {
  description: String = '';
  time: Date;
  constructor(message: any) {
    super(message);
    this.name = 'CCRNError';
    this.description = 'ComplyCubeRN Error: ' + message;
    this.time = new Date();
  }
}
