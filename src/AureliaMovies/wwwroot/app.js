import {inject} from "aurelia-framework";
import {Router} from "aurelia-router";

@inject(Router)
export class App {

    constructor(router) {
        this.router = router;
        this.router.configure(r => {
            r.title = "At The Movies";
            r.map([
                { route: "", moduleId: "movies/movieList", nav:true},
                { route: "about", moduleId: "about/about", nav:true },
                { route: "details/:id", moduleId: "movies/details" }
            ]);
            console.log(r);
        });
        console.log(router);
    }

}