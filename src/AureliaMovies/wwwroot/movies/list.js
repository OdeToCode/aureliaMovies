import {inject} from 'aurelia-framework';
import {MovieData} from './movieData';

@inject(MovieData)
export class List {
    
    constructor(movieData) {
        this.data = movieData;
    }

    activate() {
        return this.data.getAll()
                        .then(movies => this.movies = movies);
    }
}