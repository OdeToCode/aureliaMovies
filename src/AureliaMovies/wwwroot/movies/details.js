import {inject} from 'aurelia-framework';
import {MovieData} from './movieData.js';

@inject(MovieData)
export class Details {

    constructor(movieData) {
        this.data = movieData;
    }

    activate() {
        return this.data.getById().then(movie => this.movie = movie);
    }

}