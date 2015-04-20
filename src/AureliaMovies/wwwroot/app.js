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
        this.http.get("/api/movies")
                 .then(reposnse => this.movies = JSON.parse(reponse.data));
    }

    changeMessage() {
        this.message = "Goodbye!";
    }

}