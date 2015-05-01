import {inject} from "aurelia-framework";
import {HttpClient} from "aurelia-http-client";

let parse = message => JSON.parse(message.response);

@inject(HttpClient)
export class MovieData {
    
    constructor(httpClient) {
        this.http = httpClient;
    }

    getById(id) {
        return this.http.get(`/api/movies/${id}`)
                        .then(parse);
    }

    getAll() {
        return this.http.get("/api/movies")
                        .then(parse);
    }
}