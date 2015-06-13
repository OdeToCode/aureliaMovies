"format register";
System.register("github:aurelia/validation@0.2.5/validation/validation-locale", [], function(_export) {
  var _classCallCheck,
      ValidationLocale,
      ValidationLocaleRepository;
  return {
    setters: [],
    execute: function() {
      'use strict';
      _classCallCheck = function(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError('Cannot call a class as a function');
        }
      };
      ValidationLocale = (function() {
        function ValidationLocale(defaults, data) {
          _classCallCheck(this, ValidationLocale);
          this.defaults = defaults;
          this.currentLocale = data;
        }
        ValidationLocale.prototype.getValueFor = function getValueFor(identifier, category) {
          if (this.currentLocale && this.currentLocale[category]) {
            var currentLocaleSetting = this.currentLocale[category][identifier];
            if (currentLocaleSetting !== undefined && currentLocaleSetting !== null) {
              return currentLocaleSetting;
            }
          }
          if (this.defaults[category]) {
            var defaultSetting = this.defaults[category][identifier];
            if (defaultSetting !== undefined && defaultSetting !== null) {
              return defaultSetting;
            }
          }
          throw 'validation: I18N: Could not find: ' + identifier + ' in category: ' + category;
        };
        ValidationLocale.prototype.setting = function setting(settingIdentifier) {
          return this.getValueFor(settingIdentifier, 'settings');
        };
        ValidationLocale.prototype.translate = function translate(translationIdentifier, newValue, threshold) {
          var translation = this.getValueFor(translationIdentifier, 'messages');
          if (typeof translation === 'function') {
            return translation(newValue, threshold);
          }
          if (typeof translation === 'string') {
            return translation;
          }
          throw 'Validation message for ' + translationIdentifier + 'was in an unsupported format';
        };
        return ValidationLocale;
      })();
      _export('ValidationLocale', ValidationLocale);
      ValidationLocaleRepository = (function() {
        function ValidationLocaleRepository() {
          _classCallCheck(this, ValidationLocaleRepository);
          this['default'] = null;
          this.instances = new Map();
          this.defaults = {
            settings: {numericRegex: /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/},
            messages: {}
          };
        }
        ValidationLocaleRepository.prototype.load = function load(localeIdentifier, basePath) {
          var _this = this;
          if (!basePath)
            basePath = 'aurelia-validation/resources/';
          return new Promise(function(resolve, reject) {
            if (_this.instances.has(localeIdentifier)) {
              var locale = _this.instances.get(localeIdentifier);
              resolve(locale);
            } else {
              System['import'](basePath + localeIdentifier).then(function(resource) {
                var locale = _this.addLocale(localeIdentifier, resource.data);
                resolve(locale);
              });
            }
          });
        };
        ValidationLocaleRepository.prototype.addLocale = function addLocale(localeIdentifier, data) {
          var instance = new ValidationLocale(this.defaults, data);
          this.instances.set(localeIdentifier, instance);
          if (this['default'] === null)
            this['default'] = instance;
          return instance;
        };
        return ValidationLocaleRepository;
      })();
      ValidationLocale.Repository = new ValidationLocaleRepository();
    }
  };
});

System.register("github:aurelia/validation@0.2.5/validation/validate-custom-attribute-view-strategy", [], function(_export) {
  var _inherits,
      _classCallCheck,
      ValidateCustomAttributeViewStrategyBase,
      TWBootstrapViewStrategy,
      ValidateCustomAttributeViewStrategy;
  return {
    setters: [],
    execute: function() {
      'use strict';
      _inherits = function(subClass, superClass) {
        if (typeof superClass !== 'function' && superClass !== null) {
          throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
        }
        subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
          }});
        if (superClass)
          subClass.__proto__ = superClass;
      };
      _classCallCheck = function(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError('Cannot call a class as a function');
        }
      };
      ValidateCustomAttributeViewStrategyBase = (function() {
        function ValidateCustomAttributeViewStrategyBase() {
          _classCallCheck(this, ValidateCustomAttributeViewStrategyBase);
          this.bindingPathAttributes = ['validate', 'value.bind', 'value.two-way'];
        }
        ValidateCustomAttributeViewStrategyBase.prototype.getValidationProperty = function getValidationProperty(validation, element) {
          var atts = element.attributes;
          for (var i = 0; i < this.bindingPathAttributes.length; i++) {
            var attributeName = this.bindingPathAttributes[i];
            if (atts[attributeName]) {
              var bindingPath = atts[attributeName].value.trim();
              if (bindingPath.indexOf('|') != -1)
                bindingPath = bindingPath.split('|')[0].trim();
              var validationProperty = validation.result.properties[bindingPath];
              if (attributeName == 'validate' && (validationProperty === null || validationProperty === undefined)) {
                validation.ensure(bindingPath);
                validationProperty = validation.result.properties[bindingPath];
              }
              return validationProperty;
            }
          }
          return null;
        };
        ValidateCustomAttributeViewStrategyBase.prototype.prepareElement = function prepareElement(validationProperty, element) {
          throw Error('View strategy must implement prepareElement(validationProperty, element)');
        };
        ValidateCustomAttributeViewStrategyBase.prototype.updateElement = function updateElement(validationProperty, element) {
          throw Error('View strategy must implement updateElement(validationProperty, element)');
        };
        return ValidateCustomAttributeViewStrategyBase;
      })();
      _export('ValidateCustomAttributeViewStrategyBase', ValidateCustomAttributeViewStrategyBase);
      TWBootstrapViewStrategy = (function(_ValidateCustomAttributeViewStrategyBase) {
        function TWBootstrapViewStrategy(appendMessageToInput, appendMessageToLabel, helpBlockClass) {
          _classCallCheck(this, TWBootstrapViewStrategy);
          _ValidateCustomAttributeViewStrategyBase.call(this);
          this.appendMessageToInput = appendMessageToInput;
          this.appendMessageToLabel = appendMessageToLabel;
          this.helpBlockClass = helpBlockClass;
        }
        _inherits(TWBootstrapViewStrategy, _ValidateCustomAttributeViewStrategyBase);
        TWBootstrapViewStrategy.prototype.searchFormGroup = function searchFormGroup(currentElement, currentDepth) {
          if (currentDepth === 5) {
            return null;
          }
          if (currentElement.classList && currentElement.classList.contains('form-group')) {
            return currentElement;
          }
          return this.searchFormGroup(currentElement.parentNode, 1 + currentDepth);
        };
        TWBootstrapViewStrategy.prototype.findLabels = function findLabels(formGroup, inputId) {
          var labels = [];
          this.findLabelsRecursively(formGroup, inputId, labels, 0);
          return labels;
        };
        TWBootstrapViewStrategy.prototype.findLabelsRecursively = function findLabelsRecursively(currentElement, inputId, currentLabels, currentDepth) {
          if (currentDepth === 5) {
            return ;
          }
          if (currentElement.nodeName === 'LABEL' && (currentElement.attributes['for'] && currentElement.attributes['for'].value === inputId || !currentElement.attributes['for'])) {
            currentLabels.push(currentElement);
          }
          for (var i = 0; i < currentElement.children.length; i++) {
            this.findLabelsRecursively(currentElement.children[i], inputId, currentLabels, 1 + currentDepth);
          }
        };
        TWBootstrapViewStrategy.prototype.appendMessageToElement = function appendMessageToElement(element, validationProperty) {
          var helpBlock = element.nextSibling;
          if (helpBlock) {
            if (!helpBlock.classList) {
              helpBlock = null;
            } else if (!helpBlock.classList.contains(this.helpBlockClass)) {
              helpBlock = null;
            }
          }
          if (!helpBlock) {
            helpBlock = document.createElement('p');
            helpBlock.classList.add('help-block');
            helpBlock.classList.add(this.helpBlockClass);
            if (element.nextSibling) {
              element.parentNode.insertBefore(helpBlock, element.nextSibling);
            } else {
              element.parentNode.appendChild(helpBlock);
            }
          }
          if (validationProperty)
            helpBlock.textContent = validationProperty.message;
          else
            helpBlock.textContent = '';
        };
        TWBootstrapViewStrategy.prototype.appendUIVisuals = function appendUIVisuals(validationProperty, currentElement) {
          var formGroup = this.searchFormGroup(currentElement, 0);
          if (formGroup) {
            if (validationProperty && validationProperty.isDirty) {
              if (validationProperty.isValid) {
                formGroup.classList.remove('has-warning');
                formGroup.classList.add('has-success');
              } else {
                formGroup.classList.remove('has-success');
                formGroup.classList.add('has-warning');
              }
            } else {
              formGroup.classList.remove('has-warning');
              formGroup.classList.remove('has-success');
            }
            if (this.appendMessageToInput) {
              this.appendMessageToElement(currentElement, validationProperty);
            }
            if (this.appendMessageToLabel) {
              var labels = this.findLabels(formGroup, currentElement.id);
              for (var ii = 0; ii < labels.length; ii++) {
                var label = labels[ii];
                this.appendMessageToElement(label, validationProperty);
              }
            }
          }
        };
        TWBootstrapViewStrategy.prototype.prepareElement = function prepareElement(validationProperty, element) {
          this.appendUIVisuals(null, element);
        };
        TWBootstrapViewStrategy.prototype.updateElement = function updateElement(validationProperty, element) {
          this.appendUIVisuals(validationProperty, element);
        };
        return TWBootstrapViewStrategy;
      })(ValidateCustomAttributeViewStrategyBase);
      _export('TWBootstrapViewStrategy', TWBootstrapViewStrategy);
      ValidateCustomAttributeViewStrategy = function ValidateCustomAttributeViewStrategy() {
        _classCallCheck(this, ValidateCustomAttributeViewStrategy);
      };
      _export('ValidateCustomAttributeViewStrategy', ValidateCustomAttributeViewStrategy);
      ValidateCustomAttributeViewStrategy.TWBootstrapAppendToInput = new TWBootstrapViewStrategy(true, false, 'aurelia-validation-message');
      ValidateCustomAttributeViewStrategy.TWBootstrapAppendToMessage = new TWBootstrapViewStrategy(false, true, 'aurelia-validation-message');
    }
  };
});

System.register("npm:core-js@0.9.16/modules/$.fw", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = function($) {
    $.FW = true;
    $.path = $.g;
    return $;
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.16/modules/$.dom-create", ["npm:core-js@0.9.16/modules/$"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@0.9.16/modules/$"),
      document = $.g.document,
      isObject = $.isObject,
      is = isObject(document) && isObject(document.createElement);
  module.exports = function(it) {
    return is ? document.createElement(it) : {};
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.16/modules/$.shared", ["npm:core-js@0.9.16/modules/$"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@0.9.16/modules/$"),
      SHARED = '__core-js_shared__',
      store = $.g[SHARED] || $.hide($.g, SHARED, {})[SHARED];
  module.exports = function(key) {
    return store[key] || (store[key] = {});
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.16/modules/$.uid", ["npm:core-js@0.9.16/modules/$"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var sid = 0;
  function uid(key) {
    return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++sid + Math.random()).toString(36));
  }
  uid.safe = require("npm:core-js@0.9.16/modules/$").g.Symbol || uid;
  module.exports = uid;
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.16/modules/$.redef", ["npm:core-js@0.9.16/modules/$", "npm:core-js@0.9.16/modules/$.uid"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@0.9.16/modules/$"),
      tpl = String({}.hasOwnProperty),
      SRC = require("npm:core-js@0.9.16/modules/$.uid").safe('src'),
      _toString = Function.toString;
  function $redef(O, key, val, safe) {
    if ($.isFunction(val)) {
      var base = O[key];
      $.hide(val, SRC, base ? String(base) : tpl.replace(/hasOwnProperty/, String(key)));
      if (!('name' in val))
        val.name = key;
    }
    if (O === $.g) {
      O[key] = val;
    } else {
      if (!safe)
        delete O[key];
      $.hide(O, key, val);
    }
  }
  $redef(Function.prototype, 'toString', function toString() {
    return $.has(this, SRC) ? this[SRC] : _toString.call(this);
  });
  $.core.inspectSource = function(it) {
    return _toString.call(it);
  };
  module.exports = $redef;
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.16/modules/$.invoke", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = function(fn, args, that) {
    var un = that === undefined;
    switch (args.length) {
      case 0:
        return un ? fn() : fn.call(that);
      case 1:
        return un ? fn(args[0]) : fn.call(that, args[0]);
      case 2:
        return un ? fn(args[0], args[1]) : fn.call(that, args[0], args[1]);
      case 3:
        return un ? fn(args[0], args[1], args[2]) : fn.call(that, args[0], args[1], args[2]);
      case 4:
        return un ? fn(args[0], args[1], args[2], args[3]) : fn.call(that, args[0], args[1], args[2], args[3]);
      case 5:
        return un ? fn(args[0], args[1], args[2], args[3], args[4]) : fn.call(that, args[0], args[1], args[2], args[3], args[4]);
    }
    return fn.apply(that, args);
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.16/modules/$.assert", ["npm:core-js@0.9.16/modules/$"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@0.9.16/modules/$");
  function assert(condition, msg1, msg2) {
    if (!condition)
      throw TypeError(msg2 ? msg1 + msg2 : msg1);
  }
  assert.def = $.assertDefined;
  assert.fn = function(it) {
    if (!$.isFunction(it))
      throw TypeError(it + ' is not a function!');
    return it;
  };
  assert.obj = function(it) {
    if (!$.isObject(it))
      throw TypeError(it + ' is not an object!');
    return it;
  };
  assert.inst = function(it, Constructor, name) {
    if (!(it instanceof Constructor))
      throw TypeError(name + ": use the 'new' operator!");
    return it;
  };
  module.exports = assert;
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.16/modules/$.array-includes", ["npm:core-js@0.9.16/modules/$"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@0.9.16/modules/$");
  module.exports = function(IS_INCLUDES) {
    return function($this, el, fromIndex) {
      var O = $.toObject($this),
          length = $.toLength(O.length),
          index = $.toIndex(fromIndex, length),
          value;
      if (IS_INCLUDES && el != el)
        while (length > index) {
          value = O[index++];
          if (value != value)
            return true;
        }
      else
        for (; length > index; index++)
          if (IS_INCLUDES || index in O) {
            if (O[index] === el)
              return IS_INCLUDES || index;
          }
      return !IS_INCLUDES && -1;
    };
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.16/modules/$.replacer", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  module.exports = function(regExp, replace, isStatic) {
    var replacer = replace === Object(replace) ? function(part) {
      return replace[part];
    } : replace;
    return function(it) {
      return String(isStatic ? it : this).replace(regExp, replacer);
    };
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.16/modules/$.throws", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = function(exec) {
    try {
      exec();
      return false;
    } catch (e) {
      return true;
    }
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.16/modules/$.keyof", ["npm:core-js@0.9.16/modules/$"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@0.9.16/modules/$");
  module.exports = function(object, el) {
    var O = $.toObject(object),
        keys = $.getKeys(O),
        length = keys.length,
        index = 0,
        key;
    while (length > index)
      if (O[key = keys[index++]] === el)
        return key;
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.16/modules/$.enum-keys", ["npm:core-js@0.9.16/modules/$"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@0.9.16/modules/$");
  module.exports = function(it) {
    var keys = $.getKeys(it),
        getDesc = $.getDesc,
        getSymbols = $.getSymbols;
    if (getSymbols)
      $.each.call(getSymbols(it), function(key) {
        if (getDesc(it, key).enumerable)
          keys.push(key);
      });
    return keys;
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.16/modules/$.get-names", ["npm:core-js@0.9.16/modules/$"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@0.9.16/modules/$"),
      toString = {}.toString,
      getNames = $.getNames;
  var windowNames = typeof window == 'object' && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [];
  function getWindowNames(it) {
    try {
      return getNames(it);
    } catch (e) {
      return windowNames.slice();
    }
  }
  module.exports.get = function getOwnPropertyNames(it) {
    if (windowNames && toString.call(it) == '[object Window]')
      return getWindowNames(it);
    return getNames($.toObject(it));
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.16/modules/$.assign", ["npm:core-js@0.9.16/modules/$", "npm:core-js@0.9.16/modules/$.enum-keys"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@0.9.16/modules/$"),
      enumKeys = require("npm:core-js@0.9.16/modules/$.enum-keys");
  module.exports = Object.assign || function assign(target, source) {
    var T = Object($.assertDefined(target)),
        l = arguments.length,
        i = 1;
    while (l > i) {
      var S = $.ES5Object(arguments[i++]),
          keys = enumKeys(S),
          length = keys.length,
          j = 0,
          key;
      while (length > j)
        T[key = keys[j++]] = S[key];
    }
    return T;
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.16/modules/$.same", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = Object.is || function is(x, y) {
    return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.16/modules/$.set-proto", ["npm:core-js@0.9.16/modules/$", "npm:core-js@0.9.16/modules/$.assert", "npm:core-js@0.9.16/modules/$.ctx"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@0.9.16/modules/$"),
      assert = require("npm:core-js@0.9.16/modules/$.assert");
  function check(O, proto) {
    assert.obj(O);
    assert(proto === null || $.isObject(proto), proto, ": can't set as prototype!");
  }
  module.exports = {
    set: Object.setPrototypeOf || ('__proto__' in {} ? function(buggy, set) {
      try {
        set = require("npm:core-js@0.9.16/modules/$.ctx")(Function.call, $.getDesc(Object.prototype, '__proto__').set, 2);
        set({}, []);
      } catch (e) {
        buggy = true;
      }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy)
          O.__proto__ = proto;
        else
          set(O, proto);
        return O;
      };
    }() : undefined),
    check: check
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.16/modules/es6.object.to-string", ["npm:core-js@0.9.16/modules/$.cof", "npm:core-js@0.9.16/modules/$.wks", "npm:core-js@0.9.16/modules/$", "npm:core-js@0.9.16/modules/$.redef"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var cof = require("npm:core-js@0.9.16/modules/$.cof"),
      tmp = {};
  tmp[require("npm:core-js@0.9.16/modules/$.wks")('toStringTag')] = 'z';
  if (require("npm:core-js@0.9.16/modules/$").FW && cof(tmp) != 'z') {
    require("npm:core-js@0.9.16/modules/$.redef")(Object.prototype, 'toString', function toString() {
      return '[object ' + cof.classof(this) + ']';
    }, true);
  }
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.16/modules/es6.object.statics-accept-primitives", ["npm:core-js@0.9.16/modules/$", "npm:core-js@0.9.16/modules/$.def", "npm:core-js@0.9.16/modules/$.get-names"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@0.9.16/modules/$"),
      $def = require("npm:core-js@0.9.16/modules/$.def"),
      isObject = $.isObject,
      toObject = $.toObject;
  $.each.call(('freeze,seal,preventExtensions,isFrozen,isSealed,isExtensible,' + 'getOwnPropertyDescriptor,getPrototypeOf,keys,getOwnPropertyNames').split(','), function(KEY, ID) {
    var fn = ($.core.Object || {})[KEY] || Object[KEY],
        forced = 0,
        method = {};
    method[KEY] = ID == 0 ? function freeze(it) {
      return isObject(it) ? fn(it) : it;
    } : ID == 1 ? function seal(it) {
      return isObject(it) ? fn(it) : it;
    } : ID == 2 ? function preventExtensions(it) {
      return isObject(it) ? fn(it) : it;
    } : ID == 3 ? function isFrozen(it) {
      return isObject(it) ? fn(it) : true;
    } : ID == 4 ? function isSealed(it) {
      return isObject(it) ? fn(it) : true;
    } : ID == 5 ? function isExtensible(it) {
      return isObject(it) ? fn(it) : false;
    } : ID == 6 ? function getOwnPropertyDescriptor(it, key) {
      return fn(toObject(it), key);
    } : ID == 7 ? function getPrototypeOf(it) {
      return fn(Object($.assertDefined(it)));
    } : ID == 8 ? function keys(it) {
      return fn(toObject(it));
    } : require("npm:core-js@0.9.16/modules/$.get-names").get;
    try {
      fn('z');
    } catch (e) {
      forced = 1;
    }
    $def($def.S + $def.F * forced, 'Object', method);
  });
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.16/modules/es6.function.name", ["npm:core-js@0.9.16/modules/$"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var $ = require("npm:core-js@0.9.16/modules/$"),
      NAME = 'name',
      setDesc = $.setDesc,
      FunctionProto = Function.prototype;
  NAME in FunctionProto || $.FW && $.DESC && setDesc(FunctionProto, NAME, {
    configurable: true,
    get: function() {
      var match = String(this).match(/^\s*function ([^ (]*)/),
          name = match ? match[1] : '';
      $.has(this, NAME) || setDesc(this, NAME, $.desc(5, name));
      return name;
    },
    set: function(value) {
      $.has(this, NAME) || setDesc(this, NAME, $.desc(0, value));
    }
  });
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.16/modules/es6.function.has-instance", ["npm:core-js@0.9.16/modules/$", "npm:core-js@0.9.16/modules/$.wks"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@0.9.16/modules/$"),
      HAS_INSTANCE = require("npm:core-js@0.9.16/modules/$.wks")('hasInstance'),
      FunctionProto = Function.prototype;
  if (!(HAS_INSTANCE in FunctionProto))
    $.setDesc(FunctionProto, HAS_INSTANCE, {value: function(O) {
        if (!$.isFunction(this) || !$.isObject(O))
          return false;
        if (!$.isObject(this.prototype))
          return O instanceof this;
        while (O = $.getProto(O))
          if (this.prototype === O)
            return true;
        return false;
      }});
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.16/modules/es6.number.constructor", ["npm:core-js@0.9.16/modules/$", "npm:core-js@0.9.16/modules/$.redef"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var $ = require("npm:core-js@0.9.16/modules/$"),
      isObject = $.isObject,
      isFunction = $.isFunction,
      NUMBER = 'Number',
      $Number = $.g[NUMBER],
      Base = $Number,
      proto = $Number.prototype;
  function toPrimitive(it) {
    var fn,
        val;
    if (isFunction(fn = it.valueOf) && !isObject(val = fn.call(it)))
      return val;
    if (isFunction(fn = it.toString) && !isObject(val = fn.call(it)))
      return val;
    throw TypeError("Can't convert object to number");
  }
  function toNumber(it) {
    if (isObject(it))
      it = toPrimitive(it);
    if (typeof it == 'string' && it.length > 2 && it.charCodeAt(0) == 48) {
      var binary = false;
      switch (it.charCodeAt(1)) {
        case 66:
        case 98:
          binary = true;
        case 79:
        case 111:
          return parseInt(it.slice(2), binary ? 2 : 8);
      }
    }
    return +it;
  }
  if ($.FW && !($Number('0o1') && $Number('0b1'))) {
    $Number = function Number(it) {
      return this instanceof $Number ? new Base(toNumber(it)) : toNumber(it);
    };
    $.each.call($.DESC ? $.getNames(Base) : ('MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' + 'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' + 'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger').split(','), function(key) {
      if ($.has(Base, key) && !$.has($Number, key)) {
        $.setDesc($Number, key, $.getDesc(Base, key));
      }
    });
    $Number.prototype = proto;
    proto.constructor = $Number;
    require("npm:core-js@0.9.16/modules/$.redef")($.g, NUMBER, $Number);
  }
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.16/modules/es6.number.statics", ["npm:core-js@0.9.16/modules/$", "npm:core-js@0.9.16/modules/$.def"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@0.9.16/modules/$"),
      $def = require("npm:core-js@0.9.16/modules/$.def"),
      abs = Math.abs,
      floor = Math.floor,
      _isFinite = $.g.isFinite,
      MAX_SAFE_INTEGER = 0x1fffffffffffff;
  function isInteger(it) {
    return !$.isObject(it) && _isFinite(it) && floor(it) === it;
  }
  $def($def.S, 'Number', {
    EPSILON: Math.pow(2, -52),
    isFinite: function isFinite(it) {
      return typeof it == 'number' && _isFinite(it);
    },
    isInteger: isInteger,
    isNaN: function isNaN(number) {
      return number != number;
    },
    isSafeInteger: function isSafeInteger(number) {
      return isInteger(number) && abs(number) <= MAX_SAFE_INTEGER;
    },
    MAX_SAFE_INTEGER: MAX_SAFE_INTEGER,
    MIN_SAFE_INTEGER: -MAX_SAFE_INTEGER,
    parseFloat: parseFloat,
    parseInt: parseInt
  });
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.16/modules/es6.math", ["npm:core-js@0.9.16/modules/$.def"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var Infinity = 1 / 0,
      $def = require("npm:core-js@0.9.16/modules/$.def"),
      E = Math.E,
      pow = Math.pow,
      abs = Math.abs,
      exp = Math.exp,
      log = Math.log,
      sqrt = Math.sqrt,
      ceil = Math.ceil,
      floor = Math.floor,
      EPSILON = pow(2, -52),
      EPSILON32 = pow(2, -23),
      MAX32 = pow(2, 127) * (2 - EPSILON32),
      MIN32 = pow(2, -126);
  function roundTiesToEven(n) {
    return n + 1 / EPSILON - 1 / EPSILON;
  }
  function sign(x) {
    return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
  }
  function asinh(x) {
    return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : log(x + sqrt(x * x + 1));
  }
  function expm1(x) {
    return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : exp(x) - 1;
  }
  $def($def.S, 'Math', {
    acosh: function acosh(x) {
      return (x = +x) < 1 ? NaN : isFinite(x) ? log(x / E + sqrt(x + 1) * sqrt(x - 1) / E) + 1 : x;
    },
    asinh: asinh,
    atanh: function atanh(x) {
      return (x = +x) == 0 ? x : log((1 + x) / (1 - x)) / 2;
    },
    cbrt: function cbrt(x) {
      return sign(x = +x) * pow(abs(x), 1 / 3);
    },
    clz32: function clz32(x) {
      return (x >>>= 0) ? 31 - floor(log(x + 0.5) * Math.LOG2E) : 32;
    },
    cosh: function cosh(x) {
      return (exp(x = +x) + exp(-x)) / 2;
    },
    expm1: expm1,
    fround: function fround(x) {
      var $abs = abs(x),
          $sign = sign(x),
          a,
          result;
      if ($abs < MIN32)
        return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
      a = (1 + EPSILON32 / EPSILON) * $abs;
      result = a - (a - $abs);
      if (result > MAX32 || result != result)
        return $sign * Infinity;
      return $sign * result;
    },
    hypot: function hypot(value1, value2) {
      var sum = 0,
          i = 0,
          len = arguments.length,
          larg = 0,
          arg,
          div;
      while (i < len) {
        arg = abs(arguments[i++]);
        if (larg < arg) {
          div = larg / arg;
          sum = sum * div * div + 1;
          larg = arg;
        } else if (arg > 0) {
          div = arg / larg;
          sum += div * div;
        } else
          sum += arg;
      }
      return larg === Infinity ? Infinity : larg * sqrt(sum);
    },
    imul: function imul(x, y) {
      var UInt16 = 0xffff,
          xn = +x,
          yn = +y,
          xl = UInt16 & xn,
          yl = UInt16 & yn;
      return 0 | xl * yl + ((UInt16 & xn >>> 16) * yl + xl * (UInt16 & yn >>> 16) << 16 >>> 0);
    },
    log1p: function log1p(x) {
      return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : log(1 + x);
    },
    log10: function log10(x) {
      return log(x) / Math.LN10;
    },
    log2: function log2(x) {
      return log(x) / Math.LN2;
    },
    sign: sign,
    sinh: function sinh(x) {
      return abs(x = +x) < 1 ? (expm1(x) - expm1(-x)) / 2 : (exp(x - 1) - exp(-x - 1)) * (E / 2);
    },
    tanh: function tanh(x) {
      var a = expm1(x = +x),
          b = expm1(-x);
      return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
    },
    trunc: function trunc(it) {
      return (it > 0 ? floor : ceil)(it);
    }
  });
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.16/modules/es6.string.from-code-point", ["npm:core-js@0.9.16/modules/$.def", "npm:core-js@0.9.16/modules/$"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $def = require("npm:core-js@0.9.16/modules/$.def"),
      toIndex = require("npm:core-js@0.9.16/modules/$").toIndex,
      fromCharCode = String.fromCharCode,
      $fromCodePoint = String.fromCodePoint;
  $def($def.S + $def.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {fromCodePoint: function fromCodePoint(x) {
      var res = [],
          len = arguments.length,
          i = 0,
          code;
      while (len > i) {
        code = +arguments[i++];
        if (toIndex(code, 0x10ffff) !== code)
          throw RangeError(code + ' is not a valid code point');
        res.push(code < 0x10000 ? fromCharCode(code) : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00));
      }
      return res.join('');
    }});
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.16/modules/es6.string.raw", ["npm:core-js@0.9.16/modules/$", "npm:core-js@0.9.16/modules/$.def"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@0.9.16/modules/$"),
      $def = require("npm:core-js@0.9.16/modules/$.def");
  $def($def.S, 'String', {raw: function raw(callSite) {
      var tpl = $.toObject(callSite.raw),
          len = $.toLength(tpl.length),
          sln = arguments.length,
          res = [],
          i = 0;
      while (len > i) {
        res.push(String(tpl[i++]));
        if (i < sln)
          res.push(String(arguments[i]));
      }
      return res.join('');
    }});
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.16/modules/$.string-at", ["npm:core-js@0.9.16/modules/$"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@0.9.16/modules/$");
  module.exports = function(TO_STRING) {
    return function(that, pos) {
      var s = String($.assertDefined(that)),
          i = $.toInteger(pos),
          l = s.length,
          a,
          b;
      if (i < 0 || i >= l)
        return TO_STRING ? '' : undefined;
      a = s.charCodeAt(i);
      return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff ? TO_STRING ? s.charAt(i) : a : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
    };
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.16/modules/$.iter", ["npm:core-js@0.9.16/modules/$", "npm:core-js@0.9.16/modules/$.cof", "npm:core-js@0.9.16/modules/$.assert", "npm:core-js@0.9.16/modules/$.wks", "npm:core-js@0.9.16/modules/$.shared"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var $ = require("npm:core-js@0.9.16/modules/$"),
      cof = require("npm:core-js@0.9.16/modules/$.cof"),
      classof = cof.classof,
      assert = require("npm:core-js@0.9.16/modules/$.assert"),
      assertObject = assert.obj,
      SYMBOL_ITERATOR = require("npm:core-js@0.9.16/modules/$.wks")('iterator'),
      FF_ITERATOR = '@@iterator',
      Iterators = require("npm:core-js@0.9.16/modules/$.shared")('iterators'),
      IteratorPrototype = {};
  setIterator(IteratorPrototype, $.that);
  function setIterator(O, value) {
    $.hide(O, SYMBOL_ITERATOR, value);
    if (FF_ITERATOR in [])
      $.hide(O, FF_ITERATOR, value);
  }
  module.exports = {
    BUGGY: 'keys' in [] && !('next' in [].keys()),
    Iterators: Iterators,
    step: function(done, value) {
      return {
        value: value,
        done: !!done
      };
    },
    is: function(it) {
      var O = Object(it),
          Symbol = $.g.Symbol;
      return (Symbol && Symbol.iterator || FF_ITERATOR) in O || SYMBOL_ITERATOR in O || $.has(Iterators, classof(O));
    },
    get: function(it) {
      var Symbol = $.g.Symbol,
          getIter;
      if (it != undefined) {
        getIter = it[Symbol && Symbol.iterator || FF_ITERATOR] || it[SYMBOL_ITERATOR] || Iterators[classof(it)];
      }
      assert($.isFunction(getIter), it, ' is not iterable!');
      return assertObject(getIter.call(it));
    },
    set: setIterator,
    create: function(Constructor, NAME, next, proto) {
      Constructor.prototype = $.create(proto || IteratorPrototype, {next: $.desc(1, next)});
      cof.set(Constructor, NAME + ' Iterator');
    }
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.16/modules/$.iter-define", ["npm:core-js@0.9.16/modules/$.def", "npm:core-js@0.9.16/modules/$.redef", "npm:core-js@0.9.16/modules/$", "npm:core-js@0.9.16/modules/$.cof", "npm:core-js@0.9.16/modules/$.iter", "npm:core-js@0.9.16/modules/$.wks"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $def = require("npm:core-js@0.9.16/modules/$.def"),
      $redef = require("npm:core-js@0.9.16/modules/$.redef"),
      $ = require("npm:core-js@0.9.16/modules/$"),
      cof = require("npm:core-js@0.9.16/modules/$.cof"),
      $iter = require("npm:core-js@0.9.16/modules/$.iter"),
      SYMBOL_ITERATOR = require("npm:core-js@0.9.16/modules/$.wks")('iterator'),
      FF_ITERATOR = '@@iterator',
      KEYS = 'keys',
      VALUES = 'values',
      Iterators = $iter.Iterators;
  module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCE) {
    $iter.create(Constructor, NAME, next);
    function createMethod(kind) {
      function $$(that) {
        return new Constructor(that, kind);
      }
      switch (kind) {
        case KEYS:
          return function keys() {
            return $$(this);
          };
        case VALUES:
          return function values() {
            return $$(this);
          };
      }
      return function entries() {
        return $$(this);
      };
    }
    var TAG = NAME + ' Iterator',
        proto = Base.prototype,
        _native = proto[SYMBOL_ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT],
        _default = _native || createMethod(DEFAULT),
        methods,
        key;
    if (_native) {
      var IteratorPrototype = $.getProto(_default.call(new Base));
      cof.set(IteratorPrototype, TAG, true);
      if ($.FW && $.has(proto, FF_ITERATOR))
        $iter.set(IteratorPrototype, $.that);
    }
    if ($.FW || FORCE)
      $iter.set(proto, _default);
    Iterators[NAME] = _default;
    Iterators[TAG] = $.that;
    if (DEFAULT) {
      methods = {
        keys: IS_SET ? _default : createMethod(KEYS),
        values: DEFAULT == VALUES ? _default : createMethod(VALUES),
        entries: DEFAULT != VALUES ? _default : createMethod('entries')
      };
      if (FORCE)
        for (key in methods) {
          if (!(key in proto))
            $redef(proto, key, methods[key]);
        }
      else
        $def($def.P + $def.F * $iter.BUGGY, NAME, methods);
    }
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.16/modules/es6.string.code-point-at", ["npm:core-js@0.9.16/modules/$.def", "npm:core-js@0.9.16/modules/$.string-at"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var $def = require("npm:core-js@0.9.16/modules/$.def"),
      $at = require("npm:core-js@0.9.16/modules/$.string-at")(false);
  $def($def.P, 'String', {codePointAt: function codePointAt(pos) {
      return $at(this, pos);
    }});
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.16/modules/es6.string.ends-with", ["npm:core-js@0.9.16/modules/$", "npm:core-js@0.9.16/modules/$.cof", "npm:core-js@0.9.16/modules/$.def", "npm:core-js@0.9.16/modules/$.throws"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var $ = require("npm:core-js@0.9.16/modules/$"),
      cof = require("npm:core-js@0.9.16/modules/$.cof"),
      $def = require("npm:core-js@0.9.16/modules/$.def"),
      toLength = $.toLength;
  $def($def.P + $def.F * !require("npm:core-js@0.9.16/modules/$.throws")(function() {
    'q'.endsWith(/./);
  }), 'String', {endsWith: function endsWith(searchString) {
      if (cof(searchString) == 'RegExp')
        throw TypeError();
      var that = String($.assertDefined(this)),
          endPosition = arguments[1],
          len = toLength(that.length),
          end = endPosition === undefined ? len : Math.min(toLength(endPosition), len);
      searchString += '';
      return that.slice(end - searchString.length, end) === searchString;
    }});
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.16/modules/es6.string.includes", ["npm:core-js@0.9.16/modules/$", "npm:core-js@0.9.16/modules/$.cof", "npm:core-js@0.9.16/modules/$.def"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var $ = require("npm:core-js@0.9.16/modules/$"),
      cof = require("npm:core-js@0.9.16/modules/$.cof"),
      $def = require("npm:core-js@0.9.16/modules/$.def");
  $def($def.P, 'String', {includes: function includes(searchString) {
      if (cof(searchString) == 'RegExp')
        throw TypeError();
      return !!~String($.assertDefined(this)).indexOf(searchString, arguments[1]);
    }});
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.16/modules/$.string-repeat", ["npm:core-js@0.9.16/modules/$"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var $ = require("npm:core-js@0.9.16/modules/$");
  module.exports = function repeat(count) {
    var str = String($.assertDefined(this)),
        res = '',
        n = $.toInteger(count);
    if (n < 0 || n == Infinity)
      throw RangeError("Count can't be negative");
    for (; n > 0; (n >>>= 1) && (str += str))
      if (n & 1)
        res += str;
    return res;
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.16/modules/es6.string.starts-with", ["npm:core-js@0.9.16/modules/$", "npm:core-js@0.9.16/modules/$.cof", "npm:core-js@0.9.16/modules/$.def", "npm:core-js@0.9.16/modules/$.throws"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var $ = require("npm:core-js@0.9.16/modules/$"),
      cof = require("npm:core-js@0.9.16/modules/$.cof"),
      $def = require("npm:core-js@0.9.16/modules/$.def");
  $def($def.P + $def.F * !require("npm:core-js@0.9.16/modules/$.throws")(function() {
    'q'.startsWith(/./);
  }), 'String', {startsWith: function startsWith(searchString) {
      if (cof(searchString) == 'RegExp')
        throw TypeError();
      var that = String($.assertDefined(this)),
          index = $.toLength(Math.min(arguments[1], that.length));
      searchString += '';
      return that.slice(index, index + searchString.length) === searchString;
    }});
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.16/modules/$.iter-call", ["npm:core-js@0.9.16/modules/$.assert"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var assertObject = require("npm:core-js@0.9.16/modules/$.assert").obj;
  function close(iterator) {
    var ret = iterator['return'];
    if (ret !== undefined)
      assertObject(ret.call(iterator));
  }
  function call(iterator, fn, value, entries) {
    try {
      return entries ? fn(assertObject(value)[0], value[1]) : fn(value);
    } catch (e) {
      close(iterator);
      throw e;
    }
  }
  call.close = close;
  module.exports = call;
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.16/modules/$.iter-detect", ["npm:core-js@0.9.16/modules/$.wks"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var SYMBOL_ITERATOR = require("npm:core-js@0.9.16/modules/$.wks")('iterator'),
      SAFE_CLOSING = false;
  try {
    var riter = [7][SYMBOL_ITERATOR]();
    riter['return'] = function() {
      SAFE_CLOSING = true;
    };
    Array.from(riter, function() {
      throw 2;
    });
  } catch (e) {}
  module.exports = function(exec) {
    if (!SAFE_CLOSING)
      return false;
    var safe = false;
    try {
      var arr = [7],
          iter = arr[SYMBOL_ITERATOR]();
      iter.next = function() {
        safe = true;
      };
      arr[SYMBOL_ITERATOR] = function() {
        return iter;
      };
      exec(arr);
    } catch (e) {}
    return safe;
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.16/modules/es6.array.of", ["npm:core-js@0.9.16/modules/$.def"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $def = require("npm:core-js@0.9.16/modules/$.def");
  $def($def.S, 'Array', {of: function of() {
      var index = 0,
          length = arguments.length,
          result = new (typeof this == 'function' ? this : Array)(length);
      while (length > index)
        result[index] = arguments[index++];
      result.length = length;
      return result;
    }});
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.16/modules/$.unscope", ["npm:core-js@0.9.16/modules/$.wks", "npm:core-js@0.9.16/modules/$"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var UNSCOPABLES = require("npm:core-js@0.9.16/modules/$.wks")('unscopables');
  if (!(UNSCOPABLES in []))
    require("npm:core-js@0.9.16/modules/$").hide(Array.prototype, UNSCOPABLES, {});
  module.exports = function(key) {
    [][UNSCOPABLES][key] = true;
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.16/modules/$.species", ["npm:core-js@0.9.16/modules/$", "npm:core-js@0.9.16/modules/$.wks"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@0.9.16/modules/$"),
      SPECIES = require("npm:core-js@0.9.16/modules/$.wks")('species');
  module.exports = function(C) {
    if ($.DESC && !(SPECIES in C))
      $.setDesc(C, SPECIES, {
        configurable: true,
        get: $.that
      });
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.16/modules/es6.array.copy-within", ["npm:core-js@0.9.16/modules/$", "npm:core-js@0.9.16/modules/$.def", "npm:core-js@0.9.16/modules/$.unscope"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var $ = require("npm:core-js@0.9.16/modules/$"),
      $def = require("npm:core-js@0.9.16/modules/$.def"),
      toIndex = $.toIndex;
  $def($def.P, 'Array', {copyWithin: function copyWithin(target, start) {
      var O = Object($.assertDefined(this)),
          len = $.toLength(O.length),
          to = toIndex(target, len),
          from = toIndex(start, len),
          end = arguments[2],
          fin = end === undefined ? len : toIndex(end, len),
          count = Math.min(fin - from, len - to),
          inc = 1;
      if (from < to && to < from + count) {
        inc = -1;
        from = from + count - 1;
        to = to + count - 1;
      }
      while (count-- > 0) {
        if (from in O)
          O[to] = O[from];
        else
          delete O[to];
        to += inc;
        from += inc;
      }
      return O;
    }});
  require("npm:core-js@0.9.16/modules/$.unscope")('copyWithin');
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.16/modules/es6.array.fill", ["npm:core-js@0.9.16/modules/$", "npm:core-js@0.9.16/modules/$.def", "npm:core-js@0.9.16/modules/$.unscope"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var $ = require("npm:core-js@0.9.16/modules/$"),
      $def = require("npm:core-js@0.9.16/modules/$.def"),
      toIndex = $.toIndex;
  $def($def.P, 'Array', {fill: function fill(value) {
      var O = Object($.assertDefined(this)),
          length = $.toLength(O.length),
          index = toIndex(arguments[1], length),
          end = arguments[2],
          endPos = end === undefined ? length : toIndex(end, length);
      while (endPos > index)
        O[index++] = value;
      return O;
    }});
  require("npm:core-js@0.9.16/modules/$.unscope")('fill');
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.16/modules/es6.array.find", ["npm:core-js@0.9.16/modules/$.def", "npm:core-js@0.9.16/modules/$.array-methods", "npm:core-js@0.9.16/modules/$.unscope"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var KEY = 'find',
      $def = require("npm:core-js@0.9.16/modules/$.def"),
      forced = true,
      $find = require("npm:core-js@0.9.16/modules/$.array-methods")(5);
  if (KEY in [])
    Array(1)[KEY](function() {
      forced = false;
    });
  $def($def.P + $def.F * forced, 'Array', {find: function find(callbackfn) {
      return $find(this, callbackfn, arguments[1]);
    }});
  require("npm:core-js@0.9.16/modules/$.unscope")(KEY);
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.16/modules/es6.array.find-index", ["npm:core-js@0.9.16/modules/$.def", "npm:core-js@0.9.16/modules/$.array-methods", "npm:core-js@0.9.16/modules/$.unscope"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var KEY = 'findIndex',
      $def = require("npm:core-js@0.9.16/modules/$.def"),
      forced = true,
      $find = require("npm:core-js@0.9.16/modules/$.array-methods")(6);
  if (KEY in [])
    Array(1)[KEY](function() {
      forced = false;
    });
  $def($def.P + $def.F * forced, 'Array', {findIndex: function findIndex(callbackfn) {
      return $find(this, callbackfn, arguments[1]);
    }});
  require("npm:core-js@0.9.16/modules/$.unscope")(KEY);
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.16/modules/es6.regexp", ["npm:core-js@0.9.16/modules/$", "npm:core-js@0.9.16/modules/$.cof", "npm:core-js@0.9.16/modules/$.redef", "npm:core-js@0.9.16/modules/$.replacer", "npm:core-js@0.9.16/modules/$.species"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@0.9.16/modules/$"),
      cof = require("npm:core-js@0.9.16/modules/$.cof"),
      $RegExp = $.g.RegExp,
      Base = $RegExp,
      proto = $RegExp.prototype,
      re = /a/g,
      CORRECT_NEW = new $RegExp(re) !== re,
      ALLOWS_RE_WITH_FLAGS = function() {
        try {
          return $RegExp(re, 'i') == '/a/i';
        } catch (e) {}
      }();
  if ($.FW && $.DESC) {
    if (!CORRECT_NEW || !ALLOWS_RE_WITH_FLAGS) {
      $RegExp = function RegExp(pattern, flags) {
        var patternIsRegExp = cof(pattern) == 'RegExp',
            flagsIsUndefined = flags === undefined;
        if (!(this instanceof $RegExp) && patternIsRegExp && flagsIsUndefined)
          return pattern;
        return CORRECT_NEW ? new Base(patternIsRegExp && !flagsIsUndefined ? pattern.source : pattern, flags) : new Base(patternIsRegExp ? pattern.source : pattern, patternIsRegExp && flagsIsUndefined ? pattern.flags : flags);
      };
      $.each.call($.getNames(Base), function(key) {
        key in $RegExp || $.setDesc($RegExp, key, {
          configurable: true,
          get: function() {
            return Base[key];
          },
          set: function(it) {
            Base[key] = it;
          }
        });
      });
      proto.constructor = $RegExp;
      $RegExp.prototype = proto;
      require("npm:core-js@0.9.16/modules/$.redef")($.g, 'RegExp', $RegExp);
    }
    if (/./g.flags != 'g')
      $.setDesc(proto, 'flags', {
        configurable: true,
        get: require("npm:core-js@0.9.16/modules/$.replacer")(/^.*\/(\w*)$/, '$1')
      });
  }
  require("npm:core-js@0.9.16/modules/$.species")($RegExp);
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.16/modules/$.for-of", ["npm:core-js@0.9.16/modules/$.ctx", "npm:core-js@0.9.16/modules/$.iter", "npm:core-js@0.9.16/modules/$.iter-call"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var ctx = require("npm:core-js@0.9.16/modules/$.ctx"),
      get = require("npm:core-js@0.9.16/modules/$.iter").get,
      call = require("npm:core-js@0.9.16/modules/$.iter-call");
  module.exports = function(iterable, entries, fn, that) {
    var iterator = get(iterable),
        f = ctx(fn, that, entries ? 2 : 1),
        step;
    while (!(step = iterator.next()).done) {
      if (call(iterator, f, step.value, entries) === false) {
        return call.close(iterator);
      }
    }
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:process@0.10.1/browser", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var process = module.exports = {};
  var queue = [];
  var draining = false;
  function drainQueue() {
    if (draining) {
      return ;
    }
    draining = true;
    var currentQueue;
    var len = queue.length;
    while (len) {
      currentQueue = queue;
      queue = [];
      var i = -1;
      while (++i < len) {
        currentQueue[i]();
      }
      len = queue.length;
    }
    draining = false;
  }
  process.nextTick = function(fun) {
    queue.push(fun);
    if (!draining) {
      setTimeout(drainQueue, 0);
    }
  };
  process.title = 'browser';
  process.browser = true;
  process.env = {};
  process.argv = [];
  process.version = '';
  process.versions = {};
  function noop() {}
  process.on = noop;
  process.addListener = noop;
  process.once = noop;
  process.off = noop;
  process.removeListener = noop;
  process.removeAllListeners = noop;
  process.emit = noop;
  process.binding = function(name) {
    throw new Error('process.binding is not supported');
  };
  process.cwd = function() {
    return '/';
  };
  process.chdir = function(dir) {
    throw new Error('process.chdir is not supported');
  };
  process.umask = function() {
    return 0;
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.16/modules/$.mix", ["npm:core-js@0.9.16/modules/$.redef"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $redef = require("npm:core-js@0.9.16/modules/$.redef");
  module.exports = function(target, src) {
    for (var key in src)
      $redef(target, key, src[key]);
    return target;
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.16/modules/$.collection-strong", ["npm:core-js@0.9.16/modules/$", "npm:core-js@0.9.16/modules/$.ctx", "npm:core-js@0.9.16/modules/$.uid", "npm:core-js@0.9.16/modules/$.assert", "npm:core-js@0.9.16/modules/$.for-of", "npm:core-js@0.9.16/modules/$.iter", "npm:core-js@0.9.16/modules/$.mix", "npm:core-js@0.9.16/modules/$.iter-define"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var $ = require("npm:core-js@0.9.16/modules/$"),
      ctx = require("npm:core-js@0.9.16/modules/$.ctx"),
      safe = require("npm:core-js@0.9.16/modules/$.uid").safe,
      assert = require("npm:core-js@0.9.16/modules/$.assert"),
      forOf = require("npm:core-js@0.9.16/modules/$.for-of"),
      step = require("npm:core-js@0.9.16/modules/$.iter").step,
      $has = $.has,
      set = $.set,
      isObject = $.isObject,
      hide = $.hide,
      isExtensible = Object.isExtensible || isObject,
      ID = safe('id'),
      O1 = safe('O1'),
      LAST = safe('last'),
      FIRST = safe('first'),
      ITER = safe('iter'),
      SIZE = $.DESC ? safe('size') : 'size',
      id = 0;
  function fastKey(it, create) {
    if (!isObject(it))
      return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
    if (!$has(it, ID)) {
      if (!isExtensible(it))
        return 'F';
      if (!create)
        return 'E';
      hide(it, ID, ++id);
    }
    return 'O' + it[ID];
  }
  function getEntry(that, key) {
    var index = fastKey(key),
        entry;
    if (index !== 'F')
      return that[O1][index];
    for (entry = that[FIRST]; entry; entry = entry.n) {
      if (entry.k == key)
        return entry;
    }
  }
  module.exports = {
    getConstructor: function(wrapper, NAME, IS_MAP, ADDER) {
      var C = wrapper(function(that, iterable) {
        assert.inst(that, C, NAME);
        set(that, O1, $.create(null));
        set(that, SIZE, 0);
        set(that, LAST, undefined);
        set(that, FIRST, undefined);
        if (iterable != undefined)
          forOf(iterable, IS_MAP, that[ADDER], that);
      });
      require("npm:core-js@0.9.16/modules/$.mix")(C.prototype, {
        clear: function clear() {
          for (var that = this,
              data = that[O1],
              entry = that[FIRST]; entry; entry = entry.n) {
            entry.r = true;
            if (entry.p)
              entry.p = entry.p.n = undefined;
            delete data[entry.i];
          }
          that[FIRST] = that[LAST] = undefined;
          that[SIZE] = 0;
        },
        'delete': function(key) {
          var that = this,
              entry = getEntry(that, key);
          if (entry) {
            var next = entry.n,
                prev = entry.p;
            delete that[O1][entry.i];
            entry.r = true;
            if (prev)
              prev.n = next;
            if (next)
              next.p = prev;
            if (that[FIRST] == entry)
              that[FIRST] = next;
            if (that[LAST] == entry)
              that[LAST] = prev;
            that[SIZE]--;
          }
          return !!entry;
        },
        forEach: function forEach(callbackfn) {
          var f = ctx(callbackfn, arguments[1], 3),
              entry;
          while (entry = entry ? entry.n : this[FIRST]) {
            f(entry.v, entry.k, this);
            while (entry && entry.r)
              entry = entry.p;
          }
        },
        has: function has(key) {
          return !!getEntry(this, key);
        }
      });
      if ($.DESC)
        $.setDesc(C.prototype, 'size', {get: function() {
            return assert.def(this[SIZE]);
          }});
      return C;
    },
    def: function(that, key, value) {
      var entry = getEntry(that, key),
          prev,
          index;
      if (entry) {
        entry.v = value;
      } else {
        that[LAST] = entry = {
          i: index = fastKey(key, true),
          k: key,
          v: value,
          p: prev = that[LAST],
          n: undefined,
          r: false
        };
        if (!that[FIRST])
          that[FIRST] = entry;
        if (prev)
          prev.n = entry;
        that[SIZE]++;
        if (index !== 'F')
          that[O1][index] = entry;
      }
      return that;
    },
    getEntry: getEntry,
    setIter: function(C, NAME, IS_MAP) {
      require("npm:core-js@0.9.16/modules/$.iter-define")(C, NAME, function(iterated, kind) {
        set(this, ITER, {
          o: iterated,
          k: kind
        });
      }, function() {
        var iter = this[ITER],
            kind = iter.k,
            entry = iter.l;
        while (entry && entry.r)
          entry = entry.p;
        if (!iter.o || !(iter.l = entry = entry ? entry.n : iter.o[FIRST])) {
          iter.o = undefined;
          return step(1);
        }
        if (kind == 'keys')
          return step(0, entry.k);
        if (kind == 'values')
          return step(0, entry.v);
        return step(0, [entry.k, entry.v]);
      }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);
    }
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.16/modules/$.collection", ["npm:core-js@0.9.16/modules/$", "npm:core-js@0.9.16/modules/$.def", "npm:core-js@0.9.16/modules/$.iter", "npm:core-js@0.9.16/modules/$.for-of", "npm:core-js@0.9.16/modules/$.species", "npm:core-js@0.9.16/modules/$.assert", "npm:core-js@0.9.16/modules/$.redef", "npm:core-js@0.9.16/modules/$.mix", "npm:core-js@0.9.16/modules/$.iter-detect", "npm:core-js@0.9.16/modules/$.cof"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var $ = require("npm:core-js@0.9.16/modules/$"),
      $def = require("npm:core-js@0.9.16/modules/$.def"),
      BUGGY = require("npm:core-js@0.9.16/modules/$.iter").BUGGY,
      forOf = require("npm:core-js@0.9.16/modules/$.for-of"),
      species = require("npm:core-js@0.9.16/modules/$.species"),
      assertInstance = require("npm:core-js@0.9.16/modules/$.assert").inst;
  module.exports = function(NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
    var Base = $.g[NAME],
        C = Base,
        ADDER = IS_MAP ? 'set' : 'add',
        proto = C && C.prototype,
        O = {};
    function fixMethod(KEY) {
      var fn = proto[KEY];
      require("npm:core-js@0.9.16/modules/$.redef")(proto, KEY, KEY == 'delete' ? function(a) {
        return fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'has' ? function has(a) {
        return fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'get' ? function get(a) {
        return fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'add' ? function add(a) {
        fn.call(this, a === 0 ? 0 : a);
        return this;
      } : function set(a, b) {
        fn.call(this, a === 0 ? 0 : a, b);
        return this;
      });
    }
    if (!$.isFunction(C) || !(IS_WEAK || !BUGGY && proto.forEach && proto.entries)) {
      C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
      require("npm:core-js@0.9.16/modules/$.mix")(C.prototype, methods);
    } else {
      var inst = new C,
          chain = inst[ADDER](IS_WEAK ? {} : -0, 1),
          buggyZero;
      if (!require("npm:core-js@0.9.16/modules/$.iter-detect")(function(iter) {
        new C(iter);
      })) {
        C = wrapper(function(target, iterable) {
          assertInstance(target, C, NAME);
          var that = new Base;
          if (iterable != undefined)
            forOf(iterable, IS_MAP, that[ADDER], that);
          return that;
        });
        C.prototype = proto;
        proto.constructor = C;
      }
      IS_WEAK || inst.forEach(function(val, key) {
        buggyZero = 1 / key === -Infinity;
      });
      if (buggyZero) {
        fixMethod('delete');
        fixMethod('has');
        IS_MAP && fixMethod('get');
      }
      if (buggyZero || chain !== inst)
        fixMethod(ADDER);
    }
    require("npm:core-js@0.9.16/modules/$.cof").set(C, NAME);
    O[NAME] = C;
    $def($def.G + $def.W + $def.F * (C != Base), O);
    species(C);
    species($.core[NAME]);
    if (!IS_WEAK)
      common.setIter(C, NAME, IS_MAP);
    return C;
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.16/modules/es6.set", ["npm:core-js@0.9.16/modules/$.collection-strong", "npm:core-js@0.9.16/modules/$.collection"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var strong = require("npm:core-js@0.9.16/modules/$.collection-strong");
  require("npm:core-js@0.9.16/modules/$.collection")('Set', function(get) {
    return function Set() {
      return get(this, arguments[0]);
    };
  }, {add: function add(value) {
      return strong.def(this, value = value === 0 ? 0 : value, value);
    }}, strong);
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.16/modules/$.collection-weak", ["npm:core-js@0.9.16/modules/$", "npm:core-js@0.9.16/modules/$.uid", "npm:core-js@0.9.16/modules/$.assert", "npm:core-js@0.9.16/modules/$.for-of", "npm:core-js@0.9.16/modules/$.array-methods", "npm:core-js@0.9.16/modules/$.mix"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var $ = require("npm:core-js@0.9.16/modules/$"),
      safe = require("npm:core-js@0.9.16/modules/$.uid").safe,
      assert = require("npm:core-js@0.9.16/modules/$.assert"),
      forOf = require("npm:core-js@0.9.16/modules/$.for-of"),
      $has = $.has,
      isObject = $.isObject,
      hide = $.hide,
      isExtensible = Object.isExtensible || isObject,
      id = 0,
      ID = safe('id'),
      WEAK = safe('weak'),
      LEAK = safe('leak'),
      method = require("npm:core-js@0.9.16/modules/$.array-methods"),
      find = method(5),
      findIndex = method(6);
  function findFrozen(store, key) {
    return find(store.array, function(it) {
      return it[0] === key;
    });
  }
  function leakStore(that) {
    return that[LEAK] || hide(that, LEAK, {
      array: [],
      get: function(key) {
        var entry = findFrozen(this, key);
        if (entry)
          return entry[1];
      },
      has: function(key) {
        return !!findFrozen(this, key);
      },
      set: function(key, value) {
        var entry = findFrozen(this, key);
        if (entry)
          entry[1] = value;
        else
          this.array.push([key, value]);
      },
      'delete': function(key) {
        var index = findIndex(this.array, function(it) {
          return it[0] === key;
        });
        if (~index)
          this.array.splice(index, 1);
        return !!~index;
      }
    })[LEAK];
  }
  module.exports = {
    getConstructor: function(wrapper, NAME, IS_MAP, ADDER) {
      var C = wrapper(function(that, iterable) {
        $.set(assert.inst(that, C, NAME), ID, id++);
        if (iterable != undefined)
          forOf(iterable, IS_MAP, that[ADDER], that);
      });
      require("npm:core-js@0.9.16/modules/$.mix")(C.prototype, {
        'delete': function(key) {
          if (!isObject(key))
            return false;
          if (!isExtensible(key))
            return leakStore(this)['delete'](key);
          return $has(key, WEAK) && $has(key[WEAK], this[ID]) && delete key[WEAK][this[ID]];
        },
        has: function has(key) {
          if (!isObject(key))
            return false;
          if (!isExtensible(key))
            return leakStore(this).has(key);
          return $has(key, WEAK) && $has(key[WEAK], this[ID]);
        }
      });
      return C;
    },
    def: function(that, key, value) {
      if (!isExtensible(assert.obj(key))) {
        leakStore(that).set(key, value);
      } else {
        $has(key, WEAK) || hide(key, WEAK, {});
        key[WEAK][that[ID]] = value;
      }
      return that;
    },
    leakStore: leakStore,
    WEAK: WEAK,
    ID: ID
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.16/modules/es6.weak-set", ["npm:core-js@0.9.16/modules/$.collection-weak", "npm:core-js@0.9.16/modules/$.collection"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var weak = require("npm:core-js@0.9.16/modules/$.collection-weak");
  require("npm:core-js@0.9.16/modules/$.collection")('WeakSet', function(get) {
    return function WeakSet() {
      return get(this, arguments[0]);
    };
  }, {add: function add(value) {
      return weak.def(this, value, true);
    }}, weak, false, true);
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.16/modules/$.own-keys", ["npm:core-js@0.9.16/modules/$", "npm:core-js@0.9.16/modules/$.assert"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@0.9.16/modules/$"),
      assertObject = require("npm:core-js@0.9.16/modules/$.assert").obj;
  module.exports = function ownKeys(it) {
    assertObject(it);
    var keys = $.getNames(it),
        getSymbols = $.getSymbols;
    return getSymbols ? keys.concat(getSymbols(it)) : keys;
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.16/modules/es7.array.includes", ["npm:core-js@0.9.16/modules/$.def", "npm:core-js@0.9.16/modules/$.array-includes", "npm:core-js@0.9.16/modules/$.unscope"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var $def = require("npm:core-js@0.9.16/modules/$.def"),
      $includes = require("npm:core-js@0.9.16/modules/$.array-includes")(true);
  $def($def.P, 'Array', {includes: function includes(el) {
      return $includes(this, el, arguments[1]);
    }});
  require("npm:core-js@0.9.16/modules/$.unscope")('includes');
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.16/modules/es7.string.at", ["npm:core-js@0.9.16/modules/$.def", "npm:core-js@0.9.16/modules/$.string-at"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var $def = require("npm:core-js@0.9.16/modules/$.def"),
      $at = require("npm:core-js@0.9.16/modules/$.string-at")(true);
  $def($def.P, 'String', {at: function at(pos) {
      return $at(this, pos);
    }});
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.16/modules/$.string-pad", ["npm:core-js@0.9.16/modules/$", "npm:core-js@0.9.16/modules/$.string-repeat"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@0.9.16/modules/$"),
      repeat = require("npm:core-js@0.9.16/modules/$.string-repeat");
  module.exports = function(that, minLength, fillChar, left) {
    var S = String($.assertDefined(that));
    if (minLength === undefined)
      return S;
    var intMinLength = $.toInteger(minLength);
    var fillLen = intMinLength - S.length;
    if (fillLen < 0 || fillLen === Infinity) {
      throw new RangeError('Cannot satisfy string length ' + minLength + ' for string: ' + S);
    }
    var sFillStr = fillChar === undefined ? ' ' : String(fillChar);
    var sFillVal = repeat.call(sFillStr, Math.ceil(fillLen / sFillStr.length));
    if (sFillVal.length > fillLen)
      sFillVal = left ? sFillVal.slice(sFillVal.length - fillLen) : sFillVal.slice(0, fillLen);
    return left ? sFillVal.concat(S) : S.concat(sFillVal);
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.16/modules/es7.string.rpad", ["npm:core-js@0.9.16/modules/$.def", "npm:core-js@0.9.16/modules/$.string-pad"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var $def = require("npm:core-js@0.9.16/modules/$.def"),
      $pad = require("npm:core-js@0.9.16/modules/$.string-pad");
  $def($def.P, 'String', {rpad: function rpad(n) {
      return $pad(this, n, arguments[1], false);
    }});
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.16/modules/es7.regexp.escape", ["npm:core-js@0.9.16/modules/$.def", "npm:core-js@0.9.16/modules/$.replacer"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $def = require("npm:core-js@0.9.16/modules/$.def");
  $def($def.S, 'RegExp', {escape: require("npm:core-js@0.9.16/modules/$.replacer")(/([\\\-[\]{}()*+?.,^$|])/g, '\\$1', true)});
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.16/modules/es7.object.get-own-property-descriptors", ["npm:core-js@0.9.16/modules/$", "npm:core-js@0.9.16/modules/$.def", "npm:core-js@0.9.16/modules/$.own-keys"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@0.9.16/modules/$"),
      $def = require("npm:core-js@0.9.16/modules/$.def"),
      ownKeys = require("npm:core-js@0.9.16/modules/$.own-keys");
  $def($def.S, 'Object', {getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
      var O = $.toObject(object),
          result = {};
      $.each.call(ownKeys(O), function(key) {
        $.setDesc(result, key, $.desc(0, $.getDesc(O, key)));
      });
      return result;
    }});
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.16/modules/es7.object.to-array", ["npm:core-js@0.9.16/modules/$", "npm:core-js@0.9.16/modules/$.def"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@0.9.16/modules/$"),
      $def = require("npm:core-js@0.9.16/modules/$.def");
  function createObjectToArray(isEntries) {
    return function(object) {
      var O = $.toObject(object),
          keys = $.getKeys(O),
          length = keys.length,
          i = 0,
          result = Array(length),
          key;
      if (isEntries)
        while (length > i)
          result[i] = [key = keys[i++], O[key]];
      else
        while (length > i)
          result[i] = O[keys[i++]];
      return result;
    };
  }
  $def($def.S, 'Object', {
    values: createObjectToArray(false),
    entries: createObjectToArray(true)
  });
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.16/modules/$.collection-to-json", ["npm:core-js@0.9.16/modules/$.def", "npm:core-js@0.9.16/modules/$.for-of"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $def = require("npm:core-js@0.9.16/modules/$.def"),
      forOf = require("npm:core-js@0.9.16/modules/$.for-of");
  module.exports = function(NAME) {
    $def($def.P, NAME, {toJSON: function toJSON() {
        var arr = [];
        forOf(this, false, arr.push, arr);
        return arr;
      }});
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.16/modules/es7.set.to-json", ["npm:core-js@0.9.16/modules/$.collection-to-json"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  require("npm:core-js@0.9.16/modules/$.collection-to-json")('Set');
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.16/modules/js.array.statics", ["npm:core-js@0.9.16/modules/$", "npm:core-js@0.9.16/modules/$.def", "npm:core-js@0.9.16/modules/$.ctx"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@0.9.16/modules/$"),
      $def = require("npm:core-js@0.9.16/modules/$.def"),
      $Array = $.core.Array || Array,
      statics = {};
  function setStatics(keys, length) {
    $.each.call(keys.split(','), function(key) {
      if (length == undefined && key in $Array)
        statics[key] = $Array[key];
      else if (key in [])
        statics[key] = require("npm:core-js@0.9.16/modules/$.ctx")(Function.call, [][key], length);
    });
  }
  setStatics('pop,reverse,shift,keys,values,entries', 1);
  setStatics('indexOf,every,some,forEach,map,filter,find,findIndex,includes', 3);
  setStatics('join,slice,concat,push,splice,unshift,sort,lastIndexOf,' + 'reduce,reduceRight,copyWithin,fill,turn');
  $def($def.S, 'Array', statics);
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.16/modules/$.partial", ["npm:core-js@0.9.16/modules/$", "npm:core-js@0.9.16/modules/$.invoke", "npm:core-js@0.9.16/modules/$.assert"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var $ = require("npm:core-js@0.9.16/modules/$"),
      invoke = require("npm:core-js@0.9.16/modules/$.invoke"),
      assertFunction = require("npm:core-js@0.9.16/modules/$.assert").fn;
  module.exports = function() {
    var fn = assertFunction(this),
        length = arguments.length,
        pargs = Array(length),
        i = 0,
        _ = $.path._,
        holder = false;
    while (length > i)
      if ((pargs[i] = arguments[i++]) === _)
        holder = true;
    return function() {
      var that = this,
          _length = arguments.length,
          j = 0,
          k = 0,
          args;
      if (!holder && !_length)
        return invoke(fn, pargs, that);
      args = pargs.slice();
      if (holder)
        for (; length > j; j++)
          if (args[j] === _)
            args[j] = arguments[k++];
      while (_length > k)
        args.push(arguments[k++]);
      return invoke(fn, args, that);
    };
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.16/modules/web.immediate", ["npm:core-js@0.9.16/modules/$.def", "npm:core-js@0.9.16/modules/$.task"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $def = require("npm:core-js@0.9.16/modules/$.def"),
      $task = require("npm:core-js@0.9.16/modules/$.task");
  $def($def.G + $def.B, {
    setImmediate: $task.set,
    clearImmediate: $task.clear
  });
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.16/modules/web.dom.iterable", ["npm:core-js@0.9.16/modules/es6.array.iterator", "npm:core-js@0.9.16/modules/$", "npm:core-js@0.9.16/modules/$.iter", "npm:core-js@0.9.16/modules/$.wks"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  require("npm:core-js@0.9.16/modules/es6.array.iterator");
  var $ = require("npm:core-js@0.9.16/modules/$"),
      Iterators = require("npm:core-js@0.9.16/modules/$.iter").Iterators,
      ITERATOR = require("npm:core-js@0.9.16/modules/$.wks")('iterator'),
      ArrayValues = Iterators.Array,
      NL = $.g.NodeList,
      HTC = $.g.HTMLCollection,
      NLProto = NL && NL.prototype,
      HTCProto = HTC && HTC.prototype;
  if ($.FW) {
    if (NL && !(ITERATOR in NLProto))
      $.hide(NLProto, ITERATOR, ArrayValues);
    if (HTC && !(ITERATOR in HTCProto))
      $.hide(HTCProto, ITERATOR, ArrayValues);
  }
  Iterators.NodeList = Iterators.HTMLCollection = ArrayValues;
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.16/modules/core.dict", ["npm:core-js@0.9.16/modules/$", "npm:core-js@0.9.16/modules/$.ctx", "npm:core-js@0.9.16/modules/$.def", "npm:core-js@0.9.16/modules/$.assign", "npm:core-js@0.9.16/modules/$.keyof", "npm:core-js@0.9.16/modules/$.uid", "npm:core-js@0.9.16/modules/$.assert", "npm:core-js@0.9.16/modules/$.iter", "npm:core-js@0.9.16/modules/$.for-of"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@0.9.16/modules/$"),
      ctx = require("npm:core-js@0.9.16/modules/$.ctx"),
      $def = require("npm:core-js@0.9.16/modules/$.def"),
      assign = require("npm:core-js@0.9.16/modules/$.assign"),
      keyOf = require("npm:core-js@0.9.16/modules/$.keyof"),
      ITER = require("npm:core-js@0.9.16/modules/$.uid").safe('iter'),
      assert = require("npm:core-js@0.9.16/modules/$.assert"),
      $iter = require("npm:core-js@0.9.16/modules/$.iter"),
      forOf = require("npm:core-js@0.9.16/modules/$.for-of"),
      step = $iter.step,
      getKeys = $.getKeys,
      toObject = $.toObject,
      has = $.has;
  function Dict(iterable) {
    var dict = $.create(null);
    if (iterable != undefined) {
      if ($iter.is(iterable)) {
        forOf(iterable, true, function(key, value) {
          dict[key] = value;
        });
      } else
        assign(dict, iterable);
    }
    return dict;
  }
  Dict.prototype = null;
  function DictIterator(iterated, kind) {
    $.set(this, ITER, {
      o: toObject(iterated),
      a: getKeys(iterated),
      i: 0,
      k: kind
    });
  }
  $iter.create(DictIterator, 'Dict', function() {
    var iter = this[ITER],
        O = iter.o,
        keys = iter.a,
        kind = iter.k,
        key;
    do {
      if (iter.i >= keys.length) {
        iter.o = undefined;
        return step(1);
      }
    } while (!has(O, key = keys[iter.i++]));
    if (kind == 'keys')
      return step(0, key);
    if (kind == 'values')
      return step(0, O[key]);
    return step(0, [key, O[key]]);
  });
  function createDictIter(kind) {
    return function(it) {
      return new DictIterator(it, kind);
    };
  }
  function generic(A, B) {
    return typeof A == 'function' ? A : B;
  }
  function createDictMethod(TYPE) {
    var IS_MAP = TYPE == 1,
        IS_EVERY = TYPE == 4;
    return function(object, callbackfn, that) {
      var f = ctx(callbackfn, that, 3),
          O = toObject(object),
          result = IS_MAP || TYPE == 7 || TYPE == 2 ? new (generic(this, Dict)) : undefined,
          key,
          val,
          res;
      for (key in O)
        if (has(O, key)) {
          val = O[key];
          res = f(val, key, object);
          if (TYPE) {
            if (IS_MAP)
              result[key] = res;
            else if (res)
              switch (TYPE) {
                case 2:
                  result[key] = val;
                  break;
                case 3:
                  return true;
                case 5:
                  return val;
                case 6:
                  return key;
                case 7:
                  result[res[0]] = res[1];
              }
            else if (IS_EVERY)
              return false;
          }
        }
      return TYPE == 3 || IS_EVERY ? IS_EVERY : result;
    };
  }
  function createDictReduce(IS_TURN) {
    return function(object, mapfn, init) {
      assert.fn(mapfn);
      var O = toObject(object),
          keys = getKeys(O),
          length = keys.length,
          i = 0,
          memo,
          key,
          result;
      if (IS_TURN) {
        memo = init == undefined ? new (generic(this, Dict)) : Object(init);
      } else if (arguments.length < 3) {
        assert(length, 'Reduce of empty object with no initial value');
        memo = O[keys[i++]];
      } else
        memo = Object(init);
      while (length > i)
        if (has(O, key = keys[i++])) {
          result = mapfn(memo, O[key], key, object);
          if (IS_TURN) {
            if (result === false)
              break;
          } else
            memo = result;
        }
      return memo;
    };
  }
  var findKey = createDictMethod(6);
  $def($def.G + $def.F, {Dict: Dict});
  $def($def.S, 'Dict', {
    keys: createDictIter('keys'),
    values: createDictIter('values'),
    entries: createDictIter('entries'),
    forEach: createDictMethod(0),
    map: createDictMethod(1),
    filter: createDictMethod(2),
    some: createDictMethod(3),
    every: createDictMethod(4),
    find: createDictMethod(5),
    findKey: findKey,
    mapPairs: createDictMethod(7),
    reduce: createDictReduce(false),
    turn: createDictReduce(true),
    keyOf: keyOf,
    includes: function(object, el) {
      return (el == el ? keyOf(object, el) : findKey(object, function(it) {
        return it != it;
      })) !== undefined;
    },
    has: has,
    get: function(object, key) {
      if (has(object, key))
        return object[key];
    },
    set: $.def,
    isDict: function(it) {
      return $.isObject(it) && $.getProto(it) === Dict.prototype;
    }
  });
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.16/modules/core.iter-helpers", ["npm:core-js@0.9.16/modules/$", "npm:core-js@0.9.16/modules/$.iter"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var core = require("npm:core-js@0.9.16/modules/$").core,
      $iter = require("npm:core-js@0.9.16/modules/$.iter");
  core.isIterable = $iter.is;
  core.getIterator = $iter.get;
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.16/modules/core.$for", ["npm:core-js@0.9.16/modules/$", "npm:core-js@0.9.16/modules/$.ctx", "npm:core-js@0.9.16/modules/$.uid", "npm:core-js@0.9.16/modules/$.def", "npm:core-js@0.9.16/modules/$.iter", "npm:core-js@0.9.16/modules/$.for-of", "npm:core-js@0.9.16/modules/$.iter-call", "npm:core-js@0.9.16/modules/$.mix"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var $ = require("npm:core-js@0.9.16/modules/$"),
      ctx = require("npm:core-js@0.9.16/modules/$.ctx"),
      safe = require("npm:core-js@0.9.16/modules/$.uid").safe,
      $def = require("npm:core-js@0.9.16/modules/$.def"),
      $iter = require("npm:core-js@0.9.16/modules/$.iter"),
      forOf = require("npm:core-js@0.9.16/modules/$.for-of"),
      ENTRIES = safe('entries'),
      FN = safe('fn'),
      ITER = safe('iter'),
      call = require("npm:core-js@0.9.16/modules/$.iter-call"),
      getIterator = $iter.get,
      setIterator = $iter.set,
      createIterator = $iter.create;
  function $for(iterable, entries) {
    if (!(this instanceof $for))
      return new $for(iterable, entries);
    this[ITER] = getIterator(iterable);
    this[ENTRIES] = !!entries;
  }
  createIterator($for, 'Wrapper', function() {
    return this[ITER].next();
  });
  var $forProto = $for.prototype;
  setIterator($forProto, function() {
    return this[ITER];
  });
  function createChainIterator(next) {
    function Iterator(iter, fn, that) {
      this[ITER] = getIterator(iter);
      this[ENTRIES] = iter[ENTRIES];
      this[FN] = ctx(fn, that, iter[ENTRIES] ? 2 : 1);
    }
    createIterator(Iterator, 'Chain', next, $forProto);
    setIterator(Iterator.prototype, $.that);
    return Iterator;
  }
  var MapIter = createChainIterator(function() {
    var step = this[ITER].next();
    return step.done ? step : $iter.step(0, call(this[ITER], this[FN], step.value, this[ENTRIES]));
  });
  var FilterIter = createChainIterator(function() {
    for (; ; ) {
      var step = this[ITER].next();
      if (step.done || call(this[ITER], this[FN], step.value, this[ENTRIES]))
        return step;
    }
  });
  require("npm:core-js@0.9.16/modules/$.mix")($forProto, {
    of: function(fn, that) {
      forOf(this, this[ENTRIES], fn, that);
    },
    array: function(fn, that) {
      var result = [];
      forOf(fn != undefined ? this.map(fn, that) : this, false, result.push, result);
      return result;
    },
    filter: function(fn, that) {
      return new FilterIter(this, fn, that);
    },
    map: function(fn, that) {
      return new MapIter(this, fn, that);
    }
  });
  $for.isIterable = $iter.is;
  $for.getIterator = getIterator;
  $def($def.G + $def.F, {$for: $for});
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.16/modules/core.delay", ["npm:core-js@0.9.16/modules/$", "npm:core-js@0.9.16/modules/$.def", "npm:core-js@0.9.16/modules/$.partial"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@0.9.16/modules/$"),
      $def = require("npm:core-js@0.9.16/modules/$.def"),
      partial = require("npm:core-js@0.9.16/modules/$.partial");
  $def($def.G + $def.F, {delay: function(time) {
      return new ($.core.Promise || $.g.Promise)(function(resolve) {
        setTimeout(partial.call(resolve, true), time);
      });
    }});
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.16/modules/core.function.part", ["npm:core-js@0.9.16/modules/$", "npm:core-js@0.9.16/modules/$.def", "npm:core-js@0.9.16/modules/$.partial"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var $ = require("npm:core-js@0.9.16/modules/$"),
      $def = require("npm:core-js@0.9.16/modules/$.def");
  $.core._ = $.path._ = $.path._ || {};
  $def($def.P + $def.F, 'Function', {part: require("npm:core-js@0.9.16/modules/$.partial")});
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.16/modules/core.object", ["npm:core-js@0.9.16/modules/$", "npm:core-js@0.9.16/modules/$.def", "npm:core-js@0.9.16/modules/$.own-keys", "npm:core-js@0.9.16/modules/$.cof"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@0.9.16/modules/$"),
      $def = require("npm:core-js@0.9.16/modules/$.def"),
      ownKeys = require("npm:core-js@0.9.16/modules/$.own-keys");
  function define(target, mixin) {
    var keys = ownKeys($.toObject(mixin)),
        length = keys.length,
        i = 0,
        key;
    while (length > i)
      $.setDesc(target, key = keys[i++], $.getDesc(mixin, key));
    return target;
  }
  $def($def.S + $def.F, 'Object', {
    isObject: $.isObject,
    classof: require("npm:core-js@0.9.16/modules/$.cof").classof,
    define: define,
    make: function(proto, mixin) {
      return define($.create(proto), mixin);
    }
  });
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.16/modules/core.array.turn", ["npm:core-js@0.9.16/modules/$", "npm:core-js@0.9.16/modules/$.def", "npm:core-js@0.9.16/modules/$.assert", "npm:core-js@0.9.16/modules/$.unscope"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var $ = require("npm:core-js@0.9.16/modules/$"),
      $def = require("npm:core-js@0.9.16/modules/$.def"),
      assertFunction = require("npm:core-js@0.9.16/modules/$.assert").fn;
  $def($def.P + $def.F, 'Array', {turn: function(fn, target) {
      assertFunction(fn);
      var memo = target == undefined ? [] : Object(target),
          O = $.ES5Object(this),
          length = $.toLength(O.length),
          index = 0;
      while (length > index)
        if (fn(memo, O[index], index++, this) === false)
          break;
      return memo;
    }});
  require("npm:core-js@0.9.16/modules/$.unscope")('turn');
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.16/modules/core.number.iterator", ["npm:core-js@0.9.16/modules/$", "npm:core-js@0.9.16/modules/$.uid", "npm:core-js@0.9.16/modules/$.iter-define"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var $ = require("npm:core-js@0.9.16/modules/$"),
      ITER = require("npm:core-js@0.9.16/modules/$.uid").safe('iter');
  require("npm:core-js@0.9.16/modules/$.iter-define")(Number, 'Number', function(iterated) {
    $.set(this, ITER, {
      l: $.toLength(iterated),
      i: 0
    });
  }, function() {
    var iter = this[ITER],
        i = iter.i++,
        done = i >= iter.l;
    return {
      done: done,
      value: done ? undefined : i
    };
  });
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.16/modules/core.number.math", ["npm:core-js@0.9.16/modules/$", "npm:core-js@0.9.16/modules/$.def", "npm:core-js@0.9.16/modules/$.invoke"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var $ = require("npm:core-js@0.9.16/modules/$"),
      $def = require("npm:core-js@0.9.16/modules/$.def"),
      invoke = require("npm:core-js@0.9.16/modules/$.invoke"),
      methods = {};
  methods.random = function(lim) {
    var a = +this,
        b = lim == undefined ? 0 : +lim,
        m = Math.min(a, b);
    return Math.random() * (Math.max(a, b) - m) + m;
  };
  if ($.FW)
    $.each.call(('round,floor,ceil,abs,sin,asin,cos,acos,tan,atan,exp,sqrt,max,min,pow,atan2,' + 'acosh,asinh,atanh,cbrt,clz32,cosh,expm1,hypot,imul,log1p,log10,log2,sign,sinh,tanh,trunc').split(','), function(key) {
      var fn = Math[key];
      if (fn)
        methods[key] = function() {
          var args = [+this],
              i = 0;
          while (arguments.length > i)
            args.push(arguments[i++]);
          return invoke(fn, args);
        };
    });
  $def($def.P + $def.F, 'Number', methods);
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.16/modules/core.string.escape-html", ["npm:core-js@0.9.16/modules/$.def", "npm:core-js@0.9.16/modules/$.replacer"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $def = require("npm:core-js@0.9.16/modules/$.def"),
      replacer = require("npm:core-js@0.9.16/modules/$.replacer");
  var escapeHTMLDict = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&apos;'
  },
      unescapeHTMLDict = {},
      key;
  for (key in escapeHTMLDict)
    unescapeHTMLDict[escapeHTMLDict[key]] = key;
  $def($def.P + $def.F, 'String', {
    escapeHTML: replacer(/[&<>"']/g, escapeHTMLDict),
    unescapeHTML: replacer(/&(?:amp|lt|gt|quot|apos);/g, unescapeHTMLDict)
  });
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.16/modules/core.date", ["npm:core-js@0.9.16/modules/$", "npm:core-js@0.9.16/modules/$.def"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@0.9.16/modules/$"),
      $def = require("npm:core-js@0.9.16/modules/$.def"),
      core = $.core,
      formatRegExp = /\b\w\w?\b/g,
      flexioRegExp = /:(.*)\|(.*)$/,
      locales = {},
      current = 'en',
      SECONDS = 'Seconds',
      MINUTES = 'Minutes',
      HOURS = 'Hours',
      DATE = 'Date',
      MONTH = 'Month',
      YEAR = 'FullYear';
  function lz(num) {
    return num > 9 ? num : '0' + num;
  }
  function createFormat(prefix) {
    return function(template, locale) {
      var that = this,
          dict = locales[$.has(locales, locale) ? locale : current];
      function get(unit) {
        return that[prefix + unit]();
      }
      return String(template).replace(formatRegExp, function(part) {
        switch (part) {
          case 's':
            return get(SECONDS);
          case 'ss':
            return lz(get(SECONDS));
          case 'm':
            return get(MINUTES);
          case 'mm':
            return lz(get(MINUTES));
          case 'h':
            return get(HOURS);
          case 'hh':
            return lz(get(HOURS));
          case 'D':
            return get(DATE);
          case 'DD':
            return lz(get(DATE));
          case 'W':
            return dict[0][get('Day')];
          case 'N':
            return get(MONTH) + 1;
          case 'NN':
            return lz(get(MONTH) + 1);
          case 'M':
            return dict[2][get(MONTH)];
          case 'MM':
            return dict[1][get(MONTH)];
          case 'Y':
            return get(YEAR);
          case 'YY':
            return lz(get(YEAR) % 100);
        }
        return part;
      });
    };
  }
  function addLocale(lang, locale) {
    function split(index) {
      var result = [];
      $.each.call(locale.months.split(','), function(it) {
        result.push(it.replace(flexioRegExp, '$' + index));
      });
      return result;
    }
    locales[lang] = [locale.weekdays.split(','), split(1), split(2)];
    return core;
  }
  $def($def.P + $def.F, DATE, {
    format: createFormat('get'),
    formatUTC: createFormat('getUTC')
  });
  addLocale(current, {
    weekdays: 'Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday',
    months: 'January,February,March,April,May,June,July,August,September,October,November,December'
  });
  addLocale('ru', {
    weekdays: 'Воскресенье,Понедельник,Вторник,Среда,Четверг,Пятница,Суббота',
    months: 'Январ:я|ь,Феврал:я|ь,Март:а|,Апрел:я|ь,Ма:я|й,Июн:я|ь,' + 'Июл:я|ь,Август:а|,Сентябр:я|ь,Октябр:я|ь,Ноябр:я|ь,Декабр:я|ь'
  });
  core.locale = function(locale) {
    return $.has(locales, locale) ? current = locale : current;
  };
  core.addLocale = addLocale;
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.16/modules/core.global", ["npm:core-js@0.9.16/modules/$.def", "npm:core-js@0.9.16/modules/$"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $def = require("npm:core-js@0.9.16/modules/$.def");
  $def($def.G + $def.F, {global: require("npm:core-js@0.9.16/modules/$").g});
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.16/modules/core.log", ["npm:core-js@0.9.16/modules/$", "npm:core-js@0.9.16/modules/$.def", "npm:core-js@0.9.16/modules/$.assign"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@0.9.16/modules/$"),
      $def = require("npm:core-js@0.9.16/modules/$.def"),
      log = {},
      enabled = true;
  $.each.call(('assert,clear,count,debug,dir,dirxml,error,exception,' + 'group,groupCollapsed,groupEnd,info,isIndependentlyComposed,log,' + 'markTimeline,profile,profileEnd,table,time,timeEnd,timeline,' + 'timelineEnd,timeStamp,trace,warn').split(','), function(key) {
    log[key] = function() {
      if (enabled && $.g.console && $.isFunction(console[key])) {
        return Function.apply.call(console[key], console, arguments);
      }
    };
  });
  $def($def.G + $def.F, {log: require("npm:core-js@0.9.16/modules/$.assign")(log.log, log, {
      enable: function() {
        enabled = true;
      },
      disable: function() {
        enabled = false;
      }
    })});
  global.define = __define;
  return module.exports;
});

System.register("github:aurelia/metadata@0.6.0/reflect-metadata", ["npm:core-js@0.9.16"], function(_export) {
  "use strict";
  var core,
      functionPrototype,
      _Map,
      _Set,
      _WeakMap,
      __Metadata__;
  function decorate(decorators, target, targetKey, targetDescriptor) {
    if (!IsUndefined(targetDescriptor)) {
      if (!IsArray(decorators)) {
        throw new TypeError();
      } else if (!IsObject(target)) {
        throw new TypeError();
      } else if (IsUndefined(targetKey)) {
        throw new TypeError();
      } else if (!IsObject(targetDescriptor)) {
        throw new TypeError();
      }
      targetKey = ToPropertyKey(targetKey);
      return DecoratePropertyWithDescriptor(decorators, target, targetKey, targetDescriptor);
    } else if (!IsUndefined(targetKey)) {
      if (!IsArray(decorators)) {
        throw new TypeError();
      } else if (!IsObject(target)) {
        throw new TypeError();
      }
      targetKey = ToPropertyKey(targetKey);
      return DecoratePropertyWithoutDescriptor(decorators, target, targetKey);
    } else {
      if (!IsArray(decorators)) {
        throw new TypeError();
      } else if (!IsConstructor(target)) {
        throw new TypeError();
      }
      return DecorateConstructor(decorators, target);
    }
  }
  function metadata(metadataKey, metadataValue) {
    function decorator(target, targetKey) {
      if (!IsUndefined(targetKey)) {
        if (!IsObject(target)) {
          throw new TypeError();
        }
        targetKey = ToPropertyKey(targetKey);
        OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, targetKey);
      } else {
        if (!IsConstructor(target)) {
          throw new TypeError();
        }
        OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, undefined);
      }
    }
    return decorator;
  }
  function defineMetadata(metadataKey, metadataValue, target, targetKey) {
    if (!IsObject(target)) {
      throw new TypeError();
    } else if (!IsUndefined(targetKey)) {
      targetKey = ToPropertyKey(targetKey);
    }
    return OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, targetKey);
  }
  function hasMetadata(metadataKey, target, targetKey) {
    if (!IsObject(target)) {
      throw new TypeError();
    } else if (!IsUndefined(targetKey)) {
      targetKey = ToPropertyKey(targetKey);
    }
    return OrdinaryHasMetadata(metadataKey, target, targetKey);
  }
  function hasOwnMetadata(metadataKey, target, targetKey) {
    if (!IsObject(target)) {
      throw new TypeError();
    } else if (!IsUndefined(targetKey)) {
      targetKey = ToPropertyKey(targetKey);
    }
    return OrdinaryHasOwnMetadata(metadataKey, target, targetKey);
  }
  function getMetadata(metadataKey, target, targetKey) {
    if (!IsObject(target)) {
      throw new TypeError();
    } else if (!IsUndefined(targetKey)) {
      targetKey = ToPropertyKey(targetKey);
    }
    return OrdinaryGetMetadata(metadataKey, target, targetKey);
  }
  function getOwnMetadata(metadataKey, target, targetKey) {
    if (!IsObject(target)) {
      throw new TypeError();
    } else if (!IsUndefined(targetKey)) {
      targetKey = ToPropertyKey(targetKey);
    }
    return OrdinaryGetOwnMetadata(metadataKey, target, targetKey);
  }
  function getMetadataKeys(target, targetKey) {
    if (!IsObject(target)) {
      throw new TypeError();
    } else if (!IsUndefined(targetKey)) {
      targetKey = ToPropertyKey(targetKey);
    }
    return OrdinaryMetadataKeys(target, targetKey);
  }
  function getOwnMetadataKeys(target, targetKey) {
    if (!IsObject(target)) {
      throw new TypeError();
    } else if (!IsUndefined(targetKey)) {
      targetKey = ToPropertyKey(targetKey);
    }
    return OrdinaryOwnMetadataKeys(target, targetKey);
  }
  function deleteMetadata(metadataKey, target, targetKey) {
    if (!IsObject(target)) {
      throw new TypeError();
    } else if (!IsUndefined(targetKey)) {
      targetKey = ToPropertyKey(targetKey);
    }
    var metadataMap = GetOrCreateMetadataMap(target, targetKey, false);
    if (IsUndefined(metadataMap)) {
      return false;
    }
    if (!metadataMap["delete"](metadataKey)) {
      return false;
    }
    if (metadataMap.size > 0) {
      return true;
    }
    var targetMetadata = __Metadata__.get(target);
    targetMetadata["delete"](targetKey);
    if (targetMetadata.size > 0) {
      return true;
    }
    __Metadata__["delete"](target);
    return true;
  }
  function DecorateConstructor(decorators, target) {
    for (var i = decorators.length - 1; i >= 0; --i) {
      var decorator = decorators[i];
      var decorated = decorator(target);
      if (!IsUndefined(decorated)) {
        if (!IsConstructor(decorated)) {
          throw new TypeError();
        }
        target = decorated;
      }
    }
    return target;
  }
  function DecoratePropertyWithDescriptor(decorators, target, propertyKey, descriptor) {
    for (var i = decorators.length - 1; i >= 0; --i) {
      var decorator = decorators[i];
      var decorated = decorator(target, propertyKey, descriptor);
      if (!IsUndefined(decorated)) {
        if (!IsObject(decorated)) {
          throw new TypeError();
        }
        descriptor = decorated;
      }
    }
    return descriptor;
  }
  function DecoratePropertyWithoutDescriptor(decorators, target, propertyKey) {
    for (var i = decorators.length - 1; i >= 0; --i) {
      var decorator = decorators[i];
      decorator(target, propertyKey);
    }
  }
  function GetOrCreateMetadataMap(target, targetKey, create) {
    var targetMetadata = __Metadata__.get(target);
    if (!targetMetadata) {
      if (!create) {
        return undefined;
      }
      targetMetadata = new _Map();
      __Metadata__.set(target, targetMetadata);
    }
    var keyMetadata = targetMetadata.get(targetKey);
    if (!keyMetadata) {
      if (!create) {
        return undefined;
      }
      keyMetadata = new _Map();
      targetMetadata.set(targetKey, keyMetadata);
    }
    return keyMetadata;
  }
  function OrdinaryHasMetadata(_x, _x2, _x3) {
    var _again = true;
    _function: while (_again) {
      var MetadataKey = _x,
          O = _x2,
          P = _x3;
      hasOwn = parent = undefined;
      _again = false;
      var hasOwn = OrdinaryHasOwnMetadata(MetadataKey, O, P);
      if (hasOwn) {
        return true;
      }
      var parent = GetPrototypeOf(O);
      if (parent !== null) {
        _x = MetadataKey;
        _x2 = parent;
        _x3 = P;
        _again = true;
        continue _function;
      }
      return false;
    }
  }
  function OrdinaryHasOwnMetadata(MetadataKey, O, P) {
    var metadataMap = GetOrCreateMetadataMap(O, P, false);
    if (metadataMap === undefined) {
      return false;
    }
    return Boolean(metadataMap.has(MetadataKey));
  }
  function OrdinaryGetMetadata(_x4, _x5, _x6) {
    var _again2 = true;
    _function2: while (_again2) {
      var MetadataKey = _x4,
          O = _x5,
          P = _x6;
      hasOwn = parent = undefined;
      _again2 = false;
      var hasOwn = OrdinaryHasOwnMetadata(MetadataKey, O, P);
      if (hasOwn) {
        return OrdinaryGetOwnMetadata(MetadataKey, O, P);
      }
      var parent = GetPrototypeOf(O);
      if (parent !== null) {
        _x4 = MetadataKey;
        _x5 = parent;
        _x6 = P;
        _again2 = true;
        continue _function2;
      }
      return undefined;
    }
  }
  function OrdinaryGetOwnMetadata(MetadataKey, O, P) {
    var metadataMap = GetOrCreateMetadataMap(O, P, false);
    if (metadataMap === undefined) {
      return undefined;
    }
    return metadataMap.get(MetadataKey);
  }
  function OrdinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P) {
    var metadataMap = GetOrCreateMetadataMap(O, P, true);
    metadataMap.set(MetadataKey, MetadataValue);
  }
  function OrdinaryMetadataKeys(O, P) {
    var ownKeys = OrdinaryOwnMetadataKeys(O, P);
    var parent = GetPrototypeOf(O);
    if (parent === null) {
      return ownKeys;
    }
    var parentKeys = OrdinaryMetadataKeys(parent, P);
    if (parentKeys.length <= 0) {
      return ownKeys;
    }
    if (ownKeys.length <= 0) {
      return parentKeys;
    }
    var set = new _Set();
    var keys = [];
    for (var _i = 0; _i < ownKeys.length; _i++) {
      var key = ownKeys[_i];
      var hasKey = set.has(key);
      if (!hasKey) {
        set.add(key);
        keys.push(key);
      }
    }
    for (var _a = 0; _a < parentKeys.length; _a++) {
      var key = parentKeys[_a];
      var hasKey = set.has(key);
      if (!hasKey) {
        set.add(key);
        keys.push(key);
      }
    }
    return keys;
  }
  function OrdinaryOwnMetadataKeys(target, targetKey) {
    var metadataMap = GetOrCreateMetadataMap(target, targetKey, false);
    var keys = [];
    if (metadataMap) {
      metadataMap.forEach(function(_, key) {
        return keys.push(key);
      });
    }
    return keys;
  }
  function IsUndefined(x) {
    return x === undefined;
  }
  function IsArray(x) {
    return Array.isArray(x);
  }
  function IsObject(x) {
    return typeof x === "object" ? x !== null : typeof x === "function";
  }
  function IsConstructor(x) {
    return typeof x === "function";
  }
  function IsSymbol(x) {
    return typeof x === "symbol";
  }
  function ToPropertyKey(value) {
    if (IsSymbol(value)) {
      return value;
    }
    return String(value);
  }
  function GetPrototypeOf(O) {
    var proto = Object.getPrototypeOf(O);
    if (typeof O !== "function" || O === functionPrototype) {
      return proto;
    }
    if (proto !== functionPrototype) {
      return proto;
    }
    var prototype = O.prototype;
    var prototypeProto = Object.getPrototypeOf(prototype);
    if (prototypeProto == null || prototypeProto === Object.prototype) {
      return proto;
    }
    var constructor = prototypeProto.constructor;
    if (typeof constructor !== "function") {
      return proto;
    }
    if (constructor === O) {
      return proto;
    }
    return constructor;
  }
  return {
    setters: [function(_coreJs) {
      core = _coreJs["default"];
    }],
    execute: function() {
      functionPrototype = Object.getPrototypeOf(Function);
      _Map = Map;
      _Set = Set;
      _WeakMap = WeakMap;
      __Metadata__ = new _WeakMap();
      Reflect.decorate = decorate;
      Reflect.metadata = metadata;
      Reflect.defineMetadata = defineMetadata;
      Reflect.hasMetadata = hasMetadata;
      Reflect.hasOwnMetadata = hasOwnMetadata;
      Reflect.getMetadata = getMetadata;
      Reflect.getOwnMetadata = getOwnMetadata;
      Reflect.getMetadataKeys = getMetadataKeys;
      Reflect.getOwnMetadataKeys = getOwnMetadataKeys;
      Reflect.deleteMetadata = deleteMetadata;
    }
  };
});

System.register("github:aurelia/metadata@0.6.0/decorator-applicator", ["github:aurelia/metadata@0.6.0/metadata"], function(_export) {
  'use strict';
  var Metadata,
      DecoratorApplicator;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }
  return {
    setters: [function(_metadata) {
      Metadata = _metadata.Metadata;
    }],
    execute: function() {
      DecoratorApplicator = (function() {
        function DecoratorApplicator() {
          _classCallCheck(this, DecoratorApplicator);
          this._first = null;
          this._second = null;
          this._third = null;
          this._rest = null;
        }
        DecoratorApplicator.prototype.decorator = function decorator(_decorator) {
          if (this._first === null) {
            this._first = _decorator;
            return this;
          }
          if (this._second === null) {
            this._second = _decorator;
            return this;
          }
          if (this._third === null) {
            this._third = _decorator;
            return this;
          }
          if (this._rest === null) {
            this._rest = [];
          }
          this._rest.push(_decorator);
          return this;
        };
        DecoratorApplicator.prototype._decorate = function _decorate(target) {
          var i,
              ii,
              rest;
          if (this._first !== null) {
            this._first(target);
          }
          if (this._second !== null) {
            this._second(target);
          }
          if (this._third !== null) {
            this._third(target);
          }
          rest = this._rest;
          if (rest !== null) {
            for (i = 0, ii = rest.length; i < ii; ++i) {
              rest[i](target);
            }
          }
        };
        return DecoratorApplicator;
      })();
      _export('DecoratorApplicator', DecoratorApplicator);
    }
  };
});

System.register("github:aurelia/binding@0.7.3/value-converter", ["npm:core-js@0.9.16"], function(_export) {
  'use strict';
  var core,
      ValueConverterResource;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }
  function camelCase(name) {
    return name.charAt(0).toLowerCase() + name.slice(1);
  }
  return {
    setters: [function(_coreJs) {
      core = _coreJs['default'];
    }],
    execute: function() {
      ValueConverterResource = (function() {
        function ValueConverterResource(name) {
          _classCallCheck(this, ValueConverterResource);
          this.name = name;
        }
        ValueConverterResource.convention = function convention(name) {
          if (name.endsWith('ValueConverter')) {
            return new ValueConverterResource(camelCase(name.substring(0, name.length - 14)));
          }
        };
        ValueConverterResource.prototype.analyze = function analyze(container, target) {
          this.instance = container.get(target);
        };
        ValueConverterResource.prototype.register = function register(registry, name) {
          registry.registerValueConverter(name || this.name, this.instance);
        };
        ValueConverterResource.prototype.load = function load(container, target) {
          return Promise.resolve(this);
        };
        return ValueConverterResource;
      })();
      _export('ValueConverterResource', ValueConverterResource);
    }
  };
});

System.register("github:aurelia/binding@0.7.3/class-list", [], function(_export) {
  "use strict";
  return {
    setters: [],
    execute: function() {
      if (!("classList" in document.createElement("_")) || document.createElementNS && !("classList" in document.createElementNS("http://www.w3.org/2000/svg", "g"))) {
        (function(view) {
          "use strict";
          if (!("Element" in view))
            return ;
          var classListProp = "classList",
              protoProp = "prototype",
              elemCtrProto = view.Element[protoProp],
              objCtr = Object,
              strTrim = String[protoProp].trim || function() {
                return this.replace(/^\s+|\s+$/g, "");
              },
              arrIndexOf = Array[protoProp].indexOf || function(item) {
                var i = 0,
                    len = this.length;
                for (; i < len; i++) {
                  if (i in this && this[i] === item) {
                    return i;
                  }
                }
                return -1;
              },
              DOMEx = function DOMEx(type, message) {
                this.name = type;
                this.code = DOMException[type];
                this.message = message;
              },
              checkTokenAndGetIndex = function checkTokenAndGetIndex(classList, token) {
                if (token === "") {
                  throw new DOMEx("SYNTAX_ERR", "An invalid or illegal string was specified");
                }
                if (/\s/.test(token)) {
                  throw new DOMEx("INVALID_CHARACTER_ERR", "String contains an invalid character");
                }
                return arrIndexOf.call(classList, token);
              },
              ClassList = function ClassList(elem) {
                var trimmedClasses = strTrim.call(elem.getAttribute("class") || ""),
                    classes = trimmedClasses ? trimmedClasses.split(/\s+/) : [],
                    i = 0,
                    len = classes.length;
                for (; i < len; i++) {
                  this.push(classes[i]);
                }
                this._updateClassName = function() {
                  elem.setAttribute("class", this.toString());
                };
              },
              classListProto = ClassList[protoProp] = [],
              classListGetter = function classListGetter() {
                return new ClassList(this);
              };
          DOMEx[protoProp] = Error[protoProp];
          classListProto.item = function(i) {
            return this[i] || null;
          };
          classListProto.contains = function(token) {
            token += "";
            return checkTokenAndGetIndex(this, token) !== -1;
          };
          classListProto.add = function() {
            var tokens = arguments,
                i = 0,
                l = tokens.length,
                token,
                updated = false;
            do {
              token = tokens[i] + "";
              if (checkTokenAndGetIndex(this, token) === -1) {
                this.push(token);
                updated = true;
              }
            } while (++i < l);
            if (updated) {
              this._updateClassName();
            }
          };
          classListProto.remove = function() {
            var tokens = arguments,
                i = 0,
                l = tokens.length,
                token,
                updated = false,
                index;
            do {
              token = tokens[i] + "";
              index = checkTokenAndGetIndex(this, token);
              while (index !== -1) {
                this.splice(index, 1);
                updated = true;
                index = checkTokenAndGetIndex(this, token);
              }
            } while (++i < l);
            if (updated) {
              this._updateClassName();
            }
          };
          classListProto.toggle = function(token, force) {
            token += "";
            var result = this.contains(token),
                method = result ? force !== true && "remove" : force !== false && "add";
            if (method) {
              this[method](token);
            }
            if (force === true || force === false) {
              return force;
            } else {
              return !result;
            }
          };
          classListProto.toString = function() {
            return this.join(" ");
          };
          if (objCtr.defineProperty) {
            var classListPropDesc = {
              get: classListGetter,
              enumerable: true,
              configurable: true
            };
            try {
              objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
            } catch (ex) {
              if (ex.number === -2146823252) {
                classListPropDesc.enumerable = false;
                objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
              }
            }
          } else if (objCtr[protoProp].__defineGetter__) {
            elemCtrProto.__defineGetter__(classListProp, classListGetter);
          }
        })(self);
      } else {
        (function() {
          "use strict";
          var testElement = document.createElement("_");
          testElement.classList.add("c1", "c2");
          if (!testElement.classList.contains("c2")) {
            var createMethod = function createMethod(method) {
              var original = DOMTokenList.prototype[method];
              DOMTokenList.prototype[method] = function(token) {
                var i,
                    len = arguments.length;
                for (i = 0; i < len; i++) {
                  token = arguments[i];
                  original.call(this, token);
                }
              };
            };
            createMethod("add");
            createMethod("remove");
          }
          testElement.classList.toggle("c3", false);
          if (testElement.classList.contains("c3")) {
            var _toggle = DOMTokenList.prototype.toggle;
            DOMTokenList.prototype.toggle = function(token, force) {
              if (1 in arguments && !this.contains(token) === !force) {
                return force;
              } else {
                return _toggle.call(this, token);
              }
            };
          }
          testElement = null;
        })();
      }
    }
  };
});

System.register("github:aurelia/binding@0.7.3/event-manager", [], function(_export) {
  'use strict';
  var DefaultEventStrategy,
      EventManager;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }
  return {
    setters: [],
    execute: function() {
      DefaultEventStrategy = (function() {
        function DefaultEventStrategy() {
          _classCallCheck(this, DefaultEventStrategy);
          this.delegatedEvents = {};
        }
        DefaultEventStrategy.prototype.ensureDelegatedEvent = function ensureDelegatedEvent(eventName) {
          if (this.delegatedEvents[eventName]) {
            return ;
          }
          this.delegatedEvents[eventName] = true;
          document.addEventListener(eventName, this.handleDelegatedEvent.bind(this), false);
        };
        DefaultEventStrategy.prototype.handleCallbackResult = function handleCallbackResult(result) {};
        DefaultEventStrategy.prototype.handleDelegatedEvent = function handleDelegatedEvent(event) {
          event = event || window.event;
          var target = event.target || event.srcElement,
              callback;
          while (target && !callback) {
            if (target.delegatedEvents) {
              callback = target.delegatedEvents[event.type];
            }
            if (!callback) {
              target = target.parentNode;
            }
          }
          if (callback) {
            this.handleCallbackResult(callback(event));
          }
        };
        DefaultEventStrategy.prototype.createDirectEventCallback = function createDirectEventCallback(callback) {
          var _this = this;
          return function(event) {
            _this.handleCallbackResult(callback(event));
          };
        };
        DefaultEventStrategy.prototype.subscribeToDelegatedEvent = function subscribeToDelegatedEvent(target, targetEvent, callback) {
          var lookup = target.delegatedEvents || (target.delegatedEvents = {});
          this.ensureDelegatedEvent(targetEvent);
          lookup[targetEvent] = callback;
          return function() {
            lookup[targetEvent] = null;
          };
        };
        DefaultEventStrategy.prototype.subscribeToDirectEvent = function subscribeToDirectEvent(target, targetEvent, callback) {
          var directEventCallback = this.createDirectEventCallback(callback);
          target.addEventListener(targetEvent, directEventCallback, false);
          return function() {
            target.removeEventListener(targetEvent, directEventCallback);
          };
        };
        DefaultEventStrategy.prototype.subscribe = function subscribe(target, targetEvent, callback, delegate) {
          if (delegate) {
            return this.subscribeToDelegatedEvent(target, targetEvent, callback);
          } else {
            return this.subscribeToDirectEvent(target, targetEvent, callback);
          }
        };
        return DefaultEventStrategy;
      })();
      EventManager = (function() {
        function EventManager() {
          _classCallCheck(this, EventManager);
          this.elementHandlerLookup = {};
          this.eventStrategyLookup = {};
          this.registerElementConfig({
            tagName: 'input',
            properties: {
              value: ['change', 'input'],
              checked: ['change', 'input']
            }
          });
          this.registerElementConfig({
            tagName: 'textarea',
            properties: {value: ['change', 'input']}
          });
          this.registerElementConfig({
            tagName: 'select',
            properties: {value: ['change']}
          });
          this.registerElementConfig({
            tagName: 'content editable',
            properties: {value: ['change', 'input', 'blur', 'keyup', 'paste']}
          });
          this.registerElementConfig({
            tagName: 'scrollable element',
            properties: {
              scrollTop: ['scroll'],
              scrollLeft: ['scroll']
            }
          });
          this.defaultEventStrategy = new DefaultEventStrategy();
        }
        EventManager.prototype.registerElementConfig = function registerElementConfig(config) {
          var tagName = config.tagName.toLowerCase(),
              properties = config.properties,
              propertyName;
          this.elementHandlerLookup[tagName] = {};
          for (propertyName in properties) {
            if (properties.hasOwnProperty(propertyName)) {
              this.registerElementPropertyConfig(tagName, propertyName, properties[propertyName]);
            }
          }
        };
        EventManager.prototype.registerElementPropertyConfig = function registerElementPropertyConfig(tagName, propertyName, events) {
          this.elementHandlerLookup[tagName][propertyName] = {subscribe: function subscribe(target, callback) {
              events.forEach(function(changeEvent) {
                target.addEventListener(changeEvent, callback, false);
              });
              return function() {
                events.forEach(function(changeEvent) {
                  target.removeEventListener(changeEvent, callback);
                });
              };
            }};
        };
        EventManager.prototype.registerElementHandler = function registerElementHandler(tagName, handler) {
          this.elementHandlerLookup[tagName.toLowerCase()] = handler;
        };
        EventManager.prototype.registerEventStrategy = function registerEventStrategy(eventName, strategy) {
          this.eventStrategyLookup[eventName] = strategy;
        };
        EventManager.prototype.getElementHandler = function getElementHandler(target, propertyName) {
          var tagName,
              lookup = this.elementHandlerLookup;
          if (target.tagName) {
            tagName = target.tagName.toLowerCase();
            if (lookup[tagName] && lookup[tagName][propertyName]) {
              return lookup[tagName][propertyName];
            }
            if (propertyName === 'textContent' || propertyName === 'innerHTML') {
              return lookup['content editable']['value'];
            }
            if (propertyName === 'scrollTop' || propertyName === 'scrollLeft') {
              return lookup['scrollable element'][propertyName];
            }
          }
          return null;
        };
        EventManager.prototype.addEventListener = function addEventListener(target, targetEvent, callback, delegate) {
          return (this.eventStrategyLookup[targetEvent] || this.defaultEventStrategy).subscribe(target, targetEvent, callback, delegate);
        };
        return EventManager;
      })();
      _export('EventManager', EventManager);
    }
  };
});

System.register("github:aurelia/task-queue@0.5.0/index", [], function(_export) {
  'use strict';
  var BrowserMutationObserver,
      hasSetImmediate,
      TaskQueue;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }
  function makeRequestFlushFromMutationObserver(flush) {
    var toggle = 1;
    var observer = new BrowserMutationObserver(flush);
    var node = document.createTextNode('');
    observer.observe(node, {characterData: true});
    return function requestFlush() {
      toggle = -toggle;
      node.data = toggle;
    };
  }
  function makeRequestFlushFromTimer(flush) {
    return function requestFlush() {
      var timeoutHandle = setTimeout(handleFlushTimer, 0);
      var intervalHandle = setInterval(handleFlushTimer, 50);
      function handleFlushTimer() {
        clearTimeout(timeoutHandle);
        clearInterval(intervalHandle);
        flush();
      }
    };
  }
  return {
    setters: [],
    execute: function() {
      BrowserMutationObserver = window.MutationObserver || window.WebKitMutationObserver;
      hasSetImmediate = typeof setImmediate === 'function';
      TaskQueue = (function() {
        function TaskQueue() {
          var _this = this;
          _classCallCheck(this, TaskQueue);
          this.microTaskQueue = [];
          this.microTaskQueueCapacity = 1024;
          this.taskQueue = [];
          if (typeof BrowserMutationObserver === 'function') {
            this.requestFlushMicroTaskQueue = makeRequestFlushFromMutationObserver(function() {
              return _this.flushMicroTaskQueue();
            });
          } else {
            this.requestFlushMicroTaskQueue = makeRequestFlushFromTimer(function() {
              return _this.flushMicroTaskQueue();
            });
          }
          this.requestFlushTaskQueue = makeRequestFlushFromTimer(function() {
            return _this.flushTaskQueue();
          });
        }
        TaskQueue.prototype.queueMicroTask = function queueMicroTask(task) {
          if (this.microTaskQueue.length < 1) {
            this.requestFlushMicroTaskQueue();
          }
          this.microTaskQueue.push(task);
        };
        TaskQueue.prototype.queueTask = function queueTask(task) {
          if (this.taskQueue.length < 1) {
            this.requestFlushTaskQueue();
          }
          this.taskQueue.push(task);
        };
        TaskQueue.prototype.flushTaskQueue = function flushTaskQueue() {
          var queue = this.taskQueue,
              index = 0,
              task;
          this.taskQueue = [];
          while (index < queue.length) {
            task = queue[index];
            try {
              task.call();
            } catch (error) {
              this.onError(error, task);
            }
            index++;
          }
        };
        TaskQueue.prototype.flushMicroTaskQueue = function flushMicroTaskQueue() {
          var queue = this.microTaskQueue,
              capacity = this.microTaskQueueCapacity,
              index = 0,
              task;
          while (index < queue.length) {
            task = queue[index];
            try {
              task.call();
            } catch (error) {
              this.onError(error, task);
            }
            index++;
            if (index > capacity) {
              for (var scan = 0; scan < index; scan++) {
                queue[scan] = queue[scan + index];
              }
              queue.length -= index;
              index = 0;
            }
          }
          queue.length = 0;
        };
        TaskQueue.prototype.onError = function onError(error, task) {
          if ('onError' in task) {
            task.onError(error);
          } else if (hasSetImmediate) {
            setImmediate(function() {
              throw error;
            });
          } else {
            setTimeout(function() {
              throw error;
            }, 0);
          }
        };
        return TaskQueue;
      })();
      _export('TaskQueue', TaskQueue);
    }
  };
});

System.register("github:aurelia/binding@0.7.3/environment", [], function(_export) {
  'use strict';
  var hasObjectObserve,
      hasArrayObserve;
  return {
    setters: [],
    execute: function() {
      hasObjectObserve = (function detectObjectObserve() {
        if (typeof Object.observe !== 'function') {
          return false;
        }
        var records = [];
        function callback(recs) {
          records = recs;
        }
        var test = {};
        Object.observe(test, callback);
        test.id = 1;
        test.id = 2;
        delete test.id;
        Object.deliverChangeRecords(callback);
        if (records.length !== 3)
          return false;
        if (records[0].type != 'add' || records[1].type != 'update' || records[2].type != 'delete') {
          return false;
        }
        Object.unobserve(test, callback);
        return true;
      })();
      _export('hasObjectObserve', hasObjectObserve);
      hasArrayObserve = (function detectArrayObserve() {
        if (typeof Array.observe !== 'function') {
          return false;
        }
        var records = [];
        function callback(recs) {
          records = recs;
        }
        var arr = [];
        Array.observe(arr, callback);
        arr.push(1, 2);
        arr.length = 0;
        Object.deliverChangeRecords(callback);
        if (records.length !== 2)
          return false;
        if (records[0].type != 'splice' || records[1].type != 'splice') {
          return false;
        }
        Array.unobserve(arr, callback);
        return true;
      })();
      _export('hasArrayObserve', hasArrayObserve);
    }
  };
});

System.register("github:aurelia/binding@0.7.3/array-change-records", [], function(_export) {
  'use strict';
  var EDIT_LEAVE,
      EDIT_UPDATE,
      EDIT_ADD,
      EDIT_DELETE,
      arraySplice;
  _export('calcSplices', calcSplices);
  _export('projectArraySplices', projectArraySplices);
  function isIndex(s) {
    return +s === s >>> 0;
  }
  function toNumber(s) {
    return +s;
  }
  function newSplice(index, removed, addedCount) {
    return {
      index: index,
      removed: removed,
      addedCount: addedCount
    };
  }
  function ArraySplice() {}
  function calcSplices(current, currentStart, currentEnd, old, oldStart, oldEnd) {
    return arraySplice.calcSplices(current, currentStart, currentEnd, old, oldStart, oldEnd);
  }
  function intersect(start1, end1, start2, end2) {
    if (end1 < start2 || end2 < start1)
      return -1;
    if (end1 == start2 || end2 == start1)
      return 0;
    if (start1 < start2) {
      if (end1 < end2)
        return end1 - start2;
      else
        return end2 - start2;
    } else {
      if (end2 < end1)
        return end2 - start1;
      else
        return end1 - start1;
    }
  }
  function mergeSplice(splices, index, removed, addedCount) {
    var splice = newSplice(index, removed, addedCount);
    var inserted = false;
    var insertionOffset = 0;
    for (var i = 0; i < splices.length; i++) {
      var current = splices[i];
      current.index += insertionOffset;
      if (inserted)
        continue;
      var intersectCount = intersect(splice.index, splice.index + splice.removed.length, current.index, current.index + current.addedCount);
      if (intersectCount >= 0) {
        splices.splice(i, 1);
        i--;
        insertionOffset -= current.addedCount - current.removed.length;
        splice.addedCount += current.addedCount - intersectCount;
        var deleteCount = splice.removed.length + current.removed.length - intersectCount;
        if (!splice.addedCount && !deleteCount) {
          inserted = true;
        } else {
          var removed = current.removed;
          if (splice.index < current.index) {
            var prepend = splice.removed.slice(0, current.index - splice.index);
            Array.prototype.push.apply(prepend, removed);
            removed = prepend;
          }
          if (splice.index + splice.removed.length > current.index + current.addedCount) {
            var append = splice.removed.slice(current.index + current.addedCount - splice.index);
            Array.prototype.push.apply(removed, append);
          }
          splice.removed = removed;
          if (current.index < splice.index) {
            splice.index = current.index;
          }
        }
      } else if (splice.index < current.index) {
        inserted = true;
        splices.splice(i, 0, splice);
        i++;
        var offset = splice.addedCount - splice.removed.length;
        current.index += offset;
        insertionOffset += offset;
      }
    }
    if (!inserted)
      splices.push(splice);
  }
  function createInitialSplices(array, changeRecords) {
    var splices = [];
    for (var i = 0; i < changeRecords.length; i++) {
      var record = changeRecords[i];
      switch (record.type) {
        case 'splice':
          mergeSplice(splices, record.index, record.removed.slice(), record.addedCount);
          break;
        case 'add':
        case 'update':
        case 'delete':
          if (!isIndex(record.name))
            continue;
          var index = toNumber(record.name);
          if (index < 0)
            continue;
          mergeSplice(splices, index, [record.oldValue], record.type === 'delete' ? 0 : 1);
          break;
        default:
          console.error('Unexpected record type: ' + JSON.stringify(record));
          break;
      }
    }
    return splices;
  }
  function projectArraySplices(array, changeRecords) {
    var splices = [];
    createInitialSplices(array, changeRecords).forEach(function(splice) {
      if (splice.addedCount == 1 && splice.removed.length == 1) {
        if (splice.removed[0] !== array[splice.index])
          splices.push(splice);
        return ;
      }
      ;
      splices = splices.concat(calcSplices(array, splice.index, splice.index + splice.addedCount, splice.removed, 0, splice.removed.length));
    });
    return splices;
  }
  return {
    setters: [],
    execute: function() {
      EDIT_LEAVE = 0;
      EDIT_UPDATE = 1;
      EDIT_ADD = 2;
      EDIT_DELETE = 3;
      ArraySplice.prototype = {
        calcEditDistances: function calcEditDistances(current, currentStart, currentEnd, old, oldStart, oldEnd) {
          var rowCount = oldEnd - oldStart + 1;
          var columnCount = currentEnd - currentStart + 1;
          var distances = new Array(rowCount);
          var i,
              j,
              north,
              west;
          for (i = 0; i < rowCount; ++i) {
            distances[i] = new Array(columnCount);
            distances[i][0] = i;
          }
          for (j = 0; j < columnCount; ++j) {
            distances[0][j] = j;
          }
          for (i = 1; i < rowCount; ++i) {
            for (j = 1; j < columnCount; ++j) {
              if (this.equals(current[currentStart + j - 1], old[oldStart + i - 1]))
                distances[i][j] = distances[i - 1][j - 1];
              else {
                north = distances[i - 1][j] + 1;
                west = distances[i][j - 1] + 1;
                distances[i][j] = north < west ? north : west;
              }
            }
          }
          return distances;
        },
        spliceOperationsFromEditDistances: function spliceOperationsFromEditDistances(distances) {
          var i = distances.length - 1;
          var j = distances[0].length - 1;
          var current = distances[i][j];
          var edits = [];
          while (i > 0 || j > 0) {
            if (i == 0) {
              edits.push(EDIT_ADD);
              j--;
              continue;
            }
            if (j == 0) {
              edits.push(EDIT_DELETE);
              i--;
              continue;
            }
            var northWest = distances[i - 1][j - 1];
            var west = distances[i - 1][j];
            var north = distances[i][j - 1];
            var min;
            if (west < north)
              min = west < northWest ? west : northWest;
            else
              min = north < northWest ? north : northWest;
            if (min == northWest) {
              if (northWest == current) {
                edits.push(EDIT_LEAVE);
              } else {
                edits.push(EDIT_UPDATE);
                current = northWest;
              }
              i--;
              j--;
            } else if (min == west) {
              edits.push(EDIT_DELETE);
              i--;
              current = west;
            } else {
              edits.push(EDIT_ADD);
              j--;
              current = north;
            }
          }
          edits.reverse();
          return edits;
        },
        calcSplices: function calcSplices(current, currentStart, currentEnd, old, oldStart, oldEnd) {
          var prefixCount = 0;
          var suffixCount = 0;
          var minLength = Math.min(currentEnd - currentStart, oldEnd - oldStart);
          if (currentStart == 0 && oldStart == 0)
            prefixCount = this.sharedPrefix(current, old, minLength);
          if (currentEnd == current.length && oldEnd == old.length)
            suffixCount = this.sharedSuffix(current, old, minLength - prefixCount);
          currentStart += prefixCount;
          oldStart += prefixCount;
          currentEnd -= suffixCount;
          oldEnd -= suffixCount;
          if (currentEnd - currentStart == 0 && oldEnd - oldStart == 0)
            return [];
          if (currentStart == currentEnd) {
            var splice = newSplice(currentStart, [], 0);
            while (oldStart < oldEnd)
              splice.removed.push(old[oldStart++]);
            return [splice];
          } else if (oldStart == oldEnd)
            return [newSplice(currentStart, [], currentEnd - currentStart)];
          var ops = this.spliceOperationsFromEditDistances(this.calcEditDistances(current, currentStart, currentEnd, old, oldStart, oldEnd));
          var splice = undefined;
          var splices = [];
          var index = currentStart;
          var oldIndex = oldStart;
          for (var i = 0; i < ops.length; ++i) {
            switch (ops[i]) {
              case EDIT_LEAVE:
                if (splice) {
                  splices.push(splice);
                  splice = undefined;
                }
                index++;
                oldIndex++;
                break;
              case EDIT_UPDATE:
                if (!splice)
                  splice = newSplice(index, [], 0);
                splice.addedCount++;
                index++;
                splice.removed.push(old[oldIndex]);
                oldIndex++;
                break;
              case EDIT_ADD:
                if (!splice)
                  splice = newSplice(index, [], 0);
                splice.addedCount++;
                index++;
                break;
              case EDIT_DELETE:
                if (!splice)
                  splice = newSplice(index, [], 0);
                splice.removed.push(old[oldIndex]);
                oldIndex++;
                break;
            }
          }
          if (splice) {
            splices.push(splice);
          }
          return splices;
        },
        sharedPrefix: function sharedPrefix(current, old, searchLength) {
          for (var i = 0; i < searchLength; ++i)
            if (!this.equals(current[i], old[i]))
              return i;
          return searchLength;
        },
        sharedSuffix: function sharedSuffix(current, old, searchLength) {
          var index1 = current.length;
          var index2 = old.length;
          var count = 0;
          while (count < searchLength && this.equals(current[--index1], old[--index2]))
            count++;
          return count;
        },
        calculateSplices: function calculateSplices(current, previous) {
          return this.calcSplices(current, 0, current.length, previous, 0, previous.length);
        },
        equals: function equals(currentValue, previousValue) {
          return currentValue === previousValue;
        }
      };
      arraySplice = new ArraySplice();
    }
  };
});

System.register("github:aurelia/binding@0.7.3/map-change-records", [], function(_export) {
  'use strict';
  _export('getChangeRecords', getChangeRecords);
  function newRecord(type, object, key, oldValue) {
    return {
      type: type,
      object: object,
      key: key,
      oldValue: oldValue
    };
  }
  function getChangeRecords(map) {
    var entries = [];
    for (var _iterator = map.keys(),
        _isArray = Array.isArray(_iterator),
        _i = 0,
        _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ; ) {
      var _ref;
      if (_isArray) {
        if (_i >= _iterator.length)
          break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done)
          break;
        _ref = _i.value;
      }
      var key = _ref;
      entries.push(newRecord('added', map, key));
    }
    return entries;
  }
  return {
    setters: [],
    execute: function() {}
  };
});

System.register("github:aurelia/binding@0.7.3/map-observation", ["npm:core-js@0.9.16", "github:aurelia/binding@0.7.3/map-change-records", "github:aurelia/binding@0.7.3/collection-observation"], function(_export) {
  'use strict';
  var core,
      getChangeRecords,
      ModifyCollectionObserver,
      mapProto,
      ModifyMapObserver;
  _export('getMapObserver', getMapObserver);
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }
  function _inherits(subClass, superClass) {
    if (typeof superClass !== 'function' && superClass !== null) {
      throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }});
    if (superClass)
      subClass.__proto__ = superClass;
  }
  function getMapObserver(taskQueue, map) {
    return ModifyMapObserver.create(taskQueue, map);
  }
  return {
    setters: [function(_coreJs) {
      core = _coreJs['default'];
    }, function(_mapChangeRecords) {
      getChangeRecords = _mapChangeRecords.getChangeRecords;
    }, function(_collectionObservation) {
      ModifyCollectionObserver = _collectionObservation.ModifyCollectionObserver;
    }],
    execute: function() {
      mapProto = Map.prototype;
      ModifyMapObserver = (function(_ModifyCollectionObserver) {
        function ModifyMapObserver(taskQueue, map) {
          _classCallCheck(this, ModifyMapObserver);
          _ModifyCollectionObserver.call(this, taskQueue, map);
        }
        _inherits(ModifyMapObserver, _ModifyCollectionObserver);
        ModifyMapObserver.create = function create(taskQueue, map) {
          var observer = new ModifyMapObserver(taskQueue, map);
          map['set'] = function() {
            var oldValue = map.get(arguments[0]);
            var type = oldValue ? 'update' : 'add';
            var methodCallResult = mapProto['set'].apply(map, arguments);
            observer.addChangeRecord({
              type: type,
              object: map,
              key: arguments[0],
              oldValue: oldValue
            });
            return methodCallResult;
          };
          map['delete'] = function() {
            var oldValue = map.get(arguments[0]);
            var methodCallResult = mapProto['delete'].apply(map, arguments);
            observer.addChangeRecord({
              type: 'delete',
              object: map,
              key: arguments[0],
              oldValue: oldValue
            });
            return methodCallResult;
          };
          map['clear'] = function() {
            var methodCallResult = mapProto['clear'].apply(map, arguments);
            observer.addChangeRecord({
              type: 'clear',
              object: map
            });
            return methodCallResult;
          };
          return observer;
        };
        return ModifyMapObserver;
      })(ModifyCollectionObserver);
    }
  };
});

System.register("github:aurelia/binding@0.7.3/dirty-checking", [], function(_export) {
  "use strict";
  var DirtyChecker,
      DirtyCheckProperty;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  return {
    setters: [],
    execute: function() {
      DirtyChecker = (function() {
        function DirtyChecker() {
          _classCallCheck(this, DirtyChecker);
          this.tracked = [];
          this.checkDelay = 120;
        }
        DirtyChecker.prototype.addProperty = function addProperty(property) {
          var tracked = this.tracked;
          tracked.push(property);
          if (tracked.length === 1) {
            this.scheduleDirtyCheck();
          }
        };
        DirtyChecker.prototype.removeProperty = function removeProperty(property) {
          var tracked = this.tracked;
          tracked.splice(tracked.indexOf(property), 1);
        };
        DirtyChecker.prototype.scheduleDirtyCheck = function scheduleDirtyCheck() {
          var _this = this;
          setTimeout(function() {
            return _this.check();
          }, this.checkDelay);
        };
        DirtyChecker.prototype.check = function check() {
          var tracked = this.tracked,
              i = tracked.length;
          while (i--) {
            var current = tracked[i];
            if (current.isDirty()) {
              current.call();
            }
          }
          if (tracked.length) {
            this.scheduleDirtyCheck();
          }
        };
        return DirtyChecker;
      })();
      _export("DirtyChecker", DirtyChecker);
      DirtyCheckProperty = (function() {
        function DirtyCheckProperty(dirtyChecker, obj, propertyName) {
          _classCallCheck(this, DirtyCheckProperty);
          this.dirtyChecker = dirtyChecker;
          this.obj = obj;
          this.propertyName = propertyName;
          this.callbacks = [];
          this.isSVG = obj instanceof SVGElement;
        }
        DirtyCheckProperty.prototype.getValue = function getValue() {
          return this.obj[this.propertyName];
        };
        DirtyCheckProperty.prototype.setValue = function setValue(newValue) {
          if (this.isSVG) {
            this.obj.setAttributeNS(null, this.propertyName, newValue);
          } else {
            this.obj[this.propertyName] = newValue;
          }
        };
        DirtyCheckProperty.prototype.call = function call() {
          var callbacks = this.callbacks,
              i = callbacks.length,
              oldValue = this.oldValue,
              newValue = this.getValue();
          while (i--) {
            callbacks[i](newValue, oldValue);
          }
          this.oldValue = newValue;
        };
        DirtyCheckProperty.prototype.isDirty = function isDirty() {
          return this.oldValue !== this.getValue();
        };
        DirtyCheckProperty.prototype.beginTracking = function beginTracking() {
          this.tracking = true;
          this.oldValue = this.newValue = this.getValue();
          this.dirtyChecker.addProperty(this);
        };
        DirtyCheckProperty.prototype.endTracking = function endTracking() {
          this.tracking = false;
          this.dirtyChecker.removeProperty(this);
        };
        DirtyCheckProperty.prototype.subscribe = function subscribe(callback) {
          var callbacks = this.callbacks,
              that = this;
          callbacks.push(callback);
          if (!this.tracking) {
            this.beginTracking();
          }
          return function() {
            callbacks.splice(callbacks.indexOf(callback), 1);
            if (callbacks.length === 0) {
              that.endTracking();
            }
          };
        };
        return DirtyCheckProperty;
      })();
      _export("DirtyCheckProperty", DirtyCheckProperty);
    }
  };
});

System.register("github:aurelia/binding@0.7.3/property-observation", ["npm:core-js@0.9.16"], function(_export) {
  'use strict';
  var core,
      SetterObserver,
      OoPropertyObserver,
      OoObjectObserver,
      UndefinedPropertyObserver;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }
  return {
    setters: [function(_coreJs) {
      core = _coreJs['default'];
    }],
    execute: function() {
      SetterObserver = (function() {
        function SetterObserver(taskQueue, obj, propertyName) {
          _classCallCheck(this, SetterObserver);
          this.taskQueue = taskQueue;
          this.obj = obj;
          this.propertyName = propertyName;
          this.callbacks = [];
          this.queued = false;
          this.observing = false;
        }
        SetterObserver.prototype.getValue = function getValue() {
          return this.obj[this.propertyName];
        };
        SetterObserver.prototype.setValue = function setValue(newValue) {
          this.obj[this.propertyName] = newValue;
        };
        SetterObserver.prototype.getterValue = function getterValue() {
          return this.currentValue;
        };
        SetterObserver.prototype.setterValue = function setterValue(newValue) {
          var oldValue = this.currentValue;
          if (oldValue !== newValue) {
            if (!this.queued) {
              this.oldValue = oldValue;
              this.queued = true;
              this.taskQueue.queueMicroTask(this);
            }
            this.currentValue = newValue;
          }
        };
        SetterObserver.prototype.call = function call() {
          var callbacks = this.callbacks,
              i = callbacks.length,
              oldValue = this.oldValue,
              newValue = this.currentValue;
          this.queued = false;
          while (i--) {
            callbacks[i](newValue, oldValue);
          }
        };
        SetterObserver.prototype.subscribe = function subscribe(callback) {
          var callbacks = this.callbacks;
          callbacks.push(callback);
          if (!this.observing) {
            this.convertProperty();
          }
          return function() {
            callbacks.splice(callbacks.indexOf(callback), 1);
          };
        };
        SetterObserver.prototype.convertProperty = function convertProperty() {
          this.observing = true;
          this.currentValue = this.obj[this.propertyName];
          this.setValue = this.setterValue;
          this.getValue = this.getterValue;
          try {
            Object.defineProperty(this.obj, this.propertyName, {
              configurable: true,
              enumerable: true,
              get: this.getValue.bind(this),
              set: this.setValue.bind(this)
            });
          } catch (_) {}
        };
        return SetterObserver;
      })();
      _export('SetterObserver', SetterObserver);
      OoPropertyObserver = (function() {
        function OoPropertyObserver(obj, propertyName, subscribe) {
          _classCallCheck(this, OoPropertyObserver);
          this.obj = obj;
          this.propertyName = propertyName;
          this.subscribe = subscribe;
        }
        OoPropertyObserver.prototype.getValue = function getValue() {
          return this.obj[this.propertyName];
        };
        OoPropertyObserver.prototype.setValue = function setValue(newValue) {
          this.obj[this.propertyName] = newValue;
        };
        return OoPropertyObserver;
      })();
      _export('OoPropertyObserver', OoPropertyObserver);
      OoObjectObserver = (function() {
        function OoObjectObserver(obj, observerLocator) {
          _classCallCheck(this, OoObjectObserver);
          this.obj = obj;
          this.observerLocator = observerLocator;
          this.observers = {};
          this.callbacks = {};
          this.callbackCount = 0;
        }
        OoObjectObserver.prototype.subscribe = function subscribe(propertyName, callback) {
          if (this.callbacks[propertyName]) {
            this.callbacks[propertyName].push(callback);
          } else {
            this.callbacks[propertyName] = [callback];
            this.callbacks[propertyName].oldValue = this.obj[propertyName];
          }
          if (this.callbackCount === 0) {
            this.handler = this.handleChanges.bind(this);
            try {
              Object.observe(this.obj, this.handler, ['update', 'add']);
            } catch (_) {}
          }
          this.callbackCount++;
          return this.unsubscribe.bind(this, propertyName, callback);
        };
        OoObjectObserver.prototype.unsubscribe = function unsubscribe(propertyName, callback) {
          var callbacks = this.callbacks[propertyName],
              index = callbacks.indexOf(callback);
          if (index === -1) {
            return ;
          }
          callbacks.splice(index, 1);
          if (callbacks.count = 0) {
            callbacks.oldValue = null;
            this.callbacks[propertyName] = null;
          }
          this.callbackCount--;
          if (this.callbackCount === 0) {
            try {
              Object.unobserve(this.obj, this.handler);
            } catch (_) {}
          }
        };
        OoObjectObserver.prototype.getObserver = function getObserver(propertyName, descriptor) {
          var propertyObserver = this.observers[propertyName];
          if (!propertyObserver) {
            if (descriptor) {
              propertyObserver = this.observers[propertyName] = new OoPropertyObserver(this.obj, propertyName, this.subscribe.bind(this, propertyName));
            } else {
              propertyObserver = this.observers[propertyName] = new UndefinedPropertyObserver(this, this.obj, propertyName);
            }
          }
          return propertyObserver;
        };
        OoObjectObserver.prototype.handleChanges = function handleChanges(changes) {
          var properties = {},
              i,
              ii,
              change,
              propertyName,
              oldValue,
              newValue,
              callbacks;
          for (i = 0, ii = changes.length; i < ii; i++) {
            change = changes[i];
            properties[change.name] = change;
          }
          for (name in properties) {
            callbacks = this.callbacks[name];
            if (!callbacks) {
              continue;
            }
            change = properties[name];
            newValue = change.object[name];
            oldValue = change.oldValue;
            for (i = 0, ii = callbacks.length; i < ii; i++) {
              callbacks[i](newValue, oldValue);
            }
          }
        };
        return OoObjectObserver;
      })();
      _export('OoObjectObserver', OoObjectObserver);
      UndefinedPropertyObserver = (function() {
        function UndefinedPropertyObserver(owner, obj, propertyName) {
          _classCallCheck(this, UndefinedPropertyObserver);
          this.owner = owner;
          this.obj = obj;
          this.propertyName = propertyName;
          this.callbackMap = new Map();
        }
        UndefinedPropertyObserver.prototype.getValue = function getValue() {
          if (this.actual) {
            return this.actual.getValue();
          }
          return this.obj[this.propertyName];
        };
        UndefinedPropertyObserver.prototype.setValue = function setValue(newValue) {
          if (this.actual) {
            this.actual.setValue(newValue);
            return ;
          }
          this.obj[this.propertyName] = newValue;
          this.trigger(newValue, undefined);
        };
        UndefinedPropertyObserver.prototype.trigger = function trigger(newValue, oldValue) {
          var callback;
          if (this.subscription) {
            this.subscription();
          }
          this.getObserver();
          for (var _iterator = this.callbackMap.keys(),
              _isArray = Array.isArray(_iterator),
              _i = 0,
              _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ; ) {
            if (_isArray) {
              if (_i >= _iterator.length)
                break;
              callback = _iterator[_i++];
            } else {
              _i = _iterator.next();
              if (_i.done)
                break;
              callback = _i.value;
            }
            callback(newValue, oldValue);
          }
        };
        UndefinedPropertyObserver.prototype.getObserver = function getObserver() {
          var callback,
              observerLocator;
          if (!Object.getOwnPropertyDescriptor(this.obj, this.propertyName)) {
            return ;
          }
          observerLocator = this.owner.observerLocator;
          delete this.owner.observers[this.propertyName];
          delete observerLocator.getOrCreateObserversLookup(this.obj, observerLocator)[this.propertyName];
          this.actual = observerLocator.getObserver(this.obj, this.propertyName);
          for (var _iterator2 = this.callbackMap.keys(),
              _isArray2 = Array.isArray(_iterator2),
              _i2 = 0,
              _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator](); ; ) {
            if (_isArray2) {
              if (_i2 >= _iterator2.length)
                break;
              callback = _iterator2[_i2++];
            } else {
              _i2 = _iterator2.next();
              if (_i2.done)
                break;
              callback = _i2.value;
            }
            this.callbackMap.set(callback, this.actual.subscribe(callback));
          }
        };
        UndefinedPropertyObserver.prototype.subscribe = function subscribe(callback) {
          var _this = this;
          if (!this.actual) {
            this.getObserver();
          }
          if (this.actual) {
            return this.actual.subscribe(callback);
          }
          if (!this.subscription) {
            this.subscription = this.owner.subscribe(this.propertyName, this.trigger.bind(this));
          }
          this.callbackMap.set(callback, null);
          return function() {
            var actualDispose = _this.callbackMap.get(callback);
            if (actualDispose)
              actualDispose();
            _this.callbackMap['delete'](callback);
          };
        };
        return UndefinedPropertyObserver;
      })();
      _export('UndefinedPropertyObserver', UndefinedPropertyObserver);
    }
  };
});

System.register("github:aurelia/binding@0.7.3/element-observation", [], function(_export) {
  'use strict';
  var XLinkAttributeObserver,
      DataAttributeObserver,
      StyleObserver,
      ValueAttributeObserver,
      SelectValueObserver,
      CheckedObserver;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }
  return {
    setters: [],
    execute: function() {
      XLinkAttributeObserver = (function() {
        function XLinkAttributeObserver(element, propertyName, attributeName) {
          _classCallCheck(this, XLinkAttributeObserver);
          this.element = element;
          this.propertyName = propertyName;
          this.attributeName = attributeName;
        }
        XLinkAttributeObserver.prototype.getValue = function getValue() {
          return this.element.getAttributeNS('http://www.w3.org/1999/xlink', this.attributeName);
        };
        XLinkAttributeObserver.prototype.setValue = function setValue(newValue) {
          return this.element.setAttributeNS('http://www.w3.org/1999/xlink', this.attributeName, newValue);
        };
        XLinkAttributeObserver.prototype.subscribe = function subscribe(callback) {
          throw new Error('Observation of a "' + this.element.nodeName + '" element\'s "' + this.propertyName + '" property is not supported.');
        };
        return XLinkAttributeObserver;
      })();
      _export('XLinkAttributeObserver', XLinkAttributeObserver);
      DataAttributeObserver = (function() {
        function DataAttributeObserver(element, propertyName) {
          _classCallCheck(this, DataAttributeObserver);
          this.element = element;
          this.propertyName = propertyName;
        }
        DataAttributeObserver.prototype.getValue = function getValue() {
          return this.element.getAttribute(this.propertyName);
        };
        DataAttributeObserver.prototype.setValue = function setValue(newValue) {
          return this.element.setAttribute(this.propertyName, newValue);
        };
        DataAttributeObserver.prototype.subscribe = function subscribe(callback) {
          throw new Error('Observation of a "' + this.element.nodeName + '" element\'s "' + this.propertyName + '" property is not supported.');
        };
        return DataAttributeObserver;
      })();
      _export('DataAttributeObserver', DataAttributeObserver);
      StyleObserver = (function() {
        function StyleObserver(element, propertyName) {
          _classCallCheck(this, StyleObserver);
          this.element = element;
          this.propertyName = propertyName;
        }
        StyleObserver.prototype.getValue = function getValue() {
          return this.element.style.cssText;
        };
        StyleObserver.prototype.setValue = function setValue(newValue) {
          if (newValue instanceof Object) {
            newValue = this.flattenCss(newValue);
          }
          this.element.style.cssText = newValue;
        };
        StyleObserver.prototype.subscribe = function subscribe(callback) {
          throw new Error('Observation of a "' + this.element.nodeName + '" element\'s "' + this.propertyName + '" property is not supported.');
        };
        StyleObserver.prototype.flattenCss = function flattenCss(object) {
          var s = '';
          for (var propertyName in object) {
            if (object.hasOwnProperty(propertyName)) {
              s += propertyName + ': ' + object[propertyName] + '; ';
            }
          }
          return s;
        };
        return StyleObserver;
      })();
      _export('StyleObserver', StyleObserver);
      ValueAttributeObserver = (function() {
        function ValueAttributeObserver(element, propertyName, handler) {
          _classCallCheck(this, ValueAttributeObserver);
          this.element = element;
          this.propertyName = propertyName;
          this.handler = handler;
          this.callbacks = [];
        }
        ValueAttributeObserver.prototype.getValue = function getValue() {
          return this.element[this.propertyName];
        };
        ValueAttributeObserver.prototype.setValue = function setValue(newValue) {
          this.element[this.propertyName] = newValue;
          this.call();
        };
        ValueAttributeObserver.prototype.call = function call() {
          var callbacks = this.callbacks,
              i = callbacks.length,
              oldValue = this.oldValue,
              newValue = this.getValue();
          while (i--) {
            callbacks[i](newValue, oldValue);
          }
          this.oldValue = newValue;
        };
        ValueAttributeObserver.prototype.subscribe = function subscribe(callback) {
          var that = this;
          if (!this.disposeHandler) {
            this.oldValue = this.getValue();
            this.disposeHandler = this.handler.subscribe(this.element, this.call.bind(this));
          }
          this.callbacks.push(callback);
          return this.unsubscribe.bind(this, callback);
        };
        ValueAttributeObserver.prototype.unsubscribe = function unsubscribe(callback) {
          var callbacks = this.callbacks;
          callbacks.splice(callbacks.indexOf(callback), 1);
          if (callbacks.length === 0) {
            this.disposeHandler();
            this.disposeHandler = null;
          }
        };
        return ValueAttributeObserver;
      })();
      _export('ValueAttributeObserver', ValueAttributeObserver);
      SelectValueObserver = (function() {
        function SelectValueObserver(element, handler, observerLocator) {
          _classCallCheck(this, SelectValueObserver);
          this.element = element;
          this.handler = handler;
          this.observerLocator = observerLocator;
        }
        SelectValueObserver.prototype.getValue = function getValue() {
          return this.value;
        };
        SelectValueObserver.prototype.setValue = function setValue(newValue) {
          var _this = this;
          if (newValue !== null && newValue !== undefined && this.element.multiple && !Array.isArray(newValue)) {
            throw new Error('Only null or Array instances can be bound to a multi-select.');
          }
          if (this.value === newValue) {
            return ;
          }
          if (this.arraySubscription) {
            this.arraySubscription();
            this.arraySubscription = null;
          }
          if (Array.isArray(newValue)) {
            this.arraySubscription = this.observerLocator.getArrayObserver(newValue).subscribe(this.synchronizeOptions.bind(this));
          }
          this.value = newValue;
          this.synchronizeOptions();
          if (this.element.options.length > 0 && !this.initialSync) {
            this.initialSync = true;
            this.observerLocator.taskQueue.queueMicroTask({call: function call() {
                return _this.synchronizeOptions();
              }});
          }
        };
        SelectValueObserver.prototype.synchronizeOptions = function synchronizeOptions() {
          var value = this.value,
              i,
              options,
              option,
              optionValue,
              clear,
              isArray;
          if (value === null || value === undefined) {
            clear = true;
          } else if (Array.isArray(value)) {
            isArray = true;
          }
          options = this.element.options;
          i = options.length;
          while (i--) {
            option = options.item(i);
            if (clear) {
              option.selected = false;
              continue;
            }
            optionValue = option.hasOwnProperty('model') ? option.model : option.value;
            if (isArray) {
              option.selected = value.indexOf(optionValue) !== -1;
              continue;
            }
            option.selected = value === optionValue;
          }
        };
        SelectValueObserver.prototype.synchronizeValue = function synchronizeValue() {
          var options = this.element.options,
              option,
              i,
              ii,
              count = 0,
              value = [];
          for (i = 0, ii = options.length; i < ii; i++) {
            option = options.item(i);
            if (!option.selected) {
              continue;
            }
            value[count] = option.hasOwnProperty('model') ? option.model : option.value;
            count++;
          }
          if (!this.element.multiple) {
            if (count === 0) {
              value = null;
            } else {
              value = value[0];
            }
          }
          this.oldValue = this.value;
          this.value = value;
          this.call();
        };
        SelectValueObserver.prototype.call = function call() {
          var callbacks = this.callbacks,
              i = callbacks.length,
              oldValue = this.oldValue,
              newValue = this.value;
          while (i--) {
            callbacks[i](newValue, oldValue);
          }
        };
        SelectValueObserver.prototype.subscribe = function subscribe(callback) {
          if (!this.callbacks) {
            this.callbacks = [];
            this.disposeHandler = this.handler.subscribe(this.element, this.synchronizeValue.bind(this, false));
          }
          this.callbacks.push(callback);
          return this.unsubscribe.bind(this, callback);
        };
        SelectValueObserver.prototype.unsubscribe = function unsubscribe(callback) {
          var callbacks = this.callbacks;
          callbacks.splice(callbacks.indexOf(callback), 1);
          if (callbacks.length === 0) {
            this.disposeHandler();
            this.disposeHandler = null;
            this.callbacks = null;
          }
        };
        SelectValueObserver.prototype.bind = function bind() {
          var _this2 = this;
          this.domObserver = new MutationObserver(function() {
            _this2.synchronizeOptions();
            _this2.synchronizeValue();
          });
          this.domObserver.observe(this.element, {
            childList: true,
            subtree: true
          });
        };
        SelectValueObserver.prototype.unbind = function unbind() {
          this.domObserver.disconnect();
          this.domObserver = null;
          if (this.arraySubscription) {
            this.arraySubscription();
            this.arraySubscription = null;
          }
        };
        return SelectValueObserver;
      })();
      _export('SelectValueObserver', SelectValueObserver);
      CheckedObserver = (function() {
        function CheckedObserver(element, handler, observerLocator) {
          _classCallCheck(this, CheckedObserver);
          this.element = element;
          this.handler = handler;
          this.observerLocator = observerLocator;
        }
        CheckedObserver.prototype.getValue = function getValue() {
          return this.value;
        };
        CheckedObserver.prototype.setValue = function setValue(newValue) {
          var _this3 = this;
          if (this.value === newValue) {
            return ;
          }
          if (this.arraySubscription) {
            this.arraySubscription();
            this.arraySubscription = null;
          }
          if (this.element.type === 'checkbox' && Array.isArray(newValue)) {
            this.arraySubscription = this.observerLocator.getArrayObserver(newValue).subscribe(this.synchronizeElement.bind(this));
          }
          this.value = newValue;
          this.synchronizeElement();
          if (!this.element.hasOwnProperty('model') && !this.initialSync) {
            this.initialSync = true;
            this.observerLocator.taskQueue.queueMicroTask({call: function call() {
                return _this3.synchronizeElement();
              }});
          }
        };
        CheckedObserver.prototype.synchronizeElement = function synchronizeElement() {
          var value = this.value,
              element = this.element,
              elementValue = element.hasOwnProperty('model') ? element.model : element.value,
              isRadio = element.type === 'radio';
          element.checked = isRadio && value === elementValue || !isRadio && value === true || !isRadio && Array.isArray(value) && value.indexOf(elementValue) !== -1;
        };
        CheckedObserver.prototype.synchronizeValue = function synchronizeValue() {
          var value = this.value,
              element = this.element,
              elementValue = element.hasOwnProperty('model') ? element.model : element.value,
              index;
          if (element.type === 'checkbox') {
            if (Array.isArray(value)) {
              index = value.indexOf(elementValue);
              if (element.checked && index === -1) {
                value.push(elementValue);
              } else if (!element.checked && index !== -1) {
                value.splice(index, 1);
              }
              return ;
            } else {
              value = element.checked;
            }
          } else if (element.checked) {
            value = elementValue;
          } else {
            return ;
          }
          this.oldValue = this.value;
          this.value = value;
          this.call();
        };
        CheckedObserver.prototype.call = function call() {
          var callbacks = this.callbacks,
              i = callbacks.length,
              oldValue = this.oldValue,
              newValue = this.value;
          while (i--) {
            callbacks[i](newValue, oldValue);
          }
        };
        CheckedObserver.prototype.subscribe = function subscribe(callback) {
          if (!this.callbacks) {
            this.callbacks = [];
            this.disposeHandler = this.handler.subscribe(this.element, this.synchronizeValue.bind(this, false));
          }
          this.callbacks.push(callback);
          return this.unsubscribe.bind(this, callback);
        };
        CheckedObserver.prototype.unsubscribe = function unsubscribe(callback) {
          var callbacks = this.callbacks;
          callbacks.splice(callbacks.indexOf(callback), 1);
          if (callbacks.length === 0) {
            this.disposeHandler();
            this.disposeHandler = null;
            this.callbacks = null;
          }
        };
        CheckedObserver.prototype.unbind = function unbind() {
          if (this.arraySubscription) {
            this.arraySubscription();
            this.arraySubscription = null;
          }
        };
        return CheckedObserver;
      })();
      _export('CheckedObserver', CheckedObserver);
    }
  };
});

System.register("github:aurelia/binding@0.7.3/class-observer", [], function(_export) {
  'use strict';
  var ClassObserver;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }
  return {
    setters: [],
    execute: function() {
      ClassObserver = (function() {
        function ClassObserver(element) {
          _classCallCheck(this, ClassObserver);
          this.element = element;
          this.doNotCache = true;
          this.value = '';
          this.version = 0;
        }
        ClassObserver.prototype.getValue = function getValue() {
          return this.value;
        };
        ClassObserver.prototype.setValue = function setValue(newValue) {
          var nameIndex = this.nameIndex || {},
              version = this.version,
              names,
              name,
              i;
          if (newValue !== null && newValue !== undefined && newValue.length) {
            names = newValue.split(' ');
            i = names.length;
            while (i--) {
              name = names[i];
              if (name === '') {
                continue;
              }
              nameIndex[name] = version;
              this.element.classList.add(name);
            }
          }
          this.value = newValue;
          this.nameIndex = nameIndex;
          this.version += 1;
          if (version === 0) {
            return ;
          }
          version -= 1;
          for (name in nameIndex) {
            if (!nameIndex.hasOwnProperty(name) || nameIndex[name] !== version) {
              continue;
            }
            this.element.classList.remove(name);
          }
        };
        ClassObserver.prototype.subscribe = function subscribe(callback) {
          throw new Error('Observation of a "' + this.element.nodeName + '" element\'s "class" property is not supported.');
        };
        return ClassObserver;
      })();
      _export('ClassObserver', ClassObserver);
    }
  };
});

System.register("github:aurelia/dependency-injection@0.8.1/metadata", ["npm:core-js@0.9.16"], function(_export) {
  'use strict';
  var core,
      TransientRegistration,
      SingletonRegistration,
      Resolver,
      Lazy,
      All,
      Optional,
      Parent,
      ClassActivator,
      FactoryActivator;
  var _createClass = (function() {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ('value' in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    return function(Constructor, protoProps, staticProps) {
      if (protoProps)
        defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        defineProperties(Constructor, staticProps);
      return Constructor;
    };
  })();
  function _inherits(subClass, superClass) {
    if (typeof superClass !== 'function' && superClass !== null) {
      throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }});
    if (superClass)
      subClass.__proto__ = superClass;
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }
  return {
    setters: [function(_coreJs) {
      core = _coreJs['default'];
    }],
    execute: function() {
      TransientRegistration = (function() {
        function TransientRegistration(key) {
          _classCallCheck(this, TransientRegistration);
          this.key = key;
        }
        TransientRegistration.prototype.register = function register(container, key, fn) {
          container.registerTransient(this.key || key, fn);
        };
        return TransientRegistration;
      })();
      _export('TransientRegistration', TransientRegistration);
      SingletonRegistration = (function() {
        function SingletonRegistration(keyOrRegisterInChild) {
          var registerInChild = arguments[1] === undefined ? false : arguments[1];
          _classCallCheck(this, SingletonRegistration);
          if (typeof keyOrRegisterInChild === 'boolean') {
            this.registerInChild = keyOrRegisterInChild;
          } else {
            this.key = keyOrRegisterInChild;
            this.registerInChild = registerInChild;
          }
        }
        SingletonRegistration.prototype.register = function register(container, key, fn) {
          var destination = this.registerInChild ? container : container.root;
          destination.registerSingleton(this.key || key, fn);
        };
        return SingletonRegistration;
      })();
      _export('SingletonRegistration', SingletonRegistration);
      Resolver = (function() {
        function Resolver() {
          _classCallCheck(this, Resolver);
        }
        Resolver.prototype.get = function get(container) {
          throw new Error('A custom Resolver must implement get(container) and return the resolved instance(s).');
        };
        return Resolver;
      })();
      _export('Resolver', Resolver);
      Lazy = (function(_Resolver) {
        function Lazy(key) {
          _classCallCheck(this, Lazy);
          _Resolver.call(this);
          this.key = key;
        }
        _inherits(Lazy, _Resolver);
        Lazy.prototype.get = function get(container) {
          var _this = this;
          return function() {
            return container.get(_this.key);
          };
        };
        Lazy.of = function of(key) {
          return new Lazy(key);
        };
        return Lazy;
      })(Resolver);
      _export('Lazy', Lazy);
      All = (function(_Resolver2) {
        function All(key) {
          _classCallCheck(this, All);
          _Resolver2.call(this);
          this.key = key;
        }
        _inherits(All, _Resolver2);
        All.prototype.get = function get(container) {
          return container.getAll(this.key);
        };
        All.of = function of(key) {
          return new All(key);
        };
        return All;
      })(Resolver);
      _export('All', All);
      Optional = (function(_Resolver3) {
        function Optional(key) {
          var checkParent = arguments[1] === undefined ? false : arguments[1];
          _classCallCheck(this, Optional);
          _Resolver3.call(this);
          this.key = key;
          this.checkParent = checkParent;
        }
        _inherits(Optional, _Resolver3);
        Optional.prototype.get = function get(container) {
          if (container.hasHandler(this.key, this.checkParent)) {
            return container.get(this.key);
          }
          return null;
        };
        Optional.of = function of(key) {
          var checkParent = arguments[1] === undefined ? false : arguments[1];
          return new Optional(key, checkParent);
        };
        return Optional;
      })(Resolver);
      _export('Optional', Optional);
      Parent = (function(_Resolver4) {
        function Parent(key) {
          _classCallCheck(this, Parent);
          _Resolver4.call(this);
          this.key = key;
        }
        _inherits(Parent, _Resolver4);
        Parent.prototype.get = function get(container) {
          return container.parent ? container.parent.get(this.key) : null;
        };
        Parent.of = function of(key) {
          return new Parent(key);
        };
        return Parent;
      })(Resolver);
      _export('Parent', Parent);
      ClassActivator = (function() {
        function ClassActivator() {
          _classCallCheck(this, ClassActivator);
        }
        ClassActivator.prototype.invoke = function invoke(fn, args) {
          return Reflect.construct(fn, args);
        };
        _createClass(ClassActivator, null, [{
          key: 'instance',
          value: new ClassActivator(),
          enumerable: true
        }]);
        return ClassActivator;
      })();
      _export('ClassActivator', ClassActivator);
      FactoryActivator = (function() {
        function FactoryActivator() {
          _classCallCheck(this, FactoryActivator);
        }
        FactoryActivator.prototype.invoke = function invoke(fn, args) {
          return fn.apply(undefined, args);
        };
        _createClass(FactoryActivator, null, [{
          key: 'instance',
          value: new FactoryActivator(),
          enumerable: true
        }]);
        return FactoryActivator;
      })();
      _export('FactoryActivator', FactoryActivator);
    }
  };
});

System.register("github:aurelia/logging@0.5.0/index", [], function(_export) {
  'use strict';
  var logLevel,
      loggers,
      currentLevel,
      appenders,
      slice,
      loggerConstructionKey,
      Logger;
  _export('AggregateError', AggregateError);
  _export('getLogger', getLogger);
  _export('addAppender', addAppender);
  _export('setLevel', setLevel);
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }
  function AggregateError(msg, inner, skipIfAlreadyAggregate) {
    if (inner) {
      if (inner.innerError && skipIfAlreadyAggregate) {
        return inner;
      }
      if (inner.stack) {
        msg += '\n------------------------------------------------\ninner error: ' + inner.stack;
      }
    }
    var err = new Error(msg);
    if (inner) {
      err.innerError = inner;
    }
    return err;
  }
  function log(logger, level, args) {
    var i = appenders.length,
        current;
    args = slice.call(args);
    args.unshift(logger);
    while (i--) {
      current = appenders[i];
      current[level].apply(current, args);
    }
  }
  function debug() {
    if (currentLevel < 4) {
      return ;
    }
    log(this, 'debug', arguments);
  }
  function info() {
    if (currentLevel < 3) {
      return ;
    }
    log(this, 'info', arguments);
  }
  function warn() {
    if (currentLevel < 2) {
      return ;
    }
    log(this, 'warn', arguments);
  }
  function error() {
    if (currentLevel < 1) {
      return ;
    }
    log(this, 'error', arguments);
  }
  function connectLogger(logger) {
    logger.debug = debug;
    logger.info = info;
    logger.warn = warn;
    logger.error = error;
  }
  function createLogger(id) {
    var logger = new Logger(id, loggerConstructionKey);
    if (appenders.length) {
      connectLogger(logger);
    }
    return logger;
  }
  function getLogger(id) {
    return loggers[id] || (loggers[id] = createLogger(id));
  }
  function addAppender(appender) {
    appenders.push(appender);
    if (appenders.length === 1) {
      for (var key in loggers) {
        connectLogger(loggers[key]);
      }
    }
  }
  function setLevel(level) {
    currentLevel = level;
  }
  return {
    setters: [],
    execute: function() {
      logLevel = {
        none: 0,
        error: 1,
        warn: 2,
        info: 3,
        debug: 4
      };
      _export('logLevel', logLevel);
      loggers = {};
      currentLevel = logLevel.none;
      appenders = [];
      slice = Array.prototype.slice;
      loggerConstructionKey = {};
      Logger = (function() {
        function Logger(id, key) {
          _classCallCheck(this, Logger);
          if (key !== loggerConstructionKey) {
            throw new Error('You cannot instantiate "Logger". Use the "getLogger" API instead.');
          }
          this.id = id;
        }
        Logger.prototype.debug = function debug() {};
        Logger.prototype.info = function info() {};
        Logger.prototype.warn = function warn() {};
        Logger.prototype.error = function error() {};
        return Logger;
      })();
      _export('Logger', Logger);
    }
  };
});

System.register("github:aurelia/binding@0.7.3/computed-observation", [], function(_export) {
  'use strict';
  var ComputedPropertyObserver;
  _export('hasDeclaredDependencies', hasDeclaredDependencies);
  _export('declarePropertyDependencies', declarePropertyDependencies);
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }
  function hasDeclaredDependencies(descriptor) {
    return descriptor && descriptor.get && !descriptor.set && descriptor.get.dependencies && descriptor.get.dependencies.length;
  }
  function declarePropertyDependencies(ctor, propertyName, dependencies) {
    var descriptor = Object.getOwnPropertyDescriptor(ctor.prototype, propertyName);
    if (descriptor.set)
      throw new Error('The property cannot have a setter function.');
    descriptor.get.dependencies = dependencies;
  }
  return {
    setters: [],
    execute: function() {
      ComputedPropertyObserver = (function() {
        function ComputedPropertyObserver(obj, propertyName, descriptor, observerLocator) {
          _classCallCheck(this, ComputedPropertyObserver);
          this.obj = obj;
          this.propertyName = propertyName;
          this.descriptor = descriptor;
          this.observerLocator = observerLocator;
          this.callbacks = [];
        }
        ComputedPropertyObserver.prototype.getValue = function getValue() {
          return this.obj[this.propertyName];
        };
        ComputedPropertyObserver.prototype.setValue = function setValue(newValue) {
          throw new Error('Computed properties cannot be assigned.');
        };
        ComputedPropertyObserver.prototype.trigger = function trigger(newValue, oldValue) {
          var callbacks = this.callbacks,
              i = callbacks.length;
          while (i--) {
            callbacks[i](newValue, oldValue);
          }
        };
        ComputedPropertyObserver.prototype.evaluate = function evaluate() {
          var newValue = this.getValue();
          if (this.oldValue === newValue)
            return ;
          this.trigger(newValue, this.oldValue);
          this.oldValue = newValue;
        };
        ComputedPropertyObserver.prototype.subscribe = function subscribe(callback) {
          var _this = this;
          var dependencies,
              i,
              ii;
          this.callbacks.push(callback);
          if (this.oldValue === undefined) {
            this.oldValue = this.getValue();
            this.subscriptions = [];
            dependencies = this.descriptor.get.dependencies;
            for (i = 0, ii = dependencies.length; i < ii; i++) {
              this.subscriptions.push(this.observerLocator.getObserver(this.obj, dependencies[i]).subscribe(function() {
                return _this.evaluate();
              }));
            }
          }
          return function() {
            _this.callbacks.splice(_this.callbacks.indexOf(callback), 1);
            if (_this.callbacks.length > 0)
              return ;
            while (_this.subscriptions.length) {
              _this.subscriptions.pop()();
            }
            _this.oldValue = undefined;
          };
        };
        return ComputedPropertyObserver;
      })();
      _export('ComputedPropertyObserver', ComputedPropertyObserver);
    }
  };
});

System.register("github:aurelia/binding@0.7.3/svg", [], function(_export) {
  'use strict';
  var elements,
      presentationElements,
      presentationAttributes;
  _export('isStandardSvgAttribute', isStandardSvgAttribute);
  function isStandardSvgAttribute(nodeName, attributeName) {
    return presentationElements[nodeName] && presentationAttributes[attributeName] || elements[nodeName] && elements[nodeName].indexOf(attributeName) !== -1;
  }
  function createElement(html) {
    var div = document.createElement('div');
    div.innerHTML = html;
    return div.firstChild;
  }
  return {
    setters: [],
    execute: function() {
      elements = {
        a: ['class', 'externalResourcesRequired', 'id', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'requiredExtensions', 'requiredFeatures', 'style', 'systemLanguage', 'target', 'transform', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space'],
        altGlyph: ['class', 'dx', 'dy', 'externalResourcesRequired', 'format', 'glyphRef', 'id', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'requiredExtensions', 'requiredFeatures', 'rotate', 'style', 'systemLanguage', 'x', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space', 'y'],
        altGlyphDef: ['id', 'xml:base', 'xml:lang', 'xml:space'],
        altGlyphItem: ['id', 'xml:base', 'xml:lang', 'xml:space'],
        animate: ['accumulate', 'additive', 'attributeName', 'attributeType', 'begin', 'by', 'calcMode', 'dur', 'end', 'externalResourcesRequired', 'fill', 'from', 'id', 'keySplines', 'keyTimes', 'max', 'min', 'onbegin', 'onend', 'onload', 'onrepeat', 'repeatCount', 'repeatDur', 'requiredExtensions', 'requiredFeatures', 'restart', 'systemLanguage', 'to', 'values', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space'],
        animateColor: ['accumulate', 'additive', 'attributeName', 'attributeType', 'begin', 'by', 'calcMode', 'dur', 'end', 'externalResourcesRequired', 'fill', 'from', 'id', 'keySplines', 'keyTimes', 'max', 'min', 'onbegin', 'onend', 'onload', 'onrepeat', 'repeatCount', 'repeatDur', 'requiredExtensions', 'requiredFeatures', 'restart', 'systemLanguage', 'to', 'values', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space'],
        animateMotion: ['accumulate', 'additive', 'begin', 'by', 'calcMode', 'dur', 'end', 'externalResourcesRequired', 'fill', 'from', 'id', 'keyPoints', 'keySplines', 'keyTimes', 'max', 'min', 'onbegin', 'onend', 'onload', 'onrepeat', 'origin', 'path', 'repeatCount', 'repeatDur', 'requiredExtensions', 'requiredFeatures', 'restart', 'rotate', 'systemLanguage', 'to', 'values', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space'],
        animateTransform: ['accumulate', 'additive', 'attributeName', 'attributeType', 'begin', 'by', 'calcMode', 'dur', 'end', 'externalResourcesRequired', 'fill', 'from', 'id', 'keySplines', 'keyTimes', 'max', 'min', 'onbegin', 'onend', 'onload', 'onrepeat', 'repeatCount', 'repeatDur', 'requiredExtensions', 'requiredFeatures', 'restart', 'systemLanguage', 'to', 'type', 'values', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space'],
        circle: ['class', 'cx', 'cy', 'externalResourcesRequired', 'id', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'r', 'requiredExtensions', 'requiredFeatures', 'style', 'systemLanguage', 'transform', 'xml:base', 'xml:lang', 'xml:space'],
        clipPath: ['class', 'clipPathUnits', 'externalResourcesRequired', 'id', 'requiredExtensions', 'requiredFeatures', 'style', 'systemLanguage', 'transform', 'xml:base', 'xml:lang', 'xml:space'],
        'color-profile': ['id', 'local', 'name', 'rendering-intent', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space'],
        cursor: ['externalResourcesRequired', 'id', 'requiredExtensions', 'requiredFeatures', 'systemLanguage', 'x', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space', 'y'],
        defs: ['class', 'externalResourcesRequired', 'id', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'requiredExtensions', 'requiredFeatures', 'style', 'systemLanguage', 'transform', 'xml:base', 'xml:lang', 'xml:space'],
        desc: ['class', 'id', 'style', 'xml:base', 'xml:lang', 'xml:space'],
        ellipse: ['class', 'cx', 'cy', 'externalResourcesRequired', 'id', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'requiredExtensions', 'requiredFeatures', 'rx', 'ry', 'style', 'systemLanguage', 'transform', 'xml:base', 'xml:lang', 'xml:space'],
        feBlend: ['class', 'height', 'id', 'in', 'in2', 'mode', 'result', 'style', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
        feColorMatrix: ['class', 'height', 'id', 'in', 'result', 'style', 'type', 'values', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
        feComponentTransfer: ['class', 'height', 'id', 'in', 'result', 'style', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
        feComposite: ['class', 'height', 'id', 'in', 'in2', 'k1', 'k2', 'k3', 'k4', 'operator', 'result', 'style', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
        feConvolveMatrix: ['bias', 'class', 'divisor', 'edgeMode', 'height', 'id', 'in', 'kernelMatrix', 'kernelUnitLength', 'order', 'preserveAlpha', 'result', 'style', 'targetX', 'targetY', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
        feDiffuseLighting: ['class', 'diffuseConstant', 'height', 'id', 'in', 'kernelUnitLength', 'result', 'style', 'surfaceScale', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
        feDisplacementMap: ['class', 'height', 'id', 'in', 'in2', 'result', 'scale', 'style', 'width', 'x', 'xChannelSelector', 'xml:base', 'xml:lang', 'xml:space', 'y', 'yChannelSelector'],
        feDistantLight: ['azimuth', 'elevation', 'id', 'xml:base', 'xml:lang', 'xml:space'],
        feFlood: ['class', 'height', 'id', 'result', 'style', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
        feFuncA: ['amplitude', 'exponent', 'id', 'intercept', 'offset', 'slope', 'tableValues', 'type', 'xml:base', 'xml:lang', 'xml:space'],
        feFuncB: ['amplitude', 'exponent', 'id', 'intercept', 'offset', 'slope', 'tableValues', 'type', 'xml:base', 'xml:lang', 'xml:space'],
        feFuncG: ['amplitude', 'exponent', 'id', 'intercept', 'offset', 'slope', 'tableValues', 'type', 'xml:base', 'xml:lang', 'xml:space'],
        feFuncR: ['amplitude', 'exponent', 'id', 'intercept', 'offset', 'slope', 'tableValues', 'type', 'xml:base', 'xml:lang', 'xml:space'],
        feGaussianBlur: ['class', 'height', 'id', 'in', 'result', 'stdDeviation', 'style', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
        feImage: ['class', 'externalResourcesRequired', 'height', 'id', 'preserveAspectRatio', 'result', 'style', 'width', 'x', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space', 'y'],
        feMerge: ['class', 'height', 'id', 'result', 'style', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
        feMergeNode: ['id', 'xml:base', 'xml:lang', 'xml:space'],
        feMorphology: ['class', 'height', 'id', 'in', 'operator', 'radius', 'result', 'style', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
        feOffset: ['class', 'dx', 'dy', 'height', 'id', 'in', 'result', 'style', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
        fePointLight: ['id', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y', 'z'],
        feSpecularLighting: ['class', 'height', 'id', 'in', 'kernelUnitLength', 'result', 'specularConstant', 'specularExponent', 'style', 'surfaceScale', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
        feSpotLight: ['id', 'limitingConeAngle', 'pointsAtX', 'pointsAtY', 'pointsAtZ', 'specularExponent', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y', 'z'],
        feTile: ['class', 'height', 'id', 'in', 'result', 'style', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
        feTurbulence: ['baseFrequency', 'class', 'height', 'id', 'numOctaves', 'result', 'seed', 'stitchTiles', 'style', 'type', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
        filter: ['class', 'externalResourcesRequired', 'filterRes', 'filterUnits', 'height', 'id', 'primitiveUnits', 'style', 'width', 'x', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space', 'y'],
        font: ['class', 'externalResourcesRequired', 'horiz-adv-x', 'horiz-origin-x', 'horiz-origin-y', 'id', 'style', 'vert-adv-y', 'vert-origin-x', 'vert-origin-y', 'xml:base', 'xml:lang', 'xml:space'],
        'font-face': ['accent-height', 'alphabetic', 'ascent', 'bbox', 'cap-height', 'descent', 'font-family', 'font-size', 'font-stretch', 'font-style', 'font-variant', 'font-weight', 'hanging', 'id', 'ideographic', 'mathematical', 'overline-position', 'overline-thickness', 'panose-1', 'slope', 'stemh', 'stemv', 'strikethrough-position', 'strikethrough-thickness', 'underline-position', 'underline-thickness', 'unicode-range', 'units-per-em', 'v-alphabetic', 'v-hanging', 'v-ideographic', 'v-mathematical', 'widths', 'x-height', 'xml:base', 'xml:lang', 'xml:space'],
        'font-face-format': ['id', 'string', 'xml:base', 'xml:lang', 'xml:space'],
        'font-face-name': ['id', 'name', 'xml:base', 'xml:lang', 'xml:space'],
        'font-face-src': ['id', 'xml:base', 'xml:lang', 'xml:space'],
        'font-face-uri': ['id', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space'],
        foreignObject: ['class', 'externalResourcesRequired', 'height', 'id', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'requiredExtensions', 'requiredFeatures', 'style', 'systemLanguage', 'transform', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
        g: ['class', 'externalResourcesRequired', 'id', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'requiredExtensions', 'requiredFeatures', 'style', 'systemLanguage', 'transform', 'xml:base', 'xml:lang', 'xml:space'],
        glyph: ['arabic-form', 'class', 'd', 'glyph-name', 'horiz-adv-x', 'id', 'lang', 'orientation', 'style', 'unicode', 'vert-adv-y', 'vert-origin-x', 'vert-origin-y', 'xml:base', 'xml:lang', 'xml:space'],
        glyphRef: ['class', 'dx', 'dy', 'format', 'glyphRef', 'id', 'style', 'x', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space', 'y'],
        hkern: ['g1', 'g2', 'id', 'k', 'u1', 'u2', 'xml:base', 'xml:lang', 'xml:space'],
        image: ['class', 'externalResourcesRequired', 'height', 'id', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'preserveAspectRatio', 'requiredExtensions', 'requiredFeatures', 'style', 'systemLanguage', 'transform', 'width', 'x', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space', 'y'],
        line: ['class', 'externalResourcesRequired', 'id', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'requiredExtensions', 'requiredFeatures', 'style', 'systemLanguage', 'transform', 'x1', 'x2', 'xml:base', 'xml:lang', 'xml:space', 'y1', 'y2'],
        linearGradient: ['class', 'externalResourcesRequired', 'gradientTransform', 'gradientUnits', 'id', 'spreadMethod', 'style', 'x1', 'x2', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space', 'y1', 'y2'],
        marker: ['class', 'externalResourcesRequired', 'id', 'markerHeight', 'markerUnits', 'markerWidth', 'orient', 'preserveAspectRatio', 'refX', 'refY', 'style', 'viewBox', 'xml:base', 'xml:lang', 'xml:space'],
        mask: ['class', 'externalResourcesRequired', 'height', 'id', 'maskContentUnits', 'maskUnits', 'requiredExtensions', 'requiredFeatures', 'style', 'systemLanguage', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
        metadata: ['id', 'xml:base', 'xml:lang', 'xml:space'],
        'missing-glyph': ['class', 'd', 'horiz-adv-x', 'id', 'style', 'vert-adv-y', 'vert-origin-x', 'vert-origin-y', 'xml:base', 'xml:lang', 'xml:space'],
        mpath: ['externalResourcesRequired', 'id', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space'],
        path: ['class', 'd', 'externalResourcesRequired', 'id', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'pathLength', 'requiredExtensions', 'requiredFeatures', 'style', 'systemLanguage', 'transform', 'xml:base', 'xml:lang', 'xml:space'],
        pattern: ['class', 'externalResourcesRequired', 'height', 'id', 'patternContentUnits', 'patternTransform', 'patternUnits', 'preserveAspectRatio', 'requiredExtensions', 'requiredFeatures', 'style', 'systemLanguage', 'viewBox', 'width', 'x', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space', 'y'],
        polygon: ['class', 'externalResourcesRequired', 'id', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'points', 'requiredExtensions', 'requiredFeatures', 'style', 'systemLanguage', 'transform', 'xml:base', 'xml:lang', 'xml:space'],
        polyline: ['class', 'externalResourcesRequired', 'id', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'points', 'requiredExtensions', 'requiredFeatures', 'style', 'systemLanguage', 'transform', 'xml:base', 'xml:lang', 'xml:space'],
        radialGradient: ['class', 'cx', 'cy', 'externalResourcesRequired', 'fx', 'fy', 'gradientTransform', 'gradientUnits', 'id', 'r', 'spreadMethod', 'style', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space'],
        rect: ['class', 'externalResourcesRequired', 'height', 'id', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'requiredExtensions', 'requiredFeatures', 'rx', 'ry', 'style', 'systemLanguage', 'transform', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
        script: ['externalResourcesRequired', 'id', 'type', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space'],
        set: ['attributeName', 'attributeType', 'begin', 'dur', 'end', 'externalResourcesRequired', 'fill', 'id', 'max', 'min', 'onbegin', 'onend', 'onload', 'onrepeat', 'repeatCount', 'repeatDur', 'requiredExtensions', 'requiredFeatures', 'restart', 'systemLanguage', 'to', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space'],
        stop: ['class', 'id', 'offset', 'style', 'xml:base', 'xml:lang', 'xml:space'],
        style: ['id', 'media', 'title', 'type', 'xml:base', 'xml:lang', 'xml:space'],
        svg: ['baseProfile', 'class', 'contentScriptType', 'contentStyleType', 'externalResourcesRequired', 'height', 'id', 'onabort', 'onactivate', 'onclick', 'onerror', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'onresize', 'onscroll', 'onunload', 'onzoom', 'preserveAspectRatio', 'requiredExtensions', 'requiredFeatures', 'style', 'systemLanguage', 'version', 'viewBox', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y', 'zoomAndPan'],
        'switch': ['class', 'externalResourcesRequired', 'id', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'requiredExtensions', 'requiredFeatures', 'style', 'systemLanguage', 'transform', 'xml:base', 'xml:lang', 'xml:space'],
        symbol: ['class', 'externalResourcesRequired', 'id', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'preserveAspectRatio', 'style', 'viewBox', 'xml:base', 'xml:lang', 'xml:space'],
        text: ['class', 'dx', 'dy', 'externalResourcesRequired', 'id', 'lengthAdjust', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'requiredExtensions', 'requiredFeatures', 'rotate', 'style', 'systemLanguage', 'textLength', 'transform', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
        textPath: ['class', 'externalResourcesRequired', 'id', 'lengthAdjust', 'method', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'requiredExtensions', 'requiredFeatures', 'spacing', 'startOffset', 'style', 'systemLanguage', 'textLength', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space'],
        title: ['class', 'id', 'style', 'xml:base', 'xml:lang', 'xml:space'],
        tref: ['class', 'dx', 'dy', 'externalResourcesRequired', 'id', 'lengthAdjust', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'requiredExtensions', 'requiredFeatures', 'rotate', 'style', 'systemLanguage', 'textLength', 'x', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space', 'y'],
        tspan: ['class', 'dx', 'dy', 'externalResourcesRequired', 'id', 'lengthAdjust', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'requiredExtensions', 'requiredFeatures', 'rotate', 'style', 'systemLanguage', 'textLength', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
        use: ['class', 'externalResourcesRequired', 'height', 'id', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'requiredExtensions', 'requiredFeatures', 'style', 'systemLanguage', 'transform', 'width', 'x', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space', 'y'],
        view: ['externalResourcesRequired', 'id', 'preserveAspectRatio', 'viewBox', 'viewTarget', 'xml:base', 'xml:lang', 'xml:space', 'zoomAndPan'],
        vkern: ['g1', 'g2', 'id', 'k', 'u1', 'u2', 'xml:base', 'xml:lang', 'xml:space']
      };
      _export('elements', elements);
      presentationElements = {
        'a': true,
        'altGlyph': true,
        'animate': true,
        'animateColor': true,
        'circle': true,
        'clipPath': true,
        'defs': true,
        'ellipse': true,
        'feBlend': true,
        'feColorMatrix': true,
        'feComponentTransfer': true,
        'feComposite': true,
        'feConvolveMatrix': true,
        'feDiffuseLighting': true,
        'feDisplacementMap': true,
        'feFlood': true,
        'feGaussianBlur': true,
        'feImage': true,
        'feMerge': true,
        'feMorphology': true,
        'feOffset': true,
        'feSpecularLighting': true,
        'feTile': true,
        'feTurbulence': true,
        'filter': true,
        'font': true,
        'foreignObject': true,
        'g': true,
        'glyph': true,
        'glyphRef': true,
        'image': true,
        'line': true,
        'linearGradient': true,
        'marker': true,
        'mask': true,
        'missing-glyph': true,
        'path': true,
        'pattern': true,
        'polygon': true,
        'polyline': true,
        'radialGradient': true,
        'rect': true,
        'stop': true,
        'svg': true,
        'switch': true,
        'symbol': true,
        'text': true,
        'textPath': true,
        'tref': true,
        'tspan': true,
        'use': true
      };
      _export('presentationElements', presentationElements);
      presentationAttributes = {
        'alignment-baseline': true,
        'baseline-shift': true,
        'clip-path': true,
        'clip-rule': true,
        'clip': true,
        'color-interpolation-filters': true,
        'color-interpolation': true,
        'color-profile': true,
        'color-rendering': true,
        'color': true,
        'cursor': true,
        'direction': true,
        'display': true,
        'dominant-baseline': true,
        'enable-background': true,
        'fill-opacity': true,
        'fill-rule': true,
        'fill': true,
        'filter': true,
        'flood-color': true,
        'flood-opacity': true,
        'font-family': true,
        'font-size-adjust': true,
        'font-size': true,
        'font-stretch': true,
        'font-style': true,
        'font-variant': true,
        'font-weight': true,
        'glyph-orientation-horizontal': true,
        'glyph-orientation-vertical': true,
        'image-rendering': true,
        'kerning': true,
        'letter-spacing': true,
        'lighting-color': true,
        'marker-end': true,
        'marker-mid': true,
        'marker-start': true,
        'mask': true,
        'opacity': true,
        'overflow': true,
        'pointer-events': true,
        'shape-rendering': true,
        'stop-color': true,
        'stop-opacity': true,
        'stroke-dasharray': true,
        'stroke-dashoffset': true,
        'stroke-linecap': true,
        'stroke-linejoin': true,
        'stroke-miterlimit': true,
        'stroke-opacity': true,
        'stroke-width': true,
        'stroke': true,
        'text-anchor': true,
        'text-decoration': true,
        'text-rendering': true,
        'unicode-bidi': true,
        'visibility': true,
        'word-spacing': true,
        'writing-mode': true
      };
      _export('presentationAttributes', presentationAttributes);
      if (createElement('<svg><altGlyph /></svg>').firstElementChild.nodeName === 'altglyph') {
        elements.altglyph = elements.altGlyph;
        delete elements.altGlyph;
        elements.altglyphdef = elements.altGlyphDef;
        delete elements.altGlyphDef;
        elements.altglyphitem = elements.altGlyphItem;
        delete elements.altGlyphItem;
        elements.glyphref = elements.glyphRef;
        delete elements.glyphRef;
      }
    }
  };
});

System.register("github:aurelia/binding@0.7.3/binding-modes", [], function(_export) {
  "use strict";
  var bindingMode;
  return {
    setters: [],
    execute: function() {
      bindingMode = {
        oneTime: 0,
        oneWay: 1,
        twoWay: 2
      };
      _export("bindingMode", bindingMode);
    }
  };
});

System.register("github:aurelia/binding@0.7.3/lexer", [], function(_export) {
  'use strict';
  var Token,
      Lexer,
      Scanner,
      OPERATORS,
      $EOF,
      $TAB,
      $LF,
      $VTAB,
      $FF,
      $CR,
      $SPACE,
      $BANG,
      $DQ,
      $$,
      $PERCENT,
      $AMPERSAND,
      $SQ,
      $LPAREN,
      $RPAREN,
      $STAR,
      $PLUS,
      $COMMA,
      $MINUS,
      $PERIOD,
      $SLASH,
      $COLON,
      $SEMICOLON,
      $LT,
      $EQ,
      $GT,
      $QUESTION,
      $0,
      $9,
      $A,
      $E,
      $Z,
      $LBRACKET,
      $BACKSLASH,
      $RBRACKET,
      $CARET,
      $_,
      $a,
      $e,
      $f,
      $n,
      $r,
      $t,
      $u,
      $v,
      $z,
      $LBRACE,
      $BAR,
      $RBRACE,
      $NBSP;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }
  function isWhitespace(code) {
    return code >= $TAB && code <= $SPACE || code === $NBSP;
  }
  function isIdentifierStart(code) {
    return $a <= code && code <= $z || $A <= code && code <= $Z || code === $_ || code === $$;
  }
  function isIdentifierPart(code) {
    return $a <= code && code <= $z || $A <= code && code <= $Z || $0 <= code && code <= $9 || code === $_ || code === $$;
  }
  function isDigit(code) {
    return $0 <= code && code <= $9;
  }
  function isExponentStart(code) {
    return code === $e || code === $E;
  }
  function isExponentSign(code) {
    return code === $MINUS || code === $PLUS;
  }
  function unescape(code) {
    switch (code) {
      case $n:
        return $LF;
      case $f:
        return $FF;
      case $r:
        return $CR;
      case $t:
        return $TAB;
      case $v:
        return $VTAB;
      default:
        return code;
    }
  }
  function assert(condition, message) {
    if (!condition) {
      throw message || 'Assertion failed';
    }
  }
  return {
    setters: [],
    execute: function() {
      Token = (function() {
        function Token(index, text) {
          _classCallCheck(this, Token);
          this.index = index;
          this.text = text;
        }
        Token.prototype.withOp = function withOp(op) {
          this.opKey = op;
          return this;
        };
        Token.prototype.withGetterSetter = function withGetterSetter(key) {
          this.key = key;
          return this;
        };
        Token.prototype.withValue = function withValue(value) {
          this.value = value;
          return this;
        };
        Token.prototype.toString = function toString() {
          return 'Token(' + this.text + ')';
        };
        return Token;
      })();
      _export('Token', Token);
      Lexer = (function() {
        function Lexer() {
          _classCallCheck(this, Lexer);
        }
        Lexer.prototype.lex = function lex(text) {
          var scanner = new Scanner(text);
          var tokens = [];
          var token = scanner.scanToken();
          while (token) {
            tokens.push(token);
            token = scanner.scanToken();
          }
          return tokens;
        };
        return Lexer;
      })();
      _export('Lexer', Lexer);
      Scanner = (function() {
        function Scanner(input) {
          _classCallCheck(this, Scanner);
          this.input = input;
          this.length = input.length;
          this.peek = 0;
          this.index = -1;
          this.advance();
        }
        Scanner.prototype.scanToken = function scanToken() {
          while (this.peek <= $SPACE) {
            if (++this.index >= this.length) {
              this.peek = $EOF;
              return null;
            } else {
              this.peek = this.input.charCodeAt(this.index);
            }
          }
          if (isIdentifierStart(this.peek)) {
            return this.scanIdentifier();
          }
          if (isDigit(this.peek)) {
            return this.scanNumber(this.index);
          }
          var start = this.index;
          switch (this.peek) {
            case $PERIOD:
              this.advance();
              return isDigit(this.peek) ? this.scanNumber(start) : new Token(start, '.');
            case $LPAREN:
            case $RPAREN:
            case $LBRACE:
            case $RBRACE:
            case $LBRACKET:
            case $RBRACKET:
            case $COMMA:
            case $COLON:
            case $SEMICOLON:
              return this.scanCharacter(start, String.fromCharCode(this.peek));
            case $SQ:
            case $DQ:
              return this.scanString();
            case $PLUS:
            case $MINUS:
            case $STAR:
            case $SLASH:
            case $PERCENT:
            case $CARET:
            case $QUESTION:
              return this.scanOperator(start, String.fromCharCode(this.peek));
            case $LT:
            case $GT:
            case $BANG:
            case $EQ:
              return this.scanComplexOperator(start, $EQ, String.fromCharCode(this.peek), '=');
            case $AMPERSAND:
              return this.scanComplexOperator(start, $AMPERSAND, '&', '&');
            case $BAR:
              return this.scanComplexOperator(start, $BAR, '|', '|');
            case $NBSP:
              while (isWhitespace(this.peek)) {
                this.advance();
              }
              return this.scanToken();
          }
          var character = String.fromCharCode(this.peek);
          this.error('Unexpected character [' + character + ']');
          return null;
        };
        Scanner.prototype.scanCharacter = function scanCharacter(start, text) {
          assert(this.peek === text.charCodeAt(0));
          this.advance();
          return new Token(start, text);
        };
        Scanner.prototype.scanOperator = function scanOperator(start, text) {
          assert(this.peek === text.charCodeAt(0));
          assert(OPERATORS.indexOf(text) !== -1);
          this.advance();
          return new Token(start, text).withOp(text);
        };
        Scanner.prototype.scanComplexOperator = function scanComplexOperator(start, code, one, two) {
          assert(this.peek === one.charCodeAt(0));
          this.advance();
          var text = one;
          if (this.peek === code) {
            this.advance();
            text += two;
          }
          if (this.peek === code) {
            this.advance();
            text += two;
          }
          assert(OPERATORS.indexOf(text) != -1);
          return new Token(start, text).withOp(text);
        };
        Scanner.prototype.scanIdentifier = function scanIdentifier() {
          assert(isIdentifierStart(this.peek));
          var start = this.index;
          this.advance();
          while (isIdentifierPart(this.peek)) {
            this.advance();
          }
          var text = this.input.substring(start, this.index);
          var result = new Token(start, text);
          if (OPERATORS.indexOf(text) !== -1) {
            result.withOp(text);
          } else {
            result.withGetterSetter(text);
          }
          return result;
        };
        Scanner.prototype.scanNumber = function scanNumber(start) {
          assert(isDigit(this.peek));
          var simple = this.index === start;
          this.advance();
          while (true) {
            if (isDigit(this.peek)) {} else if (this.peek === $PERIOD) {
              simple = false;
            } else if (isExponentStart(this.peek)) {
              this.advance();
              if (isExponentSign(this.peek)) {
                this.advance();
              }
              if (!isDigit(this.peek)) {
                this.error('Invalid exponent', -1);
              }
              simple = false;
            } else {
              break;
            }
            this.advance();
          }
          var text = this.input.substring(start, this.index);
          var value = simple ? parseInt(text) : parseFloat(text);
          return new Token(start, text).withValue(value);
        };
        Scanner.prototype.scanString = function scanString() {
          assert(this.peek === $SQ || this.peek === $DQ);
          var start = this.index;
          var quote = this.peek;
          this.advance();
          var buffer;
          var marker = this.index;
          while (this.peek !== quote) {
            if (this.peek === $BACKSLASH) {
              if (buffer === null) {
                buffer = [];
              }
              buffer.push(this.input.substring(marker, this.index));
              this.advance();
              var unescaped;
              if (this.peek === $u) {
                var hex = this.input.substring(this.index + 1, this.index + 5);
                if (!/[A-Z0-9]{4}/.test(hex)) {
                  this.error('Invalid unicode escape [\\u' + hex + ']');
                }
                unescaped = parseInt(hex, 16);
                for (var i = 0; i < 5; ++i) {
                  this.advance();
                }
              } else {
                unescaped = decodeURIComponent(this.peek);
                this.advance();
              }
              buffer.push(String.fromCharCode(unescaped));
              marker = this.index;
            } else if (this.peek === $EOF) {
              this.error('Unterminated quote');
            } else {
              this.advance();
            }
          }
          var last = this.input.substring(marker, this.index);
          this.advance();
          var text = this.input.substring(start, this.index);
          var unescaped = last;
          if (buffer != null) {
            buffer.push(last);
            unescaped = buffer.join('');
          }
          return new Token(start, text).withValue(unescaped);
        };
        Scanner.prototype.advance = function advance() {
          if (++this.index >= this.length) {
            this.peek = $EOF;
          } else {
            this.peek = this.input.charCodeAt(this.index);
          }
        };
        Scanner.prototype.error = function error(message) {
          var offset = arguments[1] === undefined ? 0 : arguments[1];
          var position = this.index + offset;
          throw new Error('Lexer Error: ' + message + ' at column ' + position + ' in expression [' + this.input + ']');
        };
        return Scanner;
      })();
      _export('Scanner', Scanner);
      OPERATORS = ['undefined', 'null', 'true', 'false', '+', '-', '*', '/', '%', '^', '=', '==', '===', '!=', '!==', '<', '>', '<=', '>=', '&&', '||', '&', '|', '!', '?'];
      $EOF = 0;
      $TAB = 9;
      $LF = 10;
      $VTAB = 11;
      $FF = 12;
      $CR = 13;
      $SPACE = 32;
      $BANG = 33;
      $DQ = 34;
      $$ = 36;
      $PERCENT = 37;
      $AMPERSAND = 38;
      $SQ = 39;
      $LPAREN = 40;
      $RPAREN = 41;
      $STAR = 42;
      $PLUS = 43;
      $COMMA = 44;
      $MINUS = 45;
      $PERIOD = 46;
      $SLASH = 47;
      $COLON = 58;
      $SEMICOLON = 59;
      $LT = 60;
      $EQ = 61;
      $GT = 62;
      $QUESTION = 63;
      $0 = 48;
      $9 = 57;
      $A = 65;
      $E = 69;
      $Z = 90;
      $LBRACKET = 91;
      $BACKSLASH = 92;
      $RBRACKET = 93;
      $CARET = 94;
      $_ = 95;
      $a = 97;
      $e = 101;
      $f = 102;
      $n = 110;
      $r = 114;
      $t = 116;
      $u = 117;
      $v = 118;
      $z = 122;
      $LBRACE = 123;
      $BAR = 124;
      $RBRACE = 125;
      $NBSP = 160;
    }
  };
});

System.register("github:aurelia/binding@0.7.3/path-observer", [], function(_export) {
  "use strict";
  var PathObserver;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  return {
    setters: [],
    execute: function() {
      PathObserver = (function() {
        function PathObserver(leftObserver, getRightObserver, value) {
          var _this = this;
          _classCallCheck(this, PathObserver);
          this.leftObserver = leftObserver;
          this.disposeLeft = leftObserver.subscribe(function(newValue) {
            var newRightValue = _this.updateRight(getRightObserver(newValue));
            _this.notify(newRightValue);
          });
          this.updateRight(getRightObserver(value));
        }
        PathObserver.prototype.updateRight = function updateRight(observer) {
          var _this2 = this;
          this.rightObserver = observer;
          if (this.disposeRight) {
            this.disposeRight();
          }
          if (!observer) {
            return null;
          }
          this.disposeRight = observer.subscribe(function(newValue) {
            return _this2.notify(newValue);
          });
          return observer.getValue();
        };
        PathObserver.prototype.subscribe = function subscribe(callback) {
          var that = this;
          that.callback = callback;
          return function() {
            that.callback = null;
          };
        };
        PathObserver.prototype.notify = function notify(newValue) {
          var callback = this.callback;
          if (callback) {
            callback(newValue);
          }
        };
        PathObserver.prototype.dispose = function dispose() {
          if (this.disposeLeft) {
            this.disposeLeft();
          }
          if (this.disposeRight) {
            this.disposeRight();
          }
        };
        return PathObserver;
      })();
      _export("PathObserver", PathObserver);
    }
  };
});

System.register("github:aurelia/binding@0.7.3/composite-observer", [], function(_export) {
  "use strict";
  var CompositeObserver;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  return {
    setters: [],
    execute: function() {
      CompositeObserver = (function() {
        function CompositeObserver(observers, evaluate) {
          var _this = this;
          _classCallCheck(this, CompositeObserver);
          this.subscriptions = new Array(observers.length);
          this.evaluate = evaluate;
          for (var i = 0,
              ii = observers.length; i < ii; i++) {
            this.subscriptions[i] = observers[i].subscribe(function(newValue) {
              _this.notify(_this.evaluate());
            });
          }
        }
        CompositeObserver.prototype.subscribe = function subscribe(callback) {
          var that = this;
          that.callback = callback;
          return function() {
            that.callback = null;
          };
        };
        CompositeObserver.prototype.notify = function notify(newValue) {
          var callback = this.callback;
          if (callback) {
            callback(newValue);
          }
        };
        CompositeObserver.prototype.dispose = function dispose() {
          var subscriptions = this.subscriptions;
          var i = subscriptions.length;
          while (i--) {
            subscriptions[i]();
          }
        };
        return CompositeObserver;
      })();
      _export("CompositeObserver", CompositeObserver);
    }
  };
});

System.register("github:aurelia/binding@0.7.3/access-keyed-observer", [], function(_export) {
  "use strict";
  var AccessKeyedObserver;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  return {
    setters: [],
    execute: function() {
      AccessKeyedObserver = (function() {
        function AccessKeyedObserver(objectInfo, keyInfo, observerLocator, evaluate) {
          var _this = this;
          _classCallCheck(this, AccessKeyedObserver);
          this.objectInfo = objectInfo;
          this.keyInfo = keyInfo;
          this.evaluate = evaluate;
          this.observerLocator = observerLocator;
          if (keyInfo.observer) {
            this.disposeKey = keyInfo.observer.subscribe(function(newValue) {
              return _this.objectOrKeyChanged(undefined, newValue);
            });
          }
          if (objectInfo.observer) {
            this.disposeObject = objectInfo.observer.subscribe(function(newValue) {
              return _this.objectOrKeyChanged(newValue);
            });
          }
          this.updatePropertySubscription(objectInfo.value, keyInfo.value);
        }
        AccessKeyedObserver.prototype.updatePropertySubscription = function updatePropertySubscription(object, key) {
          var _this2 = this;
          var callback;
          if (this.disposeProperty) {
            this.disposeProperty();
            this.disposeProperty = null;
          }
          if (object instanceof Object) {
            this.disposeProperty = this.observerLocator.getObserver(object, key).subscribe(function() {
              return _this2.notify();
            });
          }
        };
        AccessKeyedObserver.prototype.objectOrKeyChanged = function objectOrKeyChanged(object, key) {
          var oo,
              ko;
          object = object || ((oo = this.objectInfo.observer) && oo.getValue ? oo.getValue() : this.objectInfo.value);
          key = key || ((ko = this.keyInfo.observer) && ko.getValue ? ko.getValue() : this.keyInfo.value);
          this.updatePropertySubscription(object, key);
          this.notify();
        };
        AccessKeyedObserver.prototype.subscribe = function subscribe(callback) {
          var that = this;
          that.callback = callback;
          return function() {
            that.callback = null;
          };
        };
        AccessKeyedObserver.prototype.notify = function notify() {
          var callback = this.callback;
          if (callback) {
            callback(this.evaluate());
          }
        };
        AccessKeyedObserver.prototype.dispose = function dispose() {
          this.objectInfo = null;
          this.keyInfo = null;
          this.evaluate = null;
          this.observerLocator = null;
          if (this.disposeObject) {
            this.disposeObject();
          }
          if (this.disposeKey) {
            this.disposeKey();
          }
          if (this.disposeProperty) {
            this.disposeProperty();
          }
        };
        return AccessKeyedObserver;
      })();
      _export("AccessKeyedObserver", AccessKeyedObserver);
    }
  };
});

System.register("github:aurelia/binding@0.7.3/binding-expression", ["github:aurelia/binding@0.7.3/binding-modes"], function(_export) {
  'use strict';
  var bindingMode,
      BindingExpression,
      Binding;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }
  return {
    setters: [function(_bindingModes) {
      bindingMode = _bindingModes.bindingMode;
    }],
    execute: function() {
      BindingExpression = (function() {
        function BindingExpression(observerLocator, targetProperty, sourceExpression, mode, valueConverterLookupFunction, attribute) {
          _classCallCheck(this, BindingExpression);
          this.observerLocator = observerLocator;
          this.targetProperty = targetProperty;
          this.sourceExpression = sourceExpression;
          this.mode = mode;
          this.valueConverterLookupFunction = valueConverterLookupFunction;
          this.attribute = attribute;
          this.discrete = false;
        }
        BindingExpression.prototype.createBinding = function createBinding(target) {
          return new Binding(this.observerLocator, this.sourceExpression, target, this.targetProperty, this.mode, this.valueConverterLookupFunction);
        };
        return BindingExpression;
      })();
      _export('BindingExpression', BindingExpression);
      Binding = (function() {
        function Binding(observerLocator, sourceExpression, target, targetProperty, mode, valueConverterLookupFunction) {
          _classCallCheck(this, Binding);
          this.observerLocator = observerLocator;
          this.sourceExpression = sourceExpression;
          this.targetProperty = observerLocator.getObserver(target, targetProperty);
          this.mode = mode;
          this.valueConverterLookupFunction = valueConverterLookupFunction;
        }
        Binding.prototype.getObserver = function getObserver(obj, propertyName) {
          return this.observerLocator.getObserver(obj, propertyName);
        };
        Binding.prototype.bind = function bind(source) {
          var _this = this;
          var targetProperty = this.targetProperty,
              info;
          if ('bind' in targetProperty) {
            targetProperty.bind();
          }
          if (this.mode == bindingMode.oneWay || this.mode == bindingMode.twoWay) {
            if (this._disposeObserver) {
              if (this.source === source) {
                return ;
              }
              this.unbind();
            }
            info = this.sourceExpression.connect(this, source);
            if (info.observer) {
              this._disposeObserver = info.observer.subscribe(function(newValue) {
                var existing = targetProperty.getValue();
                if (newValue !== existing) {
                  targetProperty.setValue(newValue);
                }
              });
            }
            if (info.value !== undefined) {
              targetProperty.setValue(info.value);
            }
            if (this.mode == bindingMode.twoWay) {
              this._disposeListener = targetProperty.subscribe(function(newValue) {
                _this.sourceExpression.assign(source, newValue, _this.valueConverterLookupFunction);
              });
            }
            this.source = source;
          } else {
            var value = this.sourceExpression.evaluate(source, this.valueConverterLookupFunction);
            if (value !== undefined) {
              targetProperty.setValue(value);
            }
          }
        };
        Binding.prototype.unbind = function unbind() {
          if ('unbind' in this.targetProperty) {
            this.targetProperty.unbind();
          }
          if (this._disposeObserver) {
            this._disposeObserver();
            this._disposeObserver = null;
          }
          if (this._disposeListener) {
            this._disposeListener();
            this._disposeListener = null;
          }
        };
        return Binding;
      })();
    }
  };
});

System.register("github:aurelia/binding@0.7.3/listener-expression", [], function(_export) {
  "use strict";
  var ListenerExpression,
      Listener;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  return {
    setters: [],
    execute: function() {
      ListenerExpression = (function() {
        function ListenerExpression(eventManager, targetEvent, sourceExpression, delegate, preventDefault) {
          _classCallCheck(this, ListenerExpression);
          this.eventManager = eventManager;
          this.targetEvent = targetEvent;
          this.sourceExpression = sourceExpression;
          this.delegate = delegate;
          this.discrete = true;
          this.preventDefault = preventDefault;
        }
        ListenerExpression.prototype.createBinding = function createBinding(target) {
          return new Listener(this.eventManager, this.targetEvent, this.delegate, this.sourceExpression, target, this.preventDefault);
        };
        return ListenerExpression;
      })();
      _export("ListenerExpression", ListenerExpression);
      Listener = (function() {
        function Listener(eventManager, targetEvent, delegate, sourceExpression, target, preventDefault) {
          _classCallCheck(this, Listener);
          this.eventManager = eventManager;
          this.targetEvent = targetEvent;
          this.delegate = delegate;
          this.sourceExpression = sourceExpression;
          this.target = target;
          this.preventDefault = preventDefault;
        }
        Listener.prototype.bind = function bind(source) {
          var _this = this;
          if (this._disposeListener) {
            if (this.source === source) {
              return ;
            }
            this.unbind();
          }
          this.source = source;
          this._disposeListener = this.eventManager.addEventListener(this.target, this.targetEvent, function(event) {
            var prevEvent = source.$event;
            source.$event = event;
            var result = _this.sourceExpression.evaluate(source);
            source.$event = prevEvent;
            if (result !== true && _this.preventDefault) {
              event.preventDefault();
            }
            return result;
          }, this.delegate);
        };
        Listener.prototype.unbind = function unbind() {
          if (this._disposeListener) {
            this._disposeListener();
            this._disposeListener = null;
          }
        };
        return Listener;
      })();
    }
  };
});

System.register("github:aurelia/binding@0.7.3/name-expression", [], function(_export) {
  'use strict';
  var NameExpression,
      NameBinder;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }
  return {
    setters: [],
    execute: function() {
      NameExpression = (function() {
        function NameExpression(name, mode) {
          _classCallCheck(this, NameExpression);
          this.property = name;
          this.discrete = true;
          this.mode = mode;
        }
        NameExpression.prototype.createBinding = function createBinding(target) {
          return new NameBinder(this.property, target, this.mode);
        };
        return NameExpression;
      })();
      _export('NameExpression', NameExpression);
      NameBinder = (function() {
        function NameBinder(property, target, mode) {
          _classCallCheck(this, NameBinder);
          this.property = property;
          switch (mode) {
            case 'element':
              this.target = target;
              break;
            case 'view-model':
              this.target = target.primaryBehavior.executionContext;
              break;
            default:
              this.target = target[mode];
              if (this.target === undefined) {
                throw new Error('Attempted to reference "' + mode + '", but it was not found on the target element.');
              } else {
                this.target = this.target.executionContext || this.target;
              }
              break;
          }
        }
        NameBinder.prototype.bind = function bind(source) {
          if (this.source) {
            if (this.source === source) {
              return ;
            }
            this.unbind();
          }
          this.source = source;
          source[this.property] = this.target;
        };
        NameBinder.prototype.unbind = function unbind() {
          this.source[this.property] = null;
        };
        return NameBinder;
      })();
    }
  };
});

System.register("github:aurelia/binding@0.7.3/call-expression", [], function(_export) {
  "use strict";
  var CallExpression,
      Call;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  return {
    setters: [],
    execute: function() {
      CallExpression = (function() {
        function CallExpression(observerLocator, targetProperty, sourceExpression, valueConverterLookupFunction) {
          _classCallCheck(this, CallExpression);
          this.observerLocator = observerLocator;
          this.targetProperty = targetProperty;
          this.sourceExpression = sourceExpression;
          this.valueConverterLookupFunction = valueConverterLookupFunction;
        }
        CallExpression.prototype.createBinding = function createBinding(target) {
          return new Call(this.observerLocator, this.sourceExpression, target, this.targetProperty, this.valueConverterLookupFunction);
        };
        return CallExpression;
      })();
      _export("CallExpression", CallExpression);
      Call = (function() {
        function Call(observerLocator, sourceExpression, target, targetProperty, valueConverterLookupFunction) {
          _classCallCheck(this, Call);
          this.sourceExpression = sourceExpression;
          this.target = target;
          this.targetProperty = observerLocator.getObserver(target, targetProperty);
          this.valueConverterLookupFunction = valueConverterLookupFunction;
        }
        Call.prototype.bind = function bind(source) {
          var _this = this;
          if (this.source === source) {
            return ;
          }
          if (this.source) {
            this.unbind();
          }
          this.source = source;
          this.targetProperty.setValue(function($event) {
            var result,
                temp = source.$event;
            source.$event = $event;
            result = _this.sourceExpression.evaluate(source, _this.valueConverterLookupFunction);
            source.$event = temp;
            return result;
          });
        };
        Call.prototype.unbind = function unbind() {
          this.targetProperty.setValue(null);
        };
        return Call;
      })();
    }
  };
});

System.register("github:aurelia/validation@0.2.5/validation/utilities", [], function(_export) {
  var _classCallCheck,
      Utilities;
  return {
    setters: [],
    execute: function() {
      'use strict';
      _classCallCheck = function(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError('Cannot call a class as a function');
        }
      };
      Utilities = (function() {
        function Utilities() {
          _classCallCheck(this, Utilities);
        }
        Utilities.getValue = function getValue(val) {
          if (val !== undefined && typeof val === 'function') {
            return val();
          }
          return val;
        };
        Utilities.isEmptyValue = function isEmptyValue(val) {
          if (val === undefined) {
            return true;
          }
          if (val === null) {
            return true;
          }
          if (val === '') {
            return true;
          }
          if (typeof val === 'string') {
            if (String.prototype.trim) {
              val = val.trim();
            } else {
              val = val.replace(/^\s+|\s+$/g, '');
            }
          }
          if (val.length !== undefined) {
            return 0 === val.length;
          }
          return false;
        };
        return Utilities;
      })();
      _export('Utilities', Utilities);
      ;
    }
  };
});

System.register("github:aurelia/validation@0.2.5/validation/validation-rules-collection", ["github:aurelia/validation@0.2.5/validation/utilities", "github:aurelia/validation@0.2.5/validation/validation-locale"], function(_export) {
  var Utilities,
      ValidationLocale,
      _classCallCheck,
      ValidationRulesCollection,
      SwitchCaseValidationRulesCollection;
  return {
    setters: [function(_validationUtilities) {
      Utilities = _validationUtilities.Utilities;
    }, function(_validationValidationLocale) {
      ValidationLocale = _validationValidationLocale.ValidationLocale;
    }],
    execute: function() {
      'use strict';
      _classCallCheck = function(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError('Cannot call a class as a function');
        }
      };
      ValidationRulesCollection = (function() {
        function ValidationRulesCollection() {
          _classCallCheck(this, ValidationRulesCollection);
          this.isRequired = false;
          this.validationRules = [];
          this.validationCollections = [];
          this.isRequiredMessage = null;
        }
        ValidationRulesCollection.prototype.validate = function validate(newValue, locale) {
          var _this = this;
          if (locale === undefined) {
            locale = ValidationLocale.Repository['default'];
          }
          newValue = Utilities.getValue(newValue);
          var executeRules = true;
          if (Utilities.isEmptyValue(newValue)) {
            if (this.isRequired) {
              return Promise.resolve({
                isValid: false,
                message: this.isRequiredMessage ? typeof this.isRequiredMessage === 'function' ? this.isRequiredMessage(newValue) : this.isRequiredMessage : locale.translate('isRequired'),
                failingRule: 'isRequired',
                latestValue: newValue
              });
            } else {
              executeRules = false;
            }
          }
          var checks = Promise.resolve({
            isValid: true,
            message: '',
            failingRule: null,
            latestValue: newValue
          });
          if (executeRules) {
            var _loop = function(i) {
              var rule = _this.validationRules[i];
              checks = checks.then(function(previousRuleResult) {
                if (previousRuleResult.isValid === false) {
                  return previousRuleResult;
                } else {
                  return rule.validate(newValue, locale).then(function(thisRuleResult) {
                    if (thisRuleResult === false) {
                      return {
                        isValid: false,
                        message: rule.explain(),
                        failingRule: rule.ruleName,
                        latestValue: newValue
                      };
                    } else {
                      if (!previousRuleResult.isValid) {
                        throw Error('ValidationRulesCollection.validate caught an unexpected result while validating it\'s chain of rules.');
                      }
                      return previousRuleResult;
                    }
                  });
                }
              });
            };
            for (var i = 0; i < this.validationRules.length; i++) {
              _loop(i);
            }
          }
          var _loop2 = function(i) {
            var validationCollection = _this.validationCollections[i];
            checks = checks.then(function(previousValidationResult) {
              if (previousValidationResult.isValid)
                return validationCollection.validate(newValue, locale);
              else
                return previousValidationResult;
            });
          };
          for (var i = 0; i < this.validationCollections.length; i++) {
            _loop2(i);
          }
          return checks;
        };
        ValidationRulesCollection.prototype.addValidationRule = function addValidationRule(validationRule) {
          if (validationRule.validate === undefined)
            throw new Error('That\'s not a valid validationRule');
          this.validationRules.push(validationRule);
        };
        ValidationRulesCollection.prototype.addValidationRuleCollection = function addValidationRuleCollection(validationRulesCollection) {
          this.validationCollections.push(validationRulesCollection);
        };
        ValidationRulesCollection.prototype.isNotEmpty = function isNotEmpty() {
          this.isRequired = true;
        };
        ValidationRulesCollection.prototype.withMessage = function withMessage(message) {
          if (this.validationRules.length === 0)
            this.isRequiredMessage = message;
          else
            this.validationRules[this.validationRules.length - 1].withMessage(message);
        };
        return ValidationRulesCollection;
      })();
      _export('ValidationRulesCollection', ValidationRulesCollection);
      SwitchCaseValidationRulesCollection = (function() {
        function SwitchCaseValidationRulesCollection(conditionExpression) {
          _classCallCheck(this, SwitchCaseValidationRulesCollection);
          this.conditionExpression = conditionExpression;
          this.innerCollections = [];
          this.defaultCollection = new ValidationRulesCollection();
          this.caseLabel = '';
          this.defaultCaseLabel = {description: 'this is the case label for \'default\''};
        }
        SwitchCaseValidationRulesCollection.prototype['case'] = function _case(caseLabel) {
          this.caseLabel = caseLabel;
          this.getCurrentCollection(caseLabel, true);
        };
        SwitchCaseValidationRulesCollection.prototype['default'] = function _default() {
          this.caseLabel = this.defaultCaseLabel;
        };
        SwitchCaseValidationRulesCollection.prototype.getCurrentCollection = function getCurrentCollection(caseLabel) {
          var createIfNotExists = arguments[1] === undefined ? false : arguments[1];
          if (caseLabel === this.defaultCaseLabel) {
            return this.defaultCollection;
          }
          var currentCollection = null;
          for (var i = 0; i < this.innerCollections.length; i++) {
            currentCollection = this.innerCollections[i];
            if (currentCollection.caseLabel === caseLabel) {
              return currentCollection.collection;
            }
          }
          if (createIfNotExists) {
            currentCollection = {
              caseLabel: caseLabel,
              collection: new ValidationRulesCollection()
            };
            this.innerCollections.push(currentCollection);
            return currentCollection.collection;
          }
          return null;
        };
        SwitchCaseValidationRulesCollection.prototype.validate = function validate(newValue, locale) {
          var collection = this.getCurrentCollection(this.conditionExpression(newValue));
          if (collection !== null) {
            return collection.validate(newValue, locale);
          } else {
            return this.defaultCollection.validate(newValue, locale);
          }
        };
        SwitchCaseValidationRulesCollection.prototype.addValidationRule = function addValidationRule(validationRule) {
          var currentCollection = this.getCurrentCollection(this.caseLabel, true);
          currentCollection.addValidationRule(validationRule);
        };
        SwitchCaseValidationRulesCollection.prototype.addValidationRuleCollection = function addValidationRuleCollection(validationRulesCollection) {
          var currentCollection = this.getCurrentCollection(this.caseLabel, true);
          currentCollection.addValidationRuleCollection(validationRulesCollection);
        };
        SwitchCaseValidationRulesCollection.prototype.isNotEmpty = function isNotEmpty() {
          var collection = this.getCurrentCollection(this.caseLabel);
          if (collection !== null)
            collection.isNotEmpty();
          else
            this.defaultCollection.isNotEmpty();
        };
        SwitchCaseValidationRulesCollection.prototype.withMessage = function withMessage(message) {
          var collection = this.getCurrentCollection(this.caseLabel);
          if (collection !== null)
            collection.withMessage(message);
          else
            this.defaultCollection.withMessage(message);
        };
        return SwitchCaseValidationRulesCollection;
      })();
      _export('SwitchCaseValidationRulesCollection', SwitchCaseValidationRulesCollection);
    }
  };
});

System.register("github:aurelia/validation@0.2.5/validation/path-observer", ["github:aurelia/binding@0.7.3"], function(_export) {
  var ObserverLocator,
      _classCallCheck,
      PathObserver;
  return {
    setters: [function(_aureliaBinding) {
      ObserverLocator = _aureliaBinding.ObserverLocator;
    }],
    execute: function() {
      'use strict';
      _classCallCheck = function(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError('Cannot call a class as a function');
        }
      };
      PathObserver = (function() {
        function PathObserver(observerLocator, subject, path) {
          _classCallCheck(this, PathObserver);
          this.observerLocator = observerLocator;
          this.path = path.split('.');
          this.subject = subject;
          this.observers = [];
          this.callbacks = [];
          if (this.path.length > 1)
            this.observeParts();
        }
        PathObserver.prototype.observeParts = function observeParts(propertyName) {
          var _this = this;
          if (propertyName !== undefined && propertyName !== null) {
            for (var i = this.observers.length - 1; i >= 0; i--) {
              var currentObserver = this.observers[i];
              if (currentObserver.propertyName === propertyName) {
                break;
              }
              var observer = this.observers.pop();
              if (observer && observer.subscription) {
                observer.subscription();
              }
            }
          }
          var currentSubject = this.subject;
          var observersAreComplete = this.observers.length === this.path.length;
          var _loop = function(i) {
            var observer = _this.observers[i];
            if (!observer) {
              var currentPath = _this.path[i];
              observer = _this.observerLocator.getObserver(currentSubject, currentPath);
              _this.observers.push(observer);
              var subscription = observer.subscribe(function(newValue, oldValue) {
                _this.observeParts(observer.propertyName);
              });
              observer.subscription = subscription;
            }
            var currentValue = observer.getValue();
            if (currentValue === undefined || currentValue === null) {
              return 'break';
            } else {
              currentSubject = currentValue;
            }
          };
          for (var i = 0; i < this.path.length; i++) {
            var _ret = _loop(i);
            if (_ret === 'break')
              break;
          }
          if (!observersAreComplete && this.observers.length === this.path.length) {
            var actualObserver = this.observers[this.observers.length - 1];
            for (var i = 0; i < this.callbacks.length; i++) {
              actualObserver.subscribe(this.callbacks[i]);
            }
          }
        };
        PathObserver.prototype.observePart = function observePart(part) {
          if (part !== this.path[this.path.length - 1]) {
            this.observeParts();
          }
        };
        PathObserver.prototype.getObserver = function getObserver() {
          if (this.path.length == 1) {
            var resolve = this.subject[this.path[0]];
            return this.observerLocator.getObserver(this.subject, this.path[0]);
          }
          return this;
        };
        PathObserver.prototype.getValue = function getValue() {
          var expectedSubject = this.subject;
          for (var i = 0; this.path.length; i++) {
            var currentObserver = this.observers[i];
            if (currentObserver === null || currentObserver === undefined) {
              this.observeParts(this.path[i]);
              currentObserver = this.observers[i];
              if (currentObserver === null || currentObserver === undefined) {
                break;
              }
            }
            if (currentObserver.obj !== expectedSubject) {
              this.observeParts(this.path[i - 1]);
              break;
            }
            expectedSubject = currentObserver.getValue();
          }
          if (this.observers.length !== this.path.length) {
            return undefined;
          }
          var value = this.observers[this.observers.length - 1].getValue();
          return value;
        };
        PathObserver.prototype.subscribe = function subscribe(callback) {
          this.callbacks.unshift(callback);
          if (this.observers.length === this.path.length) {
            return this.observers[this.observers.length - 1].subscribe(callback);
          }
        };
        return PathObserver;
      })();
      _export('PathObserver', PathObserver);
    }
  };
});

System.register("github:aurelia/validation@0.2.5/validation/debouncer", ["github:aurelia/validation@0.2.5/validation/validation"], function(_export) {
  var Validation,
      _classCallCheck,
      Debouncer;
  return {
    setters: [function(_validationValidation) {
      Validation = _validationValidation.Validation;
    }],
    execute: function() {
      'use strict';
      _classCallCheck = function(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError('Cannot call a class as a function');
        }
      };
      Debouncer = (function() {
        function Debouncer(debounceTimeout) {
          _classCallCheck(this, Debouncer);
          this.currentFunction = null;
          this.debounceTimeout = debounceTimeout;
        }
        Debouncer.prototype.debounce = function debounce(func) {
          var _this = this;
          this.currentFunction = func;
          setTimeout(function() {
            if (func !== null && func !== undefined) {
              if (func === _this.currentFunction) {
                _this.currentFunction = null;
                func();
              }
            }
          }, this.debounceTimeout);
        };
        return Debouncer;
      })();
      _export('Debouncer', Debouncer);
    }
  };
});

System.register("github:aurelia/validation@0.2.5/validation/validation-result", [], function(_export) {
  var _classCallCheck,
      ValidationResult,
      ValidationResultProperty;
  return {
    setters: [],
    execute: function() {
      'use strict';
      _classCallCheck = function(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError('Cannot call a class as a function');
        }
      };
      ValidationResult = (function() {
        function ValidationResult() {
          _classCallCheck(this, ValidationResult);
          this.isValid = true;
          this.properties = {};
        }
        ValidationResult.prototype.addProperty = function addProperty(name) {
          if (!this.properties[name]) {
            this.properties[name] = new ValidationResultProperty(this);
          }
          return this.properties[name];
        };
        ValidationResult.prototype.checkValidity = function checkValidity() {
          for (var propertyName in this.properties) {
            if (!this.properties[propertyName].isValid) {
              this.isValid = false;
              return ;
            }
          }
          this.isValid = true;
        };
        ValidationResult.prototype.clear = function clear() {
          this.isValid = true;
        };
        return ValidationResult;
      })();
      _export('ValidationResult', ValidationResult);
      ValidationResultProperty = (function() {
        function ValidationResultProperty(group) {
          _classCallCheck(this, ValidationResultProperty);
          this.group = group;
          this.onValidateCallbacks = [];
          this.clear();
        }
        ValidationResultProperty.prototype.clear = function clear() {
          this.isValid = true;
          this.isDirty = false;
          this.message = '';
          this.failingRule = null;
          this.latestValue = null;
          this.notifyObserversOfChange();
        };
        ValidationResultProperty.prototype.onValidate = function onValidate(onValidateCallback) {
          this.onValidateCallbacks.push(onValidateCallback);
        };
        ValidationResultProperty.prototype.notifyObserversOfChange = function notifyObserversOfChange() {
          for (var i = 0; i < this.onValidateCallbacks.length; i++) {
            var callback = this.onValidateCallbacks[i];
            callback(this);
          }
        };
        ValidationResultProperty.prototype.setValidity = function setValidity(validationResponse, shouldBeDirty) {
          var notifyObservers = !this.isDirty && shouldBeDirty || this.isValid !== validationResponse.isValid || this.message !== validationResponse.message;
          if (shouldBeDirty)
            this.isDirty = true;
          this.message = validationResponse.message;
          this.failingRule = validationResponse.failingRule;
          this.isValid = validationResponse.isValid;
          this.latestValue = validationResponse.latestValue;
          if (this.isValid !== this.group.isValid)
            this.group.checkValidity();
          if (notifyObservers) {
            this.notifyObserversOfChange();
          }
        };
        return ValidationResultProperty;
      })();
      _export('ValidationResultProperty', ValidationResultProperty);
    }
  };
});

System.register("github:aurelia/path@0.7.0/index", [], function(_export) {
  'use strict';
  var r20,
      rbracket,
      class2type;
  _export('relativeToFile', relativeToFile);
  _export('join', join);
  _export('buildQueryString', buildQueryString);
  function trimDots(ary) {
    var i,
        part;
    for (i = 0; i < ary.length; ++i) {
      part = ary[i];
      if (part === '.') {
        ary.splice(i, 1);
        i -= 1;
      } else if (part === '..') {
        if (i === 0 || i == 1 && ary[2] === '..' || ary[i - 1] === '..') {
          continue;
        } else if (i > 0) {
          ary.splice(i - 1, 2);
          i -= 2;
        }
      }
    }
  }
  function relativeToFile(name, file) {
    var lastIndex,
        normalizedBaseParts,
        fileParts = file && file.split('/');
    name = name.trim();
    name = name.split('/');
    if (name[0].charAt(0) === '.' && fileParts) {
      normalizedBaseParts = fileParts.slice(0, fileParts.length - 1);
      name = normalizedBaseParts.concat(name);
    }
    trimDots(name);
    return name.join('/');
  }
  function join(path1, path2) {
    var url1,
        url2,
        url3,
        i,
        ii,
        urlPrefix,
        trailingSlash;
    if (!path1) {
      return path2;
    }
    if (!path2) {
      return path1;
    }
    urlPrefix = path1.indexOf('//') === 0 ? '//' : path1.indexOf('/') === 0 ? '/' : '';
    trailingSlash = path2.slice(-1) == '/' ? '/' : '';
    url1 = path1.split('/');
    url2 = path2.split('/');
    url3 = [];
    for (i = 0, ii = url1.length; i < ii; ++i) {
      if (url1[i] == '..') {
        url3.pop();
      } else if (url1[i] == '.' || url1[i] == '') {
        continue;
      } else {
        url3.push(url1[i]);
      }
    }
    for (i = 0, ii = url2.length; i < ii; ++i) {
      if (url2[i] == '..') {
        url3.pop();
      } else if (url2[i] == '.' || url2[i] == '') {
        continue;
      } else {
        url3.push(url2[i]);
      }
    }
    return urlPrefix + url3.join('/').replace(/\:\//g, '://') + trailingSlash;
  }
  function type(obj) {
    if (obj == null) {
      return obj + '';
    }
    return typeof obj === 'object' || typeof obj === 'function' ? class2type[toString.call(obj)] || 'object' : typeof obj;
  }
  function buildQueryString(a, traditional) {
    var prefix,
        s = [],
        add = function add(key, value) {
          value = typeof value === 'function' ? value() : value == null ? '' : value;
          s[s.length] = encodeURIComponent(key) + '=' + encodeURIComponent(value);
        };
    for (prefix in a) {
      _buildQueryString(prefix, a[prefix], traditional, add);
    }
    return s.join('&').replace(r20, '+');
  }
  function _buildQueryString(prefix, obj, traditional, add) {
    var name;
    if (Array.isArray(obj)) {
      obj.forEach(function(v, i) {
        if (traditional || rbracket.test(prefix)) {
          add(prefix, v);
        } else {
          _buildQueryString(prefix + '[' + (typeof v === 'object' ? i : '') + ']', v, traditional, add);
        }
      });
    } else if (!traditional && type(obj) === 'object') {
      for (name in obj) {
        _buildQueryString(prefix + '[' + name + ']', obj[name], traditional, add);
      }
    } else {
      add(prefix, obj);
    }
  }
  return {
    setters: [],
    execute: function() {
      r20 = /%20/g;
      rbracket = /\[\]$/;
      class2type = {};
      'Boolean Number String Function Array Date RegExp Object Error'.split(' ').forEach(function(name, i) {
        class2type['[object ' + name + ']'] = name.toLowerCase();
      });
    }
  };
});

System.register("github:aurelia/loader@0.7.0/template-registry-entry", ["github:aurelia/path@0.7.0"], function(_export) {
  'use strict';
  var relativeToFile,
      TemplateDependency,
      TemplateRegistryEntry;
  var _createClass = (function() {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ('value' in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    return function(Constructor, protoProps, staticProps) {
      if (protoProps)
        defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        defineProperties(Constructor, staticProps);
      return Constructor;
    };
  })();
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }
  return {
    setters: [function(_aureliaPath) {
      relativeToFile = _aureliaPath.relativeToFile;
    }],
    execute: function() {
      TemplateDependency = function TemplateDependency(src, name) {
        _classCallCheck(this, TemplateDependency);
        this.src = src;
        this.name = name;
      };
      _export('TemplateDependency', TemplateDependency);
      TemplateRegistryEntry = (function() {
        function TemplateRegistryEntry(id) {
          _classCallCheck(this, TemplateRegistryEntry);
          this.id = id;
          this.template = null;
          this.dependencies = null;
          this.resources = null;
          this.factory = null;
        }
        TemplateRegistryEntry.prototype.setTemplate = function setTemplate(template) {
          var id = this.id,
              useResources,
              i,
              ii,
              current,
              src;
          this.template = template;
          useResources = template.content.querySelectorAll('require');
          this.dependencies = new Array(useResources.length);
          if (useResources.length === 0) {
            return ;
          }
          for (i = 0, ii = useResources.length; i < ii; ++i) {
            current = useResources[i];
            src = current.getAttribute('from');
            if (!src) {
              throw new Error('<require> element in ' + this.id + ' has no "from" attribute.');
            }
            this.dependencies[i] = new TemplateDependency(relativeToFile(src, id), current.getAttribute('as'));
            if (current.parentNode) {
              current.parentNode.removeChild(current);
            }
          }
        };
        TemplateRegistryEntry.prototype.setResources = function setResources(resources) {
          this.resources = resources;
        };
        TemplateRegistryEntry.prototype.setFactory = function setFactory(factory) {
          this.factory = factory;
        };
        _createClass(TemplateRegistryEntry, [{
          key: 'templateIsLoaded',
          get: function() {
            return this.template !== null;
          }
        }, {
          key: 'isReady',
          get: function() {
            return this.factory !== null;
          }
        }]);
        return TemplateRegistryEntry;
      })();
      _export('TemplateRegistryEntry', TemplateRegistryEntry);
    }
  };
});

System.register("github:aurelia/loader@0.7.0/loader", ["npm:core-js@0.9.16", "github:aurelia/loader@0.7.0/template-registry-entry"], function(_export) {
  'use strict';
  var core,
      TemplateRegistryEntry,
      hasTemplateElement,
      Loader;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }
  function importElements(frag, link, callback) {
    if (frag) {
      document.head.appendChild(frag);
    }
    if (window.Polymer && Polymer.whenReady) {
      Polymer.whenReady(callback);
    } else {
      link.addEventListener('load', callback);
    }
  }
  return {
    setters: [function(_coreJs) {
      core = _coreJs['default'];
    }, function(_templateRegistryEntry) {
      TemplateRegistryEntry = _templateRegistryEntry.TemplateRegistryEntry;
    }],
    execute: function() {
      hasTemplateElement = 'content' in document.createElement('template');
      Loader = (function() {
        function Loader() {
          _classCallCheck(this, Loader);
          this.templateRegistry = {};
        }
        Loader.prototype.loadModule = function loadModule(id) {
          throw new Error('Loaders must implement loadModule(id).');
        };
        Loader.prototype.loadAllModules = function loadAllModules(ids) {
          throw new Error('Loader must implement loadAllModules(ids).');
        };
        Loader.prototype.loadTemplate = function loadTemplate(url) {
          throw new Error('Loader must implement loadTemplate(url).');
        };
        Loader.prototype.loadText = function loadText(url) {
          throw new Error('Loader must implement loadText(url).');
        };
        Loader.prototype.getOrCreateTemplateRegistryEntry = function getOrCreateTemplateRegistryEntry(id) {
          var entry = this.templateRegistry[id];
          if (entry === undefined) {
            this.templateRegistry[id] = entry = new TemplateRegistryEntry(id);
          }
          return entry;
        };
        Loader.prototype.importDocument = function importDocument(url) {
          return new Promise(function(resolve, reject) {
            var frag = document.createDocumentFragment();
            var link = document.createElement('link');
            link.rel = 'import';
            link.href = url;
            frag.appendChild(link);
            importElements(frag, link, function() {
              return resolve(link['import']);
            });
          });
        };
        Loader.prototype.importBundle = function importBundle(link) {
          return new Promise(function(resolve, reject) {
            if (link['import']) {
              if (!hasTemplateElement) {
                HTMLTemplateElement.bootstrap(link['import']);
              }
              resolve(link['import']);
            } else {
              importElements(null, link, function() {
                if (!hasTemplateElement) {
                  HTMLTemplateElement.bootstrap(link['import']);
                }
                resolve(link['import']);
              });
            }
          });
        };
        Loader.prototype.importTemplate = function importTemplate(url) {
          var _this = this;
          return this.importDocument(url).then(function(doc) {
            return _this.findTemplate(doc, url);
          });
        };
        Loader.prototype.findTemplate = function findTemplate(doc, url) {
          if (!hasTemplateElement) {
            HTMLTemplateElement.bootstrap(doc);
          }
          var template = doc.getElementsByTagName('template')[0];
          if (!template) {
            throw new Error('There was no template element found in \'' + url + '\'.');
          }
          return template;
        };
        Loader.prototype.findBundledTemplate = function findBundledTemplate(name, entry) {
          var _this2 = this;
          if (this.bundle) {
            var found = this.bundle.getElementById(name);
            if (found) {
              entry.setTemplate(found);
              return Promise.resolve(true);
            }
          } else if (!this.bundleChecked) {
            this.bundleChecked = true;
            var bundleLink = document.querySelector('link[aurelia-view-bundle]');
            if (bundleLink) {
              return this.importBundle(bundleLink).then(function(doc) {
                _this2.bundle = doc;
                var found = _this2.bundle.getElementById(name);
                if (found) {
                  entry.setTemplate(found);
                  return Promise.resolve(true);
                }
              });
            }
          }
          return Promise.resolve(false);
        };
        return Loader;
      })();
      _export('Loader', Loader);
    }
  };
});

System.register("github:aurelia/templating@0.12.1/resource-registry", ["github:aurelia/path@0.7.0"], function(_export) {
  'use strict';
  var relativeToFile,
      ResourceRegistry,
      ViewResources;
  function _inherits(subClass, superClass) {
    if (typeof superClass !== 'function' && superClass !== null) {
      throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }});
    if (superClass)
      subClass.__proto__ = superClass;
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }
  function register(lookup, name, resource, type) {
    if (!name) {
      return ;
    }
    var existing = lookup[name];
    if (existing) {
      if (existing != resource) {
        throw new Error('Attempted to register ' + type + ' when one with the same name already exists. Name: ' + name + '.');
      }
      return ;
    }
    lookup[name] = resource;
  }
  return {
    setters: [function(_aureliaPath) {
      relativeToFile = _aureliaPath.relativeToFile;
    }],
    execute: function() {
      ResourceRegistry = (function() {
        function ResourceRegistry() {
          _classCallCheck(this, ResourceRegistry);
          this.attributes = {};
          this.elements = {};
          this.valueConverters = {};
          this.attributeMap = {};
          this.baseResourceUrl = '';
        }
        ResourceRegistry.prototype.registerElement = function registerElement(tagName, behavior) {
          register(this.elements, tagName, behavior, 'an Element');
        };
        ResourceRegistry.prototype.getElement = function getElement(tagName) {
          return this.elements[tagName];
        };
        ResourceRegistry.prototype.registerAttribute = function registerAttribute(attribute, behavior, knownAttribute) {
          this.attributeMap[attribute] = knownAttribute;
          register(this.attributes, attribute, behavior, 'an Attribute');
        };
        ResourceRegistry.prototype.getAttribute = function getAttribute(attribute) {
          return this.attributes[attribute];
        };
        ResourceRegistry.prototype.registerValueConverter = function registerValueConverter(name, valueConverter) {
          register(this.valueConverters, name, valueConverter, 'a ValueConverter');
        };
        ResourceRegistry.prototype.getValueConverter = function getValueConverter(name) {
          return this.valueConverters[name];
        };
        return ResourceRegistry;
      })();
      _export('ResourceRegistry', ResourceRegistry);
      ViewResources = (function(_ResourceRegistry) {
        function ViewResources(parent, viewUrl) {
          _classCallCheck(this, ViewResources);
          _ResourceRegistry.call(this);
          this.parent = parent;
          this.viewUrl = viewUrl;
          this.valueConverterLookupFunction = this.getValueConverter.bind(this);
        }
        _inherits(ViewResources, _ResourceRegistry);
        ViewResources.prototype.relativeToView = function relativeToView(path) {
          return relativeToFile(path, this.viewUrl);
        };
        ViewResources.prototype.getElement = function getElement(tagName) {
          return this.elements[tagName] || this.parent.getElement(tagName);
        };
        ViewResources.prototype.mapAttribute = function mapAttribute(attribute) {
          return this.attributeMap[attribute] || this.parent.attributeMap[attribute];
        };
        ViewResources.prototype.getAttribute = function getAttribute(attribute) {
          return this.attributes[attribute] || this.parent.getAttribute(attribute);
        };
        ViewResources.prototype.getValueConverter = function getValueConverter(name) {
          return this.valueConverters[name] || this.parent.getValueConverter(name);
        };
        return ViewResources;
      })(ResourceRegistry);
      _export('ViewResources', ViewResources);
    }
  };
});

System.register("github:aurelia/templating@0.12.1/view", [], function(_export) {
  "use strict";
  var View;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  return {
    setters: [],
    execute: function() {
      View = (function() {
        function View(fragment, behaviors, bindings, children, systemControlled, contentSelectors) {
          _classCallCheck(this, View);
          this.fragment = fragment;
          this.behaviors = behaviors;
          this.bindings = bindings;
          this.children = children;
          this.systemControlled = systemControlled;
          this.contentSelectors = contentSelectors;
          this.firstChild = fragment.firstChild;
          this.lastChild = fragment.lastChild;
          this.isBound = false;
          this.isAttached = false;
        }
        View.prototype.created = function created(executionContext) {
          var i,
              ii,
              behaviors = this.behaviors;
          for (i = 0, ii = behaviors.length; i < ii; ++i) {
            behaviors[i].created(executionContext);
          }
        };
        View.prototype.bind = function bind(executionContext, systemUpdate) {
          var context,
              behaviors,
              bindings,
              children,
              i,
              ii;
          if (systemUpdate && !this.systemControlled) {
            context = this.executionContext || executionContext;
          } else {
            context = executionContext || this.executionContext;
          }
          if (this.isBound) {
            if (this.executionContext === context) {
              return ;
            }
            this.unbind();
          }
          this.isBound = true;
          this.executionContext = context;
          if (this.owner) {
            this.owner.bind(context);
          }
          bindings = this.bindings;
          for (i = 0, ii = bindings.length; i < ii; ++i) {
            bindings[i].bind(context);
          }
          behaviors = this.behaviors;
          for (i = 0, ii = behaviors.length; i < ii; ++i) {
            behaviors[i].bind(context);
          }
          children = this.children;
          for (i = 0, ii = children.length; i < ii; ++i) {
            children[i].bind(context, true);
          }
        };
        View.prototype.addBinding = function addBinding(binding) {
          this.bindings.push(binding);
          if (this.isBound) {
            binding.bind(this.executionContext);
          }
        };
        View.prototype.unbind = function unbind() {
          var behaviors,
              bindings,
              children,
              i,
              ii;
          if (this.isBound) {
            this.isBound = false;
            if (this.owner) {
              this.owner.unbind();
            }
            bindings = this.bindings;
            for (i = 0, ii = bindings.length; i < ii; ++i) {
              bindings[i].unbind();
            }
            behaviors = this.behaviors;
            for (i = 0, ii = behaviors.length; i < ii; ++i) {
              behaviors[i].unbind();
            }
            children = this.children;
            for (i = 0, ii = children.length; i < ii; ++i) {
              children[i].unbind();
            }
          }
        };
        View.prototype.insertNodesBefore = function insertNodesBefore(refNode) {
          var parent = refNode.parentNode;
          parent.insertBefore(this.fragment, refNode);
        };
        View.prototype.appendNodesTo = function appendNodesTo(parent) {
          parent.appendChild(this.fragment);
        };
        View.prototype.removeNodes = function removeNodes() {
          var start = this.firstChild,
              end = this.lastChild,
              fragment = this.fragment,
              next;
          var current = start,
              loop = true,
              nodes = [];
          while (loop) {
            if (current === end) {
              loop = false;
            }
            next = current.nextSibling;
            this.fragment.appendChild(current);
            current = next;
          }
        };
        View.prototype.attached = function attached() {
          var behaviors,
              children,
              i,
              ii;
          if (this.isAttached) {
            return ;
          }
          this.isAttached = true;
          if (this.owner) {
            this.owner.attached();
          }
          behaviors = this.behaviors;
          for (i = 0, ii = behaviors.length; i < ii; ++i) {
            behaviors[i].attached();
          }
          children = this.children;
          for (i = 0, ii = children.length; i < ii; ++i) {
            children[i].attached();
          }
        };
        View.prototype.detached = function detached() {
          var behaviors,
              children,
              i,
              ii;
          if (this.isAttached) {
            this.isAttached = false;
            if (this.owner) {
              this.owner.detached();
            }
            behaviors = this.behaviors;
            for (i = 0, ii = behaviors.length; i < ii; ++i) {
              behaviors[i].detached();
            }
            children = this.children;
            for (i = 0, ii = children.length; i < ii; ++i) {
              children[i].detached();
            }
          }
        };
        return View;
      })();
      _export("View", View);
    }
  };
});

System.register("github:aurelia/templating@0.12.1/content-selector", ["npm:core-js@0.9.16"], function(_export) {
  'use strict';
  var core,
      proto,
      placeholder,
      ContentSelector;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }
  function findInsertionPoint(groups, index) {
    var insertionPoint;
    while (!insertionPoint && index >= 0) {
      insertionPoint = groups[index][0];
      index--;
    }
    return insertionPoint;
  }
  return {
    setters: [function(_coreJs) {
      core = _coreJs['default'];
    }],
    execute: function() {
      if (Element && !Element.prototype.matches) {
        proto = Element.prototype;
        proto.matches = proto.matchesSelector || proto.mozMatchesSelector || proto.msMatchesSelector || proto.oMatchesSelector || proto.webkitMatchesSelector;
      }
      placeholder = [];
      ContentSelector = (function() {
        function ContentSelector(anchor, selector) {
          _classCallCheck(this, ContentSelector);
          this.anchor = anchor;
          this.selector = selector;
          this.all = !this.selector;
          this.groups = [];
        }
        ContentSelector.applySelectors = function applySelectors(view, contentSelectors, callback) {
          var currentChild = view.fragment.firstChild,
              contentMap = new Map(),
              nextSibling,
              i,
              ii,
              contentSelector;
          while (currentChild) {
            nextSibling = currentChild.nextSibling;
            if (currentChild.viewSlot) {
              var viewSlotSelectors = contentSelectors.map(function(x) {
                return x.copyForViewSlot();
              });
              currentChild.viewSlot.installContentSelectors(viewSlotSelectors);
            } else {
              for (i = 0, ii = contentSelectors.length; i < ii; i++) {
                contentSelector = contentSelectors[i];
                if (contentSelector.matches(currentChild)) {
                  var elements = contentMap.get(contentSelector);
                  if (!elements) {
                    elements = [];
                    contentMap.set(contentSelector, elements);
                  }
                  elements.push(currentChild);
                  break;
                }
              }
            }
            currentChild = nextSibling;
          }
          for (i = 0, ii = contentSelectors.length; i < ii; ++i) {
            contentSelector = contentSelectors[i];
            callback(contentSelector, contentMap.get(contentSelector) || placeholder);
          }
        };
        ContentSelector.prototype.copyForViewSlot = function copyForViewSlot() {
          return new ContentSelector(this.anchor, this.selector);
        };
        ContentSelector.prototype.matches = function matches(node) {
          return this.all || node.nodeType === 1 && node.matches(this.selector);
        };
        ContentSelector.prototype.add = function add(group) {
          var anchor = this.anchor,
              parent = anchor.parentNode,
              i,
              ii;
          for (i = 0, ii = group.length; i < ii; ++i) {
            parent.insertBefore(group[i], anchor);
          }
          this.groups.push(group);
        };
        ContentSelector.prototype.insert = function insert(index, group) {
          if (group.length) {
            var anchor = findInsertionPoint(this.groups, index) || this.anchor,
                parent = anchor.parentNode,
                i,
                ii;
            for (i = 0, ii = group.length; i < ii; ++i) {
              parent.insertBefore(group[i], anchor);
            }
          }
          this.groups.splice(index, 0, group);
        };
        ContentSelector.prototype.removeAt = function removeAt(index, fragment) {
          var group = this.groups[index],
              i,
              ii;
          for (i = 0, ii = group.length; i < ii; ++i) {
            fragment.appendChild(group[i]);
          }
          this.groups.splice(index, 1);
        };
        return ContentSelector;
      })();
      _export('ContentSelector', ContentSelector);
    }
  };
});

System.register("github:aurelia/templating@0.12.1/animator", [], function(_export) {
  "use strict";
  var Animator;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  return {
    setters: [],
    execute: function() {
      Animator = (function() {
        function Animator() {
          _classCallCheck(this, Animator);
        }
        Animator.configureDefault = function configureDefault(container, animatorInstance) {
          container.registerInstance(Animator, Animator.instance = animatorInstance || new Animator());
        };
        Animator.prototype.move = function move() {
          return Promise.resolve(false);
        };
        Animator.prototype.enter = function enter(element) {
          return Promise.resolve(false);
        };
        Animator.prototype.leave = function leave(element) {
          return Promise.resolve(false);
        };
        Animator.prototype.removeClass = function removeClass(element, className) {
          return Promise.resolve(false);
        };
        Animator.prototype.addClass = function addClass(element, className) {
          return Promise.resolve(false);
        };
        Animator.prototype.animate = function animate(element, className, options) {
          return Promise.resolve(false);
        };
        Animator.prototype.runSequence = function runSequence(sequence) {};
        Animator.prototype.registerEffect = function registerEffect(effectName, properties) {};
        Animator.prototype.unregisterEffect = function unregisterEffect(effectName) {};
        return Animator;
      })();
      _export("Animator", Animator);
    }
  };
});

System.register("github:aurelia/templating@0.12.1/util", [], function(_export) {
  "use strict";
  var capitalMatcher;
  _export("hyphenate", hyphenate);
  _export("nextElementSibling", nextElementSibling);
  function addHyphenAndLower(char) {
    return "-" + char.toLowerCase();
  }
  function hyphenate(name) {
    return (name.charAt(0).toLowerCase() + name.slice(1)).replace(capitalMatcher, addHyphenAndLower);
  }
  function nextElementSibling(element) {
    if (element.nextElementSibling) {
      return element.nextElementSibling;
    }
    do {
      element = element.nextSibling;
    } while (element && element.nodeType !== 1);
    return element;
  }
  return {
    setters: [],
    execute: function() {
      capitalMatcher = /([A-Z])/g;
    }
  };
});

System.register("github:aurelia/templating@0.12.1/binding-language", [], function(_export) {
  'use strict';
  var BindingLanguage;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }
  return {
    setters: [],
    execute: function() {
      BindingLanguage = (function() {
        function BindingLanguage() {
          _classCallCheck(this, BindingLanguage);
        }
        BindingLanguage.prototype.inspectAttribute = function inspectAttribute(resources, attrName, attrValue) {
          throw new Error('A BindingLanguage must implement inspectAttribute(...)');
        };
        BindingLanguage.prototype.createAttributeInstruction = function createAttributeInstruction(resources, element, info, existingInstruction) {
          throw new Error('A BindingLanguage must implement createAttributeInstruction(...)');
        };
        BindingLanguage.prototype.parseText = function parseText(resources, value) {
          throw new Error('A BindingLanguage must implement parseText(...)');
        };
        return BindingLanguage;
      })();
      _export('BindingLanguage', BindingLanguage);
    }
  };
});

System.register("github:aurelia/templating@0.12.1/module-analyzer", ["github:aurelia/metadata@0.6.0", "github:aurelia/loader@0.7.0", "github:aurelia/binding@0.7.3", "github:aurelia/templating@0.12.1/html-behavior", "github:aurelia/templating@0.12.1/view-strategy", "github:aurelia/templating@0.12.1/util"], function(_export) {
  'use strict';
  var Metadata,
      TemplateRegistryEntry,
      ValueConverterResource,
      HtmlBehaviorResource,
      ViewStrategy,
      TemplateRegistryViewStrategy,
      hyphenate,
      ResourceModule,
      ResourceDescription,
      ModuleAnalyzer;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }
  return {
    setters: [function(_aureliaMetadata) {
      Metadata = _aureliaMetadata.Metadata;
    }, function(_aureliaLoader) {
      TemplateRegistryEntry = _aureliaLoader.TemplateRegistryEntry;
    }, function(_aureliaBinding) {
      ValueConverterResource = _aureliaBinding.ValueConverterResource;
    }, function(_htmlBehavior) {
      HtmlBehaviorResource = _htmlBehavior.HtmlBehaviorResource;
    }, function(_viewStrategy) {
      ViewStrategy = _viewStrategy.ViewStrategy;
      TemplateRegistryViewStrategy = _viewStrategy.TemplateRegistryViewStrategy;
    }, function(_util) {
      hyphenate = _util.hyphenate;
    }],
    execute: function() {
      ResourceModule = (function() {
        function ResourceModule(moduleId) {
          _classCallCheck(this, ResourceModule);
          this.id = moduleId;
          this.moduleInstance = null;
          this.mainResource = null;
          this.resources = null;
          this.viewStrategy = null;
          this.isAnalyzed = false;
        }
        ResourceModule.prototype.analyze = function analyze(container) {
          var current = this.mainResource,
              resources = this.resources,
              viewStrategy = this.viewStrategy,
              i,
              ii,
              metadata;
          if (this.isAnalyzed) {
            return ;
          }
          this.isAnalyzed = true;
          if (current) {
            metadata = current.metadata;
            metadata.viewStrategy = viewStrategy;
            if ('analyze' in metadata) {
              metadata.analyze(container, current.value);
            }
          }
          for (i = 0, ii = resources.length; i < ii; ++i) {
            current = resources[i];
            metadata = current.metadata;
            metadata.viewStrategy = viewStrategy;
            if ('analyze' in metadata) {
              metadata.analyze(container, current.value);
            }
          }
        };
        ResourceModule.prototype.register = function register(registry, name) {
          var i,
              ii,
              resources = this.resources;
          if (this.mainResource) {
            this.mainResource.metadata.register(registry, name);
            name = null;
          }
          for (i = 0, ii = resources.length; i < ii; ++i) {
            resources[i].metadata.register(registry, name);
            name = null;
          }
        };
        ResourceModule.prototype.load = function load(container) {
          if (this.onLoaded) {
            return this.onLoaded;
          }
          var current = this.mainResource,
              resources = this.resources,
              i,
              ii,
              metadata,
              loads = [];
          if (current) {
            metadata = current.metadata;
            if ('load' in metadata) {
              loads.push(metadata.load(container, current.value));
            }
          }
          for (i = 0, ii = resources.length; i < ii; ++i) {
            current = resources[i];
            metadata = current.metadata;
            if ('load' in metadata) {
              loads.push(metadata.load(container, current.value));
            }
          }
          this.onLoaded = Promise.all(loads);
          return this.onLoaded;
        };
        return ResourceModule;
      })();
      ResourceDescription = function ResourceDescription(key, exportedValue, resourceTypeMeta) {
        _classCallCheck(this, ResourceDescription);
        if (!resourceTypeMeta) {
          resourceTypeMeta = Metadata.get(Metadata.resource, exportedValue);
          if (!resourceTypeMeta) {
            resourceTypeMeta = new HtmlBehaviorResource();
            resourceTypeMeta.elementName = hyphenate(key);
            Reflect.defineMetadata(Metadata.resource, resourceTypeMeta, exportedValue);
          }
        }
        if (resourceTypeMeta instanceof HtmlBehaviorResource) {
          if (resourceTypeMeta.elementName === undefined) {
            resourceTypeMeta.elementName = hyphenate(key);
          } else if (resourceTypeMeta.attributeName === undefined) {
            resourceTypeMeta.attributeName = hyphenate(key);
          } else if (resourceTypeMeta.attributeName === null && resourceTypeMeta.elementName === null) {
            HtmlBehaviorResource.convention(key, resourceTypeMeta);
          }
        } else if (!resourceTypeMeta.name) {
          resourceTypeMeta.name = hyphenate(key);
        }
        this.metadata = resourceTypeMeta;
        this.value = exportedValue;
      };
      ModuleAnalyzer = (function() {
        function ModuleAnalyzer() {
          _classCallCheck(this, ModuleAnalyzer);
          this.cache = {};
        }
        ModuleAnalyzer.prototype.getAnalysis = function getAnalysis(moduleId) {
          return this.cache[moduleId];
        };
        ModuleAnalyzer.prototype.analyze = function analyze(moduleId, moduleInstance, viewModelMember) {
          var mainResource,
              fallbackValue,
              fallbackKey,
              resourceTypeMeta,
              key,
              exportedValue,
              resources = [],
              conventional,
              viewStrategy,
              resourceModule;
          resourceModule = this.cache[moduleId];
          if (resourceModule) {
            return resourceModule;
          }
          resourceModule = new ResourceModule(moduleId);
          this.cache[moduleId] = resourceModule;
          if (typeof moduleInstance === 'function') {
            moduleInstance = {'default': moduleInstance};
          }
          if (viewModelMember) {
            mainResource = new ResourceDescription(viewModelMember, moduleInstance[viewModelMember]);
          }
          for (key in moduleInstance) {
            exportedValue = moduleInstance[key];
            if (key === viewModelMember || typeof exportedValue !== 'function') {
              continue;
            }
            resourceTypeMeta = Metadata.get(Metadata.resource, exportedValue);
            if (resourceTypeMeta) {
              if (resourceTypeMeta.attributeName === null && resourceTypeMeta.elementName === null) {
                HtmlBehaviorResource.convention(key, resourceTypeMeta);
              }
              if (resourceTypeMeta.attributeName === null && resourceTypeMeta.elementName === null) {
                resourceTypeMeta.elementName = hyphenate(key);
              }
              if (!mainResource && resourceTypeMeta instanceof HtmlBehaviorResource && resourceTypeMeta.elementName !== null) {
                mainResource = new ResourceDescription(key, exportedValue, resourceTypeMeta);
              } else {
                resources.push(new ResourceDescription(key, exportedValue, resourceTypeMeta));
              }
            } else if (exportedValue instanceof ViewStrategy) {
              viewStrategy = exportedValue;
            } else if (exportedValue instanceof TemplateRegistryEntry) {
              viewStrategy = new TemplateRegistryViewStrategy(moduleId, exportedValue);
            } else {
              if (conventional = HtmlBehaviorResource.convention(key)) {
                if (conventional.elementName !== null && !mainResource) {
                  mainResource = new ResourceDescription(key, exportedValue, conventional);
                } else {
                  resources.push(new ResourceDescription(key, exportedValue, conventional));
                }
                Reflect.defineMetadata(Metadata.resource, conventional, exportedValue);
              } else if (conventional = ValueConverterResource.convention(key)) {
                resources.push(new ResourceDescription(key, exportedValue, conventional));
                Reflect.defineMetadata(Metadata.resource, conventional, exportedValue);
              } else if (!fallbackValue) {
                fallbackValue = exportedValue;
                fallbackKey = key;
              }
            }
          }
          if (!mainResource && fallbackValue) {
            mainResource = new ResourceDescription(fallbackKey, fallbackValue);
          }
          resourceModule.moduleInstance = moduleInstance;
          resourceModule.mainResource = mainResource;
          resourceModule.resources = resources;
          resourceModule.viewStrategy = viewStrategy;
          return resourceModule;
        };
        return ModuleAnalyzer;
      })();
      _export('ModuleAnalyzer', ModuleAnalyzer);
    }
  };
});

System.register("github:aurelia/templating@0.12.1/bindable-property", ["npm:core-js@0.9.16", "github:aurelia/templating@0.12.1/util", "github:aurelia/binding@0.7.3"], function(_export) {
  'use strict';
  var core,
      hyphenate,
      bindingMode,
      BindableProperty,
      BehaviorPropertyObserver;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }
  function getObserver(behavior, instance, name) {
    var lookup = instance.__observers__;
    if (lookup === undefined) {
      lookup = behavior.observerLocator.getOrCreateObserversLookup(instance);
      behavior.ensurePropertiesDefined(instance, lookup);
    }
    return lookup[name];
  }
  return {
    setters: [function(_coreJs) {
      core = _coreJs['default'];
    }, function(_util) {
      hyphenate = _util.hyphenate;
    }, function(_aureliaBinding) {
      bindingMode = _aureliaBinding.bindingMode;
    }],
    execute: function() {
      BindableProperty = (function() {
        function BindableProperty(nameOrConfig) {
          _classCallCheck(this, BindableProperty);
          if (typeof nameOrConfig === 'string') {
            this.name = nameOrConfig;
          } else {
            Object.assign(this, nameOrConfig);
          }
          this.attribute = this.attribute || hyphenate(this.name);
          this.defaultBindingMode = this.defaultBindingMode || bindingMode.oneWay;
          this.changeHandler = this.changeHandler || null;
          this.owner = null;
        }
        BindableProperty.prototype.registerWith = function registerWith(target, behavior, descriptor) {
          behavior.properties.push(this);
          behavior.attributes[this.attribute] = this;
          this.owner = behavior;
          if (descriptor) {
            this.descriptor = descriptor;
            return this.configureDescriptor(behavior, descriptor);
          }
        };
        BindableProperty.prototype.configureDescriptor = function configureDescriptor(behavior, descriptor) {
          var name = this.name;
          descriptor.configurable = true;
          descriptor.enumerable = true;
          if ('initializer' in descriptor) {
            this.defaultValue = descriptor.initializer;
            delete descriptor.initializer;
            delete descriptor.writable;
          }
          if ('value' in descriptor) {
            this.defaultValue = descriptor.value;
            delete descriptor.value;
            delete descriptor.writable;
          }
          descriptor.get = function() {
            return getObserver(behavior, this, name).getValue();
          };
          descriptor.set = function(value) {
            getObserver(behavior, this, name).setValue(value);
          };
          descriptor.get.getObserver = function(obj) {
            return getObserver(behavior, obj, name);
          };
          return descriptor;
        };
        BindableProperty.prototype.defineOn = function defineOn(target, behavior) {
          var name = this.name,
              handlerName;
          if (this.changeHandler === null) {
            handlerName = name + 'Changed';
            if (handlerName in target.prototype) {
              this.changeHandler = handlerName;
            }
          }
          if (!this.descriptor) {
            Object.defineProperty(target.prototype, name, this.configureDescriptor(behavior, {}));
          }
        };
        BindableProperty.prototype.createObserver = function createObserver(executionContext) {
          var _this = this;
          var selfSubscriber = null,
              defaultValue = this.defaultValue,
              initialValue;
          if (this.hasOptions) {
            return ;
          }
          if (this.changeHandler !== null) {
            selfSubscriber = function(newValue, oldValue) {
              return executionContext[_this.changeHandler](newValue, oldValue);
            };
          }
          if (defaultValue !== undefined) {
            initialValue = typeof defaultValue === 'function' ? defaultValue.call(executionContext) : defaultValue;
          }
          return new BehaviorPropertyObserver(this.owner.taskQueue, executionContext, this.name, selfSubscriber, initialValue);
        };
        BindableProperty.prototype.initialize = function initialize(executionContext, observerLookup, attributes, behaviorHandlesBind, boundProperties) {
          var selfSubscriber,
              observer,
              attribute,
              defaultValue = this.defaultValue;
          if (this.isDynamic) {
            for (var key in attributes) {
              this.createDynamicProperty(executionContext, observerLookup, behaviorHandlesBind, key, attributes[key], boundProperties);
            }
          } else if (!this.hasOptions) {
            observer = observerLookup[this.name];
            if (attributes !== undefined) {
              selfSubscriber = observer.selfSubscriber;
              attribute = attributes[this.attribute];
              if (behaviorHandlesBind) {
                observer.selfSubscriber = null;
              }
              if (typeof attribute === 'string') {
                executionContext[this.name] = attribute;
                observer.call();
              } else if (attribute) {
                boundProperties.push({
                  observer: observer,
                  binding: attribute.createBinding(executionContext)
                });
              } else if (defaultValue !== undefined) {
                observer.call();
              }
              observer.selfSubscriber = selfSubscriber;
            }
            observer.publishing = true;
          }
        };
        BindableProperty.prototype.createDynamicProperty = function createDynamicProperty(executionContext, observerLookup, behaviorHandlesBind, name, attribute, boundProperties) {
          var changeHandlerName = name + 'Changed',
              selfSubscriber = null,
              observer,
              info;
          if (changeHandlerName in executionContext) {
            selfSubscriber = function(newValue, oldValue) {
              return executionContext[changeHandlerName](newValue, oldValue);
            };
          } else if ('dynamicPropertyChanged' in executionContext) {
            selfSubscriber = function(newValue, oldValue) {
              return executionContext['dynamicPropertyChanged'](name, newValue, oldValue);
            };
          }
          observer = observerLookup[name] = new BehaviorPropertyObserver(this.owner.taskQueue, executionContext, name, selfSubscriber);
          Object.defineProperty(executionContext, name, {
            configurable: true,
            enumerable: true,
            get: observer.getValue.bind(observer),
            set: observer.setValue.bind(observer)
          });
          if (behaviorHandlesBind) {
            observer.selfSubscriber = null;
          }
          if (typeof attribute === 'string') {
            executionContext[name] = attribute;
            observer.call();
          } else if (attribute) {
            info = {
              observer: observer,
              binding: attribute.createBinding(executionContext)
            };
            boundProperties.push(info);
          }
          observer.publishing = true;
          observer.selfSubscriber = selfSubscriber;
        };
        return BindableProperty;
      })();
      _export('BindableProperty', BindableProperty);
      BehaviorPropertyObserver = (function() {
        function BehaviorPropertyObserver(taskQueue, obj, propertyName, selfSubscriber, initialValue) {
          _classCallCheck(this, BehaviorPropertyObserver);
          this.taskQueue = taskQueue;
          this.obj = obj;
          this.propertyName = propertyName;
          this.callbacks = [];
          this.notqueued = true;
          this.publishing = false;
          this.selfSubscriber = selfSubscriber;
          this.currentValue = this.oldValue = initialValue;
        }
        BehaviorPropertyObserver.prototype.getValue = function getValue() {
          return this.currentValue;
        };
        BehaviorPropertyObserver.prototype.setValue = function setValue(newValue) {
          var oldValue = this.currentValue;
          if (oldValue != newValue) {
            if (this.publishing && this.notqueued) {
              this.notqueued = false;
              this.taskQueue.queueMicroTask(this);
            }
            this.oldValue = oldValue;
            this.currentValue = newValue;
          }
        };
        BehaviorPropertyObserver.prototype.call = function call() {
          var callbacks = this.callbacks,
              i = callbacks.length,
              oldValue = this.oldValue,
              newValue = this.currentValue;
          this.notqueued = true;
          if (newValue != oldValue) {
            if (this.selfSubscriber !== null) {
              this.selfSubscriber(newValue, oldValue);
            }
            while (i--) {
              callbacks[i](newValue, oldValue);
            }
            this.oldValue = newValue;
          }
        };
        BehaviorPropertyObserver.prototype.subscribe = function subscribe(callback) {
          var callbacks = this.callbacks;
          callbacks.push(callback);
          return function() {
            callbacks.splice(callbacks.indexOf(callback), 1);
          };
        };
        return BehaviorPropertyObserver;
      })();
    }
  };
});

System.register("github:aurelia/templating@0.12.1/behavior-instance", [], function(_export) {
  "use strict";
  var BehaviorInstance;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  return {
    setters: [],
    execute: function() {
      BehaviorInstance = (function() {
        function BehaviorInstance(behavior, executionContext, instruction) {
          _classCallCheck(this, BehaviorInstance);
          this.behavior = behavior;
          this.executionContext = executionContext;
          this.isAttached = false;
          var observerLookup = behavior.observerLocator.getOrCreateObserversLookup(executionContext),
              handlesBind = behavior.handlesBind,
              attributes = instruction.attributes,
              boundProperties = this.boundProperties = [],
              properties = behavior.properties,
              i,
              ii;
          behavior.ensurePropertiesDefined(executionContext, observerLookup);
          for (i = 0, ii = properties.length; i < ii; ++i) {
            properties[i].initialize(executionContext, observerLookup, attributes, handlesBind, boundProperties);
          }
        }
        BehaviorInstance.prototype.created = function created(context) {
          if (this.behavior.handlesCreated) {
            this.executionContext.created(context);
          }
        };
        BehaviorInstance.prototype.bind = function bind(context) {
          var skipSelfSubscriber = this.behavior.handlesBind,
              boundProperties = this.boundProperties,
              i,
              ii,
              x,
              observer,
              selfSubscriber;
          for (i = 0, ii = boundProperties.length; i < ii; ++i) {
            x = boundProperties[i];
            observer = x.observer;
            selfSubscriber = observer.selfSubscriber;
            observer.publishing = false;
            if (skipSelfSubscriber) {
              observer.selfSubscriber = null;
            }
            x.binding.bind(context);
            observer.call();
            observer.publishing = true;
            observer.selfSubscriber = selfSubscriber;
          }
          if (skipSelfSubscriber) {
            this.executionContext.bind(context);
          }
          if (this.view) {
            this.view.bind(this.executionContext);
          }
        };
        BehaviorInstance.prototype.unbind = function unbind() {
          var boundProperties = this.boundProperties,
              i,
              ii;
          if (this.view) {
            this.view.unbind();
          }
          if (this.behavior.handlesUnbind) {
            this.executionContext.unbind();
          }
          for (i = 0, ii = boundProperties.length; i < ii; ++i) {
            boundProperties[i].binding.unbind();
          }
        };
        BehaviorInstance.prototype.attached = function attached() {
          if (this.isAttached) {
            return ;
          }
          this.isAttached = true;
          if (this.behavior.handlesAttached) {
            this.executionContext.attached();
          }
          if (this.view) {
            this.view.attached();
          }
        };
        BehaviorInstance.prototype.detached = function detached() {
          if (this.isAttached) {
            this.isAttached = false;
            if (this.view) {
              this.view.detached();
            }
            if (this.behavior.handlesDetached) {
              this.executionContext.detached();
            }
          }
        };
        return BehaviorInstance;
      })();
      _export("BehaviorInstance", BehaviorInstance);
    }
  };
});

System.register("github:aurelia/templating@0.12.1/children", [], function(_export) {
  "use strict";
  var noMutations,
      ChildObserver,
      ChildObserverBinder;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  return {
    setters: [],
    execute: function() {
      noMutations = [];
      ChildObserver = (function() {
        function ChildObserver(property, changeHandler, selector) {
          _classCallCheck(this, ChildObserver);
          this.selector = selector;
          this.changeHandler = changeHandler;
          this.property = property;
        }
        ChildObserver.prototype.createBinding = function createBinding(target, behavior) {
          return new ChildObserverBinder(this.selector, target, this.property, behavior, this.changeHandler);
        };
        return ChildObserver;
      })();
      _export("ChildObserver", ChildObserver);
      ChildObserverBinder = (function() {
        function ChildObserverBinder(selector, target, property, behavior, changeHandler) {
          _classCallCheck(this, ChildObserverBinder);
          this.selector = selector;
          this.target = target;
          this.property = property;
          this.behavior = behavior;
          this.changeHandler = changeHandler;
          this.observer = new MutationObserver(this.onChange.bind(this));
        }
        ChildObserverBinder.prototype.bind = function bind(source) {
          var items,
              results,
              i,
              ii,
              node,
              behavior = this.behavior;
          this.observer.observe(this.target, {
            childList: true,
            subtree: true
          });
          items = behavior[this.property];
          if (!items) {
            items = behavior[this.property] = [];
          } else {
            items.length = 0;
          }
          results = this.target.querySelectorAll(this.selector);
          for (i = 0, ii = results.length; i < ii; ++i) {
            node = results[i];
            items.push(node.primaryBehavior ? node.primaryBehavior.executionContext : node);
          }
          if (this.changeHandler) {
            this.behavior[this.changeHandler](noMutations);
          }
        };
        ChildObserverBinder.prototype.unbind = function unbind() {
          this.observer.disconnect();
        };
        ChildObserverBinder.prototype.onChange = function onChange(mutations) {
          var items = this.behavior[this.property],
              selector = this.selector;
          mutations.forEach(function(record) {
            var added = record.addedNodes,
                removed = record.removedNodes,
                prev = record.previousSibling,
                i,
                ii,
                primary,
                index,
                node;
            for (i = 0, ii = removed.length; i < ii; ++i) {
              node = removed[i];
              if (node.nodeType === 1 && node.matches(selector)) {
                primary = node.primaryBehavior ? node.primaryBehavior.executionContext : node;
                index = items.indexOf(primary);
                if (index != -1) {
                  items.splice(index, 1);
                }
              }
            }
            for (i = 0, ii = added.length; i < ii; ++i) {
              node = added[i];
              if (node.nodeType === 1 && node.matches(selector)) {
                primary = node.primaryBehavior ? node.primaryBehavior.executionContext : node;
                index = 0;
                while (prev) {
                  if (prev.nodeType === 1 && prev.matches(selector)) {
                    index++;
                  }
                  prev = prev.previousSibling;
                }
                items.splice(index, 0, primary);
              }
            }
          });
          if (this.changeHandler) {
            this.behavior[this.changeHandler](mutations);
          }
        };
        return ChildObserverBinder;
      })();
      _export("ChildObserverBinder", ChildObserverBinder);
    }
  };
});

System.register("github:aurelia/templating@0.12.1/element-config", ["github:aurelia/binding@0.7.3"], function(_export) {
  'use strict';
  var EventManager,
      ElementConfigResource;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }
  return {
    setters: [function(_aureliaBinding) {
      EventManager = _aureliaBinding.EventManager;
    }],
    execute: function() {
      ElementConfigResource = (function() {
        function ElementConfigResource() {
          _classCallCheck(this, ElementConfigResource);
        }
        ElementConfigResource.prototype.load = function load(container, target) {
          var config = new target(),
              eventManager = container.get(EventManager);
          eventManager.registerElementConfig(config);
          return Promise.resolve(this);
        };
        ElementConfigResource.prototype.register = function register() {};
        return ElementConfigResource;
      })();
      _export('ElementConfigResource', ElementConfigResource);
    }
  };
});

System.register("github:aurelia/templating@0.12.1/composition-engine", ["github:aurelia/metadata@0.6.0", "github:aurelia/templating@0.12.1/view-strategy", "github:aurelia/templating@0.12.1/view-engine", "github:aurelia/templating@0.12.1/html-behavior"], function(_export) {
  'use strict';
  var Origin,
      Metadata,
      ViewStrategy,
      UseViewStrategy,
      ViewEngine,
      HtmlBehaviorResource,
      CompositionEngine;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }
  return {
    setters: [function(_aureliaMetadata) {
      Origin = _aureliaMetadata.Origin;
      Metadata = _aureliaMetadata.Metadata;
    }, function(_viewStrategy) {
      ViewStrategy = _viewStrategy.ViewStrategy;
      UseViewStrategy = _viewStrategy.UseViewStrategy;
    }, function(_viewEngine) {
      ViewEngine = _viewEngine.ViewEngine;
    }, function(_htmlBehavior) {
      HtmlBehaviorResource = _htmlBehavior.HtmlBehaviorResource;
    }],
    execute: function() {
      CompositionEngine = (function() {
        function CompositionEngine(viewEngine) {
          _classCallCheck(this, CompositionEngine);
          this.viewEngine = viewEngine;
        }
        CompositionEngine.inject = function inject() {
          return [ViewEngine];
        };
        CompositionEngine.prototype.activate = function activate(instruction) {
          if (instruction.skipActivation || typeof instruction.viewModel.activate !== 'function') {
            return Promise.resolve();
          }
          return instruction.viewModel.activate(instruction.model) || Promise.resolve();
        };
        CompositionEngine.prototype.createBehaviorAndSwap = function createBehaviorAndSwap(instruction) {
          return this.createBehavior(instruction).then(function(behavior) {
            behavior.view.bind(behavior.executionContext);
            instruction.viewSlot.swap(behavior.view);
            if (instruction.currentBehavior) {
              instruction.currentBehavior.unbind();
            }
            return behavior;
          });
        };
        CompositionEngine.prototype.createBehavior = function createBehavior(instruction) {
          var childContainer = instruction.childContainer,
              viewModelResource = instruction.viewModelResource,
              viewModel = instruction.viewModel,
              metadata;
          return this.activate(instruction).then(function() {
            var doneLoading,
                viewStrategyFromViewModel,
                origin;
            if ('getViewStrategy' in viewModel && !instruction.view) {
              viewStrategyFromViewModel = true;
              instruction.view = ViewStrategy.normalize(viewModel.getViewStrategy());
            }
            if (instruction.view) {
              if (viewStrategyFromViewModel) {
                origin = Origin.get(viewModel.constructor);
                if (origin) {
                  instruction.view.makeRelativeTo(origin.moduleId);
                }
              } else if (instruction.viewResources) {
                instruction.view.makeRelativeTo(instruction.viewResources.viewUrl);
              }
            }
            if (viewModelResource) {
              metadata = viewModelResource.metadata;
              doneLoading = metadata.load(childContainer, viewModelResource.value, instruction.view, true);
            } else {
              metadata = new HtmlBehaviorResource();
              metadata.elementName = 'dynamic-element';
              metadata.analyze(instruction.container || childContainer, viewModel.constructor);
              doneLoading = metadata.load(childContainer, viewModel.constructor, instruction.view, true).then(function(viewFactory) {
                return viewFactory;
              });
            }
            return doneLoading.then(function(viewFactory) {
              return metadata.create(childContainer, {
                executionContext: viewModel,
                viewFactory: viewFactory,
                suppressBind: true,
                host: instruction.host
              });
            });
          });
        };
        CompositionEngine.prototype.createViewModel = function createViewModel(instruction) {
          var childContainer = instruction.childContainer || instruction.container.createChild();
          instruction.viewModel = instruction.viewResources ? instruction.viewResources.relativeToView(instruction.viewModel) : instruction.viewModel;
          return this.viewEngine.importViewModelResource(instruction.viewModel).then(function(viewModelResource) {
            childContainer.autoRegister(viewModelResource.value);
            if (instruction.host) {
              childContainer.registerInstance(Element, instruction.host);
            }
            instruction.viewModel = childContainer.viewModel = childContainer.get(viewModelResource.value);
            instruction.viewModelResource = viewModelResource;
            return instruction;
          });
        };
        CompositionEngine.prototype.compose = function compose(instruction) {
          var _this = this;
          instruction.childContainer = instruction.childContainer || instruction.container.createChild();
          instruction.view = ViewStrategy.normalize(instruction.view);
          if (instruction.viewModel) {
            if (typeof instruction.viewModel === 'string') {
              return this.createViewModel(instruction).then(function(instruction) {
                return _this.createBehaviorAndSwap(instruction);
              });
            } else {
              return this.createBehaviorAndSwap(instruction);
            }
          } else if (instruction.view) {
            if (instruction.viewResources) {
              instruction.view.makeRelativeTo(instruction.viewResources.viewUrl);
            }
            return instruction.view.loadViewFactory(this.viewEngine).then(function(viewFactory) {
              var result = viewFactory.create(instruction.childContainer, instruction.executionContext);
              instruction.viewSlot.swap(result);
              return result;
            });
          } else if (instruction.viewSlot) {
            instruction.viewSlot.removeAll();
            return Promise.resolve(null);
          }
        };
        return CompositionEngine;
      })();
      _export('CompositionEngine', CompositionEngine);
    }
  };
});

System.register("github:aurelia/templating@0.12.1/decorators", ["npm:core-js@0.9.16", "github:aurelia/metadata@0.6.0", "github:aurelia/templating@0.12.1/bindable-property", "github:aurelia/templating@0.12.1/children", "github:aurelia/templating@0.12.1/element-config", "github:aurelia/templating@0.12.1/view-strategy", "github:aurelia/templating@0.12.1/html-behavior"], function(_export) {
  'use strict';
  var core,
      Metadata,
      Decorators,
      BindableProperty,
      ChildObserver,
      ElementConfigResource,
      ViewStrategy,
      UseViewStrategy,
      NoViewStrategy,
      HtmlBehaviorResource;
  _export('behavior', behavior);
  _export('customElement', customElement);
  _export('customAttribute', customAttribute);
  _export('templateController', templateController);
  _export('bindable', bindable);
  _export('dynamicOptions', dynamicOptions);
  _export('syncChildren', syncChildren);
  _export('useShadowDOM', useShadowDOM);
  _export('skipContentProcessing', skipContentProcessing);
  _export('containerless', containerless);
  _export('viewStrategy', viewStrategy);
  _export('useView', useView);
  _export('noView', noView);
  _export('elementConfig', elementConfig);
  function validateBehaviorName(name, type) {
    if (/[A-Z]/.test(name)) {
      throw new Error('\'' + name + '\' is not a valid ' + type + ' name.  Upper-case letters are not allowed because the DOM is not case-sensitive.');
    }
  }
  function behavior(override) {
    return function(target) {
      if (override instanceof HtmlBehaviorResource) {
        Reflect.defineMetadata(Metadata.resource, override, target);
      } else {
        var resource = Metadata.getOrCreateOwn(Metadata.resource, HtmlBehaviorResource, target);
        Object.assign(resource, override);
      }
    };
  }
  function customElement(name) {
    validateBehaviorName(name, 'custom element');
    return function(target) {
      var resource = Metadata.getOrCreateOwn(Metadata.resource, HtmlBehaviorResource, target);
      resource.elementName = name;
    };
  }
  function customAttribute(name, defaultBindingMode) {
    validateBehaviorName(name, 'custom attribute');
    return function(target) {
      var resource = Metadata.getOrCreateOwn(Metadata.resource, HtmlBehaviorResource, target);
      resource.attributeName = name;
      resource.attributeDefaultBindingMode = defaultBindingMode;
    };
  }
  function templateController(target) {
    var deco = function deco(target) {
      var resource = Metadata.getOrCreateOwn(Metadata.resource, HtmlBehaviorResource, target);
      resource.liftsContent = true;
    };
    return target ? deco(target) : deco;
  }
  function bindable(nameOrConfigOrTarget, key, descriptor) {
    var deco = function deco(target, key, descriptor) {
      var actualTarget = key ? target.constructor : target,
          resource = Metadata.getOrCreateOwn(Metadata.resource, HtmlBehaviorResource, actualTarget),
          prop;
      if (key) {
        nameOrConfigOrTarget = nameOrConfigOrTarget || {};
        nameOrConfigOrTarget.name = key;
      }
      prop = new BindableProperty(nameOrConfigOrTarget);
      return prop.registerWith(actualTarget, resource, descriptor);
    };
    if (!nameOrConfigOrTarget) {
      return deco;
    }
    if (key) {
      var target = nameOrConfigOrTarget;
      nameOrConfigOrTarget = null;
      return deco(target, key, descriptor);
    }
    return deco;
  }
  function dynamicOptions(target) {
    var deco = function deco(target) {
      var resource = Metadata.getOrCreateOwn(Metadata.resource, HtmlBehaviorResource, target);
      resource.hasDynamicOptions = true;
    };
    return target ? deco(target) : deco;
  }
  function syncChildren(property, changeHandler, selector) {
    return function(target) {
      var resource = Metadata.getOrCreateOwn(Metadata.resource, HtmlBehaviorResource, target);
      resource.childExpression = new ChildObserver(property, changeHandler, selector);
    };
  }
  function useShadowDOM(target) {
    var deco = function deco(target) {
      var resource = Metadata.getOrCreateOwn(Metadata.resource, HtmlBehaviorResource, target);
      resource.targetShadowDOM = true;
    };
    return target ? deco(target) : deco;
  }
  function skipContentProcessing(target) {
    var deco = function deco(target) {
      var resource = Metadata.getOrCreateOwn(Metadata.resource, HtmlBehaviorResource, target);
      resource.skipContentProcessing = true;
    };
    return target ? deco(target) : deco;
  }
  function containerless(target) {
    var deco = function deco(target) {
      var resource = Metadata.getOrCreateOwn(Metadata.resource, HtmlBehaviorResource, target);
      resource.containerless = true;
    };
    return target ? deco(target) : deco;
  }
  function viewStrategy(strategy) {
    return function(target) {
      Reflect.defineMetadata(ViewStrategy.metadataKey, strategy, target);
    };
  }
  function useView(path) {
    return viewStrategy(new UseViewStrategy(path));
  }
  function noView(target) {
    var deco = function deco(target) {
      Reflect.defineMetadata(ViewStrategy.metadataKey, new NoViewStrategy(), target);
    };
    return target ? deco(target) : deco;
  }
  function elementConfig(target) {
    var deco = function deco(target) {
      Reflect.defineMetadata(Metadata.resource, new ElementConfigResource(), target);
    };
    return target ? deco(target) : deco;
  }
  return {
    setters: [function(_coreJs) {
      core = _coreJs['default'];
    }, function(_aureliaMetadata) {
      Metadata = _aureliaMetadata.Metadata;
      Decorators = _aureliaMetadata.Decorators;
    }, function(_bindableProperty) {
      BindableProperty = _bindableProperty.BindableProperty;
    }, function(_children) {
      ChildObserver = _children.ChildObserver;
    }, function(_elementConfig) {
      ElementConfigResource = _elementConfig.ElementConfigResource;
    }, function(_viewStrategy) {
      ViewStrategy = _viewStrategy.ViewStrategy;
      UseViewStrategy = _viewStrategy.UseViewStrategy;
      NoViewStrategy = _viewStrategy.NoViewStrategy;
    }, function(_htmlBehavior) {
      HtmlBehaviorResource = _htmlBehavior.HtmlBehaviorResource;
    }],
    execute: function() {
      Decorators.configure.parameterizedDecorator('behavior', behavior);
      Decorators.configure.parameterizedDecorator('customElement', customElement);
      Decorators.configure.parameterizedDecorator('customAttribute', customAttribute);
      Decorators.configure.simpleDecorator('templateController', templateController);
      Decorators.configure.parameterizedDecorator('bindable', bindable);
      Decorators.configure.simpleDecorator('dynamicOptions', dynamicOptions);
      Decorators.configure.parameterizedDecorator('syncChildren', syncChildren);
      Decorators.configure.simpleDecorator('useShadowDOM', useShadowDOM);
      Decorators.configure.simpleDecorator('skipContentProcessing', skipContentProcessing);
      Decorators.configure.simpleDecorator('containerless', containerless);
      Decorators.configure.parameterizedDecorator('viewStrategy', useView);
      Decorators.configure.parameterizedDecorator('useView', useView);
      Decorators.configure.simpleDecorator('noView', noView);
      Decorators.configure.simpleDecorator('elementConfig', elementConfig);
    }
  };
});

System.register("github:aurelia/validation@0.2.5/validation/decorators", [], function(_export) {
  var _classCallCheck,
      ValidationMetadata,
      ValidationPropertyMetadata;
  _export("ensure", ensure);
  function ensure(setupStep) {
    return function(target, propertyName) {
      if (target._validationMetadata === undefined) {
        target._validationMetadata = new ValidationMetadata();
      }
      var property = target._validationMetadata.getOrCreateProperty(propertyName);
      property.addSetupStep(setupStep);
    };
  }
  return {
    setters: [],
    execute: function() {
      "use strict";
      _classCallCheck = function(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      };
      ValidationMetadata = (function() {
        function ValidationMetadata() {
          _classCallCheck(this, ValidationMetadata);
          this.properties = [];
        }
        ValidationMetadata.prototype.getOrCreateProperty = function getOrCreateProperty(propertyName) {
          var property = this.properties.find(function(x) {
            return x.propertyName === propertyName;
          });
          if (property === undefined) {
            property = new ValidationPropertyMetadata(propertyName);
            this.properties.push(property);
          }
          return property;
        };
        ValidationMetadata.prototype.setup = function setup(validation) {
          this.properties.forEach(function(property) {
            property.setup(validation);
          });
        };
        return ValidationMetadata;
      })();
      ValidationPropertyMetadata = (function() {
        function ValidationPropertyMetadata(propertyName) {
          _classCallCheck(this, ValidationPropertyMetadata);
          this.propertyName = propertyName;
          this.setupSteps = [];
        }
        ValidationPropertyMetadata.prototype.addSetupStep = function addSetupStep(setupStep) {
          this.setupSteps.push(setupStep);
        };
        ValidationPropertyMetadata.prototype.setup = function setup(validation) {
          validation.ensure(this.propertyName);
          this.setupSteps.forEach(function(setupStep) {
            setupStep(validation);
          });
        };
        return ValidationPropertyMetadata;
      })();
    }
  };
});

System.register("github:aurelia/validation@0.2.5/validation/validation-config", ["github:aurelia/validation@0.2.5/validation/validation-locale", "github:aurelia/validation@0.2.5/validation/validate-custom-attribute-view-strategy"], function(_export) {
  var ValidationLocale,
      ValidateCustomAttributeViewStrategy,
      _classCallCheck,
      ValidationConfigDefaults,
      ValidationConfig;
  return {
    setters: [function(_validationValidationLocale) {
      ValidationLocale = _validationValidationLocale.ValidationLocale;
    }, function(_validationValidateCustomAttributeViewStrategy) {
      ValidateCustomAttributeViewStrategy = _validationValidateCustomAttributeViewStrategy.ValidateCustomAttributeViewStrategy;
    }],
    execute: function() {
      'use strict';
      _classCallCheck = function(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError('Cannot call a class as a function');
        }
      };
      ValidationConfigDefaults = function ValidationConfigDefaults() {
        _classCallCheck(this, ValidationConfigDefaults);
      };
      _export('ValidationConfigDefaults', ValidationConfigDefaults);
      ValidationConfigDefaults._defaults = {
        debounceTimeout: 0,
        dependencies: [],
        locale: 'en-US',
        localeResources: 'aurelia-validation/resources/',
        viewStrategy: ValidateCustomAttributeViewStrategy.TWBootstrapAppendToMessage
      };
      ValidationConfigDefaults.defaults = function() {
        var defaults = {};
        Object.assign(defaults, ValidationConfigDefaults._defaults);
        return defaults;
      };
      ValidationConfig = (function() {
        function ValidationConfig(innerConfig) {
          _classCallCheck(this, ValidationConfig);
          this.innerConfig = innerConfig;
          this.values = this.innerConfig ? {} : ValidationConfigDefaults.defaults();
          this.changedHandlers = new Map();
        }
        ValidationConfig.prototype.getValue = function getValue(identifier) {
          if (this.values.hasOwnProperty(identifier) !== null && this.values[identifier] !== undefined) {
            return this.values[identifier];
          }
          if (this.innerConfig !== null) {
            return this.innerConfig.getValue(identifier);
          }
          throw Error('Config not found: ' + identifier);
        };
        ValidationConfig.prototype.setValue = function setValue(identifier, value) {
          this.values[identifier] = value;
          return this;
        };
        ValidationConfig.prototype.onLocaleChanged = function onLocaleChanged(callback) {
          var _this = this;
          if (this.innerConfig !== undefined) {
            return this.innerConfig.onLocaleChanged(callback);
          } else {
            var _ret = (function() {
              var id = ++ValidationConfig.uniqueListenerId;
              _this.changedHandlers.set(id, callback);
              return {v: function() {
                  _this.changedHandlers['delete'](id);
                }};
            })();
            if (typeof _ret === 'object') {
              return _ret.v;
            }
          }
        };
        ValidationConfig.prototype.getDebounceTimeout = function getDebounceTimeout() {
          return this.getValue('debounceTimeout');
        };
        ValidationConfig.prototype.useDebounceTimeout = function useDebounceTimeout(value) {
          return this.setValue('debounceTimeout', value);
        };
        ValidationConfig.prototype.getDependencies = function getDependencies() {
          return this.getValue('dependencies');
        };
        ValidationConfig.prototype.computedFrom = function computedFrom(dependencies) {
          var deps = dependencies;
          if (typeof dependencies === 'string') {
            deps = [];
            deps.push(dependencies);
          }
          return this.setValue('dependencies', deps);
        };
        ValidationConfig.prototype.useLocale = function useLocale(localeIdentifier) {
          this.setValue('locale', localeIdentifier);
          var callbacks = Array.from(this.changedHandlers.values());
          for (var i = 0; i < callbacks.length; i++) {
            callbacks[i]();
          }
          return this;
        };
        ValidationConfig.prototype.locale = function locale() {
          return ValidationLocale.Repository.load(this.getValue('locale'), this.getValue('localeResources'));
        };
        ValidationConfig.prototype.useViewStrategy = function useViewStrategy(viewStrategy) {
          return this.setValue('viewStrategy', viewStrategy);
        };
        ValidationConfig.prototype.getViewStrategy = function getViewStrategy() {
          return this.getValue('viewStrategy');
        };
        return ValidationConfig;
      })();
      _export('ValidationConfig', ValidationConfig);
      ValidationConfig.uniqueListenerId = 0;
    }
  };
});

System.register("npm:core-js@0.9.16/modules/$", ["npm:core-js@0.9.16/modules/$.fw"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var global = typeof self != 'undefined' ? self : Function('return this')(),
      core = {},
      defineProperty = Object.defineProperty,
      hasOwnProperty = {}.hasOwnProperty,
      ceil = Math.ceil,
      floor = Math.floor,
      max = Math.max,
      min = Math.min;
  var DESC = !!function() {
    try {
      return defineProperty({}, 'a', {get: function() {
          return 2;
        }}).a == 2;
    } catch (e) {}
  }();
  var hide = createDefiner(1);
  function toInteger(it) {
    return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
  }
  function desc(bitmap, value) {
    return {
      enumerable: !(bitmap & 1),
      configurable: !(bitmap & 2),
      writable: !(bitmap & 4),
      value: value
    };
  }
  function simpleSet(object, key, value) {
    object[key] = value;
    return object;
  }
  function createDefiner(bitmap) {
    return DESC ? function(object, key, value) {
      return $.setDesc(object, key, desc(bitmap, value));
    } : simpleSet;
  }
  function isObject(it) {
    return it !== null && (typeof it == 'object' || typeof it == 'function');
  }
  function isFunction(it) {
    return typeof it == 'function';
  }
  function assertDefined(it) {
    if (it == undefined)
      throw TypeError("Can't call method on  " + it);
    return it;
  }
  var $ = module.exports = require("npm:core-js@0.9.16/modules/$.fw")({
    g: global,
    core: core,
    html: global.document && document.documentElement,
    isObject: isObject,
    isFunction: isFunction,
    that: function() {
      return this;
    },
    toInteger: toInteger,
    toLength: function(it) {
      return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0;
    },
    toIndex: function(index, length) {
      index = toInteger(index);
      return index < 0 ? max(index + length, 0) : min(index, length);
    },
    has: function(it, key) {
      return hasOwnProperty.call(it, key);
    },
    create: Object.create,
    getProto: Object.getPrototypeOf,
    DESC: DESC,
    desc: desc,
    getDesc: Object.getOwnPropertyDescriptor,
    setDesc: defineProperty,
    setDescs: Object.defineProperties,
    getKeys: Object.keys,
    getNames: Object.getOwnPropertyNames,
    getSymbols: Object.getOwnPropertySymbols,
    assertDefined: assertDefined,
    ES5Object: Object,
    toObject: function(it) {
      return $.ES5Object(assertDefined(it));
    },
    hide: hide,
    def: createDefiner(0),
    set: global.Symbol ? simpleSet : hide,
    each: [].forEach
  });
  if (typeof __e != 'undefined')
    __e = core;
  if (typeof __g != 'undefined')
    __g = global;
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.16/modules/$.wks", ["npm:core-js@0.9.16/modules/$", "npm:core-js@0.9.16/modules/$.shared", "npm:core-js@0.9.16/modules/$.uid"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var global = require("npm:core-js@0.9.16/modules/$").g,
      store = require("npm:core-js@0.9.16/modules/$.shared")('wks');
  module.exports = function(name) {
    return store[name] || (store[name] = global.Symbol && global.Symbol[name] || require("npm:core-js@0.9.16/modules/$.uid").safe('Symbol.' + name));
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.16/modules/$.def", ["npm:core-js@0.9.16/modules/$", "npm:core-js@0.9.16/modules/$.redef"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@0.9.16/modules/$"),
      global = $.g,
      core = $.core,
      isFunction = $.isFunction,
      $redef = require("npm:core-js@0.9.16/modules/$.redef");
  function ctx(fn, that) {
    return function() {
      return fn.apply(that, arguments);
    };
  }
  global.core = core;
  $def.F = 1;
  $def.G = 2;
  $def.S = 4;
  $def.P = 8;
  $def.B = 16;
  $def.W = 32;
  function $def(type, name, source) {
    var key,
        own,
        out,
        exp,
        isGlobal = type & $def.G,
        isProto = type & $def.P,
        target = isGlobal ? global : type & $def.S ? global[name] : (global[name] || {}).prototype,
        exports = isGlobal ? core : core[name] || (core[name] = {});
    if (isGlobal)
      source = name;
    for (key in source) {
      own = !(type & $def.F) && target && key in target;
      out = (own ? target : source)[key];
      if (type & $def.B && own)
        exp = ctx(out, global);
      else
        exp = isProto && isFunction(out) ? ctx(Function.call, out) : out;
      if (target && !own)
        $redef(target, key, out);
      if (exports[key] != out)
        $.hide(exports, key, exp);
      if (isProto)
        (exports.prototype || (exports.prototype = {}))[key] = out;
    }
  }
  module.exports = $def;
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.16/modules/$.ctx", ["npm:core-js@0.9.16/modules/$.assert"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var assertFunction = require("npm:core-js@0.9.16/modules/$.assert").fn;
  module.exports = function(fn, that, length) {
    assertFunction(fn);
    if (~length && that === undefined)
      return fn;
    switch (length) {
      case 1:
        return function(a) {
          return fn.call(that, a);
        };
      case 2:
        return function(a, b) {
          return fn.call(that, a, b);
        };
      case 3:
        return function(a, b, c) {
          return fn.call(that, a, b, c);
        };
    }
    return function() {
      return fn.apply(that, arguments);
    };
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.16/modules/es6.symbol", ["npm:core-js@0.9.16/modules/$", "npm:core-js@0.9.16/modules/$.cof", "npm:core-js@0.9.16/modules/$.uid", "npm:core-js@0.9.16/modules/$.shared", "npm:core-js@0.9.16/modules/$.def", "npm:core-js@0.9.16/modules/$.redef", "npm:core-js@0.9.16/modules/$.keyof", "npm:core-js@0.9.16/modules/$.enum-keys", "npm:core-js@0.9.16/modules/$.assert", "npm:core-js@0.9.16/modules/$.get-names", "npm:core-js@0.9.16/modules/$.wks"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var $ = require("npm:core-js@0.9.16/modules/$"),
      setTag = require("npm:core-js@0.9.16/modules/$.cof").set,
      uid = require("npm:core-js@0.9.16/modules/$.uid"),
      shared = require("npm:core-js@0.9.16/modules/$.shared"),
      $def = require("npm:core-js@0.9.16/modules/$.def"),
      $redef = require("npm:core-js@0.9.16/modules/$.redef"),
      keyOf = require("npm:core-js@0.9.16/modules/$.keyof"),
      enumKeys = require("npm:core-js@0.9.16/modules/$.enum-keys"),
      assertObject = require("npm:core-js@0.9.16/modules/$.assert").obj,
      ObjectProto = Object.prototype,
      DESC = $.DESC,
      has = $.has,
      $create = $.create,
      getDesc = $.getDesc,
      setDesc = $.setDesc,
      desc = $.desc,
      $names = require("npm:core-js@0.9.16/modules/$.get-names"),
      getNames = $names.get,
      toObject = $.toObject,
      $Symbol = $.g.Symbol,
      setter = false,
      TAG = uid('tag'),
      HIDDEN = uid('hidden'),
      _propertyIsEnumerable = {}.propertyIsEnumerable,
      SymbolRegistry = shared('symbol-registry'),
      AllSymbols = shared('symbols'),
      useNative = $.isFunction($Symbol);
  var setSymbolDesc = DESC ? function() {
    try {
      return $create(setDesc({}, HIDDEN, {get: function() {
          return setDesc(this, HIDDEN, {value: false})[HIDDEN];
        }}))[HIDDEN] || setDesc;
    } catch (e) {
      return function(it, key, D) {
        var protoDesc = getDesc(ObjectProto, key);
        if (protoDesc)
          delete ObjectProto[key];
        setDesc(it, key, D);
        if (protoDesc && it !== ObjectProto)
          setDesc(ObjectProto, key, protoDesc);
      };
    }
  }() : setDesc;
  function wrap(tag) {
    var sym = AllSymbols[tag] = $.set($create($Symbol.prototype), TAG, tag);
    DESC && setter && setSymbolDesc(ObjectProto, tag, {
      configurable: true,
      set: function(value) {
        if (has(this, HIDDEN) && has(this[HIDDEN], tag))
          this[HIDDEN][tag] = false;
        setSymbolDesc(this, tag, desc(1, value));
      }
    });
    return sym;
  }
  function defineProperty(it, key, D) {
    if (D && has(AllSymbols, key)) {
      if (!D.enumerable) {
        if (!has(it, HIDDEN))
          setDesc(it, HIDDEN, desc(1, {}));
        it[HIDDEN][key] = true;
      } else {
        if (has(it, HIDDEN) && it[HIDDEN][key])
          it[HIDDEN][key] = false;
        D = $create(D, {enumerable: desc(0, false)});
      }
      return setSymbolDesc(it, key, D);
    }
    return setDesc(it, key, D);
  }
  function defineProperties(it, P) {
    assertObject(it);
    var keys = enumKeys(P = toObject(P)),
        i = 0,
        l = keys.length,
        key;
    while (l > i)
      defineProperty(it, key = keys[i++], P[key]);
    return it;
  }
  function create(it, P) {
    return P === undefined ? $create(it) : defineProperties($create(it), P);
  }
  function propertyIsEnumerable(key) {
    var E = _propertyIsEnumerable.call(this, key);
    return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
  }
  function getOwnPropertyDescriptor(it, key) {
    var D = getDesc(it = toObject(it), key);
    if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))
      D.enumerable = true;
    return D;
  }
  function getOwnPropertyNames(it) {
    var names = getNames(toObject(it)),
        result = [],
        i = 0,
        key;
    while (names.length > i)
      if (!has(AllSymbols, key = names[i++]) && key != HIDDEN)
        result.push(key);
    return result;
  }
  function getOwnPropertySymbols(it) {
    var names = getNames(toObject(it)),
        result = [],
        i = 0,
        key;
    while (names.length > i)
      if (has(AllSymbols, key = names[i++]))
        result.push(AllSymbols[key]);
    return result;
  }
  if (!useNative) {
    $Symbol = function Symbol() {
      if (this instanceof $Symbol)
        throw TypeError('Symbol is not a constructor');
      return wrap(uid(arguments[0]));
    };
    $redef($Symbol.prototype, 'toString', function() {
      return this[TAG];
    });
    $.create = create;
    $.setDesc = defineProperty;
    $.getDesc = getOwnPropertyDescriptor;
    $.setDescs = defineProperties;
    $.getNames = $names.get = getOwnPropertyNames;
    $.getSymbols = getOwnPropertySymbols;
    if ($.DESC && $.FW)
      $redef(ObjectProto, 'propertyIsEnumerable', propertyIsEnumerable, true);
  }
  var symbolStatics = {
    'for': function(key) {
      return has(SymbolRegistry, key += '') ? SymbolRegistry[key] : SymbolRegistry[key] = $Symbol(key);
    },
    keyFor: function keyFor(key) {
      return keyOf(SymbolRegistry, key);
    },
    useSetter: function() {
      setter = true;
    },
    useSimple: function() {
      setter = false;
    }
  };
  $.each.call(('hasInstance,isConcatSpreadable,iterator,match,replace,search,' + 'species,split,toPrimitive,toStringTag,unscopables').split(','), function(it) {
    var sym = require("npm:core-js@0.9.16/modules/$.wks")(it);
    symbolStatics[it] = useNative ? sym : wrap(sym);
  });
  setter = true;
  $def($def.G + $def.W, {Symbol: $Symbol});
  $def($def.S, 'Symbol', symbolStatics);
  $def($def.S + $def.F * !useNative, 'Object', {
    create: create,
    defineProperty: defineProperty,
    defineProperties: defineProperties,
    getOwnPropertyDescriptor: getOwnPropertyDescriptor,
    getOwnPropertyNames: getOwnPropertyNames,
    getOwnPropertySymbols: getOwnPropertySymbols
  });
  setTag($Symbol, 'Symbol');
  setTag(Math, 'Math', true);
  setTag($.g.JSON, 'JSON', true);
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.16/modules/es6.object.assign", ["npm:core-js@0.9.16/modules/$.def", "npm:core-js@0.9.16/modules/$.assign"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $def = require("npm:core-js@0.9.16/modules/$.def");
  $def($def.S, 'Object', {assign: require("npm:core-js@0.9.16/modules/$.assign")});
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.16/modules/es6.object.is", ["npm:core-js@0.9.16/modules/$.def", "npm:core-js@0.9.16/modules/$.same"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $def = require("npm:core-js@0.9.16/modules/$.def");
  $def($def.S, 'Object', {is: require("npm:core-js@0.9.16/modules/$.same")});
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.16/modules/es6.object.set-prototype-of", ["npm:core-js@0.9.16/modules/$.def", "npm:core-js@0.9.16/modules/$.set-proto"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $def = require("npm:core-js@0.9.16/modules/$.def");
  $def($def.S, 'Object', {setPrototypeOf: require("npm:core-js@0.9.16/modules/$.set-proto").set});
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.16/modules/es6.string.iterator", ["npm:core-js@0.9.16/modules/$", "npm:core-js@0.9.16/modules/$.string-at", "npm:core-js@0.9.16/modules/$.uid", "npm:core-js@0.9.16/modules/$.iter", "npm:core-js@0.9.16/modules/$.iter-define"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var set = require("npm:core-js@0.9.16/modules/$").set,
      $at = require("npm:core-js@0.9.16/modules/$.string-at")(true),
      ITER = require("npm:core-js@0.9.16/modules/$.uid").safe('iter'),
      $iter = require("npm:core-js@0.9.16/modules/$.iter"),
      step = $iter.step;
  require("npm:core-js@0.9.16/modules/$.iter-define")(String, 'String', function(iterated) {
    set(this, ITER, {
      o: String(iterated),
      i: 0
    });
  }, function() {
    var iter = this[ITER],
        O = iter.o,
        index = iter.i,
        point;
    if (index >= O.length)
      return step(1);
    point = $at(O, index);
    iter.i += point.length;
    return step(0, point);
  });
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.16/modules/es6.string.repeat", ["npm:core-js@0.9.16/modules/$.def", "npm:core-js@0.9.16/modules/$.string-repeat"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $def = require("npm:core-js@0.9.16/modules/$.def");
  $def($def.P, 'String', {repeat: require("npm:core-js@0.9.16/modules/$.string-repeat")});
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.16/modules/es6.array.from", ["npm:core-js@0.9.16/modules/$", "npm:core-js@0.9.16/modules/$.ctx", "npm:core-js@0.9.16/modules/$.def", "npm:core-js@0.9.16/modules/$.iter", "npm:core-js@0.9.16/modules/$.iter-call", "npm:core-js@0.9.16/modules/$.iter-detect"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@0.9.16/modules/$"),
      ctx = require("npm:core-js@0.9.16/modules/$.ctx"),
      $def = require("npm:core-js@0.9.16/modules/$.def"),
      $iter = require("npm:core-js@0.9.16/modules/$.iter"),
      call = require("npm:core-js@0.9.16/modules/$.iter-call");
  $def($def.S + $def.F * !require("npm:core-js@0.9.16/modules/$.iter-detect")(function(iter) {
    Array.from(iter);
  }), 'Array', {from: function from(arrayLike) {
      var O = Object($.assertDefined(arrayLike)),
          mapfn = arguments[1],
          mapping = mapfn !== undefined,
          f = mapping ? ctx(mapfn, arguments[2], 2) : undefined,
          index = 0,
          length,
          result,
          step,
          iterator;
      if ($iter.is(O)) {
        iterator = $iter.get(O);
        result = new (typeof this == 'function' ? this : Array);
        for (; !(step = iterator.next()).done; index++) {
          result[index] = mapping ? call(iterator, f, [step.value, index], true) : step.value;
        }
      } else {
        result = new (typeof this == 'function' ? this : Array)(length = $.toLength(O.length));
        for (; length > index; index++) {
          result[index] = mapping ? f(O[index], index) : O[index];
        }
      }
      result.length = index;
      return result;
    }});
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.16/modules/es6.array.iterator", ["npm:core-js@0.9.16/modules/$", "npm:core-js@0.9.16/modules/$.unscope", "npm:core-js@0.9.16/modules/$.uid", "npm:core-js@0.9.16/modules/$.iter", "npm:core-js@0.9.16/modules/$.iter-define"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@0.9.16/modules/$"),
      setUnscope = require("npm:core-js@0.9.16/modules/$.unscope"),
      ITER = require("npm:core-js@0.9.16/modules/$.uid").safe('iter'),
      $iter = require("npm:core-js@0.9.16/modules/$.iter"),
      step = $iter.step,
      Iterators = $iter.Iterators;
  require("npm:core-js@0.9.16/modules/$.iter-define")(Array, 'Array', function(iterated, kind) {
    $.set(this, ITER, {
      o: $.toObject(iterated),
      i: 0,
      k: kind
    });
  }, function() {
    var iter = this[ITER],
        O = iter.o,
        kind = iter.k,
        index = iter.i++;
    if (!O || index >= O.length) {
      iter.o = undefined;
      return step(1);
    }
    if (kind == 'keys')
      return step(0, index);
    if (kind == 'values')
      return step(0, O[index]);
    return step(0, [index, O[index]]);
  }, 'values');
  Iterators.Arguments = Iterators.Array;
  setUnscope('keys');
  setUnscope('values');
  setUnscope('entries');
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.16/modules/es6.array.species", ["npm:core-js@0.9.16/modules/$.species"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  require("npm:core-js@0.9.16/modules/$.species")(Array);
  global.define = __define;
  return module.exports;
});

System.register("npm:process@0.10.1", ["npm:process@0.10.1/browser"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = require("npm:process@0.10.1/browser");
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.16/modules/es6.map", ["npm:core-js@0.9.16/modules/$.collection-strong", "npm:core-js@0.9.16/modules/$.collection"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var strong = require("npm:core-js@0.9.16/modules/$.collection-strong");
  require("npm:core-js@0.9.16/modules/$.collection")('Map', function(get) {
    return function Map() {
      return get(this, arguments[0]);
    };
  }, {
    get: function get(key) {
      var entry = strong.getEntry(this, key);
      return entry && entry.v;
    },
    set: function set(key, value) {
      return strong.def(this, key === 0 ? 0 : key, value);
    }
  }, strong, true);
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.16/modules/es6.weak-map", ["npm:core-js@0.9.16/modules/$", "npm:core-js@0.9.16/modules/$.collection-weak", "npm:core-js@0.9.16/modules/$.collection", "npm:core-js@0.9.16/modules/$.redef"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var $ = require("npm:core-js@0.9.16/modules/$"),
      weak = require("npm:core-js@0.9.16/modules/$.collection-weak"),
      leakStore = weak.leakStore,
      ID = weak.ID,
      WEAK = weak.WEAK,
      has = $.has,
      isObject = $.isObject,
      isExtensible = Object.isExtensible || isObject,
      tmp = {};
  var $WeakMap = require("npm:core-js@0.9.16/modules/$.collection")('WeakMap', function(get) {
    return function WeakMap() {
      return get(this, arguments[0]);
    };
  }, {
    get: function get(key) {
      if (isObject(key)) {
        if (!isExtensible(key))
          return leakStore(this).get(key);
        if (has(key, WEAK))
          return key[WEAK][this[ID]];
      }
    },
    set: function set(key, value) {
      return weak.def(this, key, value);
    }
  }, weak, true, true);
  if (new $WeakMap().set((Object.freeze || Object)(tmp), 7).get(tmp) != 7) {
    $.each.call(['delete', 'has', 'get', 'set'], function(key) {
      var proto = $WeakMap.prototype,
          method = proto[key];
      require("npm:core-js@0.9.16/modules/$.redef")(proto, key, function(a, b) {
        if (isObject(a) && !isExtensible(a)) {
          var result = leakStore(this)[key](a, b);
          return key == 'set' ? this : result;
        }
        return method.call(this, a, b);
      });
    });
  }
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.16/modules/es6.reflect", ["npm:core-js@0.9.16/modules/$", "npm:core-js@0.9.16/modules/$.def", "npm:core-js@0.9.16/modules/$.set-proto", "npm:core-js@0.9.16/modules/$.iter", "npm:core-js@0.9.16/modules/$.wks", "npm:core-js@0.9.16/modules/$.uid", "npm:core-js@0.9.16/modules/$.assert", "npm:core-js@0.9.16/modules/$.own-keys"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@0.9.16/modules/$"),
      $def = require("npm:core-js@0.9.16/modules/$.def"),
      setProto = require("npm:core-js@0.9.16/modules/$.set-proto"),
      $iter = require("npm:core-js@0.9.16/modules/$.iter"),
      ITERATOR = require("npm:core-js@0.9.16/modules/$.wks")('iterator'),
      ITER = require("npm:core-js@0.9.16/modules/$.uid").safe('iter'),
      step = $iter.step,
      assert = require("npm:core-js@0.9.16/modules/$.assert"),
      isObject = $.isObject,
      getProto = $.getProto,
      $Reflect = $.g.Reflect,
      _apply = Function.apply,
      assertObject = assert.obj,
      _isExtensible = Object.isExtensible || isObject,
      _preventExtensions = Object.preventExtensions,
      buggyEnumerate = !($Reflect && $Reflect.enumerate && ITERATOR in $Reflect.enumerate({}));
  function Enumerate(iterated) {
    $.set(this, ITER, {
      o: iterated,
      k: undefined,
      i: 0
    });
  }
  $iter.create(Enumerate, 'Object', function() {
    var iter = this[ITER],
        keys = iter.k,
        key;
    if (keys == undefined) {
      iter.k = keys = [];
      for (key in iter.o)
        keys.push(key);
    }
    do {
      if (iter.i >= keys.length)
        return step(1);
    } while (!((key = keys[iter.i++]) in iter.o));
    return step(0, key);
  });
  var reflect = {
    apply: function apply(target, thisArgument, argumentsList) {
      return _apply.call(target, thisArgument, argumentsList);
    },
    construct: function construct(target, argumentsList) {
      var proto = assert.fn(arguments.length < 3 ? target : arguments[2]).prototype,
          instance = $.create(isObject(proto) ? proto : Object.prototype),
          result = _apply.call(target, instance, argumentsList);
      return isObject(result) ? result : instance;
    },
    defineProperty: function defineProperty(target, propertyKey, attributes) {
      assertObject(target);
      try {
        $.setDesc(target, propertyKey, attributes);
        return true;
      } catch (e) {
        return false;
      }
    },
    deleteProperty: function deleteProperty(target, propertyKey) {
      var desc = $.getDesc(assertObject(target), propertyKey);
      return desc && !desc.configurable ? false : delete target[propertyKey];
    },
    get: function get(target, propertyKey) {
      var receiver = arguments.length < 3 ? target : arguments[2],
          desc = $.getDesc(assertObject(target), propertyKey),
          proto;
      if (desc)
        return $.has(desc, 'value') ? desc.value : desc.get === undefined ? undefined : desc.get.call(receiver);
      return isObject(proto = getProto(target)) ? get(proto, propertyKey, receiver) : undefined;
    },
    getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey) {
      return $.getDesc(assertObject(target), propertyKey);
    },
    getPrototypeOf: function getPrototypeOf(target) {
      return getProto(assertObject(target));
    },
    has: function has(target, propertyKey) {
      return propertyKey in target;
    },
    isExtensible: function isExtensible(target) {
      return _isExtensible(assertObject(target));
    },
    ownKeys: require("npm:core-js@0.9.16/modules/$.own-keys"),
    preventExtensions: function preventExtensions(target) {
      assertObject(target);
      try {
        if (_preventExtensions)
          _preventExtensions(target);
        return true;
      } catch (e) {
        return false;
      }
    },
    set: function set(target, propertyKey, V) {
      var receiver = arguments.length < 4 ? target : arguments[3],
          ownDesc = $.getDesc(assertObject(target), propertyKey),
          existingDescriptor,
          proto;
      if (!ownDesc) {
        if (isObject(proto = getProto(target))) {
          return set(proto, propertyKey, V, receiver);
        }
        ownDesc = $.desc(0);
      }
      if ($.has(ownDesc, 'value')) {
        if (ownDesc.writable === false || !isObject(receiver))
          return false;
        existingDescriptor = $.getDesc(receiver, propertyKey) || $.desc(0);
        existingDescriptor.value = V;
        $.setDesc(receiver, propertyKey, existingDescriptor);
        return true;
      }
      return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
    }
  };
  if (setProto)
    reflect.setPrototypeOf = function setPrototypeOf(target, proto) {
      setProto.check(target, proto);
      try {
        setProto.set(target, proto);
        return true;
      } catch (e) {
        return false;
      }
    };
  $def($def.G, {Reflect: {}});
  $def($def.S + $def.F * buggyEnumerate, 'Reflect', {enumerate: function enumerate(target) {
      return new Enumerate(assertObject(target));
    }});
  $def($def.S, 'Reflect', reflect);
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.16/modules/es7.string.lpad", ["npm:core-js@0.9.16/modules/$.def", "npm:core-js@0.9.16/modules/$.string-pad"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var $def = require("npm:core-js@0.9.16/modules/$.def"),
      $pad = require("npm:core-js@0.9.16/modules/$.string-pad");
  $def($def.P, 'String', {lpad: function lpad(n) {
      return $pad(this, n, arguments[1], true);
    }});
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.16/modules/es7.map.to-json", ["npm:core-js@0.9.16/modules/$.collection-to-json"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  require("npm:core-js@0.9.16/modules/$.collection-to-json")('Map');
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.16/modules/web.timers", ["npm:core-js@0.9.16/modules/$", "npm:core-js@0.9.16/modules/$.def", "npm:core-js@0.9.16/modules/$.invoke", "npm:core-js@0.9.16/modules/$.partial"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@0.9.16/modules/$"),
      $def = require("npm:core-js@0.9.16/modules/$.def"),
      invoke = require("npm:core-js@0.9.16/modules/$.invoke"),
      partial = require("npm:core-js@0.9.16/modules/$.partial"),
      navigator = $.g.navigator,
      MSIE = !!navigator && /MSIE .\./.test(navigator.userAgent);
  function wrap(set) {
    return MSIE ? function(fn, time) {
      return set(invoke(partial, [].slice.call(arguments, 2), $.isFunction(fn) ? fn : Function(fn)), time);
    } : set;
  }
  $def($def.G + $def.B + $def.F * MSIE, {
    setTimeout: wrap($.g.setTimeout),
    setInterval: wrap($.g.setInterval)
  });
  global.define = __define;
  return module.exports;
});

System.register("github:aurelia/metadata@0.6.0/metadata", ["github:aurelia/metadata@0.6.0/reflect-metadata"], function(_export) {
  'use strict';
  var meta,
      Metadata;
  function ensureDecorators(target) {
    var applicator;
    if (typeof target.decorators === 'function') {
      applicator = target.decorators();
    } else {
      applicator = target.decorators;
    }
    if (typeof applicator._decorate === 'function') {
      delete target.decorators;
      applicator._decorate(target);
    } else {
      throw new Error('The return value of your decorator\'s method was not valid.');
    }
  }
  return {
    setters: [function(_reflectMetadata) {
      meta = _reflectMetadata['default'];
    }],
    execute: function() {
      Metadata = {
        resource: 'aurelia:resource',
        paramTypes: 'design:paramtypes',
        properties: 'design:properties',
        get: function get(metadataKey, target, propertyKey) {
          if (!target) {
            return undefined;
          }
          var result = Metadata.getOwn(metadataKey, target, propertyKey);
          return result === undefined ? Metadata.get(metadataKey, Object.getPrototypeOf(target), propertyKey) : result;
        },
        getOwn: function getOwn(metadataKey, target, propertyKey) {
          if (!target) {
            return undefined;
          }
          if (target.hasOwnProperty('decorators')) {
            ensureDecorators(target);
          }
          return Reflect.getOwnMetadata(metadataKey, target, propertyKey);
        },
        getOrCreateOwn: function getOrCreateOwn(metadataKey, Type, target, propertyKey) {
          var result = Metadata.getOwn(metadataKey, target, propertyKey);
          if (result === undefined) {
            result = new Type();
            Reflect.defineMetadata(metadataKey, result, target, propertyKey);
          }
          return result;
        }
      };
      _export('Metadata', Metadata);
    }
  };
});

System.register("github:aurelia/metadata@0.6.0/decorators", ["github:aurelia/metadata@0.6.0/decorator-applicator"], function(_export) {
  'use strict';
  var DecoratorApplicator,
      Decorators;
  return {
    setters: [function(_decoratorApplicator) {
      DecoratorApplicator = _decoratorApplicator.DecoratorApplicator;
    }],
    execute: function() {
      Decorators = {configure: {
          parameterizedDecorator: function parameterizedDecorator(name, decorator) {
            Decorators[name] = function() {
              var applicator = new DecoratorApplicator();
              return applicator[name].apply(applicator, arguments);
            };
            DecoratorApplicator.prototype[name] = function() {
              var result = decorator.apply(null, arguments);
              return this.decorator(result);
            };
          },
          simpleDecorator: function simpleDecorator(name, decorator) {
            Decorators[name] = function() {
              return new DecoratorApplicator().decorator(decorator);
            };
            DecoratorApplicator.prototype[name] = function() {
              return this.decorator(decorator);
            };
          }
        }};
      _export('Decorators', Decorators);
    }
  };
});

System.register("github:aurelia/task-queue@0.5.0", ["github:aurelia/task-queue@0.5.0/index"], function($__export) {
  return {
    setters: [function(m) {
      for (var p in m)
        $__export(p, m[p]);
    }],
    execute: function() {}
  };
});

System.register("github:aurelia/binding@0.7.3/collection-observation", ["github:aurelia/binding@0.7.3/array-change-records", "github:aurelia/binding@0.7.3/map-change-records"], function(_export) {
  'use strict';
  var calcSplices,
      projectArraySplices,
      getChangeRecords,
      ModifyCollectionObserver,
      CollectionLengthObserver;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }
  return {
    setters: [function(_arrayChangeRecords) {
      calcSplices = _arrayChangeRecords.calcSplices;
      projectArraySplices = _arrayChangeRecords.projectArraySplices;
    }, function(_mapChangeRecords) {
      getChangeRecords = _mapChangeRecords.getChangeRecords;
    }],
    execute: function() {
      ModifyCollectionObserver = (function() {
        function ModifyCollectionObserver(taskQueue, collection) {
          _classCallCheck(this, ModifyCollectionObserver);
          this.taskQueue = taskQueue;
          this.queued = false;
          this.callbacks = [];
          this.changeRecords = [];
          this.oldCollection = null;
          this.collection = collection;
          this.lengthPropertyName = collection instanceof Map ? 'size' : 'length';
        }
        ModifyCollectionObserver.prototype.subscribe = function subscribe(callback) {
          var callbacks = this.callbacks;
          callbacks.push(callback);
          return function() {
            callbacks.splice(callbacks.indexOf(callback), 1);
          };
        };
        ModifyCollectionObserver.prototype.addChangeRecord = function addChangeRecord(changeRecord) {
          if (this.callbacks.length === 0 && !this.lengthObserver) {
            return ;
          }
          this.changeRecords.push(changeRecord);
          if (!this.queued) {
            this.queued = true;
            this.taskQueue.queueMicroTask(this);
          }
        };
        ModifyCollectionObserver.prototype.reset = function reset(oldCollection) {
          if (!this.callbacks.length) {
            return ;
          }
          this.oldCollection = oldCollection;
          if (!this.queued) {
            this.queued = true;
            this.taskQueue.queueMicroTask(this);
          }
        };
        ModifyCollectionObserver.prototype.getLengthObserver = function getLengthObserver() {
          return this.lengthObserver || (this.lengthObserver = new CollectionLengthObserver(this.collection));
        };
        ModifyCollectionObserver.prototype.call = function call() {
          var callbacks = this.callbacks,
              i = callbacks.length,
              changeRecords = this.changeRecords,
              oldCollection = this.oldCollection,
              records;
          this.queued = false;
          this.changeRecords = [];
          this.oldCollection = null;
          if (i) {
            if (oldCollection) {
              if (this.collection instanceof Map) {
                records = getChangeRecords(oldCollection);
              } else {
                records = calcSplices(this.collection, 0, this.collection.length, oldCollection, 0, oldCollection.length);
              }
            } else {
              if (this.collection instanceof Map) {
                records = changeRecords;
              } else {
                records = projectArraySplices(this.collection, changeRecords);
              }
            }
            while (i--) {
              callbacks[i](records);
            }
          }
          if (this.lengthObserver) {
            this.lengthObserver.call(this.collection[this.lengthPropertyName]);
          }
        };
        return ModifyCollectionObserver;
      })();
      _export('ModifyCollectionObserver', ModifyCollectionObserver);
      CollectionLengthObserver = (function() {
        function CollectionLengthObserver(collection) {
          _classCallCheck(this, CollectionLengthObserver);
          this.collection = collection;
          this.callbacks = [];
          this.lengthPropertyName = collection instanceof Map ? 'size' : 'length';
          this.currentValue = collection[this.lengthPropertyName];
        }
        CollectionLengthObserver.prototype.getValue = function getValue() {
          return this.collection[this.lengthPropertyName];
        };
        CollectionLengthObserver.prototype.setValue = function setValue(newValue) {
          this.collection[this.lengthPropertyName] = newValue;
        };
        CollectionLengthObserver.prototype.subscribe = function subscribe(callback) {
          var callbacks = this.callbacks;
          callbacks.push(callback);
          return function() {
            callbacks.splice(callbacks.indexOf(callback), 1);
          };
        };
        CollectionLengthObserver.prototype.call = function call(newValue) {
          var callbacks = this.callbacks,
              i = callbacks.length,
              oldValue = this.currentValue;
          while (i--) {
            callbacks[i](newValue, oldValue);
          }
          this.currentValue = newValue;
        };
        return CollectionLengthObserver;
      })();
      _export('CollectionLengthObserver', CollectionLengthObserver);
    }
  };
});

System.register("github:aurelia/logging@0.5.0", ["github:aurelia/logging@0.5.0/index"], function($__export) {
  return {
    setters: [function(m) {
      for (var p in m)
        $__export(p, m[p]);
    }],
    execute: function() {}
  };
});

System.register("github:aurelia/binding@0.7.3/ast", ["github:aurelia/binding@0.7.3/path-observer", "github:aurelia/binding@0.7.3/composite-observer", "github:aurelia/binding@0.7.3/access-keyed-observer"], function(_export) {
  'use strict';
  var PathObserver,
      CompositeObserver,
      AccessKeyedObserver,
      Expression,
      Chain,
      ValueConverter,
      Assign,
      Conditional,
      AccessScope,
      AccessMember,
      AccessKeyed,
      CallScope,
      CallMember,
      CallFunction,
      Binary,
      PrefixNot,
      LiteralPrimitive,
      LiteralString,
      LiteralArray,
      LiteralObject,
      Unparser,
      evalListCache;
  function _inherits(subClass, superClass) {
    if (typeof superClass !== 'function' && superClass !== null) {
      throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }});
    if (superClass)
      subClass.__proto__ = superClass;
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }
  function evalList(scope, list, valueConverters) {
    var length = list.length,
        cacheLength,
        i;
    for (cacheLength = evalListCache.length; cacheLength <= length; ++cacheLength) {
      evalListCache.push([]);
    }
    var result = evalListCache[length];
    for (i = 0; i < length; ++i) {
      result[i] = list[i].evaluate(scope, valueConverters);
    }
    return result;
  }
  function autoConvertAdd(a, b) {
    if (a != null && b != null) {
      if (typeof a == 'string' && typeof b != 'string') {
        return a + b.toString();
      }
      if (typeof a != 'string' && typeof b == 'string') {
        return a.toString() + b;
      }
      return a + b;
    }
    if (a != null) {
      return a;
    }
    if (b != null) {
      return b;
    }
    return 0;
  }
  function ensureFunctionFromMap(obj, name) {
    var func = obj[name];
    if (typeof func === 'function') {
      return func;
    }
    if (func === null) {
      throw new Error('Undefined function ' + name);
    } else {
      throw new Error('' + name + ' is not a function');
    }
  }
  function getKeyed(obj, key) {
    if (Array.isArray(obj)) {
      return obj[parseInt(key)];
    } else if (obj) {
      return obj[key];
    } else if (obj === null) {
      throw new Error('Accessing null object');
    } else {
      return obj[key];
    }
  }
  function setKeyed(obj, key, value) {
    if (Array.isArray(obj)) {
      var index = parseInt(key);
      if (obj.length <= index) {
        obj.length = index + 1;
      }
      obj[index] = value;
    } else {
      obj[key] = value;
    }
    return value;
  }
  return {
    setters: [function(_pathObserver) {
      PathObserver = _pathObserver.PathObserver;
    }, function(_compositeObserver) {
      CompositeObserver = _compositeObserver.CompositeObserver;
    }, function(_accessKeyedObserver) {
      AccessKeyedObserver = _accessKeyedObserver.AccessKeyedObserver;
    }],
    execute: function() {
      Expression = (function() {
        function Expression() {
          _classCallCheck(this, Expression);
          this.isChain = false;
          this.isAssignable = false;
        }
        Expression.prototype.evaluate = function evaluate() {
          throw new Error('Cannot evaluate ' + this);
        };
        Expression.prototype.assign = function assign() {
          throw new Error('Cannot assign to ' + this);
        };
        Expression.prototype.toString = function toString() {
          return Unparser.unparse(this);
        };
        return Expression;
      })();
      _export('Expression', Expression);
      Chain = (function(_Expression) {
        function Chain(expressions) {
          _classCallCheck(this, Chain);
          _Expression.call(this);
          this.expressions = expressions;
          this.isChain = true;
        }
        _inherits(Chain, _Expression);
        Chain.prototype.evaluate = function evaluate(scope, valueConverters) {
          var result,
              expressions = this.expressions,
              length = expressions.length,
              i,
              last;
          for (i = 0; i < length; ++i) {
            last = expressions[i].evaluate(scope, valueConverters);
            if (last !== null) {
              result = last;
            }
          }
          return result;
        };
        Chain.prototype.accept = function accept(visitor) {
          visitor.visitChain(this);
        };
        return Chain;
      })(Expression);
      _export('Chain', Chain);
      ValueConverter = (function(_Expression2) {
        function ValueConverter(expression, name, args, allArgs) {
          _classCallCheck(this, ValueConverter);
          _Expression2.call(this);
          this.expression = expression;
          this.name = name;
          this.args = args;
          this.allArgs = allArgs;
        }
        _inherits(ValueConverter, _Expression2);
        ValueConverter.prototype.evaluate = function evaluate(scope, valueConverters) {
          var converter = valueConverters(this.name);
          if (!converter) {
            throw new Error('No ValueConverter named "' + this.name + '" was found!');
          }
          if ('toView' in converter) {
            return converter.toView.apply(converter, evalList(scope, this.allArgs, valueConverters));
          }
          return this.allArgs[0].evaluate(scope, valueConverters);
        };
        ValueConverter.prototype.assign = function assign(scope, value, valueConverters) {
          var converter = valueConverters(this.name);
          if (!converter) {
            throw new Error('No ValueConverter named "' + this.name + '" was found!');
          }
          if ('fromView' in converter) {
            value = converter.fromView.apply(converter, [value].concat(evalList(scope, this.args, valueConverters)));
          }
          return this.allArgs[0].assign(scope, value, valueConverters);
        };
        ValueConverter.prototype.accept = function accept(visitor) {
          visitor.visitValueConverter(this);
        };
        ValueConverter.prototype.connect = function connect(binding, scope) {
          var _this = this;
          var observer,
              childObservers = [],
              i,
              ii,
              exp,
              expInfo;
          for (i = 0, ii = this.allArgs.length; i < ii; ++i) {
            exp = this.allArgs[i];
            expInfo = exp.connect(binding, scope);
            if (expInfo.observer) {
              childObservers.push(expInfo.observer);
            }
          }
          if (childObservers.length) {
            observer = new CompositeObserver(childObservers, function() {
              return _this.evaluate(scope, binding.valueConverterLookupFunction);
            });
          }
          return {
            value: this.evaluate(scope, binding.valueConverterLookupFunction),
            observer: observer
          };
        };
        return ValueConverter;
      })(Expression);
      _export('ValueConverter', ValueConverter);
      Assign = (function(_Expression3) {
        function Assign(target, value) {
          _classCallCheck(this, Assign);
          _Expression3.call(this);
          this.target = target;
          this.value = value;
        }
        _inherits(Assign, _Expression3);
        Assign.prototype.evaluate = function evaluate(scope, valueConverters) {
          return this.target.assign(scope, this.value.evaluate(scope, valueConverters));
        };
        Assign.prototype.accept = function accept(vistor) {
          vistor.visitAssign(this);
        };
        Assign.prototype.connect = function connect(binding, scope) {
          return {value: this.evaluate(scope, binding.valueConverterLookupFunction)};
        };
        return Assign;
      })(Expression);
      _export('Assign', Assign);
      Conditional = (function(_Expression4) {
        function Conditional(condition, yes, no) {
          _classCallCheck(this, Conditional);
          _Expression4.call(this);
          this.condition = condition;
          this.yes = yes;
          this.no = no;
        }
        _inherits(Conditional, _Expression4);
        Conditional.prototype.evaluate = function evaluate(scope, valueConverters) {
          return !!this.condition.evaluate(scope) ? this.yes.evaluate(scope) : this.no.evaluate(scope);
        };
        Conditional.prototype.accept = function accept(visitor) {
          visitor.visitConditional(this);
        };
        Conditional.prototype.connect = function connect(binding, scope) {
          var _this2 = this;
          var conditionInfo = this.condition.connect(binding, scope),
              yesInfo = this.yes.connect(binding, scope),
              noInfo = this.no.connect(binding, scope),
              childObservers = [],
              observer;
          if (conditionInfo.observer) {
            childObservers.push(conditionInfo.observer);
          }
          if (yesInfo.observer) {
            childObservers.push(yesInfo.observer);
          }
          if (noInfo.observer) {
            childObservers.push(noInfo.observer);
          }
          if (childObservers.length) {
            observer = new CompositeObserver(childObservers, function() {
              return _this2.evaluate(scope, binding.valueConverterLookupFunction);
            });
          }
          return {
            value: !!conditionInfo.value ? yesInfo.value : noInfo.value,
            observer: observer
          };
        };
        return Conditional;
      })(Expression);
      _export('Conditional', Conditional);
      AccessScope = (function(_Expression5) {
        function AccessScope(name) {
          _classCallCheck(this, AccessScope);
          _Expression5.call(this);
          this.name = name;
          this.isAssignable = true;
        }
        _inherits(AccessScope, _Expression5);
        AccessScope.prototype.evaluate = function evaluate(scope, valueConverters) {
          return scope[this.name];
        };
        AccessScope.prototype.assign = function assign(scope, value) {
          return scope[this.name] = value;
        };
        AccessScope.prototype.accept = function accept(visitor) {
          visitor.visitAccessScope(this);
        };
        AccessScope.prototype.connect = function connect(binding, scope) {
          var observer = binding.getObserver(scope, this.name);
          return {
            value: observer.getValue(),
            observer: observer
          };
        };
        return AccessScope;
      })(Expression);
      _export('AccessScope', AccessScope);
      AccessMember = (function(_Expression6) {
        function AccessMember(object, name) {
          _classCallCheck(this, AccessMember);
          _Expression6.call(this);
          this.object = object;
          this.name = name;
          this.isAssignable = true;
        }
        _inherits(AccessMember, _Expression6);
        AccessMember.prototype.evaluate = function evaluate(scope, valueConverters) {
          var instance = this.object.evaluate(scope, valueConverters);
          return instance === null || instance === undefined ? instance : instance[this.name];
        };
        AccessMember.prototype.assign = function assign(scope, value) {
          var instance = this.object.evaluate(scope);
          if (instance === null || instance === undefined) {
            instance = {};
            this.object.assign(scope, instance);
          }
          return instance[this.name] = value;
        };
        AccessMember.prototype.accept = function accept(visitor) {
          visitor.visitAccessMember(this);
        };
        AccessMember.prototype.connect = function connect(binding, scope) {
          var _this3 = this;
          var info = this.object.connect(binding, scope),
              objectInstance = info.value,
              objectObserver = info.observer,
              observer;
          if (objectObserver) {
            observer = new PathObserver(objectObserver, function(value) {
              if (value == null || value == undefined) {
                return value;
              }
              return binding.getObserver(value, _this3.name);
            }, objectInstance);
          } else {
            observer = binding.getObserver(objectInstance, this.name);
          }
          return {
            value: objectInstance == null ? null : objectInstance[this.name],
            observer: observer
          };
        };
        return AccessMember;
      })(Expression);
      _export('AccessMember', AccessMember);
      AccessKeyed = (function(_Expression7) {
        function AccessKeyed(object, key) {
          _classCallCheck(this, AccessKeyed);
          _Expression7.call(this);
          this.object = object;
          this.key = key;
          this.isAssignable = true;
        }
        _inherits(AccessKeyed, _Expression7);
        AccessKeyed.prototype.evaluate = function evaluate(scope, valueConverters) {
          var instance = this.object.evaluate(scope, valueConverters);
          var lookup = this.key.evaluate(scope, valueConverters);
          return getKeyed(instance, lookup);
        };
        AccessKeyed.prototype.assign = function assign(scope, value) {
          var instance = this.object.evaluate(scope);
          var lookup = this.key.evaluate(scope);
          return setKeyed(instance, lookup, value);
        };
        AccessKeyed.prototype.accept = function accept(visitor) {
          visitor.visitAccessKeyed(this);
        };
        AccessKeyed.prototype.connect = function connect(binding, scope) {
          var _this4 = this;
          var objectInfo = this.object.connect(binding, scope),
              keyInfo = this.key.connect(binding, scope),
              observer = new AccessKeyedObserver(objectInfo, keyInfo, binding.observerLocator, function() {
                return _this4.evaluate(scope, binding.valueConverterLookupFunction);
              });
          return {
            value: this.evaluate(scope, binding.valueConverterLookupFunction),
            observer: observer
          };
        };
        return AccessKeyed;
      })(Expression);
      _export('AccessKeyed', AccessKeyed);
      CallScope = (function(_Expression8) {
        function CallScope(name, args) {
          _classCallCheck(this, CallScope);
          _Expression8.call(this);
          this.name = name;
          this.args = args;
        }
        _inherits(CallScope, _Expression8);
        CallScope.prototype.evaluate = function evaluate(scope, valueConverters, args) {
          args = args || evalList(scope, this.args, valueConverters);
          return ensureFunctionFromMap(scope, this.name).apply(scope, args);
        };
        CallScope.prototype.accept = function accept(visitor) {
          visitor.visitCallScope(this);
        };
        CallScope.prototype.connect = function connect(binding, scope) {
          var _this5 = this;
          var observer,
              childObservers = [],
              i,
              ii,
              exp,
              expInfo;
          for (i = 0, ii = this.args.length; i < ii; ++i) {
            exp = this.args[i];
            expInfo = exp.connect(binding, scope);
            if (expInfo.observer) {
              childObservers.push(expInfo.observer);
            }
          }
          if (childObservers.length) {
            observer = new CompositeObserver(childObservers, function() {
              return _this5.evaluate(scope, binding.valueConverterLookupFunction);
            });
          }
          return {
            value: this.evaluate(scope, binding.valueConverterLookupFunction),
            observer: observer
          };
        };
        return CallScope;
      })(Expression);
      _export('CallScope', CallScope);
      CallMember = (function(_Expression9) {
        function CallMember(object, name, args) {
          _classCallCheck(this, CallMember);
          _Expression9.call(this);
          this.object = object;
          this.name = name;
          this.args = args;
        }
        _inherits(CallMember, _Expression9);
        CallMember.prototype.evaluate = function evaluate(scope, valueConverters, args) {
          var instance = this.object.evaluate(scope, valueConverters);
          args = args || evalList(scope, this.args, valueConverters);
          return ensureFunctionFromMap(instance, this.name).apply(instance, args);
        };
        CallMember.prototype.accept = function accept(visitor) {
          visitor.visitCallMember(this);
        };
        CallMember.prototype.connect = function connect(binding, scope) {
          var _this6 = this;
          var observer,
              objectInfo = this.object.connect(binding, scope),
              childObservers = [],
              i,
              ii,
              exp,
              expInfo;
          if (objectInfo.observer) {
            childObservers.push(objectInfo.observer);
          }
          for (i = 0, ii = this.args.length; i < ii; ++i) {
            exp = this.args[i];
            expInfo = exp.connect(binding, scope);
            if (expInfo.observer) {
              childObservers.push(expInfo.observer);
            }
          }
          if (childObservers.length) {
            observer = new CompositeObserver(childObservers, function() {
              return _this6.evaluate(scope, binding.valueConverterLookupFunction);
            });
          }
          return {
            value: this.evaluate(scope, binding.valueConverterLookupFunction),
            observer: observer
          };
        };
        return CallMember;
      })(Expression);
      _export('CallMember', CallMember);
      CallFunction = (function(_Expression10) {
        function CallFunction(func, args) {
          _classCallCheck(this, CallFunction);
          _Expression10.call(this);
          this.func = func;
          this.args = args;
        }
        _inherits(CallFunction, _Expression10);
        CallFunction.prototype.evaluate = function evaluate(scope, valueConverters, args) {
          var func = this.func.evaluate(scope, valueConverters);
          if (typeof func !== 'function') {
            throw new Error('' + this.func + ' is not a function');
          } else {
            return func.apply(null, args || evalList(scope, this.args, valueConverters));
          }
        };
        CallFunction.prototype.accept = function accept(visitor) {
          visitor.visitCallFunction(this);
        };
        CallFunction.prototype.connect = function connect(binding, scope) {
          var _this7 = this;
          var observer,
              funcInfo = this.func.connect(binding, scope),
              childObservers = [],
              i,
              ii,
              exp,
              expInfo;
          if (funcInfo.observer) {
            childObservers.push(funcInfo.observer);
          }
          for (i = 0, ii = this.args.length; i < ii; ++i) {
            exp = this.args[i];
            expInfo = exp.connect(binding, scope);
            if (expInfo.observer) {
              childObservers.push(expInfo.observer);
            }
          }
          if (childObservers.length) {
            observer = new CompositeObserver(childObservers, function() {
              return _this7.evaluate(scope, binding.valueConverterLookupFunction);
            });
          }
          return {
            value: this.evaluate(scope, binding.valueConverterLookupFunction),
            observer: observer
          };
        };
        return CallFunction;
      })(Expression);
      _export('CallFunction', CallFunction);
      Binary = (function(_Expression11) {
        function Binary(operation, left, right) {
          _classCallCheck(this, Binary);
          _Expression11.call(this);
          this.operation = operation;
          this.left = left;
          this.right = right;
        }
        _inherits(Binary, _Expression11);
        Binary.prototype.evaluate = function evaluate(scope, valueConverters) {
          var left = this.left.evaluate(scope);
          switch (this.operation) {
            case '&&':
              return left && this.right.evaluate(scope);
            case '||':
              return left || this.right.evaluate(scope);
          }
          var right = this.right.evaluate(scope);
          switch (this.operation) {
            case '==':
              return left == right;
            case '===':
              return left === right;
            case '!=':
              return left != right;
            case '!==':
              return left !== right;
          }
          if (left === null || right === null) {
            switch (this.operation) {
              case '+':
                if (left != null)
                  return left;
                if (right != null)
                  return right;
                return 0;
              case '-':
                if (left != null)
                  return left;
                if (right != null)
                  return 0 - right;
                return 0;
            }
            return null;
          }
          switch (this.operation) {
            case '+':
              return autoConvertAdd(left, right);
            case '-':
              return left - right;
            case '*':
              return left * right;
            case '/':
              return left / right;
            case '%':
              return left % right;
            case '<':
              return left < right;
            case '>':
              return left > right;
            case '<=':
              return left <= right;
            case '>=':
              return left >= right;
            case '^':
              return left ^ right;
            case '&':
              return left & right;
          }
          throw new Error('Internal error [' + this.operation + '] not handled');
        };
        Binary.prototype.accept = function accept(visitor) {
          visitor.visitBinary(this);
        };
        Binary.prototype.connect = function connect(binding, scope) {
          var _this8 = this;
          var leftInfo = this.left.connect(binding, scope),
              rightInfo = this.right.connect(binding, scope),
              childObservers = [],
              observer;
          if (leftInfo.observer) {
            childObservers.push(leftInfo.observer);
          }
          if (rightInfo.observer) {
            childObservers.push(rightInfo.observer);
          }
          if (childObservers.length) {
            observer = new CompositeObserver(childObservers, function() {
              return _this8.evaluate(scope, binding.valueConverterLookupFunction);
            });
          }
          return {
            value: this.evaluate(scope, binding.valueConverterLookupFunction),
            observer: observer
          };
        };
        return Binary;
      })(Expression);
      _export('Binary', Binary);
      PrefixNot = (function(_Expression12) {
        function PrefixNot(operation, expression) {
          _classCallCheck(this, PrefixNot);
          _Expression12.call(this);
          this.operation = operation;
          this.expression = expression;
        }
        _inherits(PrefixNot, _Expression12);
        PrefixNot.prototype.evaluate = function evaluate(scope, valueConverters) {
          return !this.expression.evaluate(scope);
        };
        PrefixNot.prototype.accept = function accept(visitor) {
          visitor.visitPrefix(this);
        };
        PrefixNot.prototype.connect = function connect(binding, scope) {
          var _this9 = this;
          var info = this.expression.connect(binding, scope),
              observer;
          if (info.observer) {
            observer = new CompositeObserver([info.observer], function() {
              return _this9.evaluate(scope, binding.valueConverterLookupFunction);
            });
          }
          return {
            value: !info.value,
            observer: observer
          };
        };
        return PrefixNot;
      })(Expression);
      _export('PrefixNot', PrefixNot);
      LiteralPrimitive = (function(_Expression13) {
        function LiteralPrimitive(value) {
          _classCallCheck(this, LiteralPrimitive);
          _Expression13.call(this);
          this.value = value;
        }
        _inherits(LiteralPrimitive, _Expression13);
        LiteralPrimitive.prototype.evaluate = function evaluate(scope, valueConverters) {
          return this.value;
        };
        LiteralPrimitive.prototype.accept = function accept(visitor) {
          visitor.visitLiteralPrimitive(this);
        };
        LiteralPrimitive.prototype.connect = function connect(binding, scope) {
          return {value: this.value};
        };
        return LiteralPrimitive;
      })(Expression);
      _export('LiteralPrimitive', LiteralPrimitive);
      LiteralString = (function(_Expression14) {
        function LiteralString(value) {
          _classCallCheck(this, LiteralString);
          _Expression14.call(this);
          this.value = value;
        }
        _inherits(LiteralString, _Expression14);
        LiteralString.prototype.evaluate = function evaluate(scope, valueConverters) {
          return this.value;
        };
        LiteralString.prototype.accept = function accept(visitor) {
          visitor.visitLiteralString(this);
        };
        LiteralString.prototype.connect = function connect(binding, scope) {
          return {value: this.value};
        };
        return LiteralString;
      })(Expression);
      _export('LiteralString', LiteralString);
      LiteralArray = (function(_Expression15) {
        function LiteralArray(elements) {
          _classCallCheck(this, LiteralArray);
          _Expression15.call(this);
          this.elements = elements;
        }
        _inherits(LiteralArray, _Expression15);
        LiteralArray.prototype.evaluate = function evaluate(scope, valueConverters) {
          var elements = this.elements,
              length = elements.length,
              result = [],
              i;
          for (i = 0; i < length; ++i) {
            result[i] = elements[i].evaluate(scope, valueConverters);
          }
          return result;
        };
        LiteralArray.prototype.accept = function accept(visitor) {
          visitor.visitLiteralArray(this);
        };
        LiteralArray.prototype.connect = function connect(binding, scope) {
          var _this10 = this;
          var observer,
              childObservers = [],
              results = [],
              i,
              ii,
              exp,
              expInfo;
          for (i = 0, ii = this.elements.length; i < ii; ++i) {
            exp = this.elements[i];
            expInfo = exp.connect(binding, scope);
            if (expInfo.observer) {
              childObservers.push(expInfo.observer);
            }
            results[i] = expInfo.value;
          }
          if (childObservers.length) {
            observer = new CompositeObserver(childObservers, function() {
              return _this10.evaluate(scope, binding.valueConverterLookupFunction);
            });
          }
          return {
            value: results,
            observer: observer
          };
        };
        return LiteralArray;
      })(Expression);
      _export('LiteralArray', LiteralArray);
      LiteralObject = (function(_Expression16) {
        function LiteralObject(keys, values) {
          _classCallCheck(this, LiteralObject);
          _Expression16.call(this);
          this.keys = keys;
          this.values = values;
        }
        _inherits(LiteralObject, _Expression16);
        LiteralObject.prototype.evaluate = function evaluate(scope, valueConverters) {
          var instance = {},
              keys = this.keys,
              values = this.values,
              length = keys.length,
              i;
          for (i = 0; i < length; ++i) {
            instance[keys[i]] = values[i].evaluate(scope, valueConverters);
          }
          return instance;
        };
        LiteralObject.prototype.accept = function accept(visitor) {
          visitor.visitLiteralObject(this);
        };
        LiteralObject.prototype.connect = function connect(binding, scope) {
          var _this11 = this;
          var observer,
              childObservers = [],
              instance = {},
              keys = this.keys,
              values = this.values,
              length = keys.length,
              i,
              valueInfo;
          for (i = 0; i < length; ++i) {
            valueInfo = values[i].connect(binding, scope);
            if (valueInfo.observer) {
              childObservers.push(valueInfo.observer);
            }
            instance[keys[i]] = valueInfo.value;
          }
          if (childObservers.length) {
            observer = new CompositeObserver(childObservers, function() {
              return _this11.evaluate(scope, binding.valueConverterLookupFunction);
            });
          }
          return {
            value: instance,
            observer: observer
          };
        };
        return LiteralObject;
      })(Expression);
      _export('LiteralObject', LiteralObject);
      Unparser = (function() {
        function Unparser(buffer) {
          _classCallCheck(this, Unparser);
          this.buffer = buffer;
        }
        Unparser.unparse = function unparse(expression) {
          var buffer = [],
              visitor = new Unparser(buffer);
          expression.accept(visitor);
          return buffer.join('');
        };
        Unparser.prototype.write = function write(text) {
          this.buffer.push(text);
        };
        Unparser.prototype.writeArgs = function writeArgs(args) {
          var i,
              length;
          this.write('(');
          for (i = 0, length = args.length; i < length; ++i) {
            if (i !== 0) {
              this.write(',');
            }
            args[i].accept(this);
          }
          this.write(')');
        };
        Unparser.prototype.visitChain = function visitChain(chain) {
          var expressions = chain.expressions,
              length = expressions.length,
              i;
          for (i = 0; i < length; ++i) {
            if (i !== 0) {
              this.write(';');
            }
            expressions[i].accept(this);
          }
        };
        Unparser.prototype.visitValueConverter = function visitValueConverter(converter) {
          var args = converter.args,
              length = args.length,
              i;
          this.write('(');
          converter.expression.accept(this);
          this.write('|' + converter.name);
          for (i = 0; i < length; ++i) {
            this.write(' :');
            args[i].accept(this);
          }
          this.write(')');
        };
        Unparser.prototype.visitAssign = function visitAssign(assign) {
          assign.target.accept(this);
          this.write('=');
          assign.value.accept(this);
        };
        Unparser.prototype.visitConditional = function visitConditional(conditional) {
          conditional.condition.accept(this);
          this.write('?');
          conditional.yes.accept(this);
          this.write(':');
          conditional.no.accept(this);
        };
        Unparser.prototype.visitAccessScope = function visitAccessScope(access) {
          this.write(access.name);
        };
        Unparser.prototype.visitAccessMember = function visitAccessMember(access) {
          access.object.accept(this);
          this.write('.' + access.name);
        };
        Unparser.prototype.visitAccessKeyed = function visitAccessKeyed(access) {
          access.object.accept(this);
          this.write('[');
          access.key.accept(this);
          this.write(']');
        };
        Unparser.prototype.visitCallScope = function visitCallScope(call) {
          this.write(call.name);
          this.writeArgs(call.args);
        };
        Unparser.prototype.visitCallFunction = function visitCallFunction(call) {
          call.func.accept(this);
          this.writeArgs(call.args);
        };
        Unparser.prototype.visitCallMember = function visitCallMember(call) {
          call.object.accept(this);
          this.write('.' + call.name);
          this.writeArgs(call.args);
        };
        Unparser.prototype.visitPrefix = function visitPrefix(prefix) {
          this.write('(' + prefix.operation);
          prefix.expression.accept(this);
          this.write(')');
        };
        Unparser.prototype.visitBinary = function visitBinary(binary) {
          this.write('(');
          binary.left.accept(this);
          this.write(binary.operation);
          binary.right.accept(this);
          this.write(')');
        };
        Unparser.prototype.visitLiteralPrimitive = function visitLiteralPrimitive(literal) {
          this.write('' + literal.value);
        };
        Unparser.prototype.visitLiteralArray = function visitLiteralArray(literal) {
          var elements = literal.elements,
              length = elements.length,
              i;
          this.write('[');
          for (i = 0; i < length; ++i) {
            if (i !== 0) {
              this.write(',');
            }
            elements[i].accept(this);
          }
          this.write(']');
        };
        Unparser.prototype.visitLiteralObject = function visitLiteralObject(literal) {
          var keys = literal.keys,
              values = literal.values,
              length = keys.length,
              i;
          this.write('{');
          for (i = 0; i < length; ++i) {
            if (i !== 0) {
              this.write(',');
            }
            this.write('\'' + keys[i] + '\':');
            values[i].accept(this);
          }
          this.write('}');
        };
        Unparser.prototype.visitLiteralString = function visitLiteralString(literal) {
          var escaped = literal.value.replace(/'/g, '\'');
          this.write('\'' + escaped + '\'');
        };
        return Unparser;
      })();
      _export('Unparser', Unparser);
      evalListCache = [[], [0], [0, 0], [0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0, 0]];
    }
  };
});

System.register("github:aurelia/validation@0.2.5/validation/validation-rules", ["github:aurelia/validation@0.2.5/validation/utilities", "github:aurelia/validation@0.2.5/validation/validation-locale"], function(_export) {
  var Utilities,
      ValidationLocale,
      _inherits,
      _classCallCheck,
      ValidationRule,
      URLValidationRule,
      EmailValidationRule,
      MinimumLengthValidationRule,
      MaximumLengthValidationRule,
      BetweenLengthValidationRule,
      CustomFunctionValidationRule,
      NumericValidationRule,
      RegexValidationRule,
      ContainsOnlyValidationRule,
      MinimumValueValidationRule,
      MinimumInclusiveValueValidationRule,
      MaximumValueValidationRule,
      MaximumInclusiveValueValidationRule,
      BetweenValueValidationRule,
      DigitValidationRule,
      NoSpacesValidationRule,
      AlphaNumericValidationRule,
      AlphaValidationRule,
      AlphaOrWhitespaceValidationRule,
      AlphaNumericOrWhitespaceValidationRule,
      MediumPasswordValidationRule,
      StrongPasswordValidationRule,
      EqualityValidationRuleBase,
      EqualityValidationRule,
      EqualityWithOtherLabelValidationRule,
      InEqualityValidationRule,
      InEqualityWithOtherLabelValidationRule,
      InCollectionValidationRule;
  return {
    setters: [function(_validationUtilities) {
      Utilities = _validationUtilities.Utilities;
    }, function(_validationValidationLocale) {
      ValidationLocale = _validationValidationLocale.ValidationLocale;
    }],
    execute: function() {
      'use strict';
      _inherits = function(subClass, superClass) {
        if (typeof superClass !== 'function' && superClass !== null) {
          throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
        }
        subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
          }});
        if (superClass)
          subClass.__proto__ = superClass;
      };
      _classCallCheck = function(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError('Cannot call a class as a function');
        }
      };
      ValidationRule = (function() {
        function ValidationRule(threshold, onValidate, message) {
          _classCallCheck(this, ValidationRule);
          this.onValidate = onValidate;
          this.threshold = threshold;
          this.message = message;
          this.errorMessage = null;
          this.ruleName = this.constructor.name;
        }
        ValidationRule.prototype.withMessage = function withMessage(message) {
          this.message = message;
        };
        ValidationRule.prototype.explain = function explain() {
          return this.errorMessage;
        };
        ValidationRule.prototype.setResult = function setResult(result, currentValue, locale) {
          if (result === true || result === undefined || result === null || result === '') {
            this.errorMessage = null;
            return true;
          } else {
            if (typeof result === 'string') {
              this.errorMessage = result;
            } else {
              if (this.message) {
                if (typeof this.message === 'function') {
                  this.errorMessage = this.message(currentValue, this.threshold);
                } else if (typeof this.message === 'string') {
                  this.errorMessage = this.message;
                } else
                  throw 'Unable to handle the error message:' + this.message;
              } else {
                this.errorMessage = locale.translate(this.ruleName, currentValue, this.threshold);
              }
            }
            return false;
          }
        };
        ValidationRule.prototype.validate = function validate(currentValue, locale) {
          var _this = this;
          if (locale === undefined) {
            locale = ValidationLocale.Repository['default'];
          }
          currentValue = Utilities.getValue(currentValue);
          var result = this.onValidate(currentValue, this.threshold, locale);
          var promise = Promise.resolve(result);
          var nextPromise = promise.then(function(promiseResult) {
            return _this.setResult(promiseResult, currentValue, locale);
          }, function(promiseFailure) {
            if (typeof promiseFailure === 'string' && promiseFailure !== '')
              return _this.setResult(promiseFailure, currentValue, locale);
            else
              return _this.setResult(false, currentValue, locale);
          });
          return nextPromise;
        };
        return ValidationRule;
      })();
      _export('ValidationRule', ValidationRule);
      URLValidationRule = (function(_ValidationRule) {
        function URLValidationRule(threshold) {
          var _this2 = this;
          _classCallCheck(this, URLValidationRule);
          var default_url_options = {
            protocols: ['http', 'https', 'ftp'],
            require_tld: true,
            require_protocol: false,
            allow_underscores: true,
            allow_trailing_dot: false,
            allow_protocol_relative_urls: true
          };
          if (threshold === undefined) {
            threshold = default_url_options;
          }
          _ValidationRule.call(this, threshold, function(newValue, threshold) {
            var url = newValue;
            if (!url || url.length >= 2083 || /\s/.test(url)) {
              return false;
            }
            if (url.indexOf('mailto:') === 0) {
              return false;
            }
            var protocol,
                auth,
                host,
                hostname,
                port,
                port_str,
                split;
            split = url.split('://');
            if (split.length > 1) {
              protocol = split.shift();
              if (threshold.protocols.indexOf(protocol) === -1) {
                return false;
              }
            } else if (threshold.require_protocol) {
              return false;
            } else if (threshold.allow_protocol_relative_urls && url.substr(0, 2) === '//') {
              split[0] = url.substr(2);
            }
            url = split.join('://');
            split = url.split('#');
            url = split.shift();
            split = url.split('?');
            url = split.shift();
            split = url.split('/');
            url = split.shift();
            split = url.split('@');
            if (split.length > 1) {
              auth = split.shift();
              if (auth.indexOf(':') >= 0 && auth.split(':').length > 2) {
                return false;
              }
            }
            hostname = split.join('@');
            split = hostname.split(':');
            host = split.shift();
            if (split.length) {
              port_str = split.join(':');
              port = parseInt(port_str, 10);
              if (!/^[0-9]+$/.test(port_str) || port <= 0 || port > 65535) {
                return false;
              }
            }
            if (!_this2.isIP(host) && !_this2.isFQDN(host, threshold) && host !== 'localhost') {
              return false;
            }
            if (threshold.host_whitelist && threshold.host_whitelist.indexOf(host) === -1) {
              return false;
            }
            if (threshold.host_blacklist && threshold.host_blacklist.indexOf(host) !== -1) {
              return false;
            }
            return true;
          });
          this.isIP = function(str, version) {
            var ipv4Maybe = /^(\d+)\.(\d+)\.(\d+)\.(\d+)$/,
                ipv6Block = /^[0-9A-F]{1,4}$/i;
            if (!version) {
              return this.isIP(str, 4) || this.isIP(str, 6);
            } else if (version === 4) {
              if (!ipv4Maybe.test(str)) {
                return false;
              }
              var parts = str.split('.').sort(function(a, b) {
                return a - b;
              });
              return parts[3] <= 255;
            } else if (version === 6) {
              var blocks = str.split(':');
              var foundOmissionBlock = false;
              if (blocks.length > 8)
                return false;
              if (str === '::') {
                return true;
              } else if (str.substr(0, 2) === '::') {
                blocks.shift();
                blocks.shift();
                foundOmissionBlock = true;
              } else if (str.substr(str.length - 2) === '::') {
                blocks.pop();
                blocks.pop();
                foundOmissionBlock = true;
              }
              for (var i = 0; i < blocks.length; ++i) {
                if (blocks[i] === '' && i > 0 && i < blocks.length - 1) {
                  if (foundOmissionBlock)
                    return false;
                  foundOmissionBlock = true;
                } else if (!ipv6Block.test(blocks[i])) {
                  return false;
                }
              }
              if (foundOmissionBlock) {
                return blocks.length >= 1;
              } else {
                return blocks.length === 8;
              }
            }
            return false;
          };
          this.isFQDN = function(str, options) {
            if (options.allow_trailing_dot && str[str.length - 1] === '.') {
              str = str.substring(0, str.length - 1);
            }
            var parts = str.split('.');
            if (options.require_tld) {
              var tld = parts.pop();
              if (!parts.length || !/^([a-z\u00a1-\uffff]{2,}|xn[a-z0-9-]{2,})$/i.test(tld)) {
                return false;
              }
            }
            for (var part,
                i = 0; i < parts.length; i++) {
              part = parts[i];
              if (options.allow_underscores) {
                if (part.indexOf('__') >= 0) {
                  return false;
                }
                part = part.replace(/_/g, '');
              }
              if (!/^[a-z\u00a1-\uffff0-9-]+$/i.test(part)) {
                return false;
              }
              if (part[0] === '-' || part[part.length - 1] === '-' || part.indexOf('---') >= 0) {
                return false;
              }
            }
            return true;
          };
        }
        _inherits(URLValidationRule, _ValidationRule);
        return URLValidationRule;
      })(ValidationRule);
      _export('URLValidationRule', URLValidationRule);
      EmailValidationRule = (function(_ValidationRule2) {
        function EmailValidationRule() {
          var _this3 = this;
          _classCallCheck(this, EmailValidationRule);
          _ValidationRule2.call(this, null, function(newValue, threshold) {
            if (/\s/.test(newValue)) {
              return false;
            }
            var parts = newValue.split('@');
            var domain = parts.pop();
            var user = parts.join('@');
            if (!_this3.isFQDN(domain)) {
              return false;
            }
            return _this3.emailUserUtf8Regex.test(user);
          });
          this.emailUserUtf8Regex = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))$/i;
          this.isFQDN = function(str) {
            var parts = str.split('.');
            for (var part,
                i = 0; i < parts.length; i++) {
              part = parts[i];
              if (part.indexOf('__') >= 0) {
                return false;
              }
              part = part.replace(/_/g, '');
              if (!/^[a-z\u00a1-\uffff0-9-]+$/i.test(part)) {
                return false;
              }
              if (part[0] === '-' || part[part.length - 1] === '-' || part.indexOf('---') >= 0) {
                return false;
              }
            }
            return true;
          };
        }
        _inherits(EmailValidationRule, _ValidationRule2);
        return EmailValidationRule;
      })(ValidationRule);
      _export('EmailValidationRule', EmailValidationRule);
      MinimumLengthValidationRule = (function(_ValidationRule3) {
        function MinimumLengthValidationRule(minimumLength) {
          _classCallCheck(this, MinimumLengthValidationRule);
          _ValidationRule3.call(this, minimumLength, function(newValue, minimumLength) {
            return newValue.length !== undefined && newValue.length >= minimumLength;
          });
        }
        _inherits(MinimumLengthValidationRule, _ValidationRule3);
        return MinimumLengthValidationRule;
      })(ValidationRule);
      _export('MinimumLengthValidationRule', MinimumLengthValidationRule);
      MaximumLengthValidationRule = (function(_ValidationRule4) {
        function MaximumLengthValidationRule(maximumLength) {
          _classCallCheck(this, MaximumLengthValidationRule);
          _ValidationRule4.call(this, maximumLength, function(newValue, maximumLength) {
            return newValue.length !== undefined && newValue.length <= maximumLength;
          });
        }
        _inherits(MaximumLengthValidationRule, _ValidationRule4);
        return MaximumLengthValidationRule;
      })(ValidationRule);
      _export('MaximumLengthValidationRule', MaximumLengthValidationRule);
      BetweenLengthValidationRule = (function(_ValidationRule5) {
        function BetweenLengthValidationRule(minimumLength, maximumLength) {
          _classCallCheck(this, BetweenLengthValidationRule);
          _ValidationRule5.call(this, {
            minimumLength: minimumLength,
            maximumLength: maximumLength
          }, function(newValue, threshold) {
            return newValue.length !== undefined && newValue.length >= threshold.minimumLength && newValue.length <= threshold.maximumLength;
          });
        }
        _inherits(BetweenLengthValidationRule, _ValidationRule5);
        return BetweenLengthValidationRule;
      })(ValidationRule);
      _export('BetweenLengthValidationRule', BetweenLengthValidationRule);
      CustomFunctionValidationRule = (function(_ValidationRule6) {
        function CustomFunctionValidationRule(customFunction, threshold) {
          _classCallCheck(this, CustomFunctionValidationRule);
          _ValidationRule6.call(this, threshold, customFunction);
        }
        _inherits(CustomFunctionValidationRule, _ValidationRule6);
        return CustomFunctionValidationRule;
      })(ValidationRule);
      _export('CustomFunctionValidationRule', CustomFunctionValidationRule);
      NumericValidationRule = (function(_ValidationRule7) {
        function NumericValidationRule() {
          _classCallCheck(this, NumericValidationRule);
          _ValidationRule7.call(this, null, function(newValue, threshold, locale) {
            var numericRegex = locale.setting('numericRegex');
            var floatValue = parseFloat(newValue);
            return !Number.isNaN(parseFloat(newValue)) && Number.isFinite(floatValue) && numericRegex.test(newValue);
          });
        }
        _inherits(NumericValidationRule, _ValidationRule7);
        return NumericValidationRule;
      })(ValidationRule);
      _export('NumericValidationRule', NumericValidationRule);
      RegexValidationRule = (function(_ValidationRule8) {
        function RegexValidationRule(regex) {
          _classCallCheck(this, RegexValidationRule);
          _ValidationRule8.call(this, regex, function(newValue, regex) {
            return regex.test(newValue);
          });
        }
        _inherits(RegexValidationRule, _ValidationRule8);
        return RegexValidationRule;
      })(ValidationRule);
      _export('RegexValidationRule', RegexValidationRule);
      ContainsOnlyValidationRule = (function(_RegexValidationRule) {
        function ContainsOnlyValidationRule(regex) {
          _classCallCheck(this, ContainsOnlyValidationRule);
          _RegexValidationRule.call(this, regex);
        }
        _inherits(ContainsOnlyValidationRule, _RegexValidationRule);
        return ContainsOnlyValidationRule;
      })(RegexValidationRule);
      _export('ContainsOnlyValidationRule', ContainsOnlyValidationRule);
      MinimumValueValidationRule = (function(_ValidationRule9) {
        function MinimumValueValidationRule(minimumValue) {
          _classCallCheck(this, MinimumValueValidationRule);
          _ValidationRule9.call(this, minimumValue, function(newValue, minimumValue) {
            return Utilities.getValue(minimumValue) < newValue;
          });
        }
        _inherits(MinimumValueValidationRule, _ValidationRule9);
        return MinimumValueValidationRule;
      })(ValidationRule);
      _export('MinimumValueValidationRule', MinimumValueValidationRule);
      MinimumInclusiveValueValidationRule = (function(_ValidationRule10) {
        function MinimumInclusiveValueValidationRule(minimumValue) {
          _classCallCheck(this, MinimumInclusiveValueValidationRule);
          _ValidationRule10.call(this, minimumValue, function(newValue, minimumValue) {
            return Utilities.getValue(minimumValue) <= newValue;
          });
        }
        _inherits(MinimumInclusiveValueValidationRule, _ValidationRule10);
        return MinimumInclusiveValueValidationRule;
      })(ValidationRule);
      _export('MinimumInclusiveValueValidationRule', MinimumInclusiveValueValidationRule);
      MaximumValueValidationRule = (function(_ValidationRule11) {
        function MaximumValueValidationRule(maximumValue) {
          _classCallCheck(this, MaximumValueValidationRule);
          _ValidationRule11.call(this, maximumValue, function(newValue, maximumValue) {
            return newValue < Utilities.getValue(maximumValue);
          });
        }
        _inherits(MaximumValueValidationRule, _ValidationRule11);
        return MaximumValueValidationRule;
      })(ValidationRule);
      _export('MaximumValueValidationRule', MaximumValueValidationRule);
      MaximumInclusiveValueValidationRule = (function(_ValidationRule12) {
        function MaximumInclusiveValueValidationRule(maximumValue) {
          _classCallCheck(this, MaximumInclusiveValueValidationRule);
          _ValidationRule12.call(this, maximumValue, function(newValue, maximumValue) {
            return newValue <= Utilities.getValue(maximumValue);
          });
        }
        _inherits(MaximumInclusiveValueValidationRule, _ValidationRule12);
        return MaximumInclusiveValueValidationRule;
      })(ValidationRule);
      _export('MaximumInclusiveValueValidationRule', MaximumInclusiveValueValidationRule);
      BetweenValueValidationRule = (function(_ValidationRule13) {
        function BetweenValueValidationRule(minimumValue, maximumValue) {
          _classCallCheck(this, BetweenValueValidationRule);
          _ValidationRule13.call(this, {
            minimumValue: minimumValue,
            maximumValue: maximumValue
          }, function(newValue, threshold) {
            return Utilities.getValue(threshold.minimumValue) <= newValue && newValue <= Utilities.getValue(threshold.maximumValue);
          });
        }
        _inherits(BetweenValueValidationRule, _ValidationRule13);
        return BetweenValueValidationRule;
      })(ValidationRule);
      _export('BetweenValueValidationRule', BetweenValueValidationRule);
      DigitValidationRule = (function(_ValidationRule14) {
        function DigitValidationRule() {
          var _this4 = this;
          _classCallCheck(this, DigitValidationRule);
          _ValidationRule14.call(this, null, function(newValue, threshold) {
            return _this4.digitRegex.test(newValue);
          });
          this.digitRegex = /^\d+$/;
        }
        _inherits(DigitValidationRule, _ValidationRule14);
        return DigitValidationRule;
      })(ValidationRule);
      _export('DigitValidationRule', DigitValidationRule);
      NoSpacesValidationRule = (function(_ValidationRule15) {
        function NoSpacesValidationRule() {
          var _this5 = this;
          _classCallCheck(this, NoSpacesValidationRule);
          _ValidationRule15.call(this, null, function(newValue, threshold) {
            return _this5.regex.test(newValue);
          });
          this.regex = /^\S*$/;
        }
        _inherits(NoSpacesValidationRule, _ValidationRule15);
        return NoSpacesValidationRule;
      })(ValidationRule);
      _export('NoSpacesValidationRule', NoSpacesValidationRule);
      AlphaNumericValidationRule = (function(_ValidationRule16) {
        function AlphaNumericValidationRule() {
          var _this6 = this;
          _classCallCheck(this, AlphaNumericValidationRule);
          _ValidationRule16.call(this, null, function(newValue, threshold) {
            return _this6.alphaNumericRegex.test(newValue);
          });
          this.alphaNumericRegex = /^[a-z0-9]+$/i;
        }
        _inherits(AlphaNumericValidationRule, _ValidationRule16);
        return AlphaNumericValidationRule;
      })(ValidationRule);
      _export('AlphaNumericValidationRule', AlphaNumericValidationRule);
      AlphaValidationRule = (function(_ValidationRule17) {
        function AlphaValidationRule() {
          var _this7 = this;
          _classCallCheck(this, AlphaValidationRule);
          _ValidationRule17.call(this, null, function(newValue, threshold) {
            return _this7.alphaRegex.test(newValue);
          });
          this.alphaRegex = /^[a-z]+$/i;
        }
        _inherits(AlphaValidationRule, _ValidationRule17);
        return AlphaValidationRule;
      })(ValidationRule);
      _export('AlphaValidationRule', AlphaValidationRule);
      AlphaOrWhitespaceValidationRule = (function(_ValidationRule18) {
        function AlphaOrWhitespaceValidationRule() {
          var _this8 = this;
          _classCallCheck(this, AlphaOrWhitespaceValidationRule);
          _ValidationRule18.call(this, null, function(newValue, threshold) {
            return _this8.alphaNumericRegex.test(newValue);
          });
          this.alphaNumericRegex = /^[a-z\s]+$/i;
        }
        _inherits(AlphaOrWhitespaceValidationRule, _ValidationRule18);
        return AlphaOrWhitespaceValidationRule;
      })(ValidationRule);
      _export('AlphaOrWhitespaceValidationRule', AlphaOrWhitespaceValidationRule);
      AlphaNumericOrWhitespaceValidationRule = (function(_ValidationRule19) {
        function AlphaNumericOrWhitespaceValidationRule() {
          var _this9 = this;
          _classCallCheck(this, AlphaNumericOrWhitespaceValidationRule);
          _ValidationRule19.call(this, null, function(newValue, threshold) {
            return _this9.alphaNumericRegex.test(newValue);
          });
          this.alphaNumericRegex = /^[a-z0-9\s]+$/i;
        }
        _inherits(AlphaNumericOrWhitespaceValidationRule, _ValidationRule19);
        return AlphaNumericOrWhitespaceValidationRule;
      })(ValidationRule);
      _export('AlphaNumericOrWhitespaceValidationRule', AlphaNumericOrWhitespaceValidationRule);
      MediumPasswordValidationRule = (function(_ValidationRule20) {
        function MediumPasswordValidationRule(minimumComplexityLevel) {
          _classCallCheck(this, MediumPasswordValidationRule);
          _ValidationRule20.call(this, minimumComplexityLevel ? minimumComplexityLevel : 3, function(newValue, threshold) {
            if (typeof newValue !== 'string')
              return false;
            var strength = 0;
            strength += /[A-Z]+/.test(newValue) ? 1 : 0;
            strength += /[a-z]+/.test(newValue) ? 1 : 0;
            strength += /[0-9]+/.test(newValue) ? 1 : 0;
            strength += /[\W]+/.test(newValue) ? 1 : 0;
            return strength >= threshold;
          });
        }
        _inherits(MediumPasswordValidationRule, _ValidationRule20);
        return MediumPasswordValidationRule;
      })(ValidationRule);
      _export('MediumPasswordValidationRule', MediumPasswordValidationRule);
      StrongPasswordValidationRule = (function(_MediumPasswordValidationRule) {
        function StrongPasswordValidationRule() {
          _classCallCheck(this, StrongPasswordValidationRule);
          _MediumPasswordValidationRule.call(this, 4);
        }
        _inherits(StrongPasswordValidationRule, _MediumPasswordValidationRule);
        return StrongPasswordValidationRule;
      })(MediumPasswordValidationRule);
      _export('StrongPasswordValidationRule', StrongPasswordValidationRule);
      EqualityValidationRuleBase = (function(_ValidationRule21) {
        function EqualityValidationRuleBase(otherValue, equality, otherValueLabel) {
          _classCallCheck(this, EqualityValidationRuleBase);
          _ValidationRule21.call(this, {
            otherValue: otherValue,
            equality: equality,
            otherValueLabel: otherValueLabel
          }, function(newValue, threshold) {
            var otherValue = Utilities.getValue(threshold.otherValue);
            if (newValue instanceof Date && otherValue instanceof Date)
              return threshold.equality === (newValue.getTime() === otherValue.getTime());
            return threshold.equality === (newValue === otherValue);
          });
        }
        _inherits(EqualityValidationRuleBase, _ValidationRule21);
        return EqualityValidationRuleBase;
      })(ValidationRule);
      _export('EqualityValidationRuleBase', EqualityValidationRuleBase);
      EqualityValidationRule = (function(_EqualityValidationRuleBase) {
        function EqualityValidationRule(otherValue) {
          _classCallCheck(this, EqualityValidationRule);
          _EqualityValidationRuleBase.call(this, otherValue, true);
        }
        _inherits(EqualityValidationRule, _EqualityValidationRuleBase);
        return EqualityValidationRule;
      })(EqualityValidationRuleBase);
      _export('EqualityValidationRule', EqualityValidationRule);
      EqualityWithOtherLabelValidationRule = (function(_EqualityValidationRuleBase2) {
        function EqualityWithOtherLabelValidationRule(otherValue, otherLabel) {
          _classCallCheck(this, EqualityWithOtherLabelValidationRule);
          _EqualityValidationRuleBase2.call(this, otherValue, true, otherLabel);
        }
        _inherits(EqualityWithOtherLabelValidationRule, _EqualityValidationRuleBase2);
        return EqualityWithOtherLabelValidationRule;
      })(EqualityValidationRuleBase);
      _export('EqualityWithOtherLabelValidationRule', EqualityWithOtherLabelValidationRule);
      InEqualityValidationRule = (function(_EqualityValidationRuleBase3) {
        function InEqualityValidationRule(otherValue) {
          _classCallCheck(this, InEqualityValidationRule);
          _EqualityValidationRuleBase3.call(this, otherValue, false);
        }
        _inherits(InEqualityValidationRule, _EqualityValidationRuleBase3);
        return InEqualityValidationRule;
      })(EqualityValidationRuleBase);
      _export('InEqualityValidationRule', InEqualityValidationRule);
      InEqualityWithOtherLabelValidationRule = (function(_EqualityValidationRuleBase4) {
        function InEqualityWithOtherLabelValidationRule(otherValue, otherLabel) {
          _classCallCheck(this, InEqualityWithOtherLabelValidationRule);
          _EqualityValidationRuleBase4.call(this, otherValue, false, otherLabel);
        }
        _inherits(InEqualityWithOtherLabelValidationRule, _EqualityValidationRuleBase4);
        return InEqualityWithOtherLabelValidationRule;
      })(EqualityValidationRuleBase);
      _export('InEqualityWithOtherLabelValidationRule', InEqualityWithOtherLabelValidationRule);
      InCollectionValidationRule = (function(_ValidationRule22) {
        function InCollectionValidationRule(collection) {
          _classCallCheck(this, InCollectionValidationRule);
          _ValidationRule22.call(this, collection, function(newValue, threshold) {
            var collection = Utilities.getValue(threshold);
            for (var i = 0; i < collection.length; i++) {
              if (newValue === collection[i])
                return true;
            }
            return false;
          });
        }
        _inherits(InCollectionValidationRule, _ValidationRule22);
        return InCollectionValidationRule;
      })(ValidationRule);
      _export('InCollectionValidationRule', InCollectionValidationRule);
    }
  };
});

System.register("github:aurelia/validation@0.2.5/validation/validation-property", ["github:aurelia/validation@0.2.5/validation/validation-rules-collection", "github:aurelia/validation@0.2.5/validation/path-observer", "github:aurelia/validation@0.2.5/validation/debouncer"], function(_export) {
  var AllCollections,
      PathObserver,
      Debouncer,
      _classCallCheck,
      ValidationProperty;
  return {
    setters: [function(_validationValidationRulesCollection) {
      AllCollections = _validationValidationRulesCollection;
    }, function(_validationPathObserver) {
      PathObserver = _validationPathObserver.PathObserver;
    }, function(_validationDebouncer) {
      Debouncer = _validationDebouncer.Debouncer;
    }],
    execute: function() {
      'use strict';
      _classCallCheck = function(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError('Cannot call a class as a function');
        }
      };
      ValidationProperty = (function() {
        function ValidationProperty(observerLocator, propertyName, validationGroup, propertyResult, config) {
          var _this = this;
          _classCallCheck(this, ValidationProperty);
          this.propertyResult = propertyResult;
          this.propertyName = propertyName;
          this.validationGroup = validationGroup;
          this.collectionOfValidationRules = new AllCollections.ValidationRulesCollection();
          this.config = config;
          this.latestValue = undefined;
          this.observer = new PathObserver(observerLocator, validationGroup.subject, propertyName).getObserver();
          this.debouncer = new Debouncer(config.getDebounceTimeout());
          this.observer.subscribe(function() {
            _this.debouncer.debounce(function() {
              var newValue = _this.observer.getValue();
              if (newValue !== _this.latestValue) {
                _this.validate(newValue, true);
              }
            });
          });
          this.dependencyObservers = [];
          var dependencies = this.config.getDependencies();
          for (var i = 0; i < dependencies.length; i++) {
            var dependencyObserver = new PathObserver(observerLocator, validationGroup.subject, dependencies[i]).getObserver();
            dependencyObserver.subscribe(function() {
              _this.debouncer.debounce(function() {
                _this.validateCurrentValue(true);
              });
            });
            this.dependencyObservers.push(dependencyObserver);
          }
        }
        ValidationProperty.prototype.addValidationRule = function addValidationRule(validationRule) {
          if (validationRule.validate === undefined)
            throw new Error('That\'s not a valid validationRule');
          this.collectionOfValidationRules.addValidationRule(validationRule);
          this.validateCurrentValue(false);
        };
        ValidationProperty.prototype.validateCurrentValue = function validateCurrentValue(forceDirty, forceExecution) {
          return this.validate(this.observer.getValue(), forceDirty, forceExecution);
        };
        ValidationProperty.prototype.clear = function clear() {
          this.latestValue = this.observer.getValue();
          this.propertyResult.clear();
        };
        ValidationProperty.prototype.validate = function validate(newValue, shouldBeDirty, forceExecution) {
          var _this2 = this;
          if (!this.propertyResult.isDirty && shouldBeDirty || this.latestValue !== newValue || forceExecution) {
            this.latestValue = newValue;
            return this.config.locale().then(function(locale) {
              return _this2.collectionOfValidationRules.validate(newValue, locale).then(function(validationResponse) {
                if (_this2.latestValue === validationResponse.latestValue)
                  _this2.propertyResult.setValidity(validationResponse, shouldBeDirty);
                return validationResponse.isValid;
              })['catch'](function(err) {
                console.log('Unexpected behavior: a validation-rules-collection should always fulfil', err);
                debugger;
                throw Error('Unexpected behavior: a validation-rules-collection should always fulfil');
              });
            }, function() {
              throw Error('An exception occurred while trying to load the locale');
            });
          }
        };
        return ValidationProperty;
      })();
      _export('ValidationProperty', ValidationProperty);
    }
  };
});

System.register("github:aurelia/path@0.7.0", ["github:aurelia/path@0.7.0/index"], function($__export) {
  return {
    setters: [function(m) {
      for (var p in m)
        $__export(p, m[p]);
    }],
    execute: function() {}
  };
});

System.register("github:aurelia/loader@0.7.0/index", ["github:aurelia/loader@0.7.0/template-registry-entry", "github:aurelia/loader@0.7.0/loader"], function(_export) {
  'use strict';
  return {
    setters: [function(_templateRegistryEntry) {
      _export('TemplateRegistryEntry', _templateRegistryEntry.TemplateRegistryEntry);
      _export('TemplateDependency', _templateRegistryEntry.TemplateDependency);
    }, function(_loader) {
      _export('Loader', _loader.Loader);
    }],
    execute: function() {}
  };
});

System.register("github:aurelia/templating@0.12.1/view-slot", ["github:aurelia/templating@0.12.1/content-selector", "github:aurelia/templating@0.12.1/animator", "github:aurelia/templating@0.12.1/util"], function(_export) {
  'use strict';
  var ContentSelector,
      Animator,
      nextElementSibling,
      ViewSlot;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }
  return {
    setters: [function(_contentSelector) {
      ContentSelector = _contentSelector.ContentSelector;
    }, function(_animator) {
      Animator = _animator.Animator;
    }, function(_util) {
      nextElementSibling = _util.nextElementSibling;
    }],
    execute: function() {
      ViewSlot = (function() {
        function ViewSlot(anchor, anchorIsContainer, executionContext) {
          var animator = arguments[3] === undefined ? Animator.instance : arguments[3];
          _classCallCheck(this, ViewSlot);
          this.anchor = anchor;
          this.viewAddMethod = anchorIsContainer ? 'appendNodesTo' : 'insertNodesBefore';
          this.executionContext = executionContext;
          this.animator = animator;
          this.children = [];
          this.isBound = false;
          this.isAttached = false;
          anchor.viewSlot = this;
        }
        ViewSlot.prototype.transformChildNodesIntoView = function transformChildNodesIntoView() {
          var parent = this.anchor;
          this.children.push({
            fragment: parent,
            firstChild: parent.firstChild,
            lastChild: parent.lastChild,
            removeNodes: function removeNodes() {
              var last;
              while (last = parent.lastChild) {
                parent.removeChild(last);
              }
            },
            created: function created() {},
            bind: function bind() {},
            unbind: function unbind() {},
            attached: function attached() {},
            detached: function detached() {}
          });
        };
        ViewSlot.prototype.bind = function bind(executionContext) {
          var i,
              ii,
              children;
          if (this.isBound) {
            if (this.executionContext === executionContext) {
              return ;
            }
            this.unbind();
          }
          this.isBound = true;
          this.executionContext = executionContext = executionContext || this.executionContext;
          children = this.children;
          for (i = 0, ii = children.length; i < ii; ++i) {
            children[i].bind(executionContext, true);
          }
        };
        ViewSlot.prototype.unbind = function unbind() {
          var i,
              ii,
              children = this.children;
          this.isBound = false;
          for (i = 0, ii = children.length; i < ii; ++i) {
            children[i].unbind();
          }
        };
        ViewSlot.prototype.add = function add(view) {
          view[this.viewAddMethod](this.anchor);
          this.children.push(view);
          if (this.isAttached) {
            view.attached();
            var element = view.firstChild ? nextElementSibling(view.firstChild) : null;
            if (view.firstChild && view.firstChild.nodeType === 8 && element && element.nodeType === 1 && element.classList.contains('au-animate')) {
              this.animator.enter(element);
            }
          }
        };
        ViewSlot.prototype.insert = function insert(index, view) {
          if (index === 0 && !this.children.length || index >= this.children.length) {
            this.add(view);
          } else {
            view.insertNodesBefore(this.children[index].firstChild);
            this.children.splice(index, 0, view);
            if (this.isAttached) {
              view.attached();
            }
          }
        };
        ViewSlot.prototype.remove = function remove(view) {
          view.removeNodes();
          this.children.splice(this.children.indexOf(view), 1);
          if (this.isAttached) {
            view.detached();
          }
        };
        ViewSlot.prototype.removeAt = function removeAt(index) {
          var _this = this;
          var view = this.children[index];
          var removeAction = function removeAction() {
            view.removeNodes();
            _this.children.splice(index, 1);
            if (_this.isAttached) {
              view.detached();
            }
            return view;
          };
          var element = view.firstChild ? nextElementSibling(view.firstChild) : null;
          if (view.firstChild && view.firstChild.nodeType === 8 && element && element.nodeType === 1 && element.classList.contains('au-animate')) {
            return this.animator.leave(element).then(function() {
              return removeAction();
            });
          } else {
            return removeAction();
          }
        };
        ViewSlot.prototype.removeAll = function removeAll() {
          var _this2 = this;
          var children = this.children,
              ii = children.length,
              i;
          var rmPromises = [];
          children.forEach(function(child) {
            var element = child.firstChild ? nextElementSibling(child.firstChild) : null;
            if (child.firstChild && child.firstChild.nodeType === 8 && element && element.nodeType === 1 && element.classList.contains('au-animate')) {
              rmPromises.push(_this2.animator.leave(element).then(function() {
                child.removeNodes();
              }));
            } else {
              child.removeNodes();
            }
          });
          var removeAction = function removeAction() {
            if (_this2.isAttached) {
              for (i = 0; i < ii; ++i) {
                children[i].detached();
              }
            }
            _this2.children = [];
          };
          if (rmPromises.length > 0) {
            return Promise.all(rmPromises).then(function() {
              removeAction();
            });
          } else {
            removeAction();
          }
        };
        ViewSlot.prototype.swap = function swap(view) {
          var _this3 = this;
          var removeResponse = this.removeAll();
          if (removeResponse !== undefined) {
            removeResponse.then(function() {
              _this3.add(view);
            });
          } else {
            this.add(view);
          }
        };
        ViewSlot.prototype.attached = function attached() {
          var i,
              ii,
              children,
              child;
          if (this.isAttached) {
            return ;
          }
          this.isAttached = true;
          children = this.children;
          for (i = 0, ii = children.length; i < ii; ++i) {
            child = children[i];
            child.attached();
            var element = child.firstChild ? nextElementSibling(child.firstChild) : null;
            if (child.firstChild && child.firstChild.nodeType === 8 && element && element.nodeType === 1 && element.classList.contains('au-animate')) {
              this.animator.enter(element);
            }
          }
        };
        ViewSlot.prototype.detached = function detached() {
          var i,
              ii,
              children;
          if (this.isAttached) {
            this.isAttached = false;
            children = this.children;
            for (i = 0, ii = children.length; i < ii; ++i) {
              children[i].detached();
            }
          }
        };
        ViewSlot.prototype.installContentSelectors = function installContentSelectors(contentSelectors) {
          this.contentSelectors = contentSelectors;
          this.add = this.contentSelectorAdd;
          this.insert = this.contentSelectorInsert;
          this.remove = this.contentSelectorRemove;
          this.removeAt = this.contentSelectorRemoveAt;
          this.removeAll = this.contentSelectorRemoveAll;
        };
        ViewSlot.prototype.contentSelectorAdd = function contentSelectorAdd(view) {
          ContentSelector.applySelectors(view, this.contentSelectors, function(contentSelector, group) {
            return contentSelector.add(group);
          });
          this.children.push(view);
          if (this.isAttached) {
            view.attached();
          }
        };
        ViewSlot.prototype.contentSelectorInsert = function contentSelectorInsert(index, view) {
          if (index === 0 && !this.children.length || index >= this.children.length) {
            this.add(view);
          } else {
            ContentSelector.applySelectors(view, this.contentSelectors, function(contentSelector, group) {
              return contentSelector.insert(index, group);
            });
            this.children.splice(index, 0, view);
            if (this.isAttached) {
              view.attached();
            }
          }
        };
        ViewSlot.prototype.contentSelectorRemove = function contentSelectorRemove(view) {
          var index = this.children.indexOf(view),
              contentSelectors = this.contentSelectors,
              i,
              ii;
          for (i = 0, ii = contentSelectors.length; i < ii; ++i) {
            contentSelectors[i].removeAt(index, view.fragment);
          }
          this.children.splice(index, 1);
          if (this.isAttached) {
            view.detached();
          }
        };
        ViewSlot.prototype.contentSelectorRemoveAt = function contentSelectorRemoveAt(index) {
          var view = this.children[index],
              contentSelectors = this.contentSelectors,
              i,
              ii;
          for (i = 0, ii = contentSelectors.length; i < ii; ++i) {
            contentSelectors[i].removeAt(index, view.fragment);
          }
          this.children.splice(index, 1);
          if (this.isAttached) {
            view.detached();
          }
          return view;
        };
        ViewSlot.prototype.contentSelectorRemoveAll = function contentSelectorRemoveAll() {
          var children = this.children,
              contentSelectors = this.contentSelectors,
              ii = children.length,
              jj = contentSelectors.length,
              i,
              j,
              view;
          for (i = 0; i < ii; ++i) {
            view = children[i];
            for (j = 0; j < jj; ++j) {
              contentSelectors[j].removeAt(i, view.fragment);
            }
          }
          if (this.isAttached) {
            for (i = 0; i < ii; ++i) {
              children[i].detached();
            }
          }
          this.children = [];
        };
        return ViewSlot;
      })();
      _export('ViewSlot', ViewSlot);
    }
  };
});

System.register("npm:core-js@0.9.16/modules/$.cof", ["npm:core-js@0.9.16/modules/$", "npm:core-js@0.9.16/modules/$.wks"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@0.9.16/modules/$"),
      TAG = require("npm:core-js@0.9.16/modules/$.wks")('toStringTag'),
      toString = {}.toString;
  function cof(it) {
    return toString.call(it).slice(8, -1);
  }
  cof.classof = function(it) {
    var O,
        T;
    return it == undefined ? it === undefined ? 'Undefined' : 'Null' : typeof(T = (O = Object(it))[TAG]) == 'string' ? T : cof(O);
  };
  cof.set = function(it, tag, stat) {
    if (it && !$.has(it = stat ? it : it.prototype, TAG))
      $.hide(it, TAG, tag);
  };
  module.exports = cof;
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.16/modules/$.array-methods", ["npm:core-js@0.9.16/modules/$", "npm:core-js@0.9.16/modules/$.ctx"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@0.9.16/modules/$"),
      ctx = require("npm:core-js@0.9.16/modules/$.ctx");
  module.exports = function(TYPE) {
    var IS_MAP = TYPE == 1,
        IS_FILTER = TYPE == 2,
        IS_SOME = TYPE == 3,
        IS_EVERY = TYPE == 4,
        IS_FIND_INDEX = TYPE == 6,
        NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
    return function($this, callbackfn, that) {
      var O = Object($.assertDefined($this)),
          self = $.ES5Object(O),
          f = ctx(callbackfn, that, 3),
          length = $.toLength(self.length),
          index = 0,
          result = IS_MAP ? Array(length) : IS_FILTER ? [] : undefined,
          val,
          res;
      for (; length > index; index++)
        if (NO_HOLES || index in self) {
          val = self[index];
          res = f(val, index, O);
          if (TYPE) {
            if (IS_MAP)
              result[index] = res;
            else if (res)
              switch (TYPE) {
                case 3:
                  return true;
                case 5:
                  return val;
                case 6:
                  return index;
                case 2:
                  result.push(val);
              }
            else if (IS_EVERY)
              return false;
          }
        }
      return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
    };
  };
  global.define = __define;
  return module.exports;
});

System.register("github:jspm/nodelibs-process@0.1.1/index", ["npm:process@0.10.1"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = System._nodeRequire ? process : require("npm:process@0.10.1");
  global.define = __define;
  return module.exports;
});

System.register("github:aurelia/binding@0.7.3/array-observation", ["github:aurelia/binding@0.7.3/environment", "github:aurelia/binding@0.7.3/array-change-records", "github:aurelia/binding@0.7.3/collection-observation"], function(_export) {
  'use strict';
  var hasArrayObserve,
      projectArraySplices,
      ModifyCollectionObserver,
      CollectionLengthObserver,
      arrayProto,
      ModifyArrayObserver,
      ArrayObserveObserver;
  _export('getArrayObserver', getArrayObserver);
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }
  function _inherits(subClass, superClass) {
    if (typeof superClass !== 'function' && superClass !== null) {
      throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }});
    if (superClass)
      subClass.__proto__ = superClass;
  }
  function getArrayObserver(taskQueue, array) {
    if (hasArrayObserve) {
      return new ArrayObserveObserver(array);
    } else {
      return ModifyArrayObserver.create(taskQueue, array);
    }
  }
  return {
    setters: [function(_environment) {
      hasArrayObserve = _environment.hasArrayObserve;
    }, function(_arrayChangeRecords) {
      projectArraySplices = _arrayChangeRecords.projectArraySplices;
    }, function(_collectionObservation) {
      ModifyCollectionObserver = _collectionObservation.ModifyCollectionObserver;
      CollectionLengthObserver = _collectionObservation.CollectionLengthObserver;
    }],
    execute: function() {
      arrayProto = Array.prototype;
      ModifyArrayObserver = (function(_ModifyCollectionObserver) {
        function ModifyArrayObserver(taskQueue, array) {
          _classCallCheck(this, ModifyArrayObserver);
          _ModifyCollectionObserver.call(this, taskQueue, array);
        }
        _inherits(ModifyArrayObserver, _ModifyCollectionObserver);
        ModifyArrayObserver.create = function create(taskQueue, array) {
          var observer = new ModifyArrayObserver(taskQueue, array);
          array['pop'] = function() {
            var methodCallResult = arrayProto['pop'].apply(array, arguments);
            observer.addChangeRecord({
              type: 'delete',
              object: array,
              name: array.length,
              oldValue: methodCallResult
            });
            return methodCallResult;
          };
          array['push'] = function() {
            var methodCallResult = arrayProto['push'].apply(array, arguments);
            observer.addChangeRecord({
              type: 'splice',
              object: array,
              index: array.length - arguments.length,
              removed: [],
              addedCount: arguments.length
            });
            return methodCallResult;
          };
          array['reverse'] = function() {
            var oldArray = array.slice();
            var methodCallResult = arrayProto['reverse'].apply(array, arguments);
            observer.reset(oldArray);
            return methodCallResult;
          };
          array['shift'] = function() {
            var methodCallResult = arrayProto['shift'].apply(array, arguments);
            observer.addChangeRecord({
              type: 'delete',
              object: array,
              name: 0,
              oldValue: methodCallResult
            });
            return methodCallResult;
          };
          array['sort'] = function() {
            var oldArray = array.slice();
            var methodCallResult = arrayProto['sort'].apply(array, arguments);
            observer.reset(oldArray);
            return methodCallResult;
          };
          array['splice'] = function() {
            var methodCallResult = arrayProto['splice'].apply(array, arguments);
            observer.addChangeRecord({
              type: 'splice',
              object: array,
              index: arguments[0],
              removed: methodCallResult,
              addedCount: arguments.length > 2 ? arguments.length - 2 : 0
            });
            return methodCallResult;
          };
          array['unshift'] = function() {
            var methodCallResult = arrayProto['unshift'].apply(array, arguments);
            observer.addChangeRecord({
              type: 'splice',
              object: array,
              index: 0,
              removed: [],
              addedCount: arguments.length
            });
            return methodCallResult;
          };
          return observer;
        };
        return ModifyArrayObserver;
      })(ModifyCollectionObserver);
      ArrayObserveObserver = (function() {
        function ArrayObserveObserver(array) {
          _classCallCheck(this, ArrayObserveObserver);
          this.array = array;
          this.callbacks = [];
        }
        ArrayObserveObserver.prototype.subscribe = function subscribe(callback) {
          var _this = this;
          var callbacks = this.callbacks;
          if (callbacks.length === 0) {
            this.handler = this.handleChanges.bind(this);
            Array.observe(this.array, this.handler);
          }
          callbacks.push(callback);
          return function() {
            callbacks.splice(callbacks.indexOf(callback), 1);
            if (callbacks.length === 0) {
              Array.unobserve(_this.array, _this.handler);
            }
          };
        };
        ArrayObserveObserver.prototype.getLengthObserver = function getLengthObserver() {
          return this.lengthObserver || (this.lengthObserver = new CollectionLengthObserver(this.array));
        };
        ArrayObserveObserver.prototype.handleChanges = function handleChanges(changeRecords) {
          var callbacks = this.callbacks,
              i = callbacks.length,
              splices;
          if (i) {
            splices = projectArraySplices(this.array, changeRecords);
            while (i--) {
              callbacks[i](splices);
            }
          }
          if (this.lengthObserver) {
            this.lengthObserver.call(this.array.length);
          }
        };
        return ArrayObserveObserver;
      })();
    }
  };
});

System.register("github:aurelia/dependency-injection@0.8.1/container", ["npm:core-js@0.9.16", "github:aurelia/metadata@0.6.0", "github:aurelia/logging@0.5.0", "github:aurelia/dependency-injection@0.8.1/metadata"], function(_export) {
  'use strict';
  var core,
      Metadata,
      AggregateError,
      Resolver,
      ClassActivator,
      emptyParameters,
      Container;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }
  function test() {}
  return {
    setters: [function(_coreJs) {
      core = _coreJs['default'];
    }, function(_aureliaMetadata) {
      Metadata = _aureliaMetadata.Metadata;
    }, function(_aureliaLogging) {
      AggregateError = _aureliaLogging.AggregateError;
    }, function(_metadata) {
      Resolver = _metadata.Resolver;
      ClassActivator = _metadata.ClassActivator;
    }],
    execute: function() {
      Metadata.registration = 'aurelia:registration';
      Metadata.instanceActivator = 'aurelia:instance-activator';
      if (!test.name) {
        Object.defineProperty(Function.prototype, 'name', {get: function get() {
            var name = this.toString().match(/^\s*function\s*(\S*)\s*\(/)[1];
            Object.defineProperty(this, 'name', {value: name});
            return name;
          }});
      }
      emptyParameters = Object.freeze([]);
      _export('emptyParameters', emptyParameters);
      Container = (function() {
        function Container(constructionInfo) {
          _classCallCheck(this, Container);
          this.constructionInfo = constructionInfo || new Map();
          this.entries = new Map();
          this.root = this;
        }
        Container.prototype.addParameterInfoLocator = function addParameterInfoLocator(locator) {
          if (this.locateParameterInfoElsewhere === undefined) {
            this.locateParameterInfoElsewhere = locator;
            return ;
          }
          var original = this.locateParameterInfoElsewhere;
          this.locateParameterInfoElsewhere = function(fn) {
            return original(fn) || locator(fn);
          };
        };
        Container.prototype.registerInstance = function registerInstance(key, instance) {
          this.registerHandler(key, function(x) {
            return instance;
          });
        };
        Container.prototype.registerTransient = function registerTransient(key, fn) {
          fn = fn || key;
          this.registerHandler(key, function(x) {
            return x.invoke(fn);
          });
        };
        Container.prototype.registerSingleton = function registerSingleton(key, fn) {
          var singleton = null;
          fn = fn || key;
          this.registerHandler(key, function(x) {
            return singleton || (singleton = x.invoke(fn));
          });
        };
        Container.prototype.autoRegister = function autoRegister(fn, key) {
          var registration;
          if (fn === null || fn === undefined) {
            throw new Error('fn cannot be null or undefined.');
          }
          if (typeof fn === 'function') {
            registration = Metadata.get(Metadata.registration, fn);
            if (registration !== undefined) {
              registration.register(this, key || fn, fn);
            } else {
              this.registerSingleton(key || fn, fn);
            }
          } else {
            this.registerInstance(fn, fn);
          }
        };
        Container.prototype.autoRegisterAll = function autoRegisterAll(fns) {
          var i = fns.length;
          while (i--) {
            this.autoRegister(fns[i]);
          }
        };
        Container.prototype.registerHandler = function registerHandler(key, handler) {
          this.getOrCreateEntry(key).push(handler);
        };
        Container.prototype.unregister = function unregister(key) {
          this.entries['delete'](key);
        };
        Container.prototype.get = function get(key) {
          var entry;
          if (key === null || key === undefined) {
            throw new Error('key cannot be null or undefined.');
          }
          if (key === Container) {
            return this;
          }
          if (key instanceof Resolver) {
            return key.get(this);
          }
          entry = this.entries.get(key);
          if (entry !== undefined) {
            return entry[0](this);
          }
          if (this.parent) {
            return this.parent.get(key);
          }
          this.autoRegister(key);
          entry = this.entries.get(key);
          return entry[0](this);
        };
        Container.prototype.getAll = function getAll(key) {
          var _this = this;
          var entry;
          if (key === null || key === undefined) {
            throw new Error('key cannot be null or undefined.');
          }
          entry = this.entries.get(key);
          if (entry !== undefined) {
            return entry.map(function(x) {
              return x(_this);
            });
          }
          if (this.parent) {
            return this.parent.getAll(key);
          }
          return [];
        };
        Container.prototype.hasHandler = function hasHandler(key) {
          var checkParent = arguments[1] === undefined ? false : arguments[1];
          if (key === null || key === undefined) {
            throw new Error('key cannot be null or undefined.');
          }
          return this.entries.has(key) || checkParent && this.parent && this.parent.hasHandler(key, checkParent);
        };
        Container.prototype.createChild = function createChild() {
          var childContainer = new Container(this.constructionInfo);
          childContainer.parent = this;
          childContainer.root = this.root;
          childContainer.locateParameterInfoElsewhere = this.locateParameterInfoElsewhere;
          return childContainer;
        };
        Container.prototype.invoke = function invoke(fn) {
          try {
            var info = this.getOrCreateConstructionInfo(fn),
                keys = info.keys,
                args = new Array(keys.length),
                i,
                ii;
            for (i = 0, ii = keys.length; i < ii; ++i) {
              args[i] = this.get(keys[i]);
            }
            return info.activator.invoke(fn, args);
          } catch (e) {
            var activatingText = info.activator instanceof ClassActivator ? 'instantiating' : 'invoking';
            var message = 'Error ' + activatingText + ' ' + fn.name + '.';
            if (i < ii) {
              message += ' The argument at index ' + i + ' (key:' + keys[i] + ') could not be satisfied.';
            }
            message += ' Check the inner error for details.';
            throw AggregateError(message, e, true);
          }
        };
        Container.prototype.getOrCreateEntry = function getOrCreateEntry(key) {
          var entry;
          if (key === null || key === undefined) {
            throw new Error('key cannot be null or undefined.');
          }
          entry = this.entries.get(key);
          if (entry === undefined) {
            entry = [];
            this.entries.set(key, entry);
          }
          return entry;
        };
        Container.prototype.getOrCreateConstructionInfo = function getOrCreateConstructionInfo(fn) {
          var info = this.constructionInfo.get(fn);
          if (info === undefined) {
            info = this.createConstructionInfo(fn);
            this.constructionInfo.set(fn, info);
          }
          return info;
        };
        Container.prototype.createConstructionInfo = function createConstructionInfo(fn) {
          var info = {activator: Metadata.getOwn(Metadata.instanceActivator, fn) || ClassActivator.instance};
          if (fn.inject !== undefined) {
            if (typeof fn.inject === 'function') {
              info.keys = fn.inject();
            } else {
              info.keys = fn.inject;
            }
            return info;
          }
          if (this.locateParameterInfoElsewhere !== undefined) {
            info.keys = this.locateParameterInfoElsewhere(fn) || Reflect.getOwnMetadata(Metadata.paramTypes, fn) || emptyParameters;
          } else {
            info.keys = Reflect.getOwnMetadata(Metadata.paramTypes, fn) || emptyParameters;
          }
          return info;
        };
        return Container;
      })();
      _export('Container', Container);
    }
  };
});

System.register("github:aurelia/binding@0.7.3/parser", ["github:aurelia/binding@0.7.3/lexer", "github:aurelia/binding@0.7.3/ast"], function(_export) {
  'use strict';
  var Lexer,
      Token,
      Expression,
      ArrayOfExpression,
      Chain,
      ValueConverter,
      Assign,
      Conditional,
      AccessScope,
      AccessMember,
      AccessKeyed,
      CallScope,
      CallFunction,
      CallMember,
      PrefixNot,
      Binary,
      LiteralPrimitive,
      LiteralArray,
      LiteralObject,
      LiteralString,
      EOF,
      Parser,
      ParserImplementation;
  var _createClass = (function() {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ('value' in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    return function(Constructor, protoProps, staticProps) {
      if (protoProps)
        defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        defineProperties(Constructor, staticProps);
      return Constructor;
    };
  })();
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }
  return {
    setters: [function(_lexer) {
      Lexer = _lexer.Lexer;
      Token = _lexer.Token;
    }, function(_ast) {
      Expression = _ast.Expression;
      ArrayOfExpression = _ast.ArrayOfExpression;
      Chain = _ast.Chain;
      ValueConverter = _ast.ValueConverter;
      Assign = _ast.Assign;
      Conditional = _ast.Conditional;
      AccessScope = _ast.AccessScope;
      AccessMember = _ast.AccessMember;
      AccessKeyed = _ast.AccessKeyed;
      CallScope = _ast.CallScope;
      CallFunction = _ast.CallFunction;
      CallMember = _ast.CallMember;
      PrefixNot = _ast.PrefixNot;
      Binary = _ast.Binary;
      LiteralPrimitive = _ast.LiteralPrimitive;
      LiteralArray = _ast.LiteralArray;
      LiteralObject = _ast.LiteralObject;
      LiteralString = _ast.LiteralString;
    }],
    execute: function() {
      EOF = new Token(-1, null);
      Parser = (function() {
        function Parser() {
          _classCallCheck(this, Parser);
          this.cache = {};
          this.lexer = new Lexer();
        }
        Parser.prototype.parse = function parse(input) {
          input = input || '';
          return this.cache[input] || (this.cache[input] = new ParserImplementation(this.lexer, input).parseChain());
        };
        return Parser;
      })();
      _export('Parser', Parser);
      ParserImplementation = (function() {
        function ParserImplementation(lexer, input) {
          _classCallCheck(this, ParserImplementation);
          this.index = 0;
          this.input = input;
          this.tokens = lexer.lex(input);
        }
        ParserImplementation.prototype.parseChain = function parseChain() {
          var isChain = false,
              expressions = [];
          while (this.optional(';')) {
            isChain = true;
          }
          while (this.index < this.tokens.length) {
            if (this.peek.text === ')' || this.peek.text === '}' || this.peek.text === ']') {
              this.error('Unconsumed token ' + this.peek.text);
            }
            var expr = this.parseValueConverter();
            expressions.push(expr);
            while (this.optional(';')) {
              isChain = true;
            }
            if (isChain && expr instanceof ValueConverter) {
              this.error('cannot have a value converter in a chain');
            }
          }
          return expressions.length === 1 ? expressions[0] : new Chain(expressions);
        };
        ParserImplementation.prototype.parseValueConverter = function parseValueConverter() {
          var result = this.parseExpression();
          while (this.optional('|')) {
            var name = this.peek.text,
                args = [];
            this.advance();
            while (this.optional(':')) {
              args.push(this.parseExpression());
            }
            result = new ValueConverter(result, name, args, [result].concat(args));
          }
          return result;
        };
        ParserImplementation.prototype.parseExpression = function parseExpression() {
          var start = this.peek.index,
              result = this.parseConditional();
          while (this.peek.text === '=') {
            if (!result.isAssignable) {
              var end = this.index < this.tokens.length ? this.peek.index : this.input.length;
              var expression = this.input.substring(start, end);
              this.error('Expression ' + expression + ' is not assignable');
            }
            this.expect('=');
            result = new Assign(result, this.parseConditional());
          }
          return result;
        };
        ParserImplementation.prototype.parseConditional = function parseConditional() {
          var start = this.peek.index,
              result = this.parseLogicalOr();
          if (this.optional('?')) {
            var yes = this.parseExpression();
            if (!this.optional(':')) {
              var end = this.index < this.tokens.length ? this.peek.index : this.input.length;
              var expression = this.input.substring(start, end);
              this.error('Conditional expression ' + expression + ' requires all 3 expressions');
            }
            var no = this.parseExpression();
            result = new Conditional(result, yes, no);
          }
          return result;
        };
        ParserImplementation.prototype.parseLogicalOr = function parseLogicalOr() {
          var result = this.parseLogicalAnd();
          while (this.optional('||')) {
            result = new Binary('||', result, this.parseLogicalAnd());
          }
          return result;
        };
        ParserImplementation.prototype.parseLogicalAnd = function parseLogicalAnd() {
          var result = this.parseEquality();
          while (this.optional('&&')) {
            result = new Binary('&&', result, this.parseEquality());
          }
          return result;
        };
        ParserImplementation.prototype.parseEquality = function parseEquality() {
          var result = this.parseRelational();
          while (true) {
            if (this.optional('==')) {
              result = new Binary('==', result, this.parseRelational());
            } else if (this.optional('!=')) {
              result = new Binary('!=', result, this.parseRelational());
            } else if (this.optional('===')) {
              result = new Binary('===', result, this.parseRelational());
            } else if (this.optional('!==')) {
              result = new Binary('!==', result, this.parseRelational());
            } else {
              return result;
            }
          }
        };
        ParserImplementation.prototype.parseRelational = function parseRelational() {
          var result = this.parseAdditive();
          while (true) {
            if (this.optional('<')) {
              result = new Binary('<', result, this.parseAdditive());
            } else if (this.optional('>')) {
              result = new Binary('>', result, this.parseAdditive());
            } else if (this.optional('<=')) {
              result = new Binary('<=', result, this.parseAdditive());
            } else if (this.optional('>=')) {
              result = new Binary('>=', result, this.parseAdditive());
            } else {
              return result;
            }
          }
        };
        ParserImplementation.prototype.parseAdditive = function parseAdditive() {
          var result = this.parseMultiplicative();
          while (true) {
            if (this.optional('+')) {
              result = new Binary('+', result, this.parseMultiplicative());
            } else if (this.optional('-')) {
              result = new Binary('-', result, this.parseMultiplicative());
            } else {
              return result;
            }
          }
        };
        ParserImplementation.prototype.parseMultiplicative = function parseMultiplicative() {
          var result = this.parsePrefix();
          while (true) {
            if (this.optional('*')) {
              result = new Binary('*', result, this.parsePrefix());
            } else if (this.optional('%')) {
              result = new Binary('%', result, this.parsePrefix());
            } else if (this.optional('/')) {
              result = new Binary('/', result, this.parsePrefix());
            } else {
              return result;
            }
          }
        };
        ParserImplementation.prototype.parsePrefix = function parsePrefix() {
          if (this.optional('+')) {
            return this.parsePrefix();
          } else if (this.optional('-')) {
            return new Binary('-', new LiteralPrimitive(0), this.parsePrefix());
          } else if (this.optional('!')) {
            return new PrefixNot('!', this.parsePrefix());
          } else {
            return this.parseAccessOrCallMember();
          }
        };
        ParserImplementation.prototype.parseAccessOrCallMember = function parseAccessOrCallMember() {
          var result = this.parsePrimary();
          while (true) {
            if (this.optional('.')) {
              var name = this.peek.text;
              this.advance();
              if (this.optional('(')) {
                var args = this.parseExpressionList(')');
                this.expect(')');
                result = new CallMember(result, name, args);
              } else {
                result = new AccessMember(result, name);
              }
            } else if (this.optional('[')) {
              var key = this.parseExpression();
              this.expect(']');
              result = new AccessKeyed(result, key);
            } else if (this.optional('(')) {
              var args = this.parseExpressionList(')');
              this.expect(')');
              result = new CallFunction(result, args);
            } else {
              return result;
            }
          }
        };
        ParserImplementation.prototype.parsePrimary = function parsePrimary() {
          if (this.optional('(')) {
            var result = this.parseExpression();
            this.expect(')');
            return result;
          } else if (this.optional('null') || this.optional('undefined')) {
            return new LiteralPrimitive(null);
          } else if (this.optional('true')) {
            return new LiteralPrimitive(true);
          } else if (this.optional('false')) {
            return new LiteralPrimitive(false);
          } else if (this.optional('[')) {
            var elements = this.parseExpressionList(']');
            this.expect(']');
            return new LiteralArray(elements);
          } else if (this.peek.text == '{') {
            return this.parseObject();
          } else if (this.peek.key != null) {
            return this.parseAccessOrCallScope();
          } else if (this.peek.value != null) {
            var value = this.peek.value;
            this.advance();
            return isNaN(value) ? new LiteralString(value) : new LiteralPrimitive(value);
          } else if (this.index >= this.tokens.length) {
            throw new Error('Unexpected end of expression: ' + this.input);
          } else {
            this.error('Unexpected token ' + this.peek.text);
          }
        };
        ParserImplementation.prototype.parseAccessOrCallScope = function parseAccessOrCallScope() {
          var name = this.peek.key;
          this.advance();
          if (!this.optional('(')) {
            return new AccessScope(name);
          }
          var args = this.parseExpressionList(')');
          this.expect(')');
          return new CallScope(name, args);
        };
        ParserImplementation.prototype.parseObject = function parseObject() {
          var keys = [],
              values = [];
          this.expect('{');
          if (this.peek.text !== '}') {
            do {
              var value = this.peek.value;
              keys.push(typeof value === 'string' ? value : this.peek.text);
              this.advance();
              this.expect(':');
              values.push(this.parseExpression());
            } while (this.optional(','));
          }
          this.expect('}');
          return new LiteralObject(keys, values);
        };
        ParserImplementation.prototype.parseExpressionList = function parseExpressionList(terminator) {
          var result = [];
          if (this.peek.text != terminator) {
            do {
              result.push(this.parseExpression());
            } while (this.optional(','));
          }
          return result;
        };
        ParserImplementation.prototype.optional = function optional(text) {
          if (this.peek.text === text) {
            this.advance();
            return true;
          }
          return false;
        };
        ParserImplementation.prototype.expect = function expect(text) {
          if (this.peek.text === text) {
            this.advance();
          } else {
            this.error('Missing expected ' + text);
          }
        };
        ParserImplementation.prototype.advance = function advance() {
          this.index++;
        };
        ParserImplementation.prototype.error = function error(message) {
          var location = this.index < this.tokens.length ? 'at column ' + (this.tokens[this.index].index + 1) + ' in' : 'at the end of the expression';
          throw new Error('Parser Error: ' + message + ' ' + location + ' [' + this.input + ']');
        };
        _createClass(ParserImplementation, [{
          key: 'peek',
          get: function() {
            return this.index < this.tokens.length ? this.tokens[this.index] : EOF;
          }
        }]);
        return ParserImplementation;
      })();
      _export('ParserImplementation', ParserImplementation);
    }
  };
});

System.register("github:aurelia/validation@0.2.5/validation/validation-group-builder", ["github:aurelia/validation@0.2.5/validation/validation-rules", "github:aurelia/validation@0.2.5/validation/validation-rules-collection", "github:aurelia/validation@0.2.5/validation/validation-property", "github:aurelia/validation@0.2.5/validation/validation-config"], function(_export) {
  var AllRules,
      AllCollections,
      ValidationProperty,
      ValidationConfig,
      _classCallCheck,
      ValidationGroupBuilder;
  return {
    setters: [function(_validationValidationRules) {
      AllRules = _validationValidationRules;
    }, function(_validationValidationRulesCollection) {
      AllCollections = _validationValidationRulesCollection;
    }, function(_validationValidationProperty) {
      ValidationProperty = _validationValidationProperty.ValidationProperty;
    }, function(_validationValidationConfig) {
      ValidationConfig = _validationValidationConfig.ValidationConfig;
    }],
    execute: function() {
      'use strict';
      _classCallCheck = function(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError('Cannot call a class as a function');
        }
      };
      ValidationGroupBuilder = (function() {
        function ValidationGroupBuilder(observerLocator, validationGroup) {
          _classCallCheck(this, ValidationGroupBuilder);
          this.observerLocator = observerLocator;
          this.validationRuleCollections = [];
          this.validationGroup = validationGroup;
        }
        ValidationGroupBuilder.prototype.ensure = function ensure(propertyName, configurationCallback) {
          var newValidationProperty = null;
          this.validationRuleCollections = [];
          for (var i = 0; i < this.validationGroup.validationProperties.length; i++) {
            if (this.validationGroup.validationProperties[i].propertyName === propertyName) {
              newValidationProperty = this.validationGroup.validationProperties[i];
              if (configurationCallback !== undefined && typeof configurationCallback === 'function') {
                throw Error('When creating validation rules on binding path ' + propertyName + ' a configuration callback function was provided, but validation rules have previously already been instantiated for this binding path');
              }
              break;
            }
          }
          if (newValidationProperty === null) {
            var propertyResult = this.validationGroup.result.addProperty(propertyName);
            var config = new ValidationConfig(this.validationGroup.config);
            if (configurationCallback !== undefined && typeof configurationCallback === 'function') {
              configurationCallback(config);
            }
            newValidationProperty = new ValidationProperty(this.observerLocator, propertyName, this.validationGroup, propertyResult, config);
            this.validationGroup.validationProperties.push(newValidationProperty);
          }
          this.validationRuleCollections.unshift(newValidationProperty.collectionOfValidationRules);
          return this.validationGroup;
        };
        ValidationGroupBuilder.prototype.isNotEmpty = function isNotEmpty() {
          this.validationRuleCollections[0].isNotEmpty();
          this.checkLast();
          return this.validationGroup;
        };
        ValidationGroupBuilder.prototype.isGreaterThan = function isGreaterThan(minimumValue) {
          return this.passesRule(new AllRules.MinimumValueValidationRule(minimumValue));
        };
        ValidationGroupBuilder.prototype.isGreaterThanOrEqualTo = function isGreaterThanOrEqualTo(minimumValue) {
          return this.passesRule(new AllRules.MinimumInclusiveValueValidationRule(minimumValue));
        };
        ValidationGroupBuilder.prototype.isBetween = function isBetween(minimumValue, maximumValue) {
          return this.passesRule(new AllRules.BetweenValueValidationRule(minimumValue, maximumValue));
        };
        ValidationGroupBuilder.prototype.isIn = function isIn(collection) {
          return this.passesRule(new AllRules.InCollectionValidationRule(collection));
        };
        ValidationGroupBuilder.prototype.isLessThan = function isLessThan(maximumValue) {
          return this.passesRule(new AllRules.MaximumValueValidationRule(maximumValue));
        };
        ValidationGroupBuilder.prototype.isLessThanOrEqualTo = function isLessThanOrEqualTo(maximumValue) {
          return this.passesRule(new AllRules.MaximumInclusiveValueValidationRule(maximumValue));
        };
        ValidationGroupBuilder.prototype.isEqualTo = function isEqualTo(otherValue, otherValueLabel) {
          if (!otherValueLabel) {
            return this.passesRule(new AllRules.EqualityValidationRule(otherValue));
          } else {
            return this.passesRule(new AllRules.EqualityWithOtherLabelValidationRule(otherValue, otherValueLabel));
          }
        };
        ValidationGroupBuilder.prototype.isNotEqualTo = function isNotEqualTo(otherValue, otherValueLabel) {
          if (!otherValueLabel) {
            return this.passesRule(new AllRules.InEqualityValidationRule(otherValue));
          } else {
            return this.passesRule(new AllRules.InEqualityWithOtherLabelValidationRule(otherValue, otherValueLabel));
          }
        };
        ValidationGroupBuilder.prototype.isEmail = function isEmail() {
          return this.passesRule(new AllRules.EmailValidationRule());
        };
        ValidationGroupBuilder.prototype.isURL = function isURL() {
          return this.passesRule(new AllRules.URLValidationRule());
        };
        ValidationGroupBuilder.prototype.hasMinLength = function hasMinLength(minimumValue) {
          return this.passesRule(new AllRules.MinimumLengthValidationRule(minimumValue));
        };
        ValidationGroupBuilder.prototype.hasMaxLength = function hasMaxLength(maximumValue) {
          return this.passesRule(new AllRules.MaximumLengthValidationRule(maximumValue));
        };
        ValidationGroupBuilder.prototype.hasLengthBetween = function hasLengthBetween(minimumValue, maximumValue) {
          return this.passesRule(new AllRules.BetweenLengthValidationRule(minimumValue, maximumValue));
        };
        ValidationGroupBuilder.prototype.isNumber = function isNumber() {
          return this.passesRule(new AllRules.NumericValidationRule());
        };
        ValidationGroupBuilder.prototype.containsNoSpaces = function containsNoSpaces() {
          return this.passesRule(new AllRules.NoSpacesValidationRule());
        };
        ValidationGroupBuilder.prototype.containsOnlyDigits = function containsOnlyDigits() {
          return this.passesRule(new AllRules.DigitValidationRule());
        };
        ValidationGroupBuilder.prototype.containsOnlyAlpha = function containsOnlyAlpha() {
          return this.passesRule(new AllRules.AlphaValidationRule());
        };
        ValidationGroupBuilder.prototype.containsOnlyAlphaOrWhitespace = function containsOnlyAlphaOrWhitespace() {
          return this.passesRule(new AllRules.AlphaOrWhitespaceValidationRule());
        };
        ValidationGroupBuilder.prototype.containsOnlyAlphanumerics = function containsOnlyAlphanumerics() {
          return this.passesRule(new AllRules.AlphaNumericValidationRule());
        };
        ValidationGroupBuilder.prototype.containsOnlyAlphanumericsOrWhitespace = function containsOnlyAlphanumericsOrWhitespace() {
          return this.passesRule(new AllRules.AlphaNumericOrWhitespaceValidationRule());
        };
        ValidationGroupBuilder.prototype.isStrongPassword = function isStrongPassword(minimumComplexityLevel) {
          if (minimumComplexityLevel === 4) {
            return this.passesRule(new AllRules.StrongPasswordValidationRule());
          } else {
            return this.passesRule(new AllRules.MediumPasswordValidationRule(minimumComplexityLevel));
          }
        };
        ValidationGroupBuilder.prototype.containsOnly = function containsOnly(regex) {
          return this.passesRule(new AllRules.ContainsOnlyValidationRule(regex));
        };
        ValidationGroupBuilder.prototype.matches = function matches(regex) {
          return this.passesRule(new AllRules.RegexValidationRule(regex));
        };
        ValidationGroupBuilder.prototype.passes = function passes(customFunction, threshold) {
          return this.passesRule(new AllRules.CustomFunctionValidationRule(customFunction, threshold));
        };
        ValidationGroupBuilder.prototype.passesRule = function passesRule(validationRule) {
          this.validationRuleCollections[0].addValidationRule(validationRule);
          this.checkLast();
          return this.validationGroup;
        };
        ValidationGroupBuilder.prototype.checkLast = function checkLast() {
          var validationProperty = this.validationGroup.validationProperties[this.validationGroup.validationProperties.length - 1];
          validationProperty.validateCurrentValue(false);
        };
        ValidationGroupBuilder.prototype.withMessage = function withMessage(message) {
          this.validationRuleCollections[0].withMessage(message);
          this.checkLast();
          return this.validationGroup;
        };
        ValidationGroupBuilder.prototype['if'] = function _if(conditionExpression) {
          var conditionalCollection = new AllCollections.SwitchCaseValidationRulesCollection(conditionExpression);
          conditionalCollection['case'](true);
          this.validationRuleCollections[0].addValidationRuleCollection(conditionalCollection);
          this.validationRuleCollections.unshift(conditionalCollection);
          return this.validationGroup;
        };
        ValidationGroupBuilder.prototype['else'] = function _else() {
          if (!this.validationRuleCollections[0]['default'])
            throw 'Invalid statement: \'else\'';
          this.validationRuleCollections[0]['default']();
          return this.validationGroup;
        };
        ValidationGroupBuilder.prototype.endIf = function endIf() {
          if (!this.validationRuleCollections[0]['default'])
            throw 'Invalid statement: \'endIf\'';
          this.validationRuleCollections.shift();
          this.checkLast();
          return this.validationGroup;
        };
        ValidationGroupBuilder.prototype['switch'] = function _switch(conditionExpression) {
          var _this = this;
          var condition = conditionExpression;
          if (condition === undefined) {
            (function() {
              var observer = _this.validationGroup.validationProperties[_this.validationGroup.validationProperties.length - 1].observer;
              condition = function() {
                return observer.getValue();
              };
            })();
          }
          var conditionalCollection = new AllCollections.SwitchCaseValidationRulesCollection(condition);
          this.validationRuleCollections[0].addValidationRuleCollection(conditionalCollection);
          this.validationRuleCollections.unshift(conditionalCollection);
          return this.validationGroup;
        };
        ValidationGroupBuilder.prototype['case'] = function _case(caseLabel) {
          if (!this.validationRuleCollections[0]['default'])
            throw 'Invalid statement: \'case\'';
          this.validationRuleCollections[0]['case'](caseLabel);
          return this.validationGroup;
        };
        ValidationGroupBuilder.prototype['default'] = function _default() {
          if (!this.validationRuleCollections[0]['default'])
            throw 'Invalid statement: \'case\'';
          this.validationRuleCollections[0]['default']();
          return this.validationGroup;
        };
        ValidationGroupBuilder.prototype.endSwitch = function endSwitch() {
          if (!this.validationRuleCollections[0]['default'])
            throw 'Invalid statement: \'endIf\'';
          this.validationRuleCollections.shift();
          this.checkLast();
          return this.validationGroup;
        };
        return ValidationGroupBuilder;
      })();
      _export('ValidationGroupBuilder', ValidationGroupBuilder);
    }
  };
});

System.register("github:aurelia/templating@0.12.1/view-strategy", ["github:aurelia/metadata@0.6.0", "github:aurelia/path@0.7.0"], function(_export) {
  'use strict';
  var Metadata,
      Origin,
      relativeToFile,
      ViewStrategy,
      UseViewStrategy,
      ConventionalViewStrategy,
      NoViewStrategy,
      TemplateRegistryViewStrategy;
  var _createClass = (function() {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ('value' in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    return function(Constructor, protoProps, staticProps) {
      if (protoProps)
        defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        defineProperties(Constructor, staticProps);
      return Constructor;
    };
  })();
  function _inherits(subClass, superClass) {
    if (typeof superClass !== 'function' && superClass !== null) {
      throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }});
    if (superClass)
      subClass.__proto__ = superClass;
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }
  return {
    setters: [function(_aureliaMetadata) {
      Metadata = _aureliaMetadata.Metadata;
      Origin = _aureliaMetadata.Origin;
    }, function(_aureliaPath) {
      relativeToFile = _aureliaPath.relativeToFile;
    }],
    execute: function() {
      ViewStrategy = (function() {
        function ViewStrategy() {
          _classCallCheck(this, ViewStrategy);
        }
        ViewStrategy.prototype.makeRelativeTo = function makeRelativeTo(baseUrl) {};
        ViewStrategy.normalize = function normalize(value) {
          if (typeof value === 'string') {
            value = new UseViewStrategy(value);
          }
          if (value && !(value instanceof ViewStrategy)) {
            throw new Error('The view must be a string or an instance of ViewStrategy.');
          }
          return value;
        };
        ViewStrategy.getDefault = function getDefault(target) {
          var strategy,
              annotation;
          if (typeof target !== 'function') {
            target = target.constructor;
          }
          annotation = Origin.get(target);
          strategy = Metadata.get(ViewStrategy.metadataKey, target);
          if (!strategy) {
            if (!annotation) {
              throw new Error('Cannot determinte default view strategy for object.', target);
            }
            strategy = new ConventionalViewStrategy(annotation.moduleId);
          } else if (annotation) {
            strategy.moduleId = annotation.moduleId;
          }
          return strategy;
        };
        _createClass(ViewStrategy, null, [{
          key: 'metadataKey',
          value: 'aurelia:view-strategy',
          enumerable: true
        }]);
        return ViewStrategy;
      })();
      _export('ViewStrategy', ViewStrategy);
      UseViewStrategy = (function(_ViewStrategy) {
        function UseViewStrategy(path) {
          _classCallCheck(this, UseViewStrategy);
          _ViewStrategy.call(this);
          this.path = path;
        }
        _inherits(UseViewStrategy, _ViewStrategy);
        UseViewStrategy.prototype.loadViewFactory = function loadViewFactory(viewEngine, options) {
          if (!this.absolutePath && this.moduleId) {
            this.absolutePath = relativeToFile(this.path, this.moduleId);
          }
          return viewEngine.loadViewFactory(this.absolutePath || this.path, options, this.moduleId);
        };
        UseViewStrategy.prototype.makeRelativeTo = function makeRelativeTo(file) {
          this.absolutePath = relativeToFile(this.path, file);
        };
        return UseViewStrategy;
      })(ViewStrategy);
      _export('UseViewStrategy', UseViewStrategy);
      ConventionalViewStrategy = (function(_ViewStrategy2) {
        function ConventionalViewStrategy(moduleId) {
          _classCallCheck(this, ConventionalViewStrategy);
          _ViewStrategy2.call(this);
          this.moduleId = moduleId;
          this.viewUrl = ConventionalViewStrategy.convertModuleIdToViewUrl(moduleId);
        }
        _inherits(ConventionalViewStrategy, _ViewStrategy2);
        ConventionalViewStrategy.prototype.loadViewFactory = function loadViewFactory(viewEngine, options) {
          return viewEngine.loadViewFactory(this.viewUrl, options, this.moduleId);
        };
        ConventionalViewStrategy.convertModuleIdToViewUrl = function convertModuleIdToViewUrl(moduleId) {
          return moduleId + '.html';
        };
        return ConventionalViewStrategy;
      })(ViewStrategy);
      _export('ConventionalViewStrategy', ConventionalViewStrategy);
      NoViewStrategy = (function(_ViewStrategy3) {
        function NoViewStrategy() {
          _classCallCheck(this, NoViewStrategy);
          if (_ViewStrategy3 != null) {
            _ViewStrategy3.apply(this, arguments);
          }
        }
        _inherits(NoViewStrategy, _ViewStrategy3);
        NoViewStrategy.prototype.loadViewFactory = function loadViewFactory() {
          return Promise.resolve(null);
        };
        return NoViewStrategy;
      })(ViewStrategy);
      _export('NoViewStrategy', NoViewStrategy);
      TemplateRegistryViewStrategy = (function(_ViewStrategy4) {
        function TemplateRegistryViewStrategy(moduleId, registryEntry) {
          _classCallCheck(this, TemplateRegistryViewStrategy);
          _ViewStrategy4.call(this);
          this.moduleId = moduleId;
          this.registryEntry = registryEntry;
        }
        _inherits(TemplateRegistryViewStrategy, _ViewStrategy4);
        TemplateRegistryViewStrategy.prototype.loadViewFactory = function loadViewFactory(viewEngine, options) {
          if (this.registryEntry.isReady) {
            return Promise.resolve(this.registryEntry.factory);
          }
          return viewEngine.loadViewFactory(this.registryEntry, options, this.moduleId);
        };
        return TemplateRegistryViewStrategy;
      })(ViewStrategy);
      _export('TemplateRegistryViewStrategy', TemplateRegistryViewStrategy);
    }
  };
});

System.register("github:aurelia/loader@0.7.0", ["github:aurelia/loader@0.7.0/index"], function($__export) {
  return {
    setters: [function(m) {
      for (var p in m)
        $__export(p, m[p]);
    }],
    execute: function() {}
  };
});

System.register("github:aurelia/templating@0.12.1/view-factory", ["github:aurelia/dependency-injection@0.8.1", "github:aurelia/templating@0.12.1/view", "github:aurelia/templating@0.12.1/view-slot", "github:aurelia/templating@0.12.1/content-selector", "github:aurelia/templating@0.12.1/resource-registry"], function(_export) {
  'use strict';
  var Container,
      View,
      ViewSlot,
      ContentSelector,
      ViewResources,
      BoundViewFactory,
      defaultFactoryOptions,
      ViewFactory;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }
  function elementContainerGet(key) {
    if (key === Element) {
      return this.element;
    }
    if (key === BoundViewFactory) {
      if (this.boundViewFactory) {
        return this.boundViewFactory;
      }
      var factory = this.instruction.viewFactory,
          partReplacements = this.partReplacements;
      if (partReplacements) {
        factory = partReplacements[factory.part] || factory;
      }
      factory.partReplacements = partReplacements;
      return this.boundViewFactory = new BoundViewFactory(this, factory, this.executionContext);
    }
    if (key === ViewSlot) {
      if (this.viewSlot === undefined) {
        this.viewSlot = new ViewSlot(this.element, this.instruction.anchorIsContainer, this.executionContext);
        this.children.push(this.viewSlot);
      }
      return this.viewSlot;
    }
    if (key === ViewResources) {
      return this.viewResources;
    }
    return this.superGet(key);
  }
  function createElementContainer(parent, element, instruction, executionContext, children, partReplacements, resources) {
    var container = parent.createChild(),
        providers,
        i;
    container.element = element;
    container.instruction = instruction;
    container.executionContext = executionContext;
    container.children = children;
    container.viewResources = resources;
    container.partReplacements = partReplacements;
    providers = instruction.providers;
    i = providers.length;
    while (i--) {
      container.registerSingleton(providers[i]);
    }
    container.superGet = container.get;
    container.get = elementContainerGet;
    return container;
  }
  function makeElementIntoAnchor(element, isCustomElement) {
    var anchor = document.createComment('anchor');
    if (isCustomElement) {
      anchor.attributes = element.attributes;
      anchor.hasAttribute = function(name) {
        return element.hasAttribute(name);
      };
      anchor.getAttribute = function(name) {
        return element.getAttribute(name);
      };
      anchor.setAttribute = function(name, value) {
        element.setAttribute(name, value);
      };
    }
    element.parentNode.replaceChild(anchor, element);
    return anchor;
  }
  function applyInstructions(containers, executionContext, element, instruction, behaviors, bindings, children, contentSelectors, partReplacements, resources) {
    var behaviorInstructions = instruction.behaviorInstructions,
        expressions = instruction.expressions,
        elementContainer,
        i,
        ii,
        current,
        instance;
    if (instruction.contentExpression) {
      bindings.push(instruction.contentExpression.createBinding(element.nextSibling));
      element.parentNode.removeChild(element);
      return ;
    }
    if (instruction.contentSelector) {
      var commentAnchor = document.createComment('anchor');
      element.parentNode.replaceChild(commentAnchor, element);
      contentSelectors.push(new ContentSelector(commentAnchor, instruction.selector));
      return ;
    }
    if (behaviorInstructions.length) {
      if (!instruction.anchorIsContainer) {
        element = makeElementIntoAnchor(element, instruction.isCustomElement);
      }
      containers[instruction.injectorId] = elementContainer = createElementContainer(containers[instruction.parentInjectorId], element, instruction, executionContext, children, partReplacements, resources);
      for (i = 0, ii = behaviorInstructions.length; i < ii; ++i) {
        current = behaviorInstructions[i];
        instance = current.type.create(elementContainer, current, element, bindings, current.partReplacements);
        if (instance.contentView) {
          children.push(instance.contentView);
        }
        behaviors.push(instance);
      }
    }
    for (i = 0, ii = expressions.length; i < ii; ++i) {
      bindings.push(expressions[i].createBinding(element));
    }
  }
  return {
    setters: [function(_aureliaDependencyInjection) {
      Container = _aureliaDependencyInjection.Container;
    }, function(_view) {
      View = _view.View;
    }, function(_viewSlot) {
      ViewSlot = _viewSlot.ViewSlot;
    }, function(_contentSelector) {
      ContentSelector = _contentSelector.ContentSelector;
    }, function(_resourceRegistry) {
      ViewResources = _resourceRegistry.ViewResources;
    }],
    execute: function() {
      BoundViewFactory = (function() {
        function BoundViewFactory(parentContainer, viewFactory, executionContext) {
          _classCallCheck(this, BoundViewFactory);
          this.parentContainer = parentContainer;
          this.viewFactory = viewFactory;
          this.executionContext = executionContext;
          this.factoryOptions = {behaviorInstance: false};
        }
        BoundViewFactory.prototype.create = function create(executionContext) {
          var childContainer = this.parentContainer.createChild(),
              context = executionContext || this.executionContext;
          this.factoryOptions.systemControlled = !executionContext;
          return this.viewFactory.create(childContainer, context, this.factoryOptions);
        };
        return BoundViewFactory;
      })();
      _export('BoundViewFactory', BoundViewFactory);
      defaultFactoryOptions = {
        systemControlled: false,
        suppressBind: false
      };
      ViewFactory = (function() {
        function ViewFactory(template, instructions, resources) {
          _classCallCheck(this, ViewFactory);
          this.template = template;
          this.instructions = instructions;
          this.resources = resources;
        }
        ViewFactory.prototype.create = function create(container, executionContext) {
          var options = arguments[2] === undefined ? defaultFactoryOptions : arguments[2];
          var fragment = this.template.cloneNode(true),
              instructables = fragment.querySelectorAll('.au-target'),
              instructions = this.instructions,
              resources = this.resources,
              behaviors = [],
              bindings = [],
              children = [],
              contentSelectors = [],
              containers = {root: container},
              partReplacements = options.partReplacements || this.partReplacements,
              i,
              ii,
              view;
          for (i = 0, ii = instructables.length; i < ii; ++i) {
            applyInstructions(containers, executionContext, instructables[i], instructions[i], behaviors, bindings, children, contentSelectors, partReplacements, resources);
          }
          view = new View(fragment, behaviors, bindings, children, options.systemControlled, contentSelectors);
          view.created(executionContext);
          if (!options.suppressBind) {
            view.bind(executionContext);
          }
          return view;
        };
        return ViewFactory;
      })();
      _export('ViewFactory', ViewFactory);
    }
  };
});

System.register("npm:core-js@0.9.16/modules/es5", ["npm:core-js@0.9.16/modules/$", "npm:core-js@0.9.16/modules/$.dom-create", "npm:core-js@0.9.16/modules/$.cof", "npm:core-js@0.9.16/modules/$.def", "npm:core-js@0.9.16/modules/$.invoke", "npm:core-js@0.9.16/modules/$.array-methods", "npm:core-js@0.9.16/modules/$.uid", "npm:core-js@0.9.16/modules/$.assert", "npm:core-js@0.9.16/modules/$.array-includes", "npm:core-js@0.9.16/modules/$.replacer", "npm:core-js@0.9.16/modules/$.throws"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@0.9.16/modules/$"),
      cel = require("npm:core-js@0.9.16/modules/$.dom-create"),
      cof = require("npm:core-js@0.9.16/modules/$.cof"),
      $def = require("npm:core-js@0.9.16/modules/$.def"),
      invoke = require("npm:core-js@0.9.16/modules/$.invoke"),
      arrayMethod = require("npm:core-js@0.9.16/modules/$.array-methods"),
      IE_PROTO = require("npm:core-js@0.9.16/modules/$.uid").safe('__proto__'),
      assert = require("npm:core-js@0.9.16/modules/$.assert"),
      assertObject = assert.obj,
      ObjectProto = Object.prototype,
      html = $.html,
      A = [],
      _slice = A.slice,
      _join = A.join,
      classof = cof.classof,
      has = $.has,
      defineProperty = $.setDesc,
      getOwnDescriptor = $.getDesc,
      defineProperties = $.setDescs,
      isFunction = $.isFunction,
      isObject = $.isObject,
      toObject = $.toObject,
      toLength = $.toLength,
      toIndex = $.toIndex,
      IE8_DOM_DEFINE = false,
      $indexOf = require("npm:core-js@0.9.16/modules/$.array-includes")(false),
      $forEach = arrayMethod(0),
      $map = arrayMethod(1),
      $filter = arrayMethod(2),
      $some = arrayMethod(3),
      $every = arrayMethod(4);
  if (!$.DESC) {
    try {
      IE8_DOM_DEFINE = defineProperty(cel('div'), 'x', {get: function() {
          return 8;
        }}).x == 8;
    } catch (e) {}
    $.setDesc = function(O, P, Attributes) {
      if (IE8_DOM_DEFINE)
        try {
          return defineProperty(O, P, Attributes);
        } catch (e) {}
      if ('get' in Attributes || 'set' in Attributes)
        throw TypeError('Accessors not supported!');
      if ('value' in Attributes)
        assertObject(O)[P] = Attributes.value;
      return O;
    };
    $.getDesc = function(O, P) {
      if (IE8_DOM_DEFINE)
        try {
          return getOwnDescriptor(O, P);
        } catch (e) {}
      if (has(O, P))
        return $.desc(!ObjectProto.propertyIsEnumerable.call(O, P), O[P]);
    };
    $.setDescs = defineProperties = function(O, Properties) {
      assertObject(O);
      var keys = $.getKeys(Properties),
          length = keys.length,
          i = 0,
          P;
      while (length > i)
        $.setDesc(O, P = keys[i++], Properties[P]);
      return O;
    };
  }
  $def($def.S + $def.F * !$.DESC, 'Object', {
    getOwnPropertyDescriptor: $.getDesc,
    defineProperty: $.setDesc,
    defineProperties: defineProperties
  });
  var keys1 = ('constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,' + 'toLocaleString,toString,valueOf').split(','),
      keys2 = keys1.concat('length', 'prototype'),
      keysLen1 = keys1.length;
  var createDict = function() {
    var iframe = cel('iframe'),
        i = keysLen1,
        gt = '>',
        iframeDocument;
    iframe.style.display = 'none';
    html.appendChild(iframe);
    iframe.src = 'javascript:';
    iframeDocument = iframe.contentWindow.document;
    iframeDocument.open();
    iframeDocument.write('<script>document.F=Object</script' + gt);
    iframeDocument.close();
    createDict = iframeDocument.F;
    while (i--)
      delete createDict.prototype[keys1[i]];
    return createDict();
  };
  function createGetKeys(names, length) {
    return function(object) {
      var O = toObject(object),
          i = 0,
          result = [],
          key;
      for (key in O)
        if (key != IE_PROTO)
          has(O, key) && result.push(key);
      while (length > i)
        if (has(O, key = names[i++])) {
          ~$indexOf(result, key) || result.push(key);
        }
      return result;
    };
  }
  function Empty() {}
  $def($def.S, 'Object', {
    getPrototypeOf: $.getProto = $.getProto || function(O) {
      O = Object(assert.def(O));
      if (has(O, IE_PROTO))
        return O[IE_PROTO];
      if (isFunction(O.constructor) && O instanceof O.constructor) {
        return O.constructor.prototype;
      }
      return O instanceof Object ? ObjectProto : null;
    },
    getOwnPropertyNames: $.getNames = $.getNames || createGetKeys(keys2, keys2.length, true),
    create: $.create = $.create || function(O, Properties) {
      var result;
      if (O !== null) {
        Empty.prototype = assertObject(O);
        result = new Empty();
        Empty.prototype = null;
        result[IE_PROTO] = O;
      } else
        result = createDict();
      return Properties === undefined ? result : defineProperties(result, Properties);
    },
    keys: $.getKeys = $.getKeys || createGetKeys(keys1, keysLen1, false),
    seal: function seal(it) {
      return it;
    },
    freeze: function freeze(it) {
      return it;
    },
    preventExtensions: function preventExtensions(it) {
      return it;
    },
    isSealed: function isSealed(it) {
      return !isObject(it);
    },
    isFrozen: function isFrozen(it) {
      return !isObject(it);
    },
    isExtensible: function isExtensible(it) {
      return isObject(it);
    }
  });
  $def($def.P, 'Function', {bind: function(that) {
      var fn = assert.fn(this),
          partArgs = _slice.call(arguments, 1);
      function bound() {
        var args = partArgs.concat(_slice.call(arguments)),
            constr = this instanceof bound,
            ctx = constr ? $.create(fn.prototype) : that,
            result = invoke(fn, args, ctx);
        return constr ? ctx : result;
      }
      if (fn.prototype)
        bound.prototype = fn.prototype;
      return bound;
    }});
  if (!(0 in Object('z') && 'z'[0] == 'z')) {
    $.ES5Object = function(it) {
      return cof(it) == 'String' ? it.split('') : Object(it);
    };
  }
  var buggySlice = true;
  try {
    if (html)
      _slice.call(html);
    buggySlice = false;
  } catch (e) {}
  $def($def.P + $def.F * buggySlice, 'Array', {slice: function slice(begin, end) {
      var len = toLength(this.length),
          klass = cof(this);
      end = end === undefined ? len : end;
      if (klass == 'Array')
        return _slice.call(this, begin, end);
      var start = toIndex(begin, len),
          upTo = toIndex(end, len),
          size = toLength(upTo - start),
          cloned = Array(size),
          i = 0;
      for (; i < size; i++)
        cloned[i] = klass == 'String' ? this.charAt(start + i) : this[start + i];
      return cloned;
    }});
  $def($def.P + $def.F * ($.ES5Object != Object), 'Array', {join: function join() {
      return _join.apply($.ES5Object(this), arguments);
    }});
  $def($def.S, 'Array', {isArray: function(arg) {
      return cof(arg) == 'Array';
    }});
  function createArrayReduce(isRight) {
    return function(callbackfn, memo) {
      assert.fn(callbackfn);
      var O = toObject(this),
          length = toLength(O.length),
          index = isRight ? length - 1 : 0,
          i = isRight ? -1 : 1;
      if (arguments.length < 2)
        for (; ; ) {
          if (index in O) {
            memo = O[index];
            index += i;
            break;
          }
          index += i;
          assert(isRight ? index >= 0 : length > index, 'Reduce of empty array with no initial value');
        }
      for (; isRight ? index >= 0 : length > index; index += i)
        if (index in O) {
          memo = callbackfn(memo, O[index], index, this);
        }
      return memo;
    };
  }
  $def($def.P, 'Array', {
    forEach: $.each = $.each || function forEach(callbackfn) {
      return $forEach(this, callbackfn, arguments[1]);
    },
    map: function map(callbackfn) {
      return $map(this, callbackfn, arguments[1]);
    },
    filter: function filter(callbackfn) {
      return $filter(this, callbackfn, arguments[1]);
    },
    some: function some(callbackfn) {
      return $some(this, callbackfn, arguments[1]);
    },
    every: function every(callbackfn) {
      return $every(this, callbackfn, arguments[1]);
    },
    reduce: createArrayReduce(false),
    reduceRight: createArrayReduce(true),
    indexOf: function indexOf(el) {
      return $indexOf(this, el, arguments[1]);
    },
    lastIndexOf: function(el, fromIndex) {
      var O = toObject(this),
          length = toLength(O.length),
          index = length - 1;
      if (arguments.length > 1)
        index = Math.min(index, $.toInteger(fromIndex));
      if (index < 0)
        index = toLength(length + index);
      for (; index >= 0; index--)
        if (index in O)
          if (O[index] === el)
            return index;
      return -1;
    }
  });
  $def($def.P, 'String', {trim: require("npm:core-js@0.9.16/modules/$.replacer")(/^\s*([\s\S]*\S)?\s*$/, '$1')});
  $def($def.S, 'Date', {now: function() {
      return +new Date;
    }});
  function lz(num) {
    return num > 9 ? num : '0' + num;
  }
  var date = new Date(-5e13 - 1),
      brokenDate = !(date.toISOString && date.toISOString() == '0385-07-25T07:06:39.999Z' && require("npm:core-js@0.9.16/modules/$.throws")(function() {
        new Date(NaN).toISOString();
      }));
  $def($def.P + $def.F * brokenDate, 'Date', {toISOString: function() {
      if (!isFinite(this))
        throw RangeError('Invalid time value');
      var d = this,
          y = d.getUTCFullYear(),
          m = d.getUTCMilliseconds(),
          s = y < 0 ? '-' : y > 9999 ? '+' : '';
      return s + ('00000' + Math.abs(y)).slice(s ? -6 : -4) + '-' + lz(d.getUTCMonth() + 1) + '-' + lz(d.getUTCDate()) + 'T' + lz(d.getUTCHours()) + ':' + lz(d.getUTCMinutes()) + ':' + lz(d.getUTCSeconds()) + '.' + (m > 99 ? m : '0' + lz(m)) + 'Z';
    }});
  if (classof(function() {
    return arguments;
  }()) == 'Object')
    cof.classof = function(it) {
      var tag = classof(it);
      return tag == 'Object' && isFunction(it.callee) ? 'Arguments' : tag;
    };
  global.define = __define;
  return module.exports;
});

System.register("github:jspm/nodelibs-process@0.1.1", ["github:jspm/nodelibs-process@0.1.1/index"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = require("github:jspm/nodelibs-process@0.1.1/index");
  global.define = __define;
  return module.exports;
});

System.register("github:aurelia/dependency-injection@0.8.1/index", ["github:aurelia/metadata@0.6.0", "github:aurelia/dependency-injection@0.8.1/metadata", "github:aurelia/dependency-injection@0.8.1/container"], function(_export) {
  'use strict';
  var Decorators,
      Metadata,
      TransientRegistration,
      SingletonRegistration,
      FactoryActivator,
      emptyParameters;
  _export('autoinject', autoinject);
  _export('inject', inject);
  _export('registration', registration);
  _export('transient', transient);
  _export('singleton', singleton);
  _export('instanceActivator', instanceActivator);
  _export('factory', factory);
  function autoinject(target) {
    var deco = function deco(target) {
      target.inject = Reflect.getOwnMetadata(Metadata.paramTypes, target) || emptyParameters;
    };
    return target ? deco(target) : deco;
  }
  function inject() {
    for (var _len = arguments.length,
        rest = Array(_len),
        _key = 0; _key < _len; _key++) {
      rest[_key] = arguments[_key];
    }
    return function(target) {
      target.inject = rest;
    };
  }
  function registration(value) {
    return function(target) {
      Reflect.defineMetadata(Metadata.registration, value, target);
    };
  }
  function transient(key) {
    return registration(new TransientRegistration(key));
  }
  function singleton(keyOrRegisterInChild) {
    var registerInChild = arguments[1] === undefined ? false : arguments[1];
    return registration(new SingletonRegistration(keyOrRegisterInChild, registerInChild));
  }
  function instanceActivator(value) {
    return function(target) {
      Reflect.defineMetadata(Metadata.instanceActivator, value, target);
    };
  }
  function factory() {
    return instanceActivator(FactoryActivator.instance);
  }
  return {
    setters: [function(_aureliaMetadata) {
      Decorators = _aureliaMetadata.Decorators;
      Metadata = _aureliaMetadata.Metadata;
    }, function(_metadata) {
      TransientRegistration = _metadata.TransientRegistration;
      SingletonRegistration = _metadata.SingletonRegistration;
      FactoryActivator = _metadata.FactoryActivator;
      _export('TransientRegistration', _metadata.TransientRegistration);
      _export('SingletonRegistration', _metadata.SingletonRegistration);
      _export('Resolver', _metadata.Resolver);
      _export('Lazy', _metadata.Lazy);
      _export('All', _metadata.All);
      _export('Optional', _metadata.Optional);
      _export('Parent', _metadata.Parent);
      _export('ClassActivator', _metadata.ClassActivator);
      _export('FactoryActivator', _metadata.FactoryActivator);
    }, function(_container) {
      emptyParameters = _container.emptyParameters;
      _export('Container', _container.Container);
    }],
    execute: function() {
      Decorators.configure.simpleDecorator('autoinject', autoinject);
      Decorators.configure.parameterizedDecorator('inject', inject);
      Decorators.configure.parameterizedDecorator('registration', registration);
      Decorators.configure.parameterizedDecorator('transient', transient);
      Decorators.configure.parameterizedDecorator('singleton', singleton);
      Decorators.configure.parameterizedDecorator('instanceActivator', instanceActivator);
      Decorators.configure.parameterizedDecorator('factory', factory);
    }
  };
});

System.register("github:aurelia/validation@0.2.5/validation/validation-group", ["github:aurelia/validation@0.2.5/validation/validation-group-builder", "github:aurelia/validation@0.2.5/validation/validation-result", "github:aurelia/validation@0.2.5/validation/validation-locale"], function(_export) {
  var ValidationGroupBuilder,
      ValidationResult,
      ValidationLocale,
      _classCallCheck,
      ValidationGroup;
  return {
    setters: [function(_validationValidationGroupBuilder) {
      ValidationGroupBuilder = _validationValidationGroupBuilder.ValidationGroupBuilder;
    }, function(_validationValidationResult) {
      ValidationResult = _validationValidationResult.ValidationResult;
    }, function(_validationValidationLocale) {
      ValidationLocale = _validationValidationLocale.ValidationLocale;
    }],
    execute: function() {
      'use strict';
      _classCallCheck = function(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError('Cannot call a class as a function');
        }
      };
      ValidationGroup = (function() {
        function ValidationGroup(subject, observerLocator, config) {
          var _this = this;
          _classCallCheck(this, ValidationGroup);
          this.result = new ValidationResult();
          this.subject = subject;
          this.validationProperties = [];
          this.config = config;
          this.builder = new ValidationGroupBuilder(observerLocator, this);
          this.onValidateCallbacks = [];
          this.onPropertyValidationCallbacks = [];
          this.isValidating = false;
          this.onDestroy = config.onLocaleChanged(function() {
            _this.validate(false, true);
          });
          if (this.subject.__proto__._validationMetadata) {
            this.subject.__proto__._validationMetadata.setup(this);
          }
        }
        ValidationGroup.prototype.destroy = function destroy() {
          this.onDestroy();
        };
        ValidationGroup.prototype.clear = function clear() {
          this.validationProperties.forEach(function(prop) {
            prop.clear();
          });
          this.result.clear();
        };
        ValidationGroup.prototype.onBreezeEntity = function onBreezeEntity() {
          var _this2 = this;
          var breezeEntity = this.subject;
          var me = this;
          this.onPropertyValidate(function(propertyBindingPath) {
            _this2.passes(function() {
              breezeEntity.entityAspect.validateProperty(propertyBindingPath);
              var errors = breezeEntity.entityAspect.getValidationErrors(propertyBindingPath);
              if (errors.length === 0)
                return true;
              else
                return errors[0].errorMessage;
            });
          });
          this.onValidate(function() {
            breezeEntity.entityAspect.validateEntity();
            return {};
          });
          breezeEntity.entityAspect.validationErrorsChanged.subscribe(function() {
            breezeEntity.entityAspect.getValidationErrors().forEach(function(validationError) {
              var propertyName = validationError.propertyName;
              if (!me.result.properties[propertyName]) {
                me.ensure(propertyName);
              }
              var currentResultProp = me.result.addProperty(propertyName);
              if (currentResultProp.isValid) {
                currentResultProp.setValidity({
                  isValid: false,
                  message: validationError.errorMessage,
                  failingRule: 'breeze',
                  latestValue: currentResultProp.latestValue
                }, true);
              }
            });
          });
        };
        ValidationGroup.prototype.validate = function validate() {
          var _this3 = this;
          var forceDirty = arguments[0] === undefined ? true : arguments[0];
          var forceExecution = arguments[1] === undefined ? true : arguments[1];
          this.isValidating = true;
          var promise = Promise.resolve(true);
          var _loop = function(i) {
            var validatorProperty = _this3.validationProperties[i];
            promise = promise.then(function() {
              return validatorProperty.validateCurrentValue(forceDirty, forceExecution);
            });
          };
          for (var i = this.validationProperties.length - 1; i >= 0; i--) {
            _loop(i);
          }
          promise = promise['catch'](function() {
            console.log('Should never get here: a validation property should always resolve to true/false!');
            debugger;
            throw Error('Should never get here: a validation property should always resolve to true/false!');
          });
          this.onValidateCallbacks.forEach(function(onValidateCallback) {
            promise = promise.then(function() {
              return _this3.config.locale();
            }).then(function(locale) {
              return Promise.resolve(onValidateCallback.validationFunction()).then(function(callbackResult) {
                for (var prop in callbackResult) {
                  if (!_this3.result.properties[prop]) {
                    _this3.ensure(prop);
                  }
                  var resultProp = _this3.result.addProperty(prop);
                  var result = callbackResult[prop];
                  var newPropResult = {latestValue: resultProp.latestValue};
                  if (result === true || result === null || result === '') {
                    if (!resultProp.isValid && resultProp.failingRule === 'onValidateCallback') {
                      newPropResult.failingRule = null;
                      newPropResult.message = '';
                      newPropResult.isValid = true;
                      resultProp.setValidity(newPropResult, true);
                    }
                  } else {
                    if (resultProp.isValid) {
                      newPropResult.failingRule = 'onValidateCallback';
                      newPropResult.isValid = false;
                      if (typeof result === 'string') {
                        newPropResult.message = result;
                      } else {
                        newPropResult.message = locale.translate(newPropResult.failingRule);
                      }
                      resultProp.setValidity(newPropResult, true);
                    }
                  }
                }
                _this3.result.checkValidity();
              }, function(a, b, c, d, e) {
                debugger;
                _this3.result.isValid = false;
                if (onValidateCallback.validationFunctionFailedCallback) {
                  onValidateCallback.validationFunctionFailedCallback(a, b, c, d, e);
                }
              });
            });
          });
          promise = promise.then(function() {
            _this3.isValidating = false;
            if (_this3.result.isValid) {
              return Promise.resolve(_this3.result);
            } else {
              return Promise.reject(_this3.result);
            }
          });
          return promise;
        };
        ValidationGroup.prototype.onValidate = function onValidate(validationFunction, validationFunctionFailedCallback) {
          this.onValidateCallbacks.push({
            validationFunction: validationFunction,
            validationFunctionFailedCallback: validationFunctionFailedCallback
          });
          return this;
        };
        ValidationGroup.prototype.onPropertyValidate = function onPropertyValidate(validationFunction) {
          this.onPropertyValidationCallbacks.push(validationFunction);
          return this;
        };
        ValidationGroup.prototype.ensure = function ensure(bindingPath, configCallback) {
          this.builder.ensure(bindingPath, configCallback);
          this.onPropertyValidationCallbacks.forEach(function(callback) {
            callback(bindingPath);
          });
          return this;
        };
        ValidationGroup.prototype.isNotEmpty = function isNotEmpty() {
          return this.builder.isNotEmpty();
        };
        ValidationGroup.prototype.isGreaterThanOrEqualTo = function isGreaterThanOrEqualTo(minimumValue) {
          return this.builder.isGreaterThanOrEqualTo(minimumValue);
        };
        ValidationGroup.prototype.isGreaterThan = function isGreaterThan(minimumValue) {
          return this.builder.isGreaterThan(minimumValue);
        };
        ValidationGroup.prototype.isBetween = function isBetween(minimumValue, maximumValue) {
          return this.builder.isBetween(minimumValue, maximumValue);
        };
        ValidationGroup.prototype.isLessThanOrEqualTo = function isLessThanOrEqualTo(maximumValue) {
          return this.builder.isLessThanOrEqualTo(maximumValue);
        };
        ValidationGroup.prototype.isLessThan = function isLessThan(maximumValue) {
          return this.builder.isLessThan(maximumValue);
        };
        ValidationGroup.prototype.isEqualTo = function isEqualTo(otherValue, otherValueLabel) {
          return this.builder.isEqualTo(otherValue, otherValueLabel);
        };
        ValidationGroup.prototype.isNotEqualTo = function isNotEqualTo(otherValue, otherValueLabel) {
          return this.builder.isNotEqualTo(otherValue, otherValueLabel);
        };
        ValidationGroup.prototype.isEmail = function isEmail() {
          return this.builder.isEmail();
        };
        ValidationGroup.prototype.isURL = function isURL() {
          return this.builder.isURL();
        };
        ValidationGroup.prototype.isIn = function isIn(collection) {
          return this.builder.isIn(collection);
        };
        ValidationGroup.prototype.hasMinLength = function hasMinLength(minimumValue) {
          return this.builder.hasMinLength(minimumValue);
        };
        ValidationGroup.prototype.hasMaxLength = function hasMaxLength(maximumValue) {
          return this.builder.hasMaxLength(maximumValue);
        };
        ValidationGroup.prototype.hasLengthBetween = function hasLengthBetween(minimumValue, maximumValue) {
          return this.builder.hasLengthBetween(minimumValue, maximumValue);
        };
        ValidationGroup.prototype.isNumber = function isNumber() {
          return this.builder.isNumber();
        };
        ValidationGroup.prototype.containsNoSpaces = function containsNoSpaces() {
          return this.builder.containsNoSpaces();
        };
        ValidationGroup.prototype.containsOnlyDigits = function containsOnlyDigits() {
          return this.builder.containsOnlyDigits();
        };
        ValidationGroup.prototype.containsOnly = function containsOnly(regex) {
          return this.builder.containsOnly(regex);
        };
        ValidationGroup.prototype.containsOnlyAlpha = function containsOnlyAlpha() {
          return this.builder.containsOnlyAlpha();
        };
        ValidationGroup.prototype.containsOnlyAlphaOrWhitespace = function containsOnlyAlphaOrWhitespace() {
          return this.builder.containsOnlyAlphaOrWhitespace();
        };
        ValidationGroup.prototype.containsOnlyLetters = function containsOnlyLetters() {
          return this.builder.containsOnlyAlpha();
        };
        ValidationGroup.prototype.containsOnlyLettersOrWhitespace = function containsOnlyLettersOrWhitespace() {
          return this.builder.containsOnlyAlphaOrWhitespace();
        };
        ValidationGroup.prototype.containsOnlyAlphanumerics = function containsOnlyAlphanumerics() {
          return this.builder.containsOnlyAlphanumerics();
        };
        ValidationGroup.prototype.containsOnlyAlphanumericsOrWhitespace = function containsOnlyAlphanumericsOrWhitespace() {
          return this.builder.containsOnlyAlphanumericsOrWhitespace();
        };
        ValidationGroup.prototype.isStrongPassword = function isStrongPassword(minimumComplexityLevel) {
          return this.builder.isStrongPassword(minimumComplexityLevel);
        };
        ValidationGroup.prototype.matches = function matches(regex) {
          return this.builder.matches(regex);
        };
        ValidationGroup.prototype.passes = function passes(customFunction, threshold) {
          return this.builder.passes(customFunction, threshold);
        };
        ValidationGroup.prototype.passesRule = function passesRule(validationRule) {
          return this.builder.passesRule(validationRule);
        };
        ValidationGroup.prototype['if'] = function _if(conditionExpression, threshold) {
          return this.builder['if'](conditionExpression, threshold);
        };
        ValidationGroup.prototype['else'] = function _else() {
          return this.builder['else']();
        };
        ValidationGroup.prototype.endIf = function endIf() {
          return this.builder.endIf();
        };
        ValidationGroup.prototype['switch'] = function _switch(conditionExpression) {
          return this.builder['switch'](conditionExpression);
        };
        ValidationGroup.prototype['case'] = function _case(caseLabel) {
          return this.builder['case'](caseLabel);
        };
        ValidationGroup.prototype['default'] = function _default() {
          return this.builder['default']();
        };
        ValidationGroup.prototype.endSwitch = function endSwitch() {
          return this.builder.endSwitch();
        };
        ValidationGroup.prototype.withMessage = function withMessage(message) {
          return this.builder.withMessage(message);
        };
        return ValidationGroup;
      })();
      _export('ValidationGroup', ValidationGroup);
    }
  };
});

System.register("github:aurelia/templating@0.12.1/view-compiler", ["github:aurelia/templating@0.12.1/resource-registry", "github:aurelia/templating@0.12.1/view-factory", "github:aurelia/templating@0.12.1/binding-language"], function(_export) {
  'use strict';
  var ResourceRegistry,
      ViewFactory,
      BindingLanguage,
      nextInjectorId,
      defaultCompileOptions,
      hasShadowDOM,
      needsTemplateFixup,
      ViewCompiler;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }
  function getNextInjectorId() {
    return ++nextInjectorId;
  }
  function configureProperties(instruction, resources) {
    var type = instruction.type,
        attrName = instruction.attrName,
        attributes = instruction.attributes,
        property,
        key,
        value;
    var knownAttribute = resources.mapAttribute(attrName);
    if (knownAttribute && attrName in attributes && knownAttribute !== attrName) {
      attributes[knownAttribute] = attributes[attrName];
      delete attributes[attrName];
    }
    for (key in attributes) {
      value = attributes[key];
      if (typeof value !== 'string') {
        property = type.attributes[key];
        if (property !== undefined) {
          value.targetProperty = property.name;
        } else {
          value.targetProperty = key;
        }
      }
    }
  }
  function makeIntoInstructionTarget(element) {
    var value = element.getAttribute('class');
    element.setAttribute('class', value ? value += ' au-target' : 'au-target');
  }
  return {
    setters: [function(_resourceRegistry) {
      ResourceRegistry = _resourceRegistry.ResourceRegistry;
    }, function(_viewFactory) {
      ViewFactory = _viewFactory.ViewFactory;
    }, function(_bindingLanguage) {
      BindingLanguage = _bindingLanguage.BindingLanguage;
    }],
    execute: function() {
      nextInjectorId = 0;
      defaultCompileOptions = {targetShadowDOM: false};
      hasShadowDOM = !!HTMLElement.prototype.createShadowRoot;
      needsTemplateFixup = !('content' in document.createElement('template'));
      ViewCompiler = (function() {
        function ViewCompiler(bindingLanguage) {
          _classCallCheck(this, ViewCompiler);
          this.bindingLanguage = bindingLanguage;
        }
        ViewCompiler.inject = function inject() {
          return [BindingLanguage];
        };
        ViewCompiler.prototype.compile = function compile(templateOrFragment, resources) {
          var options = arguments[2] === undefined ? defaultCompileOptions : arguments[2];
          var instructions = [],
              targetShadowDOM = options.targetShadowDOM,
              content,
              part,
              factory,
              temp;
          targetShadowDOM = targetShadowDOM && hasShadowDOM;
          if (options.beforeCompile) {
            options.beforeCompile(templateOrFragment);
          }
          if (typeof templateOrFragment === 'string') {
            temp = document.createElement('template');
            temp.innerHTML = templateOrFragment;
            if (needsTemplateFixup) {
              temp.content = document.createDocumentFragment();
              while (temp.firstChild) {
                temp.content.appendChild(temp.firstChild);
              }
            }
            templateOrFragment = temp;
          }
          if (templateOrFragment.content) {
            part = templateOrFragment.getAttribute('part');
            content = document.adoptNode(templateOrFragment.content, true);
          } else {
            content = templateOrFragment;
          }
          this.compileNode(content, resources, instructions, templateOrFragment, 'root', !targetShadowDOM);
          content.insertBefore(document.createComment('<view>'), content.firstChild);
          content.appendChild(document.createComment('</view>'));
          var factory = new ViewFactory(content, instructions, resources);
          if (part) {
            factory.part = part;
          }
          return factory;
        };
        ViewCompiler.prototype.compileNode = function compileNode(node, resources, instructions, parentNode, parentInjectorId, targetLightDOM) {
          switch (node.nodeType) {
            case 1:
              return this.compileElement(node, resources, instructions, parentNode, parentInjectorId, targetLightDOM);
            case 3:
              var expression = this.bindingLanguage.parseText(resources, node.textContent);
              if (expression) {
                var marker = document.createElement('au-marker');
                marker.className = 'au-target';
                (node.parentNode || parentNode).insertBefore(marker, node);
                node.textContent = ' ';
                instructions.push({contentExpression: expression});
              }
              return node.nextSibling;
            case 11:
              var currentChild = node.firstChild;
              while (currentChild) {
                currentChild = this.compileNode(currentChild, resources, instructions, node, parentInjectorId, targetLightDOM);
              }
              break;
          }
          return node.nextSibling;
        };
        ViewCompiler.prototype.compileElement = function compileElement(node, resources, instructions, parentNode, parentInjectorId, targetLightDOM) {
          var tagName = node.tagName.toLowerCase(),
              attributes = node.attributes,
              expressions = [],
              behaviorInstructions = [],
              providers = [],
              bindingLanguage = this.bindingLanguage,
              liftingInstruction,
              viewFactory,
              type,
              elementInstruction,
              elementProperty,
              i,
              ii,
              attr,
              attrName,
              attrValue,
              instruction,
              info,
              property,
              knownAttribute;
          if (tagName === 'content') {
            if (targetLightDOM) {
              instructions.push({
                parentInjectorId: parentInjectorId,
                contentSelector: true,
                selector: node.getAttribute('select'),
                suppressBind: true
              });
              makeIntoInstructionTarget(node);
            }
            return node.nextSibling;
          } else if (tagName === 'template') {
            viewFactory = this.compile(node, resources);
            viewFactory.part = node.getAttribute('part');
          } else {
            type = resources.getElement(tagName);
            if (type) {
              elementInstruction = {
                type: type,
                attributes: {}
              };
              elementInstruction.anchorIsContainer = !node.hasAttribute('containerless') && !type.containerless;
              behaviorInstructions.push(elementInstruction);
            }
          }
          for (i = 0, ii = attributes.length; i < ii; ++i) {
            attr = attributes[i];
            attrName = attr.name;
            attrValue = attr.value;
            info = bindingLanguage.inspectAttribute(resources, attrName, attrValue);
            type = resources.getAttribute(info.attrName);
            elementProperty = null;
            if (type) {
              knownAttribute = resources.mapAttribute(info.attrName);
              if (knownAttribute) {
                property = type.attributes[knownAttribute];
                if (property) {
                  info.defaultBindingMode = property.defaultBindingMode;
                  if (!info.command && !info.expression) {
                    info.command = property.hasOptions ? 'options' : null;
                  }
                }
              }
            } else if (elementInstruction) {
              elementProperty = elementInstruction.type.attributes[info.attrName];
              if (elementProperty) {
                info.defaultBindingMode = elementProperty.defaultBindingMode;
                if (!info.command && !info.expression) {
                  info.command = elementProperty.hasOptions ? 'options' : null;
                }
              }
            }
            if (elementProperty) {
              instruction = bindingLanguage.createAttributeInstruction(resources, node, info, elementInstruction);
            } else {
              instruction = bindingLanguage.createAttributeInstruction(resources, node, info);
            }
            if (instruction) {
              if (instruction.alteredAttr) {
                type = resources.getAttribute(instruction.attrName);
              }
              if (instruction.discrete) {
                expressions.push(instruction);
              } else {
                if (type) {
                  instruction.type = type;
                  configureProperties(instruction, resources);
                  if (type.liftsContent) {
                    instruction.originalAttrName = attrName;
                    liftingInstruction = instruction;
                    break;
                  } else {
                    behaviorInstructions.push(instruction);
                  }
                } else if (elementProperty) {
                  elementInstruction.attributes[info.attrName].targetProperty = elementProperty.name;
                } else {
                  expressions.push(instruction.attributes[instruction.attrName]);
                }
              }
            } else {
              if (type) {
                instruction = {
                  attrName: attrName,
                  type: type,
                  attributes: {}
                };
                instruction.attributes[resources.mapAttribute(attrName)] = attrValue;
                if (type.liftsContent) {
                  instruction.originalAttrName = attrName;
                  liftingInstruction = instruction;
                  break;
                } else {
                  behaviorInstructions.push(instruction);
                }
              } else if (elementProperty) {
                elementInstruction.attributes[attrName] = attrValue;
              }
            }
          }
          if (liftingInstruction) {
            liftingInstruction.viewFactory = viewFactory;
            node = liftingInstruction.type.compile(this, resources, node, liftingInstruction, parentNode);
            makeIntoInstructionTarget(node);
            instructions.push({
              anchorIsContainer: false,
              parentInjectorId: parentInjectorId,
              expressions: [],
              behaviorInstructions: [liftingInstruction],
              viewFactory: liftingInstruction.viewFactory,
              providers: [liftingInstruction.type.target]
            });
          } else {
            for (i = 0, ii = behaviorInstructions.length; i < ii; ++i) {
              instruction = behaviorInstructions[i];
              instruction.type.compile(this, resources, node, instruction, parentNode);
              providers.push(instruction.type.target);
            }
            var injectorId = behaviorInstructions.length ? getNextInjectorId() : false;
            if (expressions.length || behaviorInstructions.length) {
              makeIntoInstructionTarget(node);
              instructions.push({
                anchorIsContainer: elementInstruction ? elementInstruction.anchorIsContainer : true,
                isCustomElement: !!elementInstruction,
                injectorId: injectorId,
                parentInjectorId: parentInjectorId,
                expressions: expressions,
                behaviorInstructions: behaviorInstructions,
                providers: providers
              });
            }
            if (elementInstruction && elementInstruction.type.skipContentProcessing) {
              return node.nextSibling;
            }
            var currentChild = node.firstChild;
            while (currentChild) {
              currentChild = this.compileNode(currentChild, resources, instructions, node, injectorId || parentInjectorId, targetLightDOM);
            }
          }
          return node.nextSibling;
        };
        return ViewCompiler;
      })();
      _export('ViewCompiler', ViewCompiler);
    }
  };
});

System.register("npm:core-js@0.9.16/modules/$.task", ["npm:core-js@0.9.16/modules/$", "npm:core-js@0.9.16/modules/$.ctx", "npm:core-js@0.9.16/modules/$.cof", "npm:core-js@0.9.16/modules/$.invoke", "npm:core-js@0.9.16/modules/$.dom-create", "github:jspm/nodelibs-process@0.1.1"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    'use strict';
    var $ = require("npm:core-js@0.9.16/modules/$"),
        ctx = require("npm:core-js@0.9.16/modules/$.ctx"),
        cof = require("npm:core-js@0.9.16/modules/$.cof"),
        invoke = require("npm:core-js@0.9.16/modules/$.invoke"),
        cel = require("npm:core-js@0.9.16/modules/$.dom-create"),
        global = $.g,
        isFunction = $.isFunction,
        html = $.html,
        process = global.process,
        setTask = global.setImmediate,
        clearTask = global.clearImmediate,
        postMessage = global.postMessage,
        addEventListener = global.addEventListener,
        MessageChannel = global.MessageChannel,
        counter = 0,
        queue = {},
        ONREADYSTATECHANGE = 'onreadystatechange',
        defer,
        channel,
        port;
    function run() {
      var id = +this;
      if ($.has(queue, id)) {
        var fn = queue[id];
        delete queue[id];
        fn();
      }
    }
    function listner(event) {
      run.call(event.data);
    }
    if (!isFunction(setTask) || !isFunction(clearTask)) {
      setTask = function(fn) {
        var args = [],
            i = 1;
        while (arguments.length > i)
          args.push(arguments[i++]);
        queue[++counter] = function() {
          invoke(isFunction(fn) ? fn : Function(fn), args);
        };
        defer(counter);
        return counter;
      };
      clearTask = function(id) {
        delete queue[id];
      };
      if (cof(process) == 'process') {
        defer = function(id) {
          process.nextTick(ctx(run, id, 1));
        };
      } else if (addEventListener && isFunction(postMessage) && !global.importScripts) {
        defer = function(id) {
          postMessage(id, '*');
        };
        addEventListener('message', listner, false);
      } else if (isFunction(MessageChannel)) {
        channel = new MessageChannel;
        port = channel.port2;
        channel.port1.onmessage = listner;
        defer = ctx(port.postMessage, port, 1);
      } else if (ONREADYSTATECHANGE in cel('script')) {
        defer = function(id) {
          html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function() {
            html.removeChild(this);
            run.call(id);
          };
        };
      } else {
        defer = function(id) {
          setTimeout(ctx(run, id, 1), 0);
        };
      }
    }
    module.exports = {
      set: setTask,
      clear: clearTask
    };
  })(require("github:jspm/nodelibs-process@0.1.1"));
  global.define = __define;
  return module.exports;
});

System.register("github:aurelia/dependency-injection@0.8.1", ["github:aurelia/dependency-injection@0.8.1/index"], function($__export) {
  return {
    setters: [function(m) {
      for (var p in m)
        $__export(p, m[p]);
    }],
    execute: function() {}
  };
});

System.register("github:aurelia/templating@0.12.1/view-engine", ["npm:core-js@0.9.16", "github:aurelia/logging@0.5.0", "github:aurelia/metadata@0.6.0", "github:aurelia/loader@0.7.0", "github:aurelia/dependency-injection@0.8.1", "github:aurelia/templating@0.12.1/view-compiler", "github:aurelia/templating@0.12.1/resource-registry", "github:aurelia/templating@0.12.1/module-analyzer"], function(_export) {
  'use strict';
  var core,
      LogManager,
      Origin,
      Loader,
      TemplateRegistryEntry,
      Container,
      ViewCompiler,
      ResourceRegistry,
      ViewResources,
      ModuleAnalyzer,
      logger,
      ViewEngine;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }
  function ensureRegistryEntry(loader, urlOrRegistryEntry) {
    if (urlOrRegistryEntry instanceof TemplateRegistryEntry) {
      return Promise.resolve(urlOrRegistryEntry);
    }
    return loader.loadTemplate(urlOrRegistryEntry);
  }
  return {
    setters: [function(_coreJs) {
      core = _coreJs['default'];
    }, function(_aureliaLogging) {
      LogManager = _aureliaLogging;
    }, function(_aureliaMetadata) {
      Origin = _aureliaMetadata.Origin;
    }, function(_aureliaLoader) {
      Loader = _aureliaLoader.Loader;
      TemplateRegistryEntry = _aureliaLoader.TemplateRegistryEntry;
    }, function(_aureliaDependencyInjection) {
      Container = _aureliaDependencyInjection.Container;
    }, function(_viewCompiler) {
      ViewCompiler = _viewCompiler.ViewCompiler;
    }, function(_resourceRegistry) {
      ResourceRegistry = _resourceRegistry.ResourceRegistry;
      ViewResources = _resourceRegistry.ViewResources;
    }, function(_moduleAnalyzer) {
      ModuleAnalyzer = _moduleAnalyzer.ModuleAnalyzer;
    }],
    execute: function() {
      logger = LogManager.getLogger('templating');
      ViewEngine = (function() {
        function ViewEngine(loader, container, viewCompiler, moduleAnalyzer, appResources) {
          _classCallCheck(this, ViewEngine);
          this.loader = loader;
          this.container = container;
          this.viewCompiler = viewCompiler;
          this.moduleAnalyzer = moduleAnalyzer;
          this.appResources = appResources;
        }
        ViewEngine.inject = function inject() {
          return [Loader, Container, ViewCompiler, ModuleAnalyzer, ResourceRegistry];
        };
        ViewEngine.prototype.loadViewFactory = function loadViewFactory(urlOrRegistryEntry, compileOptions, associatedModuleId) {
          var _this = this;
          return ensureRegistryEntry(this.loader, urlOrRegistryEntry).then(function(viewRegistryEntry) {
            if (viewRegistryEntry.onReady) {
              return viewRegistryEntry.onReady;
            }
            return viewRegistryEntry.onReady = _this.loadTemplateResources(viewRegistryEntry, associatedModuleId).then(function(resources) {
              viewRegistryEntry.setResources(resources);
              var viewFactory = _this.viewCompiler.compile(viewRegistryEntry.template, resources, compileOptions);
              viewRegistryEntry.setFactory(viewFactory);
              return viewFactory;
            });
          });
        };
        ViewEngine.prototype.loadTemplateResources = function loadTemplateResources(viewRegistryEntry, associatedModuleId) {
          var resources = new ViewResources(this.appResources, viewRegistryEntry.id),
              dependencies = viewRegistryEntry.dependencies,
              importIds,
              names;
          if (dependencies.length === 0 && !associatedModuleId) {
            return Promise.resolve(resources);
          }
          importIds = dependencies.map(function(x) {
            return x.src;
          });
          names = dependencies.map(function(x) {
            return x.name;
          });
          logger.debug('importing resources for ' + viewRegistryEntry.id, importIds);
          return this.importViewResources(importIds, names, resources, associatedModuleId);
        };
        ViewEngine.prototype.importViewModelResource = function importViewModelResource(moduleImport, moduleMember) {
          var _this2 = this;
          return this.loader.loadModule(moduleImport).then(function(viewModelModule) {
            var normalizedId = Origin.get(viewModelModule).moduleId,
                resourceModule = _this2.moduleAnalyzer.analyze(normalizedId, viewModelModule, moduleMember);
            if (!resourceModule.mainResource) {
              throw new Error('No view model found in module "' + moduleImport + '".');
            }
            resourceModule.analyze(_this2.container);
            return resourceModule.mainResource;
          });
        };
        ViewEngine.prototype.importViewResources = function importViewResources(moduleIds, names, resources, associatedModuleId) {
          var _this3 = this;
          return this.loader.loadAllModules(moduleIds).then(function(imports) {
            var i,
                ii,
                analysis,
                normalizedId,
                current,
                associatedModule,
                container = _this3.container,
                moduleAnalyzer = _this3.moduleAnalyzer,
                allAnalysis = new Array(imports.length);
            for (i = 0, ii = imports.length; i < ii; ++i) {
              current = imports[i];
              normalizedId = Origin.get(current).moduleId;
              analysis = moduleAnalyzer.analyze(normalizedId, current);
              analysis.analyze(container);
              analysis.register(resources, names[i]);
              allAnalysis[i] = analysis;
            }
            if (associatedModuleId) {
              associatedModule = moduleAnalyzer.getAnalysis(associatedModuleId);
              if (associatedModule) {
                associatedModule.register(resources);
              }
            }
            for (i = 0, ii = allAnalysis.length; i < ii; ++i) {
              allAnalysis[i] = allAnalysis[i].load(container);
            }
            return Promise.all(allAnalysis).then(function() {
              return resources;
            });
          });
        };
        return ViewEngine;
      })();
      _export('ViewEngine', ViewEngine);
    }
  };
});

System.register("npm:core-js@0.9.16/modules/es6.promise", ["npm:core-js@0.9.16/modules/$", "npm:core-js@0.9.16/modules/$.ctx", "npm:core-js@0.9.16/modules/$.cof", "npm:core-js@0.9.16/modules/$.def", "npm:core-js@0.9.16/modules/$.assert", "npm:core-js@0.9.16/modules/$.for-of", "npm:core-js@0.9.16/modules/$.set-proto", "npm:core-js@0.9.16/modules/$.same", "npm:core-js@0.9.16/modules/$.species", "npm:core-js@0.9.16/modules/$.wks", "npm:core-js@0.9.16/modules/$.uid", "npm:core-js@0.9.16/modules/$.task", "npm:core-js@0.9.16/modules/$.mix", "npm:core-js@0.9.16/modules/$.iter-detect", "github:jspm/nodelibs-process@0.1.1"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    'use strict';
    var $ = require("npm:core-js@0.9.16/modules/$"),
        ctx = require("npm:core-js@0.9.16/modules/$.ctx"),
        cof = require("npm:core-js@0.9.16/modules/$.cof"),
        $def = require("npm:core-js@0.9.16/modules/$.def"),
        assert = require("npm:core-js@0.9.16/modules/$.assert"),
        forOf = require("npm:core-js@0.9.16/modules/$.for-of"),
        setProto = require("npm:core-js@0.9.16/modules/$.set-proto").set,
        same = require("npm:core-js@0.9.16/modules/$.same"),
        species = require("npm:core-js@0.9.16/modules/$.species"),
        SPECIES = require("npm:core-js@0.9.16/modules/$.wks")('species'),
        RECORD = require("npm:core-js@0.9.16/modules/$.uid").safe('record'),
        PROMISE = 'Promise',
        global = $.g,
        process = global.process,
        asap = process && process.nextTick || require("npm:core-js@0.9.16/modules/$.task").set,
        P = global[PROMISE],
        isFunction = $.isFunction,
        isObject = $.isObject,
        assertFunction = assert.fn,
        assertObject = assert.obj,
        Wrapper;
    function testResolve(sub) {
      var test = new P(function() {});
      if (sub)
        test.constructor = Object;
      return P.resolve(test) === test;
    }
    var useNative = function() {
      var works = false;
      function P2(x) {
        var self = new P(x);
        setProto(self, P2.prototype);
        return self;
      }
      try {
        works = isFunction(P) && isFunction(P.resolve) && testResolve();
        setProto(P2, P);
        P2.prototype = $.create(P.prototype, {constructor: {value: P2}});
        if (!(P2.resolve(5).then(function() {}) instanceof P2)) {
          works = false;
        }
        if (works && $.DESC) {
          var thenableThenGotten = false;
          P.resolve($.setDesc({}, 'then', {get: function() {
              thenableThenGotten = true;
            }}));
          works = thenableThenGotten;
        }
      } catch (e) {
        works = false;
      }
      return works;
    }();
    function isPromise(it) {
      return isObject(it) && (useNative ? cof.classof(it) == 'Promise' : RECORD in it);
    }
    function sameConstructor(a, b) {
      if (!$.FW && a === P && b === Wrapper)
        return true;
      return same(a, b);
    }
    function getConstructor(C) {
      var S = assertObject(C)[SPECIES];
      return S != undefined ? S : C;
    }
    function isThenable(it) {
      var then;
      if (isObject(it))
        then = it.then;
      return isFunction(then) ? then : false;
    }
    function notify(record) {
      var chain = record.c;
      if (chain.length)
        asap(function() {
          var value = record.v,
              ok = record.s == 1,
              i = 0;
          function run(react) {
            var cb = ok ? react.ok : react.fail,
                ret,
                then;
            try {
              if (cb) {
                if (!ok)
                  record.h = true;
                ret = cb === true ? value : cb(value);
                if (ret === react.P) {
                  react.rej(TypeError('Promise-chain cycle'));
                } else if (then = isThenable(ret)) {
                  then.call(ret, react.res, react.rej);
                } else
                  react.res(ret);
              } else
                react.rej(value);
            } catch (err) {
              react.rej(err);
            }
          }
          while (chain.length > i)
            run(chain[i++]);
          chain.length = 0;
        });
    }
    function isUnhandled(promise) {
      var record = promise[RECORD],
          chain = record.a || record.c,
          i = 0,
          react;
      if (record.h)
        return false;
      while (chain.length > i) {
        react = chain[i++];
        if (react.fail || !isUnhandled(react.P))
          return false;
      }
      return true;
    }
    function $reject(value) {
      var record = this,
          promise;
      if (record.d)
        return ;
      record.d = true;
      record = record.r || record;
      record.v = value;
      record.s = 2;
      record.a = record.c.slice();
      setTimeout(function() {
        asap(function() {
          if (isUnhandled(promise = record.p)) {
            if (cof(process) == 'process') {
              process.emit('unhandledRejection', value, promise);
            } else if (global.console && isFunction(console.error)) {
              console.error('Unhandled promise rejection', value);
            }
          }
          record.a = undefined;
        });
      }, 1);
      notify(record);
    }
    function $resolve(value) {
      var record = this,
          then;
      if (record.d)
        return ;
      record.d = true;
      record = record.r || record;
      try {
        if (then = isThenable(value)) {
          asap(function() {
            var wrapper = {
              r: record,
              d: false
            };
            try {
              then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
            } catch (e) {
              $reject.call(wrapper, e);
            }
          });
        } else {
          record.v = value;
          record.s = 1;
          notify(record);
        }
      } catch (e) {
        $reject.call({
          r: record,
          d: false
        }, e);
      }
    }
    if (!useNative) {
      P = function Promise(executor) {
        assertFunction(executor);
        var record = {
          p: assert.inst(this, P, PROMISE),
          c: [],
          a: undefined,
          s: 0,
          d: false,
          v: undefined,
          h: false
        };
        $.hide(this, RECORD, record);
        try {
          executor(ctx($resolve, record, 1), ctx($reject, record, 1));
        } catch (err) {
          $reject.call(record, err);
        }
      };
      require("npm:core-js@0.9.16/modules/$.mix")(P.prototype, {
        then: function then(onFulfilled, onRejected) {
          var S = assertObject(assertObject(this).constructor)[SPECIES];
          var react = {
            ok: isFunction(onFulfilled) ? onFulfilled : true,
            fail: isFunction(onRejected) ? onRejected : false
          };
          var promise = react.P = new (S != undefined ? S : P)(function(res, rej) {
            react.res = assertFunction(res);
            react.rej = assertFunction(rej);
          });
          var record = this[RECORD];
          record.c.push(react);
          if (record.a)
            record.a.push(react);
          if (record.s)
            notify(record);
          return promise;
        },
        'catch': function(onRejected) {
          return this.then(undefined, onRejected);
        }
      });
    }
    $def($def.G + $def.W + $def.F * !useNative, {Promise: P});
    cof.set(P, PROMISE);
    species(P);
    species(Wrapper = $.core[PROMISE]);
    $def($def.S + $def.F * !useNative, PROMISE, {reject: function reject(r) {
        return new (getConstructor(this))(function(res, rej) {
          rej(r);
        });
      }});
    $def($def.S + $def.F * (!useNative || testResolve(true)), PROMISE, {resolve: function resolve(x) {
        return isPromise(x) && sameConstructor(x.constructor, this) ? x : new this(function(res) {
          res(x);
        });
      }});
    $def($def.S + $def.F * !(useNative && require("npm:core-js@0.9.16/modules/$.iter-detect")(function(iter) {
      P.all(iter)['catch'](function() {});
    })), PROMISE, {
      all: function all(iterable) {
        var C = getConstructor(this),
            values = [];
        return new C(function(res, rej) {
          forOf(iterable, false, values.push, values);
          var remaining = values.length,
              results = Array(remaining);
          if (remaining)
            $.each.call(values, function(promise, index) {
              C.resolve(promise).then(function(value) {
                results[index] = value;
                --remaining || res(results);
              }, rej);
            });
          else
            res(results);
        });
      },
      race: function race(iterable) {
        var C = getConstructor(this);
        return new C(function(res, rej) {
          forOf(iterable, false, function(promise) {
            C.resolve(promise).then(res, rej);
          });
        });
      }
    });
  })(require("github:jspm/nodelibs-process@0.1.1"));
  global.define = __define;
  return module.exports;
});

System.register("github:aurelia/binding@0.7.3/observer-locator", ["github:aurelia/task-queue@0.5.0", "github:aurelia/binding@0.7.3/environment", "github:aurelia/binding@0.7.3/array-observation", "github:aurelia/binding@0.7.3/map-observation", "github:aurelia/binding@0.7.3/event-manager", "github:aurelia/binding@0.7.3/dirty-checking", "github:aurelia/binding@0.7.3/property-observation", "github:aurelia/binding@0.7.3/element-observation", "github:aurelia/binding@0.7.3/class-observer", "github:aurelia/dependency-injection@0.8.1", "github:aurelia/binding@0.7.3/computed-observation", "github:aurelia/binding@0.7.3/svg"], function(_export) {
  'use strict';
  var TaskQueue,
      hasObjectObserve,
      _getArrayObserver,
      _getMapObserver,
      EventManager,
      DirtyChecker,
      DirtyCheckProperty,
      SetterObserver,
      OoObjectObserver,
      OoPropertyObserver,
      SelectValueObserver,
      CheckedObserver,
      ValueAttributeObserver,
      XLinkAttributeObserver,
      DataAttributeObserver,
      StyleObserver,
      ClassObserver,
      All,
      hasDeclaredDependencies,
      ComputedPropertyObserver,
      isStandardSvgAttribute,
      ObserverLocator,
      ObjectObservationAdapter;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }
  function createObserverLookup(obj, observerLocator) {
    var value = new OoObjectObserver(obj, observerLocator);
    try {
      Object.defineProperty(obj, '__observer__', {
        enumerable: false,
        configurable: false,
        writable: false,
        value: value
      });
    } catch (_) {}
    return value;
  }
  return {
    setters: [function(_aureliaTaskQueue) {
      TaskQueue = _aureliaTaskQueue.TaskQueue;
    }, function(_environment) {
      hasObjectObserve = _environment.hasObjectObserve;
    }, function(_arrayObservation) {
      _getArrayObserver = _arrayObservation.getArrayObserver;
    }, function(_mapObservation) {
      _getMapObserver = _mapObservation.getMapObserver;
    }, function(_eventManager) {
      EventManager = _eventManager.EventManager;
    }, function(_dirtyChecking) {
      DirtyChecker = _dirtyChecking.DirtyChecker;
      DirtyCheckProperty = _dirtyChecking.DirtyCheckProperty;
    }, function(_propertyObservation) {
      SetterObserver = _propertyObservation.SetterObserver;
      OoObjectObserver = _propertyObservation.OoObjectObserver;
      OoPropertyObserver = _propertyObservation.OoPropertyObserver;
    }, function(_elementObservation) {
      SelectValueObserver = _elementObservation.SelectValueObserver;
      CheckedObserver = _elementObservation.CheckedObserver;
      ValueAttributeObserver = _elementObservation.ValueAttributeObserver;
      XLinkAttributeObserver = _elementObservation.XLinkAttributeObserver;
      DataAttributeObserver = _elementObservation.DataAttributeObserver;
      StyleObserver = _elementObservation.StyleObserver;
    }, function(_classObserver) {
      ClassObserver = _classObserver.ClassObserver;
    }, function(_aureliaDependencyInjection) {
      All = _aureliaDependencyInjection.All;
    }, function(_computedObservation) {
      hasDeclaredDependencies = _computedObservation.hasDeclaredDependencies;
      ComputedPropertyObserver = _computedObservation.ComputedPropertyObserver;
    }, function(_svg) {
      isStandardSvgAttribute = _svg.isStandardSvgAttribute;
    }],
    execute: function() {
      if (typeof Object.getPropertyDescriptor !== 'function') {
        Object.getPropertyDescriptor = function(subject, name) {
          var pd = Object.getOwnPropertyDescriptor(subject, name);
          var proto = Object.getPrototypeOf(subject);
          while (typeof pd === 'undefined' && proto !== null) {
            pd = Object.getOwnPropertyDescriptor(proto, name);
            proto = Object.getPrototypeOf(proto);
          }
          return pd;
        };
      }
      ObserverLocator = (function() {
        function ObserverLocator(taskQueue, eventManager, dirtyChecker, observationAdapters) {
          _classCallCheck(this, ObserverLocator);
          this.taskQueue = taskQueue;
          this.eventManager = eventManager;
          this.dirtyChecker = dirtyChecker;
          this.observationAdapters = observationAdapters;
        }
        ObserverLocator.inject = function inject() {
          return [TaskQueue, EventManager, DirtyChecker, All.of(ObjectObservationAdapter)];
        };
        ObserverLocator.prototype.getObserver = function getObserver(obj, propertyName) {
          var observersLookup = obj.__observers__,
              observer;
          if (observersLookup && propertyName in observersLookup) {
            return observersLookup[propertyName];
          }
          observer = this.createPropertyObserver(obj, propertyName);
          if (!observer.doNotCache) {
            if (observersLookup === undefined) {
              observersLookup = this.getOrCreateObserversLookup(obj);
            }
            observersLookup[propertyName] = observer;
          }
          return observer;
        };
        ObserverLocator.prototype.getOrCreateObserversLookup = function getOrCreateObserversLookup(obj) {
          return obj.__observers__ || this.createObserversLookup(obj);
        };
        ObserverLocator.prototype.createObserversLookup = function createObserversLookup(obj) {
          var value = {};
          try {
            Object.defineProperty(obj, '__observers__', {
              enumerable: false,
              configurable: false,
              writable: false,
              value: value
            });
          } catch (_) {}
          return value;
        };
        ObserverLocator.prototype.getObservationAdapter = function getObservationAdapter(obj, propertyName, descriptor) {
          var i,
              ii,
              observationAdapter;
          for (i = 0, ii = this.observationAdapters.length; i < ii; i++) {
            observationAdapter = this.observationAdapters[i];
            if (observationAdapter.handlesProperty(obj, propertyName, descriptor))
              return observationAdapter;
          }
          return null;
        };
        ObserverLocator.prototype.createPropertyObserver = function createPropertyObserver(obj, propertyName) {
          var observerLookup,
              descriptor,
              handler,
              observationAdapter,
              xlinkResult;
          if (obj instanceof Element) {
            if (propertyName === 'class') {
              return new ClassObserver(obj);
            }
            if (propertyName === 'style' || propertyName === 'css') {
              return new StyleObserver(obj, propertyName);
            }
            handler = this.eventManager.getElementHandler(obj, propertyName);
            if (propertyName === 'value' && obj.tagName.toLowerCase() === 'select') {
              return new SelectValueObserver(obj, handler, this);
            }
            if (propertyName === 'checked' && obj.tagName.toLowerCase() === 'input') {
              return new CheckedObserver(obj, handler, this);
            }
            if (handler) {
              return new ValueAttributeObserver(obj, propertyName, handler);
            }
            xlinkResult = /^xlink:(.+)$/.exec(propertyName);
            if (xlinkResult) {
              return new XLinkAttributeObserver(obj, propertyName, xlinkResult[1]);
            }
            if (/^\w+:|^data-|^aria-/.test(propertyName) || obj instanceof SVGElement && isStandardSvgAttribute(obj.nodeName, propertyName)) {
              return new DataAttributeObserver(obj, propertyName);
            }
          }
          descriptor = Object.getPropertyDescriptor(obj, propertyName);
          if (hasDeclaredDependencies(descriptor)) {
            return new ComputedPropertyObserver(obj, propertyName, descriptor, this);
          }
          var existingGetterOrSetter = undefined;
          if (descriptor && (existingGetterOrSetter = descriptor.get || descriptor.set)) {
            if (existingGetterOrSetter.getObserver) {
              return existingGetterOrSetter.getObserver(obj);
            }
            observationAdapter = this.getObservationAdapter(obj, propertyName, descriptor);
            if (observationAdapter)
              return observationAdapter.getObserver(obj, propertyName, descriptor);
            return new DirtyCheckProperty(this.dirtyChecker, obj, propertyName);
          }
          if (hasObjectObserve) {
            observerLookup = obj.__observer__ || createObserverLookup(obj, this);
            return observerLookup.getObserver(propertyName, descriptor);
          }
          if (obj instanceof Array) {
            if (propertyName === 'length') {
              return this.getArrayObserver(obj).getLengthObserver();
            } else {
              return new DirtyCheckProperty(this.dirtyChecker, obj, propertyName);
            }
          } else if (obj instanceof Map) {
            if (propertyName === 'size') {
              return this.getMapObserver(obj).getLengthObserver();
            } else {
              return new DirtyCheckProperty(this.dirtyChecker, obj, propertyName);
            }
          }
          return new SetterObserver(this.taskQueue, obj, propertyName);
        };
        ObserverLocator.prototype.getArrayObserver = function getArrayObserver(array) {
          if ('__array_observer__' in array) {
            return array.__array_observer__;
          }
          return array.__array_observer__ = _getArrayObserver(this.taskQueue, array);
        };
        ObserverLocator.prototype.getMapObserver = function getMapObserver(map) {
          if ('__map_observer__' in map) {
            return map.__map_observer__;
          }
          return map.__map_observer__ = _getMapObserver(this.taskQueue, map);
        };
        return ObserverLocator;
      })();
      _export('ObserverLocator', ObserverLocator);
      ObjectObservationAdapter = (function() {
        function ObjectObservationAdapter() {
          _classCallCheck(this, ObjectObservationAdapter);
        }
        ObjectObservationAdapter.prototype.handlesProperty = function handlesProperty(object, propertyName, descriptor) {
          throw new Error('BindingAdapters must implement handlesProperty(object, propertyName).');
        };
        ObjectObservationAdapter.prototype.getObserver = function getObserver(object, propertyName, descriptor) {
          throw new Error('BindingAdapters must implement createObserver(object, propertyName).');
        };
        return ObjectObservationAdapter;
      })();
      _export('ObjectObservationAdapter', ObjectObservationAdapter);
    }
  };
});

System.register("github:aurelia/templating@0.12.1/html-behavior", ["github:aurelia/metadata@0.6.0", "github:aurelia/binding@0.7.3", "github:aurelia/task-queue@0.5.0", "github:aurelia/templating@0.12.1/view-strategy", "github:aurelia/templating@0.12.1/view-engine", "github:aurelia/templating@0.12.1/content-selector", "github:aurelia/templating@0.12.1/util", "github:aurelia/templating@0.12.1/bindable-property", "github:aurelia/templating@0.12.1/behavior-instance"], function(_export) {
  'use strict';
  var Origin,
      ObserverLocator,
      TaskQueue,
      ViewStrategy,
      ViewEngine,
      ContentSelector,
      hyphenate,
      BindableProperty,
      BehaviorInstance,
      defaultInstruction,
      contentSelectorFactoryOptions,
      hasShadowDOM,
      HtmlBehaviorResource;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }
  return {
    setters: [function(_aureliaMetadata) {
      Origin = _aureliaMetadata.Origin;
    }, function(_aureliaBinding) {
      ObserverLocator = _aureliaBinding.ObserverLocator;
    }, function(_aureliaTaskQueue) {
      TaskQueue = _aureliaTaskQueue.TaskQueue;
    }, function(_viewStrategy) {
      ViewStrategy = _viewStrategy.ViewStrategy;
    }, function(_viewEngine) {
      ViewEngine = _viewEngine.ViewEngine;
    }, function(_contentSelector) {
      ContentSelector = _contentSelector.ContentSelector;
    }, function(_util) {
      hyphenate = _util.hyphenate;
    }, function(_bindableProperty) {
      BindableProperty = _bindableProperty.BindableProperty;
    }, function(_behaviorInstance) {
      BehaviorInstance = _behaviorInstance.BehaviorInstance;
    }],
    execute: function() {
      defaultInstruction = {suppressBind: false};
      contentSelectorFactoryOptions = {suppressBind: true};
      hasShadowDOM = !!HTMLElement.prototype.createShadowRoot;
      HtmlBehaviorResource = (function() {
        function HtmlBehaviorResource() {
          _classCallCheck(this, HtmlBehaviorResource);
          this.elementName = null;
          this.attributeName = null;
          this.attributeDefaultBindingMode = undefined;
          this.liftsContent = false;
          this.targetShadowDOM = false;
          this.skipContentProcessing = false;
          this.usesShadowDOM = false;
          this.childExpression = null;
          this.hasDynamicOptions = false;
          this.containerless = false;
          this.properties = [];
          this.attributes = {};
        }
        HtmlBehaviorResource.convention = function convention(name, existing) {
          var behavior;
          if (name.endsWith('CustomAttribute')) {
            behavior = existing || new HtmlBehaviorResource();
            behavior.attributeName = hyphenate(name.substring(0, name.length - 15));
          }
          if (name.endsWith('CustomElement')) {
            behavior = existing || new HtmlBehaviorResource();
            behavior.elementName = hyphenate(name.substring(0, name.length - 13));
          }
          return behavior;
        };
        HtmlBehaviorResource.prototype.analyze = function analyze(container, target) {
          var proto = target.prototype,
              properties = this.properties,
              attributeName = this.attributeName,
              attributeDefaultBindingMode = this.attributeDefaultBindingMode,
              i,
              ii,
              current;
          this.observerLocator = container.get(ObserverLocator);
          this.taskQueue = container.get(TaskQueue);
          this.target = target;
          this.usesShadowDOM = this.targetShadowDOM && hasShadowDOM;
          this.handlesCreated = 'created' in proto;
          this.handlesBind = 'bind' in proto;
          this.handlesUnbind = 'unbind' in proto;
          this.handlesAttached = 'attached' in proto;
          this.handlesDetached = 'detached' in proto;
          this.htmlName = this.elementName || this.attributeName;
          this.apiName = this.htmlName.replace(/-([a-z])/g, function(m, w) {
            return w.toUpperCase();
          });
          if (attributeName !== null) {
            if (properties.length === 0) {
              new BindableProperty({
                name: 'value',
                changeHandler: 'valueChanged' in proto ? 'valueChanged' : null,
                attribute: attributeName,
                defaultBindingMode: attributeDefaultBindingMode
              }).registerWith(target, this);
            }
            current = properties[0];
            if (properties.length === 1 && current.name === 'value') {
              current.isDynamic = current.hasOptions = this.hasDynamicOptions;
              current.defineOn(target, this);
            } else {
              for (i = 0, ii = properties.length; i < ii; ++i) {
                properties[i].defineOn(target, this);
              }
              current = new BindableProperty({
                name: 'value',
                changeHandler: 'valueChanged' in proto ? 'valueChanged' : null,
                attribute: attributeName,
                defaultBindingMode: attributeDefaultBindingMode
              });
              current.hasOptions = true;
              current.registerWith(target, this);
            }
          } else {
            for (i = 0, ii = properties.length; i < ii; ++i) {
              properties[i].defineOn(target, this);
            }
          }
        };
        HtmlBehaviorResource.prototype.load = function load(container, target, viewStrategy, transientView) {
          var _this = this;
          var options;
          if (this.elementName !== null) {
            viewStrategy = viewStrategy || this.viewStrategy || ViewStrategy.getDefault(target);
            options = {
              targetShadowDOM: this.targetShadowDOM,
              beforeCompile: target.beforeCompile
            };
            if (!viewStrategy.moduleId) {
              viewStrategy.moduleId = Origin.get(target).moduleId;
            }
            return viewStrategy.loadViewFactory(container.get(ViewEngine), options).then(function(viewFactory) {
              if (!transientView) {
                _this.viewFactory = viewFactory;
              }
              return viewFactory;
            });
          }
          return Promise.resolve(this);
        };
        HtmlBehaviorResource.prototype.register = function register(registry, name) {
          if (this.attributeName !== null) {
            registry.registerAttribute(name || this.attributeName, this, this.attributeName);
          }
          if (this.elementName !== null) {
            registry.registerElement(name || this.elementName, this);
          }
        };
        HtmlBehaviorResource.prototype.compile = function compile(compiler, resources, node, instruction, parentNode) {
          if (this.liftsContent) {
            if (!instruction.viewFactory) {
              var template = document.createElement('template'),
                  fragment = document.createDocumentFragment(),
                  part = node.getAttribute('part');
              node.removeAttribute(instruction.originalAttrName);
              if (node.parentNode) {
                node.parentNode.replaceChild(template, node);
              } else if (window.ShadowDOMPolyfill) {
                ShadowDOMPolyfill.unwrap(parentNode).replaceChild(ShadowDOMPolyfill.unwrap(template), ShadowDOMPolyfill.unwrap(node));
              } else {
                parentNode.replaceChild(template, node);
              }
              fragment.appendChild(node);
              instruction.viewFactory = compiler.compile(fragment, resources);
              if (part) {
                instruction.viewFactory.part = part;
                node.removeAttribute('part');
              }
              node = template;
            }
          } else if (this.elementName !== null) {
            var partReplacements = {};
            if (!this.skipContentProcessing && node.hasChildNodes()) {
              if (!this.usesShadowDOM) {
                var fragment = document.createDocumentFragment(),
                    currentChild = node.firstChild,
                    nextSibling;
                while (currentChild) {
                  nextSibling = currentChild.nextSibling;
                  if (currentChild.tagName === 'TEMPLATE' && (toReplace = currentChild.getAttribute('replace-part'))) {
                    partReplacements[toReplace] = compiler.compile(currentChild, resources);
                  } else {
                    fragment.appendChild(currentChild);
                  }
                  currentChild = nextSibling;
                }
                instruction.contentFactory = compiler.compile(fragment, resources);
              } else {
                var currentChild = node.firstChild,
                    nextSibling,
                    toReplace;
                while (currentChild) {
                  nextSibling = currentChild.nextSibling;
                  if (currentChild.tagName === 'TEMPLATE' && (toReplace = currentChild.getAttribute('replace-part'))) {
                    partReplacements[toReplace] = compiler.compile(currentChild, resources);
                  }
                  currentChild = nextSibling;
                }
              }
            }
          }
          instruction.partReplacements = partReplacements;
          instruction.suppressBind = true;
          return node;
        };
        HtmlBehaviorResource.prototype.create = function create(container) {
          var instruction = arguments[1] === undefined ? defaultInstruction : arguments[1];
          var element = arguments[2] === undefined ? null : arguments[2];
          var bindings = arguments[3] === undefined ? null : arguments[3];
          var executionContext = instruction.executionContext || container.get(this.target),
              behaviorInstance = new BehaviorInstance(this, executionContext, instruction),
              viewFactory,
              host;
          if (this.liftsContent) {
            element.primaryBehavior = behaviorInstance;
          } else if (this.elementName !== null) {
            viewFactory = instruction.viewFactory || this.viewFactory;
            if (viewFactory) {
              behaviorInstance.view = viewFactory.create(container, executionContext, instruction);
            }
            if (element) {
              element.primaryBehavior = behaviorInstance;
              if (this.usesShadowDOM) {
                host = element.createShadowRoot();
              } else {
                host = element;
              }
              if (behaviorInstance.view) {
                if (!this.usesShadowDOM) {
                  if (instruction.contentFactory) {
                    var contentView = instruction.contentFactory.create(container, null, contentSelectorFactoryOptions);
                    ContentSelector.applySelectors(contentView, behaviorInstance.view.contentSelectors, function(contentSelector, group) {
                      return contentSelector.add(group);
                    });
                    behaviorInstance.contentView = contentView;
                  }
                }
                if (instruction.anchorIsContainer) {
                  if (this.childExpression) {
                    behaviorInstance.view.addBinding(this.childExpression.createBinding(host, executionContext));
                  }
                  behaviorInstance.view.appendNodesTo(host);
                } else {
                  behaviorInstance.view.insertNodesBefore(host);
                }
              } else if (this.childExpression) {
                bindings.push(this.childExpression.createBinding(element, executionContext));
              }
            } else if (behaviorInstance.view) {
              behaviorInstance.view.owner = behaviorInstance;
              if (this.childExpression) {
                behaviorInstance.view.addBinding(this.childExpression.createBinding(instruction.host, executionContext));
              }
            } else if (this.childExpression) {
              bindings.push(this.childExpression.createBinding(instruction.host, executionContext));
            }
          } else if (this.childExpression) {
            bindings.push(this.childExpression.createBinding(element, executionContext));
          }
          if (element) {
            if (!(this.apiName in element)) {
              element[this.apiName] = executionContext;
            }
            if (!(this.htmlName in element)) {
              element[this.htmlName] = behaviorInstance;
            }
          }
          return behaviorInstance;
        };
        HtmlBehaviorResource.prototype.ensurePropertiesDefined = function ensurePropertiesDefined(instance, lookup) {
          var properties,
              i,
              ii,
              observer;
          if ('__propertiesDefined__' in lookup) {
            return ;
          }
          lookup.__propertiesDefined__ = true;
          properties = this.properties;
          for (i = 0, ii = properties.length; i < ii; ++i) {
            observer = properties[i].createObserver(instance);
            if (observer !== undefined) {
              lookup[observer.propertyName] = observer;
            }
          }
        };
        return HtmlBehaviorResource;
      })();
      _export('HtmlBehaviorResource', HtmlBehaviorResource);
    }
  };
});

System.register("npm:core-js@0.9.16/shim", ["npm:core-js@0.9.16/modules/es5", "npm:core-js@0.9.16/modules/es6.symbol", "npm:core-js@0.9.16/modules/es6.object.assign", "npm:core-js@0.9.16/modules/es6.object.is", "npm:core-js@0.9.16/modules/es6.object.set-prototype-of", "npm:core-js@0.9.16/modules/es6.object.to-string", "npm:core-js@0.9.16/modules/es6.object.statics-accept-primitives", "npm:core-js@0.9.16/modules/es6.function.name", "npm:core-js@0.9.16/modules/es6.function.has-instance", "npm:core-js@0.9.16/modules/es6.number.constructor", "npm:core-js@0.9.16/modules/es6.number.statics", "npm:core-js@0.9.16/modules/es6.math", "npm:core-js@0.9.16/modules/es6.string.from-code-point", "npm:core-js@0.9.16/modules/es6.string.raw", "npm:core-js@0.9.16/modules/es6.string.iterator", "npm:core-js@0.9.16/modules/es6.string.code-point-at", "npm:core-js@0.9.16/modules/es6.string.ends-with", "npm:core-js@0.9.16/modules/es6.string.includes", "npm:core-js@0.9.16/modules/es6.string.repeat", "npm:core-js@0.9.16/modules/es6.string.starts-with", "npm:core-js@0.9.16/modules/es6.array.from", "npm:core-js@0.9.16/modules/es6.array.of", "npm:core-js@0.9.16/modules/es6.array.iterator", "npm:core-js@0.9.16/modules/es6.array.species", "npm:core-js@0.9.16/modules/es6.array.copy-within", "npm:core-js@0.9.16/modules/es6.array.fill", "npm:core-js@0.9.16/modules/es6.array.find", "npm:core-js@0.9.16/modules/es6.array.find-index", "npm:core-js@0.9.16/modules/es6.regexp", "npm:core-js@0.9.16/modules/es6.promise", "npm:core-js@0.9.16/modules/es6.map", "npm:core-js@0.9.16/modules/es6.set", "npm:core-js@0.9.16/modules/es6.weak-map", "npm:core-js@0.9.16/modules/es6.weak-set", "npm:core-js@0.9.16/modules/es6.reflect", "npm:core-js@0.9.16/modules/es7.array.includes", "npm:core-js@0.9.16/modules/es7.string.at", "npm:core-js@0.9.16/modules/es7.string.lpad", "npm:core-js@0.9.16/modules/es7.string.rpad", "npm:core-js@0.9.16/modules/es7.regexp.escape", "npm:core-js@0.9.16/modules/es7.object.get-own-property-descriptors", "npm:core-js@0.9.16/modules/es7.object.to-array", "npm:core-js@0.9.16/modules/es7.map.to-json", "npm:core-js@0.9.16/modules/es7.set.to-json", "npm:core-js@0.9.16/modules/js.array.statics", "npm:core-js@0.9.16/modules/web.timers", "npm:core-js@0.9.16/modules/web.immediate", "npm:core-js@0.9.16/modules/web.dom.iterable", "npm:core-js@0.9.16/modules/$"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  require("npm:core-js@0.9.16/modules/es5");
  require("npm:core-js@0.9.16/modules/es6.symbol");
  require("npm:core-js@0.9.16/modules/es6.object.assign");
  require("npm:core-js@0.9.16/modules/es6.object.is");
  require("npm:core-js@0.9.16/modules/es6.object.set-prototype-of");
  require("npm:core-js@0.9.16/modules/es6.object.to-string");
  require("npm:core-js@0.9.16/modules/es6.object.statics-accept-primitives");
  require("npm:core-js@0.9.16/modules/es6.function.name");
  require("npm:core-js@0.9.16/modules/es6.function.has-instance");
  require("npm:core-js@0.9.16/modules/es6.number.constructor");
  require("npm:core-js@0.9.16/modules/es6.number.statics");
  require("npm:core-js@0.9.16/modules/es6.math");
  require("npm:core-js@0.9.16/modules/es6.string.from-code-point");
  require("npm:core-js@0.9.16/modules/es6.string.raw");
  require("npm:core-js@0.9.16/modules/es6.string.iterator");
  require("npm:core-js@0.9.16/modules/es6.string.code-point-at");
  require("npm:core-js@0.9.16/modules/es6.string.ends-with");
  require("npm:core-js@0.9.16/modules/es6.string.includes");
  require("npm:core-js@0.9.16/modules/es6.string.repeat");
  require("npm:core-js@0.9.16/modules/es6.string.starts-with");
  require("npm:core-js@0.9.16/modules/es6.array.from");
  require("npm:core-js@0.9.16/modules/es6.array.of");
  require("npm:core-js@0.9.16/modules/es6.array.iterator");
  require("npm:core-js@0.9.16/modules/es6.array.species");
  require("npm:core-js@0.9.16/modules/es6.array.copy-within");
  require("npm:core-js@0.9.16/modules/es6.array.fill");
  require("npm:core-js@0.9.16/modules/es6.array.find");
  require("npm:core-js@0.9.16/modules/es6.array.find-index");
  require("npm:core-js@0.9.16/modules/es6.regexp");
  require("npm:core-js@0.9.16/modules/es6.promise");
  require("npm:core-js@0.9.16/modules/es6.map");
  require("npm:core-js@0.9.16/modules/es6.set");
  require("npm:core-js@0.9.16/modules/es6.weak-map");
  require("npm:core-js@0.9.16/modules/es6.weak-set");
  require("npm:core-js@0.9.16/modules/es6.reflect");
  require("npm:core-js@0.9.16/modules/es7.array.includes");
  require("npm:core-js@0.9.16/modules/es7.string.at");
  require("npm:core-js@0.9.16/modules/es7.string.lpad");
  require("npm:core-js@0.9.16/modules/es7.string.rpad");
  require("npm:core-js@0.9.16/modules/es7.regexp.escape");
  require("npm:core-js@0.9.16/modules/es7.object.get-own-property-descriptors");
  require("npm:core-js@0.9.16/modules/es7.object.to-array");
  require("npm:core-js@0.9.16/modules/es7.map.to-json");
  require("npm:core-js@0.9.16/modules/es7.set.to-json");
  require("npm:core-js@0.9.16/modules/js.array.statics");
  require("npm:core-js@0.9.16/modules/web.timers");
  require("npm:core-js@0.9.16/modules/web.immediate");
  require("npm:core-js@0.9.16/modules/web.dom.iterable");
  module.exports = require("npm:core-js@0.9.16/modules/$").core;
  global.define = __define;
  return module.exports;
});

System.register("github:aurelia/templating@0.12.1/index", ["github:aurelia/templating@0.12.1/html-behavior", "github:aurelia/templating@0.12.1/bindable-property", "github:aurelia/templating@0.12.1/resource-registry", "github:aurelia/templating@0.12.1/children", "github:aurelia/templating@0.12.1/element-config", "github:aurelia/templating@0.12.1/view-strategy", "github:aurelia/templating@0.12.1/view-compiler", "github:aurelia/templating@0.12.1/view-engine", "github:aurelia/templating@0.12.1/view-factory", "github:aurelia/templating@0.12.1/view-slot", "github:aurelia/templating@0.12.1/view", "github:aurelia/templating@0.12.1/binding-language", "github:aurelia/templating@0.12.1/composition-engine", "github:aurelia/templating@0.12.1/animator", "github:aurelia/templating@0.12.1/decorators"], function(_export) {
  'use strict';
  return {
    setters: [function(_htmlBehavior) {
      _export('HtmlBehaviorResource', _htmlBehavior.HtmlBehaviorResource);
    }, function(_bindableProperty) {
      _export('BindableProperty', _bindableProperty.BindableProperty);
    }, function(_resourceRegistry) {
      _export('ResourceRegistry', _resourceRegistry.ResourceRegistry);
      _export('ViewResources', _resourceRegistry.ViewResources);
    }, function(_children) {
      _export('ChildObserver', _children.ChildObserver);
    }, function(_elementConfig) {
      _export('ElementConfigResource', _elementConfig.ElementConfigResource);
    }, function(_viewStrategy) {
      _export('ViewStrategy', _viewStrategy.ViewStrategy);
      _export('UseViewStrategy', _viewStrategy.UseViewStrategy);
      _export('ConventionalViewStrategy', _viewStrategy.ConventionalViewStrategy);
      _export('NoViewStrategy', _viewStrategy.NoViewStrategy);
    }, function(_viewCompiler) {
      _export('ViewCompiler', _viewCompiler.ViewCompiler);
    }, function(_viewEngine) {
      _export('ViewEngine', _viewEngine.ViewEngine);
    }, function(_viewFactory) {
      _export('ViewFactory', _viewFactory.ViewFactory);
      _export('BoundViewFactory', _viewFactory.BoundViewFactory);
    }, function(_viewSlot) {
      _export('ViewSlot', _viewSlot.ViewSlot);
    }, function(_view) {
      _export('View', _view.View);
    }, function(_bindingLanguage) {
      _export('BindingLanguage', _bindingLanguage.BindingLanguage);
    }, function(_compositionEngine) {
      _export('CompositionEngine', _compositionEngine.CompositionEngine);
    }, function(_animator) {
      _export('Animator', _animator.Animator);
    }, function(_decorators) {
      for (var _key in _decorators) {
        _export(_key, _decorators[_key]);
      }
    }],
    execute: function() {}
  };
});

System.register("npm:core-js@0.9.16/index", ["npm:core-js@0.9.16/shim", "npm:core-js@0.9.16/modules/core.dict", "npm:core-js@0.9.16/modules/core.iter-helpers", "npm:core-js@0.9.16/modules/core.$for", "npm:core-js@0.9.16/modules/core.delay", "npm:core-js@0.9.16/modules/core.function.part", "npm:core-js@0.9.16/modules/core.object", "npm:core-js@0.9.16/modules/core.array.turn", "npm:core-js@0.9.16/modules/core.number.iterator", "npm:core-js@0.9.16/modules/core.number.math", "npm:core-js@0.9.16/modules/core.string.escape-html", "npm:core-js@0.9.16/modules/core.date", "npm:core-js@0.9.16/modules/core.global", "npm:core-js@0.9.16/modules/core.log", "npm:core-js@0.9.16/modules/$"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  require("npm:core-js@0.9.16/shim");
  require("npm:core-js@0.9.16/modules/core.dict");
  require("npm:core-js@0.9.16/modules/core.iter-helpers");
  require("npm:core-js@0.9.16/modules/core.$for");
  require("npm:core-js@0.9.16/modules/core.delay");
  require("npm:core-js@0.9.16/modules/core.function.part");
  require("npm:core-js@0.9.16/modules/core.object");
  require("npm:core-js@0.9.16/modules/core.array.turn");
  require("npm:core-js@0.9.16/modules/core.number.iterator");
  require("npm:core-js@0.9.16/modules/core.number.math");
  require("npm:core-js@0.9.16/modules/core.string.escape-html");
  require("npm:core-js@0.9.16/modules/core.date");
  require("npm:core-js@0.9.16/modules/core.global");
  require("npm:core-js@0.9.16/modules/core.log");
  module.exports = require("npm:core-js@0.9.16/modules/$").core;
  global.define = __define;
  return module.exports;
});

System.register("github:aurelia/templating@0.12.1", ["github:aurelia/templating@0.12.1/index"], function($__export) {
  return {
    setters: [function(m) {
      for (var p in m)
        $__export(p, m[p]);
    }],
    execute: function() {}
  };
});

System.register("npm:core-js@0.9.16", ["npm:core-js@0.9.16/index"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = require("npm:core-js@0.9.16/index");
  global.define = __define;
  return module.exports;
});

System.register("github:aurelia/validation@0.2.5/validation/validate-custom-attribute", ["github:aurelia/dependency-injection@0.8.1", "github:aurelia/templating@0.12.1"], function(_export) {
  var inject,
      customAttribute,
      _classCallCheck,
      ValidateCustomAttribute;
  return {
    setters: [function(_aureliaDependencyInjection) {
      inject = _aureliaDependencyInjection.inject;
    }, function(_aureliaTemplating) {
      customAttribute = _aureliaTemplating.customAttribute;
    }],
    execute: function() {
      'use strict';
      _classCallCheck = function(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError('Cannot call a class as a function');
        }
      };
      ValidateCustomAttribute = (function() {
        function ValidateCustomAttribute(element) {
          _classCallCheck(this, _ValidateCustomAttribute);
          this.element = element;
          this.processedValidation = null;
          this.viewStrategy = null;
        }
        ValidateCustomAttribute.prototype.valueChanged = function valueChanged(newValue) {
          if (this.value === null || this.value === undefined) {
            return ;
          }
          this.processedValidation = this.value;
          if (typeof this.value === 'string') {
            return ;
          } else {
            this.subscribeChangedHandlers(this.element);
          }
        };
        ValidateCustomAttribute.prototype.subscribeChangedHandlers = function subscribeChangedHandlers(currentElement) {
          var _this = this;
          this.viewStrategy = this.value.config.getViewStrategy();
          var validationProperty = this.viewStrategy.getValidationProperty(this.value, currentElement);
          if (validationProperty !== null && validationProperty !== undefined) {
            this.viewStrategy.prepareElement(validationProperty, currentElement);
            validationProperty.onValidate(function(vp) {
              _this.viewStrategy.updateElement(vp, currentElement);
            });
          }
          var children = currentElement.children;
          for (var i = 0; i < children.length; i++) {
            this.subscribeChangedHandlers(children[i]);
          }
        };
        ValidateCustomAttribute.prototype.detached = function detached() {};
        ValidateCustomAttribute.prototype.attached = function attached() {
          if (this.processedValidation === null || this.processedValidation === undefined)
            this.valueChanged(this.value);
        };
        var _ValidateCustomAttribute = ValidateCustomAttribute;
        ValidateCustomAttribute = customAttribute('validate')(ValidateCustomAttribute) || ValidateCustomAttribute;
        ValidateCustomAttribute = inject(Element)(ValidateCustomAttribute) || ValidateCustomAttribute;
        return ValidateCustomAttribute;
      })();
      _export('ValidateCustomAttribute', ValidateCustomAttribute);
    }
  };
});

System.register("github:aurelia/metadata@0.6.0/origin", ["npm:core-js@0.9.16"], function(_export) {
  'use strict';
  var core,
      originStorage,
      unknownOrigin,
      Origin;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }
  return {
    setters: [function(_coreJs) {
      core = _coreJs['default'];
    }],
    execute: function() {
      originStorage = new Map();
      unknownOrigin = Object.freeze({
        moduleId: undefined,
        moduleMember: undefined
      });
      if (!window.System) {
        window.System = {};
      }
      if (!System.forEachModule) {
        System.forEachModule = function() {};
      }
      Origin = (function() {
        function Origin(moduleId, moduleMember) {
          _classCallCheck(this, Origin);
          this.moduleId = moduleId;
          this.moduleMember = moduleMember;
        }
        Origin.get = function get(fn) {
          var origin = originStorage.get(fn);
          if (origin === undefined) {
            System.forEachModule(function(key, value) {
              for (var name in value) {
                var exp = value[name];
                if (exp === fn) {
                  originStorage.set(fn, origin = new Origin(key, name));
                  return ;
                }
              }
              if (value === fn) {
                originStorage.set(fn, origin = new Origin(key, 'default'));
                return ;
              }
            });
          }
          return origin || unknownOrigin;
        };
        Origin.set = function set(fn, origin) {
          originStorage.set(fn, origin);
        };
        return Origin;
      })();
      _export('Origin', Origin);
    }
  };
});

System.register("github:aurelia/metadata@0.6.0/index", ["github:aurelia/metadata@0.6.0/origin", "github:aurelia/metadata@0.6.0/metadata", "github:aurelia/metadata@0.6.0/decorators"], function(_export) {
  'use strict';
  return {
    setters: [function(_origin) {
      _export('Origin', _origin.Origin);
    }, function(_metadata) {
      _export('Metadata', _metadata.Metadata);
    }, function(_decorators) {
      _export('Decorators', _decorators.Decorators);
    }],
    execute: function() {}
  };
});

System.register("github:aurelia/metadata@0.6.0", ["github:aurelia/metadata@0.6.0/index"], function($__export) {
  return {
    setters: [function(m) {
      for (var p in m)
        $__export(p, m[p]);
    }],
    execute: function() {}
  };
});

System.register("github:aurelia/binding@0.7.3/index", ["github:aurelia/metadata@0.6.0", "github:aurelia/binding@0.7.3/value-converter", "github:aurelia/binding@0.7.3/class-list", "github:aurelia/binding@0.7.3/event-manager", "github:aurelia/binding@0.7.3/observer-locator", "github:aurelia/binding@0.7.3/array-change-records", "github:aurelia/binding@0.7.3/binding-modes", "github:aurelia/binding@0.7.3/parser", "github:aurelia/binding@0.7.3/binding-expression", "github:aurelia/binding@0.7.3/listener-expression", "github:aurelia/binding@0.7.3/name-expression", "github:aurelia/binding@0.7.3/call-expression", "github:aurelia/binding@0.7.3/dirty-checking", "github:aurelia/binding@0.7.3/map-change-records", "github:aurelia/binding@0.7.3/computed-observation"], function(_export) {
  'use strict';
  var Decorators,
      Metadata,
      ValueConverterResource,
      classList;
  _export('valueConverter', valueConverter);
  _export('computedFrom', computedFrom);
  function valueConverter(nameOrTarget) {
    if (nameOrTarget === undefined || typeof nameOrTarget === 'string') {
      return function(target) {
        Reflect.defineMetadata(Metadata.resource, new ValueConverterResource(nameOrTarget), target);
      };
    }
    Reflect.defineMetadata(Metadata.resource, new ValueConverterResource(), nameOrTarget);
  }
  function computedFrom() {
    for (var _len = arguments.length,
        rest = Array(_len),
        _key = 0; _key < _len; _key++) {
      rest[_key] = arguments[_key];
    }
    return function(target, key, descriptor) {
      if (descriptor.set) {
        throw new Error('The computed property "' + key + '" cannot have a setter function.');
      }
      descriptor.get.dependencies = rest;
      return descriptor;
    };
  }
  return {
    setters: [function(_aureliaMetadata) {
      Decorators = _aureliaMetadata.Decorators;
      Metadata = _aureliaMetadata.Metadata;
    }, function(_valueConverter) {
      ValueConverterResource = _valueConverter.ValueConverterResource;
      _export('ValueConverterResource', _valueConverter.ValueConverterResource);
    }, function(_classList) {
      classList = _classList;
    }, function(_eventManager) {
      _export('EventManager', _eventManager.EventManager);
    }, function(_observerLocator) {
      _export('ObserverLocator', _observerLocator.ObserverLocator);
      _export('ObjectObservationAdapter', _observerLocator.ObjectObservationAdapter);
    }, function(_arrayChangeRecords) {
      _export('calcSplices', _arrayChangeRecords.calcSplices);
    }, function(_bindingModes) {
      for (var _key2 in _bindingModes) {
        _export(_key2, _bindingModes[_key2]);
      }
    }, function(_parser) {
      _export('Parser', _parser.Parser);
    }, function(_bindingExpression) {
      _export('BindingExpression', _bindingExpression.BindingExpression);
    }, function(_listenerExpression) {
      _export('ListenerExpression', _listenerExpression.ListenerExpression);
    }, function(_nameExpression) {
      _export('NameExpression', _nameExpression.NameExpression);
    }, function(_callExpression) {
      _export('CallExpression', _callExpression.CallExpression);
    }, function(_dirtyChecking) {
      _export('DirtyChecker', _dirtyChecking.DirtyChecker);
    }, function(_mapChangeRecords) {
      _export('getChangeRecords', _mapChangeRecords.getChangeRecords);
    }, function(_computedObservation) {
      _export('ComputedPropertyObserver', _computedObservation.ComputedPropertyObserver);
      _export('declarePropertyDependencies', _computedObservation.declarePropertyDependencies);
    }],
    execute: function() {
      Decorators.configure.parameterizedDecorator('valueConverter', valueConverter);
    }
  };
});

System.register("github:aurelia/binding@0.7.3", ["github:aurelia/binding@0.7.3/index"], function($__export) {
  return {
    setters: [function(m) {
      for (var p in m)
        $__export(p, m[p]);
    }],
    execute: function() {}
  };
});

System.register("github:aurelia/validation@0.2.5/validation/validation", ["github:aurelia/binding@0.7.3", "github:aurelia/validation@0.2.5/validation/validation-rules", "github:aurelia/validation@0.2.5/validation/validation-rules-collection", "github:aurelia/validation@0.2.5/validation/validation-group", "github:aurelia/dependency-injection@0.8.1", "github:aurelia/validation@0.2.5/validation/validation-config"], function(_export) {
  var ObserverLocator,
      AllRules,
      AllCollections,
      ValidationGroup,
      inject,
      ValidationConfig,
      _classCallCheck,
      Validation;
  return {
    setters: [function(_aureliaBinding) {
      ObserverLocator = _aureliaBinding.ObserverLocator;
    }, function(_validationValidationRules) {
      AllRules = _validationValidationRules;
    }, function(_validationValidationRulesCollection) {
      AllCollections = _validationValidationRulesCollection;
    }, function(_validationValidationGroup) {
      ValidationGroup = _validationValidationGroup.ValidationGroup;
    }, function(_aureliaDependencyInjection) {
      inject = _aureliaDependencyInjection.inject;
    }, function(_validationValidationConfig) {
      ValidationConfig = _validationValidationConfig.ValidationConfig;
    }],
    execute: function() {
      'use strict';
      _classCallCheck = function(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError('Cannot call a class as a function');
        }
      };
      Validation = (function() {
        function Validation(observerLocator, validationConfig) {
          _classCallCheck(this, _Validation);
          this.observerLocator = observerLocator;
          this.config = validationConfig ? validationConfig : Validation.defaults;
        }
        Validation.prototype.on = function on(subject, configCallback) {
          var conf = new ValidationConfig(this.config);
          if (configCallback !== null && configCallback !== undefined && typeof configCallback === 'function') {
            configCallback(conf);
          }
          return new ValidationGroup(subject, this.observerLocator, conf);
        };
        Validation.prototype.onBreezeEntity = function onBreezeEntity(breezeEntity, configCallback) {
          var validation = this.on(breezeEntity, configCallback);
          validation.onBreezeEntity();
          return validation;
        };
        var _Validation = Validation;
        Validation = inject(ObserverLocator)(Validation) || Validation;
        return Validation;
      })();
      _export('Validation', Validation);
      Validation.defaults = new ValidationConfig();
    }
  };
});

System.register("github:aurelia/validation@0.2.5/index", ["github:aurelia/validation@0.2.5/validation/validation-config", "github:aurelia/validation@0.2.5/validation/validation", "github:aurelia/validation@0.2.5/validation/utilities", "github:aurelia/validation@0.2.5/validation/validation-locale", "github:aurelia/validation@0.2.5/validation/validation-result", "github:aurelia/validation@0.2.5/validation/validation-rules", "github:aurelia/validation@0.2.5/validation/validate-custom-attribute", "github:aurelia/validation@0.2.5/validation/validate-custom-attribute-view-strategy", "github:aurelia/validation@0.2.5/validation/decorators"], function(_export) {
  var ValidationConfig,
      Validation;
  _export('configure', configure);
  function configure(aurelia, configCallback) {
    aurelia.globalizeResources('./validation/validate-custom-attribute');
    if (configCallback !== undefined && typeof configCallback === 'function') {
      configCallback(Validation.defaults);
    }
    aurelia.withSingleton(ValidationConfig, Validation.defaults);
    return Validation.defaults.locale();
  }
  return {
    setters: [function(_validationValidationConfig) {
      ValidationConfig = _validationValidationConfig.ValidationConfig;
      _export('ValidationConfig', _validationValidationConfig.ValidationConfig);
    }, function(_validationValidation) {
      Validation = _validationValidation.Validation;
      _export('Validation', _validationValidation.Validation);
    }, function(_validationUtilities) {
      _export('Utilities', _validationUtilities.Utilities);
    }, function(_validationValidationLocale) {
      _export('ValidationLocale', _validationValidationLocale.ValidationLocale);
    }, function(_validationValidationResult) {
      for (var _key in _validationValidationResult) {
        _export(_key, _validationValidationResult[_key]);
      }
    }, function(_validationValidationRules) {
      for (var _key2 in _validationValidationRules) {
        _export(_key2, _validationValidationRules[_key2]);
      }
    }, function(_validationValidateCustomAttribute) {
      _export('ValidateCustomAttribute', _validationValidateCustomAttribute.ValidateCustomAttribute);
    }, function(_validationValidateCustomAttributeViewStrategy) {
      _export('ValidateCustomAttributeViewStrategy', _validationValidateCustomAttributeViewStrategy.ValidateCustomAttributeViewStrategy);
      _export('ValidateCustomAttributeViewStrategyBase', _validationValidateCustomAttributeViewStrategy.ValidateCustomAttributeViewStrategyBase);
    }, function(_validationDecorators) {
      _export('ensure', _validationDecorators.ensure);
    }],
    execute: function() {
      'use strict';
    }
  };
});

System.register("github:aurelia/validation@0.2.5", ["github:aurelia/validation@0.2.5/index"], function($__export) {
  return {
    setters: [function(m) {
      for (var p in m)
        $__export(p, m[p]);
    }],
    execute: function() {}
  };
});

System.register("github:aurelia/http-client@0.9.1/headers", [], function(_export) {
  'use strict';
  var Headers;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }
  return {
    setters: [],
    execute: function() {
      Headers = (function() {
        function Headers() {
          var headers = arguments[0] === undefined ? {} : arguments[0];
          _classCallCheck(this, Headers);
          this.headers = headers;
        }
        Headers.prototype.add = function add(key, value) {
          this.headers[key] = value;
        };
        Headers.prototype.get = function get(key) {
          return this.headers[key];
        };
        Headers.prototype.clear = function clear() {
          this.headers = {};
        };
        Headers.prototype.configureXHR = function configureXHR(xhr) {
          var headers = this.headers,
              key;
          for (key in headers) {
            xhr.setRequestHeader(key, headers[key]);
          }
        };
        Headers.parse = function parse(headerStr) {
          var headers = new Headers();
          if (!headerStr) {
            return headers;
          }
          var headerPairs = headerStr.split('\r\n');
          for (var i = 0; i < headerPairs.length; i++) {
            var headerPair = headerPairs[i];
            var index = headerPair.indexOf(': ');
            if (index > 0) {
              var key = headerPair.substring(0, index);
              var val = headerPair.substring(index + 2);
              headers.add(key, val);
            }
          }
          return headers;
        };
        return Headers;
      })();
      _export('Headers', Headers);
    }
  };
});

System.register("github:aurelia/http-client@0.9.1/http-response-message", ["github:aurelia/http-client@0.9.1/headers"], function(_export) {
  "use strict";
  var Headers,
      HttpResponseMessage,
      mimeTypes;
  var _createClass = (function() {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    return function(Constructor, protoProps, staticProps) {
      if (protoProps)
        defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        defineProperties(Constructor, staticProps);
      return Constructor;
    };
  })();
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  return {
    setters: [function(_headers) {
      Headers = _headers.Headers;
    }],
    execute: function() {
      HttpResponseMessage = (function() {
        function HttpResponseMessage(requestMessage, xhr, responseType, reviver) {
          _classCallCheck(this, HttpResponseMessage);
          this.requestMessage = requestMessage;
          this.statusCode = xhr.status;
          this.response = xhr.response || xhr.responseText;
          this.isSuccess = xhr.status >= 200 && xhr.status < 400;
          this.statusText = xhr.statusText;
          this.reviver = reviver;
          this.mimeType = null;
          if (xhr.getAllResponseHeaders) {
            try {
              this.headers = Headers.parse(xhr.getAllResponseHeaders());
            } catch (err) {
              if (xhr.requestHeaders)
                this.headers = {headers: xhr.requestHeaders};
            }
          } else {
            this.headers = new Headers();
          }
          var contentType;
          if (this.headers && this.headers.headers)
            contentType = this.headers.headers["Content-Type"];
          if (contentType) {
            this.mimeType = responseType = contentType.split(";")[0].trim();
            if (mimeTypes.hasOwnProperty(this.mimeType))
              responseType = mimeTypes[this.mimeType];
          }
          this.responseType = responseType;
        }
        _createClass(HttpResponseMessage, [{
          key: "content",
          get: function() {
            try {
              if (this._content !== undefined) {
                return this._content;
              }
              if (this.response === undefined || this.response === null) {
                return this._content = this.response;
              }
              if (this.responseType === "json") {
                return this._content = JSON.parse(this.response, this.reviver);
              }
              if (this.reviver) {
                return this._content = this.reviver(this.response);
              }
              return this._content = this.response;
            } catch (e) {
              if (this.isSuccess) {
                throw e;
              }
              return this._content = null;
            }
          }
        }]);
        return HttpResponseMessage;
      })();
      _export("HttpResponseMessage", HttpResponseMessage);
      mimeTypes = {
        "text/html": "html",
        "text/javascript": "js",
        "application/javascript": "js",
        "text/json": "json",
        "application/json": "json",
        "application/rss+xml": "rss",
        "application/atom+xml": "atom",
        "application/xhtml+xml": "xhtml",
        "text/markdown": "md",
        "text/xml": "xml",
        "text/mathml": "mml",
        "application/xml": "xml",
        "text/yml": "yml",
        "text/csv": "csv",
        "text/css": "css",
        "text/less": "less",
        "text/stylus": "styl",
        "text/scss": "scss",
        "text/sass": "sass",
        "text/plain": "txt"
      };
      _export("mimeTypes", mimeTypes);
    }
  };
});

System.register("github:aurelia/http-client@0.9.1/transformers", [], function(_export) {
  'use strict';
  _export('timeoutTransformer', timeoutTransformer);
  _export('callbackParameterNameTransformer', callbackParameterNameTransformer);
  _export('credentialsTransformer', credentialsTransformer);
  _export('progressTransformer', progressTransformer);
  _export('responseTypeTransformer', responseTypeTransformer);
  _export('headerTransformer', headerTransformer);
  _export('contentTransformer', contentTransformer);
  function timeoutTransformer(client, processor, message, xhr) {
    if (message.timeout !== undefined) {
      xhr.timeout = message.timeout;
    }
  }
  function callbackParameterNameTransformer(client, processor, message, xhr) {
    if (message.callbackParameterName !== undefined) {
      xhr.callbackParameterName = message.callbackParameterName;
    }
  }
  function credentialsTransformer(client, processor, message, xhr) {
    if (message.withCredentials !== undefined) {
      xhr.withCredentials = message.withCredentials;
    }
  }
  function progressTransformer(client, processor, message, xhr) {
    if (message.progressCallback) {
      xhr.upload.onprogress = message.progressCallback;
    }
  }
  function responseTypeTransformer(client, processor, message, xhr) {
    var responseType = message.responseType;
    if (responseType === 'json') {
      responseType = 'text';
    }
    xhr.responseType = responseType;
  }
  function headerTransformer(client, processor, message, xhr) {
    message.headers.configureXHR(xhr);
  }
  function contentTransformer(client, processor, message, xhr) {
    if (window.FormData && message.content instanceof FormData) {
      return ;
    }
    if (window.Blob && message.content instanceof Blob) {
      return ;
    }
    if (window.ArrayBufferView && message.content instanceof ArrayBufferView) {
      return ;
    }
    if (message.content instanceof Document) {
      return ;
    }
    if (typeof message.content === 'string') {
      return ;
    }
    if (message.content === null || message.content === undefined) {
      return ;
    }
    message.content = JSON.stringify(message.content, message.replacer);
    if (message.headers.get('Content-Type') === undefined) {
      message.headers.add('Content-Type', 'application/json');
    }
  }
  return {
    setters: [],
    execute: function() {}
  };
});

System.register("github:aurelia/http-client@0.9.1/jsonp-request-message", ["github:aurelia/http-client@0.9.1/headers", "github:aurelia/http-client@0.9.1/request-message-processor", "github:aurelia/http-client@0.9.1/transformers"], function(_export) {
  'use strict';
  var Headers,
      RequestMessageProcessor,
      timeoutTransformer,
      callbackParameterNameTransformer,
      JSONPRequestMessage,
      JSONPXHR;
  _export('createJSONPRequestMessageProcessor', createJSONPRequestMessageProcessor);
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }
  function createJSONPRequestMessageProcessor() {
    return new RequestMessageProcessor(JSONPXHR, [timeoutTransformer, callbackParameterNameTransformer]);
  }
  return {
    setters: [function(_headers) {
      Headers = _headers.Headers;
    }, function(_requestMessageProcessor) {
      RequestMessageProcessor = _requestMessageProcessor.RequestMessageProcessor;
    }, function(_transformers) {
      timeoutTransformer = _transformers.timeoutTransformer;
      callbackParameterNameTransformer = _transformers.callbackParameterNameTransformer;
    }],
    execute: function() {
      JSONPRequestMessage = function JSONPRequestMessage(url, callbackParameterName) {
        _classCallCheck(this, JSONPRequestMessage);
        this.method = 'JSONP';
        this.url = url;
        this.content = undefined;
        this.headers = new Headers();
        this.responseType = 'jsonp';
        this.callbackParameterName = callbackParameterName;
      };
      _export('JSONPRequestMessage', JSONPRequestMessage);
      JSONPXHR = (function() {
        function JSONPXHR() {
          _classCallCheck(this, JSONPXHR);
        }
        JSONPXHR.prototype.open = function open(method, url) {
          this.method = method;
          this.url = url;
          this.callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
        };
        JSONPXHR.prototype.send = function send() {
          var _this = this;
          var url = this.url + (this.url.indexOf('?') >= 0 ? '&' : '?') + encodeURIComponent(this.callbackParameterName) + '=' + this.callbackName;
          var script = document.createElement('script');
          script.src = url;
          script.onerror = function(e) {
            cleanUp();
            _this.status = 0;
            _this.onerror(new Error('error'));
          };
          var cleanUp = function cleanUp() {
            delete window[_this.callbackName];
            document.body.removeChild(script);
          };
          window[this.callbackName] = function(data) {
            cleanUp();
            if (_this.status === undefined) {
              _this.status = 200;
              _this.statusText = 'OK';
              _this.response = data;
              _this.onload(_this);
            }
          };
          document.body.appendChild(script);
          if (this.timeout !== undefined) {
            setTimeout(function() {
              if (_this.status === undefined) {
                _this.status = 0;
                _this.ontimeout(new Error('timeout'));
              }
            }, this.timeout);
          }
        };
        JSONPXHR.prototype.abort = function abort() {
          if (this.status === undefined) {
            this.status = 0;
            this.onabort(new Error('abort'));
          }
        };
        JSONPXHR.prototype.setRequestHeader = function setRequestHeader() {};
        return JSONPXHR;
      })();
    }
  };
});

System.register("github:aurelia/http-client@0.9.1/request-message-processor", ["npm:core-js@0.9.16", "github:aurelia/http-client@0.9.1/http-response-message", "github:aurelia/path@0.7.0"], function(_export) {
  'use strict';
  var core,
      HttpResponseMessage,
      join,
      buildQueryString,
      RequestMessageProcessor;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }
  function buildFullUrl(message) {
    var url = join(message.baseUrl, message.url),
        qs;
    if (message.params) {
      qs = buildQueryString(message.params);
      url = qs ? '' + url + '?' + qs : url;
    }
    message.fullUrl = url;
  }
  return {
    setters: [function(_coreJs) {
      core = _coreJs['default'];
    }, function(_httpResponseMessage) {
      HttpResponseMessage = _httpResponseMessage.HttpResponseMessage;
    }, function(_aureliaPath) {
      join = _aureliaPath.join;
      buildQueryString = _aureliaPath.buildQueryString;
    }],
    execute: function() {
      RequestMessageProcessor = (function() {
        function RequestMessageProcessor(xhrType, transformers) {
          _classCallCheck(this, RequestMessageProcessor);
          this.XHRType = xhrType;
          this.transformers = transformers;
          this.isAborted = false;
        }
        RequestMessageProcessor.prototype.abort = function abort() {
          if (this.xhr && this.xhr.readyState !== XMLHttpRequest.UNSENT) {
            this.xhr.abort();
          }
          this.isAborted = true;
        };
        RequestMessageProcessor.prototype.process = function process(client, message) {
          var _this = this;
          var promise = new Promise(function(resolve, reject) {
            var xhr = _this.xhr = new _this.XHRType(),
                transformers = _this.transformers,
                i,
                ii;
            buildFullUrl(message);
            xhr.open(message.method, message.fullUrl, true);
            for (i = 0, ii = transformers.length; i < ii; ++i) {
              transformers[i](client, _this, message, xhr);
            }
            xhr.onload = function(e) {
              var response = new HttpResponseMessage(message, xhr, message.responseType, message.reviver);
              if (response.isSuccess) {
                resolve(response);
              } else {
                reject(response);
              }
            };
            xhr.ontimeout = function(e) {
              reject(new HttpResponseMessage(message, {
                response: e,
                status: xhr.status,
                statusText: xhr.statusText
              }, 'timeout'));
            };
            xhr.onerror = function(e) {
              reject(new HttpResponseMessage(message, {
                response: e,
                status: xhr.status,
                statusText: xhr.statusText
              }, 'error'));
            };
            xhr.onabort = function(e) {
              reject(new HttpResponseMessage(message, {
                response: e,
                status: xhr.status,
                statusText: xhr.statusText
              }, 'abort'));
            };
          });
          return Promise.resolve(message).then(function(message) {
            var processRequest = function processRequest() {
              if (_this.isAborted) {
                _this.xhr.abort();
              } else {
                _this.xhr.send(message.content);
              }
              return promise;
            };
            var chain = [[processRequest, undefined]];
            var interceptors = message.interceptors || [];
            interceptors.forEach(function(interceptor) {
              if (interceptor.request || interceptor.requestError) {
                chain.unshift([interceptor.request ? interceptor.request.bind(interceptor) : undefined, interceptor.requestError ? interceptor.requestError.bind(interceptor) : undefined]);
              }
              if (interceptor.response || interceptor.responseError) {
                chain.push([interceptor.response ? interceptor.response.bind(interceptor) : undefined, interceptor.responseError ? interceptor.responseError.bind(interceptor) : undefined]);
              }
            });
            var interceptorsPromise = Promise.resolve(message);
            while (chain.length) {
              interceptorsPromise = interceptorsPromise.then.apply(interceptorsPromise, chain.shift());
            }
            return interceptorsPromise;
          });
        };
        return RequestMessageProcessor;
      })();
      _export('RequestMessageProcessor', RequestMessageProcessor);
    }
  };
});

System.register("github:aurelia/http-client@0.9.1/http-request-message", ["github:aurelia/http-client@0.9.1/headers", "github:aurelia/http-client@0.9.1/request-message-processor", "github:aurelia/http-client@0.9.1/transformers"], function(_export) {
  'use strict';
  var Headers,
      RequestMessageProcessor,
      timeoutTransformer,
      credentialsTransformer,
      progressTransformer,
      responseTypeTransformer,
      headerTransformer,
      contentTransformer,
      HttpRequestMessage;
  _export('createHttpRequestMessageProcessor', createHttpRequestMessageProcessor);
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }
  function createHttpRequestMessageProcessor() {
    return new RequestMessageProcessor(XMLHttpRequest, [timeoutTransformer, credentialsTransformer, progressTransformer, responseTypeTransformer, contentTransformer, headerTransformer]);
  }
  return {
    setters: [function(_headers) {
      Headers = _headers.Headers;
    }, function(_requestMessageProcessor) {
      RequestMessageProcessor = _requestMessageProcessor.RequestMessageProcessor;
    }, function(_transformers) {
      timeoutTransformer = _transformers.timeoutTransformer;
      credentialsTransformer = _transformers.credentialsTransformer;
      progressTransformer = _transformers.progressTransformer;
      responseTypeTransformer = _transformers.responseTypeTransformer;
      headerTransformer = _transformers.headerTransformer;
      contentTransformer = _transformers.contentTransformer;
    }],
    execute: function() {
      HttpRequestMessage = function HttpRequestMessage(method, url, content, headers) {
        _classCallCheck(this, HttpRequestMessage);
        this.method = method;
        this.url = url;
        this.content = content;
        this.headers = headers || new Headers();
        this.responseType = 'json';
      };
      _export('HttpRequestMessage', HttpRequestMessage);
    }
  };
});

System.register("github:aurelia/http-client@0.9.1/request-builder", ["github:aurelia/path@0.7.0", "github:aurelia/http-client@0.9.1/http-request-message", "github:aurelia/http-client@0.9.1/jsonp-request-message"], function(_export) {
  'use strict';
  var join,
      HttpRequestMessage,
      JSONPRequestMessage,
      RequestBuilder;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }
  return {
    setters: [function(_aureliaPath) {
      join = _aureliaPath.join;
    }, function(_httpRequestMessage) {
      HttpRequestMessage = _httpRequestMessage.HttpRequestMessage;
    }, function(_jsonpRequestMessage) {
      JSONPRequestMessage = _jsonpRequestMessage.JSONPRequestMessage;
    }],
    execute: function() {
      RequestBuilder = (function() {
        function RequestBuilder(client) {
          _classCallCheck(this, RequestBuilder);
          this.client = client;
          this.transformers = client.requestTransformers.slice(0);
          this.useJsonp = false;
        }
        RequestBuilder.addHelper = function addHelper(name, fn) {
          RequestBuilder.prototype[name] = function() {
            this.transformers.push(fn.apply(this, arguments));
            return this;
          };
        };
        RequestBuilder.prototype.send = function send() {
          var message = this.useJsonp ? new JSONPRequestMessage() : new HttpRequestMessage();
          return this.client.send(message, this.transformers);
        };
        return RequestBuilder;
      })();
      _export('RequestBuilder', RequestBuilder);
      RequestBuilder.addHelper('asDelete', function() {
        return function(client, processor, message) {
          message.method = 'DELETE';
        };
      });
      RequestBuilder.addHelper('asGet', function() {
        return function(client, processor, message) {
          message.method = 'GET';
        };
      });
      RequestBuilder.addHelper('asHead', function() {
        return function(client, processor, message) {
          message.method = 'HEAD';
        };
      });
      RequestBuilder.addHelper('asOptions', function() {
        return function(client, processor, message) {
          message.method = 'OPTIONS';
        };
      });
      RequestBuilder.addHelper('asPatch', function() {
        return function(client, processor, message) {
          message.method = 'PATCH';
        };
      });
      RequestBuilder.addHelper('asPost', function() {
        return function(client, processor, message) {
          message.method = 'POST';
        };
      });
      RequestBuilder.addHelper('asPut', function() {
        return function(client, processor, message) {
          message.method = 'PUT';
        };
      });
      RequestBuilder.addHelper('asJsonp', function(callbackParameterName) {
        this.useJsonp = true;
        return function(client, processor, message) {
          message.callbackParameterName = callbackParameterName;
        };
      });
      RequestBuilder.addHelper('withUrl', function(url) {
        return function(client, processor, message) {
          message.url = url;
        };
      });
      RequestBuilder.addHelper('withContent', function(content) {
        return function(client, processor, message) {
          message.content = content;
        };
      });
      RequestBuilder.addHelper('withBaseUrl', function(baseUrl) {
        return function(client, processor, message) {
          message.baseUrl = baseUrl;
        };
      });
      RequestBuilder.addHelper('withParams', function(params) {
        return function(client, processor, message) {
          message.params = params;
        };
      });
      RequestBuilder.addHelper('withResponseType', function(responseType) {
        return function(client, processor, message) {
          message.responseType = responseType;
        };
      });
      RequestBuilder.addHelper('withTimeout', function(timeout) {
        return function(client, processor, message) {
          message.timeout = timeout;
        };
      });
      RequestBuilder.addHelper('withHeader', function(key, value) {
        return function(client, processor, message) {
          message.headers.add(key, value);
        };
      });
      RequestBuilder.addHelper('withCredentials', function(value) {
        return function(client, processor, message) {
          message.withCredentials = value;
        };
      });
      RequestBuilder.addHelper('withReviver', function(reviver) {
        return function(client, processor, message) {
          message.reviver = reviver;
        };
      });
      RequestBuilder.addHelper('withReplacer', function(replacer) {
        return function(client, processor, message) {
          message.replacer = replacer;
        };
      });
      RequestBuilder.addHelper('withProgressCallback', function(progressCallback) {
        return function(client, processor, message) {
          message.progressCallback = progressCallback;
        };
      });
      RequestBuilder.addHelper('withCallbackParameterName', function(callbackParameterName) {
        return function(client, processor, message) {
          message.callbackParameterName = callbackParameterName;
        };
      });
      RequestBuilder.addHelper('withInterceptor', function(interceptor) {
        return function(client, processor, message) {
          message.interceptors = message.interceptors || [];
          message.interceptors.unshift(interceptor);
        };
      });
    }
  };
});

System.register("github:aurelia/http-client@0.9.1/http-client", ["npm:core-js@0.9.16", "github:aurelia/http-client@0.9.1/headers", "github:aurelia/http-client@0.9.1/request-builder", "github:aurelia/http-client@0.9.1/http-request-message", "github:aurelia/http-client@0.9.1/jsonp-request-message"], function(_export) {
  'use strict';
  var core,
      Headers,
      RequestBuilder,
      HttpRequestMessage,
      createHttpRequestMessageProcessor,
      JSONPRequestMessage,
      createJSONPRequestMessageProcessor,
      HttpClient;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }
  function trackRequestStart(client, processor) {
    client.pendingRequests.push(processor);
    client.isRequesting = true;
  }
  function trackRequestEnd(client, processor) {
    var index = client.pendingRequests.indexOf(processor);
    client.pendingRequests.splice(index, 1);
    client.isRequesting = client.pendingRequests.length > 0;
    if (!client.isRequesting) {
      var evt = new window.CustomEvent('aurelia-http-client-requests-drained', {
        bubbles: true,
        cancelable: true
      });
      setTimeout(function() {
        return document.dispatchEvent(evt);
      }, 1);
    }
  }
  return {
    setters: [function(_coreJs) {
      core = _coreJs['default'];
    }, function(_headers) {
      Headers = _headers.Headers;
    }, function(_requestBuilder) {
      RequestBuilder = _requestBuilder.RequestBuilder;
    }, function(_httpRequestMessage) {
      HttpRequestMessage = _httpRequestMessage.HttpRequestMessage;
      createHttpRequestMessageProcessor = _httpRequestMessage.createHttpRequestMessageProcessor;
    }, function(_jsonpRequestMessage) {
      JSONPRequestMessage = _jsonpRequestMessage.JSONPRequestMessage;
      createJSONPRequestMessageProcessor = _jsonpRequestMessage.createJSONPRequestMessageProcessor;
    }],
    execute: function() {
      HttpClient = (function() {
        function HttpClient() {
          _classCallCheck(this, HttpClient);
          this.requestTransformers = [];
          this.requestProcessorFactories = new Map();
          this.requestProcessorFactories.set(HttpRequestMessage, createHttpRequestMessageProcessor);
          this.requestProcessorFactories.set(JSONPRequestMessage, createJSONPRequestMessageProcessor);
          this.pendingRequests = [];
          this.isRequesting = false;
        }
        HttpClient.prototype.configure = function configure(fn) {
          var builder = new RequestBuilder(this);
          fn(builder);
          this.requestTransformers = builder.transformers;
          return this;
        };
        HttpClient.prototype.createRequest = function createRequest(url) {
          var builder = new RequestBuilder(this);
          if (url) {
            builder.withUrl(url);
          }
          return builder;
        };
        HttpClient.prototype.send = function send(message, transformers) {
          var _this = this;
          var createProcessor = this.requestProcessorFactories.get(message.constructor),
              processor,
              promise,
              i,
              ii,
              processRequest;
          if (!createProcessor) {
            throw new Error('No request message processor factory for ' + message.constructor + '.');
          }
          processor = createProcessor();
          trackRequestStart(this, processor);
          transformers = transformers || this.requestTransformers;
          promise = Promise.resolve(message).then(function(message) {
            for (i = 0, ii = transformers.length; i < ii; ++i) {
              transformers[i](_this, processor, message);
            }
            return processor.process(_this, message).then(function(response) {
              trackRequestEnd(_this, processor);
              return response;
            })['catch'](function(response) {
              trackRequestEnd(_this, processor);
              throw response;
            });
          });
          promise.abort = promise.cancel = function() {
            processor.abort();
          };
          return promise;
        };
        HttpClient.prototype['delete'] = function _delete(url) {
          return this.createRequest(url).asDelete().send();
        };
        HttpClient.prototype.get = function get(url) {
          return this.createRequest(url).asGet().send();
        };
        HttpClient.prototype.head = function head(url) {
          return this.createRequest(url).asHead().send();
        };
        HttpClient.prototype.jsonp = function jsonp(url) {
          var callbackParameterName = arguments[1] === undefined ? 'jsoncallback' : arguments[1];
          return this.createRequest(url).asJsonp(callbackParameterName).send();
        };
        HttpClient.prototype.options = function options(url) {
          return this.createRequest(url).asOptions().send();
        };
        HttpClient.prototype.put = function put(url, content) {
          return this.createRequest(url).asPut().withContent(content).send();
        };
        HttpClient.prototype.patch = function patch(url, content) {
          return this.createRequest(url).asPatch().withContent(content).send();
        };
        HttpClient.prototype.post = function post(url, content) {
          return this.createRequest(url).asPost().withContent(content).send();
        };
        return HttpClient;
      })();
      _export('HttpClient', HttpClient);
    }
  };
});

System.register("github:aurelia/http-client@0.9.1/index", ["github:aurelia/http-client@0.9.1/http-client", "github:aurelia/http-client@0.9.1/http-request-message", "github:aurelia/http-client@0.9.1/http-response-message", "github:aurelia/http-client@0.9.1/jsonp-request-message", "github:aurelia/http-client@0.9.1/headers", "github:aurelia/http-client@0.9.1/request-builder"], function(_export) {
  'use strict';
  return {
    setters: [function(_httpClient) {
      _export('HttpClient', _httpClient.HttpClient);
    }, function(_httpRequestMessage) {
      _export('HttpRequestMessage', _httpRequestMessage.HttpRequestMessage);
    }, function(_httpResponseMessage) {
      _export('HttpResponseMessage', _httpResponseMessage.HttpResponseMessage);
      _export('mimeTypes', _httpResponseMessage.mimeTypes);
    }, function(_jsonpRequestMessage) {
      _export('JSONPRequestMessage', _jsonpRequestMessage.JSONPRequestMessage);
    }, function(_headers) {
      _export('Headers', _headers.Headers);
    }, function(_requestBuilder) {
      _export('RequestBuilder', _requestBuilder.RequestBuilder);
    }],
    execute: function() {}
  };
});

System.register("github:aurelia/http-client@0.9.1", ["github:aurelia/http-client@0.9.1/index"], function($__export) {
  return {
    setters: [function(m) {
      for (var p in m)
        $__export(p, m[p]);
    }],
    execute: function() {}
  };
});

System.register("github:aurelia/route-recognizer@0.5.0/state", [], function(_export) {
  'use strict';
  var State;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }
  return {
    setters: [],
    execute: function() {
      State = (function() {
        function State(charSpec) {
          _classCallCheck(this, State);
          this.charSpec = charSpec;
          this.nextStates = [];
        }
        State.prototype.get = function get(charSpec) {
          for (var _iterator = this.nextStates,
              _isArray = Array.isArray(_iterator),
              _i = 0,
              _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ; ) {
            var _ref;
            if (_isArray) {
              if (_i >= _iterator.length)
                break;
              _ref = _iterator[_i++];
            } else {
              _i = _iterator.next();
              if (_i.done)
                break;
              _ref = _i.value;
            }
            var child = _ref;
            var isEqual = child.charSpec.validChars === charSpec.validChars && child.charSpec.invalidChars === charSpec.invalidChars;
            if (isEqual) {
              return child;
            }
          }
        };
        State.prototype.put = function put(charSpec) {
          var state = this.get(charSpec);
          if (state) {
            return state;
          }
          state = new State(charSpec);
          this.nextStates.push(state);
          if (charSpec.repeat) {
            state.nextStates.push(state);
          }
          return state;
        };
        State.prototype.match = function match(ch) {
          var nextStates = this.nextStates,
              results = [],
              child,
              charSpec,
              chars;
          for (var i = 0,
              l = nextStates.length; i < l; i++) {
            child = nextStates[i];
            charSpec = child.charSpec;
            if (typeof(chars = charSpec.validChars) !== 'undefined') {
              if (chars.indexOf(ch) !== -1) {
                results.push(child);
              }
            } else if (typeof(chars = charSpec.invalidChars) !== 'undefined') {
              if (chars.indexOf(ch) === -1) {
                results.push(child);
              }
            }
          }
          return results;
        };
        return State;
      })();
      _export('State', State);
      ;
    }
  };
});

System.register("github:aurelia/route-recognizer@0.5.0/segments", [], function(_export) {
  'use strict';
  var specials,
      escapeRegex,
      StaticSegment,
      DynamicSegment,
      StarSegment,
      EpsilonSegment;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }
  return {
    setters: [],
    execute: function() {
      specials = ['/', '.', '*', '+', '?', '|', '(', ')', '[', ']', '{', '}', '\\'];
      escapeRegex = new RegExp('(\\' + specials.join('|\\') + ')', 'g');
      StaticSegment = (function() {
        function StaticSegment(string) {
          _classCallCheck(this, StaticSegment);
          this.string = string;
        }
        StaticSegment.prototype.eachChar = function eachChar(callback) {
          for (var _iterator = this.string,
              _isArray = Array.isArray(_iterator),
              _i = 0,
              _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ; ) {
            var _ref;
            if (_isArray) {
              if (_i >= _iterator.length)
                break;
              _ref = _iterator[_i++];
            } else {
              _i = _iterator.next();
              if (_i.done)
                break;
              _ref = _i.value;
            }
            var ch = _ref;
            callback({validChars: ch});
          }
        };
        StaticSegment.prototype.regex = function regex() {
          return this.string.replace(escapeRegex, '\\$1');
        };
        StaticSegment.prototype.generate = function generate() {
          return this.string;
        };
        return StaticSegment;
      })();
      _export('StaticSegment', StaticSegment);
      DynamicSegment = (function() {
        function DynamicSegment(name) {
          _classCallCheck(this, DynamicSegment);
          this.name = name;
        }
        DynamicSegment.prototype.eachChar = function eachChar(callback) {
          callback({
            invalidChars: '/',
            repeat: true
          });
        };
        DynamicSegment.prototype.regex = function regex() {
          return '([^/]+)';
        };
        DynamicSegment.prototype.generate = function generate(params, consumed) {
          consumed[this.name] = true;
          return params[this.name];
        };
        return DynamicSegment;
      })();
      _export('DynamicSegment', DynamicSegment);
      StarSegment = (function() {
        function StarSegment(name) {
          _classCallCheck(this, StarSegment);
          this.name = name;
        }
        StarSegment.prototype.eachChar = function eachChar(callback) {
          callback({
            invalidChars: '',
            repeat: true
          });
        };
        StarSegment.prototype.regex = function regex() {
          return '(.+)';
        };
        StarSegment.prototype.generate = function generate(params, consumed) {
          consumed[this.name] = true;
          return params[this.name];
        };
        return StarSegment;
      })();
      _export('StarSegment', StarSegment);
      EpsilonSegment = (function() {
        function EpsilonSegment() {
          _classCallCheck(this, EpsilonSegment);
        }
        EpsilonSegment.prototype.eachChar = function eachChar() {};
        EpsilonSegment.prototype.regex = function regex() {
          return '';
        };
        EpsilonSegment.prototype.generate = function generate() {
          return '';
        };
        return EpsilonSegment;
      })();
      _export('EpsilonSegment', EpsilonSegment);
    }
  };
});

System.register("github:aurelia/router@0.9.0/navigation-commands", ["npm:core-js@0.9.16"], function(_export) {
  'use strict';
  var core,
      Redirect;
  _export('isNavigationCommand', isNavigationCommand);
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }
  function isNavigationCommand(obj) {
    return obj && typeof obj.navigate === 'function';
  }
  return {
    setters: [function(_coreJs) {
      core = _coreJs['default'];
    }],
    execute: function() {
      Redirect = (function() {
        function Redirect(url, options) {
          _classCallCheck(this, Redirect);
          this.url = url;
          this.options = Object.assign({
            trigger: true,
            replace: true
          }, options || {});
          this.shouldContinueProcessing = false;
        }
        Redirect.prototype.setRouter = function setRouter(router) {
          this.router = router;
        };
        Redirect.prototype.navigate = function navigate(appRouter) {
          var navigatingRouter = this.options.useAppRouter ? appRouter : this.router || appRouter;
          navigatingRouter.navigate(this.url, this.options);
        };
        return Redirect;
      })();
      _export('Redirect', Redirect);
    }
  };
});

System.register("github:aurelia/router@0.9.0/util", [], function(_export) {
  'use strict';
  var isRootedPath,
      isAbsoluteUrl;
  _export('processPotential', processPotential);
  _export('normalizeAbsolutePath', normalizeAbsolutePath);
  _export('createRootedPath', createRootedPath);
  _export('resolveUrl', resolveUrl);
  function processPotential(obj, resolve, reject) {
    if (obj && typeof obj.then === 'function') {
      var dfd = obj.then(resolve);
      if (typeof dfd['catch'] === 'function') {
        return dfd['catch'](reject);
      } else if (typeof dfd.fail === 'function') {
        return dfd.fail(reject);
      }
      return dfd;
    } else {
      try {
        return resolve(obj);
      } catch (error) {
        return reject(error);
      }
    }
  }
  function normalizeAbsolutePath(path, hasPushState) {
    if (!hasPushState && path[0] !== '#') {
      path = '#' + path;
    }
    return path;
  }
  function createRootedPath(fragment, baseUrl, hasPushState) {
    if (isAbsoluteUrl.test(fragment)) {
      return fragment;
    }
    var path = '';
    if (baseUrl.length && baseUrl[0] !== '/') {
      path += '/';
    }
    path += baseUrl;
    if ((!path.length || path[path.length - 1] != '/') && fragment[0] != '/') {
      path += '/';
    }
    if (path.length && path[path.length - 1] == '/' && fragment[0] == '/') {
      path = path.substring(0, path.length - 1);
    }
    return normalizeAbsolutePath(path + fragment, hasPushState);
  }
  function resolveUrl(fragment, baseUrl, hasPushState) {
    if (isRootedPath.test(fragment)) {
      return normalizeAbsolutePath(fragment, hasPushState);
    } else {
      return createRootedPath(fragment, baseUrl, hasPushState);
    }
  }
  return {
    setters: [],
    execute: function() {
      isRootedPath = /^#?\//;
      isAbsoluteUrl = /^([a-z][a-z0-9+\-.]*:)?\/\//i;
    }
  };
});

System.register("github:aurelia/router@0.9.0/navigation-instruction", ["npm:core-js@0.9.16"], function(_export) {
  'use strict';
  var core,
      NavigationInstruction;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }
  return {
    setters: [function(_coreJs) {
      core = _coreJs['default'];
    }],
    execute: function() {
      NavigationInstruction = (function() {
        function NavigationInstruction(fragment, queryString, params, queryParams, config, parentInstruction) {
          _classCallCheck(this, NavigationInstruction);
          this.fragment = fragment;
          this.queryString = queryString;
          this.params = params || {};
          this.queryParams = queryParams;
          this.config = config;
          this.viewPortInstructions = {};
          this.parentInstruction = parentInstruction;
          var ancestorParams = [];
          var current = this;
          do {
            var currentParams = Object.assign({}, current.params);
            if (current.config.hasChildRouter) {
              delete currentParams[current.getWildCardName()];
            }
            ancestorParams.unshift(currentParams);
            current = current.parentInstruction;
          } while (current);
          var allParams = Object.assign.apply(Object, [{}, queryParams].concat(ancestorParams));
          this.lifecycleArgs = [allParams, config, this];
        }
        NavigationInstruction.prototype.addViewPortInstruction = function addViewPortInstruction(viewPortName, strategy, moduleId, component) {
          return this.viewPortInstructions[viewPortName] = {
            name: viewPortName,
            strategy: strategy,
            moduleId: moduleId,
            component: component,
            childRouter: component.childRouter,
            lifecycleArgs: this.lifecycleArgs.slice()
          };
        };
        NavigationInstruction.prototype.getWildCardName = function getWildCardName() {
          var wildcardIndex = this.config.route.lastIndexOf('*');
          return this.config.route.substr(wildcardIndex + 1);
        };
        NavigationInstruction.prototype.getWildcardPath = function getWildcardPath() {
          var wildcardName = this.getWildCardName();
          var path = this.params[wildcardName] || '';
          if (this.queryString) {
            path += '?' + this.queryString;
          }
          return path;
        };
        NavigationInstruction.prototype.getBaseUrl = function getBaseUrl() {
          if (!this.params) {
            return this.fragment;
          }
          var wildcardName = this.getWildCardName();
          var path = this.params[wildcardName] || '';
          if (!path) {
            return this.fragment;
          }
          return this.fragment.substr(0, this.fragment.lastIndexOf(path));
        };
        return NavigationInstruction;
      })();
      _export('NavigationInstruction', NavigationInstruction);
    }
  };
});

System.register("github:aurelia/router@0.9.0/nav-model", [], function(_export) {
  "use strict";
  var NavModel;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  return {
    setters: [],
    execute: function() {
      NavModel = (function() {
        function NavModel(router, relativeHref) {
          _classCallCheck(this, NavModel);
          this.router = router;
          this.relativeHref = relativeHref;
          this.isActive = false;
          this.title = null;
          this.href = null;
          this.settings = {};
          this.config = null;
        }
        NavModel.prototype.setTitle = function setTitle(title) {
          this.title = title;
          if (this.isActive) {
            this.router.updateTitle();
          }
        };
        return NavModel;
      })();
      _export("NavModel", NavModel);
    }
  };
});

System.register("github:aurelia/history@0.5.0/index", [], function(_export) {
  'use strict';
  var History;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }
  return {
    setters: [],
    execute: function() {
      History = (function() {
        function History() {
          _classCallCheck(this, History);
        }
        History.prototype.activate = function activate() {
          throw new Error('History must implement activate().');
        };
        History.prototype.deactivate = function deactivate() {
          throw new Error('History must implement deactivate().');
        };
        History.prototype.navigate = function navigate() {
          throw new Error('History must implement navigate().');
        };
        History.prototype.navigateBack = function navigateBack() {
          throw new Error('History must implement navigateBack().');
        };
        return History;
      })();
      _export('History', History);
    }
  };
});

System.register("github:aurelia/router@0.9.0/pipeline", ["npm:core-js@0.9.16"], function(_export) {
  'use strict';
  var core,
      pipelineStatus,
      Pipeline;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }
  function createResult(ctx, next) {
    return {
      status: next.status,
      context: ctx,
      output: next.output,
      completed: next.status == pipelineStatus.completed
    };
  }
  return {
    setters: [function(_coreJs) {
      core = _coreJs['default'];
    }],
    execute: function() {
      pipelineStatus = {
        completed: 'completed',
        cancelled: 'cancelled',
        rejected: 'rejected',
        running: 'running'
      };
      _export('pipelineStatus', pipelineStatus);
      Pipeline = (function() {
        function Pipeline() {
          _classCallCheck(this, Pipeline);
          this.steps = [];
        }
        Pipeline.prototype.withStep = function withStep(step) {
          var run,
              steps,
              i,
              l;
          if (typeof step == 'function') {
            run = step;
          } else if (step.isMultiStep) {
            steps = step.getSteps();
            for (i = 0, l = steps.length; i < l; i++) {
              this.withStep(steps[i]);
            }
            return this;
          } else {
            run = step.run.bind(step);
          }
          this.steps.push(run);
          return this;
        };
        Pipeline.prototype.run = function run(ctx) {
          var index = -1,
              steps = this.steps,
              next,
              currentStep;
          next = function() {
            index++;
            if (index < steps.length) {
              currentStep = steps[index];
              try {
                return currentStep(ctx, next);
              } catch (e) {
                return next.reject(e);
              }
            } else {
              return next.complete();
            }
          };
          next.complete = function(output) {
            next.status = pipelineStatus.completed;
            next.output = output;
            return Promise.resolve(createResult(ctx, next));
          };
          next.cancel = function(reason) {
            next.status = pipelineStatus.cancelled;
            next.output = reason;
            return Promise.resolve(createResult(ctx, next));
          };
          next.reject = function(error) {
            next.status = pipelineStatus.rejected;
            next.output = error;
            return Promise.resolve(createResult(ctx, next));
          };
          next.status = pipelineStatus.running;
          return next();
        };
        return Pipeline;
      })();
      _export('Pipeline', Pipeline);
    }
  };
});

System.register("github:aurelia/router@0.9.0/route-loading", ["github:aurelia/router@0.9.0/navigation-plan", "github:aurelia/router@0.9.0/router-configuration"], function(_export) {
  'use strict';
  var activationStrategy,
      buildNavigationPlan,
      RouterConfiguration,
      RouteLoader,
      LoadRouteStep;
  _export('loadNewRoute', loadNewRoute);
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }
  function loadNewRoute(routeLoader, navigationContext) {
    var toLoad = determineWhatToLoad(navigationContext);
    var loadPromises = toLoad.map(function(current) {
      return loadRoute(routeLoader, current.navigationContext, current.viewPortPlan);
    });
    return Promise.all(loadPromises);
  }
  function determineWhatToLoad(navigationContext, toLoad) {
    var plan = navigationContext.plan;
    var next = navigationContext.nextInstruction;
    toLoad = toLoad || [];
    for (var viewPortName in plan) {
      var viewPortPlan = plan[viewPortName];
      if (viewPortPlan.strategy == activationStrategy.replace) {
        toLoad.push({
          viewPortPlan: viewPortPlan,
          navigationContext: navigationContext
        });
        if (viewPortPlan.childNavigationContext) {
          determineWhatToLoad(viewPortPlan.childNavigationContext, toLoad);
        }
      } else {
        var viewPortInstruction = next.addViewPortInstruction(viewPortName, viewPortPlan.strategy, viewPortPlan.prevModuleId, viewPortPlan.prevComponent);
        if (viewPortPlan.childNavigationContext) {
          viewPortInstruction.childNavigationContext = viewPortPlan.childNavigationContext;
          determineWhatToLoad(viewPortPlan.childNavigationContext, toLoad);
        }
      }
    }
    return toLoad;
  }
  function loadRoute(routeLoader, navigationContext, viewPortPlan) {
    var moduleId = viewPortPlan.config.moduleId;
    var next = navigationContext.nextInstruction;
    return loadComponent(routeLoader, navigationContext, viewPortPlan.config).then(function(component) {
      var viewPortInstruction = next.addViewPortInstruction(viewPortPlan.name, viewPortPlan.strategy, moduleId, component);
      var controller = component.executionContext,
          childRouter = component.childRouter;
      if (childRouter) {
        var path = next.getWildcardPath();
        return childRouter.createNavigationInstruction(path, next).then(function(childInstruction) {
          var childNavigationContext = childRouter.createNavigationContext(childInstruction);
          viewPortPlan.childNavigationContext = childNavigationContext;
          return buildNavigationPlan(childNavigationContext).then(function(childPlan) {
            childNavigationContext.plan = childPlan;
            viewPortInstruction.childNavigationContext = childNavigationContext;
            return loadNewRoute(routeLoader, childNavigationContext);
          });
        });
      }
    });
  }
  function loadComponent(routeLoader, navigationContext, config) {
    var router = navigationContext.router,
        lifecycleArgs = navigationContext.nextInstruction.lifecycleArgs;
    return routeLoader.loadRoute(router, config).then(function(component) {
      component.router = router;
      component.config = config;
      if ('configureRouter' in component.executionContext) {
        var _component$executionContext;
        component.childRouter = component.childContainer.getChildRouter();
        var config = new RouterConfiguration();
        var result = Promise.resolve((_component$executionContext = component.executionContext).configureRouter.apply(_component$executionContext, [config, component.childRouter].concat(lifecycleArgs)));
        return result.then(function() {
          component.childRouter.configure(config);
          return component;
        });
      }
      return component;
    });
  }
  return {
    setters: [function(_navigationPlan) {
      activationStrategy = _navigationPlan.activationStrategy;
      buildNavigationPlan = _navigationPlan.buildNavigationPlan;
    }, function(_routerConfiguration) {
      RouterConfiguration = _routerConfiguration.RouterConfiguration;
    }],
    execute: function() {
      RouteLoader = (function() {
        function RouteLoader() {
          _classCallCheck(this, RouteLoader);
        }
        RouteLoader.prototype.loadRoute = function loadRoute(router, config) {
          throw Error('Route loaders must implment "loadRoute(router, config)".');
        };
        return RouteLoader;
      })();
      _export('RouteLoader', RouteLoader);
      LoadRouteStep = (function() {
        function LoadRouteStep(routeLoader) {
          _classCallCheck(this, LoadRouteStep);
          this.routeLoader = routeLoader;
        }
        LoadRouteStep.inject = function inject() {
          return [RouteLoader];
        };
        LoadRouteStep.prototype.run = function run(navigationContext, next) {
          return loadNewRoute(this.routeLoader, navigationContext).then(next)['catch'](next.cancel);
        };
        return LoadRouteStep;
      })();
      _export('LoadRouteStep', LoadRouteStep);
    }
  };
});

System.register("github:aurelia/router@0.9.0/activation", ["github:aurelia/router@0.9.0/navigation-plan", "github:aurelia/router@0.9.0/navigation-commands", "github:aurelia/router@0.9.0/util"], function(_export) {
  'use strict';
  var activationStrategy,
      isNavigationCommand,
      processPotential,
      affirmations,
      CanDeactivatePreviousStep,
      CanActivateNextStep,
      DeactivatePreviousStep,
      ActivateNextStep;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }
  function processDeactivatable(plan, callbackName, next, ignoreResult) {
    var infos = findDeactivatable(plan, callbackName),
        i = infos.length;
    function inspect(val) {
      if (ignoreResult || shouldContinue(val)) {
        return iterate();
      } else {
        return next.cancel(val);
      }
    }
    function iterate() {
      if (i--) {
        try {
          var controller = infos[i];
          var result = controller[callbackName]();
          return processPotential(result, inspect, next.cancel);
        } catch (error) {
          return next.cancel(error);
        }
      } else {
        return next();
      }
    }
    return iterate();
  }
  function findDeactivatable(plan, callbackName, list) {
    list = list || [];
    for (var viewPortName in plan) {
      var viewPortPlan = plan[viewPortName];
      var prevComponent = viewPortPlan.prevComponent;
      if ((viewPortPlan.strategy == activationStrategy.invokeLifecycle || viewPortPlan.strategy == activationStrategy.replace) && prevComponent) {
        var controller = prevComponent.executionContext;
        if (callbackName in controller) {
          list.push(controller);
        }
      }
      if (viewPortPlan.childNavigationContext) {
        findDeactivatable(viewPortPlan.childNavigationContext.plan, callbackName, list);
      } else if (prevComponent) {
        addPreviousDeactivatable(prevComponent, callbackName, list);
      }
    }
    return list;
  }
  function addPreviousDeactivatable(component, callbackName, list) {
    var controller = component.executionContext,
        childRouter = component.childRouter;
    if (childRouter && childRouter.currentInstruction) {
      var viewPortInstructions = childRouter.currentInstruction.viewPortInstructions;
      for (var viewPortName in viewPortInstructions) {
        var viewPortInstruction = viewPortInstructions[viewPortName];
        var prevComponent = viewPortInstruction.component;
        var prevController = prevComponent.executionContext;
        if (callbackName in prevController) {
          list.push(prevController);
        }
        addPreviousDeactivatable(prevComponent, callbackName, list);
      }
    }
  }
  function processActivatable(navigationContext, callbackName, next, ignoreResult) {
    var infos = findActivatable(navigationContext, callbackName),
        length = infos.length,
        i = -1;
    function inspect(val, router) {
      if (ignoreResult || shouldContinue(val, router)) {
        return iterate();
      } else {
        return next.cancel(val);
      }
    }
    function iterate() {
      i++;
      if (i < length) {
        try {
          var _current$controller;
          var current = infos[i];
          var result = (_current$controller = current.controller)[callbackName].apply(_current$controller, current.lifecycleArgs);
          return processPotential(result, function(val) {
            return inspect(val, current.router);
          }, next.cancel);
        } catch (error) {
          return next.cancel(error);
        }
      } else {
        return next();
      }
    }
    return iterate();
  }
  function findActivatable(navigationContext, callbackName, list, router) {
    var plan = navigationContext.plan;
    var next = navigationContext.nextInstruction;
    list = list || [];
    Object.keys(plan).filter(function(viewPortName) {
      var viewPortPlan = plan[viewPortName];
      var viewPortInstruction = next.viewPortInstructions[viewPortName];
      var controller = viewPortInstruction.component.executionContext;
      if ((viewPortPlan.strategy === activationStrategy.invokeLifecycle || viewPortPlan.strategy === activationStrategy.replace) && callbackName in controller) {
        list.push({
          controller: controller,
          lifecycleArgs: viewPortInstruction.lifecycleArgs,
          router: router
        });
      }
      if (viewPortPlan.childNavigationContext) {
        findActivatable(viewPortPlan.childNavigationContext, callbackName, list, viewPortInstruction.component.childRouter || router);
      }
    });
    return list;
  }
  function shouldContinue(output, router) {
    if (output instanceof Error) {
      return false;
    }
    if (isNavigationCommand(output)) {
      if (typeof output.setRouter === 'function') {
        output.setRouter(router);
      }
      return !!output.shouldContinueProcessing;
    }
    if (typeof output === 'string') {
      return affirmations.indexOf(output.toLowerCase()) !== -1;
    }
    if (typeof output === 'undefined') {
      return true;
    }
    return output;
  }
  return {
    setters: [function(_navigationPlan) {
      activationStrategy = _navigationPlan.activationStrategy;
    }, function(_navigationCommands) {
      isNavigationCommand = _navigationCommands.isNavigationCommand;
    }, function(_util) {
      processPotential = _util.processPotential;
    }],
    execute: function() {
      affirmations = ['yes', 'ok', 'true'];
      _export('affirmations', affirmations);
      CanDeactivatePreviousStep = (function() {
        function CanDeactivatePreviousStep() {
          _classCallCheck(this, CanDeactivatePreviousStep);
        }
        CanDeactivatePreviousStep.prototype.run = function run(navigationContext, next) {
          return processDeactivatable(navigationContext.plan, 'canDeactivate', next);
        };
        return CanDeactivatePreviousStep;
      })();
      _export('CanDeactivatePreviousStep', CanDeactivatePreviousStep);
      CanActivateNextStep = (function() {
        function CanActivateNextStep() {
          _classCallCheck(this, CanActivateNextStep);
        }
        CanActivateNextStep.prototype.run = function run(navigationContext, next) {
          return processActivatable(navigationContext, 'canActivate', next);
        };
        return CanActivateNextStep;
      })();
      _export('CanActivateNextStep', CanActivateNextStep);
      DeactivatePreviousStep = (function() {
        function DeactivatePreviousStep() {
          _classCallCheck(this, DeactivatePreviousStep);
        }
        DeactivatePreviousStep.prototype.run = function run(navigationContext, next) {
          return processDeactivatable(navigationContext.plan, 'deactivate', next, true);
        };
        return DeactivatePreviousStep;
      })();
      _export('DeactivatePreviousStep', DeactivatePreviousStep);
      ActivateNextStep = (function() {
        function ActivateNextStep() {
          _classCallCheck(this, ActivateNextStep);
        }
        ActivateNextStep.prototype.run = function run(navigationContext, next) {
          return processActivatable(navigationContext, 'activate', next, true);
        };
        return ActivateNextStep;
      })();
      _export('ActivateNextStep', ActivateNextStep);
    }
  };
});

System.register("github:aurelia/event-aggregator@0.5.0/index", ["github:aurelia/logging@0.5.0"], function(_export) {
  'use strict';
  var LogManager,
      logger,
      Handler,
      EventAggregator;
  _export('includeEventsIn', includeEventsIn);
  _export('configure', configure);
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }
  function executeHandler(handler) {
    try {
      handler();
    } catch (e) {
      logger.error(e);
    }
  }
  function includeEventsIn(obj) {
    var ea = new EventAggregator();
    obj.subscribeOnce = function(event, callback) {
      return ea.subscribeOnce(event, callback);
    };
    obj.subscribe = function(event, callback) {
      return ea.subscribe(event, callback);
    };
    obj.publish = function(event, data) {
      ea.publish(event, data);
    };
    return ea;
  }
  function configure(aurelia) {
    aurelia.withInstance(EventAggregator, includeEventsIn(aurelia));
  }
  return {
    setters: [function(_aureliaLogging) {
      LogManager = _aureliaLogging;
    }],
    execute: function() {
      logger = LogManager.getLogger('event-aggregator');
      Handler = (function() {
        function Handler(messageType, callback) {
          _classCallCheck(this, Handler);
          this.messageType = messageType;
          this.callback = callback;
        }
        Handler.prototype.handle = function handle(message) {
          var _this = this;
          if (message instanceof this.messageType) {
            executeHandler(function() {
              return _this.callback.call(null, message);
            });
          }
        };
        return Handler;
      })();
      EventAggregator = (function() {
        function EventAggregator() {
          _classCallCheck(this, EventAggregator);
          this.eventLookup = {};
          this.messageHandlers = [];
        }
        EventAggregator.prototype.publish = function publish(event, data) {
          var subscribers,
              i;
          if (typeof event === 'string') {
            subscribers = this.eventLookup[event];
            if (subscribers) {
              subscribers = subscribers.slice();
              i = subscribers.length;
              while (i--) {
                executeHandler(function() {
                  return subscribers[i](data, event);
                });
              }
            }
          } else {
            subscribers = this.messageHandlers.slice();
            i = subscribers.length;
            while (i--) {
              subscribers[i].handle(event);
            }
          }
        };
        EventAggregator.prototype.subscribe = function subscribe(event, callback) {
          var subscribers,
              handler;
          if (typeof event === 'string') {
            subscribers = this.eventLookup[event] || (this.eventLookup[event] = []);
            subscribers.push(callback);
            return function() {
              var idx = subscribers.indexOf(callback);
              if (idx != -1) {
                subscribers.splice(idx, 1);
              }
            };
          } else {
            handler = new Handler(event, callback);
            subscribers = this.messageHandlers;
            subscribers.push(handler);
            return function() {
              var idx = subscribers.indexOf(handler);
              if (idx != -1) {
                subscribers.splice(idx, 1);
              }
            };
          }
        };
        EventAggregator.prototype.subscribeOnce = function subscribeOnce(event, callback) {
          var sub = this.subscribe(event, function(data, event) {
            sub();
            return callback(data, event);
          });
          return sub;
        };
        return EventAggregator;
      })();
      _export('EventAggregator', EventAggregator);
    }
  };
});

System.register("github:aurelia/route-recognizer@0.5.0/index", ["npm:core-js@0.9.16", "github:aurelia/route-recognizer@0.5.0/state", "github:aurelia/route-recognizer@0.5.0/segments"], function(_export) {
  'use strict';
  var core,
      State,
      StaticSegment,
      DynamicSegment,
      StarSegment,
      EpsilonSegment,
      RouteRecognizer,
      RecognizeResults;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }
  function parse(route, names, types) {
    if (route.charAt(0) === '/') {
      route = route.substr(1);
    }
    var results = [];
    for (var _iterator3 = route.split('/'),
        _isArray3 = Array.isArray(_iterator3),
        _i3 = 0,
        _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator](); ; ) {
      var _ref3;
      if (_isArray3) {
        if (_i3 >= _iterator3.length)
          break;
        _ref3 = _iterator3[_i3++];
      } else {
        _i3 = _iterator3.next();
        if (_i3.done)
          break;
        _ref3 = _i3.value;
      }
      var segment = _ref3;
      var match = undefined;
      if (match = segment.match(/^:([^\/]+)$/)) {
        results.push(new DynamicSegment(match[1]));
        names.push(match[1]);
        types.dynamics++;
      } else if (match = segment.match(/^\*([^\/]+)$/)) {
        results.push(new StarSegment(match[1]));
        names.push(match[1]);
        types.stars++;
      } else if (segment === '') {
        results.push(new EpsilonSegment());
      } else {
        results.push(new StaticSegment(segment));
        types.statics++;
      }
    }
    return results;
  }
  function sortSolutions(states) {
    return states.sort(function(a, b) {
      if (a.types.stars !== b.types.stars) {
        return a.types.stars - b.types.stars;
      }
      if (a.types.stars) {
        if (a.types.statics !== b.types.statics) {
          return b.types.statics - a.types.statics;
        }
        if (a.types.dynamics !== b.types.dynamics) {
          return b.types.dynamics - a.types.dynamics;
        }
      }
      if (a.types.dynamics !== b.types.dynamics) {
        return a.types.dynamics - b.types.dynamics;
      }
      if (a.types.statics !== b.types.statics) {
        return b.types.statics - a.types.statics;
      }
      return 0;
    });
  }
  function recognizeChar(states, ch) {
    var nextStates = [];
    for (var i = 0,
        l = states.length; i < l; i++) {
      var state = states[i];
      nextStates = nextStates.concat(state.match(ch));
    }
    return nextStates;
  }
  function findHandler(state, path, queryParams) {
    var handlers = state.handlers,
        regex = state.regex;
    var captures = path.match(regex),
        currentCapture = 1;
    var result = new RecognizeResults(queryParams);
    for (var i = 0,
        l = handlers.length; i < l; i++) {
      var handler = handlers[i],
          names = handler.names,
          params = {};
      for (var j = 0,
          m = names.length; j < m; j++) {
        params[names[j]] = captures[currentCapture++];
      }
      result.push({
        handler: handler.handler,
        params: params,
        isDynamic: !!names.length
      });
    }
    return result;
  }
  function addSegment(currentState, segment) {
    segment.eachChar(function(ch) {
      currentState = currentState.put(ch);
    });
    return currentState;
  }
  return {
    setters: [function(_coreJs) {
      core = _coreJs['default'];
    }, function(_state) {
      State = _state.State;
    }, function(_segments) {
      StaticSegment = _segments.StaticSegment;
      DynamicSegment = _segments.DynamicSegment;
      StarSegment = _segments.StarSegment;
      EpsilonSegment = _segments.EpsilonSegment;
    }],
    execute: function() {
      RouteRecognizer = (function() {
        function RouteRecognizer() {
          _classCallCheck(this, RouteRecognizer);
          this.rootState = new State();
          this.names = {};
        }
        RouteRecognizer.prototype.add = function add(route) {
          if (Array.isArray(route)) {
            for (var _iterator = route,
                _isArray = Array.isArray(_iterator),
                _i = 0,
                _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ; ) {
              var _ref;
              if (_isArray) {
                if (_i >= _iterator.length)
                  break;
                _ref = _iterator[_i++];
              } else {
                _i = _iterator.next();
                if (_i.done)
                  break;
                _ref = _i.value;
              }
              var r = _ref;
              this.add(r);
            }
            return ;
          }
          var currentState = this.rootState,
              regex = '^',
              types = {
                statics: 0,
                dynamics: 0,
                stars: 0
              },
              names = [],
              routeName = route.handler.name,
              isEmpty = true;
          var segments = parse(route.path, names, types);
          for (var _iterator2 = segments,
              _isArray2 = Array.isArray(_iterator2),
              _i2 = 0,
              _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator](); ; ) {
            var _ref2;
            if (_isArray2) {
              if (_i2 >= _iterator2.length)
                break;
              _ref2 = _iterator2[_i2++];
            } else {
              _i2 = _iterator2.next();
              if (_i2.done)
                break;
              _ref2 = _i2.value;
            }
            var segment = _ref2;
            if (segment instanceof EpsilonSegment) {
              continue;
            }
            isEmpty = false;
            currentState = currentState.put({validChars: '/'});
            regex += '/';
            currentState = addSegment(currentState, segment);
            regex += segment.regex();
          }
          if (isEmpty) {
            currentState = currentState.put({validChars: '/'});
            regex += '/';
          }
          var handlers = [{
            handler: route.handler,
            names: names
          }];
          if (routeName) {
            this.names[routeName] = {
              segments: segments,
              handlers: handlers
            };
          }
          currentState.handlers = handlers;
          currentState.regex = new RegExp(regex + '$');
          currentState.types = types;
          return currentState;
        };
        RouteRecognizer.prototype.handlersFor = function handlersFor(name) {
          var route = this.names[name],
              result = [];
          if (!route) {
            throw new Error('There is no route named ' + name);
          }
          for (var i = 0,
              l = route.handlers.length; i < l; i++) {
            result.push(route.handlers[i]);
          }
          return result;
        };
        RouteRecognizer.prototype.hasRoute = function hasRoute(name) {
          return !!this.names[name];
        };
        RouteRecognizer.prototype.generate = function generate(name, params) {
          params = Object.assign({}, params);
          var route = this.names[name],
              consumed = {},
              output = '';
          if (!route) {
            throw new Error('There is no route named ' + name);
          }
          var segments = route.segments;
          for (var i = 0,
              l = segments.length; i < l; i++) {
            var segment = segments[i];
            if (segment instanceof EpsilonSegment) {
              continue;
            }
            output += '/';
            var segmentValue = segment.generate(params, consumed);
            if (segmentValue === null || segmentValue === undefined) {
              throw new Error('A value is required for route parameter \'' + segment.name + '\' in route \'' + name + '\'.');
            }
            output += segmentValue;
          }
          if (output.charAt(0) !== '/') {
            output = '/' + output;
          }
          for (var param in consumed) {
            delete params[param];
          }
          output += this.generateQueryString(params);
          return output;
        };
        RouteRecognizer.prototype.generateQueryString = function generateQueryString(params) {
          var pairs = [],
              keys = [],
              encode = encodeURIComponent,
              encodeKey = function encodeKey(k) {
                return encode(k).replace('%24', '$');
              };
          for (var key in params) {
            if (params.hasOwnProperty(key)) {
              keys.push(key);
            }
          }
          keys.sort();
          for (var i = 0,
              len = keys.length; i < len; i++) {
            key = keys[i];
            var value = params[key];
            if (value === null || value === undefined) {
              continue;
            }
            if (Array.isArray(value)) {
              var arrayKey = '' + encodeKey(key) + '[]';
              for (var j = 0,
                  l = value.length; j < l; j++) {
                pairs.push('' + arrayKey + '=' + encode(value[j]));
              }
            } else {
              pairs.push('' + encodeKey(key) + '=' + encode(value));
            }
          }
          if (pairs.length === 0) {
            return '';
          }
          return '?' + pairs.join('&');
        };
        RouteRecognizer.prototype.parseQueryString = function parseQueryString(queryString) {
          var queryParams = {};
          if (!queryString || typeof queryString !== 'string') {
            return queryParams;
          }
          if (queryString.charAt(0) === '?') {
            queryString = queryString.substr(1);
          }
          var pairs = queryString.split('&');
          for (var i = 0; i < pairs.length; i++) {
            var pair = pairs[i].split('='),
                key = decodeURIComponent(pair[0]),
                keyLength = key.length,
                isArray = false,
                value;
            if (!key) {
              continue;
            } else if (pair.length === 1) {
              value = true;
            } else {
              if (keyLength > 2 && key.slice(keyLength - 2) === '[]') {
                isArray = true;
                key = key.slice(0, keyLength - 2);
                if (!queryParams[key]) {
                  queryParams[key] = [];
                }
              }
              value = pair[1] ? decodeURIComponent(pair[1]) : '';
            }
            if (isArray) {
              queryParams[key].push(value);
            } else {
              queryParams[key] = value;
            }
          }
          return queryParams;
        };
        RouteRecognizer.prototype.recognize = function recognize(path) {
          var states = [this.rootState],
              pathLen,
              i,
              l,
              queryStart,
              queryParams = {},
              isSlashDropped = false;
          queryStart = path.indexOf('?');
          if (queryStart !== -1) {
            var queryString = path.substr(queryStart + 1, path.length);
            path = path.substr(0, queryStart);
            queryParams = this.parseQueryString(queryString);
          }
          path = decodeURI(path);
          if (path.charAt(0) !== '/') {
            path = '/' + path;
          }
          pathLen = path.length;
          if (pathLen > 1 && path.charAt(pathLen - 1) === '/') {
            path = path.substr(0, pathLen - 1);
            isSlashDropped = true;
          }
          for (i = 0, l = path.length; i < l; i++) {
            states = recognizeChar(states, path.charAt(i));
            if (!states.length) {
              break;
            }
          }
          var solutions = [];
          for (i = 0, l = states.length; i < l; i++) {
            if (states[i].handlers) {
              solutions.push(states[i]);
            }
          }
          states = sortSolutions(solutions);
          var state = solutions[0];
          if (state && state.handlers) {
            if (isSlashDropped && state.regex.source.slice(-5) === '(.+)$') {
              path = path + '/';
            }
            return findHandler(state, path, queryParams);
          }
        };
        return RouteRecognizer;
      })();
      _export('RouteRecognizer', RouteRecognizer);
      RecognizeResults = function RecognizeResults(queryParams) {
        _classCallCheck(this, RecognizeResults);
        this.splice = Array.prototype.splice;
        this.slice = Array.prototype.slice;
        this.push = Array.prototype.push;
        this.length = 0;
        this.queryParams = queryParams || {};
      };
    }
  };
});

System.register("github:aurelia/router@0.9.0/navigation-plan", ["github:aurelia/router@0.9.0/navigation-commands", "github:aurelia/router@0.9.0/util"], function(_export) {
  'use strict';
  var Redirect,
      resolveUrl,
      activationStrategy,
      BuildNavigationPlanStep;
  _export('buildNavigationPlan', buildNavigationPlan);
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }
  function buildNavigationPlan(navigationContext, forceLifecycleMinimum) {
    var prev = navigationContext.prevInstruction;
    var next = navigationContext.nextInstruction;
    var plan = {},
        viewPortName;
    if ('redirect' in next.config) {
      var redirectLocation = resolveUrl(next.config.redirect, getInstructionBaseUrl(next));
      if (next.queryString) {
        redirectLocation += '?' + next.queryString;
      }
      return Promise.reject(new Redirect(redirectLocation));
    }
    if (prev) {
      var newParams = hasDifferentParameterValues(prev, next);
      var pending = [];
      for (viewPortName in prev.viewPortInstructions) {
        var prevViewPortInstruction = prev.viewPortInstructions[viewPortName];
        var nextViewPortConfig = next.config.viewPorts[viewPortName];
        var viewPortPlan = plan[viewPortName] = {
          name: viewPortName,
          config: nextViewPortConfig,
          prevComponent: prevViewPortInstruction.component,
          prevModuleId: prevViewPortInstruction.moduleId
        };
        if (prevViewPortInstruction.moduleId != nextViewPortConfig.moduleId) {
          viewPortPlan.strategy = activationStrategy.replace;
        } else if ('determineActivationStrategy' in prevViewPortInstruction.component.executionContext) {
          var _prevViewPortInstruction$component$executionContext;
          viewPortPlan.strategy = (_prevViewPortInstruction$component$executionContext = prevViewPortInstruction.component.executionContext).determineActivationStrategy.apply(_prevViewPortInstruction$component$executionContext, next.lifecycleArgs);
        } else if (newParams || forceLifecycleMinimum) {
          viewPortPlan.strategy = activationStrategy.invokeLifecycle;
        } else {
          viewPortPlan.strategy = activationStrategy.noChange;
        }
        if (viewPortPlan.strategy !== activationStrategy.replace && prevViewPortInstruction.childRouter) {
          var path = next.getWildcardPath();
          var task = prevViewPortInstruction.childRouter.createNavigationInstruction(path, next).then(function(childInstruction) {
            viewPortPlan.childNavigationContext = prevViewPortInstruction.childRouter.createNavigationContext(childInstruction);
            return buildNavigationPlan(viewPortPlan.childNavigationContext, viewPortPlan.strategy == activationStrategy.invokeLifecycle).then(function(childPlan) {
              viewPortPlan.childNavigationContext.plan = childPlan;
            });
          });
          pending.push(task);
        }
      }
      return Promise.all(pending).then(function() {
        return plan;
      });
    } else {
      for (viewPortName in next.config.viewPorts) {
        plan[viewPortName] = {
          name: viewPortName,
          strategy: activationStrategy.replace,
          config: next.config.viewPorts[viewPortName]
        };
      }
      return Promise.resolve(plan);
    }
  }
  function hasDifferentParameterValues(prev, next) {
    var prevParams = prev.params,
        nextParams = next.params,
        nextWildCardName = next.config.hasChildRouter ? next.getWildCardName() : null;
    for (var key in nextParams) {
      if (key === nextWildCardName) {
        continue;
      }
      if (prevParams[key] !== nextParams[key]) {
        return true;
      }
    }
    for (var key in prevParams) {
      if (key === nextWildCardName) {
        continue;
      }
      if (prevParams[key] !== nextParams[key]) {
        return true;
      }
    }
    return false;
  }
  function getInstructionBaseUrl(instruction) {
    var instructionBaseUrlParts = [];
    while (instruction = instruction.parentInstruction) {
      instructionBaseUrlParts.unshift(instruction.getBaseUrl());
    }
    instructionBaseUrlParts.unshift('/');
    return instructionBaseUrlParts.join('');
  }
  return {
    setters: [function(_navigationCommands) {
      Redirect = _navigationCommands.Redirect;
    }, function(_util) {
      resolveUrl = _util.resolveUrl;
    }],
    execute: function() {
      activationStrategy = {
        noChange: 'no-change',
        invokeLifecycle: 'invoke-lifecycle',
        replace: 'replace'
      };
      _export('activationStrategy', activationStrategy);
      BuildNavigationPlanStep = (function() {
        function BuildNavigationPlanStep() {
          _classCallCheck(this, BuildNavigationPlanStep);
        }
        BuildNavigationPlanStep.prototype.run = function run(navigationContext, next) {
          return buildNavigationPlan(navigationContext).then(function(plan) {
            navigationContext.plan = plan;
            return next();
          })['catch'](next.cancel);
        };
        return BuildNavigationPlanStep;
      })();
      _export('BuildNavigationPlanStep', BuildNavigationPlanStep);
    }
  };
});

System.register("github:aurelia/history@0.5.0", ["github:aurelia/history@0.5.0/index"], function($__export) {
  return {
    setters: [function(m) {
      for (var p in m)
        $__export(p, m[p]);
    }],
    execute: function() {}
  };
});

System.register("github:aurelia/router@0.9.0/pipeline-provider", ["github:aurelia/dependency-injection@0.8.1", "github:aurelia/router@0.9.0/pipeline", "github:aurelia/router@0.9.0/navigation-plan", "github:aurelia/router@0.9.0/route-loading", "github:aurelia/router@0.9.0/navigation-context", "github:aurelia/router@0.9.0/activation", "github:aurelia/router@0.9.0/route-filters"], function(_export) {
  'use strict';
  var Container,
      Pipeline,
      BuildNavigationPlanStep,
      LoadRouteStep,
      CommitChangesStep,
      CanDeactivatePreviousStep,
      CanActivateNextStep,
      DeactivatePreviousStep,
      ActivateNextStep,
      createRouteFilterStep,
      PipelineProvider;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }
  return {
    setters: [function(_aureliaDependencyInjection) {
      Container = _aureliaDependencyInjection.Container;
    }, function(_pipeline) {
      Pipeline = _pipeline.Pipeline;
    }, function(_navigationPlan) {
      BuildNavigationPlanStep = _navigationPlan.BuildNavigationPlanStep;
    }, function(_routeLoading) {
      LoadRouteStep = _routeLoading.LoadRouteStep;
    }, function(_navigationContext) {
      CommitChangesStep = _navigationContext.CommitChangesStep;
    }, function(_activation) {
      CanDeactivatePreviousStep = _activation.CanDeactivatePreviousStep;
      CanActivateNextStep = _activation.CanActivateNextStep;
      DeactivatePreviousStep = _activation.DeactivatePreviousStep;
      ActivateNextStep = _activation.ActivateNextStep;
    }, function(_routeFilters) {
      createRouteFilterStep = _routeFilters.createRouteFilterStep;
    }],
    execute: function() {
      PipelineProvider = (function() {
        function PipelineProvider(container) {
          _classCallCheck(this, PipelineProvider);
          this.container = container;
          this.steps = [BuildNavigationPlanStep, CanDeactivatePreviousStep, LoadRouteStep, createRouteFilterStep('authorize'), createRouteFilterStep('modelbind'), CanActivateNextStep, DeactivatePreviousStep, ActivateNextStep, createRouteFilterStep('precommit'), CommitChangesStep];
        }
        PipelineProvider.inject = function inject() {
          return [Container];
        };
        PipelineProvider.prototype.createPipeline = function createPipeline(navigationContext) {
          var _this = this;
          var pipeline = new Pipeline();
          this.steps.forEach(function(step) {
            return pipeline.withStep(_this.container.get(step));
          });
          return pipeline;
        };
        return PipelineProvider;
      })();
      _export('PipelineProvider', PipelineProvider);
    }
  };
});

System.register("github:aurelia/event-aggregator@0.5.0", ["github:aurelia/event-aggregator@0.5.0/index"], function($__export) {
  return {
    setters: [function(m) {
      for (var p in m)
        $__export(p, m[p]);
    }],
    execute: function() {}
  };
});

System.register("github:aurelia/route-recognizer@0.5.0", ["github:aurelia/route-recognizer@0.5.0/index"], function($__export) {
  return {
    setters: [function(m) {
      for (var p in m)
        $__export(p, m[p]);
    }],
    execute: function() {}
  };
});

System.register("github:aurelia/router@0.9.0/navigation-context", ["github:aurelia/router@0.9.0/navigation-plan"], function(_export) {
  'use strict';
  var activationStrategy,
      NavigationContext,
      CommitChangesStep;
  var _createClass = (function() {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ('value' in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    return function(Constructor, protoProps, staticProps) {
      if (protoProps)
        defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        defineProperties(Constructor, staticProps);
      return Constructor;
    };
  })();
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }
  return {
    setters: [function(_navigationPlan) {
      activationStrategy = _navigationPlan.activationStrategy;
    }],
    execute: function() {
      NavigationContext = (function() {
        function NavigationContext(router, nextInstruction) {
          _classCallCheck(this, NavigationContext);
          this.router = router;
          this.nextInstruction = nextInstruction;
          this.currentInstruction = router.currentInstruction;
          this.prevInstruction = router.currentInstruction;
        }
        NavigationContext.prototype.getAllContexts = function getAllContexts() {
          var acc = arguments[0] === undefined ? [] : arguments[0];
          acc.push(this);
          if (this.plan) {
            for (var key in this.plan) {
              this.plan[key].childNavigationContext && this.plan[key].childNavigationContext.getAllContexts(acc);
            }
          }
          return acc;
        };
        NavigationContext.prototype.commitChanges = function commitChanges(waitToSwap) {
          var next = this.nextInstruction,
              prev = this.prevInstruction,
              viewPortInstructions = next.viewPortInstructions,
              router = this.router,
              loads = [],
              delaySwaps = [];
          router.currentInstruction = next;
          if (prev) {
            prev.config.navModel.isActive = false;
          }
          next.config.navModel.isActive = true;
          router.refreshBaseUrl();
          router.refreshNavigation();
          for (var viewPortName in viewPortInstructions) {
            var viewPortInstruction = viewPortInstructions[viewPortName];
            var viewPort = router.viewPorts[viewPortName];
            if (!viewPort) {
              throw new Error('There was no router-view found in the view for ' + viewPortInstruction.moduleId + '.');
            }
            if (viewPortInstruction.strategy === activationStrategy.replace) {
              if (waitToSwap) {
                delaySwaps.push({
                  viewPort: viewPort,
                  viewPortInstruction: viewPortInstruction
                });
              }
              loads.push(viewPort.process(viewPortInstruction, waitToSwap).then(function(x) {
                if ('childNavigationContext' in viewPortInstruction) {
                  return viewPortInstruction.childNavigationContext.commitChanges();
                }
              }));
            } else {
              if ('childNavigationContext' in viewPortInstruction) {
                loads.push(viewPortInstruction.childNavigationContext.commitChanges(waitToSwap));
              }
            }
          }
          return Promise.all(loads).then(function() {
            delaySwaps.forEach(function(x) {
              return x.viewPort.swap(x.viewPortInstruction);
            });
          });
        };
        NavigationContext.prototype.updateTitle = function updateTitle() {
          var title = this.buildTitle();
          if (title) {
            document.title = title;
          }
        };
        NavigationContext.prototype.buildTitle = function buildTitle() {
          var separator = arguments[0] === undefined ? ' | ' : arguments[0];
          var next = this.nextInstruction,
              title = next.config.navModel.title || '',
              viewPortInstructions = next.viewPortInstructions,
              childTitles = [];
          for (var viewPortName in viewPortInstructions) {
            var viewPortInstruction = viewPortInstructions[viewPortName];
            if ('childNavigationContext' in viewPortInstruction) {
              var childTitle = viewPortInstruction.childNavigationContext.buildTitle(separator);
              if (childTitle) {
                childTitles.push(childTitle);
              }
            }
          }
          if (childTitles.length) {
            title = childTitles.join(separator) + (title ? separator : '') + title;
          }
          if (this.router.title) {
            title += (title ? separator : '') + this.router.title;
          }
          return title;
        };
        _createClass(NavigationContext, [{
          key: 'nextInstructions',
          get: function() {
            return this.getAllContexts().map(function(c) {
              return c.nextInstruction;
            }).filter(function(c) {
              return c;
            });
          }
        }, {
          key: 'currentInstructions',
          get: function() {
            return this.getAllContexts().map(function(c) {
              return c.currentInstruction;
            }).filter(function(c) {
              return c;
            });
          }
        }, {
          key: 'prevInstructions',
          get: function() {
            return this.getAllContexts().map(function(c) {
              return c.prevInstruction;
            }).filter(function(c) {
              return c;
            });
          }
        }]);
        return NavigationContext;
      })();
      _export('NavigationContext', NavigationContext);
      CommitChangesStep = (function() {
        function CommitChangesStep() {
          _classCallCheck(this, CommitChangesStep);
        }
        CommitChangesStep.prototype.run = function run(navigationContext, next) {
          return navigationContext.commitChanges(true).then(function() {
            navigationContext.updateTitle();
            return next();
          });
        };
        return CommitChangesStep;
      })();
      _export('CommitChangesStep', CommitChangesStep);
    }
  };
});

System.register("github:aurelia/router@0.9.0/app-router", ["npm:core-js@0.9.16", "github:aurelia/dependency-injection@0.8.1", "github:aurelia/history@0.5.0", "github:aurelia/router@0.9.0/router", "github:aurelia/router@0.9.0/pipeline-provider", "github:aurelia/router@0.9.0/navigation-commands", "github:aurelia/event-aggregator@0.5.0", "github:aurelia/router@0.9.0/router-configuration"], function(_export) {
  'use strict';
  var core,
      Container,
      History,
      Router,
      PipelineProvider,
      isNavigationCommand,
      EventAggregator,
      RouterConfiguration,
      AppRouter;
  var _createClass = (function() {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ('value' in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    return function(Constructor, protoProps, staticProps) {
      if (protoProps)
        defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        defineProperties(Constructor, staticProps);
      return Constructor;
    };
  })();
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }
  function _inherits(subClass, superClass) {
    if (typeof superClass !== 'function' && superClass !== null) {
      throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }});
    if (superClass)
      subClass.__proto__ = superClass;
  }
  function findAnchor(el) {
    while (el) {
      if (el.tagName === 'A')
        return el;
      el = el.parentNode;
    }
  }
  function handleLinkClick(evt) {
    if (!this.isActive) {
      return ;
    }
    var target = findAnchor(evt.target);
    if (!target) {
      return ;
    }
    if (this.history._hasPushState) {
      if (!evt.altKey && !evt.ctrlKey && !evt.metaKey && !evt.shiftKey && targetIsThisWindow(target)) {
        var href = target.getAttribute('href');
        if (href !== null && !(href.charAt(0) === '#' || /^[a-z]+:/i.test(href))) {
          evt.preventDefault();
          this.history.navigate(href);
        }
      }
    }
  }
  function targetIsThisWindow(target) {
    var targetWindow = target.getAttribute('target');
    return !targetWindow || targetWindow === window.name || targetWindow === '_self' || targetWindow === 'top' && window === window.top;
  }
  return {
    setters: [function(_coreJs) {
      core = _coreJs['default'];
    }, function(_aureliaDependencyInjection) {
      Container = _aureliaDependencyInjection.Container;
    }, function(_aureliaHistory) {
      History = _aureliaHistory.History;
    }, function(_router) {
      Router = _router.Router;
    }, function(_pipelineProvider) {
      PipelineProvider = _pipelineProvider.PipelineProvider;
    }, function(_navigationCommands) {
      isNavigationCommand = _navigationCommands.isNavigationCommand;
    }, function(_aureliaEventAggregator) {
      EventAggregator = _aureliaEventAggregator.EventAggregator;
    }, function(_routerConfiguration) {
      RouterConfiguration = _routerConfiguration.RouterConfiguration;
    }],
    execute: function() {
      AppRouter = (function(_Router) {
        function AppRouter(container, history, pipelineProvider, events) {
          _classCallCheck(this, AppRouter);
          _Router.call(this, container, history);
          this.pipelineProvider = pipelineProvider;
          document.addEventListener('click', handleLinkClick.bind(this), true);
          this.events = events;
        }
        _inherits(AppRouter, _Router);
        AppRouter.inject = function inject() {
          return [Container, History, PipelineProvider, EventAggregator];
        };
        AppRouter.prototype.loadUrl = function loadUrl(url) {
          var _this = this;
          return this.createNavigationInstruction(url).then(function(instruction) {
            return _this.queueInstruction(instruction);
          })['catch'](function(error) {
            console.error(error);
            if (_this.history.previousFragment) {
              _this.navigate(_this.history.previousFragment, false);
            }
          });
        };
        AppRouter.prototype.queueInstruction = function queueInstruction(instruction) {
          var _this2 = this;
          return new Promise(function(resolve) {
            instruction.resolve = resolve;
            _this2.queue.unshift(instruction);
            _this2.dequeueInstruction();
          });
        };
        AppRouter.prototype.dequeueInstruction = function dequeueInstruction() {
          var _this3 = this;
          if (this.isNavigating) {
            return ;
          }
          var instruction = this.queue.shift();
          this.queue = [];
          if (!instruction) {
            return ;
          }
          this.isNavigating = true;
          this.events.publish('router:navigation:processing', instruction);
          var context = this.createNavigationContext(instruction);
          var pipeline = this.pipelineProvider.createPipeline(context);
          pipeline.run(context).then(function(result) {
            _this3.isNavigating = false;
            if (!(result && 'completed' in result && 'output' in result)) {
              throw new Error('Expected router pipeline to return a navigation result, but got [' + JSON.stringify(result) + '] instead.');
            }
            if (result.completed) {
              _this3.history.previousFragment = instruction.fragment;
            }
            if (result.output instanceof Error) {
              console.error(result.output);
              _this3.events.publish('router:navigation:error', {
                instruction: instruction,
                result: result
              });
            }
            if (isNavigationCommand(result.output)) {
              result.output.navigate(_this3);
            } else if (!result.completed) {
              _this3.navigate(_this3.history.previousFragment || '', false);
              _this3.events.publish('router:navigation:cancelled', instruction);
            }
            instruction.resolve(result);
            _this3.dequeueInstruction();
          }).then(function(result) {
            return _this3.events.publish('router:navigation:complete', instruction);
          })['catch'](function(error) {
            console.error(error);
          });
        };
        AppRouter.prototype.registerViewPort = function registerViewPort(viewPort, name) {
          var _this4 = this;
          _Router.prototype.registerViewPort.call(this, viewPort, name);
          if (!this.isActive) {
            if ('configureRouter' in this.container.viewModel) {
              var config = new RouterConfiguration();
              var result = Promise.resolve(this.container.viewModel.configureRouter(config, this));
              return result.then(function() {
                _this4.configure(config);
                _this4.activate();
              });
            } else {
              this.activate();
            }
          } else {
            this.dequeueInstruction();
          }
        };
        AppRouter.prototype.activate = function activate(options) {
          if (this.isActive) {
            return ;
          }
          this.isActive = true;
          this.options = Object.assign({routeHandler: this.loadUrl.bind(this)}, this.options, options);
          this.history.activate(this.options);
          this.dequeueInstruction();
        };
        AppRouter.prototype.deactivate = function deactivate() {
          this.isActive = false;
          this.history.deactivate();
        };
        AppRouter.prototype.reset = function reset() {
          _Router.prototype.reset.call(this);
          this.queue = [];
          this.options = null;
        };
        _createClass(AppRouter, [{
          key: 'isRoot',
          get: function() {
            return true;
          }
        }]);
        return AppRouter;
      })(Router);
      _export('AppRouter', AppRouter);
    }
  };
});

System.register("github:aurelia/router@0.9.0/route-filters", ["github:aurelia/dependency-injection@0.8.1"], function(_export) {
  'use strict';
  var Container,
      RouteFilterContainer,
      RouteFilterStep;
  _export('createRouteFilterStep', createRouteFilterStep);
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }
  function createRouteFilterStep(name) {
    function create(routeFilterContainer) {
      return new RouteFilterStep(name, routeFilterContainer);
    }
    ;
    create.inject = function() {
      return [RouteFilterContainer];
    };
    return create;
  }
  return {
    setters: [function(_aureliaDependencyInjection) {
      Container = _aureliaDependencyInjection.Container;
    }],
    execute: function() {
      RouteFilterContainer = (function() {
        function RouteFilterContainer(container) {
          _classCallCheck(this, RouteFilterContainer);
          this.container = container;
          this.filters = {};
          this.filterCache = {};
        }
        RouteFilterContainer.inject = function inject() {
          return [Container];
        };
        RouteFilterContainer.prototype.addStep = function addStep(name, step) {
          var index = arguments[2] === undefined ? -1 : arguments[2];
          var filter = this.filters[name];
          if (!filter) {
            filter = this.filters[name] = [];
          }
          if (index === -1) {
            index = filter.length;
          }
          filter.splice(index, 0, step);
          this.filterCache = {};
        };
        RouteFilterContainer.prototype.getFilterSteps = function getFilterSteps(name) {
          if (this.filterCache[name]) {
            return this.filterCache[name];
          }
          var steps = [];
          var filter = this.filters[name];
          if (!filter) {
            return steps;
          }
          for (var i = 0,
              l = filter.length; i < l; i++) {
            if (typeof filter[i] === 'string') {
              steps.push.apply(steps, this.getFilterSteps(filter[i]));
            } else {
              steps.push(this.container.get(filter[i]));
            }
          }
          return this.filterCache[name] = steps;
        };
        return RouteFilterContainer;
      })();
      _export('RouteFilterContainer', RouteFilterContainer);
      RouteFilterStep = (function() {
        function RouteFilterStep(name, routeFilterContainer) {
          _classCallCheck(this, RouteFilterStep);
          this.name = name;
          this.routeFilterContainer = routeFilterContainer;
          this.isMultiStep = true;
        }
        RouteFilterStep.prototype.getSteps = function getSteps() {
          return this.routeFilterContainer.getFilterSteps(this.name);
        };
        return RouteFilterStep;
      })();
    }
  };
});

System.register("github:aurelia/router@0.9.0/router-configuration", ["github:aurelia/router@0.9.0/route-filters"], function(_export) {
  'use strict';
  var RouteFilterContainer,
      RouterConfiguration;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }
  return {
    setters: [function(_routeFilters) {
      RouteFilterContainer = _routeFilters.RouteFilterContainer;
    }],
    execute: function() {
      RouterConfiguration = (function() {
        function RouterConfiguration() {
          _classCallCheck(this, RouterConfiguration);
          this.instructions = [];
          this.options = {};
          this.pipelineSteps = [];
        }
        RouterConfiguration.prototype.addPipelineStep = function addPipelineStep(name, step) {
          this.pipelineSteps.push({
            name: name,
            step: step
          });
        };
        RouterConfiguration.prototype.map = function map(route) {
          if (Array.isArray(route)) {
            route.forEach(this.map.bind(this));
            return this;
          }
          return this.mapRoute(route);
        };
        RouterConfiguration.prototype.mapRoute = function mapRoute(config) {
          this.instructions.push(function(router) {
            var routeConfigs = [];
            if (Array.isArray(config.route)) {
              for (var i = 0,
                  ii = config.route.length; i < ii; ++i) {
                var current = Object.assign({}, config);
                current.route = config.route[i];
                routeConfigs.push(current);
              }
            } else {
              routeConfigs.push(Object.assign({}, config));
            }
            var navModel = undefined;
            for (var i = 0,
                ii = routeConfigs.length; i < ii; ++i) {
              var routeConfig = routeConfigs[i];
              routeConfig.settings = routeConfig.settings || {};
              if (!navModel) {
                navModel = router.createNavModel(routeConfig);
              }
              router.addRoute(routeConfig, navModel);
            }
          });
          return this;
        };
        RouterConfiguration.prototype.mapUnknownRoutes = function mapUnknownRoutes(config) {
          this.unknownRouteConfig = config;
          return this;
        };
        RouterConfiguration.prototype.exportToRouter = function exportToRouter(router) {
          var instructions = this.instructions;
          for (var i = 0,
              ii = instructions.length; i < ii; ++i) {
            instructions[i](router);
          }
          if (this.title) {
            router.title = this.title;
          }
          if (this.unknownRouteConfig) {
            router.handleUnknownRoutes(this.unknownRouteConfig);
          }
          router.options = this.options;
          var pipelineSteps = this.pipelineSteps;
          if (pipelineSteps.length) {
            if (!router.isRoot) {
              throw new Error('Pipeline steps can only be added to the root router');
            }
            var filterContainer = router.container.get(RouteFilterContainer);
            for (var i = 0,
                ii = pipelineSteps.length; i < ii; ++i) {
              var _pipelineSteps$i = pipelineSteps[i];
              var _name = _pipelineSteps$i.name;
              var step = _pipelineSteps$i.step;
              filterContainer.addStep(_name, step);
            }
          }
        };
        return RouterConfiguration;
      })();
      _export('RouterConfiguration', RouterConfiguration);
    }
  };
});

System.register("github:aurelia/router@0.9.0/router", ["npm:core-js@0.9.16", "github:aurelia/route-recognizer@0.5.0", "github:aurelia/path@0.7.0", "github:aurelia/router@0.9.0/navigation-context", "github:aurelia/router@0.9.0/navigation-instruction", "github:aurelia/router@0.9.0/nav-model", "github:aurelia/router@0.9.0/router-configuration", "github:aurelia/router@0.9.0/util"], function(_export) {
  'use strict';
  var core,
      RouteRecognizer,
      join,
      NavigationContext,
      NavigationInstruction,
      NavModel,
      RouterConfiguration,
      processPotential,
      normalizeAbsolutePath,
      createRootedPath,
      resolveUrl,
      Router;
  var _createClass = (function() {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ('value' in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    return function(Constructor, protoProps, staticProps) {
      if (protoProps)
        defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        defineProperties(Constructor, staticProps);
      return Constructor;
    };
  })();
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }
  function validateRouteConfig(config) {
    if (typeof config !== 'object') {
      throw new Error('Invalid Route Config');
    }
    if (typeof config.route !== 'string') {
      throw new Error('Invalid Route Config: You must specify a route pattern.');
    }
    if (!('redirect' in config || config.moduleId || config.navigationStrategy || config.viewPorts)) {
      throw new Error('Invalid Route Config: You must specify a moduleId, redirect, navigationStrategy, or viewPorts.');
    }
  }
  function evaluateNavigationStrategy(instruction, evaluator, context) {
    return Promise.resolve(evaluator.call(context, instruction)).then(function() {
      if (!('viewPorts' in instruction.config)) {
        instruction.config.viewPorts = {'default': {moduleId: instruction.config.moduleId}};
      }
      return instruction;
    });
  }
  return {
    setters: [function(_coreJs) {
      core = _coreJs['default'];
    }, function(_aureliaRouteRecognizer) {
      RouteRecognizer = _aureliaRouteRecognizer.RouteRecognizer;
    }, function(_aureliaPath) {
      join = _aureliaPath.join;
    }, function(_navigationContext) {
      NavigationContext = _navigationContext.NavigationContext;
    }, function(_navigationInstruction) {
      NavigationInstruction = _navigationInstruction.NavigationInstruction;
    }, function(_navModel) {
      NavModel = _navModel.NavModel;
    }, function(_routerConfiguration) {
      RouterConfiguration = _routerConfiguration.RouterConfiguration;
    }, function(_util) {
      processPotential = _util.processPotential;
      normalizeAbsolutePath = _util.normalizeAbsolutePath;
      createRootedPath = _util.createRootedPath;
      resolveUrl = _util.resolveUrl;
    }],
    execute: function() {
      Router = (function() {
        function Router(container, history) {
          _classCallCheck(this, Router);
          this.container = container;
          this.history = history;
          this.viewPorts = {};
          this.reset();
          this.baseUrl = '';
          this.isConfigured = false;
        }
        Router.prototype.registerViewPort = function registerViewPort(viewPort, name) {
          name = name || 'default';
          this.viewPorts[name] = viewPort;
        };
        Router.prototype.refreshBaseUrl = function refreshBaseUrl() {
          if (this.parent) {
            var baseUrl = this.parent.currentInstruction.getBaseUrl();
            this.baseUrl = this.parent.baseUrl + baseUrl;
          }
        };
        Router.prototype.refreshNavigation = function refreshNavigation() {
          var nav = this.navigation;
          for (var i = 0,
              length = nav.length; i < length; i++) {
            var current = nav[i];
            current.href = createRootedPath(current.relativeHref, this.baseUrl, this.history._hasPushState);
          }
        };
        Router.prototype.configure = function configure(callbackOrConfig) {
          this.isConfigured = true;
          if (typeof callbackOrConfig == 'function') {
            var config = new RouterConfiguration();
            callbackOrConfig(config);
            config.exportToRouter(this);
          } else {
            callbackOrConfig.exportToRouter(this);
          }
          return this;
        };
        Router.prototype.navigate = function navigate(fragment, options) {
          if (!this.isConfigured && this.parent) {
            return this.parent.navigate(fragment, options);
          }
          return this.history.navigate(resolveUrl(fragment, this.baseUrl, this.history._hasPushState), options);
        };
        Router.prototype.navigateToRoute = function navigateToRoute(route, params, options) {
          var path = this.generate(route, params);
          return this.navigate(path, options);
        };
        Router.prototype.navigateBack = function navigateBack() {
          this.history.navigateBack();
        };
        Router.prototype.createChild = function createChild(container) {
          var childRouter = new Router(container || this.container.createChild(), this.history);
          childRouter.parent = this;
          return childRouter;
        };
        Router.prototype.createNavigationInstruction = function createNavigationInstruction() {
          var url = arguments[0] === undefined ? '' : arguments[0];
          var parentInstruction = arguments[1] === undefined ? null : arguments[1];
          var fragment = url;
          var queryString = '';
          var queryIndex = url.indexOf('?');
          if (queryIndex != -1) {
            fragment = url.substr(0, queryIndex);
            queryString = url.substr(queryIndex + 1);
          }
          var results = this.recognizer.recognize(url);
          if (!results || !results.length) {
            results = this.childRecognizer.recognize(url);
          }
          if ((!results || !results.length) && this.catchAllHandler) {
            results = [{
              config: {navModel: {}},
              handler: this.catchAllHandler,
              params: {path: fragment}
            }];
          }
          if (results && results.length) {
            var first = results[0];
            var instruction = new NavigationInstruction(fragment, queryString, first.params, first.queryParams || results.queryParams, first.config || first.handler, parentInstruction);
            if (typeof first.handler === 'function') {
              return evaluateNavigationStrategy(instruction, first.handler, first);
            } else if (first.handler && 'navigationStrategy' in first.handler) {
              return evaluateNavigationStrategy(instruction, first.handler.navigationStrategy, first.handler);
            }
            return Promise.resolve(instruction);
          }
          return Promise.reject(new Error('Route not found: ' + url));
        };
        Router.prototype.createNavigationContext = function createNavigationContext(instruction) {
          instruction.navigationContext = new NavigationContext(this, instruction);
          return instruction.navigationContext;
        };
        Router.prototype.generate = function generate(name, params) {
          if ((!this.isConfigured || !this.recognizer.hasRoute(name)) && this.parent) {
            return this.parent.generate(name, params);
          }
          var path = this.recognizer.generate(name, params);
          return createRootedPath(path, this.baseUrl, this.history._hasPushState);
        };
        Router.prototype.createNavModel = function createNavModel(config) {
          var navModel = new NavModel(this, 'href' in config ? config.href : config.route);
          navModel.title = config.title;
          navModel.order = config.nav;
          navModel.href = config.href;
          navModel.settings = config.settings;
          navModel.config = config;
          return navModel;
        };
        Router.prototype.addRoute = function addRoute(config, navModel) {
          validateRouteConfig(config);
          if (!('viewPorts' in config) && !config.navigationStrategy) {
            config.viewPorts = {'default': {
                moduleId: config.moduleId,
                view: config.view
              }};
          }
          if (!navModel) {
            navModel = this.createNavModel(config);
          }
          this.routes.push(config);
          var state = this.recognizer.add({
            path: config.route,
            handler: config
          });
          if (config.route) {
            var withChild = undefined,
                settings = config.settings;
            delete config.settings;
            withChild = JSON.parse(JSON.stringify(config));
            config.settings = settings;
            withChild.route += '/*childRoute';
            withChild.hasChildRouter = true;
            this.childRecognizer.add({
              path: withChild.route,
              handler: withChild
            });
            withChild.navModel = navModel;
            withChild.settings = config.settings;
          }
          config.navModel = navModel;
          if ((navModel.order || navModel.order === 0) && this.navigation.indexOf(navModel) === -1) {
            if (!navModel.href && navModel.href != '' && (state.types.dynamics || state.types.stars)) {
              throw new Error('Invalid route config: dynamic routes must specify an href to be included in the navigation model.');
            }
            if (typeof navModel.order != 'number') {
              navModel.order = ++this.fallbackOrder;
            }
            this.navigation.push(navModel);
            this.navigation = this.navigation.sort(function(a, b) {
              return a.order - b.order;
            });
          }
        };
        Router.prototype.hasRoute = function hasRoute(name) {
          return !!(this.recognizer.hasRoute(name) || this.parent && this.parent.hasRoute(name));
        };
        Router.prototype.hasOwnRoute = function hasOwnRoute(name) {
          return this.recognizer.hasRoute(name);
        };
        Router.prototype.handleUnknownRoutes = function handleUnknownRoutes(config) {
          var callback = function callback(instruction) {
            return new Promise(function(resolve, reject) {
              function done(inst) {
                inst = inst || instruction;
                inst.config.route = inst.params.path;
                resolve(inst);
              }
              if (!config) {
                instruction.config.moduleId = instruction.fragment;
                done(instruction);
              } else if (typeof config == 'string') {
                instruction.config.moduleId = config;
                done(instruction);
              } else if (typeof config == 'function') {
                processPotential(config(instruction), done, reject);
              } else {
                instruction.config = config;
                done(instruction);
              }
            });
          };
          this.catchAllHandler = callback;
        };
        Router.prototype.updateTitle = function updateTitle() {
          if (this.parent) {
            return this.parent.updateTitle();
          }
          this.currentInstruction.navigationContext.updateTitle();
        };
        Router.prototype.reset = function reset() {
          this.fallbackOrder = 100;
          this.recognizer = new RouteRecognizer();
          this.childRecognizer = new RouteRecognizer();
          this.routes = [];
          this.isNavigating = false;
          this.navigation = [];
          this.isConfigured = false;
        };
        _createClass(Router, [{
          key: 'isRoot',
          get: function() {
            return false;
          }
        }]);
        return Router;
      })();
      _export('Router', Router);
    }
  };
});

System.register("github:aurelia/router@0.9.0/index", ["github:aurelia/router@0.9.0/router", "github:aurelia/router@0.9.0/app-router", "github:aurelia/router@0.9.0/pipeline-provider", "github:aurelia/router@0.9.0/navigation-commands", "github:aurelia/router@0.9.0/route-loading", "github:aurelia/router@0.9.0/router-configuration", "github:aurelia/router@0.9.0/navigation-context", "github:aurelia/router@0.9.0/navigation-plan", "github:aurelia/router@0.9.0/route-filters"], function(_export) {
  'use strict';
  return {
    setters: [function(_router) {
      _export('Router', _router.Router);
    }, function(_appRouter) {
      _export('AppRouter', _appRouter.AppRouter);
    }, function(_pipelineProvider) {
      _export('PipelineProvider', _pipelineProvider.PipelineProvider);
    }, function(_navigationCommands) {
      _export('Redirect', _navigationCommands.Redirect);
    }, function(_routeLoading) {
      _export('RouteLoader', _routeLoading.RouteLoader);
    }, function(_routerConfiguration) {
      _export('RouterConfiguration', _routerConfiguration.RouterConfiguration);
    }, function(_navigationContext) {
      _export('NavigationContext', _navigationContext.NavigationContext);
    }, function(_navigationPlan) {
      _export('activationStrategy', _navigationPlan.activationStrategy);
    }, function(_routeFilters) {
      _export('RouteFilterContainer', _routeFilters.RouteFilterContainer);
      _export('createRouteFilterStep', _routeFilters.createRouteFilterStep);
    }],
    execute: function() {}
  };
});

System.register("github:aurelia/router@0.9.0", ["github:aurelia/router@0.9.0/index"], function($__export) {
  return {
    setters: [function(m) {
      for (var p in m)
        $__export(p, m[p]);
    }],
    execute: function() {}
  };
});

System.register("github:aurelia/framework@0.12.0/plugins", ["npm:core-js@0.9.16", "github:aurelia/logging@0.5.0", "github:aurelia/metadata@0.6.0"], function(_export) {
  'use strict';
  var core,
      LogManager,
      Metadata,
      logger,
      Plugins;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }
  function loadPlugin(aurelia, loader, info) {
    logger.debug('Loading plugin ' + info.moduleId + '.');
    aurelia.currentPluginId = info.moduleId;
    return loader.loadModule(info.moduleId).then(function(m) {
      if ('configure' in m) {
        return Promise.resolve(m.configure(aurelia, info.config || {})).then(function() {
          aurelia.currentPluginId = null;
          logger.debug('Configured plugin ' + info.moduleId + '.');
        });
      } else {
        aurelia.currentPluginId = null;
        logger.debug('Loaded plugin ' + info.moduleId + '.');
      }
    });
  }
  return {
    setters: [function(_coreJs) {
      core = _coreJs['default'];
    }, function(_aureliaLogging) {
      LogManager = _aureliaLogging;
    }, function(_aureliaMetadata) {
      Metadata = _aureliaMetadata.Metadata;
    }],
    execute: function() {
      logger = LogManager.getLogger('aurelia');
      Plugins = (function() {
        function Plugins(aurelia) {
          _classCallCheck(this, Plugins);
          this.aurelia = aurelia;
          this.info = [];
          this.processed = false;
        }
        Plugins.prototype.plugin = function plugin(moduleId, config) {
          var plugin = {
            moduleId: moduleId,
            config: config || {}
          };
          if (this.processed) {
            loadPlugin(this.aurelia, this.aurelia.loader, plugin);
          } else {
            this.info.push(plugin);
          }
          return this;
        };
        Plugins.prototype._process = function _process() {
          var _this = this;
          var aurelia = this.aurelia,
              loader = aurelia.loader,
              info = this.info,
              current;
          if (this.processed) {
            return ;
          }
          var next = function next() {
            if (current = info.shift()) {
              return loadPlugin(aurelia, loader, current).then(next);
            }
            _this.processed = true;
            return Promise.resolve();
          };
          return next();
        };
        return Plugins;
      })();
      _export('Plugins', Plugins);
    }
  };
});

System.register("github:aurelia/logging-console@0.5.0/index", [], function(_export) {
  'use strict';
  var ConsoleAppender;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }
  return {
    setters: [],
    execute: function() {
      (function(global) {
        'use strict';
        global.console = global.console || {};
        var con = global.console;
        var prop,
            method;
        var empty = {};
        var dummy = function dummy() {};
        var properties = 'memory'.split(',');
        var methods = ('assert,clear,count,debug,dir,dirxml,error,exception,group,' + 'groupCollapsed,groupEnd,info,log,markTimeline,profile,profiles,profileEnd,' + 'show,table,time,timeEnd,timeline,timelineEnd,timeStamp,trace,warn').split(',');
        while (prop = properties.pop())
          if (!con[prop])
            con[prop] = empty;
        while (method = methods.pop())
          if (!con[method])
            con[method] = dummy;
      })(typeof window === 'undefined' ? undefined : window);
      if (Function.prototype.bind && window.console && typeof console.log == 'object') {
        ['log', 'info', 'warn', 'error', 'assert', 'dir', 'clear', 'profile', 'profileEnd'].forEach(function(method) {
          console[method] = this.bind(console[method], console);
        }, Function.prototype.call);
      }
      ConsoleAppender = (function() {
        function ConsoleAppender() {
          _classCallCheck(this, ConsoleAppender);
        }
        ConsoleAppender.prototype.debug = function debug(logger, message) {
          for (var _len = arguments.length,
              rest = Array(_len > 2 ? _len - 2 : 0),
              _key = 2; _key < _len; _key++) {
            rest[_key - 2] = arguments[_key];
          }
          console.debug.apply(console, ['DEBUG [' + logger.id + '] ' + message].concat(rest));
        };
        ConsoleAppender.prototype.info = function info(logger, message) {
          for (var _len2 = arguments.length,
              rest = Array(_len2 > 2 ? _len2 - 2 : 0),
              _key2 = 2; _key2 < _len2; _key2++) {
            rest[_key2 - 2] = arguments[_key2];
          }
          console.info.apply(console, ['INFO [' + logger.id + '] ' + message].concat(rest));
        };
        ConsoleAppender.prototype.warn = function warn(logger, message) {
          for (var _len3 = arguments.length,
              rest = Array(_len3 > 2 ? _len3 - 2 : 0),
              _key3 = 2; _key3 < _len3; _key3++) {
            rest[_key3 - 2] = arguments[_key3];
          }
          console.warn.apply(console, ['WARN [' + logger.id + '] ' + message].concat(rest));
        };
        ConsoleAppender.prototype.error = function error(logger, message) {
          for (var _len4 = arguments.length,
              rest = Array(_len4 > 2 ? _len4 - 2 : 0),
              _key4 = 2; _key4 < _len4; _key4++) {
            rest[_key4 - 2] = arguments[_key4];
          }
          console.error.apply(console, ['ERROR [' + logger.id + '] ' + message].concat(rest));
        };
        return ConsoleAppender;
      })();
      _export('ConsoleAppender', ConsoleAppender);
    }
  };
});

System.register("github:aurelia/logging-console@0.5.0", ["github:aurelia/logging-console@0.5.0/index"], function($__export) {
  return {
    setters: [function(m) {
      for (var p in m)
        $__export(p, m[p]);
    }],
    execute: function() {}
  };
});

System.register("github:aurelia/framework@0.12.0/aurelia", ["npm:core-js@0.9.16", "github:aurelia/logging@0.5.0", "github:aurelia/dependency-injection@0.8.1", "github:aurelia/loader@0.7.0", "github:aurelia/path@0.7.0", "github:aurelia/framework@0.12.0/plugins", "github:aurelia/templating@0.12.1"], function(_export) {
  'use strict';
  var core,
      LogManager,
      Container,
      Loader,
      join,
      relativeToFile,
      Plugins,
      BindingLanguage,
      ViewEngine,
      ViewSlot,
      ResourceRegistry,
      CompositionEngine,
      Animator,
      logger,
      slice,
      CustomEvent,
      Aurelia;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }
  function preventActionlessFormSubmit() {
    document.body.addEventListener('submit', function(evt) {
      var target = evt.target;
      var action = target.action;
      if (target.tagName.toLowerCase() === 'form' && !action) {
        evt.preventDefault();
      }
    });
  }
  function loadResources(container, resourcesToLoad, appResources) {
    var viewEngine = container.get(ViewEngine),
        importIds = Object.keys(resourcesToLoad),
        names = new Array(importIds.length),
        i,
        ii;
    for (i = 0, ii = importIds.length; i < ii; ++i) {
      names[i] = resourcesToLoad[importIds[i]];
    }
    return viewEngine.importViewResources(importIds, names, appResources);
  }
  return {
    setters: [function(_coreJs) {
      core = _coreJs['default'];
    }, function(_aureliaLogging) {
      LogManager = _aureliaLogging;
    }, function(_aureliaDependencyInjection) {
      Container = _aureliaDependencyInjection.Container;
    }, function(_aureliaLoader) {
      Loader = _aureliaLoader.Loader;
    }, function(_aureliaPath) {
      join = _aureliaPath.join;
      relativeToFile = _aureliaPath.relativeToFile;
    }, function(_plugins) {
      Plugins = _plugins.Plugins;
    }, function(_aureliaTemplating) {
      BindingLanguage = _aureliaTemplating.BindingLanguage;
      ViewEngine = _aureliaTemplating.ViewEngine;
      ViewSlot = _aureliaTemplating.ViewSlot;
      ResourceRegistry = _aureliaTemplating.ResourceRegistry;
      CompositionEngine = _aureliaTemplating.CompositionEngine;
      Animator = _aureliaTemplating.Animator;
    }],
    execute: function() {
      logger = LogManager.getLogger('aurelia');
      slice = Array.prototype.slice;
      if (!window.CustomEvent || typeof window.CustomEvent !== 'function') {
        CustomEvent = function CustomEvent(event, params) {
          var params = params || {
            bubbles: false,
            cancelable: false,
            detail: undefined
          };
          var evt = document.createEvent('CustomEvent');
          evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
          return evt;
        };
        CustomEvent.prototype = window.Event.prototype;
        window.CustomEvent = CustomEvent;
      }
      Aurelia = (function() {
        function Aurelia(loader, container, resources) {
          _classCallCheck(this, Aurelia);
          this.loader = loader || new window.AureliaLoader();
          this.container = container || new Container();
          this.resources = resources || new ResourceRegistry();
          this.use = new Plugins(this);
          this.resourcesToLoad = {};
          this.withInstance(Aurelia, this);
          this.withInstance(Loader, this.loader);
          this.withInstance(ResourceRegistry, this.resources);
        }
        Aurelia.prototype.withInstance = function withInstance(type, instance) {
          this.container.registerInstance(type, instance);
          return this;
        };
        Aurelia.prototype.withSingleton = function withSingleton(type, implementation) {
          this.container.registerSingleton(type, implementation);
          return this;
        };
        Aurelia.prototype.globalizeResources = function globalizeResources(resources) {
          var toAdd = Array.isArray(resources) ? resources : arguments,
              i,
              ii,
              resource,
              pluginPath = this.currentPluginId || '',
              path,
              internalPlugin = pluginPath.startsWith('./');
          for (i = 0, ii = toAdd.length; i < ii; ++i) {
            resource = toAdd[i];
            if (typeof resource != 'string') {
              throw new Error('Invalid resource path [' + resource + ']. Resources must be specified as relative module IDs.');
            }
            path = internalPlugin ? relativeToFile(resource, pluginPath) : join(pluginPath, resource);
            this.resourcesToLoad[path] = this.resourcesToLoad[path];
          }
          return this;
        };
        Aurelia.prototype.renameGlobalResource = function renameGlobalResource(resourcePath, newName) {
          this.resourcesToLoad[resourcePath] = newName;
          return this;
        };
        Aurelia.prototype.start = function start() {
          var _this = this;
          if (this.started) {
            return Promise.resolve(this);
          }
          this.started = true;
          logger.info('Aurelia Starting');
          preventActionlessFormSubmit();
          return this.use._process().then(function() {
            if (!_this.container.hasHandler(BindingLanguage)) {
              var message = 'You must configure Aurelia with a BindingLanguage implementation.';
              logger.error(message);
              throw new Error(message);
            }
            if (!_this.container.hasHandler(Animator)) {
              Animator.configureDefault(_this.container);
            }
            return loadResources(_this.container, _this.resourcesToLoad, _this.resources).then(function() {
              logger.info('Aurelia Started');
              var evt = new window.CustomEvent('aurelia-started', {
                bubbles: true,
                cancelable: true
              });
              document.dispatchEvent(evt);
              return _this;
            });
          });
        };
        Aurelia.prototype.setRoot = function setRoot() {
          var _this2 = this;
          var root = arguments[0] === undefined ? 'app' : arguments[0];
          var applicationHost = arguments[1] === undefined ? null : arguments[1];
          var compositionEngine,
              instruction = {};
          applicationHost = applicationHost || this.host;
          if (!applicationHost || typeof applicationHost == 'string') {
            this.host = document.getElementById(applicationHost || 'applicationHost') || document.body;
          } else {
            this.host = applicationHost;
          }
          this.host.aurelia = this;
          compositionEngine = this.container.get(CompositionEngine);
          instruction.viewModel = root;
          instruction.container = instruction.childContainer = this.container;
          instruction.viewSlot = new ViewSlot(this.host, true);
          instruction.viewSlot.transformChildNodesIntoView();
          instruction.host = this.host;
          return compositionEngine.compose(instruction).then(function(root) {
            _this2.root = root;
            instruction.viewSlot.attached();
            var evt = new window.CustomEvent('aurelia-composed', {
              bubbles: true,
              cancelable: true
            });
            setTimeout(function() {
              return document.dispatchEvent(evt);
            }, 1);
            return _this2;
          });
        };
        return Aurelia;
      })();
      _export('Aurelia', Aurelia);
    }
  };
});

System.register("github:aurelia/framework@0.12.0/index", ["github:aurelia/logging@0.5.0", "github:aurelia/framework@0.12.0/aurelia", "github:aurelia/dependency-injection@0.8.1", "github:aurelia/binding@0.7.3", "github:aurelia/metadata@0.6.0", "github:aurelia/templating@0.12.1", "github:aurelia/loader@0.7.0", "github:aurelia/task-queue@0.5.0", "github:aurelia/path@0.7.0"], function(_export) {
  'use strict';
  var TheLogManager,
      LogManager;
  return {
    setters: [function(_aureliaLogging) {
      TheLogManager = _aureliaLogging;
    }, function(_aurelia) {
      _export('Aurelia', _aurelia.Aurelia);
    }, function(_aureliaDependencyInjection) {
      for (var _key in _aureliaDependencyInjection) {
        _export(_key, _aureliaDependencyInjection[_key]);
      }
    }, function(_aureliaBinding) {
      for (var _key2 in _aureliaBinding) {
        _export(_key2, _aureliaBinding[_key2]);
      }
    }, function(_aureliaMetadata) {
      for (var _key3 in _aureliaMetadata) {
        _export(_key3, _aureliaMetadata[_key3]);
      }
    }, function(_aureliaTemplating) {
      for (var _key4 in _aureliaTemplating) {
        _export(_key4, _aureliaTemplating[_key4]);
      }
    }, function(_aureliaLoader) {
      for (var _key5 in _aureliaLoader) {
        _export(_key5, _aureliaLoader[_key5]);
      }
    }, function(_aureliaTaskQueue) {
      for (var _key6 in _aureliaTaskQueue) {
        _export(_key6, _aureliaTaskQueue[_key6]);
      }
    }, function(_aureliaPath) {
      for (var _key7 in _aureliaPath) {
        _export(_key7, _aureliaPath[_key7]);
      }
    }],
    execute: function() {
      LogManager = TheLogManager;
      _export('LogManager', LogManager);
    }
  };
});

System.register("github:aurelia/framework@0.12.0", ["github:aurelia/framework@0.12.0/index"], function($__export) {
  return {
    setters: [function(m) {
      for (var p in m)
        $__export(p, m[p]);
    }],
    execute: function() {}
  };
});

System.register("github:aurelia/bootstrapper@0.13.1/index", ["npm:core-js@0.9.16", "github:aurelia/framework@0.12.0", "github:aurelia/logging-console@0.5.0"], function(_export) {
  'use strict';
  var core,
      Aurelia,
      LogManager,
      ConsoleAppender,
      logger,
      readyQueue,
      isReady,
      installedDevelopmentLogging;
  _export('bootstrap', bootstrap);
  function onReady(callback) {
    return new Promise(function(resolve, reject) {
      if (!isReady) {
        readyQueue.push(function() {
          try {
            resolve(callback());
          } catch (e) {
            reject(e);
          }
        });
      } else {
        resolve(callback());
      }
    });
  }
  function bootstrap(configure) {
    return onReady(function() {
      var loader = new window.AureliaLoader(),
          aurelia = new Aurelia(loader);
      return configureAurelia(aurelia).then(function() {
        return configure(aurelia);
      });
    });
  }
  function ready(global) {
    return new Promise(function(resolve, reject) {
      if (global.document.readyState === 'complete') {
        resolve(global.document);
      } else {
        global.document.addEventListener('DOMContentLoaded', completed, false);
        global.addEventListener('load', completed, false);
      }
      function completed() {
        global.document.removeEventListener('DOMContentLoaded', completed, false);
        global.removeEventListener('load', completed, false);
        resolve(global.document);
      }
    });
  }
  function ensureLoader() {
    if (!window.AureliaLoader) {
      if (window.System) {
        return System.normalize('aurelia-bootstrapper').then(function(bootstrapperName) {
          return System.normalize('aurelia-loader-default', bootstrapperName).then(function(loaderName) {
            return System['import'](loaderName);
          });
        });
      } else if (window.require) {
        return new Promise(function(resolve, reject) {
          require(['aurelia-loader-default'], resolve, reject);
        });
      } else {
        throw new Error('No window.AureliaLoader is defined and there is neither a System API (ES6) or a Require API (AMD) available to load your app.');
      }
    }
    return Promise.resolve();
  }
  function preparePlatform() {
    return System.normalize('aurelia-bootstrapper').then(function(bootstrapperName) {
      return System.normalize('aurelia-framework', bootstrapperName).then(function(frameworkName) {
        System.map['aurelia-framework'] = frameworkName;
        return System.normalize('aurelia-loader', frameworkName).then(function(loaderName) {
          var toLoad = [];
          if (!System.polyfilled) {
            logger.debug('loading core-js');
            toLoad.push(System.normalize('core-js', loaderName).then(function(name) {
              return System['import'](name);
            }));
          }
          toLoad.push(System.normalize('aurelia-dependency-injection', frameworkName).then(function(name) {
            System.map['aurelia-dependency-injection'] = name;
          }));
          toLoad.push(System.normalize('aurelia-router', bootstrapperName).then(function(name) {
            System.map['aurelia-router'] = name;
          }));
          toLoad.push(System.normalize('aurelia-logging-console', bootstrapperName).then(function(name) {
            System.map['aurelia-logging-console'] = name;
          }));
          if (!('import' in document.createElement('link'))) {
            logger.debug('loading the HTMLImports polyfill');
            toLoad.push(System.normalize('webcomponentsjs/HTMLImports.min', loaderName).then(function(name) {
              return System['import'](name);
            }));
          }
          if (!('content' in document.createElement('template'))) {
            logger.debug('loading the HTMLTemplateElement polyfill');
            toLoad.push(System.normalize('aurelia-html-template-element', loaderName).then(function(name) {
              return System['import'](name);
            }));
          }
          return Promise.all(toLoad);
        });
      });
    });
  }
  function configureAurelia(aurelia) {
    return System.normalize('aurelia-bootstrapper').then(function(bName) {
      var toLoad = [];
      toLoad.push(System.normalize('aurelia-templating-binding', bName).then(function(templatingBinding) {
        aurelia.use.defaultBindingLanguage = function() {
          aurelia.use.plugin(templatingBinding);
          return this;
        };
      }));
      toLoad.push(System.normalize('aurelia-templating-router', bName).then(function(templatingRouter) {
        aurelia.use.router = function() {
          aurelia.use.plugin(templatingRouter);
          return this;
        };
      }));
      toLoad.push(System.normalize('aurelia-history-browser', bName).then(function(historyBrowser) {
        aurelia.use.history = function() {
          aurelia.use.plugin(historyBrowser);
          return this;
        };
      }));
      toLoad.push(System.normalize('aurelia-templating-resources', bName).then(function(name) {
        System.map['aurelia-templating-resources'] = name;
        aurelia.use.defaultResources = function() {
          aurelia.use.plugin(name);
          return this;
        };
      }));
      toLoad.push(System.normalize('aurelia-event-aggregator', bName).then(function(eventAggregator) {
        System.map['aurelia-event-aggregator'] = eventAggregator;
        aurelia.use.eventAggregator = function() {
          aurelia.use.plugin(eventAggregator);
          return this;
        };
      }));
      aurelia.use.standardConfiguration = function() {
        aurelia.use.defaultBindingLanguage().defaultResources().history().router().eventAggregator();
        return this;
      };
      aurelia.use.developmentLogging = function() {
        if (!installedDevelopmentLogging) {
          installedDevelopmentLogging = true;
          LogManager.addAppender(new ConsoleAppender());
          LogManager.setLevel(LogManager.logLevel.debug);
        }
        return this;
      };
      return Promise.all(toLoad);
    });
  }
  function runningLocally() {
    return window.location.protocol !== 'http' && window.location.protocol !== 'https';
  }
  function handleApp(appHost) {
    var configModuleId = appHost.getAttribute('aurelia-app'),
        aurelia,
        loader;
    if (configModuleId) {
      loader = new window.AureliaLoader();
      return loader.loadModule(configModuleId).then(function(m) {
        aurelia = new Aurelia(loader);
        aurelia.host = appHost;
        return configureAurelia(aurelia).then(function() {
          return m.configure(aurelia);
        });
      });
    } else {
      aurelia = new Aurelia();
      aurelia.host = appHost;
      return configureAurelia(aurelia).then(function() {
        if (runningLocally()) {
          aurelia.use.developmentLogging();
        }
        aurelia.use.standardConfiguration();
        return aurelia.start().then(function(a) {
          return a.setRoot();
        });
      });
    }
  }
  function run() {
    return ready(window).then(function(doc) {
      var appHost = doc.querySelectorAll('[aurelia-app]');
      return ensureLoader().then(function() {
        return preparePlatform().then(function() {
          var i,
              ii;
          for (i = 0, ii = appHost.length; i < ii; ++i) {
            handleApp(appHost[i]);
          }
          isReady = true;
          for (i = 0, ii = readyQueue.length; i < ii; ++i) {
            readyQueue[i]();
          }
          readyQueue = [];
        });
      });
    });
  }
  return {
    setters: [function(_coreJs) {
      core = _coreJs['default'];
    }, function(_aureliaFramework) {
      Aurelia = _aureliaFramework.Aurelia;
      LogManager = _aureliaFramework.LogManager;
    }, function(_aureliaLoggingConsole) {
      ConsoleAppender = _aureliaLoggingConsole.ConsoleAppender;
    }],
    execute: function() {
      logger = LogManager.getLogger('bootstrapper');
      readyQueue = [];
      isReady = false;
      installedDevelopmentLogging = false;
      run();
    }
  };
});

System.register("github:aurelia/bootstrapper@0.13.1", ["github:aurelia/bootstrapper@0.13.1/index"], function($__export) {
  return {
    setters: [function(m) {
      for (var p in m)
        $__export(p, m[p]);
    }],
    execute: function() {}
  };
});

System.register("npm:core-js@0.9.16/library/modules/$.fw", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = function($) {
    $.FW = false;
    $.path = $.core;
    return $;
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:babel-runtime@5.5.6/helpers/create-decorated-class", ["npm:babel-runtime@5.5.6/core-js/object/define-property"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var _Object$defineProperty = require("npm:babel-runtime@5.5.6/core-js/object/define-property")["default"];
  exports["default"] = (function() {
    function defineProperties(target, descriptors, initializers) {
      for (var i = 0; i < descriptors.length; i++) {
        var descriptor = descriptors[i];
        var decorators = descriptor.decorators;
        var key = descriptor.key;
        delete descriptor.key;
        delete descriptor.decorators;
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor || descriptor.initializer)
          descriptor.writable = true;
        if (decorators) {
          for (var f = 0; f < decorators.length; f++) {
            var decorator = decorators[f];
            if (typeof decorator === "function") {
              descriptor = decorator(target, key, descriptor) || descriptor;
            } else {
              throw new TypeError("The decorator for method " + descriptor.key + " is of the invalid type " + typeof decorator);
            }
          }
          if (descriptor.initializer !== undefined) {
            initializers[key] = descriptor;
            continue;
          }
        }
        _Object$defineProperty(target, key, descriptor);
      }
    }
    return function(Constructor, protoProps, staticProps, protoInitializers, staticInitializers) {
      if (protoProps)
        defineProperties(Constructor.prototype, protoProps, protoInitializers);
      if (staticProps)
        defineProperties(Constructor, staticProps, staticInitializers);
      return Constructor;
    };
  })();
  exports.__esModule = true;
  global.define = __define;
  return module.exports;
});

System.register("npm:babel-runtime@5.5.6/helpers/class-call-check", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  exports["default"] = function(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };
  exports.__esModule = true;
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.16/library/modules/$", ["npm:core-js@0.9.16/library/modules/$.fw"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var global = typeof self != 'undefined' ? self : Function('return this')(),
      core = {},
      defineProperty = Object.defineProperty,
      hasOwnProperty = {}.hasOwnProperty,
      ceil = Math.ceil,
      floor = Math.floor,
      max = Math.max,
      min = Math.min;
  var DESC = !!function() {
    try {
      return defineProperty({}, 'a', {get: function() {
          return 2;
        }}).a == 2;
    } catch (e) {}
  }();
  var hide = createDefiner(1);
  function toInteger(it) {
    return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
  }
  function desc(bitmap, value) {
    return {
      enumerable: !(bitmap & 1),
      configurable: !(bitmap & 2),
      writable: !(bitmap & 4),
      value: value
    };
  }
  function simpleSet(object, key, value) {
    object[key] = value;
    return object;
  }
  function createDefiner(bitmap) {
    return DESC ? function(object, key, value) {
      return $.setDesc(object, key, desc(bitmap, value));
    } : simpleSet;
  }
  function isObject(it) {
    return it !== null && (typeof it == 'object' || typeof it == 'function');
  }
  function isFunction(it) {
    return typeof it == 'function';
  }
  function assertDefined(it) {
    if (it == undefined)
      throw TypeError("Can't call method on  " + it);
    return it;
  }
  var $ = module.exports = require("npm:core-js@0.9.16/library/modules/$.fw")({
    g: global,
    core: core,
    html: global.document && document.documentElement,
    isObject: isObject,
    isFunction: isFunction,
    that: function() {
      return this;
    },
    toInteger: toInteger,
    toLength: function(it) {
      return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0;
    },
    toIndex: function(index, length) {
      index = toInteger(index);
      return index < 0 ? max(index + length, 0) : min(index, length);
    },
    has: function(it, key) {
      return hasOwnProperty.call(it, key);
    },
    create: Object.create,
    getProto: Object.getPrototypeOf,
    DESC: DESC,
    desc: desc,
    getDesc: Object.getOwnPropertyDescriptor,
    setDesc: defineProperty,
    setDescs: Object.defineProperties,
    getKeys: Object.keys,
    getNames: Object.getOwnPropertyNames,
    getSymbols: Object.getOwnPropertySymbols,
    assertDefined: assertDefined,
    ES5Object: Object,
    toObject: function(it) {
      return $.ES5Object(assertDefined(it));
    },
    hide: hide,
    def: createDefiner(0),
    set: global.Symbol ? simpleSet : hide,
    each: [].forEach
  });
  if (typeof __e != 'undefined')
    __e = core;
  if (typeof __g != 'undefined')
    __g = global;
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.16/library/fn/object/define-property", ["npm:core-js@0.9.16/library/modules/$"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@0.9.16/library/modules/$");
  module.exports = function defineProperty(it, key, desc) {
    return $.setDesc(it, key, desc);
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:babel-runtime@5.5.6/core-js/object/define-property", ["npm:core-js@0.9.16/library/fn/object/define-property"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = {
    "default": require("npm:core-js@0.9.16/library/fn/object/define-property"),
    __esModule: true
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:babel-runtime@5.5.6/helpers/define-decorated-property-descriptor", ["npm:babel-runtime@5.5.6/core-js/object/define-property"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var _Object$defineProperty = require("npm:babel-runtime@5.5.6/core-js/object/define-property")["default"];
  exports["default"] = function(target, key, descriptors) {
    var _descriptor = descriptors[key];
    if (!_descriptor)
      return ;
    var descriptor = {};
    for (var _key in _descriptor)
      descriptor[_key] = _descriptor[_key];
    descriptor.value = descriptor.initializer.call(target);
    _Object$defineProperty(target, key, descriptor);
  };
  exports.__esModule = true;
  global.define = __define;
  return module.exports;
});

System.register("npm:babel-runtime@5.5.6/helpers/create-class", ["npm:babel-runtime@5.5.6/core-js/object/define-property"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var _Object$defineProperty = require("npm:babel-runtime@5.5.6/core-js/object/define-property")["default"];
  exports["default"] = (function() {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        _Object$defineProperty(target, descriptor.key, descriptor);
      }
    }
    return function(Constructor, protoProps, staticProps) {
      if (protoProps)
        defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        defineProperties(Constructor, staticProps);
      return Constructor;
    };
  })();
  exports.__esModule = true;
  global.define = __define;
  return module.exports;
});

System.register("resources/nav-menu", ["npm:babel-runtime@5.5.6/helpers/define-decorated-property-descriptor", "npm:babel-runtime@5.5.6/helpers/create-decorated-class", "npm:babel-runtime@5.5.6/helpers/class-call-check", "github:aurelia/framework@0.12.0"], function (_export) {
    var _defineDecoratedPropertyDescriptor, _createDecoratedClass, _classCallCheck, bindable, NavMenu;

    return {
        setters: [function (_npmBabelRuntime556HelpersDefineDecoratedPropertyDescriptor) {
            _defineDecoratedPropertyDescriptor = _npmBabelRuntime556HelpersDefineDecoratedPropertyDescriptor["default"];
        }, function (_npmBabelRuntime556HelpersCreateDecoratedClass) {
            _createDecoratedClass = _npmBabelRuntime556HelpersCreateDecoratedClass["default"];
        }, function (_npmBabelRuntime556HelpersClassCallCheck) {
            _classCallCheck = _npmBabelRuntime556HelpersClassCallCheck["default"];
        }, function (_githubAureliaFramework0120) {
            bindable = _githubAureliaFramework0120.bindable;
        }],
        execute: function () {
            "use strict";

            NavMenu = (function () {
                var _instanceInitializers = {};

                function NavMenu() {
                    _classCallCheck(this, NavMenu);

                    _defineDecoratedPropertyDescriptor(this, "router", _instanceInitializers);
                }

                _createDecoratedClass(NavMenu, [{
                    key: "router",
                    decorators: [bindable],
                    initializer: function () {
                        return null;
                    },
                    enumerable: true
                }], null, _instanceInitializers);

                return NavMenu;
            })();

            _export("NavMenu", NavMenu);
        }
    };
});
System.register("resources/index", [], function (_export) {
    "use strict";

    _export("configure", configure);

    function configure(aurelia) {
        aurelia.globalizeResources("./nav-menu");
    }

    return {
        setters: [],
        execute: function () {}
    };
});
System.register("movies/movieData", ["npm:babel-runtime@5.5.6/helpers/create-class", "npm:babel-runtime@5.5.6/helpers/class-call-check", "github:aurelia/framework@0.12.0", "github:aurelia/http-client@0.9.1"], function (_export) {
    var _createClass, _classCallCheck, inject, HttpClient, baseUrl, parse, MovieData;

    return {
        setters: [function (_npmBabelRuntime556HelpersCreateClass) {
            _createClass = _npmBabelRuntime556HelpersCreateClass["default"];
        }, function (_npmBabelRuntime556HelpersClassCallCheck) {
            _classCallCheck = _npmBabelRuntime556HelpersClassCallCheck["default"];
        }, function (_githubAureliaFramework0120) {
            inject = _githubAureliaFramework0120.inject;
        }, function (_githubAureliaHttpClient091) {
            HttpClient = _githubAureliaHttpClient091.HttpClient;
        }],
        execute: function () {
            "use strict";

            baseUrl = "/api/movies";

            parse = function parse(message) {
                return JSON.parse(message.response);
            };

            MovieData = (function () {
                function MovieData(httpClient) {
                    _classCallCheck(this, _MovieData);

                    this.http = httpClient;
                    this.http.configure(function (c) {
                        c.withBaseUrl(baseUrl);
                        c.withHeader("Accept", "application/json");
                        c.withHeader("Content-Type", "application/json");
                    });
                }

                var _MovieData = MovieData;

                _createClass(_MovieData, [{
                    key: "getById",
                    value: function getById(id) {
                        return this.http.get("/" + id).then(parse);
                    }
                }, {
                    key: "getAll",
                    value: function getAll() {
                        return this.http.get().then(parse);
                    }
                }, {
                    key: "save",
                    value: function save(movie) {
                        if (movie.Id) {
                            return this.http.put("", movie).then(parse);
                        }
                        return this.http.post("", movie).then(parse);
                    }
                }]);

                MovieData = inject(HttpClient)(MovieData) || MovieData;
                return MovieData;
            })();

            _export("MovieData", MovieData);
        }
    };
});
System.register('movies/list', ['npm:babel-runtime@5.5.6/helpers/create-class', 'npm:babel-runtime@5.5.6/helpers/class-call-check', 'github:aurelia/framework@0.12.0', 'movies/movieData'], function (_export) {
    var _createClass, _classCallCheck, inject, MovieData, List;

    return {
        setters: [function (_npmBabelRuntime556HelpersCreateClass) {
            _createClass = _npmBabelRuntime556HelpersCreateClass['default'];
        }, function (_npmBabelRuntime556HelpersClassCallCheck) {
            _classCallCheck = _npmBabelRuntime556HelpersClassCallCheck['default'];
        }, function (_githubAureliaFramework0120) {
            inject = _githubAureliaFramework0120.inject;
        }, function (_moviesMovieData) {
            MovieData = _moviesMovieData.MovieData;
        }],
        execute: function () {
            'use strict';

            List = (function () {
                function List(movieData) {
                    _classCallCheck(this, _List);

                    this.data = movieData;
                }

                var _List = List;

                _createClass(_List, [{
                    key: 'activate',
                    value: function activate() {
                        var _this = this;

                        return this.data.getAll().then(function (movies) {
                            return _this.movies = movies;
                        });
                    }
                }]);

                List = inject(MovieData)(List) || List;
                return List;
            })();

            _export('List', List);
        }
    };
});
System.register("movies/edit", ["npm:babel-runtime@5.5.6/helpers/create-class", "npm:babel-runtime@5.5.6/helpers/class-call-check", "github:aurelia/framework@0.12.0", "github:aurelia/validation@0.2.5", "movies/movieData", "github:aurelia/router@0.9.0"], function (_export) {
    var _createClass, _classCallCheck, inject, Validation, MovieData, Router, Edit;

    return {
        setters: [function (_npmBabelRuntime556HelpersCreateClass) {
            _createClass = _npmBabelRuntime556HelpersCreateClass["default"];
        }, function (_npmBabelRuntime556HelpersClassCallCheck) {
            _classCallCheck = _npmBabelRuntime556HelpersClassCallCheck["default"];
        }, function (_githubAureliaFramework0120) {
            inject = _githubAureliaFramework0120.inject;
        }, function (_githubAureliaValidation025) {
            Validation = _githubAureliaValidation025.Validation;
        }, function (_moviesMovieData) {
            MovieData = _moviesMovieData.MovieData;
        }, function (_githubAureliaRouter090) {
            Router = _githubAureliaRouter090.Router;
        }],
        execute: function () {
            "use strict";

            Edit = (function () {
                function Edit(movieData, validation, router) {
                    _classCallCheck(this, _Edit);

                    this.data = movieData;
                    this.router = router;
                    this.validation = validation.on(this).ensure("movie.Title").isNotEmpty().hasMinLength(3).hasMaxLength(100).ensure("movie.ReleaseYear").isNumber().isBetween(1900, 2100);
                }

                var _Edit = Edit;

                _createClass(_Edit, [{
                    key: "activate",
                    value: function activate(params) {
                        var _this = this;

                        if (params.id) {
                            this.data.getById(params.id).then(function (movie) {
                                _this.movie = movie;
                                _this.validation.validate();
                            });
                        } else {
                            this.movie = {};
                        }
                    }
                }, {
                    key: "save",
                    value: function save() {
                        var _this2 = this;

                        this.validation.validate().then(function () {
                            return _this2.data.save(_this2.movie);
                        }).then(function (movie) {
                            console.log(movie);
                            var url = _this2.router.generate("details", { id: movie.Id });
                            _this2.router.navigate(url);
                        });
                    }
                }]);

                Edit = inject(MovieData, Validation, Router)(Edit) || Edit;
                return Edit;
            })();

            _export("Edit", Edit);
        }
    };
});
System.register('movies/details', ['npm:babel-runtime@5.5.6/helpers/create-class', 'npm:babel-runtime@5.5.6/helpers/class-call-check', 'github:aurelia/framework@0.12.0', 'movies/movieData'], function (_export) {
    var _createClass, _classCallCheck, inject, MovieData, Details;

    return {
        setters: [function (_npmBabelRuntime556HelpersCreateClass) {
            _createClass = _npmBabelRuntime556HelpersCreateClass['default'];
        }, function (_npmBabelRuntime556HelpersClassCallCheck) {
            _classCallCheck = _npmBabelRuntime556HelpersClassCallCheck['default'];
        }, function (_githubAureliaFramework0120) {
            inject = _githubAureliaFramework0120.inject;
        }, function (_moviesMovieData) {
            MovieData = _moviesMovieData.MovieData;
        }],
        execute: function () {
            'use strict';

            Details = (function () {
                function Details(movieData) {
                    _classCallCheck(this, _Details);

                    this.data = movieData;
                }

                var _Details = Details;

                _createClass(_Details, [{
                    key: 'activate',
                    value: function activate(params) {
                        var _this = this;

                        return this.data.getById(params.id).then(function (movie) {
                            return _this.movie = movie;
                        });
                    }
                }]);

                Details = inject(MovieData)(Details) || Details;
                return Details;
            })();

            _export('Details', Details);
        }
    };
});
System.register("about/about", ["npm:babel-runtime@5.5.6/helpers/class-call-check"], function (_export) {
  var _classCallCheck, About;

  return {
    setters: [function (_npmBabelRuntime556HelpersClassCallCheck) {
      _classCallCheck = _npmBabelRuntime556HelpersClassCallCheck["default"];
    }],
    execute: function () {
      "use strict";

      About = function About() {
        _classCallCheck(this, About);
      };

      _export("About", About);
    }
  };
});
System.register("main", [], function (_export) {
    "use strict";

    _export("configure", configure);

    function configure(aurelia) {
        aurelia.use.standardConfiguration().developmentLogging().plugin("aurelia-validation").plugin("./resources/index");

        aurelia.start().then(function (a) {
            return a.setRoot("app", document.body);
        });
    }

    return {
        setters: [],
        execute: function () {
            ;
        }
    };
});
System.register("app", ["npm:babel-runtime@5.5.6/helpers/create-class", "npm:babel-runtime@5.5.6/helpers/class-call-check"], function (_export) {
    var _createClass, _classCallCheck, App;

    return {
        setters: [function (_npmBabelRuntime556HelpersCreateClass) {
            _createClass = _npmBabelRuntime556HelpersCreateClass["default"];
        }, function (_npmBabelRuntime556HelpersClassCallCheck) {
            _classCallCheck = _npmBabelRuntime556HelpersClassCallCheck["default"];
        }],
        execute: function () {
            "use strict";

            App = (function () {
                function App() {
                    _classCallCheck(this, App);
                }

                _createClass(App, [{
                    key: "configureRouter",
                    value: function configureRouter(config, router) {
                        this.router = router;

                        config.title = "Movies";
                        config.map([{ route: "", name: "home", moduleId: "movies/list", title: "List", nav: true }, { route: "about", moduleId: "about/about", title: "About", nav: true }, { route: "details/:id", name: "details", moduleId: "movies/details" }, { route: "edit/:id", name: "edit", moduleId: "movies/edit" }, { route: "create", name: "create", moduleId: "movies/edit" }]);
                    }
                }]);

                return App;
            })();

            _export("App", App);
        }
    };
});