System.config({
  "transpiler": "babel",
  "babelOptions": {
    "optional": [
      "runtime",
      "es7.decorators",
      "es7.classProperties"
    ]
  },
  "paths": {
    "*": "*.js",
    "github:*": "jspm_packages/github/*.js",
    "npm:*": "jspm_packages/npm/*.js"
  },
  "bundles": {
    "appbundle": [
      "github:aurelia/validation@0.2.5/validation/validation-locale",
      "github:aurelia/validation@0.2.5/validation/validate-custom-attribute-view-strategy",
      "npm:core-js@0.9.16/modules/$.fw",
      "npm:core-js@0.9.16/modules/$.dom-create",
      "npm:core-js@0.9.16/modules/$.shared",
      "npm:core-js@0.9.16/modules/$.uid",
      "npm:core-js@0.9.16/modules/$.redef",
      "npm:core-js@0.9.16/modules/$.invoke",
      "npm:core-js@0.9.16/modules/$.assert",
      "npm:core-js@0.9.16/modules/$.array-includes",
      "npm:core-js@0.9.16/modules/$.replacer",
      "npm:core-js@0.9.16/modules/$.throws",
      "npm:core-js@0.9.16/modules/$.keyof",
      "npm:core-js@0.9.16/modules/$.enum-keys",
      "npm:core-js@0.9.16/modules/$.get-names",
      "npm:core-js@0.9.16/modules/$.assign",
      "npm:core-js@0.9.16/modules/$.same",
      "npm:core-js@0.9.16/modules/$.set-proto",
      "npm:core-js@0.9.16/modules/es6.object.to-string",
      "npm:core-js@0.9.16/modules/es6.object.statics-accept-primitives",
      "npm:core-js@0.9.16/modules/es6.function.name",
      "npm:core-js@0.9.16/modules/es6.function.has-instance",
      "npm:core-js@0.9.16/modules/es6.number.constructor",
      "npm:core-js@0.9.16/modules/es6.number.statics",
      "npm:core-js@0.9.16/modules/es6.math",
      "npm:core-js@0.9.16/modules/es6.string.from-code-point",
      "npm:core-js@0.9.16/modules/es6.string.raw",
      "npm:core-js@0.9.16/modules/$.string-at",
      "npm:core-js@0.9.16/modules/$.iter",
      "npm:core-js@0.9.16/modules/$.iter-define",
      "npm:core-js@0.9.16/modules/es6.string.code-point-at",
      "npm:core-js@0.9.16/modules/es6.string.ends-with",
      "npm:core-js@0.9.16/modules/es6.string.includes",
      "npm:core-js@0.9.16/modules/$.string-repeat",
      "npm:core-js@0.9.16/modules/es6.string.starts-with",
      "npm:core-js@0.9.16/modules/$.iter-call",
      "npm:core-js@0.9.16/modules/$.iter-detect",
      "npm:core-js@0.9.16/modules/es6.array.of",
      "npm:core-js@0.9.16/modules/$.unscope",
      "npm:core-js@0.9.16/modules/$.species",
      "npm:core-js@0.9.16/modules/es6.array.copy-within",
      "npm:core-js@0.9.16/modules/es6.array.fill",
      "npm:core-js@0.9.16/modules/es6.array.find",
      "npm:core-js@0.9.16/modules/es6.array.find-index",
      "npm:core-js@0.9.16/modules/es6.regexp",
      "npm:core-js@0.9.16/modules/$.for-of",
      "npm:process@0.10.1/browser",
      "npm:core-js@0.9.16/modules/$.mix",
      "npm:core-js@0.9.16/modules/$.collection-strong",
      "npm:core-js@0.9.16/modules/$.collection",
      "npm:core-js@0.9.16/modules/es6.set",
      "npm:core-js@0.9.16/modules/$.collection-weak",
      "npm:core-js@0.9.16/modules/es6.weak-set",
      "npm:core-js@0.9.16/modules/$.own-keys",
      "npm:core-js@0.9.16/modules/es7.array.includes",
      "npm:core-js@0.9.16/modules/es7.string.at",
      "npm:core-js@0.9.16/modules/$.string-pad",
      "npm:core-js@0.9.16/modules/es7.string.rpad",
      "npm:core-js@0.9.16/modules/es7.regexp.escape",
      "npm:core-js@0.9.16/modules/es7.object.get-own-property-descriptors",
      "npm:core-js@0.9.16/modules/es7.object.to-array",
      "npm:core-js@0.9.16/modules/$.collection-to-json",
      "npm:core-js@0.9.16/modules/es7.set.to-json",
      "npm:core-js@0.9.16/modules/js.array.statics",
      "npm:core-js@0.9.16/modules/$.partial",
      "npm:core-js@0.9.16/modules/web.immediate",
      "npm:core-js@0.9.16/modules/web.dom.iterable",
      "npm:core-js@0.9.16/modules/core.dict",
      "npm:core-js@0.9.16/modules/core.iter-helpers",
      "npm:core-js@0.9.16/modules/core.$for",
      "npm:core-js@0.9.16/modules/core.delay",
      "npm:core-js@0.9.16/modules/core.function.part",
      "npm:core-js@0.9.16/modules/core.object",
      "npm:core-js@0.9.16/modules/core.array.turn",
      "npm:core-js@0.9.16/modules/core.number.iterator",
      "npm:core-js@0.9.16/modules/core.number.math",
      "npm:core-js@0.9.16/modules/core.string.escape-html",
      "npm:core-js@0.9.16/modules/core.date",
      "npm:core-js@0.9.16/modules/core.global",
      "npm:core-js@0.9.16/modules/core.log",
      "github:aurelia/metadata@0.6.0/reflect-metadata",
      "github:aurelia/metadata@0.6.0/decorator-applicator",
      "github:aurelia/binding@0.7.3/value-converter",
      "github:aurelia/binding@0.7.3/class-list",
      "github:aurelia/binding@0.7.3/event-manager",
      "github:aurelia/task-queue@0.5.0/index",
      "github:aurelia/binding@0.7.3/environment",
      "github:aurelia/binding@0.7.3/array-change-records",
      "github:aurelia/binding@0.7.3/map-change-records",
      "github:aurelia/binding@0.7.3/map-observation",
      "github:aurelia/binding@0.7.3/dirty-checking",
      "github:aurelia/binding@0.7.3/property-observation",
      "github:aurelia/binding@0.7.3/element-observation",
      "github:aurelia/binding@0.7.3/class-observer",
      "github:aurelia/dependency-injection@0.8.1/metadata",
      "github:aurelia/logging@0.5.0/index",
      "github:aurelia/binding@0.7.3/computed-observation",
      "github:aurelia/binding@0.7.3/svg",
      "github:aurelia/binding@0.7.3/binding-modes",
      "github:aurelia/binding@0.7.3/lexer",
      "github:aurelia/binding@0.7.3/path-observer",
      "github:aurelia/binding@0.7.3/composite-observer",
      "github:aurelia/binding@0.7.3/access-keyed-observer",
      "github:aurelia/binding@0.7.3/binding-expression",
      "github:aurelia/binding@0.7.3/listener-expression",
      "github:aurelia/binding@0.7.3/name-expression",
      "github:aurelia/binding@0.7.3/call-expression",
      "github:aurelia/validation@0.2.5/validation/utilities",
      "github:aurelia/validation@0.2.5/validation/validation-rules-collection",
      "github:aurelia/validation@0.2.5/validation/path-observer",
      "github:aurelia/validation@0.2.5/validation/debouncer",
      "github:aurelia/validation@0.2.5/validation/validation-result",
      "github:aurelia/path@0.7.0/index",
      "github:aurelia/loader@0.7.0/template-registry-entry",
      "github:aurelia/loader@0.7.0/loader",
      "github:aurelia/templating@0.12.1/resource-registry",
      "github:aurelia/templating@0.12.1/view",
      "github:aurelia/templating@0.12.1/content-selector",
      "github:aurelia/templating@0.12.1/animator",
      "github:aurelia/templating@0.12.1/util",
      "github:aurelia/templating@0.12.1/binding-language",
      "github:aurelia/templating@0.12.1/module-analyzer",
      "github:aurelia/templating@0.12.1/bindable-property",
      "github:aurelia/templating@0.12.1/behavior-instance",
      "github:aurelia/templating@0.12.1/children",
      "github:aurelia/templating@0.12.1/element-config",
      "github:aurelia/templating@0.12.1/composition-engine",
      "github:aurelia/templating@0.12.1/decorators",
      "github:aurelia/validation@0.2.5/validation/decorators",
      "github:aurelia/validation@0.2.5/validation/validation-config",
      "npm:core-js@0.9.16/modules/$",
      "npm:core-js@0.9.16/modules/$.wks",
      "npm:core-js@0.9.16/modules/$.def",
      "npm:core-js@0.9.16/modules/$.ctx",
      "npm:core-js@0.9.16/modules/es6.symbol",
      "npm:core-js@0.9.16/modules/es6.object.assign",
      "npm:core-js@0.9.16/modules/es6.object.is",
      "npm:core-js@0.9.16/modules/es6.object.set-prototype-of",
      "npm:core-js@0.9.16/modules/es6.string.iterator",
      "npm:core-js@0.9.16/modules/es6.string.repeat",
      "npm:core-js@0.9.16/modules/es6.array.from",
      "npm:core-js@0.9.16/modules/es6.array.iterator",
      "npm:core-js@0.9.16/modules/es6.array.species",
      "npm:process@0.10.1",
      "npm:core-js@0.9.16/modules/es6.map",
      "npm:core-js@0.9.16/modules/es6.weak-map",
      "npm:core-js@0.9.16/modules/es6.reflect",
      "npm:core-js@0.9.16/modules/es7.string.lpad",
      "npm:core-js@0.9.16/modules/es7.map.to-json",
      "npm:core-js@0.9.16/modules/web.timers",
      "github:aurelia/metadata@0.6.0/metadata",
      "github:aurelia/metadata@0.6.0/decorators",
      "github:aurelia/task-queue@0.5.0",
      "github:aurelia/binding@0.7.3/collection-observation",
      "github:aurelia/logging@0.5.0",
      "github:aurelia/binding@0.7.3/ast",
      "github:aurelia/validation@0.2.5/validation/validation-rules",
      "github:aurelia/validation@0.2.5/validation/validation-property",
      "github:aurelia/path@0.7.0",
      "github:aurelia/loader@0.7.0/index",
      "github:aurelia/templating@0.12.1/view-slot",
      "npm:core-js@0.9.16/modules/$.cof",
      "npm:core-js@0.9.16/modules/$.array-methods",
      "github:jspm/nodelibs-process@0.1.1/index",
      "github:aurelia/binding@0.7.3/array-observation",
      "github:aurelia/dependency-injection@0.8.1/container",
      "github:aurelia/binding@0.7.3/parser",
      "github:aurelia/validation@0.2.5/validation/validation-group-builder",
      "github:aurelia/templating@0.12.1/view-strategy",
      "github:aurelia/loader@0.7.0",
      "github:aurelia/templating@0.12.1/view-factory",
      "npm:core-js@0.9.16/modules/es5",
      "github:jspm/nodelibs-process@0.1.1",
      "github:aurelia/dependency-injection@0.8.1/index",
      "github:aurelia/validation@0.2.5/validation/validation-group",
      "github:aurelia/templating@0.12.1/view-compiler",
      "npm:core-js@0.9.16/modules/$.task",
      "github:aurelia/dependency-injection@0.8.1",
      "github:aurelia/templating@0.12.1/view-engine",
      "npm:core-js@0.9.16/modules/es6.promise",
      "github:aurelia/binding@0.7.3/observer-locator",
      "github:aurelia/templating@0.12.1/html-behavior",
      "npm:core-js@0.9.16/shim",
      "github:aurelia/templating@0.12.1/index",
      "npm:core-js@0.9.16/index",
      "github:aurelia/templating@0.12.1",
      "npm:core-js@0.9.16",
      "github:aurelia/validation@0.2.5/validation/validate-custom-attribute",
      "github:aurelia/metadata@0.6.0/origin",
      "github:aurelia/metadata@0.6.0/index",
      "github:aurelia/metadata@0.6.0",
      "github:aurelia/binding@0.7.3/index",
      "github:aurelia/binding@0.7.3",
      "github:aurelia/validation@0.2.5/validation/validation",
      "github:aurelia/validation@0.2.5/index",
      "github:aurelia/validation@0.2.5",
      "github:aurelia/http-client@0.9.1/headers",
      "github:aurelia/http-client@0.9.1/http-response-message",
      "github:aurelia/http-client@0.9.1/transformers",
      "github:aurelia/http-client@0.9.1/jsonp-request-message",
      "github:aurelia/http-client@0.9.1/request-message-processor",
      "github:aurelia/http-client@0.9.1/http-request-message",
      "github:aurelia/http-client@0.9.1/request-builder",
      "github:aurelia/http-client@0.9.1/http-client",
      "github:aurelia/http-client@0.9.1/index",
      "github:aurelia/http-client@0.9.1",
      "github:aurelia/route-recognizer@0.5.0/state",
      "github:aurelia/route-recognizer@0.5.0/segments",
      "github:aurelia/router@0.9.0/navigation-commands",
      "github:aurelia/router@0.9.0/util",
      "github:aurelia/router@0.9.0/navigation-instruction",
      "github:aurelia/router@0.9.0/nav-model",
      "github:aurelia/history@0.5.0/index",
      "github:aurelia/router@0.9.0/pipeline",
      "github:aurelia/router@0.9.0/route-loading",
      "github:aurelia/router@0.9.0/activation",
      "github:aurelia/event-aggregator@0.5.0/index",
      "github:aurelia/route-recognizer@0.5.0/index",
      "github:aurelia/router@0.9.0/navigation-plan",
      "github:aurelia/history@0.5.0",
      "github:aurelia/router@0.9.0/pipeline-provider",
      "github:aurelia/event-aggregator@0.5.0",
      "github:aurelia/route-recognizer@0.5.0",
      "github:aurelia/router@0.9.0/navigation-context",
      "github:aurelia/router@0.9.0/app-router",
      "github:aurelia/router@0.9.0/route-filters",
      "github:aurelia/router@0.9.0/router-configuration",
      "github:aurelia/router@0.9.0/router",
      "github:aurelia/router@0.9.0/index",
      "github:aurelia/router@0.9.0",
      "github:aurelia/framework@0.12.0/plugins",
      "github:aurelia/logging-console@0.5.0/index",
      "github:aurelia/logging-console@0.5.0",
      "github:aurelia/framework@0.12.0/aurelia",
      "github:aurelia/framework@0.12.0/index",
      "github:aurelia/framework@0.12.0",
      "github:aurelia/bootstrapper@0.13.1/index",
      "github:aurelia/bootstrapper@0.13.1",
      "npm:core-js@0.9.16/library/modules/$.fw",
      "npm:babel-runtime@5.5.6/helpers/create-decorated-class",
      "npm:babel-runtime@5.5.6/helpers/class-call-check",
      "npm:core-js@0.9.16/library/modules/$",
      "npm:core-js@0.9.16/library/fn/object/define-property",
      "npm:babel-runtime@5.5.6/core-js/object/define-property",
      "npm:babel-runtime@5.5.6/helpers/define-decorated-property-descriptor",
      "resources/nav-menu",
      "resources/index",
      "npm:babel-runtime@5.5.6/helpers/create-class",
      "movies/movieData",
      "movies/list",
      "movies/edit",
      "movies/details",
      "about/about",
      "main",
      "app"
    ]
  }
});

System.config({
  "map": {
    "aurelia-bootstrapper": "github:aurelia/bootstrapper@0.13.1",
    "aurelia-framework": "github:aurelia/framework@0.12.0",
    "aurelia-http-client": "github:aurelia/http-client@0.9.1",
    "aurelia-router": "github:aurelia/router@0.9.0",
    "aurelia-validation": "github:aurelia/validation@0.2.5",
    "babel": "npm:babel-core@5.5.6",
    "babel-runtime": "npm:babel-runtime@5.5.6",
    "bootstrap": "github:twbs/bootstrap@3.3.4",
    "core-js": "npm:core-js@0.9.16",
    "font-awesome": "npm:font-awesome@4.3.0",
    "traceur": "github:jmcriffey/bower-traceur@0.0.87",
    "traceur-runtime": "github:jmcriffey/bower-traceur-runtime@0.0.87",
    "github:aurelia/binding@0.7.3": {
      "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.8.1",
      "aurelia-metadata": "github:aurelia/metadata@0.6.0",
      "aurelia-task-queue": "github:aurelia/task-queue@0.5.0",
      "core-js": "npm:core-js@0.9.16"
    },
    "github:aurelia/bootstrapper@0.13.1": {
      "aurelia-event-aggregator": "github:aurelia/event-aggregator@0.5.0",
      "aurelia-framework": "github:aurelia/framework@0.12.0",
      "aurelia-history": "github:aurelia/history@0.5.0",
      "aurelia-history-browser": "github:aurelia/history-browser@0.5.0",
      "aurelia-loader-default": "github:aurelia/loader-default@0.8.0",
      "aurelia-logging-console": "github:aurelia/logging-console@0.5.0",
      "aurelia-router": "github:aurelia/router@0.9.0",
      "aurelia-templating": "github:aurelia/templating@0.12.1",
      "aurelia-templating-binding": "github:aurelia/templating-binding@0.12.0",
      "aurelia-templating-resources": "github:aurelia/templating-resources@0.12.1",
      "aurelia-templating-router": "github:aurelia/templating-router@0.13.0",
      "core-js": "npm:core-js@0.9.16"
    },
    "github:aurelia/dependency-injection@0.7.1": {
      "aurelia-logging": "github:aurelia/logging@0.4.0",
      "aurelia-metadata": "github:aurelia/metadata@0.5.0",
      "core-js": "npm:core-js@0.9.16"
    },
    "github:aurelia/dependency-injection@0.8.1": {
      "aurelia-logging": "github:aurelia/logging@0.5.0",
      "aurelia-metadata": "github:aurelia/metadata@0.6.0",
      "core-js": "npm:core-js@0.9.16"
    },
    "github:aurelia/event-aggregator@0.5.0": {
      "aurelia-logging": "github:aurelia/logging@0.5.0"
    },
    "github:aurelia/framework@0.12.0": {
      "aurelia-binding": "github:aurelia/binding@0.7.3",
      "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.8.1",
      "aurelia-loader": "github:aurelia/loader@0.7.0",
      "aurelia-logging": "github:aurelia/logging@0.5.0",
      "aurelia-metadata": "github:aurelia/metadata@0.6.0",
      "aurelia-path": "github:aurelia/path@0.7.0",
      "aurelia-task-queue": "github:aurelia/task-queue@0.5.0",
      "aurelia-templating": "github:aurelia/templating@0.12.1",
      "core-js": "npm:core-js@0.9.16"
    },
    "github:aurelia/history-browser@0.5.0": {
      "aurelia-history": "github:aurelia/history@0.5.0",
      "core-js": "npm:core-js@0.9.16"
    },
    "github:aurelia/http-client@0.8.1": {
      "aurelia-path": "github:aurelia/path@0.6.1",
      "core-js": "npm:core-js@0.9.16"
    },
    "github:aurelia/http-client@0.9.1": {
      "aurelia-path": "github:aurelia/path@0.7.0",
      "core-js": "npm:core-js@0.9.16"
    },
    "github:aurelia/loader-default@0.8.0": {
      "aurelia-loader": "github:aurelia/loader@0.7.0",
      "aurelia-metadata": "github:aurelia/metadata@0.6.0"
    },
    "github:aurelia/loader@0.7.0": {
      "aurelia-html-template-element": "github:aurelia/html-template-element@0.2.0",
      "aurelia-path": "github:aurelia/path@0.7.0",
      "core-js": "npm:core-js@0.9.16",
      "webcomponentsjs": "github:webcomponents/webcomponentsjs@0.6.3"
    },
    "github:aurelia/metadata@0.5.0": {
      "core-js": "npm:core-js@0.9.16"
    },
    "github:aurelia/metadata@0.6.0": {
      "core-js": "npm:core-js@0.9.16"
    },
    "github:aurelia/route-recognizer@0.4.0": {
      "core-js": "npm:core-js@0.9.16"
    },
    "github:aurelia/route-recognizer@0.5.0": {
      "core-js": "npm:core-js@0.9.16"
    },
    "github:aurelia/router@0.8.1": {
      "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.7.1",
      "aurelia-event-aggregator": "github:aurelia/event-aggregator@0.4.0",
      "aurelia-history": "github:aurelia/history@0.4.0",
      "aurelia-path": "github:aurelia/path@0.6.1",
      "aurelia-route-recognizer": "github:aurelia/route-recognizer@0.4.0",
      "core-js": "npm:core-js@0.9.16"
    },
    "github:aurelia/router@0.9.0": {
      "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.8.1",
      "aurelia-event-aggregator": "github:aurelia/event-aggregator@0.5.0",
      "aurelia-history": "github:aurelia/history@0.5.0",
      "aurelia-path": "github:aurelia/path@0.7.0",
      "aurelia-route-recognizer": "github:aurelia/route-recognizer@0.5.0",
      "core-js": "npm:core-js@0.9.16"
    },
    "github:aurelia/templating-binding@0.12.0": {
      "aurelia-binding": "github:aurelia/binding@0.7.3",
      "aurelia-logging": "github:aurelia/logging@0.5.0",
      "aurelia-templating": "github:aurelia/templating@0.12.1"
    },
    "github:aurelia/templating-resources@0.12.1": {
      "aurelia-binding": "github:aurelia/binding@0.7.3",
      "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.8.1",
      "aurelia-logging": "github:aurelia/logging@0.5.0",
      "aurelia-task-queue": "github:aurelia/task-queue@0.5.0",
      "aurelia-templating": "github:aurelia/templating@0.12.1",
      "core-js": "npm:core-js@0.9.16"
    },
    "github:aurelia/templating-router@0.13.0": {
      "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.8.1",
      "aurelia-metadata": "github:aurelia/metadata@0.6.0",
      "aurelia-path": "github:aurelia/path@0.7.0",
      "aurelia-router": "github:aurelia/router@0.9.0",
      "aurelia-templating": "github:aurelia/templating@0.12.1"
    },
    "github:aurelia/templating@0.12.1": {
      "aurelia-binding": "github:aurelia/binding@0.7.3",
      "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.8.1",
      "aurelia-html-template-element": "github:aurelia/html-template-element@0.2.0",
      "aurelia-loader": "github:aurelia/loader@0.7.0",
      "aurelia-logging": "github:aurelia/logging@0.5.0",
      "aurelia-metadata": "github:aurelia/metadata@0.6.0",
      "aurelia-path": "github:aurelia/path@0.7.0",
      "aurelia-task-queue": "github:aurelia/task-queue@0.5.0",
      "core-js": "npm:core-js@0.9.16"
    },
    "github:aurelia/validation@0.2.5": {
      "aurelia-binding": "github:aurelia/binding@0.7.3",
      "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.8.1",
      "aurelia-templating": "github:aurelia/templating@0.12.1"
    },
    "github:jspm/nodelibs-assert@0.1.0": {
      "assert": "npm:assert@1.3.0"
    },
    "github:jspm/nodelibs-buffer@0.1.0": {
      "buffer": "npm:buffer@3.2.2"
    },
    "github:jspm/nodelibs-events@0.1.1": {
      "events": "npm:events@1.0.2"
    },
    "github:jspm/nodelibs-http@1.7.1": {
      "Base64": "npm:Base64@0.2.1",
      "events": "github:jspm/nodelibs-events@0.1.1",
      "inherits": "npm:inherits@2.0.1",
      "stream": "github:jspm/nodelibs-stream@0.1.0",
      "url": "github:jspm/nodelibs-url@0.1.0",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "github:jspm/nodelibs-https@0.1.0": {
      "https-browserify": "npm:https-browserify@0.0.0"
    },
    "github:jspm/nodelibs-os@0.1.0": {
      "os-browserify": "npm:os-browserify@0.1.2"
    },
    "github:jspm/nodelibs-path@0.1.0": {
      "path-browserify": "npm:path-browserify@0.0.0"
    },
    "github:jspm/nodelibs-process@0.1.1": {
      "process": "npm:process@0.10.1"
    },
    "github:jspm/nodelibs-stream@0.1.0": {
      "stream-browserify": "npm:stream-browserify@1.0.0"
    },
    "github:jspm/nodelibs-url@0.1.0": {
      "url": "npm:url@0.10.3"
    },
    "github:jspm/nodelibs-util@0.1.0": {
      "util": "npm:util@0.10.3"
    },
    "github:systemjs/plugin-css@0.1.12": {
      "clean-css": "npm:clean-css@3.1.9",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "path": "github:jspm/nodelibs-path@0.1.0"
    },
    "github:twbs/bootstrap@3.3.4": {
      "jquery": "github:components/jquery@2.1.4"
    },
    "npm:amdefine@0.1.1": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "module": "github:jspm/nodelibs-module@0.1.0",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:assert@1.3.0": {
      "util": "npm:util@0.10.3"
    },
    "npm:babel-runtime@5.5.6": {
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:buffer@3.2.2": {
      "base64-js": "npm:base64-js@0.0.8",
      "ieee754": "npm:ieee754@1.1.5",
      "is-array": "npm:is-array@1.0.1"
    },
    "npm:clean-css@3.1.9": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "commander": "npm:commander@2.6.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "http": "github:jspm/nodelibs-http@1.7.1",
      "https": "github:jspm/nodelibs-https@0.1.0",
      "os": "github:jspm/nodelibs-os@0.1.0",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.1",
      "source-map": "npm:source-map@0.1.43",
      "url": "github:jspm/nodelibs-url@0.1.0",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:commander@2.6.0": {
      "child_process": "github:jspm/nodelibs-child_process@0.1.0",
      "events": "github:jspm/nodelibs-events@0.1.1",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:core-js@0.9.16": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "process": "github:jspm/nodelibs-process@0.1.1",
      "systemjs-json": "github:systemjs/plugin-json@0.1.0"
    },
    "npm:core-util-is@1.0.1": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0"
    },
    "npm:font-awesome@4.3.0": {
      "css": "github:systemjs/plugin-css@0.1.12"
    },
    "npm:https-browserify@0.0.0": {
      "http": "github:jspm/nodelibs-http@1.7.1"
    },
    "npm:inherits@2.0.1": {
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:os-browserify@0.1.2": {
      "os": "github:jspm/nodelibs-os@0.1.0"
    },
    "npm:path-browserify@0.0.0": {
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:punycode@1.3.2": {
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:readable-stream@1.1.13": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "core-util-is": "npm:core-util-is@1.0.1",
      "events": "github:jspm/nodelibs-events@0.1.1",
      "inherits": "npm:inherits@2.0.1",
      "isarray": "npm:isarray@0.0.1",
      "process": "github:jspm/nodelibs-process@0.1.1",
      "stream": "github:jspm/nodelibs-stream@0.1.0",
      "stream-browserify": "npm:stream-browserify@1.0.0",
      "string_decoder": "npm:string_decoder@0.10.31",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:source-map@0.1.43": {
      "amdefine": "npm:amdefine@0.1.1",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:stream-browserify@1.0.0": {
      "events": "github:jspm/nodelibs-events@0.1.1",
      "inherits": "npm:inherits@2.0.1",
      "readable-stream": "npm:readable-stream@1.1.13"
    },
    "npm:string_decoder@0.10.31": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0"
    },
    "npm:url@0.10.3": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "punycode": "npm:punycode@1.3.2",
      "querystring": "npm:querystring@0.2.0",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:util@0.10.3": {
      "inherits": "npm:inherits@2.0.1",
      "process": "github:jspm/nodelibs-process@0.1.1"
    }
  }
});

