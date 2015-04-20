System.config({
  "baseURL": "/",
  "transpiler": "babel",
  "babelOptions": {
    "optional": [
      "runtime"
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
    "aurelia-bootstrapper": "github:aurelia/bootstrapper@0.10.0",
    "aurelia-framework": "github:aurelia/framework@0.9.0",
    "babel": "npm:babel@4.7.16",
    "babel-runtime": "npm:babel-runtime@4.7.16",
    "bootstrap": "github:twbs/bootstrap@3.3.4",
    "github:aurelia/binding@0.4.1": {
      "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.5.1",
      "aurelia-metadata": "github:aurelia/metadata@0.3.4",
      "aurelia-task-queue": "github:aurelia/task-queue@0.2.5"
    },
    "github:aurelia/bootstrapper@0.10.0": {
      "aurelia-event-aggregator": "github:aurelia/event-aggregator@0.2.4",
      "aurelia-framework": "github:aurelia/framework@0.9.0",
      "aurelia-history": "github:aurelia/history@0.2.4",
      "aurelia-history-browser": "github:aurelia/history-browser@0.2.5",
      "aurelia-loader-default": "github:aurelia/loader-default@0.5.0",
      "aurelia-logging-console": "github:aurelia/logging-console@0.2.4",
      "aurelia-router": "github:aurelia/router@0.6.0",
      "aurelia-templating": "github:aurelia/templating@0.9.0",
      "aurelia-templating-binding": "github:aurelia/templating-binding@0.9.0",
      "aurelia-templating-resources": "github:aurelia/templating-resources@0.9.2",
      "aurelia-templating-router": "github:aurelia/templating-router@0.10.0"
    },
    "github:aurelia/dependency-injection@0.5.1": {
      "aurelia-logging": "github:aurelia/logging@0.2.7",
      "aurelia-metadata": "github:aurelia/metadata@0.3.4",
      "core-js": "npm:core-js@0.4.10"
    },
    "github:aurelia/framework@0.9.0": {
      "aurelia-binding": "github:aurelia/binding@0.4.1",
      "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.5.1",
      "aurelia-loader": "github:aurelia/loader@0.4.0",
      "aurelia-logging": "github:aurelia/logging@0.2.7",
      "aurelia-metadata": "github:aurelia/metadata@0.3.4",
      "aurelia-path": "github:aurelia/path@0.4.6",
      "aurelia-task-queue": "github:aurelia/task-queue@0.2.5",
      "aurelia-templating": "github:aurelia/templating@0.9.0"
    },
    "github:aurelia/history-browser@0.2.5": {
      "aurelia-history": "github:aurelia/history@0.2.4",
      "core-js": "npm:core-js@0.4.10"
    },
    "github:aurelia/loader-default@0.5.0": {
      "aurelia-loader": "github:aurelia/loader@0.4.0",
      "aurelia-metadata": "github:aurelia/metadata@0.3.4"
    },
    "github:aurelia/loader@0.4.0": {
      "aurelia-html-template-element": "github:aurelia/html-template-element@0.1.3",
      "aurelia-path": "github:aurelia/path@0.4.6",
      "core-js": "npm:core-js@0.4.10",
      "webcomponentsjs": "github:webcomponents/webcomponentsjs@0.5.5"
    },
    "github:aurelia/router@0.6.0": {
      "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.5.1",
      "aurelia-event-aggregator": "github:aurelia/event-aggregator@0.2.4",
      "aurelia-history": "github:aurelia/history@0.2.4",
      "aurelia-path": "github:aurelia/path@0.4.6",
      "aurelia-route-recognizer": "github:aurelia/route-recognizer@0.2.4",
      "core-js": "npm:core-js@0.4.10"
    },
    "github:aurelia/templating-binding@0.9.0": {
      "aurelia-binding": "github:aurelia/binding@0.4.1",
      "aurelia-logging": "github:aurelia/logging@0.2.7",
      "aurelia-templating": "github:aurelia/templating@0.9.0"
    },
    "github:aurelia/templating-resources@0.9.2": {
      "aurelia-binding": "github:aurelia/binding@0.4.1",
      "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.5.1",
      "aurelia-logging": "github:aurelia/logging@0.2.7",
      "aurelia-templating": "github:aurelia/templating@0.9.0",
      "core-js": "npm:core-js@0.4.10"
    },
    "github:aurelia/templating-router@0.10.0": {
      "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.5.1",
      "aurelia-metadata": "github:aurelia/metadata@0.3.4",
      "aurelia-path": "github:aurelia/path@0.4.6",
      "aurelia-router": "github:aurelia/router@0.6.0",
      "aurelia-templating": "github:aurelia/templating@0.9.0"
    },
    "github:aurelia/templating@0.9.0": {
      "aurelia-binding": "github:aurelia/binding@0.4.1",
      "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.5.1",
      "aurelia-html-template-element": "github:aurelia/html-template-element@0.1.3",
      "aurelia-loader": "github:aurelia/loader@0.4.0",
      "aurelia-logging": "github:aurelia/logging@0.2.7",
      "aurelia-metadata": "github:aurelia/metadata@0.3.4",
      "aurelia-path": "github:aurelia/path@0.4.6",
      "aurelia-task-queue": "github:aurelia/task-queue@0.2.5",
      "core-js": "npm:core-js@0.4.10"
    },
    "github:jspm/nodelibs-process@0.1.1": {
      "process": "npm:process@0.10.1"
    },
    "github:twbs/bootstrap@3.3.4": {
      "jquery": "github:components/jquery@2.1.3"
    },
    "npm:babel-runtime@4.7.16": {
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:core-js@0.4.10": {
      "process": "github:jspm/nodelibs-process@0.1.1"
    }
  }
});

