export class App {
    
    constructor() {
        this._message = "";
    }

    activate() {
        this._message = "Hello, World!";
    }

    get message() {
        return this._message;
    }

    changeMessage() {
        this._message = "Goodbye!";
    }

}