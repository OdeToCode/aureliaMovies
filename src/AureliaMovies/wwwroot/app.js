import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-http-client';

@inject(HttpClient)
export class App {
    
    constructor(http) {
        this.http = http;
        this.message = "";
    }

    activate() {
        this.message = "Hello, World!";
        return this.http.get("/api/movies")
                        .then(message => {                         
                            this.movies = JSON.parse(message.response);
                            return this.movies;
                        });
    }

    changeMessage() {
        this.message = "Goodbye!";
    }

}