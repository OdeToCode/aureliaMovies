export class App {

    configureRouter(config, router) {
        this.router = router; 
 
        config.title = "Movies";
        config.map([
            {
                route: "", name: 'home', moduleId: "movies/list", 
                title:"List", nav:true, settings: {
                    icon: "home"
                }
                

            },
            { route: "about", moduleId: "about/about", title: "About", nav:true },


            { route: "details/:id", name:"details", moduleId: "movies/details" },
            { route: "edit/:id", name:"edit", moduleId: "movies/edit" },
            { route: "create", name:"create", moduleId:"movies/edit" }
        ]);
    }
}