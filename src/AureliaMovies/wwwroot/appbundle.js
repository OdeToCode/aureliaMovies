"format register";
(function() {
function define(){};  define.amd = {};
System.register("github:aurelia/validation@0.4.0/validation-locale", [], false, function(__require, __exports, __module) {
  return (function(exports) {
    'use strict';
    exports.__esModule = true;
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
      }
    }
    var ValidationLocale = (function() {
      function ValidationLocale(defaults, data) {
        _classCallCheck(this, ValidationLocale);
        this.defaults = defaults;
        this.currentLocale = data;
      }
      ValidationLocale.prototype.getValueFor = function getValueFor(identifier, category) {
        var currentLocaleSetting = undefined;
        var defaultSetting = undefined;
        if (this.currentLocale && this.currentLocale[category]) {
          currentLocaleSetting = this.currentLocale[category][identifier];
          if (currentLocaleSetting !== undefined && currentLocaleSetting !== null) {
            return currentLocaleSetting;
          }
        }
        if (this.defaults[category]) {
          defaultSetting = this.defaults[category][identifier];
          if (defaultSetting !== undefined && defaultSetting !== null) {
            return defaultSetting;
          }
        }
        throw new Error('validation: I18N: Could not find: ' + identifier + ' in category: ' + category);
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
        throw new Error('Validation message for ' + translationIdentifier + 'was in an unsupported format');
      };
      return ValidationLocale;
    })();
    exports.ValidationLocale = ValidationLocale;
    var ValidationLocaleRepository = (function() {
      function ValidationLocaleRepository() {
        _classCallCheck(this, ValidationLocaleRepository);
        this['default'] = null;
        this.instances = new Map();
        this.defaults = {
          settings: {'numericRegex': /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/},
          messages: {}
        };
      }
      ValidationLocaleRepository.prototype.load = function load(localeIdentifier, basePath) {
        var _this = this;
        if (!basePath) {
          basePath = 'aurelia-validation/resources/';
        }
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
        if (this['default'] === null) {
          this['default'] = instance;
        }
        return instance;
      };
      return ValidationLocaleRepository;
    })();
    ValidationLocale.Repository = new ValidationLocaleRepository();
  }).call(__exports, __exports);
});
})();
(function() {
function define(){};  define.amd = {};
System.register("github:aurelia/validation@0.4.0/validation-view-strategy", [], false, function(__require, __exports, __module) {
  return (function(exports) {
    'use strict';
    exports.__esModule = true;
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
      }
    }
    var ValidationViewStrategy = (function() {
      function ValidationViewStrategy() {
        _classCallCheck(this, ValidationViewStrategy);
        this.bindingPathAttributes = ['validate', 'value.bind', 'value.two-way'];
      }
      ValidationViewStrategy.prototype.getValidationProperty = function getValidationProperty(validation, element) {
        var atts = element.attributes;
        for (var i = 0; i < this.bindingPathAttributes.length; i++) {
          var attributeName = this.bindingPathAttributes[i];
          var bindingPath = undefined;
          var validationProperty = undefined;
          if (atts[attributeName]) {
            bindingPath = atts[attributeName].value.trim();
            if (bindingPath.indexOf('|') !== -1) {
              bindingPath = bindingPath.split('|')[0].trim();
            }
            validationProperty = validation.result.properties[bindingPath];
            if (attributeName === 'validate' && (validationProperty === null || validationProperty === undefined)) {
              validation.ensure(bindingPath);
              validationProperty = validation.result.properties[bindingPath];
            }
            return validationProperty;
          }
        }
        return null;
      };
      ValidationViewStrategy.prototype.prepareElement = function prepareElement(validationProperty, element) {
        throw Error('View strategy must implement prepareElement(validationProperty, element)');
      };
      ValidationViewStrategy.prototype.updateElement = function updateElement(validationProperty, element) {
        throw Error('View strategy must implement updateElement(validationProperty, element)');
      };
      return ValidationViewStrategy;
    })();
    exports.ValidationViewStrategy = ValidationViewStrategy;
  }).call(__exports, __exports);
});
})();
System.register("npm:core-js@0.9.18/modules/$.fw", [], true, function(require, exports, module) {
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

System.register("npm:core-js@0.9.18/modules/$.dom-create", ["npm:core-js@0.9.18/modules/$"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@0.9.18/modules/$"),
      document = $.g.document,
      isObject = $.isObject,
      is = isObject(document) && isObject(document.createElement);
  module.exports = function(it) {
    return is ? document.createElement(it) : {};
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/$.shared", ["npm:core-js@0.9.18/modules/$"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@0.9.18/modules/$"),
      SHARED = '__core-js_shared__',
      store = $.g[SHARED] || ($.g[SHARED] = {});
  module.exports = function(key) {
    return store[key] || (store[key] = {});
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/$.uid", ["npm:core-js@0.9.18/modules/$"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var sid = 0;
  function uid(key) {
    return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++sid + Math.random()).toString(36));
  }
  uid.safe = require("npm:core-js@0.9.18/modules/$").g.Symbol || uid;
  module.exports = uid;
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/$.redef", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.uid"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@0.9.18/modules/$"),
      tpl = String({}.hasOwnProperty),
      SRC = require("npm:core-js@0.9.18/modules/$.uid").safe('src'),
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

System.register("npm:core-js@0.9.18/modules/$.invoke", [], true, function(require, exports, module) {
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

System.register("npm:core-js@0.9.18/modules/$.assert", ["npm:core-js@0.9.18/modules/$"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@0.9.18/modules/$");
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

System.register("npm:core-js@0.9.18/modules/$.array-includes", ["npm:core-js@0.9.18/modules/$"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@0.9.18/modules/$");
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

System.register("npm:core-js@0.9.18/modules/$.replacer", [], true, function(require, exports, module) {
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

System.register("npm:core-js@0.9.18/modules/$.throws", [], true, function(require, exports, module) {
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

System.register("npm:core-js@0.9.18/modules/$.keyof", ["npm:core-js@0.9.18/modules/$"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@0.9.18/modules/$");
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

System.register("npm:core-js@0.9.18/modules/$.enum-keys", ["npm:core-js@0.9.18/modules/$"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@0.9.18/modules/$");
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

System.register("npm:core-js@0.9.18/modules/$.get-names", ["npm:core-js@0.9.18/modules/$"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@0.9.18/modules/$"),
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

System.register("npm:core-js@0.9.18/modules/$.assign", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.enum-keys"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@0.9.18/modules/$"),
      enumKeys = require("npm:core-js@0.9.18/modules/$.enum-keys");
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

System.register("npm:core-js@0.9.18/modules/$.same", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = Object.is || function is(x, y) {
    return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/$.set-proto", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.assert", "npm:core-js@0.9.18/modules/$.ctx"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@0.9.18/modules/$"),
      assert = require("npm:core-js@0.9.18/modules/$.assert");
  function check(O, proto) {
    assert.obj(O);
    assert(proto === null || $.isObject(proto), proto, ": can't set as prototype!");
  }
  module.exports = {
    set: Object.setPrototypeOf || ('__proto__' in {} ? function(buggy, set) {
      try {
        set = require("npm:core-js@0.9.18/modules/$.ctx")(Function.call, $.getDesc(Object.prototype, '__proto__').set, 2);
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

System.register("npm:core-js@0.9.18/modules/es6.object.to-string", ["npm:core-js@0.9.18/modules/$.cof", "npm:core-js@0.9.18/modules/$.wks", "npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.redef"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var cof = require("npm:core-js@0.9.18/modules/$.cof"),
      tmp = {};
  tmp[require("npm:core-js@0.9.18/modules/$.wks")('toStringTag')] = 'z';
  if (require("npm:core-js@0.9.18/modules/$").FW && cof(tmp) != 'z') {
    require("npm:core-js@0.9.18/modules/$.redef")(Object.prototype, 'toString', function toString() {
      return '[object ' + cof.classof(this) + ']';
    }, true);
  }
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/es6.object.statics-accept-primitives", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.def", "npm:core-js@0.9.18/modules/$.get-names"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@0.9.18/modules/$"),
      $def = require("npm:core-js@0.9.18/modules/$.def"),
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
    } : require("npm:core-js@0.9.18/modules/$.get-names").get;
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

System.register("npm:core-js@0.9.18/modules/es6.function.name", ["npm:core-js@0.9.18/modules/$"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var $ = require("npm:core-js@0.9.18/modules/$"),
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

System.register("npm:core-js@0.9.18/modules/es6.function.has-instance", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.wks"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@0.9.18/modules/$"),
      HAS_INSTANCE = require("npm:core-js@0.9.18/modules/$.wks")('hasInstance'),
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

System.register("npm:core-js@0.9.18/modules/es6.number.constructor", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.redef"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var $ = require("npm:core-js@0.9.18/modules/$"),
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
    require("npm:core-js@0.9.18/modules/$.redef")($.g, NUMBER, $Number);
  }
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/es6.number.statics", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.def"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@0.9.18/modules/$"),
      $def = require("npm:core-js@0.9.18/modules/$.def"),
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

System.register("npm:core-js@0.9.18/modules/es6.math", ["npm:core-js@0.9.18/modules/$.def"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var Infinity = 1 / 0,
      $def = require("npm:core-js@0.9.18/modules/$.def"),
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

System.register("npm:core-js@0.9.18/modules/es6.string.from-code-point", ["npm:core-js@0.9.18/modules/$.def", "npm:core-js@0.9.18/modules/$"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $def = require("npm:core-js@0.9.18/modules/$.def"),
      toIndex = require("npm:core-js@0.9.18/modules/$").toIndex,
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

System.register("npm:core-js@0.9.18/modules/es6.string.raw", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.def"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@0.9.18/modules/$"),
      $def = require("npm:core-js@0.9.18/modules/$.def");
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

System.register("npm:core-js@0.9.18/modules/$.string-at", ["npm:core-js@0.9.18/modules/$"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@0.9.18/modules/$");
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

System.register("npm:core-js@0.9.18/modules/$.iter", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.cof", "npm:core-js@0.9.18/modules/$.assert", "npm:core-js@0.9.18/modules/$.wks", "npm:core-js@0.9.18/modules/$.shared"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var $ = require("npm:core-js@0.9.18/modules/$"),
      cof = require("npm:core-js@0.9.18/modules/$.cof"),
      classof = cof.classof,
      assert = require("npm:core-js@0.9.18/modules/$.assert"),
      assertObject = assert.obj,
      SYMBOL_ITERATOR = require("npm:core-js@0.9.18/modules/$.wks")('iterator'),
      FF_ITERATOR = '@@iterator',
      Iterators = require("npm:core-js@0.9.18/modules/$.shared")('iterators'),
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

System.register("npm:core-js@0.9.18/modules/$.iter-define", ["npm:core-js@0.9.18/modules/$.def", "npm:core-js@0.9.18/modules/$.redef", "npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.cof", "npm:core-js@0.9.18/modules/$.iter", "npm:core-js@0.9.18/modules/$.wks"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $def = require("npm:core-js@0.9.18/modules/$.def"),
      $redef = require("npm:core-js@0.9.18/modules/$.redef"),
      $ = require("npm:core-js@0.9.18/modules/$"),
      cof = require("npm:core-js@0.9.18/modules/$.cof"),
      $iter = require("npm:core-js@0.9.18/modules/$.iter"),
      SYMBOL_ITERATOR = require("npm:core-js@0.9.18/modules/$.wks")('iterator'),
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

System.register("npm:core-js@0.9.18/modules/es6.string.code-point-at", ["npm:core-js@0.9.18/modules/$.def", "npm:core-js@0.9.18/modules/$.string-at"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var $def = require("npm:core-js@0.9.18/modules/$.def"),
      $at = require("npm:core-js@0.9.18/modules/$.string-at")(false);
  $def($def.P, 'String', {codePointAt: function codePointAt(pos) {
      return $at(this, pos);
    }});
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/es6.string.ends-with", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.cof", "npm:core-js@0.9.18/modules/$.def", "npm:core-js@0.9.18/modules/$.throws"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var $ = require("npm:core-js@0.9.18/modules/$"),
      cof = require("npm:core-js@0.9.18/modules/$.cof"),
      $def = require("npm:core-js@0.9.18/modules/$.def"),
      toLength = $.toLength;
  $def($def.P + $def.F * !require("npm:core-js@0.9.18/modules/$.throws")(function() {
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

System.register("npm:core-js@0.9.18/modules/es6.string.includes", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.cof", "npm:core-js@0.9.18/modules/$.def"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var $ = require("npm:core-js@0.9.18/modules/$"),
      cof = require("npm:core-js@0.9.18/modules/$.cof"),
      $def = require("npm:core-js@0.9.18/modules/$.def");
  $def($def.P, 'String', {includes: function includes(searchString) {
      if (cof(searchString) == 'RegExp')
        throw TypeError();
      return !!~String($.assertDefined(this)).indexOf(searchString, arguments[1]);
    }});
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/$.string-repeat", ["npm:core-js@0.9.18/modules/$"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var $ = require("npm:core-js@0.9.18/modules/$");
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

System.register("npm:core-js@0.9.18/modules/es6.string.starts-with", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.cof", "npm:core-js@0.9.18/modules/$.def", "npm:core-js@0.9.18/modules/$.throws"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var $ = require("npm:core-js@0.9.18/modules/$"),
      cof = require("npm:core-js@0.9.18/modules/$.cof"),
      $def = require("npm:core-js@0.9.18/modules/$.def");
  $def($def.P + $def.F * !require("npm:core-js@0.9.18/modules/$.throws")(function() {
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

System.register("npm:core-js@0.9.18/modules/$.iter-call", ["npm:core-js@0.9.18/modules/$.assert"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var assertObject = require("npm:core-js@0.9.18/modules/$.assert").obj;
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

System.register("npm:core-js@0.9.18/modules/$.iter-detect", ["npm:core-js@0.9.18/modules/$.wks"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var SYMBOL_ITERATOR = require("npm:core-js@0.9.18/modules/$.wks")('iterator'),
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

System.register("npm:core-js@0.9.18/modules/es6.array.of", ["npm:core-js@0.9.18/modules/$.def"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $def = require("npm:core-js@0.9.18/modules/$.def");
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

System.register("npm:core-js@0.9.18/modules/$.unscope", ["npm:core-js@0.9.18/modules/$.wks", "npm:core-js@0.9.18/modules/$"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var UNSCOPABLES = require("npm:core-js@0.9.18/modules/$.wks")('unscopables');
  if (!(UNSCOPABLES in []))
    require("npm:core-js@0.9.18/modules/$").hide(Array.prototype, UNSCOPABLES, {});
  module.exports = function(key) {
    [][UNSCOPABLES][key] = true;
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/$.species", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.wks"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@0.9.18/modules/$"),
      SPECIES = require("npm:core-js@0.9.18/modules/$.wks")('species');
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

System.register("npm:core-js@0.9.18/modules/es6.array.copy-within", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.def", "npm:core-js@0.9.18/modules/$.unscope"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var $ = require("npm:core-js@0.9.18/modules/$"),
      $def = require("npm:core-js@0.9.18/modules/$.def"),
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
  require("npm:core-js@0.9.18/modules/$.unscope")('copyWithin');
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/es6.array.fill", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.def", "npm:core-js@0.9.18/modules/$.unscope"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var $ = require("npm:core-js@0.9.18/modules/$"),
      $def = require("npm:core-js@0.9.18/modules/$.def"),
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
  require("npm:core-js@0.9.18/modules/$.unscope")('fill');
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/es6.array.find", ["npm:core-js@0.9.18/modules/$.def", "npm:core-js@0.9.18/modules/$.array-methods", "npm:core-js@0.9.18/modules/$.unscope"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var KEY = 'find',
      $def = require("npm:core-js@0.9.18/modules/$.def"),
      forced = true,
      $find = require("npm:core-js@0.9.18/modules/$.array-methods")(5);
  if (KEY in [])
    Array(1)[KEY](function() {
      forced = false;
    });
  $def($def.P + $def.F * forced, 'Array', {find: function find(callbackfn) {
      return $find(this, callbackfn, arguments[1]);
    }});
  require("npm:core-js@0.9.18/modules/$.unscope")(KEY);
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/es6.array.find-index", ["npm:core-js@0.9.18/modules/$.def", "npm:core-js@0.9.18/modules/$.array-methods", "npm:core-js@0.9.18/modules/$.unscope"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var KEY = 'findIndex',
      $def = require("npm:core-js@0.9.18/modules/$.def"),
      forced = true,
      $find = require("npm:core-js@0.9.18/modules/$.array-methods")(6);
  if (KEY in [])
    Array(1)[KEY](function() {
      forced = false;
    });
  $def($def.P + $def.F * forced, 'Array', {findIndex: function findIndex(callbackfn) {
      return $find(this, callbackfn, arguments[1]);
    }});
  require("npm:core-js@0.9.18/modules/$.unscope")(KEY);
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/es6.regexp", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.cof", "npm:core-js@0.9.18/modules/$.redef", "npm:core-js@0.9.18/modules/$.replacer", "npm:core-js@0.9.18/modules/$.species"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@0.9.18/modules/$"),
      cof = require("npm:core-js@0.9.18/modules/$.cof"),
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
      require("npm:core-js@0.9.18/modules/$.redef")($.g, 'RegExp', $RegExp);
    }
    if (/./g.flags != 'g')
      $.setDesc(proto, 'flags', {
        configurable: true,
        get: require("npm:core-js@0.9.18/modules/$.replacer")(/^.*\/(\w*)$/, '$1')
      });
  }
  require("npm:core-js@0.9.18/modules/$.species")($RegExp);
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/$.for-of", ["npm:core-js@0.9.18/modules/$.ctx", "npm:core-js@0.9.18/modules/$.iter", "npm:core-js@0.9.18/modules/$.iter-call"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var ctx = require("npm:core-js@0.9.18/modules/$.ctx"),
      get = require("npm:core-js@0.9.18/modules/$.iter").get,
      call = require("npm:core-js@0.9.18/modules/$.iter-call");
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

System.register("npm:process@0.11.2/browser", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var process = module.exports = {};
  var queue = [];
  var draining = false;
  var currentQueue;
  var queueIndex = -1;
  function cleanUpNextTick() {
    draining = false;
    if (currentQueue.length) {
      queue = currentQueue.concat(queue);
    } else {
      queueIndex = -1;
    }
    if (queue.length) {
      drainQueue();
    }
  }
  function drainQueue() {
    if (draining) {
      return ;
    }
    var timeout = setTimeout(cleanUpNextTick);
    draining = true;
    var len = queue.length;
    while (len) {
      currentQueue = queue;
      queue = [];
      while (++queueIndex < len) {
        if (currentQueue) {
          currentQueue[queueIndex].run();
        }
      }
      queueIndex = -1;
      len = queue.length;
    }
    currentQueue = null;
    draining = false;
    clearTimeout(timeout);
  }
  process.nextTick = function(fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
      for (var i = 1; i < arguments.length; i++) {
        args[i - 1] = arguments[i];
      }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
      setTimeout(drainQueue, 0);
    }
  };
  function Item(fun, array) {
    this.fun = fun;
    this.array = array;
  }
  Item.prototype.run = function() {
    this.fun.apply(null, this.array);
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

System.register("npm:core-js@0.9.18/modules/$.mix", ["npm:core-js@0.9.18/modules/$.redef"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $redef = require("npm:core-js@0.9.18/modules/$.redef");
  module.exports = function(target, src) {
    for (var key in src)
      $redef(target, key, src[key]);
    return target;
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/$.collection-strong", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.ctx", "npm:core-js@0.9.18/modules/$.uid", "npm:core-js@0.9.18/modules/$.assert", "npm:core-js@0.9.18/modules/$.for-of", "npm:core-js@0.9.18/modules/$.iter", "npm:core-js@0.9.18/modules/$.mix", "npm:core-js@0.9.18/modules/$.iter-define"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var $ = require("npm:core-js@0.9.18/modules/$"),
      ctx = require("npm:core-js@0.9.18/modules/$.ctx"),
      safe = require("npm:core-js@0.9.18/modules/$.uid").safe,
      assert = require("npm:core-js@0.9.18/modules/$.assert"),
      forOf = require("npm:core-js@0.9.18/modules/$.for-of"),
      step = require("npm:core-js@0.9.18/modules/$.iter").step,
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
      require("npm:core-js@0.9.18/modules/$.mix")(C.prototype, {
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
      require("npm:core-js@0.9.18/modules/$.iter-define")(C, NAME, function(iterated, kind) {
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

System.register("npm:core-js@0.9.18/modules/$.collection", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.def", "npm:core-js@0.9.18/modules/$.iter", "npm:core-js@0.9.18/modules/$.for-of", "npm:core-js@0.9.18/modules/$.species", "npm:core-js@0.9.18/modules/$.assert", "npm:core-js@0.9.18/modules/$.redef", "npm:core-js@0.9.18/modules/$.mix", "npm:core-js@0.9.18/modules/$.iter-detect", "npm:core-js@0.9.18/modules/$.cof"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var $ = require("npm:core-js@0.9.18/modules/$"),
      $def = require("npm:core-js@0.9.18/modules/$.def"),
      BUGGY = require("npm:core-js@0.9.18/modules/$.iter").BUGGY,
      forOf = require("npm:core-js@0.9.18/modules/$.for-of"),
      species = require("npm:core-js@0.9.18/modules/$.species"),
      assertInstance = require("npm:core-js@0.9.18/modules/$.assert").inst;
  module.exports = function(NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
    var Base = $.g[NAME],
        C = Base,
        ADDER = IS_MAP ? 'set' : 'add',
        proto = C && C.prototype,
        O = {};
    function fixMethod(KEY) {
      var fn = proto[KEY];
      require("npm:core-js@0.9.18/modules/$.redef")(proto, KEY, KEY == 'delete' ? function(a) {
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
      require("npm:core-js@0.9.18/modules/$.mix")(C.prototype, methods);
    } else {
      var inst = new C,
          chain = inst[ADDER](IS_WEAK ? {} : -0, 1),
          buggyZero;
      if (!require("npm:core-js@0.9.18/modules/$.iter-detect")(function(iter) {
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
    require("npm:core-js@0.9.18/modules/$.cof").set(C, NAME);
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

System.register("npm:core-js@0.9.18/modules/es6.set", ["npm:core-js@0.9.18/modules/$.collection-strong", "npm:core-js@0.9.18/modules/$.collection"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var strong = require("npm:core-js@0.9.18/modules/$.collection-strong");
  require("npm:core-js@0.9.18/modules/$.collection")('Set', function(get) {
    return function Set() {
      return get(this, arguments[0]);
    };
  }, {add: function add(value) {
      return strong.def(this, value = value === 0 ? 0 : value, value);
    }}, strong);
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/$.collection-weak", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.uid", "npm:core-js@0.9.18/modules/$.assert", "npm:core-js@0.9.18/modules/$.for-of", "npm:core-js@0.9.18/modules/$.array-methods", "npm:core-js@0.9.18/modules/$.mix"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var $ = require("npm:core-js@0.9.18/modules/$"),
      safe = require("npm:core-js@0.9.18/modules/$.uid").safe,
      assert = require("npm:core-js@0.9.18/modules/$.assert"),
      forOf = require("npm:core-js@0.9.18/modules/$.for-of"),
      $has = $.has,
      isObject = $.isObject,
      hide = $.hide,
      isExtensible = Object.isExtensible || isObject,
      id = 0,
      ID = safe('id'),
      WEAK = safe('weak'),
      LEAK = safe('leak'),
      method = require("npm:core-js@0.9.18/modules/$.array-methods"),
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
      require("npm:core-js@0.9.18/modules/$.mix")(C.prototype, {
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

System.register("npm:core-js@0.9.18/modules/es6.weak-set", ["npm:core-js@0.9.18/modules/$.collection-weak", "npm:core-js@0.9.18/modules/$.collection"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var weak = require("npm:core-js@0.9.18/modules/$.collection-weak");
  require("npm:core-js@0.9.18/modules/$.collection")('WeakSet', function(get) {
    return function WeakSet() {
      return get(this, arguments[0]);
    };
  }, {add: function add(value) {
      return weak.def(this, value, true);
    }}, weak, false, true);
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/$.own-keys", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.assert"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@0.9.18/modules/$"),
      assertObject = require("npm:core-js@0.9.18/modules/$.assert").obj;
  module.exports = function ownKeys(it) {
    assertObject(it);
    var keys = $.getNames(it),
        getSymbols = $.getSymbols;
    return getSymbols ? keys.concat(getSymbols(it)) : keys;
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/es7.array.includes", ["npm:core-js@0.9.18/modules/$.def", "npm:core-js@0.9.18/modules/$.array-includes", "npm:core-js@0.9.18/modules/$.unscope"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var $def = require("npm:core-js@0.9.18/modules/$.def"),
      $includes = require("npm:core-js@0.9.18/modules/$.array-includes")(true);
  $def($def.P, 'Array', {includes: function includes(el) {
      return $includes(this, el, arguments[1]);
    }});
  require("npm:core-js@0.9.18/modules/$.unscope")('includes');
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/es7.string.at", ["npm:core-js@0.9.18/modules/$.def", "npm:core-js@0.9.18/modules/$.string-at"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var $def = require("npm:core-js@0.9.18/modules/$.def"),
      $at = require("npm:core-js@0.9.18/modules/$.string-at")(true);
  $def($def.P, 'String', {at: function at(pos) {
      return $at(this, pos);
    }});
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/$.string-pad", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.string-repeat"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@0.9.18/modules/$"),
      repeat = require("npm:core-js@0.9.18/modules/$.string-repeat");
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

System.register("npm:core-js@0.9.18/modules/es7.string.rpad", ["npm:core-js@0.9.18/modules/$.def", "npm:core-js@0.9.18/modules/$.string-pad"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var $def = require("npm:core-js@0.9.18/modules/$.def"),
      $pad = require("npm:core-js@0.9.18/modules/$.string-pad");
  $def($def.P, 'String', {rpad: function rpad(n) {
      return $pad(this, n, arguments[1], false);
    }});
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/es7.regexp.escape", ["npm:core-js@0.9.18/modules/$.def", "npm:core-js@0.9.18/modules/$.replacer"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $def = require("npm:core-js@0.9.18/modules/$.def");
  $def($def.S, 'RegExp', {escape: require("npm:core-js@0.9.18/modules/$.replacer")(/[\\^$*+?.()|[\]{}]/g, '\\$&', true)});
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/es7.object.get-own-property-descriptors", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.def", "npm:core-js@0.9.18/modules/$.own-keys"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@0.9.18/modules/$"),
      $def = require("npm:core-js@0.9.18/modules/$.def"),
      ownKeys = require("npm:core-js@0.9.18/modules/$.own-keys");
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

System.register("npm:core-js@0.9.18/modules/es7.object.to-array", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.def"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@0.9.18/modules/$"),
      $def = require("npm:core-js@0.9.18/modules/$.def");
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

System.register("npm:core-js@0.9.18/modules/$.collection-to-json", ["npm:core-js@0.9.18/modules/$.def", "npm:core-js@0.9.18/modules/$.for-of"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $def = require("npm:core-js@0.9.18/modules/$.def"),
      forOf = require("npm:core-js@0.9.18/modules/$.for-of");
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

System.register("npm:core-js@0.9.18/modules/es7.set.to-json", ["npm:core-js@0.9.18/modules/$.collection-to-json"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  require("npm:core-js@0.9.18/modules/$.collection-to-json")('Set');
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/js.array.statics", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.def", "npm:core-js@0.9.18/modules/$.ctx"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@0.9.18/modules/$"),
      $def = require("npm:core-js@0.9.18/modules/$.def"),
      $Array = $.core.Array || Array,
      statics = {};
  function setStatics(keys, length) {
    $.each.call(keys.split(','), function(key) {
      if (length == undefined && key in $Array)
        statics[key] = $Array[key];
      else if (key in [])
        statics[key] = require("npm:core-js@0.9.18/modules/$.ctx")(Function.call, [][key], length);
    });
  }
  setStatics('pop,reverse,shift,keys,values,entries', 1);
  setStatics('indexOf,every,some,forEach,map,filter,find,findIndex,includes', 3);
  setStatics('join,slice,concat,push,splice,unshift,sort,lastIndexOf,' + 'reduce,reduceRight,copyWithin,fill,turn');
  $def($def.S, 'Array', statics);
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/$.partial", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.invoke", "npm:core-js@0.9.18/modules/$.assert"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var $ = require("npm:core-js@0.9.18/modules/$"),
      invoke = require("npm:core-js@0.9.18/modules/$.invoke"),
      assertFunction = require("npm:core-js@0.9.18/modules/$.assert").fn;
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

System.register("npm:core-js@0.9.18/modules/web.immediate", ["npm:core-js@0.9.18/modules/$.def", "npm:core-js@0.9.18/modules/$.task"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $def = require("npm:core-js@0.9.18/modules/$.def"),
      $task = require("npm:core-js@0.9.18/modules/$.task");
  $def($def.G + $def.B, {
    setImmediate: $task.set,
    clearImmediate: $task.clear
  });
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/web.dom.iterable", ["npm:core-js@0.9.18/modules/es6.array.iterator", "npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.iter", "npm:core-js@0.9.18/modules/$.wks"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  require("npm:core-js@0.9.18/modules/es6.array.iterator");
  var $ = require("npm:core-js@0.9.18/modules/$"),
      Iterators = require("npm:core-js@0.9.18/modules/$.iter").Iterators,
      ITERATOR = require("npm:core-js@0.9.18/modules/$.wks")('iterator'),
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

System.register("npm:core-js@0.9.18/modules/core.dict", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.ctx", "npm:core-js@0.9.18/modules/$.def", "npm:core-js@0.9.18/modules/$.assign", "npm:core-js@0.9.18/modules/$.keyof", "npm:core-js@0.9.18/modules/$.uid", "npm:core-js@0.9.18/modules/$.assert", "npm:core-js@0.9.18/modules/$.iter", "npm:core-js@0.9.18/modules/$.for-of"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@0.9.18/modules/$"),
      ctx = require("npm:core-js@0.9.18/modules/$.ctx"),
      $def = require("npm:core-js@0.9.18/modules/$.def"),
      assign = require("npm:core-js@0.9.18/modules/$.assign"),
      keyOf = require("npm:core-js@0.9.18/modules/$.keyof"),
      ITER = require("npm:core-js@0.9.18/modules/$.uid").safe('iter'),
      assert = require("npm:core-js@0.9.18/modules/$.assert"),
      $iter = require("npm:core-js@0.9.18/modules/$.iter"),
      forOf = require("npm:core-js@0.9.18/modules/$.for-of"),
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

System.register("npm:core-js@0.9.18/modules/core.iter-helpers", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.iter"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var core = require("npm:core-js@0.9.18/modules/$").core,
      $iter = require("npm:core-js@0.9.18/modules/$.iter");
  core.isIterable = $iter.is;
  core.getIterator = $iter.get;
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/core.$for", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.ctx", "npm:core-js@0.9.18/modules/$.uid", "npm:core-js@0.9.18/modules/$.def", "npm:core-js@0.9.18/modules/$.iter", "npm:core-js@0.9.18/modules/$.for-of", "npm:core-js@0.9.18/modules/$.iter-call", "npm:core-js@0.9.18/modules/$.mix"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var $ = require("npm:core-js@0.9.18/modules/$"),
      ctx = require("npm:core-js@0.9.18/modules/$.ctx"),
      safe = require("npm:core-js@0.9.18/modules/$.uid").safe,
      $def = require("npm:core-js@0.9.18/modules/$.def"),
      $iter = require("npm:core-js@0.9.18/modules/$.iter"),
      forOf = require("npm:core-js@0.9.18/modules/$.for-of"),
      ENTRIES = safe('entries'),
      FN = safe('fn'),
      ITER = safe('iter'),
      call = require("npm:core-js@0.9.18/modules/$.iter-call"),
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
  require("npm:core-js@0.9.18/modules/$.mix")($forProto, {
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

System.register("npm:core-js@0.9.18/modules/core.delay", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.def", "npm:core-js@0.9.18/modules/$.partial"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@0.9.18/modules/$"),
      $def = require("npm:core-js@0.9.18/modules/$.def"),
      partial = require("npm:core-js@0.9.18/modules/$.partial");
  $def($def.G + $def.F, {delay: function(time) {
      return new ($.core.Promise || $.g.Promise)(function(resolve) {
        setTimeout(partial.call(resolve, true), time);
      });
    }});
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/core.function.part", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.def", "npm:core-js@0.9.18/modules/$.partial"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var $ = require("npm:core-js@0.9.18/modules/$"),
      $def = require("npm:core-js@0.9.18/modules/$.def");
  $.core._ = $.path._ = $.path._ || {};
  $def($def.P + $def.F, 'Function', {part: require("npm:core-js@0.9.18/modules/$.partial")});
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/core.object", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.def", "npm:core-js@0.9.18/modules/$.own-keys", "npm:core-js@0.9.18/modules/$.cof"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@0.9.18/modules/$"),
      $def = require("npm:core-js@0.9.18/modules/$.def"),
      ownKeys = require("npm:core-js@0.9.18/modules/$.own-keys");
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
    classof: require("npm:core-js@0.9.18/modules/$.cof").classof,
    define: define,
    make: function(proto, mixin) {
      return define($.create(proto), mixin);
    }
  });
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/core.array.turn", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.def", "npm:core-js@0.9.18/modules/$.assert", "npm:core-js@0.9.18/modules/$.unscope"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var $ = require("npm:core-js@0.9.18/modules/$"),
      $def = require("npm:core-js@0.9.18/modules/$.def"),
      assertFunction = require("npm:core-js@0.9.18/modules/$.assert").fn;
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
  require("npm:core-js@0.9.18/modules/$.unscope")('turn');
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/core.number.iterator", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.uid", "npm:core-js@0.9.18/modules/$.iter-define"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var $ = require("npm:core-js@0.9.18/modules/$"),
      ITER = require("npm:core-js@0.9.18/modules/$.uid").safe('iter');
  require("npm:core-js@0.9.18/modules/$.iter-define")(Number, 'Number', function(iterated) {
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

System.register("npm:core-js@0.9.18/modules/core.number.math", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.def", "npm:core-js@0.9.18/modules/$.invoke"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var $ = require("npm:core-js@0.9.18/modules/$"),
      $def = require("npm:core-js@0.9.18/modules/$.def"),
      invoke = require("npm:core-js@0.9.18/modules/$.invoke"),
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

System.register("npm:core-js@0.9.18/modules/core.string.escape-html", ["npm:core-js@0.9.18/modules/$.def", "npm:core-js@0.9.18/modules/$.replacer"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $def = require("npm:core-js@0.9.18/modules/$.def"),
      replacer = require("npm:core-js@0.9.18/modules/$.replacer");
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

System.register("npm:core-js@0.9.18/modules/core.date", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.def"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@0.9.18/modules/$"),
      $def = require("npm:core-js@0.9.18/modules/$.def"),
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

System.register("npm:core-js@0.9.18/modules/core.global", ["npm:core-js@0.9.18/modules/$.def", "npm:core-js@0.9.18/modules/$"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $def = require("npm:core-js@0.9.18/modules/$.def");
  $def($def.G + $def.F, {global: require("npm:core-js@0.9.18/modules/$").g});
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/core.log", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.def", "npm:core-js@0.9.18/modules/$.assign"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@0.9.18/modules/$"),
      $def = require("npm:core-js@0.9.18/modules/$.def"),
      log = {},
      enabled = true;
  $.each.call(('assert,clear,count,debug,dir,dirxml,error,exception,' + 'group,groupCollapsed,groupEnd,info,isIndependentlyComposed,log,' + 'markTimeline,profile,profileEnd,table,time,timeEnd,timeline,' + 'timelineEnd,timeStamp,trace,warn').split(','), function(key) {
    log[key] = function() {
      if (enabled && $.g.console && $.isFunction(console[key])) {
        return Function.apply.call(console[key], console, arguments);
      }
    };
  });
  $def($def.G + $def.F, {log: require("npm:core-js@0.9.18/modules/$.assign")(log.log, log, {
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

(function() {
function define(){};  define.amd = {};
System.register("github:aurelia/pal@0.2.0/aurelia-pal", [], false, function(__require, __exports, __module) {
  return (function(exports) {
    'use strict';
    exports.__esModule = true;
    exports.AggregateError = AggregateError;
    exports.initializePAL = initializePAL;
    function AggregateError(message, innerError, skipIfAlreadyAggregate) {
      if (innerError) {
        if (innerError.innerError && skipIfAlreadyAggregate) {
          return innerError;
        }
        if (innerError.stack) {
          message += '\n------------------------------------------------\ninner error: ' + innerError.stack;
        }
      }
      var e = new Error(message);
      if (innerError) {
        e.innerError = innerError;
      }
      return e;
    }
    var FEATURE = {};
    exports.FEATURE = FEATURE;
    var PLATFORM = {
      noop: function noop() {},
      eachModule: function eachModule() {}
    };
    exports.PLATFORM = PLATFORM;
    PLATFORM.global = (function() {
      if (typeof self !== 'undefined') {
        return self;
      }
      if (typeof global !== 'undefined') {
        return global;
      }
      return new Function('return this')();
    })();
    var DOM = {};
    exports.DOM = DOM;
    function initializePAL(callback) {
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
      callback(PLATFORM, FEATURE, DOM);
    }
  }).call(__exports, __exports);
});
})();
(function() {
function define(){};  define.amd = {};
System.register("github:aurelia/task-queue@0.8.0/aurelia-task-queue", ["github:aurelia/pal@0.2.0"], false, function(__require, __exports, __module) {
  return (function(exports, _aureliaPal) {
    'use strict';
    exports.__esModule = true;
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
      }
    }
    var hasSetImmediate = typeof setImmediate === 'function';
    function makeRequestFlushFromMutationObserver(flush) {
      var toggle = 1;
      var observer = _aureliaPal.DOM.createMutationObserver(flush);
      var node = _aureliaPal.DOM.createTextNode('');
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
    function onError(error, task) {
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
    }
    var TaskQueue = (function() {
      function TaskQueue() {
        var _this = this;
        _classCallCheck(this, TaskQueue);
        this.microTaskQueue = [];
        this.microTaskQueueCapacity = 1024;
        this.taskQueue = [];
        this.requestFlushMicroTaskQueue = makeRequestFlushFromMutationObserver(function() {
          return _this.flushMicroTaskQueue();
        });
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
        var queue = this.taskQueue;
        var index = 0;
        var task = undefined;
        this.taskQueue = [];
        try {
          while (index < queue.length) {
            task = queue[index];
            task.call();
            index++;
          }
        } catch (error) {
          onError(error, task);
        }
      };
      TaskQueue.prototype.flushMicroTaskQueue = function flushMicroTaskQueue() {
        var queue = this.microTaskQueue;
        var capacity = this.microTaskQueueCapacity;
        var index = 0;
        var task = undefined;
        try {
          while (index < queue.length) {
            task = queue[index];
            task.call();
            index++;
            if (index > capacity) {
              for (var scan = 0; scan < index; scan++) {
                queue[scan] = queue[scan + index];
              }
              queue.length -= index;
              index = 0;
            }
          }
        } catch (error) {
          onError(error, task);
        }
        queue.length = 0;
      };
      return TaskQueue;
    })();
    exports.TaskQueue = TaskQueue;
  }).call(__exports, __exports, __require('github:aurelia/pal@0.2.0'));
});
})();
(function() {
function define(){};  define.amd = {};
System.register("github:aurelia/metadata@0.9.0/aurelia-metadata", ["npm:core-js@0.9.18", "github:aurelia/pal@0.2.0"], false, function(__require, __exports, __module) {
  return (function(exports, _coreJs, _aureliaPal) {
    'use strict';
    exports.__esModule = true;
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
      }
    }
    var theGlobal = _aureliaPal.PLATFORM.global;
    var emptyMetadata = Object.freeze({});
    var metadataContainerKey = '__metadata__';
    if (typeof theGlobal.Reflect === 'undefined') {
      theGlobal.Reflect = {};
    }
    if (typeof theGlobal.Reflect.getOwnMetadata === 'undefined') {
      Reflect.getOwnMetadata = function(metadataKey, target, targetKey) {
        return ((target[metadataContainerKey] || emptyMetadata)[targetKey] || emptyMetadata)[metadataKey];
      };
    }
    if (typeof theGlobal.Reflect.defineMetadata === 'undefined') {
      Reflect.defineMetadata = function(metadataKey, metadataValue, target, targetKey) {
        var metadataContainer = target.hasOwnProperty(metadataContainerKey) ? target[metadataContainerKey] : target[metadataContainerKey] = {};
        var targetContainer = metadataContainer[targetKey] || (metadataContainer[targetKey] = {});
        targetContainer[metadataKey] = metadataValue;
      };
    }
    if (typeof theGlobal.Reflect.metadata === 'undefined') {
      Reflect.metadata = function(metadataKey, metadataValue) {
        return function(target, targetKey) {
          Reflect.defineMetadata(metadataKey, metadataValue, target, targetKey);
        };
      };
    }
    function ensureDecorators(target) {
      var applicator = undefined;
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
    var metadata = {
      resource: 'aurelia:resource',
      paramTypes: 'design:paramtypes',
      properties: 'design:properties',
      get: function get(metadataKey, target, targetKey) {
        if (!target) {
          return undefined;
        }
        var result = metadata.getOwn(metadataKey, target, targetKey);
        return result === undefined ? metadata.get(metadataKey, Object.getPrototypeOf(target), targetKey) : result;
      },
      getOwn: function getOwn(metadataKey, target, targetKey) {
        if (!target) {
          return undefined;
        }
        if (target.hasOwnProperty('decorators')) {
          ensureDecorators(target);
        }
        return Reflect.getOwnMetadata(metadataKey, target, targetKey);
      },
      define: function define(metadataKey, metadataValue, target, targetKey) {
        Reflect.defineMetadata(metadataKey, metadataValue, target, targetKey);
      },
      getOrCreateOwn: function getOrCreateOwn(metadataKey, Type, target, targetKey) {
        var result = metadata.getOwn(metadataKey, target, targetKey);
        if (result === undefined) {
          result = new Type();
          Reflect.defineMetadata(metadataKey, result, target, targetKey);
        }
        return result;
      }
    };
    exports.metadata = metadata;
    var originStorage = new Map();
    var unknownOrigin = Object.freeze({
      moduleId: undefined,
      moduleMember: undefined
    });
    var Origin = (function() {
      function Origin(moduleId, moduleMember) {
        _classCallCheck(this, Origin);
        this.moduleId = moduleId;
        this.moduleMember = moduleMember;
      }
      Origin.get = function get(fn) {
        var origin = originStorage.get(fn);
        if (origin === undefined) {
          _aureliaPal.PLATFORM.eachModule(function(key, value) {
            for (var _name in value) {
              var exp = value[_name];
              if (exp === fn) {
                originStorage.set(fn, origin = new Origin(key, _name));
                return true;
              }
            }
            if (value === fn) {
              originStorage.set(fn, origin = new Origin(key, 'default'));
              return true;
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
    exports.Origin = Origin;
    var DecoratorApplicator = (function() {
      function DecoratorApplicator() {
        _classCallCheck(this, DecoratorApplicator);
        this._first = null;
        this._second = null;
        this._third = null;
        this._rest = null;
      }
      DecoratorApplicator.prototype.decorator = (function(_decorator) {
        function decorator(_x) {
          return _decorator.apply(this, arguments);
        }
        decorator.toString = function() {
          return _decorator.toString();
        };
        return decorator;
      })(function(decorator) {
        if (this._first === null) {
          this._first = decorator;
          return this;
        }
        if (this._second === null) {
          this._second = decorator;
          return this;
        }
        if (this._third === null) {
          this._third = decorator;
          return this;
        }
        if (this._rest === null) {
          this._rest = [];
        }
        this._rest.push(decorator);
        return this;
      });
      DecoratorApplicator.prototype._decorate = function _decorate(target) {
        if (this._first !== null) {
          this._first(target);
        }
        if (this._second !== null) {
          this._second(target);
        }
        if (this._third !== null) {
          this._third(target);
        }
        var rest = this._rest;
        if (rest !== null) {
          for (var i = 0,
              ii = rest.length; i < ii; ++i) {
            rest[i](target);
          }
        }
      };
      return DecoratorApplicator;
    })();
    exports.DecoratorApplicator = DecoratorApplicator;
    var decorators = {configure: {
        parameterizedDecorator: function parameterizedDecorator(name, decorator) {
          decorators[name] = function() {
            var applicator = new DecoratorApplicator();
            return applicator[name].apply(applicator, arguments);
          };
          DecoratorApplicator.prototype[name] = function() {
            var result = decorator.apply(null, arguments);
            return this.decorator(result);
          };
        },
        simpleDecorator: function simpleDecorator(name, decorator) {
          decorators[name] = function() {
            return new DecoratorApplicator().decorator(decorator);
          };
          DecoratorApplicator.prototype[name] = function() {
            return this.decorator(decorator);
          };
        }
      }};
    exports.decorators = decorators;
  }).call(__exports, __exports, __require('npm:core-js@0.9.18'), __require('github:aurelia/pal@0.2.0'));
});
})();
(function() {
function define(){};  define.amd = {};
System.register("github:aurelia/validation@0.4.0/utilities", [], false, function(__require, __exports, __module) {
  return (function(exports) {
    'use strict';
    exports.__esModule = true;
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
      }
    }
    var Utilities = (function() {
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
          return val.length === 0;
        }
        return false;
      };
      return Utilities;
    })();
    exports.Utilities = Utilities;
  }).call(__exports, __exports);
});
})();
(function() {
function define(){};  define.amd = {};
System.register("github:aurelia/validation@0.4.0/path-observer", [], false, function(__require, __exports, __module) {
  return (function(exports) {
    'use strict';
    exports.__esModule = true;
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
      }
    }
    var PathObserver = (function() {
      function PathObserver(observerLocator, subject, path) {
        _classCallCheck(this, PathObserver);
        this.observerLocator = observerLocator;
        this.path = path.split('.');
        this.subject = subject;
        this.observers = [];
        this.callbacks = [];
        if (this.path.length > 1) {
          this.observeParts();
        }
      }
      PathObserver.prototype.observeParts = function observeParts(propertyName) {
        var _this = this;
        var currentSubject = this.subject;
        var observersAreComplete = undefined;
        if (propertyName !== undefined && propertyName !== null) {
          for (var i = this.observers.length - 1; i >= 0; i--) {
            var currentObserver = this.observers[i];
            var observer = undefined;
            if (currentObserver.propertyName === propertyName) {
              break;
            }
            observer = this.observers.pop();
            if (observer && observer.subscription) {
              observer.subscription();
            }
          }
        }
        observersAreComplete = this.observers.length === this.path.length;
        var _loop = function(i) {
          var observer = _this.observers[i];
          var currentPath = _this.path[i];
          var subscription = undefined;
          var currentValue = undefined;
          if (!observer) {
            observer = _this.observerLocator.getObserver(currentSubject, currentPath);
            _this.observers.push(observer);
            subscription = observer.subscribe(function(newValue, oldValue) {
              _this.observeParts(observer.propertyName);
            });
            observer.subscription = subscription;
          }
          currentValue = observer.getValue();
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
        if (this.path.length === 1) {
          this.subject[this.path[0]];
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
        var _this2 = this;
        this.callbacks.unshift(callback);
        if (this.observers.length === this.path.length) {
          this.subscription = this.observers[this.observers.length - 1].subscribe(callback);
          return function() {
            return _this2.unsubscribe();
          };
        }
      };
      PathObserver.prototype.unsubscribe = function unsubscribe() {
        this.callbacks = [];
        if (this.subscription) {
          this.subscription();
        }
        for (var i = this.observers.length - 1; i >= 0; i--) {
          var observer = this.observers.pop();
          if (observer && observer.subscription) {
            observer.subscription();
          }
        }
      };
      return PathObserver;
    })();
    exports.PathObserver = PathObserver;
  }).call(__exports, __exports);
});
})();
(function() {
function define(){};  define.amd = {};
System.register("github:aurelia/validation@0.4.0/debouncer", [], false, function(__require, __exports, __module) {
  return (function(exports) {
    "use strict";
    exports.__esModule = true;
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    var Debouncer = (function() {
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
    exports.Debouncer = Debouncer;
  }).call(__exports, __exports);
});
})();
(function() {
function define(){};  define.amd = {};
System.register("github:aurelia/validation@0.4.0/validation-rules", ["github:aurelia/validation@0.4.0/utilities", "github:aurelia/validation@0.4.0/validation-locale"], false, function(__require, __exports, __module) {
  return (function(exports, _utilities, _validationLocale) {
    'use strict';
    exports.__esModule = true;
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
    var ValidationRule = (function() {
      function ValidationRule(threshold, onValidate, message, ruleName) {
        _classCallCheck(this, ValidationRule);
        this.onValidate = onValidate;
        this.threshold = threshold;
        this.message = message;
        this.errorMessage = null;
        this.ruleName = ruleName;
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
        }
        if (typeof result === 'string') {
          this.errorMessage = result;
        } else {
          if (this.message) {
            if (typeof this.message === 'function') {
              this.errorMessage = this.message(currentValue, this.threshold);
            } else if (typeof this.message === 'string') {
              this.errorMessage = this.message;
            } else {
              throw Error('Unable to handle the error message:' + this.message);
            }
          } else {
            this.errorMessage = locale.translate(this.ruleName, currentValue, this.threshold);
          }
        }
        return false;
      };
      ValidationRule.prototype.validate = function validate(currentValue, locale) {
        var _this = this;
        if (locale === undefined) {
          locale = _validationLocale.ValidationLocale.Repository['default'];
        }
        currentValue = _utilities.Utilities.getValue(currentValue);
        var result = this.onValidate(currentValue, this.threshold, locale);
        var promise = Promise.resolve(result);
        var nextPromise = promise.then(function(promiseResult) {
          return _this.setResult(promiseResult, currentValue, locale);
        }, function(promiseFailure) {
          if (typeof promiseFailure === 'string' && promiseFailure !== '') {
            return _this.setResult(promiseFailure, currentValue, locale);
          }
          return _this.setResult(false, currentValue, locale);
        });
        return nextPromise;
      };
      return ValidationRule;
    })();
    exports.ValidationRule = ValidationRule;
    var URLValidationRule = (function(_ValidationRule) {
      function URLValidationRule(startingThreshold) {
        _classCallCheck(this, URLValidationRule);
        var defaultUrlOptions = {
          protocols: ['http', 'https', 'ftp'],
          require_tld: true,
          require_protocol: false,
          allow_underscores: true,
          allow_trailing_dot: false,
          allow_protocol_relative_urls: true
        };
        if (startingThreshold === undefined) {
          startingThreshold = defaultUrlOptions;
        }
        _ValidationRule.call(this, startingThreshold, function(newValue, threshold) {
          var url = newValue;
          var protocol = undefined;
          var auth = undefined;
          var host = undefined;
          var hostname = undefined;
          var port = undefined;
          var portStr = undefined;
          var split = undefined;
          if (!url || url.length >= 2083 || /\s/.test(url)) {
            return false;
          }
          if (url.indexOf('mailto:') === 0) {
            return false;
          }
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
            portStr = split.join(':');
            port = parseInt(portStr, 10);
            if (!/^[0-9]+$/.test(portStr) || port <= 0 || port > 65535) {
              return false;
            }
          }
          if (!URLValidationRule.isIP(host) && !URLValidationRule.isFQDN(host, threshold) && host !== 'localhost') {
            return false;
          }
          if (threshold.host_whitelist && threshold.host_whitelist.indexOf(host) === -1) {
            return false;
          }
          if (threshold.host_blacklist && threshold.host_blacklist.indexOf(host) !== -1) {
            return false;
          }
          return true;
        }, null, 'URLValidationRule');
      }
      _inherits(URLValidationRule, _ValidationRule);
      URLValidationRule.isIP = function isIP(str, version) {
        var ipv4Maybe = /^(\d+)\.(\d+)\.(\d+)\.(\d+)$/;
        var ipv6Block = /^[0-9A-F]{1,4}$/i;
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
          if (blocks.length > 8) {
            return false;
          }
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
              if (foundOmissionBlock) {
                return false;
              }
              foundOmissionBlock = true;
            } else if (!ipv6Block.test(blocks[i])) {
              return false;
            }
          }
          if (foundOmissionBlock) {
            return blocks.length >= 1;
          }
          return blocks.length === 8;
        }
        return false;
      };
      URLValidationRule.isFQDN = function isFQDN(str, options) {
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
        for (var part = undefined,
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
      return URLValidationRule;
    })(ValidationRule);
    exports.URLValidationRule = URLValidationRule;
    var EmailValidationRule = (function(_ValidationRule2) {
      function EmailValidationRule() {
        _classCallCheck(this, EmailValidationRule);
        _ValidationRule2.call(this, null, function(newValue, threshold) {
          if (/\s/.test(newValue)) {
            return false;
          }
          var parts = newValue.split('@');
          var domain = parts.pop();
          var user = parts.join('@');
          if (!EmailValidationRule.isFQDN(domain)) {
            return false;
          }
          return EmailValidationRule.testEmailUserUtf8Regex(user);
        }, null, 'EmailValidationRule');
      }
      _inherits(EmailValidationRule, _ValidationRule2);
      EmailValidationRule.testEmailUserUtf8Regex = function testEmailUserUtf8Regex(user) {
        var emailUserUtf8Regex = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))$/i;
        return emailUserUtf8Regex.test(user);
      };
      EmailValidationRule.isFQDN = function isFQDN(str) {
        var parts = str.split('.');
        for (var part = undefined,
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
      return EmailValidationRule;
    })(ValidationRule);
    exports.EmailValidationRule = EmailValidationRule;
    var MinimumLengthValidationRule = (function(_ValidationRule3) {
      function MinimumLengthValidationRule(minimumLength) {
        _classCallCheck(this, MinimumLengthValidationRule);
        _ValidationRule3.call(this, minimumLength, function(newValue, minLength) {
          newValue = typeof newValue === 'number' ? newValue.toString() : newValue;
          return newValue.length !== undefined && newValue.length >= minLength;
        }, null, 'MinimumLengthValidationRule');
      }
      _inherits(MinimumLengthValidationRule, _ValidationRule3);
      return MinimumLengthValidationRule;
    })(ValidationRule);
    exports.MinimumLengthValidationRule = MinimumLengthValidationRule;
    var MaximumLengthValidationRule = (function(_ValidationRule4) {
      function MaximumLengthValidationRule(maximumLength) {
        _classCallCheck(this, MaximumLengthValidationRule);
        _ValidationRule4.call(this, maximumLength, function(newValue, maxLength) {
          newValue = typeof newValue === 'number' ? newValue.toString() : newValue;
          return newValue.length !== undefined && newValue.length <= maxLength;
        }, null, 'MaximumLengthValidationRule');
      }
      _inherits(MaximumLengthValidationRule, _ValidationRule4);
      return MaximumLengthValidationRule;
    })(ValidationRule);
    exports.MaximumLengthValidationRule = MaximumLengthValidationRule;
    var BetweenLengthValidationRule = (function(_ValidationRule5) {
      function BetweenLengthValidationRule(minimumLength, maximumLength) {
        _classCallCheck(this, BetweenLengthValidationRule);
        _ValidationRule5.call(this, {
          minimumLength: minimumLength,
          maximumLength: maximumLength
        }, function(newValue, threshold) {
          newValue = typeof newValue === 'number' ? newValue.toString() : newValue;
          return newValue.length !== undefined && newValue.length >= threshold.minimumLength && newValue.length <= threshold.maximumLength;
        }, null, 'BetweenLengthValidationRule');
      }
      _inherits(BetweenLengthValidationRule, _ValidationRule5);
      return BetweenLengthValidationRule;
    })(ValidationRule);
    exports.BetweenLengthValidationRule = BetweenLengthValidationRule;
    var CustomFunctionValidationRule = (function(_ValidationRule6) {
      function CustomFunctionValidationRule(customFunction, threshold) {
        _classCallCheck(this, CustomFunctionValidationRule);
        _ValidationRule6.call(this, threshold, customFunction, null, 'CustomFunctionValidationRule');
      }
      _inherits(CustomFunctionValidationRule, _ValidationRule6);
      return CustomFunctionValidationRule;
    })(ValidationRule);
    exports.CustomFunctionValidationRule = CustomFunctionValidationRule;
    var NumericValidationRule = (function(_ValidationRule7) {
      function NumericValidationRule() {
        _classCallCheck(this, NumericValidationRule);
        _ValidationRule7.call(this, null, function(newValue, threshold, locale) {
          var numericRegex = locale.setting('numericRegex');
          var floatValue = parseFloat(newValue);
          return !Number.isNaN(parseFloat(newValue)) && Number.isFinite(floatValue) && numericRegex.test(newValue);
        }, null, 'NumericValidationRule');
      }
      _inherits(NumericValidationRule, _ValidationRule7);
      return NumericValidationRule;
    })(ValidationRule);
    exports.NumericValidationRule = NumericValidationRule;
    var RegexValidationRule = (function(_ValidationRule8) {
      function RegexValidationRule(startingRegex, ruleName) {
        _classCallCheck(this, RegexValidationRule);
        _ValidationRule8.call(this, startingRegex, function(newValue, regex) {
          return regex.test(newValue);
        }, null, ruleName || 'RegexValidationRule');
      }
      _inherits(RegexValidationRule, _ValidationRule8);
      return RegexValidationRule;
    })(ValidationRule);
    exports.RegexValidationRule = RegexValidationRule;
    var ContainsOnlyValidationRule = (function(_RegexValidationRule) {
      function ContainsOnlyValidationRule(regex) {
        _classCallCheck(this, ContainsOnlyValidationRule);
        _RegexValidationRule.call(this, regex, 'ContainsOnlyValidationRule');
      }
      _inherits(ContainsOnlyValidationRule, _RegexValidationRule);
      return ContainsOnlyValidationRule;
    })(RegexValidationRule);
    exports.ContainsOnlyValidationRule = ContainsOnlyValidationRule;
    var MinimumValueValidationRule = (function(_ValidationRule9) {
      function MinimumValueValidationRule(minimumValue) {
        _classCallCheck(this, MinimumValueValidationRule);
        _ValidationRule9.call(this, minimumValue, function(newValue, minValue) {
          return _utilities.Utilities.getValue(minValue) < newValue;
        }, null, 'MinimumValueValidationRule');
      }
      _inherits(MinimumValueValidationRule, _ValidationRule9);
      return MinimumValueValidationRule;
    })(ValidationRule);
    exports.MinimumValueValidationRule = MinimumValueValidationRule;
    var MinimumInclusiveValueValidationRule = (function(_ValidationRule10) {
      function MinimumInclusiveValueValidationRule(minimumValue) {
        _classCallCheck(this, MinimumInclusiveValueValidationRule);
        _ValidationRule10.call(this, minimumValue, function(newValue, minValue) {
          return _utilities.Utilities.getValue(minValue) <= newValue;
        }, null, 'MinimumInclusiveValueValidationRule');
      }
      _inherits(MinimumInclusiveValueValidationRule, _ValidationRule10);
      return MinimumInclusiveValueValidationRule;
    })(ValidationRule);
    exports.MinimumInclusiveValueValidationRule = MinimumInclusiveValueValidationRule;
    var MaximumValueValidationRule = (function(_ValidationRule11) {
      function MaximumValueValidationRule(maximumValue) {
        _classCallCheck(this, MaximumValueValidationRule);
        _ValidationRule11.call(this, maximumValue, function(newValue, maxValue) {
          return newValue < _utilities.Utilities.getValue(maxValue);
        }, null, 'MaximumValueValidationRule');
      }
      _inherits(MaximumValueValidationRule, _ValidationRule11);
      return MaximumValueValidationRule;
    })(ValidationRule);
    exports.MaximumValueValidationRule = MaximumValueValidationRule;
    var MaximumInclusiveValueValidationRule = (function(_ValidationRule12) {
      function MaximumInclusiveValueValidationRule(maximumValue) {
        _classCallCheck(this, MaximumInclusiveValueValidationRule);
        _ValidationRule12.call(this, maximumValue, function(newValue, maxValue) {
          return newValue <= _utilities.Utilities.getValue(maxValue);
        }, null, 'MaximumInclusiveValueValidationRule');
      }
      _inherits(MaximumInclusiveValueValidationRule, _ValidationRule12);
      return MaximumInclusiveValueValidationRule;
    })(ValidationRule);
    exports.MaximumInclusiveValueValidationRule = MaximumInclusiveValueValidationRule;
    var BetweenValueValidationRule = (function(_ValidationRule13) {
      function BetweenValueValidationRule(minimumValue, maximumValue) {
        _classCallCheck(this, BetweenValueValidationRule);
        _ValidationRule13.call(this, {
          minimumValue: minimumValue,
          maximumValue: maximumValue
        }, function(newValue, threshold) {
          return _utilities.Utilities.getValue(threshold.minimumValue) <= newValue && newValue <= _utilities.Utilities.getValue(threshold.maximumValue);
        }, null, 'BetweenValueValidationRule');
      }
      _inherits(BetweenValueValidationRule, _ValidationRule13);
      return BetweenValueValidationRule;
    })(ValidationRule);
    exports.BetweenValueValidationRule = BetweenValueValidationRule;
    var DigitValidationRule = (function(_ValidationRule14) {
      function DigitValidationRule() {
        _classCallCheck(this, DigitValidationRule);
        _ValidationRule14.call(this, null, function(newValue, threshold) {
          return /^\d+$/.test(newValue);
        }, null, 'DigitValidationRule');
      }
      _inherits(DigitValidationRule, _ValidationRule14);
      return DigitValidationRule;
    })(ValidationRule);
    exports.DigitValidationRule = DigitValidationRule;
    var NoSpacesValidationRule = (function(_ValidationRule15) {
      function NoSpacesValidationRule() {
        _classCallCheck(this, NoSpacesValidationRule);
        _ValidationRule15.call(this, null, function(newValue, threshold) {
          return /^\S*$/.test(newValue);
        }, null, 'NoSpacesValidationRule');
      }
      _inherits(NoSpacesValidationRule, _ValidationRule15);
      return NoSpacesValidationRule;
    })(ValidationRule);
    exports.NoSpacesValidationRule = NoSpacesValidationRule;
    var AlphaNumericValidationRule = (function(_ValidationRule16) {
      function AlphaNumericValidationRule() {
        _classCallCheck(this, AlphaNumericValidationRule);
        _ValidationRule16.call(this, null, function(newValue, threshold) {
          return /^[a-z0-9]+$/i.test(newValue);
        }, null, 'AlphaNumericValidationRule');
      }
      _inherits(AlphaNumericValidationRule, _ValidationRule16);
      return AlphaNumericValidationRule;
    })(ValidationRule);
    exports.AlphaNumericValidationRule = AlphaNumericValidationRule;
    var AlphaValidationRule = (function(_ValidationRule17) {
      function AlphaValidationRule() {
        _classCallCheck(this, AlphaValidationRule);
        _ValidationRule17.call(this, null, function(newValue, threshold) {
          return /^[a-z]+$/i.test(newValue);
        }, null, 'AlphaValidationRule');
      }
      _inherits(AlphaValidationRule, _ValidationRule17);
      return AlphaValidationRule;
    })(ValidationRule);
    exports.AlphaValidationRule = AlphaValidationRule;
    var AlphaOrWhitespaceValidationRule = (function(_ValidationRule18) {
      function AlphaOrWhitespaceValidationRule() {
        _classCallCheck(this, AlphaOrWhitespaceValidationRule);
        _ValidationRule18.call(this, null, function(newValue, threshold) {
          return /^[a-z\s]+$/i.test(newValue);
        }, null, 'AlphaOrWhitespaceValidationRule');
      }
      _inherits(AlphaOrWhitespaceValidationRule, _ValidationRule18);
      return AlphaOrWhitespaceValidationRule;
    })(ValidationRule);
    exports.AlphaOrWhitespaceValidationRule = AlphaOrWhitespaceValidationRule;
    var AlphaNumericOrWhitespaceValidationRule = (function(_ValidationRule19) {
      function AlphaNumericOrWhitespaceValidationRule() {
        _classCallCheck(this, AlphaNumericOrWhitespaceValidationRule);
        _ValidationRule19.call(this, null, function(newValue, threshold) {
          return /^[a-z0-9\s]+$/i.test(newValue);
        }, null, 'AlphaNumericOrWhitespaceValidationRule');
      }
      _inherits(AlphaNumericOrWhitespaceValidationRule, _ValidationRule19);
      return AlphaNumericOrWhitespaceValidationRule;
    })(ValidationRule);
    exports.AlphaNumericOrWhitespaceValidationRule = AlphaNumericOrWhitespaceValidationRule;
    var MediumPasswordValidationRule = (function(_ValidationRule20) {
      function MediumPasswordValidationRule(minimumComplexityLevel, ruleName) {
        _classCallCheck(this, MediumPasswordValidationRule);
        _ValidationRule20.call(this, minimumComplexityLevel ? minimumComplexityLevel : 3, function(newValue, threshold) {
          if (typeof newValue !== 'string') {
            return false;
          }
          var strength = 0;
          strength += /[A-Z]+/.test(newValue) ? 1 : 0;
          strength += /[a-z]+/.test(newValue) ? 1 : 0;
          strength += /[0-9]+/.test(newValue) ? 1 : 0;
          strength += /[\W]+/.test(newValue) ? 1 : 0;
          return strength >= threshold;
        }, null, ruleName || 'MediumPasswordValidationRule');
      }
      _inherits(MediumPasswordValidationRule, _ValidationRule20);
      return MediumPasswordValidationRule;
    })(ValidationRule);
    exports.MediumPasswordValidationRule = MediumPasswordValidationRule;
    var StrongPasswordValidationRule = (function(_MediumPasswordValidationRule) {
      function StrongPasswordValidationRule() {
        _classCallCheck(this, StrongPasswordValidationRule);
        _MediumPasswordValidationRule.call(this, 4, 'StrongPasswordValidationRule');
      }
      _inherits(StrongPasswordValidationRule, _MediumPasswordValidationRule);
      return StrongPasswordValidationRule;
    })(MediumPasswordValidationRule);
    exports.StrongPasswordValidationRule = StrongPasswordValidationRule;
    var EqualityValidationRuleBase = (function(_ValidationRule21) {
      function EqualityValidationRuleBase(startingOtherValue, equality, otherValueLabel, ruleName) {
        _classCallCheck(this, EqualityValidationRuleBase);
        _ValidationRule21.call(this, {
          otherValue: startingOtherValue,
          equality: equality,
          otherValueLabel: otherValueLabel
        }, function(newValue, threshold) {
          var otherValue = _utilities.Utilities.getValue(threshold.otherValue);
          if (newValue instanceof Date && otherValue instanceof Date) {
            return threshold.equality === (newValue.getTime() === otherValue.getTime());
          }
          return threshold.equality === (newValue === otherValue);
        }, null, ruleName || 'EqualityValidationRuleBase');
      }
      _inherits(EqualityValidationRuleBase, _ValidationRule21);
      return EqualityValidationRuleBase;
    })(ValidationRule);
    exports.EqualityValidationRuleBase = EqualityValidationRuleBase;
    var EqualityValidationRule = (function(_EqualityValidationRuleBase) {
      function EqualityValidationRule(otherValue) {
        _classCallCheck(this, EqualityValidationRule);
        _EqualityValidationRuleBase.call(this, otherValue, true, null, 'EqualityValidationRule');
      }
      _inherits(EqualityValidationRule, _EqualityValidationRuleBase);
      return EqualityValidationRule;
    })(EqualityValidationRuleBase);
    exports.EqualityValidationRule = EqualityValidationRule;
    var EqualityWithOtherLabelValidationRule = (function(_EqualityValidationRuleBase2) {
      function EqualityWithOtherLabelValidationRule(otherValue, otherLabel) {
        _classCallCheck(this, EqualityWithOtherLabelValidationRule);
        _EqualityValidationRuleBase2.call(this, otherValue, true, otherLabel, 'EqualityWithOtherLabelValidationRule');
      }
      _inherits(EqualityWithOtherLabelValidationRule, _EqualityValidationRuleBase2);
      return EqualityWithOtherLabelValidationRule;
    })(EqualityValidationRuleBase);
    exports.EqualityWithOtherLabelValidationRule = EqualityWithOtherLabelValidationRule;
    var InEqualityValidationRule = (function(_EqualityValidationRuleBase3) {
      function InEqualityValidationRule(otherValue) {
        _classCallCheck(this, InEqualityValidationRule);
        _EqualityValidationRuleBase3.call(this, otherValue, false, null, 'InEqualityValidationRule');
      }
      _inherits(InEqualityValidationRule, _EqualityValidationRuleBase3);
      return InEqualityValidationRule;
    })(EqualityValidationRuleBase);
    exports.InEqualityValidationRule = InEqualityValidationRule;
    var InEqualityWithOtherLabelValidationRule = (function(_EqualityValidationRuleBase4) {
      function InEqualityWithOtherLabelValidationRule(otherValue, otherLabel) {
        _classCallCheck(this, InEqualityWithOtherLabelValidationRule);
        _EqualityValidationRuleBase4.call(this, otherValue, false, otherLabel, 'InEqualityWithOtherLabelValidationRule');
      }
      _inherits(InEqualityWithOtherLabelValidationRule, _EqualityValidationRuleBase4);
      return InEqualityWithOtherLabelValidationRule;
    })(EqualityValidationRuleBase);
    exports.InEqualityWithOtherLabelValidationRule = InEqualityWithOtherLabelValidationRule;
    var InCollectionValidationRule = (function(_ValidationRule22) {
      function InCollectionValidationRule(startingCollection) {
        _classCallCheck(this, InCollectionValidationRule);
        _ValidationRule22.call(this, startingCollection, function(newValue, threshold) {
          var collection = _utilities.Utilities.getValue(threshold);
          for (var i = 0; i < collection.length; i++) {
            if (newValue === collection[i]) {
              return true;
            }
          }
          return false;
        }, null, 'InCollectionValidationRule');
      }
      _inherits(InCollectionValidationRule, _ValidationRule22);
      return InCollectionValidationRule;
    })(ValidationRule);
    exports.InCollectionValidationRule = InCollectionValidationRule;
  }).call(__exports, __exports, __require('github:aurelia/validation@0.4.0/utilities'), __require('github:aurelia/validation@0.4.0/validation-locale'));
});
})();
(function() {
function define(){};  define.amd = {};
System.register("github:aurelia/validation@0.4.0/validation-result", [], false, function(__require, __exports, __module) {
  return (function(exports) {
    'use strict';
    exports.__esModule = true;
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
      }
    }
    var ValidationResult = (function() {
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
    exports.ValidationResult = ValidationResult;
    var ValidationResultProperty = (function() {
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
        if (shouldBeDirty) {
          this.isDirty = true;
        }
        this.message = validationResponse.message;
        this.failingRule = validationResponse.failingRule;
        this.isValid = validationResponse.isValid;
        this.latestValue = validationResponse.latestValue;
        if (this.isValid !== this.group.isValid) {
          this.group.checkValidity();
        }
        if (notifyObservers) {
          this.notifyObserversOfChange();
        }
      };
      return ValidationResultProperty;
    })();
    exports.ValidationResultProperty = ValidationResultProperty;
  }).call(__exports, __exports);
});
})();
(function() {
function define(){};  define.amd = {};
System.register("github:aurelia/validation@0.4.0/decorators", ["github:aurelia/metadata@0.9.0"], false, function(__require, __exports, __module) {
  return (function(exports, _aureliaMetadata) {
    'use strict';
    exports.__esModule = true;
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
    exports.ensure = ensure;
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
      }
    }
    var ValidationMetadata = (function() {
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
      _createClass(ValidationMetadata, null, [{
        key: 'metadataKey',
        value: 'aurelia:validation',
        enumerable: true
      }]);
      return ValidationMetadata;
    })();
    exports.ValidationMetadata = ValidationMetadata;
    var ValidationPropertyMetadata = (function() {
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
    function ensure(setupStep) {
      return function(target, propertyName) {
        var validationMetadata = _aureliaMetadata.metadata.getOrCreateOwn(ValidationMetadata.metadataKey, ValidationMetadata, target);
        var property = validationMetadata.getOrCreateProperty(propertyName);
        property.addSetupStep(setupStep);
      };
    }
  }).call(__exports, __exports, __require('github:aurelia/metadata@0.9.0'));
});
})();
(function() {
function define(){};  define.amd = {};
System.register("github:aurelia/dependency-injection@0.11.0/aurelia-dependency-injection", ["npm:core-js@0.9.18", "github:aurelia/metadata@0.9.0", "github:aurelia/pal@0.2.0"], false, function(__require, __exports, __module) {
  return (function(exports, _coreJs, _aureliaMetadata, _aureliaPal) {
    'use strict';
    exports.__esModule = true;
    var _classActivators;
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
    exports.autoinject = autoinject;
    exports.inject = inject;
    exports.registration = registration;
    exports.transient = transient;
    exports.singleton = singleton;
    exports.instanceActivator = instanceActivator;
    exports.factory = factory;
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
        Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
      }
    }
    var Resolver = (function() {
      function Resolver() {
        _classCallCheck(this, Resolver);
      }
      Resolver.prototype.get = function get(container) {
        throw new Error('A custom Resolver must implement get(container) and return the resolved instance(s).');
      };
      return Resolver;
    })();
    exports.Resolver = Resolver;
    var Lazy = (function(_Resolver) {
      _inherits(Lazy, _Resolver);
      function Lazy(key) {
        _classCallCheck(this, Lazy);
        _Resolver.call(this);
        this.key = key;
      }
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
    exports.Lazy = Lazy;
    var All = (function(_Resolver2) {
      _inherits(All, _Resolver2);
      function All(key) {
        _classCallCheck(this, All);
        _Resolver2.call(this);
        this.key = key;
      }
      All.prototype.get = function get(container) {
        return container.getAll(this.key);
      };
      All.of = function of(key) {
        return new All(key);
      };
      return All;
    })(Resolver);
    exports.All = All;
    var Optional = (function(_Resolver3) {
      _inherits(Optional, _Resolver3);
      function Optional(key) {
        var checkParent = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
        _classCallCheck(this, Optional);
        _Resolver3.call(this);
        this.key = key;
        this.checkParent = checkParent;
      }
      Optional.prototype.get = function get(container) {
        if (container.hasResolver(this.key, this.checkParent)) {
          return container.get(this.key);
        }
        return null;
      };
      Optional.of = function of(key) {
        var checkParent = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
        return new Optional(key, checkParent);
      };
      return Optional;
    })(Resolver);
    exports.Optional = Optional;
    var Parent = (function(_Resolver4) {
      _inherits(Parent, _Resolver4);
      function Parent(key) {
        _classCallCheck(this, Parent);
        _Resolver4.call(this);
        this.key = key;
      }
      Parent.prototype.get = function get(container) {
        return container.parent ? container.parent.get(this.key) : null;
      };
      Parent.of = function of(key) {
        return new Parent(key);
      };
      return Parent;
    })(Resolver);
    exports.Parent = Parent;
    var StrategyResolver = (function() {
      function StrategyResolver(strategy, state) {
        _classCallCheck(this, StrategyResolver);
        this.strategy = strategy;
        this.state = state;
      }
      StrategyResolver.prototype.get = function get(container, key) {
        switch (this.strategy) {
          case 0:
            return this.state;
          case 1:
            var singleton = container.invoke(this.state);
            this.state = singleton;
            this.strategy = 0;
            return singleton;
          case 2:
            return container.invoke(this.state);
          case 3:
            return this.state(container, key, this);
          case 4:
            return this.state[0].get(container, key);
          case 5:
            return container.get(this.state);
          default:
            throw new Error('Invalid strategy: ' + this.strategy);
        }
      };
      return StrategyResolver;
    })();
    exports.StrategyResolver = StrategyResolver;
    var FactoryActivator = (function() {
      function FactoryActivator() {
        _classCallCheck(this, FactoryActivator);
      }
      FactoryActivator.prototype.invoke = function invoke(container, fn, keys) {
        var i = keys.length;
        var args = new Array(i);
        while (i--) {
          args[i] = container.get(keys[i]);
        }
        return fn.apply(undefined, args);
      };
      FactoryActivator.prototype.invokeWithDynamicDependencies = function invokeWithDynamicDependencies(container, fn, keys, deps) {
        var i = keys.length;
        var args = new Array(i);
        while (i--) {
          args[i] = container.get(keys[i]);
        }
        if (deps !== undefined) {
          args = args.concat(deps);
        }
        return fn.apply(undefined, args);
      };
      _createClass(FactoryActivator, null, [{
        key: 'instance',
        value: new FactoryActivator(),
        enumerable: true
      }]);
      return FactoryActivator;
    })();
    exports.FactoryActivator = FactoryActivator;
    var TransientRegistration = (function() {
      function TransientRegistration(key) {
        _classCallCheck(this, TransientRegistration);
        this.key = key;
      }
      TransientRegistration.prototype.createResolver = function createResolver(container, key, fn) {
        return new StrategyResolver(2, fn);
      };
      return TransientRegistration;
    })();
    exports.TransientRegistration = TransientRegistration;
    var SingletonRegistration = (function() {
      function SingletonRegistration(keyOrRegisterInChild) {
        var registerInChild = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
        _classCallCheck(this, SingletonRegistration);
        if (typeof keyOrRegisterInChild === 'boolean') {
          this.registerInChild = keyOrRegisterInChild;
        } else {
          this.key = keyOrRegisterInChild;
          this.registerInChild = registerInChild;
        }
      }
      SingletonRegistration.prototype.createResolver = function createResolver(container, key, fn) {
        var resolver = new StrategyResolver(1, fn);
        if (!this.registerInChild && container !== container.root) {
          container.root.registerResolver(this.key || key, resolver);
        }
        return resolver;
      };
      return SingletonRegistration;
    })();
    exports.SingletonRegistration = SingletonRegistration;
    var badKeyError = 'key/value cannot be null or undefined. Are you trying to inject/register something that doesn\'t exist with DI?';
    var _emptyParameters = Object.freeze([]);
    exports._emptyParameters = _emptyParameters;
    _aureliaMetadata.metadata.registration = 'aurelia:registration';
    _aureliaMetadata.metadata.instanceActivator = 'aurelia:instance-activator';
    var ConstructionInfo = function ConstructionInfo(activator, keys) {
      _classCallCheck(this, ConstructionInfo);
      this.activator = activator;
      this.keys = keys;
    };
    function invokeWithDynamicDependencies(container, fn, keys, deps) {
      var i = keys.length;
      var args = new Array(i);
      while (i--) {
        args[i] = container.get(keys[i]);
      }
      if (deps !== undefined) {
        args = args.concat(deps);
      }
      return Reflect.construct(fn, args);
    }
    var classActivators = (_classActivators = {}, _classActivators[0] = {
      invoke: function invoke(container, Type, keys) {
        return new Type();
      },
      invokeWithDynamicDependencies: invokeWithDynamicDependencies
    }, _classActivators[1] = {
      invoke: function invoke(container, Type, keys) {
        return new Type(container.get(keys[0]));
      },
      invokeWithDynamicDependencies: invokeWithDynamicDependencies
    }, _classActivators[2] = {
      invoke: function invoke(container, Type, keys) {
        return new Type(container.get(keys[0]), container.get(keys[1]));
      },
      invokeWithDynamicDependencies: invokeWithDynamicDependencies
    }, _classActivators[3] = {
      invoke: function invoke(container, Type, keys) {
        return new Type(container.get(keys[0]), container.get(keys[1]), container.get(keys[2]));
      },
      invokeWithDynamicDependencies: invokeWithDynamicDependencies
    }, _classActivators[4] = {
      invoke: function invoke(container, Type, keys) {
        return new Type(container.get(keys[0]), container.get(keys[1]), container.get(keys[2]), container.get(keys[3]));
      },
      invokeWithDynamicDependencies: invokeWithDynamicDependencies
    }, _classActivators[5] = {
      invoke: function invoke(container, Type, keys) {
        return new Type(container.get(keys[0]), container.get(keys[1]), container.get(keys[2]), container.get(keys[3]), container.get(keys[4]));
      },
      invokeWithDynamicDependencies: invokeWithDynamicDependencies
    }, _classActivators.fallback = {
      invoke: invokeWithDynamicDependencies,
      invokeWithDynamicDependencies: invokeWithDynamicDependencies
    }, _classActivators);
    var Container = (function() {
      function Container(constructionInfo) {
        _classCallCheck(this, Container);
        this.resolvers = new Map();
        this.constructionInfo = constructionInfo === undefined ? new Map() : constructionInfo;
        this.root = this;
        this.parent = null;
      }
      Container.prototype.makeGlobal = function makeGlobal() {
        Container.instance = this;
        return this;
      };
      Container.prototype.registerInstance = function registerInstance(key, instance) {
        this.registerResolver(key, new StrategyResolver(0, instance === undefined ? key : instance));
      };
      Container.prototype.registerSingleton = function registerSingleton(key, fn) {
        this.registerResolver(key, new StrategyResolver(1, fn === undefined ? key : fn));
      };
      Container.prototype.registerTransient = function registerTransient(key, fn) {
        this.registerResolver(key, new StrategyResolver(2, fn === undefined ? key : fn));
      };
      Container.prototype.registerHandler = function registerHandler(key, handler) {
        this.registerResolver(key, new StrategyResolver(3, handler));
      };
      Container.prototype.registerAlias = function registerAlias(originalKey, aliasKey) {
        this.registerResolver(aliasKey, new StrategyResolver(5, originalKey));
      };
      Container.prototype.registerResolver = function registerResolver(key, resolver) {
        if (key === null || key === undefined) {
          throw new Error(badKeyError);
        }
        var result = this.resolvers.get(key);
        if (result === undefined) {
          this.resolvers.set(key, resolver);
        } else if (result.strategy === 4) {
          result.state.push(resolver);
        } else {
          this.resolvers.set(key, new StrategyResolver(4, [result, resolver]));
        }
      };
      Container.prototype.autoRegister = function autoRegister(fn, key) {
        var resolver = undefined;
        if (typeof fn === 'function') {
          var _registration = _aureliaMetadata.metadata.get(_aureliaMetadata.metadata.registration, fn);
          if (_registration === undefined) {
            resolver = new StrategyResolver(1, fn);
          } else {
            resolver = _registration.createResolver(this, key === undefined ? fn : key, fn);
          }
        } else {
          resolver = new StrategyResolver(0, fn);
        }
        this.registerResolver(key === undefined ? fn : key, resolver);
        return resolver;
      };
      Container.prototype.autoRegisterAll = function autoRegisterAll(fns) {
        var i = fns.length;
        while (i--) {
          this.autoRegister(fns[i]);
        }
      };
      Container.prototype.unregister = function unregister(key) {
        this.resolvers['delete'](key);
      };
      Container.prototype.hasResolver = function hasResolver(key) {
        var checkParent = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
        if (key === null || key === undefined) {
          throw new Error(badKeyError);
        }
        return this.resolvers.has(key) || checkParent && this.parent !== null && this.parent.hasResolver(key, checkParent);
      };
      Container.prototype.hasHandler = function hasHandler(key, checkParent) {
        return this.hasResolver(key, checkParent);
      };
      Container.prototype.get = function get(key) {
        if (key === null || key === undefined) {
          throw new Error(badKeyError);
        }
        if (key === Container) {
          return this;
        }
        if (key instanceof Resolver) {
          return key.get(this);
        }
        var resolver = this.resolvers.get(key);
        if (resolver === undefined) {
          if (this.parent === null) {
            return this.autoRegister(key).get(this, key);
          }
          return this.parent._get(key);
        }
        return resolver.get(this, key);
      };
      Container.prototype._get = function _get(key) {
        var resolver = this.resolvers.get(key);
        if (resolver === undefined) {
          if (this.parent === null) {
            return this.autoRegister(key).get(this, key);
          }
          return this.parent._get(key);
        }
        return resolver.get(this, key);
      };
      Container.prototype.getAll = function getAll(key) {
        if (key === null || key === undefined) {
          throw new Error(badKeyError);
        }
        var resolver = this.resolvers.get(key);
        if (resolver === undefined) {
          if (this.parent === null) {
            return _emptyParameters;
          }
          return this.parent.getAll(key);
        }
        if (resolver.strategy === 4) {
          var state = resolver.state;
          var i = state.length;
          var results = new Array(i);
          while (i--) {
            results[i] = state[i].get(this, key);
          }
          return results;
        }
        return resolver.get(this, key);
      };
      Container.prototype.createChild = function createChild() {
        var child = new Container(this.constructionInfo);
        child.root = this.root;
        child.parent = this;
        return child;
      };
      Container.prototype.invoke = function invoke(fn) {
        var info = undefined;
        try {
          info = this.constructionInfo.get(fn);
          if (info === undefined) {
            info = this._createConstructionInfo(fn);
            this.constructionInfo.set(fn, info);
          }
          return info.activator.invoke(this, fn, info.keys);
        } catch (e) {
          throw new _aureliaPal.AggregateError('Error invoking ' + fn.name + '. Check the inner error for details.', e, true);
        }
      };
      Container.prototype.invokeWithDynamicDependencies = function invokeWithDynamicDependencies(fn, deps) {
        var info = undefined;
        try {
          info = this.constructionInfo.get(fn);
          if (info === undefined) {
            info = this._createConstructionInfo(fn);
            this.constructionInfo.set(fn, info);
          }
          return info.activator.invokeWithDynamicDependencies(this, fn, info.keys, deps);
        } catch (e) {
          throw new _aureliaPal.AggregateError('Error invoking ' + fn.name + '. Check the inner error for details.', e, true);
        }
      };
      Container.prototype._createConstructionInfo = function _createConstructionInfo(fn) {
        var keys = undefined;
        if (typeof fn.inject === 'function') {
          keys = fn.inject();
        } else if (fn.inject === undefined) {
          keys = _aureliaMetadata.metadata.getOwn(_aureliaMetadata.metadata.paramTypes, fn) || _emptyParameters;
        } else {
          keys = fn.inject;
        }
        var activator = _aureliaMetadata.metadata.getOwn(_aureliaMetadata.metadata.instanceActivator, fn) || classActivators[keys.length] || classActivators.fallback;
        return new ConstructionInfo(activator, keys);
      };
      return Container;
    })();
    exports.Container = Container;
    function autoinject(potentialTarget) {
      var deco = function deco(target) {
        target.inject = _aureliaMetadata.metadata.getOwn(_aureliaMetadata.metadata.paramTypes, target) || _emptyParameters;
      };
      return potentialTarget ? deco(potentialTarget) : deco;
    }
    function inject() {
      for (var _len = arguments.length,
          rest = Array(_len),
          _key = 0; _key < _len; _key++) {
        rest[_key] = arguments[_key];
      }
      return function(target, key, descriptor) {
        if (descriptor) {
          var fn = descriptor.value;
          fn.inject = rest;
        } else {
          target.inject = rest;
        }
      };
    }
    function registration(value) {
      return function(target) {
        _aureliaMetadata.metadata.define(_aureliaMetadata.metadata.registration, value, target);
      };
    }
    function transient(key) {
      return registration(new TransientRegistration(key));
    }
    function singleton(keyOrRegisterInChild) {
      var registerInChild = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
      return registration(new SingletonRegistration(keyOrRegisterInChild, registerInChild));
    }
    function instanceActivator(value) {
      return function(target) {
        _aureliaMetadata.metadata.define(_aureliaMetadata.metadata.instanceActivator, value, target);
      };
    }
    function factory() {
      return instanceActivator(FactoryActivator.instance);
    }
    _aureliaMetadata.decorators.configure.simpleDecorator('autoinject', autoinject);
    _aureliaMetadata.decorators.configure.parameterizedDecorator('inject', inject);
    _aureliaMetadata.decorators.configure.parameterizedDecorator('registration', registration);
    _aureliaMetadata.decorators.configure.parameterizedDecorator('transient', transient);
    _aureliaMetadata.decorators.configure.parameterizedDecorator('singleton', singleton);
    _aureliaMetadata.decorators.configure.parameterizedDecorator('instanceActivator', instanceActivator);
    _aureliaMetadata.decorators.configure.parameterizedDecorator('factory', factory);
  }).call(__exports, __exports, __require('npm:core-js@0.9.18'), __require('github:aurelia/metadata@0.9.0'), __require('github:aurelia/pal@0.2.0'));
});
})();
(function() {
function define(){};  define.amd = {};
System.register("github:aurelia/logging@0.8.0/aurelia-logging", [], false, function(__require, __exports, __module) {
  return (function(exports) {
    'use strict';
    exports.__esModule = true;
    exports.getLogger = getLogger;
    exports.addAppender = addAppender;
    exports.setLevel = setLevel;
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
      }
    }
    var logLevel = {
      none: 0,
      error: 1,
      warn: 2,
      info: 3,
      debug: 4
    };
    exports.logLevel = logLevel;
    var loggers = {};
    var currentLevel = logLevel.none;
    var appenders = [];
    var slice = Array.prototype.slice;
    var loggerConstructionKey = {};
    function log(logger, level, args) {
      var i = appenders.length;
      var current = undefined;
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
    var Logger = (function() {
      function Logger(id, key) {
        _classCallCheck(this, Logger);
        if (key !== loggerConstructionKey) {
          throw new Error('You cannot instantiate "Logger". Use the "getLogger" API instead.');
        }
        this.id = id;
      }
      Logger.prototype.debug = function debug(message) {};
      Logger.prototype.info = function info(message) {};
      Logger.prototype.warn = function warn(message) {};
      Logger.prototype.error = function error(message) {};
      return Logger;
    })();
    exports.Logger = Logger;
  }).call(__exports, __exports);
});
})();
(function() {
function define(){};  define.amd = {};
System.register("github:aurelia/path@0.10.0/aurelia-path", [], false, function(__require, __exports, __module) {
  return (function(exports) {
    'use strict';
    exports.__esModule = true;
    exports.relativeToFile = relativeToFile;
    exports.join = join;
    exports.buildQueryString = buildQueryString;
    exports.parseQueryString = parseQueryString;
    function trimDots(ary) {
      for (var i = 0; i < ary.length; ++i) {
        var part = ary[i];
        if (part === '.') {
          ary.splice(i, 1);
          i -= 1;
        } else if (part === '..') {
          if (i === 0 || i === 1 && ary[2] === '..' || ary[i - 1] === '..') {
            continue;
          } else if (i > 0) {
            ary.splice(i - 1, 2);
            i -= 2;
          }
        }
      }
    }
    function relativeToFile(name, file) {
      var fileParts = file && file.split('/');
      var nameParts = name.trim().split('/');
      if (nameParts[0].charAt(0) === '.' && fileParts) {
        var normalizedBaseParts = fileParts.slice(0, fileParts.length - 1);
        nameParts.unshift.apply(nameParts, normalizedBaseParts);
      }
      trimDots(nameParts);
      return nameParts.join('/');
    }
    function join(path1, path2) {
      if (!path1) {
        return path2;
      }
      if (!path2) {
        return path1;
      }
      var schemeMatch = path1.match(/^([^/]*?:)\//);
      var scheme = schemeMatch && schemeMatch.length > 0 ? schemeMatch[1] : '';
      path1 = path1.substr(scheme.length);
      var urlPrefix = undefined;
      if (path1.indexOf('///') === 0 && scheme === 'file:') {
        urlPrefix = '///';
      } else if (path1.indexOf('//') === 0) {
        urlPrefix = '//';
      } else if (path1.indexOf('/') === 0) {
        urlPrefix = '/';
      } else {
        urlPrefix = '';
      }
      var trailingSlash = path2.slice(-1) === '/' ? '/' : '';
      var url1 = path1.split('/');
      var url2 = path2.split('/');
      var url3 = [];
      for (var i = 0,
          ii = url1.length; i < ii; ++i) {
        if (url1[i] === '..') {
          url3.pop();
        } else if (url1[i] === '.' || url1[i] === '') {
          continue;
        } else {
          url3.push(url1[i]);
        }
      }
      for (var i = 0,
          ii = url2.length; i < ii; ++i) {
        if (url2[i] === '..') {
          url3.pop();
        } else if (url2[i] === '.' || url2[i] === '') {
          continue;
        } else {
          url3.push(url2[i]);
        }
      }
      return scheme + urlPrefix + url3.join('/') + trailingSlash;
    }
    function buildQueryString(params) {
      var pairs = [];
      var keys = Object.keys(params || {}).sort();
      var encode = encodeURIComponent;
      var encodeKey = function encodeKey(k) {
        return encode(k).replace('%24', '$');
      };
      for (var i = 0,
          len = keys.length; i < len; i++) {
        var key = keys[i];
        var value = params[key];
        if (value === null || value === undefined) {
          continue;
        }
        if (Array.isArray(value)) {
          var arrayKey = encodeKey(key) + '[]';
          for (var j = 0,
              l = value.length; j < l; j++) {
            pairs.push(arrayKey + '=' + encode(value[j]));
          }
        } else {
          pairs.push(encodeKey(key) + '=' + encode(value));
        }
      }
      if (pairs.length === 0) {
        return '';
      }
      return pairs.join('&');
    }
    function parseQueryString(queryString) {
      var queryParams = {};
      if (!queryString || typeof queryString !== 'string') {
        return queryParams;
      }
      var query = queryString;
      if (query.charAt(0) === '?') {
        query = query.substr(1);
      }
      var pairs = query.split('&');
      for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i].split('=');
        var key = decodeURIComponent(pair[0]);
        var keyLength = key.length;
        var isArray = false;
        var value = undefined;
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
    }
  }).call(__exports, __exports);
});
})();
System.register("npm:core-js@1.2.1/modules/$", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $Object = Object;
  module.exports = {
    create: $Object.create,
    getProto: $Object.getPrototypeOf,
    isEnum: {}.propertyIsEnumerable,
    getDesc: $Object.getOwnPropertyDescriptor,
    setDesc: $Object.defineProperty,
    setDescs: $Object.defineProperties,
    getKeys: $Object.keys,
    getNames: $Object.getOwnPropertyNames,
    getSymbols: $Object.getOwnPropertySymbols,
    each: [].forEach
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/$.fails", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = function(exec) {
    try {
      return !!exec();
    } catch (e) {
      return true;
    }
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/$.property-desc", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = function(bitmap, value) {
    return {
      enumerable: !(bitmap & 1),
      configurable: !(bitmap & 2),
      writable: !(bitmap & 4),
      value: value
    };
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/$.global", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var UNDEFINED = 'undefined';
  var global = module.exports = typeof window != UNDEFINED && window.Math == Math ? window : typeof self != UNDEFINED && self.Math == Math ? self : Function('return this')();
  if (typeof __g == 'number')
    __g = global;
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/$.is-object", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = function(it) {
    return typeof it === 'object' ? it !== null : typeof it === 'function';
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/$.has", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var hasOwnProperty = {}.hasOwnProperty;
  module.exports = function(it, key) {
    return hasOwnProperty.call(it, key);
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/$.cof", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var toString = {}.toString;
  module.exports = function(it) {
    return toString.call(it).slice(8, -1);
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/$.core", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var core = module.exports = {version: '1.2.1'};
  if (typeof __e == 'number')
    __e = core;
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/$.hide", ["npm:core-js@1.2.1/modules/$", "npm:core-js@1.2.1/modules/$.property-desc", "npm:core-js@1.2.1/modules/$.support-desc"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@1.2.1/modules/$"),
      createDesc = require("npm:core-js@1.2.1/modules/$.property-desc");
  module.exports = require("npm:core-js@1.2.1/modules/$.support-desc") ? function(object, key, value) {
    return $.setDesc(object, key, createDesc(1, value));
  } : function(object, key, value) {
    object[key] = value;
    return object;
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/$.uid", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var id = 0,
      px = Math.random();
  module.exports = function(key) {
    return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/$.invoke", [], true, function(require, exports, module) {
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
    }
    return fn.apply(that, args);
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/$.a-function", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = function(it) {
    if (typeof it != 'function')
      throw TypeError(it + ' is not a function!');
    return it;
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/$.iobject", ["npm:core-js@1.2.1/modules/$.cof"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var cof = require("npm:core-js@1.2.1/modules/$.cof");
  module.exports = 0 in Object('z') ? Object : function(it) {
    return cof(it) == 'String' ? it.split('') : Object(it);
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/$.defined", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = function(it) {
    if (it == undefined)
      throw TypeError("Can't call method on  " + it);
    return it;
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/$.to-integer", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var ceil = Math.ceil,
      floor = Math.floor;
  module.exports = function(it) {
    return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/$.is-array", ["npm:core-js@1.2.1/modules/$.cof"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var cof = require("npm:core-js@1.2.1/modules/$.cof");
  module.exports = Array.isArray || function(arg) {
    return cof(arg) == 'Array';
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/$.shared", ["npm:core-js@1.2.1/modules/$.global"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var global = require("npm:core-js@1.2.1/modules/$.global"),
      SHARED = '__core-js_shared__',
      store = global[SHARED] || (global[SHARED] = {});
  module.exports = function(key) {
    return store[key] || (store[key] = {});
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/$.an-object", ["npm:core-js@1.2.1/modules/$.is-object"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var isObject = require("npm:core-js@1.2.1/modules/$.is-object");
  module.exports = function(it) {
    if (!isObject(it))
      throw TypeError(it + ' is not an object!');
    return it;
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/$.to-iobject", ["npm:core-js@1.2.1/modules/$.iobject", "npm:core-js@1.2.1/modules/$.defined"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var IObject = require("npm:core-js@1.2.1/modules/$.iobject"),
      defined = require("npm:core-js@1.2.1/modules/$.defined");
  module.exports = function(it) {
    return IObject(defined(it));
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/$.to-index", ["npm:core-js@1.2.1/modules/$.to-integer"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var toInteger = require("npm:core-js@1.2.1/modules/$.to-integer"),
      max = Math.max,
      min = Math.min;
  module.exports = function(index, length) {
    index = toInteger(index);
    return index < 0 ? max(index + length, 0) : min(index, length);
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/$.array-includes", ["npm:core-js@1.2.1/modules/$.to-iobject", "npm:core-js@1.2.1/modules/$.to-length", "npm:core-js@1.2.1/modules/$.to-index"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var toIObject = require("npm:core-js@1.2.1/modules/$.to-iobject"),
      toLength = require("npm:core-js@1.2.1/modules/$.to-length"),
      toIndex = require("npm:core-js@1.2.1/modules/$.to-index");
  module.exports = function(IS_INCLUDES) {
    return function($this, el, fromIndex) {
      var O = toIObject($this),
          length = toLength(O.length),
          index = toIndex(fromIndex, length),
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

System.register("npm:core-js@1.2.1/modules/$.tag", ["npm:core-js@1.2.1/modules/$.has", "npm:core-js@1.2.1/modules/$.hide", "npm:core-js@1.2.1/modules/$.wks"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var has = require("npm:core-js@1.2.1/modules/$.has"),
      hide = require("npm:core-js@1.2.1/modules/$.hide"),
      TAG = require("npm:core-js@1.2.1/modules/$.wks")('toStringTag');
  module.exports = function(it, tag, stat) {
    if (it && !has(it = stat ? it : it.prototype, TAG))
      hide(it, TAG, tag);
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/$.keyof", ["npm:core-js@1.2.1/modules/$", "npm:core-js@1.2.1/modules/$.to-iobject"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@1.2.1/modules/$"),
      toIObject = require("npm:core-js@1.2.1/modules/$.to-iobject");
  module.exports = function(object, el) {
    var O = toIObject(object),
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

System.register("npm:core-js@1.2.1/modules/$.get-names", ["npm:core-js@1.2.1/modules/$.to-iobject", "npm:core-js@1.2.1/modules/$"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var toString = {}.toString,
      toIObject = require("npm:core-js@1.2.1/modules/$.to-iobject"),
      getNames = require("npm:core-js@1.2.1/modules/$").getNames;
  var windowNames = typeof window == 'object' && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [];
  var getWindowNames = function(it) {
    try {
      return getNames(it);
    } catch (e) {
      return windowNames.slice();
    }
  };
  module.exports.get = function getOwnPropertyNames(it) {
    if (windowNames && toString.call(it) == '[object Window]')
      return getWindowNames(it);
    return getNames(toIObject(it));
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/$.enum-keys", ["npm:core-js@1.2.1/modules/$"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@1.2.1/modules/$");
  module.exports = function(it) {
    var keys = $.getKeys(it),
        getSymbols = $.getSymbols;
    if (getSymbols) {
      var symbols = getSymbols(it),
          isEnum = $.isEnum,
          i = 0,
          key;
      while (symbols.length > i)
        if (isEnum.call(it, key = symbols[i++]))
          keys.push(key);
    }
    return keys;
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/$.library", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = false;
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/$.assign", ["npm:core-js@1.2.1/modules/$.to-object", "npm:core-js@1.2.1/modules/$.iobject", "npm:core-js@1.2.1/modules/$.enum-keys", "npm:core-js@1.2.1/modules/$.has", "npm:core-js@1.2.1/modules/$.fails"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var toObject = require("npm:core-js@1.2.1/modules/$.to-object"),
      IObject = require("npm:core-js@1.2.1/modules/$.iobject"),
      enumKeys = require("npm:core-js@1.2.1/modules/$.enum-keys"),
      has = require("npm:core-js@1.2.1/modules/$.has");
  module.exports = require("npm:core-js@1.2.1/modules/$.fails")(function() {
    var a = Object.assign,
        A = {},
        B = {},
        S = Symbol(),
        K = 'abcdefghijklmnopqrst';
    A[S] = 7;
    K.split('').forEach(function(k) {
      B[k] = k;
    });
    return a({}, A)[S] != 7 || Object.keys(a({}, B)).join('') != K;
  }) ? function assign(target, source) {
    var T = toObject(target),
        l = arguments.length,
        i = 1;
    while (l > i) {
      var S = IObject(arguments[i++]),
          keys = enumKeys(S),
          length = keys.length,
          j = 0,
          key;
      while (length > j)
        if (has(S, key = keys[j++]))
          T[key] = S[key];
    }
    return T;
  } : Object.assign;
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/$.same", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = Object.is || function is(x, y) {
    return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/$.set-proto", ["npm:core-js@1.2.1/modules/$", "npm:core-js@1.2.1/modules/$.is-object", "npm:core-js@1.2.1/modules/$.an-object", "npm:core-js@1.2.1/modules/$.ctx"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var getDesc = require("npm:core-js@1.2.1/modules/$").getDesc,
      isObject = require("npm:core-js@1.2.1/modules/$.is-object"),
      anObject = require("npm:core-js@1.2.1/modules/$.an-object");
  var check = function(O, proto) {
    anObject(O);
    if (!isObject(proto) && proto !== null)
      throw TypeError(proto + ": can't set as prototype!");
  };
  module.exports = {
    set: Object.setPrototypeOf || ('__proto__' in {} ? function(test, buggy, set) {
      try {
        set = require("npm:core-js@1.2.1/modules/$.ctx")(Function.call, getDesc(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
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
    }({}, false) : undefined),
    check: check
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/$.classof", ["npm:core-js@1.2.1/modules/$.cof", "npm:core-js@1.2.1/modules/$.wks"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var cof = require("npm:core-js@1.2.1/modules/$.cof"),
      TAG = require("npm:core-js@1.2.1/modules/$.wks")('toStringTag'),
      ARG = cof(function() {
        return arguments;
      }()) == 'Arguments';
  module.exports = function(it) {
    var O,
        T,
        B;
    return it === undefined ? 'Undefined' : it === null ? 'Null' : typeof(T = (O = Object(it))[TAG]) == 'string' ? T : ARG ? cof(O) : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/$.object-sap", ["npm:core-js@1.2.1/modules/$.def", "npm:core-js@1.2.1/modules/$.core", "npm:core-js@1.2.1/modules/$.fails"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = function(KEY, exec) {
    var $def = require("npm:core-js@1.2.1/modules/$.def"),
        fn = (require("npm:core-js@1.2.1/modules/$.core").Object || {})[KEY] || Object[KEY],
        exp = {};
    exp[KEY] = exec(fn);
    $def($def.S + $def.F * require("npm:core-js@1.2.1/modules/$.fails")(function() {
      fn(1);
    }), 'Object', exp);
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/es6.object.seal", ["npm:core-js@1.2.1/modules/$.is-object", "npm:core-js@1.2.1/modules/$.object-sap"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var isObject = require("npm:core-js@1.2.1/modules/$.is-object");
  require("npm:core-js@1.2.1/modules/$.object-sap")('seal', function($seal) {
    return function seal(it) {
      return $seal && isObject(it) ? $seal(it) : it;
    };
  });
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/es6.object.prevent-extensions", ["npm:core-js@1.2.1/modules/$.is-object", "npm:core-js@1.2.1/modules/$.object-sap"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var isObject = require("npm:core-js@1.2.1/modules/$.is-object");
  require("npm:core-js@1.2.1/modules/$.object-sap")('preventExtensions', function($preventExtensions) {
    return function preventExtensions(it) {
      return $preventExtensions && isObject(it) ? $preventExtensions(it) : it;
    };
  });
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/es6.object.is-frozen", ["npm:core-js@1.2.1/modules/$.is-object", "npm:core-js@1.2.1/modules/$.object-sap"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var isObject = require("npm:core-js@1.2.1/modules/$.is-object");
  require("npm:core-js@1.2.1/modules/$.object-sap")('isFrozen', function($isFrozen) {
    return function isFrozen(it) {
      return isObject(it) ? $isFrozen ? $isFrozen(it) : false : true;
    };
  });
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/es6.object.is-sealed", ["npm:core-js@1.2.1/modules/$.is-object", "npm:core-js@1.2.1/modules/$.object-sap"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var isObject = require("npm:core-js@1.2.1/modules/$.is-object");
  require("npm:core-js@1.2.1/modules/$.object-sap")('isSealed', function($isSealed) {
    return function isSealed(it) {
      return isObject(it) ? $isSealed ? $isSealed(it) : false : true;
    };
  });
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/es6.object.is-extensible", ["npm:core-js@1.2.1/modules/$.is-object", "npm:core-js@1.2.1/modules/$.object-sap"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var isObject = require("npm:core-js@1.2.1/modules/$.is-object");
  require("npm:core-js@1.2.1/modules/$.object-sap")('isExtensible', function($isExtensible) {
    return function isExtensible(it) {
      return isObject(it) ? $isExtensible ? $isExtensible(it) : true : false;
    };
  });
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/es6.object.get-own-property-descriptor", ["npm:core-js@1.2.1/modules/$.to-iobject", "npm:core-js@1.2.1/modules/$.object-sap"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var toIObject = require("npm:core-js@1.2.1/modules/$.to-iobject");
  require("npm:core-js@1.2.1/modules/$.object-sap")('getOwnPropertyDescriptor', function($getOwnPropertyDescriptor) {
    return function getOwnPropertyDescriptor(it, key) {
      return $getOwnPropertyDescriptor(toIObject(it), key);
    };
  });
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/es6.object.get-prototype-of", ["npm:core-js@1.2.1/modules/$.to-object", "npm:core-js@1.2.1/modules/$.object-sap"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var toObject = require("npm:core-js@1.2.1/modules/$.to-object");
  require("npm:core-js@1.2.1/modules/$.object-sap")('getPrototypeOf', function($getPrototypeOf) {
    return function getPrototypeOf(it) {
      return $getPrototypeOf(toObject(it));
    };
  });
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/es6.object.keys", ["npm:core-js@1.2.1/modules/$.to-object", "npm:core-js@1.2.1/modules/$.object-sap"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var toObject = require("npm:core-js@1.2.1/modules/$.to-object");
  require("npm:core-js@1.2.1/modules/$.object-sap")('keys', function($keys) {
    return function keys(it) {
      return $keys(toObject(it));
    };
  });
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/es6.object.get-own-property-names", ["npm:core-js@1.2.1/modules/$.object-sap", "npm:core-js@1.2.1/modules/$.get-names"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  require("npm:core-js@1.2.1/modules/$.object-sap")('getOwnPropertyNames', function() {
    return require("npm:core-js@1.2.1/modules/$.get-names").get;
  });
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/es6.function.name", ["npm:core-js@1.2.1/modules/$", "npm:core-js@1.2.1/modules/$.property-desc", "npm:core-js@1.2.1/modules/$.has", "npm:core-js@1.2.1/modules/$.support-desc"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var setDesc = require("npm:core-js@1.2.1/modules/$").setDesc,
      createDesc = require("npm:core-js@1.2.1/modules/$.property-desc"),
      has = require("npm:core-js@1.2.1/modules/$.has"),
      FProto = Function.prototype,
      nameRE = /^\s*function ([^ (]*)/,
      NAME = 'name';
  NAME in FProto || require("npm:core-js@1.2.1/modules/$.support-desc") && setDesc(FProto, NAME, {
    configurable: true,
    get: function() {
      var match = ('' + this).match(nameRE),
          name = match ? match[1] : '';
      has(this, NAME) || setDesc(this, NAME, createDesc(5, name));
      return name;
    }
  });
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/es6.function.has-instance", ["npm:core-js@1.2.1/modules/$", "npm:core-js@1.2.1/modules/$.is-object", "npm:core-js@1.2.1/modules/$.wks"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var $ = require("npm:core-js@1.2.1/modules/$"),
      isObject = require("npm:core-js@1.2.1/modules/$.is-object"),
      HAS_INSTANCE = require("npm:core-js@1.2.1/modules/$.wks")('hasInstance'),
      FunctionProto = Function.prototype;
  if (!(HAS_INSTANCE in FunctionProto))
    $.setDesc(FunctionProto, HAS_INSTANCE, {value: function(O) {
        if (typeof this != 'function' || !isObject(O))
          return false;
        if (!isObject(this.prototype))
          return O instanceof this;
        while (O = $.getProto(O))
          if (this.prototype === O)
            return true;
        return false;
      }});
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/es6.number.constructor", ["npm:core-js@1.2.1/modules/$", "npm:core-js@1.2.1/modules/$.global", "npm:core-js@1.2.1/modules/$.has", "npm:core-js@1.2.1/modules/$.cof", "npm:core-js@1.2.1/modules/$.is-object", "npm:core-js@1.2.1/modules/$.fails", "npm:core-js@1.2.1/modules/$.support-desc", "npm:core-js@1.2.1/modules/$.redef"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var $ = require("npm:core-js@1.2.1/modules/$"),
      global = require("npm:core-js@1.2.1/modules/$.global"),
      has = require("npm:core-js@1.2.1/modules/$.has"),
      cof = require("npm:core-js@1.2.1/modules/$.cof"),
      isObject = require("npm:core-js@1.2.1/modules/$.is-object"),
      fails = require("npm:core-js@1.2.1/modules/$.fails"),
      NUMBER = 'Number',
      $Number = global[NUMBER],
      Base = $Number,
      proto = $Number.prototype,
      BROKEN_COF = cof($.create(proto)) == NUMBER;
  var toPrimitive = function(it) {
    var fn,
        val;
    if (typeof(fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))
      return val;
    if (typeof(fn = it.toString) == 'function' && !isObject(val = fn.call(it)))
      return val;
    throw TypeError("Can't convert object to number");
  };
  var toNumber = function(it) {
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
  };
  if (!($Number('0o1') && $Number('0b1'))) {
    $Number = function Number(it) {
      var that = this;
      return that instanceof $Number && (BROKEN_COF ? fails(function() {
        proto.valueOf.call(that);
      }) : cof(that) != NUMBER) ? new Base(toNumber(it)) : toNumber(it);
    };
    $.each.call(require("npm:core-js@1.2.1/modules/$.support-desc") ? $.getNames(Base) : ('MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' + 'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' + 'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger').split(','), function(key) {
      if (has(Base, key) && !has($Number, key)) {
        $.setDesc($Number, key, $.getDesc(Base, key));
      }
    });
    $Number.prototype = proto;
    proto.constructor = $Number;
    require("npm:core-js@1.2.1/modules/$.redef")(global, NUMBER, $Number);
  }
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/es6.number.epsilon", ["npm:core-js@1.2.1/modules/$.def"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $def = require("npm:core-js@1.2.1/modules/$.def");
  $def($def.S, 'Number', {EPSILON: Math.pow(2, -52)});
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/es6.number.is-finite", ["npm:core-js@1.2.1/modules/$.def", "npm:core-js@1.2.1/modules/$.global"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $def = require("npm:core-js@1.2.1/modules/$.def"),
      _isFinite = require("npm:core-js@1.2.1/modules/$.global").isFinite;
  $def($def.S, 'Number', {isFinite: function isFinite(it) {
      return typeof it == 'number' && _isFinite(it);
    }});
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/$.is-integer", ["npm:core-js@1.2.1/modules/$.is-object"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var isObject = require("npm:core-js@1.2.1/modules/$.is-object"),
      floor = Math.floor;
  module.exports = function isInteger(it) {
    return !isObject(it) && isFinite(it) && floor(it) === it;
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/es6.number.is-nan", ["npm:core-js@1.2.1/modules/$.def"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $def = require("npm:core-js@1.2.1/modules/$.def");
  $def($def.S, 'Number', {isNaN: function isNaN(number) {
      return number != number;
    }});
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/es6.number.is-safe-integer", ["npm:core-js@1.2.1/modules/$.def", "npm:core-js@1.2.1/modules/$.is-integer"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $def = require("npm:core-js@1.2.1/modules/$.def"),
      isInteger = require("npm:core-js@1.2.1/modules/$.is-integer"),
      abs = Math.abs;
  $def($def.S, 'Number', {isSafeInteger: function isSafeInteger(number) {
      return isInteger(number) && abs(number) <= 0x1fffffffffffff;
    }});
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/es6.number.max-safe-integer", ["npm:core-js@1.2.1/modules/$.def"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $def = require("npm:core-js@1.2.1/modules/$.def");
  $def($def.S, 'Number', {MAX_SAFE_INTEGER: 0x1fffffffffffff});
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/es6.number.min-safe-integer", ["npm:core-js@1.2.1/modules/$.def"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $def = require("npm:core-js@1.2.1/modules/$.def");
  $def($def.S, 'Number', {MIN_SAFE_INTEGER: -0x1fffffffffffff});
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/es6.number.parse-float", ["npm:core-js@1.2.1/modules/$.def"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $def = require("npm:core-js@1.2.1/modules/$.def");
  $def($def.S, 'Number', {parseFloat: parseFloat});
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/es6.number.parse-int", ["npm:core-js@1.2.1/modules/$.def"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $def = require("npm:core-js@1.2.1/modules/$.def");
  $def($def.S, 'Number', {parseInt: parseInt});
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/$.log1p", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = Math.log1p || function log1p(x) {
    return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : Math.log(1 + x);
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/es6.math.asinh", ["npm:core-js@1.2.1/modules/$.def"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $def = require("npm:core-js@1.2.1/modules/$.def");
  function asinh(x) {
    return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : Math.log(x + Math.sqrt(x * x + 1));
  }
  $def($def.S, 'Math', {asinh: asinh});
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/es6.math.atanh", ["npm:core-js@1.2.1/modules/$.def"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $def = require("npm:core-js@1.2.1/modules/$.def");
  $def($def.S, 'Math', {atanh: function atanh(x) {
      return (x = +x) == 0 ? x : Math.log((1 + x) / (1 - x)) / 2;
    }});
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/$.sign", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = Math.sign || function sign(x) {
    return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/es6.math.clz32", ["npm:core-js@1.2.1/modules/$.def"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $def = require("npm:core-js@1.2.1/modules/$.def");
  $def($def.S, 'Math', {clz32: function clz32(x) {
      return (x >>>= 0) ? 31 - Math.floor(Math.log(x + 0.5) * Math.LOG2E) : 32;
    }});
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/es6.math.cosh", ["npm:core-js@1.2.1/modules/$.def"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $def = require("npm:core-js@1.2.1/modules/$.def"),
      exp = Math.exp;
  $def($def.S, 'Math', {cosh: function cosh(x) {
      return (exp(x = +x) + exp(-x)) / 2;
    }});
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/$.expm1", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = Math.expm1 || function expm1(x) {
    return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : Math.exp(x) - 1;
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/es6.math.fround", ["npm:core-js@1.2.1/modules/$.def", "npm:core-js@1.2.1/modules/$.sign"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $def = require("npm:core-js@1.2.1/modules/$.def"),
      sign = require("npm:core-js@1.2.1/modules/$.sign"),
      pow = Math.pow,
      EPSILON = pow(2, -52),
      EPSILON32 = pow(2, -23),
      MAX32 = pow(2, 127) * (2 - EPSILON32),
      MIN32 = pow(2, -126);
  var roundTiesToEven = function(n) {
    return n + 1 / EPSILON - 1 / EPSILON;
  };
  $def($def.S, 'Math', {fround: function fround(x) {
      var $abs = Math.abs(x),
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
    }});
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/es6.math.hypot", ["npm:core-js@1.2.1/modules/$.def"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $def = require("npm:core-js@1.2.1/modules/$.def"),
      abs = Math.abs;
  $def($def.S, 'Math', {hypot: function hypot(value1, value2) {
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
      return larg === Infinity ? Infinity : larg * Math.sqrt(sum);
    }});
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/es6.math.imul", ["npm:core-js@1.2.1/modules/$.def", "npm:core-js@1.2.1/modules/$.fails"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $def = require("npm:core-js@1.2.1/modules/$.def");
  $def($def.S + $def.F * require("npm:core-js@1.2.1/modules/$.fails")(function() {
    return Math.imul(0xffffffff, 5) != -5;
  }), 'Math', {imul: function imul(x, y) {
      var UINT16 = 0xffff,
          xn = +x,
          yn = +y,
          xl = UINT16 & xn,
          yl = UINT16 & yn;
      return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
    }});
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/es6.math.log10", ["npm:core-js@1.2.1/modules/$.def"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $def = require("npm:core-js@1.2.1/modules/$.def");
  $def($def.S, 'Math', {log10: function log10(x) {
      return Math.log(x) / Math.LN10;
    }});
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/es6.math.log1p", ["npm:core-js@1.2.1/modules/$.def", "npm:core-js@1.2.1/modules/$.log1p"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $def = require("npm:core-js@1.2.1/modules/$.def");
  $def($def.S, 'Math', {log1p: require("npm:core-js@1.2.1/modules/$.log1p")});
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/es6.math.log2", ["npm:core-js@1.2.1/modules/$.def"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $def = require("npm:core-js@1.2.1/modules/$.def");
  $def($def.S, 'Math', {log2: function log2(x) {
      return Math.log(x) / Math.LN2;
    }});
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/es6.math.sign", ["npm:core-js@1.2.1/modules/$.def", "npm:core-js@1.2.1/modules/$.sign"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $def = require("npm:core-js@1.2.1/modules/$.def");
  $def($def.S, 'Math', {sign: require("npm:core-js@1.2.1/modules/$.sign")});
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/es6.math.sinh", ["npm:core-js@1.2.1/modules/$.def", "npm:core-js@1.2.1/modules/$.expm1", "npm:core-js@1.2.1/modules/$.fails"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $def = require("npm:core-js@1.2.1/modules/$.def"),
      expm1 = require("npm:core-js@1.2.1/modules/$.expm1"),
      exp = Math.exp;
  $def($def.S + $def.F * require("npm:core-js@1.2.1/modules/$.fails")(function() {
    return !Math.sinh(-2e-17) != -2e-17;
  }), 'Math', {sinh: function sinh(x) {
      return Math.abs(x = +x) < 1 ? (expm1(x) - expm1(-x)) / 2 : (exp(x - 1) - exp(-x - 1)) * (Math.E / 2);
    }});
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/es6.math.tanh", ["npm:core-js@1.2.1/modules/$.def", "npm:core-js@1.2.1/modules/$.expm1"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $def = require("npm:core-js@1.2.1/modules/$.def"),
      expm1 = require("npm:core-js@1.2.1/modules/$.expm1"),
      exp = Math.exp;
  $def($def.S, 'Math', {tanh: function tanh(x) {
      var a = expm1(x = +x),
          b = expm1(-x);
      return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
    }});
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/es6.math.trunc", ["npm:core-js@1.2.1/modules/$.def"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $def = require("npm:core-js@1.2.1/modules/$.def");
  $def($def.S, 'Math', {trunc: function trunc(it) {
      return (it > 0 ? Math.floor : Math.ceil)(it);
    }});
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/es6.string.from-code-point", ["npm:core-js@1.2.1/modules/$.def", "npm:core-js@1.2.1/modules/$.to-index"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $def = require("npm:core-js@1.2.1/modules/$.def"),
      toIndex = require("npm:core-js@1.2.1/modules/$.to-index"),
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

System.register("npm:core-js@1.2.1/modules/es6.string.raw", ["npm:core-js@1.2.1/modules/$.def", "npm:core-js@1.2.1/modules/$.to-iobject", "npm:core-js@1.2.1/modules/$.to-length"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $def = require("npm:core-js@1.2.1/modules/$.def"),
      toIObject = require("npm:core-js@1.2.1/modules/$.to-iobject"),
      toLength = require("npm:core-js@1.2.1/modules/$.to-length");
  $def($def.S, 'String', {raw: function raw(callSite) {
      var tpl = toIObject(callSite.raw),
          len = toLength(tpl.length),
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

System.register("npm:core-js@1.2.1/modules/$.string-trim", ["npm:core-js@1.2.1/modules/$.def", "npm:core-js@1.2.1/modules/$.defined", "npm:core-js@1.2.1/modules/$.fails"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var trim = function(string, TYPE) {
    string = String(defined(string));
    if (TYPE & 1)
      string = string.replace(ltrim, '');
    if (TYPE & 2)
      string = string.replace(rtrim, '');
    return string;
  };
  var $def = require("npm:core-js@1.2.1/modules/$.def"),
      defined = require("npm:core-js@1.2.1/modules/$.defined"),
      spaces = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' + '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF',
      space = '[' + spaces + ']',
      non = '\u200b\u0085',
      ltrim = RegExp('^' + space + space + '*'),
      rtrim = RegExp(space + space + '*$');
  module.exports = function(KEY, exec) {
    var exp = {};
    exp[KEY] = exec(trim);
    $def($def.P + $def.F * require("npm:core-js@1.2.1/modules/$.fails")(function() {
      return !!spaces[KEY]() || non[KEY]() != non;
    }), 'String', exp);
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/$.string-at", ["npm:core-js@1.2.1/modules/$.to-integer", "npm:core-js@1.2.1/modules/$.defined"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var toInteger = require("npm:core-js@1.2.1/modules/$.to-integer"),
      defined = require("npm:core-js@1.2.1/modules/$.defined");
  module.exports = function(TO_STRING) {
    return function(that, pos) {
      var s = String(defined(that)),
          i = toInteger(pos),
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

System.register("npm:core-js@1.2.1/modules/$.iterators", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = {};
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/$.iter-create", ["npm:core-js@1.2.1/modules/$", "npm:core-js@1.2.1/modules/$.hide", "npm:core-js@1.2.1/modules/$.wks", "npm:core-js@1.2.1/modules/$.property-desc", "npm:core-js@1.2.1/modules/$.tag"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var $ = require("npm:core-js@1.2.1/modules/$"),
      IteratorPrototype = {};
  require("npm:core-js@1.2.1/modules/$.hide")(IteratorPrototype, require("npm:core-js@1.2.1/modules/$.wks")('iterator'), function() {
    return this;
  });
  module.exports = function(Constructor, NAME, next) {
    Constructor.prototype = $.create(IteratorPrototype, {next: require("npm:core-js@1.2.1/modules/$.property-desc")(1, next)});
    require("npm:core-js@1.2.1/modules/$.tag")(Constructor, NAME + ' Iterator');
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/es6.string.code-point-at", ["npm:core-js@1.2.1/modules/$.def", "npm:core-js@1.2.1/modules/$.string-at"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var $def = require("npm:core-js@1.2.1/modules/$.def"),
      $at = require("npm:core-js@1.2.1/modules/$.string-at")(false);
  $def($def.P, 'String', {codePointAt: function codePointAt(pos) {
      return $at(this, pos);
    }});
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/$.is-regexp", ["npm:core-js@1.2.1/modules/$.is-object", "npm:core-js@1.2.1/modules/$.cof", "npm:core-js@1.2.1/modules/$.wks"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var isObject = require("npm:core-js@1.2.1/modules/$.is-object"),
      cof = require("npm:core-js@1.2.1/modules/$.cof"),
      MATCH = require("npm:core-js@1.2.1/modules/$.wks")('match');
  module.exports = function(it) {
    var isRegExp;
    return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/$.fails-is-regexp", ["npm:core-js@1.2.1/modules/$.wks"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = function(KEY) {
    var re = /./;
    try {
      '/./'[KEY](re);
    } catch (e) {
      try {
        re[require("npm:core-js@1.2.1/modules/$.wks")('match')] = false;
        return !'/./'[KEY](re);
      } catch (e) {}
    }
    return true;
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/es6.string.includes", ["npm:core-js@1.2.1/modules/$.def", "npm:core-js@1.2.1/modules/$.string-context", "npm:core-js@1.2.1/modules/$.fails-is-regexp"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var $def = require("npm:core-js@1.2.1/modules/$.def"),
      context = require("npm:core-js@1.2.1/modules/$.string-context"),
      INCLUDES = 'includes';
  $def($def.P + $def.F * require("npm:core-js@1.2.1/modules/$.fails-is-regexp")(INCLUDES), 'String', {includes: function includes(searchString) {
      return !!~context(this, searchString, INCLUDES).indexOf(searchString, arguments[1]);
    }});
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/$.string-repeat", ["npm:core-js@1.2.1/modules/$.to-integer", "npm:core-js@1.2.1/modules/$.defined"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var toInteger = require("npm:core-js@1.2.1/modules/$.to-integer"),
      defined = require("npm:core-js@1.2.1/modules/$.defined");
  module.exports = function repeat(count) {
    var str = String(defined(this)),
        res = '',
        n = toInteger(count);
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

System.register("npm:core-js@1.2.1/modules/es6.string.starts-with", ["npm:core-js@1.2.1/modules/$.def", "npm:core-js@1.2.1/modules/$.to-length", "npm:core-js@1.2.1/modules/$.string-context", "npm:core-js@1.2.1/modules/$.fails-is-regexp"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var $def = require("npm:core-js@1.2.1/modules/$.def"),
      toLength = require("npm:core-js@1.2.1/modules/$.to-length"),
      context = require("npm:core-js@1.2.1/modules/$.string-context"),
      STARTS_WITH = 'startsWith',
      $startsWith = ''[STARTS_WITH];
  $def($def.P + $def.F * require("npm:core-js@1.2.1/modules/$.fails-is-regexp")(STARTS_WITH), 'String', {startsWith: function startsWith(searchString) {
      var that = context(this, searchString, STARTS_WITH),
          index = toLength(Math.min(arguments[1], that.length)),
          search = String(searchString);
      return $startsWith ? $startsWith.call(that, search, index) : that.slice(index, index + search.length) === search;
    }});
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/$.iter-call", ["npm:core-js@1.2.1/modules/$.an-object"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var anObject = require("npm:core-js@1.2.1/modules/$.an-object");
  module.exports = function(iterator, fn, value, entries) {
    try {
      return entries ? fn(anObject(value)[0], value[1]) : fn(value);
    } catch (e) {
      var ret = iterator['return'];
      if (ret !== undefined)
        anObject(ret.call(iterator));
      throw e;
    }
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/$.is-array-iter", ["npm:core-js@1.2.1/modules/$.iterators", "npm:core-js@1.2.1/modules/$.wks"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var Iterators = require("npm:core-js@1.2.1/modules/$.iterators"),
      ITERATOR = require("npm:core-js@1.2.1/modules/$.wks")('iterator');
  module.exports = function(it) {
    return (Iterators.Array || Array.prototype[ITERATOR]) === it;
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/core.get-iterator-method", ["npm:core-js@1.2.1/modules/$.classof", "npm:core-js@1.2.1/modules/$.wks", "npm:core-js@1.2.1/modules/$.iterators", "npm:core-js@1.2.1/modules/$.core"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var classof = require("npm:core-js@1.2.1/modules/$.classof"),
      ITERATOR = require("npm:core-js@1.2.1/modules/$.wks")('iterator'),
      Iterators = require("npm:core-js@1.2.1/modules/$.iterators");
  module.exports = require("npm:core-js@1.2.1/modules/$.core").getIteratorMethod = function(it) {
    if (it != undefined)
      return it[ITERATOR] || it['@@iterator'] || Iterators[classof(it)];
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/$.iter-detect", ["npm:core-js@1.2.1/modules/$.wks"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var SYMBOL_ITERATOR = require("npm:core-js@1.2.1/modules/$.wks")('iterator'),
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

System.register("npm:core-js@1.2.1/modules/es6.array.of", ["npm:core-js@1.2.1/modules/$.def", "npm:core-js@1.2.1/modules/$.fails"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var $def = require("npm:core-js@1.2.1/modules/$.def");
  $def($def.S + $def.F * require("npm:core-js@1.2.1/modules/$.fails")(function() {
    function F() {}
    return !(Array.of.call(F) instanceof F);
  }), 'Array', {of: function of() {
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

System.register("npm:core-js@1.2.1/modules/$.unscope", ["npm:core-js@1.2.1/modules/$.wks", "npm:core-js@1.2.1/modules/$.hide"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var UNSCOPABLES = require("npm:core-js@1.2.1/modules/$.wks")('unscopables');
  if ([][UNSCOPABLES] == undefined)
    require("npm:core-js@1.2.1/modules/$.hide")(Array.prototype, UNSCOPABLES, {});
  module.exports = function(key) {
    [][UNSCOPABLES][key] = true;
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/$.iter-step", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = function(done, value) {
    return {
      value: value,
      done: !!done
    };
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/$.species", ["npm:core-js@1.2.1/modules/$", "npm:core-js@1.2.1/modules/$.wks", "npm:core-js@1.2.1/modules/$.support-desc"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var $ = require("npm:core-js@1.2.1/modules/$"),
      SPECIES = require("npm:core-js@1.2.1/modules/$.wks")('species');
  module.exports = function(C) {
    if (require("npm:core-js@1.2.1/modules/$.support-desc") && !(SPECIES in C))
      $.setDesc(C, SPECIES, {
        configurable: true,
        get: function() {
          return this;
        }
      });
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/$.array-copy-within", ["npm:core-js@1.2.1/modules/$.to-object", "npm:core-js@1.2.1/modules/$.to-index", "npm:core-js@1.2.1/modules/$.to-length"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var toObject = require("npm:core-js@1.2.1/modules/$.to-object"),
      toIndex = require("npm:core-js@1.2.1/modules/$.to-index"),
      toLength = require("npm:core-js@1.2.1/modules/$.to-length");
  module.exports = [].copyWithin || function copyWithin(target, start) {
    var O = toObject(this),
        len = toLength(O.length),
        to = toIndex(target, len),
        from = toIndex(start, len),
        end = arguments[2],
        count = Math.min((end === undefined ? len : toIndex(end, len)) - from, len - to),
        inc = 1;
    if (from < to && to < from + count) {
      inc = -1;
      from += count - 1;
      to += count - 1;
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
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/$.array-fill", ["npm:core-js@1.2.1/modules/$.to-object", "npm:core-js@1.2.1/modules/$.to-index", "npm:core-js@1.2.1/modules/$.to-length"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var toObject = require("npm:core-js@1.2.1/modules/$.to-object"),
      toIndex = require("npm:core-js@1.2.1/modules/$.to-index"),
      toLength = require("npm:core-js@1.2.1/modules/$.to-length");
  module.exports = [].fill || function fill(value) {
    var O = toObject(this, true),
        length = toLength(O.length),
        index = toIndex(arguments[1], length),
        end = arguments[2],
        endPos = end === undefined ? length : toIndex(end, length);
    while (endPos > index)
      O[index++] = value;
    return O;
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/es6.array.find", ["npm:core-js@1.2.1/modules/$.def", "npm:core-js@1.2.1/modules/$.array-methods", "npm:core-js@1.2.1/modules/$.unscope"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var KEY = 'find',
      $def = require("npm:core-js@1.2.1/modules/$.def"),
      forced = true,
      $find = require("npm:core-js@1.2.1/modules/$.array-methods")(5);
  if (KEY in [])
    Array(1)[KEY](function() {
      forced = false;
    });
  $def($def.P + $def.F * forced, 'Array', {find: function find(callbackfn) {
      return $find(this, callbackfn, arguments[1]);
    }});
  require("npm:core-js@1.2.1/modules/$.unscope")(KEY);
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/es6.array.find-index", ["npm:core-js@1.2.1/modules/$.def", "npm:core-js@1.2.1/modules/$.array-methods", "npm:core-js@1.2.1/modules/$.unscope"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var KEY = 'findIndex',
      $def = require("npm:core-js@1.2.1/modules/$.def"),
      forced = true,
      $find = require("npm:core-js@1.2.1/modules/$.array-methods")(6);
  if (KEY in [])
    Array(1)[KEY](function() {
      forced = false;
    });
  $def($def.P + $def.F * forced, 'Array', {findIndex: function findIndex(callbackfn) {
      return $find(this, callbackfn, arguments[1]);
    }});
  require("npm:core-js@1.2.1/modules/$.unscope")(KEY);
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/$.flags", ["npm:core-js@1.2.1/modules/$.an-object"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var anObject = require("npm:core-js@1.2.1/modules/$.an-object");
  module.exports = function() {
    var that = anObject(this),
        result = '';
    if (that.global)
      result += 'g';
    if (that.ignoreCase)
      result += 'i';
    if (that.multiline)
      result += 'm';
    if (that.unicode)
      result += 'u';
    if (that.sticky)
      result += 'y';
    return result;
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/es6.regexp.flags", ["npm:core-js@1.2.1/modules/$", "npm:core-js@1.2.1/modules/$.support-desc", "npm:core-js@1.2.1/modules/$.flags"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@1.2.1/modules/$");
  if (require("npm:core-js@1.2.1/modules/$.support-desc") && /./g.flags != 'g')
    $.setDesc(RegExp.prototype, 'flags', {
      configurable: true,
      get: require("npm:core-js@1.2.1/modules/$.flags")
    });
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/$.fix-re-wks", ["npm:core-js@1.2.1/modules/$.defined", "npm:core-js@1.2.1/modules/$.wks", "npm:core-js@1.2.1/modules/$.fails", "npm:core-js@1.2.1/modules/$.redef", "npm:core-js@1.2.1/modules/$.hide"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  module.exports = function(KEY, length, exec) {
    var defined = require("npm:core-js@1.2.1/modules/$.defined"),
        SYMBOL = require("npm:core-js@1.2.1/modules/$.wks")(KEY),
        original = ''[KEY];
    if (require("npm:core-js@1.2.1/modules/$.fails")(function() {
      var O = {};
      O[SYMBOL] = function() {
        return 7;
      };
      return ''[KEY](O) != 7;
    })) {
      require("npm:core-js@1.2.1/modules/$.redef")(String.prototype, KEY, exec(defined, SYMBOL, original));
      require("npm:core-js@1.2.1/modules/$.hide")(RegExp.prototype, SYMBOL, length == 2 ? function(string, arg) {
        return original.call(string, this, arg);
      } : function(string) {
        return original.call(string, this);
      });
    }
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/es6.regexp.replace", ["npm:core-js@1.2.1/modules/$.fix-re-wks"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  require("npm:core-js@1.2.1/modules/$.fix-re-wks")('replace', 2, function(defined, REPLACE, $replace) {
    return function replace(searchValue, replaceValue) {
      'use strict';
      var O = defined(this),
          fn = searchValue == undefined ? undefined : searchValue[REPLACE];
      return fn !== undefined ? fn.call(searchValue, O, replaceValue) : $replace.call(String(O), searchValue, replaceValue);
    };
  });
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/es6.regexp.search", ["npm:core-js@1.2.1/modules/$.fix-re-wks"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  require("npm:core-js@1.2.1/modules/$.fix-re-wks")('search', 1, function(defined, SEARCH) {
    return function search(regexp) {
      'use strict';
      var O = defined(this),
          fn = regexp == undefined ? undefined : regexp[SEARCH];
      return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
    };
  });
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/es6.regexp.split", ["npm:core-js@1.2.1/modules/$.fix-re-wks"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  require("npm:core-js@1.2.1/modules/$.fix-re-wks")('split', 2, function(defined, SPLIT, $split) {
    return function split(separator, limit) {
      'use strict';
      var O = defined(this),
          fn = separator == undefined ? undefined : separator[SPLIT];
      return fn !== undefined ? fn.call(separator, O, limit) : $split.call(String(O), separator, limit);
    };
  });
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/$.strict-new", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = function(it, Constructor, name) {
    if (!(it instanceof Constructor))
      throw TypeError(name + ": use the 'new' operator!");
    return it;
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/$.for-of", ["npm:core-js@1.2.1/modules/$.ctx", "npm:core-js@1.2.1/modules/$.iter-call", "npm:core-js@1.2.1/modules/$.is-array-iter", "npm:core-js@1.2.1/modules/$.an-object", "npm:core-js@1.2.1/modules/$.to-length", "npm:core-js@1.2.1/modules/core.get-iterator-method"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var ctx = require("npm:core-js@1.2.1/modules/$.ctx"),
      call = require("npm:core-js@1.2.1/modules/$.iter-call"),
      isArrayIter = require("npm:core-js@1.2.1/modules/$.is-array-iter"),
      anObject = require("npm:core-js@1.2.1/modules/$.an-object"),
      toLength = require("npm:core-js@1.2.1/modules/$.to-length"),
      getIterFn = require("npm:core-js@1.2.1/modules/core.get-iterator-method");
  module.exports = function(iterable, entries, fn, that) {
    var iterFn = getIterFn(iterable),
        f = ctx(fn, that, entries ? 2 : 1),
        index = 0,
        length,
        step,
        iterator;
    if (typeof iterFn != 'function')
      throw TypeError(iterable + ' is not iterable!');
    if (isArrayIter(iterFn))
      for (length = toLength(iterable.length); length > index; index++) {
        entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
      }
    else
      for (iterator = iterFn.call(iterable); !(step = iterator.next()).done; ) {
        call(iterator, f, step.value, entries);
      }
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/$.task", ["npm:core-js@1.2.1/modules/$.ctx", "npm:core-js@1.2.1/modules/$.invoke", "npm:core-js@1.2.1/modules/$.html", "npm:core-js@1.2.1/modules/$.dom-create", "npm:core-js@1.2.1/modules/$.global", "npm:core-js@1.2.1/modules/$.cof", "github:jspm/nodelibs-process@0.1.2"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    'use strict';
    var ctx = require("npm:core-js@1.2.1/modules/$.ctx"),
        invoke = require("npm:core-js@1.2.1/modules/$.invoke"),
        html = require("npm:core-js@1.2.1/modules/$.html"),
        cel = require("npm:core-js@1.2.1/modules/$.dom-create"),
        global = require("npm:core-js@1.2.1/modules/$.global"),
        process = global.process,
        setTask = global.setImmediate,
        clearTask = global.clearImmediate,
        MessageChannel = global.MessageChannel,
        counter = 0,
        queue = {},
        ONREADYSTATECHANGE = 'onreadystatechange',
        defer,
        channel,
        port;
    var run = function() {
      var id = +this;
      if (queue.hasOwnProperty(id)) {
        var fn = queue[id];
        delete queue[id];
        fn();
      }
    };
    var listner = function(event) {
      run.call(event.data);
    };
    if (!setTask || !clearTask) {
      setTask = function setImmediate(fn) {
        var args = [],
            i = 1;
        while (arguments.length > i)
          args.push(arguments[i++]);
        queue[++counter] = function() {
          invoke(typeof fn == 'function' ? fn : Function(fn), args);
        };
        defer(counter);
        return counter;
      };
      clearTask = function clearImmediate(id) {
        delete queue[id];
      };
      if (require("npm:core-js@1.2.1/modules/$.cof")(process) == 'process') {
        defer = function(id) {
          process.nextTick(ctx(run, id, 1));
        };
      } else if (MessageChannel) {
        channel = new MessageChannel;
        port = channel.port2;
        channel.port1.onmessage = listner;
        defer = ctx(port.postMessage, port, 1);
      } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
        defer = function(id) {
          global.postMessage(id + '', '*');
        };
        global.addEventListener('message', listner, false);
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
  })(require("github:jspm/nodelibs-process@0.1.2"));
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/$.mix", ["npm:core-js@1.2.1/modules/$.redef"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $redef = require("npm:core-js@1.2.1/modules/$.redef");
  module.exports = function(target, src) {
    for (var key in src)
      $redef(target, key, src[key]);
    return target;
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/$.collection-strong", ["npm:core-js@1.2.1/modules/$", "npm:core-js@1.2.1/modules/$.hide", "npm:core-js@1.2.1/modules/$.ctx", "npm:core-js@1.2.1/modules/$.species", "npm:core-js@1.2.1/modules/$.strict-new", "npm:core-js@1.2.1/modules/$.defined", "npm:core-js@1.2.1/modules/$.for-of", "npm:core-js@1.2.1/modules/$.iter-step", "npm:core-js@1.2.1/modules/$.uid", "npm:core-js@1.2.1/modules/$.has", "npm:core-js@1.2.1/modules/$.is-object", "npm:core-js@1.2.1/modules/$.support-desc", "npm:core-js@1.2.1/modules/$.mix", "npm:core-js@1.2.1/modules/$.iter-define", "npm:core-js@1.2.1/modules/$.core"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var $ = require("npm:core-js@1.2.1/modules/$"),
      hide = require("npm:core-js@1.2.1/modules/$.hide"),
      ctx = require("npm:core-js@1.2.1/modules/$.ctx"),
      species = require("npm:core-js@1.2.1/modules/$.species"),
      strictNew = require("npm:core-js@1.2.1/modules/$.strict-new"),
      defined = require("npm:core-js@1.2.1/modules/$.defined"),
      forOf = require("npm:core-js@1.2.1/modules/$.for-of"),
      step = require("npm:core-js@1.2.1/modules/$.iter-step"),
      ID = require("npm:core-js@1.2.1/modules/$.uid")('id'),
      $has = require("npm:core-js@1.2.1/modules/$.has"),
      isObject = require("npm:core-js@1.2.1/modules/$.is-object"),
      isExtensible = Object.isExtensible || isObject,
      SUPPORT_DESC = require("npm:core-js@1.2.1/modules/$.support-desc"),
      SIZE = SUPPORT_DESC ? '_s' : 'size',
      id = 0;
  var fastKey = function(it, create) {
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
  };
  var getEntry = function(that, key) {
    var index = fastKey(key),
        entry;
    if (index !== 'F')
      return that._i[index];
    for (entry = that._f; entry; entry = entry.n) {
      if (entry.k == key)
        return entry;
    }
  };
  module.exports = {
    getConstructor: function(wrapper, NAME, IS_MAP, ADDER) {
      var C = wrapper(function(that, iterable) {
        strictNew(that, C, NAME);
        that._i = $.create(null);
        that._f = undefined;
        that._l = undefined;
        that[SIZE] = 0;
        if (iterable != undefined)
          forOf(iterable, IS_MAP, that[ADDER], that);
      });
      require("npm:core-js@1.2.1/modules/$.mix")(C.prototype, {
        clear: function clear() {
          for (var that = this,
              data = that._i,
              entry = that._f; entry; entry = entry.n) {
            entry.r = true;
            if (entry.p)
              entry.p = entry.p.n = undefined;
            delete data[entry.i];
          }
          that._f = that._l = undefined;
          that[SIZE] = 0;
        },
        'delete': function(key) {
          var that = this,
              entry = getEntry(that, key);
          if (entry) {
            var next = entry.n,
                prev = entry.p;
            delete that._i[entry.i];
            entry.r = true;
            if (prev)
              prev.n = next;
            if (next)
              next.p = prev;
            if (that._f == entry)
              that._f = next;
            if (that._l == entry)
              that._l = prev;
            that[SIZE]--;
          }
          return !!entry;
        },
        forEach: function forEach(callbackfn) {
          var f = ctx(callbackfn, arguments[1], 3),
              entry;
          while (entry = entry ? entry.n : this._f) {
            f(entry.v, entry.k, this);
            while (entry && entry.r)
              entry = entry.p;
          }
        },
        has: function has(key) {
          return !!getEntry(this, key);
        }
      });
      if (SUPPORT_DESC)
        $.setDesc(C.prototype, 'size', {get: function() {
            return defined(this[SIZE]);
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
        that._l = entry = {
          i: index = fastKey(key, true),
          k: key,
          v: value,
          p: prev = that._l,
          n: undefined,
          r: false
        };
        if (!that._f)
          that._f = entry;
        if (prev)
          prev.n = entry;
        that[SIZE]++;
        if (index !== 'F')
          that._i[index] = entry;
      }
      return that;
    },
    getEntry: getEntry,
    setStrong: function(C, NAME, IS_MAP) {
      require("npm:core-js@1.2.1/modules/$.iter-define")(C, NAME, function(iterated, kind) {
        this._t = iterated;
        this._k = kind;
        this._l = undefined;
      }, function() {
        var that = this,
            kind = that._k,
            entry = that._l;
        while (entry && entry.r)
          entry = entry.p;
        if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
          that._t = undefined;
          return step(1);
        }
        if (kind == 'keys')
          return step(0, entry.k);
        if (kind == 'values')
          return step(0, entry.v);
        return step(0, [entry.k, entry.v]);
      }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);
      species(C);
      species(require("npm:core-js@1.2.1/modules/$.core")[NAME]);
    }
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/$.collection", ["npm:core-js@1.2.1/modules/$.global", "npm:core-js@1.2.1/modules/$.def", "npm:core-js@1.2.1/modules/$.for-of", "npm:core-js@1.2.1/modules/$.strict-new", "npm:core-js@1.2.1/modules/$.redef", "npm:core-js@1.2.1/modules/$.fails", "npm:core-js@1.2.1/modules/$.mix", "npm:core-js@1.2.1/modules/$.iter-detect", "npm:core-js@1.2.1/modules/$.tag"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var global = require("npm:core-js@1.2.1/modules/$.global"),
      $def = require("npm:core-js@1.2.1/modules/$.def"),
      forOf = require("npm:core-js@1.2.1/modules/$.for-of"),
      strictNew = require("npm:core-js@1.2.1/modules/$.strict-new");
  module.exports = function(NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
    var Base = global[NAME],
        C = Base,
        ADDER = IS_MAP ? 'set' : 'add',
        proto = C && C.prototype,
        O = {};
    var fixMethod = function(KEY) {
      var fn = proto[KEY];
      require("npm:core-js@1.2.1/modules/$.redef")(proto, KEY, KEY == 'delete' ? function(a) {
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
    };
    if (typeof C != 'function' || !(IS_WEAK || proto.forEach && !require("npm:core-js@1.2.1/modules/$.fails")(function() {
      new C().entries().next();
    }))) {
      C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
      require("npm:core-js@1.2.1/modules/$.mix")(C.prototype, methods);
    } else {
      var inst = new C,
          chain = inst[ADDER](IS_WEAK ? {} : -0, 1),
          buggyZero;
      if (!require("npm:core-js@1.2.1/modules/$.iter-detect")(function(iter) {
        new C(iter);
      })) {
        C = wrapper(function(target, iterable) {
          strictNew(target, C, NAME);
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
      if (IS_WEAK && proto.clear)
        delete proto.clear;
    }
    require("npm:core-js@1.2.1/modules/$.tag")(C, NAME);
    O[NAME] = C;
    $def($def.G + $def.W + $def.F * (C != Base), O);
    if (!IS_WEAK)
      common.setStrong(C, NAME, IS_MAP);
    return C;
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/es6.set", ["npm:core-js@1.2.1/modules/$.collection-strong", "npm:core-js@1.2.1/modules/$.collection"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var strong = require("npm:core-js@1.2.1/modules/$.collection-strong");
  require("npm:core-js@1.2.1/modules/$.collection")('Set', function(get) {
    return function Set() {
      return get(this, arguments[0]);
    };
  }, {add: function add(value) {
      return strong.def(this, value = value === 0 ? 0 : value, value);
    }}, strong);
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/$.collection-weak", ["npm:core-js@1.2.1/modules/$.hide", "npm:core-js@1.2.1/modules/$.an-object", "npm:core-js@1.2.1/modules/$.strict-new", "npm:core-js@1.2.1/modules/$.for-of", "npm:core-js@1.2.1/modules/$.array-methods", "npm:core-js@1.2.1/modules/$.uid", "npm:core-js@1.2.1/modules/$.is-object", "npm:core-js@1.2.1/modules/$.has", "npm:core-js@1.2.1/modules/$.mix"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var hide = require("npm:core-js@1.2.1/modules/$.hide"),
      anObject = require("npm:core-js@1.2.1/modules/$.an-object"),
      strictNew = require("npm:core-js@1.2.1/modules/$.strict-new"),
      forOf = require("npm:core-js@1.2.1/modules/$.for-of"),
      method = require("npm:core-js@1.2.1/modules/$.array-methods"),
      WEAK = require("npm:core-js@1.2.1/modules/$.uid")('weak'),
      isObject = require("npm:core-js@1.2.1/modules/$.is-object"),
      $has = require("npm:core-js@1.2.1/modules/$.has"),
      isExtensible = Object.isExtensible || isObject,
      find = method(5),
      findIndex = method(6),
      id = 0;
  var frozenStore = function(that) {
    return that._l || (that._l = new FrozenStore);
  };
  var FrozenStore = function() {
    this.a = [];
  };
  var findFrozen = function(store, key) {
    return find(store.a, function(it) {
      return it[0] === key;
    });
  };
  FrozenStore.prototype = {
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
        this.a.push([key, value]);
    },
    'delete': function(key) {
      var index = findIndex(this.a, function(it) {
        return it[0] === key;
      });
      if (~index)
        this.a.splice(index, 1);
      return !!~index;
    }
  };
  module.exports = {
    getConstructor: function(wrapper, NAME, IS_MAP, ADDER) {
      var C = wrapper(function(that, iterable) {
        strictNew(that, C, NAME);
        that._i = id++;
        that._l = undefined;
        if (iterable != undefined)
          forOf(iterable, IS_MAP, that[ADDER], that);
      });
      require("npm:core-js@1.2.1/modules/$.mix")(C.prototype, {
        'delete': function(key) {
          if (!isObject(key))
            return false;
          if (!isExtensible(key))
            return frozenStore(this)['delete'](key);
          return $has(key, WEAK) && $has(key[WEAK], this._i) && delete key[WEAK][this._i];
        },
        has: function has(key) {
          if (!isObject(key))
            return false;
          if (!isExtensible(key))
            return frozenStore(this).has(key);
          return $has(key, WEAK) && $has(key[WEAK], this._i);
        }
      });
      return C;
    },
    def: function(that, key, value) {
      if (!isExtensible(anObject(key))) {
        frozenStore(that).set(key, value);
      } else {
        $has(key, WEAK) || hide(key, WEAK, {});
        key[WEAK][that._i] = value;
      }
      return that;
    },
    frozenStore: frozenStore,
    WEAK: WEAK
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/es6.weak-set", ["npm:core-js@1.2.1/modules/$.collection-weak", "npm:core-js@1.2.1/modules/$.collection"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var weak = require("npm:core-js@1.2.1/modules/$.collection-weak");
  require("npm:core-js@1.2.1/modules/$.collection")('WeakSet', function(get) {
    return function WeakSet() {
      return get(this, arguments[0]);
    };
  }, {add: function add(value) {
      return weak.def(this, value, true);
    }}, weak, false, true);
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/es6.reflect.apply", ["npm:core-js@1.2.1/modules/$.def"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $def = require("npm:core-js@1.2.1/modules/$.def"),
      _apply = Function.apply;
  $def($def.S, 'Reflect', {apply: function apply(target, thisArgument, argumentsList) {
      return _apply.call(target, thisArgument, argumentsList);
    }});
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/es6.reflect.construct", ["npm:core-js@1.2.1/modules/$", "npm:core-js@1.2.1/modules/$.def", "npm:core-js@1.2.1/modules/$.a-function", "npm:core-js@1.2.1/modules/$.an-object", "npm:core-js@1.2.1/modules/$.is-object", "npm:core-js@1.2.1/modules/$.core", "npm:core-js@1.2.1/modules/$.fails"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@1.2.1/modules/$"),
      $def = require("npm:core-js@1.2.1/modules/$.def"),
      aFunction = require("npm:core-js@1.2.1/modules/$.a-function"),
      anObject = require("npm:core-js@1.2.1/modules/$.an-object"),
      isObject = require("npm:core-js@1.2.1/modules/$.is-object"),
      bind = Function.bind || require("npm:core-js@1.2.1/modules/$.core").Function.prototype.bind;
  $def($def.S + $def.F * require("npm:core-js@1.2.1/modules/$.fails")(function() {
    function F() {}
    return !(Reflect.construct(function() {}, [], F) instanceof F);
  }), 'Reflect', {construct: function construct(Target, args) {
      aFunction(Target);
      var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
      if (Target == newTarget) {
        if (args != undefined)
          switch (anObject(args).length) {
            case 0:
              return new Target;
            case 1:
              return new Target(args[0]);
            case 2:
              return new Target(args[0], args[1]);
            case 3:
              return new Target(args[0], args[1], args[2]);
            case 4:
              return new Target(args[0], args[1], args[2], args[3]);
          }
        var $args = [null];
        $args.push.apply($args, args);
        return new (bind.apply(Target, $args));
      }
      var proto = newTarget.prototype,
          instance = $.create(isObject(proto) ? proto : Object.prototype),
          result = Function.apply.call(Target, instance, args);
      return isObject(result) ? result : instance;
    }});
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/es6.reflect.define-property", ["npm:core-js@1.2.1/modules/$", "npm:core-js@1.2.1/modules/$.def", "npm:core-js@1.2.1/modules/$.an-object", "npm:core-js@1.2.1/modules/$.fails"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@1.2.1/modules/$"),
      $def = require("npm:core-js@1.2.1/modules/$.def"),
      anObject = require("npm:core-js@1.2.1/modules/$.an-object");
  $def($def.S + $def.F * require("npm:core-js@1.2.1/modules/$.fails")(function() {
    Reflect.defineProperty($.setDesc({}, 1, {value: 1}), 1, {value: 2});
  }), 'Reflect', {defineProperty: function defineProperty(target, propertyKey, attributes) {
      anObject(target);
      try {
        $.setDesc(target, propertyKey, attributes);
        return true;
      } catch (e) {
        return false;
      }
    }});
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/es6.reflect.delete-property", ["npm:core-js@1.2.1/modules/$.def", "npm:core-js@1.2.1/modules/$", "npm:core-js@1.2.1/modules/$.an-object"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $def = require("npm:core-js@1.2.1/modules/$.def"),
      getDesc = require("npm:core-js@1.2.1/modules/$").getDesc,
      anObject = require("npm:core-js@1.2.1/modules/$.an-object");
  $def($def.S, 'Reflect', {deleteProperty: function deleteProperty(target, propertyKey) {
      var desc = getDesc(anObject(target), propertyKey);
      return desc && !desc.configurable ? false : delete target[propertyKey];
    }});
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/es6.reflect.enumerate", ["npm:core-js@1.2.1/modules/$.def", "npm:core-js@1.2.1/modules/$.an-object", "npm:core-js@1.2.1/modules/$.iter-create"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var $def = require("npm:core-js@1.2.1/modules/$.def"),
      anObject = require("npm:core-js@1.2.1/modules/$.an-object");
  var Enumerate = function(iterated) {
    this._t = anObject(iterated);
    this._i = 0;
    var keys = this._k = [],
        key;
    for (key in iterated)
      keys.push(key);
  };
  require("npm:core-js@1.2.1/modules/$.iter-create")(Enumerate, 'Object', function() {
    var that = this,
        keys = that._k,
        key;
    do {
      if (that._i >= keys.length)
        return {
          value: undefined,
          done: true
        };
    } while (!((key = keys[that._i++]) in that._t));
    return {
      value: key,
      done: false
    };
  });
  $def($def.S, 'Reflect', {enumerate: function enumerate(target) {
      return new Enumerate(target);
    }});
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/es6.reflect.get", ["npm:core-js@1.2.1/modules/$", "npm:core-js@1.2.1/modules/$.has", "npm:core-js@1.2.1/modules/$.def", "npm:core-js@1.2.1/modules/$.is-object", "npm:core-js@1.2.1/modules/$.an-object"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@1.2.1/modules/$"),
      has = require("npm:core-js@1.2.1/modules/$.has"),
      $def = require("npm:core-js@1.2.1/modules/$.def"),
      isObject = require("npm:core-js@1.2.1/modules/$.is-object"),
      anObject = require("npm:core-js@1.2.1/modules/$.an-object");
  function get(target, propertyKey) {
    var receiver = arguments.length < 3 ? target : arguments[2],
        desc,
        proto;
    if (anObject(target) === receiver)
      return target[propertyKey];
    if (desc = $.getDesc(target, propertyKey))
      return has(desc, 'value') ? desc.value : desc.get !== undefined ? desc.get.call(receiver) : undefined;
    if (isObject(proto = $.getProto(target)))
      return get(proto, propertyKey, receiver);
  }
  $def($def.S, 'Reflect', {get: get});
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/es6.reflect.get-own-property-descriptor", ["npm:core-js@1.2.1/modules/$", "npm:core-js@1.2.1/modules/$.def", "npm:core-js@1.2.1/modules/$.an-object"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@1.2.1/modules/$"),
      $def = require("npm:core-js@1.2.1/modules/$.def"),
      anObject = require("npm:core-js@1.2.1/modules/$.an-object");
  $def($def.S, 'Reflect', {getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey) {
      return $.getDesc(anObject(target), propertyKey);
    }});
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/es6.reflect.get-prototype-of", ["npm:core-js@1.2.1/modules/$.def", "npm:core-js@1.2.1/modules/$", "npm:core-js@1.2.1/modules/$.an-object"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $def = require("npm:core-js@1.2.1/modules/$.def"),
      getProto = require("npm:core-js@1.2.1/modules/$").getProto,
      anObject = require("npm:core-js@1.2.1/modules/$.an-object");
  $def($def.S, 'Reflect', {getPrototypeOf: function getPrototypeOf(target) {
      return getProto(anObject(target));
    }});
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/es6.reflect.has", ["npm:core-js@1.2.1/modules/$.def"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $def = require("npm:core-js@1.2.1/modules/$.def");
  $def($def.S, 'Reflect', {has: function has(target, propertyKey) {
      return propertyKey in target;
    }});
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/es6.reflect.is-extensible", ["npm:core-js@1.2.1/modules/$.def", "npm:core-js@1.2.1/modules/$.an-object"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $def = require("npm:core-js@1.2.1/modules/$.def"),
      anObject = require("npm:core-js@1.2.1/modules/$.an-object"),
      $isExtensible = Object.isExtensible;
  $def($def.S, 'Reflect', {isExtensible: function isExtensible(target) {
      anObject(target);
      return $isExtensible ? $isExtensible(target) : true;
    }});
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/$.own-keys", ["npm:core-js@1.2.1/modules/$", "npm:core-js@1.2.1/modules/$.an-object", "npm:core-js@1.2.1/modules/$.global"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@1.2.1/modules/$"),
      anObject = require("npm:core-js@1.2.1/modules/$.an-object"),
      Reflect = require("npm:core-js@1.2.1/modules/$.global").Reflect;
  module.exports = Reflect && Reflect.ownKeys || function ownKeys(it) {
    var keys = $.getNames(anObject(it)),
        getSymbols = $.getSymbols;
    return getSymbols ? keys.concat(getSymbols(it)) : keys;
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/es6.reflect.prevent-extensions", ["npm:core-js@1.2.1/modules/$.def", "npm:core-js@1.2.1/modules/$.an-object"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $def = require("npm:core-js@1.2.1/modules/$.def"),
      anObject = require("npm:core-js@1.2.1/modules/$.an-object"),
      $preventExtensions = Object.preventExtensions;
  $def($def.S, 'Reflect', {preventExtensions: function preventExtensions(target) {
      anObject(target);
      try {
        if ($preventExtensions)
          $preventExtensions(target);
        return true;
      } catch (e) {
        return false;
      }
    }});
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/es6.reflect.set", ["npm:core-js@1.2.1/modules/$", "npm:core-js@1.2.1/modules/$.has", "npm:core-js@1.2.1/modules/$.def", "npm:core-js@1.2.1/modules/$.property-desc", "npm:core-js@1.2.1/modules/$.an-object", "npm:core-js@1.2.1/modules/$.is-object"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@1.2.1/modules/$"),
      has = require("npm:core-js@1.2.1/modules/$.has"),
      $def = require("npm:core-js@1.2.1/modules/$.def"),
      createDesc = require("npm:core-js@1.2.1/modules/$.property-desc"),
      anObject = require("npm:core-js@1.2.1/modules/$.an-object"),
      isObject = require("npm:core-js@1.2.1/modules/$.is-object");
  function set(target, propertyKey, V) {
    var receiver = arguments.length < 4 ? target : arguments[3],
        ownDesc = $.getDesc(anObject(target), propertyKey),
        existingDescriptor,
        proto;
    if (!ownDesc) {
      if (isObject(proto = $.getProto(target))) {
        return set(proto, propertyKey, V, receiver);
      }
      ownDesc = createDesc(0);
    }
    if (has(ownDesc, 'value')) {
      if (ownDesc.writable === false || !isObject(receiver))
        return false;
      existingDescriptor = $.getDesc(receiver, propertyKey) || createDesc(0);
      existingDescriptor.value = V;
      $.setDesc(receiver, propertyKey, existingDescriptor);
      return true;
    }
    return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
  }
  $def($def.S, 'Reflect', {set: set});
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/es6.reflect.set-prototype-of", ["npm:core-js@1.2.1/modules/$.def", "npm:core-js@1.2.1/modules/$.set-proto"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $def = require("npm:core-js@1.2.1/modules/$.def"),
      setProto = require("npm:core-js@1.2.1/modules/$.set-proto");
  if (setProto)
    $def($def.S, 'Reflect', {setPrototypeOf: function setPrototypeOf(target, proto) {
        setProto.check(target, proto);
        try {
          setProto.set(target, proto);
          return true;
        } catch (e) {
          return false;
        }
      }});
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/es7.array.includes", ["npm:core-js@1.2.1/modules/$.def", "npm:core-js@1.2.1/modules/$.array-includes", "npm:core-js@1.2.1/modules/$.unscope"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var $def = require("npm:core-js@1.2.1/modules/$.def"),
      $includes = require("npm:core-js@1.2.1/modules/$.array-includes")(true);
  $def($def.P, 'Array', {includes: function includes(el) {
      return $includes(this, el, arguments[1]);
    }});
  require("npm:core-js@1.2.1/modules/$.unscope")('includes');
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/es7.string.at", ["npm:core-js@1.2.1/modules/$.def", "npm:core-js@1.2.1/modules/$.string-at"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var $def = require("npm:core-js@1.2.1/modules/$.def"),
      $at = require("npm:core-js@1.2.1/modules/$.string-at")(true);
  $def($def.P, 'String', {at: function at(pos) {
      return $at(this, pos);
    }});
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/$.string-pad", ["npm:core-js@1.2.1/modules/$.to-length", "npm:core-js@1.2.1/modules/$.string-repeat", "npm:core-js@1.2.1/modules/$.defined"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var toLength = require("npm:core-js@1.2.1/modules/$.to-length"),
      repeat = require("npm:core-js@1.2.1/modules/$.string-repeat"),
      defined = require("npm:core-js@1.2.1/modules/$.defined");
  module.exports = function(that, maxLength, fillString, left) {
    var S = String(defined(that)),
        stringLength = S.length,
        fillStr = fillString === undefined ? ' ' : String(fillString),
        intMaxLength = toLength(maxLength);
    if (intMaxLength <= stringLength)
      return S;
    if (fillStr == '')
      fillStr = ' ';
    var fillLen = intMaxLength - stringLength,
        stringFiller = repeat.call(fillStr, Math.ceil(fillLen / fillStr.length));
    if (stringFiller.length > fillLen)
      stringFiller = stringFiller.slice(0, fillLen);
    return left ? stringFiller + S : S + stringFiller;
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/es7.string.pad-right", ["npm:core-js@1.2.1/modules/$.def", "npm:core-js@1.2.1/modules/$.string-pad"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var $def = require("npm:core-js@1.2.1/modules/$.def"),
      $pad = require("npm:core-js@1.2.1/modules/$.string-pad");
  $def($def.P, 'String', {padRight: function padRight(maxLength) {
      return $pad(this, maxLength, arguments[1], false);
    }});
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/es7.string.trim-left", ["npm:core-js@1.2.1/modules/$.string-trim"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  require("npm:core-js@1.2.1/modules/$.string-trim")('trimLeft', function($trim) {
    return function trimLeft() {
      return $trim(this, 1);
    };
  });
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/es7.string.trim-right", ["npm:core-js@1.2.1/modules/$.string-trim"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  require("npm:core-js@1.2.1/modules/$.string-trim")('trimRight', function($trim) {
    return function trimRight() {
      return $trim(this, 2);
    };
  });
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/$.replacer", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = function(regExp, replace) {
    var replacer = replace === Object(replace) ? function(part) {
      return replace[part];
    } : replace;
    return function(it) {
      return String(it).replace(regExp, replacer);
    };
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/es7.object.get-own-property-descriptors", ["npm:core-js@1.2.1/modules/$", "npm:core-js@1.2.1/modules/$.def", "npm:core-js@1.2.1/modules/$.own-keys", "npm:core-js@1.2.1/modules/$.to-iobject", "npm:core-js@1.2.1/modules/$.property-desc"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@1.2.1/modules/$"),
      $def = require("npm:core-js@1.2.1/modules/$.def"),
      ownKeys = require("npm:core-js@1.2.1/modules/$.own-keys"),
      toIObject = require("npm:core-js@1.2.1/modules/$.to-iobject"),
      createDesc = require("npm:core-js@1.2.1/modules/$.property-desc");
  $def($def.S, 'Object', {getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
      var O = toIObject(object),
          setDesc = $.setDesc,
          getDesc = $.getDesc,
          keys = ownKeys(O),
          result = {},
          i = 0,
          key,
          D;
      while (keys.length > i) {
        D = getDesc(O, key = keys[i++]);
        if (key in result)
          setDesc(result, key, createDesc(0, D));
        else
          result[key] = D;
      }
      return result;
    }});
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/$.object-to-array", ["npm:core-js@1.2.1/modules/$", "npm:core-js@1.2.1/modules/$.has", "npm:core-js@1.2.1/modules/$.to-iobject"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@1.2.1/modules/$"),
      has = require("npm:core-js@1.2.1/modules/$.has"),
      toIObject = require("npm:core-js@1.2.1/modules/$.to-iobject");
  module.exports = function(isEntries) {
    return function(it) {
      var O = toIObject(it),
          keys = $.getKeys(O),
          length = keys.length,
          i = 0,
          result = [],
          key;
      while (length > i)
        has(O, key = keys[i++]) && result.push(isEntries ? [key, O[key]] : O[key]);
      return result;
    };
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/es7.object.entries", ["npm:core-js@1.2.1/modules/$.def", "npm:core-js@1.2.1/modules/$.object-to-array"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $def = require("npm:core-js@1.2.1/modules/$.def"),
      $entries = require("npm:core-js@1.2.1/modules/$.object-to-array")(true);
  $def($def.S, 'Object', {entries: function entries(it) {
      return $entries(it);
    }});
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/$.collection-to-json", ["npm:core-js@1.2.1/modules/$.for-of", "npm:core-js@1.2.1/modules/$.classof"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var forOf = require("npm:core-js@1.2.1/modules/$.for-of"),
      classof = require("npm:core-js@1.2.1/modules/$.classof");
  module.exports = function(NAME) {
    return function toJSON() {
      if (classof(this) != NAME)
        throw TypeError(NAME + "#toJSON isn't generic");
      var arr = [];
      forOf(this, false, arr.push, arr);
      return arr;
    };
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/es7.set.to-json", ["npm:core-js@1.2.1/modules/$.def", "npm:core-js@1.2.1/modules/$.collection-to-json"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $def = require("npm:core-js@1.2.1/modules/$.def");
  $def($def.P, 'Set', {toJSON: require("npm:core-js@1.2.1/modules/$.collection-to-json")('Set')});
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/js.array.statics", ["npm:core-js@1.2.1/modules/$", "npm:core-js@1.2.1/modules/$.def", "npm:core-js@1.2.1/modules/$.core", "npm:core-js@1.2.1/modules/$.ctx"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@1.2.1/modules/$"),
      $def = require("npm:core-js@1.2.1/modules/$.def"),
      $Array = require("npm:core-js@1.2.1/modules/$.core").Array || Array,
      statics = {};
  var setStatics = function(keys, length) {
    $.each.call(keys.split(','), function(key) {
      if (length == undefined && key in $Array)
        statics[key] = $Array[key];
      else if (key in [])
        statics[key] = require("npm:core-js@1.2.1/modules/$.ctx")(Function.call, [][key], length);
    });
  };
  setStatics('pop,reverse,shift,keys,values,entries', 1);
  setStatics('indexOf,every,some,forEach,map,filter,find,findIndex,includes', 3);
  setStatics('join,slice,concat,push,splice,unshift,sort,lastIndexOf,' + 'reduce,reduceRight,copyWithin,fill');
  $def($def.S, 'Array', statics);
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/$.path", ["npm:core-js@1.2.1/modules/$.global"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = require("npm:core-js@1.2.1/modules/$.global");
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/web.immediate", ["npm:core-js@1.2.1/modules/$.def", "npm:core-js@1.2.1/modules/$.task"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $def = require("npm:core-js@1.2.1/modules/$.def"),
      $task = require("npm:core-js@1.2.1/modules/$.task");
  $def($def.G + $def.B, {
    setImmediate: $task.set,
    clearImmediate: $task.clear
  });
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/web.dom.iterable", ["npm:core-js@1.2.1/modules/es6.array.iterator", "npm:core-js@1.2.1/modules/$.global", "npm:core-js@1.2.1/modules/$.hide", "npm:core-js@1.2.1/modules/$.iterators", "npm:core-js@1.2.1/modules/$.wks"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  require("npm:core-js@1.2.1/modules/es6.array.iterator");
  var global = require("npm:core-js@1.2.1/modules/$.global"),
      hide = require("npm:core-js@1.2.1/modules/$.hide"),
      Iterators = require("npm:core-js@1.2.1/modules/$.iterators"),
      ITERATOR = require("npm:core-js@1.2.1/modules/$.wks")('iterator'),
      NL = global.NodeList,
      HTC = global.HTMLCollection,
      NLProto = NL && NL.prototype,
      HTCProto = HTC && HTC.prototype,
      ArrayValues = Iterators.NodeList = Iterators.HTMLCollection = Iterators.Array;
  if (NL && !(ITERATOR in NLProto))
    hide(NLProto, ITERATOR, ArrayValues);
  if (HTC && !(ITERATOR in HTCProto))
    hide(HTCProto, ITERATOR, ArrayValues);
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/core.is-iterable", ["npm:core-js@1.2.1/modules/$.classof", "npm:core-js@1.2.1/modules/$.wks", "npm:core-js@1.2.1/modules/$.iterators", "npm:core-js@1.2.1/modules/$.core"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var classof = require("npm:core-js@1.2.1/modules/$.classof"),
      ITERATOR = require("npm:core-js@1.2.1/modules/$.wks")('iterator'),
      Iterators = require("npm:core-js@1.2.1/modules/$.iterators");
  module.exports = require("npm:core-js@1.2.1/modules/$.core").isIterable = function(it) {
    var O = Object(it);
    return ITERATOR in O || '@@iterator' in O || Iterators.hasOwnProperty(classof(O));
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/core.get-iterator", ["npm:core-js@1.2.1/modules/$.an-object", "npm:core-js@1.2.1/modules/core.get-iterator-method", "npm:core-js@1.2.1/modules/$.core"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var anObject = require("npm:core-js@1.2.1/modules/$.an-object"),
      get = require("npm:core-js@1.2.1/modules/core.get-iterator-method");
  module.exports = require("npm:core-js@1.2.1/modules/$.core").getIterator = function(it) {
    var iterFn = get(it);
    if (typeof iterFn != 'function')
      throw TypeError(it + ' is not iterable!');
    return anObject(iterFn.call(it));
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/core.delay", ["npm:core-js@1.2.1/modules/$.global", "npm:core-js@1.2.1/modules/$.core", "npm:core-js@1.2.1/modules/$.def", "npm:core-js@1.2.1/modules/$.partial"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var global = require("npm:core-js@1.2.1/modules/$.global"),
      core = require("npm:core-js@1.2.1/modules/$.core"),
      $def = require("npm:core-js@1.2.1/modules/$.def"),
      partial = require("npm:core-js@1.2.1/modules/$.partial");
  $def($def.G + $def.F, {delay: function delay(time) {
      return new (core.Promise || global.Promise)(function(resolve) {
        setTimeout(partial.call(resolve, true), time);
      });
    }});
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/core.function.part", ["npm:core-js@1.2.1/modules/$.path", "npm:core-js@1.2.1/modules/$.def", "npm:core-js@1.2.1/modules/$.core", "npm:core-js@1.2.1/modules/$.partial"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var path = require("npm:core-js@1.2.1/modules/$.path"),
      $def = require("npm:core-js@1.2.1/modules/$.def");
  require("npm:core-js@1.2.1/modules/$.core")._ = path._ = path._ || {};
  $def($def.P + $def.F, 'Function', {part: require("npm:core-js@1.2.1/modules/$.partial")});
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/core.object.is-object", ["npm:core-js@1.2.1/modules/$.def", "npm:core-js@1.2.1/modules/$.is-object"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $def = require("npm:core-js@1.2.1/modules/$.def");
  $def($def.S + $def.F, 'Object', {isObject: require("npm:core-js@1.2.1/modules/$.is-object")});
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/core.object.classof", ["npm:core-js@1.2.1/modules/$.def", "npm:core-js@1.2.1/modules/$.classof"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $def = require("npm:core-js@1.2.1/modules/$.def");
  $def($def.S + $def.F, 'Object', {classof: require("npm:core-js@1.2.1/modules/$.classof")});
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/$.object-define", ["npm:core-js@1.2.1/modules/$", "npm:core-js@1.2.1/modules/$.own-keys", "npm:core-js@1.2.1/modules/$.to-iobject"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@1.2.1/modules/$"),
      ownKeys = require("npm:core-js@1.2.1/modules/$.own-keys"),
      toIObject = require("npm:core-js@1.2.1/modules/$.to-iobject");
  module.exports = function define(target, mixin) {
    var keys = ownKeys(toIObject(mixin)),
        length = keys.length,
        i = 0,
        key;
    while (length > i)
      $.setDesc(target, key = keys[i++], $.getDesc(mixin, key));
    return target;
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/core.object.make", ["npm:core-js@1.2.1/modules/$.def", "npm:core-js@1.2.1/modules/$", "npm:core-js@1.2.1/modules/$.object-define"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $def = require("npm:core-js@1.2.1/modules/$.def"),
      create = require("npm:core-js@1.2.1/modules/$").create,
      define = require("npm:core-js@1.2.1/modules/$.object-define");
  $def($def.S + $def.F, 'Object', {make: function(proto, mixin) {
      return define(create(proto), mixin);
    }});
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/core.number.iterator", ["npm:core-js@1.2.1/modules/$.iter-define"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  require("npm:core-js@1.2.1/modules/$.iter-define")(Number, 'Number', function(iterated) {
    this._l = +iterated;
    this._i = 0;
  }, function() {
    var i = this._i++,
        done = !(i < this._l);
    return {
      done: done,
      value: done ? undefined : i
    };
  });
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/core.string.escape-html", ["npm:core-js@1.2.1/modules/$.def", "npm:core-js@1.2.1/modules/$.replacer"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var $def = require("npm:core-js@1.2.1/modules/$.def"),
      $re = require("npm:core-js@1.2.1/modules/$.replacer")(/[&<>"']/g, {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&apos;'
      });
  $def($def.P + $def.F, 'String', {escapeHTML: function escapeHTML() {
      return $re(this);
    }});
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/core.string.unescape-html", ["npm:core-js@1.2.1/modules/$.def", "npm:core-js@1.2.1/modules/$.replacer"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var $def = require("npm:core-js@1.2.1/modules/$.def"),
      $re = require("npm:core-js@1.2.1/modules/$.replacer")(/&(?:amp|lt|gt|quot|apos);/g, {
        '&amp;': '&',
        '&lt;': '<',
        '&gt;': '>',
        '&quot;': '"',
        '&apos;': "'"
      });
  $def($def.P + $def.F, 'String', {unescapeHTML: function unescapeHTML() {
      return $re(this);
    }});
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/core.log", ["npm:core-js@1.2.1/modules/$", "npm:core-js@1.2.1/modules/$.global", "npm:core-js@1.2.1/modules/$.def", "npm:core-js@1.2.1/modules/$.assign"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@1.2.1/modules/$"),
      global = require("npm:core-js@1.2.1/modules/$.global"),
      $def = require("npm:core-js@1.2.1/modules/$.def"),
      log = {},
      enabled = true;
  $.each.call(('assert,clear,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,' + 'info,isIndependentlyComposed,log,markTimeline,profile,profileEnd,table,' + 'time,timeEnd,timeline,timelineEnd,timeStamp,trace,warn').split(','), function(key) {
    log[key] = function() {
      var $console = global.console;
      if (enabled && $console && $console[key]) {
        return Function.apply.call($console[key], $console, arguments);
      }
    };
  });
  $def($def.G + $def.F, {log: require("npm:core-js@1.2.1/modules/$.assign")(log.log, log, {
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

(function() {
function define(){};  define.amd = {};
System.register("github:aurelia/validation@0.4.0/strategies/twbootstrap-view-strategy", ["github:aurelia/validation@0.4.0/validation-view-strategy"], false, function(__require, __exports, __module) {
  return (function(exports, _validationViewStrategy) {
    'use strict';
    exports.__esModule = true;
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
    var TWBootstrapViewStrategyBase = (function(_ValidationViewStrategy) {
      function TWBootstrapViewStrategyBase(appendMessageToInput, appendMessageToLabel, helpBlockClass) {
        _classCallCheck(this, TWBootstrapViewStrategyBase);
        _ValidationViewStrategy.call(this);
        this.appendMessageToInput = appendMessageToInput;
        this.appendMessageToLabel = appendMessageToLabel;
        this.helpBlockClass = helpBlockClass;
      }
      _inherits(TWBootstrapViewStrategyBase, _ValidationViewStrategy);
      TWBootstrapViewStrategyBase.prototype.searchFormGroup = function searchFormGroup(currentElement, currentDepth) {
        if (currentDepth === 5) {
          return null;
        }
        if (currentElement.classList && currentElement.classList.contains('form-group')) {
          return currentElement;
        }
        return this.searchFormGroup(currentElement.parentNode, 1 + currentDepth);
      };
      TWBootstrapViewStrategyBase.prototype.findLabels = function findLabels(formGroup, inputId) {
        var labels = [];
        this.findLabelsRecursively(formGroup, inputId, labels, 0);
        return labels;
      };
      TWBootstrapViewStrategyBase.prototype.findLabelsRecursively = function findLabelsRecursively(currentElement, inputId, currentLabels, currentDepth) {
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
      TWBootstrapViewStrategyBase.prototype.appendMessageToElement = function appendMessageToElement(element, validationProperty) {
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
        helpBlock.textContent = validationProperty ? validationProperty.message : '';
      };
      TWBootstrapViewStrategyBase.prototype.appendUIVisuals = function appendUIVisuals(validationProperty, currentElement) {
        var formGroup = this.searchFormGroup(currentElement, 0);
        if (formGroup === null) {
          return ;
        }
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
      };
      TWBootstrapViewStrategyBase.prototype.prepareElement = function prepareElement(validationProperty, element) {
        this.appendUIVisuals(null, element);
      };
      TWBootstrapViewStrategyBase.prototype.updateElement = function updateElement(validationProperty, element) {
        this.appendUIVisuals(validationProperty, element);
      };
      return TWBootstrapViewStrategyBase;
    })(_validationViewStrategy.ValidationViewStrategy);
    exports.TWBootstrapViewStrategyBase = TWBootstrapViewStrategyBase;
    var TWBootstrapViewStrategy = function TWBootstrapViewStrategy() {
      _classCallCheck(this, TWBootstrapViewStrategy);
    };
    exports.TWBootstrapViewStrategy = TWBootstrapViewStrategy;
    TWBootstrapViewStrategy.AppendToInput = new TWBootstrapViewStrategyBase(true, false, 'aurelia-validation-message');
    TWBootstrapViewStrategy.AppendToMessage = new TWBootstrapViewStrategyBase(false, true, 'aurelia-validation-message');
  }).call(__exports, __exports, __require('github:aurelia/validation@0.4.0/validation-view-strategy'));
});
})();
System.register("npm:core-js@0.9.18/modules/$", ["npm:core-js@0.9.18/modules/$.fw"], true, function(require, exports, module) {
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
  var $ = module.exports = require("npm:core-js@0.9.18/modules/$.fw")({
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

System.register("npm:core-js@0.9.18/modules/$.wks", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.shared", "npm:core-js@0.9.18/modules/$.uid"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var global = require("npm:core-js@0.9.18/modules/$").g,
      store = require("npm:core-js@0.9.18/modules/$.shared")('wks');
  module.exports = function(name) {
    return store[name] || (store[name] = global.Symbol && global.Symbol[name] || require("npm:core-js@0.9.18/modules/$.uid").safe('Symbol.' + name));
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/$.def", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.redef"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@0.9.18/modules/$"),
      global = $.g,
      core = $.core,
      isFunction = $.isFunction,
      $redef = require("npm:core-js@0.9.18/modules/$.redef");
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

System.register("npm:core-js@0.9.18/modules/$.ctx", ["npm:core-js@0.9.18/modules/$.assert"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var assertFunction = require("npm:core-js@0.9.18/modules/$.assert").fn;
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

System.register("npm:core-js@0.9.18/modules/es6.symbol", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.cof", "npm:core-js@0.9.18/modules/$.uid", "npm:core-js@0.9.18/modules/$.shared", "npm:core-js@0.9.18/modules/$.def", "npm:core-js@0.9.18/modules/$.redef", "npm:core-js@0.9.18/modules/$.keyof", "npm:core-js@0.9.18/modules/$.enum-keys", "npm:core-js@0.9.18/modules/$.assert", "npm:core-js@0.9.18/modules/$.get-names", "npm:core-js@0.9.18/modules/$.wks"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var $ = require("npm:core-js@0.9.18/modules/$"),
      setTag = require("npm:core-js@0.9.18/modules/$.cof").set,
      uid = require("npm:core-js@0.9.18/modules/$.uid"),
      shared = require("npm:core-js@0.9.18/modules/$.shared"),
      $def = require("npm:core-js@0.9.18/modules/$.def"),
      $redef = require("npm:core-js@0.9.18/modules/$.redef"),
      keyOf = require("npm:core-js@0.9.18/modules/$.keyof"),
      enumKeys = require("npm:core-js@0.9.18/modules/$.enum-keys"),
      assertObject = require("npm:core-js@0.9.18/modules/$.assert").obj,
      ObjectProto = Object.prototype,
      DESC = $.DESC,
      has = $.has,
      $create = $.create,
      getDesc = $.getDesc,
      setDesc = $.setDesc,
      desc = $.desc,
      $names = require("npm:core-js@0.9.18/modules/$.get-names"),
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
    var sym = require("npm:core-js@0.9.18/modules/$.wks")(it);
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

System.register("npm:core-js@0.9.18/modules/es6.object.assign", ["npm:core-js@0.9.18/modules/$.def", "npm:core-js@0.9.18/modules/$.assign"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $def = require("npm:core-js@0.9.18/modules/$.def");
  $def($def.S, 'Object', {assign: require("npm:core-js@0.9.18/modules/$.assign")});
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/es6.object.is", ["npm:core-js@0.9.18/modules/$.def", "npm:core-js@0.9.18/modules/$.same"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $def = require("npm:core-js@0.9.18/modules/$.def");
  $def($def.S, 'Object', {is: require("npm:core-js@0.9.18/modules/$.same")});
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/es6.object.set-prototype-of", ["npm:core-js@0.9.18/modules/$.def", "npm:core-js@0.9.18/modules/$.set-proto"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $def = require("npm:core-js@0.9.18/modules/$.def");
  $def($def.S, 'Object', {setPrototypeOf: require("npm:core-js@0.9.18/modules/$.set-proto").set});
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/es6.string.iterator", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.string-at", "npm:core-js@0.9.18/modules/$.uid", "npm:core-js@0.9.18/modules/$.iter", "npm:core-js@0.9.18/modules/$.iter-define"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var set = require("npm:core-js@0.9.18/modules/$").set,
      $at = require("npm:core-js@0.9.18/modules/$.string-at")(true),
      ITER = require("npm:core-js@0.9.18/modules/$.uid").safe('iter'),
      $iter = require("npm:core-js@0.9.18/modules/$.iter"),
      step = $iter.step;
  require("npm:core-js@0.9.18/modules/$.iter-define")(String, 'String', function(iterated) {
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

System.register("npm:core-js@0.9.18/modules/es6.string.repeat", ["npm:core-js@0.9.18/modules/$.def", "npm:core-js@0.9.18/modules/$.string-repeat"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $def = require("npm:core-js@0.9.18/modules/$.def");
  $def($def.P, 'String', {repeat: require("npm:core-js@0.9.18/modules/$.string-repeat")});
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/es6.array.from", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.ctx", "npm:core-js@0.9.18/modules/$.def", "npm:core-js@0.9.18/modules/$.iter", "npm:core-js@0.9.18/modules/$.iter-call", "npm:core-js@0.9.18/modules/$.iter-detect"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@0.9.18/modules/$"),
      ctx = require("npm:core-js@0.9.18/modules/$.ctx"),
      $def = require("npm:core-js@0.9.18/modules/$.def"),
      $iter = require("npm:core-js@0.9.18/modules/$.iter"),
      call = require("npm:core-js@0.9.18/modules/$.iter-call");
  $def($def.S + $def.F * !require("npm:core-js@0.9.18/modules/$.iter-detect")(function(iter) {
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

System.register("npm:core-js@0.9.18/modules/es6.array.iterator", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.unscope", "npm:core-js@0.9.18/modules/$.uid", "npm:core-js@0.9.18/modules/$.iter", "npm:core-js@0.9.18/modules/$.iter-define"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@0.9.18/modules/$"),
      setUnscope = require("npm:core-js@0.9.18/modules/$.unscope"),
      ITER = require("npm:core-js@0.9.18/modules/$.uid").safe('iter'),
      $iter = require("npm:core-js@0.9.18/modules/$.iter"),
      step = $iter.step,
      Iterators = $iter.Iterators;
  require("npm:core-js@0.9.18/modules/$.iter-define")(Array, 'Array', function(iterated, kind) {
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

System.register("npm:core-js@0.9.18/modules/es6.array.species", ["npm:core-js@0.9.18/modules/$.species"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  require("npm:core-js@0.9.18/modules/$.species")(Array);
  global.define = __define;
  return module.exports;
});

System.register("npm:process@0.11.2", ["npm:process@0.11.2/browser"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = require("npm:process@0.11.2/browser");
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/es6.map", ["npm:core-js@0.9.18/modules/$.collection-strong", "npm:core-js@0.9.18/modules/$.collection"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var strong = require("npm:core-js@0.9.18/modules/$.collection-strong");
  require("npm:core-js@0.9.18/modules/$.collection")('Map', function(get) {
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

System.register("npm:core-js@0.9.18/modules/es6.weak-map", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.collection-weak", "npm:core-js@0.9.18/modules/$.collection", "npm:core-js@0.9.18/modules/$.redef"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var $ = require("npm:core-js@0.9.18/modules/$"),
      weak = require("npm:core-js@0.9.18/modules/$.collection-weak"),
      leakStore = weak.leakStore,
      ID = weak.ID,
      WEAK = weak.WEAK,
      has = $.has,
      isObject = $.isObject,
      isExtensible = Object.isExtensible || isObject,
      tmp = {};
  var $WeakMap = require("npm:core-js@0.9.18/modules/$.collection")('WeakMap', function(get) {
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
      require("npm:core-js@0.9.18/modules/$.redef")(proto, key, function(a, b) {
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

System.register("npm:core-js@0.9.18/modules/es6.reflect", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.def", "npm:core-js@0.9.18/modules/$.set-proto", "npm:core-js@0.9.18/modules/$.iter", "npm:core-js@0.9.18/modules/$.wks", "npm:core-js@0.9.18/modules/$.uid", "npm:core-js@0.9.18/modules/$.assert", "npm:core-js@0.9.18/modules/$.own-keys"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@0.9.18/modules/$"),
      $def = require("npm:core-js@0.9.18/modules/$.def"),
      setProto = require("npm:core-js@0.9.18/modules/$.set-proto"),
      $iter = require("npm:core-js@0.9.18/modules/$.iter"),
      ITERATOR = require("npm:core-js@0.9.18/modules/$.wks")('iterator'),
      ITER = require("npm:core-js@0.9.18/modules/$.uid").safe('iter'),
      step = $iter.step,
      assert = require("npm:core-js@0.9.18/modules/$.assert"),
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
    ownKeys: require("npm:core-js@0.9.18/modules/$.own-keys"),
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

System.register("npm:core-js@0.9.18/modules/es7.string.lpad", ["npm:core-js@0.9.18/modules/$.def", "npm:core-js@0.9.18/modules/$.string-pad"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var $def = require("npm:core-js@0.9.18/modules/$.def"),
      $pad = require("npm:core-js@0.9.18/modules/$.string-pad");
  $def($def.P, 'String', {lpad: function lpad(n) {
      return $pad(this, n, arguments[1], true);
    }});
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/es7.map.to-json", ["npm:core-js@0.9.18/modules/$.collection-to-json"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  require("npm:core-js@0.9.18/modules/$.collection-to-json")('Map');
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/web.timers", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.def", "npm:core-js@0.9.18/modules/$.invoke", "npm:core-js@0.9.18/modules/$.partial"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@0.9.18/modules/$"),
      $def = require("npm:core-js@0.9.18/modules/$.def"),
      invoke = require("npm:core-js@0.9.18/modules/$.invoke"),
      partial = require("npm:core-js@0.9.18/modules/$.partial"),
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

(function() {
function define(){};  define.amd = {};
System.register("github:aurelia/pal@0.2.0", ["github:aurelia/pal@0.2.0/aurelia-pal"], false, function(__require, __exports, __module) {
  return (function(main) {
    return main;
  }).call(this, __require('github:aurelia/pal@0.2.0/aurelia-pal'));
});
})();
(function() {
function define(){};  define.amd = {};
System.register("github:aurelia/task-queue@0.8.0", ["github:aurelia/task-queue@0.8.0/aurelia-task-queue"], false, function(__require, __exports, __module) {
  return (function(main) {
    return main;
  }).call(this, __require('github:aurelia/task-queue@0.8.0/aurelia-task-queue'));
});
})();
(function() {
function define(){};  define.amd = {};
System.register("github:aurelia/metadata@0.9.0", ["github:aurelia/metadata@0.9.0/aurelia-metadata"], false, function(__require, __exports, __module) {
  return (function(main) {
    return main;
  }).call(this, __require('github:aurelia/metadata@0.9.0/aurelia-metadata'));
});
})();
(function() {
function define(){};  define.amd = {};
System.register("github:aurelia/validation@0.4.0/validation-rules-collection", ["github:aurelia/validation@0.4.0/utilities", "github:aurelia/validation@0.4.0/validation-locale"], false, function(__require, __exports, __module) {
  return (function(exports, _utilities, _validationLocale) {
    'use strict';
    exports.__esModule = true;
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
      }
    }
    var ValidationRulesCollection = (function() {
      function ValidationRulesCollection(config) {
        _classCallCheck(this, ValidationRulesCollection);
        this.isRequired = config ? config.getValue('allPropertiesAreMandatory') : false;
        this.validationRules = [];
        this.validationCollections = [];
        this.isRequiredMessage = null;
      }
      ValidationRulesCollection.prototype.validate = function validate(newValue, locale) {
        var executeRules = true;
        var thisMessage = undefined;
        var checks = undefined;
        if (locale === undefined) {
          locale = _validationLocale.ValidationLocale.Repository['default'];
        }
        newValue = _utilities.Utilities.getValue(newValue);
        if (this.isRequiredMessage) {
          thisMessage = typeof this.isRequiredMessage === 'function' ? this.isRequiredMessage(newValue) : this.isRequiredMessage;
        } else {
          thisMessage = locale.translate('isRequired');
        }
        if (_utilities.Utilities.isEmptyValue(newValue)) {
          if (this.isRequired) {
            return Promise.resolve({
              isValid: false,
              message: thisMessage,
              failingRule: 'isRequired',
              latestValue: newValue
            });
          }
          executeRules = false;
        }
        checks = Promise.resolve({
          isValid: true,
          message: '',
          failingRule: null,
          latestValue: newValue
        });
        if (executeRules) {
          this.validationRules.forEach(function(rule) {
            checks = checks.then(function(previousRuleResult) {
              if (previousRuleResult.isValid === false) {
                return previousRuleResult;
              }
              return rule.validate(newValue, locale).then(function(thisRuleResult) {
                if (thisRuleResult === false) {
                  return {
                    isValid: false,
                    message: rule.explain(),
                    failingRule: rule.ruleName,
                    latestValue: newValue
                  };
                }
                if (!previousRuleResult.isValid) {
                  throw Error('ValidationRulesCollection.validate caught an unexpected result while validating it\'s chain of rules.');
                }
                return previousRuleResult;
              });
            });
          });
        }
        this.validationCollections.forEach(function(validationCollection) {
          checks = checks.then(function(previousValidationResult) {
            if (previousValidationResult.isValid) {
              return validationCollection.validate(newValue, locale);
            }
            return previousValidationResult;
          });
        });
        return checks;
      };
      ValidationRulesCollection.prototype.addValidationRule = function addValidationRule(validationRule) {
        if (validationRule.validate === undefined) {
          throw new Error('That\'s not a valid validationRule');
        }
        this.validationRules.push(validationRule);
      };
      ValidationRulesCollection.prototype.addValidationRuleCollection = function addValidationRuleCollection(validationRulesCollection) {
        this.validationCollections.push(validationRulesCollection);
      };
      ValidationRulesCollection.prototype.isNotEmpty = function isNotEmpty() {
        this.isRequired = true;
      };
      ValidationRulesCollection.prototype.canBeEmpty = function canBeEmpty() {
        this.isRequired = false;
      };
      ValidationRulesCollection.prototype.withMessage = function withMessage(message) {
        if (this.validationRules.length === 0) {
          this.isRequiredMessage = message;
        } else {
          this.validationRules[this.validationRules.length - 1].withMessage(message);
        }
      };
      return ValidationRulesCollection;
    })();
    exports.ValidationRulesCollection = ValidationRulesCollection;
    var SwitchCaseValidationRulesCollection = (function() {
      function SwitchCaseValidationRulesCollection(conditionExpression, config) {
        _classCallCheck(this, SwitchCaseValidationRulesCollection);
        this.conditionExpression = conditionExpression;
        this.config = config;
        this.innerCollections = [];
        this.defaultCollection = new ValidationRulesCollection(this.config);
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
            collection: new ValidationRulesCollection(this.config)
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
        }
        return this.defaultCollection.validate(newValue, locale);
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
        if (collection !== null) {
          collection.isNotEmpty();
        } else {
          this.defaultCollection.isNotEmpty();
        }
      };
      SwitchCaseValidationRulesCollection.prototype.canBeEmpty = function canBeEmpty() {
        var collection = this.getCurrentCollection(this.caseLabel);
        if (collection !== null) {
          collection.canBeEmpty();
        } else {
          this.defaultCollection.canBeEmpty();
        }
      };
      SwitchCaseValidationRulesCollection.prototype.withMessage = function withMessage(message) {
        var collection = this.getCurrentCollection(this.caseLabel);
        if (collection !== null) {
          collection.withMessage(message);
        } else {
          this.defaultCollection.withMessage(message);
        }
      };
      return SwitchCaseValidationRulesCollection;
    })();
    exports.SwitchCaseValidationRulesCollection = SwitchCaseValidationRulesCollection;
  }).call(__exports, __exports, __require('github:aurelia/validation@0.4.0/utilities'), __require('github:aurelia/validation@0.4.0/validation-locale'));
});
})();
(function() {
function define(){};  define.amd = {};
System.register("github:aurelia/validation@0.4.0/validation-property", ["github:aurelia/validation@0.4.0/validation-rules-collection", "github:aurelia/validation@0.4.0/path-observer", "github:aurelia/validation@0.4.0/debouncer"], false, function(__require, __exports, __module) {
  return (function(exports, _validationRulesCollection, _pathObserver, _debouncer) {
    'use strict';
    exports.__esModule = true;
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
      }
    }
    var ValidationProperty = (function() {
      function ValidationProperty(observerLocator, propertyName, validationGroup, propertyResult, config) {
        var _this = this;
        _classCallCheck(this, ValidationProperty);
        this.propertyResult = propertyResult;
        this.propertyName = propertyName;
        this.validationGroup = validationGroup;
        this.collectionOfValidationRules = new _validationRulesCollection.ValidationRulesCollection(config);
        this.config = config;
        this.latestValue = undefined;
        this.observer = new _pathObserver.PathObserver(observerLocator, validationGroup.subject, propertyName).getObserver();
        this.debouncer = new _debouncer.Debouncer(config.getDebounceTimeout());
        this.subscription = this.observer.subscribe(function() {
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
          var dependencyObserver = new _pathObserver.PathObserver(observerLocator, validationGroup.subject, dependencies[i]).getObserver();
          dependencyObserver.subscribe(function() {
            _this.debouncer.debounce(function() {
              _this.validateCurrentValue(true);
            });
          });
          this.dependencyObservers.push(dependencyObserver);
        }
      }
      ValidationProperty.prototype.addValidationRule = function addValidationRule(validationRule) {
        if (validationRule.validate === undefined) {
          throw new Error('That\'s not a valid validationRule');
        }
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
      ValidationProperty.prototype.destroy = function destroy() {
        if (this.subscription) {
          this.subscription();
        }
      };
      ValidationProperty.prototype.validate = function validate(newValue, shouldBeDirty, forceExecution) {
        var _this2 = this;
        if (!this.propertyResult.isDirty && shouldBeDirty || this.latestValue !== newValue || forceExecution) {
          this.latestValue = newValue;
          return this.config.locale().then(function(locale) {
            return _this2.collectionOfValidationRules.validate(newValue, locale).then(function(validationResponse) {
              if (_this2.latestValue === validationResponse.latestValue) {
                _this2.propertyResult.setValidity(validationResponse, shouldBeDirty);
              }
              return validationResponse.isValid;
            })['catch'](function(err) {
              throw Error('Unexpected behavior: a validation-rules-collection should always fulfil');
            });
          }, function() {
            throw Error('An exception occurred while trying to load the locale');
          });
        }
      };
      return ValidationProperty;
    })();
    exports.ValidationProperty = ValidationProperty;
  }).call(__exports, __exports, __require('github:aurelia/validation@0.4.0/validation-rules-collection'), __require('github:aurelia/validation@0.4.0/path-observer'), __require('github:aurelia/validation@0.4.0/debouncer'));
});
})();
(function() {
function define(){};  define.amd = {};
System.register("github:aurelia/dependency-injection@0.11.0", ["github:aurelia/dependency-injection@0.11.0/aurelia-dependency-injection"], false, function(__require, __exports, __module) {
  return (function(main) {
    return main;
  }).call(this, __require('github:aurelia/dependency-injection@0.11.0/aurelia-dependency-injection'));
});
})();
(function() {
function define(){};  define.amd = {};
System.register("github:aurelia/logging@0.8.0", ["github:aurelia/logging@0.8.0/aurelia-logging"], false, function(__require, __exports, __module) {
  return (function(main) {
    return main;
  }).call(this, __require('github:aurelia/logging@0.8.0/aurelia-logging'));
});
})();
(function() {
function define(){};  define.amd = {};
System.register("github:aurelia/path@0.10.0", ["github:aurelia/path@0.10.0/aurelia-path"], false, function(__require, __exports, __module) {
  return (function(main) {
    return main;
  }).call(this, __require('github:aurelia/path@0.10.0/aurelia-path'));
});
})();
System.register("npm:core-js@1.2.1/modules/$.support-desc", ["npm:core-js@1.2.1/modules/$.fails"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = !require("npm:core-js@1.2.1/modules/$.fails")(function() {
    return Object.defineProperty({}, 'a', {get: function() {
        return 7;
      }}).a != 7;
  });
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/$.html", ["npm:core-js@1.2.1/modules/$.global"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = require("npm:core-js@1.2.1/modules/$.global").document && document.documentElement;
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/$.dom-create", ["npm:core-js@1.2.1/modules/$.is-object", "npm:core-js@1.2.1/modules/$.global"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var isObject = require("npm:core-js@1.2.1/modules/$.is-object"),
      document = require("npm:core-js@1.2.1/modules/$.global").document,
      is = isObject(document) && isObject(document.createElement);
  module.exports = function(it) {
    return is ? document.createElement(it) : {};
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/$.redef", ["npm:core-js@1.2.1/modules/$.global", "npm:core-js@1.2.1/modules/$.hide", "npm:core-js@1.2.1/modules/$.uid", "npm:core-js@1.2.1/modules/$.core"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var global = require("npm:core-js@1.2.1/modules/$.global"),
      hide = require("npm:core-js@1.2.1/modules/$.hide"),
      SRC = require("npm:core-js@1.2.1/modules/$.uid")('src'),
      TO_STRING = 'toString',
      $toString = Function[TO_STRING],
      TPL = ('' + $toString).split(TO_STRING);
  require("npm:core-js@1.2.1/modules/$.core").inspectSource = function(it) {
    return $toString.call(it);
  };
  (module.exports = function(O, key, val, safe) {
    if (typeof val == 'function') {
      hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
      if (!('name' in val))
        val.name = key;
    }
    if (O === global) {
      O[key] = val;
    } else {
      if (!safe)
        delete O[key];
      hide(O, key, val);
    }
  })(Function.prototype, TO_STRING, function toString() {
    return typeof this == 'function' && this[SRC] || $toString.call(this);
  });
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/$.ctx", ["npm:core-js@1.2.1/modules/$.a-function"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var aFunction = require("npm:core-js@1.2.1/modules/$.a-function");
  module.exports = function(fn, that, length) {
    aFunction(fn);
    if (that === undefined)
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

System.register("npm:core-js@1.2.1/modules/$.to-object", ["npm:core-js@1.2.1/modules/$.defined"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var defined = require("npm:core-js@1.2.1/modules/$.defined");
  module.exports = function(it) {
    return Object(defined(it));
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/$.to-length", ["npm:core-js@1.2.1/modules/$.to-integer"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var toInteger = require("npm:core-js@1.2.1/modules/$.to-integer"),
      min = Math.min;
  module.exports = function(it) {
    return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0;
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/$.wks", ["npm:core-js@1.2.1/modules/$.shared", "npm:core-js@1.2.1/modules/$.global", "npm:core-js@1.2.1/modules/$.uid"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var store = require("npm:core-js@1.2.1/modules/$.shared")('wks'),
      Symbol = require("npm:core-js@1.2.1/modules/$.global").Symbol;
  module.exports = function(name) {
    return store[name] || (store[name] = Symbol && Symbol[name] || (Symbol || require("npm:core-js@1.2.1/modules/$.uid"))('Symbol.' + name));
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/es6.symbol", ["npm:core-js@1.2.1/modules/$", "npm:core-js@1.2.1/modules/$.global", "npm:core-js@1.2.1/modules/$.has", "npm:core-js@1.2.1/modules/$.support-desc", "npm:core-js@1.2.1/modules/$.def", "npm:core-js@1.2.1/modules/$.redef", "npm:core-js@1.2.1/modules/$.fails", "npm:core-js@1.2.1/modules/$.shared", "npm:core-js@1.2.1/modules/$.tag", "npm:core-js@1.2.1/modules/$.uid", "npm:core-js@1.2.1/modules/$.wks", "npm:core-js@1.2.1/modules/$.keyof", "npm:core-js@1.2.1/modules/$.get-names", "npm:core-js@1.2.1/modules/$.enum-keys", "npm:core-js@1.2.1/modules/$.is-array", "npm:core-js@1.2.1/modules/$.is-object", "npm:core-js@1.2.1/modules/$.an-object", "npm:core-js@1.2.1/modules/$.to-iobject", "npm:core-js@1.2.1/modules/$.property-desc", "npm:core-js@1.2.1/modules/$.library"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var $ = require("npm:core-js@1.2.1/modules/$"),
      global = require("npm:core-js@1.2.1/modules/$.global"),
      has = require("npm:core-js@1.2.1/modules/$.has"),
      SUPPORT_DESC = require("npm:core-js@1.2.1/modules/$.support-desc"),
      $def = require("npm:core-js@1.2.1/modules/$.def"),
      $redef = require("npm:core-js@1.2.1/modules/$.redef"),
      $fails = require("npm:core-js@1.2.1/modules/$.fails"),
      shared = require("npm:core-js@1.2.1/modules/$.shared"),
      setTag = require("npm:core-js@1.2.1/modules/$.tag"),
      uid = require("npm:core-js@1.2.1/modules/$.uid"),
      wks = require("npm:core-js@1.2.1/modules/$.wks"),
      keyOf = require("npm:core-js@1.2.1/modules/$.keyof"),
      $names = require("npm:core-js@1.2.1/modules/$.get-names"),
      enumKeys = require("npm:core-js@1.2.1/modules/$.enum-keys"),
      isArray = require("npm:core-js@1.2.1/modules/$.is-array"),
      isObject = require("npm:core-js@1.2.1/modules/$.is-object"),
      anObject = require("npm:core-js@1.2.1/modules/$.an-object"),
      toIObject = require("npm:core-js@1.2.1/modules/$.to-iobject"),
      createDesc = require("npm:core-js@1.2.1/modules/$.property-desc"),
      getDesc = $.getDesc,
      setDesc = $.setDesc,
      _create = $.create,
      getNames = $names.get,
      $Symbol = global.Symbol,
      $JSON = global.JSON,
      _stringify = $JSON && $JSON.stringify,
      setter = false,
      HIDDEN = wks('_hidden'),
      isEnum = $.isEnum,
      SymbolRegistry = shared('symbol-registry'),
      AllSymbols = shared('symbols'),
      useNative = typeof $Symbol == 'function',
      ObjectProto = Object.prototype;
  var setSymbolDesc = SUPPORT_DESC && $fails(function() {
    return _create(setDesc({}, 'a', {get: function() {
        return setDesc(this, 'a', {value: 7}).a;
      }})).a != 7;
  }) ? function(it, key, D) {
    var protoDesc = getDesc(ObjectProto, key);
    if (protoDesc)
      delete ObjectProto[key];
    setDesc(it, key, D);
    if (protoDesc && it !== ObjectProto)
      setDesc(ObjectProto, key, protoDesc);
  } : setDesc;
  var wrap = function(tag) {
    var sym = AllSymbols[tag] = _create($Symbol.prototype);
    sym._k = tag;
    SUPPORT_DESC && setter && setSymbolDesc(ObjectProto, tag, {
      configurable: true,
      set: function(value) {
        if (has(this, HIDDEN) && has(this[HIDDEN], tag))
          this[HIDDEN][tag] = false;
        setSymbolDesc(this, tag, createDesc(1, value));
      }
    });
    return sym;
  };
  var isSymbol = function(it) {
    return typeof it == 'symbol';
  };
  var $defineProperty = function defineProperty(it, key, D) {
    if (D && has(AllSymbols, key)) {
      if (!D.enumerable) {
        if (!has(it, HIDDEN))
          setDesc(it, HIDDEN, createDesc(1, {}));
        it[HIDDEN][key] = true;
      } else {
        if (has(it, HIDDEN) && it[HIDDEN][key])
          it[HIDDEN][key] = false;
        D = _create(D, {enumerable: createDesc(0, false)});
      }
      return setSymbolDesc(it, key, D);
    }
    return setDesc(it, key, D);
  };
  var $defineProperties = function defineProperties(it, P) {
    anObject(it);
    var keys = enumKeys(P = toIObject(P)),
        i = 0,
        l = keys.length,
        key;
    while (l > i)
      $defineProperty(it, key = keys[i++], P[key]);
    return it;
  };
  var $create = function create(it, P) {
    return P === undefined ? _create(it) : $defineProperties(_create(it), P);
  };
  var $propertyIsEnumerable = function propertyIsEnumerable(key) {
    var E = isEnum.call(this, key);
    return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
  };
  var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
    var D = getDesc(it = toIObject(it), key);
    if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))
      D.enumerable = true;
    return D;
  };
  var $getOwnPropertyNames = function getOwnPropertyNames(it) {
    var names = getNames(toIObject(it)),
        result = [],
        i = 0,
        key;
    while (names.length > i)
      if (!has(AllSymbols, key = names[i++]) && key != HIDDEN)
        result.push(key);
    return result;
  };
  var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
    var names = getNames(toIObject(it)),
        result = [],
        i = 0,
        key;
    while (names.length > i)
      if (has(AllSymbols, key = names[i++]))
        result.push(AllSymbols[key]);
    return result;
  };
  var $stringify = function stringify(it) {
    var args = [it],
        i = 1,
        replacer,
        $replacer;
    while (arguments.length > i)
      args.push(arguments[i++]);
    replacer = args[1];
    if (typeof replacer == 'function')
      $replacer = replacer;
    if ($replacer || !isArray(replacer))
      replacer = function(key, value) {
        if ($replacer)
          value = $replacer.call(this, key, value);
        if (!isSymbol(value))
          return value;
      };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  };
  var buggyJSON = $fails(function() {
    var S = $Symbol();
    return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
  });
  if (!useNative) {
    $Symbol = function Symbol() {
      if (isSymbol(this))
        throw TypeError('Symbol is not a constructor');
      return wrap(uid(arguments[0]));
    };
    $redef($Symbol.prototype, 'toString', function toString() {
      return this._k;
    });
    isSymbol = function(it) {
      return it instanceof $Symbol;
    };
    $.create = $create;
    $.isEnum = $propertyIsEnumerable;
    $.getDesc = $getOwnPropertyDescriptor;
    $.setDesc = $defineProperty;
    $.setDescs = $defineProperties;
    $.getNames = $names.get = $getOwnPropertyNames;
    $.getSymbols = $getOwnPropertySymbols;
    if (SUPPORT_DESC && !require("npm:core-js@1.2.1/modules/$.library")) {
      $redef(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
    }
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
    var sym = wks(it);
    symbolStatics[it] = useNative ? sym : wrap(sym);
  });
  setter = true;
  $def($def.G + $def.W, {Symbol: $Symbol});
  $def($def.S, 'Symbol', symbolStatics);
  $def($def.S + $def.F * !useNative, 'Object', {
    create: $create,
    defineProperty: $defineProperty,
    defineProperties: $defineProperties,
    getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
    getOwnPropertyNames: $getOwnPropertyNames,
    getOwnPropertySymbols: $getOwnPropertySymbols
  });
  $JSON && $def($def.S + $def.F * (!useNative || buggyJSON), 'JSON', {stringify: $stringify});
  setTag($Symbol, 'Symbol');
  setTag(Math, 'Math', true);
  setTag(global.JSON, 'JSON', true);
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/es6.object.assign", ["npm:core-js@1.2.1/modules/$.def", "npm:core-js@1.2.1/modules/$.assign"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $def = require("npm:core-js@1.2.1/modules/$.def");
  $def($def.S + $def.F, 'Object', {assign: require("npm:core-js@1.2.1/modules/$.assign")});
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/es6.object.is", ["npm:core-js@1.2.1/modules/$.def", "npm:core-js@1.2.1/modules/$.same"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $def = require("npm:core-js@1.2.1/modules/$.def");
  $def($def.S, 'Object', {is: require("npm:core-js@1.2.1/modules/$.same")});
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/es6.object.set-prototype-of", ["npm:core-js@1.2.1/modules/$.def", "npm:core-js@1.2.1/modules/$.set-proto"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $def = require("npm:core-js@1.2.1/modules/$.def");
  $def($def.S, 'Object', {setPrototypeOf: require("npm:core-js@1.2.1/modules/$.set-proto").set});
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/es6.object.to-string", ["npm:core-js@1.2.1/modules/$.classof", "npm:core-js@1.2.1/modules/$.wks", "npm:core-js@1.2.1/modules/$.redef"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var classof = require("npm:core-js@1.2.1/modules/$.classof"),
      test = {};
  test[require("npm:core-js@1.2.1/modules/$.wks")('toStringTag')] = 'z';
  if (test + '' != '[object z]') {
    require("npm:core-js@1.2.1/modules/$.redef")(Object.prototype, 'toString', function toString() {
      return '[object ' + classof(this) + ']';
    }, true);
  }
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/es6.object.freeze", ["npm:core-js@1.2.1/modules/$.is-object", "npm:core-js@1.2.1/modules/$.object-sap"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var isObject = require("npm:core-js@1.2.1/modules/$.is-object");
  require("npm:core-js@1.2.1/modules/$.object-sap")('freeze', function($freeze) {
    return function freeze(it) {
      return $freeze && isObject(it) ? $freeze(it) : it;
    };
  });
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/es6.number.is-integer", ["npm:core-js@1.2.1/modules/$.def", "npm:core-js@1.2.1/modules/$.is-integer"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $def = require("npm:core-js@1.2.1/modules/$.def");
  $def($def.S, 'Number', {isInteger: require("npm:core-js@1.2.1/modules/$.is-integer")});
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/es6.math.acosh", ["npm:core-js@1.2.1/modules/$.def", "npm:core-js@1.2.1/modules/$.log1p"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $def = require("npm:core-js@1.2.1/modules/$.def"),
      log1p = require("npm:core-js@1.2.1/modules/$.log1p"),
      sqrt = Math.sqrt,
      $acosh = Math.acosh;
  $def($def.S + $def.F * !($acosh && Math.floor($acosh(Number.MAX_VALUE)) == 710), 'Math', {acosh: function acosh(x) {
      return (x = +x) < 1 ? NaN : x > 94906265.62425156 ? Math.log(x) + Math.LN2 : log1p(x - 1 + sqrt(x - 1) * sqrt(x + 1));
    }});
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/es6.math.cbrt", ["npm:core-js@1.2.1/modules/$.def", "npm:core-js@1.2.1/modules/$.sign"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $def = require("npm:core-js@1.2.1/modules/$.def"),
      sign = require("npm:core-js@1.2.1/modules/$.sign");
  $def($def.S, 'Math', {cbrt: function cbrt(x) {
      return sign(x = +x) * Math.pow(Math.abs(x), 1 / 3);
    }});
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/es6.math.expm1", ["npm:core-js@1.2.1/modules/$.def", "npm:core-js@1.2.1/modules/$.expm1"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $def = require("npm:core-js@1.2.1/modules/$.def");
  $def($def.S, 'Math', {expm1: require("npm:core-js@1.2.1/modules/$.expm1")});
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/es6.string.trim", ["npm:core-js@1.2.1/modules/$.string-trim"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  require("npm:core-js@1.2.1/modules/$.string-trim")('trim', function($trim) {
    return function trim() {
      return $trim(this, 3);
    };
  });
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/$.iter-define", ["npm:core-js@1.2.1/modules/$.library", "npm:core-js@1.2.1/modules/$.def", "npm:core-js@1.2.1/modules/$.redef", "npm:core-js@1.2.1/modules/$.hide", "npm:core-js@1.2.1/modules/$.has", "npm:core-js@1.2.1/modules/$.wks", "npm:core-js@1.2.1/modules/$.iterators", "npm:core-js@1.2.1/modules/$.iter-create", "npm:core-js@1.2.1/modules/$", "npm:core-js@1.2.1/modules/$.tag"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var LIBRARY = require("npm:core-js@1.2.1/modules/$.library"),
      $def = require("npm:core-js@1.2.1/modules/$.def"),
      $redef = require("npm:core-js@1.2.1/modules/$.redef"),
      hide = require("npm:core-js@1.2.1/modules/$.hide"),
      has = require("npm:core-js@1.2.1/modules/$.has"),
      SYMBOL_ITERATOR = require("npm:core-js@1.2.1/modules/$.wks")('iterator'),
      Iterators = require("npm:core-js@1.2.1/modules/$.iterators"),
      BUGGY = !([].keys && 'next' in [].keys()),
      FF_ITERATOR = '@@iterator',
      KEYS = 'keys',
      VALUES = 'values';
  var returnThis = function() {
    return this;
  };
  module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCE) {
    require("npm:core-js@1.2.1/modules/$.iter-create")(Constructor, NAME, next);
    var createMethod = function(kind) {
      switch (kind) {
        case KEYS:
          return function keys() {
            return new Constructor(this, kind);
          };
        case VALUES:
          return function values() {
            return new Constructor(this, kind);
          };
      }
      return function entries() {
        return new Constructor(this, kind);
      };
    };
    var TAG = NAME + ' Iterator',
        proto = Base.prototype,
        _native = proto[SYMBOL_ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT],
        _default = _native || createMethod(DEFAULT),
        methods,
        key;
    if (_native) {
      var IteratorPrototype = require("npm:core-js@1.2.1/modules/$").getProto(_default.call(new Base));
      require("npm:core-js@1.2.1/modules/$.tag")(IteratorPrototype, TAG, true);
      if (!LIBRARY && has(proto, FF_ITERATOR))
        hide(IteratorPrototype, SYMBOL_ITERATOR, returnThis);
    }
    if (!LIBRARY || FORCE)
      hide(proto, SYMBOL_ITERATOR, _default);
    Iterators[NAME] = _default;
    Iterators[TAG] = returnThis;
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
        $def($def.P + $def.F * BUGGY, NAME, methods);
    }
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/$.string-context", ["npm:core-js@1.2.1/modules/$.is-regexp", "npm:core-js@1.2.1/modules/$.defined"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var isRegExp = require("npm:core-js@1.2.1/modules/$.is-regexp"),
      defined = require("npm:core-js@1.2.1/modules/$.defined");
  module.exports = function(that, searchString, NAME) {
    if (isRegExp(searchString))
      throw TypeError('String#' + NAME + " doesn't accept regex!");
    return String(defined(that));
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/es6.string.repeat", ["npm:core-js@1.2.1/modules/$.def", "npm:core-js@1.2.1/modules/$.string-repeat"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $def = require("npm:core-js@1.2.1/modules/$.def");
  $def($def.P, 'String', {repeat: require("npm:core-js@1.2.1/modules/$.string-repeat")});
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/es6.array.from", ["npm:core-js@1.2.1/modules/$.ctx", "npm:core-js@1.2.1/modules/$.def", "npm:core-js@1.2.1/modules/$.to-object", "npm:core-js@1.2.1/modules/$.iter-call", "npm:core-js@1.2.1/modules/$.is-array-iter", "npm:core-js@1.2.1/modules/$.to-length", "npm:core-js@1.2.1/modules/core.get-iterator-method", "npm:core-js@1.2.1/modules/$.iter-detect"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var ctx = require("npm:core-js@1.2.1/modules/$.ctx"),
      $def = require("npm:core-js@1.2.1/modules/$.def"),
      toObject = require("npm:core-js@1.2.1/modules/$.to-object"),
      call = require("npm:core-js@1.2.1/modules/$.iter-call"),
      isArrayIter = require("npm:core-js@1.2.1/modules/$.is-array-iter"),
      toLength = require("npm:core-js@1.2.1/modules/$.to-length"),
      getIterFn = require("npm:core-js@1.2.1/modules/core.get-iterator-method");
  $def($def.S + $def.F * !require("npm:core-js@1.2.1/modules/$.iter-detect")(function(iter) {
    Array.from(iter);
  }), 'Array', {from: function from(arrayLike) {
      var O = toObject(arrayLike),
          C = typeof this == 'function' ? this : Array,
          mapfn = arguments[1],
          mapping = mapfn !== undefined,
          index = 0,
          iterFn = getIterFn(O),
          length,
          result,
          step,
          iterator;
      if (mapping)
        mapfn = ctx(mapfn, arguments[2], 2);
      if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
        for (iterator = iterFn.call(O), result = new C; !(step = iterator.next()).done; index++) {
          result[index] = mapping ? call(iterator, mapfn, [step.value, index], true) : step.value;
        }
      } else {
        length = toLength(O.length);
        for (result = new C(length); length > index; index++) {
          result[index] = mapping ? mapfn(O[index], index) : O[index];
        }
      }
      result.length = index;
      return result;
    }});
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/es6.array.iterator", ["npm:core-js@1.2.1/modules/$.unscope", "npm:core-js@1.2.1/modules/$.iter-step", "npm:core-js@1.2.1/modules/$.iterators", "npm:core-js@1.2.1/modules/$.to-iobject", "npm:core-js@1.2.1/modules/$.iter-define"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var setUnscope = require("npm:core-js@1.2.1/modules/$.unscope"),
      step = require("npm:core-js@1.2.1/modules/$.iter-step"),
      Iterators = require("npm:core-js@1.2.1/modules/$.iterators"),
      toIObject = require("npm:core-js@1.2.1/modules/$.to-iobject");
  require("npm:core-js@1.2.1/modules/$.iter-define")(Array, 'Array', function(iterated, kind) {
    this._t = toIObject(iterated);
    this._i = 0;
    this._k = kind;
  }, function() {
    var O = this._t,
        kind = this._k,
        index = this._i++;
    if (!O || index >= O.length) {
      this._t = undefined;
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

System.register("npm:core-js@1.2.1/modules/es6.array.species", ["npm:core-js@1.2.1/modules/$.species"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  require("npm:core-js@1.2.1/modules/$.species")(Array);
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/es6.array.copy-within", ["npm:core-js@1.2.1/modules/$.def", "npm:core-js@1.2.1/modules/$.array-copy-within", "npm:core-js@1.2.1/modules/$.unscope"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var $def = require("npm:core-js@1.2.1/modules/$.def");
  $def($def.P, 'Array', {copyWithin: require("npm:core-js@1.2.1/modules/$.array-copy-within")});
  require("npm:core-js@1.2.1/modules/$.unscope")('copyWithin');
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/es6.array.fill", ["npm:core-js@1.2.1/modules/$.def", "npm:core-js@1.2.1/modules/$.array-fill", "npm:core-js@1.2.1/modules/$.unscope"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $def = require("npm:core-js@1.2.1/modules/$.def");
  $def($def.P, 'Array', {fill: require("npm:core-js@1.2.1/modules/$.array-fill")});
  require("npm:core-js@1.2.1/modules/$.unscope")('fill');
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/es6.regexp.constructor", ["npm:core-js@1.2.1/modules/$", "npm:core-js@1.2.1/modules/$.global", "npm:core-js@1.2.1/modules/$.is-regexp", "npm:core-js@1.2.1/modules/$.flags", "npm:core-js@1.2.1/modules/$.support-desc", "npm:core-js@1.2.1/modules/$.fails", "npm:core-js@1.2.1/modules/$.wks", "npm:core-js@1.2.1/modules/$.redef", "npm:core-js@1.2.1/modules/$.species"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@1.2.1/modules/$"),
      global = require("npm:core-js@1.2.1/modules/$.global"),
      isRegExp = require("npm:core-js@1.2.1/modules/$.is-regexp"),
      $flags = require("npm:core-js@1.2.1/modules/$.flags"),
      $RegExp = global.RegExp,
      Base = $RegExp,
      proto = $RegExp.prototype,
      re1 = /a/g,
      re2 = /a/g,
      CORRECT_NEW = new $RegExp(re1) !== re1;
  if (require("npm:core-js@1.2.1/modules/$.support-desc") && (!CORRECT_NEW || require("npm:core-js@1.2.1/modules/$.fails")(function() {
    re2[require("npm:core-js@1.2.1/modules/$.wks")('match')] = false;
    return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
  }))) {
    $RegExp = function RegExp(p, f) {
      var piRE = isRegExp(p),
          fiU = f === undefined;
      return !(this instanceof $RegExp) && piRE && p.constructor === $RegExp && fiU ? p : CORRECT_NEW ? new Base(piRE && !fiU ? p.source : p, f) : Base((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? $flags.call(p) : f);
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
    require("npm:core-js@1.2.1/modules/$.redef")(global, 'RegExp', $RegExp);
  }
  require("npm:core-js@1.2.1/modules/$.species")($RegExp);
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/es6.regexp.match", ["npm:core-js@1.2.1/modules/$.fix-re-wks"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  require("npm:core-js@1.2.1/modules/$.fix-re-wks")('match', 1, function(defined, MATCH) {
    return function match(regexp) {
      'use strict';
      var O = defined(this),
          fn = regexp == undefined ? undefined : regexp[MATCH];
      return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
    };
  });
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/$.microtask", ["npm:core-js@1.2.1/modules/$.global", "npm:core-js@1.2.1/modules/$.task", "npm:core-js@1.2.1/modules/$.cof", "github:jspm/nodelibs-process@0.1.2"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    var global = require("npm:core-js@1.2.1/modules/$.global"),
        macrotask = require("npm:core-js@1.2.1/modules/$.task").set,
        Observer = global.MutationObserver || global.WebKitMutationObserver,
        process = global.process,
        isNode = require("npm:core-js@1.2.1/modules/$.cof")(process) == 'process',
        head,
        last,
        notify;
    var flush = function() {
      var parent,
          domain;
      if (isNode && (parent = process.domain)) {
        process.domain = null;
        parent.exit();
      }
      while (head) {
        domain = head.domain;
        if (domain)
          domain.enter();
        head.fn.call();
        if (domain)
          domain.exit();
        head = head.next;
      }
      last = undefined;
      if (parent)
        parent.enter();
    };
    if (isNode) {
      notify = function() {
        process.nextTick(flush);
      };
    } else if (Observer) {
      var toggle = 1,
          node = document.createTextNode('');
      new Observer(flush).observe(node, {characterData: true});
      notify = function() {
        node.data = toggle = -toggle;
      };
    } else {
      notify = function() {
        macrotask.call(global, flush);
      };
    }
    module.exports = function asap(fn) {
      var task = {
        fn: fn,
        next: undefined,
        domain: isNode && process.domain
      };
      if (last)
        last.next = task;
      if (!head) {
        head = task;
        notify();
      }
      last = task;
    };
  })(require("github:jspm/nodelibs-process@0.1.2"));
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/es6.map", ["npm:core-js@1.2.1/modules/$.collection-strong", "npm:core-js@1.2.1/modules/$.collection"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var strong = require("npm:core-js@1.2.1/modules/$.collection-strong");
  require("npm:core-js@1.2.1/modules/$.collection")('Map', function(get) {
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

System.register("npm:core-js@1.2.1/modules/es6.weak-map", ["npm:core-js@1.2.1/modules/$", "npm:core-js@1.2.1/modules/$.collection-weak", "npm:core-js@1.2.1/modules/$.is-object", "npm:core-js@1.2.1/modules/$.has", "npm:core-js@1.2.1/modules/$.collection", "npm:core-js@1.2.1/modules/$.redef"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var $ = require("npm:core-js@1.2.1/modules/$"),
      weak = require("npm:core-js@1.2.1/modules/$.collection-weak"),
      isObject = require("npm:core-js@1.2.1/modules/$.is-object"),
      has = require("npm:core-js@1.2.1/modules/$.has"),
      frozenStore = weak.frozenStore,
      WEAK = weak.WEAK,
      isExtensible = Object.isExtensible || isObject,
      tmp = {};
  var $WeakMap = require("npm:core-js@1.2.1/modules/$.collection")('WeakMap', function(get) {
    return function WeakMap() {
      return get(this, arguments[0]);
    };
  }, {
    get: function get(key) {
      if (isObject(key)) {
        if (!isExtensible(key))
          return frozenStore(this).get(key);
        if (has(key, WEAK))
          return key[WEAK][this._i];
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
      require("npm:core-js@1.2.1/modules/$.redef")(proto, key, function(a, b) {
        if (isObject(a) && !isExtensible(a)) {
          var result = frozenStore(this)[key](a, b);
          return key == 'set' ? this : result;
        }
        return method.call(this, a, b);
      });
    });
  }
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/es6.reflect.own-keys", ["npm:core-js@1.2.1/modules/$.def", "npm:core-js@1.2.1/modules/$.own-keys"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $def = require("npm:core-js@1.2.1/modules/$.def");
  $def($def.S, 'Reflect', {ownKeys: require("npm:core-js@1.2.1/modules/$.own-keys")});
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/es7.string.pad-left", ["npm:core-js@1.2.1/modules/$.def", "npm:core-js@1.2.1/modules/$.string-pad"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var $def = require("npm:core-js@1.2.1/modules/$.def"),
      $pad = require("npm:core-js@1.2.1/modules/$.string-pad");
  $def($def.P, 'String', {padLeft: function padLeft(maxLength) {
      return $pad(this, maxLength, arguments[1], true);
    }});
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/es7.regexp.escape", ["npm:core-js@1.2.1/modules/$.def", "npm:core-js@1.2.1/modules/$.replacer"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $def = require("npm:core-js@1.2.1/modules/$.def"),
      $re = require("npm:core-js@1.2.1/modules/$.replacer")(/[\\^$*+?.()|[\]{}]/g, '\\$&');
  $def($def.S, 'RegExp', {escape: function escape(it) {
      return $re(it);
    }});
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/es7.object.values", ["npm:core-js@1.2.1/modules/$.def", "npm:core-js@1.2.1/modules/$.object-to-array"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $def = require("npm:core-js@1.2.1/modules/$.def"),
      $values = require("npm:core-js@1.2.1/modules/$.object-to-array")(false);
  $def($def.S, 'Object', {values: function values(it) {
      return $values(it);
    }});
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/es7.map.to-json", ["npm:core-js@1.2.1/modules/$.def", "npm:core-js@1.2.1/modules/$.collection-to-json"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $def = require("npm:core-js@1.2.1/modules/$.def");
  $def($def.P, 'Map', {toJSON: require("npm:core-js@1.2.1/modules/$.collection-to-json")('Map')});
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/$.partial", ["npm:core-js@1.2.1/modules/$.path", "npm:core-js@1.2.1/modules/$.invoke", "npm:core-js@1.2.1/modules/$.a-function"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var path = require("npm:core-js@1.2.1/modules/$.path"),
      invoke = require("npm:core-js@1.2.1/modules/$.invoke"),
      aFunction = require("npm:core-js@1.2.1/modules/$.a-function");
  module.exports = function() {
    var fn = aFunction(this),
        length = arguments.length,
        pargs = Array(length),
        i = 0,
        _ = path._,
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

System.register("npm:core-js@1.2.1/modules/core.dict", ["npm:core-js@1.2.1/modules/$", "npm:core-js@1.2.1/modules/$.ctx", "npm:core-js@1.2.1/modules/$.def", "npm:core-js@1.2.1/modules/$.property-desc", "npm:core-js@1.2.1/modules/$.assign", "npm:core-js@1.2.1/modules/$.keyof", "npm:core-js@1.2.1/modules/$.a-function", "npm:core-js@1.2.1/modules/$.for-of", "npm:core-js@1.2.1/modules/core.is-iterable", "npm:core-js@1.2.1/modules/$.iter-step", "npm:core-js@1.2.1/modules/$.is-object", "npm:core-js@1.2.1/modules/$.to-iobject", "npm:core-js@1.2.1/modules/$.support-desc", "npm:core-js@1.2.1/modules/$.has", "npm:core-js@1.2.1/modules/$.iter-create"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var $ = require("npm:core-js@1.2.1/modules/$"),
      ctx = require("npm:core-js@1.2.1/modules/$.ctx"),
      $def = require("npm:core-js@1.2.1/modules/$.def"),
      createDesc = require("npm:core-js@1.2.1/modules/$.property-desc"),
      assign = require("npm:core-js@1.2.1/modules/$.assign"),
      keyOf = require("npm:core-js@1.2.1/modules/$.keyof"),
      aFunction = require("npm:core-js@1.2.1/modules/$.a-function"),
      forOf = require("npm:core-js@1.2.1/modules/$.for-of"),
      isIterable = require("npm:core-js@1.2.1/modules/core.is-iterable"),
      step = require("npm:core-js@1.2.1/modules/$.iter-step"),
      isObject = require("npm:core-js@1.2.1/modules/$.is-object"),
      toIObject = require("npm:core-js@1.2.1/modules/$.to-iobject"),
      SUPPORT_DESC = require("npm:core-js@1.2.1/modules/$.support-desc"),
      has = require("npm:core-js@1.2.1/modules/$.has"),
      getKeys = $.getKeys;
  var createDictMethod = function(TYPE) {
    var IS_MAP = TYPE == 1,
        IS_EVERY = TYPE == 4;
    return function(object, callbackfn, that) {
      var f = ctx(callbackfn, that, 3),
          O = toIObject(object),
          result = IS_MAP || TYPE == 7 || TYPE == 2 ? new (typeof this == 'function' ? this : Dict) : undefined,
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
  };
  var findKey = createDictMethod(6);
  var createDictIter = function(kind) {
    return function(it) {
      return new DictIterator(it, kind);
    };
  };
  var DictIterator = function(iterated, kind) {
    this._t = toIObject(iterated);
    this._a = getKeys(iterated);
    this._i = 0;
    this._k = kind;
  };
  require("npm:core-js@1.2.1/modules/$.iter-create")(DictIterator, 'Dict', function() {
    var that = this,
        O = that._t,
        keys = that._a,
        kind = that._k,
        key;
    do {
      if (that._i >= keys.length) {
        that._t = undefined;
        return step(1);
      }
    } while (!has(O, key = keys[that._i++]));
    if (kind == 'keys')
      return step(0, key);
    if (kind == 'values')
      return step(0, O[key]);
    return step(0, [key, O[key]]);
  });
  function Dict(iterable) {
    var dict = $.create(null);
    if (iterable != undefined) {
      if (isIterable(iterable)) {
        forOf(iterable, true, function(key, value) {
          dict[key] = value;
        });
      } else
        assign(dict, iterable);
    }
    return dict;
  }
  Dict.prototype = null;
  function reduce(object, mapfn, init) {
    aFunction(mapfn);
    var O = toIObject(object),
        keys = getKeys(O),
        length = keys.length,
        i = 0,
        memo,
        key;
    if (arguments.length < 3) {
      if (!length)
        throw TypeError('Reduce of empty object with no initial value');
      memo = O[keys[i++]];
    } else
      memo = Object(init);
    while (length > i)
      if (has(O, key = keys[i++])) {
        memo = mapfn(memo, O[key], key, object);
      }
    return memo;
  }
  function includes(object, el) {
    return (el == el ? keyOf(object, el) : findKey(object, function(it) {
      return it != it;
    })) !== undefined;
  }
  function get(object, key) {
    if (has(object, key))
      return object[key];
  }
  function set(object, key, value) {
    if (SUPPORT_DESC && key in Object)
      $.setDesc(object, key, createDesc(0, value));
    else
      object[key] = value;
    return object;
  }
  function isDict(it) {
    return isObject(it) && $.getProto(it) === Dict.prototype;
  }
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
    reduce: reduce,
    keyOf: keyOf,
    includes: includes,
    has: has,
    get: get,
    set: set,
    isDict: isDict
  });
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/core.object.define", ["npm:core-js@1.2.1/modules/$.def", "npm:core-js@1.2.1/modules/$.object-define"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $def = require("npm:core-js@1.2.1/modules/$.def"),
      define = require("npm:core-js@1.2.1/modules/$.object-define");
  $def($def.S + $def.F, 'Object', {define: define});
  global.define = __define;
  return module.exports;
});

(function() {
function define(){};  define.amd = {};
System.register("github:aurelia/validation@0.4.0/validation-config", ["github:aurelia/validation@0.4.0/validation-locale", "github:aurelia/validation@0.4.0/strategies/twbootstrap-view-strategy"], false, function(__require, __exports, __module) {
  return (function(exports, _validationLocale, _strategiesTwbootstrapViewStrategy) {
    'use strict';
    exports.__esModule = true;
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
      }
    }
    var ValidationConfigDefaults = function ValidationConfigDefaults() {
      _classCallCheck(this, ValidationConfigDefaults);
    };
    exports.ValidationConfigDefaults = ValidationConfigDefaults;
    ValidationConfigDefaults._defaults = {
      debounceTimeout: 0,
      dependencies: [],
      locale: 'en-US',
      localeResources: 'aurelia-validation/resources/',
      viewStrategy: _strategiesTwbootstrapViewStrategy.TWBootstrapViewStrategy.AppendToMessage,
      allPropertiesAreMandatory: false
    };
    ValidationConfigDefaults.defaults = function() {
      var defaults = {};
      Object.assign(defaults, ValidationConfigDefaults._defaults);
      return defaults;
    };
    var ValidationConfig = (function() {
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
        }
        var id = ++ValidationConfig.uniqueListenerId;
        this.changedHandlers.set(id, callback);
        return function() {
          _this.changedHandlers['delete'](id);
        };
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
        return _validationLocale.ValidationLocale.Repository.load(this.getValue('locale'), this.getValue('localeResources'));
      };
      ValidationConfig.prototype.useViewStrategy = function useViewStrategy(viewStrategy) {
        return this.setValue('viewStrategy', viewStrategy);
      };
      ValidationConfig.prototype.getViewStrategy = function getViewStrategy() {
        return this.getValue('viewStrategy');
      };
      ValidationConfig.prototype.treatAllPropertiesAsMandatory = function treatAllPropertiesAsMandatory() {
        this.setValue('allPropertiesAreMandatory', true);
        return this;
      };
      ValidationConfig.prototype.treatAllPropertiesAsOptional = function treatAllPropertiesAsOptional() {
        this.setValue('allPropertiesAreMandatory', false);
        return this;
      };
      return ValidationConfig;
    })();
    exports.ValidationConfig = ValidationConfig;
    ValidationConfig.uniqueListenerId = 0;
  }).call(__exports, __exports, __require('github:aurelia/validation@0.4.0/validation-locale'), __require('github:aurelia/validation@0.4.0/strategies/twbootstrap-view-strategy'));
});
})();
System.register("npm:core-js@0.9.18/modules/$.cof", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.wks"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@0.9.18/modules/$"),
      TAG = require("npm:core-js@0.9.18/modules/$.wks")('toStringTag'),
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

System.register("npm:core-js@0.9.18/modules/$.array-methods", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.ctx"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@0.9.18/modules/$"),
      ctx = require("npm:core-js@0.9.18/modules/$.ctx");
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

System.register("github:jspm/nodelibs-process@0.1.2/index", ["npm:process@0.11.2"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = System._nodeRequire ? process : require("npm:process@0.11.2");
  global.define = __define;
  return module.exports;
});

(function() {
function define(){};  define.amd = {};
System.register("github:aurelia/validation@0.4.0/validation-group-builder", ["github:aurelia/validation@0.4.0/validation-rules-collection", "github:aurelia/validation@0.4.0/validation-property", "github:aurelia/validation@0.4.0/validation-config", "github:aurelia/validation@0.4.0/validation-rules"], false, function(__require, __exports, __module) {
  return (function(exports, _validationRulesCollection, _validationProperty, _validationConfig, _validationRules) {
    'use strict';
    exports.__esModule = true;
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
      }
    }
    var ValidationGroupBuilder = (function() {
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
          var config = new _validationConfig.ValidationConfig(this.validationGroup.config);
          if (configurationCallback !== undefined && typeof configurationCallback === 'function') {
            configurationCallback(config);
          }
          newValidationProperty = new _validationProperty.ValidationProperty(this.observerLocator, propertyName, this.validationGroup, propertyResult, config);
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
      ValidationGroupBuilder.prototype.canBeEmpty = function canBeEmpty() {
        this.validationRuleCollections[0].canBeEmpty();
        this.checkLast();
        return this.validationGroup;
      };
      ValidationGroupBuilder.prototype.isGreaterThan = function isGreaterThan(minimumValue) {
        return this.passesRule(new _validationRules.MinimumValueValidationRule(minimumValue));
      };
      ValidationGroupBuilder.prototype.isGreaterThanOrEqualTo = function isGreaterThanOrEqualTo(minimumValue) {
        return this.passesRule(new _validationRules.MinimumInclusiveValueValidationRule(minimumValue));
      };
      ValidationGroupBuilder.prototype.isBetween = function isBetween(minimumValue, maximumValue) {
        return this.passesRule(new _validationRules.BetweenValueValidationRule(minimumValue, maximumValue));
      };
      ValidationGroupBuilder.prototype.isIn = function isIn(collection) {
        return this.passesRule(new _validationRules.InCollectionValidationRule(collection));
      };
      ValidationGroupBuilder.prototype.isLessThan = function isLessThan(maximumValue) {
        return this.passesRule(new _validationRules.MaximumValueValidationRule(maximumValue));
      };
      ValidationGroupBuilder.prototype.isLessThanOrEqualTo = function isLessThanOrEqualTo(maximumValue) {
        return this.passesRule(new _validationRules.MaximumInclusiveValueValidationRule(maximumValue));
      };
      ValidationGroupBuilder.prototype.isEqualTo = function isEqualTo(otherValue, otherValueLabel) {
        if (!otherValueLabel) {
          return this.passesRule(new _validationRules.EqualityValidationRule(otherValue));
        }
        return this.passesRule(new _validationRules.EqualityWithOtherLabelValidationRule(otherValue, otherValueLabel));
      };
      ValidationGroupBuilder.prototype.isNotEqualTo = function isNotEqualTo(otherValue, otherValueLabel) {
        if (!otherValueLabel) {
          return this.passesRule(new _validationRules.InEqualityValidationRule(otherValue));
        }
        return this.passesRule(new _validationRules.InEqualityWithOtherLabelValidationRule(otherValue, otherValueLabel));
      };
      ValidationGroupBuilder.prototype.isEmail = function isEmail() {
        return this.passesRule(new _validationRules.EmailValidationRule());
      };
      ValidationGroupBuilder.prototype.isURL = function isURL() {
        return this.passesRule(new _validationRules.URLValidationRule());
      };
      ValidationGroupBuilder.prototype.hasMinLength = function hasMinLength(minimumValue) {
        return this.passesRule(new _validationRules.MinimumLengthValidationRule(minimumValue));
      };
      ValidationGroupBuilder.prototype.hasMaxLength = function hasMaxLength(maximumValue) {
        return this.passesRule(new _validationRules.MaximumLengthValidationRule(maximumValue));
      };
      ValidationGroupBuilder.prototype.hasLengthBetween = function hasLengthBetween(minimumValue, maximumValue) {
        return this.passesRule(new _validationRules.BetweenLengthValidationRule(minimumValue, maximumValue));
      };
      ValidationGroupBuilder.prototype.isNumber = function isNumber() {
        return this.passesRule(new _validationRules.NumericValidationRule());
      };
      ValidationGroupBuilder.prototype.containsNoSpaces = function containsNoSpaces() {
        return this.passesRule(new _validationRules.NoSpacesValidationRule());
      };
      ValidationGroupBuilder.prototype.containsOnlyDigits = function containsOnlyDigits() {
        return this.passesRule(new _validationRules.DigitValidationRule());
      };
      ValidationGroupBuilder.prototype.containsOnlyAlpha = function containsOnlyAlpha() {
        return this.passesRule(new _validationRules.AlphaValidationRule());
      };
      ValidationGroupBuilder.prototype.containsOnlyAlphaOrWhitespace = function containsOnlyAlphaOrWhitespace() {
        return this.passesRule(new _validationRules.AlphaOrWhitespaceValidationRule());
      };
      ValidationGroupBuilder.prototype.containsOnlyAlphanumerics = function containsOnlyAlphanumerics() {
        return this.passesRule(new _validationRules.AlphaNumericValidationRule());
      };
      ValidationGroupBuilder.prototype.containsOnlyAlphanumericsOrWhitespace = function containsOnlyAlphanumericsOrWhitespace() {
        return this.passesRule(new _validationRules.AlphaNumericOrWhitespaceValidationRule());
      };
      ValidationGroupBuilder.prototype.isStrongPassword = function isStrongPassword(minimumComplexityLevel) {
        if (minimumComplexityLevel === 4) {
          return this.passesRule(new _validationRules.StrongPasswordValidationRule());
        }
        return this.passesRule(new _validationRules.MediumPasswordValidationRule(minimumComplexityLevel));
      };
      ValidationGroupBuilder.prototype.containsOnly = function containsOnly(regex) {
        return this.passesRule(new _validationRules.ContainsOnlyValidationRule(regex));
      };
      ValidationGroupBuilder.prototype.matches = function matches(regex) {
        return this.passesRule(new _validationRules.RegexValidationRule(regex));
      };
      ValidationGroupBuilder.prototype.passes = function passes(customFunction, threshold) {
        return this.passesRule(new _validationRules.CustomFunctionValidationRule(customFunction, threshold));
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
        var conditionalCollection = new _validationRulesCollection.SwitchCaseValidationRulesCollection(conditionExpression);
        conditionalCollection['case'](true);
        this.validationRuleCollections[0].addValidationRuleCollection(conditionalCollection);
        this.validationRuleCollections.unshift(conditionalCollection);
        return this.validationGroup;
      };
      ValidationGroupBuilder.prototype['else'] = function _else() {
        if (!this.validationRuleCollections[0]['default']) {
          throw Error('Invalid statement: \'else\'');
        }
        this.validationRuleCollections[0]['default']();
        return this.validationGroup;
      };
      ValidationGroupBuilder.prototype.endIf = function endIf() {
        if (!this.validationRuleCollections[0]['default']) {
          throw Error('Invalid statement: \'endIf\'');
        }
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
        var conditionalCollection = new _validationRulesCollection.SwitchCaseValidationRulesCollection(condition);
        this.validationRuleCollections[0].addValidationRuleCollection(conditionalCollection);
        this.validationRuleCollections.unshift(conditionalCollection);
        return this.validationGroup;
      };
      ValidationGroupBuilder.prototype['case'] = function _case(caseLabel) {
        if (!this.validationRuleCollections[0]['default']) {
          throw Error('Invalid statement: \'case\'');
        }
        this.validationRuleCollections[0]['case'](caseLabel);
        return this.validationGroup;
      };
      ValidationGroupBuilder.prototype['default'] = function _default() {
        if (!this.validationRuleCollections[0]['default']) {
          throw Error('Invalid statement: \'case\'');
        }
        this.validationRuleCollections[0]['default']();
        return this.validationGroup;
      };
      ValidationGroupBuilder.prototype.endSwitch = function endSwitch() {
        if (!this.validationRuleCollections[0]['default']) {
          throw Error('Invalid statement: \'endIf\'');
        }
        this.validationRuleCollections.shift();
        this.checkLast();
        return this.validationGroup;
      };
      return ValidationGroupBuilder;
    })();
    exports.ValidationGroupBuilder = ValidationGroupBuilder;
  }).call(__exports, __exports, __require('github:aurelia/validation@0.4.0/validation-rules-collection'), __require('github:aurelia/validation@0.4.0/validation-property'), __require('github:aurelia/validation@0.4.0/validation-config'), __require('github:aurelia/validation@0.4.0/validation-rules'));
});
})();
System.register("npm:core-js@1.2.1/modules/$.def", ["npm:core-js@1.2.1/modules/$.global", "npm:core-js@1.2.1/modules/$.core", "npm:core-js@1.2.1/modules/$.hide", "npm:core-js@1.2.1/modules/$.redef"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var global = require("npm:core-js@1.2.1/modules/$.global"),
      core = require("npm:core-js@1.2.1/modules/$.core"),
      hide = require("npm:core-js@1.2.1/modules/$.hide"),
      $redef = require("npm:core-js@1.2.1/modules/$.redef"),
      PROTOTYPE = 'prototype';
  var ctx = function(fn, that) {
    return function() {
      return fn.apply(that, arguments);
    };
  };
  var $def = function(type, name, source) {
    var key,
        own,
        out,
        exp,
        isGlobal = type & $def.G,
        isProto = type & $def.P,
        target = isGlobal ? global : type & $def.S ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE],
        exports = isGlobal ? core : core[name] || (core[name] = {});
    if (isGlobal)
      source = name;
    for (key in source) {
      own = !(type & $def.F) && target && key in target;
      out = (own ? target : source)[key];
      if (type & $def.B && own)
        exp = ctx(out, global);
      else
        exp = isProto && typeof out == 'function' ? ctx(Function.call, out) : out;
      if (target && !own)
        $redef(target, key, out);
      if (exports[key] != out)
        hide(exports, key, exp);
      if (isProto)
        (exports[PROTOTYPE] || (exports[PROTOTYPE] = {}))[key] = out;
    }
  };
  global.core = core;
  $def.F = 1;
  $def.G = 2;
  $def.S = 4;
  $def.P = 8;
  $def.B = 16;
  $def.W = 32;
  module.exports = $def;
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/$.array-methods", ["npm:core-js@1.2.1/modules/$.ctx", "npm:core-js@1.2.1/modules/$.is-object", "npm:core-js@1.2.1/modules/$.iobject", "npm:core-js@1.2.1/modules/$.to-object", "npm:core-js@1.2.1/modules/$.to-length", "npm:core-js@1.2.1/modules/$.is-array", "npm:core-js@1.2.1/modules/$.wks"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var ctx = require("npm:core-js@1.2.1/modules/$.ctx"),
      isObject = require("npm:core-js@1.2.1/modules/$.is-object"),
      IObject = require("npm:core-js@1.2.1/modules/$.iobject"),
      toObject = require("npm:core-js@1.2.1/modules/$.to-object"),
      toLength = require("npm:core-js@1.2.1/modules/$.to-length"),
      isArray = require("npm:core-js@1.2.1/modules/$.is-array"),
      SPECIES = require("npm:core-js@1.2.1/modules/$.wks")('species');
  var ASC = function(original, length) {
    var C;
    if (isArray(original) && isObject(C = original.constructor)) {
      C = C[SPECIES];
      if (C === null)
        C = undefined;
    }
    return new (C === undefined ? Array : C)(length);
  };
  module.exports = function(TYPE) {
    var IS_MAP = TYPE == 1,
        IS_FILTER = TYPE == 2,
        IS_SOME = TYPE == 3,
        IS_EVERY = TYPE == 4,
        IS_FIND_INDEX = TYPE == 6,
        NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
    return function($this, callbackfn, that) {
      var O = toObject($this),
          self = IObject(O),
          f = ctx(callbackfn, that, 3),
          length = toLength(self.length),
          index = 0,
          result = IS_MAP ? ASC($this, length) : IS_FILTER ? ASC($this, 0) : undefined,
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

System.register("npm:core-js@1.2.1/modules/es6.string.iterator", ["npm:core-js@1.2.1/modules/$.string-at", "npm:core-js@1.2.1/modules/$.iter-define"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var $at = require("npm:core-js@1.2.1/modules/$.string-at")(true);
  require("npm:core-js@1.2.1/modules/$.iter-define")(String, 'String', function(iterated) {
    this._t = String(iterated);
    this._i = 0;
  }, function() {
    var O = this._t,
        index = this._i,
        point;
    if (index >= O.length)
      return {
        value: undefined,
        done: true
      };
    point = $at(O, index);
    this._i += point.length;
    return {
      value: point,
      done: false
    };
  });
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/es6.string.ends-with", ["npm:core-js@1.2.1/modules/$.def", "npm:core-js@1.2.1/modules/$.to-length", "npm:core-js@1.2.1/modules/$.string-context", "npm:core-js@1.2.1/modules/$.fails-is-regexp"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var $def = require("npm:core-js@1.2.1/modules/$.def"),
      toLength = require("npm:core-js@1.2.1/modules/$.to-length"),
      context = require("npm:core-js@1.2.1/modules/$.string-context"),
      ENDS_WITH = 'endsWith',
      $endsWith = ''[ENDS_WITH];
  $def($def.P + $def.F * require("npm:core-js@1.2.1/modules/$.fails-is-regexp")(ENDS_WITH), 'String', {endsWith: function endsWith(searchString) {
      var that = context(this, searchString, ENDS_WITH),
          endPosition = arguments[1],
          len = toLength(that.length),
          end = endPosition === undefined ? len : Math.min(toLength(endPosition), len),
          search = String(searchString);
      return $endsWith ? $endsWith.call(that, search, end) : that.slice(end - search.length, end) === search;
    }});
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/es6.promise", ["npm:core-js@1.2.1/modules/$", "npm:core-js@1.2.1/modules/$.library", "npm:core-js@1.2.1/modules/$.global", "npm:core-js@1.2.1/modules/$.ctx", "npm:core-js@1.2.1/modules/$.classof", "npm:core-js@1.2.1/modules/$.def", "npm:core-js@1.2.1/modules/$.is-object", "npm:core-js@1.2.1/modules/$.an-object", "npm:core-js@1.2.1/modules/$.a-function", "npm:core-js@1.2.1/modules/$.strict-new", "npm:core-js@1.2.1/modules/$.for-of", "npm:core-js@1.2.1/modules/$.set-proto", "npm:core-js@1.2.1/modules/$.same", "npm:core-js@1.2.1/modules/$.species", "npm:core-js@1.2.1/modules/$.wks", "npm:core-js@1.2.1/modules/$.uid", "npm:core-js@1.2.1/modules/$.microtask", "npm:core-js@1.2.1/modules/$.support-desc", "npm:core-js@1.2.1/modules/$.mix", "npm:core-js@1.2.1/modules/$.tag", "npm:core-js@1.2.1/modules/$.core", "npm:core-js@1.2.1/modules/$.iter-detect", "github:jspm/nodelibs-process@0.1.2"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    'use strict';
    var $ = require("npm:core-js@1.2.1/modules/$"),
        LIBRARY = require("npm:core-js@1.2.1/modules/$.library"),
        global = require("npm:core-js@1.2.1/modules/$.global"),
        ctx = require("npm:core-js@1.2.1/modules/$.ctx"),
        classof = require("npm:core-js@1.2.1/modules/$.classof"),
        $def = require("npm:core-js@1.2.1/modules/$.def"),
        isObject = require("npm:core-js@1.2.1/modules/$.is-object"),
        anObject = require("npm:core-js@1.2.1/modules/$.an-object"),
        aFunction = require("npm:core-js@1.2.1/modules/$.a-function"),
        strictNew = require("npm:core-js@1.2.1/modules/$.strict-new"),
        forOf = require("npm:core-js@1.2.1/modules/$.for-of"),
        setProto = require("npm:core-js@1.2.1/modules/$.set-proto").set,
        same = require("npm:core-js@1.2.1/modules/$.same"),
        species = require("npm:core-js@1.2.1/modules/$.species"),
        SPECIES = require("npm:core-js@1.2.1/modules/$.wks")('species'),
        RECORD = require("npm:core-js@1.2.1/modules/$.uid")('record'),
        asap = require("npm:core-js@1.2.1/modules/$.microtask"),
        PROMISE = 'Promise',
        process = global.process,
        isNode = classof(process) == 'process',
        P = global[PROMISE],
        Wrapper;
    var testResolve = function(sub) {
      var test = new P(function() {});
      if (sub)
        test.constructor = Object;
      return P.resolve(test) === test;
    };
    var useNative = function() {
      var works = false;
      function P2(x) {
        var self = new P(x);
        setProto(self, P2.prototype);
        return self;
      }
      try {
        works = P && P.resolve && testResolve();
        setProto(P2, P);
        P2.prototype = $.create(P.prototype, {constructor: {value: P2}});
        if (!(P2.resolve(5).then(function() {}) instanceof P2)) {
          works = false;
        }
        if (works && require("npm:core-js@1.2.1/modules/$.support-desc")) {
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
    var isPromise = function(it) {
      return isObject(it) && (useNative ? classof(it) == 'Promise' : RECORD in it);
    };
    var sameConstructor = function(a, b) {
      if (LIBRARY && a === P && b === Wrapper)
        return true;
      return same(a, b);
    };
    var getConstructor = function(C) {
      var S = anObject(C)[SPECIES];
      return S != undefined ? S : C;
    };
    var isThenable = function(it) {
      var then;
      return isObject(it) && typeof(then = it.then) == 'function' ? then : false;
    };
    var notify = function(record, isReject) {
      if (record.n)
        return ;
      record.n = true;
      var chain = record.c;
      asap(function() {
        var value = record.v,
            ok = record.s == 1,
            i = 0;
        var run = function(react) {
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
        };
        while (chain.length > i)
          run(chain[i++]);
        chain.length = 0;
        record.n = false;
        if (isReject)
          setTimeout(function() {
            var promise = record.p,
                handler,
                console;
            if (isUnhandled(promise)) {
              if (isNode) {
                process.emit('unhandledRejection', value, promise);
              } else if (handler = global.onunhandledrejection) {
                handler({
                  promise: promise,
                  reason: value
                });
              } else if ((console = global.console) && console.error) {
                console.error('Unhandled promise rejection', value);
              }
            }
            record.a = undefined;
          }, 1);
      });
    };
    var isUnhandled = function(promise) {
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
    };
    var $reject = function(value) {
      var record = this;
      if (record.d)
        return ;
      record.d = true;
      record = record.r || record;
      record.v = value;
      record.s = 2;
      record.a = record.c.slice();
      notify(record, true);
    };
    var $resolve = function(value) {
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
          notify(record, false);
        }
      } catch (e) {
        $reject.call({
          r: record,
          d: false
        }, e);
      }
    };
    if (!useNative) {
      P = function Promise(executor) {
        aFunction(executor);
        var record = {
          p: strictNew(this, P, PROMISE),
          c: [],
          a: undefined,
          s: 0,
          d: false,
          v: undefined,
          h: false,
          n: false
        };
        this[RECORD] = record;
        try {
          executor(ctx($resolve, record, 1), ctx($reject, record, 1));
        } catch (err) {
          $reject.call(record, err);
        }
      };
      require("npm:core-js@1.2.1/modules/$.mix")(P.prototype, {
        then: function then(onFulfilled, onRejected) {
          var S = anObject(anObject(this).constructor)[SPECIES];
          var react = {
            ok: typeof onFulfilled == 'function' ? onFulfilled : true,
            fail: typeof onRejected == 'function' ? onRejected : false
          };
          var promise = react.P = new (S != undefined ? S : P)(function(res, rej) {
            react.res = res;
            react.rej = rej;
          });
          aFunction(react.res);
          aFunction(react.rej);
          var record = this[RECORD];
          record.c.push(react);
          if (record.a)
            record.a.push(react);
          if (record.s)
            notify(record, false);
          return promise;
        },
        'catch': function(onRejected) {
          return this.then(undefined, onRejected);
        }
      });
    }
    $def($def.G + $def.W + $def.F * !useNative, {Promise: P});
    require("npm:core-js@1.2.1/modules/$.tag")(P, PROMISE);
    species(P);
    species(Wrapper = require("npm:core-js@1.2.1/modules/$.core")[PROMISE]);
    $def($def.S + $def.F * !useNative, PROMISE, {reject: function reject(r) {
        return new this(function(res, rej) {
          rej(r);
        });
      }});
    $def($def.S + $def.F * (!useNative || testResolve(true)), PROMISE, {resolve: function resolve(x) {
        return isPromise(x) && sameConstructor(x.constructor, this) ? x : new this(function(res) {
          res(x);
        });
      }});
    $def($def.S + $def.F * !(useNative && require("npm:core-js@1.2.1/modules/$.iter-detect")(function(iter) {
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
  })(require("github:jspm/nodelibs-process@0.1.2"));
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/modules/web.timers", ["npm:core-js@1.2.1/modules/$.global", "npm:core-js@1.2.1/modules/$.def", "npm:core-js@1.2.1/modules/$.invoke", "npm:core-js@1.2.1/modules/$.partial"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var global = require("npm:core-js@1.2.1/modules/$.global"),
      $def = require("npm:core-js@1.2.1/modules/$.def"),
      invoke = require("npm:core-js@1.2.1/modules/$.invoke"),
      partial = require("npm:core-js@1.2.1/modules/$.partial"),
      navigator = global.navigator,
      MSIE = !!navigator && /MSIE .\./.test(navigator.userAgent);
  var wrap = function(set) {
    return MSIE ? function(fn, time) {
      return set(invoke(partial, [].slice.call(arguments, 2), typeof fn == 'function' ? fn : Function(fn)), time);
    } : set;
  };
  $def($def.G + $def.B + $def.F * MSIE, {
    setTimeout: wrap(global.setTimeout),
    setInterval: wrap(global.setInterval)
  });
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/es5", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.dom-create", "npm:core-js@0.9.18/modules/$.cof", "npm:core-js@0.9.18/modules/$.def", "npm:core-js@0.9.18/modules/$.invoke", "npm:core-js@0.9.18/modules/$.array-methods", "npm:core-js@0.9.18/modules/$.uid", "npm:core-js@0.9.18/modules/$.assert", "npm:core-js@0.9.18/modules/$.array-includes", "npm:core-js@0.9.18/modules/$.replacer", "npm:core-js@0.9.18/modules/$.throws"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@0.9.18/modules/$"),
      cel = require("npm:core-js@0.9.18/modules/$.dom-create"),
      cof = require("npm:core-js@0.9.18/modules/$.cof"),
      $def = require("npm:core-js@0.9.18/modules/$.def"),
      invoke = require("npm:core-js@0.9.18/modules/$.invoke"),
      arrayMethod = require("npm:core-js@0.9.18/modules/$.array-methods"),
      IE_PROTO = require("npm:core-js@0.9.18/modules/$.uid").safe('__proto__'),
      assert = require("npm:core-js@0.9.18/modules/$.assert"),
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
      $indexOf = require("npm:core-js@0.9.18/modules/$.array-includes")(false),
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
  $def($def.P, 'String', {trim: require("npm:core-js@0.9.18/modules/$.replacer")(/^\s*([\s\S]*\S)?\s*$/, '$1')});
  $def($def.S, 'Date', {now: function() {
      return +new Date;
    }});
  function lz(num) {
    return num > 9 ? num : '0' + num;
  }
  var date = new Date(-5e13 - 1),
      brokenDate = !(date.toISOString && date.toISOString() == '0385-07-25T07:06:39.999Z' && require("npm:core-js@0.9.18/modules/$.throws")(function() {
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

System.register("github:jspm/nodelibs-process@0.1.2", ["github:jspm/nodelibs-process@0.1.2/index"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = require("github:jspm/nodelibs-process@0.1.2/index");
  global.define = __define;
  return module.exports;
});

(function() {
function define(){};  define.amd = {};
System.register("github:aurelia/validation@0.4.0/validation-group", ["github:aurelia/metadata@0.9.0", "github:aurelia/validation@0.4.0/validation-group-builder", "github:aurelia/validation@0.4.0/validation-result", "github:aurelia/validation@0.4.0/decorators"], false, function(__require, __exports, __module) {
  return (function(exports, _aureliaMetadata, _validationGroupBuilder, _validationResult, _decorators) {
    'use strict';
    exports.__esModule = true;
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
      }
    }
    var ValidationGroup = (function() {
      function ValidationGroup(subject, observerLocator, config) {
        var _this = this;
        _classCallCheck(this, ValidationGroup);
        var validationMetadata = undefined;
        this.result = new _validationResult.ValidationResult();
        this.subject = subject;
        this.validationProperties = [];
        this.config = config;
        this.builder = new _validationGroupBuilder.ValidationGroupBuilder(observerLocator, this);
        this.onValidateCallbacks = [];
        this.onPropertyValidationCallbacks = [];
        this.isValidating = false;
        this.onDestroy = config.onLocaleChanged(function() {
          _this.validate(false, true);
        });
        validationMetadata = _aureliaMetadata.metadata.getOwn(_decorators.ValidationMetadata.metadataKey, this.subject);
        if (validationMetadata) {
          validationMetadata.setup(this);
        }
      }
      ValidationGroup.prototype.destroy = function destroy() {
        this.validationProperties.forEach(function(prop) {
          prop.destroy();
        });
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
        var errors = undefined;
        this.onPropertyValidate(function(propertyBindingPath) {
          _this2.passes(function() {
            breezeEntity.entityAspect.validateProperty(propertyBindingPath);
            errors = breezeEntity.entityAspect.getValidationErrors(propertyBindingPath);
            if (errors.length === 0) {
              return true;
            }
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
            var currentResultProp = undefined;
            if (!me.result.properties[propertyName]) {
              me.ensure(propertyName);
            }
            currentResultProp = me.result.addProperty(propertyName);
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
          throw Error('Should never get here: a validation property should always resolve to true/false!');
        });
        this.onValidateCallbacks.forEach(function(onValidateCallback) {
          promise = promise.then(function() {
            return _this3.config.locale();
          }).then(function(locale) {
            return Promise.resolve(onValidateCallback.validationFunction()).then(function(callbackResult) {
              for (var prop in callbackResult) {
                var resultProp = undefined;
                var result = undefined;
                var newPropResult = undefined;
                if (!_this3.result.properties[prop]) {
                  _this3.ensure(prop);
                }
                resultProp = _this3.result.addProperty(prop);
                result = callbackResult[prop];
                newPropResult = {latestValue: resultProp.latestValue};
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
          }
          return Promise.reject(_this3.result);
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
      ValidationGroup.prototype.canBeEmpty = function canBeEmpty() {
        return this.builder.canBeEmpty();
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
    exports.ValidationGroup = ValidationGroup;
  }).call(__exports, __exports, __require('github:aurelia/metadata@0.9.0'), __require('github:aurelia/validation@0.4.0/validation-group-builder'), __require('github:aurelia/validation@0.4.0/validation-result'), __require('github:aurelia/validation@0.4.0/decorators'));
});
})();
System.register("npm:core-js@1.2.1/modules/es5", ["npm:core-js@1.2.1/modules/$", "npm:core-js@1.2.1/modules/$.support-desc", "npm:core-js@1.2.1/modules/$.property-desc", "npm:core-js@1.2.1/modules/$.html", "npm:core-js@1.2.1/modules/$.dom-create", "npm:core-js@1.2.1/modules/$.has", "npm:core-js@1.2.1/modules/$.cof", "npm:core-js@1.2.1/modules/$.def", "npm:core-js@1.2.1/modules/$.invoke", "npm:core-js@1.2.1/modules/$.array-methods", "npm:core-js@1.2.1/modules/$.uid", "npm:core-js@1.2.1/modules/$.is-object", "npm:core-js@1.2.1/modules/$.an-object", "npm:core-js@1.2.1/modules/$.a-function", "npm:core-js@1.2.1/modules/$.to-object", "npm:core-js@1.2.1/modules/$.to-iobject", "npm:core-js@1.2.1/modules/$.to-integer", "npm:core-js@1.2.1/modules/$.to-index", "npm:core-js@1.2.1/modules/$.to-length", "npm:core-js@1.2.1/modules/$.iobject", "npm:core-js@1.2.1/modules/$.fails", "npm:core-js@1.2.1/modules/$.array-includes", "npm:core-js@1.2.1/modules/$.is-array"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var $ = require("npm:core-js@1.2.1/modules/$"),
      SUPPORT_DESC = require("npm:core-js@1.2.1/modules/$.support-desc"),
      createDesc = require("npm:core-js@1.2.1/modules/$.property-desc"),
      html = require("npm:core-js@1.2.1/modules/$.html"),
      cel = require("npm:core-js@1.2.1/modules/$.dom-create"),
      has = require("npm:core-js@1.2.1/modules/$.has"),
      cof = require("npm:core-js@1.2.1/modules/$.cof"),
      $def = require("npm:core-js@1.2.1/modules/$.def"),
      invoke = require("npm:core-js@1.2.1/modules/$.invoke"),
      arrayMethod = require("npm:core-js@1.2.1/modules/$.array-methods"),
      IE_PROTO = require("npm:core-js@1.2.1/modules/$.uid")('__proto__'),
      isObject = require("npm:core-js@1.2.1/modules/$.is-object"),
      anObject = require("npm:core-js@1.2.1/modules/$.an-object"),
      aFunction = require("npm:core-js@1.2.1/modules/$.a-function"),
      toObject = require("npm:core-js@1.2.1/modules/$.to-object"),
      toIObject = require("npm:core-js@1.2.1/modules/$.to-iobject"),
      toInteger = require("npm:core-js@1.2.1/modules/$.to-integer"),
      toIndex = require("npm:core-js@1.2.1/modules/$.to-index"),
      toLength = require("npm:core-js@1.2.1/modules/$.to-length"),
      IObject = require("npm:core-js@1.2.1/modules/$.iobject"),
      fails = require("npm:core-js@1.2.1/modules/$.fails"),
      ObjectProto = Object.prototype,
      A = [],
      _slice = A.slice,
      _join = A.join,
      defineProperty = $.setDesc,
      getOwnDescriptor = $.getDesc,
      defineProperties = $.setDescs,
      $indexOf = require("npm:core-js@1.2.1/modules/$.array-includes")(false),
      factories = {},
      IE8_DOM_DEFINE;
  if (!SUPPORT_DESC) {
    IE8_DOM_DEFINE = !fails(function() {
      return defineProperty(cel('div'), 'a', {get: function() {
          return 7;
        }}).a != 7;
    });
    $.setDesc = function(O, P, Attributes) {
      if (IE8_DOM_DEFINE)
        try {
          return defineProperty(O, P, Attributes);
        } catch (e) {}
      if ('get' in Attributes || 'set' in Attributes)
        throw TypeError('Accessors not supported!');
      if ('value' in Attributes)
        anObject(O)[P] = Attributes.value;
      return O;
    };
    $.getDesc = function(O, P) {
      if (IE8_DOM_DEFINE)
        try {
          return getOwnDescriptor(O, P);
        } catch (e) {}
      if (has(O, P))
        return createDesc(!ObjectProto.propertyIsEnumerable.call(O, P), O[P]);
    };
    $.setDescs = defineProperties = function(O, Properties) {
      anObject(O);
      var keys = $.getKeys(Properties),
          length = keys.length,
          i = 0,
          P;
      while (length > i)
        $.setDesc(O, P = keys[i++], Properties[P]);
      return O;
    };
  }
  $def($def.S + $def.F * !SUPPORT_DESC, 'Object', {
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
  var createGetKeys = function(names, length) {
    return function(object) {
      var O = toIObject(object),
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
  };
  var Empty = function() {};
  $def($def.S, 'Object', {
    getPrototypeOf: $.getProto = $.getProto || function(O) {
      O = toObject(O);
      if (has(O, IE_PROTO))
        return O[IE_PROTO];
      if (typeof O.constructor == 'function' && O instanceof O.constructor) {
        return O.constructor.prototype;
      }
      return O instanceof Object ? ObjectProto : null;
    },
    getOwnPropertyNames: $.getNames = $.getNames || createGetKeys(keys2, keys2.length, true),
    create: $.create = $.create || function(O, Properties) {
      var result;
      if (O !== null) {
        Empty.prototype = anObject(O);
        result = new Empty();
        Empty.prototype = null;
        result[IE_PROTO] = O;
      } else
        result = createDict();
      return Properties === undefined ? result : defineProperties(result, Properties);
    },
    keys: $.getKeys = $.getKeys || createGetKeys(keys1, keysLen1, false)
  });
  var construct = function(F, len, args) {
    if (!(len in factories)) {
      for (var n = [],
          i = 0; i < len; i++)
        n[i] = 'a[' + i + ']';
      factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
    }
    return factories[len](F, args);
  };
  $def($def.P, 'Function', {bind: function bind(that) {
      var fn = aFunction(this),
          partArgs = _slice.call(arguments, 1);
      var bound = function() {
        var args = partArgs.concat(_slice.call(arguments));
        return this instanceof bound ? construct(fn, args.length, args) : invoke(fn, args, that);
      };
      if (isObject(fn.prototype))
        bound.prototype = fn.prototype;
      return bound;
    }});
  var buggySlice = fails(function() {
    if (html)
      _slice.call(html);
  });
  $def($def.P + $def.F * buggySlice, 'Array', {slice: function(begin, end) {
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
  $def($def.P + $def.F * (IObject != Object), 'Array', {join: function() {
      return _join.apply(IObject(this), arguments);
    }});
  $def($def.S, 'Array', {isArray: require("npm:core-js@1.2.1/modules/$.is-array")});
  var createArrayReduce = function(isRight) {
    return function(callbackfn, memo) {
      aFunction(callbackfn);
      var O = IObject(this),
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
          if (isRight ? index < 0 : length <= index) {
            throw TypeError('Reduce of empty array with no initial value');
          }
        }
      for (; isRight ? index >= 0 : length > index; index += i)
        if (index in O) {
          memo = callbackfn(memo, O[index], index, this);
        }
      return memo;
    };
  };
  var methodize = function($fn) {
    return function(arg1) {
      return $fn(this, arg1, arguments[1]);
    };
  };
  $def($def.P, 'Array', {
    forEach: $.each = $.each || methodize(arrayMethod(0)),
    map: methodize(arrayMethod(1)),
    filter: methodize(arrayMethod(2)),
    some: methodize(arrayMethod(3)),
    every: methodize(arrayMethod(4)),
    reduce: createArrayReduce(false),
    reduceRight: createArrayReduce(true),
    indexOf: methodize($indexOf),
    lastIndexOf: function(el, fromIndex) {
      var O = toIObject(this),
          length = toLength(O.length),
          index = length - 1;
      if (arguments.length > 1)
        index = Math.min(index, toInteger(fromIndex));
      if (index < 0)
        index = toLength(length + index);
      for (; index >= 0; index--)
        if (index in O)
          if (O[index] === el)
            return index;
      return -1;
    }
  });
  $def($def.S, 'Date', {now: function() {
      return +new Date;
    }});
  var lz = function(num) {
    return num > 9 ? num : '0' + num;
  };
  var date = new Date(-5e13 - 1),
      brokenDate = !(date.toISOString && date.toISOString() == '0385-07-25T07:06:39.999Z' && fails(function() {
        new Date(NaN).toISOString();
      }));
  $def($def.P + $def.F * brokenDate, 'Date', {toISOString: function toISOString() {
      if (!isFinite(this))
        throw RangeError('Invalid time value');
      var d = this,
          y = d.getUTCFullYear(),
          m = d.getUTCMilliseconds(),
          s = y < 0 ? '-' : y > 9999 ? '+' : '';
      return s + ('00000' + Math.abs(y)).slice(s ? -6 : -4) + '-' + lz(d.getUTCMonth() + 1) + '-' + lz(d.getUTCDate()) + 'T' + lz(d.getUTCHours()) + ':' + lz(d.getUTCMinutes()) + ':' + lz(d.getUTCSeconds()) + '.' + (m > 99 ? m : '0' + lz(m)) + 'Z';
    }});
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/$.task", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.ctx", "npm:core-js@0.9.18/modules/$.cof", "npm:core-js@0.9.18/modules/$.invoke", "npm:core-js@0.9.18/modules/$.dom-create", "github:jspm/nodelibs-process@0.1.2"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    'use strict';
    var $ = require("npm:core-js@0.9.18/modules/$"),
        ctx = require("npm:core-js@0.9.18/modules/$.ctx"),
        cof = require("npm:core-js@0.9.18/modules/$.cof"),
        invoke = require("npm:core-js@0.9.18/modules/$.invoke"),
        cel = require("npm:core-js@0.9.18/modules/$.dom-create"),
        global = $.g,
        isFunction = $.isFunction,
        html = $.html,
        process = global.process,
        setTask = global.setImmediate,
        clearTask = global.clearImmediate,
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
      } else if (global.addEventListener && isFunction(global.postMessage) && !global.importScripts) {
        defer = function(id) {
          global.postMessage(id, '*');
        };
        global.addEventListener('message', listner, false);
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
  })(require("github:jspm/nodelibs-process@0.1.2"));
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/shim", ["npm:core-js@1.2.1/modules/es5", "npm:core-js@1.2.1/modules/es6.symbol", "npm:core-js@1.2.1/modules/es6.object.assign", "npm:core-js@1.2.1/modules/es6.object.is", "npm:core-js@1.2.1/modules/es6.object.set-prototype-of", "npm:core-js@1.2.1/modules/es6.object.to-string", "npm:core-js@1.2.1/modules/es6.object.freeze", "npm:core-js@1.2.1/modules/es6.object.seal", "npm:core-js@1.2.1/modules/es6.object.prevent-extensions", "npm:core-js@1.2.1/modules/es6.object.is-frozen", "npm:core-js@1.2.1/modules/es6.object.is-sealed", "npm:core-js@1.2.1/modules/es6.object.is-extensible", "npm:core-js@1.2.1/modules/es6.object.get-own-property-descriptor", "npm:core-js@1.2.1/modules/es6.object.get-prototype-of", "npm:core-js@1.2.1/modules/es6.object.keys", "npm:core-js@1.2.1/modules/es6.object.get-own-property-names", "npm:core-js@1.2.1/modules/es6.function.name", "npm:core-js@1.2.1/modules/es6.function.has-instance", "npm:core-js@1.2.1/modules/es6.number.constructor", "npm:core-js@1.2.1/modules/es6.number.epsilon", "npm:core-js@1.2.1/modules/es6.number.is-finite", "npm:core-js@1.2.1/modules/es6.number.is-integer", "npm:core-js@1.2.1/modules/es6.number.is-nan", "npm:core-js@1.2.1/modules/es6.number.is-safe-integer", "npm:core-js@1.2.1/modules/es6.number.max-safe-integer", "npm:core-js@1.2.1/modules/es6.number.min-safe-integer", "npm:core-js@1.2.1/modules/es6.number.parse-float", "npm:core-js@1.2.1/modules/es6.number.parse-int", "npm:core-js@1.2.1/modules/es6.math.acosh", "npm:core-js@1.2.1/modules/es6.math.asinh", "npm:core-js@1.2.1/modules/es6.math.atanh", "npm:core-js@1.2.1/modules/es6.math.cbrt", "npm:core-js@1.2.1/modules/es6.math.clz32", "npm:core-js@1.2.1/modules/es6.math.cosh", "npm:core-js@1.2.1/modules/es6.math.expm1", "npm:core-js@1.2.1/modules/es6.math.fround", "npm:core-js@1.2.1/modules/es6.math.hypot", "npm:core-js@1.2.1/modules/es6.math.imul", "npm:core-js@1.2.1/modules/es6.math.log10", "npm:core-js@1.2.1/modules/es6.math.log1p", "npm:core-js@1.2.1/modules/es6.math.log2", "npm:core-js@1.2.1/modules/es6.math.sign", "npm:core-js@1.2.1/modules/es6.math.sinh", "npm:core-js@1.2.1/modules/es6.math.tanh", "npm:core-js@1.2.1/modules/es6.math.trunc", "npm:core-js@1.2.1/modules/es6.string.from-code-point", "npm:core-js@1.2.1/modules/es6.string.raw", "npm:core-js@1.2.1/modules/es6.string.trim", "npm:core-js@1.2.1/modules/es6.string.iterator", "npm:core-js@1.2.1/modules/es6.string.code-point-at", "npm:core-js@1.2.1/modules/es6.string.ends-with", "npm:core-js@1.2.1/modules/es6.string.includes", "npm:core-js@1.2.1/modules/es6.string.repeat", "npm:core-js@1.2.1/modules/es6.string.starts-with", "npm:core-js@1.2.1/modules/es6.array.from", "npm:core-js@1.2.1/modules/es6.array.of", "npm:core-js@1.2.1/modules/es6.array.iterator", "npm:core-js@1.2.1/modules/es6.array.species", "npm:core-js@1.2.1/modules/es6.array.copy-within", "npm:core-js@1.2.1/modules/es6.array.fill", "npm:core-js@1.2.1/modules/es6.array.find", "npm:core-js@1.2.1/modules/es6.array.find-index", "npm:core-js@1.2.1/modules/es6.regexp.constructor", "npm:core-js@1.2.1/modules/es6.regexp.flags", "npm:core-js@1.2.1/modules/es6.regexp.match", "npm:core-js@1.2.1/modules/es6.regexp.replace", "npm:core-js@1.2.1/modules/es6.regexp.search", "npm:core-js@1.2.1/modules/es6.regexp.split", "npm:core-js@1.2.1/modules/es6.promise", "npm:core-js@1.2.1/modules/es6.map", "npm:core-js@1.2.1/modules/es6.set", "npm:core-js@1.2.1/modules/es6.weak-map", "npm:core-js@1.2.1/modules/es6.weak-set", "npm:core-js@1.2.1/modules/es6.reflect.apply", "npm:core-js@1.2.1/modules/es6.reflect.construct", "npm:core-js@1.2.1/modules/es6.reflect.define-property", "npm:core-js@1.2.1/modules/es6.reflect.delete-property", "npm:core-js@1.2.1/modules/es6.reflect.enumerate", "npm:core-js@1.2.1/modules/es6.reflect.get", "npm:core-js@1.2.1/modules/es6.reflect.get-own-property-descriptor", "npm:core-js@1.2.1/modules/es6.reflect.get-prototype-of", "npm:core-js@1.2.1/modules/es6.reflect.has", "npm:core-js@1.2.1/modules/es6.reflect.is-extensible", "npm:core-js@1.2.1/modules/es6.reflect.own-keys", "npm:core-js@1.2.1/modules/es6.reflect.prevent-extensions", "npm:core-js@1.2.1/modules/es6.reflect.set", "npm:core-js@1.2.1/modules/es6.reflect.set-prototype-of", "npm:core-js@1.2.1/modules/es7.array.includes", "npm:core-js@1.2.1/modules/es7.string.at", "npm:core-js@1.2.1/modules/es7.string.pad-left", "npm:core-js@1.2.1/modules/es7.string.pad-right", "npm:core-js@1.2.1/modules/es7.string.trim-left", "npm:core-js@1.2.1/modules/es7.string.trim-right", "npm:core-js@1.2.1/modules/es7.regexp.escape", "npm:core-js@1.2.1/modules/es7.object.get-own-property-descriptors", "npm:core-js@1.2.1/modules/es7.object.values", "npm:core-js@1.2.1/modules/es7.object.entries", "npm:core-js@1.2.1/modules/es7.map.to-json", "npm:core-js@1.2.1/modules/es7.set.to-json", "npm:core-js@1.2.1/modules/js.array.statics", "npm:core-js@1.2.1/modules/web.timers", "npm:core-js@1.2.1/modules/web.immediate", "npm:core-js@1.2.1/modules/web.dom.iterable", "npm:core-js@1.2.1/modules/$.core"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  require("npm:core-js@1.2.1/modules/es5");
  require("npm:core-js@1.2.1/modules/es6.symbol");
  require("npm:core-js@1.2.1/modules/es6.object.assign");
  require("npm:core-js@1.2.1/modules/es6.object.is");
  require("npm:core-js@1.2.1/modules/es6.object.set-prototype-of");
  require("npm:core-js@1.2.1/modules/es6.object.to-string");
  require("npm:core-js@1.2.1/modules/es6.object.freeze");
  require("npm:core-js@1.2.1/modules/es6.object.seal");
  require("npm:core-js@1.2.1/modules/es6.object.prevent-extensions");
  require("npm:core-js@1.2.1/modules/es6.object.is-frozen");
  require("npm:core-js@1.2.1/modules/es6.object.is-sealed");
  require("npm:core-js@1.2.1/modules/es6.object.is-extensible");
  require("npm:core-js@1.2.1/modules/es6.object.get-own-property-descriptor");
  require("npm:core-js@1.2.1/modules/es6.object.get-prototype-of");
  require("npm:core-js@1.2.1/modules/es6.object.keys");
  require("npm:core-js@1.2.1/modules/es6.object.get-own-property-names");
  require("npm:core-js@1.2.1/modules/es6.function.name");
  require("npm:core-js@1.2.1/modules/es6.function.has-instance");
  require("npm:core-js@1.2.1/modules/es6.number.constructor");
  require("npm:core-js@1.2.1/modules/es6.number.epsilon");
  require("npm:core-js@1.2.1/modules/es6.number.is-finite");
  require("npm:core-js@1.2.1/modules/es6.number.is-integer");
  require("npm:core-js@1.2.1/modules/es6.number.is-nan");
  require("npm:core-js@1.2.1/modules/es6.number.is-safe-integer");
  require("npm:core-js@1.2.1/modules/es6.number.max-safe-integer");
  require("npm:core-js@1.2.1/modules/es6.number.min-safe-integer");
  require("npm:core-js@1.2.1/modules/es6.number.parse-float");
  require("npm:core-js@1.2.1/modules/es6.number.parse-int");
  require("npm:core-js@1.2.1/modules/es6.math.acosh");
  require("npm:core-js@1.2.1/modules/es6.math.asinh");
  require("npm:core-js@1.2.1/modules/es6.math.atanh");
  require("npm:core-js@1.2.1/modules/es6.math.cbrt");
  require("npm:core-js@1.2.1/modules/es6.math.clz32");
  require("npm:core-js@1.2.1/modules/es6.math.cosh");
  require("npm:core-js@1.2.1/modules/es6.math.expm1");
  require("npm:core-js@1.2.1/modules/es6.math.fround");
  require("npm:core-js@1.2.1/modules/es6.math.hypot");
  require("npm:core-js@1.2.1/modules/es6.math.imul");
  require("npm:core-js@1.2.1/modules/es6.math.log10");
  require("npm:core-js@1.2.1/modules/es6.math.log1p");
  require("npm:core-js@1.2.1/modules/es6.math.log2");
  require("npm:core-js@1.2.1/modules/es6.math.sign");
  require("npm:core-js@1.2.1/modules/es6.math.sinh");
  require("npm:core-js@1.2.1/modules/es6.math.tanh");
  require("npm:core-js@1.2.1/modules/es6.math.trunc");
  require("npm:core-js@1.2.1/modules/es6.string.from-code-point");
  require("npm:core-js@1.2.1/modules/es6.string.raw");
  require("npm:core-js@1.2.1/modules/es6.string.trim");
  require("npm:core-js@1.2.1/modules/es6.string.iterator");
  require("npm:core-js@1.2.1/modules/es6.string.code-point-at");
  require("npm:core-js@1.2.1/modules/es6.string.ends-with");
  require("npm:core-js@1.2.1/modules/es6.string.includes");
  require("npm:core-js@1.2.1/modules/es6.string.repeat");
  require("npm:core-js@1.2.1/modules/es6.string.starts-with");
  require("npm:core-js@1.2.1/modules/es6.array.from");
  require("npm:core-js@1.2.1/modules/es6.array.of");
  require("npm:core-js@1.2.1/modules/es6.array.iterator");
  require("npm:core-js@1.2.1/modules/es6.array.species");
  require("npm:core-js@1.2.1/modules/es6.array.copy-within");
  require("npm:core-js@1.2.1/modules/es6.array.fill");
  require("npm:core-js@1.2.1/modules/es6.array.find");
  require("npm:core-js@1.2.1/modules/es6.array.find-index");
  require("npm:core-js@1.2.1/modules/es6.regexp.constructor");
  require("npm:core-js@1.2.1/modules/es6.regexp.flags");
  require("npm:core-js@1.2.1/modules/es6.regexp.match");
  require("npm:core-js@1.2.1/modules/es6.regexp.replace");
  require("npm:core-js@1.2.1/modules/es6.regexp.search");
  require("npm:core-js@1.2.1/modules/es6.regexp.split");
  require("npm:core-js@1.2.1/modules/es6.promise");
  require("npm:core-js@1.2.1/modules/es6.map");
  require("npm:core-js@1.2.1/modules/es6.set");
  require("npm:core-js@1.2.1/modules/es6.weak-map");
  require("npm:core-js@1.2.1/modules/es6.weak-set");
  require("npm:core-js@1.2.1/modules/es6.reflect.apply");
  require("npm:core-js@1.2.1/modules/es6.reflect.construct");
  require("npm:core-js@1.2.1/modules/es6.reflect.define-property");
  require("npm:core-js@1.2.1/modules/es6.reflect.delete-property");
  require("npm:core-js@1.2.1/modules/es6.reflect.enumerate");
  require("npm:core-js@1.2.1/modules/es6.reflect.get");
  require("npm:core-js@1.2.1/modules/es6.reflect.get-own-property-descriptor");
  require("npm:core-js@1.2.1/modules/es6.reflect.get-prototype-of");
  require("npm:core-js@1.2.1/modules/es6.reflect.has");
  require("npm:core-js@1.2.1/modules/es6.reflect.is-extensible");
  require("npm:core-js@1.2.1/modules/es6.reflect.own-keys");
  require("npm:core-js@1.2.1/modules/es6.reflect.prevent-extensions");
  require("npm:core-js@1.2.1/modules/es6.reflect.set");
  require("npm:core-js@1.2.1/modules/es6.reflect.set-prototype-of");
  require("npm:core-js@1.2.1/modules/es7.array.includes");
  require("npm:core-js@1.2.1/modules/es7.string.at");
  require("npm:core-js@1.2.1/modules/es7.string.pad-left");
  require("npm:core-js@1.2.1/modules/es7.string.pad-right");
  require("npm:core-js@1.2.1/modules/es7.string.trim-left");
  require("npm:core-js@1.2.1/modules/es7.string.trim-right");
  require("npm:core-js@1.2.1/modules/es7.regexp.escape");
  require("npm:core-js@1.2.1/modules/es7.object.get-own-property-descriptors");
  require("npm:core-js@1.2.1/modules/es7.object.values");
  require("npm:core-js@1.2.1/modules/es7.object.entries");
  require("npm:core-js@1.2.1/modules/es7.map.to-json");
  require("npm:core-js@1.2.1/modules/es7.set.to-json");
  require("npm:core-js@1.2.1/modules/js.array.statics");
  require("npm:core-js@1.2.1/modules/web.timers");
  require("npm:core-js@1.2.1/modules/web.immediate");
  require("npm:core-js@1.2.1/modules/web.dom.iterable");
  module.exports = require("npm:core-js@1.2.1/modules/$.core");
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/es6.promise", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.ctx", "npm:core-js@0.9.18/modules/$.cof", "npm:core-js@0.9.18/modules/$.def", "npm:core-js@0.9.18/modules/$.assert", "npm:core-js@0.9.18/modules/$.for-of", "npm:core-js@0.9.18/modules/$.set-proto", "npm:core-js@0.9.18/modules/$.same", "npm:core-js@0.9.18/modules/$.species", "npm:core-js@0.9.18/modules/$.wks", "npm:core-js@0.9.18/modules/$.uid", "npm:core-js@0.9.18/modules/$.task", "npm:core-js@0.9.18/modules/$.mix", "npm:core-js@0.9.18/modules/$.iter-detect", "github:jspm/nodelibs-process@0.1.2"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    'use strict';
    var $ = require("npm:core-js@0.9.18/modules/$"),
        ctx = require("npm:core-js@0.9.18/modules/$.ctx"),
        cof = require("npm:core-js@0.9.18/modules/$.cof"),
        $def = require("npm:core-js@0.9.18/modules/$.def"),
        assert = require("npm:core-js@0.9.18/modules/$.assert"),
        forOf = require("npm:core-js@0.9.18/modules/$.for-of"),
        setProto = require("npm:core-js@0.9.18/modules/$.set-proto").set,
        same = require("npm:core-js@0.9.18/modules/$.same"),
        species = require("npm:core-js@0.9.18/modules/$.species"),
        SPECIES = require("npm:core-js@0.9.18/modules/$.wks")('species'),
        RECORD = require("npm:core-js@0.9.18/modules/$.uid").safe('record'),
        PROMISE = 'Promise',
        global = $.g,
        process = global.process,
        isNode = cof(process) == 'process',
        asap = process && process.nextTick || require("npm:core-js@0.9.18/modules/$.task").set,
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
        asap.call(global, function() {
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
        asap.call(global, function() {
          if (isUnhandled(promise = record.p)) {
            if (isNode) {
              process.emit('unhandledRejection', value, promise);
            } else if (global.console && console.error) {
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
          asap.call(global, function() {
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
      require("npm:core-js@0.9.18/modules/$.mix")(P.prototype, {
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
    $def($def.S + $def.F * !(useNative && require("npm:core-js@0.9.18/modules/$.iter-detect")(function(iter) {
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
  })(require("github:jspm/nodelibs-process@0.1.2"));
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1/index", ["npm:core-js@1.2.1/shim", "npm:core-js@1.2.1/modules/core.dict", "npm:core-js@1.2.1/modules/core.get-iterator-method", "npm:core-js@1.2.1/modules/core.get-iterator", "npm:core-js@1.2.1/modules/core.is-iterable", "npm:core-js@1.2.1/modules/core.delay", "npm:core-js@1.2.1/modules/core.function.part", "npm:core-js@1.2.1/modules/core.object.is-object", "npm:core-js@1.2.1/modules/core.object.classof", "npm:core-js@1.2.1/modules/core.object.define", "npm:core-js@1.2.1/modules/core.object.make", "npm:core-js@1.2.1/modules/core.number.iterator", "npm:core-js@1.2.1/modules/core.string.escape-html", "npm:core-js@1.2.1/modules/core.string.unescape-html", "npm:core-js@1.2.1/modules/core.log", "npm:core-js@1.2.1/modules/$.core"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  require("npm:core-js@1.2.1/shim");
  require("npm:core-js@1.2.1/modules/core.dict");
  require("npm:core-js@1.2.1/modules/core.get-iterator-method");
  require("npm:core-js@1.2.1/modules/core.get-iterator");
  require("npm:core-js@1.2.1/modules/core.is-iterable");
  require("npm:core-js@1.2.1/modules/core.delay");
  require("npm:core-js@1.2.1/modules/core.function.part");
  require("npm:core-js@1.2.1/modules/core.object.is-object");
  require("npm:core-js@1.2.1/modules/core.object.classof");
  require("npm:core-js@1.2.1/modules/core.object.define");
  require("npm:core-js@1.2.1/modules/core.object.make");
  require("npm:core-js@1.2.1/modules/core.number.iterator");
  require("npm:core-js@1.2.1/modules/core.string.escape-html");
  require("npm:core-js@1.2.1/modules/core.string.unescape-html");
  require("npm:core-js@1.2.1/modules/core.log");
  module.exports = require("npm:core-js@1.2.1/modules/$.core");
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/shim", ["npm:core-js@0.9.18/modules/es5", "npm:core-js@0.9.18/modules/es6.symbol", "npm:core-js@0.9.18/modules/es6.object.assign", "npm:core-js@0.9.18/modules/es6.object.is", "npm:core-js@0.9.18/modules/es6.object.set-prototype-of", "npm:core-js@0.9.18/modules/es6.object.to-string", "npm:core-js@0.9.18/modules/es6.object.statics-accept-primitives", "npm:core-js@0.9.18/modules/es6.function.name", "npm:core-js@0.9.18/modules/es6.function.has-instance", "npm:core-js@0.9.18/modules/es6.number.constructor", "npm:core-js@0.9.18/modules/es6.number.statics", "npm:core-js@0.9.18/modules/es6.math", "npm:core-js@0.9.18/modules/es6.string.from-code-point", "npm:core-js@0.9.18/modules/es6.string.raw", "npm:core-js@0.9.18/modules/es6.string.iterator", "npm:core-js@0.9.18/modules/es6.string.code-point-at", "npm:core-js@0.9.18/modules/es6.string.ends-with", "npm:core-js@0.9.18/modules/es6.string.includes", "npm:core-js@0.9.18/modules/es6.string.repeat", "npm:core-js@0.9.18/modules/es6.string.starts-with", "npm:core-js@0.9.18/modules/es6.array.from", "npm:core-js@0.9.18/modules/es6.array.of", "npm:core-js@0.9.18/modules/es6.array.iterator", "npm:core-js@0.9.18/modules/es6.array.species", "npm:core-js@0.9.18/modules/es6.array.copy-within", "npm:core-js@0.9.18/modules/es6.array.fill", "npm:core-js@0.9.18/modules/es6.array.find", "npm:core-js@0.9.18/modules/es6.array.find-index", "npm:core-js@0.9.18/modules/es6.regexp", "npm:core-js@0.9.18/modules/es6.promise", "npm:core-js@0.9.18/modules/es6.map", "npm:core-js@0.9.18/modules/es6.set", "npm:core-js@0.9.18/modules/es6.weak-map", "npm:core-js@0.9.18/modules/es6.weak-set", "npm:core-js@0.9.18/modules/es6.reflect", "npm:core-js@0.9.18/modules/es7.array.includes", "npm:core-js@0.9.18/modules/es7.string.at", "npm:core-js@0.9.18/modules/es7.string.lpad", "npm:core-js@0.9.18/modules/es7.string.rpad", "npm:core-js@0.9.18/modules/es7.regexp.escape", "npm:core-js@0.9.18/modules/es7.object.get-own-property-descriptors", "npm:core-js@0.9.18/modules/es7.object.to-array", "npm:core-js@0.9.18/modules/es7.map.to-json", "npm:core-js@0.9.18/modules/es7.set.to-json", "npm:core-js@0.9.18/modules/js.array.statics", "npm:core-js@0.9.18/modules/web.timers", "npm:core-js@0.9.18/modules/web.immediate", "npm:core-js@0.9.18/modules/web.dom.iterable", "npm:core-js@0.9.18/modules/$"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  require("npm:core-js@0.9.18/modules/es5");
  require("npm:core-js@0.9.18/modules/es6.symbol");
  require("npm:core-js@0.9.18/modules/es6.object.assign");
  require("npm:core-js@0.9.18/modules/es6.object.is");
  require("npm:core-js@0.9.18/modules/es6.object.set-prototype-of");
  require("npm:core-js@0.9.18/modules/es6.object.to-string");
  require("npm:core-js@0.9.18/modules/es6.object.statics-accept-primitives");
  require("npm:core-js@0.9.18/modules/es6.function.name");
  require("npm:core-js@0.9.18/modules/es6.function.has-instance");
  require("npm:core-js@0.9.18/modules/es6.number.constructor");
  require("npm:core-js@0.9.18/modules/es6.number.statics");
  require("npm:core-js@0.9.18/modules/es6.math");
  require("npm:core-js@0.9.18/modules/es6.string.from-code-point");
  require("npm:core-js@0.9.18/modules/es6.string.raw");
  require("npm:core-js@0.9.18/modules/es6.string.iterator");
  require("npm:core-js@0.9.18/modules/es6.string.code-point-at");
  require("npm:core-js@0.9.18/modules/es6.string.ends-with");
  require("npm:core-js@0.9.18/modules/es6.string.includes");
  require("npm:core-js@0.9.18/modules/es6.string.repeat");
  require("npm:core-js@0.9.18/modules/es6.string.starts-with");
  require("npm:core-js@0.9.18/modules/es6.array.from");
  require("npm:core-js@0.9.18/modules/es6.array.of");
  require("npm:core-js@0.9.18/modules/es6.array.iterator");
  require("npm:core-js@0.9.18/modules/es6.array.species");
  require("npm:core-js@0.9.18/modules/es6.array.copy-within");
  require("npm:core-js@0.9.18/modules/es6.array.fill");
  require("npm:core-js@0.9.18/modules/es6.array.find");
  require("npm:core-js@0.9.18/modules/es6.array.find-index");
  require("npm:core-js@0.9.18/modules/es6.regexp");
  require("npm:core-js@0.9.18/modules/es6.promise");
  require("npm:core-js@0.9.18/modules/es6.map");
  require("npm:core-js@0.9.18/modules/es6.set");
  require("npm:core-js@0.9.18/modules/es6.weak-map");
  require("npm:core-js@0.9.18/modules/es6.weak-set");
  require("npm:core-js@0.9.18/modules/es6.reflect");
  require("npm:core-js@0.9.18/modules/es7.array.includes");
  require("npm:core-js@0.9.18/modules/es7.string.at");
  require("npm:core-js@0.9.18/modules/es7.string.lpad");
  require("npm:core-js@0.9.18/modules/es7.string.rpad");
  require("npm:core-js@0.9.18/modules/es7.regexp.escape");
  require("npm:core-js@0.9.18/modules/es7.object.get-own-property-descriptors");
  require("npm:core-js@0.9.18/modules/es7.object.to-array");
  require("npm:core-js@0.9.18/modules/es7.map.to-json");
  require("npm:core-js@0.9.18/modules/es7.set.to-json");
  require("npm:core-js@0.9.18/modules/js.array.statics");
  require("npm:core-js@0.9.18/modules/web.timers");
  require("npm:core-js@0.9.18/modules/web.immediate");
  require("npm:core-js@0.9.18/modules/web.dom.iterable");
  module.exports = require("npm:core-js@0.9.18/modules/$").core;
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@1.2.1", ["npm:core-js@1.2.1/index"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = require("npm:core-js@1.2.1/index");
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/index", ["npm:core-js@0.9.18/shim", "npm:core-js@0.9.18/modules/core.dict", "npm:core-js@0.9.18/modules/core.iter-helpers", "npm:core-js@0.9.18/modules/core.$for", "npm:core-js@0.9.18/modules/core.delay", "npm:core-js@0.9.18/modules/core.function.part", "npm:core-js@0.9.18/modules/core.object", "npm:core-js@0.9.18/modules/core.array.turn", "npm:core-js@0.9.18/modules/core.number.iterator", "npm:core-js@0.9.18/modules/core.number.math", "npm:core-js@0.9.18/modules/core.string.escape-html", "npm:core-js@0.9.18/modules/core.date", "npm:core-js@0.9.18/modules/core.global", "npm:core-js@0.9.18/modules/core.log", "npm:core-js@0.9.18/modules/$"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  require("npm:core-js@0.9.18/shim");
  require("npm:core-js@0.9.18/modules/core.dict");
  require("npm:core-js@0.9.18/modules/core.iter-helpers");
  require("npm:core-js@0.9.18/modules/core.$for");
  require("npm:core-js@0.9.18/modules/core.delay");
  require("npm:core-js@0.9.18/modules/core.function.part");
  require("npm:core-js@0.9.18/modules/core.object");
  require("npm:core-js@0.9.18/modules/core.array.turn");
  require("npm:core-js@0.9.18/modules/core.number.iterator");
  require("npm:core-js@0.9.18/modules/core.number.math");
  require("npm:core-js@0.9.18/modules/core.string.escape-html");
  require("npm:core-js@0.9.18/modules/core.date");
  require("npm:core-js@0.9.18/modules/core.global");
  require("npm:core-js@0.9.18/modules/core.log");
  module.exports = require("npm:core-js@0.9.18/modules/$").core;
  global.define = __define;
  return module.exports;
});

(function() {
function define(){};  define.amd = {};
System.register("github:aurelia/loader@0.10.0/aurelia-loader", ["npm:core-js@1.2.1", "github:aurelia/path@0.10.0", "github:aurelia/metadata@0.9.0"], false, function(__require, __exports, __module) {
  return (function(exports, _coreJs, _aureliaPath, _aureliaMetadata) {
    'use strict';
    exports.__esModule = true;
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
    var TemplateDependency = function TemplateDependency(src, name) {
      _classCallCheck(this, TemplateDependency);
      this.src = src;
      this.name = name;
    };
    exports.TemplateDependency = TemplateDependency;
    var TemplateRegistryEntry = (function() {
      function TemplateRegistryEntry(address) {
        _classCallCheck(this, TemplateRegistryEntry);
        this.address = address;
        this.template = null;
        this.dependencies = null;
        this.resources = null;
        this.factory = null;
      }
      TemplateRegistryEntry.prototype.setTemplate = function setTemplate(template) {
        var address = this.address;
        var useResources = undefined;
        var current = undefined;
        var src = undefined;
        this.template = template;
        useResources = template.content.querySelectorAll('require');
        this.dependencies = new Array(useResources.length);
        if (useResources.length === 0) {
          return ;
        }
        for (var i = 0,
            ii = useResources.length; i < ii; ++i) {
          current = useResources[i];
          src = current.getAttribute('from');
          if (!src) {
            throw new Error('<require> element in ' + address + ' has no "from" attribute.');
          }
          this.dependencies[i] = new TemplateDependency(_aureliaPath.relativeToFile(src, address), current.getAttribute('as'));
          if (current.parentNode) {
            current.parentNode.removeChild(current);
          }
        }
      };
      TemplateRegistryEntry.prototype.addDependency = function addDependency(src, name) {
        if (typeof src === 'string') {
          this.dependencies.push(new TemplateDependency(_aureliaPath.relativeToFile(src, this.address), name));
        } else if (typeof src === 'function') {
          var origin = _aureliaMetadata.Origin.get(src);
          this.dependencies.push(new TemplateDependency(origin.moduleId, name));
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
        get: function get() {
          return this.template !== null;
        }
      }, {
        key: 'isReady',
        get: function get() {
          return this.factory !== null;
        }
      }]);
      return TemplateRegistryEntry;
    })();
    exports.TemplateRegistryEntry = TemplateRegistryEntry;
    var Loader = (function() {
      function Loader() {
        _classCallCheck(this, Loader);
        this.templateRegistry = {};
      }
      Loader.prototype.map = function map(id, source) {
        throw new Error('Loaders must implement map(id, source).');
      };
      Loader.prototype.normalizeSync = function normalizeSync(moduleId, relativeTo) {
        throw new Error('Loaders must implement normalizeSync(moduleId, relativeTo).');
      };
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
      Loader.prototype.applyPluginToUrl = function applyPluginToUrl(url, pluginName) {
        throw new Error('Loader must implement applyPluginToUrl(url, pluginName).');
      };
      Loader.prototype.addPlugin = function addPlugin(pluginName, implementation) {
        throw new Error('Loader must implement addPlugin(pluginName, implementation).');
      };
      Loader.prototype.getOrCreateTemplateRegistryEntry = function getOrCreateTemplateRegistryEntry(id) {
        var entry = this.templateRegistry[id];
        if (entry === undefined) {
          this.templateRegistry[id] = entry = new TemplateRegistryEntry(id);
        }
        return entry;
      };
      return Loader;
    })();
    exports.Loader = Loader;
  }).call(__exports, __exports, __require('npm:core-js@1.2.1'), __require('github:aurelia/path@0.10.0'), __require('github:aurelia/metadata@0.9.0'));
});
})();
System.register("npm:core-js@0.9.18", ["npm:core-js@0.9.18/index"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = require("npm:core-js@0.9.18/index");
  global.define = __define;
  return module.exports;
});

(function() {
function define(){};  define.amd = {};
System.register("github:aurelia/loader@0.10.0", ["github:aurelia/loader@0.10.0/aurelia-loader"], false, function(__require, __exports, __module) {
  return (function(main) {
    return main;
  }).call(this, __require('github:aurelia/loader@0.10.0/aurelia-loader'));
});
})();
(function() {
function define(){};  define.amd = {};
System.register("github:aurelia/binding@0.10.0/aurelia-binding", ["npm:core-js@0.9.18", "github:aurelia/pal@0.2.0", "github:aurelia/task-queue@0.8.0", "github:aurelia/metadata@0.9.0"], false, function(__require, __exports, __module) {
  return (function(exports, _coreJs, _aureliaPal, _aureliaTaskQueue, _aureliaMetadata) {
    'use strict';
    exports.__esModule = true;
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
    exports.connectable = connectable;
    exports.subscriberCollection = subscriberCollection;
    exports.calcSplices = calcSplices;
    exports.projectArraySplices = projectArraySplices;
    exports.getChangeRecords = getChangeRecords;
    exports.getArrayObserver = _getArrayObserver;
    exports.getMapObserver = _getMapObserver;
    exports.hasDeclaredDependencies = hasDeclaredDependencies;
    exports.declarePropertyDependencies = declarePropertyDependencies;
    exports.valueConverter = valueConverter;
    exports.computedFrom = computedFrom;
    exports.__uninitializeBindingEngine = __uninitializeBindingEngine;
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
        Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
      }
    }
    var sourceContext = 'Binding:source';
    exports.sourceContext = sourceContext;
    var slotNames = [];
    var versionSlotNames = [];
    for (var i = 0; i < 100; i++) {
      slotNames.push('_observer' + i);
      versionSlotNames.push('_observerVersion' + i);
    }
    function addObserver(observer) {
      var observerSlots = this._observerSlots === undefined ? 0 : this._observerSlots;
      var i = observerSlots;
      while (i-- && this[slotNames[i]] !== observer) {}
      if (i === -1) {
        i = 0;
        while (this[slotNames[i]]) {
          i++;
        }
        this[slotNames[i]] = observer;
        observer.subscribe(sourceContext, this);
        if (i === observerSlots) {
          this._observerSlots = i + 1;
        }
      }
      if (this._version === undefined) {
        this._version = 0;
      }
      this[versionSlotNames[i]] = this._version;
    }
    function observeProperty(obj, propertyName) {
      var observer = this.observerLocator.getObserver(obj, propertyName);
      addObserver.call(this, observer);
    }
    function observeArray(array) {
      var observer = this.observerLocator.getArrayObserver(array);
      addObserver.call(this, observer);
    }
    function unobserve(all) {
      var i = this._observerSlots;
      while (i--) {
        if (all || this[versionSlotNames[i]] !== this._version) {
          var observer = this[slotNames[i]];
          this[slotNames[i]] = null;
          if (observer) {
            observer.unsubscribe(sourceContext, this);
          }
        }
      }
    }
    function connectable() {
      return function(target) {
        target.prototype.observeProperty = observeProperty;
        target.prototype.observeArray = observeArray;
        target.prototype.unobserve = unobserve;
      };
    }
    function addSubscriber(context, callable) {
      if (this.hasSubscriber(context, callable)) {
        return false;
      }
      if (!this._context0) {
        this._context0 = context;
        this._callable0 = callable;
        return true;
      }
      if (!this._context1) {
        this._context1 = context;
        this._callable1 = callable;
        return true;
      }
      if (!this._context2) {
        this._context2 = context;
        this._callable2 = callable;
        return true;
      }
      if (!this._contextsRest) {
        this._contextsRest = [context];
        this._callablesRest = [callable];
        return true;
      }
      this._contextsRest.push(context);
      this._callablesRest.push(callable);
      return true;
    }
    function removeSubscriber(context, callable) {
      if (this._context0 === context && this._callable0 === callable) {
        this._context0 = null;
        this._callable0 = null;
        return true;
      }
      if (this._context1 === context && this._callable1 === callable) {
        this._context1 = null;
        this._callable1 = null;
        return true;
      }
      if (this._context2 === context && this._callable2 === callable) {
        this._context2 = null;
        this._callable2 = null;
        return true;
      }
      var rest = this._contextsRest;
      var index = undefined;
      if (!rest || !rest.length || (index = rest.indexOf(context)) === -1 || this._callablesRest[index] !== callable) {
        return false;
      }
      rest.splice(index, 1);
      this._callablesRest.splice(index, 1);
      return true;
    }
    var tempContextsRest = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null];
    var tempCallablesRest = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null];
    function callSubscribers(newValue, oldValue) {
      var context0 = this._context0;
      var callable0 = this._callable0;
      var context1 = this._context1;
      var callable1 = this._callable1;
      var context2 = this._context2;
      var callable2 = this._callable2;
      var length = !this._contextsRest ? 0 : this._contextsRest.length;
      var i = length;
      if (length) {
        while (i--) {
          tempContextsRest[i] = this._contextsRest[i];
          tempCallablesRest[i] = this._callablesRest[i];
        }
      }
      if (context0) {
        if (callable0) {
          callable0.call(context0, newValue, oldValue);
        } else {
          context0(newValue, oldValue);
        }
      }
      if (context1) {
        if (callable1) {
          callable1.call(context1, newValue, oldValue);
        } else {
          context1(newValue, oldValue);
        }
      }
      if (context2) {
        if (callable2) {
          callable2.call(context2, newValue, oldValue);
        } else {
          context2(newValue, oldValue);
        }
      }
      for (i = 0; i < length; i++) {
        var callable = tempCallablesRest[i];
        var context = tempContextsRest[i];
        if (callable) {
          callable.call(context, newValue, oldValue);
        } else {
          context(newValue, oldValue);
        }
        tempContextsRest[i] = null;
        tempCallablesRest[i] = null;
      }
    }
    function hasSubscribers() {
      return !!(this._context0 || this._context1 || this._context2 || this._contextsRest && this._contextsRest.length);
    }
    function hasSubscriber(context, callable) {
      var has = this._context0 === context && this._callable0 === callable || this._context1 === context && this._callable1 === callable || this._context2 === context && this._callable2 === callable;
      if (has) {
        return true;
      }
      var index = undefined;
      var contexts = this._contextsRest;
      if (!contexts || (index = contexts.length) === 0) {
        return false;
      }
      var callables = this._callablesRest;
      while (index--) {
        if (contexts[index] === context && callables[index] === callable) {
          return true;
        }
      }
      return false;
    }
    function subscriberCollection() {
      return function(target) {
        target.prototype.addSubscriber = addSubscriber;
        target.prototype.removeSubscriber = removeSubscriber;
        target.prototype.callSubscribers = callSubscribers;
        target.prototype.hasSubscribers = hasSubscribers;
        target.prototype.hasSubscriber = hasSubscriber;
      };
    }
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
    var EDIT_LEAVE = 0;
    var EDIT_UPDATE = 1;
    var EDIT_ADD = 2;
    var EDIT_DELETE = 3;
    function ArraySplice() {}
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
    var arraySplice = new ArraySplice();
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
    var ModifyCollectionObserver = (function() {
      function ModifyCollectionObserver(taskQueue, collection) {
        _classCallCheck(this, _ModifyCollectionObserver);
        this.taskQueue = taskQueue;
        this.queued = false;
        this.changeRecords = null;
        this.oldCollection = null;
        this.collection = collection;
        this.lengthPropertyName = collection instanceof Map ? 'size' : 'length';
      }
      ModifyCollectionObserver.prototype.subscribe = function subscribe(context, callable) {
        this.addSubscriber(context, callable);
      };
      ModifyCollectionObserver.prototype.unsubscribe = function unsubscribe(context, callable) {
        this.removeSubscriber(context, callable);
      };
      ModifyCollectionObserver.prototype.addChangeRecord = function addChangeRecord(changeRecord) {
        if (!this.hasSubscribers() && !this.lengthObserver) {
          return ;
        }
        if (this.changeRecords === null) {
          this.changeRecords = [changeRecord];
        } else {
          this.changeRecords.push(changeRecord);
        }
        if (!this.queued) {
          this.queued = true;
          this.taskQueue.queueMicroTask(this);
        }
      };
      ModifyCollectionObserver.prototype.reset = function reset(oldCollection) {
        this.oldCollection = oldCollection;
        if (this.hasSubscribers() && !this.queued) {
          this.queued = true;
          this.taskQueue.queueMicroTask(this);
        }
      };
      ModifyCollectionObserver.prototype.getLengthObserver = function getLengthObserver() {
        return this.lengthObserver || (this.lengthObserver = new CollectionLengthObserver(this.collection));
      };
      ModifyCollectionObserver.prototype.call = function call() {
        var changeRecords = this.changeRecords;
        var oldCollection = this.oldCollection;
        var records = undefined;
        this.queued = false;
        this.changeRecords = [];
        this.oldCollection = null;
        if (this.hasSubscribers()) {
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
          this.callSubscribers(records);
        }
        if (this.lengthObserver) {
          this.lengthObserver.call(this.collection[this.lengthPropertyName]);
        }
      };
      var _ModifyCollectionObserver = ModifyCollectionObserver;
      ModifyCollectionObserver = subscriberCollection()(ModifyCollectionObserver) || ModifyCollectionObserver;
      return ModifyCollectionObserver;
    })();
    exports.ModifyCollectionObserver = ModifyCollectionObserver;
    var CollectionLengthObserver = (function() {
      function CollectionLengthObserver(collection) {
        _classCallCheck(this, _CollectionLengthObserver);
        this.collection = collection;
        this.lengthPropertyName = collection instanceof Map ? 'size' : 'length';
        this.currentValue = collection[this.lengthPropertyName];
      }
      CollectionLengthObserver.prototype.getValue = function getValue() {
        return this.collection[this.lengthPropertyName];
      };
      CollectionLengthObserver.prototype.setValue = function setValue(newValue) {
        this.collection[this.lengthPropertyName] = newValue;
      };
      CollectionLengthObserver.prototype.subscribe = function subscribe(context, callable) {
        this.addSubscriber(context, callable);
      };
      CollectionLengthObserver.prototype.unsubscribe = function unsubscribe(context, callable) {
        this.removeSubscriber(context, callable);
      };
      CollectionLengthObserver.prototype.call = function call(newValue) {
        var oldValue = this.currentValue;
        this.callSubscribers(newValue, oldValue);
        this.currentValue = newValue;
      };
      var _CollectionLengthObserver = CollectionLengthObserver;
      CollectionLengthObserver = subscriberCollection()(CollectionLengthObserver) || CollectionLengthObserver;
      return CollectionLengthObserver;
    })();
    exports.CollectionLengthObserver = CollectionLengthObserver;
    var arrayProto = Array.prototype;
    function _getArrayObserver(taskQueue, array) {
      if (_aureliaPal.FEATURE.arrayObserve) {
        return new ArrayObserveObserver(array);
      } else {
        return ModifyArrayObserver.create(taskQueue, array);
      }
    }
    var ModifyArrayObserver = (function(_ModifyCollectionObserver2) {
      _inherits(ModifyArrayObserver, _ModifyCollectionObserver2);
      function ModifyArrayObserver(taskQueue, array) {
        _classCallCheck(this, ModifyArrayObserver);
        _ModifyCollectionObserver2.call(this, taskQueue, array);
      }
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
    var ArrayObserveObserver = (function() {
      function ArrayObserveObserver(array) {
        _classCallCheck(this, _ArrayObserveObserver);
        this.array = array;
      }
      ArrayObserveObserver.prototype.subscribe = function subscribe(context, callable) {
        if (!this.hasSubscribers()) {
          this.handler = this.handleChanges.bind(this);
          Array.observe(this.array, this.handler);
        }
        this.addSubscriber(context, callable);
      };
      ArrayObserveObserver.prototype.unsubscribe = function unsubscribe(context, callable) {
        if (this.removeSubscriber(context, callable) && !this.hasSubscribers()) {
          Array.unobserve(this.array, this.handler);
        }
      };
      ArrayObserveObserver.prototype.getLengthObserver = function getLengthObserver() {
        return this.lengthObserver || (this.lengthObserver = new CollectionLengthObserver(this.array));
      };
      ArrayObserveObserver.prototype.handleChanges = function handleChanges(changeRecords) {
        if (this.hasSubscribers()) {
          var splices = projectArraySplices(this.array, changeRecords);
          this.callSubscribers(splices);
        }
        if (this.lengthObserver) {
          this.lengthObserver.call(this.array.length);
        }
      };
      var _ArrayObserveObserver = ArrayObserveObserver;
      ArrayObserveObserver = subscriberCollection()(ArrayObserveObserver) || ArrayObserveObserver;
      return ArrayObserveObserver;
    })();
    var Expression = (function() {
      function Expression() {
        _classCallCheck(this, Expression);
        this.isChain = false;
        this.isAssignable = false;
      }
      Expression.prototype.evaluate = function evaluate(scope, valueConverters, args) {
        throw new Error('Binding expression "' + this + '" cannot be evaluated.');
      };
      Expression.prototype.assign = function assign(scope, value, valueConverters) {
        throw new Error('Binding expression "' + this + '" cannot be assigned to.');
      };
      Expression.prototype.toString = function toString() {
        return Unparser.unparse(this);
      };
      return Expression;
    })();
    exports.Expression = Expression;
    var Chain = (function(_Expression) {
      _inherits(Chain, _Expression);
      function Chain(expressions) {
        _classCallCheck(this, Chain);
        _Expression.call(this);
        this.expressions = expressions;
        this.isChain = true;
      }
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
    exports.Chain = Chain;
    var ValueConverter = (function(_Expression2) {
      _inherits(ValueConverter, _Expression2);
      function ValueConverter(expression, name, args, allArgs) {
        _classCallCheck(this, ValueConverter);
        _Expression2.call(this);
        this.expression = expression;
        this.name = name;
        this.args = args;
        this.allArgs = allArgs;
      }
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
        var expressions = this.allArgs;
        var i = expressions.length;
        while (i--) {
          expressions[i].connect(binding, scope);
        }
      };
      return ValueConverter;
    })(Expression);
    exports.ValueConverter = ValueConverter;
    var Assign = (function(_Expression3) {
      _inherits(Assign, _Expression3);
      function Assign(target, value) {
        _classCallCheck(this, Assign);
        _Expression3.call(this);
        this.target = target;
        this.value = value;
      }
      Assign.prototype.evaluate = function evaluate(scope, valueConverters) {
        return this.target.assign(scope, this.value.evaluate(scope, valueConverters));
      };
      Assign.prototype.accept = function accept(vistor) {
        vistor.visitAssign(this);
      };
      Assign.prototype.connect = function connect(binding, scope) {};
      return Assign;
    })(Expression);
    exports.Assign = Assign;
    var Conditional = (function(_Expression4) {
      _inherits(Conditional, _Expression4);
      function Conditional(condition, yes, no) {
        _classCallCheck(this, Conditional);
        _Expression4.call(this);
        this.condition = condition;
        this.yes = yes;
        this.no = no;
      }
      Conditional.prototype.evaluate = function evaluate(scope, valueConverters) {
        return !!this.condition.evaluate(scope) ? this.yes.evaluate(scope) : this.no.evaluate(scope);
      };
      Conditional.prototype.accept = function accept(visitor) {
        visitor.visitConditional(this);
      };
      Conditional.prototype.connect = function connect(binding, scope) {
        this.condition.connect(binding, scope);
        if (this.condition.evaluate(scope)) {
          this.yes.connect(binding, scope);
        } else {
          this.no.connect(binding, scope);
        }
      };
      return Conditional;
    })(Expression);
    exports.Conditional = Conditional;
    var AccessScope = (function(_Expression5) {
      _inherits(AccessScope, _Expression5);
      function AccessScope(name) {
        _classCallCheck(this, AccessScope);
        _Expression5.call(this);
        this.name = name;
        this.isAssignable = true;
      }
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
        binding.observeProperty(scope, this.name);
      };
      return AccessScope;
    })(Expression);
    exports.AccessScope = AccessScope;
    var AccessMember = (function(_Expression6) {
      _inherits(AccessMember, _Expression6);
      function AccessMember(object, name) {
        _classCallCheck(this, AccessMember);
        _Expression6.call(this);
        this.object = object;
        this.name = name;
        this.isAssignable = true;
      }
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
        this.object.connect(binding, scope);
        var obj = this.object.evaluate(scope);
        if (obj) {
          binding.observeProperty(obj, this.name);
        }
      };
      return AccessMember;
    })(Expression);
    exports.AccessMember = AccessMember;
    var AccessKeyed = (function(_Expression7) {
      _inherits(AccessKeyed, _Expression7);
      function AccessKeyed(object, key) {
        _classCallCheck(this, AccessKeyed);
        _Expression7.call(this);
        this.object = object;
        this.key = key;
        this.isAssignable = true;
      }
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
        this.object.connect(binding, scope);
        var obj = this.object.evaluate(scope);
        if (obj instanceof Object) {
          this.key.connect(binding, scope);
          var key = this.key.evaluate(scope);
          if (key !== null && key !== undefined) {
            binding.observeProperty(obj, key);
          }
        }
      };
      return AccessKeyed;
    })(Expression);
    exports.AccessKeyed = AccessKeyed;
    var CallScope = (function(_Expression8) {
      _inherits(CallScope, _Expression8);
      function CallScope(name, args) {
        _classCallCheck(this, CallScope);
        _Expression8.call(this);
        this.name = name;
        this.args = args;
      }
      CallScope.prototype.evaluate = function evaluate(scope, valueConverters, args) {
        args = args || evalList(scope, this.args, valueConverters);
        var func = getFunction(scope, this.name);
        if (func) {
          return func.apply(scope, args);
        } else {
          return func;
        }
      };
      CallScope.prototype.accept = function accept(visitor) {
        visitor.visitCallScope(this);
      };
      CallScope.prototype.connect = function connect(binding, scope) {
        var args = this.args;
        var i = args.length;
        while (i--) {
          args[i].connect(binding, scope);
        }
      };
      return CallScope;
    })(Expression);
    exports.CallScope = CallScope;
    var CallMember = (function(_Expression9) {
      _inherits(CallMember, _Expression9);
      function CallMember(object, name, args) {
        _classCallCheck(this, CallMember);
        _Expression9.call(this);
        this.object = object;
        this.name = name;
        this.args = args;
      }
      CallMember.prototype.evaluate = function evaluate(scope, valueConverters, args) {
        var instance = this.object.evaluate(scope, valueConverters);
        args = args || evalList(scope, this.args, valueConverters);
        var func = getFunction(instance, this.name);
        if (func) {
          return func.apply(instance, args);
        } else {
          return func;
        }
      };
      CallMember.prototype.accept = function accept(visitor) {
        visitor.visitCallMember(this);
      };
      CallMember.prototype.connect = function connect(binding, scope) {
        this.object.connect(binding, scope);
        var obj = this.object.evaluate(scope);
        if (getFunction(obj, this.name)) {
          var args = this.args;
          var i = args.length;
          while (i--) {
            args[i].connect(binding, scope);
          }
        }
      };
      return CallMember;
    })(Expression);
    exports.CallMember = CallMember;
    var CallFunction = (function(_Expression10) {
      _inherits(CallFunction, _Expression10);
      function CallFunction(func, args) {
        _classCallCheck(this, CallFunction);
        _Expression10.call(this);
        this.func = func;
        this.args = args;
      }
      CallFunction.prototype.evaluate = function evaluate(scope, valueConverters, args) {
        var func = this.func.evaluate(scope, valueConverters);
        if (typeof func === 'function') {
          return func.apply(null, args || evalList(scope, this.args, valueConverters));
        } else if (func === null || func === undefined) {
          return func;
        } else {
          throw new Error(this.func + ' is not a function');
        }
      };
      CallFunction.prototype.accept = function accept(visitor) {
        visitor.visitCallFunction(this);
      };
      CallFunction.prototype.connect = function connect(binding, scope) {
        this.func.connect(binding, scope);
        var func = this.func.evaluate(scope);
        if (typeof func === 'function') {
          var args = this.args;
          var i = args.length;
          while (i--) {
            args[i].connect(binding, scope);
          }
        }
      };
      return CallFunction;
    })(Expression);
    exports.CallFunction = CallFunction;
    var Binary = (function(_Expression11) {
      _inherits(Binary, _Expression11);
      function Binary(operation, left, right) {
        _classCallCheck(this, Binary);
        _Expression11.call(this);
        this.operation = operation;
        this.left = left;
        this.right = right;
      }
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
        this.left.connect(binding, scope);
        var left = this.left.evaluate(scope);
        if (this.operation === '&&' && !left || this.operation === '||' && left) {
          return ;
        }
        this.right.connect(binding, scope);
      };
      return Binary;
    })(Expression);
    exports.Binary = Binary;
    var PrefixNot = (function(_Expression12) {
      _inherits(PrefixNot, _Expression12);
      function PrefixNot(operation, expression) {
        _classCallCheck(this, PrefixNot);
        _Expression12.call(this);
        this.operation = operation;
        this.expression = expression;
      }
      PrefixNot.prototype.evaluate = function evaluate(scope, valueConverters) {
        return !this.expression.evaluate(scope);
      };
      PrefixNot.prototype.accept = function accept(visitor) {
        visitor.visitPrefix(this);
      };
      PrefixNot.prototype.connect = function connect(binding, scope) {
        this.expression.connect(binding, scope);
      };
      return PrefixNot;
    })(Expression);
    exports.PrefixNot = PrefixNot;
    var LiteralPrimitive = (function(_Expression13) {
      _inherits(LiteralPrimitive, _Expression13);
      function LiteralPrimitive(value) {
        _classCallCheck(this, LiteralPrimitive);
        _Expression13.call(this);
        this.value = value;
      }
      LiteralPrimitive.prototype.evaluate = function evaluate(scope, valueConverters) {
        return this.value;
      };
      LiteralPrimitive.prototype.accept = function accept(visitor) {
        visitor.visitLiteralPrimitive(this);
      };
      LiteralPrimitive.prototype.connect = function connect(binding, scope) {};
      return LiteralPrimitive;
    })(Expression);
    exports.LiteralPrimitive = LiteralPrimitive;
    var LiteralString = (function(_Expression14) {
      _inherits(LiteralString, _Expression14);
      function LiteralString(value) {
        _classCallCheck(this, LiteralString);
        _Expression14.call(this);
        this.value = value;
      }
      LiteralString.prototype.evaluate = function evaluate(scope, valueConverters) {
        return this.value;
      };
      LiteralString.prototype.accept = function accept(visitor) {
        visitor.visitLiteralString(this);
      };
      LiteralString.prototype.connect = function connect(binding, scope) {};
      return LiteralString;
    })(Expression);
    exports.LiteralString = LiteralString;
    var LiteralArray = (function(_Expression15) {
      _inherits(LiteralArray, _Expression15);
      function LiteralArray(elements) {
        _classCallCheck(this, LiteralArray);
        _Expression15.call(this);
        this.elements = elements;
      }
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
        var length = this.elements.length;
        for (var i = 0; i < length; i++) {
          this.elements[i].connect(binding, scope);
        }
      };
      return LiteralArray;
    })(Expression);
    exports.LiteralArray = LiteralArray;
    var LiteralObject = (function(_Expression16) {
      _inherits(LiteralObject, _Expression16);
      function LiteralObject(keys, values) {
        _classCallCheck(this, LiteralObject);
        _Expression16.call(this);
        this.keys = keys;
        this.values = values;
      }
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
        var length = this.keys.length;
        for (var i = 0; i < length; i++) {
          this.values[i].connect(binding, scope);
        }
      };
      return LiteralObject;
    })(Expression);
    exports.LiteralObject = LiteralObject;
    var Unparser = (function() {
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
        var escaped = literal.value.replace(/'/g, "\'");
        this.write('\'' + escaped + '\'');
      };
      return Unparser;
    })();
    exports.Unparser = Unparser;
    var evalListCache = [[], [0], [0, 0], [0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0, 0]];
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
    function getFunction(obj, name) {
      if (obj === null || obj === undefined) {
        return obj;
      }
      var func = obj[name];
      if (typeof func === 'function') {
        return func;
      }
      if (func === null || func === undefined) {
        return func;
      } else {
        throw new Error(name + ' is not a function');
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
    var bindingMode = {
      oneTime: 0,
      oneWay: 1,
      twoWay: 2
    };
    exports.bindingMode = bindingMode;
    var Token = (function() {
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
    exports.Token = Token;
    var Lexer = (function() {
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
    exports.Lexer = Lexer;
    var Scanner = (function() {
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
        var buffer = undefined;
        var marker = this.index;
        while (this.peek !== quote) {
          if (this.peek === $BACKSLASH) {
            if (!buffer) {
              buffer = [];
            }
            buffer.push(this.input.substring(marker, this.index));
            this.advance();
            var _unescaped = undefined;
            if (this.peek === $u) {
              var hex = this.input.substring(this.index + 1, this.index + 5);
              if (!/[A-Z0-9]{4}/.test(hex)) {
                this.error('Invalid unicode escape [\\u' + hex + ']');
              }
              _unescaped = parseInt(hex, 16);
              for (var i = 0; i < 5; ++i) {
                this.advance();
              }
            } else {
              _unescaped = unescape(this.peek);
              this.advance();
            }
            buffer.push(String.fromCharCode(_unescaped));
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
        var offset = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
        var position = this.index + offset;
        throw new Error('Lexer Error: ' + message + ' at column ' + position + ' in expression [' + this.input + ']');
      };
      return Scanner;
    })();
    exports.Scanner = Scanner;
    var OPERATORS = ['undefined', 'null', 'true', 'false', '+', '-', '*', '/', '%', '^', '=', '==', '===', '!=', '!==', '<', '>', '<=', '>=', '&&', '||', '&', '|', '!', '?'];
    var $EOF = 0;
    var $TAB = 9;
    var $LF = 10;
    var $VTAB = 11;
    var $FF = 12;
    var $CR = 13;
    var $SPACE = 32;
    var $BANG = 33;
    var $DQ = 34;
    var $$ = 36;
    var $PERCENT = 37;
    var $AMPERSAND = 38;
    var $SQ = 39;
    var $LPAREN = 40;
    var $RPAREN = 41;
    var $STAR = 42;
    var $PLUS = 43;
    var $COMMA = 44;
    var $MINUS = 45;
    var $PERIOD = 46;
    var $SLASH = 47;
    var $COLON = 58;
    var $SEMICOLON = 59;
    var $LT = 60;
    var $EQ = 61;
    var $GT = 62;
    var $QUESTION = 63;
    var $0 = 48;
    var $9 = 57;
    var $A = 65;
    var $E = 69;
    var $Z = 90;
    var $LBRACKET = 91;
    var $BACKSLASH = 92;
    var $RBRACKET = 93;
    var $CARET = 94;
    var $_ = 95;
    var $a = 97;
    var $e = 101;
    var $f = 102;
    var $n = 110;
    var $r = 114;
    var $t = 116;
    var $u = 117;
    var $v = 118;
    var $z = 122;
    var $LBRACE = 123;
    var $BAR = 124;
    var $RBRACE = 125;
    var $NBSP = 160;
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
        throw message || "Assertion failed";
      }
    }
    var EOF = new Token(-1, null);
    var Parser = (function() {
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
    exports.Parser = Parser;
    var ParserImplementation = (function() {
      function ParserImplementation(lexer, input) {
        _classCallCheck(this, ParserImplementation);
        this.index = 0;
        this.input = input;
        this.tokens = lexer.lex(input);
      }
      ParserImplementation.prototype.parseChain = function parseChain() {
        var isChain = false;
        var expressions = [];
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
          var _name = this.peek.text;
          var args = [];
          this.advance();
          while (this.optional(':')) {
            args.push(this.parseExpression());
          }
          result = new ValueConverter(result, _name, args, [result].concat(args));
        }
        return result;
      };
      ParserImplementation.prototype.parseExpression = function parseExpression() {
        var start = this.peek.index;
        var result = this.parseConditional();
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
        var start = this.peek.index;
        var result = this.parseLogicalOr();
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
            var _name2 = this.peek.text;
            this.advance();
            if (this.optional('(')) {
              var args = this.parseExpressionList(')');
              this.expect(')');
              result = new CallMember(result, _name2, args);
            } else {
              result = new AccessMember(result, _name2);
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
        } else if (this.optional('null')) {
          return new LiteralPrimitive(null);
        } else if (this.optional('undefined')) {
          return new LiteralPrimitive(undefined);
        } else if (this.optional('true')) {
          return new LiteralPrimitive(true);
        } else if (this.optional('false')) {
          return new LiteralPrimitive(false);
        } else if (this.optional('[')) {
          var _elements = this.parseExpressionList(']');
          this.expect(']');
          return new LiteralArray(_elements);
        } else if (this.peek.text == '{') {
          return this.parseObject();
        } else if (this.peek.key != null) {
          return this.parseAccessOrCallScope();
        } else if (this.peek.value != null) {
          var value = this.peek.value;
          this.advance();
          return value instanceof String || typeof value === 'string' ? new LiteralString(value) : new LiteralPrimitive(value);
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
        var keys = [];
        var values = [];
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
        get: function get() {
          return this.index < this.tokens.length ? this.tokens[this.index] : EOF;
        }
      }]);
      return ParserImplementation;
    })();
    exports.ParserImplementation = ParserImplementation;
    var mapProto = Map.prototype;
    function _getMapObserver(taskQueue, map) {
      return ModifyMapObserver.create(taskQueue, map);
    }
    var ModifyMapObserver = (function(_ModifyCollectionObserver3) {
      _inherits(ModifyMapObserver, _ModifyCollectionObserver3);
      function ModifyMapObserver(taskQueue, map) {
        _classCallCheck(this, ModifyMapObserver);
        _ModifyCollectionObserver3.call(this, taskQueue, map);
      }
      ModifyMapObserver.create = function create(taskQueue, map) {
        var observer = new ModifyMapObserver(taskQueue, map);
        map['set'] = function() {
          var oldValue = map.get(arguments[0]);
          var type = typeof oldValue !== 'undefined' ? 'update' : 'add';
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
    function findOriginalEventTarget(event) {
      return event.originalTarget || event.path && event.path[0] || event.deepPath && event.deepPath[0] || event.target || event.srcElement;
    }
    function handleDelegatedEvent(event) {
      var target = findOriginalEventTarget(event);
      var callback = undefined;
      while (target && !callback) {
        if (target.delegatedCallbacks) {
          callback = target.delegatedCallbacks[event.type];
        }
        if (!callback) {
          target = target.parentNode;
        }
      }
      if (callback) {
        callback(event);
      }
    }
    var DelegateHandlerEntry = (function() {
      function DelegateHandlerEntry(eventName) {
        _classCallCheck(this, DelegateHandlerEntry);
        this.eventName = eventName;
        this.count = 0;
      }
      DelegateHandlerEntry.prototype.increment = function increment() {
        this.count++;
        if (this.count === 1) {
          _aureliaPal.DOM.addEventListener(this.eventName, handleDelegatedEvent, false);
        }
      };
      DelegateHandlerEntry.prototype.decrement = function decrement() {
        this.count--;
        if (this.count === 0) {
          _aureliaPal.DOM.removeEventListener(this.eventName, handleDelegatedEvent);
        }
      };
      return DelegateHandlerEntry;
    })();
    var DefaultEventStrategy = (function() {
      function DefaultEventStrategy() {
        _classCallCheck(this, DefaultEventStrategy);
        this.delegatedHandlers = [];
      }
      DefaultEventStrategy.prototype.subscribe = function subscribe(target, targetEvent, callback, delegate) {
        var _this = this;
        if (delegate) {
          var _ret = (function() {
            var delegatedHandlers = _this.delegatedHandlers;
            var handlerEntry = delegatedHandlers[targetEvent] || (delegatedHandlers[targetEvent] = new DelegateHandlerEntry(targetEvent));
            var delegatedCallbacks = target.delegatedCallbacks || (target.delegatedCallbacks = {});
            handlerEntry.increment();
            delegatedCallbacks[targetEvent] = callback;
            return {v: function() {
                handlerEntry.decrement();
                delegatedCallbacks[targetEvent] = null;
              }};
          })();
          if (typeof _ret === 'object')
            return _ret.v;
        } else {
          target.addEventListener(targetEvent, callback, false);
          return function() {
            target.removeEventListener(targetEvent, callback);
          };
        }
      };
      return DefaultEventStrategy;
    })();
    var EventManager = (function() {
      function EventManager() {
        _classCallCheck(this, EventManager);
        this.elementHandlerLookup = {};
        this.eventStrategyLookup = {};
        this.registerElementConfig({
          tagName: 'input',
          properties: {
            value: ['change', 'input'],
            checked: ['change', 'input'],
            files: ['change', 'input']
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
        var tagName = config.tagName.toLowerCase();
        var properties = config.properties;
        var propertyName = undefined;
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
        var tagName = undefined;
        var lookup = this.elementHandlerLookup;
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
    exports.EventManager = EventManager;
    var DirtyChecker = (function() {
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
        var _this2 = this;
        setTimeout(function() {
          return _this2.check();
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
    exports.DirtyChecker = DirtyChecker;
    var DirtyCheckProperty = (function() {
      function DirtyCheckProperty(dirtyChecker, obj, propertyName) {
        _classCallCheck(this, _DirtyCheckProperty);
        this.dirtyChecker = dirtyChecker;
        this.obj = obj;
        this.propertyName = propertyName;
      }
      DirtyCheckProperty.prototype.getValue = function getValue() {
        return this.obj[this.propertyName];
      };
      DirtyCheckProperty.prototype.setValue = function setValue(newValue) {
        this.obj[this.propertyName] = newValue;
      };
      DirtyCheckProperty.prototype.call = function call() {
        var oldValue = this.oldValue;
        var newValue = this.getValue();
        this.callSubscribers(newValue, oldValue);
        this.oldValue = newValue;
      };
      DirtyCheckProperty.prototype.isDirty = function isDirty() {
        return this.oldValue !== this.obj[this.propertyName];
      };
      DirtyCheckProperty.prototype.subscribe = function subscribe(context, callable) {
        if (!this.hasSubscribers()) {
          this.oldValue = this.getValue();
          this.dirtyChecker.addProperty(this);
        }
        this.addSubscriber(context, callable);
      };
      DirtyCheckProperty.prototype.unsubscribe = function unsubscribe(context, callable) {
        if (this.removeSubscriber(context, callable) && !this.hasSubscribers()) {
          this.dirtyChecker.removeProperty(this);
        }
      };
      var _DirtyCheckProperty = DirtyCheckProperty;
      DirtyCheckProperty = subscriberCollection()(DirtyCheckProperty) || DirtyCheckProperty;
      return DirtyCheckProperty;
    })();
    exports.DirtyCheckProperty = DirtyCheckProperty;
    var SetterObserver = (function() {
      function SetterObserver(taskQueue, obj, propertyName) {
        _classCallCheck(this, _SetterObserver);
        this.taskQueue = taskQueue;
        this.obj = obj;
        this.propertyName = propertyName;
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
        var oldValue = this.oldValue;
        var newValue = this.currentValue;
        this.queued = false;
        this.callSubscribers(newValue, oldValue);
      };
      SetterObserver.prototype.subscribe = function subscribe(context, callable) {
        if (!this.observing) {
          this.convertProperty();
        }
        this.addSubscriber(context, callable);
      };
      SetterObserver.prototype.unsubscribe = function unsubscribe(context, callable) {
        this.removeSubscriber(context, callable);
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
      var _SetterObserver = SetterObserver;
      SetterObserver = subscriberCollection()(SetterObserver) || SetterObserver;
      return SetterObserver;
    })();
    exports.SetterObserver = SetterObserver;
    var OoPropertyObserver = (function() {
      function OoPropertyObserver(obj, propertyName) {
        _classCallCheck(this, _OoPropertyObserver);
        this.obj = obj;
        this.propertyName = propertyName;
      }
      OoPropertyObserver.prototype.getValue = function getValue() {
        return this.obj[this.propertyName];
      };
      OoPropertyObserver.prototype.setValue = function setValue(newValue) {
        this.obj[this.propertyName] = newValue;
      };
      OoPropertyObserver.prototype.subscribe = function subscribe(context, callable) {
        if (this.addSubscriber(context, callable)) {
          this.obj.__observer__.subscriberAdded();
        }
      };
      OoPropertyObserver.prototype.unsubscribe = function unsubscribe(context, callable) {
        if (this.removeSubscriber(context, callable)) {
          this.obj.__observer__.subscriberRemoved();
        }
      };
      var _OoPropertyObserver = OoPropertyObserver;
      OoPropertyObserver = subscriberCollection()(OoPropertyObserver) || OoPropertyObserver;
      return OoPropertyObserver;
    })();
    exports.OoPropertyObserver = OoPropertyObserver;
    var version = Number.MIN_SAFE_INTEGER;
    function ooHandler(changes) {
      version++;
      for (var i = 0,
          ii = changes.length; i < ii; i++) {
        var change = changes[i];
        var _name3 = change.name;
        var objectObserver = change.object.__observer__;
        var observer = undefined;
        if (!objectObserver || !(observer = objectObserver.observers[_name3]) || observer.__version === version) {
          continue;
        }
        observer.__version = version;
        observer.callSubscribers(change.object[_name3], change.oldValue);
      }
    }
    var OoObjectObserver = (function() {
      function OoObjectObserver(obj, observerLocator) {
        _classCallCheck(this, OoObjectObserver);
        this.obj = obj;
        this.observerLocator = observerLocator;
        this.observers = {};
        this.subscribers = 0;
      }
      OoObjectObserver.prototype.subscriberAdded = function subscriberAdded() {
        if (this.subscribers === 0) {
          try {
            Object.observe(this.obj, ooHandler, ['update', 'add']);
          } catch (_) {}
        }
        this.subscribers++;
      };
      OoObjectObserver.prototype.subscriberRemoved = function subscriberRemoved(propertyName, callback) {
        this.subscribers--;
        if (this.subscribers === 0) {
          try {
            Object.unobserve(this.obj, ooHandler);
          } catch (_) {}
        }
      };
      OoObjectObserver.prototype.getObserver = function getObserver(propertyName, descriptor) {
        var propertyObserver = this.observers[propertyName];
        if (!propertyObserver) {
          propertyObserver = this.observers[propertyName] = new OoPropertyObserver(this.obj, propertyName);
        }
        return propertyObserver;
      };
      return OoObjectObserver;
    })();
    exports.OoObjectObserver = OoObjectObserver;
    var XLinkAttributeObserver = (function() {
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
      XLinkAttributeObserver.prototype.subscribe = function subscribe() {
        throw new Error('Observation of a "' + this.element.nodeName + '" element\'s "' + this.propertyName + '" property is not supported.');
      };
      return XLinkAttributeObserver;
    })();
    exports.XLinkAttributeObserver = XLinkAttributeObserver;
    var DataAttributeObserver = (function() {
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
      DataAttributeObserver.prototype.subscribe = function subscribe() {
        throw new Error('Observation of a "' + this.element.nodeName + '" element\'s "' + this.propertyName + '" property is not supported.');
      };
      return DataAttributeObserver;
    })();
    exports.DataAttributeObserver = DataAttributeObserver;
    var StyleObserver = (function() {
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
      StyleObserver.prototype.subscribe = function subscribe() {
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
    exports.StyleObserver = StyleObserver;
    var ValueAttributeObserver = (function() {
      function ValueAttributeObserver(element, propertyName, handler) {
        _classCallCheck(this, _ValueAttributeObserver);
        this.element = element;
        this.propertyName = propertyName;
        this.handler = handler;
      }
      ValueAttributeObserver.prototype.getValue = function getValue() {
        return this.element[this.propertyName];
      };
      ValueAttributeObserver.prototype.setValue = function setValue(newValue) {
        this.element[this.propertyName] = newValue === undefined || newValue === null ? '' : newValue;
        this.notify();
      };
      ValueAttributeObserver.prototype.notify = function notify() {
        var oldValue = this.oldValue;
        var newValue = this.getValue();
        this.callSubscribers(newValue, oldValue);
        this.oldValue = newValue;
      };
      ValueAttributeObserver.prototype.subscribe = function subscribe(context, callable) {
        if (!this.hasSubscribers()) {
          this.oldValue = this.getValue();
          this.disposeHandler = this.handler.subscribe(this.element, this.notify.bind(this));
        }
        this.addSubscriber(context, callable);
      };
      ValueAttributeObserver.prototype.unsubscribe = function unsubscribe(context, callable) {
        if (this.removeSubscriber(context, callable) && !this.hasSubscribers()) {
          this.disposeHandler();
          this.disposeHandler = null;
        }
      };
      var _ValueAttributeObserver = ValueAttributeObserver;
      ValueAttributeObserver = subscriberCollection()(ValueAttributeObserver) || ValueAttributeObserver;
      return ValueAttributeObserver;
    })();
    exports.ValueAttributeObserver = ValueAttributeObserver;
    var selectArrayContext = 'SelectValueObserver:array';
    var SelectValueObserver = (function() {
      function SelectValueObserver(element, handler, observerLocator) {
        _classCallCheck(this, _SelectValueObserver);
        this.element = element;
        this.handler = handler;
        this.observerLocator = observerLocator;
      }
      SelectValueObserver.prototype.getValue = function getValue() {
        return this.value;
      };
      SelectValueObserver.prototype.setValue = function setValue(newValue) {
        if (newValue !== null && newValue !== undefined && this.element.multiple && !Array.isArray(newValue)) {
          throw new Error('Only null or Array instances can be bound to a multi-select.');
        }
        if (this.value === newValue) {
          return ;
        }
        if (this.arrayObserver) {
          this.arrayObserver.unsubscribe(selectArrayContext, this);
          this.arrayObserver = null;
        }
        if (Array.isArray(newValue)) {
          this.arrayObserver = this.observerLocator.getArrayObserver(newValue);
          this.arrayObserver.subscribe(selectArrayContext, this);
        }
        this.value = newValue;
        this.synchronizeOptions();
        if (this.element.options.length > 0 && !this.initialSync) {
          this.initialSync = true;
          this.observerLocator.taskQueue.queueMicroTask(this);
        }
      };
      SelectValueObserver.prototype.call = function call(context, splices) {
        this.synchronizeOptions();
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
        this.notify();
      };
      SelectValueObserver.prototype.notify = function notify() {
        var oldValue = this.oldValue;
        var newValue = this.value;
        this.callSubscribers(newValue, oldValue);
      };
      SelectValueObserver.prototype.subscribe = function subscribe(context, callable) {
        if (!this.hasSubscribers()) {
          this.disposeHandler = this.handler.subscribe(this.element, this.synchronizeValue.bind(this, false));
        }
        this.addSubscriber(context, callable);
      };
      SelectValueObserver.prototype.unsubscribe = function unsubscribe(context, callable) {
        if (this.removeSubscriber(context, callable) && !this.hasSubscribers()) {
          this.disposeHandler();
          this.disposeHandler = null;
        }
      };
      SelectValueObserver.prototype.bind = function bind() {
        var _this3 = this;
        this.domObserver = _aureliaPal.DOM.createMutationObserver(function() {
          _this3.synchronizeOptions();
          _this3.synchronizeValue();
        });
        this.domObserver.observe(this.element, {
          childList: true,
          subtree: true
        });
      };
      SelectValueObserver.prototype.unbind = function unbind() {
        this.domObserver.disconnect();
        this.domObserver = null;
        if (this.arrayObserver) {
          this.arrayObserver.unsubscribe(selectArrayContext, this);
          this.arrayObserver = null;
        }
      };
      var _SelectValueObserver = SelectValueObserver;
      SelectValueObserver = subscriberCollection()(SelectValueObserver) || SelectValueObserver;
      return SelectValueObserver;
    })();
    exports.SelectValueObserver = SelectValueObserver;
    var checkedArrayContext = 'CheckedObserver:array';
    var CheckedObserver = (function() {
      function CheckedObserver(element, handler, observerLocator) {
        _classCallCheck(this, _CheckedObserver);
        this.element = element;
        this.handler = handler;
        this.observerLocator = observerLocator;
      }
      CheckedObserver.prototype.getValue = function getValue() {
        return this.value;
      };
      CheckedObserver.prototype.setValue = function setValue(newValue) {
        if (this.value === newValue) {
          return ;
        }
        if (this.arrayObserver) {
          this.arrayObserver.unsubscribe(checkedArrayContext, this);
          this.arrayObserver = null;
        }
        if (this.element.type === 'checkbox' && Array.isArray(newValue)) {
          this.arrayObserver = this.observerLocator.getArrayObserver(newValue);
          this.arrayObserver.subscribe(checkedArrayContext, this);
        }
        this.value = newValue;
        this.synchronizeElement();
        if (!this.element.hasOwnProperty('model') && !this.initialSync) {
          this.initialSync = true;
          this.observerLocator.taskQueue.queueMicroTask(this);
        }
      };
      CheckedObserver.prototype.call = function call(context, splices) {
        this.synchronizeElement();
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
        this.notify();
      };
      CheckedObserver.prototype.notify = function notify() {
        var oldValue = this.oldValue;
        var newValue = this.value;
        this.callSubscribers(newValue, oldValue);
      };
      CheckedObserver.prototype.subscribe = function subscribe(context, callable) {
        if (!this.hasSubscribers()) {
          this.disposeHandler = this.handler.subscribe(this.element, this.synchronizeValue.bind(this, false));
        }
        this.addSubscriber(context, callable);
      };
      CheckedObserver.prototype.unsubscribe = function unsubscribe(context, callable) {
        if (this.removeSubscriber(context, callable) && !this.hasSubscribers()) {
          this.disposeHandler();
          this.disposeHandler = null;
        }
      };
      CheckedObserver.prototype.unbind = function unbind() {
        if (this.arrayObserver) {
          this.arrayObserver.unsubscribe(checkedArrayContext, this);
          this.arrayObserver = null;
        }
      };
      var _CheckedObserver = CheckedObserver;
      CheckedObserver = subscriberCollection()(CheckedObserver) || CheckedObserver;
      return CheckedObserver;
    })();
    exports.CheckedObserver = CheckedObserver;
    var ClassObserver = (function() {
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
            name;
        if (newValue !== null && newValue !== undefined && newValue.length) {
          names = newValue.split(' ');
          for (var i = 0,
              _length = names.length; i < _length; i++) {
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
      ClassObserver.prototype.subscribe = function subscribe() {
        throw new Error('Observation of a "' + this.element.nodeName + '" element\'s "class" property is not supported.');
      };
      return ClassObserver;
    })();
    exports.ClassObserver = ClassObserver;
    var computedContext = 'ComputedPropertyObserver';
    var ComputedPropertyObserver = (function() {
      function ComputedPropertyObserver(obj, propertyName, descriptor, observerLocator) {
        _classCallCheck(this, _ComputedPropertyObserver);
        this.obj = obj;
        this.propertyName = propertyName;
        this.descriptor = descriptor;
        this.observerLocator = observerLocator;
      }
      ComputedPropertyObserver.prototype.getValue = function getValue() {
        return this.obj[this.propertyName];
      };
      ComputedPropertyObserver.prototype.setValue = function setValue(newValue) {
        this.obj[this.propertyName] = newValue;
      };
      ComputedPropertyObserver.prototype.call = function call(context) {
        var newValue = this.getValue();
        if (this.oldValue === newValue)
          return ;
        this.callSubscribers(newValue, this.oldValue);
        this.oldValue = newValue;
        return ;
      };
      ComputedPropertyObserver.prototype.subscribe = function subscribe(context, callable) {
        if (!this.hasSubscribers()) {
          this.oldValue = this.getValue();
          var dependencies = this.descriptor.get.dependencies;
          this.observers = [];
          for (var i = 0,
              ii = dependencies.length; i < ii; i++) {
            var observer = this.observerLocator.getObserver(this.obj, dependencies[i]);
            this.observers.push(observer);
            observer.subscribe(computedContext, this);
          }
        }
        this.addSubscriber(context, callable);
      };
      ComputedPropertyObserver.prototype.unsubscribe = function unsubscribe(context, callable) {
        if (this.removeSubscriber(context, callable) && !this.hasSubscribers()) {
          this.oldValue = undefined;
          var i = this.observers.length;
          while (i--) {
            this.observers[i].unsubscribe(computedContext, this);
          }
          this.observers = null;
        }
      };
      var _ComputedPropertyObserver = ComputedPropertyObserver;
      ComputedPropertyObserver = subscriberCollection()(ComputedPropertyObserver) || ComputedPropertyObserver;
      return ComputedPropertyObserver;
    })();
    exports.ComputedPropertyObserver = ComputedPropertyObserver;
    function hasDeclaredDependencies(descriptor) {
      return descriptor && descriptor.get && descriptor.get.dependencies && descriptor.get.dependencies.length > 0;
    }
    function declarePropertyDependencies(ctor, propertyName, dependencies) {
      var descriptor = Object.getOwnPropertyDescriptor(ctor.prototype, propertyName);
      descriptor.get.dependencies = dependencies;
    }
    var elements = {
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
    exports.elements = elements;
    var presentationElements = {
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
    exports.presentationElements = presentationElements;
    var presentationAttributes = {
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
    exports.presentationAttributes = presentationAttributes;
    function createElement(html) {
      var div = _aureliaPal.DOM.createElement('div');
      div.innerHTML = html;
      return div.firstChild;
    }
    var SVGAnalyzer = (function() {
      function SVGAnalyzer() {
        _classCallCheck(this, SVGAnalyzer);
        if (createElement('<svg><altGlyph /></svg>').firstElementChild.nodeName === 'altglyph' && elements.altGlyph) {
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
      SVGAnalyzer.prototype.isStandardSvgAttribute = function isStandardSvgAttribute(nodeName, attributeName) {
        return presentationElements[nodeName] && presentationAttributes[attributeName] || elements[nodeName] && elements[nodeName].indexOf(attributeName) !== -1;
      };
      return SVGAnalyzer;
    })();
    exports.SVGAnalyzer = SVGAnalyzer;
    function createObserverLookup(obj, observerLocator) {
      var value = new OoObjectObserver(obj, observerLocator);
      try {
        Object.defineProperty(obj, "__observer__", {
          enumerable: false,
          configurable: false,
          writable: false,
          value: value
        });
      } catch (_) {}
      return value;
    }
    var ObserverLocator = (function() {
      _createClass(ObserverLocator, null, [{
        key: 'inject',
        value: [_aureliaTaskQueue.TaskQueue, EventManager, DirtyChecker, SVGAnalyzer],
        enumerable: true
      }]);
      function ObserverLocator(taskQueue, eventManager, dirtyChecker, svgAnalyzer) {
        _classCallCheck(this, ObserverLocator);
        this.taskQueue = taskQueue;
        this.eventManager = eventManager;
        this.dirtyChecker = dirtyChecker;
        this.svgAnalyzer = svgAnalyzer;
        this.adapters = [];
      }
      ObserverLocator.prototype.getObserver = function getObserver(obj, propertyName) {
        var observersLookup = obj.__observers__;
        var observer = undefined;
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
          Object.defineProperty(obj, "__observers__", {
            enumerable: false,
            configurable: false,
            writable: false,
            value: value
          });
        } catch (_) {}
        return value;
      };
      ObserverLocator.prototype.addAdapter = function addAdapter(adapter) {
        this.adapters.push(adapter);
      };
      ObserverLocator.prototype.getAdapterObserver = function getAdapterObserver(obj, propertyName, descriptor) {
        for (var i = 0,
            ii = this.adapters.length; i < ii; i++) {
          var adapter = this.adapters[i];
          var observer = adapter.getObserver(obj, propertyName, descriptor);
          if (observer) {
            return observer;
          }
        }
        return null;
      };
      ObserverLocator.prototype.createPropertyObserver = function createPropertyObserver(obj, propertyName) {
        var observerLookup = undefined;
        var descriptor = undefined;
        var handler = undefined;
        var xlinkResult = undefined;
        if (obj instanceof _aureliaPal.DOM.Element) {
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
          if (/^\w+:|^data-|^aria-/.test(propertyName) || obj instanceof _aureliaPal.DOM.SVGElement && this.svgAnalyzer.isStandardSvgAttribute(obj.nodeName, propertyName)) {
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
          var adapterObserver = this.getAdapterObserver(obj, propertyName, descriptor);
          if (adapterObserver) {
            return adapterObserver;
          }
          return new DirtyCheckProperty(this.dirtyChecker, obj, propertyName);
        }
        if (_aureliaPal.FEATURE.objectObserve) {
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
    exports.ObserverLocator = ObserverLocator;
    var ObjectObservationAdapter = (function() {
      function ObjectObservationAdapter() {
        _classCallCheck(this, ObjectObservationAdapter);
      }
      ObjectObservationAdapter.prototype.getObserver = function getObserver(object, propertyName, descriptor) {
        throw new Error('BindingAdapters must implement getObserver(object, propertyName).');
      };
      return ObjectObservationAdapter;
    })();
    exports.ObjectObservationAdapter = ObjectObservationAdapter;
    var BindingExpression = (function() {
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
    exports.BindingExpression = BindingExpression;
    var targetContext = 'Binding:target';
    var Binding = (function() {
      function Binding(observerLocator, sourceExpression, target, targetProperty, mode, valueConverterLookupFunction) {
        _classCallCheck(this, _Binding);
        this.observerLocator = observerLocator;
        this.sourceExpression = sourceExpression;
        this.targetProperty = observerLocator.getObserver(target, targetProperty);
        this.mode = mode;
        this.valueConverterLookupFunction = valueConverterLookupFunction;
      }
      Binding.prototype.call = function call(context, newValue, oldValue) {
        if (context === sourceContext) {
          oldValue = this.targetProperty.getValue();
          newValue = this.sourceExpression.evaluate(this.source, this.valueConverterLookupFunction);
          if (newValue !== oldValue) {
            this.targetProperty.setValue(newValue);
          }
          this._version++;
          this.sourceExpression.connect(this, this.source);
          this.unobserve(false);
          return ;
        }
        if (context === targetContext) {
          this.sourceExpression.assign(this.source, newValue, this.valueConverterLookupFunction);
          return ;
        }
        throw new Error('Unexpected call context ' + context);
      };
      Binding.prototype.bind = function bind(source) {
        if (this.isBound) {
          if (this.source === source) {
            return ;
          }
          this.unbind();
        }
        this.isBound = true;
        this.source = source;
        var targetProperty = this.targetProperty;
        if ('bind' in targetProperty) {
          targetProperty.bind();
        }
        var mode = this.mode;
        if (mode === bindingMode.oneWay || mode === bindingMode.twoWay) {
          this.sourceExpression.connect(this, source);
          if (mode === bindingMode.twoWay) {
            targetProperty.subscribe(targetContext, this);
          }
        }
        var value = this.sourceExpression.evaluate(source, this.valueConverterLookupFunction);
        targetProperty.setValue(value);
      };
      Binding.prototype.unbind = function unbind() {
        this.isBound = false;
        this.source = null;
        if ('unbind' in this.targetProperty) {
          this.targetProperty.unbind();
        }
        if (this.mode === bindingMode.twoWay) {
          this.targetProperty.unsubscribe(targetContext, this);
        }
        this.unobserve(true);
      };
      var _Binding = Binding;
      Binding = connectable()(Binding) || Binding;
      return Binding;
    })();
    var CallExpression = (function() {
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
    exports.CallExpression = CallExpression;
    var Call = (function() {
      function Call(observerLocator, sourceExpression, target, targetProperty, valueConverterLookupFunction) {
        _classCallCheck(this, Call);
        this.sourceExpression = sourceExpression;
        this.target = target;
        this.targetProperty = observerLocator.getObserver(target, targetProperty);
        this.valueConverterLookupFunction = valueConverterLookupFunction;
      }
      Call.prototype.bind = function bind(source) {
        var _this4 = this;
        if (this.source) {
          if (this.source === source) {
            return ;
          }
          this.unbind();
        }
        this.source = source;
        this.targetProperty.setValue(function($event) {
          var result = undefined;
          var temp = source.$event;
          source.$event = $event;
          result = _this4.sourceExpression.evaluate(source, _this4.valueConverterLookupFunction);
          source.$event = temp;
          return result;
        });
      };
      Call.prototype.unbind = function unbind() {
        if (this.source) {
          this.targetProperty.setValue(null);
          this.source = null;
        }
      };
      return Call;
    })();
    function camelCase(name) {
      return name.charAt(0).toLowerCase() + name.slice(1);
    }
    var ValueConverterResource = (function() {
      function ValueConverterResource(name) {
        _classCallCheck(this, ValueConverterResource);
        this.name = name;
      }
      ValueConverterResource.convention = function convention(name) {
        if (name.endsWith('ValueConverter')) {
          return new ValueConverterResource(camelCase(name.substring(0, name.length - 14)));
        }
      };
      ValueConverterResource.prototype.initialize = function initialize(container, target) {
        this.instance = container.get(target);
      };
      ValueConverterResource.prototype.register = function register(registry, name) {
        registry.registerValueConverter(name || this.name, this.instance);
      };
      ValueConverterResource.prototype.load = function load(container, target) {};
      return ValueConverterResource;
    })();
    exports.ValueConverterResource = ValueConverterResource;
    function valueConverter(nameOrTarget) {
      if (nameOrTarget === undefined || typeof nameOrTarget === 'string') {
        return function(target) {
          _aureliaMetadata.metadata.define(_aureliaMetadata.metadata.resource, new ValueConverterResource(nameOrTarget), target);
        };
      }
      _aureliaMetadata.metadata.define(_aureliaMetadata.metadata.resource, new ValueConverterResource(), nameOrTarget);
    }
    _aureliaMetadata.decorators.configure.parameterizedDecorator('valueConverter', valueConverter);
    function computedFrom() {
      for (var _len = arguments.length,
          rest = Array(_len),
          _key = 0; _key < _len; _key++) {
        rest[_key] = arguments[_key];
      }
      return function(target, key, descriptor) {
        descriptor.get.dependencies = rest;
        return descriptor;
      };
    }
    var ListenerExpression = (function() {
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
    exports.ListenerExpression = ListenerExpression;
    var Listener = (function() {
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
        var _this5 = this;
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
          var result = _this5.sourceExpression.evaluate(source);
          source.$event = prevEvent;
          if (result !== true && _this5.preventDefault) {
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
    function getAU(element) {
      var au = element.au;
      if (au === undefined) {
        throw new Error('No Aurelia APIs are defined for the referenced element.');
      }
      return au;
    }
    var NameExpression = (function() {
      function NameExpression(property, apiName) {
        _classCallCheck(this, NameExpression);
        this.property = property;
        this.apiName = apiName;
        this.discrete = true;
      }
      NameExpression.prototype.createBinding = function createBinding(target) {
        return new NameBinder(this.property, NameExpression.locateAPI(target, this.apiName));
      };
      NameExpression.locateAPI = function locateAPI(element, apiName) {
        switch (apiName) {
          case 'element':
            return element;
          case 'controller':
            return getAU(element).controller;
          case 'model':
          case 'view-model':
            return getAU(element).controller.model;
          case 'view':
            return getAU(element).controller.view;
          default:
            var target = getAU(element)[apiName];
            if (target === undefined) {
              throw new Error('Attempted to reference "' + apiName + '", but it was not found amongst the target\'s API.');
            }
            return target.model;
        }
      };
      return NameExpression;
    })();
    exports.NameExpression = NameExpression;
    var NameBinder = (function() {
      function NameBinder(property, target) {
        _classCallCheck(this, NameBinder);
        this.property = property;
        this.target = target;
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
        if (this.source) {
          this.source[this.property] = null;
          this.source = null;
        }
      };
      return NameBinder;
    })();
    var valueConverterLookupFunction = function valueConverterLookupFunction() {
      return null;
    };
    var taskQueue = undefined;
    var eventManager = undefined;
    var dirtyChecker = undefined;
    var observerLocator = undefined;
    var parser = undefined;
    var __initialized = false;
    exports.__initialized = __initialized;
    function initialize() {
      var container = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
      container = container || {get: function get() {
          return null;
        }};
      taskQueue = container.get(_aureliaTaskQueue.TaskQueue) || new _aureliaTaskQueue.TaskQueue();
      eventManager = container.get(EventManager) || new EventManager();
      dirtyChecker = container.get(DirtyChecker) || new DirtyChecker();
      observerLocator = container.get(ObserverLocator) || new ObserverLocator(taskQueue, eventManager, dirtyChecker);
      parser = container.get(Parser) || new Parser();
      exports.__initialized = __initialized = true;
    }
    function __uninitializeBindingEngine() {
      taskQueue = null;
      eventManager = null;
      dirtyChecker = null;
      observerLocator = null;
      parser = null;
      exports.__initialized = __initialized = false;
    }
    function assertInitialized() {
      if (!__initialized) {
        initialize();
      }
    }
    var bindingEngine = {
      initialize: initialize,
      createBindingExpression: function createBindingExpression(targetProperty, sourceExpression) {
        var mode = arguments.length <= 2 || arguments[2] === undefined ? bindingMode.oneWay : arguments[2];
        assertInitialized();
        return new BindingExpression(observerLocator, targetProperty, parser.parse(sourceExpression), mode, valueConverterLookupFunction);
      },
      propertyObserver: function propertyObserver(obj, propertyName) {
        return {subscribe: function subscribe(callback) {
            assertInitialized();
            var observer = observerLocator.getObserver(obj, propertyName);
            observer.subscribe(callback);
            return {dispose: function dispose() {
                return observer.unsubscribe(callback);
              }};
          }};
      },
      collectionObserver: function collectionObserver(collection) {
        return {subscribe: function subscribe(callback) {
            assertInitialized();
            var observer = undefined;
            if (collection instanceof Array) {
              observer = observerLocator.getArrayObserver(collection);
            } else if (collection instanceof Map) {
              observer = observerLocator.getMapObserver(collection);
            } else {
              throw new Error('collection must be an instance of Array or Map.');
            }
            observer.subscribe(callback);
            return {dispose: function dispose() {
                return observer.unsubscribe(callback);
              }};
          }};
      },
      expressionObserver: function expressionObserver(scope, expression) {
        assertInitialized();
        return new ExpressionObserver(scope, parser.parse(expression));
      },
      parseExpression: function parseExpression(expression) {
        assertInitialized();
        return parser.parse(expression);
      },
      registerAdapter: function registerAdapter(adapter) {
        assertInitialized();
        observerLocator.addAdapter(adapter);
      }
    };
    exports.bindingEngine = bindingEngine;
    var ExpressionObserver = (function() {
      function ExpressionObserver(scope, expression) {
        _classCallCheck(this, _ExpressionObserver);
        this.scope = scope;
        this.expression = expression;
        this.observerLocator = observerLocator;
      }
      ExpressionObserver.prototype.subscribe = function subscribe(callback) {
        var _this6 = this;
        if (!this.hasSubscribers()) {
          this.oldValue = this.expression.evaluate(this.scope, valueConverterLookupFunction);
          this.expression.connect(this, this.scope);
        }
        this.addSubscriber(callback);
        return {dispose: function dispose() {
            if (_this6.removeSubscriber(callback) && !_this6.hasSubscribers()) {
              _this6.unobserve(true);
            }
          }};
      };
      ExpressionObserver.prototype.call = function call() {
        var newValue = this.expression.evaluate(this.scope, valueConverterLookupFunction);
        var oldValue = this.oldValue;
        if (newValue !== oldValue) {
          this.oldValue = newValue;
          this.callSubscribers(newValue, oldValue);
        }
        this._version++;
        this.expression.connect(this, this.scope);
        this.unobserve(false);
      };
      var _ExpressionObserver = ExpressionObserver;
      ExpressionObserver = subscriberCollection()(ExpressionObserver) || ExpressionObserver;
      ExpressionObserver = connectable()(ExpressionObserver) || ExpressionObserver;
      return ExpressionObserver;
    })();
  }).call(__exports, __exports, __require('npm:core-js@0.9.18'), __require('github:aurelia/pal@0.2.0'), __require('github:aurelia/task-queue@0.8.0'), __require('github:aurelia/metadata@0.9.0'));
});
})();
(function() {
function define(){};  define.amd = {};
System.register("github:aurelia/templating@0.16.0/aurelia-templating", ["npm:core-js@0.9.18", "github:aurelia/logging@0.8.0", "github:aurelia/metadata@0.9.0", "github:aurelia/path@0.10.0", "github:aurelia/loader@0.10.0", "github:aurelia/pal@0.2.0", "github:aurelia/binding@0.10.0", "github:aurelia/dependency-injection@0.11.0", "github:aurelia/task-queue@0.8.0"], false, function(__require, __exports, __module) {
  return (function(exports, _coreJs, _aureliaLogging, _aureliaMetadata, _aureliaPath, _aureliaLoader, _aureliaPal, _aureliaBinding, _aureliaDependencyInjection, _aureliaTaskQueue) {
    'use strict';
    exports.__esModule = true;
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
    exports.hyphenate = hyphenate;
    exports.resource = resource;
    exports.behavior = behavior;
    exports.customElement = customElement;
    exports.customAttribute = customAttribute;
    exports.templateController = templateController;
    exports.bindable = bindable;
    exports.dynamicOptions = dynamicOptions;
    exports.sync = sync;
    exports.useShadowDOM = useShadowDOM;
    exports.processContent = processContent;
    exports.containerless = containerless;
    exports.viewStrategy = viewStrategy;
    exports.useView = useView;
    exports.inlineView = inlineView;
    exports.noView = noView;
    exports.elementConfig = elementConfig;
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
        Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
      }
    }
    var animationEvent = {
      enterBegin: 'animation:enter:begin',
      enterActive: 'animation:enter:active',
      enterDone: 'animation:enter:done',
      enterTimeout: 'animation:enter:timeout',
      leaveBegin: 'animation:leave:begin',
      leaveActive: 'animation:leave:active',
      leaveDone: 'animation:leave:done',
      leaveTimeout: 'animation:leave:timeout',
      staggerNext: 'animation:stagger:next',
      removeClassBegin: 'animation:remove-class:begin',
      removeClassActive: 'animation:remove-class:active',
      removeClassDone: 'animation:remove-class:done',
      removeClassTimeout: 'animation:remove-class:timeout',
      addClassBegin: 'animation:add-class:begin',
      addClassActive: 'animation:add-class:active',
      addClassDone: 'animation:add-class:done',
      addClassTimeout: 'animation:add-class:timeout',
      animateBegin: 'animation:animate:begin',
      animateActive: 'animation:animate:active',
      animateDone: 'animation:animate:done',
      animateTimeout: 'animation:animate:timeout',
      sequenceBegin: 'animation:sequence:begin',
      sequenceDone: 'animation:sequence:done'
    };
    exports.animationEvent = animationEvent;
    var Animator = (function() {
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
        element.classList.remove(className);
        return Promise.resolve(false);
      };
      Animator.prototype.addClass = function addClass(element, className) {
        element.classList.add(className);
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
    exports.Animator = Animator;
    var capitalMatcher = /([A-Z])/g;
    function addHyphenAndLower(char) {
      return '-' + char.toLowerCase();
    }
    function hyphenate(name) {
      return (name.charAt(0).toLowerCase() + name.slice(1)).replace(capitalMatcher, addHyphenAndLower);
    }
    var ResourceLoadContext = (function() {
      function ResourceLoadContext() {
        _classCallCheck(this, ResourceLoadContext);
        this.dependencies = {};
      }
      ResourceLoadContext.prototype.addDependency = function addDependency(url) {
        this.dependencies[url] = true;
      };
      ResourceLoadContext.prototype.doesNotHaveDependency = function doesNotHaveDependency(url) {
        return !(url in this.dependencies);
      };
      return ResourceLoadContext;
    })();
    exports.ResourceLoadContext = ResourceLoadContext;
    var ViewCompileInstruction = (function() {
      _createClass(ViewCompileInstruction, null, [{
        key: 'normal',
        value: new ViewCompileInstruction(),
        enumerable: true
      }]);
      function ViewCompileInstruction() {
        var targetShadowDOM = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];
        var compileSurrogate = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
        _classCallCheck(this, ViewCompileInstruction);
        this.targetShadowDOM = targetShadowDOM;
        this.compileSurrogate = compileSurrogate;
        this.associatedModuleId = null;
      }
      return ViewCompileInstruction;
    })();
    exports.ViewCompileInstruction = ViewCompileInstruction;
    var BehaviorInstruction = (function() {
      BehaviorInstruction.element = function element(node, type) {
        var instruction = new BehaviorInstruction(true);
        instruction.type = type;
        instruction.attributes = {};
        instruction.anchorIsContainer = !(node.hasAttribute('containerless') || type.containerless);
        instruction.initiatedByBehavior = true;
        return instruction;
      };
      BehaviorInstruction.attribute = function attribute(attrName, type) {
        var instruction = new BehaviorInstruction(true);
        instruction.attrName = attrName;
        instruction.type = type || null;
        instruction.attributes = {};
        return instruction;
      };
      BehaviorInstruction.dynamic = function dynamic(host, bindingContext, viewFactory) {
        var instruction = new BehaviorInstruction(true);
        instruction.host = host;
        instruction.bindingContext = bindingContext;
        instruction.viewFactory = viewFactory;
        return instruction;
      };
      _createClass(BehaviorInstruction, null, [{
        key: 'normal',
        value: new BehaviorInstruction(),
        enumerable: true
      }, {
        key: 'contentSelector',
        value: new BehaviorInstruction(true),
        enumerable: true
      }]);
      function BehaviorInstruction() {
        var suppressBind = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];
        _classCallCheck(this, BehaviorInstruction);
        this.suppressBind = suppressBind;
        this.initiatedByBehavior = false;
        this.systemControlled = false;
        this.enhance = false;
        this.partReplacements = null;
        this.viewFactory = null;
        this.originalAttrName = null;
        this.skipContentProcessing = false;
        this.contentFactory = null;
        this.bindingContext = null;
        this.anchorIsContainer = false;
        this.host = null;
        this.attributes = null;
        this.type = null;
        this.attrName = null;
      }
      return BehaviorInstruction;
    })();
    exports.BehaviorInstruction = BehaviorInstruction;
    var TargetInstruction = (function() {
      TargetInstruction.contentSelector = function contentSelector(node, parentInjectorId) {
        var instruction = new TargetInstruction();
        instruction.parentInjectorId = parentInjectorId;
        instruction.contentSelector = true;
        instruction.selector = node.getAttribute('select');
        instruction.suppressBind = true;
        return instruction;
      };
      TargetInstruction.contentExpression = function contentExpression(expression) {
        var instruction = new TargetInstruction();
        instruction.contentExpression = expression;
        return instruction;
      };
      TargetInstruction.lifting = function lifting(parentInjectorId, liftingInstruction) {
        var instruction = new TargetInstruction();
        instruction.parentInjectorId = parentInjectorId;
        instruction.expressions = TargetInstruction.noExpressions;
        instruction.behaviorInstructions = [liftingInstruction];
        instruction.viewFactory = liftingInstruction.viewFactory;
        instruction.providers = [liftingInstruction.type.target];
        return instruction;
      };
      TargetInstruction.normal = function normal(injectorId, parentInjectorId, providers, behaviorInstructions, expressions, elementInstruction) {
        var instruction = new TargetInstruction();
        instruction.injectorId = injectorId;
        instruction.parentInjectorId = parentInjectorId;
        instruction.providers = providers;
        instruction.behaviorInstructions = behaviorInstructions;
        instruction.expressions = expressions;
        instruction.anchorIsContainer = elementInstruction ? elementInstruction.anchorIsContainer : true;
        instruction.elementInstruction = elementInstruction;
        return instruction;
      };
      TargetInstruction.surrogate = function surrogate(providers, behaviorInstructions, expressions, values) {
        var instruction = new TargetInstruction();
        instruction.expressions = expressions;
        instruction.behaviorInstructions = behaviorInstructions;
        instruction.providers = providers;
        instruction.values = values;
        return instruction;
      };
      _createClass(TargetInstruction, null, [{
        key: 'noExpressions',
        value: Object.freeze([]),
        enumerable: true
      }]);
      function TargetInstruction() {
        _classCallCheck(this, TargetInstruction);
        this.injectorId = null;
        this.parentInjectorId = null;
        this.contentSelector = false;
        this.selector = null;
        this.suppressBind = false;
        this.contentExpression = null;
        this.expressions = null;
        this.behaviorInstructions = null;
        this.providers = null;
        this.viewFactory = null;
        this.anchorIsContainer = false;
        this.elementInstruction = null;
        this.values = null;
      }
      return TargetInstruction;
    })();
    exports.TargetInstruction = TargetInstruction;
    var ViewStrategy = (function() {
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
        var strategy = undefined;
        var annotation = undefined;
        if (typeof target !== 'function') {
          target = target.constructor;
        }
        annotation = _aureliaMetadata.Origin.get(target);
        strategy = _aureliaMetadata.metadata.get(ViewStrategy.metadataKey, target);
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
    exports.ViewStrategy = ViewStrategy;
    var UseViewStrategy = (function(_ViewStrategy) {
      _inherits(UseViewStrategy, _ViewStrategy);
      function UseViewStrategy(path) {
        _classCallCheck(this, UseViewStrategy);
        _ViewStrategy.call(this);
        this.path = path;
      }
      UseViewStrategy.prototype.loadViewFactory = function loadViewFactory(viewEngine, compileInstruction, loadContext) {
        if (!this.absolutePath && this.moduleId) {
          this.absolutePath = _aureliaPath.relativeToFile(this.path, this.moduleId);
        }
        compileInstruction.associatedModuleId = this.moduleId;
        return viewEngine.loadViewFactory(this.absolutePath || this.path, compileInstruction, loadContext);
      };
      UseViewStrategy.prototype.makeRelativeTo = function makeRelativeTo(file) {
        this.absolutePath = _aureliaPath.relativeToFile(this.path, file);
      };
      return UseViewStrategy;
    })(ViewStrategy);
    exports.UseViewStrategy = UseViewStrategy;
    var ConventionalViewStrategy = (function(_ViewStrategy2) {
      _inherits(ConventionalViewStrategy, _ViewStrategy2);
      function ConventionalViewStrategy(moduleId) {
        _classCallCheck(this, ConventionalViewStrategy);
        _ViewStrategy2.call(this);
        this.moduleId = moduleId;
        this.viewUrl = ConventionalViewStrategy.convertModuleIdToViewUrl(moduleId);
      }
      ConventionalViewStrategy.prototype.loadViewFactory = function loadViewFactory(viewEngine, compileInstruction, loadContext) {
        compileInstruction.associatedModuleId = this.moduleId;
        return viewEngine.loadViewFactory(this.viewUrl, compileInstruction, loadContext);
      };
      ConventionalViewStrategy.convertModuleIdToViewUrl = function convertModuleIdToViewUrl(moduleId) {
        var id = moduleId.endsWith('.js') || moduleId.endsWith('.ts') ? moduleId.substring(0, moduleId.length - 3) : moduleId;
        return id + '.html';
      };
      return ConventionalViewStrategy;
    })(ViewStrategy);
    exports.ConventionalViewStrategy = ConventionalViewStrategy;
    var NoViewStrategy = (function(_ViewStrategy3) {
      _inherits(NoViewStrategy, _ViewStrategy3);
      function NoViewStrategy() {
        _classCallCheck(this, NoViewStrategy);
        _ViewStrategy3.apply(this, arguments);
      }
      NoViewStrategy.prototype.loadViewFactory = function loadViewFactory(viewEngine, compileInstruction, loadContext) {
        return Promise.resolve(null);
      };
      return NoViewStrategy;
    })(ViewStrategy);
    exports.NoViewStrategy = NoViewStrategy;
    var TemplateRegistryViewStrategy = (function(_ViewStrategy4) {
      _inherits(TemplateRegistryViewStrategy, _ViewStrategy4);
      function TemplateRegistryViewStrategy(moduleId, entry) {
        _classCallCheck(this, TemplateRegistryViewStrategy);
        _ViewStrategy4.call(this);
        this.moduleId = moduleId;
        this.entry = entry;
      }
      TemplateRegistryViewStrategy.prototype.loadViewFactory = function loadViewFactory(viewEngine, compileInstruction, loadContext) {
        var entry = this.entry;
        if (entry.isReady) {
          return Promise.resolve(entry.factory);
        }
        compileInstruction.associatedModuleId = this.moduleId;
        return viewEngine.loadViewFactory(entry, compileInstruction, loadContext);
      };
      return TemplateRegistryViewStrategy;
    })(ViewStrategy);
    exports.TemplateRegistryViewStrategy = TemplateRegistryViewStrategy;
    var InlineViewStrategy = (function(_ViewStrategy5) {
      _inherits(InlineViewStrategy, _ViewStrategy5);
      function InlineViewStrategy(markup, dependencies, dependencyBaseUrl) {
        _classCallCheck(this, InlineViewStrategy);
        _ViewStrategy5.call(this);
        this.markup = markup;
        this.dependencies = dependencies || null;
        this.dependencyBaseUrl = dependencyBaseUrl || '';
      }
      InlineViewStrategy.prototype.loadViewFactory = function loadViewFactory(viewEngine, compileInstruction, loadContext) {
        var entry = this.entry;
        var dependencies = this.dependencies;
        if (entry && entry.isReady) {
          return Promise.resolve(entry.factory);
        }
        this.entry = entry = new _aureliaLoader.TemplateRegistryEntry(this.moduleId || this.dependencyBaseUrl);
        entry.setTemplate(_aureliaPal.DOM.createTemplateFromMarkup(this.markup));
        if (dependencies !== null) {
          for (var i = 0,
              ii = dependencies.length; i < ii; ++i) {
            var current = dependencies[i];
            if (typeof current === 'string' || typeof current === 'function') {
              entry.addDependency(current);
            } else {
              entry.addDependency(current.from, current.as);
            }
          }
        }
        compileInstruction.associatedModuleId = this.moduleId;
        return viewEngine.loadViewFactory(entry, compileInstruction, loadContext);
      };
      return InlineViewStrategy;
    })(ViewStrategy);
    exports.InlineViewStrategy = InlineViewStrategy;
    var BindingLanguage = (function() {
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
    exports.BindingLanguage = BindingLanguage;
    function register(lookup, name, resource, type) {
      if (!name) {
        return ;
      }
      var existing = lookup[name];
      if (existing) {
        if (existing !== resource) {
          throw new Error('Attempted to register ' + type + ' when one with the same name already exists. Name: ' + name + '.');
        }
        return ;
      }
      lookup[name] = resource;
    }
    var ViewResources = (function() {
      function ViewResources(parent, viewUrl) {
        _classCallCheck(this, ViewResources);
        this.parent = parent || null;
        this.hasParent = this.parent !== null;
        this.viewUrl = viewUrl || '';
        this.valueConverterLookupFunction = this.getValueConverter.bind(this);
        this.attributes = {};
        this.elements = {};
        this.valueConverters = {};
        this.attributeMap = {};
        this.bindingLanguage = null;
        this.hook1 = null;
        this.hook2 = null;
        this.hook3 = null;
        this.additionalHooks = null;
      }
      ViewResources.prototype.onBeforeCompile = function onBeforeCompile(content, resources, instruction) {
        if (this.hasParent) {
          this.parent.onBeforeCompile(content, resources, instruction);
        }
        if (this.hook1 !== null) {
          this.hook1.beforeCompile(content, resources, instruction);
          if (this.hook2 !== null) {
            this.hook2.beforeCompile(content, resources, instruction);
            if (this.hook3 !== null) {
              this.hook3.beforeCompile(content, resources, instruction);
              if (this.additionalHooks !== null) {
                var hooks = this.additionalHooks;
                for (var i = 0,
                    _length = hooks.length; i < _length; ++i) {
                  hooks[i].beforeCompile(content, resources, instruction);
                }
              }
            }
          }
        }
      };
      ViewResources.prototype.onAfterCompile = function onAfterCompile(viewFactory) {
        if (this.hasParent) {
          this.parent.onAfterCompile(viewFactory);
        }
        if (this.hook1 !== null) {
          this.hook1.afterCompile(viewFactory);
          if (this.hook2 !== null) {
            this.hook2.afterCompile(viewFactory);
            if (this.hook3 !== null) {
              this.hook3.afterCompile(viewFactory);
              if (this.additionalHooks !== null) {
                var hooks = this.additionalHooks;
                for (var i = 0,
                    _length2 = hooks.length; i < _length2; ++i) {
                  hooks[i].afterCompile(viewFactory);
                }
              }
            }
          }
        }
      };
      ViewResources.prototype.onBeforeCreate = function onBeforeCreate(viewFactory, container, content, instruction, bindingContext) {
        if (this.hasParent) {
          this.parent.onBeforeCreate(viewFactory, container, content, instruction, bindingContext);
        }
        if (this.hook1 !== null) {
          this.hook1.beforeCreate(viewFactory, container, content, instruction, bindingContext);
          if (this.hook2 !== null) {
            this.hook2.beforeCreate(viewFactory, container, content, instruction, bindingContext);
            if (this.hook3 !== null) {
              this.hook3.beforeCreate(viewFactory, container, content, instruction, bindingContext);
              if (this.additionalHooks !== null) {
                var hooks = this.additionalHooks;
                for (var i = 0,
                    _length3 = hooks.length; i < _length3; ++i) {
                  hooks[i].beforeCreate(viewFactory, container, content, instruction, bindingContext);
                }
              }
            }
          }
        }
      };
      ViewResources.prototype.onAfterCreate = function onAfterCreate(view) {
        if (this.hasParent) {
          this.parent.onAfterCreate(view);
        }
        if (this.hook1 !== null) {
          this.hook1.afterCreate(view);
          if (this.hook2 !== null) {
            this.hook2.afterCreate(view);
            if (this.hook3 !== null) {
              this.hook3.afterCreate(view);
              if (this.additionalHooks !== null) {
                var hooks = this.additionalHooks;
                for (var i = 0,
                    _length4 = hooks.length; i < _length4; ++i) {
                  hooks[i].afterCreate(view);
                }
              }
            }
          }
        }
      };
      ViewResources.prototype.registerViewEngineHooks = function registerViewEngineHooks(hooks) {
        if (hooks.beforeCompile === undefined)
          hooks.beforeCompile = _aureliaPal.PLATFORM.noop;
        if (hooks.afterCompile === undefined)
          hooks.afterCompile = _aureliaPal.PLATFORM.noop;
        if (hooks.beforeCreate === undefined)
          hooks.beforeCreate = _aureliaPal.PLATFORM.noop;
        if (hooks.afterCreate === undefined)
          hooks.afterCreate = _aureliaPal.PLATFORM.noop;
        if (this.hook1 === null)
          this.hook1 = hooks;
        else if (this.hook2 === null)
          this.hook2 = hooks;
        else if (this.hook3 === null)
          this.hook3 = hooks;
        else {
          if (this.additionalHooks === null) {
            this.additionalHooks = [];
          }
          this.additionalHooks.push(hooks);
        }
      };
      ViewResources.prototype.getBindingLanguage = function getBindingLanguage(bindingLanguageFallback) {
        return this.bindingLanguage || (this.bindingLanguage = bindingLanguageFallback);
      };
      ViewResources.prototype.patchInParent = function patchInParent(newParent) {
        var originalParent = this.parent;
        this.parent = newParent || null;
        this.hasParent = this.parent !== null;
        if (newParent.parent === null) {
          newParent.parent = originalParent;
          newParent.hasParent = originalParent !== null;
        }
      };
      ViewResources.prototype.relativeToView = function relativeToView(path) {
        return _aureliaPath.relativeToFile(path, this.viewUrl);
      };
      ViewResources.prototype.registerElement = function registerElement(tagName, behavior) {
        register(this.elements, tagName, behavior, 'an Element');
      };
      ViewResources.prototype.getElement = function getElement(tagName) {
        return this.elements[tagName] || (this.hasParent ? this.parent.getElement(tagName) : null);
      };
      ViewResources.prototype.mapAttribute = function mapAttribute(attribute) {
        return this.attributeMap[attribute] || (this.hasParent ? this.parent.mapAttribute(attribute) : null);
      };
      ViewResources.prototype.registerAttribute = function registerAttribute(attribute, behavior, knownAttribute) {
        this.attributeMap[attribute] = knownAttribute;
        register(this.attributes, attribute, behavior, 'an Attribute');
      };
      ViewResources.prototype.getAttribute = function getAttribute(attribute) {
        return this.attributes[attribute] || (this.hasParent ? this.parent.getAttribute(attribute) : null);
      };
      ViewResources.prototype.registerValueConverter = function registerValueConverter(name, valueConverter) {
        register(this.valueConverters, name, valueConverter, 'a ValueConverter');
      };
      ViewResources.prototype.getValueConverter = function getValueConverter(name) {
        return this.valueConverters[name] || (this.hasParent ? this.parent.getValueConverter(name) : null);
      };
      return ViewResources;
    })();
    exports.ViewResources = ViewResources;
    var View = (function() {
      function View(viewFactory, container, fragment, controllers, bindings, children, systemControlled, contentSelectors) {
        _classCallCheck(this, View);
        this.viewFactory = viewFactory;
        this.container = container;
        this.fragment = fragment;
        this.controllers = controllers;
        this.bindings = bindings;
        this.children = children;
        this.systemControlled = systemControlled;
        this.contentSelectors = contentSelectors;
        this.firstChild = fragment.firstChild;
        this.lastChild = fragment.lastChild;
        this.isBound = false;
        this.isAttached = false;
        this.fromCache = false;
      }
      View.prototype.returnToCache = function returnToCache() {
        this.viewFactory.returnViewToCache(this);
      };
      View.prototype.created = function created() {
        var i = undefined;
        var ii = undefined;
        var controllers = this.controllers;
        for (i = 0, ii = controllers.length; i < ii; ++i) {
          controllers[i].created(this);
        }
      };
      View.prototype.bind = function bind(bindingContext, systemUpdate) {
        var context = undefined;
        var controllers = undefined;
        var bindings = undefined;
        var children = undefined;
        var i = undefined;
        var ii = undefined;
        if (systemUpdate && !this.systemControlled) {
          context = this.bindingContext || bindingContext;
        } else {
          context = bindingContext || this.bindingContext;
        }
        if (this.isBound) {
          if (this.bindingContext === context) {
            return ;
          }
          this.unbind();
        }
        this.isBound = true;
        this.bindingContext = context;
        if (this.owner) {
          this.owner.bind(context);
        }
        bindings = this.bindings;
        for (i = 0, ii = bindings.length; i < ii; ++i) {
          bindings[i].bind(context);
        }
        controllers = this.controllers;
        for (i = 0, ii = controllers.length; i < ii; ++i) {
          controllers[i].bind(context);
        }
        children = this.children;
        for (i = 0, ii = children.length; i < ii; ++i) {
          children[i].bind(context, true);
        }
      };
      View.prototype.addBinding = function addBinding(binding) {
        this.bindings.push(binding);
        if (this.isBound) {
          binding.bind(this.bindingContext);
        }
      };
      View.prototype.unbind = function unbind() {
        var controllers = undefined;
        var bindings = undefined;
        var children = undefined;
        var i = undefined;
        var ii = undefined;
        if (this.isBound) {
          this.isBound = false;
          this.bindingContext = null;
          if (this.owner) {
            this.owner.unbind();
          }
          bindings = this.bindings;
          for (i = 0, ii = bindings.length; i < ii; ++i) {
            bindings[i].unbind();
          }
          controllers = this.controllers;
          for (i = 0, ii = controllers.length; i < ii; ++i) {
            controllers[i].unbind();
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
        var start = this.firstChild;
        var end = this.lastChild;
        var fragment = this.fragment;
        var next = undefined;
        var current = start;
        var loop = true;
        while (loop) {
          if (current === end) {
            loop = false;
          }
          next = current.nextSibling;
          fragment.appendChild(current);
          current = next;
        }
      };
      View.prototype.attached = function attached() {
        var controllers = undefined;
        var children = undefined;
        var i = undefined;
        var ii = undefined;
        if (this.isAttached) {
          return ;
        }
        this.isAttached = true;
        if (this.owner) {
          this.owner.attached();
        }
        controllers = this.controllers;
        for (i = 0, ii = controllers.length; i < ii; ++i) {
          controllers[i].attached();
        }
        children = this.children;
        for (i = 0, ii = children.length; i < ii; ++i) {
          children[i].attached();
        }
      };
      View.prototype.detached = function detached() {
        var controllers = undefined;
        var children = undefined;
        var i = undefined;
        var ii = undefined;
        if (this.isAttached) {
          this.isAttached = false;
          if (this.owner) {
            this.owner.detached();
          }
          controllers = this.controllers;
          for (i = 0, ii = controllers.length; i < ii; ++i) {
            controllers[i].detached();
          }
          children = this.children;
          for (i = 0, ii = children.length; i < ii; ++i) {
            children[i].detached();
          }
        }
      };
      return View;
    })();
    exports.View = View;
    var placeholder = [];
    function findInsertionPoint(groups, index) {
      var insertionPoint = undefined;
      while (!insertionPoint && index >= 0) {
        insertionPoint = groups[index][0];
        index--;
      }
      return insertionPoint;
    }
    var ContentSelector = (function() {
      ContentSelector.applySelectors = function applySelectors(view, contentSelectors, callback) {
        var currentChild = view.fragment.firstChild;
        var contentMap = new Map();
        var nextSibling = undefined;
        var i = undefined;
        var ii = undefined;
        var contentSelector = undefined;
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
      function ContentSelector(anchor, selector) {
        _classCallCheck(this, ContentSelector);
        this.anchor = anchor;
        this.selector = selector;
        this.all = !this.selector;
        this.groups = [];
      }
      ContentSelector.prototype.copyForViewSlot = function copyForViewSlot() {
        return new ContentSelector(this.anchor, this.selector);
      };
      ContentSelector.prototype.matches = function matches(node) {
        return this.all || node.nodeType === 1 && node.matches(this.selector);
      };
      ContentSelector.prototype.add = function add(group) {
        var anchor = this.anchor;
        var parent = anchor.parentNode;
        var i = undefined;
        var ii = undefined;
        for (i = 0, ii = group.length; i < ii; ++i) {
          parent.insertBefore(group[i], anchor);
        }
        this.groups.push(group);
      };
      ContentSelector.prototype.insert = function insert(index, group) {
        if (group.length) {
          var anchor = findInsertionPoint(this.groups, index) || this.anchor;
          var _parent = anchor.parentNode;
          var i = undefined;
          var ii = undefined;
          for (i = 0, ii = group.length; i < ii; ++i) {
            _parent.insertBefore(group[i], anchor);
          }
        }
        this.groups.splice(index, 0, group);
      };
      ContentSelector.prototype.removeAt = function removeAt(index, fragment) {
        var group = this.groups[index];
        var i = undefined;
        var ii = undefined;
        for (i = 0, ii = group.length; i < ii; ++i) {
          fragment.appendChild(group[i]);
        }
        this.groups.splice(index, 1);
      };
      return ContentSelector;
    })();
    exports.ContentSelector = ContentSelector;
    function getAnimatableElement(view) {
      var firstChild = view.firstChild;
      if (firstChild !== null && firstChild !== undefined && firstChild.nodeType === 8) {
        var element = _aureliaPal.DOM.nextElementSibling(firstChild);
        if (element !== null && element !== undefined && element.nodeType === 1 && element.classList.contains('au-animate')) {
          return element;
        }
      }
      return null;
    }
    var ViewSlot = (function() {
      function ViewSlot(anchor, anchorIsContainer, bindingContext) {
        var animator = arguments.length <= 3 || arguments[3] === undefined ? Animator.instance : arguments[3];
        _classCallCheck(this, ViewSlot);
        this.anchor = anchor;
        this.viewAddMethod = anchorIsContainer ? 'appendNodesTo' : 'insertNodesBefore';
        this.bindingContext = bindingContext;
        this.animator = animator;
        this.children = [];
        this.isBound = false;
        this.isAttached = false;
        this.contentSelectors = null;
        anchor.viewSlot = this;
      }
      ViewSlot.prototype.transformChildNodesIntoView = function transformChildNodesIntoView() {
        var parent = this.anchor;
        this.children.push({
          fragment: parent,
          firstChild: parent.firstChild,
          lastChild: parent.lastChild,
          returnToCache: function returnToCache() {},
          removeNodes: function removeNodes() {
            var last = undefined;
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
      ViewSlot.prototype.bind = function bind(bindingContext) {
        var i = undefined;
        var ii = undefined;
        var children = undefined;
        if (this.isBound) {
          if (this.bindingContext === bindingContext) {
            return ;
          }
          this.unbind();
        }
        this.isBound = true;
        this.bindingContext = bindingContext = bindingContext || this.bindingContext;
        children = this.children;
        for (i = 0, ii = children.length; i < ii; ++i) {
          children[i].bind(bindingContext, true);
        }
      };
      ViewSlot.prototype.unbind = function unbind() {
        var i = undefined;
        var ii = undefined;
        var children = this.children;
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
          var animatableElement = getAnimatableElement(view);
          if (animatableElement !== null) {
            return this.animator.enter(animatableElement);
          }
        }
      };
      ViewSlot.prototype.insert = function insert(index, view) {
        var children = this.children;
        var length = children.length;
        if (index === 0 && length === 0 || index >= length) {
          return this.add(view);
        }
        view.insertNodesBefore(children[index].firstChild);
        children.splice(index, 0, view);
        if (this.isAttached) {
          view.attached();
          var animatableElement = getAnimatableElement(view);
          if (animatableElement !== null) {
            return this.animator.enter(animatableElement);
          }
        }
      };
      ViewSlot.prototype.remove = function remove(view, returnToCache, skipAnimation) {
        return this.removeAt(this.children.indexOf(view), returnToCache, skipAnimation);
      };
      ViewSlot.prototype.removeAt = function removeAt(index, returnToCache, skipAnimation) {
        var _this = this;
        var view = this.children[index];
        var removeAction = function removeAction() {
          index = _this.children.indexOf(view);
          view.removeNodes();
          _this.children.splice(index, 1);
          if (_this.isAttached) {
            view.detached();
          }
          if (returnToCache) {
            view.returnToCache();
          }
          return view;
        };
        if (!skipAnimation) {
          var animatableElement = getAnimatableElement(view);
          if (animatableElement !== null) {
            return this.animator.leave(animatableElement).then(function() {
              return removeAction();
            });
          }
        }
        return removeAction();
      };
      ViewSlot.prototype.removeAll = function removeAll(returnToCache, skipAnimation) {
        var _this2 = this;
        var children = this.children;
        var ii = children.length;
        var i = undefined;
        var rmPromises = [];
        children.forEach(function(child) {
          if (skipAnimation) {
            child.removeNodes();
            return ;
          }
          var animatableElement = getAnimatableElement(child);
          if (animatableElement !== null) {
            rmPromises.push(_this2.animator.leave(animatableElement).then(function() {
              return child.removeNodes();
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
          if (returnToCache) {
            for (i = 0; i < ii; ++i) {
              children[i].returnToCache();
            }
          }
          _this2.children = [];
        };
        if (rmPromises.length > 0) {
          return Promise.all(rmPromises).then(function() {
            return removeAction();
          });
        }
        removeAction();
      };
      ViewSlot.prototype.swap = function swap(view, returnToCache) {
        var _this3 = this;
        var removeResponse = this.removeAll(returnToCache);
        if (removeResponse instanceof Promise) {
          return removeResponse.then(function() {
            return _this3.add(view);
          });
        }
        return this.add(view);
      };
      ViewSlot.prototype.attached = function attached() {
        var i = undefined;
        var ii = undefined;
        var children = undefined;
        var child = undefined;
        if (this.isAttached) {
          return ;
        }
        this.isAttached = true;
        children = this.children;
        for (i = 0, ii = children.length; i < ii; ++i) {
          child = children[i];
          child.attached();
          var element = child.firstChild ? _aureliaPal.DOM.nextElementSibling(child.firstChild) : null;
          if (child.firstChild && child.firstChild.nodeType === 8 && element && element.nodeType === 1 && element.classList.contains('au-animate')) {
            this.animator.enter(element);
          }
        }
      };
      ViewSlot.prototype.detached = function detached() {
        var i = undefined;
        var ii = undefined;
        var children = undefined;
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
        this.add = this._contentSelectorAdd;
        this.insert = this._contentSelectorInsert;
        this.remove = this._contentSelectorRemove;
        this.removeAt = this._contentSelectorRemoveAt;
        this.removeAll = this._contentSelectorRemoveAll;
      };
      ViewSlot.prototype._contentSelectorAdd = function _contentSelectorAdd(view) {
        ContentSelector.applySelectors(view, this.contentSelectors, function(contentSelector, group) {
          return contentSelector.add(group);
        });
        this.children.push(view);
        if (this.isAttached) {
          view.attached();
        }
      };
      ViewSlot.prototype._contentSelectorInsert = function _contentSelectorInsert(index, view) {
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
      ViewSlot.prototype._contentSelectorRemove = function _contentSelectorRemove(view) {
        var index = this.children.indexOf(view);
        var contentSelectors = this.contentSelectors;
        var i = undefined;
        var ii = undefined;
        for (i = 0, ii = contentSelectors.length; i < ii; ++i) {
          contentSelectors[i].removeAt(index, view.fragment);
        }
        this.children.splice(index, 1);
        if (this.isAttached) {
          view.detached();
        }
      };
      ViewSlot.prototype._contentSelectorRemoveAt = function _contentSelectorRemoveAt(index) {
        var view = this.children[index];
        var contentSelectors = this.contentSelectors;
        var i = undefined;
        var ii = undefined;
        for (i = 0, ii = contentSelectors.length; i < ii; ++i) {
          contentSelectors[i].removeAt(index, view.fragment);
        }
        this.children.splice(index, 1);
        if (this.isAttached) {
          view.detached();
        }
        return view;
      };
      ViewSlot.prototype._contentSelectorRemoveAll = function _contentSelectorRemoveAll() {
        var children = this.children;
        var contentSelectors = this.contentSelectors;
        var ii = children.length;
        var jj = contentSelectors.length;
        var i = undefined;
        var j = undefined;
        var view = undefined;
        for (i = 0; i < ii; ++i) {
          view = children[i];
          for (j = 0; j < jj; ++j) {
            contentSelectors[j].removeAt(0, view.fragment);
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
    exports.ViewSlot = ViewSlot;
    var providerResolverInstance = new ((function() {
      function ProviderResolver() {
        _classCallCheck(this, ProviderResolver);
      }
      ProviderResolver.prototype.get = function get(container, key) {
        var id = key.__providerId__;
        return id in container ? container[id] : container[id] = container.invoke(key);
      };
      return ProviderResolver;
    })())();
    function elementContainerGet(key) {
      if (key === _aureliaPal.DOM.Element) {
        return this.element;
      }
      if (key === BoundViewFactory) {
        if (this.boundViewFactory) {
          return this.boundViewFactory;
        }
        var factory = this.instruction.viewFactory;
        var _partReplacements = this.partReplacements;
        if (_partReplacements) {
          factory = _partReplacements[factory.part] || factory;
        }
        this.boundViewFactory = new BoundViewFactory(this, factory, this.bindingContext, _partReplacements);
        return this.boundViewFactory;
      }
      if (key === ViewSlot) {
        if (this.viewSlot === undefined) {
          this.viewSlot = new ViewSlot(this.element, this.instruction.anchorIsContainer, this.bindingContext);
          this.children.push(this.viewSlot);
        }
        return this.viewSlot;
      }
      if (key === ViewResources) {
        return this.viewResources;
      }
      if (key === TargetInstruction) {
        return this.instruction;
      }
      return this.superGet(key);
    }
    function createElementContainer(parent, element, instruction, bindingContext, children, partReplacements, resources) {
      var container = parent.createChild();
      var providers = undefined;
      var i = undefined;
      container.element = element;
      container.instruction = instruction;
      container.bindingContext = bindingContext;
      container.children = children;
      container.viewResources = resources;
      container.partReplacements = partReplacements;
      providers = instruction.providers;
      i = providers.length;
      while (i--) {
        container.resolvers.set(providers[i], providerResolverInstance);
      }
      container.superGet = container.get;
      container.get = elementContainerGet;
      return container;
    }
    function makeElementIntoAnchor(element, elementInstruction) {
      var anchor = _aureliaPal.DOM.createComment('anchor');
      if (elementInstruction) {
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
      _aureliaPal.DOM.replaceNode(anchor, element);
      return anchor;
    }
    function applyInstructions(containers, bindingContext, element, instruction, behaviors, bindings, children, contentSelectors, partReplacements, resources) {
      var behaviorInstructions = instruction.behaviorInstructions;
      var expressions = instruction.expressions;
      var elementContainer = undefined;
      var i = undefined;
      var ii = undefined;
      var current = undefined;
      var instance = undefined;
      if (instruction.contentExpression) {
        bindings.push(instruction.contentExpression.createBinding(element.nextSibling));
        element.parentNode.removeChild(element);
        return ;
      }
      if (instruction.contentSelector) {
        var commentAnchor = _aureliaPal.DOM.createComment('anchor');
        _aureliaPal.DOM.replaceNode(commentAnchor, element);
        contentSelectors.push(new ContentSelector(commentAnchor, instruction.selector));
        return ;
      }
      if (behaviorInstructions.length) {
        if (!instruction.anchorIsContainer) {
          element = makeElementIntoAnchor(element, instruction.elementInstruction);
        }
        containers[instruction.injectorId] = elementContainer = createElementContainer(containers[instruction.parentInjectorId], element, instruction, bindingContext, children, partReplacements, resources);
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
    function styleStringToObject(style, target) {
      var attributes = style.split(';');
      var firstIndexOfColon = undefined;
      var i = undefined;
      var current = undefined;
      var key = undefined;
      var value = undefined;
      target = target || {};
      for (i = 0; i < attributes.length; i++) {
        current = attributes[i];
        firstIndexOfColon = current.indexOf(':');
        key = current.substring(0, firstIndexOfColon).trim();
        value = current.substring(firstIndexOfColon + 1).trim();
        target[key] = value;
      }
      return target;
    }
    function styleObjectToString(obj) {
      var result = '';
      for (var key in obj) {
        result += key + ':' + obj[key] + ';';
      }
      return result;
    }
    function applySurrogateInstruction(container, element, instruction, behaviors, bindings, children) {
      var behaviorInstructions = instruction.behaviorInstructions;
      var expressions = instruction.expressions;
      var providers = instruction.providers;
      var values = instruction.values;
      var i = undefined;
      var ii = undefined;
      var current = undefined;
      var instance = undefined;
      var currentAttributeValue = undefined;
      i = providers.length;
      while (i--) {
        container.resolvers.set(providers[i], providerResolverInstance);
      }
      for (var key in values) {
        currentAttributeValue = element.getAttribute(key);
        if (currentAttributeValue) {
          if (key === 'class') {
            element.setAttribute('class', currentAttributeValue + ' ' + values[key]);
          } else if (key === 'style') {
            var styleObject = styleStringToObject(values[key]);
            styleStringToObject(currentAttributeValue, styleObject);
            element.setAttribute('style', styleObjectToString(styleObject));
          }
        } else {
          element.setAttribute(key, values[key]);
        }
      }
      if (behaviorInstructions.length) {
        for (i = 0, ii = behaviorInstructions.length; i < ii; ++i) {
          current = behaviorInstructions[i];
          instance = current.type.create(container, current, element, bindings, current.partReplacements);
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
    var BoundViewFactory = (function() {
      function BoundViewFactory(parentContainer, viewFactory, bindingContext, partReplacements) {
        _classCallCheck(this, BoundViewFactory);
        this.parentContainer = parentContainer;
        this.viewFactory = viewFactory;
        this.bindingContext = bindingContext;
        this.factoryCreateInstruction = {partReplacements: partReplacements};
      }
      BoundViewFactory.prototype.create = function create(bindingContext) {
        var childContainer = this.parentContainer.createChild();
        var context = bindingContext || this.bindingContext;
        this.factoryCreateInstruction.systemControlled = !bindingContext;
        return this.viewFactory.create(childContainer, context, this.factoryCreateInstruction);
      };
      BoundViewFactory.prototype.setCacheSize = function setCacheSize(size, doNotOverrideIfAlreadySet) {
        this.viewFactory.setCacheSize(size, doNotOverrideIfAlreadySet);
      };
      BoundViewFactory.prototype.getCachedView = function getCachedView() {
        return this.viewFactory.getCachedView();
      };
      BoundViewFactory.prototype.returnViewToCache = function returnViewToCache(view) {
        this.viewFactory.returnViewToCache(view);
      };
      _createClass(BoundViewFactory, [{
        key: 'isCaching',
        get: function get() {
          return this.viewFactory.isCaching;
        }
      }]);
      return BoundViewFactory;
    })();
    exports.BoundViewFactory = BoundViewFactory;
    var ViewFactory = (function() {
      function ViewFactory(template, instructions, resources) {
        _classCallCheck(this, ViewFactory);
        this.template = template;
        this.instructions = instructions;
        this.resources = resources;
        this.cacheSize = -1;
        this.cache = null;
        this.isCaching = false;
      }
      ViewFactory.prototype.setCacheSize = function setCacheSize(size, doNotOverrideIfAlreadySet) {
        if (size) {
          if (size === '*') {
            size = Number.MAX_VALUE;
          } else if (typeof size === 'string') {
            size = parseInt(size, 10);
          }
        }
        if (this.cacheSize === -1 || !doNotOverrideIfAlreadySet) {
          this.cacheSize = size;
        }
        if (this.cacheSize > 0) {
          this.cache = [];
        } else {
          this.cache = null;
        }
        this.isCaching = this.cacheSize > 0;
      };
      ViewFactory.prototype.getCachedView = function getCachedView() {
        return this.cache !== null ? this.cache.pop() || null : null;
      };
      ViewFactory.prototype.returnViewToCache = function returnViewToCache(view) {
        if (view.isAttached) {
          view.detached();
        }
        if (view.isBound) {
          view.unbind();
        }
        if (this.cache !== null && this.cache.length < this.cacheSize) {
          view.fromCache = true;
          this.cache.push(view);
        }
      };
      ViewFactory.prototype.create = function create(container, bindingContext, createInstruction, element) {
        createInstruction = createInstruction || BehaviorInstruction.normal;
        element = element || null;
        var cachedView = this.getCachedView();
        if (cachedView !== null) {
          if (!createInstruction.suppressBind) {
            cachedView.bind(bindingContext);
          }
          return cachedView;
        }
        var fragment = createInstruction.enhance ? this.template : this.template.cloneNode(true);
        var instructables = fragment.querySelectorAll('.au-target');
        var instructions = this.instructions;
        var resources = this.resources;
        var behaviors = [];
        var bindings = [];
        var children = [];
        var contentSelectors = [];
        var containers = {root: container};
        var partReplacements = createInstruction.partReplacements;
        var i = undefined;
        var ii = undefined;
        var view = undefined;
        var instructable = undefined;
        var instruction = undefined;
        this.resources.onBeforeCreate(this, container, fragment, createInstruction, bindingContext);
        if (element !== null && this.surrogateInstruction !== null) {
          applySurrogateInstruction(container, element, this.surrogateInstruction, behaviors, bindings, children);
        }
        for (i = 0, ii = instructables.length; i < ii; ++i) {
          instructable = instructables[i];
          instruction = instructions[instructable.getAttribute('au-target-id')];
          applyInstructions(containers, bindingContext, instructable, instruction, behaviors, bindings, children, contentSelectors, partReplacements, resources);
        }
        view = new View(this, container, fragment, behaviors, bindings, children, createInstruction.systemControlled, contentSelectors);
        if (!createInstruction.initiatedByBehavior) {
          view.created();
        }
        this.resources.onAfterCreate(view);
        if (!createInstruction.suppressBind) {
          view.bind(bindingContext);
        }
        return view;
      };
      return ViewFactory;
    })();
    exports.ViewFactory = ViewFactory;
    var nextInjectorId = 0;
    function getNextInjectorId() {
      return ++nextInjectorId;
    }
    function configureProperties(instruction, resources) {
      var type = instruction.type;
      var attrName = instruction.attrName;
      var attributes = instruction.attributes;
      var property = undefined;
      var key = undefined;
      var value = undefined;
      var knownAttribute = resources.mapAttribute(attrName);
      if (knownAttribute && attrName in attributes && knownAttribute !== attrName) {
        attributes[knownAttribute] = attributes[attrName];
        delete attributes[attrName];
      }
      for (key in attributes) {
        value = attributes[key];
        if (value !== null && typeof value === 'object') {
          property = type.attributes[key];
          if (property !== undefined) {
            value.targetProperty = property.name;
          } else {
            value.targetProperty = key;
          }
        }
      }
    }
    var lastAUTargetID = 0;
    function getNextAUTargetID() {
      return (++lastAUTargetID).toString();
    }
    function makeIntoInstructionTarget(element) {
      var value = element.getAttribute('class');
      var auTargetID = getNextAUTargetID();
      element.setAttribute('class', value ? value += ' au-target' : 'au-target');
      element.setAttribute('au-target-id', auTargetID);
      return auTargetID;
    }
    var ViewCompiler = (function() {
      function ViewCompiler(bindingLanguage, resources) {
        _classCallCheck(this, _ViewCompiler);
        this.bindingLanguage = bindingLanguage;
        this.resources = resources;
      }
      ViewCompiler.prototype.compile = function compile(source, resources, compileInstruction) {
        resources = resources || this.resources;
        compileInstruction = compileInstruction || ViewCompileInstruction.normal;
        source = typeof source === 'string' ? _aureliaPal.DOM.createTemplateFromMarkup(source) : source;
        var content = undefined;
        var part = undefined;
        var cacheSize = undefined;
        if (source.content) {
          part = source.getAttribute('part');
          cacheSize = source.getAttribute('view-cache');
          content = _aureliaPal.DOM.adoptNode(source.content);
        } else {
          content = source;
        }
        compileInstruction.targetShadowDOM = compileInstruction.targetShadowDOM && _aureliaPal.FEATURE.shadowDOM;
        resources.onBeforeCompile(content, resources, compileInstruction);
        var instructions = {};
        this.compileNode(content, resources, instructions, source, 'root', !compileInstruction.targetShadowDOM);
        content.insertBefore(_aureliaPal.DOM.createComment('<view>'), content.firstChild);
        content.appendChild(_aureliaPal.DOM.createComment('</view>'));
        var factory = new ViewFactory(content, instructions, resources);
        factory.surrogateInstruction = compileInstruction.compileSurrogate ? this.compileSurrogate(source, resources) : null;
        factory.part = part;
        if (cacheSize) {
          factory.setCacheSize(cacheSize);
        }
        resources.onAfterCompile(factory);
        return factory;
      };
      ViewCompiler.prototype.compileNode = function compileNode(node, resources, instructions, parentNode, parentInjectorId, targetLightDOM) {
        switch (node.nodeType) {
          case 1:
            return this.compileElement(node, resources, instructions, parentNode, parentInjectorId, targetLightDOM);
          case 3:
            var expression = resources.getBindingLanguage(this.bindingLanguage).parseText(resources, node.wholeText);
            if (expression) {
              var marker = _aureliaPal.DOM.createElement('au-marker');
              var auTargetID = makeIntoInstructionTarget(marker);
              (node.parentNode || parentNode).insertBefore(marker, node);
              node.textContent = ' ';
              instructions[auTargetID] = TargetInstruction.contentExpression(expression);
              while (node.nextSibling && node.nextSibling.nodeType === 3) {
                (node.parentNode || parentNode).removeChild(node.nextSibling);
              }
            } else {
              while (node.nextSibling && node.nextSibling.nodeType === 3) {
                node = node.nextSibling;
              }
            }
            return node.nextSibling;
          case 11:
            var currentChild = node.firstChild;
            while (currentChild) {
              currentChild = this.compileNode(currentChild, resources, instructions, node, parentInjectorId, targetLightDOM);
            }
            break;
          default:
            break;
        }
        return node.nextSibling;
      };
      ViewCompiler.prototype.compileSurrogate = function compileSurrogate(node, resources) {
        var attributes = node.attributes;
        var bindingLanguage = resources.getBindingLanguage(this.bindingLanguage);
        var knownAttribute = undefined;
        var property = undefined;
        var instruction = undefined;
        var i = undefined;
        var ii = undefined;
        var attr = undefined;
        var attrName = undefined;
        var attrValue = undefined;
        var info = undefined;
        var type = undefined;
        var expressions = [];
        var expression = undefined;
        var behaviorInstructions = [];
        var values = {};
        var hasValues = false;
        var providers = [];
        for (i = 0, ii = attributes.length; i < ii; ++i) {
          attr = attributes[i];
          attrName = attr.name;
          attrValue = attr.value;
          info = bindingLanguage.inspectAttribute(resources, attrName, attrValue);
          type = resources.getAttribute(info.attrName);
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
          }
          instruction = bindingLanguage.createAttributeInstruction(resources, node, info);
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
                  throw new Error('You cannot place a template controller on a surrogate element.');
                } else {
                  behaviorInstructions.push(instruction);
                }
              } else {
                expressions.push(instruction.attributes[instruction.attrName]);
              }
            }
          } else {
            if (type) {
              instruction = BehaviorInstruction.attribute(attrName, type);
              instruction.attributes[resources.mapAttribute(attrName)] = attrValue;
              if (type.liftsContent) {
                throw new Error('You cannot place a template controller on a surrogate element.');
              } else {
                behaviorInstructions.push(instruction);
              }
            } else if (attrName !== 'id' && attrName !== 'part' && attrName !== 'replace-part') {
              hasValues = true;
              values[attrName] = attrValue;
            }
          }
        }
        if (expressions.length || behaviorInstructions.length || hasValues) {
          for (i = 0, ii = behaviorInstructions.length; i < ii; ++i) {
            instruction = behaviorInstructions[i];
            instruction.type.compile(this, resources, node, instruction);
            providers.push(instruction.type.target);
          }
          for (i = 0, ii = expressions.length; i < ii; ++i) {
            expression = expressions[i];
            if (expression.attrToRemove !== undefined) {
              node.removeAttribute(expression.attrToRemove);
            }
          }
          return TargetInstruction.surrogate(providers, behaviorInstructions, expressions, values);
        }
        return null;
      };
      ViewCompiler.prototype.compileElement = function compileElement(node, resources, instructions, parentNode, parentInjectorId, targetLightDOM) {
        var tagName = node.tagName.toLowerCase();
        var attributes = node.attributes;
        var expressions = [];
        var expression = undefined;
        var behaviorInstructions = [];
        var providers = [];
        var bindingLanguage = resources.getBindingLanguage(this.bindingLanguage);
        var liftingInstruction = undefined;
        var viewFactory = undefined;
        var type = undefined;
        var elementInstruction = undefined;
        var elementProperty = undefined;
        var i = undefined;
        var ii = undefined;
        var attr = undefined;
        var attrName = undefined;
        var attrValue = undefined;
        var instruction = undefined;
        var info = undefined;
        var property = undefined;
        var knownAttribute = undefined;
        var auTargetID = undefined;
        var injectorId = undefined;
        if (tagName === 'content') {
          if (targetLightDOM) {
            auTargetID = makeIntoInstructionTarget(node);
            instructions[auTargetID] = TargetInstruction.contentSelector(node, parentInjectorId);
          }
          return node.nextSibling;
        } else if (tagName === 'template') {
          viewFactory = this.compile(node, resources);
          viewFactory.part = node.getAttribute('part');
        } else {
          type = resources.getElement(tagName);
          if (type) {
            elementInstruction = BehaviorInstruction.element(node, type);
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
              instruction = BehaviorInstruction.attribute(attrName, type);
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
          auTargetID = makeIntoInstructionTarget(node);
          instructions[auTargetID] = TargetInstruction.lifting(parentInjectorId, liftingInstruction);
        } else {
          if (expressions.length || behaviorInstructions.length) {
            injectorId = behaviorInstructions.length ? getNextInjectorId() : false;
            for (i = 0, ii = behaviorInstructions.length; i < ii; ++i) {
              instruction = behaviorInstructions[i];
              instruction.type.compile(this, resources, node, instruction, parentNode);
              providers.push(instruction.type.target);
            }
            for (i = 0, ii = expressions.length; i < ii; ++i) {
              expression = expressions[i];
              if (expression.attrToRemove !== undefined) {
                node.removeAttribute(expression.attrToRemove);
              }
            }
            auTargetID = makeIntoInstructionTarget(node);
            instructions[auTargetID] = TargetInstruction.normal(injectorId, parentInjectorId, providers, behaviorInstructions, expressions, elementInstruction);
          }
          if (elementInstruction && elementInstruction.skipContentProcessing) {
            return node.nextSibling;
          }
          var currentChild = node.firstChild;
          while (currentChild) {
            currentChild = this.compileNode(currentChild, resources, instructions, node, injectorId || parentInjectorId, targetLightDOM);
          }
        }
        return node.nextSibling;
      };
      var _ViewCompiler = ViewCompiler;
      ViewCompiler = _aureliaDependencyInjection.inject(BindingLanguage, ViewResources)(ViewCompiler) || ViewCompiler;
      return ViewCompiler;
    })();
    exports.ViewCompiler = ViewCompiler;
    var ResourceModule = (function() {
      function ResourceModule(moduleId) {
        _classCallCheck(this, ResourceModule);
        this.id = moduleId;
        this.moduleInstance = null;
        this.mainResource = null;
        this.resources = null;
        this.viewStrategy = null;
        this.isInitialized = false;
        this.onLoaded = null;
      }
      ResourceModule.prototype.initialize = function initialize(container) {
        var current = this.mainResource;
        var resources = this.resources;
        var viewStrategy = this.viewStrategy;
        if (this.isInitialized) {
          return ;
        }
        this.isInitialized = true;
        if (current !== undefined) {
          current.metadata.viewStrategy = viewStrategy;
          current.initialize(container);
        }
        for (var i = 0,
            ii = resources.length; i < ii; ++i) {
          current = resources[i];
          current.metadata.viewStrategy = viewStrategy;
          current.initialize(container);
        }
      };
      ResourceModule.prototype.register = function register(registry, name) {
        var main = this.mainResource;
        var resources = this.resources;
        if (main !== undefined) {
          main.register(registry, name);
          name = null;
        }
        for (var i = 0,
            ii = resources.length; i < ii; ++i) {
          resources[i].register(registry, name);
          name = null;
        }
      };
      ResourceModule.prototype.load = function load(container, loadContext) {
        if (this.onLoaded !== null) {
          return this.onLoaded;
        }
        var main = this.mainResource;
        var resources = this.resources;
        var loads = undefined;
        if (main !== undefined) {
          loads = new Array(resources.length + 1);
          loads[0] = main.load(container, loadContext);
          for (var i = 0,
              ii = resources.length; i < ii; ++i) {
            loads[i + 1] = resources[i].load(container, loadContext);
          }
        } else {
          loads = new Array(resources.length);
          for (var i = 0,
              ii = resources.length; i < ii; ++i) {
            loads[i] = resources[i].load(container, loadContext);
          }
        }
        this.onLoaded = Promise.all(loads);
        return this.onLoaded;
      };
      return ResourceModule;
    })();
    exports.ResourceModule = ResourceModule;
    var ResourceDescription = (function() {
      function ResourceDescription(key, exportedValue, resourceTypeMeta) {
        _classCallCheck(this, ResourceDescription);
        if (!resourceTypeMeta) {
          resourceTypeMeta = _aureliaMetadata.metadata.get(_aureliaMetadata.metadata.resource, exportedValue);
          if (!resourceTypeMeta) {
            resourceTypeMeta = new HtmlBehaviorResource();
            resourceTypeMeta.elementName = hyphenate(key);
            _aureliaMetadata.metadata.define(_aureliaMetadata.metadata.resource, resourceTypeMeta, exportedValue);
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
      }
      ResourceDescription.prototype.initialize = function initialize(container) {
        this.metadata.initialize(container, this.value);
      };
      ResourceDescription.prototype.register = function register(registry, name) {
        this.metadata.register(registry, name);
      };
      ResourceDescription.prototype.load = function load(container, loadContext) {
        return this.metadata.load(container, this.value, null, null, loadContext);
      };
      return ResourceDescription;
    })();
    exports.ResourceDescription = ResourceDescription;
    var ModuleAnalyzer = (function() {
      function ModuleAnalyzer() {
        _classCallCheck(this, ModuleAnalyzer);
        this.cache = {};
      }
      ModuleAnalyzer.prototype.getAnalysis = function getAnalysis(moduleId) {
        return this.cache[moduleId];
      };
      ModuleAnalyzer.prototype.analyze = function analyze(moduleId, moduleInstance, viewModelMember) {
        var mainResource = undefined;
        var fallbackValue = undefined;
        var fallbackKey = undefined;
        var resourceTypeMeta = undefined;
        var key = undefined;
        var exportedValue = undefined;
        var resources = [];
        var conventional = undefined;
        var viewStrategy = undefined;
        var resourceModule = undefined;
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
          resourceTypeMeta = _aureliaMetadata.metadata.get(_aureliaMetadata.metadata.resource, exportedValue);
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
          } else if (exportedValue instanceof _aureliaLoader.TemplateRegistryEntry) {
            viewStrategy = new TemplateRegistryViewStrategy(moduleId, exportedValue);
          } else {
            if (conventional = HtmlBehaviorResource.convention(key)) {
              if (conventional.elementName !== null && !mainResource) {
                mainResource = new ResourceDescription(key, exportedValue, conventional);
              } else {
                resources.push(new ResourceDescription(key, exportedValue, conventional));
              }
              _aureliaMetadata.metadata.define(_aureliaMetadata.metadata.resource, conventional, exportedValue);
            } else if (conventional = _aureliaBinding.ValueConverterResource.convention(key)) {
              resources.push(new ResourceDescription(key, exportedValue, conventional));
              _aureliaMetadata.metadata.define(_aureliaMetadata.metadata.resource, conventional, exportedValue);
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
    exports.ModuleAnalyzer = ModuleAnalyzer;
    var logger = _aureliaLogging.getLogger('templating');
    function ensureRegistryEntry(loader, urlOrRegistryEntry) {
      if (urlOrRegistryEntry instanceof _aureliaLoader.TemplateRegistryEntry) {
        return Promise.resolve(urlOrRegistryEntry);
      }
      return loader.loadTemplate(urlOrRegistryEntry);
    }
    var ProxyViewFactory = (function() {
      function ProxyViewFactory(promise) {
        var _this4 = this;
        _classCallCheck(this, ProxyViewFactory);
        promise.then(function(x) {
          return _this4.viewFactory = x;
        });
      }
      ProxyViewFactory.prototype.create = function create(container, bindingContext, createInstruction, element) {
        return this.viewFactory.create(container, bindingContext, createInstruction, element);
      };
      ProxyViewFactory.prototype.setCacheSize = function setCacheSize(size, doNotOverrideIfAlreadySet) {
        this.viewFactory.setCacheSize(size, doNotOverrideIfAlreadySet);
      };
      ProxyViewFactory.prototype.getCachedView = function getCachedView() {
        return this.viewFactory.getCachedView();
      };
      ProxyViewFactory.prototype.returnViewToCache = function returnViewToCache(view) {
        this.viewFactory.returnViewToCache(view);
      };
      _createClass(ProxyViewFactory, [{
        key: 'isCaching',
        get: function get() {
          return this.viewFactory.isCaching;
        }
      }]);
      return ProxyViewFactory;
    })();
    var ViewEngine = (function() {
      _createClass(ViewEngine, null, [{
        key: 'inject',
        value: [_aureliaLoader.Loader, _aureliaDependencyInjection.Container, ViewCompiler, ModuleAnalyzer, ViewResources],
        enumerable: true
      }]);
      function ViewEngine(loader, container, viewCompiler, moduleAnalyzer, appResources) {
        _classCallCheck(this, ViewEngine);
        this.loader = loader;
        this.container = container;
        this.viewCompiler = viewCompiler;
        this.moduleAnalyzer = moduleAnalyzer;
        this.appResources = appResources;
        this._pluginMap = {};
      }
      ViewEngine.prototype.addResourcePlugin = function addResourcePlugin(extension, implementation) {
        var name = extension.replace('.', '') + '-resource-plugin';
        this._pluginMap[extension] = name;
        this.loader.addPlugin(name, implementation);
      };
      ViewEngine.prototype.enhance = function enhance(container, element, resources, bindingContext) {
        var instructions = {};
        this.viewCompiler.compileNode(element, resources, instructions, element.parentNode, 'root', true);
        var factory = new ViewFactory(element, instructions, resources);
        return factory.create(container, bindingContext, {enhance: true});
      };
      ViewEngine.prototype.loadViewFactory = function loadViewFactory(urlOrRegistryEntry, compileInstruction, loadContext) {
        var _this5 = this;
        loadContext = loadContext || new ResourceLoadContext();
        return ensureRegistryEntry(this.loader, urlOrRegistryEntry).then(function(viewRegistryEntry) {
          if (viewRegistryEntry.onReady) {
            if (loadContext.doesNotHaveDependency(urlOrRegistryEntry)) {
              loadContext.addDependency(urlOrRegistryEntry);
              return viewRegistryEntry.onReady;
            }
            return Promise.resolve(new ProxyViewFactory(viewRegistryEntry.onReady));
          }
          loadContext.addDependency(urlOrRegistryEntry);
          viewRegistryEntry.onReady = _this5.loadTemplateResources(viewRegistryEntry, compileInstruction, loadContext).then(function(resources) {
            viewRegistryEntry.setResources(resources);
            var viewFactory = _this5.viewCompiler.compile(viewRegistryEntry.template, resources, compileInstruction);
            viewRegistryEntry.setFactory(viewFactory);
            return viewFactory;
          });
          return viewRegistryEntry.onReady;
        });
      };
      ViewEngine.prototype.loadTemplateResources = function loadTemplateResources(viewRegistryEntry, compileInstruction, loadContext) {
        var resources = new ViewResources(this.appResources, viewRegistryEntry.address);
        var dependencies = viewRegistryEntry.dependencies;
        var importIds = undefined;
        var names = undefined;
        compileInstruction = compileInstruction || ViewCompileInstruction.normal;
        if (dependencies.length === 0 && !compileInstruction.associatedModuleId) {
          return Promise.resolve(resources);
        }
        importIds = dependencies.map(function(x) {
          return x.src;
        });
        names = dependencies.map(function(x) {
          return x.name;
        });
        logger.debug('importing resources for ' + viewRegistryEntry.address, importIds);
        return this.importViewResources(importIds, names, resources, compileInstruction, loadContext);
      };
      ViewEngine.prototype.importViewModelResource = function importViewModelResource(moduleImport, moduleMember) {
        var _this6 = this;
        return this.loader.loadModule(moduleImport).then(function(viewModelModule) {
          var normalizedId = _aureliaMetadata.Origin.get(viewModelModule).moduleId;
          var resourceModule = _this6.moduleAnalyzer.analyze(normalizedId, viewModelModule, moduleMember);
          if (!resourceModule.mainResource) {
            throw new Error('No view model found in module "' + moduleImport + '".');
          }
          resourceModule.initialize(_this6.container);
          return resourceModule.mainResource;
        });
      };
      ViewEngine.prototype.importViewResources = function importViewResources(moduleIds, names, resources, compileInstruction, loadContext) {
        var _this7 = this;
        loadContext = loadContext || new ResourceLoadContext();
        compileInstruction = compileInstruction || ViewCompileInstruction.normal;
        moduleIds = moduleIds.map(function(x) {
          return _this7._applyLoaderPlugin(x);
        });
        return this.loader.loadAllModules(moduleIds).then(function(imports) {
          var i = undefined;
          var ii = undefined;
          var analysis = undefined;
          var normalizedId = undefined;
          var current = undefined;
          var associatedModule = undefined;
          var container = _this7.container;
          var moduleAnalyzer = _this7.moduleAnalyzer;
          var allAnalysis = new Array(imports.length);
          for (i = 0, ii = imports.length; i < ii; ++i) {
            current = imports[i];
            normalizedId = _aureliaMetadata.Origin.get(current).moduleId;
            analysis = moduleAnalyzer.analyze(normalizedId, current);
            analysis.initialize(container);
            analysis.register(resources, names[i]);
            allAnalysis[i] = analysis;
          }
          if (compileInstruction.associatedModuleId) {
            associatedModule = moduleAnalyzer.getAnalysis(compileInstruction.associatedModuleId);
            if (associatedModule) {
              associatedModule.register(resources);
            }
          }
          for (i = 0, ii = allAnalysis.length; i < ii; ++i) {
            allAnalysis[i] = allAnalysis[i].load(container, loadContext);
          }
          return Promise.all(allAnalysis).then(function() {
            return resources;
          });
        });
      };
      ViewEngine.prototype._applyLoaderPlugin = function _applyLoaderPlugin(id) {
        var index = id.lastIndexOf('.');
        if (index !== -1) {
          var ext = id.substring(index);
          var pluginName = this._pluginMap[ext];
          if (pluginName === undefined) {
            return id;
          }
          return this.loader.applyPluginToUrl(id, pluginName);
        }
        return id;
      };
      return ViewEngine;
    })();
    exports.ViewEngine = ViewEngine;
    var Controller = (function() {
      function Controller(behavior, model, instruction) {
        _classCallCheck(this, Controller);
        this.behavior = behavior;
        this.model = model;
        this.isAttached = false;
        var observerLookup = behavior.observerLocator.getOrCreateObserversLookup(model);
        var handlesBind = behavior.handlesBind;
        var attributes = instruction.attributes;
        var boundProperties = this.boundProperties = [];
        var properties = behavior.properties;
        var i = undefined;
        var ii = undefined;
        behavior.ensurePropertiesDefined(model, observerLookup);
        for (i = 0, ii = properties.length; i < ii; ++i) {
          properties[i].initialize(model, observerLookup, attributes, handlesBind, boundProperties);
        }
      }
      Controller.prototype.created = function created(context) {
        if (this.behavior.handlesCreated) {
          this.model.created(context);
        }
      };
      Controller.prototype.bind = function bind(context) {
        var skipSelfSubscriber = this.behavior.handlesBind;
        var boundProperties = this.boundProperties;
        var i = undefined;
        var ii = undefined;
        var x = undefined;
        var observer = undefined;
        var selfSubscriber = undefined;
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
          this.model.bind(context);
        }
        if (this.view) {
          this.view.bind(this.model);
        }
      };
      Controller.prototype.unbind = function unbind() {
        var boundProperties = this.boundProperties;
        var i = undefined;
        var ii = undefined;
        if (this.view) {
          this.view.unbind();
        }
        if (this.behavior.handlesUnbind) {
          this.model.unbind();
        }
        for (i = 0, ii = boundProperties.length; i < ii; ++i) {
          boundProperties[i].binding.unbind();
        }
      };
      Controller.prototype.attached = function attached() {
        if (this.isAttached) {
          return ;
        }
        this.isAttached = true;
        if (this.behavior.handlesAttached) {
          this.model.attached();
        }
        if (this.view) {
          this.view.attached();
        }
      };
      Controller.prototype.detached = function detached() {
        if (this.isAttached) {
          this.isAttached = false;
          if (this.view) {
            this.view.detached();
          }
          if (this.behavior.handlesDetached) {
            this.model.detached();
          }
        }
      };
      return Controller;
    })();
    exports.Controller = Controller;
    var BehaviorPropertyObserver = (function() {
      function BehaviorPropertyObserver(taskQueue, obj, propertyName, selfSubscriber, initialValue) {
        _classCallCheck(this, _BehaviorPropertyObserver);
        this.taskQueue = taskQueue;
        this.obj = obj;
        this.propertyName = propertyName;
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
        if (oldValue !== newValue) {
          if (this.publishing && this.notqueued) {
            this.notqueued = false;
            this.taskQueue.queueMicroTask(this);
          }
          this.oldValue = oldValue;
          this.currentValue = newValue;
        }
      };
      BehaviorPropertyObserver.prototype.call = function call() {
        var oldValue = this.oldValue;
        var newValue = this.currentValue;
        this.notqueued = true;
        if (newValue === oldValue) {
          return ;
        }
        if (this.selfSubscriber) {
          this.selfSubscriber(newValue, oldValue);
        }
        this.callSubscribers(newValue, oldValue);
        this.oldValue = newValue;
      };
      BehaviorPropertyObserver.prototype.subscribe = function subscribe(context, callable) {
        this.addSubscriber(context, callable);
      };
      BehaviorPropertyObserver.prototype.unsubscribe = function unsubscribe(context, callable) {
        this.removeSubscriber(context, callable);
      };
      var _BehaviorPropertyObserver = BehaviorPropertyObserver;
      BehaviorPropertyObserver = _aureliaBinding.subscriberCollection()(BehaviorPropertyObserver) || BehaviorPropertyObserver;
      return BehaviorPropertyObserver;
    })();
    exports.BehaviorPropertyObserver = BehaviorPropertyObserver;
    function getObserver(behavior, instance, name) {
      var lookup = instance.__observers__;
      if (lookup === undefined) {
        lookup = behavior.observerLocator.getOrCreateObserversLookup(instance);
        behavior.ensurePropertiesDefined(instance, lookup);
      }
      return lookup[name];
    }
    var BindableProperty = (function() {
      function BindableProperty(nameOrConfig) {
        _classCallCheck(this, BindableProperty);
        if (typeof nameOrConfig === 'string') {
          this.name = nameOrConfig;
        } else {
          Object.assign(this, nameOrConfig);
        }
        this.attribute = this.attribute || hyphenate(this.name);
        this.defaultBindingMode = this.defaultBindingMode || _aureliaBinding.bindingMode.oneWay;
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
        var name = this.name;
        var handlerName = undefined;
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
      BindableProperty.prototype.createObserver = function createObserver(bindingContext) {
        var selfSubscriber = null;
        var defaultValue = this.defaultValue;
        var changeHandlerName = this.changeHandler;
        var name = this.name;
        var initialValue = undefined;
        if (this.hasOptions) {
          return undefined;
        }
        if (changeHandlerName in bindingContext) {
          if ('propertyChanged' in bindingContext) {
            selfSubscriber = function(newValue, oldValue) {
              bindingContext[changeHandlerName](newValue, oldValue);
              bindingContext.propertyChanged(name, newValue, oldValue);
            };
          } else {
            selfSubscriber = function(newValue, oldValue) {
              return bindingContext[changeHandlerName](newValue, oldValue);
            };
          }
        } else if ('propertyChanged' in bindingContext) {
          selfSubscriber = function(newValue, oldValue) {
            return bindingContext.propertyChanged(name, newValue, oldValue);
          };
        } else if (changeHandlerName !== null) {
          throw new Error('Change handler ' + changeHandlerName + ' was specified but not delcared on the class.');
        }
        if (defaultValue !== undefined) {
          initialValue = typeof defaultValue === 'function' ? defaultValue.call(bindingContext) : defaultValue;
        }
        return new BehaviorPropertyObserver(this.owner.taskQueue, bindingContext, this.name, selfSubscriber, initialValue);
      };
      BindableProperty.prototype.initialize = function initialize(bindingContext, observerLookup, attributes, behaviorHandlesBind, boundProperties) {
        var selfSubscriber = undefined;
        var observer = undefined;
        var attribute = undefined;
        var defaultValue = this.defaultValue;
        if (this.isDynamic) {
          for (var key in attributes) {
            this.createDynamicProperty(bindingContext, observerLookup, behaviorHandlesBind, key, attributes[key], boundProperties);
          }
        } else if (!this.hasOptions) {
          observer = observerLookup[this.name];
          if (attributes !== null) {
            selfSubscriber = observer.selfSubscriber;
            attribute = attributes[this.attribute];
            if (behaviorHandlesBind) {
              observer.selfSubscriber = null;
            }
            if (typeof attribute === 'string') {
              bindingContext[this.name] = attribute;
              observer.call();
            } else if (attribute) {
              boundProperties.push({
                observer: observer,
                binding: attribute.createBinding(bindingContext)
              });
            } else if (defaultValue !== undefined) {
              observer.call();
            }
            observer.selfSubscriber = selfSubscriber;
          }
          observer.publishing = true;
        }
      };
      BindableProperty.prototype.createDynamicProperty = function createDynamicProperty(bindingContext, observerLookup, behaviorHandlesBind, name, attribute, boundProperties) {
        var changeHandlerName = name + 'Changed';
        var selfSubscriber = null;
        var observer = undefined;
        var info = undefined;
        if (changeHandlerName in bindingContext) {
          if ('propertyChanged' in bindingContext) {
            selfSubscriber = function(newValue, oldValue) {
              bindingContext[changeHandlerName](newValue, oldValue);
              bindingContext.propertyChanged(name, newValue, oldValue);
            };
          } else {
            selfSubscriber = function(newValue, oldValue) {
              return bindingContext[changeHandlerName](newValue, oldValue);
            };
          }
        } else if ('propertyChanged' in bindingContext) {
          selfSubscriber = function(newValue, oldValue) {
            return bindingContext.propertyChanged(name, newValue, oldValue);
          };
        }
        observer = observerLookup[name] = new BehaviorPropertyObserver(this.owner.taskQueue, bindingContext, name, selfSubscriber);
        Object.defineProperty(bindingContext, name, {
          configurable: true,
          enumerable: true,
          get: observer.getValue.bind(observer),
          set: observer.setValue.bind(observer)
        });
        if (behaviorHandlesBind) {
          observer.selfSubscriber = null;
        }
        if (typeof attribute === 'string') {
          bindingContext[name] = attribute;
          observer.call();
        } else if (attribute) {
          info = {
            observer: observer,
            binding: attribute.createBinding(bindingContext)
          };
          boundProperties.push(info);
        }
        observer.publishing = true;
        observer.selfSubscriber = selfSubscriber;
      };
      return BindableProperty;
    })();
    exports.BindableProperty = BindableProperty;
    var contentSelectorViewCreateInstruction = {
      suppressBind: true,
      enhance: false
    };
    var lastProviderId = 0;
    function nextProviderId() {
      return ++lastProviderId;
    }
    function doProcessContent() {
      return true;
    }
    var HtmlBehaviorResource = (function() {
      function HtmlBehaviorResource() {
        _classCallCheck(this, HtmlBehaviorResource);
        this.elementName = null;
        this.attributeName = null;
        this.attributeDefaultBindingMode = undefined;
        this.liftsContent = false;
        this.targetShadowDOM = false;
        this.processContent = doProcessContent;
        this.usesShadowDOM = false;
        this.childBindings = null;
        this.hasDynamicOptions = false;
        this.containerless = false;
        this.properties = [];
        this.attributes = {};
      }
      HtmlBehaviorResource.convention = function convention(name, existing) {
        var behavior = undefined;
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
      HtmlBehaviorResource.prototype.addChildBinding = function addChildBinding(behavior) {
        if (this.childBindings === null) {
          this.childBindings = [];
        }
        this.childBindings.push(behavior);
      };
      HtmlBehaviorResource.prototype.initialize = function initialize(container, target) {
        var proto = target.prototype;
        var properties = this.properties;
        var attributeName = this.attributeName;
        var attributeDefaultBindingMode = this.attributeDefaultBindingMode;
        var i = undefined;
        var ii = undefined;
        var current = undefined;
        target.__providerId__ = nextProviderId();
        this.observerLocator = container.get(_aureliaBinding.ObserverLocator);
        this.taskQueue = container.get(_aureliaTaskQueue.TaskQueue);
        this.target = target;
        this.usesShadowDOM = this.targetShadowDOM && _aureliaPal.FEATURE.shadowDOM;
        this.handlesCreated = 'created' in proto;
        this.handlesBind = 'bind' in proto;
        this.handlesUnbind = 'unbind' in proto;
        this.handlesAttached = 'attached' in proto;
        this.handlesDetached = 'detached' in proto;
        this.htmlName = this.elementName || this.attributeName;
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
      HtmlBehaviorResource.prototype.register = function register(registry, name) {
        if (this.attributeName !== null) {
          registry.registerAttribute(name || this.attributeName, this, this.attributeName);
        }
        if (this.elementName !== null) {
          registry.registerElement(name || this.elementName, this);
        }
      };
      HtmlBehaviorResource.prototype.load = function load(container, target, viewStrategy, transientView, loadContext) {
        var _this8 = this;
        var options = undefined;
        if (this.elementName !== null) {
          viewStrategy = viewStrategy || this.viewStrategy || ViewStrategy.getDefault(target);
          options = new ViewCompileInstruction(this.targetShadowDOM, true);
          if (!viewStrategy.moduleId) {
            viewStrategy.moduleId = _aureliaMetadata.Origin.get(target).moduleId;
          }
          return viewStrategy.loadViewFactory(container.get(ViewEngine), options, loadContext).then(function(viewFactory) {
            if (!transientView || !_this8.viewFactory) {
              _this8.viewFactory = viewFactory;
            }
            return viewFactory;
          });
        }
        return Promise.resolve(this);
      };
      HtmlBehaviorResource.prototype.compile = function compile(compiler, resources, node, instruction, parentNode) {
        if (this.liftsContent) {
          if (!instruction.viewFactory) {
            var template = _aureliaPal.DOM.createElement('template');
            var fragment = _aureliaPal.DOM.createDocumentFragment();
            var cacheSize = node.getAttribute('view-cache');
            var part = node.getAttribute('part');
            node.removeAttribute(instruction.originalAttrName);
            _aureliaPal.DOM.replaceNode(template, node, parentNode);
            fragment.appendChild(node);
            instruction.viewFactory = compiler.compile(fragment, resources);
            if (part) {
              instruction.viewFactory.part = part;
              node.removeAttribute('part');
            }
            if (cacheSize) {
              instruction.viewFactory.setCacheSize(cacheSize);
              node.removeAttribute('view-cache');
            }
            node = template;
          }
        } else if (this.elementName !== null) {
          var _partReplacements2 = instruction.partReplacements = {};
          if (this.processContent(compiler, resources, node, instruction) && node.hasChildNodes()) {
            if (this.usesShadowDOM) {
              var currentChild = node.firstChild;
              var nextSibling = undefined;
              var toReplace = undefined;
              while (currentChild) {
                nextSibling = currentChild.nextSibling;
                if (currentChild.tagName === 'TEMPLATE' && (toReplace = currentChild.getAttribute('replace-part'))) {
                  _partReplacements2[toReplace] = compiler.compile(currentChild, resources);
                  _aureliaPal.DOM.removeNode(currentChild, parentNode);
                }
                currentChild = nextSibling;
              }
              instruction.skipContentProcessing = false;
            } else {
              var fragment = _aureliaPal.DOM.createDocumentFragment();
              var currentChild = node.firstChild;
              var nextSibling = undefined;
              var toReplace = undefined;
              while (currentChild) {
                nextSibling = currentChild.nextSibling;
                if (currentChild.tagName === 'TEMPLATE' && (toReplace = currentChild.getAttribute('replace-part'))) {
                  _partReplacements2[toReplace] = compiler.compile(currentChild, resources);
                  _aureliaPal.DOM.removeNode(currentChild, parentNode);
                } else {
                  fragment.appendChild(currentChild);
                }
                currentChild = nextSibling;
              }
              instruction.contentFactory = compiler.compile(fragment, resources);
              instruction.skipContentProcessing = true;
            }
          } else {
            instruction.skipContentProcessing = true;
          }
        }
        return node;
      };
      HtmlBehaviorResource.prototype.create = function create(container, instruction, element, bindings) {
        var host = undefined;
        var au = null;
        instruction = instruction || BehaviorInstruction.normal;
        element = element || null;
        bindings = bindings || null;
        if (this.elementName !== null && element) {
          if (this.usesShadowDOM) {
            host = element.createShadowRoot();
            container.registerInstance(_aureliaPal.DOM.boundary, host);
          } else {
            host = element;
            if (this.targetShadowDOM) {
              container.registerInstance(_aureliaPal.DOM.boundary, host);
            }
          }
        }
        if (element !== null) {
          element.au = au = element.au || {};
        }
        var model = instruction.bindingContext || container.get(this.target);
        var controller = new Controller(this, model, instruction);
        var childBindings = this.childBindings;
        var viewFactory = undefined;
        if (this.liftsContent) {
          au.controller = controller;
        } else if (this.elementName !== null) {
          viewFactory = instruction.viewFactory || this.viewFactory;
          container.viewModel = model;
          if (viewFactory) {
            controller.view = viewFactory.create(container, model, instruction, element);
          }
          if (element !== null) {
            au.controller = controller;
            if (controller.view) {
              if (!this.usesShadowDOM) {
                if (instruction.contentFactory) {
                  var contentView = instruction.contentFactory.create(container, null, contentSelectorViewCreateInstruction);
                  ContentSelector.applySelectors(contentView, controller.view.contentSelectors, function(contentSelector, group) {
                    return contentSelector.add(group);
                  });
                  controller.contentView = contentView;
                }
              }
              if (instruction.anchorIsContainer) {
                if (childBindings !== null) {
                  for (var i = 0,
                      ii = childBindings.length; i < ii; ++i) {
                    controller.view.addBinding(childBindings[i].create(host, model));
                  }
                }
                controller.view.appendNodesTo(host);
              } else {
                controller.view.insertNodesBefore(host);
              }
            } else if (childBindings !== null) {
              for (var i = 0,
                  ii = childBindings.length; i < ii; ++i) {
                bindings.push(childBindings[i].create(element, model));
              }
            }
          } else if (controller.view) {
            controller.view.owner = controller;
            if (childBindings !== null) {
              for (var i = 0,
                  ii = childBindings.length; i < ii; ++i) {
                controller.view.addBinding(childBindings[i].create(instruction.host, model));
              }
            }
          } else if (childBindings !== null) {
            for (var i = 0,
                ii = childBindings.length; i < ii; ++i) {
              bindings.push(childBindings[i].create(instruction.host, model));
            }
          }
        } else if (childBindings !== null) {
          for (var i = 0,
              ii = childBindings.length; i < ii; ++i) {
            bindings.push(childBindings[i].create(element, model));
          }
        }
        if (au !== null) {
          au[this.htmlName] = controller;
        }
        if (instruction.initiatedByBehavior && viewFactory) {
          controller.view.created();
        }
        return controller;
      };
      HtmlBehaviorResource.prototype.ensurePropertiesDefined = function ensurePropertiesDefined(instance, lookup) {
        var properties = undefined;
        var i = undefined;
        var ii = undefined;
        var observer = undefined;
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
    exports.HtmlBehaviorResource = HtmlBehaviorResource;
    var noMutations = [];
    var ChildObserver = (function() {
      function ChildObserver(config) {
        _classCallCheck(this, ChildObserver);
        this.name = config.name;
        this.changeHandler = config.changeHandler || this.name + 'Changed';
        this.selector = config.selector;
      }
      ChildObserver.prototype.create = function create(target, behavior) {
        return new ChildObserverBinder(this.selector, target, this.name, behavior, this.changeHandler);
      };
      return ChildObserver;
    })();
    exports.ChildObserver = ChildObserver;
    var ChildObserverBinder = (function() {
      function ChildObserverBinder(selector, target, property, behavior, changeHandler) {
        _classCallCheck(this, ChildObserverBinder);
        this.selector = selector;
        this.target = target;
        this.property = property;
        this.behavior = behavior;
        this.changeHandler = changeHandler in behavior ? changeHandler : null;
        this.observer = _aureliaPal.DOM.createMutationObserver(this.onChange.bind(this));
      }
      ChildObserverBinder.prototype.bind = function bind(source) {
        var items = undefined;
        var results = undefined;
        var i = undefined;
        var ii = undefined;
        var node = undefined;
        var behavior = this.behavior;
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
          items.push(node.au && node.au.controller ? node.au.controller.model : node);
        }
        if (this.changeHandler !== null) {
          this.behavior[this.changeHandler](noMutations);
        }
      };
      ChildObserverBinder.prototype.unbind = function unbind() {
        this.observer.disconnect();
      };
      ChildObserverBinder.prototype.onChange = function onChange(mutations) {
        var items = this.behavior[this.property];
        var selector = this.selector;
        mutations.forEach(function(record) {
          var added = record.addedNodes;
          var removed = record.removedNodes;
          var prev = record.previousSibling;
          var i = undefined;
          var ii = undefined;
          var primary = undefined;
          var index = undefined;
          var node = undefined;
          for (i = 0, ii = removed.length; i < ii; ++i) {
            node = removed[i];
            if (node.nodeType === 1 && node.matches(selector)) {
              primary = node.au && node.au.controller ? node.au.controller.model : node;
              index = items.indexOf(primary);
              if (index !== -1) {
                items.splice(index, 1);
              }
            }
          }
          for (i = 0, ii = added.length; i < ii; ++i) {
            node = added[i];
            if (node.nodeType === 1 && node.matches(selector)) {
              primary = node.au && node.au.controller ? node.au.controller.model : node;
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
        if (this.changeHandler !== null) {
          this.behavior[this.changeHandler](mutations);
        }
      };
      return ChildObserverBinder;
    })();
    exports.ChildObserverBinder = ChildObserverBinder;
    var CompositionEngine = (function() {
      _createClass(CompositionEngine, null, [{
        key: 'inject',
        value: [ViewEngine],
        enumerable: true
      }]);
      function CompositionEngine(viewEngine) {
        _classCallCheck(this, CompositionEngine);
        this.viewEngine = viewEngine;
      }
      CompositionEngine.prototype.activate = function activate(instruction) {
        if (instruction.skipActivation || typeof instruction.viewModel.activate !== 'function') {
          return Promise.resolve();
        }
        return instruction.viewModel.activate(instruction.model) || Promise.resolve();
      };
      CompositionEngine.prototype.createControllerAndSwap = function createControllerAndSwap(instruction) {
        var _this9 = this;
        var removeResponse = instruction.viewSlot.removeAll(true);
        if (removeResponse instanceof Promise) {
          return removeResponse.then(function() {
            return _this9.createController(instruction).then(function(controller) {
              if (instruction.currentBehavior) {
                instruction.currentBehavior.unbind();
              }
              controller.view.bind(controller.model);
              instruction.viewSlot.add(controller.view);
              return controller;
            });
          });
        }
        return this.createController(instruction).then(function(controller) {
          if (instruction.currentBehavior) {
            instruction.currentBehavior.unbind();
          }
          controller.view.bind(controller.model);
          instruction.viewSlot.add(controller.view);
          return controller;
        });
      };
      CompositionEngine.prototype.createController = function createController(instruction) {
        var childContainer = instruction.childContainer;
        var viewModelResource = instruction.viewModelResource;
        var viewModel = instruction.viewModel;
        var metadata = undefined;
        return this.activate(instruction).then(function() {
          var doneLoading = undefined;
          var viewStrategyFromViewModel = undefined;
          var origin = undefined;
          if ('getViewStrategy' in viewModel && !instruction.view) {
            viewStrategyFromViewModel = true;
            instruction.view = ViewStrategy.normalize(viewModel.getViewStrategy());
          }
          if (instruction.view) {
            if (viewStrategyFromViewModel) {
              origin = _aureliaMetadata.Origin.get(viewModel.constructor);
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
            metadata.initialize(instruction.container || childContainer, viewModel.constructor);
            doneLoading = metadata.load(childContainer, viewModel.constructor, instruction.view, true).then(function(viewFactory) {
              return viewFactory;
            });
          }
          return doneLoading.then(function(viewFactory) {
            return metadata.create(childContainer, BehaviorInstruction.dynamic(instruction.host, viewModel, viewFactory));
          });
        });
      };
      CompositionEngine.prototype.createViewModel = function createViewModel(instruction) {
        var childContainer = instruction.childContainer || instruction.container.createChild();
        instruction.viewModel = instruction.viewResources ? instruction.viewResources.relativeToView(instruction.viewModel) : instruction.viewModel;
        return this.viewEngine.importViewModelResource(instruction.viewModel).then(function(viewModelResource) {
          childContainer.autoRegister(viewModelResource.value);
          if (instruction.host) {
            childContainer.registerInstance(_aureliaPal.DOM.Element, instruction.host);
          }
          instruction.viewModel = childContainer.viewModel = childContainer.get(viewModelResource.value);
          instruction.viewModelResource = viewModelResource;
          return instruction;
        });
      };
      CompositionEngine.prototype.compose = function compose(instruction) {
        var _this10 = this;
        instruction.childContainer = instruction.childContainer || instruction.container.createChild();
        instruction.view = ViewStrategy.normalize(instruction.view);
        if (instruction.viewModel) {
          if (typeof instruction.viewModel === 'string') {
            return this.createViewModel(instruction).then(function(ins) {
              return _this10.createControllerAndSwap(ins);
            });
          }
          return this.createControllerAndSwap(instruction);
        } else if (instruction.view) {
          if (instruction.viewResources) {
            instruction.view.makeRelativeTo(instruction.viewResources.viewUrl);
          }
          return instruction.view.loadViewFactory(this.viewEngine, new ViewCompileInstruction()).then(function(viewFactory) {
            var removeResponse = instruction.viewSlot.removeAll(true);
            if (removeResponse instanceof Promise) {
              return removeResponse.then(function() {
                var result = viewFactory.create(instruction.childContainer, instruction.bindingContext);
                instruction.viewSlot.add(result);
                return result;
              });
            }
            var result = viewFactory.create(instruction.childContainer, instruction.bindingContext);
            instruction.viewSlot.add(result);
            return result;
          });
        } else if (instruction.viewSlot) {
          instruction.viewSlot.removeAll();
          return Promise.resolve(null);
        }
      };
      return CompositionEngine;
    })();
    exports.CompositionEngine = CompositionEngine;
    var ElementConfigResource = (function() {
      function ElementConfigResource() {
        _classCallCheck(this, ElementConfigResource);
      }
      ElementConfigResource.prototype.initialize = function initialize() {};
      ElementConfigResource.prototype.register = function register() {};
      ElementConfigResource.prototype.load = function load(container, Target) {
        var config = new Target();
        var eventManager = container.get(_aureliaBinding.EventManager);
        eventManager.registerElementConfig(config);
      };
      return ElementConfigResource;
    })();
    exports.ElementConfigResource = ElementConfigResource;
    function validateBehaviorName(name, type) {
      if (/[A-Z]/.test(name)) {
        throw new Error('\'' + name + '\' is not a valid ' + type + ' name.  Upper-case letters are not allowed because the DOM is not case-sensitive.');
      }
    }
    function resource(instance) {
      return function(target) {
        _aureliaMetadata.metadata.define(_aureliaMetadata.metadata.resource, instance, target);
      };
    }
    _aureliaMetadata.decorators.configure.parameterizedDecorator('resource', resource);
    function behavior(override) {
      return function(target) {
        if (override instanceof HtmlBehaviorResource) {
          _aureliaMetadata.metadata.define(_aureliaMetadata.metadata.resource, override, target);
        } else {
          var r = _aureliaMetadata.metadata.getOrCreateOwn(_aureliaMetadata.metadata.resource, HtmlBehaviorResource, target);
          Object.assign(r, override);
        }
      };
    }
    _aureliaMetadata.decorators.configure.parameterizedDecorator('behavior', behavior);
    function customElement(name) {
      validateBehaviorName(name, 'custom element');
      return function(target) {
        var r = _aureliaMetadata.metadata.getOrCreateOwn(_aureliaMetadata.metadata.resource, HtmlBehaviorResource, target);
        r.elementName = name;
      };
    }
    _aureliaMetadata.decorators.configure.parameterizedDecorator('customElement', customElement);
    function customAttribute(name, defaultBindingMode) {
      validateBehaviorName(name, 'custom attribute');
      return function(target) {
        var r = _aureliaMetadata.metadata.getOrCreateOwn(_aureliaMetadata.metadata.resource, HtmlBehaviorResource, target);
        r.attributeName = name;
        r.attributeDefaultBindingMode = defaultBindingMode;
      };
    }
    _aureliaMetadata.decorators.configure.parameterizedDecorator('customAttribute', customAttribute);
    function templateController(target) {
      var deco = function deco(t) {
        var r = _aureliaMetadata.metadata.getOrCreateOwn(_aureliaMetadata.metadata.resource, HtmlBehaviorResource, t);
        r.liftsContent = true;
      };
      return target ? deco(target) : deco;
    }
    _aureliaMetadata.decorators.configure.simpleDecorator('templateController', templateController);
    function bindable(nameOrConfigOrTarget, key, descriptor) {
      var deco = function deco(target, key2, descriptor2) {
        var actualTarget = key2 ? target.constructor : target;
        var r = _aureliaMetadata.metadata.getOrCreateOwn(_aureliaMetadata.metadata.resource, HtmlBehaviorResource, actualTarget);
        var prop = undefined;
        if (key2) {
          nameOrConfigOrTarget = nameOrConfigOrTarget || {};
          nameOrConfigOrTarget.name = key2;
        }
        prop = new BindableProperty(nameOrConfigOrTarget);
        return prop.registerWith(actualTarget, r, descriptor2);
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
    _aureliaMetadata.decorators.configure.parameterizedDecorator('bindable', bindable);
    function dynamicOptions(target) {
      var deco = function deco(t) {
        var r = _aureliaMetadata.metadata.getOrCreateOwn(_aureliaMetadata.metadata.resource, HtmlBehaviorResource, t);
        r.hasDynamicOptions = true;
      };
      return target ? deco(target) : deco;
    }
    _aureliaMetadata.decorators.configure.simpleDecorator('dynamicOptions', dynamicOptions);
    function sync(selectorOrConfig) {
      return function(target, key, descriptor) {
        var actualTarget = key ? target.constructor : target;
        var r = _aureliaMetadata.metadata.getOrCreateOwn(_aureliaMetadata.metadata.resource, HtmlBehaviorResource, actualTarget);
        if (typeof selectorOrConfig === 'string') {
          selectorOrConfig = {
            selector: selectorOrConfig,
            name: key
          };
        }
        r.addChildBinding(new ChildObserver(selectorOrConfig));
      };
    }
    _aureliaMetadata.decorators.configure.parameterizedDecorator('sync', sync);
    function useShadowDOM(target) {
      var deco = function deco(t) {
        var r = _aureliaMetadata.metadata.getOrCreateOwn(_aureliaMetadata.metadata.resource, HtmlBehaviorResource, t);
        r.targetShadowDOM = true;
      };
      return target ? deco(target) : deco;
    }
    _aureliaMetadata.decorators.configure.simpleDecorator('useShadowDOM', useShadowDOM);
    function doNotProcessContent() {
      return false;
    }
    function processContent(processor) {
      return function(t) {
        var r = _aureliaMetadata.metadata.getOrCreateOwn(_aureliaMetadata.metadata.resource, HtmlBehaviorResource, t);
        r.processContent = processor || doNotProcessContent;
      };
    }
    _aureliaMetadata.decorators.configure.parameterizedDecorator('processContent', processContent);
    function containerless(target) {
      var deco = function deco(t) {
        var r = _aureliaMetadata.metadata.getOrCreateOwn(_aureliaMetadata.metadata.resource, HtmlBehaviorResource, t);
        r.containerless = true;
      };
      return target ? deco(target) : deco;
    }
    _aureliaMetadata.decorators.configure.simpleDecorator('containerless', containerless);
    function viewStrategy(strategy) {
      return function(target) {
        _aureliaMetadata.metadata.define(ViewStrategy.metadataKey, strategy, target);
      };
    }
    _aureliaMetadata.decorators.configure.parameterizedDecorator('viewStrategy', useView);
    function useView(path) {
      return viewStrategy(new UseViewStrategy(path));
    }
    _aureliaMetadata.decorators.configure.parameterizedDecorator('useView', useView);
    function inlineView(markup, dependencies, dependencyBaseUrl) {
      return viewStrategy(new InlineViewStrategy(markup, dependencies, dependencyBaseUrl));
    }
    _aureliaMetadata.decorators.configure.parameterizedDecorator('inlineView', inlineView);
    function noView(target) {
      var deco = function deco(t) {
        _aureliaMetadata.metadata.define(ViewStrategy.metadataKey, new NoViewStrategy(), t);
      };
      return target ? deco(target) : deco;
    }
    _aureliaMetadata.decorators.configure.simpleDecorator('noView', noView);
    function elementConfig(target) {
      var deco = function deco(t) {
        _aureliaMetadata.metadata.define(_aureliaMetadata.metadata.resource, new ElementConfigResource(), t);
      };
      return target ? deco(target) : deco;
    }
    _aureliaMetadata.decorators.configure.simpleDecorator('elementConfig', elementConfig);
    var templatingEngine = {
      initialize: function initialize(container) {
        this._container = container || new _aureliaDependencyInjection.Container();
        this._moduleAnalyzer = this._container.get(ModuleAnalyzer);
        _aureliaBinding.bindingEngine.initialize(this._container);
      },
      createModelForUnitTest: function createModelForUnitTest(modelType, attributesFromHTML, bindingContext) {
        var _moduleAnalyzer$analyze;
        var exportName = modelType.name;
        var resourceModule = this._moduleAnalyzer.analyze('test-module', (_moduleAnalyzer$analyze = {}, _moduleAnalyzer$analyze[exportName] = modelType, _moduleAnalyzer$analyze), exportName);
        var description = resourceModule.mainResource;
        description.initialize(this._container);
        var model = this._container.get(modelType);
        var controller = new Controller(description.metadata, model, {attributes: attributesFromHTML || {}});
        controller.bind(bindingContext || {});
        return model;
      }
    };
    exports.templatingEngine = templatingEngine;
  }).call(__exports, __exports, __require('npm:core-js@0.9.18'), __require('github:aurelia/logging@0.8.0'), __require('github:aurelia/metadata@0.9.0'), __require('github:aurelia/path@0.10.0'), __require('github:aurelia/loader@0.10.0'), __require('github:aurelia/pal@0.2.0'), __require('github:aurelia/binding@0.10.0'), __require('github:aurelia/dependency-injection@0.11.0'), __require('github:aurelia/task-queue@0.8.0'));
});
})();
(function() {
function define(){};  define.amd = {};
System.register("github:aurelia/binding@0.10.0", ["github:aurelia/binding@0.10.0/aurelia-binding"], false, function(__require, __exports, __module) {
  return (function(main) {
    return main;
  }).call(this, __require('github:aurelia/binding@0.10.0/aurelia-binding'));
});
})();
(function() {
function define(){};  define.amd = {};
System.register("github:aurelia/templating@0.16.0", ["github:aurelia/templating@0.16.0/aurelia-templating"], false, function(__require, __exports, __module) {
  return (function(main) {
    return main;
  }).call(this, __require('github:aurelia/templating@0.16.0/aurelia-templating'));
});
})();
(function() {
function define(){};  define.amd = {};
System.register("github:aurelia/validation@0.4.0/validation", ["github:aurelia/binding@0.10.0", "github:aurelia/validation@0.4.0/validation-group", "github:aurelia/dependency-injection@0.11.0", "github:aurelia/validation@0.4.0/validation-config"], false, function(__require, __exports, __module) {
  return (function(exports, _aureliaBinding, _validationGroup, _aureliaDependencyInjection, _validationConfig) {
    'use strict';
    exports.__esModule = true;
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
      }
    }
    var Validation = (function() {
      function Validation(observerLocator, validationConfig) {
        _classCallCheck(this, _Validation);
        this.observerLocator = observerLocator;
        this.config = validationConfig ? validationConfig : Validation.defaults;
      }
      var _Validation = Validation;
      _Validation.prototype.on = function on(subject, configCallback) {
        var conf = new _validationConfig.ValidationConfig(this.config);
        if (configCallback !== null && configCallback !== undefined && typeof configCallback === 'function') {
          configCallback(conf);
        }
        return new _validationGroup.ValidationGroup(subject, this.observerLocator, conf);
      };
      _Validation.prototype.onBreezeEntity = function onBreezeEntity(breezeEntity, configCallback) {
        var validation = this.on(breezeEntity, configCallback);
        validation.onBreezeEntity();
        return validation;
      };
      Validation = _aureliaDependencyInjection.inject(_aureliaBinding.ObserverLocator)(Validation) || Validation;
      return Validation;
    })();
    exports.Validation = Validation;
    Validation.defaults = new _validationConfig.ValidationConfig();
  }).call(__exports, __exports, __require('github:aurelia/binding@0.10.0'), __require('github:aurelia/validation@0.4.0/validation-group'), __require('github:aurelia/dependency-injection@0.11.0'), __require('github:aurelia/validation@0.4.0/validation-config'));
});
})();
(function() {
function define(){};  define.amd = {};
System.register("github:aurelia/validation@0.4.0/validate-custom-attribute", ["github:aurelia/dependency-injection@0.11.0", "github:aurelia/templating@0.16.0"], false, function(__require, __exports, __module) {
  return (function(exports, _aureliaDependencyInjection, _aureliaTemplating) {
    'use strict';
    exports.__esModule = true;
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
      }
    }
    var ValidateCustomAttribute = (function() {
      function ValidateCustomAttribute(element) {
        _classCallCheck(this, _ValidateCustomAttribute);
        this.element = element;
        this.processedValidation = null;
        this.viewStrategy = null;
      }
      var _ValidateCustomAttribute = ValidateCustomAttribute;
      _ValidateCustomAttribute.prototype.valueChanged = function valueChanged(newValue) {
        if (this.value === null || this.value === undefined) {
          return ;
        }
        this.processedValidation = this.value;
        if (typeof this.value !== 'string') {
          this.subscribeChangedHandlers(this.element);
        }
        return ;
      };
      _ValidateCustomAttribute.prototype.subscribeChangedHandlers = function subscribeChangedHandlers(currentElement) {
        var _this = this;
        var viewStrategy = this.value.config.getViewStrategy();
        var validationProperty = viewStrategy.getValidationProperty(this.value, currentElement);
        var children = currentElement.children;
        this.viewStrategy = viewStrategy;
        if (validationProperty !== null && validationProperty !== undefined) {
          this.viewStrategy.prepareElement(validationProperty, currentElement);
          validationProperty.onValidate(function(vp) {
            _this.viewStrategy.updateElement(vp, currentElement);
          });
        }
        for (var i = 0; i < children.length; i++) {
          this.subscribeChangedHandlers(children[i]);
        }
      };
      _ValidateCustomAttribute.prototype.attached = function attached() {
        if (this.processedValidation === null || this.processedValidation === undefined) {
          this.valueChanged(this.value);
        }
      };
      ValidateCustomAttribute = _aureliaDependencyInjection.inject(Element)(ValidateCustomAttribute) || ValidateCustomAttribute;
      ValidateCustomAttribute = _aureliaTemplating.customAttribute('validate')(ValidateCustomAttribute) || ValidateCustomAttribute;
      return ValidateCustomAttribute;
    })();
    exports.ValidateCustomAttribute = ValidateCustomAttribute;
  }).call(__exports, __exports, __require('github:aurelia/dependency-injection@0.11.0'), __require('github:aurelia/templating@0.16.0'));
});
})();
(function() {
function define(){};  define.amd = {};
System.register("github:aurelia/validation@0.4.0/index", ["github:aurelia/validation@0.4.0/validation-config", "github:aurelia/validation@0.4.0/validation", "github:aurelia/validation@0.4.0/utilities", "github:aurelia/validation@0.4.0/validation-locale", "github:aurelia/validation@0.4.0/validation-result", "github:aurelia/validation@0.4.0/validation-rules", "github:aurelia/validation@0.4.0/validation-group", "github:aurelia/validation@0.4.0/validate-custom-attribute", "github:aurelia/validation@0.4.0/validation-view-strategy", "github:aurelia/validation@0.4.0/strategies/twbootstrap-view-strategy", "github:aurelia/validation@0.4.0/decorators"], false, function(__require, __exports, __module) {
  return (function(exports, _validationConfig, _validation, _utilities, _validationLocale, _validationResult, _validationRules, _validationGroup, _validateCustomAttribute, _validationViewStrategy, _strategiesTwbootstrapViewStrategy, _decorators) {
    'use strict';
    exports.__esModule = true;
    exports.configure = configure;
    function _interopRequireWildcard(obj) {
      if (obj && obj.__esModule) {
        return obj;
      } else {
        var newObj = {};
        if (obj != null) {
          for (var key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key))
              newObj[key] = obj[key];
          }
        }
        newObj['default'] = obj;
        return newObj;
      }
    }
    function _defaults(obj, defaults) {
      var keys = Object.getOwnPropertyNames(defaults);
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        var value = Object.getOwnPropertyDescriptor(defaults, key);
        if (value && value.configurable && obj[key] === undefined) {
          Object.defineProperty(obj, key, value);
        }
      }
      return obj;
    }
    exports.Utilities = _utilities.Utilities;
    exports.ValidationConfig = _validationConfig.ValidationConfig;
    exports.ValidationLocale = _validationLocale.ValidationLocale;
    _defaults(exports, _interopRequireWildcard(_validationResult));
    _defaults(exports, _interopRequireWildcard(_validationRules));
    exports.Validation = _validation.Validation;
    exports.ValidationGroup = _validationGroup.ValidationGroup;
    exports.ValidateCustomAttribute = _validateCustomAttribute.ValidateCustomAttribute;
    exports.ValidationViewStrategy = _validationViewStrategy.ValidationViewStrategy;
    exports.TWBootstrapViewStrategy = _strategiesTwbootstrapViewStrategy.TWBootstrapViewStrategy;
    exports.ensure = _decorators.ensure;
    function configure(aurelia, configCallback) {
      aurelia.globalResources('./validate-custom-attribute');
      if (configCallback !== undefined && typeof configCallback === 'function') {
        configCallback(_validation.Validation.defaults);
      }
      aurelia.singleton(_validationConfig.ValidationConfig, _validation.Validation.defaults);
      return _validation.Validation.defaults.locale();
    }
  }).call(__exports, __exports, __require('github:aurelia/validation@0.4.0/validation-config'), __require('github:aurelia/validation@0.4.0/validation'), __require('github:aurelia/validation@0.4.0/utilities'), __require('github:aurelia/validation@0.4.0/validation-locale'), __require('github:aurelia/validation@0.4.0/validation-result'), __require('github:aurelia/validation@0.4.0/validation-rules'), __require('github:aurelia/validation@0.4.0/validation-group'), __require('github:aurelia/validation@0.4.0/validate-custom-attribute'), __require('github:aurelia/validation@0.4.0/validation-view-strategy'), __require('github:aurelia/validation@0.4.0/strategies/twbootstrap-view-strategy'), __require('github:aurelia/validation@0.4.0/decorators'));
});
})();
(function() {
function define(){};  define.amd = {};
System.register("github:aurelia/validation@0.4.0", ["github:aurelia/validation@0.4.0/index"], false, function(__require, __exports, __module) {
  return (function(main) {
    return main;
  }).call(this, __require('github:aurelia/validation@0.4.0/index'));
});
})();
(function() {
function define(){};  define.amd = {};
System.register("github:aurelia/http-client@0.12.0/aurelia-http-client", ["npm:core-js@0.9.18", "github:aurelia/path@0.10.0", "github:aurelia/pal@0.2.0"], false, function(__require, __exports, __module) {
  return (function(exports, _coreJs, _aureliaPath, _aureliaPal) {
    'use strict';
    exports.__esModule = true;
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
    exports.timeoutTransformer = timeoutTransformer;
    exports.callbackParameterNameTransformer = callbackParameterNameTransformer;
    exports.credentialsTransformer = credentialsTransformer;
    exports.progressTransformer = progressTransformer;
    exports.responseTypeTransformer = responseTypeTransformer;
    exports.headerTransformer = headerTransformer;
    exports.contentTransformer = contentTransformer;
    exports.createJSONPRequestMessageProcessor = createJSONPRequestMessageProcessor;
    exports.createHttpRequestMessageProcessor = createHttpRequestMessageProcessor;
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
        Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
      }
    }
    var Headers = (function() {
      function Headers() {
        var headers = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
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
        var headers = this.headers;
        for (var key in headers) {
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
    exports.Headers = Headers;
    var RequestMessage = (function() {
      function RequestMessage(method, url, content, headers) {
        _classCallCheck(this, RequestMessage);
        this.method = method;
        this.url = url;
        this.content = content;
        this.headers = headers || new Headers();
        this.baseUrl = '';
      }
      RequestMessage.prototype.buildFullUrl = function buildFullUrl() {
        var absoluteUrl = /^([a-z][a-z0-9+\-.]*:)?\/\//i;
        var url = absoluteUrl.test(this.url) ? this.url : _aureliaPath.join(this.baseUrl, this.url);
        if (this.params) {
          var qs = _aureliaPath.buildQueryString(this.params);
          url = qs ? url + '?' + qs : url;
        }
        return url;
      };
      return RequestMessage;
    })();
    exports.RequestMessage = RequestMessage;
    var HttpResponseMessage = (function() {
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
        var contentType = undefined;
        if (this.headers && this.headers.headers)
          contentType = this.headers.headers['Content-Type'];
        if (contentType) {
          this.mimeType = responseType = contentType.split(';')[0].trim();
          if (mimeTypes.hasOwnProperty(this.mimeType))
            responseType = mimeTypes[this.mimeType];
        }
        this.responseType = responseType;
      }
      _createClass(HttpResponseMessage, [{
        key: 'content',
        get: function get() {
          try {
            if (this._content !== undefined) {
              return this._content;
            }
            if (this.response === undefined || this.response === null) {
              this._content = this.response;
              return this._content;
            }
            if (this.responseType === 'json') {
              this._content = JSON.parse(this.response, this.reviver);
              return this._content;
            }
            if (this.reviver) {
              this._content = this.reviver(this.response);
              return this._content;
            }
            this._content = this.response;
            return this._content;
          } catch (e) {
            if (this.isSuccess) {
              throw e;
            }
            this._content = null;
            return this._content;
          }
        }
      }]);
      return HttpResponseMessage;
    })();
    exports.HttpResponseMessage = HttpResponseMessage;
    var mimeTypes = {
      'text/html': 'html',
      'text/javascript': 'js',
      'application/javascript': 'js',
      'text/json': 'json',
      'application/json': 'json',
      'application/rss+xml': 'rss',
      'application/atom+xml': 'atom',
      'application/xhtml+xml': 'xhtml',
      'text/markdown': 'md',
      'text/xml': 'xml',
      'text/mathml': 'mml',
      'application/xml': 'xml',
      'text/yml': 'yml',
      'text/csv': 'csv',
      'text/css': 'css',
      'text/less': 'less',
      'text/stylus': 'styl',
      'text/scss': 'scss',
      'text/sass': 'sass',
      'text/plain': 'txt'
    };
    exports.mimeTypes = mimeTypes;
    function applyXhrTransformers(xhrTransformers, client, processor, message, xhr) {
      var i = undefined;
      var ii = undefined;
      for (i = 0, ii = xhrTransformers.length; i < ii; ++i) {
        xhrTransformers[i](client, processor, message, xhr);
      }
    }
    var RequestMessageProcessor = (function() {
      function RequestMessageProcessor(xhrType, xhrTransformers) {
        _classCallCheck(this, RequestMessageProcessor);
        this.XHRType = xhrType;
        this.xhrTransformers = xhrTransformers;
        this.isAborted = false;
      }
      RequestMessageProcessor.prototype.abort = function abort() {
        if (this.xhr && this.xhr.readyState !== _aureliaPal.PLATFORM.XMLHttpRequest.UNSENT) {
          this.xhr.abort();
        }
        this.isAborted = true;
      };
      RequestMessageProcessor.prototype.process = function process(client, requestMessage) {
        var _this = this;
        var promise = new Promise(function(resolve, reject) {
          var xhr = _this.xhr = new _this.XHRType();
          xhr.onload = function(e) {
            var response = new HttpResponseMessage(requestMessage, xhr, requestMessage.responseType, requestMessage.reviver);
            if (response.isSuccess) {
              resolve(response);
            } else {
              reject(response);
            }
          };
          xhr.ontimeout = function(e) {
            reject(new HttpResponseMessage(requestMessage, {
              response: e,
              status: xhr.status,
              statusText: xhr.statusText
            }, 'timeout'));
          };
          xhr.onerror = function(e) {
            reject(new HttpResponseMessage(requestMessage, {
              response: e,
              status: xhr.status,
              statusText: xhr.statusText
            }, 'error'));
          };
          xhr.onabort = function(e) {
            reject(new HttpResponseMessage(requestMessage, {
              response: e,
              status: xhr.status,
              statusText: xhr.statusText
            }, 'abort'));
          };
        });
        return Promise.resolve(requestMessage).then(function(message) {
          var processRequest = function processRequest() {
            if (_this.isAborted) {
              _this.xhr.abort();
            } else {
              _this.xhr.open(message.method, message.buildFullUrl(), true);
              applyXhrTransformers(_this.xhrTransformers, client, _this, message, _this.xhr);
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
            var _interceptorsPromise;
            interceptorsPromise = (_interceptorsPromise = interceptorsPromise).then.apply(_interceptorsPromise, chain.shift());
          }
          return interceptorsPromise;
        });
      };
      return RequestMessageProcessor;
    })();
    exports.RequestMessageProcessor = RequestMessageProcessor;
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
      if (message.skipContentProcessing) {
        return ;
      }
      if (_aureliaPal.PLATFORM.global.FormData && message.content instanceof FormData) {
        return ;
      }
      if (_aureliaPal.PLATFORM.global.Blob && message.content instanceof Blob) {
        return ;
      }
      if (_aureliaPal.PLATFORM.global.ArrayBufferView && message.content instanceof ArrayBufferView) {
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
    var JSONPRequestMessage = (function(_RequestMessage) {
      _inherits(JSONPRequestMessage, _RequestMessage);
      function JSONPRequestMessage(url, callbackParameterName) {
        _classCallCheck(this, JSONPRequestMessage);
        _RequestMessage.call(this, 'JSONP', url);
        this.responseType = 'jsonp';
        this.callbackParameterName = callbackParameterName;
      }
      return JSONPRequestMessage;
    })(RequestMessage);
    exports.JSONPRequestMessage = JSONPRequestMessage;
    var JSONPXHR = (function() {
      function JSONPXHR() {
        _classCallCheck(this, JSONPXHR);
      }
      JSONPXHR.prototype.open = function open(method, url) {
        this.method = method;
        this.url = url;
        this.callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
      };
      JSONPXHR.prototype.send = function send() {
        var _this2 = this;
        var url = this.url + (this.url.indexOf('?') >= 0 ? '&' : '?') + encodeURIComponent(this.callbackParameterName) + '=' + this.callbackName;
        var script = _aureliaPal.DOM.createElement('script');
        script.src = url;
        script.onerror = function(e) {
          cleanUp();
          _this2.status = 0;
          _this2.onerror(new Error('error'));
        };
        var cleanUp = function cleanUp() {
          delete _aureliaPal.PLATFORM.global[_this2.callbackName];
          _aureliaPal.DOM.removeNode(script);
        };
        _aureliaPal.PLATFORM.global[this.callbackName] = function(data) {
          cleanUp();
          if (_this2.status === undefined) {
            _this2.status = 200;
            _this2.statusText = 'OK';
            _this2.response = data;
            _this2.onload(_this2);
          }
        };
        _aureliaPal.DOM.appendNode(script);
        if (this.timeout !== undefined) {
          setTimeout(function() {
            if (_this2.status === undefined) {
              _this2.status = 0;
              _this2.ontimeout(new Error('timeout'));
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
    function createJSONPRequestMessageProcessor() {
      return new RequestMessageProcessor(JSONPXHR, [timeoutTransformer, callbackParameterNameTransformer]);
    }
    var HttpRequestMessage = (function(_RequestMessage2) {
      _inherits(HttpRequestMessage, _RequestMessage2);
      function HttpRequestMessage(method, url, content, headers) {
        _classCallCheck(this, HttpRequestMessage);
        _RequestMessage2.call(this, method, url, content, headers);
        this.responseType = 'json';
      }
      return HttpRequestMessage;
    })(RequestMessage);
    exports.HttpRequestMessage = HttpRequestMessage;
    function createHttpRequestMessageProcessor() {
      return new RequestMessageProcessor(_aureliaPal.PLATFORM.XMLHttpRequest, [timeoutTransformer, credentialsTransformer, progressTransformer, responseTypeTransformer, contentTransformer, headerTransformer]);
    }
    var RequestBuilder = (function() {
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
    exports.RequestBuilder = RequestBuilder;
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
    RequestBuilder.addHelper('skipContentProcessing', function() {
      return function(client, processor, message) {
        message.skipContentProcessing = true;
      };
    });
    function trackRequestStart(client, processor) {
      client.pendingRequests.push(processor);
      client.isRequesting = true;
    }
    function trackRequestEnd(client, processor) {
      var index = client.pendingRequests.indexOf(processor);
      client.pendingRequests.splice(index, 1);
      client.isRequesting = client.pendingRequests.length > 0;
      if (!client.isRequesting) {
        (function() {
          var evt = _aureliaPal.DOM.createCustomEvent('aurelia-http-client-requests-drained', {
            bubbles: true,
            cancelable: true
          });
          setTimeout(function() {
            return _aureliaPal.DOM.dispatchEvent(evt);
          }, 1);
        })();
      }
    }
    var HttpClient = (function() {
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
      HttpClient.prototype.send = function send(requestMessage, transformers) {
        var _this3 = this;
        var createProcessor = this.requestProcessorFactories.get(requestMessage.constructor);
        var processor = undefined;
        var promise = undefined;
        var i = undefined;
        var ii = undefined;
        if (!createProcessor) {
          throw new Error('No request message processor factory for ' + requestMessage.constructor + '.');
        }
        processor = createProcessor();
        trackRequestStart(this, processor);
        transformers = transformers || this.requestTransformers;
        promise = Promise.resolve(requestMessage).then(function(message) {
          for (i = 0, ii = transformers.length; i < ii; ++i) {
            transformers[i](_this3, processor, message);
          }
          return processor.process(_this3, message).then(function(response) {
            trackRequestEnd(_this3, processor);
            return response;
          })['catch'](function(response) {
            trackRequestEnd(_this3, processor);
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
        var callbackParameterName = arguments.length <= 1 || arguments[1] === undefined ? 'jsoncallback' : arguments[1];
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
    exports.HttpClient = HttpClient;
  }).call(__exports, __exports, __require('npm:core-js@0.9.18'), __require('github:aurelia/path@0.10.0'), __require('github:aurelia/pal@0.2.0'));
});
})();
(function() {
function define(){};  define.amd = {};
System.register("github:aurelia/http-client@0.12.0", ["github:aurelia/http-client@0.12.0/aurelia-http-client"], false, function(__require, __exports, __module) {
  return (function(main) {
    return main;
  }).call(this, __require('github:aurelia/http-client@0.12.0/aurelia-http-client'));
});
})();
(function() {
function define(){};  define.amd = {};
System.register("github:aurelia/history@0.8.0/aurelia-history", [], false, function(__require, __exports, __module) {
  return (function(exports) {
    'use strict';
    exports.__esModule = true;
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
      }
    }
    var History = (function() {
      function History() {
        _classCallCheck(this, History);
      }
      History.prototype.activate = function activate(options) {
        throw new Error('History must implement activate().');
      };
      History.prototype.deactivate = function deactivate() {
        throw new Error('History must implement deactivate().');
      };
      History.prototype.navigate = function navigate(fragment, options) {
        throw new Error('History must implement navigate().');
      };
      History.prototype.navigateBack = function navigateBack() {
        throw new Error('History must implement navigateBack().');
      };
      return History;
    })();
    exports.History = History;
  }).call(__exports, __exports);
});
})();
(function() {
function define(){};  define.amd = {};
System.register("github:aurelia/event-aggregator@0.9.0/aurelia-event-aggregator", ["github:aurelia/logging@0.8.0"], false, function(__require, __exports, __module) {
  return (function(exports, _aureliaLogging) {
    'use strict';
    exports.__esModule = true;
    exports.includeEventsIn = includeEventsIn;
    exports.configure = configure;
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
      }
    }
    var logger = _aureliaLogging.getLogger('event-aggregator');
    var Handler = (function() {
      function Handler(messageType, callback) {
        _classCallCheck(this, Handler);
        this.messageType = messageType;
        this.callback = callback;
      }
      Handler.prototype.handle = function handle(message) {
        if (message instanceof this.messageType) {
          this.callback.call(null, message);
        }
      };
      return Handler;
    })();
    var EventAggregator = (function() {
      function EventAggregator() {
        _classCallCheck(this, EventAggregator);
        this.eventLookup = {};
        this.messageHandlers = [];
      }
      EventAggregator.prototype.publish = function publish(event, data) {
        var subscribers = undefined;
        var i = undefined;
        if (typeof event === 'string') {
          subscribers = this.eventLookup[event];
          if (subscribers) {
            subscribers = subscribers.slice();
            i = subscribers.length;
            try {
              while (i--) {
                subscribers[i](data, event);
              }
            } catch (e) {
              logger.error(e);
            }
          }
        } else {
          subscribers = this.messageHandlers.slice();
          i = subscribers.length;
          try {
            while (i--) {
              subscribers[i].handle(event);
            }
          } catch (e) {
            logger.error(e);
          }
        }
      };
      EventAggregator.prototype.subscribe = function subscribe(event, callback) {
        var handler = undefined;
        var subscribers = undefined;
        if (typeof event === 'string') {
          handler = callback;
          subscribers = this.eventLookup[event] || (this.eventLookup[event] = []);
        } else {
          handler = new Handler(event, callback);
          subscribers = this.messageHandlers;
        }
        subscribers.push(handler);
        return {dispose: function dispose() {
            var idx = subscribers.indexOf(handler);
            if (idx !== -1) {
              subscribers.splice(idx, 1);
            }
          }};
      };
      EventAggregator.prototype.subscribeOnce = function subscribeOnce(event, callback) {
        var sub = this.subscribe(event, function(a, b) {
          sub.dispose();
          return callback(a, b);
        });
        return sub;
      };
      return EventAggregator;
    })();
    exports.EventAggregator = EventAggregator;
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
    function configure(config) {
      config.instance(EventAggregator, includeEventsIn(config.aurelia));
    }
  }).call(__exports, __exports, __require('github:aurelia/logging@0.8.0'));
});
})();
(function() {
function define(){};  define.amd = {};
System.register("github:aurelia/history@0.8.0", ["github:aurelia/history@0.8.0/aurelia-history"], false, function(__require, __exports, __module) {
  return (function(main) {
    return main;
  }).call(this, __require('github:aurelia/history@0.8.0/aurelia-history'));
});
})();
(function() {
function define(){};  define.amd = {};
System.register("github:aurelia/event-aggregator@0.9.0", ["github:aurelia/event-aggregator@0.9.0/aurelia-event-aggregator"], false, function(__require, __exports, __module) {
  return (function(main) {
    return main;
  }).call(this, __require('github:aurelia/event-aggregator@0.9.0/aurelia-event-aggregator'));
});
})();
(function() {
function define(){};  define.amd = {};
System.register("github:aurelia/route-recognizer@0.8.0/aurelia-route-recognizer", ["npm:core-js@0.9.18", "github:aurelia/path@0.10.0"], false, function(__require, __exports, __module) {
  return (function(exports, _coreJs, _aureliaPath) {
    'use strict';
    exports.__esModule = true;
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
      }
    }
    var State = (function() {
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
        var nextStates = this.nextStates;
        var results = [];
        for (var i = 0,
            l = nextStates.length; i < l; i++) {
          var child = nextStates[i];
          var charSpec = child.charSpec;
          if (charSpec.validChars !== undefined) {
            if (charSpec.validChars.indexOf(ch) !== -1) {
              results.push(child);
            }
          } else if (charSpec.invalidChars !== undefined) {
            if (charSpec.invalidChars.indexOf(ch) === -1) {
              results.push(child);
            }
          }
        }
        return results;
      };
      return State;
    })();
    exports.State = State;
    var specials = ['/', '.', '*', '+', '?', '|', '(', ')', '[', ']', '{', '}', '\\'];
    var escapeRegex = new RegExp('(\\' + specials.join('|\\') + ')', 'g');
    var StaticSegment = (function() {
      function StaticSegment(string) {
        _classCallCheck(this, StaticSegment);
        this.string = string;
      }
      StaticSegment.prototype.eachChar = function eachChar(callback) {
        for (var _iterator2 = this.string,
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
          var ch = _ref2;
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
    exports.StaticSegment = StaticSegment;
    var DynamicSegment = (function() {
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
    exports.DynamicSegment = DynamicSegment;
    var StarSegment = (function() {
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
    exports.StarSegment = StarSegment;
    var EpsilonSegment = (function() {
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
    exports.EpsilonSegment = EpsilonSegment;
    var RouteRecognizer = (function() {
      function RouteRecognizer() {
        _classCallCheck(this, RouteRecognizer);
        this.rootState = new State();
        this.names = {};
      }
      RouteRecognizer.prototype.add = function add(route) {
        var _this = this;
        if (Array.isArray(route)) {
          route.forEach(function(r) {
            return _this.add(r);
          });
          return undefined;
        }
        var currentState = this.rootState;
        var regex = '^';
        var types = {
          statics: 0,
          dynamics: 0,
          stars: 0
        };
        var names = [];
        var routeName = route.handler.name;
        var isEmpty = true;
        var segments = parse(route.path, names, types);
        for (var i = 0,
            ii = segments.length; i < ii; i++) {
          var segment = segments[i];
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
        var route = this.names[name];
        if (!route) {
          throw new Error('There is no route named ' + name);
        }
        return [].concat(route.handlers);
      };
      RouteRecognizer.prototype.hasRoute = function hasRoute(name) {
        return !!this.names[name];
      };
      RouteRecognizer.prototype.generate = function generate(name, params) {
        var routeParams = Object.assign({}, params);
        var route = this.names[name];
        if (!route) {
          throw new Error('There is no route named ' + name);
        }
        var segments = route.segments;
        var consumed = {};
        var output = '';
        for (var i = 0,
            l = segments.length; i < l; i++) {
          var segment = segments[i];
          if (segment instanceof EpsilonSegment) {
            continue;
          }
          output += '/';
          var segmentValue = segment.generate(routeParams, consumed);
          if (segmentValue === null || segmentValue === undefined) {
            throw new Error('A value is required for route parameter \'' + segment.name + '\' in route \'' + name + '\'.');
          }
          output += segmentValue;
        }
        if (output.charAt(0) !== '/') {
          output = '/' + output;
        }
        for (var param in consumed) {
          delete routeParams[param];
        }
        var queryString = _aureliaPath.buildQueryString(routeParams);
        output += queryString ? '?' + queryString : '';
        return output;
      };
      RouteRecognizer.prototype.recognize = function recognize(path) {
        var states = [this.rootState];
        var queryParams = {};
        var isSlashDropped = false;
        var normalizedPath = path;
        var queryStart = normalizedPath.indexOf('?');
        if (queryStart !== -1) {
          var queryString = normalizedPath.substr(queryStart + 1, normalizedPath.length);
          normalizedPath = normalizedPath.substr(0, queryStart);
          queryParams = _aureliaPath.parseQueryString(queryString);
        }
        normalizedPath = decodeURI(normalizedPath);
        if (normalizedPath.charAt(0) !== '/') {
          normalizedPath = '/' + normalizedPath;
        }
        var pathLen = normalizedPath.length;
        if (pathLen > 1 && normalizedPath.charAt(pathLen - 1) === '/') {
          normalizedPath = normalizedPath.substr(0, pathLen - 1);
          isSlashDropped = true;
        }
        for (var i = 0,
            l = normalizedPath.length; i < l; i++) {
          states = recognizeChar(states, normalizedPath.charAt(i));
          if (!states.length) {
            break;
          }
        }
        var solutions = [];
        for (var i = 0,
            l = states.length; i < l; i++) {
          if (states[i].handlers) {
            solutions.push(states[i]);
          }
        }
        states = sortSolutions(solutions);
        var state = solutions[0];
        if (state && state.handlers) {
          if (isSlashDropped && state.regex.source.slice(-5) === '(.+)$') {
            normalizedPath = normalizedPath + '/';
          }
          return findHandler(state, normalizedPath, queryParams);
        }
      };
      return RouteRecognizer;
    })();
    exports.RouteRecognizer = RouteRecognizer;
    var RecognizeResults = function RecognizeResults(queryParams) {
      _classCallCheck(this, RecognizeResults);
      this.splice = Array.prototype.splice;
      this.slice = Array.prototype.slice;
      this.push = Array.prototype.push;
      this.length = 0;
      this.queryParams = queryParams || {};
    };
    function parse(route, names, types) {
      var normalizedRoute = route;
      if (route.charAt(0) === '/') {
        normalizedRoute = route.substr(1);
      }
      var results = [];
      for (var _iterator3 = normalizedRoute.split('/'),
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
        var match = segment.match(/^:([^\/]+)$/);
        if (match) {
          results.push(new DynamicSegment(match[1]));
          names.push(match[1]);
          types.dynamics++;
          continue;
        }
        match = segment.match(/^\*([^\/]+)$/);
        if (match) {
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
        nextStates.push.apply(nextStates, state.match(ch));
      }
      return nextStates;
    }
    function findHandler(state, path, queryParams) {
      var handlers = state.handlers;
      var regex = state.regex;
      var captures = path.match(regex);
      var currentCapture = 1;
      var result = new RecognizeResults(queryParams);
      for (var i = 0,
          l = handlers.length; i < l; i++) {
        var _handler = handlers[i];
        var _names = _handler.names;
        var _params = {};
        for (var j = 0,
            m = _names.length; j < m; j++) {
          _params[_names[j]] = captures[currentCapture++];
        }
        result.push({
          handler: _handler.handler,
          params: _params,
          isDynamic: !!_names.length
        });
      }
      return result;
    }
    function addSegment(currentState, segment) {
      var state = currentState;
      segment.eachChar(function(ch) {
        state = state.put(ch);
      });
      return state;
    }
  }).call(__exports, __exports, __require('npm:core-js@0.9.18'), __require('github:aurelia/path@0.10.0'));
});
})();
(function() {
function define(){};  define.amd = {};
System.register("github:aurelia/route-recognizer@0.8.0", ["github:aurelia/route-recognizer@0.8.0/aurelia-route-recognizer"], false, function(__require, __exports, __module) {
  return (function(main) {
    return main;
  }).call(this, __require('github:aurelia/route-recognizer@0.8.0/aurelia-route-recognizer'));
});
})();
(function() {
function define(){};  define.amd = {};
System.register("github:aurelia/router@0.13.0/aurelia-router", ["npm:core-js@0.9.18", "github:aurelia/logging@0.8.0", "github:aurelia/dependency-injection@0.11.0", "github:aurelia/pal@0.2.0", "github:aurelia/route-recognizer@0.8.0", "github:aurelia/history@0.8.0", "github:aurelia/event-aggregator@0.9.0"], false, function(__require, __exports, __module) {
  return (function(exports, _coreJs, _aureliaLogging, _aureliaDependencyInjection, _aureliaPal, _aureliaRouteRecognizer, _aureliaHistory, _aureliaEventAggregator) {
    'use strict';
    exports.__esModule = true;
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
    exports.createRouteFilterStep = createRouteFilterStep;
    exports.processPotential = processPotential;
    exports.normalizeAbsolutePath = normalizeAbsolutePath;
    exports.createRootedPath = createRootedPath;
    exports.resolveUrl = resolveUrl;
    exports.isNavigationCommand = isNavigationCommand;
    exports.buildNavigationPlan = buildNavigationPlan;
    exports.loadNewRoute = loadNewRoute;
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
        Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
      }
    }
    var RouteFilterContainer = (function() {
      RouteFilterContainer.inject = function inject() {
        return [_aureliaDependencyInjection.Container];
      };
      function RouteFilterContainer(container) {
        _classCallCheck(this, RouteFilterContainer);
        this.container = container;
        this.filters = {};
        this.filterCache = {};
      }
      RouteFilterContainer.prototype.addStep = function addStep(name, step) {
        var index = arguments.length <= 2 || arguments[2] === undefined ? -1 : arguments[2];
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
        this.filterCache[name] = steps;
        return steps;
      };
      return RouteFilterContainer;
    })();
    exports.RouteFilterContainer = RouteFilterContainer;
    function createRouteFilterStep(name) {
      function create(routeFilterContainer) {
        return new RouteFilterStep(name, routeFilterContainer);
      }
      create.inject = function() {
        return [RouteFilterContainer];
      };
      return create;
    }
    var RouteFilterStep = (function() {
      function RouteFilterStep(name, routeFilterContainer) {
        _classCallCheck(this, RouteFilterStep);
        this.isMultiStep = true;
        this.name = name;
        this.routeFilterContainer = routeFilterContainer;
      }
      RouteFilterStep.prototype.getSteps = function getSteps() {
        return this.routeFilterContainer.getFilterSteps(this.name);
      };
      return RouteFilterStep;
    })();
    function createResult(ctx, next) {
      return {
        status: next.status,
        context: ctx,
        output: next.output,
        completed: next.status === pipelineStatus.completed
      };
    }
    var pipelineStatus = {
      completed: 'completed',
      canceled: 'canceled',
      rejected: 'rejected',
      running: 'running'
    };
    exports.pipelineStatus = pipelineStatus;
    var Pipeline = (function() {
      function Pipeline() {
        _classCallCheck(this, Pipeline);
        this.steps = [];
      }
      Pipeline.prototype.withStep = function withStep(step) {
        var run = undefined;
        if (typeof step === 'function') {
          run = step;
        } else if (step.isMultiStep) {
          var steps = step.getSteps();
          for (var i = 0,
              l = steps.length; i < l; i++) {
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
        var index = -1;
        var steps = this.steps;
        function next() {
          index++;
          if (index < steps.length) {
            var currentStep = steps[index];
            try {
              return currentStep(ctx, next);
            } catch (e) {
              return next.reject(e);
            }
          } else {
            return next.complete();
          }
        }
        next.complete = function(output) {
          next.status = pipelineStatus.completed;
          next.output = output;
          return Promise.resolve(createResult(ctx, next));
        };
        next.cancel = function(reason) {
          next.status = pipelineStatus.canceled;
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
    exports.Pipeline = Pipeline;
    var NavigationInstruction = (function() {
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
        var viewportInstruction = this.viewPortInstructions[viewPortName] = {
          name: viewPortName,
          strategy: strategy,
          moduleId: moduleId,
          component: component,
          childRouter: component.childRouter,
          lifecycleArgs: this.lifecycleArgs.slice()
        };
        return viewportInstruction;
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
    exports.NavigationInstruction = NavigationInstruction;
    var NavModel = (function() {
      function NavModel(router, relativeHref) {
        _classCallCheck(this, NavModel);
        this.isActive = false;
        this.title = null;
        this.href = null;
        this.relativeHref = null;
        this.settings = {};
        this.config = null;
        this.router = router;
        this.relativeHref = relativeHref;
      }
      NavModel.prototype.setTitle = function setTitle(title) {
        this.title = title;
        if (this.isActive) {
          this.router.updateTitle();
        }
      };
      return NavModel;
    })();
    exports.NavModel = NavModel;
    function processPotential(obj, resolve, reject) {
      if (obj && typeof obj.then === 'function') {
        var dfd = obj.then(resolve);
        if (typeof dfd['catch'] === 'function') {
          return dfd['catch'](reject);
        } else if (typeof dfd.fail === 'function') {
          return dfd.fail(reject);
        }
        return dfd;
      }
      try {
        return resolve(obj);
      } catch (error) {
        return reject(error);
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
      if ((!path.length || path[path.length - 1] !== '/') && fragment[0] !== '/') {
        path += '/';
      }
      if (path.length && path[path.length - 1] === '/' && fragment[0] === '/') {
        path = path.substring(0, path.length - 1);
      }
      return normalizeAbsolutePath(path + fragment, hasPushState);
    }
    function resolveUrl(fragment, baseUrl, hasPushState) {
      if (isRootedPath.test(fragment)) {
        return normalizeAbsolutePath(fragment, hasPushState);
      }
      return createRootedPath(fragment, baseUrl, hasPushState);
    }
    var isRootedPath = /^#?\//;
    var isAbsoluteUrl = /^([a-z][a-z0-9+\-.]*:)?\/\//i;
    function isNavigationCommand(obj) {
      return obj && typeof obj.navigate === 'function';
    }
    var Redirect = (function() {
      function Redirect(url) {
        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
        _classCallCheck(this, Redirect);
        this.url = url;
        this.options = Object.assign({
          trigger: true,
          replace: true
        }, options);
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
    exports.Redirect = Redirect;
    var RouterConfiguration = (function() {
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
        return this;
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
    exports.RouterConfiguration = RouterConfiguration;
    var activationStrategy = {
      noChange: 'no-change',
      invokeLifecycle: 'invoke-lifecycle',
      replace: 'replace'
    };
    exports.activationStrategy = activationStrategy;
    function buildNavigationPlan(navigationContext, forceLifecycleMinimum) {
      var prev = navigationContext.prevInstruction;
      var next = navigationContext.nextInstruction;
      var plan = {};
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
        var _loop = function(viewPortName) {
          var prevViewPortInstruction = prev.viewPortInstructions[viewPortName];
          var nextViewPortConfig = next.config.viewPorts[viewPortName];
          var viewPortPlan = plan[viewPortName] = {
            name: viewPortName,
            config: nextViewPortConfig,
            prevComponent: prevViewPortInstruction.component,
            prevModuleId: prevViewPortInstruction.moduleId
          };
          if (prevViewPortInstruction.moduleId !== nextViewPortConfig.moduleId) {
            viewPortPlan.strategy = activationStrategy.replace;
          } else if ('determineActivationStrategy' in prevViewPortInstruction.component.bindingContext) {
            var _prevViewPortInstruction$component$bindingContext;
            viewPortPlan.strategy = (_prevViewPortInstruction$component$bindingContext = prevViewPortInstruction.component.bindingContext).determineActivationStrategy.apply(_prevViewPortInstruction$component$bindingContext, next.lifecycleArgs);
          } else if (next.config.activationStrategy) {
            viewPortPlan.strategy = next.config.activationStrategy;
          } else if (newParams || forceLifecycleMinimum) {
            viewPortPlan.strategy = activationStrategy.invokeLifecycle;
          } else {
            viewPortPlan.strategy = activationStrategy.noChange;
          }
          if (viewPortPlan.strategy !== activationStrategy.replace && prevViewPortInstruction.childRouter) {
            var path = next.getWildcardPath();
            var task = prevViewPortInstruction.childRouter.createNavigationInstruction(path, next).then(function(childInstruction) {
              viewPortPlan.childNavigationContext = prevViewPortInstruction.childRouter.createNavigationContext(childInstruction);
              return buildNavigationPlan(viewPortPlan.childNavigationContext, viewPortPlan.strategy === activationStrategy.invokeLifecycle).then(function(childPlan) {
                viewPortPlan.childNavigationContext.plan = childPlan;
              });
            });
            pending.push(task);
          }
        };
        for (var viewPortName in prev.viewPortInstructions) {
          _loop(viewPortName);
        }
        return Promise.all(pending).then(function() {
          return plan;
        });
      }
      for (var viewPortName in next.config.viewPorts) {
        plan[viewPortName] = {
          name: viewPortName,
          strategy: activationStrategy.replace,
          config: next.config.viewPorts[viewPortName]
        };
      }
      return Promise.resolve(plan);
    }
    var BuildNavigationPlanStep = (function() {
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
    exports.BuildNavigationPlanStep = BuildNavigationPlanStep;
    function hasDifferentParameterValues(prev, next) {
      var prevParams = prev.params;
      var nextParams = next.params;
      var nextWildCardName = next.config.hasChildRouter ? next.getWildCardName() : null;
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
      instruction = instruction.parentInstruction;
      while (instruction) {
        instructionBaseUrlParts.unshift(instruction.getBaseUrl());
        instruction = instruction.parentInstruction;
      }
      instructionBaseUrlParts.unshift('/');
      return instructionBaseUrlParts.join('');
    }
    var CanDeactivatePreviousStep = (function() {
      function CanDeactivatePreviousStep() {
        _classCallCheck(this, CanDeactivatePreviousStep);
      }
      CanDeactivatePreviousStep.prototype.run = function run(navigationContext, next) {
        return processDeactivatable(navigationContext.plan, 'canDeactivate', next);
      };
      return CanDeactivatePreviousStep;
    })();
    exports.CanDeactivatePreviousStep = CanDeactivatePreviousStep;
    var CanActivateNextStep = (function() {
      function CanActivateNextStep() {
        _classCallCheck(this, CanActivateNextStep);
      }
      CanActivateNextStep.prototype.run = function run(navigationContext, next) {
        return processActivatable(navigationContext, 'canActivate', next);
      };
      return CanActivateNextStep;
    })();
    exports.CanActivateNextStep = CanActivateNextStep;
    var DeactivatePreviousStep = (function() {
      function DeactivatePreviousStep() {
        _classCallCheck(this, DeactivatePreviousStep);
      }
      DeactivatePreviousStep.prototype.run = function run(navigationContext, next) {
        return processDeactivatable(navigationContext.plan, 'deactivate', next, true);
      };
      return DeactivatePreviousStep;
    })();
    exports.DeactivatePreviousStep = DeactivatePreviousStep;
    var ActivateNextStep = (function() {
      function ActivateNextStep() {
        _classCallCheck(this, ActivateNextStep);
      }
      ActivateNextStep.prototype.run = function run(navigationContext, next) {
        return processActivatable(navigationContext, 'activate', next, true);
      };
      return ActivateNextStep;
    })();
    exports.ActivateNextStep = ActivateNextStep;
    function processDeactivatable(plan, callbackName, next, ignoreResult) {
      var infos = findDeactivatable(plan, callbackName);
      var i = infos.length;
      function inspect(val) {
        if (ignoreResult || shouldContinue(val)) {
          return iterate();
        }
        return next.cancel(val);
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
        }
        return next();
      }
      return iterate();
    }
    function findDeactivatable(plan, callbackName) {
      var list = arguments.length <= 2 || arguments[2] === undefined ? [] : arguments[2];
      for (var viewPortName in plan) {
        var viewPortPlan = plan[viewPortName];
        var prevComponent = viewPortPlan.prevComponent;
        if ((viewPortPlan.strategy === activationStrategy.invokeLifecycle || viewPortPlan.strategy === activationStrategy.replace) && prevComponent) {
          var controller = prevComponent.bindingContext;
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
      var childRouter = component.childRouter;
      if (childRouter && childRouter.currentInstruction) {
        var viewPortInstructions = childRouter.currentInstruction.viewPortInstructions;
        for (var viewPortName in viewPortInstructions) {
          var viewPortInstruction = viewPortInstructions[viewPortName];
          var prevComponent = viewPortInstruction.component;
          var prevController = prevComponent.bindingContext;
          if (callbackName in prevController) {
            list.push(prevController);
          }
          addPreviousDeactivatable(prevComponent, callbackName, list);
        }
      }
    }
    function processActivatable(navigationContext, callbackName, next, ignoreResult) {
      var infos = findActivatable(navigationContext, callbackName);
      var length = infos.length;
      var i = -1;
      function inspect(val, router) {
        if (ignoreResult || shouldContinue(val, router)) {
          return iterate();
        }
        return next.cancel(val);
      }
      function iterate() {
        i++;
        if (i < length) {
          try {
            var _ret2 = (function() {
              var _current$controller;
              var current = infos[i];
              var result = (_current$controller = current.controller)[callbackName].apply(_current$controller, current.lifecycleArgs);
              return {v: processPotential(result, function(val) {
                  return inspect(val, current.router);
                }, next.cancel)};
            })();
            if (typeof _ret2 === 'object')
              return _ret2.v;
          } catch (error) {
            return next.cancel(error);
          }
        }
        return next();
      }
      return iterate();
    }
    function findActivatable(navigationContext, callbackName, list, router) {
      if (list === undefined)
        list = [];
      var plan = navigationContext.plan;
      var next = navigationContext.nextInstruction;
      Object.keys(plan).filter(function(viewPortName) {
        var viewPortPlan = plan[viewPortName];
        var viewPortInstruction = next.viewPortInstructions[viewPortName];
        var controller = viewPortInstruction.component.bindingContext;
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
      if (output === undefined) {
        return true;
      }
      return output;
    }
    var NavigationContext = (function() {
      function NavigationContext(router, nextInstruction) {
        _classCallCheck(this, NavigationContext);
        this.router = router;
        this.nextInstruction = nextInstruction;
        this.currentInstruction = router.currentInstruction;
        this.prevInstruction = router.currentInstruction;
      }
      NavigationContext.prototype.getAllContexts = function getAllContexts() {
        var acc = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
        acc.push(this);
        if (this.plan) {
          for (var key in this.plan) {
            this.plan[key].childNavigationContext && this.plan[key].childNavigationContext.getAllContexts(acc);
          }
        }
        return acc;
      };
      NavigationContext.prototype.commitChanges = function commitChanges(waitToSwap) {
        var next = this.nextInstruction;
        var prev = this.prevInstruction;
        var viewPortInstructions = next.viewPortInstructions;
        var router = this.router;
        var loads = [];
        var delaySwaps = [];
        router.currentInstruction = next;
        if (prev) {
          prev.config.navModel.isActive = false;
        }
        next.config.navModel.isActive = true;
        router.refreshBaseUrl();
        router.refreshNavigation();
        var _loop2 = function(viewPortName) {
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
        };
        for (var viewPortName in viewPortInstructions) {
          _loop2(viewPortName);
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
          _aureliaPal.DOM.title = title;
        }
      };
      NavigationContext.prototype.buildTitle = function buildTitle() {
        var separator = arguments.length <= 0 || arguments[0] === undefined ? ' | ' : arguments[0];
        var next = this.nextInstruction;
        var title = next.config.navModel.title || '';
        var viewPortInstructions = next.viewPortInstructions;
        var childTitles = [];
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
        get: function get() {
          return this.getAllContexts().map(function(c) {
            return c.nextInstruction;
          }).filter(function(c) {
            return c;
          });
        }
      }, {
        key: 'currentInstructions',
        get: function get() {
          return this.getAllContexts().map(function(c) {
            return c.currentInstruction;
          }).filter(function(c) {
            return c;
          });
        }
      }, {
        key: 'prevInstructions',
        get: function get() {
          return this.getAllContexts().map(function(c) {
            return c.prevInstruction;
          }).filter(function(c) {
            return c;
          });
        }
      }]);
      return NavigationContext;
    })();
    exports.NavigationContext = NavigationContext;
    var CommitChangesStep = (function() {
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
    exports.CommitChangesStep = CommitChangesStep;
    var RouteLoader = (function() {
      function RouteLoader() {
        _classCallCheck(this, RouteLoader);
      }
      RouteLoader.prototype.loadRoute = function loadRoute(router, config, navigationContext) {
        throw Error('Route loaders must implement "loadRoute(router, config, navigationContext)".');
      };
      return RouteLoader;
    })();
    exports.RouteLoader = RouteLoader;
    var LoadRouteStep = (function() {
      LoadRouteStep.inject = function inject() {
        return [RouteLoader];
      };
      function LoadRouteStep(routeLoader) {
        _classCallCheck(this, LoadRouteStep);
        this.routeLoader = routeLoader;
      }
      LoadRouteStep.prototype.run = function run(navigationContext, next) {
        return loadNewRoute(this.routeLoader, navigationContext).then(next)['catch'](next.cancel);
      };
      return LoadRouteStep;
    })();
    exports.LoadRouteStep = LoadRouteStep;
    function loadNewRoute(routeLoader, navigationContext) {
      var toLoad = determineWhatToLoad(navigationContext);
      var loadPromises = toLoad.map(function(current) {
        return loadRoute(routeLoader, current.navigationContext, current.viewPortPlan);
      });
      return Promise.all(loadPromises);
    }
    function determineWhatToLoad(navigationContext) {
      var toLoad = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];
      var plan = navigationContext.plan;
      var next = navigationContext.nextInstruction;
      for (var viewPortName in plan) {
        var viewPortPlan = plan[viewPortName];
        if (viewPortPlan.strategy === activationStrategy.replace) {
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
        var childRouter = component.childRouter;
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
      var router = navigationContext.router;
      var lifecycleArgs = navigationContext.nextInstruction.lifecycleArgs;
      return routeLoader.loadRoute(router, config, navigationContext).then(function(component) {
        var bindingContext = component.bindingContext;
        var childContainer = component.childContainer;
        component.router = router;
        component.config = config;
        if ('configureRouter' in bindingContext) {
          var _ret4 = (function() {
            var childRouter = childContainer.getChildRouter();
            component.childRouter = childRouter;
            return {v: childRouter.configure(function(c) {
                return bindingContext.configureRouter.apply(bindingContext, [c, childRouter].concat(lifecycleArgs));
              }).then(function() {
                return component;
              })};
          })();
          if (typeof _ret4 === 'object')
            return _ret4.v;
        }
        return component;
      });
    }
    var Router = (function() {
      function Router(container, history) {
        _classCallCheck(this, Router);
        this.viewPorts = {};
        this.fallbackOrder = 100;
        this.recognizer = new _aureliaRouteRecognizer.RouteRecognizer();
        this.childRecognizer = new _aureliaRouteRecognizer.RouteRecognizer();
        this.routes = [];
        this.baseUrl = '';
        this.isConfigured = false;
        this.isNavigating = false;
        this.navigation = [];
        this.container = container;
        this.history = history;
        this.reset();
      }
      Router.prototype.registerViewPort = function registerViewPort(viewPort, name) {
        name = name || 'default';
        this.viewPorts[name] = viewPort;
      };
      Router.prototype.ensureConfigured = function ensureConfigured() {
        return this._configuredPromise;
      };
      Router.prototype.configure = function configure(callbackOrConfig) {
        var _this = this;
        this.isConfigured = true;
        var result = callbackOrConfig;
        var config = undefined;
        if (typeof callbackOrConfig === 'function') {
          config = new RouterConfiguration();
          result = callbackOrConfig(config);
        }
        return Promise.resolve(result).then(function(c) {
          (c || config).exportToRouter(_this);
          _this.isConfigured = true;
          _this._resolveConfiguredPromise();
        });
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
      Router.prototype.generate = function generate(name, params) {
        var hasRoute = this.recognizer.hasRoute(name);
        if ((!this.isConfigured || !hasRoute) && this.parent) {
          return this.parent.generate(name, params);
        }
        if (!hasRoute) {
          throw new Error('A route with name \'' + name + '\' could not be found. Check that `name: \'' + name + '\'` was specified in the route\'s config.');
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
        var path = config.route;
        if (path.charAt(0) === '/') {
          path = path.substr(1);
        }
        var state = this.recognizer.add({
          path: path,
          handler: config
        });
        if (path) {
          var _settings = config.settings;
          delete config.settings;
          var withChild = JSON.parse(JSON.stringify(config));
          config.settings = _settings;
          withChild.route = path + '/*childRoute';
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
          if (!navModel.href && navModel.href !== '' && (state.types.dynamics || state.types.stars)) {
            throw new Error('Invalid route config: dynamic routes must specify an href to be included in the navigation model.');
          }
          if (typeof navModel.order !== 'number') {
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
            } else if (typeof config === 'string') {
              instruction.config.moduleId = config;
              done(instruction);
            } else if (typeof config === 'function') {
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
        var _this2 = this;
        this.fallbackOrder = 100;
        this.recognizer = new _aureliaRouteRecognizer.RouteRecognizer();
        this.childRecognizer = new _aureliaRouteRecognizer.RouteRecognizer();
        this.routes = [];
        this.isNavigating = false;
        this.navigation = [];
        if (this.isConfigured || !this._configuredPromise) {
          this._configuredPromise = new Promise(function(resolve) {
            _this2._resolveConfiguredPromise = resolve;
          });
        }
        this.isConfigured = false;
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
            _length = nav.length; i < _length; i++) {
          var current = nav[i];
          if (!current.href) {
            current.href = createRootedPath(current.relativeHref, this.baseUrl, this.history._hasPushState);
          }
        }
      };
      Router.prototype.createNavigationInstruction = function createNavigationInstruction() {
        var url = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
        var parentInstruction = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
        var fragment = url;
        var queryString = '';
        var queryIndex = url.indexOf('?');
        if (queryIndex !== -1) {
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
          var _instruction = new NavigationInstruction(fragment, queryString, first.params, first.queryParams || results.queryParams, first.config || first.handler, parentInstruction);
          if (typeof first.handler === 'function') {
            return evaluateNavigationStrategy(_instruction, first.handler, first);
          } else if (first.handler && 'navigationStrategy' in first.handler) {
            return evaluateNavigationStrategy(_instruction, first.handler.navigationStrategy, first.handler);
          }
          return Promise.resolve(_instruction);
        }
        return Promise.reject(new Error('Route not found: ' + url));
      };
      Router.prototype.createNavigationContext = function createNavigationContext(instruction) {
        instruction.navigationContext = new NavigationContext(this, instruction);
        return instruction.navigationContext;
      };
      _createClass(Router, [{
        key: 'isRoot',
        get: function get() {
          return false;
        }
      }]);
      return Router;
    })();
    exports.Router = Router;
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
    var PipelineProvider = (function() {
      PipelineProvider.inject = function inject() {
        return [_aureliaDependencyInjection.Container];
      };
      function PipelineProvider(container) {
        _classCallCheck(this, PipelineProvider);
        this.container = container;
        this.steps = [BuildNavigationPlanStep, CanDeactivatePreviousStep, LoadRouteStep, createRouteFilterStep('authorize'), createRouteFilterStep('modelbind'), CanActivateNextStep, DeactivatePreviousStep, ActivateNextStep, createRouteFilterStep('precommit'), CommitChangesStep, createRouteFilterStep('postcomplete')];
      }
      PipelineProvider.prototype.createPipeline = function createPipeline(navigationContext) {
        var _this3 = this;
        var pipeline = new Pipeline();
        this.steps.forEach(function(step) {
          return pipeline.withStep(_this3.container.get(step));
        });
        return pipeline;
      };
      return PipelineProvider;
    })();
    exports.PipelineProvider = PipelineProvider;
    var logger = _aureliaLogging.getLogger('app-router');
    var AppRouter = (function(_Router) {
      _inherits(AppRouter, _Router);
      AppRouter.inject = function inject() {
        return [_aureliaDependencyInjection.Container, _aureliaHistory.History, PipelineProvider, _aureliaEventAggregator.EventAggregator];
      };
      function AppRouter(container, history, pipelineProvider, events) {
        _classCallCheck(this, AppRouter);
        _Router.call(this, container, history);
        this.pipelineProvider = pipelineProvider;
        this.events = events;
        this.maxInstructionCount = 10;
      }
      AppRouter.prototype.loadUrl = function loadUrl(url) {
        var _this4 = this;
        return this.createNavigationInstruction(url).then(function(instruction) {
          return _this4.queueInstruction(instruction);
        })['catch'](function(error) {
          logger.error(error);
          restorePreviousLocation(_this4);
        });
      };
      AppRouter.prototype.queueInstruction = function queueInstruction(instruction) {
        var _this5 = this;
        return new Promise(function(resolve) {
          instruction.resolve = resolve;
          _this5.queue.unshift(instruction);
          _this5.dequeueInstruction();
        });
      };
      AppRouter.prototype.dequeueInstruction = function dequeueInstruction() {
        var _this6 = this;
        var instructionCount = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
        return Promise.resolve().then(function() {
          if (_this6.isNavigating && !instructionCount) {
            return undefined;
          }
          var instruction = _this6.queue.shift();
          _this6.queue = [];
          if (!instruction) {
            return undefined;
          }
          _this6.isNavigating = true;
          if (!instructionCount) {
            _this6.events.publish('router:navigation:processing', {instruction: instruction});
          } else if (instructionCount === _this6.maxInstructionCount - 1) {
            logger.error(instructionCount + 1 + ' navigation instructions have been attempted without success. Restoring last known good location.');
            restorePreviousLocation(_this6);
            return _this6.dequeueInstruction(instructionCount + 1);
          } else if (instructionCount > _this6.maxInstructionCount) {
            throw new Error('Maximum navigation attempts exceeded. Giving up.');
          }
          var context = _this6.createNavigationContext(instruction);
          var pipeline = _this6.pipelineProvider.createPipeline(context);
          return pipeline.run(context).then(function(result) {
            return processResult(instruction, result, instructionCount, _this6);
          })['catch'](function(error) {
            return {output: error instanceof Error ? error : new Error(error)};
          }).then(function(result) {
            return resolveInstruction(instruction, result, !!instructionCount, _this6);
          });
        });
      };
      AppRouter.prototype.registerViewPort = function registerViewPort(viewPort, name) {
        var _this7 = this;
        _Router.prototype.registerViewPort.call(this, viewPort, name);
        if (!this.isActive) {
          var _ret5 = (function() {
            var viewModel = _this7._findViewModel(viewPort);
            if ('configureRouter' in viewModel) {
              if (!_this7.isConfigured) {
                return {v: _this7.configure(function(config) {
                    return viewModel.configureRouter(config, _this7);
                  }).then(function() {
                    _this7.activate();
                  })};
              }
            } else {
              _this7.activate();
            }
          })();
          if (typeof _ret5 === 'object')
            return _ret5.v;
        } else {
          this.dequeueInstruction();
        }
        return Promise.resolve();
      };
      AppRouter.prototype._findViewModel = function _findViewModel(viewPort) {
        if (this.container.viewModel) {
          return this.container.viewModel;
        }
        if (viewPort.container) {
          var container = viewPort.container;
          while (container) {
            if (container.viewModel) {
              this.container.viewModel = container.viewModel;
              return container.viewModel;
            }
            container = container.parent;
          }
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
        get: function get() {
          return true;
        }
      }]);
      return AppRouter;
    })(Router);
    exports.AppRouter = AppRouter;
    function processResult(instruction, result, instructionCount, router) {
      if (!(result && 'completed' in result && 'output' in result)) {
        result = result || {};
        result.output = new Error('Expected router pipeline to return a navigation result, but got [' + JSON.stringify(result) + '] instead.');
      }
      var finalResult = null;
      if (isNavigationCommand(result.output)) {
        result.output.navigate(router);
      } else {
        finalResult = result;
        if (!result.completed) {
          if (result.output instanceof Error) {
            logger.error(result.output);
          }
          restorePreviousLocation(router);
        }
      }
      return router.dequeueInstruction(instructionCount + 1).then(function(innerResult) {
        return finalResult || innerResult || result;
      });
    }
    function resolveInstruction(instruction, result, isInnerInstruction, router) {
      instruction.resolve(result);
      if (!isInnerInstruction) {
        router.isNavigating = false;
        var eventArgs = {
          instruction: instruction,
          result: result
        };
        var eventName = undefined;
        if (result.output instanceof Error) {
          eventName = 'error';
        } else if (!result.completed) {
          eventName = 'canceled';
        } else {
          var queryString = instruction.queryString ? '?' + instruction.queryString : '';
          router.history.previousLocation = instruction.fragment + queryString;
          eventName = 'success';
        }
        router.events.publish('router:navigation:' + eventName, eventArgs);
        router.events.publish('router:navigation:complete', eventArgs);
      }
      return result;
    }
    function restorePreviousLocation(router) {
      var previousLocation = router.history.previousLocation;
      if (previousLocation) {
        router.navigate(router.history.previousLocation, {
          trigger: false,
          replace: true
        });
      } else {
        logger.error('Router navigation failed, and no previous location could be restored.');
      }
    }
  }).call(__exports, __exports, __require('npm:core-js@0.9.18'), __require('github:aurelia/logging@0.8.0'), __require('github:aurelia/dependency-injection@0.11.0'), __require('github:aurelia/pal@0.2.0'), __require('github:aurelia/route-recognizer@0.8.0'), __require('github:aurelia/history@0.8.0'), __require('github:aurelia/event-aggregator@0.9.0'));
});
})();
(function() {
function define(){};  define.amd = {};
System.register("github:aurelia/router@0.13.0", ["github:aurelia/router@0.13.0/aurelia-router"], false, function(__require, __exports, __module) {
  return (function(main) {
    return main;
  }).call(this, __require('github:aurelia/router@0.13.0/aurelia-router'));
});
})();
(function() {
function define(){};  define.amd = {};
System.register("github:aurelia/pal-browser@0.2.0/aurelia-pal-browser", ["github:aurelia/pal@0.2.0"], false, function(__require, __exports, __module) {
  return (function(exports, _aureliaPal) {
    'use strict';
    exports.__esModule = true;
    exports.ensureFunctionName = ensureFunctionName;
    exports.ensureClassList = ensureClassList;
    exports.ensureCustomEvent = ensureCustomEvent;
    exports.ensureElementMatches = ensureElementMatches;
    exports.ensureHTMLTemplateElement = ensureHTMLTemplateElement;
    exports.initialize = initialize;
    function ensureFunctionName() {
      function test() {}
      if (!test.name) {
        Object.defineProperty(Function.prototype, 'name', {get: function get() {
            var name = this.toString().match(/^\s*function\s*(\S*)\s*\(/)[1];
            Object.defineProperty(this, 'name', {value: name});
            return name;
          }});
      }
    }
    function ensureClassList() {
      if (!('classList' in document.createElement('_')) || document.createElementNS && !('classList' in document.createElementNS('http://www.w3.org/2000/svg', 'g'))) {
        (function() {
          var protoProp = 'prototype';
          var strTrim = String.prototype.trim;
          var arrIndexOf = Array.prototype.indexOf;
          var emptyArray = [];
          var DOMEx = function DOMEx(type, message) {
            this.name = type;
            this.code = DOMException[type];
            this.message = message;
          };
          var checkTokenAndGetIndex = function checkTokenAndGetIndex(classList, token) {
            if (token === '') {
              throw new DOMEx('SYNTAX_ERR', 'An invalid or illegal string was specified');
            }
            if (/\s/.test(token)) {
              throw new DOMEx('INVALID_CHARACTER_ERR', 'String contains an invalid character');
            }
            return arrIndexOf.call(classList, token);
          };
          var ClassList = function ClassList(elem) {
            var trimmedClasses = strTrim.call(elem.getAttribute('class') || '');
            var classes = trimmedClasses ? trimmedClasses.split(/\s+/) : emptyArray;
            for (var i = 0,
                ii = classes.length; i < ii; ++i) {
              this.push(classes[i]);
            }
            this._updateClassName = function() {
              elem.setAttribute('class', this.toString());
            };
          };
          var classListProto = ClassList[protoProp] = [];
          DOMEx[protoProp] = Error[protoProp];
          classListProto.item = function(i) {
            return this[i] || null;
          };
          classListProto.contains = function(token) {
            token += '';
            return checkTokenAndGetIndex(this, token) !== -1;
          };
          classListProto.add = function() {
            var tokens = arguments;
            var i = 0;
            var ii = tokens.length;
            var token = undefined;
            var updated = false;
            do {
              token = tokens[i] + '';
              if (checkTokenAndGetIndex(this, token) === -1) {
                this.push(token);
                updated = true;
              }
            } while (++i < ii);
            if (updated) {
              this._updateClassName();
            }
          };
          classListProto.remove = function() {
            var tokens = arguments;
            var i = 0;
            var ii = tokens.length;
            var token = undefined;
            var updated = false;
            var index = undefined;
            do {
              token = tokens[i] + '';
              index = checkTokenAndGetIndex(this, token);
              while (index !== -1) {
                this.splice(index, 1);
                updated = true;
                index = checkTokenAndGetIndex(this, token);
              }
            } while (++i < ii);
            if (updated) {
              this._updateClassName();
            }
          };
          classListProto.toggle = function(token, force) {
            token += '';
            var result = this.contains(token);
            var method = result ? force !== true && 'remove' : force !== false && 'add';
            if (method) {
              this[method](token);
            }
            if (force === true || force === false) {
              return force;
            }
            return !result;
          };
          classListProto.toString = function() {
            return this.join(' ');
          };
          Object.defineProperty(Element.prototype, 'classList', {
            get: function get() {
              return new ClassList(this);
            },
            enumerable: true,
            configurable: true
          });
        })();
      } else {
        var testElement = document.createElement('_');
        testElement.classList.add('c1', 'c2');
        if (!testElement.classList.contains('c2')) {
          var createMethod = function createMethod(method) {
            var original = DOMTokenList.prototype[method];
            DOMTokenList.prototype[method] = function(token) {
              for (var i = 0,
                  ii = arguments.length; i < ii; ++i) {
                token = arguments[i];
                original.call(this, token);
              }
            };
          };
          createMethod('add');
          createMethod('remove');
        }
        testElement.classList.toggle('c3', false);
        if (testElement.classList.contains('c3')) {
          (function() {
            var _toggle = DOMTokenList.prototype.toggle;
            DOMTokenList.prototype.toggle = function(token, force) {
              if (1 in arguments && !this.contains(token) === !force) {
                return force;
              }
              return _toggle.call(this, token);
            };
          })();
        }
        testElement = null;
      }
    }
    function ensureCustomEvent() {
      if (!window.CustomEvent || typeof window.CustomEvent !== 'function') {
        var _CustomEvent = function _CustomEvent(event, params) {
          params = params || {
            bubbles: false,
            cancelable: false,
            detail: undefined
          };
          var evt = document.createEvent('CustomEvent');
          evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
          return evt;
        };
        _CustomEvent.prototype = window.Event.prototype;
        window.CustomEvent = _CustomEvent;
      }
    }
    function ensureElementMatches() {
      if (Element && !Element.prototype.matches) {
        var proto = Element.prototype;
        proto.matches = proto.matchesSelector || proto.mozMatchesSelector || proto.msMatchesSelector || proto.oMatchesSelector || proto.webkitMatchesSelector;
      }
    }
    var FEATURE = {};
    exports.FEATURE = FEATURE;
    FEATURE.shadowDOM = (function() {
      return !!HTMLElement.prototype.createShadowRoot;
    })();
    FEATURE.scopedCSS = (function() {
      return 'scoped' in document.createElement('style');
    })();
    FEATURE.htmlTemplateElement = (function() {
      return 'content' in document.createElement('template');
    })();
    FEATURE.objectObserve = (function detectObjectObserve() {
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
      if (records.length !== 3) {
        return false;
      }
      if (records[0].type !== 'add' || records[1].type !== 'update' || records[2].type !== 'delete') {
        return false;
      }
      Object.unobserve(test, callback);
      return true;
    })();
    FEATURE.arrayObserve = (function detectArrayObserve() {
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
      if (records.length !== 2) {
        return false;
      }
      if (records[0].type !== 'splice' || records[1].type !== 'splice') {
        return false;
      }
      Array.unobserve(arr, callback);
      return true;
    })();
    function ensureHTMLTemplateElement() {
      function isSVGTemplate(el) {
        return el.tagName === 'template' && el.namespaceURI === 'http://www.w3.org/2000/svg';
      }
      function fixSVGTemplateElement(el) {
        var template = el.ownerDocument.createElement('template');
        var attrs = el.attributes;
        var length = attrs.length;
        var attr = undefined;
        el.parentNode.insertBefore(template, el);
        while (length-- > 0) {
          attr = attrs[length];
          template.setAttribute(attr.name, attr.value);
          el.removeAttribute(attr.name);
        }
        el.parentNode.removeChild(el);
        return fixHTMLTemplateElement(template);
      }
      function fixHTMLTemplateElement(template) {
        var content = template.content = document.createDocumentFragment();
        var child = undefined;
        while (child = template.firstChild) {
          content.appendChild(child);
        }
        return template;
      }
      function fixHTMLTemplateElementRoot(template) {
        var content = fixHTMLTemplateElement(template).content;
        var childTemplates = content.querySelectorAll('template');
        for (var i = 0,
            ii = childTemplates.length; i < ii; ++i) {
          var child = childTemplates[i];
          if (isSVGTemplate(child)) {
            fixSVGTemplateElement(child);
          } else {
            fixHTMLTemplateElement(child);
          }
        }
        return template;
      }
      if (FEATURE.htmlTemplateElement) {
        FEATURE.ensureHTMLTemplateElement = function(template) {
          return template;
        };
      } else {
        FEATURE.ensureHTMLTemplateElement = fixHTMLTemplateElementRoot;
      }
    }
    var shadowPoly = window.ShadowDOMPolyfill || null;
    var DOM = {
      Element: Element,
      SVGElement: SVGElement,
      boundary: 'aurelia-dom-boundary',
      addEventListener: function addEventListener(eventName, callback, capture) {
        document.addEventListener(eventName, callback, capture);
      },
      removeEventListener: function removeEventListener(eventName, callback, capture) {
        document.removeEventListener(eventName, callback, capture);
      },
      adoptNode: function adoptNode(node) {
        return document.adoptNode(node, true);
      },
      createElement: function createElement(tagName) {
        return document.createElement(tagName);
      },
      createTextNode: function createTextNode(text) {
        return document.createTextNode(text);
      },
      createComment: function createComment(text) {
        return document.createComment(text);
      },
      createDocumentFragment: function createDocumentFragment() {
        return document.createDocumentFragment();
      },
      createMutationObserver: function createMutationObserver(callback) {
        return new (window.MutationObserver || window.WebKitMutationObserver)(callback);
      },
      createCustomEvent: function createCustomEvent(eventType, options) {
        return new window.CustomEvent(eventType, options);
      },
      dispatchEvent: function dispatchEvent(evt) {
        document.dispatchEvent(evt);
      },
      getComputedStyle: function getComputedStyle(element) {
        return window.getComputedStyle(element);
      },
      getElementById: function getElementById(id) {
        return document.getElementById(id);
      },
      querySelectorAll: function querySelectorAll(query) {
        return document.querySelectorAll(query);
      },
      nextElementSibling: function nextElementSibling(element) {
        if (element.nextElementSibling) {
          return element.nextElementSibling;
        }
        do {
          element = element.nextSibling;
        } while (element && element.nodeType !== 1);
        return element;
      },
      createTemplateFromMarkup: function createTemplateFromMarkup(markup) {
        var parser = document.createElement('div');
        parser.innerHTML = markup;
        var temp = parser.firstElementChild;
        if (!temp || temp.nodeName !== 'TEMPLATE') {
          throw new Error('Template markup must be wrapped in a <template> element e.g. <template> <!-- markup here --> </template>');
        }
        return FEATURE.ensureHTMLTemplateElement(temp);
      },
      appendNode: function appendNode(newNode, parentNode) {
        (parentNode || document.body).appendChild(newNode);
      },
      replaceNode: function replaceNode(newNode, node, parentNode) {
        if (node.parentNode) {
          node.parentNode.replaceChild(newNode, node);
        } else if (shadowPoly !== null) {
          shadowPoly.unwrap(parentNode).replaceChild(shadowPoly.unwrap(newNode), shadowPoly.unwrap(node));
        } else {
          parentNode.replaceChild(newNode, node);
        }
      },
      removeNode: function removeNode(node, parentNode) {
        if (node.parentNode) {
          node.parentNode.removeChild(node);
        } else if (shadowPoly !== null) {
          shadowPoly.unwrap(parentNode).removeChild(shadowPoly.unwrap(node));
        } else {
          parentNode.removeChild(node);
        }
      },
      injectStyles: function injectStyles(styles, destination, prepend) {
        var node = document.createElement('style');
        node.innerHTML = styles;
        node.type = 'text/css';
        destination = destination || document.head;
        if (prepend && destination.childNodes.length > 0) {
          destination.insertBefore(node, destination.childNodes[0]);
        } else {
          destination.appendChild(node);
        }
        return node;
      }
    };
    exports.DOM = DOM;
    var PLATFORM = {
      location: window.location,
      history: window.history,
      addEventListener: function addEventListener(eventName, callback, capture) {
        this.global.addEventListener(eventName, callback, capture);
      },
      removeEventListener: function removeEventListener(eventName, callback, capture) {
        this.global.removeEventListener(eventName, callback, capture);
      }
    };
    exports.PLATFORM = PLATFORM;
    var isInitialized = false;
    function initialize() {
      if (isInitialized) {
        return ;
      }
      isInitialized = true;
      ensureCustomEvent();
      ensureFunctionName();
      ensureHTMLTemplateElement();
      ensureElementMatches();
      ensureClassList();
      _aureliaPal.initializePAL(function(platform, feature, dom) {
        Object.assign(platform, PLATFORM);
        Object.assign(feature, FEATURE);
        Object.assign(dom, DOM);
        Object.defineProperty(dom, 'title', {
          get: function get() {
            return document.title;
          },
          set: function set(value) {
            document.title = value;
          }
        });
        Object.defineProperty(dom, 'activeElement', {get: function get() {
            return document.activeElement;
          }});
        Object.defineProperty(platform, 'XMLHttpRequest', {get: function get() {
            return platform.global.XMLHttpRequest;
          }});
      });
    }
  }).call(__exports, __exports, __require('github:aurelia/pal@0.2.0'));
});
})();
(function() {
function define(){};  define.amd = {};
System.register("github:aurelia/pal-browser@0.2.0", ["github:aurelia/pal-browser@0.2.0/aurelia-pal-browser"], false, function(__require, __exports, __module) {
  return (function(main) {
    return main;
  }).call(this, __require('github:aurelia/pal-browser@0.2.0/aurelia-pal-browser'));
});
})();
(function() {
function define(){};  define.amd = {};
System.register("github:aurelia/bootstrapper@0.18.0/aurelia-bootstrapper", ["npm:core-js@0.9.18", "github:aurelia/pal@0.2.0", "github:aurelia/pal-browser@0.2.0"], false, function(__require, __exports, __module) {
  return (function(exports, _coreJs, _aureliaPal, _aureliaPalBrowser) {
    'use strict';
    exports.__esModule = true;
    exports.bootstrap = bootstrap;
    var bootstrapQueue = [];
    var sharedLoader = null;
    var Aurelia = null;
    function onBootstrap(callback) {
      return new Promise(function(resolve, reject) {
        if (sharedLoader) {
          resolve(callback(sharedLoader));
        } else {
          bootstrapQueue.push(function() {
            try {
              resolve(callback(sharedLoader));
            } catch (e) {
              reject(e);
            }
          });
        }
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
    function createLoader() {
      if (_aureliaPal.PLATFORM.Loader) {
        return Promise.resolve(new _aureliaPal.PLATFORM.Loader());
      }
      if (window.System) {
        var bootstrapperName = System.normalizeSync('aurelia-bootstrapper');
        var loaderName = System.normalizeSync('aurelia-loader-default', bootstrapperName);
        return System['import'](loaderName).then(function(m) {
          return new m.DefaultLoader();
        });
      } else if (window.require) {
        return new Promise(function(resolve, reject) {
          return require(['aurelia-loader-default'], function(m) {
            return resolve(new m.DefaultLoader());
          }, reject);
        });
      }
      throw new Error('No PLATFORM.Loader is defined and there is neither a System API (ES6) or a Require API (AMD) globally available to load your app.');
    }
    function preparePlatform(loader) {
      var bootstrapperName = loader.normalizeSync('aurelia-bootstrapper');
      var frameworkName = loader.normalizeSync('aurelia-framework', bootstrapperName);
      loader.map('aurelia-framework', frameworkName);
      var diName = loader.normalizeSync('aurelia-dependency-injection', frameworkName);
      loader.map('aurelia-dependency-injection', diName);
      var routerName = loader.normalizeSync('aurelia-router', bootstrapperName);
      loader.map('aurelia-router', routerName);
      var loggingConsoleName = loader.normalizeSync('aurelia-logging-console', bootstrapperName);
      loader.map('aurelia-logging-console', loggingConsoleName);
      return loader.loadModule(frameworkName).then(function(m) {
        return Aurelia = m.Aurelia;
      });
    }
    function handleApp(loader, appHost) {
      var configModuleId = appHost.getAttribute('aurelia-app');
      return configModuleId ? customConfig(loader, appHost, configModuleId) : defaultConfig(loader, appHost);
    }
    function customConfig(loader, appHost, configModuleId) {
      return loader.loadModule(configModuleId).then(function(m) {
        var aurelia = new Aurelia(loader);
        aurelia.host = appHost;
        return m.configure(aurelia);
      });
    }
    function defaultConfig(loader, appHost) {
      var aurelia = new Aurelia(loader);
      aurelia.host = appHost;
      if (window.location.protocol !== 'http' && window.location.protocol !== 'https') {
        aurelia.use.developmentLogging();
      }
      aurelia.use.standardConfiguration();
      return aurelia.start().then(function(a) {
        return a.setRoot();
      });
    }
    function run() {
      return ready(window).then(function(doc) {
        _aureliaPalBrowser.initialize();
        var appHost = doc.querySelectorAll('[aurelia-app]');
        return createLoader().then(function(loader) {
          return preparePlatform(loader).then(function() {
            for (var i = 0,
                ii = appHost.length; i < ii; ++i) {
              handleApp(loader, appHost[i])['catch'](console.error.bind(console));
            }
            sharedLoader = loader;
            for (var i = 0,
                ii = bootstrapQueue.length; i < ii; ++i) {
              bootstrapQueue[i]();
            }
            bootstrapQueue = null;
          });
        });
      });
    }
    function bootstrap(configure) {
      return onBootstrap(function(loader) {
        var aurelia = new Aurelia(loader);
        return configure(aurelia);
      });
    }
    run();
  }).call(__exports, __exports, __require('npm:core-js@0.9.18'), __require('github:aurelia/pal@0.2.0'), __require('github:aurelia/pal-browser@0.2.0'));
});
})();
(function() {
function define(){};  define.amd = {};
System.register("github:aurelia/bootstrapper@0.18.0", ["github:aurelia/bootstrapper@0.18.0/aurelia-bootstrapper"], false, function(__require, __exports, __module) {
  return (function(main) {
    return main;
  }).call(this, __require('github:aurelia/bootstrapper@0.18.0/aurelia-bootstrapper'));
});
})();
System.register("npm:core-js@1.2.1/library/modules/$", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $Object = Object;
  module.exports = {
    create: $Object.create,
    getProto: $Object.getPrototypeOf,
    isEnum: {}.propertyIsEnumerable,
    getDesc: $Object.getOwnPropertyDescriptor,
    setDesc: $Object.defineProperty,
    setDescs: $Object.defineProperties,
    getKeys: $Object.keys,
    getNames: $Object.getOwnPropertyNames,
    getSymbols: $Object.getOwnPropertySymbols,
    each: [].forEach
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:babel-runtime@5.8.25/helpers/create-decorated-class", ["npm:babel-runtime@5.8.25/core-js/object/define-property"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var _Object$defineProperty = require("npm:babel-runtime@5.8.25/core-js/object/define-property")["default"];
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

System.register("npm:babel-runtime@5.8.25/helpers/class-call-check", [], true, function(require, exports, module) {
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

System.register("npm:core-js@1.2.1/library/fn/object/define-property", ["npm:core-js@1.2.1/library/modules/$"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@1.2.1/library/modules/$");
  module.exports = function defineProperty(it, key, desc) {
    return $.setDesc(it, key, desc);
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:babel-runtime@5.8.25/core-js/object/define-property", ["npm:core-js@1.2.1/library/fn/object/define-property"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = {
    "default": require("npm:core-js@1.2.1/library/fn/object/define-property"),
    __esModule: true
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:babel-runtime@5.8.25/helpers/define-decorated-property-descriptor", ["npm:babel-runtime@5.8.25/core-js/object/define-property"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var _Object$defineProperty = require("npm:babel-runtime@5.8.25/core-js/object/define-property")["default"];
  exports["default"] = function(target, key, descriptors) {
    var _descriptor = descriptors[key];
    if (!_descriptor)
      return ;
    var descriptor = {};
    for (var _key in _descriptor)
      descriptor[_key] = _descriptor[_key];
    descriptor.value = descriptor.initializer ? descriptor.initializer.call(target) : undefined;
    _Object$defineProperty(target, key, descriptor);
  };
  exports.__esModule = true;
  global.define = __define;
  return module.exports;
});

(function() {
function define(){};  define.amd = {};
System.register("github:aurelia/framework@0.17.0/aurelia-framework", ["npm:core-js@0.9.18", "github:aurelia/logging@0.8.0", "github:aurelia/templating@0.16.0", "github:aurelia/path@0.10.0", "github:aurelia/dependency-injection@0.11.0", "github:aurelia/loader@0.10.0", "github:aurelia/pal@0.2.0", "github:aurelia/binding@0.10.0", "github:aurelia/metadata@0.9.0", "github:aurelia/task-queue@0.8.0"], false, function(__require, __exports, __module) {
  return (function(exports, _coreJs, _aureliaLogging, _aureliaTemplating, _aureliaPath, _aureliaDependencyInjection, _aureliaLoader, _aureliaPal, _aureliaBinding, _aureliaMetadata, _aureliaTaskQueue) {
    'use strict';
    exports.__esModule = true;
    function _interopExportWildcard(obj, defaults) {
      var newObj = defaults({}, obj);
      delete newObj['default'];
      return newObj;
    }
    function _defaults(obj, defaults) {
      var keys = Object.getOwnPropertyNames(defaults);
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        var value = Object.getOwnPropertyDescriptor(defaults, key);
        if (value && value.configurable && obj[key] === undefined) {
          Object.defineProperty(obj, key, value);
        }
      }
      return obj;
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
      }
    }
    var logger = _aureliaLogging.getLogger('aurelia');
    function runTasks(config, tasks) {
      var current = undefined;
      var next = function next() {
        if (current = tasks.shift()) {
          return Promise.resolve(current(config)).then(next);
        }
        return Promise.resolve();
      };
      return next();
    }
    function loadPlugin(config, loader, info) {
      logger.debug('Loading plugin ' + info.moduleId + '.');
      config.resourcesRelativeTo = info.resourcesRelativeTo;
      return loader.loadModule(info.moduleId).then(function(m) {
        if ('configure' in m) {
          return Promise.resolve(m.configure(config, info.config || {})).then(function() {
            config.resourcesRelativeTo = null;
            logger.debug('Configured plugin ' + info.moduleId + '.');
          });
        }
        config.resourcesRelativeTo = null;
        logger.debug('Loaded plugin ' + info.moduleId + '.');
      });
    }
    function loadResources(container, resourcesToLoad, appResources) {
      var viewEngine = container.get(_aureliaTemplating.ViewEngine);
      var importIds = Object.keys(resourcesToLoad);
      var names = new Array(importIds.length);
      for (var i = 0,
          ii = importIds.length; i < ii; ++i) {
        names[i] = resourcesToLoad[importIds[i]];
      }
      return viewEngine.importViewResources(importIds, names, appResources);
    }
    function assertProcessed(plugins) {
      if (plugins.processed) {
        throw new Error('This config instance has already been applied. To load more plugins or global resources, create a new FrameworkConfiguration instance.');
      }
    }
    var FrameworkConfiguration = (function() {
      function FrameworkConfiguration(aurelia) {
        var _this = this;
        _classCallCheck(this, FrameworkConfiguration);
        this.aurelia = aurelia;
        this.container = aurelia.container;
        this.info = [];
        this.processed = false;
        this.preTasks = [];
        this.postTasks = [];
        this.resourcesToLoad = {};
        this.preTask(function() {
          return _this.bootstrapperName = aurelia.loader.normalizeSync('aurelia-bootstrapper');
        });
        this.postTask(function() {
          return loadResources(aurelia.container, _this.resourcesToLoad, aurelia.resources);
        });
      }
      FrameworkConfiguration.prototype.instance = function instance(type, _instance) {
        this.container.registerInstance(type, _instance);
        return this;
      };
      FrameworkConfiguration.prototype.singleton = function singleton(type, implementation) {
        this.container.registerSingleton(type, implementation);
        return this;
      };
      FrameworkConfiguration.prototype.transient = function transient(type, implementation) {
        this.container.registerTransient(type, implementation);
        return this;
      };
      FrameworkConfiguration.prototype.preTask = function preTask(task) {
        assertProcessed(this);
        this.preTasks.push(task);
        return this;
      };
      FrameworkConfiguration.prototype.postTask = function postTask(task) {
        assertProcessed(this);
        this.postTasks.push(task);
        return this;
      };
      FrameworkConfiguration.prototype.feature = function feature(plugin, config) {
        plugin = plugin.endsWith('.js') || plugin.endsWith('.ts') ? plugin.substring(0, plugin.length - 3) : plugin;
        return this.plugin({
          moduleId: plugin + '/index',
          resourcesRelativeTo: plugin,
          config: config || {}
        });
      };
      FrameworkConfiguration.prototype.globalResources = function globalResources(resources) {
        assertProcessed(this);
        var toAdd = Array.isArray(resources) ? resources : arguments;
        var resource = undefined;
        var path = undefined;
        var resourcesRelativeTo = this.resourcesRelativeTo || '';
        for (var i = 0,
            ii = toAdd.length; i < ii; ++i) {
          resource = toAdd[i];
          if (typeof resource !== 'string') {
            throw new Error('Invalid resource path [' + resource + ']. Resources must be specified as relative module IDs.');
          }
          path = _aureliaPath.join(resourcesRelativeTo, resource);
          this.resourcesToLoad[path] = this.resourcesToLoad[path];
        }
        return this;
      };
      FrameworkConfiguration.prototype.globalName = function globalName(resourcePath, newName) {
        assertProcessed(this);
        this.resourcesToLoad[resourcePath] = newName;
        return this;
      };
      FrameworkConfiguration.prototype.plugin = function plugin(_plugin, config) {
        assertProcessed(this);
        if (typeof _plugin === 'string') {
          _plugin = _plugin.endsWith('.js') || _plugin.endsWith('.ts') ? _plugin.substring(0, _plugin.length - 3) : _plugin;
          return this.plugin({
            moduleId: _plugin,
            resourcesRelativeTo: _plugin,
            config: config || {}
          });
        }
        this.info.push(_plugin);
        return this;
      };
      FrameworkConfiguration.prototype._addNormalizedPlugin = function _addNormalizedPlugin(name, config) {
        var _this2 = this;
        var plugin = {
          moduleId: name,
          resourcesRelativeTo: name,
          config: config || {}
        };
        this.plugin(plugin);
        this.preTask(function() {
          var normalizedName = _this2.aurelia.loader.normalizeSync(name, _this2.bootstrapperName);
          normalizedName = normalizedName.endsWith('.js') || normalizedName.endsWith('.ts') ? normalizedName.substring(0, normalizedName.length - 3) : normalizedName;
          plugin.moduleId = normalizedName;
          plugin.resourcesRelativeTo = normalizedName;
          _this2.aurelia.loader.map(name, normalizedName);
        });
        return this;
      };
      FrameworkConfiguration.prototype.defaultBindingLanguage = function defaultBindingLanguage() {
        return this._addNormalizedPlugin('aurelia-templating-binding');
      };
      FrameworkConfiguration.prototype.router = function router() {
        return this._addNormalizedPlugin('aurelia-templating-router');
      };
      FrameworkConfiguration.prototype.history = function history() {
        return this._addNormalizedPlugin('aurelia-history-browser');
      };
      FrameworkConfiguration.prototype.defaultResources = function defaultResources() {
        return this._addNormalizedPlugin('aurelia-templating-resources');
      };
      FrameworkConfiguration.prototype.eventAggregator = function eventAggregator() {
        return this._addNormalizedPlugin('aurelia-event-aggregator');
      };
      FrameworkConfiguration.prototype.standardConfiguration = function standardConfiguration() {
        return this.defaultBindingLanguage().defaultResources().history().router().eventAggregator();
      };
      FrameworkConfiguration.prototype.developmentLogging = function developmentLogging() {
        var _this3 = this;
        this.preTask(function() {
          var name = _this3.aurelia.loader.normalizeSync('aurelia-logging-console', _this3.bootstrapperName);
          return _this3.aurelia.loader.loadModule(name).then(function(m) {
            _aureliaLogging.addAppender(new m.ConsoleAppender());
            _aureliaLogging.setLevel(_aureliaLogging.logLevel.debug);
          });
        });
        return this;
      };
      FrameworkConfiguration.prototype.apply = function apply() {
        var _this4 = this;
        if (this.processed) {
          return Promise.resolve();
        }
        return runTasks(this, this.preTasks).then(function() {
          var loader = _this4.aurelia.loader;
          var info = _this4.info;
          var current = undefined;
          var next = function next() {
            if (current = info.shift()) {
              return loadPlugin(_this4, loader, current).then(next);
            }
            _this4.processed = true;
            return Promise.resolve();
          };
          return next().then(function() {
            return runTasks(_this4, _this4.postTasks);
          });
        });
      };
      return FrameworkConfiguration;
    })();
    exports.FrameworkConfiguration = FrameworkConfiguration;
    function preventActionlessFormSubmit() {
      _aureliaPal.DOM.addEventListener('submit', function(evt) {
        var target = evt.target;
        var action = target.action;
        if (target.tagName.toLowerCase() === 'form' && !action) {
          evt.preventDefault();
        }
      });
    }
    var Aurelia = (function() {
      function Aurelia(loader, container, resources) {
        _classCallCheck(this, Aurelia);
        this.loader = loader || new _aureliaPal.PLATFORM.Loader();
        this.container = container || new _aureliaDependencyInjection.Container();
        this.resources = resources || new _aureliaTemplating.ViewResources();
        this.use = new FrameworkConfiguration(this);
        this.logger = _aureliaLogging.getLogger('aurelia');
        this.hostConfigured = false;
        this.host = null;
        this.use.instance(Aurelia, this);
        this.use.instance(_aureliaLoader.Loader, this.loader);
        this.use.instance(_aureliaTemplating.ViewResources, this.resources);
        this.container.makeGlobal();
      }
      Aurelia.prototype.start = function start() {
        var _this5 = this;
        if (this.started) {
          return Promise.resolve(this);
        }
        this.started = true;
        this.logger.info('Aurelia Starting');
        return this.use.apply().then(function() {
          preventActionlessFormSubmit();
          if (!_this5.container.hasResolver(_aureliaTemplating.BindingLanguage)) {
            var message = 'You must configure Aurelia with a BindingLanguage implementation.';
            _this5.logger.error(message);
            throw new Error(message);
          }
          if (!_this5.container.hasResolver(_aureliaTemplating.Animator)) {
            _aureliaTemplating.Animator.configureDefault(_this5.container);
          }
          _aureliaTemplating.templatingEngine.initialize(_this5.container);
          _this5.logger.info('Aurelia Started');
          var evt = _aureliaPal.DOM.createCustomEvent('aurelia-started', {
            bubbles: true,
            cancelable: true
          });
          _aureliaPal.DOM.dispatchEvent(evt);
          return _this5;
        });
      };
      Aurelia.prototype.enhance = function enhance() {
        var _this6 = this;
        var bindingContext = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
        var applicationHost = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
        this._configureHost(applicationHost);
        return new Promise(function(resolve) {
          var viewEngine = _this6.container.get(_aureliaTemplating.ViewEngine);
          _this6.root = viewEngine.enhance(_this6.container, _this6.host, _this6.resources, bindingContext);
          _this6.root.attached();
          _this6._onAureliaComposed();
          return _this6;
        });
      };
      Aurelia.prototype.setRoot = function setRoot() {
        var _this7 = this;
        var root = arguments.length <= 0 || arguments[0] === undefined ? 'app' : arguments[0];
        var applicationHost = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
        var compositionEngine = undefined;
        var instruction = {};
        this._configureHost(applicationHost);
        compositionEngine = this.container.get(_aureliaTemplating.CompositionEngine);
        instruction.viewModel = root;
        instruction.container = instruction.childContainer = this.container;
        instruction.viewSlot = this.hostSlot;
        instruction.host = this.host;
        return compositionEngine.compose(instruction).then(function(r) {
          _this7.root = r;
          instruction.viewSlot.attached();
          _this7._onAureliaComposed();
          return _this7;
        });
      };
      Aurelia.prototype._configureHost = function _configureHost(applicationHost) {
        if (this.hostConfigured) {
          return ;
        }
        applicationHost = applicationHost || this.host;
        if (!applicationHost || typeof applicationHost === 'string') {
          this.host = _aureliaPal.DOM.getElementById(applicationHost || 'applicationHost');
        } else {
          this.host = applicationHost;
        }
        if (!this.host) {
          throw new Error('No applicationHost was specified.');
        }
        this.hostConfigured = true;
        this.host.aurelia = this;
        this.hostSlot = new _aureliaTemplating.ViewSlot(this.host, true);
        this.hostSlot.transformChildNodesIntoView();
        this.container.registerInstance(_aureliaPal.DOM.boundary, this.host);
      };
      Aurelia.prototype._onAureliaComposed = function _onAureliaComposed() {
        var evt = _aureliaPal.DOM.createCustomEvent('aurelia-composed', {
          bubbles: true,
          cancelable: true
        });
        setTimeout(function() {
          return _aureliaPal.DOM.dispatchEvent(evt);
        }, 1);
      };
      return Aurelia;
    })();
    exports.Aurelia = Aurelia;
    _defaults(exports, _interopExportWildcard(_aureliaDependencyInjection, _defaults));
    _defaults(exports, _interopExportWildcard(_aureliaBinding, _defaults));
    _defaults(exports, _interopExportWildcard(_aureliaMetadata, _defaults));
    _defaults(exports, _interopExportWildcard(_aureliaTemplating, _defaults));
    _defaults(exports, _interopExportWildcard(_aureliaLoader, _defaults));
    _defaults(exports, _interopExportWildcard(_aureliaTaskQueue, _defaults));
    _defaults(exports, _interopExportWildcard(_aureliaPath, _defaults));
    _defaults(exports, _interopExportWildcard(_aureliaPal, _defaults));
    var LogManager = _aureliaLogging;
    exports.LogManager = LogManager;
  }).call(__exports, __exports, __require('npm:core-js@0.9.18'), __require('github:aurelia/logging@0.8.0'), __require('github:aurelia/templating@0.16.0'), __require('github:aurelia/path@0.10.0'), __require('github:aurelia/dependency-injection@0.11.0'), __require('github:aurelia/loader@0.10.0'), __require('github:aurelia/pal@0.2.0'), __require('github:aurelia/binding@0.10.0'), __require('github:aurelia/metadata@0.9.0'), __require('github:aurelia/task-queue@0.8.0'));
});
})();
(function() {
function define(){};  define.amd = {};
System.register("github:aurelia/framework@0.17.0", ["github:aurelia/framework@0.17.0/aurelia-framework"], false, function(__require, __exports, __module) {
  return (function(main) {
    return main;
  }).call(this, __require('github:aurelia/framework@0.17.0/aurelia-framework'));
});
})();
System.register("npm:babel-runtime@5.8.25/helpers/create-class", ["npm:babel-runtime@5.8.25/core-js/object/define-property"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var _Object$defineProperty = require("npm:babel-runtime@5.8.25/core-js/object/define-property")["default"];
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

System.register("resources/nav-menu", ["npm:babel-runtime@5.8.25/helpers/define-decorated-property-descriptor", "npm:babel-runtime@5.8.25/helpers/create-decorated-class", "npm:babel-runtime@5.8.25/helpers/class-call-check", "github:aurelia/framework@0.17.0"], function (_export) {
    var _defineDecoratedPropertyDescriptor, _createDecoratedClass, _classCallCheck, bindable, NavMenu;

    return {
        setters: [function (_npmBabelRuntime5825HelpersDefineDecoratedPropertyDescriptor) {
            _defineDecoratedPropertyDescriptor = _npmBabelRuntime5825HelpersDefineDecoratedPropertyDescriptor["default"];
        }, function (_npmBabelRuntime5825HelpersCreateDecoratedClass) {
            _createDecoratedClass = _npmBabelRuntime5825HelpersCreateDecoratedClass["default"];
        }, function (_npmBabelRuntime5825HelpersClassCallCheck) {
            _classCallCheck = _npmBabelRuntime5825HelpersClassCallCheck["default"];
        }, function (_githubAureliaFramework0170) {
            bindable = _githubAureliaFramework0170.bindable;
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
                    initializer: function initializer() {
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
        aurelia.globalResources("./nav-menu");
    }

    return {
        setters: [],
        execute: function () {}
    };
});
System.register("movies/movieData", ["npm:babel-runtime@5.8.25/helpers/create-class", "npm:babel-runtime@5.8.25/helpers/class-call-check", "github:aurelia/framework@0.17.0", "github:aurelia/http-client@0.12.0"], function (_export) {
    var _createClass, _classCallCheck, inject, HttpClient, baseUrl, parse, MovieData;

    return {
        setters: [function (_npmBabelRuntime5825HelpersCreateClass) {
            _createClass = _npmBabelRuntime5825HelpersCreateClass["default"];
        }, function (_npmBabelRuntime5825HelpersClassCallCheck) {
            _classCallCheck = _npmBabelRuntime5825HelpersClassCallCheck["default"];
        }, function (_githubAureliaFramework0170) {
            inject = _githubAureliaFramework0170.inject;
        }, function (_githubAureliaHttpClient0120) {
            HttpClient = _githubAureliaHttpClient0120.HttpClient;
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

                _createClass(MovieData, [{
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
                            return this.http.put('', movie).then(parse);
                        }
                        return this.http.post('', movie).then(parse);
                    }
                }]);

                var _MovieData = MovieData;
                MovieData = inject(HttpClient)(MovieData) || MovieData;
                return MovieData;
            })();

            _export("MovieData", MovieData);
        }
    };
});
System.register('movies/list', ['npm:babel-runtime@5.8.25/helpers/create-class', 'npm:babel-runtime@5.8.25/helpers/class-call-check', 'github:aurelia/framework@0.17.0', 'movies/movieData'], function (_export) {
    var _createClass, _classCallCheck, inject, MovieData, List;

    return {
        setters: [function (_npmBabelRuntime5825HelpersCreateClass) {
            _createClass = _npmBabelRuntime5825HelpersCreateClass['default'];
        }, function (_npmBabelRuntime5825HelpersClassCallCheck) {
            _classCallCheck = _npmBabelRuntime5825HelpersClassCallCheck['default'];
        }, function (_githubAureliaFramework0170) {
            inject = _githubAureliaFramework0170.inject;
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

                _createClass(List, [{
                    key: 'activate',
                    value: function activate() {
                        var _this = this;

                        return this.data.getAll().then(function (movies) {
                            return _this.movies = movies;
                        });
                    }
                }]);

                var _List = List;
                List = inject(MovieData)(List) || List;
                return List;
            })();

            _export('List', List);
        }
    };
});
System.register("movies/edit", ["npm:babel-runtime@5.8.25/helpers/create-class", "npm:babel-runtime@5.8.25/helpers/class-call-check", "github:aurelia/framework@0.17.0", "github:aurelia/validation@0.4.0", "movies/movieData", "github:aurelia/router@0.13.0"], function (_export) {
    var _createClass, _classCallCheck, inject, Validation, MovieData, Router, Edit;

    return {
        setters: [function (_npmBabelRuntime5825HelpersCreateClass) {
            _createClass = _npmBabelRuntime5825HelpersCreateClass["default"];
        }, function (_npmBabelRuntime5825HelpersClassCallCheck) {
            _classCallCheck = _npmBabelRuntime5825HelpersClassCallCheck["default"];
        }, function (_githubAureliaFramework0170) {
            inject = _githubAureliaFramework0170.inject;
        }, function (_githubAureliaValidation040) {
            Validation = _githubAureliaValidation040.Validation;
        }, function (_moviesMovieData) {
            MovieData = _moviesMovieData.MovieData;
        }, function (_githubAureliaRouter0130) {
            Router = _githubAureliaRouter0130.Router;
        }],
        execute: function () {
            "use strict";

            Edit = (function () {
                function Edit(movieData, validation, router) {
                    _classCallCheck(this, _Edit);

                    this.data = movieData;
                    this.router = router;
                    this.validation = validation.on(this).ensure('movie.Title').isNotEmpty().hasMinLength(3).hasMaxLength(100).ensure('movie.ReleaseYear').isNumber().isBetween(1900, 2100);
                }

                _createClass(Edit, [{
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

                var _Edit = Edit;
                Edit = inject(MovieData, Validation, Router)(Edit) || Edit;
                return Edit;
            })();

            _export("Edit", Edit);
        }
    };
});
System.register('movies/details', ['npm:babel-runtime@5.8.25/helpers/create-class', 'npm:babel-runtime@5.8.25/helpers/class-call-check', 'github:aurelia/framework@0.17.0', 'movies/movieData'], function (_export) {
    var _createClass, _classCallCheck, inject, MovieData, Details;

    return {
        setters: [function (_npmBabelRuntime5825HelpersCreateClass) {
            _createClass = _npmBabelRuntime5825HelpersCreateClass['default'];
        }, function (_npmBabelRuntime5825HelpersClassCallCheck) {
            _classCallCheck = _npmBabelRuntime5825HelpersClassCallCheck['default'];
        }, function (_githubAureliaFramework0170) {
            inject = _githubAureliaFramework0170.inject;
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

                _createClass(Details, [{
                    key: 'activate',
                    value: function activate(params) {
                        var _this = this;

                        return this.data.getById(params.id).then(function (movie) {
                            return _this.movie = movie;
                        });
                    }
                }]);

                var _Details = Details;
                Details = inject(MovieData)(Details) || Details;
                return Details;
            })();

            _export('Details', Details);
        }
    };
});
System.register("about/about", ["npm:babel-runtime@5.8.25/helpers/class-call-check"], function (_export) {
  var _classCallCheck, About;

  return {
    setters: [function (_npmBabelRuntime5825HelpersClassCallCheck) {
      _classCallCheck = _npmBabelRuntime5825HelpersClassCallCheck["default"];
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
        aurelia.use.standardConfiguration().developmentLogging().plugin("aurelia-validation").feature("./resources");

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
System.register("app", ["npm:babel-runtime@5.8.25/helpers/create-class", "npm:babel-runtime@5.8.25/helpers/class-call-check"], function (_export) {
    var _createClass, _classCallCheck, App;

    return {
        setters: [function (_npmBabelRuntime5825HelpersCreateClass) {
            _createClass = _npmBabelRuntime5825HelpersCreateClass["default"];
        }, function (_npmBabelRuntime5825HelpersClassCallCheck) {
            _classCallCheck = _npmBabelRuntime5825HelpersClassCallCheck["default"];
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
                        config.map([{ route: "", name: 'home', moduleId: "movies/list", title: "List", nav: true }, { route: "about", moduleId: "about/about", title: "About", nav: true }, { route: "details/:id", name: "details", moduleId: "movies/details" }, { route: "edit/:id", name: "edit", moduleId: "movies/edit" }, { route: "create", name: "create", moduleId: "movies/edit" }]);
                    }
                }]);

                return App;
            })();

            _export("App", App);
        }
    };
});