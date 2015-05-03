export class App {

    configureRouter(config, router) {
        this.router = router;
        
        config.title = "At The Movies";
        config.map([
            { route: "", name: 'home', moduleId: "movies/movieList", title:"List", nav:true},
            { route: "about", moduleId: "about/about", title: "About", nav:true },
            { route: "details/:id", moduleId: "movies/details" },
            { route: "edit/:id", moduleId: "movies/edit" },
            { route: "create", moduleId:"movies/edit" }
        ]);
    }
}