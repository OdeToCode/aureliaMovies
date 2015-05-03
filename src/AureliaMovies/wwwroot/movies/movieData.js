import {inject} from "aurelia-framework";
import {HttpClient} from "aurelia-http-client";

let baseUrl = "/api/movies";
let parse = message => JSON.parse(message.response);

@inject(HttpClient)
export class MovieData {
    
    constructor(httpClient) {
        this.http = httpClient;
        this.http.configure(c => {
            c.withBaseUrl(baseUrl);
            c.withHeader("Accept", "application/json");
            c.withHeader("Content-Type", "application/json");
        });

    }

    getById(id) {
        return this.http.get(`/${id}`)
                        .then(parse);
    }

    getAll() {
        return this.http.get().then(parse);
    }

    save(movie) {
        if(movie.Id) {
            return this.http.put('', movie).then(parse);                          
        }
        return this.http.post('', movie).then(parse);
    }
}