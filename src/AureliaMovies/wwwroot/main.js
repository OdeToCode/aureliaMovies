export function configure(aurelia) {
    aurelia.use
           .standardConfiguration()
           .developmentLogging()
           .plugin("aurelia-validation")
           .feature("./resources");

    aurelia.start().then(a => a.setRoot("app", document.body));
};