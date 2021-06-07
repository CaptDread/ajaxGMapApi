"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Main = /*#__PURE__*/function () {
  function Main() {
    var _this = this;

    _classCallCheck(this, Main);

    _defineProperty(this, "setupListener", function () {
      var form = document.querySelector('form[name="business_search"]');
      form.addEventListener('submit', _this.handleSearch);
      document.addEventListener("get-map-center-response", _this.handleMapCenterResponse);
      document.addEventListener("map-ready", _this.getMapCenter); // const refineForm = document.querySelector('form[name="refine_search"]')
      // refineForm.addEventListener('submit', this.refineSearch)
    });

    _defineProperty(this, "handleMapCenterResponse", function (evt) {
      var responseInfo = evt.detail;
      console.log("evt ".concat(evt.detail));
      var mapCenter = responseInfo.center;
      console.log("handleMapCenterResponse", mapCenter);
      var query = document.querySelector("input[name=\"term\"]").value;
      console.log("query", query, mapCenter);
      var searchInfo = {
        query: query,
        lat: mapCenter.lat,
        lng: mapCenter.lng
      };
      console.log("handleSearch", searchInfo);
      var searchEvent = new CustomEvent("business-search", {
        detail: searchInfo
      });
      document.dispatchEvent(searchEvent);
    });

    _defineProperty(this, "handleSearch", function (evt) {
      evt.preventDefault();

      _this.getMapCenter();
    });

    this.setupListener();
  }

  _createClass(Main, [{
    key: "getMapCenter",
    value: function getMapCenter() {
      var getCenterEvent = new CustomEvent("get-map-center");
      document.dispatchEvent(getCenterEvent);
    }
  }]);

  return Main;
}();

new Main();
//# sourceMappingURL=main.js.map
