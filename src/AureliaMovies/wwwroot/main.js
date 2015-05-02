export function configure(aurelia) {
    aurelia.use
           .standardConfiguration()
           .developmentLogging()
           .plugin("aurelia-validation");

    aurelia.start().then(a => a.setRoot("app", document.body));
};