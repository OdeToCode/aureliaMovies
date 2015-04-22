import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-http-client';

@inject(HttpClient)
export class MovieList {
    
    constructor(http) {
        this.http = http;
    }

    activate() {
        return this.http.get("/api/movies")
                        .then(message => {                         
                            this.movies = JSON.parse(message.response);
                            return this.movies;
                        });
    }

}