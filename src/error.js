export class CCRNError extends Error {
    description = "";
    time = null;
    constructor(message) {
        super(message);
        this.name = 'CCRNError';
        this.description = "ComplyCubeRN Error: " + message;
        this.time = new Date();
    }
}