export class App {

    configureRouter(config, router) {
        this.router = router;
        
        config.title = "At The Movies";
        config.map([
            { route: "", moduleId: "movies/movieList", nav:true},
            { route: "about", moduleId: "about/about", nav:true },
            { route: "details/:id", moduleId: "movies/details" },
            { route: "edit/?id", moduleId: "movies/edit" }
        ]);
    }
}