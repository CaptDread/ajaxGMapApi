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

    _defineProperty(this, "handlePlaceSearch", function (evt) {
      evt.preventDefault();
      var placeName = document.querySelector('#place').value;
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

    _defineProperty(this, "handlePlaceResults", function (results, status) {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
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

        var _loop = function _loop(rm) {
          resName = results[rm].name;
          resLat = results[rm].geometry.viewport.Ua.i;
          resLng = results[rm].geometry.viewport.La.i;
          console.log(resName, resLat, resLng);
          marker = new google.maps.Marker({
            position: {
              lat: resLat,
              lng: resLng
            },
            map: _this.map,
            title: resName,
            label: resName,
            draggable: false
          });
          var infoWindowContent = "<div><h2>Hi Circus</h2><p>I'm at lambert drive</p></div>";
          var infoWindow = new google.maps.InfoWindow({
            content: infoWindowContent
          });
          marker.addListener('click', function () {
            infoWindow.open(_this.map, marker);
          });
        };

        for (var rm = 0; rm < results.length; rm++) {
          var resName;
          var resLat;
          var resLng;
          var marker;

          _loop(rm);
        }
      } else {
        console.log('error: ');
      }
    });

    this.init();
  }

  _createClass(GoogleMap, [{
    key: "init",
    value: function init() {
      console.log('googleMap init');
      var form = document.querySelector('form[name="place_search"]');
      form.addEventListener('submit', this.handlePlaceSearch);
    }
  }, {
    key: "ready",
    value: function ready() {
      var _this2 = this;

      console.log('GoogleMap is ready');
      var circusCenter = {
        lat: 33.812328,
        lng: -84.36175
      };
      var mapOptions = {
        center: circusCenter,
        zoom: 18
      };
      this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
      var marker = new google.maps.Marker({
        position: circusCenter,
        map: this.map,
        title: 'The Circus' // label: 'the Creative Circus',
        // draggable: false

      });
      var infoWindowContent = "<div><h2>Hi Circus</h2><p>I'm at lambert drive</p></div>";
      var infoWindow = new google.maps.InfoWindow({
        content: infoWindowContent
      });
      marker.addListener('click', function () {
        infoWindow.open(_this2.map, marker);
      });
    }
  }]);

  return GoogleMap;
}();

window.gMap = new GoogleMap();
//# sourceMappingURL=mapsapi.js.map
