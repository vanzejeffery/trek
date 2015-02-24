"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _hasOwn = Object.prototype.hasOwnProperty;

var isFunction = _interopRequire(require("lodash-node/modern/lang/isFunction"));

var _configuration = require("./configuration");

var MiddlewareStackProxy = _configuration.MiddlewareStackProxy;
var Generators = _configuration.Generators;

var Configuration = (function () {
  function Configuration() {
    _classCallCheck(this, Configuration);

    var _Configuration = Configuration;
    if (!_hasOwn.call(_Configuration, "options")) _Configuration.options = [];
  }

  _prototypeProperties(Configuration, null, {
    appMiddleware: {
      get: function () {
        var _Configuration;

        return (_Configuration = Configuration, !_hasOwn.call(_Configuration, "appMiddleware") && (_Configuration.appMiddleware = new MiddlewareStackProxy()), _Configuration.appMiddleware);
      },
      configurable: true
    },
    appGenerators: {
      get: function () {
        var _Configuration;

        return (_Configuration = Configuration, !_hasOwn.call(_Configuration, "appGenerators") && (_Configuration.appGenerators = new Generators()), _Configuration.appGenerators);
      },
      configurable: true
    },
    beforeConfiguration: {
      value: function beforeConfiguration(cb) {},
      writable: true,
      configurable: true
    },
    beforeInitialize: {
      value: function beforeInitialize(cb) {},
      writable: true,
      configurable: true
    },
    afterInitialize: {
      value: function afterInitialize(cb) {},
      writable: true,
      configurable: true
    }
  });

  return Configuration;
})();

var Trekking = (function () {
  function Trekking() {
    _classCallCheck(this, Trekking);
  }

  _prototypeProperties(Trekking, {
    generators: {
      value: function generators(cb) {
        this._generators || (this._generators = []);
        if (isFunction(cb)) {
          this._generators.push(cb);
        }
        return this._generators;
      },
      writable: true,
      configurable: true
    },
    instance: {
      get: function () {
        return this._instance || (this._instance = new Trekking());
      },
      configurable: true
    },
    configure: {
      value: function configure(cb) {
        this._instance.configure(cb);
      },
      writable: true,
      configurable: true
    }
  }, {
    configure: {
      value: function configure(cb) {
        cb.call(this);
      },
      writable: true,
      configurable: true
    },
    config: {
      get: function () {
        return this._config || (this._config = new Configuration());
      },
      configurable: true
    }
  });

  return Trekking;
})();

exports.Trekking = Trekking;
exports.Configuration = Configuration;
Object.defineProperty(exports, "__esModule", {
  value: true
});