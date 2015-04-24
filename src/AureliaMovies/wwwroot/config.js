System.config({
  "transpiler": "babel",
  "babelOptions": {
    "optional": [
      "runtime",
      "es7.decorators"
    ]
  },
  "paths": {
    "*": "*.js",
    "github:*": "jspm_packages/github/*.js",
    "npm:*": "jspm_packages/npm/*.js"
  }
});

System.config({
  "map": {
    "aurelia-bootstrapper": "github:aurelia/bootstrapper@0.11.0",
    "aurelia-framework": "github:aurelia/framework@0.10.0",
    "aurelia-http-client": "github:aurelia/http-client@0.7.0",
    "aurelia-router": "github:aurelia/router@0.7.2",
    "babel": "npm:babel-core@5.1.11",
    "babel-runtime": "npm:babel-runtime@5.1.11",
    "bootstrap": "github:twbs/bootstrap@3.3.4",
    "core-js": "npm:core-js@0.8.4",
    "traceur": "github:jmcriffey/bower-traceur@0.0.88",
    "traceur-runtime": "github:jmcriffey/bower-traceur-runtime@0.0.88",
    "github:aurelia/binding@0.5.0": {
      "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.6.0",
      "aurelia-metadata": "github:aurelia/metadata@0.4.0",
      "aurelia-task-queue": "github:aurelia/task-queue@0.3.0",
      "core-js": "github:zloirock/core-js@0.8.4"
    },
    "github:aurelia/bootstrapper@0.11.0": {
      "aurelia-event-aggregator": "github:aurelia/event-aggregator@0.3.0",
      "aurelia-framework": "github:aurelia/framework@0.10.0",
      "aurelia-history": "github:aurelia/history@0.3.0",
      "aurelia-history-browser": "github:aurelia/history-browser@0.3.0",
      "aurelia-loader-default": "github:aurelia/loader-default@0.6.0",
      "aurelia-logging-console": "github:aurelia/logging-console@0.3.0",
      "aurelia-router": "github:aurelia/router@0.7.2",
      "aurelia-templating": "github:aurelia/templating@0.10.3",
      "aurelia-templating-binding": "github:aurelia/templating-binding@0.10.0",
      "aurelia-templating-resources": "github:aurelia/templating-resources@0.10.0",
      "aurelia-templating-router": "github:aurelia/templating-router@0.11.0",
      "core-js": "github:zloirock/core-js@0.8.4"
    },
    "github:aurelia/dependency-injection@0.6.0": {
      "aurelia-logging": "github:aurelia/logging@0.3.0",
      "aurelia-metadata": "github:aurelia/metadata@0.4.0",
      "core-js": "github:zloirock/core-js@0.8.4"
    },
    "github:aurelia/framework@0.10.0": {
      "aurelia-binding": "github:aurelia/binding@0.5.0",
      "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.6.0",
      "aurelia-loader": "github:aurelia/loader@0.5.0",
      "aurelia-logging": "github:aurelia/logging@0.3.0",
      "aurelia-metadata": "github:aurelia/metadata@0.4.0",
      "aurelia-path": "github:aurelia/path@0.5.0",
      "aurelia-task-queue": "github:aurelia/task-queue@0.3.0",
      "aurelia-templating": "github:aurelia/templating@0.10.3",
      "core-js": "github:zloirock/core-js@0.8.4"
    },
    "github:aurelia/history-browser@0.3.0": {
      "aurelia-history": "github:aurelia/history@0.3.0",
      "core-js": "github:zloirock/core-js@0.8.4"
    },
    "github:aurelia/http-client@0.7.0": {
      "aurelia-path": "github:aurelia/path@0.5.0",
      "core-js": "github:zloirock/core-js@0.8.4"
    },
    "github:aurelia/loader-default@0.6.0": {
      "aurelia-loader": "github:aurelia/loader@0.5.0",
      "aurelia-metadata": "github:aurelia/metadata@0.4.0"
    },
    "github:aurelia/loader@0.5.0": {
      "aurelia-html-template-element": "github:aurelia/html-template-element@0.2.0",
      "aurelia-path": "github:aurelia/path@0.5.0",
      "core-js": "github:zloirock/core-js@0.8.4",
      "webcomponentsjs": "github:webcomponents/webcomponentsjs@0.5.5"
    },
    "github:aurelia/metadata@0.4.0": {
      "core-js": "github:zloirock/core-js@0.8.4"
    },
    "github:aurelia/route-recognizer@0.3.0": {
      "core-js": "github:zloirock/core-js@0.8.4"
    },
    "github:aurelia/router@0.7.2": {
      "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.6.0",
      "aurelia-event-aggregator": "github:aurelia/event-aggregator@0.3.0",
      "aurelia-history": "github:aurelia/history@0.3.0",
      "aurelia-path": "github:aurelia/path@0.5.0",
      "aurelia-route-recognizer": "github:aurelia/route-recognizer@0.3.0",
      "core-js": "github:zloirock/core-js@0.8.4"
    },
    "github:aurelia/templating-binding@0.10.0": {
      "aurelia-binding": "github:aurelia/binding@0.5.0",
      "aurelia-logging": "github:aurelia/logging@0.3.0",
      "aurelia-templating": "github:aurelia/templating@0.10.3"
    },
    "github:aurelia/templating-resources@0.10.0": {
      "aurelia-binding": "github:aurelia/binding@0.5.0",
      "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.6.0",
      "aurelia-logging": "github:aurelia/logging@0.3.0",
      "aurelia-templating": "github:aurelia/templating@0.10.3",
      "core-js": "github:zloirock/core-js@0.8.4"
    },
    "github:aurelia/templating-router@0.11.0": {
      "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.6.0",
      "aurelia-metadata": "github:aurelia/metadata@0.4.0",
      "aurelia-path": "github:aurelia/path@0.5.0",
      "aurelia-router": "github:aurelia/router@0.7.2",
      "aurelia-templating": "github:aurelia/templating@0.10.3"
    },
    "github:aurelia/templating@0.10.3": {
      "aurelia-binding": "github:aurelia/binding@0.5.0",
      "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.6.0",
      "aurelia-html-template-element": "github:aurelia/html-template-element@0.2.0",
      "aurelia-loader": "github:aurelia/loader@0.5.0",
      "aurelia-logging": "github:aurelia/logging@0.3.0",
      "aurelia-metadata": "github:aurelia/metadata@0.4.0",
      "aurelia-path": "github:aurelia/path@0.5.0",
      "aurelia-task-queue": "github:aurelia/task-queue@0.3.0",
      "core-js": "github:zloirock/core-js@0.8.4"
    },
    "github:jspm/nodelibs-process@0.1.1": {
      "process": "npm:process@0.10.1"
    },
    "github:twbs/bootstrap@3.3.4": {
      "jquery": "github:components/jquery@2.1.3"
    },
    "npm:core-js@0.8.4": {
      "process": "github:jspm/nodelibs-process@0.1.1"
    }
  }
});

