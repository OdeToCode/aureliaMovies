export function configure(aurelia) {
    aurelia.use
           .standardConfiguration()
           .developmentLogging()
           .plugin("aurelia-validation")
           .plugin("./resources/index");

    aurelia.start().then(a => a.setRoot("app", document.body));
};