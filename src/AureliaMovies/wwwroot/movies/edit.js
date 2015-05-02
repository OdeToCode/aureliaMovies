import {inject} from "aurelia-framework";
import {Validation} from "aurelia-validation"
import {MovieData} from "./movieData"

@inject(MovieData, Validation)
export class Edit {

    constructor(movieData, validation) {
        this.data = movieData;

        this.validation = validation.on(this)
            .ensure('movie.Title') 
              .isNotEmpty()
              .hasMinLength(3)
              .hasMaxLength(100)
            .ensure('movie.ReleaseYear') 
              .isNumber()
              .isBetween(1900,2100);
    }

    activate(params) {
        if(params.id) {
            this.data.getById(params.id).then(movie => {
                this.movie = movie;
                this.validation.validate();
            });
        }
        else {
            this.movie = {};
        }
    }

    save() {
        this.validation.validate().then(() => {
            this.data.save(this.movie);
        });
    }

}