"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var BaseValidator = /*#__PURE__*/function () {
  function BaseValidator(element, options) {
    _classCallCheck(this, BaseValidator);

    _defineProperty(this, "handleChange", function (evt) {
      if (evt.target.name === "price") {
        var pMess = document.querySelector('.message-price');
        var el = evt.target;
        var newValue = el.value / 25;

        if (newValue < 1) {
          pMess.textContent = "all";
        } else if (newValue < 2) {
          pMess.textContent = "$";
        } else if (newValue < 3) {
          pMess.textContent = "$$";
        } else if (newValue < 4) {
          pMess.textContent = "$$$";
        } else if (newValue < 5) {
          pMess.textContent = "$$$$";
        }

        console.log("handleChange", newValue);
      } else if (evt.target.name === "rating") {
        var rMess = document.querySelector('.message-rate');
        var _el = evt.target;

        var _newValue = _el.value / 20;

        if (_newValue < 1) {
          rMess.textContent = "all";
        } else if (_newValue < 2) {
          rMess.textContent = "★";
        } else if (_newValue < 3) {
          rMess.textContent = "★★";
        } else if (_newValue < 4) {
          rMess.textContent = "★★★";
        } else if (_newValue < 5) {
          rMess.textContent = "★★★★";
        } else if (_newValue === 5) {
          rMess.textContent = "★★★★★";
        }

        console.log("handleChange", _newValue);
      } else if (evt.target.name === "range") {
        var dMess = document.querySelector('.message-dist');
        var _el2 = evt.target;

        var _newValue2 = _el2.value / 4;

        console.log("handleChange", _newValue2);

        if (_newValue2 < 1) {
          dMess.textContent = "> 1 mile away";
        } else if (_newValue2 < 2) {
          dMess.textContent = "1 mile away";
        } else {
          dMess.textContent = "".concat(_newValue2, " miles away");
        }
      }

      console.log(evt.target.name);
    });

    console.log("BaseValidator");
    this.setup();
    this.element = element;
    this.options = options;
  }

  _createClass(BaseValidator, [{
    key: "setup",
    value: function setup() {
      var refineForm = document.querySelector('form[name="refine_search"]');
      refineForm.addEventListener("change", this.handleChange);
    }
  }]);

  return BaseValidator;
}();

new BaseValidator();
//# sourceMappingURL=base-validator.js.map
