"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var NYT_SearcherAPI = /*#__PURE__*/function () {
  function NYT_SearcherAPI() {
    var _this = this;

    _classCallCheck(this, NYT_SearcherAPI);

    _defineProperty(this, "API_BASE_URL", 'https://api.nytimes.com/svc/search/v2/articlesearch.json');

    _defineProperty(this, "API_KEY", 'jrA8G275AjGzAGjYOplvFFkZxIsEXHKG');

    _defineProperty(this, "current_ArtIndex", null);

    _defineProperty(this, "reformatDate", function (str) {
      var dateRegex = /(\d{1,2})\/(\d{1,2})\/?(\d{2,4})?/;
      var dateParts = str.match(dateRegex);
      console.log('reformatDate', str, dateParts, dateRegex);
      var curYY = new Date().getFullYear();
      var dateStr = '';
      var year = dateParts[3];

      if (!year) {
        year = curYY;
      } else if (year.length == 2) {
        year = "20" + year;
      }

      var month = dateParts[1];

      if (month.length == 1) {
        month = "0" + month;
      }

      var day = dateParts[2];

      if (day.length == 1) {
        day = "0" + day;
      }

      dateStr = "".concat(year);
      console.log('reformated', dateStr);
      return dateStr;
    });

    _defineProperty(this, "handleSearch", function (evt) {
      evt.preventDefault();
      console.log('searching....');
      var term = document.querySelector('input[name="term"]').value;

      var beginDate = _this.reformatDate(document.querySelector('input[name="begin_date"]').value);

      var endDate = _this.reformatDate(document.querySelector('input[name="end_date"]').value);

      var data = {
        q: term,
        begin_date: beginDate,
        end_date: endDate,
        'api-key': _this.API_KEY
      }; // axios.request({
      //     url: this.API_BASE_URL,
      //     params: data
      // }, this.processResults)

      axios.get(_this.API_BASE_URL, {
        params: data
      }).then(_this.processResults);
    });

    _defineProperty(this, "nextArticle", function (evt) {
      evt.preventDefault();
      _this.current_ArtIndex++;
      var term = document.querySelector('input[name="term"]').value;
      var data = {
        q: term,
        'api-key': _this.API_KEY
      };
      axios.get(_this.API_BASE_URL, {
        params: data
      }).then(_this.processResults);
    });

    _defineProperty(this, "prevArticle", function (evt) {
      evt.preventDefault();
      _this.current_ArtIndex--;
      var term = document.querySelector('input[name="term"]').value;
      var data = {
        q: term,
        'api-key': _this.API_KEY
      };
      axios.get(_this.API_BASE_URL, {
        params: data
      }).then(_this.processResults);
    });

    _defineProperty(this, "processResults", function (response) {
      console.log('your results captain: ', response);
      var responseData = response.data.response.docs;

      var displayResults = function displayResults() {
        var resultsPage = document.querySelector('.results');
        var resImage = document.querySelector('.result_image');
        var head = document.querySelector('.headline');
        var artAuthor = document.querySelector('.article_author');
        var artPostDate = document.querySelector('.article_postDate');
        var leadP = document.querySelector('.lead_paragraph');
        var artUrl = document.querySelector('.article_url');
        resImage.style.display = 'block';
        resImage.src = 'https://static01.nyt.com/' + responseData[_this.current_ArtIndex].multimedia[0].url;
        resultsPage.style.display = 'block';
        console.log(_this.current_ArtIndex);
        console.log('data: ', response.data.response.docs);
        head.innerHTML = responseData[_this.current_ArtIndex].headline.main;
        artAuthor.innerHTML = responseData[_this.current_ArtIndex].byline.original;
        artPostDate.innerHTML = responseData[_this.current_ArtIndex].pub_date;
        leadP.innerHTML = responseData[_this.current_ArtIndex].abstract + " " + responseData[_this.current_ArtIndex].lead_paragraph;
        artUrl.href = responseData[_this.current_ArtIndex].web_url;
      };

      displayResults(_this.current_ArtIndex);
    });

    this.current_ArtIndex = 0;
    this.setupListener();
  }

  _createClass(NYT_SearcherAPI, [{
    key: "setupListener",
    value: function setupListener() {
      var form = document.querySelector('form[name="article_search"]');
      form.addEventListener('submit', this.handleSearch);
      var nextBtn = document.querySelector('.next_btn');
      var prevBtn = document.querySelector('.prev_btn');
      nextBtn.addEventListener('click', this.nextArticle);
      prevBtn.addEventListener('click', this.prevArticle);
    }
  }]);

  return NYT_SearcherAPI;
}();

new NYT_SearcherAPI();
//# sourceMappingURL=nytAPI.js.map
