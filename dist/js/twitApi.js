"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var TwitApi = function TwitApi() {
  var _this = this;

  _classCallCheck(this, TwitApi);

  _defineProperty(this, "API_BASE_URL", './twitter-proxy.php');

  _defineProperty(this, "setupListener", function () {
    var form = document.querySelector('form[name="search_tweets"]');
    form.addEventListener('submit', _this.handleSearch);
  });

  _defineProperty(this, "handleSearch", function (evt) {
    evt.preventDefault();
    console.log('searching....');
    var term = document.querySelector('input[name="term"]').value;
    var data = {
      op: 'search_tweets',
      q: term
    };
    axios.get(_this.API_BASE_URL, {
      params: data
    }).then(_this.processResults);
  });

  _defineProperty(this, "processResults", function (data) {
    var results = data.data;
    console.log('got data: ', results.statuses);

    for (var z = 0; z < results.statuses.length; z++) {
      console.log(z, "; ", results.statuses[z]);
      var resultsUl = document.querySelector('.result_list');
      var resLi = document.createElement('li');
      resLi.classList.add('res_li');
      var resDiv = document.createElement('a');
      resDiv.classList.add('res_div');
      var resDivInfo = document.createElement('div');
      resDivInfo.classList.add('res_div-info');
      var resDivHeader = document.createElement('h2');
      resDivHeader.classList.add('res_div-head');
      var resDivDigit = document.createElement('p');
      resDivDigit.classList.add('res_div-contact');
      var resDivAddy = document.createElement('p');
      resDivAddy.classList.add('res_div-address');
      var resDivStats = document.createElement('article');
      resDivStats.classList.add('res_div-stats');
      var resPrice = document.createElement('span');
      resPrice.classList.add('res_stats-price');
      var resRate = document.createElement('span');
      resRate.classList.add('res_stats-rate');
      var resDist = document.createElement('span');
      resDist.classList.add('res_stats-dist');
      var resImg = document.createElement('img');
      resImg.classList.add('res_div-img');
      resultsUl.appendChild(resLi);
      resLi.appendChild(resDiv);
      resDiv.appendChild(resDivInfo);
      resDivInfo.appendChild(resDivHeader);
      resDivInfo.appendChild(resDivDigit);
      resDivInfo.appendChild(resDivAddy);
      resDivInfo.appendChild(resDivStats);
      resDivStats.appendChild(resPrice);
      resDivStats.appendChild(resRate);
      resDivStats.appendChild(resDist);
      resDiv.appendChild(resImg);
      resDivHeader.textContent = results.statuses[z].user.name;
      resDiv.target = "_blank";
      resDiv.href = results.statuses[z].user.url;
      resDivDigit.textContent = results.statuses[z].text; // resDivAddy.textContent = results.statuses[z].location.address1 + ", " + results.statuses[z].location.address2 + ", " + results.statuses[z].location.city + ", " + results.statuses[z].location.zip_code
      // resPrice.textContent = results.statuses[z].price

      resImg.src = results.statuses[z].user.profile_image_url_https;
    }
  });

  _defineProperty(this, "handleError", function (evt) {
    console.log('ERROR ', err);
  });

  this.setupListener();
};
//# sourceMappingURL=twitApi.js.map
