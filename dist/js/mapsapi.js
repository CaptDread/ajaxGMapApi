"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var GoogleMap = /*#__PURE__*/function () {
  function GoogleMap() {
    var _this = this;

    _classCallCheck(this, GoogleMap);

    _defineProperty(this, "API_KEY", 'AIzaSyA3tRPWowcO3i2l6jwjEWdUg1wRaEShj1A');

    _defineProperty(this, "markers", []);

    _defineProperty(this, "handleMapCenterRequest", function (evt) {
      var mapCenter = _this.map.getCenter();

      var responseInfo = {
        center: mapCenter
      };
      var responseEvent = new CustomEvent("get-map-center-response", {
        detail: responseInfo
      });
      console.log(responseInfo);
      document.dispatchEvent(responseEvent);
    });

    _defineProperty(this, "handlePlaceSearch", function (evt) {
      evt.preventDefault();
      var placeName = document.querySelector('#term').value;
      var placeRequest = {
        location: _this.map.getCenter(),
        radius: 50,
        // this is in meters or miles??
        query: placeName
      };
      _this.service = new google.maps.places.PlacesService(_this.map);

      _this.service.textSearch(placeRequest, _this.handlePlaceResults);

      console.log('searching places');
    });

    _defineProperty(this, "createMarker", function (options) {
      var opt = options.detail;
      var marker = new google.maps.Marker({
        position: {
          lat: opt.lat,
          lng: opt.lng
        },
        map: _this.map,
        title: opt.name,
        description: opt.desc
      }); // console.log(`marker ${opt.latitude}`)

      console.log("mapApi options: ", options);
      var infoWindowContent = "<div><h2>".concat(options.title, "</h2>").concat(options.description, "</div>");

      if (!_this.infoWindow) {
        _this.infoWindow = new google.maps.InfoWindow();
      }

      marker.addListener('click', function () {
        _this.infoWindow.setContent(infoWindowContent);

        _this.infoWindow.open(_this.map, marker);
      });

      _this.markers.push(marker);
    });

    _defineProperty(this, "clearMarker", function () {
      _this.markers.forEach(function (marker) {
        marker.setMap(null);
      });

      console.log("markers cleared");
      _this.markers = [];
    });

    _defineProperty(this, "handlePlaceResults", function (results, status) {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        _this.clearMarker();

        console.log('got results', results);
        var resCenter = {
          lat: results[0].geometry.viewport.Ua.i,
          lng: results[0].geometry.viewport.La.i
        };
        var mapOptions = {
          center: resCenter,
          zoom: 13
        };
        _this.map = new google.maps.Map(document.getElementById('map'), mapOptions);

        for (var rm = 0; rm < results.length; rm++) {
          var resName = results[rm].name;
          var resLat = results[rm].geometry.viewport.Ua.i;
          var resLng = results[rm].geometry.viewport.La.i; // var resHours = results[rm].opening_hours.isOpen
          // var resNum = results[rm].

          var resRate = results[rm].rating;
          var resAddy = results[rm].formatted_address;
          console.log(resName, resRate); //name of the place, hours, phone number, and rating.

          _this.createMarker({
            lat: resLat,
            lng: resLng,
            title: resName,
            desc: "<div class=\"column\"><p>Rating ".concat(resRate, "</p><p>").concat(resAddy, "</p></div>")
          });
        }
      } else {
        console.log('error: ');
      }
    });

    this.setupListeners();
  }

  _createClass(GoogleMap, [{
    key: "setupListeners",
    value: function setupListeners() {
      document.addEventListener("get-map-center", this.handleMapCenterRequest);
      document.addEventListener("clear-marker", this.clearMarker);
      document.addEventListener("create-marker", this.createMarker);
    }
  }, {
    key: "ready",
    value: function ready() {
      console.log('GoogleMap is ready');
      var circusCenter = {
        lat: 33.812328,
        lng: -84.36175
      };
      var mapOptions = {
        center: circusCenter,
        zoom: 18
      };
      this.map = new google.maps.Map(document.getElementById('map'), mapOptions); // this.createMarker({
      //     lat: circusCenter.lat,
      //     lng: circusCenter.lng,
      //     title: "The Circus",
      //     description: `<div><p>A place where cool shit is made.</p></div>`
      // })

      var mapReadyEvt = new CustomEvent("map-ready");
      document.dispatchEvent(mapReadyEvt);
    }
  }]);

  return GoogleMap;
}();

window.gMap = new GoogleMap();
//# sourceMappingURL=mapsapi.js.map
