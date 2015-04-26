import {Inject} from "aurelia-framework";
import {HttpClient} from "aurelia-http-client";

@inject(HttpClient)
export class MovieData {
    
    constructor(httpClient) {
        this.http = httpClient;
    }

    getAll() {
        return this.http.get("/api/movies")
                        .then(message => {                         
                            this.movies = JSON.parse(message.response);
                            return this.movies;
                        });
    }
}